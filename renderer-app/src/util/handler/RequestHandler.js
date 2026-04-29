import { onUnmounted } from 'vue';
import emitter from '@/util/eventBus';
import RequestTypes from '@/constants/RequestTypes';
import { useRequestCallback } from '@/composables/useRequestCallback';

export default function initializeRequestHandlers() {
  const {
    handleGetTokenAfterAppSwitchResponse,
    handleLogoutResponse,
    handleBalanceResponse,
    getTokenResponseForBalance,
    handleCashoutResponse,
    handlePlaceBetResponse,
    handleGetTokenForPlaceBetResponse,
    handleFindWinningsResponse,
    handleGetAccessTokenResponse,
  } = useRequestCallback();

  emitter.on(RequestTypes.GET_SSBT_TOKEN_AFTER_SWITCH, handleGetTokenAfterAppSwitchResponse);
  emitter.on(RequestTypes.LOG_OUT, handleLogoutResponse);
  emitter.on(RequestTypes.GET_BALANCE, handleBalanceResponse);
  emitter.on(RequestTypes.GET_ACCESS_TOKEN_FOR_BALANCE, getTokenResponseForBalance);
  emitter.on(RequestTypes.CASH_OUT, handleCashoutResponse);

  emitter.on(RequestTypes.PLACE_BET, handlePlaceBetResponse);
  emitter.on(RequestTypes.GET_ACCESS_TOKEN_FOR_PLACE_BET, handleGetTokenForPlaceBetResponse);
  emitter.on(RequestTypes.FIND_WINNINGS, handleFindWinningsResponse);
  emitter.on(RequestTypes.GET_ACCESS_TOKEN_FOR_FIND_WINNINGS, handleGetAccessTokenResponse);

  onUnmounted(() => {
    emitter.off(RequestTypes.GET_SSBT_TOKEN_AFTER_SWITCH);
    emitter.off(RequestTypes.LOG_OUT);
    emitter.off(RequestTypes.GET_BALANCE);
    emitter.off(RequestTypes.GET_ACCESS_TOKEN_FOR_BALANCE);
    emitter.off(RequestTypes.CASH_OUT);
    emitter.off(RequestTypes.PLACE_BET);
    emitter.off(RequestTypes.GET_ACCESS_TOKEN_FOR_PLACE_BET);
    emitter.off(RequestTypes.FIND_WINNINGS);
    emitter.off(RequestTypes.GET_ACCESS_TOKEN_FOR_FIND_WINNINGS);
  });
}
