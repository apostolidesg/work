<script setup>
import { ref, computed, getCurrentInstance } from 'vue';
import FireblazeConstants from '@/util/fireblaze/Constants';
import NumbersSelectionLayout from './NumbersSelectionLayout.vue';
import FireblazeNumberButton from './FireblazeNumberButton.vue';
import FireblazeWheelView from './FireblazeWheelView.vue';
import alternateViewGridIcon from '@/assets/fireblaze/alternate-view-grid.svg';
import alternateViewWheelIcon from '@/assets/fireblaze/alternate-view-wheel.svg';

const instance = getCurrentInstance();
const t = (key, params, count) => instance?.proxy?.$t(key, params, count) ?? key;

const props = defineProps({
  selectedNumbers: {
    type: Array,
    required: true,
  },
  selectedOptionId: {
    type: Number,
    required: false,
    default: null,
  },
  numbers: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['toggle-number']);

const isWheelActive = ref(false);

const numberText = computed(() => {
  const number = props.selectedOptionId ? props.selectedOptionId : FireblazeConstants.BOARD_NUMBERS.MIN;
  return t('fireblaze.numberSelection', { number }, number);
});

function isNumberActive(number) {
  return props.selectedNumbers.includes(number);
}

function toggleNumber(number) {
  emit('toggle-number', number);
}

function toggleWheelView() {
  isWheelActive.value = !isWheelActive.value;
}

function showStatistics(stat) {
  return stat !== null && stat >= 0;
}
</script>

<template>
  <NumbersSelectionLayout class="fireblaze-numbers">
    <template #titlePrefix>{{ t('fireblaze.selectAtLeast') }}</template>
    <template #titleNumbers>
      <span>{{ numberText }}</span>
    </template>
    <div class="fireblaze-numbers__alternate-view" @click="toggleWheelView">
      <img v-if="!isWheelActive" :src="alternateViewGridIcon" alt="grid view" width="74" height="74" />
      <img v-else :src="alternateViewWheelIcon" alt="wheel view" width="74" height="74" />
    </div>
    <Transition name="fade">
      <div v-if="!isWheelActive" class="fireblaze-numbers__grid">
        <FireblazeNumberButton
          v-for="{ number, stat } in numbers"
          :id="`fireblaze-number-btn-${number}`"
          :key="`ballnumber-${number}`"
          :active="isNumberActive(number)"
          :show-statistics="showStatistics(stat)"
          @click="toggleNumber(number)">
          <template #default>{{ number }}</template>
          <template #stats>{{ stat }}</template>
        </FireblazeNumberButton>
      </div>
    </Transition>
    <Transition name="fade">
      <div v-if="isWheelActive" class="fireblaze-numbers__wheel">
        <FireblazeWheelView :numbers="numbers" :selected-numbers="selectedNumbers" @number-selected="toggleNumber" />
      </div>
    </Transition>
  </NumbersSelectionLayout>
</template>

<style scoped>
.fireblaze-numbers {
  display: flex;
  flex-direction: column;
}

.fireblaze-numbers__alternate-view {
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
}

.fireblaze-numbers__grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(5, 1fr);
  row-gap: 20px;
  column-gap: 12px;
  width: min-content;
  max-height: 450px;
}

.fireblaze-numbers__wheel {
  height: 30em;
  max-height: 450px;
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.5s ease,
    transform 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
