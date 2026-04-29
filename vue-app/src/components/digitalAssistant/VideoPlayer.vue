<template>
  <div class="video-container">
    <video ref="video" :src="videoSource" :key="localeKey" v-bind="$attrs" controlslist="nodownload">
      <source :src="videoSource" type="video/mp4" />
    </video>
  </div>
</template>
<script>
import moduleTypes from '../../store/modules/types';
import { mapGetters } from 'vuex';
import ConfigurationStoreModuleTypes from '../../store/modules/ConfigurationStoreModule/types';
export default {
  name: 'VideoWrapper',
  props: {
    videoKey: {
      type: String,
      required: true,
    },
  },

  computed: {
    ...mapGetters(moduleTypes.CONFIGURATION_STORE_MODULE, {
      getAssetUrlGetter: ConfigurationStoreModuleTypes.getters.GET_ASSET_URL,
    }),
    locale() {
      return this.$root.$i18n.locale();
    },
    localeKey() {
      return `${this.videoSource}_${this.locale}`;
    },
    videoSource() {
      return this.getAssetUrlGetter('video', this.videoKey);
    },
  },

  watch: {
    locale: {
      handler(newLocale) {
        this.$nextTick(() => {
          if (this.$refs.video) {
            this.$refs.video.load();
            if (this.isPlaying) {
              this.$refs.video.play();
            }
          }
        });
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.video-container {
  position: fixed;
  top: 65px;
  width: 100%;
  height: calc(100vh - 65px);
  overflow: hidden;
  pointer-events: none;

  @media (max-width: 1200px) {
    height: 52%;
    border-bottom-left-radius: 50px;
    border-bottom-right-radius: 50px;
  }
}

.video-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
</style>
