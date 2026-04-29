<template>
  <div class="simple-selections-item">
    <div class="simple-selections-item__wrapper w-100">
      <div class="simple-selections-item__header">
        <div class="simple-selections-item__amount">{{ $t('amount') }}: {{ calculateCost }}€</div>
        <div v-if="categoryIsNumber(category)" class="simple-selections-item__betslip-text">{{ categoryPlayType }}</div>
      </div>
      <div class="simple-selections-item__betting-numbers">
        <div class="simple-selections-item__betting-numbers__prefix">
          <img
            class="simple-selections-item__powerspin-logo"
            width="31"
            height="31"
            src="../../../../../assets/power-spin/powerspin-logo-ON.png"
            alt="powespin"
          />
          <div class="simple-selections-item__betting-numbers-wrapper">
            <div class="simple-selections-item__container">
              <PowerspinSidescreenSelectionItem
                v-for="(selection, index) in selections"
                :key="index"
                :type="selection.classname"
              >
                <div>
                  {{
                    boardColorModifier[selection.classname]
                      ? $t(boardColorModifier[selection.classname])
                      : selection.value
                  }}
                </div>
              </PowerspinSidescreenSelectionItem>
            </div>
          </div>
        </div>
        <div class="simple-selections-item__actions">
          <div v-if="!isValidSimpleSelection" id="simpleSelectionError" @click="showItemError = !showItemError">
            <i><FontAwesomeIcon class="icon" icon="info-circle" /></i>
            <b-tooltip target="simpleSelectionError" :show.sync="showItemError" placement="top">
              <strong>{{ $t('powerspin.sidescreen.simpleSelectionError') }}</strong>
            </b-tooltip>
          </div>
          <BaseClearButton
            id="ssbt_base_clear_button_simple_selection"
            theme="white"
            @click.stop="resetWheelCategory(category)"
          ></BaseClearButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseClearButton from '../../../../common/BaseClearButton';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faInfoCircle } from '@fortawesome/fontawesome-free-solid';
import { library } from '@fortawesome/fontawesome-svg-core';
import moduleTypes from '../../../../../store/modules/types';
import powerspinStoreModuleTypes from '../../../../../store/modules/PowerspinBetslipStoreModule/types';
import powerspinConstants from '../../../../../util/powerspinConstants';
import { mapActions, mapGetters } from 'vuex';
import PowerspinSidescreenSelectionItem from './PowerspinSidescreenSelectionItem';
import Mappings from '../../../../../util/Mappings';
import betslipUtils from '../../../../../util/betslipUtils';

library.add(faInfoCircle);

const BOARD_COLOR_MODIFIER_TO_LOCALE = {
  'color-board-red': 'powerspinColorCategories.red',
  'color-board-green': 'powerspinColorCategories.green',
  'color-board-blue': 'powerspinColorCategories.blue',
};

export default {
  name: 'SimpleSelectionItem',
  components: { PowerspinSidescreenSelectionItem, BaseClearButton, FontAwesomeIcon },
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
  data() {
    return {
      showItemError: false,
    };
  },
  created() {
    this.numberToThemeMap = Object.keys(powerspinConstants.BUTTON_COLOR_MAPPER).reduce((acc, theme) => {
      Object.values(powerspinConstants.BUTTON_COLOR_MAPPER[theme]).forEach((number) => {
        acc[number] = theme;
      });
      return acc;
    }, {});
    this.boardColorModifier = BOARD_COLOR_MODIFIER_TO_LOCALE;
  },
  computed: {
    ...mapGetters(moduleTypes.POWERSPIN_GAME_STORE_MODULE, {
      wheelCategoryCost: powerspinStoreModuleTypes.getters.GET_CATEGORY_COST,
    }),
    calculateCost() {
      return this.wheelCategoryCost({ category: this.category });
    },
    categoryPlayType() {
      return (
        this.category.boards[0].panels[0].requested
          .map((requested) => this.$t(`powerspinRequestedNumberLabels.${requested}`))
          .join(' ') || ''
      );
    },
    isValidSimpleSelection() {
      return (
        this.category.type !== powerspinConstants.GAME_CATEGORY.NUMBER ||
        betslipUtils.isColumnValid({ board: this.category.boards[0] })
      );
    },
    selections() {
      switch (this.category.type) {
        case powerspinConstants.GAME_CATEGORY.NUMBER:
          return this.category.boards[0].panels[0].selection.reduce(
            (acc, value) => [
              ...acc,
              {
                value,
                classname: `simple-number-board-${this.numberToThemeMap[value]}`,
              },
            ],
            []
          );
        case powerspinConstants.GAME_CATEGORY.SYMBOL:
          return [{ classname: 'symbol-board' }];
        case powerspinConstants.GAME_CATEGORY.COLOR:
          return this.category.boards.reduce(
            (acc, board) => [
              ...acc,
              {
                value: Mappings.SIDESCREEN_SELECTION_SYMBOL_COLOR_MAPPER[board.betType],
                classname: `color-board-${Mappings.SIDESCREEN_SELECTION_SYMBOL_COLOR_MAPPER[board.betType]}`,
              },
            ],
            []
          );
        case powerspinConstants.GAME_CATEGORY.OVER_UNDER:
          return this.category.boards.reduce(
            (acc, board) => [...acc, Mappings.SIDESCREEN_SELECTION_UNDER_OVER_MAPPER[board.betType]],
            []
          );
        default:
          return [];
      }
    },
  },
  methods: {
    ...mapActions(moduleTypes.POWERSPIN_GAME_STORE_MODULE, {
      resetCategory: powerspinStoreModuleTypes.actions.RESET_CATEGORY,
    }),
    categoryIsNumber({ type }) {
      return type === powerspinConstants.GAME_CATEGORY.NUMBER;
    },
    resetWheelCategory(category) {
      this.resetCategory({ betslipIndex: this.betslipIndex, categoryType: category.type });
    },
  },
};
</script>

<style lang="scss" scoped>
.simple-selections-item {
  &__wrapper {
    display: flex;
    flex-direction: column;
    padding-bottom: 10px;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__amount {
    font-style: normal;
    margin-left: 3px;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    text-transform: uppercase;
  }

  &__betslip-text {
    margin-right: 3px;
    font-style: normal;
    text-align: right;
    font-weight: 900;
    font-size: 16px;
    color: #d70c7f;
  }

  &__betting-numbers {
    display: flex;
    justify-content: space-between;

    &__prefix {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  &__container {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
  }

  &__powerspin-logo {
    align-self: start;
    margin: 0 5px 0 5px;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .icon {
      font-size: 25px;
      color: #b5c4ca;
      margin: 0 8px;
    }

    ::v-deep .base-clear-button__trash {
      font-size: 25px;
      color: #b5c4ca;
    }
  }
}
</style>
