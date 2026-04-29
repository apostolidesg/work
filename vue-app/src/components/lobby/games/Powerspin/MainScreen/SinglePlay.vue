<template>
  <div
    class="single-play"
    :class="[{ 'single-play--active': !isSelectedWheelEmpty }, { 'single-play--shrinked': getWheelsLength > 2 }]"
  >
    <div :class="['single-play__wheels flex-grow-1', { 'pt-4': getWheelsLength <= 2 }]">
      <div
        v-for="({ title, category, component }, gameIndex) in gameCategories"
        :key="gameIndex"
        :id="`single-play-wheel-${wheelIndex}-category-${category.toLowerCase()}`"
      >
        <WheelCategoryLayout
          :title="$t(`powerspinGameCategories.${title}`)"
          :multipliers="multipliers"
          :selected-multipliers="selectedMultipliers(category)"
          :show-betting-amount="getWheelsLength === 1"
          :text-theme="activeTextTheme"
          :theme="bettingAmountTheme"
          :disable-betting-amount="isSelectedWheelEmpty"
          @update-multipliers="mul => updateMultipliers(category, mul)"
        >
          <component
            :is="component"
            :wheel-index="wheelIndex"
            v-bind="gameProps(category)"
            v-on="gameListeners(category)"
          />
        </WheelCategoryLayout>
        <div
          v-if="gameIndex !== gameCategories.length - 1"
          :class="[
            'single-play__divider',
            `single-play__divider--${dividerSize}`,
            { 'single-play__divider--active': !isSelectedWheelEmpty },
          ]"
        />
      </div>
    </div>
    <div v-if="hasSeparator" :class="`single-play__separator single-play__separator--${separatorColor}`" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import moduleTypes from '../../../../../store/modules/types';
import powerspinModuleTypes from '../../../../../store/modules/PowerspinBetslipStoreModule/types';
import CONSTANTS from '../../../../../util/powerspinConstants';
import NumberSelection from './NumberSelection.vue';
import PowerspinSymbol from '../../../../common/PowerspinSymbol';
import ColorSelection from './ColorSelection';
import UnderOverSelection from './UnderOverSelection';
import WheelCategoryLayout from '../../../../common/WheelCategoryLayout';

const GAME_CATEGORIES_ARRAY = [
  {
    component: 'NumberSelection',
    title: 'number',
    category: CONSTANTS.GAME_CATEGORY.NUMBER,
  },
  {
    component: 'PowerspinSymbol',
    title: 'symbol',
    category: CONSTANTS.GAME_CATEGORY.SYMBOL,
  },
  {
    component: 'ColorSelection',
    title: 'zone',
    category: CONSTANTS.GAME_CATEGORY.COLOR,
  },
  {
    component: 'UnderOverSelection',
    title: 'underOver',
    category: CONSTANTS.GAME_CATEGORY.OVER_UNDER,
  },
];

const ILOT_GAMETYPE_TO_STRING = {
  [CONSTANTS.ILOT_GAMETYPES.PLAY_COLOR_RED]: CONSTANTS.COLOR_SELECTION.RED,
  [CONSTANTS.ILOT_GAMETYPES.PLAY_COLOR_BLUE]: CONSTANTS.COLOR_SELECTION.BLUE,
  [CONSTANTS.ILOT_GAMETYPES.PLAY_COLOR_GREEN]: CONSTANTS.COLOR_SELECTION.GREEN,
  [CONSTANTS.ILOT_GAMETYPES.PLAY_OVER]: CONSTANTS.OVER_UNDER_SYMBOLS.OVER,
  [CONSTANTS.ILOT_GAMETYPES.PLAY_UNDER]: CONSTANTS.OVER_UNDER_SYMBOLS.UNDER,
};

export default {
  name: 'SinglePlay',
  components: { WheelCategoryLayout, UnderOverSelection, ColorSelection, PowerspinSymbol, NumberSelection },
  props: {
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
      validator: value => Object.values(CONSTANTS.COLOR_SELECTION).includes(value),
    },
  },
  computed: {
    ...mapGetters(moduleTypes.POWERSPIN_GAME_STORE_MODULE, {
      getWheel: powerspinModuleTypes.getters.GET_WHEEL,
      getWheelsLength: powerspinModuleTypes.getters.GET_WHEELS_LENGTH,
    }),
    selectedWheel() {
      return this.getWheel({ wheelIndex: this.wheelIndex });
    },
    numberBoardPanel() {
      return this.getWheel({ wheelIndex: this.wheelIndex }).getNumberBoard().panels[0];
    },
    isSelectedWheelEmpty() {
      return this.selectedWheel.isEmpty();
    },
    activeTextTheme() {
      return this.isSelectedWheelEmpty ? 'black' : 'white';
    },
    bettingAmountTheme() {
      return this.isSelectedWheelEmpty ? 'light-blue' : 'blue';
    },
    underOverValue() {
      return this.selectedWheel.getOverUnderBoards().map(board => {
        return ILOT_GAMETYPE_TO_STRING[board.betType];
      });
    },
    selectedColors() {
      return this.selectedWheel.getColorBoards().map(board => {
        return ILOT_GAMETYPE_TO_STRING[board.betType];
      });
    },
    dividerSize() {
      return this.getWheelsLength === 1 ? 'shrink' : 'stretch';
    },
  },
  methods: {
    ...mapActions(moduleTypes.POWERSPIN_GAME_STORE_MODULE, {
      setMultipliers: powerspinModuleTypes.actions.TOGGLE_MULTIPLIERS,
      toggleGameType: powerspinModuleTypes.actions.TOGGLE_GAME_TYPE,
      setRequestedNumber: powerspinModuleTypes.actions.SET_REQUESTED_NUMBER,
      setColumnNumber: powerspinModuleTypes.actions.SET_COLUMN_NUMBER,
      addQuickPick: powerspinModuleTypes.actions.QUICK_PICK_CLICKED,
    }),
    updateMultipliers(gameCategory, multipliers) {
      this.setMultipliers({ wheelIndex: this.wheelIndex, gameCategory, multipliers });
    },
    selectedMultipliers(gameCategory) {
      switch (gameCategory) {
        case CONSTANTS.GAME_CATEGORY.NUMBER:
          return this.selectedWheel.getNumberBoard().multipliers;
        case CONSTANTS.GAME_CATEGORY.SYMBOL:
          return this.selectedWheel.getSymbolBoard().multipliers;
        case CONSTANTS.GAME_CATEGORY.COLOR:
          return this.selectedWheel.categories[CONSTANTS.GAME_CATEGORY.COLOR].multipliers;
        case CONSTANTS.GAME_CATEGORY.OVER_UNDER:
          return this.selectedWheel.categories[CONSTANTS.GAME_CATEGORY.OVER_UNDER].multipliers;
        default:
          return [];
      }
    },
    requestedNumberClicked(number) {
      this.setRequestedNumber({ wheelIndex: this.wheelIndex, number });
    },
    columnNumberClicked(number) {
      this.setColumnNumber({ wheelIndex: this.wheelIndex, number });
    },
    selectRandomNumbers() {
      this.addQuickPick({ wheelIndex: this.wheelIndex });
    },
    toggleColor(color) {
      switch (color) {
        case CONSTANTS.COLOR_SELECTION.RED:
          this.toggleGameType({ wheelIndex: this.wheelIndex, gameType: CONSTANTS.ILOT_GAMETYPES.PLAY_COLOR_RED });
          break;
        case CONSTANTS.COLOR_SELECTION.BLUE:
          this.toggleGameType({ wheelIndex: this.wheelIndex, gameType: CONSTANTS.ILOT_GAMETYPES.PLAY_COLOR_BLUE });
          break;
        case CONSTANTS.COLOR_SELECTION.GREEN:
          this.toggleGameType({ wheelIndex: this.wheelIndex, gameType: CONSTANTS.ILOT_GAMETYPES.PLAY_COLOR_GREEN });
          break;
        default:
          break;
      }
    },
    toggleUnderOver(option) {
      switch (option) {
        case CONSTANTS.OVER_UNDER_SYMBOLS.UNDER:
          this.toggleGameType({ wheelIndex: this.wheelIndex, gameType: CONSTANTS.ILOT_GAMETYPES.PLAY_UNDER });
          break;
        case CONSTANTS.OVER_UNDER_SYMBOLS.OVER:
          this.toggleGameType({ wheelIndex: this.wheelIndex, gameType: CONSTANTS.ILOT_GAMETYPES.PLAY_OVER });
          break;
        default:
          break;
      }
    },
    toggleSymbol() {
      this.toggleGameType({ wheelIndex: this.wheelIndex, gameType: CONSTANTS.ILOT_GAMETYPES.PLAY_SYMBOL });
    },
    gameProps(gameCategory) {
      return {
        ...(gameCategory === CONSTANTS.GAME_CATEGORY.NUMBER && {
          textTheme: this.activeTextTheme,
          isStreched: this.getWheelsLength < 3,
          wheelIndex: this.wheelIndex,
          showHeader: this.getWheelsLength === 1,
          numberBoardPanel: this.numberBoardPanel,
          idSuffix: `wheel-${this.wheelIndex}`,
        }),
        ...(gameCategory === CONSTANTS.GAME_CATEGORY.SYMBOL && {
          value: !!this.selectedWheel.getSymbolBoard().betType,
        }),
        ...(gameCategory === CONSTANTS.GAME_CATEGORY.COLOR && {
          textTheme: this.activeTextTheme,
          colorsSelected: this.selectedColors,
          shrink: this.getWheelsLength > 2,
        }),
        ...(gameCategory === CONSTANTS.GAME_CATEGORY.OVER_UNDER && {
          textTheme: this.activeTextTheme,
          selectedValues: this.underOverValue,
        }),
      };
    },
    gameListeners(gameCategory) {
      return {
        ...(gameCategory === CONSTANTS.GAME_CATEGORY.NUMBER && {
          'requested-number-click': this.requestedNumberClicked,
          'column-number-click': this.columnNumberClicked,
          'random-pick-click': this.selectRandomNumbers,
        }),
        ...(gameCategory === CONSTANTS.GAME_CATEGORY.SYMBOL && {
          input: this.toggleSymbol,
        }),
        ...(gameCategory === CONSTANTS.GAME_CATEGORY.COLOR && {
          'color-clicked': this.toggleColor,
        }),
        ...(gameCategory === CONSTANTS.GAME_CATEGORY.OVER_UNDER && {
          'option-selected': this.toggleUnderOver,
        }),
      };
    },
  },
  created() {
    this.multipliers = CONSTANTS.MULTIPLIERS_SET;
    this.gameCategories = GAME_CATEGORIES_ARRAY;
  },
};
</script>

<style lang="scss" scoped>
@import '../../../../../scss-utils/powerspin/colors';

.single-play {
  width: 100%;
  display: flex;
  flex-direction: row;
  padding-bottom: 80px;
  background: linear-gradient(180deg, #d3edfd 0%, #f5fbfe 14.06%, #f4fafe 89.58%, #d3edfd 100%);
  background-size: 100%;
  position: relative;
  z-index: 100;
  &:before {
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
  &--active {
    &:before {
      opacity: 1;
    }
  }
  &__wheels {
    display: flex;
    flex-direction: column;
  }
  &__divider {
    height: 1px;
    border: 1px solid rgba(39, 59, 147, 0.1);
    margin: 15px 24px 5px 20px;
    &--shrink {
      margin: 15px 24px 5px 20px;
    }
    &--stretch {
      margin: 20px 24px 20px 20px;
    }
    &--active {
      border: 1px solid #5136f9;
    }
  }
  &__separator {
    height: 100vh;
    &--green {
      border: 1px solid $neon-green;
    }
    &--red {
      border: 1px solid $orange;
    }
  }
}
</style>
