<template>
  <ModalOverlay :visible="isVisible" #default>
    <div id="help_modal" class="p-3 help-modal" :class="`help-modal--${gameTypeForCSS}`">
      <button
        type="button"
        id="help_close_btn"
        class="help-modal__close-btn border-0 align-self-end bg-transparent"
        @click="closeHowToPlay"
      >
        <font-awesome-icon
          icon="times"
          class="help-modal__close-icon"
          :class="`help-modal__close-icon--${gameTypeForCSS}`"
        />
      </button>
      <div class="help-modal__wrapper">
        <div v-for="i in steps" class="row p-2" :key="i">
          <div class="col-3 help-modal__icon"><img width="120" :src="imagePath(i)" alt="help icon" /></div>
          <div class="col-9 help-modal__text" v-html="$t(`helpInfo${i}`, { message: digitalPayMessage })"></div>
        </div>
      </div>
    </div>
  </ModalOverlay>
</template>

<script>
import ModalOverlay from './ModalOverlay';
import modalEventConstants from '../../util/modalEventConstants';
import fontawesome from '@fortawesome/fontawesome';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';
import moduleTypes from '../../store/modules/types';
import { mapGetters, mapState } from 'vuex';
import languageStoreModuleTypes from '../../store/modules/LanguageStoreModule/types';
import SessionStoreModuleTypes from '../../store/modules/SessionStoreModule/types';
import Constants from '../../util/Constants';
import configurationStoreModuleTypes from '../../store/modules/ConfigurationStoreModule/types';

fontawesome.library.add(faTimes);

export default {
  name: 'HowToPlayModal',
  components: {
    ModalOverlay,
  },
  data() {
    return {
      isVisible: false,
    };
  },
  computed: {
    ...mapGetters(moduleTypes.LANGUAGE_STORE_MODULE, {
      getLanguage: languageStoreModuleTypes.getters.GET_LANGUAGE,
    }),
    ...mapState(moduleTypes.SESSION_STORE_MODULE, {
      gameType: SessionStoreModuleTypes.state.GAME_TYPE,
    }),
    ...mapGetters(moduleTypes.CONFIGURATION_STORE_MODULE, {
      getConfiguration: configurationStoreModuleTypes.getters.GET_CONFIGURATION,
    }),

    currentRouteName() {
      return this.$route?.name;
    },

    gameTypeForAssets() {
      return (
        Constants.ROUTE_TO_ASSET_MAP[this.currentRouteName] ||
        (this.gameType && Constants.GAMETYPES_MAPPER[this.gameType])
      );
    },

    gameTypeForCSS() {
      return Constants.ROUTE_TO_CSS_MAP[this.currentRouteName] || this.gameType;
    },

    themeInfo() {
      return {
        assets: this.gameTypeForAssets,
        css: this.gameTypeForCSS,
      };
    },
    steps() {
      return Array.from({ length: 5 }, (_, i) => i + 1).filter((i) => {
        return this.isDigitalPayEnabled || i !== 2;
      });
    },
    isDigitalPayEnabled() {
      return this.getConfiguration?.DIGITAL_PAY_ENABLED;
    },
    digitalPayMessage() {
      return this.isDigitalPayEnabled ? this.$t('helpInfo1Method') : '';
    },
  },
  created() {
    this.$eventHub.$on(modalEventConstants.OPEN.HOW_TO_PLAY, this.openHowToPlay);
  },
  beforeDestroy() {
    this.$eventHub.$off(modalEventConstants.OPEN.HOW_TO_PLAY);
  },
  methods: {
    closeHowToPlay() {
      this.isVisible = false;
      this.$eventHub.$emit(modalEventConstants.GENERIC.MODAL_ACTIVE, false);
    },

    openHowToPlay() {
      this.isVisible = true;
      this.$eventHub.$emit(modalEventConstants.GENERIC.MODAL_ACTIVE, true);
    },

    imagePath(index) {
      const lang = index === 4 ? this.getLanguage : 'el';
      return require(`../../assets/help/${lang}/${this.gameTypeForAssets}-help-icon${index}@2x.png`);
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../scss-utils/powerspin/colors';
@import '../../scss-utils/eurojackpot/mixins';
@import '../../scss-utils/eurojackpot/colors';

.help-modal {
  position: relative;
  padding: 20px;
  width: 650px;
  background-position: center;
  border-radius: 5px;
  &--KINO {
    background-image: url(../../assets/kino-help-back.jpg);
  }
  &--POWERSPIN {
    background-image: url(../../assets/powerspin-help-back.png);
    border: 3px solid $gradient-dark-blue;
  }
  &--FIREBLAZE {
    background-image: url(../../assets/powerspin-help-back.png);
    border: 3px solid $gradient-dark-blue;
  }
  &--EUROJACKPOT {
    @include eurojackpot-modal-background;
  }
  &__wrapper {
    margin-top: 48px;
  }
  &__icon {
    text-align: center;
    vertical-align: middle;
  }
  &__text {
    padding: 20px;
    background-color: white;
    border-radius: 10px;
    color: #231f20;
    font-size: 1.1rem;
  }
  &__close {
    &-btn {
      z-index: 99;
      position: absolute;
      top: 1rem;
      right: 1rem;
    }
    &-icon {
      font-size: 2.3rem;
      &--KINO {
        color: black;
      }
      &--POWERSPIN {
        color: $color-primary-white;
      }
      &--FIREBLAZE {
        color: $color-primary-white;
      }
      &--EUROJACKPOT {
        color: $color-button-close-modal;
      }
    }
  }
}
</style>
