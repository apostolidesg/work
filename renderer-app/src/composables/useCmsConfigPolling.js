import { ref, onMounted, onUnmounted, watch } from 'vue';
import { getElectronEnv } from '@/util/configLoader';
import { useConfiguration } from '@/composables/useConfiguration';
import { useSession } from '@/composables/useSession';

const CMS_CONFIG_REFETCH_INTERVAL = 1000 * 60 * 60; // 1 hour

export function useCmsConfigPolling() {
  const { initConfiguration } = useConfiguration();
  const { isIdle } = useSession();

  const cmsApiCallTimer = ref(null);
  const queuedCmsApiCall = ref(null);

  const fetchCmsConfig = async () => {
    const electronEnv = await getElectronEnv();
    await initConfiguration(electronEnv);
  };

  const scheduleCmsApiCall = () => {
    clearTimeout(cmsApiCallTimer.value);
    cmsApiCallTimer.value = setTimeout(() => {
      if (isIdle.value) {
        fetchCmsConfig();
      } else {
        queuedCmsApiCall.value = fetchCmsConfig;
      }
      scheduleCmsApiCall();
    }, CMS_CONFIG_REFETCH_INTERVAL);
  };

  onMounted(() => {
    scheduleCmsApiCall();
  });

  onUnmounted(() => {
    clearTimeout(cmsApiCallTimer.value);
  });

  watch(isIdle, (newValue) => {
    if (newValue && queuedCmsApiCall.value) {
      queuedCmsApiCall.value();
      queuedCmsApiCall.value = null;
    }
  });
}
