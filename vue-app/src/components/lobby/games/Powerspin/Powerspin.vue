<template>
  <div id="powerspin" class="powerspin">
    <PlayAreaLayout v-if="!getIsActiveLiveDrawScreen">
      <div class="powerspin__play-area">
        <PlayArea />
      </div>
      <template #sidescreen>
        <div class="powerspin__sidescreen">
          <SideScreen />
        </div>
      </template>
    </PlayAreaLayout>
    <LiveDrawScreen v-else :iframe-types-to-render="['powerspin', 'multispin']" />
  </div>
</template>

<script>
import Constants from '../../../../util/Constants';
import { mapActions, mapGetters, mapState } from 'vuex';
import moduleTypes from '../../../../store/modules/types';
import sessionStoreModuleTypes from '../../../../store/modules/SessionStoreModule/types';
import SideScreen from './SideScreen/SideScreen';
import PlayArea from './MainScreen/PlayArea';
import modalEventConstants from '../../../../util/modalEventConstants';
import dialogModalMessages from '../../../../util/dialogModalMessages';
import playerSessionTypes from '../../../../store/modules/PlayerBetslipsSessionModule/types';
import powerspinBetslipStoreModuleTypes from '../../../../store/modules/PowerspinBetslipStoreModule/types';
import LiveDrawScreen from '../../../common/LiveDraw/LiveDrawScreen.vue';
import PlayAreaLayout from '../../../common/layouts/PlayAreaLayout.vue';

export default {
  name: 'Powerspin',
  components: { PlayAreaLayout, SideScreen, PlayArea, LiveDrawScreen },
  mounted() {
    this.setGameType({ gameType: Constants.GENERAL_GAME_TYPES.POWERSPIN });
    this.$eventHub.$on('clearBetslip', this.resetBetslips);
    this.$eventHub.$on('replayWager', this.replayWager);
  },
  beforeMount() {
    this.handleRouteParams();
  },
  beforeDestroy() {
    this.$eventHub.$off('clearBetslip');
    this.$eventHub.$off('replayWager');
  },
  beforeRouteLeave(to, from, next) {
    const {
      query: { shouldConfirm },
    } = to;

    if (this.isZeroBalance && this.existsValidBetslip && shouldConfirm !== 'false') {
      this.$eventHub.$emit(modalEventConstants.OPEN.DIALOG, dialogModalMessages.returnToLobby, () => {
        this.resetBetslips();
        next();
      });
    } else {
      if (this.isZeroBalance) {
        this.resetBetslips();
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
    ...mapState(moduleTypes.POWERSPIN_GAME_STORE_MODULE, {
      betslipArray: powerspinBetslipStoreModuleTypes.state.BETSLIP_ARRAY,
      selectedBetslipIndex: powerspinBetslipStoreModuleTypes.state.SELECTED_BETSLIP_INDEX,
    }),
    currentBetslip() {
      return this.betslipArray[this.selectedBetslipIndex];
    },
    existsValidBetslip() {
      return this.betslipArray.some(betslip => !betslip.isEmpty());
    },
  },
  methods: {
    ...mapActions(moduleTypes.SESSION_STORE_MODULE, {
      setGameType: sessionStoreModuleTypes.actions.SET_GAME_TYPE,
    }),
    ...mapActions(moduleTypes.POWERSPIN_GAME_STORE_MODULE, {
      resetBetslips: powerspinBetslipStoreModuleTypes.actions.RESET_BETSLIPS,
    }),
    ...mapActions(moduleTypes.PLAYER_SESSION_MODULE, {
      disableLiveDrawScreen: playerSessionTypes.actions.DISABLE_LIVE_DRAW_SCREEN,
    }),
    handleRouteParams() {
      const { wagerId = null, addWagerToPlayerBetslipSession = false } = this.$route?.params || {};
      if (wagerId) {
        addWagerToPlayerBetslipSession
          ? this.addWagerToPlayerBetslipSession({ wagerId })
          : this.replayWager({ wagerId });
      }
    },
    addWagerToPlayerBetslipSession({ wagerId }) {
      this.$eventHub.$emit('getWager', wagerId, true);
    },
    replayWager({ wagerId }) {
      // Disable live draw screen if enabled
      this.disableLiveDrawScreen();
      if (!this.currentBetslip.isEmpty()) {
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

<style lang="scss" scoped>
@import '../../../../scss-utils/powerspin/colors';
.powerspin {
  &__play-area {
    height: 100%;
  }

  &__sidescreen {
    height: 100%;
    background-color: $color-primary-blue;
  }
}
</style>
