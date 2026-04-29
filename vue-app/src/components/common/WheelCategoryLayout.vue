<template>
  <div :class="['wheel-category-layout', currentLayout]">
    <div :class="['wheel-category-layout__title', titleTheme, { 'mb-3': !showBettingAmount }]">
      {{ $t(title) }}
    </div>
    <div class="wheel-catergory-layout__content"><slot></slot></div>
    <div v-if="showBettingAmount" class="wheel-category-layout__betting-amount mx-2">
      <BettingAmount
        :textTheme="textTheme"
        :basic-betting-amount="basicBettingAmount"
        :selected-multipliers="selectedMultipliers"
        :multipliers="multipliers"
        :theme="theme"
        @update-multipliers="(mult) => $emit('update-multipliers', mult)"
        :disabled="disableBettingAmount"
      />
    </div>
  </div>
</template>

<script>
import BettingAmount from './BettingAmount';
import CONSTANTS from '../../util/powerspinConstants';

const TEXT_THEMES = {
  BLUE: 'black',
  WHITE: 'white',
};

const THEMES = {
  DARK_BLUE: 'dark-blue',
  BLUE: 'blue',
  LIGHT_BLUE: 'light-blue',
};

export default {
  name: 'WheelCategoryLayout',
  components: {
    BettingAmount,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    showBettingAmount: {
      type: Boolean,
      default: true,
    },
    disableBettingAmount: {
      type: Boolean,
      default: false,
    },
    selectedMultipliers: {
      type: Array,
      required: true,
    },
    multipliers: {
      type: Array,
      required: true,
    },
    textTheme: {
      type: String,
      default: TEXT_THEMES.WHITE,
      validator: (value) => Object.values(TEXT_THEMES).includes(value),
    },
    theme: {
      type: String,
      default: THEMES.DARK_BLUE,
      validator: (value) => Object.values(THEMES).includes(value),
    },
  },
  computed: {
    titleTheme() {
      return this.textTheme === TEXT_THEMES.WHITE
        ? 'wheel-category-layout__title--white'
        : 'wheel-category-layout__title--black';
    },
    currentLayout() {
      return this.showBettingAmount ? 'wheel-category-layout__row' : 'wheel-category-layout__col';
    },
  },
  created() {
    this.basicBettingAmount = CONSTANTS.BASIC_BETTING_AMOUNT;
  },
};
</script>

<style scoped>
.wheel-category-layout {
  background: transparent;
  display: flex;
  margin-top: 5px;
}
.wheel-category-layout__row {
  flex-direction: row;
}
.wheel-category-layout__col {
  flex-direction: column;
}
.wheel-catergory-layout__content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.wheel-category-layout__title {
  font-size: 15.22px;
  font-weight: 900;
  min-width: 100px;
  margin-left: 20px;
}
.wheel-category-layout__title--white {
  color: var(--white);
}
.wheel-category-layout__title--black {
  color: var(--black);
}
.wheel-category-layout__betting-amount {
  display: flex;
  align-items: flex-end;
}
::v-deep .betting-amount {
  height: 125px;
}
</style>
