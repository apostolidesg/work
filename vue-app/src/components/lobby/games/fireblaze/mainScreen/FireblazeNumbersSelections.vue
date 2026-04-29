<template>
  <NumbersSelectionLayout class="fireblaze-numbers">
    <template #titlePrefix>{{ $t('fireblaze.selectAtLeast') }}</template>
    <template #titleNumbers>
      <span>{{ numberText }}</span>
    </template>
    <div class="fireblaze-numbers__alternate-view" @click="toggleWheelView()">
      <FireblazeAlternateViewGridIcon v-if="!isWheelActive" />
      <FireblazeAlternateViewWheelIcon v-else />
    </div>
    <transition v-if="!isWheelActive" name="fade">
      <div class="fireblaze-numbers__grid">
        <FireblazeNumberButton
          v-for="{ number, stat } in numbers"
          :id="`fireblaze-number-btn-${number}`"
          :key="`ballnumber-${number}`"
          :active="isNumberActive(number)"
          :show-statistics="showStatistics(stat)"
          @click="toggleNumber(number)"
        >
          <template>{{ number }}</template>
          <template #stats>{{ stat }}</template>
        </FireblazeNumberButton>
      </div>
    </transition>
    <transition v-else name="fade">
      <div class="fireblaze-numbers__wheel">
        <FireblazeWheelView :numbers="numbers" :selectedNumbers="selectedNumbers" @number-selected="toggleNumber" />
      </div>
    </transition>
  </NumbersSelectionLayout>
</template>

<script>
import FireblazeConstants from '../../../../../util/fireblazeConstants';
import FireblazeNumberButton from './FireblazeNumberButton.vue';
import NumbersSelectionLayout from '../../eurojackpot/mainscreen/NumbersSelectionLayout.vue';
import FireblazeAlternateViewGridIcon from '../../../../../assets/fireblaze/alternate-view-grid.svg?inline';
import FireblazeAlternateViewWheelIcon from '../../../../../assets/fireblaze/alternate-view-wheel.svg?inline';
import FireblazeWheelView from './FireblazeWheelView.vue';

export default {
  name: 'FireblazeNumbersSelections',
  components: {
    FireblazeWheelView,
    NumbersSelectionLayout,
    FireblazeNumberButton,
    FireblazeAlternateViewGridIcon,
    FireblazeAlternateViewWheelIcon,
  },
  props: {
    selectedNumbers: {
      type: Array,
      required: true,
    },
    selectedOptionId: {
      type: Number,
      required: false,
      validator: (value) => {
        return !value ? true : Object.values(FireblazeConstants.BETTYPE_TO_NUMBERS_COUNT).includes(value);
      },
    },
    numbers: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isWheelActive: false,
    };
  },
  computed: {
    numberText() {
      const number = this.selectedOptionId ? this.selectedOptionId : FireblazeConstants.BOARD_NUMBERS.MIN;

      return this.$t('fireblaze.numberSelection', { number }, number);
    },
  },
  methods: {
    isNumberActive(number) {
      return this.selectedNumbers.includes(number);
    },
    toggleNumber(number) {
      this.$emit('toggle-number', number);
    },
    toggleWheelView() {
      this.isWheelActive = !this.isWheelActive;
    },
    showStatistics(stat) {
      return stat !== null && stat >= 0;
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../../../../scss-utils/fireblaze/colors';

.fireblaze-numbers {
  display: flex;
  flex-direction: column;

  &__alternate-view {
    position: absolute;
    right: 0;
    top: 0;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(5, 1fr);

    grid-row-gap: 20px;
    grid-column-gap: 12px;
    width: min-content;
    max-height: 450px;
  }

  &__wheel {
    height: 30em;
    max-height: 450px;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
