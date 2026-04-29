<template>
  <div class="base-clear-button__wrapper">
    <span v-if="topLabel" :class="['base-clear-button__top-label', `base-clear-button__top-label--${theme}`]">{{
      $t(topLabel)
    }}</span>
    <button
      :class="[
        'base-clear-button__btn',
        { 'base-clear-button__btn--disabled': disabled },
        `base-clear-button__btn--${theme}`,
      ]"
      :disabled="disabled"
      v-on="$listeners"
      v-bind="$attrs"
    >
      <span class="d-flex" :class="[`base-clear-button__trash--${theme}`]">
        <FontAwesomeIcon
          v-if="isGameTypeFireblaze"
          class="base-clear-button__trash"
          :icon="trashIcon"
        ></FontAwesomeIcon>
        <img v-if="isKinoRoute" :src="trashIcon" alt="clear" class="base-clear-button__trash-svg" />
        <FontAwesomeIcon
          v-if="!isGameTypeFireblaze && !isKinoRoute"
          :icon="['fa', 'trash-alt']"
          class="base-clear-button__trash"
        ></FontAwesomeIcon>
      </span>
      <span
        v-if="bottomLabel"
        :class="['base-clear-button__bottom-txt', `base-clear-button__bottom-label--${theme}`]"
        >{{ $t(bottomLabel) }}</span
      >
    </button>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt } from '@fortawesome/fontawesome-free-regular';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { mapState } from 'vuex';
import moduleTypes from '../../store/modules/types';
import SessionStoreModuleTypes from '../../store/modules/SessionStoreModule/types';
import Constants from '../../util/Constants';
import trashIconSvg from '../../assets/new-header/trashIcon.svg';

const THEME_COLOR_MAPPER = {
  BLACK: 'black',
  WHITE: 'white',
  YELLOW: 'yellow',
  CLEAR_WHITE: 'clear-white',
};

library.add(faTrashAlt);

export default {
  name: 'BaseClearButton',
  inheritAttrs: false,
  props: {
    theme: {
      required: false,
      type: String,
      default: THEME_COLOR_MAPPER.BLACK,
      validator: (value) => Object.values(THEME_COLOR_MAPPER).includes(value),
    },
    bottomLabel: {
      required: false,
      type: String,
    },
    topLabel: {
      required: false,
      type: String,
    },
    disabled: {
      required: false,
      default: false,
      type: Boolean,
    },
  },
  components: {
    FontAwesomeIcon,
  },
  computed: {
    ...mapState(moduleTypes.SESSION_STORE_MODULE, {
      gameType: SessionStoreModuleTypes.state.GAME_TYPE,
    }),
    isGameTypeFireblaze() {
      return this.gameType === Constants.GENERAL_GAME_TYPES.FIREBLAZE;
    },
    isKinoRoute() {
      return this.$route.name === Constants.ROUTE_NAMES.KINO;
    },
    trashIcon() {
      return this.isGameTypeFireblaze ? ['far', 'trash-alt'] : trashIconSvg;
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../scss-utils/powerspin/colors';
.base-clear-button {
  &__wrapper {
    display: flex;
    flex-direction: column;
    align-self: center;
  }
  &__top-label {
    text-align: center;
    display: block;
    &--white {
      color: rgba(255, 255, 255, 0.7);
    }
    &--clear-white {
      color: white;
    }
  }
  &__btn {
    display: grid;
    grid-template-rows: auto auto;
    place-items: center;
    gap: 4px;
    background: transparent;
    border: none;
    cursor: pointer;
    text-align: center;
    min-width: 85px;
    &--clear-white {
      width: 125px;
      padding-top: 0.25em;
    }
  }
  &__trash {
    font-size: 30px;
    margin: 0;
    &--white {
      color: rgba(255, 255, 255, 0.7);
      filter: brightness(0) invert(1);
    }
    &--clear-white {
      color: $color-primary-white;
    }
    &--yellow {
      color: #fae291;
    }
    &--black {
      > img {
        height: 1.9rem;
      }
    }
  }
  &__bottom-txt {
    font-weight: 900;
    line-height: 25px;
    font-size: 11.36px;
    display: block;
    text-align: center;
    justify-self: center;
    width: 100%;
  }

  &__bottom-label {
    &--white {
      color: rgba(255, 255, 255, 0.7);
    }
    &--clear-white {
      color: $color-primary-white;
    }
    &--black {
      color: rgba(0, 0, 0, 0.6);
      line-height: 25px;
    }
  }
}
.disabled-base-clear-button--btn {
  opacity: 0.4;
}
</style>
