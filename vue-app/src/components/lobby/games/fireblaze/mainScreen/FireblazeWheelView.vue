<template>
  <div class="fireblaze-wheel">
    <div
      class="fireblaze-wheel__item"
      v-for="({ number, stat }, index) in customOrderNumbers"
      :key="`fireblaze-wheel-item-${number}`"
      :style="getWheelSliceStyle(index, numbers.length)"
      :class="{ 'fireblaze-wheel__item--active': isNumberActive(number) }"
      @click="numberSelected(number)"
    >
      <FireblazeNumberButton
        :id="`fireblaze-number-btn-${number}`"
        :key="`ballnumber-${number}`"
        :active="isNumberActive(number)"
        :style="getWheelItemStyle(index, numbers.length)"
        :show-statistics="showStatistics(stat)"
      >
        <template>{{ number }}</template>
        <template #stats>{{ stat }}</template>
      </FireblazeNumberButton>
    </div>
    <div class="fireblaze-wheel__center-circle" />
  </div>
</template>

<script>
import FireblazeNumberButton from './FireblazeNumberButton.vue';
import FireblazeConstants from '../../../../../util/fireblazeConstants';

export default {
  name: 'FireblazeWheelView',
  components: { FireblazeNumberButton },
  props: {
    numbers: {
      type: Array,
      required: true,
    },
    selectedNumbers: {
      type: Array,
      required: true,
    },
  },
  computed: {
    customOrderNumbers() {
      const customOrder = FireblazeConstants.WHEEL_VIEW_NUMBERS;
      return customOrder.reduce((result, num) => {
        const item = this.numbers.find((entry) => entry.number === num);
        if (item) result.push(item);
        return result;
      }, []);
    },
  },
  methods: {
    getWheelItemStyle(index, total) {
      const angle = (FireblazeConstants.CIRCLE_ANGLE / total) * index;
      return {
        transform: `rotate(-${angle}deg)`,
      };
    },
    getWheelSliceStyle(index, total) {
      const angle = (360 / total) * index;
      return {
        transform: `rotate(${angle}deg)`,
      };
    },
    isNumberActive(number) {
      return this.selectedNumbers.includes(number);
    },
    numberSelected(number) {
      this.$emit('number-selected', number);
    },
    showStatistics(stat) {
      return stat !== null && stat >= 0;
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../../../../scss-utils/fireblaze/colors';
.fireblaze-wheel {
  display: grid;
  place-items: center;
  position: relative;
  width: 36em;
  height: 36em;
  border: 2px solid $color-third-crimson;
  border-radius: 50%;
  transform: translate(0, -3em);
  clip-path: inset(0 0 0 0 round 50%);

  &__item {
    position: absolute;
    left: 0;
    width: 50%;
    height: 4em;
    background-color: $color-third-purple;
    color: $color-primary-black;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 0.8em;
    clip-path: polygon(0% 0%, 100% 50%, 0% 100%);
    transform-origin: center right;
    padding-left: 0.5em;
    cursor: pointer;

    &--active {
      background-color: $color-third-crimson;
    }

    ::v-deep .fireblaze-number-button {
      width: 40px;
      height: 40px;

      &__number {
        font-size: 22px;
      }
      &__stat {
        width: 17.5px;
        height: 17.5px;
        font-size: 12px;
      }
    }
  }

  &__center-circle {
    position: absolute;
    width: 12.5em;
    height: 12.5em;
    background: $gradient-dark-red;
    border-radius: 50%;
  }
}
</style>
