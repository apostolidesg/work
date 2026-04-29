<template>
  <div :class="['color-selection', { 'color-selection--shrinked': shrink }]">
    <RoundedBorderedButton
      v-for="selection in selections"
      :id="`option-${selection}-${wheelIndex}`"
      :key="selection"
      :value="$t(`powerspinColorCategories.${selection}`)"
      :theme="selection"
      :active="isColorSelected(selection)"
      @click="handleClick(selection)"
      :text-theme="textTheme"
      view="pill"
      class="color-selection__btn mx-1"
      :shrink="shrink"
    />
  </div>
</template>

<script>
import RoundedBorderedButton from '../../../../common/RoundedBorderedButton.vue';

const SELECTIONS = {
  RED: 'red',
  GREEN: 'green',
  BLUE: 'blue',
};

const TEXT_THEMES = {
  WHITE: 'white',
  BLACK: 'black',
};

const ALLOWED_VALUES = Object.values(SELECTIONS);

export default {
  name: 'ColorSelection',
  components: { RoundedBorderedButton },
  data() {
    return {
      selections: ALLOWED_VALUES,
    };
  },
  props: {
    colorsSelected: {
      type: Array,
      required: true,
      validator: (values) =>
        values.every((val) => ALLOWED_VALUES.includes(val)) && new Set(values).size === values.length,
    },
    textTheme: {
      type: String,
      default: TEXT_THEMES.WHITE,
      validator: (value) => Object.values(TEXT_THEMES).includes(value),
    },
    shrink: {
      type: Boolean,
      default: false,
    },
    wheelIndex: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    handleClick(color) {
      this.$emit('color-clicked', color);
    },
    isColorSelected(color) {
      return this.colorsSelected.includes(color);
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  --max-button-width: 170px;
  --gutter: 5px;
}

.color-selection {
  display: flex;
  max-width: calc(3 * var(--max-button-width) + (2 * var(--gutter)));
  width: 100%;
  &__btn {
    flex: 1;
  }
  &--shrinked {
    width: 90%;
    ::v-deep .rounded-bordered-button__button-pill {
      padding: 22px 0;
    }
  }
}
</style>
