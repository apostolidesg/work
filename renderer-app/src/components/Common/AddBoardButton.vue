<script setup>
import { computed } from 'vue';

import eurojackpotAddGameIcon from '@/assets/icons/add-game-icon__eurojackpot.png';
import kinoAddGameIcon from '@/assets/icons/add-game-icon__kino.png';
import fireblazeAddGameIcon from '@/assets/icons/add-game-icon__fireblaze.png';

const THEME_ICONS = {
  kino: kinoAddGameIcon,
  eurojackpot: eurojackpotAddGameIcon,
  fireblaze: fireblazeAddGameIcon,
};

const props = defineProps({
  theme: {
    type: String,
    default: 'kino',
    validator: (value) => ['kino', 'eurojackpot', 'fireblaze'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['click']);

const addGameIcon = computed(() => {
  return THEME_ICONS[props.theme];
});
</script>

<template>
  <button class="add-board-button" :class="`add-board-button--${theme}`" :disabled="disabled" @click="$emit('click')">
    <div class="add-board-button__icon">
      <img width="60" :src="addGameIcon" alt="add board" />
    </div>
    <div class="add-board-button__content">
      <slot></slot>
    </div>
  </button>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.add-board-button {
  @apply atw:flex atw:flex-row atw:items-center atw:w-full atw:border-none atw:cursor-pointer;
  height: 80px;
  padding: 10px;
  border-radius: 10px;
  font-family: 'Roboto', sans-serif;
  font-size: 15px;
  font-weight: 900;
}

.add-board-button:disabled {
  @apply atw:cursor-not-allowed;
  opacity: 0.5;
}

.add-board-button--eurojackpot {
  background: var(--ejp-color-button-add-board-background);
  color: var(--ejp-color-button-add-board-text);
}

.add-board-button__icon {
  @apply atw:flex atw:items-center atw:justify-center;
}

.add-board-button__content {
  @apply atw:flex atw:flex-row atw:items-center atw:justify-center atw:flex-1 atw:h-full;
}
</style>
