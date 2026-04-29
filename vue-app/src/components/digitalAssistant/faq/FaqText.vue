<template>
  <div class="faq-text digital-assistant-font">
    <DigitalAssistantLayout
      :asset-key="dynamicAssetKey"
      class="faq-text__layout"
      ref="layout"
      :show-go-back="true"
      :go-back-route="backRoute"
    >
      <div class="faq-text__content-box">
        <div class="faq-text__content">
          <div class="faq-text__headline">
            <h2 class="faq-text__title">{{ getTranslation(boxTitle) }}</h2>
            <span @click="handleClose" class="faq-text__close">
              <i class="faq-text__close-icon material-icons"> close </i>
            </span>
          </div>
          <p class="faq-text__description" v-html="getTranslation(boxContent)"></p>
          <div class="faq-text__cta-container" v-if="!$_windowWidthMixin_isPortrait">
            <FaqCTAButton :theme="currentTheme" :route="dynamicRoute">{{ $t('clickToPlay') }}</FaqCTAButton>
          </div>
        </div>
      </div>
    </DigitalAssistantLayout>
  </div>
</template>

<script>
import DigitalAssistantLayout from '../DigitalAssistantLayout.vue';
import { DEFAULT_FAQ_BOXES } from '@/config/defaultContent';
import { DIGITAL_ASSISTANT_MAIN } from '@/constants/digitalAssistantRoutes';
import FaqCTAButton from './FaqCTAButton.vue';
import { mapActions } from 'vuex';
import moduleTypes from '@/store/modules/types';
import types from '@/store/modules/ConfigurationStoreModule/types';
import Constants from '@/util/Constants';
import VideoTypes from '@/store/modules/VideoStoreModule/types';
import TranslationMixin from '@/mixins/TranslationMixin';

export default {
  name: 'FaqText',
  data() {
    return {
      videoSource: '',
      boxContent: '',
      boxTitle: '',
      defaultContent: DEFAULT_FAQ_BOXES,
    };
  },
  mixins: [TranslationMixin],

  components: {
    DigitalAssistantLayout,
    FaqCTAButton,
  },
  created() {
    this.loadFaqDetail();
  },
  computed: {
    currentTheme() {
      const type = this.$route.params.type;
      const themeMap = {
        [Constants.ROUTE_NAMES.KINO]: DIGITAL_ASSISTANT_MAIN.KINO,
        [Constants.ROUTE_NAMES.POWERSPIN]: DIGITAL_ASSISTANT_MAIN.POWERSPIN,
        [Constants.ROUTE_NAMES.HELP]: DIGITAL_ASSISTANT_MAIN.HELP,
      };
      const matchedKey = Object.keys(themeMap).find((key) => type?.includes(key));
      return matchedKey ? themeMap[matchedKey] : 'default';
    },
    backRoute() {
      const type = this.$route.params.type;
      const routeMap = {
        [Constants.ROUTE_NAMES.KINO]: Constants.ROUTE_NAMES.KINO_FAQ,
        [Constants.ROUTE_NAMES.POWERSPIN]: Constants.ROUTE_NAMES.POWERSPIN_FAQ,
        [Constants.ROUTE_NAMES.HELP]: Constants.ROUTE_NAMES.HELP_FAQ,
      };
      const matchedKey = Object.keys(routeMap).find((key) => type?.includes(key));
      return matchedKey ? routeMap[matchedKey] : Constants.ROUTE_NAMES.KINO_FAQ;
    },
    dynamicRoute() {
      const path = this.$route.path;
      const themeMap = {
        [Constants.ROUTE_NAMES.KINO]: `/${Constants.ROUTE_NAMES.KINO}`,
        [Constants.ROUTE_NAMES.POWERSPIN]: `/${Constants.ROUTE_NAMES.POWERSPIN}`,
      };

      const matchedKey = Object.keys(themeMap).find((key) => path?.includes(key));
      return matchedKey ? themeMap[matchedKey] : '/';
    },
    dynamicAssetKey() {
      const pageType = this.$route.params.type;
      const assetMap = {
        kinoFaq: Constants.VIDEO_NAMES.FAQ_KINO_ANSWERS,
        powerspinFaq: Constants.VIDEO_NAMES.FAQ_POWERSPIN_ANSWERS,
        helpFaq: Constants.VIDEO_NAMES.FAQ_OTHER_ANSWERS,
      };
      return assetMap[pageType] || Constants.VIDEO_NAMES.FAQ_KINO_ANSWERS;
    },
  },

  methods: {
    ...mapActions(moduleTypes.CONFIGURATION_STORE_MODULE, [types.actions.LOAD_FAQ_BOX]),
    ...mapActions(moduleTypes.VIDEO_STORE_MODULE, {
      [VideoTypes.actions.PLAY_VIDEO]: VideoTypes.actions.PLAY_VIDEO,
    }),
    async loadFaqDetail() {
      const pageType = this.$route.params.type;
      const boxId = this.$route.params.id;
      const faqDetail = await this[types.actions.LOAD_FAQ_BOX]({
        pageType,
        boxId,
        defaultContent: DEFAULT_FAQ_BOXES,
      });
      this.boxTitle = faqDetail.title;
      this.boxContent = faqDetail.content;
      return faqDetail;
    },
    handleClose() {
      this.$router.push({ name: this.backRoute });
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../../scss-utils/digitalassistant/_mixins';

.faq-text {
  height: 100%;

  &__layout {
    width: 100%;
    height: 100%;
    padding-bottom: 30px;
  }

  &__content-box {
    display: grid;
    position: relative;
    left: 50px;
    margin-top: calc((100vh - 790px) / 2);
    height: 740px;
    overflow: auto;
    margin-bottom: 10px;
    z-index: 99;

    @media (max-width: 1920px) {
      margin-top: 80px;
    }

    @media (max-width: 1600px) {
      margin-top: 80px;
    }

    @media (max-width: 1200px) {
      left: 0;
      margin: 20px;
      height: 97%;
      overflow: hidden;
    }

    * {
      font-family: 'Roboto Flex';
    }
  }

  &__content {
    border-top-right-radius: 40px;
    border-bottom-right-radius: 40px;
    border-bottom-left-radius: 40px;
    display: flex;
    flex-direction: column;
    height: 740px;
    grid-column: 9;
    z-index: 99;
    color: #0b56c3;
    width: 905px;
    background: white;

    @media (max-width: 1200px) {
      width: 100%;
      height: 100%;
      grid-column: 1;
    }

    &::before {
      content: '';
      position: absolute;
      inset: -0.15rem;
      background: var(--faq-first);
      mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      mask-composite: exclude;
      padding: 0.3525rem;
      border-radius: inherit;
      z-index: -1;
      height: auto;
      width: 913px;
      grid-column: 9;

      @media (max-width: 1200px) {
        width: 100%;
        grid-column: 1;
        inset: 0;
      }
    }
  }

  &__headline {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 700;
    font-size: 32px;
    line-height: 125%;
    letter-spacing: -2%;
  }

  &__title {
    font-size: 32px;
    color: #0b154a;
    padding: 18px;
    margin-top: 17px;
    margin-bottom: 0;
    font-weight: 700;

    @media (max-width: 1200px) {
      font-size: 24px;
    }
  }

  &__close-icon {
    font-family: 'Material Icons' !important;
    font-size: 42px;
    color: black;
    margin-right: 15px;
    margin-top: 10px;
    cursor: pointer;
  }

  &__description {
    padding: 18px;
    line-height: 114%;
    font-weight: 500;
    font-size: 33.5px;
    line-height: 114.99999999%;
    letter-spacing: 0%;
    overflow: auto;
    width: 99.9%;

    @media (max-width: 1200px) {
      font-size: 18px;
      padding: 12px;
    }
  }

  &__cta-container {
    margin-top: auto;
    display: flex;
    justify-content: center;
    width: 100%;
    position: relative;
    bottom: 35px;

    @media (max-width: 1200px) {
      bottom: 20px;
    }
  }
}

.cta-container {
  @include faq(--button-kino-gradient, black);
  padding: 5px;
  width: 80%;
  font-weight: 700;
  font-size: 32px;
  line-height: 125%;
  letter-spacing: 5%;
  text-align: center;
  vertical-align: middle;

  @media (max-width: 1200px) {
    font-size: 18px;
    width: 90%;
  }
}

*::-webkit-scrollbar {
  width: 16px;
}

*::-webkit-scrollbar-track {
  background: white;
}

*::-webkit-scrollbar-thumb {
  background-color: white;
  border: 2px solid gray;
}
</style>
