<template>
  <div id="settings" class="settings d-flex flex-column justify-content-between pb-4">
    <div>
      <PayTable
        :gameType="activeBetAreaGameType"
        :kinoBonusActive="kinoBonusActive"
        :multiplier="activeAreaMultiplier"
        :close2WinActive="kinoClose2WinActive"
        :close2WinAvailable="isClose2WinEnabled"
      />
      <div id="quick_pick_header" class="main-text-header m-2 mt-3">{{ $t('randomPick') }}</div>
      <div id="quick_pick" class="quick-pick border-white m-2 mt-0">
        <div class="quick-pick-input">
          <div class="quick-pick-input-wrapper">
            <MinusPlusButton
              id="quick_pick_down"
              class="quick-pick-arrow"
              @click="decreaseQuickPickGameType"
              type="minus"
            />
            <input
              id="quick_pick_input"
              type="button"
              ref="quickPickInput"
              :value="quickPickGameType"
              @click="handleQuickPickPadClick"
              v-on:blur="showQuickPickPad = false"
            />
            <MinusPlusButton
              id="quick_pick_up"
              class="quick-pick-arrow"
              @click="increaseQuickPickGameType"
              type="plus"
            />
          </div>
        </div>
        <button id="quick_pick_button" class="quick-pick-button" @click="randomPick()">
          <img
            id="shuffle_button_img"
            width="50"
            src="../../../../../assets/shuffle@2x.png"
            class="ml-2"
            alt="Quick Pick"
          />
        </button>
        <b-popover
          id="quick_pick_pad"
          :target="() => $refs.quickPickInput"
          placement="topright"
          container="quick_pick"
          :show.sync="showQuickPickPad"
        >
          <div class="quick-pick-numbers">
            <div
              :class="{ number: true, number__disabled: isQuickPickGameTypeDisabled(game_type) }"
              v-for="(game_type, index) in gameTypeValues"
              :key="index"
            >
              <input
                :id="game_type_identifier + game_type"
                name="game-selection-radio"
                class="form-check-input"
                type="checkbox"
                :value="isQuickPickGameTypeClicked(game_type)"
                @change="quickPickGameTypeClicked(game_type)"
                :disabled="isQuickPickGameTypeDisabled(game_type)"
              />
              <label
                :id="game_type_identifier + game_type + '_label'"
                v-bind:class="[
                  { input_label_checked: isQuickPickGameTypeClicked(game_type) },
                  { form_check_label: true },
                  { form_check_label__disabled: isQuickPickGameTypeDisabled(game_type) },
                ]"
                :for="game_type_identifier + game_type"
              >
                <span>{{ game_type }}</span>
              </label>
            </div>
          </div>
        </b-popover>
      </div>
      <BettingAmount
        :multipliers="multipliers"
        :basic-betting-amount="basicBettingAmount"
        :mult_identifier="mult_identifier"
        @update-multipliers="updateMultipliers"
        :disabled="noNumbersSelected"
        :selected-multipliers="selectedMultipliers"
      />
    </div>
    <div class="settings-footer">
      <KinoBonusToggle v-model="kinoBonusActive" :disabled="noNumbersSelected" />
      <Close2WinToggle v-model="kinoClose2WinActive" :disabled="!gameEligibleForClose2Win" v-if="isClose2WinEnabled" />
      <div class="clear-button">
        <BaseClearButton
          id="settings-clear-btn"
          :class="['clear-settings-btn', 'lh-1', { 'disabled-clear-settings-btn': noNumbersSelected }]"
          bottomLabel="clear"
          theme="white"
          :disabled="noNumbersSelected"
          @click="clearActiveArea"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Util from '@/util/Utilities';
import Constants from '@/util/Constants';
import { Popover } from 'bootstrap-vue/es/components';
import dialogModalMessages from '../../../../../util/dialogModalMessages';
import moduleTypes from '../../../../../store/modules/types';
import playerSessionTypes from '../../../../../store/modules/PlayerBetslipsSessionModule/types';
import { mapActions, mapGetters, mapState } from 'vuex';
import modalEventConstants from '../../../../../util/modalEventConstants';
import BettingAmount from '../../../../common/BettingAmount.vue';
import BaseClearButton from '../../../../common/BaseClearButton.vue';
import MinusPlusButton from '../../../../common/MinusPlusButton.vue';
import sessionStoreModuleTypes from '../../../../../store/modules/SessionStoreModule/types';
import kinoGameModuleTypes from '../../../../../store/modules/KinoStoreModule/types';
import PayTable from './PayTable.vue';
import configurationStoreModule from '../../../../../store/modules/ConfigurationStoreModule/types';
import KinoBonusToggle from './KinoBonusToggle.vue';
import Close2WinToggle from './Close2WinToggle.vue';

Vue.use(Popover);

export default {
  name: 'Settings',
  components: {
    Close2WinToggle,
    MinusPlusButton,
    BaseClearButton,
    BettingAmount,
    PayTable,
    KinoBonusToggle,
  },
  props: {
    mult_identifier: {
      default: 'mult_',
    },
    game_type_identifier: {
      default: 'game_type_',
    },
  },
  data() {
    return {
      firstPopoverClick: false,
      showQuickPickPad: false,
      quickPickGameType: null,
    };
  },
  created() {
    this.$eventHub.$on('clearBetslip', this.initializeActiveArea);
    this.$eventHub.$on('changeBetAreaFromPreview', this.changeBetAreaFromPreview);
    this.gameTypeValues = [...Constants.KINO_GAMES].reverse();
    this.basicBettingAmount = Constants.BASIC_BETTING_AMOUNT;
    this.close2WinGames = Constants.KINO_CLOSE_2_WIN_GAMES;
    this.multipliers = Constants.MULTIPLIERS_SET;
  },
  mounted() {
    this.changeBetAreaFromPreview(this.getActiveBetslipArea);
  },
  beforeDestroy() {
    this.$eventHub.$off('clearBetslip', this.initializeActiveArea);
    this.$eventHub.$off('changeBetAreaFromPreview', this.changeBetAreaFromPreview);
  },
  methods: {
    ...mapActions(moduleTypes.PLAYER_SESSION_MODULE, {
      updateActiveBetslipArea: playerSessionTypes.actions.UPDATE_ACTIVE_BETSLIP_AREA,
    }),
    ...mapActions(moduleTypes.KINO_GAME_STORE_MODULE, {
      clearSelectedArea: kinoGameModuleTypes.actions.CLEAR_ACTIVE_BET_AREA,
      setKinoBonusValue: kinoGameModuleTypes.actions.SET_KINO_BONUS_VALUE,
      setKinoClose2WinValue: kinoGameModuleTypes.actions.SET_KINO_CLOSE_2_WIN_VALUE,
      toggleMultiplier: kinoGameModuleTypes.actions.TOGGLE_MULTIPLIER,
      quickPickClicked: kinoGameModuleTypes.actions.QUICK_PICK,
      deleteBetArea: kinoGameModuleTypes.actions.DELETE_BET_AREA,
    }),
    increaseQuickPickGameType() {
      if (this.quickPickGameType >= this.maxAllowedGameType) return;
      if (!this.quickPickGameType) {
        this.quickPickGameType = this.minAllowedGameType;
      } else {
        this.quickPickGameType++;
      }
    },
    decreaseQuickPickGameType() {
      if (!this.quickPickGameType || this.quickPickGameType === this.minAllowedGameType) return;
      this.quickPickGameType--;
    },
    quickPickGameTypeClicked(gameType) {
      this.quickPickGameType = gameType;
    },
    randomPick() {
      this.quickPickGameType =
        this.quickPickGameType || Util.getRandomInt(this.minAllowedGameType, this.maxAllowedGameType);
      this.quickPickClicked({ gameType: this.quickPickGameType });
    },
    clearActiveArea() {
      if (this.activeBetArea.isDirty()) {
        this.$eventHub.$emit(modalEventConstants.OPEN.DIALOG, dialogModalMessages.clearArea, () => {
          this.deleteBetArea({ areaIndex: this.getActiveBetslipArea });
        });
      }
    },
    clearNumbers() {
      this.clearActiveArea();
    },
    initializeActiveArea() {
      this.updateActiveBetslipArea(1);
      this.quickPickGameType = null;
    },
    changeBetAreaFromPreview(area) {
      this.updateActiveBetslipArea(area);
    },
    updateMultipliers(clickedBtn) {
      this.toggleMultiplier({ multipliers: clickedBtn });
    },
    isQuickPickGameTypeClicked(gameType) {
      return this.quickPickGameType === gameType;
    },
    isQuickPickGameTypeDisabled(gameType) {
      return this.kinoClose2WinActive && !this.close2WinGames.includes(gameType);
    },
    handleQuickPickPadClick() {
      if (this.kinoClose2WinActive && this.quickPickGameType && !this.close2WinGames.includes(this.quickPickGameType)) {
        this.quickPickGameType = this.activeBetAreaGameType;
      }
      this.showQuickPickPad = !this.showQuickPickPad;
    },
  },
  computed: {
    ...mapGetters(moduleTypes.CONFIGURATION_STORE_MODULE, {
      isClose2WinEnabled: configurationStoreModule.getters.IS_KINO_CLOSE_2_WIN_ENABLED,
    }),
    ...mapState(moduleTypes.SESSION_STORE_MODULE, {
      gameType: sessionStoreModuleTypes.state.GAME_TYPE,
    }),
    ...mapState(moduleTypes.KINO_GAME_STORE_MODULE, {
      getActiveBetslipArea: kinoGameModuleTypes.state.ACTIVE_AREA_INDEX,
    }),
    ...mapGetters(moduleTypes.KINO_GAME_STORE_MODULE, {
      activeBetArea: kinoGameModuleTypes.getters.GET_ACTIVE_BET_AREA,
    }),
    activeBetAreaGameType() {
      return this.activeBetArea?.gameType || 0;
    },
    activeAreaMultiplier() {
      return this.activeBetArea?.multiplier || 1;
    },
    kinoBonusActive: {
      get() {
        return !!this.activeBetArea.kinoBonusActive;
      },
      set(value) {
        this.setKinoBonusValue({ value });
      },
    },
    kinoClose2WinActive: {
      get() {
        return !!this.activeBetArea.kinoClose2WinActive;
      },
      set(value) {
        this.setKinoClose2WinValue({ value });
      },
    },
    gameEligibleForClose2Win() {
      return this.close2WinGames.includes(this.activeBetAreaGameType);
    },
    selectedMultipliers() {
      return this.activeBetArea?.selectedMultipliers || [];
    },
    noNumbersSelected() {
      return (this.activeBetArea?.pickedNumbers || []).length === 0;
    },
    minAllowedGameType() {
      return this.kinoClose2WinActive ? Constants.KINO_CLOSE_2_WIN_GAMES[0] : Constants.KINO_GAMES[0];
    },
    maxAllowedGameType() {
      return this.kinoClose2WinActive
        ? Constants.KINO_CLOSE_2_WIN_GAMES[Constants.KINO_CLOSE_2_WIN_GAMES.length - 1]
        : Constants.KINO_GAMES[Constants.KINO_GAMES.length - 1];
    },
  },
  watch: {
    activeBetArea() {
      this.quickPickGameType = this.activeBetArea?.quickPick ? this.activeBetArea.gameType : null;
    },
  },
  filters: {
    currency: val => {
      return val ? `${Util.formatNumber(val)}€` : '-';
    },
  },
};
</script>

<style>
.settings {
  height: 100%;
}
.theme-color-left {
  background-color: #1571a2;
}
.input_label_checked {
  opacity: 1;
}
.form_check_label {
  width: 100%;
  cursor: pointer;
  padding: 10px 0;
  margin-bottom: 0px;
}

.form_check_label__disabled {
  cursor: not-allowed;
  opacity: 0.4;
}

.border-white {
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 7.3px;
}
input[type='text'] {
  border-radius: 7.3px;
  width: 133px;
  height: 44px;
  background-color: rgba(255, 255, 255, 0.7);
  font-weight: 900;
  text-align: center;
  border: none;
  position: relative;
  cursor: pointer;
  font-size: 23px;
}
.kino-bonus input {
  width: 36px;
  height: 36px;
  margin: 6px 0px 6px 23px;
  vertical-align: middle;
  visibility: visible !important;
  position: relative;
  background-color: rgba(255, 255, 255, 0.7);
}
.kino-bonus .form-check {
  padding: 0 !important;
}
.form_check {
  padding: 0 !important;
}
.clear-button {
  width: 80px !important;
  display: inline-flex;
  text-align: center;
  vertical-align: middle !important;
}

.clear-button .clear-settings-btn {
  font-weight: 900;
  font-size: 11.36px;
  display: flex;
  flex-direction: column;
  text-align: center;
  border: none;
  background: none;
}

.input_checked {
  background-color: #f5be20;
  color: #123d52;
  width: 100%;
  height: 100%;
  transition: 0.35s ease-in-out;
}

.tooltip-inner {
  max-width: 800px;
  padding: 15px;
  text-align: justify;
}

.quick-pick {
  display: flex;
  position: relative;
  height: 70px;
}

.quick-pick-input {
  position: relative;
  width: 52%;
  padding: 10px;
}

.quick-pick-input-wrapper {
  position: absolute;
  display: flex;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.quick-pick input {
  width: 44px;
  height: 44px;
  margin: 0 5px;
  border-radius: 7.3px;
  background-color: rgba(255, 255, 255, 0.7);
  font-size: 23px;
  font-weight: 900;
  text-align: center;
  border: none;
  cursor: pointer;
}

.quick-pick input[type='number']::-webkit-inner-spin-button,
.quick-pick input[type='number']::-webkit-outer-spin-button {
  opacity: 1;
}

.quick-pick-button {
  width: 48%;
  padding: 10px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  font-size: 13.36px;
  font-weight: 900;
  text-align: center;
  background-color: #0e486a;
  border: none;
  border-left: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 0 7.3px 7.3px 0;
}

.quick-pick-arrow {
  background: none;
  border: none;
  padding: 0;
}

.quick-pick-numbers {
  display: flex;
  flex-wrap: wrap;
}

.quick-pick-numbers .number {
  flex: 1 0 21%; /* With flex-grow: 1 defined in the flex shorthand, there's no need for flex-basis to be 25%,
                      which would actually result in three items per row due to the margins.
                      Since flex-grow will consume free space on the row, flex-basis only needs to be large enough to enforce a wrap.
                      In this case, with flex-basis: 21%, there's plenty of space for the margins, but never enough space for a fifth item. */
  width: 100%;
}

.quick-pick-numbers .number__disabled {
  cursor: not-allowed;
  opacity: 0.4;
}

.quick-pick-numbers .number:nth-child(4n) {
  margin-right: 0;
}

.quick-pick .popover {
  width: 101%;
  top: -15px !important;
  left: -50px !important;
  background: radial-gradient(#9ccbdb, #8dbac9, #739aa8) !important;
}

.quick-pick .popover-body {
  padding: 12px !important;
}

.disabled-clear-settings-btn {
  opacity: 0.4;
}
.settings-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}
</style>
