<template>
  <div class="reset-iframe-font">
    <iframe
      v-reloadIframe="false"
      v-postMessage="postMessageConfig"
      id="mainIframe"
      class="iframe-live-draw"
      scrolling="no"
      frameborder="0"
      :src="themeUrl"
      :height="iframeHeight"
      @load="handleLoadedEvent"
    ></iframe>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import moduleTypes from '../../../../../store/modules/types';
import playerSessionTypes from '../../../../../store/modules/PlayerBetslipsSessionModule/types';
import liveDrawTypes from '../../../../../store/modules/LiveDrawModule/types';
import { faSpinner } from '@fortawesome/fontawesome-free-solid';
import { ifElse, isEmpty, not, when, cond, equals } from 'ramda/es';
import Constants from '../../../../../util/Constants';
import reloadIframe from './Directives/ReloadIframe';
import postMessage from './Directives/PostMessage';
import LoggerService from '../../../../../util/LoggerService';
import configurationModuleTypes from '../../../../../store/modules/ConfigurationStoreModule/types';

export default {
  name: 'LiveBoardIframe',
  data() {
    return {
      themeUrlFilename: '',
      iframeInitialEventReceived: false,
      postMessageConfig: {},
    };
  },
  directives: {
    reloadIframe,
    postMessage,
  },
  computed: {
    iframeHeight() {
      return window.innerWidth <= 1600 ? '722px' : '902px';
    },
    spinnerIcon() {
      return faSpinner;
    },
    ...mapGetters(moduleTypes.PLAYER_SESSION_MODULE, {
      getCurrentDrawPlayerBetSelection: playerSessionTypes.getters.GET_CURRENT_DRAW_PLAYER_SELECTED_BET_SELECTION,
      getIsCurrentDrawCompleted: playerSessionTypes.getters.GET_IS_CURRENT_DRAW_COMPLETED,
    }),
    ...mapGetters(moduleTypes.LIVE_DRAW_MODULE, {
      getOlisoftDrawId: liveDrawTypes.getters.GET_OLISOFT_DRAW_ID,
      getIsLoadingOverlayEnabled: liveDrawTypes.getters.GET_IS_LOADING_OVERLAY_ENABLED,
      getSelectedTheme: liveDrawTypes.getters.GET_SELECTED_THEME,
      getSelectedThemeType: liveDrawTypes.getters.GET_SELECTED_THEME_TYPE,
      getIsNextDrawLoadingOverlayEnabled: liveDrawTypes.getters.GET_IS_NEXT_DRAW_LOADING_OVERLAY_ENABLED,
      getIsIframeLoaded: liveDrawTypes.getters.GET_IS_IFRAME_LOADED,
      getIsKinoGameInactive: liveDrawTypes.getters.GET_IS_KINO_GAME_INACTIVE,
    }),
    ...mapGetters(moduleTypes.CONFIGURATION_STORE_MODULE, {
      getLiveDrawThemes: configurationModuleTypes.getters.GET_LIVE_DRAW_THEMES,
      getLiveDrawThemeURLDirectory: configurationModuleTypes.getters.GET_LIVE_DRAW_THEME_URL_DIRECTORY,
    }),
    getThemeId() {
      return this.getLiveDrawThemes[this.getSelectedThemeType].list[this.getSelectedTheme].id;
    },
    themeUrl() {
      return `${this.getLiveDrawThemeURLDirectory}${this.getThemeId}.html`;
    },
    getContentWindow() {
      return this.$refs.liveDrawFrame.contentWindow;
    },
    shouldSetDrawCompleted() {
      return !this.getIsCurrentDrawCompleted;
    },
    isIframeFullyLoaded() {
      return this.getIsIframeLoaded && this.iframeInitialEventReceived;
    },
    shouldDisableLoadingOverlay() {
      return this.isIframeFullyLoaded && this.getIsLoadingOverlayEnabled;
    },
  },
  watch: {
    getCurrentDrawPlayerBetSelection(newValue) {
      this.sentOrClearSlipNumbers(newValue);
    },
    themeUrl(newValue) {
      newValue && this.changeTemplate(this.getThemeId);
    },
    isIframeFullyLoaded(newValue) {
      newValue && this.sentOrClearSlipNumbers(this.getCurrentDrawPlayerBetSelection);
    },
    shouldDisableLoadingOverlay(newValue) {
      newValue && this.disableLoadingScreen();
    },
  },
  methods: {
    ...mapActions(moduleTypes.PLAYER_SESSION_MODULE, {
      addCurrentDrawWinningNumber: playerSessionTypes.actions.ADD_CURRENT_DRAW_WINNING_NUMBER,
      addCurrentDrawBonusNumber: playerSessionTypes.actions.ADD_CURRENT_DRAW_BONUS_NUMBER,
      setCurrentDrawWinningNumbers: playerSessionTypes.actions.SET_CURRENT_DRAW_WINNING_NUMBERS,
      setCurrentDrawCompletedResults: playerSessionTypes.actions.SET_CURRENT_DRAW_COMPLETED_RESULTS,
      updateCurrentDrawBoardsData: playerSessionTypes.actions.UPDATE_CURRENT_DRAW_BOARDS_DATA,
      enableCurrentDrawBegan: playerSessionTypes.actions.ENABLE_CURRENT_DRAW_BEGAN,
      updateCurrentDrawCompleted: playerSessionTypes.actions.UPDATE_CURRENT_DRAW_COMPLETED,
    }),
    ...mapActions(moduleTypes.LIVE_DRAW_MODULE, {
      updateOlisoftId: liveDrawTypes.actions.UPDATE_OLISOFT_DRAW_ID,
      disableLoadingScreen: liveDrawTypes.actions.DISABLE_LOADING_OVERLAY,
      enableLoadingScreen: liveDrawTypes.actions.ENABLE_LOADING_OVERLAY,
      toggleNextDrawLoadingOverlayDisable: liveDrawTypes.actions.TOGGLE_NEXT_DRAW_LOADING_OVERLAY_DISABLE,
      toggleIframeLoadedEnable: liveDrawTypes.actions.TOGGLE_IFRAME_LOADED_ENABLE,
      toggleIframeLoadedDisable: liveDrawTypes.actions.TOGGLE_IFRAME_LOADED_DISABLE,
      enableKinoGameInactive: liveDrawTypes.actions.ENABLE_KINO_GAME_INACTIVE,
      disableKinoGameInactive: liveDrawTypes.actions.DISABLE_KINO_GAME_INACTIVE,
    }),
    setOlisoftDrawId({ currentDrawId, newDrawId }) {
      !equals(currentDrawId, newDrawId) && this.updateOlisoftId({ olisoftDrawId: newDrawId });
    },
    isOriginValid({ origin }) {
      return Constants.ALLOWED_ORIGINS.includes(origin);
    },
    receiveMessage({ data, origin }) {
      const {
        drawId,
        drawBegan,
        kinoNumber,
        isBonus,
        drawComplete,
        drawnNumbers,
        sideBets,
        liveNumbers,
        kinoGameInactive,
      } = data;
      LoggerService.logOlisoftIframeReceivedEvent(data);
      when(
        this.isOriginValid,
        this.handleEventMessage
      )({
        drawId,
        drawBegan,
        kinoNumber,
        isBonus,
        drawComplete,
        drawnNumbers,
        sideBets,
        liveNumbers,
        kinoGameInactive,
        origin,
      });
    },
    setDrawData({ kinoNumber, isBonus = false }) {
      this.addCurrentDrawWinningNumber(kinoNumber);
      isBonus && this.addCurrentDrawBonusNumber(kinoNumber);
      // Data update is not needed on bonus number (last number) because any final calculation will be done on draw complete event
      // this way we skip one store data calculation and any unwanted problem caused from the async operation of the web worker
      !isBonus && this.updateCurrentDrawBoardsData();
    },
    setLiveNumbers({ liveNumbers }) {
      this.setCurrentDrawWinningNumbers(liveNumbers);
      this.updateCurrentDrawBoardsData();
    },
    setDrawCompleteData({ bonusNumber = 0, kinoNumbers = [], winningColumn = 0, winningParity = '' }) {
      this.updateCurrentDrawCompleted();
      this.setCurrentDrawCompletedResults({ bonusNumber, kinoNumbers, winningColumn, winningParity });
      this.updateCurrentDrawBoardsData();
    },
    setDrawCompleteDataIfNotSet({
      drawnNumbers: { bonusNumber, kinoNumbers } = {},
      sideBets: { winningColumn, winningParity } = {},
    }) {
      this.shouldSetDrawCompleted &&
        this.setDrawCompleteData({ bonusNumber, kinoNumbers, winningColumn, winningParity });
    },
    isBeganEvent({ drawBegan = false }) {
      return drawBegan;
    },
    isKinoNumberEvent({ kinoNumber = 0 }) {
      return kinoNumber > 0;
    },
    isLiveNumbersEvent({ liveNumbers = [] }) {
      return liveNumbers.length > 0;
    },
    isKinoGameInactiveEvent({ kinoGameInactive = false }) {
      return kinoGameInactive;
    },
    isDrawCompleteEvent({ drawComplete = false }) {
      return drawComplete;
    },
    shouldDisableNextDrawLoadingOverlay() {
      this.getIsNextDrawLoadingOverlayEnabled && this.toggleNextDrawLoadingOverlayDisable();
    },
    shouldEnableKinoGameInactive() {
      !this.getIsKinoGameInactive && this.enableKinoGameInactive();
    },
    shouldDisableKinoGameInactive({ kinoGameInactive }) {
      !this.isKinoGameInactiveEvent({ kinoGameInactive }) &&
        this.getIsKinoGameInactive &&
        this.disableKinoGameInactive();
    },
    eventMessageRepeatedActions() {
      this.iframeInitialEventReceivedEnable();
      this.shouldDisableNextDrawLoadingOverlay();
    },
    handleEventMessage({
      drawId,
      drawBegan,
      kinoNumber,
      isBonus,
      drawComplete,
      drawnNumbers,
      sideBets,
      liveNumbers,
      kinoGameInactive,
    }) {
      this.setOlisoftDrawId({ currentDrawId: this.getOlisoftDrawId, newDrawId: drawId });
      this.eventMessageRepeatedActions();
      this.shouldDisableKinoGameInactive({ kinoGameInactive });
      cond([
        [this.isBeganEvent, this.enableCurrentDrawBegan],
        [this.isKinoNumberEvent, this.setDrawData],
        [this.isLiveNumbersEvent, this.setLiveNumbers],
        [this.isKinoGameInactiveEvent, this.shouldEnableKinoGameInactive],
        [this.isDrawCompleteEvent, this.setDrawCompleteDataIfNotSet],
      ])({ drawBegan, kinoNumber, isBonus, drawComplete, drawnNumbers, sideBets, liveNumbers, kinoGameInactive });
    },
    hasSlipNumbers(numbers) {
      return not(isEmpty(numbers));
    },
    changeTemplate(newTemplate) {
      this.iframeStartLoading();
      LoggerService.logOlisoftIframeSentEvent({ id: 'changeTemplate', template: newTemplate });
    },
    sentSlipNumbers(numbers) {
      this.postMessageConfig = { id: 'slipNumbers', slipNumbersArray: numbers };
    },
    sentClearSlipNumbers() {
      this.postMessageConfig = { id: 'clearSlipNumbers' };
    },
    iframeInitialEventReceivedDisable() {
      this.iframeInitialEventReceived = false;
    },
    iframeInitialEventReceivedEnable() {
      this.iframeInitialEventReceived = true;
    },
    iframeInit() {
      this.toggleIframeLoadedDisable();
      this.iframeInitialEventReceivedDisable();
    },
    handleLoadedEvent() {
      this.toggleIframeLoadedEnable();
    },
    iframeStartLoading() {
      this.enableLoadingScreen();
      this.iframeInit();
    },
    sentOrClearSlipNumbers(slipNumbers) {
      ifElse(this.hasSlipNumbers, this.sentSlipNumbers, this.sentClearSlipNumbers)(slipNumbers);
    },
  },
  created() {
    window.addEventListener('message', this.receiveMessage);
    this.iframeStartLoading();
  },
  beforeDestroy() {
    window.removeEventListener('message', this.receiveMessage);
  },
};
</script>

<style scoped>
.iframe-live-draw {
  position: relative;
  width: 100%;
}
.reset-iframe-font {
  font-size: 0;
}
</style>
