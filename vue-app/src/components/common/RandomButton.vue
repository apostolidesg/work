<template>
  <div :class="['random-button', `random-button--${theme}`]" @click="$emit('random-button-clicked')">
    <div class="random-button__text">
      {{ $t('randomPick') }}
    </div>
  </div>
</template>

<script>
const THEMES = {
  BLUE: 'blue',
};
export default {
  name: 'RandomButton',
  props: {
    theme: {
      type: String,
      default: THEMES.BLUE,
      validator: value => Object.values(THEMES).includes(value),
    },
  },
};
</script>

<style scoped>
.random-button {
  width: 169px;
  height: 39px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.random-button--blue {
  background: var(--gradient-blue);
  border: 1px solid;
  border-color: var(--magenta);
}
.random-button__text {
  color: var(--white);
  font-size: 15.22px;
  font-weight: 400;
}
</style>
