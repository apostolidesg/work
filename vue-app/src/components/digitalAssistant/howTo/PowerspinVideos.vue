<template>
  <div class="powerspin-videos">
    <VideoWrapper :video-items="translatedVideoItems" :expanded.sync="isExpanded" @select="onSelect" />

    <AssetWrapper
      v-if="currentVideo"
      type="video"
      :asset-key="currentVideo.video"
      ref="assets"
      :video-props="defaultVideoProps"
    />

    <Banners v-if="$_windowWidthMixin_isPortrait" :game="currentGame" />
  </div>
</template>

<script>
import VideoWrapper from '../VideoWrapper.vue';
import AssetWrapper from '../AssetWrapper.vue';
import Constants from '../../../util/Constants';
import Banners from './Banners.vue';

export default {
  components: { 
    VideoWrapper, 
    AssetWrapper, 
    Banners
  },
  data() {
    const items = [
      {
        video: Constants.VIDEO_NAMES.HOW_TO_POWERSPIN_1,
        titleKey: 'reasonsToPlay',
        headlineKey: 'playNow',
      },
      {
        video: Constants.VIDEO_NAMES.HOW_TO_POWERSPIN_2,
        titleKey: 'howToPlay',
        headlineKey: 'playNow',
      },
    ];
    return {
      videoItems: items,
      currentVideo: items[0],
      isExpanded: false,
      defaultVideoProps: {
        autoplay: true,
        muted: true,
        loop: false,
        controllist: 'nodownload',
      },
    };
  },
  computed: {
    translatedVideoItems() {
      return this.videoItems.map((item) => ({
        ...item,
        text: this.$t(item.titleKey),
        subTitle: this.$t(item.headlineKey),
      }));
    },
    currentGame() {
      return Constants.THEMES.POWERSPIN;
    },
  },
  methods: {
    onSelect(item) {
      this.currentVideo = item;
      this.$refs.assets?.$el?.querySelector('video')?.play();
    },
  },
};
</script>

<style scoped>
.powerspin-videos {
  position: relative;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(180deg, #0e4ae1 38.13%, #051658 100%);
}
</style>
