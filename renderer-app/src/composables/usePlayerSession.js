import { computed } from 'vue';
import { useStore } from 'vuex';
import playerSessionModuleTypes from '@/store/modules/PlayerBetslipsSessionModule/types';
import moduleTypes from '@/store/modules/types/types';

const MODULE_PATH = moduleTypes.PLAYER_SESSION_MODULE;

export function usePlayerSession() {
  const store = useStore();

  const getIsNotBetslipInSession = computed(
    () => store.getters[`${MODULE_PATH}/${playerSessionModuleTypes.getters.GET_IS_NOT_BETSLIP_IN_SESSION}`]
  );

  const getIsActiveLiveDrawScreen = computed(
    () => store.getters[`${MODULE_PATH}/${playerSessionModuleTypes.getters.GET_IS_ACTIVE_LIVE_DRAW_SCREEN}`]
  );

  const setNextDrawIdForImportedBetslip = (nextDrawId) =>
    store.dispatch(
      `${MODULE_PATH}/${playerSessionModuleTypes.actions.SET_NEXT_DRAW_ID_FOR_IMPORTED_BETSLIP}`,
      nextDrawId
    );

  const clearNextDrawIdForImportedBetslip = () =>
    store.dispatch(`${MODULE_PATH}/${playerSessionModuleTypes.actions.CLEAR_NEXT_DRAW_ID_FOR_IMPORTED_BETSLIP}`);

  const disableLiveDrawScreen = () =>
    store.dispatch(`${MODULE_PATH}/${playerSessionModuleTypes.actions.DISABLE_LIVE_DRAW_SCREEN}`);

  return {
    getIsNotBetslipInSession,
    getIsActiveLiveDrawScreen,
    setNextDrawIdForImportedBetslip,
    clearNextDrawIdForImportedBetslip,
    disableLiveDrawScreen,
  };
}
