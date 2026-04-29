<template>
  <b-popover
    :target="targetElement"
    placement="top"
    :show.sync="showCalcPad"
    triggers="focus"
    @show="onCalcPadShown"
    @hidden="onCalcPadHidden"
  >
    <div v-if="showToastr" id="sidescreen_consDraws_toastrMsg" class="cons-draws-calc-title">
      {{ $t(consecutiveDrawsWarningMsg) }}
    </div>
    <div class="cons-draws-calc-body d-flex flex-row flex-wrap-reverse justify-content-around align-items-center">
      <div
        v-for="(number, index) in buttonsList"
        class="cons-draws-keypad-numbers"
        :class="calcButtonOrderClass(number)"
        :key="number"
      >
        <button :id="`consDraws_keypad_${index}`" @click="calcBtnClicked(index)">{{ index }}</button>
      </div>
      <div class="cons-draws-keypad-buttons order-0">
        <button id="consDraws_ce_button" class="cons-draws-keypad-ce-button" @click="onCancel">
          <img
            src="../../../../../../../static/close-white.png"
            id="ssbt_consecutive_draws_close_img"
            height="25"
            width="25"
            alt="close"
          />
        </button>
      </div>
      <div class="cons-draws-keypad-buttons order-1">
        <button id="consDraws_ok_button" class="cons-draws-keypad-ok-button" @click="onSubmit">
          <img
            src="../../../../../../../static/White_check.svg.png"
            id="ssbt_consecutive_draws_check_img"
            height="30"
            width="30"
            alt="check"
          />
        </button>
      </div>
    </div>
  </b-popover>
</template>

<style scoped>
@import 'ConsDrawsCalcPad.css';
</style>

<script>
import bPopover from 'bootstrap-vue/es/components/popover/popover';
import Constants from '../../../../../../util/Constants';
import ifElse from 'ramda/es/ifElse';
import compose from 'ramda/es/compose';
import { mapState } from 'vuex';
import moduleTypes from '../../../../../../store/modules/types';
import SessionStoreModuleTypes from '../../../../../../store/modules/SessionStoreModule/types';

const CONS_DRAWS_WARNING_MSG = {
  [Constants.GENERAL_GAME_TYPES.KINO]: 'kinoConsDrawsWarningMsg',
  [Constants.GENERAL_GAME_TYPES.POWERSPIN]: 'powespinConsDrawsWarningMsg',
  [Constants.GENERAL_GAME_TYPES.EUROJACKPOT]: 'eurojackpotConsDrawsWarningMsg',
  [Constants.GENERAL_GAME_TYPES.FIREBLAZE]: 'fireblazeConsDrawsWarningMsg',
};

const MAX_CONSECUTIVE_DRAWS = {
  [Constants.GENERAL_GAME_TYPES.KINO]: Constants.KINO_MAX_CONSECUTIVE_DRAWS_VALUE,
  [Constants.GENERAL_GAME_TYPES.POWERSPIN]: Constants.POWERSPIN_MAX_CONSECUTIVE_DRAWS_VALUE,
  [Constants.GENERAL_GAME_TYPES.EUROJACKPOT]: Constants.EUROJACKPOT_MAX_CONSECUTIVE_DRAWS_VALUE,
  [Constants.GENERAL_GAME_TYPES.FIREBLAZE]: Constants.FIREBLAZE_MAX_CONSECUTIVE_DRAWS_VALUE,
};

export default {
  name: 'cons-draws-calc-pad',
  components: { bPopover },
  props: {
    targetElement: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      consecutiveDraws: 0,
      showToastr: false,
      showCalcPad: false,
      buttonsList: 10,
      isSubmitted: false,
    };
  },
  computed: {
    selectedConsecutiveDraws() {
      return this.consecutiveDraws ? this.consecutiveDraws : 1;
    },
    ...mapState(moduleTypes.SESSION_STORE_MODULE, {
      gameType: SessionStoreModuleTypes.state.GAME_TYPE,
    }),
    consecutiveDrawsWarningMsg() {
      return CONS_DRAWS_WARNING_MSG[this.gameType];
    },
  },
  methods: {
    calcButtonOrderClass(index) {
      return `order-${index}`;
    },
    calcBtnClicked(value) {
      compose(
        ifElse(this.isValidConsecutiveDrawsValue, this.setUpdateConsecutiveDraws, this.invalidConsecutiveDrawsValue),
        this.calcConsecutiveDrawsNextValue
      )(value);
    },
    resetConsecutiveDraws() {
      this.consecutiveDraws = 0;
    },
    calcConsecutiveDrawsNextValue(value) {
      return +`${this.consecutiveDraws}${value}`;
    },
    setConsecutiveDraws(value) {
      this.consecutiveDraws = value;
    },
    setUpdateConsecutiveDraws(value) {
      this.resetErrorToast();
      this.setConsecutiveDraws(value);
      this.updateConsecutiveDraws(this.selectedConsecutiveDraws);
    },
    isValidConsecutiveDrawsValue(consecutiveDraws) {
      return (
        consecutiveDraws >= Constants.MIN_CONSECUTIVE_DRAWS_VALUE &&
        consecutiveDraws <= MAX_CONSECUTIVE_DRAWS[this.gameType]
      );
    },
    invalidConsecutiveDrawsValue() {
      this.triggerErrorToast();
    },
    triggerErrorToast() {
      this.showToastr = true;
    },
    resetErrorToast() {
      this.showToastr = false;
    },
    onCalcPadShown() {
      this.resetErrorToast();
      this.resetIsSubmitted();
      this.resetAndUpdate();
    },
    onCalcPadHidden() {
      !this.isSubmitted && this.resetAndUpdate();
    },
    updateConsecutiveDraws(value) {
      this.$emit('update-consecutive-draws', value);
    },
    closeCalcPad() {
      this.showCalcPad = false;
    },
    onCancel() {
      this.resetAndUpdate();
      this.closeCalcPad();
    },
    resetAndUpdate() {
      this.resetConsecutiveDraws();
      this.updateConsecutiveDraws(this.selectedConsecutiveDraws);
    },
    activateIsSubmitted() {
      this.isSubmitted = true;
    },
    resetIsSubmitted() {
      this.isSubmitted = false;
    },
    onSubmit() {
      this.activateIsSubmitted();
      this.updateConsecutiveDraws(this.selectedConsecutiveDraws);
      this.closeCalcPad();
    },
  },
};
</script>
