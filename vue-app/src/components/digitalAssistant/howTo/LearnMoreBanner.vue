<template>
  <div class="learn-more-banner">
    <img
      v-if="isImageLoaded"
      :key="localeKey"
      class="learn-more-banner__image"
      :src="imgSource"
      alt="kino-learn-more"
      @error="isImageLoaded = false"
    />
  </div>
</template>

<script>
import moduleTypes from '../../../store/modules/types';
import { mapGetters } from 'vuex';
import ConfigurationStoreModuleTypes from '../../../store/modules/ConfigurationStoreModule/types';

import Constants from '../../../util/Constants';

export default {
  name: 'LearnMoreBanner',
  props: {
    game: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isImageLoaded: true,
    };
  },
  computed: {
    ...mapGetters(moduleTypes.CONFIGURATION_STORE_MODULE, {
      getAssetUrlGetter: ConfigurationStoreModuleTypes.getters.GET_ASSET_URL,
      digitalAssistantConfiguration: ConfigurationStoreModuleTypes.getters.GET_CONFIGURATION,
    }),
    locale() {
      return this.$root.$i18n.locale();
    },
    localeKey() {
      return `${this.imgSource}_${this.locale}`;
    },
    imgSource() {
      const key =
        this.game === Constants.THEMES.KINO
          ? Constants.IMAGE_NAMES.KINO_BANNER_IMAGE
          : Constants.IMAGE_NAMES.POWERSPIN_BANNER_IMAGE;

      return this.getAssetUrlGetter('images', key);
    },
  },
};
</script>

<style scoped lang="scss">
.learn-more-banner {
  display: flex;
  gap: 0.25rem;
  text-align: center;
  border-radius: 1.5rem;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  &__image {
    width: 100%;
    margin-bottom: 1.5rem;
  }
}
</style>
