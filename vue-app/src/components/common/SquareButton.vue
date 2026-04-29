<template>
  <div
    :class="['square-button', `square-button--${theme}`]"
    @click="!disabled && $emit('square-button-clicked', number)"
  >
    <div
      :class="[
        checkedTheme,
        'square-button__text',
        { 'square-button--disabled': disabled },
        { 'square-button--checked': active && !disabled },
        `square-button__text-${numberToString}`,
      ]"
    >
      {{ number }}€
    </div>
  </div>
</template>

<script>
const THEMES = {
  DARK_BLUE: 'dark-blue',
  LIGHT_BLUE: 'light-blue',
  BLUE: 'blue',
};
export default {
  name: 'SquareButton',
  props: {
    number: {
      type: Number,
      required: true,
    },
    id: {
      type: String,
      default: 'square-button',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
    theme: {
      type: String,
      default: THEMES.DARK_BLUE,
      validator: value => Object.values(THEMES).includes(value),
    },
  },
  computed: {
    checkedTheme() {
      return this.active && !this.disabled ? `square-button--checked-${this.theme}` : '';
    },
    numberToString() {
      return this.number.toString().replace('.', '_');
    },
  },
};
</script>

<style scoped>
.square-button {
  display: inline-block;
  padding: 0;
  color: var(--white);
  font-weight: 900;
  margin: 1px 1px;
  cursor: pointer;
}
.square-button--dark-blue {
  background-color: var(--dark-blue);
  font-size: 18.35px;
  width: 52px;
  height: 52px;
}
.square-button--blue {
  background: var(--light-blue);
  width: 45px;
  height: 30px;
  font-size: 15.22px;
  border-radius: 5px;
}
.square-button--light-blue {
  background: var(--lighter-blue);
  width: 45px;
  height: 30px;
  font-size: 15.22px;
  border-radius: 5px;
}
.square-button__text {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.square-button--disabled {
  opacity: 0.5;
  pointer-events: none;
}
.square-button--checked-blue,
.square-button--checked-light-blue {
  background-color: var(--magenta);
  color: var(--white);
  border-radius: 5px;
}

.square-button--checked-dark-blue {
  background-color: var(--yellow);
  color: var(--darker-blue);
}
.square-button--checked {
  width: 100%;
  height: 100%;
  transition: 0.35s ease-in-out;
}
</style>
