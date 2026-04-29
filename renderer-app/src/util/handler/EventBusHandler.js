import { onUnmounted } from 'vue';
import emitter from '@/util/eventBus';
import EventBusTypes from '@/constants/EventBusTypes';
import { useEventBusCallback } from '@/composables/useEventBusCallback';
import { useBalance } from '@/composables/useBalance';
import { useSubmitWagerHandlers } from '@/composables/useSubmitWager';

export default function initializeEventBusHandlers() {
  const { triggerLogOut, switchApplication, doCashout, sendToPrinter, barcodeStatusChanged } = useEventBusCallback();
  const { updateBalance } = useBalance();
  const { handleLoading, handlePlaceBetSuccess, handlePlaceBetError, handleTokenRefreshNeeded, handlePlaceBetRetry } =
    useSubmitWagerHandlers();

  emitter.on(EventBusTypes.TRIGGER_LOGOUT, triggerLogOut);
  emitter.on(EventBusTypes.SWITCH_TO_APPLICATION_OK, switchApplication);
  emitter.on(EventBusTypes.UPDATE_BALANCE, updateBalance);
  emitter.on(EventBusTypes.DO_CASHOUT, doCashout);
  emitter.on(EventBusTypes.PRINT, sendToPrinter);
  emitter.on(EventBusTypes.BARCODE_STATUS_CHANGE, barcodeStatusChanged);
  emitter.on(EventBusTypes.PLACE_BET_LOADING, handleLoading);
  emitter.on(EventBusTypes.PLACE_BET_SUCCESS, handlePlaceBetSuccess);
  emitter.on(EventBusTypes.PLACE_BET_ERROR, handlePlaceBetError);
  emitter.on(EventBusTypes.PLACE_BET_TOKEN_REFRESH_NEEDED, handleTokenRefreshNeeded);
  emitter.on(EventBusTypes.PLACE_BET_RETRY, handlePlaceBetRetry);

  onUnmounted(() => {
    emitter.off(EventBusTypes.TRIGGER_LOGOUT);
    emitter.off(EventBusTypes.SWITCH_TO_APPLICATION_OK);
    emitter.off(EventBusTypes.UPDATE_BALANCE);
    emitter.off(EventBusTypes.DO_CASHOUT);
    emitter.off(EventBusTypes.PRINT);
    emitter.off(EventBusTypes.BARCODE_STATUS_CHANGE);
    emitter.off(EventBusTypes.PLACE_BET_LOADING);
    emitter.off(EventBusTypes.PLACE_BET_SUCCESS);
    emitter.off(EventBusTypes.PLACE_BET_ERROR);
    emitter.off(EventBusTypes.PLACE_BET_TOKEN_REFRESH_NEEDED);
    emitter.off(EventBusTypes.PLACE_BET_RETRY);
  });
}
