<template>
  <div class="game-option-toggle" :style="{ 'background-color': color, opacity: disabled ? 0.7 : 1 }">
    <div class="game-option-toggle__icon">
      <slot name="icon" />
    </div>
    <div class="game-option-toggle__input">
      <input type="checkbox" :id="inputId" v-model="checked" :disabled="disabled" />
    </div>
    <div class="game-option-toggle__hint">
      <slot name="hint" />
    </div>
    <div class="game-option-toggle__tag" v-if="$slots.hint">
      <slot name="tag" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseGameOptionToggle',
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      required: true,
    },
    inputId: {
      type: String,
      required: true,
    },
  },
  computed: {
    checked: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>

<style scoped lang="scss">
.game-option-toggle {
  position: relative;
  width: 95px;
  height: 85px;
  border-radius: 10px;
  padding-top: 10px;
  padding-bottom: 5px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  &__icon {
    img {
      width: 80px;
    }
  }

  &__input {
    input {
      visibility: visible;
      width: 30px;
      height: 30px;
      border: none;
    }

    input:checked {
      background-color: white;
      border-radius: 50%;
    }
  }

  &__hint {
    font-size: 9.5px;
    font-weight: 900;
    line-height: 11.13px;
    text-align: center;
    color: white;
    height: 10px;
  }

  &__tag {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 10px 0 4.5px 0;
    background-color: red;
    height: 12px;
    padding: 0 10px 0 10px;

    font-size: 9px;
    font-weight: 700;
    text-align: center;
    color: white;
  }
}
</style>
