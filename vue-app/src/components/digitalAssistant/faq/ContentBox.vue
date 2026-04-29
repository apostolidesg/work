<template>
  <div class="content-box" @click="navigateToRoute" :class="[themeBoxClass]" :style="dynamicMargin">
    <p class="content-box__title">
      {{ title }}
    </p>
  </div>
</template>

<script>
import { FAQ_THEMES } from '../../../constants/theme';
import Constants from '../../../util/Constants';
export default {
  name: 'ContentBox',
  props: {
    title: {
      type: [String, Object],
      required: true,
    },
    description: {
      type: [String, Object],
      default: '',
    },
    theme: {
      type: String,
      default: 'default',
    },
    spanText: {
      type: String,
      default: '',
    },
    route: {
      type: String,
      default: '',
    },
    boxType: {
      type: String,
      required: true,
    },
    boxCount: {
      type: Number,
    },
    theme: {
      type: String,
      default: 'default',
      validator: (value) =>
        Object.values(FAQ_THEMES)
          .map((t) => t.name)
          .includes(value),
    },
  },
  methods: {
    navigateToRoute() {
      if (this.route) {
        this.$router.push(`/${this.boxType}${this.route}`);
      }
    },
  },
  computed: {
    themeBoxClass() {
      return `content-box--${this.theme}-box`;
    },
    themeStyles() {
      const theme = Object.values(FAQ_THEMES).find((t) => t.name === this.name);
      return {
        background: theme.background,
        color: theme.textColor,
      };
    },
    dynamicMargin() {
      const boxCount = this.boxCount;
      if (this.$_windowWidthMixin_isPortrait) {
        return {
          marginTop: '0',
        };
      }

      const marginTop = window.innerWidth === Constants.SCREEN_WIDTH || boxCount < Constants.BOX_NUMBER ? '7.3%' : '3%';
      return {
        marginTop,
      };
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../../scss-utils/digitalassistant/mixins';

.content-box {
  display: grid;
  &__title {
    place-self: center;
    height: 100%;
    text-align: center;
    width: 95%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &--kino-box {
    display: grid;
    @include faq(--button-kino-gradient, black);
  }
  &--powerspin-box {
    display: grid;
    @include faq(--button-powerspin-gradient, white);
  }
  &--help-box {
    display: grid;
    @include faq(--gradient-secondary, white, none);

    &::before {
      content: '';
      position: absolute;
      inset: -0.25rem;
      background: var(--gradient-primary);
      mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      mask-composite: exclude;
      padding: 0.5125rem;
      border-radius: inherit;
      z-index: -1;
      width: 455px;
    }
    &:nth-child(even) {
      margin-left: 82px;
    }
  }
}
@media (max-width: 1600px) {
  .content-box {
    &--kino-box {
      margin-top: 3%;
    }
    &--powerspin-box {
      margin-top: 3%;
    }
    &--help-box {
      margin-top: 3%;
    }
  }
}

@media (max-width: 1200px) {
  .content-box {
    &--kino-box,
    &--powerspin-box,
    &--help-box {
      margin-left: 0;
    }

    &:nth-child(even) {
      margin-left: 0;
    }
  }
}
</style>
