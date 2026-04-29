<template>
  <div class="asset-container">
    <video-player
      v-if="type === 'video'"
      :video-key="assetKey"
      v-bind="videoProps"
      @load="onAssetLoaded"
      @error="onAssetLoaded"
      ref="videoPlayer"
    ></video-player>
    <img
      v-else-if="type === 'image'"
      :src="assetSource"
      v-bind="imageProps"
      @load="onAssetLoaded"
      @error="onAssetLoaded"
    />
  </div>
</template>

<script>
import VideoPlayer from './VideoPlayer.vue';
import moduleTypes from '../../store/modules/types';
import { mapGetters } from 'vuex';
import ConfigurationStoreModuleTypes from '../../store/modules/ConfigurationStoreModule/types';
export default {
  components: { VideoPlayer },
  name: 'AssetWrapper',
  props: {
    type: {
      type: String,
      validator: (value) => ['video', 'image'].includes(value),
    },
    assetKey: {
      type: String,
      required: true,
    },
    videoProps: {
      type: Object,
      default: () => ({
        autoplay: true,
        muted: true,
        loop: false,
        controllist: 'nodownload',
      }),
    },
    imageProps: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapGetters(moduleTypes.CONFIGURATION_STORE_MODULE, {
      getAssetUrlGetter: ConfigurationStoreModuleTypes.getters.GET_ASSET_URL,
    }),
    assetSource() {
      return this.getAssetUrlGetter(this.type + 's', this.assetKey);
    },
  },
  methods: {
    onAssetLoaded() {
      this.$emit('loaded');
    },
    onAssetError(error) {
      this.$emit('error', error);
    },
  },
};
</script>

<style lang="scss" scoped>
.digital-assistant-layout__asset-wrapper {
  @media (max-width: 1200px) {
    .video-container {
      width: 100%;
      height: 100%;
      position: relative;
      top: 0;
      overflow: hidden;
      z-index: 99;
      border-bottom-left-radius: 50px;
      border-bottom-right-radius: 50px;
    }
  }
}
</style>
