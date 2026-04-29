<template>
  <div class="submit-button">
    <loading
      class="submit-button__loading-spinner p-2"
      id="ssbt_submit_button_loading_spinner"
      :active.sync="isSubmitting"
      :can-cancel="false"
      :is-full-page="false"
      :opacity="0.0"
      :color="spinnerColor"
    >
    </loading>
    <div ref="placeBetInfoRef" v-if="error" @click="toggleInfo" class="col submit-button__info">
      <i><FontAwesomeIcon id="ssbt_submit_button_info_icon" icon="info-circle"></FontAwesomeIcon></i>
      <b-tooltip :target="() => $refs.placeBetInfoRef" :show.sync="showInfo" placement="top" container="submit_button">
        <strong>{{ $t(error) }}</strong>
      </b-tooltip>
    </div>
    <div
      class="submit-button__printBetslip"
      :data-disabled="disabled"
      :class="['row', { 'submit-button__printBetslip--disabled': disabled }]"
      @click="submitWager"
    >
      <div id="ssbt_place_bet_text" class="submit-button__printBetslip-text col-6">
        <span>{{ $t('printBetslip') }}</span>
      </div>
      <div class="submit-button__printBetslip-cost col-6">
        <div id="ssbt_betslip_value_text" class="col submit-button__printBetslip-cost-title">
          <span>{{ $t('betslipValue') }}</span>
        </div>
        <div id="ssbt_betslip_value" class="col submit-button__printBetslip-cost-value">{{ betslipCost }}&euro;</div>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Loading from 'vue-loading-overlay';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faInfoCircle } from '@fortawesome/fontawesome-free-solid';

library.add(faInfoCircle);

export default {
  name: 'SubmitWagerButton',
  props: {
    isSubmitting: {
      type: Boolean,
      required: true,
    },
    submitWager: {
      type: Function,
      required: true,
    },
    error: {
      type: String,
    },
    betslipCost: {
      type: Number,
      required: true,
    },
  },
  components: {
    FontAwesomeIcon,
    Loading,
  },
  data() {
    return {
      showInfo: false,
    };
  },
  created() {
    this.spinnerColor = '#FF9001';
  },
  computed: {
    disabled() {
      return this.error || this.isSubmitting;
    },
  },
  methods: {
    toggleInfo() {
      this.showInfo = !this.showInfo;
    },
  },
};
</script>

<style scoped>
.submit-button {
  border-radius: 7.3px;
  background: #00b80a url(../../assets/glow-effect@2x.png) top -41px right -115px / 390px 135px no-repeat;
  cursor: pointer;
  height: 88px;
  width: 380px;
  display: inline-block;
  position: relative;
}
.submit-button__printBetslip-text {
  font-size: 24px;
  padding-left: 50px;
  color: white;
  font-weight: 900;
  text-align: center;
  display: flex;
  align-items: center;
}
.submit-button__loading-spinner {
  border-radius: 7.3px;
}
.submit-button__info {
  background-color: #06dc1d;
  padding: 0;
  position: absolute;
  width: 38px;
  border-top-left-radius: 7.3px;
  height: 88px;
  border-bottom-left-radius: 7.3px;
  vertical-align: middle;
  color: white;
  z-index: 99;
  display: flex;
  align-items: center;
}
.submit-button__info i {
  vertical-align: middle;
  margin: 35px 9px;
  font-size: 20px;
}
.submit-button__printBetslip {
  margin: 0 auto;
  height: 88px;
}
.submit-button__printBetslip-cost {
  margin: 0;
  color: #20303f;
  font-weight: 900;
  text-align: center;
}
.submit-button__printBetslip-cost-title {
  padding: 0;
  line-height: 40px;
  height: 40px;
}
.submit-button__printBetslip-cost-value {
  font-size: 24px;
  height: 40px;
  color: white;
  font-weight: 700;
}
.submit-button__printBetslip--disabled {
  opacity: 0.5;
}
</style>
