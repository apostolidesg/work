<template>
  <span
    :class="[
      'ssbt-header-option-item',
      `ssbt-header-option-item--${textTheme}`,
      { 'ssbt-header-option-item--dark-icon': darkIcon },
    ]"
    @click="$emit('click')"
  >
    <img v-if="icon" class="ssbt-header-option-item__img" height="26" alt="option img" :src="icon" />
    <font-awesome-icon
      v-if="!icon"
      class="ssbt-header-option-item__icon"
      height="26"
      alt="option icon"
      :icon="faIcon"
    />
    {{ $t(text) }}
    <slot></slot>
  </span>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft } from '@fortawesome/fontawesome-free-solid';

library.add(faArrowLeft);

const TEXT_THEMES = {
  WHITE: 'white',
  BLACK: 'black',
  CLEAR_WHITE: 'clear-white',
};

export default {
  name: 'LobbyHeaderOption',
  props: {
    text: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    textTheme: {
      type: String,
      default: TEXT_THEMES.BLACK,
      validator: (value) => Object.values(TEXT_THEMES).includes(value),
    },
    faIcon: {
      type: Array,
      default: () => [],
    },
    darkIcon: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.ssbt-header-option-item {
  width: 150px;
  height: 50px;
  font-weight: 900;
  font-size: 11.36px;
  display: flex;
  flex-direction: column;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  padding-left: 3px;
  padding-right: 3px;
  line-height: 29px;

  &__img {
    margin: 0 auto;
  }

  &__icon {
    font-size: 27px;
    margin: 0 auto;
  }

  &--white {
    color: rgba(255, 255, 255, 0.7);
    .ssbt-header-option-item__img {
      filter: brightness(0) invert(1);
    }
    .ssbt-header-option-item__icon {
      color: rgba(255, 255, 255, 0.7);
    }
  }

  &--clear-white {
    color: #e8edf1;
    width: 125px;
    padding: 0;
    .ssbt-header-option-item__img {
      filter: brightness(0) invert(1);
    }
    .ssbt-header-option-item__icon {
      color: #e8edf1;
    }
  }

  &--black {
    color: rgba(0, 0, 0, 0.6);
    font-size: 12px;

    .ssbt-header-option-item__img {
      filter: brightness(0);
    }

    .ssbt-header-option-item__icon {
      color: #000000;
    }
  }

  &--dark-icon {
    .ssbt-header-option-item__img {
      filter: brightness(0);
    }

    .ssbt-header-option-item__icon {
      color: #000000;
    }
  }
}
</style>
