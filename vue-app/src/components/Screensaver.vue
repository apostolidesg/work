<template>
  <div class="screen-saver">
    <video
      v-if="screenSaverEnabled"
      ref="video"
      class="screen-saver__video"
      :src="videoUrl"
      autoplay
      muted
      loop
      playsinline
    ></video>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import languageStoreModuleTypes from '../store/modules/LanguageStoreModule/types';
import moduleTypes from '../store/modules/types';
import ConfigurationStoreModule from '../store/modules/ConfigurationStoreModule/types';
import sessionStoreModuleTypes from '../store/modules/SessionStoreModule/types';
import gtag from '@/util/gtag';
import gtmEvents from '@/constants/gtmEvents';
import Constants from '../util/Constants';

export default {
  name: 'Screensaver',
  computed: {
    ...mapGetters(moduleTypes.CONFIGURATION_STORE_MODULE, {
      digitalAssistantEnabled: ConfigurationStoreModule.getters.IS_DIGITAL_ASSISTANT_ENABLED,
      isScreenSaverEnabled: ConfigurationStoreModule.getters.IS_SCREEN_SAVER_ENABLED,
      getAssetUrlGetter: ConfigurationStoreModule.getters.GET_ASSET_URL,
    }),
    ...mapGetters(moduleTypes.LANGUAGE_STORE_MODULE, {
      getLanguage: languageStoreModuleTypes.getters.GET_LANGUAGE,
    }),
    videoUrl() {
      return this.getAssetUrlGetter('video', Constants.VIDEO_NAMES.SCREENSAVER);
    },
    screenSaverEnabled() {
      return this.isScreenSaverEnabled && this.digitalAssistantEnabled;
    },
  },
  methods: {
    ...mapActions(moduleTypes.SESSION_STORE_MODULE, {
      toggleBalanceVisibility: sessionStoreModuleTypes.actions.TOGGLE_BALANCE_VISIBILITY,
    }),
  },
  mounted() {
    gtag.sendEvent(gtmEvents.SSBT_LOTTERY_SCREENSAVER);
    this.toggleBalanceVisibility({ isVisible: true });
  },
};
</script>

<style scoped lang="scss">
.screen-saver {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  z-index: 999;
  overflow: hidden;

  &__video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
