<template>
  <BaseSidescreen :betslip="betslip" @place-bet-success="resetKinoGame">
    <template #header>
      <div class="mona-ziga-stiles">
        <div class="col-6 p-1">
          <div class="form-check mona-ziga">
            <input
              id="mona_ziga_button"
              class="form-check-input"
              type="checkbox"
              @click="showOddEvenModal"
              :value="betslip.oddEvenGame.oddEven"
            />
            <label class="form-check-label" for="mona_ziga_button"
              ><img
                id="monazigaImg"
                :class="{ 'mona-ziga-img-shifted': oddEvenAmount > 0 }"
                width="88"
                src="../../../../../assets/mona-zyga-logo@2x.png"
                alt="odd even"
            /></label>
            <OddEven :betslip="betslip" v-show="oddEvenModalVisible" @close="closeOddEvenModal"></OddEven>
          </div>
          <div
            id="mz_ammount"
            :class="['mzs-ammount', oddEvenAmount > 0 ? 'mzs-amount-visible' : '']"
            @click="showOddEvenModal"
          >
            {{ oddEvenAmount }}&euro;
          </div>
        </div>
        <div class="col-6 p-1">
          <div class="form-check stiles">
            <input
              id="stiles_button"
              class="form-check-input"
              type="checkbox"
              @click="showColumnsModal"
              :value="betslip.columnsGame.columns"
            />
            <label class="form-check-label" for="stiles_button"
              ><img
                id="columnsImg"
                :class="{ 'columns-img-shifted': columnsAmount > 0 }"
                width="91"
                src="../../../../../assets/stiles-logo@2x.png"
                alt="columns"
            /></label>
            <Columns :betslip="betslip" v-show="columnsModalVisible" @close="closeColumnsModal"></Columns>
          </div>
          <div
            id="stiles_ammount"
            :class="['cols-ammount', columnsAmount > 0 ? 'columns-amount-visible' : '']"
            @click="showColumnsModal"
          >
            {{ columnsAmount }}&euro;
          </div>
        </div>
      </div>
    </template>
    <template>
      <div id="kino_preview" class="kino-preview-rows">
        <div
          v-for="(bet_area, index) in betslip.bet_areas"
          :key="index"
          :id="kino_preview_row + (index + 1)"
          :class="[
            'col-12',
            'p-2',
            'kino-preview',
            { 'mt-2': index !== 0 },
            { blurBetInPanel: index !== activeAreaIndex },
          ]"
        >
          <BetSelections
            :bet_area="bet_area"
            :id="index + 1"
            @delete-area="deleteArea(index)"
            @click="changeBetArea({ activeAreaIndex: index })"
          />
        </div>
        <AddBoardButton v-if="addVisible" @click="addNewGame()" theme="kino" class="mt-2">
          {{ $t('addNewGame') }}
        </AddBoardButton>
      </div>
    </template>
  </BaseSidescreen>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import configurationStoreModuleTypes from '../../../../../store/modules/ConfigurationStoreModule/types';
import kinoGameModuleTypes from '../../../../../store/modules/KinoStoreModule/types';
import playerSessionTypes from '../../../../../store/modules/PlayerBetslipsSessionModule/types';
import sessionStoreModuleTypes from '../../../../../store/modules/SessionStoreModule/types';
import moduleTypes from '../../../../../store/modules/types';
import infoModalMessages from '../../../../../util/infoModalMessages';
import modalEventConstants from '../../../../../util/modalEventConstants';
import AddBoardButton from '../../../../common/AddBoardButton.vue';
import BaseSidescreen from '../../../../common/BaseSidescreen.vue';
import ConsecutiveDraws from '../../../../common/ConsecutiveDraws';
import BetSelections from './BetSelections';
import Columns from './Columns';
import OddEven from './OddEven';

export default {
  name: 'Sidescreen',
  props: {
    kino_preview_row: { default: 'kino_preview_row' },
    isOddEvenModalVisible: { type: Boolean, default: false },
    isColumnsModalVisible: { type: Boolean, default: false },
  },
  components: {
    AddBoardButton,
    BetSelections,
    OddEven,
    Columns,
    ConsecutiveDraws,
    BaseSidescreen,
  },
  data() {
    return {
      bet_area: '0',
      showOddEvenMoney: false,
      oddEvenModalVisible: false,
      columnsModalVisible: false,
    };
  },

  beforeMount() {
    this.oddEvenModalVisible = this.isOddEvenModalVisible;
    this.columnsModalVisible = this.isColumnsModalVisible;
  },
  methods: {
    ...mapActions(moduleTypes.PLAYER_SESSION_MODULE, {
      addPlayerBetslip: playerSessionTypes.actions.ADD_PLAYER_BETSLIP,
    }),
    ...mapActions(moduleTypes.KINO_GAME_STORE_MODULE, {
      addBetArea: kinoGameModuleTypes.actions.ADD_BET_AREA,
      deleteBetArea: kinoGameModuleTypes.actions.DELETE_BET_AREA,
      changeBetArea: kinoGameModuleTypes.actions.CHANGE_ACTIVE_BET_AREA,
    }),
    showOddEvenModal() {
      this.oddEvenModalVisible = true;
    },
    closeOddEvenModal() {
      this.oddEvenModalVisible = false;
    },
    showColumnsModal() {
      this.columnsModalVisible = true;
    },
    closeColumnsModal() {
      this.columnsModalVisible = false;
    },
    resetKinoGame() {
      this.bet_area = '0';
      this.showOddEvenMoney = false;
      this.oddEvenModalVisible = false;
      this.columnsModalVisible = false;
    },
    addNewGame() {
      let newArea;
      if (this.allAreasFilled) {
        newArea = this.betslip.bet_areas.length + 1;
        if (newArea <= 6) {
          this.addBetArea();
        }
      }
    },
    deleteArea(areaIndex) {
      this.deleteBetArea({ areaIndex });
    },
  },
  computed: {
    ...mapGetters(moduleTypes.SESSION_STORE_MODULE, {
      getAccessToken: sessionStoreModuleTypes.getters.GET_ACCESS_TOKEN,
      activeSession: sessionStoreModuleTypes.getters.GET_ACTIVE_SESSION,
    }),
    ...mapGetters(moduleTypes.CONFIGURATION_STORE_MODULE, {
      getConfiguration: configurationStoreModuleTypes.getters.GET_CONFIGURATION,
    }),
    ...mapState(moduleTypes.KINO_GAME_STORE_MODULE, {
      betslip: kinoGameModuleTypes.state.BETSLIP,
      activeAreaIndex: kinoGameModuleTypes.state.ACTIVE_AREA_INDEX,
    }),
    oddEvenAmount() {
      return this.betslip.oddEvenGame.calculateValue();
    },
    columnsAmount() {
      return this.betslip.columnsGame.calculateValue();
    },
    addVisible() {
      return this.betslip.bet_areas.length < 6;
    },
    allAreasFilled() {
      return !this.betslip.bet_areas.find((area) => {
        if (!area.filled && area.pickedNumbers.length > 0)
          this.$eventHub.$emit(modalEventConstants.OPEN.INFO, infoModalMessages.invalidPicks);
        return !area.filled;
      });
    },
  },
};
</script>

<style scoped>
.kino-preview {
  background: rgb(41, 131, 183);
  border-radius: 10px;
}

.add-row-button img {
  margin-right: 40px;
}
.add-row-button span {
  vertical-align: middle;
}

.mzs-ammount {
  background-color: #28ee00;
  color: #123d52;
  width: 66px;
  position: absolute;
  right: 4px;
  top: 5px;
  font-weight: 900;
  text-align: center;
  height: 70px;
  font-size: 21px;
  padding: 19px 0;
  display: none;
}

.mzs-amount-visible,
.columns-amount-visible {
  display: block;
}

.mona-ziga,
.stiles {
  height: 72px;
  background-color: rgb(41, 131, 183);
  padding: 0;
  background-image: url(../../../../../assets/glow-small.png);
  background-size: 92px;
  background-position: 90px -4px;
  background-repeat: no-repeat;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.7);
  cursor: pointer;
}

.mona-ziga-stiles {
  padding: 0 20px;
  display: flex;
}

.mona-ziga-img-shifted {
  margin: 15px 76px 15px 5px;
  width: 70px;
}

.columns-img-shifted {
  margin-right: 87px;
  margin-left: 11px;
  margin-top: 20px;
  width: 70px;
}

.mona-ziga .form-check-label,
.stiles .form-check-label {
  padding: 3px 0;
  height: 70px;
}

.blurBetInPanel {
  background: rgba(20, 73, 97, 0.3);
}
</style>
