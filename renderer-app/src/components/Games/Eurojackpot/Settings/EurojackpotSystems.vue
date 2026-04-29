<script setup>
import { getCurrentInstance } from 'vue';
import EurojackpotSystemButton from './EurojackpotSystemButton.vue';
import EurojackpotConstants from '@/util/eurojackpot/Constants.js';
import { useEurojackpot } from '@/composables/useEurojackpot';

const props = defineProps({
  activeSystemId: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(['system-click']);

const { isActiveDrawExtra } = useEurojackpot();

const instance = getCurrentInstance();
const t = (key) => instance?.proxy?.$t(key) ?? key;

const systems = EurojackpotConstants.SYSTEMS;

const handleSystemClick = (systemId) => {
  emit('system-click', systemId);
};
</script>

<template>
  <div class="eurojackpot-systems" :class="{ 'eurojackpot-systems--extra-background': isActiveDrawExtra }">
    <div class="eurojackpot-systems__header">
      <div class="eurojackpot-systems__header-title">{{ t('eurojackpot.systems') }}</div>
      <div class="eurojackpot-systems__header-info">{{ t('eurojackpot.systemsInfo') }}</div>
    </div>
    <div class="eurojackpot-systems__numbers">
      <div v-for="(system, systemId) in systems" :key="systemId" class="eurojackpot-systems__item">
        <div class="eurojackpot-systems__system-row">
          <EurojackpotSystemButton
            :id="`ejp-system-btn-${systemId}`"
            :active="systemId === activeSystemId"
            @click="handleSystemClick(systemId)">
            {{ systemId }}
          </EurojackpotSystemButton>
          <div class="eurojackpot-systems__column-info">
            <div class="eurojackpot-systems__column-title">{{ t('eurojackpot.columns') }}</div>
            <div class="eurojackpot-systems__column-value">{{ system.columns }}</div>
          </div>
        </div>
        <div class="eurojackpot-systems__line"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.eurojackpot-systems {
  @apply atw:flex atw:flex-col atw:bg-transparent;
  font-family: 'Roboto', sans-serif;
}

.eurojackpot-systems--extra-background {
  @apply atw:py-2 atw:px-3 atw:rounded;
  background: linear-gradient(180deg, #ebc17d 0%, #bc7c33 100%);
  background-blend-mode: multiply;
}

.eurojackpot-systems__header {
  @apply atw:mb-5;
  font-size: 13.5px;
  line-height: normal;
  font-weight: 500;
  color: var(--ejp-color-secondary-brown);
}

.eurojackpot-systems__header-title {
  @apply atw:font-black atw:uppercase atw:mb-0.5;
}

.eurojackpot-systems__header-info {
  font-size: 12px;
}

.eurojackpot-systems__numbers {
  @apply atw:grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-flow: column;
  gap: 10px;
  grid-template-rows: repeat(5, auto);
}

.eurojackpot-systems__item {
  @apply atw:flex atw:flex-col;
}

.eurojackpot-systems__system-row {
  @apply atw:flex atw:flex-row;
}

.eurojackpot-systems__column-info {
  @apply atw:flex atw:flex-col atw:justify-center atw:ml-1;
  color: var(--ejp-color-secondary-brown);
  font-size: 11px;
  font-weight: 500;
}

.eurojackpot-systems__column-title {
  font-size: 10px;
}

.eurojackpot-systems__column-value {
  @apply atw:font-black;
  font-size: 12px;
}

.eurojackpot-systems__line {
  @apply atw:w-full;
  background-color: var(--ejp-color-third-gold);
  opacity: 0.3;
  height: 2px;
  margin: 10px 0px 5px 2px;
}
</style>
