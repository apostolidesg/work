<template>
  <transition id="columnsModal">
    <div class="app-modal-backdrop">
      <section class="columns-modal">
        <div id="stiles_modal" class="p-3 ui-dialog-content ui-widget-content">
          <div id="columns_closeButtonDiv">
            <span id="ui-id-1" class="ui-dialogue-title">&nbsp;</span>
            <button type="button" class="closeButton" @click="closeStilesModal" id="columns-close-button"></button>
          </div>
          <div class="row sidebet_logo">
            <div class="col-12 text-center p-3">
              <img id="columnsModalImgLogo" width="138" src="../../../../../assets/stiles-logo@2x.png" alt="columns" />
            </div>
          </div>
          <div class="row">
            <div class="col-12 text-center mb-4">
              <p id="columnsModalColumnsSelectionTitle" class="m-2">
                <strong>{{ $t('chooseColumn') }}</strong>
              </p>
              <p id="columnsModalColumnsSelectionInfo" class="m-2">{{ $t('chooseColumnInfo') }}</p>
              <form id="stiles_options" class="stiles-section">
                <div class="stiles-number" v-for="chooseColumn in 10" :key="chooseColumn">
                  <input
                    class="form-check-input"
                    :id="identifier + 1 + chooseColumn"
                    type="checkbox"
                    :value="chooseColumn"
                    v-model="columnsGame.columns"
                    @click="columnClicked"
                  />
                  <label
                    class="columnsChoices"
                    :id="identifier + 1 + chooseColumn + '_label'"
                    :for="identifier + 1 + chooseColumn"
                    >{{ chooseColumn
                    }}<span class="stiles-number-ordinal">{{ $t('ordinalIndicator.' + chooseColumn) }}</span></label
                  >
                </div>
              </form>
            </div>
          </div>
          <div class="row">
            <div class="col-12 text-center">
              <p id="columnsModalBetAmountTitle" class="m-3">
                <strong>{{ $t('bettingPerColumn') }}</strong>
              </p>
              <form id="pontarisma_stiles" class="p-stiles pontarisma-section">
                <div v-for="chooseAmount in 10" class="pontarisma-numbers" :key="chooseAmount">
                  <input
                    class="form-check-input"
                    :id="identifier + 2 + chooseAmount"
                    type="checkbox"
                    :value="columnsAmount[chooseAmount - 1]"
                    v-model="columnsGame.columnsAmount"
                  />
                  <label
                    class="form-check-label"
                    :id="identifier + 2 + chooseAmount + '_label'"
                    :for="identifier + 2 + chooseAmount"
                    >{{ columnsAmount[chooseAmount - 1] }}€</label
                  >
                </div>
              </form>
            </div>
          </div>
          <div>
            <div>
              <div class="clearButton" :class="{ disabledColumnsBtn: clearButtonDisabled }">
                <BaseClearButton
                  type="button"
                  @click="resetColumns"
                  topLabel="clear"
                  theme="white"
                  id="columns-clear-betslip-button"
                />
              </div>
              <button
                type="button"
                @click="addStilesToBetslip"
                id="columns-add-to-betslip-button"
                class="addButton"
                :class="{ disabledColumnsBtn: addButtonDisabled }"
                :disabled="addButtonDisabled"
              >
                <span>{{ $t('addition') }}</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </transition>
</template>

<script>
import Columns from '@/model/Columns';
import Constants from '@/util/Constants';
import { isEmpty } from 'lodash';
import BaseClearButton from '../../../../common/BaseClearButton';
import { mapActions } from 'vuex';
import moduleTypes from '../../../../../store/modules/types';
import kinoGameModuleTypes from '../../../../../store/modules/KinoStoreModule/types';

export default {
  name: 'Columns',
  components: { BaseClearButton },
  props: {
    betslip: { type: Object, required: true },
    identifier: { default: 'columns_sidebet_' },
  },
  columns_identifier: {
    default: 'columns_number_',
  },
  data() {
    return {
      columnsAmount: Constants.ODD_EVEN_COLUMNS_AMOUNTS,
      columnsGame: new Columns(),
    };
  },
  methods: {
    ...mapActions(moduleTypes.KINO_GAME_STORE_MODULE, {
      updateColumnsGame: kinoGameModuleTypes.actions.SET_COLUMNS,
      resetColumns: kinoGameModuleTypes.actions.RESET_COLUMNS,
    }),
    addStilesToBetslip() {
      const { columns, columnsAmount } = this.columnsGame;
      if (columns.length === 0 || columnsAmount.length === 0) return;

      this.updateColumnsGame({ columns, columnsAmount });

      this.$emit('close');
    },
    closeStilesModal() {
      this.columnsGame = new Columns();
      this.columnsGame.columns = this.betslip.columnsGame.columns;
      this.columnsGame.columnsAmount = this.betslip.columnsGame.columnsAmount;
      this.$emit('close');
    },
    columnClicked() {
      if (isEmpty(this.columnsGame.columnsAmount)) {
        this.columnsGame.columnsAmount.push(this.columnsAmount[0]);
      }
    },
  },
  computed: {
    clearButtonDisabled() {
      return this.columnsGame.columns.length === 0 && this.columnsGame.columnsAmount.length === 0;
    },
    addButtonDisabled() {
      return this.columnsGame.columns.length === 0 || this.columnsGame.columnsAmount.length === 0;
    },
  },
  watch: {
    betslip: {
      handler() {
        this.columnsGame.columns = this.betslip.columnsGame.columns;
        this.columnsGame.columnsAmount = this.betslip.columnsGame.columnsAmount;
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style scoped>
.columns-modal {
  height: 720px !important;
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
  background: url(../../../../../assets/plus-icon@2x.png) transparent no-repeat;
  background-size: 39px;
  background-position: 50% 98%;
  margin: 0.5em 0.4em 0.5em 0;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.7);
  font-size: 11px;
  padding: 15px;
  border: 0;
  display: inline-flex;
  flex-direction: column;
  height: 86px;
  font-weight: bold;
  float: right;
}

.clearButton {
  background-size: 39px;
  background-position: 50% 98%;
  margin-top: 12px;
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
.draw-text {
  display: inline-flex;
  vertical-align: text-bottom;
  font-size: 13px;
  text-align: right;
}

.columnsChoices {
  display: inline-block;
  width: 100%;
  height: 100%;
  cursor: pointer;
  line-height: 73px;
}

input[type='checkbox']:checked + label,
input[type='radio']:checked + label {
  background-color: #f5be20;
  color: #123d52;
  width: 100%;
  transition: 0.35s ease-in-out;
}

.sidebet_logo {
  display: block;
}

#columns_closeButtonDiv {
  padding-top: 15px;
  position: relative;
}

.disabledColumnsBtn {
  opacity: 0.4;
}

.stiles-number-ordinal {
  font-size: 20px !important;
}
::v-deep .base-clear-button__trash {
  font-size: 40px;
}
</style>
