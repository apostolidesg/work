<template>
  <div class="powerspin-play-markets h-100">
    <div
      class="powerspin-play-markets__categories"
      :class="[{ 'powerspin-play-markets__categories--active': !areMarketsEmpty }]"
    >
      <div
        v-for="({ category, component }, index) in marketsCategories"
        :key="index"
        :id="`markets-category-${category.toLowerCase()}`"
      >
        <MarketsCategoryLayout
          :title="`markets.categories.${category}.title`"
          :multipliers="multipliers"
          :selected-multipliers="selectedMultipliers(category)"
          @update-multipliers="mul => updateMultipliers(category, mul)"
          :disabled-betting-amount="isCategoryEmpty(category)"
          :theme="activeTheme"
        >
          <component :is="component" v-bind="categoryProps(category)" v-on="gameListeners(category)" class="my-3" />
        </MarketsCategoryLayout>
        <div
          v-if="index !== marketsCategories.length - 1"
          class="powerspin-play-markets__divider"
          :class="[{ 'powerspin-play-markets__divider--active': !areMarketsEmpty }]"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import CONSTANTS from '../../../../../util/powerspinConstants';
import MarketsCategoryLayout from './MarketsCategoryLayout';
import NumberSelection from './NumberSelection';
import MarketsOptionsSelection from './MarketsOptionsSelection';
import { mapActions, mapGetters } from 'vuex';
import moduleTypes from '../../../../../store/modules/types';
import powerspinModuleTypes from '../../../../../store/modules/PowerspinBetslipStoreModule/types';
import betslipUtils from '../../../../../util/betslipUtils';

const MARKETS_CATEGORIES = {
  [CONSTANTS.MARKETS_CATEGORY.NUMBER_ON_WHEEL]: {
    component: 'NumberSelection',
    category: CONSTANTS.MARKETS_CATEGORY.NUMBER_ON_WHEEL,
  },
  [CONSTANTS.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL]: {
    component: 'MarketsOptionsSelection',
    category: CONSTANTS.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL,
    options: [
      {
        value: CONSTANTS.ILOT_GAMETYPES.PLAY_SYMBOL_ON_AT_LEAST_ONE_WHEEL,
        title: 'atLeastOnWheel',
      },
      {
        value: CONSTANTS.ILOT_GAMETYPES.PLAY_SYMBOL_ON_NONE_WHEEL,
        title: 'noWheel',
      },
    ],
  },
  [CONSTANTS.MARKETS_CATEGORY.WHEELS_WITH_NUMBER]: {
    component: 'MarketsOptionsSelection',
    category: CONSTANTS.MARKETS_CATEGORY.WHEELS_WITH_NUMBER,
    options: [
      {
        value: CONSTANTS.ILOT_GAMETYPES.PLAY_NUMBER_ON_TWO_WHEELS,
        title: 'twoWheels',
      },
      {
        value: CONSTANTS.ILOT_GAMETYPES.PLAY_NUMBER_ON_THREE_WHEELS,
        title: 'threeWheels',
      },
    ],
  },
};
export default {
  name: 'PlayMarkets',
  components: { MarketsCategoryLayout, NumberSelection, MarketsOptionsSelection },
  computed: {
    ...mapGetters(moduleTypes.POWERSPIN_GAME_STORE_MODULE, {
      getMarkets: powerspinModuleTypes.getters.GET_MARKETS,
    }),
    numberBoardPanel() {
      return this.getMarkets.getNumberOnWheelBoard().panels[0];
    },
    areMarketsEmpty() {
      return this.getMarkets.isEmpty();
    },
    activeTheme() {
      return this.areMarketsEmpty ? 'light' : 'dark';
    },
  },
  methods: {
    ...mapActions(moduleTypes.POWERSPIN_GAME_STORE_MODULE, {
      setNumberOnAnyWheel: powerspinModuleTypes.actions.SET_MARKETS_NUMBER_ON_ANY_WHEEL,
      toggleMarketGameType: powerspinModuleTypes.actions.TOGGLE_MARKET_GAME_TYPE,
      setMultipliers: powerspinModuleTypes.actions.TOGGLE_MARKET_MULTIPLIERS,
    }),
    updateMultipliers(gameCategory, multipliers) {
      this.setMultipliers({ gameCategory, multipliers });
    },
    selectedMultipliers(gameCategory) {
      switch (gameCategory) {
        case CONSTANTS.MARKETS_CATEGORY.NUMBER_ON_WHEEL:
          return this.getMarkets.getNumberOnWheelBoard().multipliers;
        case CONSTANTS.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL:
        case CONSTANTS.MARKETS_CATEGORY.WHEELS_WITH_NUMBER:
          return this.getMarkets.categories[gameCategory].multipliers;
        default:
          return [];
      }
    },
    isCategoryEmpty(marketCategory) {
      return betslipUtils.isMarketsCategoryEmpty(this.getMarkets.categories[marketCategory]);
    },
    numberClicked(number) {
      this.setNumberOnAnyWheel(number);
    },
    categoryOptionClicked(gameType) {
      this.toggleMarketGameType(gameType);
    },
    getCategoryValue(marketCategory) {
      return this.getMarkets.categories[marketCategory]?.boards?.map(board => board.betType) || [];
    },
    categoryProps(marketCategory) {
      return {
        ...(marketCategory === CONSTANTS.MARKETS_CATEGORY.NUMBER_ON_WHEEL && {
          showHeader: false,
          textTheme: this.areMarketsEmpty ? 'black' : 'white',
          numberBoardPanel: this.numberBoardPanel,
          idSuffix: 'markets',
        }),
        ...((marketCategory === CONSTANTS.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL ||
          marketCategory === CONSTANTS.MARKETS_CATEGORY.WHEELS_WITH_NUMBER) && {
          options: MARKETS_CATEGORIES[marketCategory].options.map(option => ({
            ...option,
            title: `markets.categories.${marketCategory}.options.${option.title}.mainScreen`,
          })),
          optionsSelected: this.getCategoryValue(marketCategory),
          theme: this.activeTheme,
        }),
      };
    },
    gameListeners(marketCategory) {
      return {
        ...(marketCategory === CONSTANTS.MARKETS_CATEGORY.NUMBER_ON_WHEEL && {
          'column-number-click': this.numberClicked,
        }),
        ...((marketCategory === CONSTANTS.MARKETS_CATEGORY.WHEELS_WITH_NUMBER ||
          marketCategory === CONSTANTS.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL) && {
          'option-clicked': this.categoryOptionClicked,
        }),
      };
    },
  },
  created() {
    this.multipliers = CONSTANTS.MULTIPLIERS_SET;
    this.marketsCategories = Object.values(MARKETS_CATEGORIES);
  },
};
</script>

<style scoped lang="scss">
.powerspin-play-markets {
  display: flex;
  flex-direction: row;

  &__categories {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-top: 30px;
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
  }

  &__divider {
    height: 1px;
    border: 1px solid rgba(39, 59, 147, 0.1);
    margin: 5px 20px 15px 20px;

    &--active {
      border: 1px solid #5136f9;
    }
  }
}
</style>
