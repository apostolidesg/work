<script setup>
import { computed } from 'vue';
import FireblazeNumberButton from './FireblazeNumberButton.vue';
import FireblazeConstants from '@/util/fireblaze/Constants';

const props = defineProps({
  numbers: {
    type: Array,
    required: true,
  },
  selectedNumbers: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['number-selected']);

const customOrderNumbers = computed(() => {
  const customOrder = FireblazeConstants.WHEEL_VIEW_NUMBERS;
  return customOrder.reduce((result, num) => {
    const item = props.numbers.find((entry) => entry.number === num);
    if (item) result.push(item);
    return result;
  }, []);
});

function getWheelItemStyle(index, total) {
  const angle = (FireblazeConstants.CIRCLE_ANGLE / total) * index;
  return { transform: `rotate(-${angle}deg)` };
}

function getWheelSliceStyle(index, total) {
  const angle = (360 / total) * index;
  return { transform: `rotate(${angle}deg)` };
}

function isNumberActive(number) {
  return props.selectedNumbers.includes(number);
}

function showStatistics(stat) {
  return stat !== null && stat >= 0;
}

function numberSelected(number) {
  emit('number-selected', number);
}
</script>

<template>
  <div class="fireblaze-wheel">
    <div
      v-for="({ number, stat }, index) in customOrderNumbers"
      :key="`fireblaze-wheel-item-${number}`"
      class="fireblaze-wheel__item"
      :style="getWheelSliceStyle(index, numbers.length)"
      :class="{ 'fireblaze-wheel__item--active': isNumberActive(number) }"
      @click="numberSelected(number)">
      <FireblazeNumberButton
        :id="`fireblaze-number-btn-${number}`"
        :active="isNumberActive(number)"
        :style="getWheelItemStyle(index, numbers.length)"
        :show-statistics="showStatistics(stat)">
        <template #default>{{ number }}</template>
        <template #stats>{{ stat }}</template>
      </FireblazeNumberButton>
    </div>
    <div class="fireblaze-wheel__center-circle" />
  </div>
</template>

<style scoped>
.fireblaze-wheel {
  display: grid;
  place-items: center;
  position: relative;
  width: 36em;
  height: 36em;
  border: 2px solid var(--fireblaze-color-third-crimson);
  border-radius: 50%;
  transform: translate(0, -3em);
  clip-path: inset(0 0 0 0 round 50%);
}

.fireblaze-wheel__item {
  position: absolute;
  left: 0;
  width: 50%;
  height: 4em;
  background-color: var(--fireblaze-color-third-purple);
  color: black;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 0.8em;
  clip-path: polygon(0% 0%, 100% 50%, 0% 100%);
  transform-origin: center right;
  padding-left: 0.5em;
  cursor: pointer;
}

.fireblaze-wheel__item--active {
  background-color: var(--fireblaze-color-third-crimson);
}

.fireblaze-wheel__item :deep(.fireblaze-number-button) {
  width: 40px;
  height: 40px;
}

.fireblaze-wheel__item :deep(.fireblaze-number-button__number) {
  font-size: 22px;
}

.fireblaze-wheel__item :deep(.fireblaze-number-button__stat) {
  width: 17.5px;
  height: 17.5px;
  font-size: 12px;
}

.fireblaze-wheel__center-circle {
  position: absolute;
  width: 12.5em;
  height: 12.5em;
  background: var(--fireblaze-gradient-dark-red);
  border-radius: 50%;
}
</style>
