<template>
  <div
    class="info-modal__body d-flex flex-row justify-content-center"
    :class="`info-modal__body--${theme}`"
  >
    <div v-if="hasIcon" class="info-modal__body-icon-container" id="info-modal-icon">
      <div class="info-modal__body-icon rounded-circle p-2 d-flex justify-content-center align-items-center">
        <img v-if="image" :src="image" class="info-modal__body-icon--img w-100 h-auto" />
        <font-awesome-icon v-else-if="faIcon" :icon="faIcon" class="info-modal__body-icon--icon" />
      </div>
    </div>
    <div
      class="info-modal__content"
    >
      <h5 v-if="title" class="info-modal__body-title text-left" id="info-modal-title">{{ $t(title) }}</h5>
      <div id="info-modal-message" class="info-modal__body-message">{{ getMessage }}</div>
    </div>
  </div>
</template>

<script>
import fontawesome from '@fortawesome/fontawesome';
import faInfo from '@fortawesome/fontawesome-free-solid/faInfo';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';

fontawesome.library.add(faInfo, faCheck, faTimes);

export default {
  name: 'InfoModalBodyDefault',
  props: {
    icon: {
      type: Object,
      default: () => ({ icon: '', image: '' }),
    },
    title: {
      type: String,
      default: '',
    },
    message: {
      type: Object,
      default: () => ({ translationLabel: '', params: null }),
    },
    theme: {
      type: String,
      default: 'DEFAULT',
    },
  },
  computed: {
    hasIcon() {
      return !!this.icon;
    },
    image() {
      return this.hasIcon && this.icon.image ? require(`../../assets/${this.icon.image}`) : '';
    },
    faIcon() {
      return this.hasIcon && this.icon.icon;
    },
    getMessage() {
      const { translationLabel = '', params = null } = this.message || {};
      return this.$t(translationLabel, params);
    },
  },
};
</script>

<style lang="scss" scoped>
.info-modal__body {
  color: #fff;
  align-items: start;
  padding-bottom: 3rem;
  padding-top: 1.5rem;
}
.info-modal__body--INSTANT_WIN {
  color: #1e1f24;
  padding: 0 0 1em;
  align-items: center;
  gap: 2em;
  font-size: 16px;
  .info-modal__body-icon {
    border: 2px solid #1e1f24;
    &-container {
      padding: 0;
    }
  }
  .info-modal__content {
    width: auto;
  }
}
.info-modal__body--PROMOTIONS {
  align-items: center;
}
.info-modal__body--WINNING .info-modal__content {
  margin-left: 7rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
}
.info-modal__body-icon {
  width: 65px;
  height: 65px;
  border: 2px solid #fff;
  &--icon {
    font-size: 2.4rem;
  }
  &-container {
    padding-right: 3rem;
  }
}
.info-modal__content {
  width: 75%;
}
</style>
