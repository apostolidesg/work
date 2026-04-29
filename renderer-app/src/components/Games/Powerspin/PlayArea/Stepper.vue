<script setup>
import { computed } from 'vue';
import StepperItem from './StepperItem.vue';
import PowerspinLogo from './PowerspinLogo.vue';

import Combo2Dark from '@/assets/powerspin/combo2-dark.svg';
import Combo2White from '@/assets/powerspin/combo2-white.svg';
import Combo2WhiteSelected from '@/assets/powerspin/combo2-white--selected.svg';
import Combo3Dark from '@/assets/powerspin/combo3-dark.svg';
import Combo3White from '@/assets/powerspin/combo3-white.svg';
import Combo3WhiteSelected from '@/assets/powerspin/combo3-white--selected.svg';

const props = defineProps({
  wheels: {
    type: Array,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['logo-click', 'add-wheels', 'remove-wheels-after-index']);

const numOfWheels = computed(() => props.wheels.length);

const STEPS_ARRAY = [
  {
    default: null,
    empty: null,
    notEmpty: null,
  },
  {
    default: Combo2Dark,
    empty: Combo2White,
    notEmpty: Combo2WhiteSelected,
  },
  {
    default: Combo3Dark,
    empty: Combo3White,
    notEmpty: Combo3WhiteSelected,
  },
];

function hasWheelSelections(wheelIndex) {
  return !props.wheels[wheelIndex]?.isEmpty();
}

function isWheelPresent(wheelIndex) {
  return numOfWheels.value >= wheelIndex + 1;
}

function isStepLast(stepIndex) {
  return stepIndex === STEPS_ARRAY.length - 1;
}

function handleArrowClicked(stepIndex) {
  logoSelected(stepIndex + (stepIndex === STEPS_ARRAY.length - 1 ? -1 : 1));
}

function logoSelected(stepIndex) {
  emit('logo-click');
  if (numOfWheels.value > stepIndex + 1) {
    emit('remove-wheels-after-index', stepIndex);
  } else if (numOfWheels.value < stepIndex + 1) {
    const wheelsToAdd = stepIndex + 1 - numOfWheels.value;
    emit('add-wheels', wheelsToAdd);
  }
}

function activeLogo(wheelIndex) {
  if (!props.isActive) {
    return STEPS_ARRAY[wheelIndex].default;
  }
  if (!isWheelPresent(wheelIndex)) {
    return STEPS_ARRAY[wheelIndex].default;
  }
  if (!hasWheelSelections(wheelIndex)) {
    return STEPS_ARRAY[wheelIndex].empty;
  }
  return STEPS_ARRAY[wheelIndex].notEmpty;
}

function logoConfig(stepIndex) {
  return stepIndex === 0 ? { isSelected: hasWheelSelections(stepIndex) || !props.isActive } : {};
}
</script>

<template>
  <div class="powerspin-stepper">
    <StepperItem
      v-for="(step, stepIndex) in STEPS_ARRAY"
      :key="stepIndex"
      :has-wheel="isWheelPresent(stepIndex) && isActive"
      :is-selected="hasWheelSelections(stepIndex) && isActive"
      :show-next="!isStepLast(stepIndex) && numOfWheels === stepIndex + 1 && isActive"
      :is-last="isStepLast(stepIndex)"
      @arrow-click="handleArrowClicked(stepIndex)">
      <template v-if="stepIndex === 0">
        <PowerspinLogo v-bind="logoConfig(stepIndex)" @click="logoSelected(stepIndex)" />
      </template>
      <template v-else>
        <img
          :src="activeLogo(stepIndex)"
          class="stepper-combo-icon"
          alt="combo icon"
          @click="logoSelected(stepIndex)" />
      </template>
    </StepperItem>
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.powerspin-stepper {
  @apply atw:flex atw:flex-1;
  height: 106px;
  background: linear-gradient(180deg, #d3edfd 0%, #f5fbfe 14.06%, #f4fafe 89.58%, #d3edfd 100%);
}

.stepper-combo-icon {
  @apply atw:cursor-pointer;
}
</style>
