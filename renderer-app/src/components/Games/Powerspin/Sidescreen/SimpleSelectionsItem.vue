<script setup>
import { computed } from 'vue';
import { usePowerspin } from '@/composables/usePowerspin';
import PowerspinConstants from '@/util/powerspin/Constants';
import betslipUtils from '@/util/powerspin/BetslipUtils';

import PowerspinSidescreenSelectionItem from './PowerspinSidescreenSelectionItem.vue';
import BaseClearButton from '@/components/Common/BaseClearButton.vue';

const props = defineProps({
  category: {
    type: Object,
    required: true,
  },
  betslipIndex: {
    type: Number,
    required: true,
  },
  theme: {
    type: String,
    default: 'blue',
    validator: (value) => ['white', 'blue'].includes(value),
  },
});

const { resetCategory } = usePowerspin();

const REQUESTED_LABELS = {
  1: 'Αριθμός',
  2: '2άδα',
  3: '3άδα',
  4: '4άδα',
  6: '6άδα',
  8: '8άδα',
  12: '12άδα',
};

const BOARD_COLOR_MODIFIER_TO_LABEL = {
  'color-board-red': 'ΚΟΚ',
  'color-board-green': 'ΠΡΑΣ',
  'color-board-blue': 'ΜΠΛΕ',
};

const SIDESCREEN_SELECTION_SYMBOL_COLOR_MAPPER = {
  [PowerspinConstants.ILOT_GAMETYPES.PLAY_COLOR_RED]: 'red',
  [PowerspinConstants.ILOT_GAMETYPES.PLAY_COLOR_GREEN]: 'green',
  [PowerspinConstants.ILOT_GAMETYPES.PLAY_COLOR_BLUE]: 'blue',
};

const SIDESCREEN_SELECTION_UNDER_OVER_MAPPER = {
  [PowerspinConstants.ILOT_GAMETYPES.PLAY_UNDER]: { value: 'U', classname: 'under-board' },
  [PowerspinConstants.ILOT_GAMETYPES.PLAY_OVER]: { value: 'O', classname: 'over-board' },
};

const numberToThemeMap = Object.keys(PowerspinConstants.BUTTON_COLOR_MAPPER).reduce((acc, theme) => {
  PowerspinConstants.BUTTON_COLOR_MAPPER[theme].forEach((number) => {
    acc[number] = theme;
  });
  return acc;
}, {});

const clearButtonTheme = computed(() => {
  return props.theme === 'white' ? 'black' : 'white';
});

const calculateCost = computed(() => {
  const category = props.category;
  const columnsNumber = betslipUtils.calculateCategoryColumnsNumber({ category });
  const multipliers = category.multipliers || category.boards?.[0]?.multipliers || [1];
  const multiplierSum = multipliers.reduce((acc, val) => acc + val, 0);
  const cost = columnsNumber * PowerspinConstants.BASIC_BETTING_AMOUNT * multiplierSum;
  return parseFloat(cost.toFixed(2));
});

const categoryPlayType = computed(() => {
  if (!categoryIsNumber(props.category)) return '';
  const requested = props.category.boards?.[0]?.panels?.[0]?.requested || [];
  return requested.map((r) => REQUESTED_LABELS[r] || `${r}άδα`).join(' ');
});

const isValidSimpleSelection = computed(() => {
  return (
    props.category.type !== PowerspinConstants.GAME_CATEGORY.NUMBER ||
    betslipUtils.isColumnValid({ board: props.category.boards[0] })
  );
});

const selections = computed(() => {
  const category = props.category;

  switch (category.type) {
    case PowerspinConstants.GAME_CATEGORY.NUMBER:
      return (category.boards?.[0]?.panels?.[0]?.selection || []).map((value) => ({
        value,
        classname: `simple-number-board-${numberToThemeMap[value]}`,
      }));

    case PowerspinConstants.GAME_CATEGORY.SYMBOL:
      return [{ classname: 'symbol-board' }];

    case PowerspinConstants.GAME_CATEGORY.COLOR:
      return (category.boards || []).map((board) => {
        const color = SIDESCREEN_SELECTION_SYMBOL_COLOR_MAPPER[board.betType];
        return {
          value: color,
          classname: `color-board-${color}`,
        };
      });

    case PowerspinConstants.GAME_CATEGORY.OVER_UNDER:
      return (category.boards || []).map((board) => {
        const mapping = SIDESCREEN_SELECTION_UNDER_OVER_MAPPER[board.betType];
        return mapping || { value: '?', classname: 'under-board' };
      });

    default:
      return [];
  }
});

function categoryIsNumber(category) {
  return category?.type === PowerspinConstants.GAME_CATEGORY.NUMBER;
}

function handleResetCategory() {
  resetCategory({ betslipIndex: props.betslipIndex, categoryType: props.category.type });
}
</script>

<template>
  <div class="simple-selections-item">
    <div class="simple-selections-item__header">
      <div class="simple-selections-item__amount">ΠΟΣΟ: {{ calculateCost }}€</div>
      <div v-if="categoryIsNumber(category)" class="simple-selections-item__play-type">
        {{ categoryPlayType }}
      </div>
    </div>

    <div class="simple-selections-item__content">
      <div class="simple-selections-item__selections">
        <img
          class="simple-selections-item__logo"
          src="@/assets/powerspin/powerspin-logo-ON.png"
          alt="powerspin"
          width="31"
          height="31" />
        <div class="simple-selections-item__items">
          <PowerspinSidescreenSelectionItem
            v-for="(selection, index) in selections"
            :key="index"
            :type="selection.classname">
            <template v-if="selection.value && !BOARD_COLOR_MODIFIER_TO_LABEL[selection.classname]">
              {{ selection.value }}
            </template>
            <template v-else-if="BOARD_COLOR_MODIFIER_TO_LABEL[selection.classname]">
              {{ BOARD_COLOR_MODIFIER_TO_LABEL[selection.classname] }}
            </template>
          </PowerspinSidescreenSelectionItem>
        </div>
      </div>

      <div class="simple-selections-item__actions">
        <div v-if="!isValidSimpleSelection" class="simple-selections-item__error">⚠️</div>
        <BaseClearButton :theme="clearButtonTheme" @click="handleResetCategory" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.simple-selections-item {
  @apply atw:pb-2;
}

.simple-selections-item__header {
  @apply atw:flex atw:items-center atw:justify-between atw:mb-1;
}

.simple-selections-item__amount {
  @apply atw:text-sm atw:font-bold atw:uppercase atw:ml-1;
}

.simple-selections-item__play-type {
  @apply atw:text-base atw:font-black atw:mr-1;
  color: #d70c7f;
}

.simple-selections-item__content {
  @apply atw:flex atw:justify-between atw:items-center;
}

.simple-selections-item__selections {
  @apply atw:flex atw:items-center;
}

.simple-selections-item__logo {
  @apply atw:mx-1 atw:self-start;
}

.simple-selections-item__items {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
}

.simple-selections-item__actions {
  @apply atw:flex atw:items-center atw:justify-end;
}

.simple-selections-item__error {
  @apply atw:text-xl atw:mr-2;
  color: #b5c4ca;
}
</style>
