<script setup>
import { computed } from 'vue';
import { usePowerspin } from '@/composables/usePowerspin';
import PowerspinConstants from '@/util/powerspin/Constants';
import betslipUtils from '@/util/powerspin/BetslipUtils';

import MarketsCategoryLayout from './MarketsCategoryLayout.vue';
import NumberSelection from './NumberSelection.vue';
import MarketsOptionsSelection from './MarketsOptionsSelection.vue';

const { markets, setMarketsNumberOnAnyWheel, toggleMarketGameType, toggleMarketMultipliers } = usePowerspin();

const MARKETS_CATEGORIES = [
  {
    category: PowerspinConstants.MARKETS_CATEGORY.NUMBER_ON_WHEEL,
    component: 'NumberSelection',
    title: 'ΠΟΙΟΣ ΑΡΙΘΜΟΣ ΘΑ ΚΛΗΡΩΘΕΙ ΣΕ ΟΠΟΙΟΝΔΗΠΟΤΕ ΤΡΟΧΟ;',
  },
  {
    category: PowerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL,
    component: 'MarketsOptionsSelection',
    title: 'ΤΟ ΣΥΜΒΟΛΟ ΘΑ ΚΛΗΡΩΘΕΙ ΣΕ:',
    options: [
      {
        value: PowerspinConstants.ILOT_GAMETYPES.PLAY_SYMBOL_ON_AT_LEAST_ONE_WHEEL,
        title: 'ΤΟΥΛΑΧΙΣΤΟΝ 1 ΤΡΟΧΟ',
      },
      {
        value: PowerspinConstants.ILOT_GAMETYPES.PLAY_SYMBOL_ON_NONE_WHEEL,
        title: 'ΚΑΝΕΝΑΝ ΤΡΟΧΟ',
      },
    ],
  },
  {
    category: PowerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_NUMBER,
    component: 'MarketsOptionsSelection',
    title: 'ΣΕ ΠΟΣΟΥΣ ΤΡΟΧΟΥΣ ΘΑ ΚΛΗΡΩΘΕΙ Ο ΙΔΙΟΣ ΑΡΙΘΜΟΣ;',
    options: [
      {
        value: PowerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER_ON_TWO_WHEELS,
        title: '2 ΤΡΟΧΟΥΣ',
      },
      {
        value: PowerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER_ON_THREE_WHEELS,
        title: '3 ΤΡΟΧΟΥΣ',
      },
    ],
  },
];

const multipliers = PowerspinConstants.MULTIPLIERS_SET;

const numberBoardPanel = computed(() => {
  return markets.value?.getNumberOnWheelBoard()?.panels?.[0] || { selection: [], requested: [] };
});

const areMarketsEmpty = computed(() => {
  return markets.value?.isEmpty() ?? true;
});

const activeTheme = computed(() => {
  return areMarketsEmpty.value ? 'light' : 'dark';
});

function getSelectedMultipliers(category) {
  if (!markets.value) return [PowerspinConstants.DEFAULT_MULTIPLIERS];

  switch (category) {
    case PowerspinConstants.MARKETS_CATEGORY.NUMBER_ON_WHEEL:
      return markets.value.getNumberOnWheelBoard()?.multipliers || [PowerspinConstants.DEFAULT_MULTIPLIERS];
    case PowerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL:
    case PowerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_NUMBER:
      return markets.value.categories[category]?.multipliers || [PowerspinConstants.DEFAULT_MULTIPLIERS];
    default:
      return [PowerspinConstants.DEFAULT_MULTIPLIERS];
  }
}

function isCategoryEmpty(category) {
  if (!markets.value) return true;
  return betslipUtils.isMarketsCategoryEmpty(markets.value.categories[category]);
}

function getCategoryValue(category) {
  if (!markets.value) return [];
  return markets.value.categories[category]?.boards?.map((board) => board.betType) || [];
}

function handleUpdateMultipliers(category, multiplier) {
  toggleMarketMultipliers({ gameCategory: category, multipliers: multiplier });
}

function handleNumberClicked(number) {
  setMarketsNumberOnAnyWheel(number);
}

function handleOptionClicked(gameType) {
  toggleMarketGameType(gameType);
}
</script>

<template>
  <div class="play-markets">
    <div class="play-markets__categories" :class="{ 'play-markets__categories--active': !areMarketsEmpty }">
      <div
        v-for="(categoryConfig, index) in MARKETS_CATEGORIES"
        :key="categoryConfig.category"
        :id="`markets-category-${categoryConfig.category.toLowerCase()}`">
        <MarketsCategoryLayout
          :title="categoryConfig.title"
          :multipliers="multipliers"
          :selected-multipliers="getSelectedMultipliers(categoryConfig.category)"
          :disabled-betting-amount="isCategoryEmpty(categoryConfig.category)"
          :theme="activeTheme"
          @update-multipliers="(mul) => handleUpdateMultipliers(categoryConfig.category, mul)">
          <NumberSelection
            v-if="categoryConfig.component === 'NumberSelection'"
            :show-header="false"
            :show-quick-pick="false"
            :text-theme="areMarketsEmpty ? 'black' : 'white'"
            :number-board-panel="numberBoardPanel"
            id-suffix="markets"
            class="play-markets__category-content"
            @column-number-click="handleNumberClicked" />
          <MarketsOptionsSelection
            v-else-if="categoryConfig.component === 'MarketsOptionsSelection'"
            :options="categoryConfig.options"
            :options-selected="getCategoryValue(categoryConfig.category)"
            :theme="activeTheme"
            class="play-markets__category-content"
            @option-clicked="handleOptionClicked" />
        </MarketsCategoryLayout>

        <div
          v-if="index !== MARKETS_CATEGORIES.length - 1"
          class="play-markets__divider"
          :class="{ 'play-markets__divider--active': !areMarketsEmpty }" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.play-markets {
  @apply atw:flex atw:flex-row atw:h-full;
}

.play-markets__categories {
  @apply atw:flex atw:flex-col atw:w-full atw:pt-8 atw:relative;
  background: linear-gradient(180deg, #d3edfd 0%, #f5fbfe 14.06%, #f4fafe 89.58%, #d3edfd 100%);
  background-size: 100%;
  z-index: 100;
}

.play-markets__categories::before {
  content: '';
  @apply atw:block atw:h-full atw:absolute atw:top-0 atw:left-0 atw:w-full;
  background: linear-gradient(180deg, #17277c 0%, #2e1e93 15.1%, #2e1e93 85.42%, #17277c 100%);
  opacity: 0;
  z-index: -100;
  transition: opacity 0.35s;
}

.play-markets__categories--active::before {
  opacity: 1;
}

.play-markets__category-content {
  @apply atw:my-3;
}

.play-markets__divider {
  height: 1px;
  border: 1px solid rgba(39, 59, 147, 0.1);
  margin: 5px 20px 15px 20px;
}

.play-markets__divider--active {
  border-color: #5136f9;
}
</style>
