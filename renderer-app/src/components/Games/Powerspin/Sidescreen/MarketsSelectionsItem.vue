<script setup>
import { computed } from 'vue';
import PowerspinConstants from '@/util/powerspin/Constants';

import PowerspinSidescreenSelectionItem from './PowerspinSidescreenSelectionItem.vue';

const props = defineProps({
  category: {
    type: Object,
    required: true,
  },
  betslipIndex: {
    type: Number,
    required: true,
  },
});

const CATEGORY_LABELS = {
  [PowerspinConstants.MARKETS_CATEGORY.NUMBER_ON_WHEEL]: 'ΑΡΙΘΜΟΣ (ΟΤ):',
  [PowerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL]: 'ΣΥΜΒΟΛΟ ΣΕ:',
  [PowerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_NUMBER]: 'ΙΔΙΟΣ ΑΡΙΘΜΟΣ:',
};

const GAME_TYPE_LABELS = {
  [PowerspinConstants.ILOT_GAMETYPES.PLAY_SYMBOL_ON_AT_LEAST_ONE_WHEEL]: 'ΤΟΥΛΑΧΙΣΤΟΝ 1',
  [PowerspinConstants.ILOT_GAMETYPES.PLAY_SYMBOL_ON_NONE_WHEEL]: 'ΚΑΝΕΝΑΝ ΤΡΟΧΟ',
  [PowerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER_ON_TWO_WHEELS]: '2 ΤΡΟΧΟΥΣ',
  [PowerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER_ON_THREE_WHEELS]: '3 ΤΡΟΧΟΥΣ',
};

const numberToThemeMap = computed(() => {
  return Object.keys(PowerspinConstants.BUTTON_COLOR_MAPPER).reduce((acc, theme) => {
    PowerspinConstants.BUTTON_COLOR_MAPPER[theme].forEach((number) => {
      acc[number] = theme;
    });
    return acc;
  }, {});
});

const categoryLabel = computed(() => {
  return CATEGORY_LABELS[props.category.type] || '';
});

const categoryCost = computed(() => {
  const boards = props.category.boards || [];
  if (boards.length === 0) return 0;

  let columnsCount = 0;

  if (props.category.type === PowerspinConstants.MARKETS_CATEGORY.NUMBER_ON_WHEEL) {
    columnsCount = boards[0]?.panels?.[0]?.selection?.length || 0;
  } else {
    columnsCount = boards.length;
  }

  const multipliers = props.category.multipliers || boards[0]?.multipliers || [1];
  const multiplier = Array.isArray(multipliers) ? multipliers.reduce((a, b) => a + b, 0) : multipliers;
  const cost = columnsCount * multiplier * PowerspinConstants.BASIC_BETTING_AMOUNT;

  return parseFloat(cost.toFixed(2));
});

const selections = computed(() => {
  const boards = props.category.boards || [];

  if (props.category.type === PowerspinConstants.MARKETS_CATEGORY.NUMBER_ON_WHEEL) {
    const selection = boards[0]?.panels?.[0]?.selection || [];
    return selection.map((num) => ({
      value: num,
      classname: `simple-number-board-${numberToThemeMap.value[num]}`,
    }));
  } else {
    return boards.map((board) => ({
      value: GAME_TYPE_LABELS[board.betType] || board.betType,
      classname: 'market-option-board',
    }));
  }
});
</script>

<template>
  <div class="markets-selections-item">
    <div class="markets-selections-item__header">
      <span class="markets-selections-item__label">{{ categoryLabel }}</span>
      <span class="markets-selections-item__cost">ΠΟΣΟ: {{ categoryCost }}€</span>
    </div>
    <div class="markets-selections-item__selections">
      <PowerspinSidescreenSelectionItem v-for="(selection, i) in selections" :key="i" :type="selection.classname">
        {{ selection.value }}
      </PowerspinSidescreenSelectionItem>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.markets-selections-item {
  @apply atw:pb-2;
}

.markets-selections-item__header {
  @apply atw:flex atw:items-center atw:justify-between atw:pb-1;
}

.markets-selections-item__label {
  @apply atw:text-xs atw:font-bold atw:uppercase;
}

.markets-selections-item__cost {
  @apply atw:text-sm atw:font-bold;
}

.markets-selections-item__selections {
  @apply atw:flex atw:flex-wrap atw:gap-1;
}
</style>
