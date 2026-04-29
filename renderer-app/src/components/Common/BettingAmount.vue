<script setup>
import { computed } from 'vue';
import SquareButton from './SquareButton.vue';

const props = defineProps({
  multipliers: {
    type: Array,
    required: true,
  },
  basicBettingAmount: {
    type: Number,
    required: true,
  },
  selectedMultipliers: {
    type: Array,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  theme: {
    type: String,
    default: 'dark-blue',
    validator: (value) => ['dark-blue', 'blue', 'light-blue', 'white', 'black'].includes(value),
  },
  textTheme: {
    type: String,
    default: 'white',
    validator: (value) => ['white', 'dark-blue', 'black', 'light-blue'].includes(value),
  },
});

const emit = defineEmits(['update-multipliers']);

const titleTheme = computed(() => {
  return props.textTheme === 'white' ? 'betting-amount__title--white' : 'betting-amount__title--dark-blue';
});

function isMultiplierSelected(multiplier) {
  return !props.disabled && props.selectedMultipliers.indexOf(multiplier) > -1;
}

function handleClick(multiplier) {
  emit('update-multipliers', multiplier);
}
</script>

<template>
  <div class="betting-amount">
    <div class="betting-amount__title" :class="titleTheme">POWERSPIN.AMOUNT (€)</div>
    <div class="betting-amount__grid">
      <SquareButton
        v-for="mult in multipliers"
        :key="mult"
        :number="mult * basicBettingAmount"
        :disabled="disabled"
        :active="isMultiplierSelected(mult)"
        :theme="theme"
        @square-button-clicked="handleClick(mult)" />
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.betting-amount {
  max-width: 297px;
}

.betting-amount__title {
  font-size: 13.36px;
  font-weight: 900;
  margin: 8px;
}

.betting-amount__title--white {
  color: white;
}

.betting-amount__title--dark-blue {
  color: var(--dark-blue);
}

.betting-amount__grid {
  margin: 8px;
}
</style>
