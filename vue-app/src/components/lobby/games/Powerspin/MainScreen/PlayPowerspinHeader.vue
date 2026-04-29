<template>
  <div class="powerspin-header" :class="{ 'powerspin-header--dark': areAllWheelsPresent && isStepperActive }">
    <Stepper
      :wheels="wheels"
      :is-active="isStepperActive"
      @add-wheels="handleAddWheels"
      @remove-wheels-after-index="handleRemoveWheels"
      @logo-click="handleLogoClick"
    />
    <div class="powerspin-header__markets-button">
      <MarketsButton @click="handleMarketsButtonClick" :active="isMarketsActiveAndHasMarketSelection"></MarketsButton>
    </div>
  </div>
</template>

<script>
import Stepper from './Stepper.vue';
import { mapActions, mapGetters } from 'vuex';
import moduleTypes from '../../../../../store/modules/types';
import powerspinModuleTypes from '../../../../../store/modules/PowerspinBetslipStoreModule/types';
import powerspinConstants from '../../../../../util/powerspinConstants';
import modalEventConstants from '../../../../../util/modalEventConstants';
import infoModalMessages from '../../../../../util/infoModalMessages';
import MarketsButton from '../../../../common/MarketsButton.vue';
import Constants from '../../../../../util/Constants';

export default {
  name: 'PlayPowerspinHeader',
  components: { MarketsButton, Stepper },
  props: {
    mode: {
      type: String,
      required: true,
      validator: value => Object.values(Constants.POWERSPIN_PLAY_MODE).includes(value),
    },
  },
  computed: {
    ...mapGetters(moduleTypes.POWERSPIN_GAME_STORE_MODULE, {
      selectedBetslip: powerspinModuleTypes.getters.GET_SELECTED_BETSLIP,
      numOfWheels: powerspinModuleTypes.getters.GET_WHEELS_LENGTH,
      marketsSelection: powerspinModuleTypes.getters.GET_MARKETS,
    }),
    wheels() {
      return this.selectedBetslip.wager.wheels;
    },
    isMarketsActiveAndHasMarketSelection() {
      return this.mode === Constants.POWERSPIN_PLAY_MODE.MARKETS || !this.marketsSelection.isEmpty();
    },
    isStepperActive() {
      return this.mode === Constants.POWERSPIN_PLAY_MODE.WHEELS;
    },
    areAllWheelsPresent() {
      return this.numOfWheels === powerspinConstants.MAX_WHEELS;
    },
  },
  methods: {
    ...mapActions(moduleTypes.POWERSPIN_GAME_STORE_MODULE, {
      addWheel: powerspinModuleTypes.actions.ADD_WHEEL,
      removeWheel: powerspinModuleTypes.actions.REMOVE_WHEEL,
    }),
    handleAddWheels(wheelsToAdd = 0) {
      if (!this.isStepperActive) return;
      if (
        powerspinConstants.REQUESTED_NUMBERS.slice(1).some(requestedNumber =>
          this.wheels[0].getNumberBoard().panels[0].requested.includes(requestedNumber)
        )
      ) {
        this.$eventHub.$emit(
          modalEventConstants.OPEN.INFO,
          infoModalMessages.powerspinRequestedNumbersNotAllowedInCombo
        );
      } else {
        for (let i = 0; i < wheelsToAdd; i++) {
          this.addWheel();
        }
      }
    },
    handleRemoveWheels(index) {
      if (!this.isStepperActive) return;
      const from = this.numOfWheels - 1;
      for (let i = from; i > index; i--) {
        this.removeWheel({ wheelIndex: i });
      }
    },
    handleLogoClick() {
      if (!this.isStepperActive) {
        this.$emit('mode-changed', Constants.POWERSPIN_PLAY_MODE.WHEELS);
      }
    },
    handleMarketsButtonClick() {
      const newMode =
        this.mode === Constants.POWERSPIN_PLAY_MODE.MARKETS
          ? Constants.POWERSPIN_PLAY_MODE.WHEELS
          : Constants.POWERSPIN_PLAY_MODE.MARKETS;

      this.$emit('mode-changed', newMode);
    },
  },
};
</script>

<style scoped lang="scss">
.powerspin-header {
  display: flex;
  flex-direction: row;
  background: linear-gradient(180deg, #d3edfd 0%, #f5fbfe 14.06%, #f4fafe 89.58%, #d3edfd 100%);

  &--dark {
    background: linear-gradient(180deg, #17277c 0%, #1b2f9e 15.1%, #1b2f9e 85.42%, #17277c 100%);
  }

  &__markets-button {
    margin: 6px 7px 0 7px;
  }
}
</style>
