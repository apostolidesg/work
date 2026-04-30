<script setup>
import { computed, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import TheHeader from '@/components/header/TheHeader.vue';
import TheSidebar from '@/components/TheSidebar.vue';
import TheFooter from '@/components/TheFooter.vue';
import MaintenancePanel from '@/components/maintenancePanel/MaintenancePanel.vue';
import { EXTERNAL_ASSETS } from '@/config/appConfig';
import { useCmsConfigPolling } from '@/composables/useCmsConfigPolling';
import initializeElectronEventHandlers from '@/util/handler/EventHandlers';
import ROUTE_NAMES from './constants/routeNames';
import { useIdle } from '@/composables/useIdle';
import initializeRequestHandlers from '@/util/handler/RequestHandler';
import initializeEventBusHandlers from '@/util/handler/EventBusHandler';
import { useAuth } from '@/composables/useAuth';
import RequestTypes from '@/constants/RequestTypes';
import emitter from '@/util/eventBus';
import EventBusTypes from '@/constants/EventBusTypes';
import HALApplicationTypes from '@/constants/HALApplicationTypes';
import MODE from '@/constants/modes';
import ModalContainer from '@/components/modals/ModalContainer.vue';
import GlobalLoader from '@/components/GlobalLoader.vue';
import { useGlobalLoader } from '@/composables/useGlobalLoader';
import { useOrientation } from '@/composables/useOrientation';
import { useConfiguration } from '@/composables/useConfiguration';

initializeElectronEventHandlers();
initializeRequestHandlers();
initializeEventBusHandlers();
useCmsConfigPolling();
// useIdle(); // TODO: re-enable before pushing

const { isVisible } = useGlobalLoader();
const { isVertical } = useOrientation();
const { appConfig } = useConfiguration();

const { getAccessToken } = useAuth();
getAccessToken(RequestTypes.GET_SSBT_TOKEN_AFTER_SWITCH);

const router = useRouter();
const route = useRoute();

const isSidebarExpanded = ref(false);

const currentMode = computed(() => {
  if (route.path.startsWith('/pro')) return MODE.PRO;
  return MODE.EASY;
});

const themeClass = computed(() => (currentMode.value === MODE.PRO ? 'theme-dark' : ''));

const routeToKeyMap = {
  [ROUTE_NAMES.EASY_HOME]: 'nav.home',
  [ROUTE_NAMES.EASY_GAMES]: 'nav.games',
  [ROUTE_NAMES.EASY_REWARDS]: 'nav.rewards',
  [ROUTE_NAMES.EASY_HELP]: 'nav.help',
  [ROUTE_NAMES.EASY_SETTINGS]: 'nav.settings',
  [ROUTE_NAMES.EASY_PRIVACY]: 'nav.privacy',
  [ROUTE_NAMES.PRO_HOME]: 'nav.home',
  [ROUTE_NAMES.PRO_GAMES]: 'nav.games',
  [ROUTE_NAMES.PRO_REWARDS]: 'nav.rewards',
  [ROUTE_NAMES.PRO_HELP]: 'nav.help',
  [ROUTE_NAMES.PRO_SETTINGS]: 'nav.settings',
  [ROUTE_NAMES.PRO_PRIVACY]: 'nav.privacy',
};

const backgroundAsset = computed(() => {
  const lobby = appConfig.value.LOBBY;

  if (currentMode.value === MODE.PRO) {
    return lobby?.PRO?.HORIZONTAL?.BACKGROUND_IMAGE || EXTERNAL_ASSETS.proBackground;
  }

  if (isVertical.value) {
    return lobby?.EASY?.VERTICAL?.BACKGROUND_IMAGE || EXTERNAL_ASSETS.easyVerticalBackground;
  }

  return lobby?.EASY?.HORIZONTAL?.BACKGROUND_IMAGE || EXTERNAL_ASSETS.easyHorizontalBackground;
});

const isCssColor = (value) => {
  if (!value) return false;
  const normalized = String(value).trim();

  if (!normalized) return false;
  if (typeof CSS === 'undefined' || typeof CSS.supports !== 'function') return false;

  return CSS.supports('color', normalized);
};

const backgroundStyle = computed(() => {
  const asset = backgroundAsset.value;

  if (!asset) return {};

  if (isCssColor(asset)) {
    return {
      backgroundColor: asset,
    };
  }

  if (currentMode.value === MODE.PRO || !isVertical.value) {
    return {
      backgroundImage: `url("${asset}")`,
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    };
  }

  return {
    backgroundImage: [`url("${asset}")`, 'linear-gradient(180deg, #55b2de 26.46%, #0bf 88.2%)'].join(', '),
    backgroundPosition: 'center calc(100% - 237px), 0 0',
    backgroundRepeat: 'no-repeat, no-repeat',
    backgroundSize: 'auto, 100% 100%',
    backgroundBlendMode: 'soft-light, normal',
  };
});

const currentPageKey = computed(() => {
  return routeToKeyMap[route.name] || 'nav.home';
});

const toggleSidebar = () => {
  isSidebarExpanded.value = !isSidebarExpanded.value;
};

const navigateTo = (key) => {
  const pageName = key.split('.')[1];
  const routeName = `${currentMode.value}-${pageName}`;
  router.push({ name: routeName });
};

const navigateToHome = () => {
  router.push({ name: `${currentMode.value}-home` });
};

const handleModeChange = (newMode) => {
  if (newMode === currentMode.value) return;
  const pageName = currentPageKey.value.split('.')[1];
  const routeName = `${newMode}-${pageName}`;
  router.push({ name: routeName });
};

const switchApplication = () => {
  emitter.emit(EventBusTypes.SWITCH_TO_APPLICATION_OK, HALApplicationTypes.DIGITAL_PAY);
};

const cashOut = () => {
  emitter.emit(EventBusTypes.DO_CASHOUT, false);
};
</script>

<template>
  <div class="atw:min-h-screen atw:overflow-x-hidden" :class="themeClass" :style="backgroundStyle">
    <TheSidebar
      :expanded="isSidebarExpanded"
      :current-page="currentPageKey"
      @toggle="toggleSidebar"
      @navigate="navigateTo" />

    <TheHeader
      :mode="currentMode"
      :sidebar-expanded="isSidebarExpanded"
      @logo-click="navigateToHome"
      @mode-change="handleModeChange"
      @switch-application="switchApplication"
      @cash-out="cashOut" />

    <main id="main-content" class="main-content" role="main" aria-label="Main content">
      <router-view />
    </main>

    <TheFooter />
    <MaintenancePanel />
    <ModalContainer />
    <GlobalLoader :visible="isVisible" />
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.main-content {
  @apply atw:ml-20 atw:min-h-screen atw:pt-[100px] atw:transition-all atw:duration-300 atw:ease-in-out atw:overflow-x-hidden;
}
</style>
