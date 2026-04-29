<template>
  <router-link :to="route" :class="['faq-cta-button digital-assistant-font ', `faq-cta-button--${theme}`]"
    ><slot></slot
  ></router-link>
</template>

<script>
import Constants from '../../../util/Constants';
export default {
  name: 'FaqCTAButton',
  props: {
    theme: {
      type: String,
      default: 'default',
      validator: (value) => ['kino', 'powerspin', 'help', 'default'].includes(value),
    },
    route: {
      type: String,
      default: Constants.ROUTE_NAMES.DIGITAL_ASSISTANT,
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../../scss-utils/digitalassistant/mixins';

.faq-cta-button {
  padding: 20px;
  font-weight: 700;
  font-size: 32px;
  line-height: 125%;
  letter-spacing: 5%;
  text-align: center;
  vertical-align: middle;
  width: 100%;
  text-decoration: none;
  margin-top: 25px;
  &--kino {
    @include faq(--button-kino-gradient, black);
    width: 90%;
  }

  &--powerspin {
    @include faq(--button-powerspin-gradient, white, #f3691e);
    color: white;
    width: 90%;
    border-radius: 20px;
  }

  &--help {
    @include faq(--gradient-secondary, white, none);
    width: 85%;
    &::before {
      content: '';
      position: absolute;
      inset: 0rem;
      background: var(--gradient-primary);
      mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      mask-composite: exclude;
      padding: 0.5125rem;
      border-radius: inherit;
      z-index: -1;
      width: 100%;
    }
  }
}
</style>
