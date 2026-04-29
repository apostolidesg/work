<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import playerSessionTypes from '../../../../../store/modules/PlayerBetslipsSessionModule/types';
import moduleTypes from '../../../../../store/modules/types';
import eventHubTypes from '../../../../../util/EventHubTypes';
import configurationModuleTypes from '../../../../../store/modules/ConfigurationStoreModule/types';
import kinoPreviewImage from '../../../../../assets/classic-theme-thumb.png';
import powerspinPreviewImage from '../../../../../assets/powerspin-livedraw-preview.png';
import sessionStoreModuleTypes from '../../../../../store/modules/SessionStoreModule/types';
import languageModuleTypes from '../../../../../store/modules/LanguageStoreModule/types';
import Constants from '../../../../../util/Constants';

const GAMETYPE_INFO = {
  KINO: { image: kinoPreviewImage, message: 'kinoLiveDrawInfoModalMessage' },
  POWERSPIN: { image: powerspinPreviewImage, message: 'powerspinLiveDrawInfoModalMessage' },
};

export default {
  name: 'live-draw-dialog',
  data() {
    return {
      dialog: null,
      autoDialogClose: false,
    };
  },
  computed: {
    ...mapGetters(moduleTypes.PLAYER_SESSION_MODULE, {
      getIsActiveLiveDrawScreen: playerSessionTypes.getters.GET_IS_ACTIVE_LIVE_DRAW_SCREEN,
      getShouldTriggerRedirectDialog: playerSessionTypes.getters.GET_SHOULD_TRIGGER_REDIRECT_DIALOG,
    }),
    ...mapGetters(moduleTypes.CONFIGURATION_STORE_MODULE, {
      getConfiguration: configurationModuleTypes.getters.GET_CONFIGURATION,
    }),
    ...mapGetters(moduleTypes.LANGUAGE_STORE_MODULE, {
      getLanguage: languageModuleTypes.getters.GET_LANGUAGE,
    }),
    ...mapState(moduleTypes.SESSION_STORE_MODULE, {
      gameType: sessionStoreModuleTypes.state.GAME_TYPE,
    }),
    liveDrawDialogTimeout() {
      return this.getConfiguration.KINO.LIVE_DRAW.DIALOG_TIMEOUT;
    },
    isLiveDrawConfigEnabled() {
      return this.getConfiguration.KINO.LIVE_DRAW.ENABLED;
    },
    getLiveDrawInfoModalMessage() {
      return this.getLanguage === Constants.DEFAULT_LOCALE
        ? 'showLiveDrawInfoModalMessage'
        : GAMETYPE_INFO[this.gameType].message;
    },
  },
  watch: {
    getIsActiveLiveDrawScreen(newValue) {
      newValue && this.dialog && this.dialogReject(this.dialog.id);
    },
  },
  mounted() {
    this.$eventHub.$on(eventHubTypes.COUNT_DOWN_END, this.checkIfLiveDrawDialogShouldTrigger);
  },
  methods: {
    ...mapActions(moduleTypes.PLAYER_SESSION_MODULE, {
      enableLiveDrawScreen: playerSessionTypes.actions.ENABLE_LIVE_DRAW_SCREEN,
    }),
    checkIfLiveDrawDialogShouldTrigger() {
      this.isLiveDrawConfigEnabled && this.getShouldTriggerRedirectDialog() && this.openDialog();
    },
    enableAutoClose() {
      this.autoDialogClose = true;
    },
    disableAutoClose() {
      this.autoDialogClose = false;
    },
    openDialog() {
      this.enableAutoClose();
      this.dialog = this.$snotify
        .html(
          `
        <div class="live-draw-dialog__container">
          <div class="live-draw-dialog__image-block"><img class="live-draw-dialog__image" src="${
            GAMETYPE_INFO[this.gameType].image
          }"/></div>
          <div class="live-draw-dialog__text">${this.$t(this.getLiveDrawInfoModalMessage)}</div>
        </div>
      `,
          {
            timeout: this.liveDrawDialogTimeout,
            type: 'simple',
            showProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            position: 'centerBottom',
            buttons: [
              {
                text: this.$t('notNowActionButton'),
                action: this.dialogReject,
                className: 'live-draw-dialog__reject-button',
              },
              {
                text: this.$t('goToLiveDrawButton'),
                action: this.dialogAccept,
                className: 'live-draw-dialog__accept-button',
              },
            ],
          }
        )
        .on('beforeHide', this.dialogDestroyEventHandler);
    },
    dialogDestroyEventHandler() {
      this.autoDialogClose && this.enableLiveDrawScreen();
    },
    closeDialog(id) {
      this.disableAutoClose();
      this.$snotify.remove(id);
    },
    dialogReject({ id }) {
      this.closeDialog(id);
    },
    dialogAccept({ id }) {
      this.closeDialog(id);
      this.enableLiveDrawScreen();
    },
  },
  render() {
    return this.$scopedSlots.default && this.$scopedSlots.default();
  },
  beforeDestroy() {
    this.dialog = null;
    this.$eventHub.$off(eventHubTypes.COUNT_DOWN_END);
  },
};
</script>
