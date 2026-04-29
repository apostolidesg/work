<script setup>
import { computed } from 'vue';
import betslipUtils from '@/util/powerspin/BetslipUtils';

import SimpleSelectionsItem from './SimpleSelectionsItem.vue';
import ComboSelectionsItem from './ComboSelectionsItem.vue';
import MarketsSelectionsItem from './MarketsSelectionsItem.vue';

const props = defineProps({
  betslip: {
    type: Object,
    required: true,
  },
  isSimple: {
    type: Boolean,
    required: true,
  },
  betslipIndex: {
    type: Number,
    required: true,
  },
  theme: {
    type: String,
    default: 'white',
    validator: (value) => ['white', 'blue'].includes(value),
  },
});

const wheelCategories = computed(() => {
  if (!props.betslip?.wager?.wheels?.[0]?.categories) return [];
  return Object.values(props.betslip.wager.wheels[0].categories).filter(
    (category) => !betslipUtils.isWheelCategoryEmpty(category)
  );
});

const marketCategories = computed(() => {
  if (!props.betslip?.wager?.markets?.categories) return [];
  return Object.values(props.betslip.wager.markets.categories).filter(
    (category) => !betslipUtils.isMarketsCategoryEmpty(category)
  );
});

const hasWheelSelections = computed(() => {
  return !props.betslip?.isWheelsEmpty?.();
});

const hasMarketSelection = computed(() => {
  return !props.betslip?.wager?.markets?.isEmpty?.();
});
</script>

<template>
  <div class="powerspin-selections-list" :class="`powerspin-selections-list--${theme}`">
    <template v-if="hasWheelSelections">
      <template v-if="isSimple">
        <SimpleSelectionsItem
          v-for="(category, i) in wheelCategories"
          :key="i"
          :category="category"
          :betslip-index="betslipIndex"
          :theme="theme" />
      </template>
      <ComboSelectionsItem v-else :betslip="betslip" :betslip-index="betslipIndex" :theme="theme" />
    </template>

    <template v-if="hasMarketSelection">
      <MarketsSelectionsItem
        v-for="(category, i) in marketCategories"
        :key="`market-${i}`"
        :category="category"
        :betslip-index="betslipIndex" />
    </template>
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.powerspin-selections-list {
  @apply atw:rounded-xl atw:p-1;
  border: none;
}

.powerspin-selections-list:not(:last-child) {
  @apply atw:mb-2;
}

.powerspin-selections-list--white {
  background: #e8edf1;
  color: #042436;
  border: solid 4px var(--magenta);
}

.powerspin-selections-list--blue {
  background: #100556;
  color: white;
}
</style>
