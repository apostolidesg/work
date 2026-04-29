<script setup>
import { computed } from 'vue';
import { usePowerspin } from '@/composables/usePowerspin';
import { useModalService } from '@/composables/useModalService';
import Constants from '@/util/Constants';
import PowerspinConstants from '@/util/powerspin/Constants';

import Stepper from './Stepper.vue';
import MarketsButton from './MarketsButton.vue';

const props = defineProps({
  mode: {
    type: String,
    required: true,
    validator: (value) => Object.values(Constants.POWERSPIN_PLAY_MODE).includes(value),
  },
});

const emit = defineEmits(['mode-changed']);

const { wheels, markets, addWheel, removeWheel } = usePowerspin();
const { info } = useModalService();

const isMarketsActiveAndHasMarketSelection = computed(() => {
  return props.mode === Constants.POWERSPIN_PLAY_MODE.MARKETS || !markets.value?.isEmpty();
});

const isStepperActive = computed(() => props.mode === Constants.POWERSPIN_PLAY_MODE.WHEELS);

const areAllWheelsPresent = computed(() => wheels.value?.length === PowerspinConstants.MAX_WHEELS);

function handleAddWheels(wheelsToAdd = 0) {
  if (!isStepperActive.value) return;

  const firstWheel = wheels.value?.[0];
  const numberBoard = firstWheel?.getNumberBoard?.();
  const requested = numberBoard?.panels?.[0]?.requested || [];

  const hasMultipleRequested = PowerspinConstants.REQUESTED_NUMBERS.slice(1).some((num) => requested.includes(num));

  if (hasMultipleRequested) {
    info({ message: 'powerspinRequestedNumbersNotAllowedInCombo' });
  } else {
    for (let i = 0; i < wheelsToAdd; i++) {
      addWheel();
    }
  }
}

function handleRemoveWheels(index) {
  if (!isStepperActive.value) return;
  const wheelsCount = wheels.value?.length || 0;
  for (let i = wheelsCount - 1; i > index; i--) {
    removeWheel(i);
  }
}

function handleLogoClick() {
  if (!isStepperActive.value) {
    emit('mode-changed', Constants.POWERSPIN_PLAY_MODE.WHEELS);
  }
}

function handleMarketsButtonClick() {
  const newMode =
    props.mode === Constants.POWERSPIN_PLAY_MODE.MARKETS
      ? Constants.POWERSPIN_PLAY_MODE.WHEELS
      : Constants.POWERSPIN_PLAY_MODE.MARKETS;
  emit('mode-changed', newMode);
}
</script>

<template>
  <div class="powerspin-header" :class="{ 'powerspin-header--dark': areAllWheelsPresent && isStepperActive }">
    <Stepper
      :wheels="wheels || []"
      :is-active="isStepperActive"
      @add-wheels="handleAddWheels"
      @remove-wheels-after-index="handleRemoveWheels"
      @logo-click="handleLogoClick" />
    <div class="powerspin-header__markets-button">
      <MarketsButton :active="isMarketsActiveAndHasMarketSelection" @click="handleMarketsButtonClick" />
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.powerspin-header {
  @apply atw:flex atw:flex-row;
  background: linear-gradient(180deg, #d3edfd 0%, #f5fbfe 14.06%, #f4fafe 89.58%, #d3edfd 100%);
}

.powerspin-header--dark {
  background: linear-gradient(180deg, #17277c 0%, #1b2f9e 15.1%, #1b2f9e 85.42%, #17277c 100%);
}

.powerspin-header__markets-button {
  @apply atw:m-2;
}
</style>
