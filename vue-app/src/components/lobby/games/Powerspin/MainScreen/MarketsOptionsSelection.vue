<template>
  <div class="powerspin-markets-options-selection">
    <RoundedBorderedButton
      v-for="{ value, title } in options"
      :key="value"
      :id="`option-markets-${title}`"
      theme="magenta"
      :text-theme="textTheme"
      :active="isOptionSelected(value)"
      :value="$t(title)"
      @click="handleSelection(value)"
      view="pill"
      class="powerspin-markets-options-selection__btn"
    />
  </div>
</template>

<script>
import RoundedBorderedButton from '../../../../common/RoundedBorderedButton';

const THEME = {
  DARK: 'dark',
  LIGHT: 'light',
};

export default {
  name: 'MarketsOptionsSelection',
  components: { RoundedBorderedButton },
  props: {
    options: {
      type: Array,
      required: true,
    },
    optionsSelected: {
      type: Array,
      required: true,
    },
    theme: {
      type: String,
      default: THEME.LIGHT,
      validator: value => Object.values(THEME).includes(value),
    },
  },
  computed: {
    textTheme() {
      return this.theme === THEME.LIGHT ? 'magenta' : 'white';
    },
  },
  methods: {
    handleSelection(selection) {
      this.$emit('option-clicked', selection);
    },
    isOptionSelected(value) {
      return this.optionsSelected.includes(value);
    },
  },
};
</script>

<style scoped lang="scss">
.powerspin-markets-options-selection {
  display: flex;
  flex-direction: row;

  &__btn {
    width: 280px;
    padding: 0 5px 0 5px;
  }
}
</style>
