import { ref } from 'vue';
import { useConfiguration } from '@/composables/useConfiguration';
import { useSession } from '@/composables/useSession';
import PamApiElectron from '@/apis/pam-api-electron';
import { useGlobalLoader } from '@/composables/useGlobalLoader';

const shouldTriggerPlaceBetToSessionIM = ref(false);
const isInstantWin = ref(false);
const zeroBalanceOnCashOutOrSwitchApp = ref(false);

export function useBalance() {
  const { appConfig } = useConfiguration();
  const api = ref(null);
  api.value = new PamApiElectron(appConfig.value);
  const { accessToken } = useSession();
  const loader = useGlobalLoader();

  const getBalance = () => {
    api.value.getBalance(accessToken.value);
  };

  const cashOut = (switchApp) => {
    loader.show();
    api.value.cashOut(accessToken.value, switchApp);
  };

  const updateBalance = ({ triggerPlaceBetToSessionIM = false, instantWin = false } = {}) => {
    shouldTriggerPlaceBetToSessionIM.value = !!triggerPlaceBetToSessionIM;
    isInstantWin.value = instantWin;
    getBalance();
  };

  const checkShouldTriggerPlaceBetToSessionIM = ({ balance = 0 }) => {
    shouldTriggerPlaceBetToSessionIM.value && balance > 0 && triggerPlaceBetToSessionIM();
    shouldTriggerPlaceBetToSessionIM.value = false;
  };

  const triggerPlaceBetToSessionIM = () => {
    // TODO triggerInfoModal
    // this.triggerInfoModal(
    //   this.lobbyHeaderMixin_isInstantWin
    //     ? infoModalMessages.instantWinInformativeNextDrawBets
    //     : SUCCESSFUL_BET_MSG_WRAPPER[this.$_lobbyHeaderMixin_gameType],
    //   null,
    //   true
    // );
  };

  return {
    updateBalance,
    checkShouldTriggerPlaceBetToSessionIM,
    shouldTriggerPlaceBetToSessionIM,
    isInstantWin,
    zeroBalanceOnCashOutOrSwitchApp,
    cashOut,
  };
}
