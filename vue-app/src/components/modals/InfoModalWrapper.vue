<template>
  <ModalOverlay :visible="visible" #default>
    <section
      class="info-modal position-relative d-flex flex-column justify-content-center align-items-stretch rounded"
      :class="[`info-modal__container--${theme}--${generalGameType}`, { 'p-4': !isInstantWin }]"
      id="info-modal-container"
    >
      <button
        v-if="closeButton"
        type="button"
        class="info-modal__btn-close border-0 align-self-end bg-transparent"
        id="close-info-modal"
        @click="close"
      >
        <font-awesome-icon
          icon="times"
          class="info-modal__close-icon"
          :class="`info-modal__close-icon--${generalGameType}`"
        />
      </button>
      <slot name="header"></slot>
      <slot name="body"></slot>
      <div v-if="isInstantWin" :class="`info-modal__container--${theme}--${generalGameType}--wrapper`">
        <img
          :src="`${instantWin[getCurrentLocale()]}`"
          :class="`info-modal__container--${theme}--${generalGameType}--img`"
          class="w-100 h-auto"
        />
        <div :class="`info-modal__container--${theme}--${generalGameType}--description`">
          {{ $t(messages.description) }}
        </div>
        <div :class="`info-modal__container--${theme}--${generalGameType}--alert`">
          <div class="alert-wrapper">
            <img src="../../assets/exclamation-triangle.png" />
            {{ $t(messages.alert) }}
          </div>
        </div>
      </div>
      <div
        v-if="withFooter"
        class="info-modal__footer w-100 d-flex justify-content-center align-items-center"
        :class="`info-modal__footer--${theme}`"
      >
        <slot name="footer">
          <InfoModalFooterButton id="info-modal-ok" :theme="theme" :game="generalGameType" @click="close">
            {{ $t('ok') }}
          </InfoModalFooterButton>
        </slot>
      </div>
    </section>
  </ModalOverlay>
</template>

<script>
import ModalOverlay from './ModalOverlay';
import InfoModalFooterButton from './InfoModalFooterButton';
import fontawesome from '@fortawesome/fontawesome';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';
import moduleTypes from '../../store/modules/types';
import SessionStoreModuleTypes from '../../store/modules/SessionStoreModule/types';
import Constants from '../../util/Constants';
import { mapState } from 'vuex';
import { modalTypes } from '../../util/infoModalConstants';
import instantWinEn from '../../assets/instant-win-banner-en.png';
import instantWinEl from '../../assets/instant-win-banner-el.png';

fontawesome.library.add(faTimes);

const GAME_TYPE_MAPPER = {
  [Constants.GENERAL_GAME_TYPES.KINO]: 'kino',
  [Constants.GENERAL_GAME_TYPES.POWERSPIN]: 'powerspin',
  [Constants.GENERAL_GAME_TYPES.EUROJACKPOT]: 'eurojackpot',
};

export default {
  name: 'InfoModalWrapper',
  components: {
    ModalOverlay,
    InfoModalFooterButton,
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    closeButton: {
      type: Boolean,
      default: true,
    },
    withFooter: {
      type: Boolean,
      default: true,
    },
    theme: {
      type: String,
      default: 'DEFAULT',
    },
    messages: {
      type: Object,
      default: () => ({ translationLabel: '' }),
    },
  },
  data() {
    return {
      instantWin: {
        en: instantWinEn,
        el: instantWinEl,
      },
    };
  },
  computed: {
    ...mapState(moduleTypes.SESSION_STORE_MODULE, {
      gameType: SessionStoreModuleTypes.state.GAME_TYPE,
    }),
    generalGameType() {
      return GAME_TYPE_MAPPER[this.gameType] || 'lobby';
    },
    isInstantWin() {
      return this.theme === modalTypes.INSTANT_WIN;
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
    getCurrentLocale() {
      return this.$root.$i18n.locale();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../scss-utils/powerspin/colors';
@import '../../scss-utils/eurojackpot/mixins';
@import '../../scss-utils/eurojackpot/colors';

.info-modal {
  color: #fff;
  box-shadow: 0 0 10px 0 #000;
  width: 45%;
  &__close-icon {
    font-size: 2.3rem;
    color: #fff;

    &--eurojackpot {
      color: $color-button-close-modal;
    }
  }
  &__container {
    &--DEFAULT,
    &--SCAN_ERROR,
    &--INFO,
    &--CONFIRM,
    &--ERROR,
    &--DIALOG,
    &--WINNING,
    &--PROMOTIONS {
      &--kino,
      &--lobby {
        background: linear-gradient(90deg, #0c2442 0%, #0a3b51 100%);
      }
      &--powerspin {
        background: $gradient-dark-blue;
      }
      &--eurojackpot {
        @include eurojackpot-modal-background;
      }
    }
    &--INSTANT_WIN {
      &--kino,
      &--powerspin,
      &--eurojackpot,
      &--lobby {
        color: #1e1f24;
        font-size: 14px;
        font-weight: 500;
        background: white;

        &--wrapper {
          display: flex;
          flex-direction: column;
          gap: 1em;
          background-color: #bef6f0;
        }
        &--description {
          padding: 0em 8em;
          text-align: center;
        }
        &--alert {
          background-color: #bef6f0;
          img {
            width: 38px;
            height: 35px;
            padding: 6px;
          }
          .alert-wrapper {
            display: flex;
            gap: 1em;
            align-items: center;
            background: #ffffffa1;
            padding: 0.5em 1em;
            margin: 0 8em;
            border-radius: 7px;
          }
        }
        .info-modal__btn-close {
          padding: 0.5em 1em;
          height: 20px;
        }
        .info-modal__close-icon {
          color: #1e1f24;
        }
      }
    }
    &--PROMOTIONS {
      &--lobby,
      &--eurojackpot,
      &--kino,
      &--powerspin {
        width: 40%;
        ::v-deep.info-modal__body-message {
          font-size: 1.5em;
        }
      }
    }
  }
  &__footer {
    &--INSTANT_WIN {
      background-color: #bef6f0;
      padding: 2em 0;

      ::v-deep .info-modal__footer-button {
        background-color: #1d4757;
      }
    }
  }
}
.info-modal__container.info-modal__container--WINNING--kino {
  background: #fff url('../../assets/winnings-visual.png') no-repeat top left / contain;
  border: 15px solid #f5be20;
  color: #0e486a;
}
.info-modal__container--WINNING--kino .info-modal__close-icon {
  color: #0e486a;
}
</style>
