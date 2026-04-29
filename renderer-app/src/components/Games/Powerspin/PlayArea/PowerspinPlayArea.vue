<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import emitter from '@/util/eventBus';
import EventBusTypes from '@/constants/EventBusTypes';
import Constants from '@/util/Constants';

import PowerspinPlayHeader from './PowerspinPlayHeader.vue';
import PlayWheels from './PlayWheels.vue';
import PlayMarkets from './PlayMarkets.vue';

const playMode = ref(Constants.POWERSPIN_PLAY_MODE.WHEELS);

const currentComponent = computed(() => {
  return playMode.value === Constants.POWERSPIN_PLAY_MODE.WHEELS ? PlayWheels : PlayMarkets;
});

function handleModeChange(mode) {
  playMode.value = mode;
}

onMounted(() => {
  emitter.on(EventBusTypes.SWITCH_POWERSPIN_PLAY_MODE, handleModeChange);
});

onBeforeUnmount(() => {
  emitter.off(EventBusTypes.SWITCH_POWERSPIN_PLAY_MODE, handleModeChange);
});
</script>

<template>
  <div class="powerspin-play-area">
    <PowerspinPlayHeader :mode="playMode" @mode-changed="handleModeChange" />
    <div class="powerspin-play-area__content">
      <component :is="currentComponent" />
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.powerspin-play-area {
  @apply atw:h-full atw:flex atw:flex-col;
}

.powerspin-play-area__content {
  @apply atw:flex-1 atw:overflow-hidden;
}
</style>
