<script setup>
import { computed } from 'vue';
import BettingAmount from './BettingAmount.vue';
import PowerspinConstants from '@/util/powerspin/Constants';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  showBettingAmount: {
    type: Boolean,
    default: true,
  },
  disableBettingAmount: {
    type: Boolean,
    default: false,
  },
  selectedMultipliers: {
    type: Array,
    required: true,
  },
  multipliers: {
    type: Array,
    required: true,
  },
  textTheme: {
    type: String,
    default: 'white',
    validator: (value) => ['black', 'white'].includes(value),
  },
  theme: {
    type: String,
    default: 'dark-blue',
    validator: (value) => ['dark-blue', 'blue', 'light-blue'].includes(value),
  },
});

const emit = defineEmits(['update-multipliers']);

const basicBettingAmount = PowerspinConstants.BASIC_BETTING_AMOUNT;

const titleTheme = computed(() =>
  props.textTheme === 'white' ? 'wheel-category-layout__title--white' : 'wheel-category-layout__title--black'
);

const currentLayout = computed(() =>
  props.showBettingAmount ? 'wheel-category-layout__row' : 'wheel-category-layout__col'
);

function handleUpdateMultipliers(multiplier) {
  emit('update-multipliers', multiplier);
}
</script>

<template>
  <div class="wheel-category-layout" :class="currentLayout">
    <div class="wheel-category-layout__title" :class="[titleTheme, { 'atw:mb-3': !showBettingAmount }]">
      {{ title }}
    </div>
    <div class="wheel-category-layout__content">
      <slot></slot>
    </div>
    <div v-if="showBettingAmount" class="wheel-category-layout__betting-amount">
      <BettingAmount
        :text-theme="textTheme"
        :basic-betting-amount="basicBettingAmount"
        :selected-multipliers="selectedMultipliers"
        :multipliers="multipliers"
        :theme="theme"
        :disabled="disableBettingAmount"
        @update-multipliers="handleUpdateMultipliers" />
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.wheel-category-layout {
  @apply atw:flex atw:mt-1;
  background: transparent;
}

.wheel-category-layout__row {
  @apply atw:flex-row;
}

.wheel-category-layout__col {
  @apply atw:flex-col;
}

.wheel-category-layout__content {
  @apply atw:flex-1 atw:flex atw:justify-center atw:items-center atw:w-full;
}

.wheel-category-layout__title {
  @apply atw:text-[15px] atw:font-black atw:min-w-[100px] atw:ml-5;
}

.wheel-category-layout__title--white {
  color: #fff;
}

.wheel-category-layout__title--black {
  color: #000;
}

.wheel-category-layout__betting-amount {
  @apply atw:flex atw:items-end atw:mx-2;
}

.wheel-category-layout__betting-amount :deep(.betting-amount) {
  height: 125px;
}
</style>
