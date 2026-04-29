<template>
  <div class="main-faq digital-assistant-font">
    <DigitalAssistantLayout
      :asset-key="videoNames.FAQ_LOBBY"
      class="main-faq__layout"
      :show-go-back="true"
      :go-back-route="routeNames.HELP_SECTION"
    >
      <div class="main-faq__sections">
        <div
          class="main-faq__sections"
          v-for="(section, index) in faqSections"
          :key="section.id"
          :class="[section.id, { 'main-faq__sections--right': index % 2 !== 0 }]"
        >
          <div
            class="main-faq__game-container"
            :class="`${section.id}__container`"
            @click="navigateToFaq(section.route)"
          >
            <img
              :class="`${section.id}__image`"
              v-if="section.id && section.id !== routeNames.HELP"
              :data-testid="`faq-image-${section.id}`"
              :src="getImageSource(section.id)"
              :alt="section.name"
            />
            <p :class="`${section.id}__text`" v-if="section.translations" :data-testid="`faq-text-${section.id}`">
              {{ getTranslation(section.translations) }}
            </p>
          </div>
        </div>
      </div>
    </DigitalAssistantLayout>
  </div>
</template>

<script>
import DigitalAssistantLayout from '../DigitalAssistantLayout.vue';
import { mapActions, mapGetters } from 'vuex';
import types from '@/store/modules/ConfigurationStoreModule/types';
import moduleTypes from '@/store/modules/types';
import VideoTypes from '@/store/modules/VideoStoreModule/types';
import TranslationMixin from '@/mixins/TranslationMixin';
import gtmEvents from '@/constants/gtmEvents';
import gtag from '@/util/gtag';
import Constants from '@/util/Constants';

export default {
  name: 'MainFaq',
  components: {
    DigitalAssistantLayout,
  },
  mixins: [TranslationMixin],

  computed: {
    ...mapGetters(moduleTypes.CONFIGURATION_STORE_MODULE, {
      faqSections: types.getters.GET_MAIN_FAQ_SECTIONS,
    }),
    currentLanguage() {
      return this.$root.$i18n.locale;
    },
  },
  created() {
    this.videoNames = Constants.VIDEO_NAMES;
    this.routeNames = Constants.ROUTE_NAMES;
    this.initializeFaqData();
  },
  methods: {
    ...mapActions(moduleTypes.CONFIGURATION_STORE_MODULE, [types.actions.INITIALIZE_FAQ_DATA]),
    ...mapActions(moduleTypes.VIDEO_STORE_MODULE, {
      [VideoTypes.actions.PLAY_VIDEO]: VideoTypes.actions.PLAY_VIDEO,
    }),
    async initializeFaqData() {
      try {
        await this[types.actions.INITIALIZE_FAQ_DATA]();
      } catch (error) {
        console.error('Failed to initialize FAQ data:', error);
      }
    },
    navigateToFaq(route) {
      this.trackFaqNavigation(route);
      this.$router.push({ name: route });
    },
    trackFaqNavigation(route) {
      let eventName;
      switch (route) {
        case Constants.ROUTE_NAMES.KINO_FAQ:
          eventName = gtmEvents.SSBT_LOTTERY_ASK_ME_KINO;
          break;
        case Constants.ROUTE_NAMES.POWERSPIN_FAQ:
          eventName = gtmEvents.SSBT_LOTTERY_ASK_ME_POWERSPIN;
          break;
        default:
          eventName = gtmEvents.SSBT_LOTTERY_ASK_ME_OTHER;
      }
      gtag.sendEvent(eventName);
    },
    getImageSource(imagePath) {
      try {
        return require(`@/assets/digital-assistant/${imagePath}-icon.png`) || null;
      } catch (error) {
        return null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../scss-utils/digitalassistant/mixins';

.main-faq {
  display: grid;
  grid-template-columns: (18, 1fr);
  position: relative;

  &__layout {
    width: 100%;
    height: 100vh;
  }

  &__sections {
    position: relative;
    z-index: 2;
    grid-column: 4;
    margin-right: 15%;
    display: grid;
    margin-top: 5%;
  }

  @media (max-width: 1200px) {
    &__sections {
      margin-right: 0;
      display: flex;
      margin-top: 0;
      gap: 10px;
      flex-direction: column;
      align-items: center;
      justify-items: center;
    }
  }
}

$container-styles: (
  kino: (
    background: var(--button-kino-gradient),
    width: 500px,
    height: 150px,
  ),
  powerspin: (
    background: var(--button-powerspin-gradient),
    width: 500px,
    height: 150px,
  ),
  help: (
    background: var(--gradient-secondary),
    width: 500px,
    height: 150px,
  ),
);

@mixin common-container {
  display: flex;
  backdrop-filter: blur(7px);
  z-index: 9;
  border-radius: 43px;
  border: 4px solid #f3691e;
  margin: 40px 0 50px 91px;
  cursor: pointer;
  color: white;
  align-items: center;
}

@mixin image-styles {
  height: auto;
  width: 80px;
  margin: 35px 41px 41px 41px;
}

@mixin text-styles {
  text-align: center;
  padding-top: 25px;
  padding-right: 35px;
  line-height: 125%;
  font-size: 35px;
  font-weight: 700;
}

@each $name, $styles in $container-styles {
  .#{$name}__container {
    @include common-container;
    height: map-get($styles, height);
    width: map-get($styles, width);
    background: map-get($styles, background);
    z-index: 3;
    position: relative;
    display: flex;
    align-items: center;

    @if $name == 'powerspin' {
      position: relative;
      right: 100px;
    }

    @if $name == 'help' {
      &::before {
        content: '';
        position: absolute;
        inset: -0.25rem;
        background: var(--gradient-primary);
        mask:
          linear-gradient(#fff 0 0) content-box,
          linear-gradient(#fff 0 0);
        mask-composite: exclude;
        padding: 0.3125rem;
        border-radius: inherit;
        z-index: -1;
      }
    }

    .#{$name}__image {
      @include image-styles;
      position: relative;
      margin-left: 41px;
    }
    &:not(:has(img)) {
      justify-content: center;
    }
    .#{$name}__text {
      @include text-styles;
      position: relative;
      margin: 0;
      padding: 0;
      @if $name == 'kino' {
        color: black;
      }
    }
  }
}

@media (max-width: 1200px) {
  .main-faq {
    &__sections {
      position: relative;
      z-index: 2;
      grid-column: 4;
      margin-right: 15%;
      display: grid;
      margin-top: 5%;
    }
  }
}

@media (max-width: 1920px) {
  .main {
    margin-top: 80px;
  }
}

@media (min-width: 1600px) {
  .main {
    margin-top: 0px;
  }
  .main-faq {
    &__sections {
      position: relative;
      z-index: 2;
      grid-column: 4;
      margin-right: 0%;
      display: grid;
      margin-top: 2.5%;
    }
  }
}

@media (max-width: 1200px) {
  .main-faq {
    &__sections {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      align-items: start;
      justify-items: center;
      gap: 20px;
      width: 100%;
      padding: 0 40px;

      &--right {
        align-items: end;
      }
    }

    &__game-container {
      margin: 0;
      width: 100%;
      max-width: 670px;
      right: 0;
    }
  }
}
</style>
