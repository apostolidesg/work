<script setup>
import { getCurrentInstance } from 'vue';
import quickPickIcon from '@/assets/eurojackpot/quickpick.svg';
import { useEurojackpot } from '@/composables/useEurojackpot';

defineEmits(['quick-pick-click']);

const { isActiveDrawExtra } = useEurojackpot();

const instance = getCurrentInstance();
const t = (key) => instance?.proxy?.$t(key) ?? key;
</script>

<template>
  <div class="eurojackpot-quickpick">
    <div class="eurojackpot-quickpick__info" :class="{ 'eurojackpot-quickpick__info--extra': isActiveDrawExtra }">
      {{ t('eurojackpot.quickPickInfo') }}
    </div>
    <button id="ejp-quickpick-btn" class="eurojackpot-quickpick__button" @click="$emit('quick-pick-click')">
      <span class="eurojackpot-quickpick__button-text">{{ t('eurojackpot.quickPickInfoButtonInfo') }}</span>
      <img :src="quickPickIcon" alt="quick pick" width="30" height="30" />
    </button>
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.eurojackpot-quickpick {
  @apply atw:bg-transparent;
  font-family: 'Roboto', sans-serif;
  font-size: 13.5px;
  line-height: normal;
  color: var(--ejp-color-secondary-brown);
  font-weight: 500;
}

.eurojackpot-quickpick__info {
  @apply atw:mb-2;
}

.eurojackpot-quickpick__info--extra {
  @apply atw:text-white;
}

.eurojackpot-quickpick__button {
  @apply atw:w-full atw:inline-flex atw:justify-center atw:items-center atw:cursor-pointer;
  height: 68px;
  border: 2px solid var(--ejp-color-secondary-brown);
  border-radius: 8px;
  background: linear-gradient(180deg, var(--ejp-color-secondary-gold) 0%, var(--ejp-color-third-brown) 130%);
  font-family: 'Roboto', sans-serif;
  font-weight: 900;
}

.eurojackpot-quickpick__button:hover {
  opacity: 0.9;
}

.eurojackpot-quickpick__button-text {
  @apply atw:mr-3;
}
</style>
