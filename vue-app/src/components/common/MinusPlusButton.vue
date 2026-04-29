<template>
  <button v-if="imageSrc" class="base-minusPlus-button" @click="$emit('click')">
    <img :id="`ssbt_consecutive_draws_button_${type}_img`" width="36" :src="imageSrc" :alt="type" />
  </button>
</template>

<script>
const IMG_MAPPER = {
  minus_light: require('../../assets/minus-icon.png'),
  plus_light: require('../../assets/plus-icon.png'),
  minus_dark: require('../../assets/minus-icon_dark.png'),
  plus_dark: require('../../assets/plus-icon_dark.png'),
};

const BUTTON_TYPE_MAPPER = {
  minus: 'minus',
  plus: 'plus',
};

const THEME_MAPPER = {
  light: 'light',
  dark: 'dark',
};

export default {
  name: 'MinusPlusButton',
  props: {
    type: {
      require: true,
      type: String,
      validator: value => Object.keys(BUTTON_TYPE_MAPPER).includes(value),
    },
    theme: {
      type: String,
      require: false,
      default: THEME_MAPPER.light,
      validator: value => Object.keys(THEME_MAPPER).includes(value),
    },
  },
  computed: {
    imageSrc() {
      return IMG_MAPPER[`${this.type}_${this.theme}`];
    },
  },
};
</script>

<style scoped>
.base-minusPlus-button {
  width: 36px;
  padding-top: 2px;
  height: 36px;
  display: inline-block;
  border: none;
  background: transparent;
  cursor: pointer;
  margin: 0 5px;
}
</style>
