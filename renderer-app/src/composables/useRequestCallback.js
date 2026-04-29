import EventBusTypes from '@/constants/EventBusTypes';
import RequestTypes from '@/constants/RequestTypes';
import HttpStatus from 'http-status';
import { useSession } from '@/composables/useSession';
import { useAuth } from '@/composables/useAuth';
import { useBalance } from '@/composables/useBalance';
import { useConfiguration } from './useConfiguration';
import { RESET_BETSLIP_ACTION_MAPPER } from '@/constants/GameMappers';
import emitter from '@/util/eventBus';
import Constants from '@/util/Constants';
import { useI18nPlugin } from '@unify/vuex-i18n';
import store from '@/store/store';
import { useGlobalLoader } from '@/composables/useGlobalLoader';
import { useModalService } from '@/composables/useModalService';
import { infoModalMessages } from '@/util/modalMessages';
import PrizeCheck from '@/model/PrizeCheck';
import TicketStatus from '@/model/TicketStatus';
import Utilities from '@/util/Utilities';
import { useFindWinnings } from '@/composables/useFindWinnings';
import { defineAsyncComponent } from 'vue';

export function useRequestCallback() {
  const { getVoucherMessage } = useConfiguration();
  const { setAccessToken, resetAccessToken, setBalance, resetBalance } = useSession();
  const { getAccessToken } = useAuth();
  const {
    updateBalance,
    checkShouldTriggerPlaceBetToSessionIM,
    shouldTriggerPlaceBetToSessionIM,
    zeroBalanceOnCashOutOrSwitchApp,
  } = useBalance();
  const { locale } = useI18nPlugin();
  const loader = useGlobalLoader();
  const { info, open } = useModalService();
  const { doFindWinnings } = useFindWinnings();

  const handleGetTokenAfterAppSwitchResponse = ({ response }) => {
    if (response.success) {
      if (response.status === HttpStatus.OK) {
        setAccessToken(response.data.access_token);
        updateBalance();
      }
    } else {
      console.warn('ERROR:Could not get token after app switch!');
    }
    loader.hide();
  };

  const handleLogoutResponse = ({ additionalArgs: [switchApp, applicationType] = [] } = {}) => {
    switchApp && (zeroBalanceOnCashOutOrSwitchApp.value = true);
    resetBalance();
    resetAccessToken();
    switchApp && emitter.emit(EventBusTypes.SWITCH_TO_APPLICATION_OK, applicationType);
  };

  const handleBalanceResponse = ({ response }) => {
    if (response.success) {
      const { data: { balance = 0 } = {} } = response || {};
      checkShouldTriggerPlaceBetToSessionIM({ balance });
      setBalance(balance);
    } else if (response.status === HttpStatus.UNAUTHORIZED) {
      getAccessToken(RequestTypes.GET_ACCESS_TOKEN_FOR_BALANCE, shouldTriggerPlaceBetToSessionIM.value);
    } else {
      console.warn('ERROR:Balance Update Failed!');
    }
  };

  const getTokenResponseForBalance = ({ response, additionalArgs: [triggerPlaceBetToSessionIM] = [] } = {}) => {
    if (response.success) {
      if (response.status === HttpStatus.OK) {
        setAccessToken(response.data.access_token);
        updateBalance({ triggerPlaceBetToSessionIM });
      }
    } else {
      info(infoModalMessages.operationFailed);
    }
  };

  const handleCashoutResponse = ({ response, additionalArgs: [switchApp] = [] } = {}) => {
    loader.hide();
    if (response.success) {
      if (response.status < 300) {
        // TODO clearBetslip
        // this.$eventHub.$emit('clearBetslip');
        // this.$_lobbyHeaderMixin_clearSavedBetslip();
        // this.$_lobbyHeaderMixin_resetPowerspinBetslips();
        zeroBalanceOnCashOutOrSwitchApp.value = true;
        response.data.voucherMessage = getVoucherMessage.value[locale()] || '';
        emitter.emit(EventBusTypes.PRINT, { printType: Constants.PRINT_TYPE.VOUCHER, data: response.data });
        !switchApp &&
          info({
            ...infoModalMessages.liveDrawSessionEnd,
            duration: Constants.GENERAL_AUTO_CLOSE_TIMEOUT,
            onClose: () => {
              // TODO redirect to  lobby
            },
          });
        emitter.emit(EventBusTypes.TRIGGER_LOGOUT, { switchApp });
      }
    } else {
      console.log('ERROR:Could not cash out!');
      info(infoModalMessages.operationFailed);
    }
    updateBalance();
  };

  const handlePlaceBetResponse = ({ response, additionalArgs: [gameType, betslip] = [] } = {}) => {
    emitter.emit(EventBusTypes.PLACE_BET_LOADING, false);

    const resolvedGameType = gameType || response?.data?.gameType || betslip?.gameType;

    if (response.success && response.status === HttpStatus.OK) {
      console.log('Place bet successful:', response.data);

      emitter.emit(EventBusTypes.UPDATE_BALANCE, { shouldTriggerPlaceBetToSessionIM: true });

      const resetAction = RESET_BETSLIP_ACTION_MAPPER[resolvedGameType];
      if (resetAction) {
        store.dispatch(resetAction);
      }

      emitter.emit(EventBusTypes.PLACE_BET_SUCCESS, { gameType: resolvedGameType, data: response.data });
    } else if (response.status === HttpStatus.UNAUTHORIZED) {
      emitter.emit(EventBusTypes.PLACE_BET_TOKEN_REFRESH_NEEDED, { gameType: resolvedGameType, betslip });
    } else {
      console.error('Place bet failed:', response);
      emitter.emit(EventBusTypes.UPDATE_BALANCE);
      emitter.emit(EventBusTypes.PLACE_BET_ERROR, {
        gameType: resolvedGameType,
        errorCode: response.status,
        message: response.data?.message || 'Place bet failed',
        response,
      });
    }
  };

  const handleGetTokenForPlaceBetResponse = ({ response, additionalArgs: [gameType, betslip] = [] } = {}) => {
    if (response.success && response.status === HttpStatus.OK) {
      setAccessToken(response.data.access_token);
      emitter.emit(EventBusTypes.PLACE_BET_RETRY, { gameType, accessToken: response.data.access_token, betslip });
    } else {
      console.error('Failed to refresh access token for place bet:', response);
      emitter.emit(EventBusTypes.PLACE_BET_ERROR, {
        gameType,
        errorCode: 'TOKEN_REFRESH_FAILED',
        message: 'Failed to refresh access token',
      });
    }
  };

  const handleFindWinningsResponse = ({ response, additionalArgs: [barcode] = [] } = {}) => {
    let prizeCheck;
    if (response.success) {
      response.data.barcode = barcode;
      prizeCheck = new PrizeCheck(new TicketStatus(response.data));
      open(
        defineAsyncComponent(() => import('@/components/modals/findWinnings/FindWinnings.vue')),
        { prizeCheck }
      );
    } else if (response.status === HttpStatus.UNAUTHORIZED) {
      getAccessToken(RequestTypes.GET_ACCESS_TOKEN_FOR_FIND_WINNINGS, barcode);
    } else if (response.status === HttpStatus.NOT_FOUND || response.status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      const serialNumber = Utilities.serialNumberFromBarcode(barcode);
      if (response.status === HttpStatus.NOT_FOUND) {
        prizeCheck = new PrizeCheck({
          ticket: {
            status: 'INVALID',
          },
        });
      } else if (response.data.errorId === 'BLOCKED_COUPON') {
        prizeCheck = new PrizeCheck({
          ticket: {
            status: 'BLOCKED',
            serialNumber,
          },
        });
      } else if (response.data.errorId === 'CANCELLED_COUPON') {
        prizeCheck = new PrizeCheck({
          ticket: {
            status: 'CANCELLED',
            serialNumber,
          },
        });
      } else if (response.data.errorId === 'SERVER_ERROR') {
        info(infoModalMessages.operationFailed);
        return;
      } else {
        prizeCheck = new PrizeCheck(null, true);
      }
      open(
        defineAsyncComponent(() => import('@/components/modals/findWinnings/FindWinnings.vue')),
        { prizeCheck }
      );
    }
  };

  const handleGetAccessTokenResponse = ({ response, additionalArgs: [barcode] = [] } = {}) => {
    if (response.success) {
      setAccessToken({ accessToken: response.data.access_token });
      doFindWinnings(barcode);
    }
  };

  return {
    handleGetTokenAfterAppSwitchResponse,
    handleLogoutResponse,
    handleBalanceResponse,
    getTokenResponseForBalance,
    handleCashoutResponse,
    handlePlaceBetResponse,
    handleGetTokenForPlaceBetResponse,
    handleFindWinningsResponse,
    handleGetAccessTokenResponse,
  };
}
