import { ref } from 'vue';
import { useConfiguration } from '@/composables/useConfiguration';
import { useSession } from '@/composables/useSession';
import PamApiElectron from '@/apis/pam-api-electron';

export function useFindWinnings() {
  const { appConfig } = useConfiguration();
  const api = ref(null);
  api.value = new PamApiElectron(appConfig.value);
  const { accessToken, ssbtId } = useSession();

  const getFindWinnings = (barcode) => {
    api.value.findWinnings(accessToken.value, ssbtId.value, barcode);
  };

  const doFindWinnings = (barcode) => {
    getFindWinnings(barcode);
  };

  return {
    doFindWinnings,
  };
}
