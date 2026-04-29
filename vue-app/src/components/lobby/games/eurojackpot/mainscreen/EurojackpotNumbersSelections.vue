<template>
  <NumbersSelectionLayout>
    <template #titlePrefix>{{ prefixText }}</template>
    <template #titleNumbers>
      <span v-if="isEuroNumbers" class="eurojackpot-numbers__star">&star;</span>
      <span>{{ numberText }}</span>
    </template>
    <div :class="['eurojackpot-numbers__numbers', `eurojackpot-numbers__numbers--${type}`]">
      <EurojackpotNumberButton
        v-for="{ number, stat } in numbers"
        :id="`ejp-${type}-number-btn-${number}`"
        :key="number"
        :theme="type"
        :active="isNumberActive(number)"
        @click="toggleNumber(number)"
      >
        {{ number }}
        <template v-if="stat >= 0" #info>{{ stat }}</template>
      </EurojackpotNumberButton>
    </div>
  </NumbersSelectionLayout>
</template>

<script>
import EurojackpotConstants from '../../../../../util/eurojackpotConstants';
import EurojackpotNumberButton from './EurojackpotNumberButton.vue';
import NumbersSelectionLayout from './NumbersSelectionLayout.vue';

const NUMBERS_TYPES = {
  MAIN: 'main',
  EURO: 'euro',
};

export default {
  name: 'EurojackpotNumbersSelections',
  components: { NumbersSelectionLayout, EurojackpotNumberButton },
  props: {
    selectedNumbers: {
      type: Array,
      required: true,
    },
    selectedSystemId: {
      type: String,
      required: false,
      validate: value => {
        return !value ? true : Object.keys(EurojackpotConstants.SYSTEMS).includes(value);
      },
    },
    type: {
      type: String,
      default: NUMBERS_TYPES.MAIN,
      validator: value => Object.values(NUMBERS_TYPES).includes(value),
    },
    numbers: {
      type: Array,
      required: true,
    },
  },
  computed: {
    prefixText() {
      return !this.selectedSystemId ? this.$t('eurojackpot.selectAtLeast') : this.$t('eurojackpot.select');
    },
    numberText() {
      if (this.isEuroNumbers) {
        return this.$t('eurojackpot.numberSelection', { number: EurojackpotConstants.BOARD_NUMBERS.EURO_NUMBERS.MIN });
      }
      const number = this.selectedSystemId
        ? EurojackpotConstants.SYSTEMS[this.selectedSystemId].numbers
        : EurojackpotConstants.BOARD_NUMBERS.MAIN.MIN;

      return this.$t('eurojackpot.numberSelection', { number });
    },
    isEuroNumbers() {
      return this.type === NUMBERS_TYPES.EURO;
    },
  },
  methods: {
    isNumberActive(number) {
      return this.selectedNumbers.includes(number);
    },
    toggleNumber(number) {
      this.$emit('toggle-number', number);
    },
  },
};
</script>

<style scoped lang="scss">
.eurojackpot-numbers {
  &__numbers {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(5, 1fr);

    grid-row-gap: 20px;
    grid-column-gap: 12px;
    width: min-content;

    &--main {
      grid-template-columns: repeat(10, 1fr);
      grid-template-rows: repeat(5, 1fr);
    }

    &--euro {
      grid-template-columns: repeat(6, 1fr);
      grid-template-rows: repeat(2, 1fr);
    }
  }

  &__star {
    font-size: 20px;
  }
}
</style>
