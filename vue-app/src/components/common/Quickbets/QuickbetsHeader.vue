<template>
  <div class="quickbets-header" :class="`quickbets-header--${theme}`">
    <span class="quickbets-header__back_button">
      <button @click="goBack" class="quickbets-header__button" data-testid="goBack-btn">
        <font-awesome-icon :icon="chevronLeft" />
        {{ $t('goBack') }}
      </button>
    </span>
  </div>
</template>

<script>
import chevronLeft from '@fortawesome/fontawesome-free-solid/faChevronLeft';
import moduleTypes from '@/store/modules/types';
import { mapState, mapActions, mapGetters } from 'vuex';
import kinoGameModuleTypes from '@/store/modules/KinoStoreModule/types';
import Constants from '@/util/Constants';
import powerspinModuleTypes from '@/store/modules/PowerspinBetslipStoreModule/types';
import gtag from '@/util/gtag';
import gtmEvents from '@/constants/gtmEvents';

export default {
  name: 'QuickbetsHeader',
  props: {
    theme: {
      type: String,
      default: Constants.THEMES.KINO,
    },
  },
  data() {
    return {
      chevronLeft,
    };
  },
  computed: {
    ...mapState(moduleTypes.KINO_GAME_STORE_MODULE, {
      betslip: kinoGameModuleTypes.state.BETSLIP,
    }),
    ...mapGetters(moduleTypes.POWERSPIN_GAME_STORE_MODULE, {
      powerspinBetslip: powerspinModuleTypes.getters.GET_ACTIVE_BETSLIP,
    }),
  },
  methods: {
    ...mapActions(moduleTypes.KINO_GAME_STORE_MODULE, {
      resetBetslip: kinoGameModuleTypes.actions.RESET_BETSLIP,
    }),
    goBack() {
      this.resetBetslip();
      gtag.sendEvent(gtmEvents.SSBT_LOTTERY_QUICKBETS_BACK_BUTTON_CLICKED, {
        game: this.theme,
      });
      const routeName =
        this.theme === 'kino' ? Constants.ROUTE_NAMES.KINO_QUICKPLAY : Constants.ROUTE_NAMES.POWERSPIN_QUICKPLAY;
      this.$router.push({ name: routeName });
    },
  },
};
</script>

<style lang="scss" scoped>
.quickbets-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  position: relative;
  margin: 40px 0;

  &__back_button {
    font-size: 29px;
    font-weight: 900;
    margin-bottom: 20px;
    position: absolute;
  }

  &__title {
    font-size: 42px;
    font-weight: 900;
    color: var(--color-yellow-warm);
    margin: 0 auto;
    margin-bottom: 20px;
  }

  &__button {
    color: var(--color-white);
    font-weight: 600;
    font-size: 35px;
    border: none;
    border-radius: 9999px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    background: transparent;

    &:hover {
      background-color: var(--color-button-hover-yellow);
    }
  }
}

@mixin theme-styles($theme) {
  &--#{$theme} {
    .quickbets-header__title {
      // Example: change title color based on theme
      // color: if($theme == 'kino', var(--color-yellow-warm), var(--color-some-other-color));
      // This is a placeholder to avoid empty ruleset error
      position: relative;
    }
    .quickbets-header__button {
      // Example: change button color based on theme
      // color: if($theme == 'kino', var(--color-white), var(--color-some-other-color));
      // &:hover {
      //   background-color: if($theme == 'kino', var(--color-button-hover-yellow), var(--color-some-other-hover-color));
      // }
      // This is a placeholder to avoid empty ruleset error
      position: relative;
    }
  }
}

.quickbets-header {
  @include theme-styles('kino');
  @include theme-styles('powerspin');
}
</style>
