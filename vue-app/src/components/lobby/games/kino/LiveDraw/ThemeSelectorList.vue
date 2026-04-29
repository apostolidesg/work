<template>
  <div class="theme-selector-container">
    <div class="theme-selector-container-wrapper">
      <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide :key="themeKey" v-for="(item, themeKey, index) in getThemes">
          <ThemeSelectorItem
            :content="$t(item[getLocaleCaption])"
            :isActive="isThemeTypeSelected(item, themeKey, index)"
            :image="getImage(item)"
            @setTheme="setTheme({ themeKey })"
          />
        </swiper-slide>
      </swiper>
    </div>
    <a class="swiper-button-prev swiper-button-white"></a>
    <a class="swiper-button-next swiper-button-white"></a>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { mapActions, mapGetters } from 'vuex';

import ThemeSelectorItem from './ThemeSelectorItem';
import moduleTypes from '../../../../../store/modules/types';
import liveDrawTypes from '../../../../../store/modules/LiveDrawModule/types';
import Vue from 'vue';
import configurationModuleTypes from '../../../../../store/modules/ConfigurationStoreModule/types';

export default {
  name: 'ThemeSelectorList',
  components: {
    ThemeSelectorItem,
    swiper,
    swiperSlide,
  },
  data() {
    return {
      index: 0,
      swiperOptions: {
        slidesPerView: 4,
        spaceBetween: 15,
        slidesPerGroup: 3,
        loop: false,
        loopFillGroupWithBlank: false,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
    };
  },
  created() {
    this.$eventHub.$on('slideToSwiper', this.swipeToNew);
  },
  computed: {
    ...mapGetters(moduleTypes.LIVE_DRAW_MODULE, {
      getThemesSimple: liveDrawTypes.getters.GET_THEMES_SIMPLE,
      getThemesSidebets: liveDrawTypes.getters.GET_THEMES_SIDEBETS,
      getSelectedTheme: liveDrawTypes.getters.GET_SELECTED_THEME,
      getSelectedThemeType: liveDrawTypes.getters.GET_SELECTED_THEME_TYPE,
    }),
    ...mapGetters(moduleTypes.CONFIGURATION_STORE_MODULE, {
      getLiveDrawThemes: configurationModuleTypes.getters.GET_LIVE_DRAW_THEMES,
    }),
    getLocaleCaption() {
      return `caption_${this.$root.$i18n.locale()}`;
    },
    getThemes() {
      return this.getLiveDrawThemes[this.getSelectedThemeType].list;
    },
  },
  methods: {
    // TODO check if selectedThemeID can be added to store
    ...mapActions(moduleTypes.LIVE_DRAW_MODULE, {
      updateTheme: liveDrawTypes.actions.UPDATE_SELECTED_THEME,
    }),
    async swipeToNew() {
      await Vue.nextTick();
      // TODO: this is not working if go back to place bet and then again to live draw
      // The full implementation oti the theme selection should be rechecked
      // this.$refs.mySwiper.swiper.slideTo(this.index)
    },
    isThemeTypeSelected(item, theme, actualIndex) {
      const isSelected = this.getSelectedTheme === theme;
      isSelected && (this.index = actualIndex);
      return isSelected;
    },
    getImage({ image, imageUrl }) {
      // TODO if we go with URLs this will be refactored to just use that
      return image ? require(`../../../../../assets/live-draw/${image}.png`) : imageUrl;
    },
    setTheme({ themeKey }) {
      this.updateTheme(themeKey);
    },
  },
};
</script>

<style scoped>
.theme-selector-container {
  position: relative;
  /*width: 54%;*/
  /*height: 100%;*/
  background: #0c1922;
  background: linear-gradient(90deg, rgba(10, 56, 69, 1) 0%, rgba(53, 56, 49, 1) 100%);
  height: 100%;
  align-items: center;
  display: flex;
}
.theme-selector-container {
  display: flex;
  justify-content: center;
}
.theme-selector-container-wrapper {
  width: 94%;
}
.swiper-button-prev,
.swiper-button-next {
  background-size: 14px 44px;
}

.swiper-button-prev,
.swiper-container-rtl .swiper-button-next {
  left: 0;
}

.swiper-button-next,
.swiper-container-rtl .swiper-button-prev {
  right: 0;
}

.swiper-button-prev.swiper-button-disabled,
.swiper-button-next.swiper-button-disabled {
  opacity: 0;
}
</style>
