<template>
  <div id="fireblaze" class="fireblaze">
    <PlayAreaLayout v-if="!getIsActiveLiveDrawScreen">
      <template #settings>
        <FireblazeSettings id="fireblaze-play-area-settings" />
      </template>
      <template>
        <FireblazePlayArea id="fireblaze-play-area-main" />
      </template>
      <template #sidescreen>
        <FireblazeSidescreen id="fireblaze-play-area-submit" />
      </template>
    </PlayAreaLayout>
    <LiveDrawScreen v-else :iframe-types-to-render="['fireblaze']" />
  </div>
</template>

<script>
import PlayAreaLayout from '../../../common/layouts/PlayAreaLayout.vue';
import FireblazeSettings from './settings/FireblazeSettings.vue';
import FireblazePlayArea from './mainScreen/FireblazePlayArea.vue';
import FireblazeSidescreen from './sideScreen/FireblazeSidescreen.vue';
import Constants from '../../../../util/Constants';
import { mapActions, mapGetters } from 'vuex';
import moduleTypes from '../../../../store/modules/types';
import sessionStoreModuleTypes from '../../../../store/modules/SessionStoreModule/types';
import fireblazeStoreModuleTypes from '../../../../store/modules/FireblazeStoreModule/types';
import LiveDrawScreen from '../../../common/LiveDraw/LiveDrawScreen.vue';
import playerSessionTypes from '../../../../store/modules/PlayerBetslipsSessionModule/types';
import modalEventConstants from '../../../../util/modalEventConstants';
import dialogModalMessages from '../../../../util/dialogModalMessages';

export default {
  name: 'Fireblaze',
  components: { FireblazePlayArea, FireblazeSettings, PlayAreaLayout, FireblazeSidescreen, LiveDrawScreen },
  mounted() {
    this.setGameType({ gameType: Constants.GENERAL_GAME_TYPES.FIREBLAZE });
    this.$eventHub.$on('replayWager', this.replayWager);
    this.$eventHub.$on('clearBetslip', this.resetBetslips);
  },
  beforeMount() {
    this.handleRouteParams();
  },
  beforeDestroy() {
    this.$eventHub.$off('replayWager');
    this.$eventHub.$off('clearBetslip');
  },
  computed: {
    ...mapGetters(moduleTypes.PLAYER_SESSION_MODULE, {
      getIsActiveLiveDrawScreen: playerSessionTypes.getters.GET_IS_ACTIVE_LIVE_DRAW_SCREEN,
    }),
    ...mapGetters(moduleTypes.FIREBLAZE_GAME_STORE_MODULE, {
      isBetslipEmpty: fireblazeStoreModuleTypes.getters.GET_IS_BETSLIP_EMPTY,
    }),
  },
  methods: {
    ...mapActions(moduleTypes.SESSION_STORE_MODULE, {
      setGameType: sessionStoreModuleTypes.actions.SET_GAME_TYPE,
    }),
    ...mapActions(moduleTypes.FIREBLAZE_GAME_STORE_MODULE, {
      resetBetslips: fireblazeStoreModuleTypes.actions.RESET_BETSLIPS,
    }),
    handleRouteParams() {
      const { wagerId = null } = this.$route?.params || {};
      if (wagerId) {
        this.replayWager({ wagerId });
      }
    },
    replayWager({ wagerId }) {
      if (!this.isBetslipEmpty) {
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
