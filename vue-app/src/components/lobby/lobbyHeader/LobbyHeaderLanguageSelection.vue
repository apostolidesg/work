<template>
  <div
    id="ssbt-header-language-selection"
    :class="[
      'ssbt-header-language-selection',
      `ssbt-header-language-selection--${textTheme}`,
      {
        'ssbt-header-language-selection--digital-assistant': digitalAssistantEnabled,
        'ssbt-header-language-selection--play-area': isPlayArea,
        'ssbt-header-language-selection--powerspin': isPowerspin,
        'ssbt-header-language-selection--kino': isKino,
      },
    ]"
  >
    <a
      id="ssbt_lang_gr"
      :class="['ssbt-header-language-selection__link', linkClass, getActiveClass('el')]"
      href="#"
      @click="changeLanguage('el')"
      >ΕΛ</a
    >
    <a
      id="ssbt_lang_en"
      :class="['ssbt-header-language-selection__link', linkClass, getActiveClass('en')]"
      href="#"
      @click="changeLanguage('en')"
      >EN</a
    >
  </div>
</template>

<script>
import Constants from '../../../util/Constants';
import { mapGetters } from 'vuex';
import moduleTypes from '../../../store/modules/types';
import ConfigurationStoreModuleTypes from '../../../store/modules/ConfigurationStoreModule/types';
import gtag from '@/util/gtag';
import gtmEvents from '@/constants/gtmEvents';

const TEXT_THEMES = {
  WHITE: 'white',
  BLACK: 'black',
  CLEAR_WHITE: 'clear-white',
};

export default {
  name: 'LobbyHeaderLanguageSelection',
  props: {
    language: {
      type: String,
      default: Constants.DEFAULT_LOCALE,
    },
    textTheme: {
      type: String,
      default: TEXT_THEMES.BLACK,
      validator: (value) => Object.values(TEXT_THEMES).includes(value),
    },
  },
  computed: {
    ...mapGetters(moduleTypes.CONFIGURATION_STORE_MODULE, {
      digitalAssistantEnabled: ConfigurationStoreModuleTypes.getters.IS_DIGITAL_ASSISTANT_ENABLED,
    }),

    isPlayArea() {
      const playAreaRoutes = [Constants.ROUTE_NAMES.KINO, Constants.ROUTE_NAMES.POWERSPIN];
      return playAreaRoutes.includes(this.$route?.name);
    },

    isPowerspin() {
      return this.$route?.name === Constants.ROUTE_NAMES.POWERSPIN;
    },

    isKino() {
      return this.$route?.name === Constants.ROUTE_NAMES.KINO;
    },

    linkClass() {
      if (this.isPowerspin) {
        return 'ssbt-header-language-selection__link--powerspin';
      }
      if (this.isPlayArea) {
        return 'ssbt-header-language-selection__link--play-area-black';
      }
      if (this.digitalAssistantEnabled) {
        return `ssbt-header-language-selection__link--${this.textTheme}-digital-assistant`;
      }
      return `ssbt-header-language-selection__link--${this.textTheme}`;
    },

    baseActiveClass() {
      if (this.isPowerspin) {
        return 'ssbt-header-language-selection__link--active-powerspin';
      }
      if (this.isPlayArea) {
        return 'ssbt-header-language-selection__link--active-play-area-black';
      }
      if (this.digitalAssistantEnabled) {
        return `ssbt-header-language-selection__link--active-${this.textTheme}-digital-assistant`;
      }
      return `ssbt-header-language-selection__link--active-${this.textTheme}`;
    },
  },
  methods: {
    getActiveClass(lang) {
      return lang === this.language ? this.baseActiveClass : '';
    },
    changeLanguage(language) {
      gtag.sendEvent(gtmEvents.SSBT_LOTTERY_LANGUAGE_TOGGLE, { language });

      this.$emit('change-language', { language });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../scss-utils/powerspin/colors';
.ssbt-header-language-selection {
  font-size: 24px !important;
  padding: 0 12px;
  display: inline-flex;
  flex-direction: row !important;
  & a:first-child:after {
    content: '|';
    font-size: 30px;
    padding: 0 4px 0 4px;
  }
  &--white,
  &--clear-white {
    & a:first-child:after {
      color: $color-primary-white;
    }
  }
  &--black {
    a:first-child:after {
      color: black;
    }
  }
  &--play-area {
    a:first-child:after {
      color: black;
    }
  }
  &--powerspin {
    a:first-child:after {
      color: white;
    }
  }
  &__link {
    cursor: pointer;
    text-decoration: none;
    font-weight: 900;
    font-size: 24px !important;
    justify-content: center;
    display: inline-flex;
    flex-direction: row !important;
    align-items: center;
    &--white,
    &--clear-white {
      color: rgba(255, 255, 255, 0.5);
    }
    &--black {
      color: rgba(0, 0, 0, 0.6);
    }
    &--play-area-black {
      color: rgba(0, 0, 0, 0.6);
    }
    &--powerspin {
      color: rgba(255, 255, 255, 0.7);
    }
    &--white-digital-assistant {
      color: rgba(125, 148, 175, 1);
    }
    &--black-digital-assistant {
      color: rgba(125, 148, 175, 1);
    }
    &--active {
      &-white,
      &-clear-white {
        color: var(--white);
      }
      &-black {
        color: #20303f;
      }
      &-play-area-black {
        color: #20303f;
      }
      &-powerspin {
        color: #007bff;
      }
      &-white-digital-assistant {
        color: rgba(125, 148, 175, 1);
      }
      &-black-digital-assistant {
        color: white;
      }
    }
  }
}

.ssbt-header-language-selection--digital-assistant a:first-child:after {
  color: white !important;
}

.ssbt-header-language-selection--kino a:first-child:after {
  color: black !important;
}
</style>
