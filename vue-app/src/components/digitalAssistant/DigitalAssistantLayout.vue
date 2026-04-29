<template>
  <div class="digital-assistant-layout">
    <h2 v-if="showGoBack" @click="handleGoBack" class="digital-assistant-layout__back-button" data-testid="goBack-btn">
      <i class="material-icons"> chevron_left </i>
      {{ $t('goBack') }}
    </h2>

    <div class="digital-assistant-layout__container">
      <div class="digital-assistant-layout__left-zone">
        <div
          v-if="!$_windowWidthMixin_isPortrait"
          class="digital-assistant-layout__left-clickable"
          @click.stop="$emit('video-click')"
        ></div>
      </div>
      <div class="digital-assistant-layout__asset-wrapper-container" @click.stop="$emit('video-click')">
        <AssetWrapper
          type="video"
          :asset-key="assetKey"
          ref="assets"
          @click="$emit('video-click')"
          class="digital-assistant-layout__asset-wrapper"
          v-if="showAssetWrapper"
          :videoProps="{
            autoplay: true,
            muted: true,
            loop: true,
          }"
        />
      </div>

      <div class="digital-assistant-layout__body">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import AssetWrapper from './AssetWrapper.vue';

export default {
  name: 'DigitalAssistantLayout',
  components: {
    AssetWrapper,
  },
  props: {
    assetKey: {
      type: String,
      required: true,
    },
    showAssetWrapper: {
      type: Boolean,
      default: true,
    },
    showGoBack: {
      type: Boolean,
      default: false,
    },
    goBackRoute: {
      type: String,
      default: null,
    },
  },
  methods: {
    handleGoBack() {
      if (this.goBackRoute) {
        this.$router.push({ name: this.goBackRoute });
      } else {
        this.$emit('go-back');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/scss-utils/digitalassistant/_mixins.scss';

.digital-assistant-layout {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
  background: linear-gradient(180deg, #0e4ae1 38.13%, #051658 100%);
  z-index: 10;

  * {
    font-family: 'Roboto Flex';
  }

  &__back-button {
    @include go-back;
  }

  &__container {
    position: relative;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 1fr;
    z-index: 10;

    @media (max-width: 1200px) {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
  }

  &__asset-wrapper {
    @media (max-width: 1200px) {
      display: block;
      flex: 1;
      height: 100%;
      position: relative;
    }
  }

  &__asset-wrapper-container {
    @media (max-width: 1200px) {
      display: block;
      height: 53.1%;
    }
  }

  &__body {
    position: absolute;
    width: 100%;
    @media (max-width: 1200px) {
      position: relative;
      flex: 1;
      height: 100%;
      overflow: hidden;
    }
  }

  &__left-clickable {
    position: absolute;
    top: 0;
    left: 0;
    width: 40%;
    height: 100%;
    cursor: pointer;
    z-index: 5;
    pointer-events: auto;
  }

  &__left-zone {
    @media (max-width: 1200px) {
      display: none;
    }
  }
}
</style>
