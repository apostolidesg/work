<script setup>
import { computed } from 'vue';
import BettingAmount from '@/components/Common/BettingAmount.vue';
import PowerspinConstants from '@/util/powerspin/Constants';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  selectedMultipliers: {
    type: Array,
    required: true,
  },
  multipliers: {
    type: Array,
    required: true,
  },
  disabledBettingAmount: {
    type: Boolean,
    default: false,
  },
  theme: {
    type: String,
    default: 'light',
    validator: (value) => ['light', 'dark'].includes(value),
  },
});

const emit = defineEmits(['update-multipliers']);

const bettingAmountTheme = computed(() => {
  return props.theme === 'light' ? 'light-blue' : 'blue';
});

const titleClass = computed(() => {
  return props.theme === 'light' ? 'markets-category-layout__title--black' : 'markets-category-layout__title--white';
});

const bettingAmountTextTheme = computed(() => {
  return props.theme === 'light' ? 'light-blue' : 'white';
});

function handleUpdateMultipliers(multiplier) {
  emit('update-multipliers', multiplier);
}
</script>

<template>
  <div class="markets-category-layout">
    <div class="markets-category-layout__main-area">
      <div class="markets-category-layout__title" :class="titleClass">
        {{ title }}
      </div>
      <div class="markets-category-layout__content">
        <slot></slot>
      </div>
    </div>
    <div class="markets-category-layout__betting-amount">
      <BettingAmount
        :selected-multipliers="selectedMultipliers"
        :basic-betting-amount="PowerspinConstants.BASIC_BETTING_AMOUNT"
        :multipliers="multipliers"
        :theme="bettingAmountTheme"
        :text-theme="bettingAmountTextTheme"
        :disabled="disabledBettingAmount"
        @update-multipliers="handleUpdateMultipliers" />
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.markets-category-layout {
  @apply atw:flex atw:flex-row atw:w-full;
}

.markets-category-layout__main-area {
  @apply atw:flex atw:flex-col atw:items-center atw:flex-1;
}

.markets-category-layout__title {
  font-family: 'Roboto', sans-serif;
  font-size: 15.22px;
  font-weight: 900;
  text-transform: uppercase;
  margin-bottom: 15px;
}

.markets-category-layout__title--white {
  color: #fff;
}

.markets-category-layout__title--black {
  color: #000;
}

.markets-category-layout__content {
  @apply atw:flex atw:justify-center;
}

.markets-category-layout__betting-amount {
  @apply atw:flex atw:items-end atw:mx-2;
}
</style>
