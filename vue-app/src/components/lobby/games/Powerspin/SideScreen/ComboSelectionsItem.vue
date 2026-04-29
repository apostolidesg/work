<template>
  <div class="combo-selections-item">
    <div class="combo-selections-item__wrapper">
      <div class="combo-selections-item__header">
        <div class="combo-selections-item__amount">{{ $t('amount') }}: {{ calculateCost(betslip) }}€</div>
      </div>
      <div
        v-for="({ wheel, index }, serialIndex) in notEmptyWheels"
        :key="index"
        class="combo-selections-item__wheels d-flex flex-column"
      >
        <div class="d-flex justify-content-between">
          <div class="combo-selections-item__wheels-prefix">
            <img
              class="combo-selections-item__game-logo"
              :src="comboPrefixImageArray[index]"
              width="31"
              height="31"
              alt="prefix logo"
            />
            <div class="combo-selections-item__container">
              <PowerspinSidescreenSelectionItem
                v-for="(selection, index) in wheelSelections(wheel)"
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
          <div class="combo-selections-item__actions">
            <div v-if="serialIndex === notEmptyWheels.length - 1" class="combo-selections-item__actions-buttons">
              <div v-if="!isValidComboSelection" id="comboSelectionError" @click="showItemError = !showItemError">
                <i><FontAwesomeIcon class="icon" icon="info-circle" /></i>
                <b-tooltip target="comboSelectionError" :show.sync="showItemError" placement="top">
                  <strong>{{ $t('powerspin.sidescreen.comboSelectionError') }}</strong>
                </b-tooltip>
              </div>
              <BaseClearButton
                id="ssbt_base-clear-button-combo-selection"
                theme="white"
                @click.stop="resetWheels({ betslipIndex })"
              />
            </div>
          </div>
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
import powerspinLogo from '../../../../../assets/power-spin/powerspin-logo-ON.png';
import combo2Logo from '../../../../../assets/power-spin/combo2-sidescreen.svg';
import combo3Logo from '../../../../../assets/power-spin/combo3-sidescreen.svg';
import betslipUtils from '../../../../../util/betslipUtils';
import PowerspinSidescreenSelectionItem from './PowerspinSidescreenSelectionItem';
import Mappings from '../../../../../util/Mappings';

const COMBO_PREFIX_IMAGE_ARRAY = [powerspinLogo, combo2Logo, combo3Logo];

library.add(faInfoCircle);

const BOARD_COLOR_MODIFIER_TO_LOCALE = {
  'color-board-red': 'powerspinColorCategories.red',
  'color-board-green': 'powerspinColorCategories.green',
  'color-board-blue': 'powerspinColorCategories.blue',
};

export default {
  name: 'ComboSelectionsItem',
  components: { PowerspinSidescreenSelectionItem, BaseClearButton, FontAwesomeIcon },
  props: {
    betslip: {
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
    this.comboPrefixImageArray = COMBO_PREFIX_IMAGE_ARRAY;
    this.boardColorModifier = BOARD_COLOR_MODIFIER_TO_LOCALE;
  },
  computed: {
    ...mapGetters(moduleTypes.POWERSPIN_GAME_STORE_MODULE, {
      wheelsCost: powerspinStoreModuleTypes.getters.GET_WHEELS_COST,
    }),
    notEmptyWheels() {
      return this.betslip.wager.wheels.reduce((acc, wheel, index) => {
        !wheel.isEmpty() && acc.push({ wheel, index });
        return acc;
      }, []);
    },
    isValidComboSelection() {
      return !this.betslip.wager.wheels.some((wheel) => wheel.isEmpty());
    },
  },
  methods: {
    ...mapActions(moduleTypes.POWERSPIN_GAME_STORE_MODULE, {
      resetWheels: powerspinStoreModuleTypes.actions.RESET_WHEELS,
    }),
    calculateCost(betslip) {
      return this.wheelsCost({ betslip });
    },
    wheelSelections(wheel) {
      return Object.values(wheel.categories)
        .filter((category) => !betslipUtils.isWheelCategoryEmpty(category))
        .reduce((selectionsAcc, category) => {
          switch (category.type) {
            case powerspinConstants.GAME_CATEGORY.NUMBER:
              return [
                ...selectionsAcc,
                ...category.boards[0].panels[0].selection.reduce(
                  (acc, value) => [
                    ...acc,
                    {
                      value,
                      classname: `simple-number-board-${this.numberToThemeMap[value]}`,
                    },
                  ],
                  []
                ),
              ];
            case powerspinConstants.GAME_CATEGORY.SYMBOL:
              return [...selectionsAcc, { classname: 'symbol-board' }];
            case powerspinConstants.GAME_CATEGORY.COLOR:
              return [
                ...selectionsAcc,
                ...category.boards.reduce(
                  (acc, board) => [
                    ...acc,
                    {
                      value: Mappings.SIDESCREEN_SELECTION_SYMBOL_COLOR_MAPPER[board.betType],
                      classname: `color-board-${Mappings.SIDESCREEN_SELECTION_SYMBOL_COLOR_MAPPER[board.betType]}`,
                    },
                  ],
                  []
                ),
              ];
            case powerspinConstants.GAME_CATEGORY.OVER_UNDER:
              return [
                ...selectionsAcc,
                ...category.boards.reduce(
                  (acc, board) => [...acc, Mappings.SIDESCREEN_SELECTION_UNDER_OVER_MAPPER[board.betType]],
                  []
                ),
              ];
            default:
              return [];
          }
        }, []);
    },
  },
};
</script>

<style lang="scss" scoped>
.combo-selections-item {
  &__wrapper {
    display: flex;
    flex-direction: column;
    padding-bottom: 10px;
  }

  &__header {
    padding-bottom: 2px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__amount {
    padding-top: 1px;
    font-style: normal;
    margin-left: 3px;
    font-weight: 700;
    font-size: 14px;
    text-transform: uppercase;
  }

  &__wheels {
    display: flex;
    justify-content: space-between;

    &-prefix {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  &__container {
    display: flex;
    flex-wrap: wrap;
    margin-left: 6px;
  }

  &__selection {
    margin: 3px;
  }

  &__game-logo {
    align-self: start;
    margin-left: 5px;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    &-buttons {
      display: flex;
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
}
</style>
