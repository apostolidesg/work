<script setup>
import { computed } from 'vue';
import BaseSidescreen from '@/components/Common/BaseSidescreen.vue';
import EurojackpotSelectionsList from './EurojackpotSelectionsList.vue';
import { useEurojackpot } from '@/composables/useEurojackpot';
import { useSubmitWager } from '@/composables/useSubmitWager';
import Constants from '@/util/Constants';
import EurojackpotConstants from '@/util/eurojackpot/Constants.js';

const { betslip, betslipCost, isBetslipValid, consecutiveDraws, isActiveDrawExtra, setConsecutiveDraws } =
  useEurojackpot();

const { isSubmitting, isSalesClosed, getError, submitWager } = useSubmitWager(Constants.GENERAL_GAME_TYPES.EUROJACKPOT);

const maxConsecutiveDraws = EurojackpotConstants.MAX_CONSECUTIVE_DRAWS || 52;

const submitError = computed(() => getError(isBetslipValid.value));

const handleConsecutiveDrawsChange = (value) => {
  setConsecutiveDraws(value);
};

const handleSubmit = () => {
  submitWager({
    betslip: betslip.value,
    isBetslipValid: isBetslipValid.value,
    onSuccess: () => {
      console.log('Bet placed successfully!');
    },
    onError: (error) => {
      console.error('Bet placement failed:', error);
    },
  });
};
</script>

<template>
  <div class="eurojackpot-sidescreen">
    <BaseSidescreen
      theme="dark"
      :betslip-cost="betslipCost"
      :is-betslip-valid="isBetslipValid && !submitError"
      :max-consecutive-draws="maxConsecutiveDraws"
      :consecutive-draws="consecutiveDraws"
      :is-active-draw-extra="isActiveDrawExtra"
      game-type="eurojackpot"
      @update:consecutive-draws="handleConsecutiveDrawsChange"
      @submit="handleSubmit">
      <template #default>
        <EurojackpotSelectionsList />
      </template>
    </BaseSidescreen>
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.eurojackpot-sidescreen {
  @apply atw:h-full;
  background: rgba(45, 33, 11, 0.3) var(--ejp-gradient-light);
  background-blend-mode: multiply;
  font-family: 'Roboto', sans-serif;
}
</style>
