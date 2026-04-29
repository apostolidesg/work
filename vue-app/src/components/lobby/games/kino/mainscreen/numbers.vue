<template>
  <div id="numbers" class="numbers-div">
    <div id="numbers-choose-title" class="main-text-header">{{ $t('chooseNumbers') }}</div>
    <form id="kino_numbers" class="kino-numbers">
      <div class="kino-number rounded-circle " v-for="kino_number in 80" :key="kino_number">
        <input
          :id="number_identifier + kino_number"
          class="form-check-input"
          type="checkbox"
          :value="isNumberClicked(kino_number)"
          @click="numberClicked(kino_number)"
        />
        <label
          :id="number_identifier + kino_number + '_label'"
          v-bind:class="[{ input_label_checked: checkIfNumberIsClicked(kino_number) }, { kino_number_height: true }]"
          :for="number_identifier + kino_number"
          >{{ kino_number }}</label
        >
      </div>
    </form>
  </div>
</template>

<script>
import playerSessionTypes from '../../../../../store/modules/PlayerBetslipsSessionModule/types';
import kinoGameModuleTypes from '../../../../../store/modules/KinoStoreModule/types';
import { mapActions, mapGetters } from 'vuex';
import moduleTypes from '../../../../../store/modules/types';

export default {
  name: 'numbers',
  props: {
    number_identifier: {
      default: 'kino_number_',
    },
  },
  created() {
    this.$eventHub.$on('clearBetslip', this.initializeActiveArea);
    this.$eventHub.$on('changeBetAreaFromPreview', this.changeBetArea);
    this.$eventHub.$on('betAreaClicked', this.changeBetArea);
  },
  computed: {
    ...mapGetters(moduleTypes.PLAYER_SESSION_MODULE, {
      getActiveBetslipArea: playerSessionTypes.getters.GET_ACTIVE_BETSLIP_AREA,
    }),
    ...mapGetters(moduleTypes.KINO_GAME_STORE_MODULE, {
      getActiveBetArea: kinoGameModuleTypes.getters.GET_ACTIVE_BET_AREA,
    }),
  },
  methods: {
    ...mapActions(moduleTypes.PLAYER_SESSION_MODULE, {
      updateActiveBetslipArea: playerSessionTypes.actions.UPDATE_ACTIVE_BETSLIP_AREA,
    }),
    ...mapActions(moduleTypes.KINO_GAME_STORE_MODULE, {
      toggleNumber: kinoGameModuleTypes.actions.TOGGLE_NUMBER,
    }),
    numberClicked(number) {
      this.toggleNumber({ number });
    },
    checkIfNumberIsClicked(kinoNumber) {
      const foundNumberPosition = (this.getActiveBetArea?.pickedNumbers || []).findIndex(
        element => element === kinoNumber
      );
      return foundNumberPosition > -1;
    },
    initializeActiveArea() {
      this.updateActiveBetslipArea(1);
    },
    changeBetArea(area) {
      this.updateActiveBetslipArea(area);
    },
    isNumberClicked(number) {
      return this.getActiveBetArea && this.getActiveBetArea.pickedNumbers.indexOf(number) > -1;
    },
  },
};
</script>

<style scoped>
.form_check_label {
  width: 100%;
  cursor: pointer;
  padding: 15px 0;
  margin-top: 0px;
}
.input_label_checked {
  height: 77px !important;
  border-radius: 50px;
  background-color: #f5be20;
  color: #123d52;
  width: 100%;
  transition: 0.35s ease-in-out;
}
.numbers-div {
  padding: 0.3rem;
}
</style>
