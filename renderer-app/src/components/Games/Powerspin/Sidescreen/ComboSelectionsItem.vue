<script setup>
import { computed } from 'vue';
import { usePowerspin } from '@/composables/usePowerspin';
import PowerspinConstants from '@/util/powerspin/Constants';
import betslipUtils from '@/util/powerspin/BetslipUtils';

import PowerspinSidescreenSelectionItem from './PowerspinSidescreenSelectionItem.vue';
import BaseClearButton from '@/components/Common/BaseClearButton.vue';

import powerspinLogo from '@/assets/powerspin/powerspin-logo-ON.png';
import combo2Logo from '@/assets/powerspin/combo2-sidescreen.svg';
import combo3Logo from '@/assets/powerspin/combo3-sidescreen.svg';

const props = defineProps({
  betslip: {
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

const { resetWheels } = usePowerspin();

const COMBO_PREFIX_IMAGE_ARRAY = [powerspinLogo, combo2Logo, combo3Logo];

const BOARD_COLOR_MODIFIER_TO_LABEL = {
  'color-board-red': 'ΚΟΚΚΙΝΗ',
  'color-board-green': 'ΠΡΑΣΙΝΗ',
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

const notEmptyWheels = computed(() => {
  if (!props.betslip?.wager?.wheels) return [];
  return props.betslip.wager.wheels.reduce((acc, wheel, index) => {
    if (!wheel.isEmpty()) {
      acc.push({ wheel, index });
    }
    return acc;
  }, []);
});

const calculateCost = computed(() => {
  const betslip = props.betslip;
  if (!betslip?.wager?.wheels) return 0;

  const wheels = betslip.wager.wheels;
  if (wheels.length <= 1) return 0;

  const comboBoardsNumber = betslipUtils.calculateWheelsComboBoardsNumber({ wheels });
  const multiplierNumber = betslip.getMultiplierNumber?.() || 1;
  const cost = comboBoardsNumber * multiplierNumber * PowerspinConstants.BASIC_BETTING_AMOUNT;

  return parseFloat(cost.toFixed(2));
});

const isValidComboSelection = computed(() => {
  if (!props.betslip?.wager?.wheels) return true;
  return !props.betslip.wager.wheels.some((wheel) => wheel.isEmpty());
});

function getWheelSelections(wheel) {
  const selections = [];

  Object.values(wheel.categories || {}).forEach((category) => {
    if (betslipUtils.isWheelCategoryEmpty(category)) return;

    switch (category.type) {
      case PowerspinConstants.GAME_CATEGORY.NUMBER:
        (category.boards?.[0]?.panels?.[0]?.selection || []).forEach((value) => {
          selections.push({
            value,
            classname: `simple-number-board-${numberToThemeMap[value]}`,
          });
        });
        break;

      case PowerspinConstants.GAME_CATEGORY.SYMBOL:
        selections.push({ classname: 'symbol-board' });
        break;

      case PowerspinConstants.GAME_CATEGORY.COLOR:
        (category.boards || []).forEach((board) => {
          const color = SIDESCREEN_SELECTION_SYMBOL_COLOR_MAPPER[board.betType];
          selections.push({
            value: BOARD_COLOR_MODIFIER_TO_LABEL[`color-board-${color}`],
            classname: `color-board-${color}`,
          });
        });
        break;

      case PowerspinConstants.GAME_CATEGORY.OVER_UNDER:
        (category.boards || []).forEach((board) => {
          const mapping = SIDESCREEN_SELECTION_UNDER_OVER_MAPPER[board.betType];
          if (mapping) {
            selections.push(mapping);
          }
        });
        break;
    }
  });

  return selections;
}

function getWheelLogo(index) {
  return COMBO_PREFIX_IMAGE_ARRAY[index] || powerspinLogo;
}

function handleResetWheels() {
  resetWheels({ betslipIndex: props.betslipIndex });
}
</script>

<template>
  <div class="combo-selections-item">
    <div class="combo-selections-item__header">
      <div class="combo-selections-item__amount">ΠΟΣΟ: {{ calculateCost }}€</div>
    </div>

    <div v-for="({ wheel, index }, serialIndex) in notEmptyWheels" :key="index" class="combo-selections-item__wheel">
      <div class="combo-selections-item__wheel-content">
        <img class="combo-selections-item__logo" :src="getWheelLogo(index)" width="31" height="31" alt="wheel logo" />
        <div class="combo-selections-item__items">
          <PowerspinSidescreenSelectionItem
            v-for="(selection, selIndex) in getWheelSelections(wheel)"
            :key="selIndex"
            :type="selection.classname">
            {{ selection.value }}
          </PowerspinSidescreenSelectionItem>
        </div>
      </div>

      <div v-if="serialIndex === notEmptyWheels.length - 1" class="combo-selections-item__actions">
        <div v-if="!isValidComboSelection" class="combo-selections-item__error">⚠️</div>
        <BaseClearButton :theme="clearButtonTheme" @click="handleResetWheels" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.combo-selections-item {
  @apply atw:pb-2;
}

.combo-selections-item__header {
  @apply atw:flex atw:items-center atw:justify-between atw:pb-1;
}

.combo-selections-item__amount {
  @apply atw:text-sm atw:font-bold atw:uppercase atw:ml-1;
}

.combo-selections-item__wheel {
  @apply atw:flex atw:justify-between atw:items-center;
}

.combo-selections-item__wheel-content {
  @apply atw:flex atw:items-center;
}

.combo-selections-item__logo {
  @apply atw:mx-1 atw:self-start;
}

.combo-selections-item__items {
  @apply atw:flex atw:flex-wrap atw:ml-1;
}

.combo-selections-item__actions {
  @apply atw:flex atw:items-center atw:justify-end;
}

.combo-selections-item__error {
  @apply atw:text-xl atw:mr-2;
  color: #b5c4ca;
}
</style>
