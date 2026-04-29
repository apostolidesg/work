<script setup>
import { computed } from 'vue';
import { usePowerspin } from '@/composables/usePowerspin';
import PowerspinConstants from '@/util/powerspin/Constants';

import WheelCategoryLayout from '@/components/Common/WheelCategoryLayout.vue';
import NumberSelection from './NumberSelection.vue';
import PowerspinSymbol from '@/components/Common/PowerspinSymbol.vue';
import ColorSelection from './ColorSelection.vue';
import UnderOverSelection from './UnderOverSelection.vue';

const props = defineProps({
  wheelIndex: {
    type: Number,
    required: true,
  },
  hasSeparator: {
    type: Boolean,
    default: false,
  },
  separatorColor: {
    type: String,
    default: 'green',
    validator: (value) => ['red', 'green', 'blue'].includes(value),
  },
});

const {
  getWheel,
  wheelsLength,
  toggleMultipliers,
  toggleGameType,
  setRequestedNumber,
  setColumnNumber,
  quickPickClicked,
} = usePowerspin();

const multipliers = PowerspinConstants.MULTIPLIERS_SET;

const ILOT_GAMETYPE_TO_STRING = {
  [PowerspinConstants.ILOT_GAMETYPES.PLAY_COLOR_RED]: 'red',
  [PowerspinConstants.ILOT_GAMETYPES.PLAY_COLOR_BLUE]: 'blue',
  [PowerspinConstants.ILOT_GAMETYPES.PLAY_COLOR_GREEN]: 'green',
  [PowerspinConstants.ILOT_GAMETYPES.PLAY_OVER]: 'o',
  [PowerspinConstants.ILOT_GAMETYPES.PLAY_UNDER]: 'u',
};

const categoryLabels = {
  [PowerspinConstants.GAME_CATEGORY.NUMBER]: 'ΑΡΙΘΜΟΣ',
  [PowerspinConstants.GAME_CATEGORY.SYMBOL]: 'ΣΥΜΒΟΛΟ',
  [PowerspinConstants.GAME_CATEGORY.COLOR]: 'ΖΩΝΗ',
  [PowerspinConstants.GAME_CATEGORY.OVER_UNDER]: 'OVER/UNDER 12.5',
};

const selectedWheel = computed(() => getWheel(props.wheelIndex));

const numberBoardPanel = computed(
  () => selectedWheel.value?.getNumberBoard()?.panels?.[0] || { selection: [], requested: [] }
);

const isSelectedWheelEmpty = computed(() => selectedWheel.value?.isEmpty() ?? true);

const activeTextTheme = computed(() => (isSelectedWheelEmpty.value ? 'black' : 'white'));

const bettingAmountTheme = computed(() => (isSelectedWheelEmpty.value ? 'light-blue' : 'blue'));

const underOverValue = computed(() => {
  if (!selectedWheel.value) return [];
  return selectedWheel.value.getOverUnderBoards().map((board) => ILOT_GAMETYPE_TO_STRING[board.betType]);
});

const selectedColors = computed(() => {
  if (!selectedWheel.value) return [];
  return selectedWheel.value.getColorBoards().map((board) => ILOT_GAMETYPE_TO_STRING[board.betType]);
});

const symbolSelected = computed(() => !!selectedWheel.value?.getSymbolBoard()?.betType);

const dividerSize = computed(() => (wheelsLength.value === 1 ? 'shrink' : 'stretch'));

function getSelectedMultipliers(category) {
  if (!selectedWheel.value) return [];
  switch (category) {
    case PowerspinConstants.GAME_CATEGORY.NUMBER:
      return selectedWheel.value.getNumberBoard()?.multipliers || [];
    case PowerspinConstants.GAME_CATEGORY.SYMBOL:
      return selectedWheel.value.getSymbolBoard()?.multipliers || [];
    case PowerspinConstants.GAME_CATEGORY.COLOR:
      return selectedWheel.value.categories[PowerspinConstants.GAME_CATEGORY.COLOR]?.multipliers || [];
    case PowerspinConstants.GAME_CATEGORY.OVER_UNDER:
      return selectedWheel.value.categories[PowerspinConstants.GAME_CATEGORY.OVER_UNDER]?.multipliers || [];
    default:
      return [];
  }
}

function updateMultipliers(category, multiplier) {
  toggleMultipliers({ wheelIndex: props.wheelIndex, gameCategory: category, multipliers: multiplier });
}

function requestedNumberClicked(number) {
  setRequestedNumber({ wheelIndex: props.wheelIndex, number });
}

function columnNumberClicked(number) {
  setColumnNumber({ wheelIndex: props.wheelIndex, number });
}

function selectRandomNumbers() {
  quickPickClicked({ wheelIndex: props.wheelIndex });
}

function handleToggleColor(color) {
  const gameTypeMap = {
    red: PowerspinConstants.ILOT_GAMETYPES.PLAY_COLOR_RED,
    blue: PowerspinConstants.ILOT_GAMETYPES.PLAY_COLOR_BLUE,
    green: PowerspinConstants.ILOT_GAMETYPES.PLAY_COLOR_GREEN,
  };
  toggleGameType({ wheelIndex: props.wheelIndex, gameType: gameTypeMap[color] });
}

function handleToggleUnderOver(option) {
  const gameTypeMap = {
    u: PowerspinConstants.ILOT_GAMETYPES.PLAY_UNDER,
    o: PowerspinConstants.ILOT_GAMETYPES.PLAY_OVER,
  };
  toggleGameType({ wheelIndex: props.wheelIndex, gameType: gameTypeMap[option] });
}

function handleToggleSymbol() {
  toggleGameType({ wheelIndex: props.wheelIndex, gameType: PowerspinConstants.ILOT_GAMETYPES.PLAY_SYMBOL });
}
</script>

<template>
  <div
    class="single-play"
    :class="[{ 'single-play--active': !isSelectedWheelEmpty }, { 'single-play--shrinked': wheelsLength > 2 }]">
    <div class="single-play__wheels" :class="{ 'single-play__wheels--padded': wheelsLength <= 2 }">
      <!-- Number Category -->
      <div :id="`single-play-wheel-${wheelIndex}-category-number`">
        <WheelCategoryLayout
          :title="categoryLabels[PowerspinConstants.GAME_CATEGORY.NUMBER]"
          :multipliers="multipliers"
          :selected-multipliers="getSelectedMultipliers(PowerspinConstants.GAME_CATEGORY.NUMBER)"
          :show-betting-amount="wheelsLength === 1"
          :text-theme="activeTextTheme"
          :theme="bettingAmountTheme"
          :disable-betting-amount="isSelectedWheelEmpty"
          @update-multipliers="(mul) => updateMultipliers(PowerspinConstants.GAME_CATEGORY.NUMBER, mul)">
          <NumberSelection
            :wheel-index="wheelIndex"
            :text-theme="activeTextTheme"
            :is-streched="wheelsLength < 3"
            :show-header="wheelsLength === 1"
            :number-board-panel="numberBoardPanel"
            :id-suffix="`wheel-${wheelIndex}`"
            @requested-number-click="requestedNumberClicked"
            @column-number-click="columnNumberClicked"
            @random-pick-click="selectRandomNumbers" />
        </WheelCategoryLayout>
        <div
          class="single-play__divider"
          :class="[
            `single-play__divider--${dividerSize}`,
            { 'single-play__divider--active': !isSelectedWheelEmpty },
          ]" />
      </div>

      <!-- Symbol Category -->
      <div :id="`single-play-wheel-${wheelIndex}-category-symbol`">
        <WheelCategoryLayout
          :title="categoryLabels[PowerspinConstants.GAME_CATEGORY.SYMBOL]"
          :multipliers="multipliers"
          :selected-multipliers="getSelectedMultipliers(PowerspinConstants.GAME_CATEGORY.SYMBOL)"
          :show-betting-amount="wheelsLength === 1"
          :text-theme="activeTextTheme"
          :theme="bettingAmountTheme"
          :disable-betting-amount="isSelectedWheelEmpty"
          @update-multipliers="(mul) => updateMultipliers(PowerspinConstants.GAME_CATEGORY.SYMBOL, mul)">
          <PowerspinSymbol :value="symbolSelected" @input="handleToggleSymbol" />
        </WheelCategoryLayout>
        <div
          class="single-play__divider"
          :class="[
            `single-play__divider--${dividerSize}`,
            { 'single-play__divider--active': !isSelectedWheelEmpty },
          ]" />
      </div>

      <!-- Color Category -->
      <div :id="`single-play-wheel-${wheelIndex}-category-color`">
        <WheelCategoryLayout
          :title="categoryLabels[PowerspinConstants.GAME_CATEGORY.COLOR]"
          :multipliers="multipliers"
          :selected-multipliers="getSelectedMultipliers(PowerspinConstants.GAME_CATEGORY.COLOR)"
          :show-betting-amount="wheelsLength === 1"
          :text-theme="activeTextTheme"
          :theme="bettingAmountTheme"
          :disable-betting-amount="isSelectedWheelEmpty"
          @update-multipliers="(mul) => updateMultipliers(PowerspinConstants.GAME_CATEGORY.COLOR, mul)">
          <ColorSelection
            :wheel-index="wheelIndex"
            :text-theme="activeTextTheme"
            :colors-selected="selectedColors"
            :shrink="wheelsLength > 2"
            @color-clicked="handleToggleColor" />
        </WheelCategoryLayout>
        <div
          class="single-play__divider"
          :class="[
            `single-play__divider--${dividerSize}`,
            { 'single-play__divider--active': !isSelectedWheelEmpty },
          ]" />
      </div>

      <!-- Over/Under Category -->
      <div :id="`single-play-wheel-${wheelIndex}-category-overunder`">
        <WheelCategoryLayout
          :title="categoryLabels[PowerspinConstants.GAME_CATEGORY.OVER_UNDER]"
          :multipliers="multipliers"
          :selected-multipliers="getSelectedMultipliers(PowerspinConstants.GAME_CATEGORY.OVER_UNDER)"
          :show-betting-amount="wheelsLength === 1"
          :text-theme="activeTextTheme"
          :theme="bettingAmountTheme"
          :disable-betting-amount="isSelectedWheelEmpty"
          @update-multipliers="(mul) => updateMultipliers(PowerspinConstants.GAME_CATEGORY.OVER_UNDER, mul)">
          <UnderOverSelection
            :text-theme="activeTextTheme"
            :selected-values="underOverValue"
            @option-selected="handleToggleUnderOver" />
        </WheelCategoryLayout>
      </div>
    </div>

    <div v-if="hasSeparator" class="single-play__separator" :class="`single-play__separator--${separatorColor}`" />
  </div>
</template>

<style scoped>
.single-play {
  width: 100%;
  display: flex;
  flex-direction: row;
  padding-bottom: 80px;
  background: linear-gradient(180deg, #d3edfd 0%, #f5fbfe 14.06%, #f4fafe 89.58%, #d3edfd 100%);
  background-size: 100%;
  position: relative;
  z-index: 100;
}

.single-play::before {
  background: linear-gradient(180deg, #17277c 0%, #2e1e93 15.1%, #2e1e93 85.42%, #17277c 100%);
  content: '';
  display: block;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  width: 100%;
  z-index: -100;
  transition: opacity 0.35s;
}

.single-play--active::before {
  opacity: 1;
}

.single-play__wheels {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.single-play__wheels--padded {
  padding-top: 16px;
}

.single-play__divider {
  height: 1px;
  border: 1px solid rgba(39, 59, 147, 0.1);
  margin: 15px 24px 5px 20px;
}

.single-play__divider--shrink {
  margin: 15px 24px 5px 20px;
}

.single-play__divider--stretch {
  margin: 20px 24px 20px 20px;
}

.single-play__divider--active {
  border: 1px solid #5136f9;
}

.single-play__separator {
  height: 100%;
}

.single-play__separator--green {
  border: 1px solid #39ff14;
}

.single-play__separator--red {
  border: 1px solid #ff6b35;
}
</style>
