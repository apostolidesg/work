<template>
  <div class="sidescreen-layout" :class="{ 'sidescreen-layout--extra-background': isThemeEurojackpot }">
    <div v-if="hasHeader" class="sidescreen-layout__header">
      <slot name="header"></slot>
      <hr class="sidescreen-layout__divider" :class="`sidescreen-layout__divider--${theme}`" />
    </div>
    <div
      class="sidescreen-layout__content"
      :class="{ 'sidescreen-layout__content--extra-background': isThemeEurojackpot }"
    >
      <vue-scroll :ops="scrollerOps">
        <slot></slot>
      </vue-scroll>
    </div>
    <div v-if="hasStaticContent" class="sidescreen-layout__static">
      <slot name="static"></slot>
    </div>
    <div
      class="sidescreen-layout__footer"
      :class="{ 'sidescreen-layout__footer--extra-background': isThemeEurojackpot }"
    >
      <hr
        v-if="!isThemeEurojackpot"
        class="sidescreen-layout__divider"
        :class="`sidescreen-layout__divider--${theme}`"
      />
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import { simple } from '../../../util/ScrollerConfig';
import { mapState } from 'vuex';
import moduleTypes from '../../../store/modules/types';
import Constants from '../../../util/Constants';
import sessionStoreModuleTypes from '../../../store/modules/SessionStoreModule/types';

const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
};

/**
 * @name SidescreenLayout
 * @description A layout component for the sidescreen. It has a header, content, static content and a footer slots.
 * The content slot (the default) is scrollable. The header and static content slots are optional. The layout adds
 * a divider between the header and the content slots if the header slot is present and one above the footer.
 */
export default {
  name: 'SidescreenLayout',
  props: {
    theme: {
      type: String,
      required: false,
      default: THEMES.LIGHT,
      validator: value => Object.values(THEMES).includes(value),
    },
  },
  created() {
    this.scrollerOps = { ...simple };
  },
  computed: {
    ...mapState(moduleTypes.EUROJACKPOT_GAME_STORE_MODULE, ['isActiveDrawExtra']),
    ...mapState(moduleTypes.SESSION_STORE_MODULE, {
      gameType: sessionStoreModuleTypes.state.GAME_TYPE,
    }),
    hasHeader() {
      return !!this.$slots.header;
    },
    hasStaticContent() {
      return !!this.$slots.static;
    },
    isThemeEurojackpot() {
      return this.gameType.toLowerCase() === Constants.ROUTE_NAMES.EUROJACKPOT && this.isActiveDrawExtra;
    },
  },
};
</script>

<style lang="scss" scoped>
.sidescreen-layout {
  height: 100%;
  display: flex;
  flex-direction: column;
  // add padding to the bottom of the content to make space for the version string
  padding: 0.5rem 0.5rem 1rem 0.5rem;

  &--extra-background {
    padding: 0;
  }

  &__footer,
  &__static,
  &__content {
    padding-bottom: 0.5rem;
  }

  &__content {
    flex: 1;
    overflow: auto;

    &--extra-background {
      padding: 0.5rem;
    }
  }

  &__divider {
    margin: 10px 0;
    height: 1px;

    &--light {
      background-color: white;
    }

    &--dark {
      background-color: rgba(82, 61, 20, 0.3);
    }
  }

  &__footer {
    &--extra-background {
      background: linear-gradient(180deg, #ebc17d 0%, #bc7c33 100%);
      background-blend-mode: multiply;
      padding: 1rem 0.7rem;
    }
  }
}
</style>
