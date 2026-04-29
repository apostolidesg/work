<template>
  <transition id="oddEvenModal">
    <div class="app-modal-backdrop">
      <section class="oddEven-modal">
        <div id="mona_ziga_modal" class="p-3 ui-dialog-content ui-widget-content">
          <div id="oddEven_closeButtonDiv">
            <span id="ui-id-1" class="ui-dialogue-title">&nbsp;</span>
            <button type="button" class="closeButton" @click="closeModal" id="odd-even-close-button"></button>
          </div>
          <div class="row sidebet_logo">
            <div class="col-12 text-center p-3">
              <img
                id="oddEvenModalImgLogo"
                width="138"
                src="../../../../../assets/mona-zyga-logo@2x.png"
                alt="odd-even"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-12 text-center mb-4">
              <p id="oddEvenModalSelectionTitle" class="m-3">
                <strong>{{ $t('choice') }}</strong>
              </p>
              <form id="mona_ziga_options" v-on:submit.prevent>
                <div
                  v-for="chooseOddEven in 3"
                  :key="chooseOddEven"
                  :class="['mzi-option', { ziga: chooseOddEven === 2, isopalia: chooseOddEven === 3 }]"
                  style="margin-right: 10px"
                >
                  <input
                    :id="identifier + 0 + chooseOddEven"
                    type="radio"
                    :value="oddEven[chooseOddEven - 1]"
                    v-model="oddEvenGame.oddEven"
                    class="form-check-input"
                    @click="oddEvenClicked"
                  />
                  <label
                    :id="identifier + 0 + chooseOddEven + '_label'"
                    class="mziLabel"
                    :for="identifier + 0 + chooseOddEven"
                    >{{ $t(oddEven[chooseOddEven - 1]) }}</label
                  >
                </div>
              </form>
            </div>
          </div>
          <div class="row">
            <div class="col-12 text-center">
              <p id="oddEvenModalBetAmountTitle" class="m-3">
                <strong>{{ $t('betting') }}</strong>
              </p>
              <form id="pontarisma_mona_ziga" class="pontarisma-section" v-on:submit.prevent>
                <div v-for="chooseAmount in 10" :key="chooseAmount" class="pontarisma-numbers">
                  <input
                    class="form-check-input"
                    :id="identifier + 1 + chooseAmount"
                    type="checkbox"
                    :value="oddEvenAmounts[chooseAmount - 1]"
                    v-model="oddEvenGame.oddEvenAmount"
                  />
                  <label
                    :id="identifier + 1 + chooseAmount + '_label'"
                    class="form-check-label"
                    :for="identifier + 1 + chooseAmount"
                    >{{ oddEvenAmounts[chooseAmount - 1] }}€</label
                  >
                </div>
              </form>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div class="clearButton" :class="{ disabledOddEvenBtn: clearButtonDisabled }">
              <BaseClearButton
                type="button"
                topLabel="clear"
                theme="white"
                @click="resetOddEven"
                id="odd-even-clear-betslip-button"
              />
            </div>
            <button
              type="button"
              @click="addOddEvenToBetslip"
              class="addButton"
              :class="{ disabledOddEvenBtn: addButtonDisabled }"
              id="odd-even-add-to-betslip-button"
              :disabled="addButtonDisabled"
            >
              {{ $t('addition') }}
            </button>
          </div>
        </div>
      </section>
    </div>
  </transition>
</template>

<script>
import OddEven from '@/model/OddEven';
import Constants from '@/util/Constants';
import { isEmpty } from 'lodash';
import BaseClearButton from '../../../../common/BaseClearButton';
import moduleTypes from '../../../../../store/modules/types';
import kinoGameModuleTypes from '../../../../../store/modules/KinoStoreModule/types';
import { mapActions } from 'vuex';

export default {
  name: 'OddEven',
  components: { BaseClearButton },
  props: {
    betslip: { type: Object, required: true },
    identifier: { default: 'odd_even_sidebet_' },
  },
  data() {
    return {
      oddEvenAmounts: Constants.ODD_EVEN_COLUMNS_AMOUNTS,
      oddEven: Constants.ODD_EVEN_VALUES,
      oddEvenGame: new OddEven(),
    };
  },
  methods: {
    ...mapActions(moduleTypes.KINO_GAME_STORE_MODULE, {
      updateOddEvenGame: kinoGameModuleTypes.actions.SET_ODD_EVEN,
      resetOddEven: kinoGameModuleTypes.actions.RESET_ODD_EVEN,
    }),
    addOddEvenToBetslip() {
      const { oddEven, oddEvenAmount } = this.oddEvenGame;
      if (oddEven === '' || oddEvenAmount.length === 0) return;

      this.updateOddEvenGame({ oddEven, oddEvenAmount });
      this.$emit('close');
    },
    closeModal() {
      this.oddEvenGame = new OddEven();
      this.oddEvenGame.oddEven = this.betslip.oddEvenGame.oddEven;
      this.oddEvenGame.oddEvenAmount = this.betslip.oddEvenGame.oddEvenAmount;
      this.$emit('close');
    },
    oddEvenClicked() {
      if (isEmpty(this.oddEvenGame.oddEvenAmount)) {
        this.oddEvenGame.oddEvenAmount.push(this.oddEvenAmounts[0]);
      }
    },
  },
  computed: {
    clearButtonDisabled() {
      return this.oddEvenGame.oddEven === '' && this.oddEvenGame.oddEvenAmount.length === 0;
    },
    addButtonDisabled() {
      return this.oddEvenGame.oddEven === '' || this.oddEvenGame.oddEvenAmount.length === 0;
    },
  },
  watch: {
    betslip: {
      handler() {
        this.oddEvenGame.oddEven = this.betslip.oddEvenGame.oddEven;
        this.oddEvenGame.oddEvenAmount = this.betslip.oddEvenGame.oddEvenAmount;
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style scoped>
.oddEven-modal {
  height: 670px !important;
  flex-direction: column;
  justify-items: center;
  text-align: center;
  width: 40%;
  background: #0a3b51;
  box-shadow: 2px 2px 20px 1px;
  display: flex;
}

.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}

.addButton {
  outline: none;
  background: url(../../../../../assets/plus-icon@2x.png) transparent no-repeat;
  background-size: 39px;
  background-position: 50% 98%;
  margin: 2px 2em 0.5em 0;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.7);
  font-size: 11px;
  padding: 15px;
  border: 0;
  display: inline-flex;
  flex-direction: column;
  height: 81px;
  font-weight: bold;
  float: right;
}

.clearButton {
  outline: none;
  margin-top: 0px;
  font-size: 11px;
  padding: 15px;
  border: 0;
  display: inline-flex;
  flex-direction: column;
  height: 86px;
  font-weight: bold;
  float: left;
}

.closeButton {
  float: right;
  width: 60px;
  height: 43px;
  background: url(../../../../../assets/close-white.png) transparent no-repeat;
  background-size: 27px;
  border: 0;
  cursor: pointer;
  background-position: center;
  z-index: 99;
  margin: -10px 0 0 0;
  padding: 1px;
  right: 0.3em;
  vertical-align: top;
}

.ui-dialog-title {
  float: left;
  margin: 0.1em 0;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.header-icon-link {
  color: rgba(0, 0, 0, 0.6);
  font-weight: 900;
  font-size: 11.36px;
  display: flex;
  flex-direction: column;
  text-align: center;
}

.countdown-modal .draw-text {
  color: white !important;
  font-size: 10px;
}

.next-draw {
  color: #20303f;
  font-size: 40px;
  font-weight: 900;
  display: inline-flex;
}

.draw-text {
  display: inline-flex;
  vertical-align: text-bottom;
  font-size: 13px;
  text-align: right;
}

.ui-widget,
.ui-widget-content {
  background-color: #0a3b51;
  color: white !important;
  border: 0 !important;
}

.pontarisma-section {
  width: 377px;
  text-align: center;
  margin: 0 auto;
}

.countdown-modal .next-draw {
  font-size: 27px;
  color: white !important;
}

.mzi-option {
  display: inline-block;
  padding: 0;
  color: white;
  font-size: 18.35px;
  text-align: center;
  font-weight: 900;
  width: 150px;
  height: 67px;
  background-color: #104e6a;
  margin: 10px 0;
  line-height: 48px;
}

.mzi-option input[type='radio']:checked + label {
  background-color: #a1dded;
  color: #123d52;
}

.ziga input[type='radio']:checked + label {
  background-color: #ff9001;
  color: #123d52;
}

.isopalia input[type='radio']:checked + label {
  background-color: #ebebec;
  color: #123d52;
}

.mziLabel {
  display: inline-block;
  height: 67px;
  width: 100%;
  cursor: pointer;
  padding: 10px 0;
}

.sidebet_logo {
  display: block;
}

#oddEven_closeButtonDiv {
  padding-top: 15px;
  position: relative;
}

.disabledOddEvenBtn {
  opacity: 0.4;
}
::v-deep .base-clear-button__trash {
  font-size: 40px;
}
</style>
