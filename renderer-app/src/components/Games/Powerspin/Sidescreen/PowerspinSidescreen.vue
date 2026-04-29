<script setup>
import { computed, watch } from 'vue';
import { usePowerspin } from '@/composables/usePowerspin';
import { useSubmitWager } from '@/composables/useSubmitWager';
import PowerspinConstants from '@/util/powerspin/Constants';
import Constants from '@/util/Constants';

import BaseSidescreen from '@/components/Common/BaseSidescreen.vue';
import BettingAmount from '@/components/Common/BettingAmount.vue';
import PowerspinSelectionsList from './PowerspinSelectionsList.vue';

const {
  betslipArray,
  selectedBetslip,
  selectedBetslipIndex,
  totalCost,
  isBetslipValid,
  consecutiveDraws,
  wheelsLength,
  addBetslip,
  setConsecutiveDraws,
  setSelectedBetslipIndex,
  removeBetslip,
  resetAllBetslips,
} = usePowerspin();

const { submitWager, isSubmitting } = useSubmitWager(Constants.GENERAL_GAME_TYPES.POWERSPIN);

const notEmptyBetslips = computed(() => {
  if (!betslipArray.value) return [];
  return betslipArray.value.reduce((acc, betslip, index) => {
    if (!betslip.isEmpty()) {
      acc.push({ betslip, index });
    }
    return acc;
  }, []);
});

const canAddBetslip = computed(() => {
  return !betslipArray.value?.[0]?.isEmpty() && betslipArray.value.length < PowerspinConstants.MAX_BETSLIP_COUNT;
});

const isComboMode = computed(() => (wheelsLength.value || 0) > 1);

const comboMultipliers = computed(() => {
  return selectedBetslip.value?.wager?.comboMultipliers || [PowerspinConstants.DEFAULT_MULTIPLIERS];
});

function getTheme(index) {
  return index === selectedBetslipIndex.value ? 'white' : 'blue';
}

function isSimple(betslip) {
  return betslip?.wager?.wheels?.length === 1;
}

function handleBetslipClick(index) {
  setSelectedBetslipIndex(index);
}

function handleAddBetslip() {
  if (canAddBetslip.value) {
    addBetslip();
  }
}

function handleConsecutiveDrawsUpdate(value) {
  setConsecutiveDraws(value);
}

function handleUpdateMultipliers(multiplier) {
  selectedBetslip.value?.toggleComboMultipliers(multiplier);
}

function handleSubmit() {
  if (!selectedBetslip.value || isSubmitting.value) return;

  submitWager({
    betslip: selectedBetslip.value,
    isBetslipValid: isBetslipValid.value,
    onSuccess: (data) => {
      console.log('Powerspin bet placed successfully:', data);
      resetAllBetslips();
    },
    onError: (error) => {
      console.error('Powerspin bet failed:', error);
    },
  });
}

// Watch for removed betslips (when betslip is cleared from play area)
watch(notEmptyBetslips, (newValue, oldValue) => {
  if (oldValue && newValue.length < oldValue.length) {
    const oldIndices = oldValue.map((item) => item.index);
    const newIndices = newValue.map((item) => item.index);
    const removedIndex = oldIndices.find((idx) => !newIndices.includes(idx));

    if (removedIndex !== undefined && selectedBetslipIndex.value !== removedIndex) {
      removeBetslip(removedIndex);
    }
  }
});
</script>

<template>
  <BaseSidescreen
    theme="light"
    :betslip-cost="totalCost"
    :is-betslip-valid="isBetslipValid"
    :consecutive-draws="consecutiveDraws"
    game-type="powerspin"
    @update:consecutive-draws="handleConsecutiveDrawsUpdate"
    @submit="handleSubmit">
    <template #default>
      <PowerspinSelectionsList
        v-for="{ betslip, index } in notEmptyBetslips"
        :key="index"
        :betslip="betslip"
        :betslip-index="index"
        :is-simple="isSimple(betslip)"
        :theme="getTheme(index)"
        @click="handleBetslipClick(index)" />

      <Transition name="fade">
        <button v-if="canAddBetslip" class="sidescreen-content__add-button" @click="handleAddBetslip">
          ΠΡΟΣΘΗΚΗ ΝΕΟΥ ΠΑΙΧΝΙΔΙΟΥ
        </button>
      </Transition>
    </template>

    <template #static>
      <BettingAmount
        v-if="isComboMode"
        :multipliers="PowerspinConstants.MULTIPLIERS_SET"
        :selected-multipliers="comboMultipliers"
        :basic-betting-amount="PowerspinConstants.BASIC_BETTING_AMOUNT"
        theme="blue"
        text-theme="white"
        @update-multipliers="handleUpdateMultipliers" />
    </template>
  </BaseSidescreen>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.sidescreen-content__add-button {
  @apply atw:w-full atw:py-3 atw:mt-2 atw:rounded-lg atw:font-semibold atw:transition-all;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px dashed rgba(255, 255, 255, 0.3);
}

.sidescreen-content__add-button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.fade-enter-active {
  transition: opacity 0.35s;
}

.fade-enter-from {
  opacity: 0;
}
</style>
