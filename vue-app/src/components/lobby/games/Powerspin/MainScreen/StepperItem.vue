<template>
  <div
    class="powerspin-stepper-item"
    :class="[
      { 'powerspin-stepper-item--active': hasWheel && showNext },
      { 'powerspin-stepper-item--filled': hasWheel && !showNext },
    ]"
  >
    <div class="powerspin-stepper-item__img">
      <slot></slot>
    </div>
    <div class="powerspin-stepper-item__back-btn" :class="[{ 'powerspin-stepper-item__back-btn--last': isLast }]">
      <FontAwesomeIcon v-if="showArrow" icon="caret-right" @click="$emit('arrow-click')" />
    </div>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCaretRight } from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faCaretRight);

export default {
  name: 'StepperItem',
  components: { FontAwesomeIcon },
  props: {
    hasWheel: {
      type: Boolean,
      required: true,
    },
    showNext: {
      type: Boolean,
      required: true,
    },
    isLast: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    showArrow() {
      return this.showNext || (this.isLast && this.hasWheel);
    },
  },
};
</script>

<style lang="scss" scoped>
.powerspin-stepper-item {
  flex: 1;
  display: flex;
  align-items: center;

  &--active,
  &--filled {
    background: linear-gradient(180deg, #17277c 0%, #1b2f9e 15.1%, #1b2f9e 85.42%, #17277c 100%);
  }

  &--active {
    border-radius: 0 83px 83px 0;
  }

  &__img {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  &__back-btn {
    margin: 10px;
    width: 12px;
    font-size: 30px;
    color: #bfd6e3;

    &--last {
      transform: rotate(180deg);
    }
  }
}
</style>
