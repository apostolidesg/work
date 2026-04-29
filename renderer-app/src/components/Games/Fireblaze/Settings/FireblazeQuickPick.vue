<script setup>
import { getCurrentInstance } from 'vue';
import quickPickIcon from '@/assets/fireblaze/quickPick.svg';

defineEmits(['quick-pick-click']);

const instance = getCurrentInstance();
const t = (key) => instance?.proxy?.$t(key) ?? key;
</script>

<template>
  <div class="fireblaze-quickpick">
    <div class="fireblaze-quickpick__info">
      {{ t('fireblaze.quickPickInfo') }}
    </div>
    <button id="fireblaze-quickpick-btn" class="fireblaze-quickpick__button" @click="$emit('quick-pick-click')">
      <div class="fireblaze-quickpick__button-info">{{ t('fireblaze.quickPickInfoButtonInfo') }}</div>
      <img :src="quickPickIcon" alt="quick pick" width="30" height="30" />
    </button>
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.fireblaze-quickpick {
  @apply atw:flex atw:flex-col;
}

.fireblaze-quickpick__info {
  @apply atw:mb-2;
  font-size: 13.5px;
  font-weight: 500;
}

.fireblaze-quickpick__button {
  @apply atw:w-full atw:flex atw:justify-center atw:items-center atw:cursor-pointer;
  background: var(--fireblaze-gradient-dark-pink-purple);
  border: solid 2px var(--fireblaze-color-primary-white);
  border-radius: 8px;
  padding: 1em;
  color: var(--fireblaze-color-primary-white);
}

.fireblaze-quickpick__button-info {
  margin: 0 1em;
  font-family: 'Roboto', sans-serif;
  font-weight: 900;
}
</style>
