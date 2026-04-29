<template>
  <div class="powerspin-markets-layout">
    <div class="powerspin-markets-layout__main-area">
      <div class="powerspin-markets-layout__title" :class="titleClass">
        {{ $t(title) }}
      </div>
      <div class="powerspin-markets-layout__content">
        <slot></slot>
      </div>
    </div>
    <div class="powerspin-markets-layout__betting-amount mx-2">
      <BettingAmount
        :selected-multipliers="selectedMultipliers"
        :basic-betting-amount="basicBettingAmount"
        @update-multipliers="mult => $emit('update-multipliers', mult)"
        :multipliers="multipliers"
        :theme="bettingAmountTheme"
        :text-theme="bettingAmountTextTheme"
        :disabled="disabledBettingAmount"
      />
    </div>
  </div>
</template>

<script>
import BettingAmount from '../../../../common/BettingAmount.vue';
import Constants from '../../../../../util/Constants';

const THEME = {
  DARK: 'dark',
  LIGHT: 'light',
};

export default {
  name: 'MarketsCategoryLayout',
  components: { BettingAmount },
  props: {
    title: {
      type: String,
      required: true,
    },
    selectedMultipliers: {
      type: Array,
      required: true,
    },
    multipliers: {
      type: Array,
      required: true,
    },
    disabledBettingAmount: {
      type: Boolean,
      required: true,
    },
    theme: {
      type: String,
      default: THEME.LIGHT,
      validator: value => Object.values(THEME).includes(value),
    },
  },
  computed: {
    bettingAmountTheme() {
      return this.theme === THEME.LIGHT ? 'light-blue' : 'blue';
    },
    titleClass() {
      return this.theme === THEME.LIGHT
        ? 'powerspin-markets-layout__title--black'
        : 'powerspin-markets-layout__title--white';
    },
    bettingAmountTextTheme() {
      return this.theme === THEME.LIGHT ? 'light-blue' : 'white';
    },
  },
  created() {
    this.basicBettingAmount = Constants.BASIC_BETTING_AMOUNT;
  },
};
</script>

<style scoped lang="scss">
.powerspin-markets-layout {
  display: flex;
  flex-direction: row;
  width: 100%;

  &__main-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
  }

  &__title {
    font-family: 'Roboto', sans-serif;
    font-size: 15.22px;
    font-weight: 900;
    text-transform: uppercase;
    margin-bottom: 15px;

    &--white {
      color: var(--white);
    }

    &--black {
      color: var(--black);
    }
  }

  &__betting-amount {
    display: flex;
    align-items: flex-end;
  }
}
</style>
