<template>
  <div class="quick-play-card" :class="[betslipData.modifier, `quick-play-card--${theme}`, ``]" @click="navigateToBet">
    <div class="quick-play-card__title-container">
      <div class="quick-play-card__subtitle">
        <p class="quick-play-card__info" v-html="cardInfo"></p>
        <p v-if="betslipData.hasBonus" class="quick-play-card__bonus">
          <img class="quick-play-card__card-bonus-image" src="@/assets/digital-assistant/bonus.png" alt="bonus" />
        </p>
      </div>
    </div>

    <div class="quick-play-card__responsive-info">
      <div class="quick-play-card__price">
        {{ calculatePrice }}€
        <div class="quick-play-card__price--reflection">{{ calculatePrice }}€</div>
      </div>
    </div>
    <button class="quick-play-card__button" v-if="!$_windowWidthMixin_isPortrait">
      {{ $t('playInstantly') }}
      <font-awesome-icon :icon="chevronRight" />
    </button>
  </div>
</template>

<script>
import chevronRight from '@fortawesome/fontawesome-free-solid/faChevronRight';
import moduleTypes from '@/store/modules/types';
import { mapActions } from 'vuex';
import KinoBetslip from '@/model/Betslip';
import PowerspinBetslip from '@/model/powerspin/Betslip';
import Constants from '@/util/Constants';
import kinoGameModuleTypes from '@/store/modules/KinoStoreModule/types';
import Utilities from '@/util/Utilities';
import kinoConstants from '@/util/kinoConstants';
import betslipUtils from '@/util/betslipUtils';
import powerspinModuleTypes from '@/store/modules/PowerspinBetslipStoreModule/types';
import PowerspinConstants from '@/util/powerspinConstants';
import sessionStoreModuleTypes from '@/store/modules/SessionStoreModule/types';
import gtag from '@/util/gtag';
import gtmEvents from '@/constants/gtmEvents';

export default {
  name: 'QuickPlayCard',
  data() {
    return {
      chevronRight,
    };
  },
  props: {
    theme: {
      type: String,
      default: Constants.THEMES.KINO,
    },
    betslipData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    activeBetslip() {
      return this.theme === Constants.THEMES.KINO
        ? this.getKinoBetslip(this.betslipData)
        : this.getPowerspinBetslip(this.betslipData).betslip;
    },
    calculatePrice() {
      return this.theme === Constants.THEMES.KINO
        ? this.activeBetslip.calculateValue()
        : this.getPowerspinBetslip(this.betslipData).amount || 0;
    },
    powerSpinInfoTitle() {
      let returnInfo = '';
      const drawCount = `<span class='quick-play-card__info--number'>${this.betslipData.consecutiveDraws}</span>`;

      if (this.betslipData.numbers) {
        returnInfo += this.$t('quickbets.randomNumbers', {
          count: `<span class='quick-play-card__info--number'>${this.betslipData.numbers}</span>`,
        }, this.betslipData.numbers);
      }
      if (this.betslipData.symbol) {
        returnInfo += ` ${this.$t('quickbets.symbolInDraws', { count: drawCount })}`;
      }
      if (this.betslipData.over) {
        returnInfo += ` ${this.$t('quickbets.overInDraws', { count: drawCount })}`;
      }
      if (this.betslipData.under) {
        returnInfo += ` ${this.$t('quickbets.underInDraws', { count: drawCount })}`;
      }
      if (this.betslipData.color) {
        returnInfo += ` ${this.$t('quickbets.colorInDraws', { count: drawCount })}`;
      }
      if (this.betslipData.consecutiveDraws > 1) {
        returnInfo += ` ${this.$t('quickbets.consecutiveDraws', { count: drawCount })}`;
      }
      return returnInfo.trim();
    },
    cardInfo() {
      if (this.theme === Constants.THEMES.KINO) {
        const translationKey = this.betslipData.numbers > 1 ? 'columnsWithNumbers' : 'columnsWithNumber';

        return this.$t(translationKey, {
          columns: `<span class='quick-play-card__info--number'>${this.betslipData.columns}</span>`,
          numbers: `<span class='quick-play-card__info--number'>${this.betslipData.numbers}</span>`,
        });
      }
      if (this.theme === Constants.THEMES.POWERSPIN) {
        return this.powerSpinInfoTitle;
      }
      return '';
    },
    gameCategory() {
      if (this.theme === Constants.THEMES.POWERSPIN) {
        if (this.betslipData?.symbol) {
          return PowerspinConstants.GAME_CATEGORY.SYMBOL;
        }

        if (this.betslipData?.numbers) {
          return PowerspinConstants.GAME_CATEGORY.NUMBER;
        }

        if (this.betslipData?.color) {
          return PowerspinConstants.GAME_CATEGORY.COLOR;
        }
      }

      return null;
    },
  },
  methods: {
    ...mapActions(moduleTypes.KINO_GAME_STORE_MODULE, {
      setKinoBetslip: kinoGameModuleTypes.actions.SET_BETSLIP,
    }),
    ...mapActions(moduleTypes.SESSION_STORE_MODULE, {
      setGameType: sessionStoreModuleTypes.actions.SET_GAME_TYPE,
    }),
    ...mapActions(moduleTypes.POWERSPIN_GAME_STORE_MODULE, {
      setQuickplayPowerspinBetslipData: powerspinModuleTypes.actions.SET_QUICKPLAY_BETSLIP_DATA,
      updatePowerspinBetslip: powerspinModuleTypes.actions.UPDATE_BETSLIP,
      setPowerspinMultipliers: powerspinModuleTypes.actions.TOGGLE_MULTIPLIERS,
    }),
    navigateToBet() {
      if (this.theme === Constants.THEMES.KINO) {
        this.setKinoBetslip({ betslip: this.activeBetslip });
        this.setGameType({ gameType: Constants.GENERAL_GAME_TYPES.KINO });
      } else {
        this.setQuickplayPowerspinBetslipData({ betslipData: this.betslipData });
        this.updatePowerspinBetslip({ betslip: this.activeBetslip });
        this.setGameType({ gameType: Constants.GENERAL_GAME_TYPES.POWERSPIN });
        this.setPowerspinMultipliers({
          wheelIndex: 0,
          gameCategory: this.gameCategory,
          multipliers: this.activeBetslip.wager.comboMultipliers[0],
        });
        this.setPowerspinMultipliers({
          wheelIndex: 0,
          gameCategory: this.gameCategory,
          multipliers: Constants.MIN_MULTIPLIER_VALUE,
        });
      }

      gtag.sendEvent(
        this.theme === Constants.THEMES.KINO
          ? gtmEvents.SSBT_LOTTERY_KINO_QUICKPLAY_CARD_SELECT
          : gtmEvents.SSBT_LOTTERY_POWERSPIN_QUICKPLAY_CARD_SELECT,
        { betslipData: this.betslipData }
      );

      this.$router.push({
        name:
          this.theme === Constants.THEMES.KINO
            ? Constants.ROUTE_NAMES.QUICKBETS
            : Constants.ROUTE_NAMES.POWERSPIN_QUICKBETS,
      });
    },
    generateNumbers() {
      return Utilities.getUniqueRandomArray(
        kinoConstants.BOARD_NUMBERS.MAIN.MIN,
        kinoConstants.BOARD_NUMBERS.MAIN.MAX,
        this.betslipData.numbers || kinoConstants.BOARD_NUMBERS.MAIN.DEFAULT_LENGTH
      ).sort((a, b) => a - b);
    },
    getRandomColor() {
      const colors = [
        PowerspinConstants.ILOT_GAMETYPES.PLAY_COLOR_RED,
        PowerspinConstants.ILOT_GAMETYPES.PLAY_COLOR_BLUE,
        PowerspinConstants.ILOT_GAMETYPES.PLAY_COLOR_GREEN,
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    },
    getKinoBetslip(betslipData) {
      const betslip = new KinoBetslip();
      betslip.setConsecutiveDraws(1);

      for (let i = 0; i < betslipData.columns; i++) {
        const gameType = this.betslipData.numbers || Constants.ILOT_GAMETYPES.COLUMNS;
        betslip.bet_areas[i].pickedNumbers = this.generateNumbers();
        betslip.bet_areas[i].gameType = gameType;
        betslip.bet_areas[i].kinoBonusActive = !!betslipData.hasBonus;
        betslip.bet_areas[i].filled = true;
        betslip.bet_areas[i].quickPickNumbers(gameType);

        if (betslipData?.multiplier) {
          if (Array.isArray(betslipData.multiplier)) {
            betslipData.multiplier.forEach((multiplier) => {
              if (multiplier !== Constants.MIN_MULTIPLIER_VALUE) {
                betslip.bet_areas[i].toggleMultiplier(multiplier);
              }
            });

            if (!betslipData.multiplier.includes(Constants.MIN_MULTIPLIER_VALUE)) {
              betslip.bet_areas[i].toggleMultiplier(Constants.MIN_MULTIPLIER_VALUE);
            }
          } else {
            betslip.bet_areas[i].toggleMultiplier(betslipData.multiplier);

            /**
             *
             * We need to remove the default multiplier because it was added in the multipliers by default
             *
             * */
            if (betslipData.multiplier != Constants.MIN_MULTIPLIER_VALUE) {
              betslip.bet_areas[i].toggleMultiplier(Constants.MIN_MULTIPLIER_VALUE);
            }
          }
        }

        betslip.bet_areas[i].refreshValue();
        if (betslip.bet_areas.length < betslipData.columns) {
          betslip.addNewBet();
        }
      }

      return betslip;
    },
    getPowerspinBetslip(betslipData) {
      const betslip = new PowerspinBetslip();
      let gameCategory = PowerspinConstants.GAME_CATEGORY.NUMBER;

      if (betslipData?.numbers) {
        betslip.wager.wheels[0].setRequestedNumber(betslipData.numbers);
        betslip.wager.wheels[0].setRequestedNumber(1);
        betslip.wager.wheels[0].addQuickPick();
      }
      if (betslipData?.symbol) {
        betslip.wager.wheels[0].toggleGameType(PowerspinConstants.ILOT_GAMETYPES.PLAY_SYMBOL);
        gameCategory = PowerspinConstants.GAME_CATEGORY.SYMBOL;
      }

      if (betslipData?.over) {
        betslip.wager.wheels[0].toggleGameType(PowerspinConstants.ILOT_GAMETYPES.OVER_UNDER);
        gameCategory = PowerspinConstants.GAME_CATEGORY.OVER;
      }

      if (betslipData?.under) {
        betslip.wager.wheels[0].toggleGameType(PowerspinConstants.ILOT_GAMETYPES.PLAY_UNDER);
        gameCategory = PowerspinConstants.GAME_CATEGORY.UNDER;
      }

      if (betslipData?.color) {
        const color = this.getRandomColor();
        betslip.wager.wheels[0].toggleGameType(color);
        gameCategory = PowerspinConstants.GAME_CATEGORY.COLOR;
      }

      betslip.setConsecutiveDraws(betslipData.consecutiveDraws);

      if (betslipData?.multiplier) {
        if (Array.isArray(betslipData.multiplier)) {
          betslipData.multiplier.forEach((multiplier) => {
            if (multiplier !== Constants.MIN_MULTIPLIER_VALUE) {
              betslip.wager.wheels[0].toggleMultipliers(gameCategory, multiplier);
            }
          });

          if (!betslipData.multiplier.includes(Constants.MIN_MULTIPLIER_VALUE)) {
            betslip.wager.wheels[0].toggleMultipliers(gameCategory, Constants.MIN_MULTIPLIER_VALUE);
          }
        } else {
          betslip.wager.wheels[0].toggleMultipliers(gameCategory, betslipData.multiplier);

          /**
           *
           * We need to remove the default multiplier because it was added in the multipliers by default
           *
           * */
          if (betslipData.multiplier != Constants.MIN_MULTIPLIER_VALUE) {
            betslip.wager.wheels[0].toggleMultipliers(gameCategory, Constants.MIN_MULTIPLIER_VALUE);
          }
        }
      }

      const amount = betslipUtils.calculateBetslipPrice(betslip);

      return { betslip, amount };
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/scss-utils/kino/mixins.scss';
@import '@/scss-utils/powerspin/mixins.scss';

.quick-play-card {
  &__price {
    position: relative;
    &--reflection {
      position: absolute;
      top: 60%;
      left: 0;
      right: 0;
      transform: scaleY(-1);
      color: var(--color-kino-price-yellow);
      font-weight: 800;
      font-size: 105px;
      -webkit-mask-image: linear-gradient(0deg, #cecece -20%, rgba(255, 255, 255, 0) 51.28%);
      mask-image: linear-gradient(0deg, #cecece -20%, rgba(255, 255, 255, 0) 51.28%);
      pointer-events: none;
    }
  }

  &__title {
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 2rem;
  }

  &__card-bonus-image {
    margin-top: 20px;
  }

  width: 350px;
  height: 425px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;

  @media (max-width: 1500px) {
    width: 310px;
  }

  @media (max-width: 1200px) {
    max-width: 750px;
    width: 100%;
    height: 300px;
  }

  border-radius: 40px;
  padding: 1.5rem;
  text-align: center;
  background: linear-gradient(
    to bottom,
    var(--color-kino-card-bg-yellow-alpha),
    var(--color-kino-card-bg-yellow-warm-alpha)
  );
  box-shadow: 0 4px 10px var(--color-black-alpha-30);

  &__title-container {
    height: 70px;
    margin-bottom: 55px;

    @media (max-width: 1200px) {
      margin-bottom: 0;
    }
  }

  &__title {
    color: var(--color-yellow-warm);
    font-weight: 900;
    font-size: 26px;
    margin-bottom: 15px;
  }

  &__info {
    font-size: 20px;
    margin-bottom: 0;

    &--number {
      font-weight: 900;
      font-size: 26px;
      color: var(--color-yellow-warm);
    }
  }

  &__bonus {
    font-size: 35px;
    font-weight: 900;
    color: var(--color-kino-price-yellow);
    margin-bottom: 0;
  }

  &__price {
    font-size: 105px;
    font-weight: 800;
    color: var(--color-kino-price-yellow);
  }

  &__button {
    color: var(--color-white);
    font-weight: bold;
    font-size: 30px;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 9999px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    background: transparent;

    &:hover {
      background-color: var(--color-button-hover-yellow);
    }
  }

  &--powerspin {
    @include powerspin-card;
  }

  &--kino {
    @include kino-card;
  }
}

::v-deep .quick-play-card__info--number {
  font-weight: 900;
  font-size: 26px;
  color: var(--color-yellow-warm);
}
</style>
