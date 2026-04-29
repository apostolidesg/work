<script setup>
import { computed, useAttrs } from 'vue';
import RoundedBorderedButton from '@/components/Common/RoundedBorderedButton.vue';
import RandomButton from '@/components/Common/RandomButton.vue';
import PowerspinConstants from '@/util/powerspin/Constants';

const props = defineProps({
  showHeader: {
    type: Boolean,
    default: true,
  },
  showQuickPick: {
    type: Boolean,
    default: true,
  },
  isStreched: {
    type: Boolean,
    default: true,
  },
  textTheme: {
    type: String,
    default: 'black',
    validator: (value) => ['black', 'white'].includes(value),
  },
  idSuffix: {
    type: String,
    default: '',
  },
  numberBoardPanel: {
    type: Object,
    required: true,
  },
  wheelIndex: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(['requested-number-click', 'column-number-click', 'random-pick-click']);

const numbers = PowerspinConstants.BETSLIP_NUMBERS.MAX_NUMBER_RANGE;
const requestedNumbers = PowerspinConstants.REQUESTED_NUMBERS;

const numberToThemeMap = computed(() => {
  return Object.keys(PowerspinConstants.BUTTON_COLOR_MAPPER).reduce((acc, theme) => {
    Object.values(PowerspinConstants.BUTTON_COLOR_MAPPER[theme]).forEach((number) => {
      acc[number] = theme;
    });
    return acc;
  }, {});
});

const selectionNumbersClass = computed(() =>
  props.isStreched ? 'number-selection__numbers--stretch' : 'number-selection__numbers--shrink'
);

const requestedNumberLabels = {
  1: 'Αριθμός',
  2: '2άδα',
  3: '3άδα',
  4: '4άδα',
  6: '6άδα',
  8: '8άδα',
  12: '12άδα',
};

function isRequestedNumberSelected(number) {
  return props.numberBoardPanel.requested?.includes(number) || false;
}

function isColumnNumberSelected(number) {
  return props.numberBoardPanel.selection?.includes(number) || false;
}

function requestedNumberClicked(number) {
  emit('requested-number-click', number);
}

function columnNumberClicked(number) {
  emit('column-number-click', number);
}

function selectRandomNumbers() {
  emit('random-pick-click');
}
</script>

<template>
  <div class="number-selection">
    <div v-if="showHeader" class="number-selection__header">
      <RoundedBorderedButton
        v-for="number in requestedNumbers"
        :key="number"
        theme="magenta"
        :title="requestedNumberLabels[number]"
        :text-theme="textTheme"
        :active="isRequestedNumberSelected(number)"
        :id="`powerspin-requested-number-${number}-${idSuffix}`"
        @click="requestedNumberClicked(number)" />
    </div>
    <div class="number-selection__numbers" :class="selectionNumbersClass">
      <RoundedBorderedButton
        v-for="number in numbers"
        :key="number"
        class="number-selection__number"
        :value="number"
        :theme="numberToThemeMap[number]"
        :text-theme="textTheme"
        :active="isColumnNumberSelected(number)"
        :id="`powerspin-number-${number}-${idSuffix}`"
        @click="columnNumberClicked(number)" />
    </div>
    <div v-if="showQuickPick" class="number-selection__footer">
      <RandomButton :id="`ssbt_random_button-${idSuffix}`" theme="blue" @random-button-clicked="selectRandomNumbers" />
    </div>
  </div>
</template>

<style scoped>
.number-selection {
  width: fit-content;
  display: flex;
  flex-direction: column;
}

.number-selection__header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.number-selection__numbers {
  display: grid;
  margin-left: 7px;
  margin-right: -5px;
  margin-bottom: 20px;
}

.number-selection__numbers--stretch {
  grid-template-columns: repeat(12, auto);
}

.number-selection__numbers--shrink {
  grid-template-columns: repeat(8, auto);
}

.number-selection__number {
  margin: 3px;
}

.number-selection__footer {
  display: flex;
  justify-content: flex-end;
}
</style>
