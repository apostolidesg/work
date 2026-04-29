<script setup>
import { useConfigText } from '../composables/useConfigText';
import { computed } from 'vue';
import MasonryGrid from '../components/ProLobby/MasonryGrid.vue';
import ROUTE_NAMES from '@/constants/routeNames';
import gaService from '@/services/gaService';
import gtmEvents from '@/constants/gtmEvents';

const { tConfig } = useConfigText();

const rawImages = tConfig('HORIZONTAL.LOBBY_IMAGES');
const IMAGES = {
  fourthImageToExtend: 3,
};

gaService.sendEvent(gtmEvents.SSBT_DGE_APPLICATION_HOME_PRO_MODE);

const masonryImages = computed(() => {
  const sorted = Object.entries(rawImages)
    .map(([key, item]) => {
      const routeName = ROUTE_NAMES[`PRO_GAME_${key}`];
      return {
        ...item,
        gameId: key,
        src: tConfig(item.src),
        promoText: item.promoText ? tConfig(item.promoText) : '',
        link: routeName ? { name: routeName } : null,
      };
    })
    .filter((item) => !item.hide)
    .sort((a, b) => a.order - b.order);

  if (sorted.length <= 8 && sorted[IMAGES.fourthImageToExtend]) {
    sorted[IMAGES.fourthImageToExtend].span = true;
  }

  return sorted;
});
</script>

<template>
  <MasonryGrid :items="masonryImages" :show-overlay="false" />
</template>
