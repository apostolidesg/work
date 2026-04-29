<template>
  <div class="fireblaze-numbers-wrapper">
    <button class="fireblaze-number-button" :class="{ 'fireblaze-number-button--active': active }" v-on="$listeners">
      <span class="fireblaze-number-button__number"><slot></slot></span>
      <span v-if="showStatistics" class="fireblaze-number-button__stat"><slot name="stats"></slot></span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'FireblazeNumberButton',
  props: {
    active: {
      type: Boolean,
      required: true,
    },
    showStatistics: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../../../scss-utils/fireblaze/colors';

.fireblaze-number-button {
  width: 74px;
  height: 74px;
  border: none;
  border-radius: 50%;
  position: relative;
  z-index: 1;
  background: $gradient-dark-pink;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 3px;
    left: 3px;
    right: 3px;
    bottom: 3px;
    border-radius: 50%;
    background: $color-primary-white;
    z-index: -1;
  }

  &--active {
    color: $color-primary-white;
    background: $gradient-light-gold;

    &::before {
      background: $gradient-dark-pink;
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
  &__stat {
    border: solid 1px $color-third-dark-red;
    border-radius: 50%;
    position: absolute;
    top: 0;
    right: 0;
    color: $color-third-dark-red;
    background-color: white;
    width: 27px;
    height: 27px;
    font-size: 13px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
