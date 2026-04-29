<template>
  <div class="jackpot-amount">
    <div class="jackpot-amount-content">
      <div class="jackpot-amount-content__title" :class="`jackpot-amount-content__title--${size}`">
        {{ title }}
      </div>
      <div class="jackpot-amount-content__number" :class="`jackpot-amount-content__number--${size}`">
        {{ amount | currency }}
      </div>
    </div>
  </div>
</template>

<script>
import Constants from '../../../../../util/Constants';
import EurojackpotConstants from '../../../../../util/eurojackpotConstants';

export default {
  name: 'EurojackpotAmount',
  props: {
    size: {
      type: String,
      default: EurojackpotConstants.JACKPOT_COMPONENT_SIZE.SMALL,
      validate: value => {
        return Object.values(EurojackpotConstants.JACKPOT_COMPONENT_SIZE).includes(value);
      },
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  computed: {
    title() {
      return this.$t(`eurojackpot.jackpotAmountTitle.${this.size}`);
    },
  },
  filters: {
    currency(value) {
      if (!Number.isNaN(Number(value))) {
        return `€${Constants.SIMPLE_NUMBER_FORMATTER.format(value)}`;
      }
      return '-';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../../../scss-utils/eurojackpot/colors';

.jackpot-amount {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid $color-primary-black;
  border-radius: 10px;
  background: radial-gradient(870% 142% at 0% 0%, #fcd918 0%, #fccb17 100%);
  box-shadow: -1px 2px 5px 0px $color-primary-gold;
  padding: 0 10px;
  &-content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    &__title {
      color: $color-primary-black;
      font-weight: 900;
      text-transform: uppercase;

      &--small {
        font-size: 12px;
        line-height: 14px;
      }

      &--large {
        font-size: 22px;
        line-height: 32px;
      }
    }
    &__number {
      color: $color-primary-black;
      letter-spacing: 3px;
      text-transform: uppercase;
      font-weight: 950;
      text-shadow: 1px 1px 0 rgba(241, 193, 24, 0.8), -1px 1px 0 rgba(241, 193, 24, 0.8),
        1px -1px 0 rgba(241, 193, 24, 0.8), -1px -1px 0 rgba(241, 193, 24, 0.8), -1px 0 0 rgba(236, 222, 180, 0.8),
        1px 0 0 rgba(236, 222, 180, 0.8), 0 1px 0 rgba(191, 163, 63, 0.8), 0 -1px 0 rgba(191, 163, 63, 0.8),
        1px 2px 1px rgba(175, 132, 69, 0.8), 2px 2px 1px rgba(175, 132, 69, 0.8), 2px 1px 1px rgba(175, 132, 69, 0.8);

      &--small {
        font-size: 30px;
        line-height: 35px;
      }

      &--large {
        font-size: 61px;
        line-height: 80px;
      }
    }
  }
}
</style>
