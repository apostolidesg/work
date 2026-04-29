import { ref, computed, onMounted, onBeforeUnmount, toRaw } from 'vue';
import { useStore } from 'vuex';
import moduleTypes from '@/store/modules/types/types';
import sessionStoreModuleTypes from '@/store/modules/SessionStoreModule/types';
import configurationStoreModuleTypes from '@/store/modules/ConfigurationStoreModule/types';
import { IS_SALES_CLOSED_GETTER_MAPPER, SALES_STOPPED_ERROR_MAPPER } from '@/constants/GameMappers';
import EventBusTypes from '@/constants/EventBusTypes';
import RequestTypes from '@/constants/RequestTypes';
import PamApiElectron from '@/apis/pam-api-electron';
import emitter from '@/util/eventBus';
import EventSenderService from '@/util/handler/EventSenderService';
import { REQUEST_ISECURE_HASH } from '@/util/handler/EventTypes';

const SESSION_MODULE = moduleTypes.SESSION_STORE_MODULE;
const CONFIG_MODULE = moduleTypes.CONFIGURATION_STORE_MODULE;

const submitWagerState = new Map();

function getGameType(payload) {
  return payload?.gameType || payload?.betslip?.gameType || payload?.data?.gameType;
}

export function useSubmitWagerHandlers() {
  const handleLoading = (loading) => {
    submitWagerState.forEach(({ setSubmitting }) => {
      setSubmitting?.(loading);
    });
  };

  const handlePlaceBetSuccess = (payload) => {
    const gameType = getGameType(payload);
    const state = submitWagerState.get(gameType);
    if (!state) return;

    state.setSubmitting?.(false);
    state.onSuccess?.(payload.data);
  };

  const handlePlaceBetError = (payload) => {
    const gameType = getGameType(payload);
    const state = submitWagerState.get(gameType);
    if (!state) return;

    state.setSubmitting?.(false);
    state.onError?.(payload);
  };

  const handleTokenRefreshNeeded = (payload) => {
    const gameType = getGameType(payload);
    const state = submitWagerState.get(gameType);
    if (!state) return;

    const api = state.getApi?.();
    const ssbtId = state.getSsbtId?.();
    if (api && ssbtId) {
      api.getAccessToken(ssbtId, RequestTypes.GET_ACCESS_TOKEN_FOR_PLACE_BET, gameType, payload.betslip);
    }
  };

  const handlePlaceBetRetry = (payload) => {
    const gameType = getGameType(payload);
    const state = submitWagerState.get(gameType);
    if (!state) return;

    const api = state.getApi?.();
    if (api) {
      api.placeBet({ accessToken: payload.accessToken, gameType, betslip: payload.betslip });
    }
  };

  return {
    handleLoading,
    handlePlaceBetSuccess,
    handlePlaceBetError,
    handleTokenRefreshNeeded,
    handlePlaceBetRetry,
  };
}

export function useSubmitWager(gameType) {
  const store = useStore();

  const isSubmitting = ref(false);
  const api = ref(null);

  const configuration = computed(
    () => store.getters[`${CONFIG_MODULE}/${configurationStoreModuleTypes.getters.GET_CONFIGURATION}`]
  );

  const accessToken = computed(
    () => store.getters[`${SESSION_MODULE}/${sessionStoreModuleTypes.getters.GET_ACCESS_TOKEN}`]
  );

  const ssbtId = computed(() => store.getters[`${SESSION_MODULE}/${sessionStoreModuleTypes.getters.GET_SSBT_ID}`]);

  const activeSession = computed(
    () => store.getters[`${SESSION_MODULE}/${sessionStoreModuleTypes.getters.GET_ACTIVE_SESSION}`]
  );

  const isSalesClosed = computed(() => {
    const getter = IS_SALES_CLOSED_GETTER_MAPPER[gameType];
    return getter ? store.getters[getter] : false;
  });

  const isSalesOpen = computed(() => !isSalesClosed.value);

  let onSuccessCallback = null;
  let onErrorCallback = null;

  const getError = (isBetslipValid) => {
    if (!activeSession.value) return 'placeBetInfoMsg1';
    if (!isBetslipValid) return 'placeBetInfoMsg2';
    if (isSalesClosed.value) return SALES_STOPPED_ERROR_MAPPER[gameType] || 'salesStopped';
    return null;
  };

  const setSubmittingState = (value) => {
    isSubmitting.value = value;
    emitter.emit(EventBusTypes.PLACE_BET_LOADING, value);
  };

  const submitWager = async ({ betslip, isBetslipValid, onSuccess, onError }) => {
    const error = getError(isBetslipValid);

    if (error || isSubmitting.value) {
      if (onError) onError({ errorCode: error, message: error });
      return;
    }

    const rawBetslip = toRaw(betslip);
    onSuccessCallback = onSuccess;
    onErrorCallback = onError;

    submitWagerState.set(gameType, {
      onSuccess: (data) => onSuccessCallback?.(data),
      onError: (err) => onErrorCallback?.(err),
      setSubmitting: (val) => {
        isSubmitting.value = val;
      },
      getApi: () => api.value,
      getSsbtId: () => ssbtId.value,
    });

    setSubmittingState(true);

    try {
      const iSecure = await EventSenderService.sendSyncRequest(REQUEST_ISECURE_HASH);
      if (iSecure?.hashes) {
        rawBetslip.setISecureTokens(iSecure.hashes);
      }

      api.value.placeBet({ accessToken: accessToken.value, gameType, betslip: rawBetslip });
    } catch (err) {
      console.error('Submit wager error:', err);
      setSubmittingState(false);
      if (onError) onError({ errorCode: 'SUBMIT_ERROR', message: err.message });
    }
  };

  onMounted(() => {
    if (configuration.value) {
      api.value = new PamApiElectron(configuration.value);
    }
  });

  onBeforeUnmount(() => {
    submitWagerState.delete(gameType);
  });

  return {
    isSubmitting,
    isSalesOpen,
    isSalesClosed,
    activeSession,
    getError,
    submitWager,
  };
}
