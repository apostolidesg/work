<script setup>
import { computed, getCurrentInstance } from 'vue';
import EurojackpotConstants from '@/util/eurojackpot/Constants.js';
import EurojackpotNumberButton from './EurojackpotNumberButton.vue';

const props = defineProps({
  selectedNumbers: {
    type: Array,
    required: true,
  },
  selectedSystemId: {
    type: String,
    required: false,
    default: null,
    validator: (value) => {
      return !value ? true : Object.keys(EurojackpotConstants.SYSTEMS).includes(value);
    },
  },
  type: {
    type: String,
    default: 'main',
    validator: (value) => ['main', 'euro'].includes(value),
  },
  numbers: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['toggle-number']);

const instance = getCurrentInstance();
const t = (key, params) => instance?.proxy?.$t(key, params) ?? key;

const isEuroNumbers = computed(() => props.type === 'euro');

const prefixText = computed(() => {
  return !props.selectedSystemId ? t('eurojackpot.selectAtLeast') : t('eurojackpot.select');
});

const numberText = computed(() => {
  if (isEuroNumbers.value) {
    return t('eurojackpot.numberSelection', { number: EurojackpotConstants.BOARD_NUMBERS.EURO_NUMBERS.MIN });
  }
  const number = props.selectedSystemId
    ? EurojackpotConstants.SYSTEMS[props.selectedSystemId].numbers
    : EurojackpotConstants.BOARD_NUMBERS.MAIN.MIN;

  return t('eurojackpot.numberSelection', { number });
});

const isNumberActive = (number) => {
  return props.selectedNumbers.includes(number);
};

const toggleNumber = (number) => {
  emit('toggle-number', number);
};
</script>

<template>
  <div class="eurojackpot-numbers">
    <div class="eurojackpot-numbers__header">
      <span class="eurojackpot-numbers__prefix">{{ prefixText }}</span>
      <span v-if="isEuroNumbers" class="eurojackpot-numbers__star">★</span>
      <span class="eurojackpot-numbers__count">{{ numberText }}</span>
    </div>
    <div :class="['eurojackpot-numbers__grid', `eurojackpot-numbers__grid--${type}`]">
      <EurojackpotNumberButton
        v-for="{ number, stat } in numbers"
        :id="`ejp-${type}-number-btn-${number}`"
        :key="number"
        :theme="type"
        :active="isNumberActive(number)"
        @click="toggleNumber(number)">
        {{ number }}
        <template v-if="stat >= 0" #info>{{ stat }}</template>
      </EurojackpotNumberButton>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.eurojackpot-numbers {
  @apply atw:flex atw:flex-col atw:items-center atw:mb-8;
}

.eurojackpot-numbers__header {
  @apply atw:w-full atw:mb-4 atw:font-bold atw:uppercase;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  letter-spacing: 0.5px;
}

.eurojackpot-numbers__prefix {
  @apply atw:text-white atw:mr-1;
}

.eurojackpot-numbers__star {
  @apply atw:mx-1;
  color: #c9a227;
}

.eurojackpot-numbers__count {
  color: #c9a227;
}

.eurojackpot-numbers__grid {
  @apply atw:grid atw:w-fit;
  gap: 10px;
}

.eurojackpot-numbers__grid--main {
  grid-template-columns: repeat(10, 1fr);
}

.eurojackpot-numbers__grid--euro {
  grid-template-columns: repeat(6, 1fr);
}
</style>
