<template>
  <BaseSidescreen :betslip="betslipArray">
    <template>
      <PowerspinSelectionsList
        v-for="({ betslip, index }, betslipIndex) in notEmptyBetslips"
        :key="index"
        :betslipIndex="index"
        :betslip="betslip"
        :isSimple="betslip.wager.wheels.length === 1"
        :theme="index === selectedBetslipIndex ? 'white' : 'blue'"
        @click="setSelectedBetslipIndex({ index: betslipIndex })"
      />
      <Transition>
        <BaseButton
          v-if="addBetslipIsVisible"
          class="powerspin-sidescreen__add-button btn-block"
          @click="addNewBetslip()"
        >
          {{ $t('powerspin.sidescreen.addNewBetslip') }}
        </BaseButton>
      </Transition>
    </template>
    <template #static>
      <BettingAmount
        v-if="isBettingAmountVisible"
        :selected-multipliers="selectedBetslip.wager.comboMultipliers"
        :basic-betting-amount="basicAmmout"
        :multipliers="multipliers"
        :betslip="selectedBetslip"
        theme="blue"
        @update-multipliers="updateBetslipMultipliers"
        id="ssbt-betting-amount-sidescreen"
      />
    </template>
  </BaseSidescreen>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import moduleTypes from '../../../../../store/modules/types';
import powerspinBetslipStoreModuleTypes from '../../../../../store/modules/PowerspinBetslipStoreModule/types';
import BaseButton from '../../../../common/BaseButton';
import powerspinConstants from '../../../../../util/powerspinConstants';
import PowerspinSelectionsList from './PowerspinSelectionsList';
import BaseSidescreen from '../../../../common/BaseSidescreen.vue';
import BettingAmount from '../../../../common/BettingAmount.vue';

export default {
  name: 'SideScreen',
  components: { BettingAmount, BaseSidescreen, PowerspinSelectionsList, BaseButton },
  created() {
    this.basicAmmout = powerspinConstants.BASIC_BETTING_AMOUNT;
    this.multipliers = powerspinConstants.MULTIPLIERS_SET;
  },
  computed: {
    ...mapState(moduleTypes.POWERSPIN_GAME_STORE_MODULE, {
      betslipArray: powerspinBetslipStoreModuleTypes.state.BETSLIP_ARRAY,
      selectedBetslipIndex: powerspinBetslipStoreModuleTypes.state.SELECTED_BETSLIP_INDEX,
    }),
    ...mapGetters(moduleTypes.POWERSPIN_GAME_STORE_MODULE, {
      selectedBetslip: powerspinBetslipStoreModuleTypes.getters.GET_SELECTED_BETSLIP,
      getWheelsLength: powerspinBetslipStoreModuleTypes.getters.GET_WHEELS_LENGTH,
    }),
    notEmptyBetslips() {
      return this.betslipArray.reduce((acc, betslip, index) => {
        !betslip.isEmpty() && acc.push({ betslip, index });
        return acc;
      }, []);
    },
    addBetslipIsVisible() {
      return !this.betslipArray[0].isEmpty() && this.betslipArray.length < powerspinConstants.MAX_BETSLIP_COUNT;
    },
    isBettingAmountVisible() {
      return this.getWheelsLength > 1;
    },
  },
  methods: {
    ...mapActions(moduleTypes.POWERSPIN_GAME_STORE_MODULE, {
      addNewBetslip: powerspinBetslipStoreModuleTypes.actions.ADD_BETSLIP,
      setSelectedBetslipIndex: powerspinBetslipStoreModuleTypes.actions.SET_SELECTED_BETSLIP_INDEX,
      removeBetslip: powerspinBetslipStoreModuleTypes.actions.REMOVE_BETSLIP,
    }),
    updateBetslipMultipliers(multipliers) {
      this.selectedBetslip.toggleComboMultipliers(multipliers);
    },
  },
  watch: {
    notEmptyBetslips(newValue, oldValue) {
      if (newValue.length < oldValue.length) {
        const removedBetslipIndex = oldValue
          .filter(obj => !newValue.map(item => item.index).includes(obj.index))
          .map(item => item.index)[0];
        if (this.selectedBetslipIndex !== removedBetslipIndex) {
          this.removeBetslip({ betslipIndex: removedBetslipIndex });
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.powerspin-sidescreen {
  .v-enter-active {
    transition: opacity 0.35s;
  }
  .v-enter {
    opacity: 0;
  }
}
</style>
