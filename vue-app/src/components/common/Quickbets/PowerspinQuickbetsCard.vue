<template>
  <div class="powerspin-quickbets-cards">
    <div>
      <h2 class="powerspin-quickbets-cards__card-title" v-html="powerSpinInfoTitle"></h2>
    </div>
    <div class="powerspin-quickbets-cards__card-price">
      <div
        v-if="hasBetslipNumbers"
        class="powerspin-quickbets-cards__card-price-number"
        v-for="selection in numberSelections"
        :key="selection"
        :class="`powerspin-quickbets-cards__card-price-number--${numberToThemeMap[selection]}`"
      >
        <span>{{ selection }}</span>
      </div>
      <img
        class="powerspin-quickbets-cards__symbol"
        v-if="hasBetslipSymbol"
        src="@/assets/power-spin/symbol.svg"
        alt="powerspin symbol"
      />
      <div
        class="powerspin-quickbets-cards__color"
        :class="`powerspin-quickbets-cards__color--${colorSelection.class}`"
        v-if="hasBetslipColor"
      >
        {{ colorSelection.label }}
      </div>
    </div>
    <button class="powerspin-quickbets-cards-button">
      €{{ betslipValue }} <span v-if="getActiveReturnValue">- {{ $t('return') }} x{{ getActiveReturnValue }}</span>
    </button>
  </div>
</template>

<script>
import PowerspinConstants from '@/util/powerspinConstants';
import betslipUtils from '@/util/betslipUtils';
import moduleTypes from '@/store/modules/types';
import powerspinModuleTypes from '@/store/modules/PowerspinBetslipStoreModule/types';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'PowerspinQuickbetsCards',
  props: {
    card: {
      type: Object,
      required: true,
    },
    betslip: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(moduleTypes.POWERSPIN_GAME_STORE_MODULE, {
      quickplayBetslipData: powerspinModuleTypes.state.QUICKPLAY_BETSLIP_DATA,
    }),
    hasBetslipNumbers() {
      return !betslipUtils.isWheelCategoryEmpty(
        this.betslip.wager.wheels[0].categories[PowerspinConstants.GAME_CATEGORY.NUMBER]
      );
    },
    betslipValue() {
      return betslipUtils.calculateBetslipPrice(this.betslip, false);
    },
    numberToThemeMap() {
      return Object.keys(PowerspinConstants.BUTTON_COLOR_MAPPER).reduce((acc, theme) => {
        Object.values(PowerspinConstants.BUTTON_COLOR_MAPPER[theme]).forEach((number) => {
          acc[number] = theme;
        });
        return acc;
      }, {});
    },
    hasBetslipSymbol() {
      return !betslipUtils.isWheelCategoryEmpty(
        this.betslip.wager.wheels[0].categories[PowerspinConstants.GAME_CATEGORY.SYMBOL]
      );
    },
    hasBetslipOverUnder() {
      return (
        !betslipUtils.isWheelCategoryEmpty(
          this.betslip.wager.wheels[0].categories[PowerspinConstants.GAME_CATEGORY.OVER_UNDER]
        ) ||
        !betslipUtils.isWheelCategoryEmpty(
          this.betslip.wager.wheels[0].categories[PowerspinConstants.GAME_CATEGORY.UNDER]
        )
      );
    },
    hasBetslipColor() {
      return !betslipUtils.isWheelCategoryEmpty(
        this.betslip.wager.wheels[0].categories[PowerspinConstants.GAME_CATEGORY.COLOR]
      );
    },

    getActiveReturnValue() {
      return this.quickplayBetslipData?.return || 0;
    },
    numberBoard() {
      return this.betslip.wager.wheels[0].getNumberBoard();
    },
    symbolBoard() {
      return this.betslip.wager.wheels[0].getSymbolBoard();
    },
    overUnderBoard() {
      return this.betslip.wager.wheels[0].getOverUnderBoards();
    },
    colorBoard() {
      return this.betslip.wager.wheels[0].getColorBoards();
    },
    numberSelections() {
      return this.numberBoard.panels[0].selection;
    },
    colorSelection() {
      const colors = {
        [PowerspinConstants.ILOT_GAMETYPES.PLAY_COLOR_RED]: {
          label: this.$t('powerspinColorCategories.red'),
          class: 'red',
        },
        [PowerspinConstants.ILOT_GAMETYPES.PLAY_COLOR_GREEN]: {
          label: this.$t('powerspinColorCategories.green'),
          class: 'green',
        },
        [PowerspinConstants.ILOT_GAMETYPES.PLAY_COLOR_BLUE]: {
          label: this.$t('powerspinColorCategories.blue'),
          class: 'blue',
        },
      };
      return colors[this.colorBoard[0].betType];
    },
    powerSpinInfoTitle() {
      return betslipUtils.getBetslipCardTitle(this.betslip, this.card);
    },
  },
  methods: {
  ...mapActions(moduleTypes.POWERSPIN_GAME_STORE_MODULE, {
      resetQuickplayPowerspinBetslipData: powerspinModuleTypes.actions.RESET_QUICKPLAY_BETSLIP_DATA,
    }),
  },
  beforeDestroy() {
    this.resetQuickplayPowerspinBetslipData();
  },
};
</script>

<style lang="scss" scoped>
.powerspin-quickbets-cards {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1.5rem;
  height: 100%;
  width: 100%;

  @media (max-width: 1500px) {
    width: 100%;
    max-width: 1070px;
  }

  &__card-title {
    font-size: 35px;
    margin-bottom: 0;

    &--number {
      font-weight: 900;
      font-size: 42px;
      color: var(--color-yellow-warm);
    }
  }

  &__symbol {
    width: 102px;
    height: 102px;
  }

  &__color {
    font-size: 45px;
    font-weight: 600;
    border-radius: 180px;
    padding: 1rem 2rem;

    &--red {
      background: #e2091c;
    }

    &--green {
      background: #009641;
    }

    &--blue {
      background: #01509f;
    }
  }

  &__card-price {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;

    &-number {
      border-radius: 100%;
      text-align: center;
      font-size: 44px;
      font-weight: 800;
      color: var(--color-black);

      &--green {
        background: radial-gradient(100% 100% at 0% 0%, #f7fff0 0%, rgba(247, 255, 240, 0) 100%),
          radial-gradient(140% 140% at 100% 0%, #29990c 0%, rgba(255, 230, 0, 0) 100%),
          radial-gradient(180% 180% at 0% 100%, #59ff1c 0%, rgba(255, 123, 28, 0) 100%), #154703;
      }

      &--red {
        background: radial-gradient(100% 100% at 0% 0%, #f7fff0 0%, rgba(247, 255, 240, 0) 100%),
          radial-gradient(140% 140% at 100% 0%, #e2091c 0%, rgba(255, 34, 0, 0) 100%),
          radial-gradient(180% 180% at 0% 100%, #e2091c 0%, rgba(255, 123, 28, 0) 100%), #154703;
      }

      &--blue {
        background: radial-gradient(100% 100% at 0% 0%, #f7fff0 0%, rgba(247, 255, 240, 0) 100%),
          radial-gradient(140% 140% at 100% 0%, #01509f 0%, rgba(0, 204, 255, 0) 100%),
          radial-gradient(180% 180% at 0% 100%, #01509f 0%, rgba(28, 217, 255, 0) 100%), #154703;
      }

      width: 102px;
      height: 102px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  &-button {
    color: var(--color-white);
    font-weight: 600;
    font-size: 35px;
    border: none;
    border-radius: 9999px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    background: transparent;

    &:hover {
      background-color: var(--color-button-hover-yellow);
    }
  }
}

::v-deep .quick-play-card__info--number,
::v-deep .powerspin-quickbets-cards__card-title--number {
  font-weight: 900;
  font-size: 42px;
  color: var(--color-yellow-warm);
}
</style>
