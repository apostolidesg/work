import { ref } from 'vue';
import { useConfiguration } from '@/composables/useConfiguration';
import { useSession } from '@/composables/useSession';
import PamApiElectron from '@/apis/pam-api-electron';
import { useGlobalLoader } from '@/composables/useGlobalLoader';

export function useAuth() {
  const { appConfig } = useConfiguration();
  const { ssbtId } = useSession();
  const loader = useGlobalLoader();
  const api = ref(null);
  api.value = new PamApiElectron(appConfig.value);

  const getAccessToken = (requestType, ...callbackArgs) => {
    loader.show();
    api.value.getAccessToken(ssbtId.value, requestType, ...callbackArgs);
  };

  const logOut = (accessToken, switchApp, applicationType) => {
    api.value.logOut(accessToken, switchApp, applicationType);
  };
  return { getAccessToken, logOut };
}
