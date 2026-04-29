<template>
  <div :class="['rounded-bordered-button', `rounded-bordered-button--text-${textTheme}`]">
    <div v-if="title" class="rounded-bordered-button__title mb-2">
      {{ $t(title) }}
    </div>
    <button
      v-on="$listeners"
      :class="[
        'rounded-bordered-button__button',
        `rounded-bordered-button__button-${this.view}`,
        `rounded-bordered-button--${theme}`,
        activeThemeClass,
      ]"
      class="d-flex align-items-center justify-content-center"
    >
      {{ value }}
    </button>
  </div>
</template>

<script>
const BUTTON_THEMES = {
  BLUE: 'blue',
  RED: 'red',
  GREEN: 'green',
  MAGENTA: 'magenta',
};

const TEXT_THEMES = {
  WHITE: 'white',
  BLACK: 'black',
  MAGENTA: 'magenta',
};

const VIEWS = {
  CIRCLE: 'circle',
  PILL: 'pill',
};

export default {
  name: 'RoundedBorderedButton',
  props: {
    view: {
      type: String,
      default: VIEWS.CIRCLE,
      validator: value => Object.values(VIEWS).includes(value),
    },
    theme: {
      type: String,
      required: true,
      validator: value => Object.values(BUTTON_THEMES).includes(value),
    },
    value: {
      type: [Number, String],
    },
    active: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
    },
    textTheme: {
      type: String,
      default: TEXT_THEMES.WHITE,
      validator: value => Object.values(TEXT_THEMES).includes(value),
    },
  },
  computed: {
    activeThemeClass() {
      return this.active ? `rounded-bordered-button--${this.theme}-active` : '';
    },
  },
};
</script>
`
<style lang="scss" scoped>
.rounded-bordered-button {
  font-weight: 900;
  font-size: 15.22px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &__button {
    font-weight: inherit;
    color: inherit;
    background: transparent;
    border: 2px solid;
    &-circle {
      border-radius: 9999px;
      width: 39px;
      height: 39px;
    }
    &-pill {
      padding: 22px 42px;
      text-align: center;
      display: inline-block;
      border-radius: 50px;
      align-self: stretch;
    }
  }
  &--text {
    &-white {
      color: var(--white);
    }
    &-black {
      color: var(--black);
    }
    &-magenta {
      color: var(--magenta);
    }
  }
  &--blue,
  &--red,
  &--green,
  &--magenta {
    &-active {
      transition: 0.35s ease-in-out;
    }
  }
  &--blue {
    border-color: var(--blue);
    &-active {
      background: var(--blue);
    }
  }
  &--red {
    border-color: var(--red);
    &-active {
      background: var(--red);
    }
  }
  &--green {
    border-color: var(--green);
    &-active {
      background: var(--green);
    }
  }
  &--magenta {
    border-color: var(--magenta);
    &-active {
      background: var(--magenta);
      color: var(--white);
    }
  }
}
</style>
