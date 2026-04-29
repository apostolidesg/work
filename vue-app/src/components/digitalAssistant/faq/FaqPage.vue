<template>
  <div class="faq-page digital-assistant-font">
    <DigitalAssistantLayout
      :asset-key="dynamicAssetKey"
      class="faq-page__layout"
      :show-go-back="true"
      :go-back-route="routeNames.MAIN_FAQ"
    >
      <div class="faq-page__content">
        <content-box
          v-for="(box, index) in boxes"
          :key="index"
          :class="[{ 'faq-page__content--right': index % 2 === 0 }]"
          :title="getTranslation(box.title)"
          :description="$t(box.description) || ''"
          :is-last="index === boxes.length - 1"
          :span-text="box.spanText"
          :links="box.links"
          :route="box.route"
          :box-type="pageType"
          :theme="theme"
          :box-count="boxes.length"
        >
          <p>{{ box.title }}</p>
        </content-box>
      </div>
    </DigitalAssistantLayout>
  </div>
</template>

<script>
import ContentBox from './ContentBox.vue';
import DigitalAssistantLayout from '../DigitalAssistantLayout.vue';
import { DEFAULT_FAQ_BOXES } from '@/config/defaultContent';
import { mapActions } from 'vuex';
import types from '@/store/modules/ConfigurationStoreModule/types';
import moduleTypes from '@/store/modules/types';
import VideoTypes from '@/store/modules/VideoStoreModule/types';
import TranslationMixin from '@/mixins/TranslationMixin';
import Constants from '@/util/Constants';

export default {
  name: 'FaqPage',
  props: {
    pageType: {
      type: String,
      required: true,
    },
    theme: {
      type: String,
      required: true,
    },
    displayLimit: {
      type: Number,
      default: 4,
    },
  },
  components: {
    ContentBox,
    DigitalAssistantLayout,
  },
  data() {
    return {
      boxes: [],
    };
  },
  computed: {
    limitedFaqPages() {
      return this.boxes.slice(0, this.displayLimit);
    },
    dynamicAssetKey() {
      const assetMap = {
        kinoFaq: Constants.VIDEO_NAMES.FAQ_KINO_QUESTIONS,
        powerspinFaq: Constants.VIDEO_NAMES.FAQ_POWERSPIN_QUESTIONS,
        helpFaq: Constants.VIDEO_NAMES.FAQ_OTHER_QUESTIONS,
      };
      return assetMap[this.pageType] || Constants.VIDEO_NAMES.FAQ_KINO_QUESTIONS;
    },
  },
  mixins: [TranslationMixin],
  created() {
    this.routeNames = Constants.ROUTE_NAMES;
    this.loadFaqData();
  },
  methods: {
    ...mapActions(moduleTypes.CONFIGURATION_STORE_MODULE, [types.actions.LOAD_FAQ_BOXES]),
    ...mapActions(moduleTypes.VIDEO_STORE_MODULE, {
      [VideoTypes.actions.PLAY_VIDEO]: VideoTypes.actions.PLAY_VIDEO,
    }),
    async loadFaqData() {
      const boxes = await this[types.actions.LOAD_FAQ_BOXES]({
        pageType: this.pageType,
        defaultBoxes: DEFAULT_FAQ_BOXES,
      });
      this.boxes = boxes;
    },

    navigateToText() {
      this.$router.push({
        name: `${this.pageType}text`,
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/scss-utils/digitalassistant/_mixins.scss';

.faq-page {
  display: grid;
  grid-template-columns: 18fr;
  padding-bottom: 20px;
  gap: 20px;
  display: grid;
  * {
    font-family: Roboto Flex;
  }

  &__layout {
    width: 100%;
    height: 100vh;
  }

  &__content {
    display: grid;
    grid-column: 13 / span 6;
    grid-auto-flow: row;
    align-items: center;
    text-align: center;
  }

  @media (max-width: 1200px) {
    &__content {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      align-items: start;
      justify-items: center;
      gap: 20px;
      padding: 0 40px;
      width: 80%;
      margin: 30px auto 0 auto;

      &--right {
        align-self: flex-end;
      }
    }
  }
}
</style>
