<template>
  <div id="kino" class="kino">
    <PlayAreaLayout v-if="!getIsActiveLiveDrawScreen">
      <template #settings>
        <div id="settings_component" class="theme-color-left h-100">
          <Settings />
        </div>
      </template>
      <div id="numbers_component" class="bg-kino-blue h-100">
        <Numbers ref="Numbers"></Numbers>
      </div>
      <template #sidescreen>
        <div class="theme-color-right h-100">
          <SideScreen :isOddEvenModalVisible="isOddEvenModalVisible" :isColumnsModalVisible="isColumnsModalVisible" />
        </div>
      </template>
    </PlayAreaLayout>
    <LiveDrawScreen v-else />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import playerSessionTypes from '../../../../store/modules/PlayerBetslipsSessionModule/types';
import moduleTypes from '../../../../store/modules/types';
import LiveDrawScreen from './LiveDraw/LiveDrawScreen';
import dialogModalMessages from '../../../../util/dialogModalMessages';
import ifElse from 'ramda/es/ifElse';
import modalEventConstants from '../../../../util/modalEventConstants';
import sessionStoreModuleTypes from '../../../../store/modules/SessionStoreModule/types';
import Constants from '../../../../util/Constants';
import kinoGameModuleTypes from '../../../../store/modules/KinoStoreModule/types';
import SideScreen from './sidescreen/Sidescreen.vue';
import PlayAreaLayout from '../../../common/layouts/PlayAreaLayout.vue';
import Settings from './settings/Settings.vue';
import Numbers from './mainscreen/numbers.vue';
export default {
  name: 'KinoGame',
  components: {
    PlayAreaLayout,
    LiveDrawScreen,
    SideScreen,
    Settings,
    Numbers,
  },
  data() {
    return {
      isOddEvenModalVisible: false,
      isColumnsModalVisible: false,
      terminalId: null,
    };
  },
  created() {
    this.$eventHub.$on('wagerUpdated', this.updateBetslip);
  },
  beforeMount() {
    this.handleRouteParams();
  },
  mounted() {
    this.$eventHub.$on('clearBetslip', this.clearBetslip);
    this.$eventHub.$on('replayWager', this.replayWager);
    this.setGameType({ gameType: Constants.GENERAL_GAME_TYPES.KINO });
  },
  beforeDestroy() {
    this.$eventHub.$off('clearBetslip');
    this.$eventHub.$off('wagerUpdated');
    this.$eventHub.$off('replayWager');
  },
  beforeRouteLeave(to, from, next) {
    const {
      query: { shouldConfirm },
    } = to;

    if (this.isZeroBalance && this.betslip.isFilled() && shouldConfirm !== 'false') {
      this.$eventHub.$emit(modalEventConstants.OPEN.DIALOG, dialogModalMessages.returnToLobby, () => {
        this.clearBetslip();
        next();
      });
    } else {
      if (this.isZeroBalance) {
        this.clearBetslip();
      }
      next();
    }
  },
  computed: {
    ...mapGetters(moduleTypes.PLAYER_SESSION_MODULE, {
      getIsActiveLiveDrawScreen: playerSessionTypes.getters.GET_IS_ACTIVE_LIVE_DRAW_SCREEN,
    }),
    ...mapGetters(moduleTypes.SESSION_STORE_MODULE, {
      isZeroBalance: sessionStoreModuleTypes.getters.GET_IS_ZERO_BALANCE,
    }),
    ...mapState(moduleTypes.KINO_GAME_STORE_MODULE, {
      betslip: kinoGameModuleTypes.state.BETSLIP,
      getActiveBetslipArea: kinoGameModuleTypes.state.ACTIVE_AREA_INDEX,
    }),
    shouldResetSidebetModals() {
      return this.isOddEvenModalVisible || this.isColumnsModalVisible;
    },
  },
  watch: {
    getIsActiveLiveDrawScreen(newValue) {
      newValue && this.shouldResetSidebetModals && this.resetSidebetModals();
    },
  },
  methods: {
    ...mapActions(moduleTypes.PLAYER_SESSION_MODULE, {
      disableLiveDrawScreen: playerSessionTypes.actions.DISABLE_LIVE_DRAW_SCREEN,
    }),
    ...mapActions(moduleTypes.SESSION_STORE_MODULE, {
      setGameType: sessionStoreModuleTypes.actions.SET_GAME_TYPE,
    }),
    ...mapActions(moduleTypes.KINO_GAME_STORE_MODULE, {
      clearBetslip: kinoGameModuleTypes.actions.CLEAR_BETSLIP,
      setBetslip: kinoGameModuleTypes.actions.SET_BETSLIP,
    }),
    handleRouteParams() {
      const {
        isOddEvenModalVisible = false,
        isColumnsModalVisible = false,
        wagerId = '',
        addWagerToPlayerBetslipSession = false,
      } = this.$route.params || {};
      this.setSideBetsModals({ isOddEvenModalVisible, isColumnsModalVisible });
      this.handleRouterWagerId({ addWagerToPlayerBetslipSession, wagerId });
    },
    setSideBetsModals({ isOddEvenModalVisible, isColumnsModalVisible }) {
      this.isOddEvenModalVisible = isOddEvenModalVisible;
      this.isColumnsModalVisible = isColumnsModalVisible;
    },
    handleRouterWagerId({ addWagerToPlayerBetslipSession, wagerId }) {
      wagerId &&
        ifElse(
          this.shouldAddWagerToPlayerBetslipSession,
          this.addWagerToPlayerBetslipSession,
          this.replayWager
        )({ addWagerToPlayerBetslipSession, wagerId });
    },
    shouldAddWagerToPlayerBetslipSession({ addWagerToPlayerBetslipSession }) {
      return addWagerToPlayerBetslipSession;
    },
    addWagerToPlayerBetslipSession({ wagerId }) {
      this.$eventHub.$emit('getWager', wagerId, true);
    },
    resetSidebetModals() {
      this.isOddEvenModalVisible = false;
      this.isColumnsModalVisible = false;
    },
    updateBetslip(wager) {
      this.setBetslip({ betslip: wager });
    },
    replayWager({ wagerId }) {
      // Disable live draw screen if enabled
      this.disableLiveDrawScreen();
      if (this.betslip.isFilled()) {
        this.$eventHub.$emit(modalEventConstants.OPEN.DIALOG, dialogModalMessages.replayWager, () => {
          this.$eventHub.$emit('getWager', wagerId);
        });
      } else {
        this.$eventHub.$emit('getWager', wagerId);
      }
    },
  },
};
</script>

<style>
/*TODO NOW*/
@import 'kino.css';

.bg-kino-live-draw {
  border: 5px solid #f5be20;
  border-top: 0;
  background: #0c1922;
}
</style>
