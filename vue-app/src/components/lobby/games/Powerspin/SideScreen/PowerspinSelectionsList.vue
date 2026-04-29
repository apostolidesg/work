<template>
  <div v-on="$listeners" class="powerspin-selections-list p-1" :class="`powerspin-selections-list--${theme}`">
    <template v-if="hasWheelSelections">
      <template v-if="isSimple">
        <SimpleSelectionItem
          v-for="(category, i) in wheelCategories"
          :key="i"
          :category="category"
          :betslipIndex="betslipIndex"
        />
      </template>
      <ComboSelectionsItem v-else :betslip="betslip" :betslipIndex="betslipIndex" />
    </template>
    <template v-if="hasMarketSelection">
      <MarketsSelectionItem
        v-for="(category, i) in marketCategories"
        :key="i"
        :category="category"
        :betslip-index="betslipIndex"
      />
    </template>
  </div>
</template>

<script>
import SimpleSelectionItem from './SimpleSelectionsItem';
import ComboSelectionsItem from './ComboSelectionsItem';
import MarketsSelectionItem from './MarketsSelectionItem.vue';
import betslipUtils from '../../../../../util/betslipUtils';

const SELECTIONS_LIST_THEMES = {
  WHITE: 'white',
  BLUE: 'blue',
};

export default {
  name: 'PowerspinSelectionsList',
  components: { MarketsSelectionItem, SimpleSelectionItem, ComboSelectionsItem },
  props: {
    betslip: {
      type: Object,
      required: true,
    },
    isSimple: {
      type: Boolean,
      required: true,
    },
    betslipIndex: {
      type: Number,
      required: true,
    },
    theme: {
      type: String,
      required: true,
      validator: value => Object.values(SELECTIONS_LIST_THEMES).includes(value),
    },
  },
  computed: {
    wheelCategories() {
      return Object.values(this.betslip.wager.wheels[0].categories).filter(
        category => !betslipUtils.isWheelCategoryEmpty(category)
      );
    },
    marketCategories() {
      return Object.values(this.betslip.wager.markets.categories).filter(
        category => !betslipUtils.isMarketsCategoryEmpty(category)
      );
    },
    hasWheelSelections() {
      return !this.betslip.isWheelsEmpty();
    },
    hasMarketSelection() {
      return !this.betslip.wager.markets.isEmpty();
    },
  },
};
</script>

<style lang="scss" scoped>
.powerspin-selections-list {
  border-radius: 12px;
  border: none;
  &:not(:last-child) {
    margin-bottom: 10px;
  }

  &--white {
    background: #e8edf1;
    color: #042436;
    border: solid 4px var(--magenta);
  }

  &--blue {
    background: #100556;
    color: white;
  }
}
</style>
