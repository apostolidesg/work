<template>
  <div class="under-over">
    <div
      v-for="option in options"
      :key="option.label"
      class="under-over__item"
      :class="`under-over__item--text-${textTheme}`"
    >
      <RoundedBorderedButton
        theme="magenta"
        :active="isOptionSelected(option.value)"
        @click="handleClick(option.value)"
        class="mr-2"
        :class="`under-over__rounded-bordered-button--${option.value}`"
      />
      <span :class="`under-over__rounded-bordered-label--${option.label}`">{{
        `${option.label.toUpperCase()} ${threshold}`
      }}</span>
    </div>
  </div>
</template>

<script>
import RoundedBorderedButton from '../../../../common/RoundedBorderedButton.vue';

const TEXT_THEMES = {
  black: 'black',
  white: 'white',
};

const OPTIONS = [
  { label: 'over', value: 'o' },
  { label: 'under', value: 'u' },
];

const OVER_UNDER_THRESHOLD = 12.5;
const ALLOWED_VALUES = OPTIONS.map(o => o.value);

export default {
  name: 'UnderOverSelection',
  components: { RoundedBorderedButton },
  props: {
    selectedValues: {
      type: Array,
      default: () => [],
      validator: values => values.every(val => ALLOWED_VALUES.includes(val)) && new Set(values).size === values.length,
    },
    textTheme: {
      type: String,
      default: TEXT_THEMES.black,
      validator: theme => Object.values(TEXT_THEMES).includes(theme),
    },
  },
  created() {
    this.options = OPTIONS;
    this.threshold = OVER_UNDER_THRESHOLD;
  },
  methods: {
    handleClick(option) {
      this.$emit('option-selected', option);
    },
    isOptionSelected(option) {
      return this.selectedValues.includes(option);
    },
  },
};
</script>

<style scoped>
.under-over {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  max-width: 400px;
  width: 100%;
}

.under-over__item {
  display: flex;
  align-items: center;
  font-weight: 900;
  font-size: 16px;
}

.under-over__item--text-black {
  color: var(--black);
}

.under-over__item--text-white {
  color: var(--white);
}
</style>
