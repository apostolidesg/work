<template>
  <button class="eurojackpot-number-button" :class="classes" v-on="$listeners">
    <span class="eurojackpot-number-button__number"><slot></slot></span>
    <span class="eurojackpot-number-button__info" v-if="showInfo"><slot name="info"></slot></span>
  </button>
</template>

<script>
const THEMES = {
  MAIN: 'main',
  EURO: 'euro',
};

export default {
  name: 'EurojackpotNumberButton',
  props: {
    active: {
      type: Boolean,
      required: true,
    },
    theme: {
      type: String,
      default: THEMES.MAIN,
      validator: value => Object.values(THEMES).includes(value),
    },
  },
  computed: {
    showInfo() {
      return !!this.$slots.info;
    },
    classes() {
      return {
        'eurojackpot-number-button--euro': this.theme === THEMES.EURO && !this.active,
        'eurojackpot-number-button--euro-active': this.theme === THEMES.EURO && this.active,
        'eurojackpot-number-button--main': this.theme === THEMES.MAIN && !this.active,
        'eurojackpot-number-button--main-active': this.theme === THEMES.MAIN && this.active,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../../../scss-utils/eurojackpot/colors';

.eurojackpot-number-button {
  width: 74px;
  height: 74px;
  border-radius: 50px;
  border: 3px solid;
  background-color: $color-primary-black;
  padding: 0;
  // We need this to set the position of the info slot
  position: relative;
  color: white;

  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;

  &--main,
  &--main-active {
    border-color: $color-button-main;
  }

  &--main-active {
    background-color: $color-button-main;

    .eurojackpot-number-button__number,
    .eurojackpot-number-button__info {
      color: $color-primary-black;
    }
  }

  &--euro,
  &--euro-active {
    border-color: $color-button-euro;
  }

  &--euro-active {
    background-color: $color-button-euro;

    .eurojackpot-number-button__number,
    .eurojackpot-number-button__info {
      color: $color-primary-black;
    }
  }

  &__number {
    font-family: Roboto, serif;
    font-size: 30px;
    font-weight: 900;
    line-height: 35px;
    letter-spacing: 0;
    text-align: center;
  }

  &__info {
    width: 100%;
    color: $color-primary-yellow;
    font-family: Roboto, serif;
    font-size: 15px;
    font-weight: 900;
    line-height: 18px;
    letter-spacing: 0;
    text-align: center;
    position: absolute;
    bottom: 0;
    left: 0;
  }
}
</style>
