import { onMounted, ref } from 'vue';
import IdleJs from 'idle-js';
import { useRouter } from 'vue-router';
import gtmEvents from '@/constants/gtmEvents';
import gaService from '@/services/gaService';
import { useOrientation } from '@/composables/useOrientation';
import { useConfiguration } from '@/composables/useConfiguration';
import { useSession } from '@/composables/useSession';

// TODO: Re-enable analytics when ready
const DEFAULT_IDLE_TIME = 30000;

export function useIdle() {
  const router = useRouter();
  const { orientation } = useOrientation();
  const { appConfig } = useConfiguration();
  const { setIsIdle } = useSession();

  const idleInstance = ref(null);
  const idleStartTime = ref(null);
  const sessionStartTime = ref(null);
  const start = () => {
    const isScreensaverEnabled = appConfig.value?.IDLE_SCREEN?.[orientation.value]?.ENABLED;
    const idleTime = appConfig.value?.IDLE_SCREEN?.[orientation.value]?.TIMEOUT;

    sessionStartTime.value = new Date();

    idleInstance.value = new IdleJs({
      idle: idleTime || DEFAULT_IDLE_TIME,
      events: ['mousedown'],
      onIdle: () => {
        idleStartTime.value = new Date();
        const sessionDuration = Math.round((idleStartTime.value - sessionStartTime.value) / 1000);

        gaService.sendEvent(gtmEvents.SSBT_DGE_APPLICATION_IDLE_START, {
          session_duration: sessionDuration,
        });
        setIsIdle(true);
        if (isScreensaverEnabled) {
          //TODO check if IsActiveLiveDrawScreen / Close open modals
          router.push({ name: 'idle-screen' });
        } else {
          router.push({ name: 'easy-home' });
        }
      },
      onActive: () => {
        if (idleStartTime.value) {
          const activeTime = new Date();
          const idleDuration = Math.round((activeTime - idleStartTime.value) / 1000);

          gaService.sendEvent(gtmEvents.SSBT_DGE_APPLICATION_IDLE_END, {
            idle_duration: idleDuration,
          });

          idleStartTime.value = null;
        }

        sessionStartTime.value = new Date();
        setIsIdle(false);
        if (isScreensaverEnabled) {
          router.push({ name: 'easy-home' });
        }
      },
      keepTracking: true,
    });

    idleInstance.value.start();
  };

  onMounted(() => {
    start();
  });
}
