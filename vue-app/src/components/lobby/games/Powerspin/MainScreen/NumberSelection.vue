<template>
  <div class="number-selection">
    <div v-if="showHeader" class="number-selection__header">
      <RoundedBorderedButton
        v-for="number in requestedNumbers"
        :key="number"
        theme="magenta"
        :title="$t(`powerspinRequestedNumberLabels.${number}`)"
        :textTheme="textTheme"
        @click="requestedNumberClicked(number)"
        :active="isRequestedNumberSelected(number)"
        :id="`powerspin-requested-number-${number}-${idSuffix}`"
      />
    </div>
    <div :class="['number-selection__numbers', selectionNumbersClass]">
      <RoundedBorderedButton
        class="number-selection__number"
        v-for="number in numbers"
        :key="number"
        :value="number"
        :theme="numberToThemeMap[number]"
        :textTheme="textTheme"
        @click="columnNumberClicked(number)"
        :active="isColumnNumberSelected(number)"
        :id="`powerspin-number-${number}-${idSuffix}`"
      />
    </div>
    <div class="number-selection__footer" v-if="showQuickPick">
      <RandomButton :id="`ssbt_random_button-${idSuffix}`" theme="blue" @random-button-clicked="selectRandomNumbers" />
    </div>
  </div>
</template>

<script>
import RandomButton from '../../../../common/RandomButton.vue';
import RoundedBorderedButton from '../../../../common/RoundedBorderedButton.vue';
import Constants from '../../../../../util/powerspinConstants';

const TEXT_THEMES = {
  WHITE: 'white',
  BLACK: 'black',
};

export default {
  name: 'NumberSelection',
  components: {
    RandomButton,
    RoundedBorderedButton,
  },
  props: {
    showHeader: {
      type: Boolean,
      default: true,
    },
    isStreched: {
      type: Boolean,
      default: true,
    },
    textTheme: {
      type: String,
      default: TEXT_THEMES.BLACK,
      validator: value => Object.values(TEXT_THEMES).includes(value),
    },
    idSuffix: {
      type: String,
      default: '',
    },
    numberBoardPanel: {
      type: Object,
      required: true,
    },
  },
  created() {
    this.numbers = Constants.BETSLIP_NUMBERS.MAX_NUMBER_RANGE;
    this.requestedNumbers = Constants.REQUESTED_NUMBERS;
    this.numberToThemeMap = Object.keys(Constants.BUTTON_COLOR_MAPPER).reduce((acc, theme) => {
      Object.values(Constants.BUTTON_COLOR_MAPPER[theme]).forEach(number => {
        acc[number] = theme;
      });
      return acc;
    }, {});
  },
  computed: {
    selectionNumbersClass() {
      return this.isStreched ? 'number-selection__numbers--stretch' : 'number-selection__numbers--shrink';
    },
    showQuickPick() {
      return !!this.$listeners['random-pick-click'];
    },
  },
  methods: {
    requestedNumberClicked(number) {
      this.$emit('requested-number-click', number);
    },
    isRequestedNumberSelected(number) {
      return this.numberBoardPanel.requested.includes(number);
    },
    isColumnNumberSelected(number) {
      return this.numberBoardPanel.selection.includes(number);
    },
    columnNumberClicked(number) {
      this.$emit('column-number-click', number);
    },
    selectRandomNumbers() {
      this.$emit('random-pick-click');
    },
  },
};
</script>

<style scoped>
.number-selection {
  width: fit-content;
  display: flex;
  flex-direction: column;
}
.number-selection__header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}
.number-selection__numbers {
  display: grid;
  margin-left: 7px;
  margin-right: -5px;
  margin-bottom: 20px;
}
.number-selection__numbers--stretch {
  grid-template-columns: repeat(12, auto);
}
.number-selection__numbers--shrink {
  grid-template-columns: repeat(8, auto);
}
.number-selection__number {
  margin: 3px;
}
.number-selection__footer {
  display: flex;
  justify-content: flex-end;
}
</style>
