<script setup>
import { computed } from 'vue';
import { useFireblaze } from '@/composables/useFireblaze';
import { useSubmitWager } from '@/composables/useSubmitWager';
import FireblazeConstants from '@/util/fireblaze/Constants';
import Constants from '@/util/Constants';
import BaseSidescreen from '@/components/Common/BaseSidescreen.vue';
import FireblazeSelectionsList from './FireblazeSelectionsList.vue';

const { betslip, betslipCost, isBetslipValid, consecutiveDraws, setConsecutiveDraws, resetBetslip } = useFireblaze();

const { submitWager, getError } = useSubmitWager(Constants.GENERAL_GAME_TYPES.FIREBLAZE);

const submitError = computed(() => getError(isBetslipValid.value));

function handleConsecutiveDrawsChange(value) {
  setConsecutiveDraws(value);
}

function handleSubmit() {
  submitWager({
    betslip: betslip.value,
    isBetslipValid: isBetslipValid.value,
    onSuccess: () => {
      resetBetslip();
    },
    onError: (error) => {
      console.error('Fireblaze bet failed:', error);
    },
  });
}
</script>

<template>
  <div class="fireblaze-sidescreen">
    <BaseSidescreen
      theme="light"
      :betslip-cost="betslipCost"
      :is-betslip-valid="isBetslipValid && !submitError"
      :max-consecutive-draws="FireblazeConstants.MAX_CONSECUTIVE_DRAWS"
      :consecutive-draws="consecutiveDraws"
      game-type="fireblaze"
      @update:consecutive-draws="handleConsecutiveDrawsChange"
      @submit="handleSubmit">
      <template #default>
        <FireblazeSelectionsList />
      </template>
    </BaseSidescreen>
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.fireblaze-sidescreen {
  @apply atw:h-full;
  background: var(--fireblaze-gradient-pink-purple);
  color: var(--fireblaze-color-primary-white);
  font-family: 'Roboto', sans-serif;
}
</style>
