<template>
  <div class="video-wrapper">
    <div class="wrapper">
      <div class="wrapper-icon" @click="goBack">
        <h2 class="go-back" data-testid="goBack-btn">
          <i class="go-back-icon material-icons chevron_left"> chevron_left </i>
          {{ $t('goBack') }}
        </h2>
      </div>
      <button v-if="!$_windowWidthMixin_isPortrait" :class="buttonClass" @click="navigateToPlayArea">
        {{ $t('tapHereToPlay') }}
      </button>
    </div>
    <div :class="['video-wrapper__sheet', { 'video-wrapper__sheet--expanded': isExpanded }]">
      <AssetWrapper
        v-if="activeItem"
        class="video-wrapper__video"
        type="video"
        :asset-key="activeItem.video"
        :video-props="effectiveVideoProps"
        ref="assetPlayer"
        @loaded="grabVideo"
      />

      <VideoControls v-if="videoEl" class="video-wrapper__controls" :video-el="videoEl"></VideoControls>

      <div class="video-wrapper__thumbs">
        <button
          v-for="(item, idx) in videoItems"
          :key="idx"
          class="video-wrapper__thumb"
          :class="[isActive(item) ? getActiveBorderClass() : 'video-wrapper__thumb-video--inactive']"
          @click="select(item, idx)"
          type="button"
        >
          <video
            class="video-wrapper__thumb-video"
            v-if="showPreview"
            :class="getBorderClass(item)"
            :src="getVideoUrl(item.video)"
            :poster="getAssetUrlGetter('images', item.thumbnail)"
            muted
            playsInline
            loop
          ></video>
          <span v-if="isActive(item)" class="video-wrapper__thumb-label">{{ item.subTitle }}</span>

          <div
            class="video-wrapper__thumb-icon"
            v-if="isActive(item) && (isExpanded || $_windowWidthMixin_isPortrait)"
          ></div>

          <span class="video-wrapper__thumb-text" :class="{ 'video-wrapper__thumb-text--inactive': !isActive(item) }">{{
            item.text
          }}</span>
        </button>
        <button class="video-wrapper__toggle" @click="isExpanded = !isExpanded">
          <i class="material-icons">
            {{ isExpanded ? 'arrow_downward' : 'arrow_upward' }}
          </i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import AssetWrapper from './AssetWrapper.vue';
import { mapGetters } from 'vuex';
import playGif from '../../assets/faq/play.gif';
import VideoControls from './VideoControls.vue';
import fonts from './fonts.css';
import moduleTypes from '../../store/modules/types';
import ConfigurationStoreModuleTypes from '../../store/modules/ConfigurationStoreModule/types';
import Constants from '../../util/Constants';
import gtag from '@/util/gtag';
import gtmEvents from '@/constants/gtmEvents';
export default {
  name: 'VideoWrapper',
  components: { AssetWrapper, VideoControls },

  props: {
    videoItems: { type: Array, required: true },
    showPreview: { type: Boolean, default: true },
    videoProps: {
      type: Object,
      default: () => ({
        autoplay: true,
        muted: true,
        loop: false,
        controllist: 'nodownload',
      }),
    },
  },
  computed: {
    ...mapGetters(moduleTypes.CONFIGURATION_STORE_MODULE, {
      getAssetUrlGetter: ConfigurationStoreModuleTypes.getters.GET_ASSET_URL,
    }),
    effectiveVideoProps() {
      return {
        ...this.videoProps,
        loop: true,
      };
    },
    currentVideoType() {
      const n = this.$route && this.$route.name;

      if (!n) return null;

      if (n === Constants.ROUTE_NAMES.KINO_VIDEOS) return Constants.ROUTE_NAMES.KINO;
      if (n === Constants.ROUTE_NAMES.POWERSPIN_VIDEOS) return Constants.ROUTE_NAMES.POWERSPIN;
      return null;
    },
    buttonClass() {
      const type = this.currentVideoType;
      return type ? `play play--${type}` : 'play';
    },
    resolvedItems() {
      return this.videoItems.map((item) => ({
        ...item,
        thumbSrc: this.getAssetUrlGetter('images', item.thumbnail),
      }));
    },
    currentLocale() {
      return this.$root.$i18n.locale();
    },
  },
  data() {
    return {
      videoEl: null,
      playGif: playGif,
      isExpanded: false,
      activeItem: this.videoItems[0] || null,
    };
  },
  async mounted() {
    this.grabVideo();
  },

  watch: {
    activeItem() {
      this.$nextTick(this.grabVideo);
    },
    videoItems: {
      immediate: true,
      handler(newList) {
        if (!newList?.length) return;
        const byKey = (i) => i.video === this.activeItem?.video;
        const found = newList.find(byKey);
        this.activeItem = found || newList[0];
        this.$nextTick(this.grabVideo);
        this.preloadThumbnails();
        if (this.activeItem) {
          this.sendInitialVideoEvent();
        }
      },
    },
    currentLocale: {
      handler() {
        this.$nextTick(() => {
          if (this.videoEl) {
            const vid = this.$refs.assetPlayer?.$el?.querySelector('video');
            this.videoEl = vid;
          }
        });
      },
    },
  },
  methods: {
    async sendInitialVideoEvent() {
      const videoType = this.currentVideoType;
      let eventName = '';
      if (videoType === Constants.ROUTE_NAMES.KINO) {
        eventName = gtmEvents.SSBT_LOTTERY_KINO_VIDEO1;
      } else if (videoType === Constants.ROUTE_NAMES.POWERSPIN) {
        eventName = gtmEvents.SSBT_LOTTERY_POWERSPIN_VIDEO1;
      }
      if (eventName) {
        gtag.sendEvent(eventName, {
          trigger: 'auto_play',
        });
      }
    },

    async select(item, index) {
      this.activeItem = item;
      await this.sendVideoPlayEvent(index, 'manual_click');
      this.$nextTick(() => {
        const vid = this.$refs.assetPlayer?.$el?.querySelector('video');
        this.videoEl = vid;
        vid?.play?.();
      });
    },

    async sendVideoPlayEvent(videoIndex, trigger = 'manual_click') {
      const videoType = this.currentVideoType;
      let eventName = '';
      if (videoType === Constants.ROUTE_NAMES.KINO) {
        eventName = videoIndex === 0 ? gtmEvents.SSBT_LOTTERY_KINO_VIDEO1 : gtmEvents.SSBT_LOTTERY_KINO_VIDEO2;
      } else if (videoType === Constants.ROUTE_NAMES.POWERSPIN) {
        eventName =
          videoIndex === 0 ? gtmEvents.SSBT_LOTTERY_POWERSPIN_VIDEO1 : gtmEvents.SSBT_LOTTERY_POWERSPIN_VIDEO2;
      }
      if (eventName) {
        gtag.sendEvent(eventName, {
          trigger: trigger,
        });
      }
    },

    isActive(item) {
      return item === this.activeItem;
    },
    getVideoUrl(assetKey) {
      return this.getAssetUrlGetter('videos', assetKey);
    },
    getActiveBorderClass() {
      return this.currentVideoType ? `video-wrapper__thumb-video--active-${this.currentVideoType}` : '';
    },
    navigateToPlayArea() {
      const type = this.currentVideoType;
      if (type === Constants.ROUTE_NAMES.KINO) {
        this.$router.push({
          name: Constants.ROUTE_NAMES.KINO,
        });
      } else if (type === Constants.ROUTE_NAMES.POWERSPIN) {
        this.$router.push({
          name: Constants.ROUTE_NAMES.POWERSPIN,
        });
      }
    },
    getBorderClass() {
      const type = this.currentVideoType;
      return type ? `video-wrapper__thumb-video--${type}` : '';
    },
    grabVideo() {
      this.$nextTick(() => {
        this.videoEl = this.$refs.assetPlayer?.$el?.querySelector('video') || null;

        if (this.videoEl) {
          this.videoEl.currentTime = 0;
          this.videoEl.play();
        }
      });
    },
    goBack() {
      this.$router.push({
        name: Constants.ROUTE_NAMES.HOWTO_LOBBY,
      });
    },
    preloadThumbnails() {
      this.videoItems.forEach((item) => {
        const key = item.thumbnail;
        const url = this.getAssetUrlGetter('images', key);
        const img = new Image();
        img.src = url;
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/scss-utils/digitalassistant/_mixins.scss';

.video-wrapper {
  height: 100vh;
  position: relative;
  overflow: hidden;
  z-index: 100;
  *:not(i) {
    font-family: Roboto Flex;
  }

  @media (max-width: 1200px) {
    height: 66%;

    background: linear-gradient(360deg, rgba(255, 255, 255, 0.41) -20.87%, rgba(22, 51, 122, 0.369) 40.56%);
    border-radius: 0px 0px 30px 30px;
  }

  &__sheet {
    position: absolute;
    bottom: 4rem;
    left: 0;
    width: 100%;
    height: 250px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: height 0.35s ease;
    z-index: 101;

    @media (max-width: 1200px) {
      height: 460px;
      bottom: 0;
    }

    &--expanded {
      height: 460px;

      .video-wrapper__thumbs {
        height: 340px;
      }
    }
  }

  &__video {
    flex: 1 1 auto;
    width: 100%;
  }

  &__thumbs {
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    transition: height 0.35s ease;
    background:
      linear-gradient(0deg, #003a78, #003a78),
      radial-gradient(95.47% 946.48% at 4.53% 50.77%, rgba(255, 255, 255, 0.41) 0%, rgba(22, 51, 122, 0.369) 100%);
    backdrop-filter: blur(7px);
    padding: 2rem;
    z-index: 9999;

    @media (max-width: 1200px) {
      height: 37%;
      border-bottom-left-radius: 50px;
      border-bottom-right-radius: 50px;
      background: none;
      backdrop-filter: none;
    }

    &::before {
      content: '';
      position: absolute;
      top: -0.25rem;
      left: -0.25rem;
      right: -0.25rem;
      bottom: -0.25rem;
      z-index: -2;
      background: radial-gradient(
        95.47% 946.48% at 4.53% 50.77%,
        rgba(255, 255, 255, 0.41) 0%,
        rgba(22, 51, 122, 0.369) 100%
      );
      backdrop-filter: blur(7px);
      @media (max-width: 1200px) {
        background: none;
        backdrop-filter: none;
        display: none;
      }
    }
  }

  &__thumb {
    flex: 1;
    max-width: 440px;
    height: 100%;
    border-radius: 0.5rem;
    background-size: cover;
    background-position: center;
    position: relative;
    cursor: pointer;
    transition: filter 0.3s ease;
    padding: 2rem;
    border: var(--gradient-powerspin-border);

    @media (max-width: 1200px) {
      margin-top: -150px;
      height: 270px;
    }

    &--active-kino {
      border: 4px solid red;
    }

    &--inactive {
      filter: brightness(50%);

      .video-wrapper__thumb-video {
        filter: brightness(50%);
      }

      .video-wrapper__thumb-text {
        opacity: 0.4;
        text-transform: none;
      }
    }

    &-label,
    &-icon,
    &-text {
      pointer-events: none;
    }

    &-label {
      position: absolute;
      top: 0.1rem;
      left: 50%;
      transform: translateX(-50%);
      font-size: 1rem;
      color: white;
      font-family: 'Roboto Flex';
    }

    &-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 1.2rem;
      height: 1.2rem;
      height: 60px;
      width: 60px;
      background-image: url('../../assets/faq/play.gif');
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
    }

    &-text {
      position: absolute;
      bottom: 0.1rem;
      left: 50%;
      transform: translateX(-50%);
      font-size: 2rem;
      color: #fff;
      width: 100%;
      font-family: 'Roboto Flex';
    }

    &-video {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
      &--inactive {
        outline: 4px solid gray;
        filter: brightness(50%);
        text-transform: none;
      }
      &--active-kino {
        &::after {
          content: '';
          position: absolute;
          inset: -6px;
          border: 6px solid transparent;
          border-radius: 20px;
          background: var(--gradient-kino-border);
          mask-composite: exclude;
          mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          mask-composite: exclude;
          z-index: 2;
        }
      }
      &--active-powerspin {
        &::after {
          content: '';
          position: absolute;
          inset: -6px;
          border: 6px solid transparent;
          border-radius: 20px;
          background: var(--gradient-powerspin-border);
          mask-composite: exclude;
          mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          mask-composite: exclude;
          z-index: 2;
        }
      }
    }

    &-overlay {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      pointer-events: none;
    }
  }

  &__toggle {
    position: absolute;
    right: 0.75rem;
    bottom: 0.75rem;
    width: 2rem;
    height: 5rem;
    top: 0;
    border: none;
    background: transparent;
    color: #fff;
    font-size: 1.3rem;
    cursor: pointer;
    z-index: 9999;

    @media (max-width: 1200px) {
      display: none;
    }
  }
}

.go-back {
  @include go-back;

  &-icon {
    margin-top: 1px;
  }
}

.wrapper {
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 999;
  &-icon {
    display: flex;
    align-items: center;
    height: 5rem;
    margin-top: 0.5rem;
    margin-left: 1.5rem;
    h2 {
      margin: 0;
    }
  }
}

.play {
  &--kino {
    position: relative;
    width: auto;
    height: auto;
    margin: 2rem;
    background: var(--button-kino-gradient);
    border: none;
    outline: none;
    overflow: visible;
    border: 4px solid #f3691e;
    border-radius: 20px;
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
    font-size: 1.85rem;
    padding: 1.5rem;

    &::before {
      content: '';
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      background: var(--kino-button-gradient);
      mix-blend-mode: screen;
      filter: blur(15px);
      z-index: 1;
      opacity: 0.8;
    }
  }

  &--powerspin {
    cursor: pointer;
    font-weight: 700;
    width: auto;
    letter-spacing: 5%;
    background: var(--button-powerspin-gradient);
    position: relative;
    width: auto;
    height: auto;
    margin: 2rem;
    outline: none;
    overflow: visible;
    border: 4px solid #f3691e;
    color: white;
    border-radius: 20px;
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
    font-size: 1.85rem;
    padding: 1.5rem;
    font-weight: 500;
  }
}
.chevron_left {
  font-size: 3.5rem;
  color: white;
}
</style>
