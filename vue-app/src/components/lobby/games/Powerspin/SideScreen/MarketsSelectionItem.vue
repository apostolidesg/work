<template>
  <div class="powerspin-market-selection-item">
    <div class="powerspin-market-selection-item__cost">{{ $t('amount') }}: {{ cost }}€</div>
    <div class="powerspin-market-selection-item__selection">
      <span class="powerspin-market-selection-item__selection__title">{{ $t(itemTitle) }} :</span>
      <div class="powerspin-market-selection-item__selection__content">
        <PowerspinSidescreenSelectionItem
          v-for="(selection, index) in selections"
          :key="index"
          :type="selection.classname"
        >
          <div>
            {{ selection.value }}
          </div>
        </PowerspinSidescreenSelectionItem>
      </div>
      <div class="powerspin-market-selection-item__selection__actions">
        <BaseClearButton
          id="ssbt_base_clear_button_market_selection"
          theme="white"
          @click.stop="resetMarketsCategory(category)"
        ></BaseClearButton>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import moduleTypes from '../../../../../store/modules/types';
import powerspinStoreModuleTypes from '../../../../../store/modules/PowerspinBetslipStoreModule/types';
import powerspinConstants from '../../../../../util/powerspinConstants';
import PowerspinSidescreenSelectionItem from './PowerspinSidescreenSelectionItem.vue';
import BaseClearButton from '../../../../common/BaseClearButton.vue';
import Mappings from '../../../../../util/Mappings';

export default {
  name: 'MarketsSelectionItem',
  components: { BaseClearButton, PowerspinSidescreenSelectionItem },
  props: {
    category: {
      type: Object,
      required: true,
    },
    betslipIndex: {
      type: Number,
      required: true,
    },
  },
  created() {
    this.numberToThemeMap = Object.keys(powerspinConstants.BUTTON_COLOR_MAPPER).reduce((acc, theme) => {
      Object.values(powerspinConstants.BUTTON_COLOR_MAPPER[theme]).forEach((number) => {
        acc[number] = theme;
      });
      return acc;
    }, {});
  },
  computed: {
    ...mapGetters(moduleTypes.POWERSPIN_GAME_STORE_MODULE, {
      marketCategoryCost: powerspinStoreModuleTypes.getters.GET_CATEGORY_COST,
    }),
    cost() {
      return this.marketCategoryCost({ category: this.category });
    },
    selections() {
      switch (this.category.type) {
        case powerspinConstants.MARKETS_CATEGORY.NUMBER_ON_WHEEL:
          return this.category.boards[0].panels[0].selection.map((value) => ({
            value,
            classname: `simple-number-board-${this.numberToThemeMap[value]}`,
          }));
        case powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL:
        case powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_NUMBER:
          return this.category.boards.map((board) => ({
            value: this.$t(Mappings.SIDESCREEN_MARKET_TO_CATEGORY_MAPPER[board.betType]),
            classname: 'markets-board',
          }));
        default:
          return [];
      }
    },
    itemTitle() {
      return `markets.categories.${this.category.type}.shortTitle`;
    },
  },
  methods: {
    ...mapActions(moduleTypes.POWERSPIN_GAME_STORE_MODULE, {
      resetCategory: powerspinStoreModuleTypes.actions.RESET_MARKETS_CATEGORY,
    }),
    resetMarketsCategory(category) {
      this.resetCategory({ betslipIndex: this.betslipIndex, categoryType: category.type });
    },
  },
};
</script>

<style scoped lang="scss">
.powerspin-market-selection-item {
  display: flex;
  flex-direction: column;

  &__cost {
    font-style: normal;
    margin-left: 3px;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    text-transform: uppercase;
  }

  &__selection {
    padding: 5px 0 5px 0;
    display: flex;
    flex-direction: row;
    align-items: center;

    &__title {
      display: block;
      font-weight: 900;
      font-size: 9px;
      width: 50px;
      line-height: 10.5px;
      text-align: center;
    }

    &__content {
      padding: 0 5px 0 5px;
      display: grid;
      grid-template-columns: repeat(8, 1fr);
    }

    &__actions {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      ::v-deep .base-clear-button__trash {
        font-size: 25px;
        color: #b5c4ca;
      }
    }
  }
}
</style>
