<template>
  <div class="betting-amount">
    <div :class="['betting-amount__title mt-2 m-2', titleTheme]">
      {{ $t('multiplier') }}
    </div>
    <div class="m-2">
      <SquareButton
        v-for="mult in multipliers"
        :key="mult"
        :number="mult * basicBettingAmount"
        :disabled="disabled"
        :active="isMultiplierSelected(mult)"
        :theme="theme"
        @square-button-clicked="$emit('update-multipliers', mult)"
      />
    </div>
  </div>
</template>

<script>
import SquareButton from './SquareButton';

const THEMES = {
  DARK_BLUE: 'dark-blue',
  BLUE: 'blue',
  LIGHT_BLUE: 'light-blue',
  WHITE: 'white',
  BLACK: 'black',
};

export default {
  name: 'BettingAmount',
  components: {
    SquareButton,
  },
  props: {
    multipliers: {
      type: Array,
      required: true,
    },
    basicBettingAmount: {
      type: Number,
      required: true,
    },
    mult_identifier: {
      type: String,
      default: 'betting-amount',
    },
    selectedMultipliers: {
      type: Array,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    theme: {
      type: String,
      default: THEMES.DARK_BLUE,
      validator: value => Object.values(THEMES).includes(value),
    },
    textTheme: {
      type: String,
      default: THEMES.WHITE,
      validator: value => Object.values(THEMES).includes(value),
    },
  },
  methods: {
    isMultiplierSelected(multiplier) {
      return !this.disabled && this.selectedMultipliers.indexOf(multiplier) > -1;
    },
  },
  computed: {
    titleTheme() {
      return this.textTheme === THEMES.WHITE ? 'betting-amount__title--white' : 'betting-amount__title--dark-blue';
    },
  },
};
</script>
<style scoped>
.betting-amount {
  max-width: 297px;
}
.betting-amount__title {
  font-size: 13.36px;
  font-weight: 900;
}
.betting-amount__title--white {
  color: white;
}
.betting-amount__title--dark-blue {
  color: var(--dark-blue);
}
</style>
