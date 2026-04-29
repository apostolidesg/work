<script setup>
import { computed } from 'vue';
import EurojackpotQuickPick from './EurojackpotQuickpick.vue';
import EurojackpotSystems from './EurojackpotSystems.vue';
import EurojackpotNextDrawWrapper from './EurojackpotNextDrawWrapper.vue';
import { useEurojackpot } from '@/composables/useEurojackpot';

const { selectedBoard, salesCloseTime, isSalesOpen, toggleQuickPick, setSystem } = useEurojackpot();

const selectedSystemId = computed(() => selectedBoard.value?.systemId || null);

const showNextDraw = computed(() => isSalesOpen.value && salesCloseTime.value);

const salesCloseTimeDate = computed(() => {
  return salesCloseTime.value ? new Date(salesCloseTime.value) : null;
});

const handleQuickPick = () => {
  toggleQuickPick();
};

const handleSystemClick = (systemId) => {
  setSystem(systemId);
};
</script>

<template>
  <div class="eurojackpot-settings">
    <div class="eurojackpot-settings__quickpick">
      <EurojackpotQuickPick @quick-pick-click="handleQuickPick" />
    </div>
    <div class="eurojackpot-settings__line"></div>
    <div class="eurojackpot-settings__systems">
      <EurojackpotSystems :active-system-id="selectedSystemId" @system-click="handleSystemClick" />
    </div>
    <div v-if="showNextDraw" class="eurojackpot-settings__next-draw">
      <EurojackpotNextDrawWrapper :sales-close-time="salesCloseTimeDate" />
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.eurojackpot-settings {
  @apply atw:flex atw:flex-col atw:h-full;
  padding: 20px 15px 15px 15px;
  background: rgba(45, 33, 11, 0.3) var(--ejp-gradient-light);
  background-blend-mode: multiply;
}

.eurojackpot-settings__quickpick {
  @apply atw:w-full atw:mb-4;
}

.eurojackpot-settings__line {
  @apply atw:w-full atw:mb-4;
  height: 1px;
  opacity: 0.3;
  background-color: var(--ejp-color-third-brown);
}

.eurojackpot-settings__systems {
  @apply atw:w-full;
}

.eurojackpot-settings__next-draw {
  @apply atw:mt-auto atw:flex atw:justify-center;
}
</style>
