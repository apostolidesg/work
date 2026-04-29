<template>
  <div class="tristate-switch" :style="cssVars">
    <div
      v-if="leftLabel"
      class="tristate-switch__label"
      :class="{ 'tristate-switch__label--active': isLeftSelected }"
      @click="handleLabelClick(0)"
    >
      {{ leftLabel }}
    </div>
    <div :class="classes" @click="handleClick($event)"></div>
    <div
      v-if="rightLabel"
      class="tristate-switch__label"
      :class="{ 'tristate-switch__label--active': isRightSelected }"
      @click="handleLabelClick(2)"
    >
      {{ rightLabel }}
    </div>
  </div>
</template>

<script>
const DEFAULT_CONFIG = {
  rail_width: 90,
  rail_height: 30,
  handle_width: 40,
  rail_color: '#241f1a',
  handle_color: '#eadcc0',
  label_color: '#eadcc0',
};

export default {
  name: 'TristateSwitch',
  props: {
    config: {
      type: Object,
      default: () => DEFAULT_CONFIG,
    },
    options: {
      type: Array,
      required: true,
      validate: value => value?.length === 3,
    },
    leftLabel: {
      type: String,
    },
    rightLabel: {
      type: String,
    },
    value: {
      type: [Boolean, String, Number],
    },
  },
  computed: {
    classes() {
      return {
        'tristate-switch__rail': true,
        'tristate-switch__rail--left': this.value === this.options[0],
        'tristate-switch__rail--middle': this.value === this.options[1],
        'tristate-switch__rail--right': this.value === this.options[2],
      };
    },
    cssVars() {
      return {
        '--rail-width': `${this.config.rail_width}px`,
        '--rail-height': `${this.config.rail_height}px`,
        '--handle-width': `${this.config.handle_width}px`,
        '--rail-color': this.config.rail_color,
        '--handle-color': this.config.handle_color,
        '--label-color': this.config.label_color,
      };
    },
    left_right_option_width() {
      return (this.config.rail_width - this.config.handle_width) / 2;
    },
    isLeftSelected() {
      return this.value === this.options[0];
    },
    isRightSelected() {
      return this.value === this.options[2];
    },
  },
  methods: {
    handleClick(event) {
      const { offsetX } = event;

      if (offsetX < this.left_right_option_width) {
        this.$emit('input', this.options[0]);
      } else if (
        offsetX >= this.left_right_option_width &&
        offsetX <= this.left_right_option_width + this.config.handle_width
      ) {
        this.$emit('input', this.options[1]);
      } else {
        this.$emit('input', this.options[2]);
      }
    },
    handleLabelClick(index) {
      this.$emit('input', this.options[index]);
    },
  },
};
</script>

<style lang="scss" scoped>
.tristate-switch {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: min-content;

  &__rail {
    width: var(--rail-width);
    height: var(--rail-height);
    border-radius: 100px;
    background-color: var(--rail-color);
    position: relative;
    cursor: pointer;

    &:after {
      content: '';
      position: absolute;
      top: calc((var(--rail-height) - var(--handle-width)) / 2);
      left: 0;
      width: var(--handle-width);
      height: var(--handle-width);
      border-radius: 100px;
      background-color: var(--handle-color);
      transition: left 0.2s ease-in-out;
    }

    &--left {
      &:after {
        left: 0;
      }
    }

    &--middle {
      &:after {
        left: calc((var(--rail-width) - var(--handle-width)) / 2);
      }
    }

    &--right {
      &:after {
        left: calc(var(--rail-width) - var(--handle-width));
      }
    }
  }

  &__label {
    font-size: 13.5px;
    font-weight: 900;
    font-family: 'Roboto', sans-serif;
    color: var(--label-color);
    opacity: 50%;
    margin: 0 10px;
    transition: opacity 0.2s ease-in-out;

    &--active {
      opacity: 100%;
    }

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
