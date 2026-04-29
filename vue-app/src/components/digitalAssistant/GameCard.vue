<template>
  <div @click="navigateToGame" class="game-card" :class="`game-card--${theme}`">
    <div class="game-card__content">
      <div class="game-card__image-container" :class="theme">
        <img :src="logoSrc" alt="logo" class="game-card__logo" :data-testid="`game-card__logo--${theme}`" />
      </div>
      <div class="game-card__button-container">
        <button class="button" :class="`button--${theme}`">
          <span class="button__text"> {{ buttonText }} </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Kino from '@/assets/lobby/kino.png';
import PowerSpinLogo from '@/assets/lobby/powerspin.png';
import Constants from '@/util/Constants';
import gtag from '@/util/gtag';
import gtmEvents from '@/constants/gtmEvents';

export default {
  name: 'GameCard',
  props: {
    theme: {
      type: String,
      default: Constants.THEMES.KINO,
    },
    buttonText: {
      type: String,
      required: false,
      default: 'Play now',
    },
    buttonText: {
      type: String,
      required: false,
      default: 'Play now',
    },
    to: {
      type: String,
      required: true,
    },
  },
  computed: {
    logoSrc() {
      const logos = {
        kino: Kino,
        powerspin: PowerSpinLogo,
      };

      return logos[this.theme] || kinoLogo;
    },
  },
  methods: {
    navigateToGame() {
      const isVideoRoute =
        this.to === Constants.ROUTE_NAMES.POWERSPIN_VIDEOS || this.to === Constants.ROUTE_NAMES.KINO_VIDEOS;
      if (!isVideoRoute) {
        gtag.sendEvent(
          this.theme === Constants.THEMES.KINO
            ? gtmEvents.SSBT_LOTTERY_LOBBY_PLAY_KINO
            : gtmEvents.SSBT_LOTTERY_LOBBY_PLAY_POWERSPIN
        );
      }
      this.$router.push({ name: this.to });
    },
  },
};
</script>

<style lang="scss" scoped>
.game-card {
  position: relative;
  height: var(--game-height);
  width: var(--card-width);
  border-radius: 40px;
  overflow: hidden;
  cursor: pointer;
  background: rgba(255, 255, 255, 1);
  backdrop-filter: blur(7px);

  @media (max-width: 1200px) {
    width: 100%;
    height: var(--game-height-incr-2);
    max-width: 490px;
  }

  &__content {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: 2.5rem 1.5rem 5rem;
  }

  &__image-container.kino {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 70px;
  }

  &__image-container {
    display: flex;
    justify-content: center;
  }

  &__image-container.powerspin {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 290px;
    margin-top: 5px;
  }

  &__logo {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  &__button-container {
    position: absolute;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    bottom: 4rem;
    font-size: 1rem;
  }
  z-index: 2;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    filter: blur(7px);
    z-index: 0;
  }
}

@mixin theme-styles($theme) {
  &--#{$theme} {
    position: relative;
    background: transparent;
    overflow: hidden;
    border-radius: 40px;

    &::before {
      content: '';
      position: absolute;
      background: var(--gradient-#{$theme}-card);
      inset: 0;
      filter: blur(8px);
      z-index: -1;
    }

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 40px;
      border: 6px solid transparent;
      background: var(--gradient-#{$theme}-border);
      mask-composite: exclude;
      mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      mask-composite: exclude;
      z-index: 2;
    }
  }
}

.game-card {
  @include theme-styles('kino');
  @include theme-styles('powerspin');
}

.button {
  width: var(--button-width);
  height: var(--button-height);
  font-weight: bold;
  border: none;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  font-weight: 700;
  letter-spacing: 5%;
  &.button--kino {
    position: relative;
    background: var(--button-kino-gradient);
    border: none;
    outline: none;
    overflow: visible;
    border: 4px solid #f3691e;
    border-radius: 20px;
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
    font-size: 1.75rem;
    &::before {
      content: '';
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      background: var(--kino-button-gradient);
      mix-blend-mode: screen;
      filter: blur(15px);
      z-index: 1;
      opacity: 0.8;
    }
  }
  &.button--powerspin {
    width: var(--button-width);
    height: var(--button-height);
    font-size: 1.7rem;
    font-weight: bold;
    border: none;
    border-radius: var(--border-radius-sm);
    cursor: pointer;
    font-weight: 700;
    letter-spacing: 5%;
    background: var(--button-powerspin-gradient);
    color: white;
    border-radius: 20px;
    overflow: hidden;
    text-align: center;
    border: var(--gradient-powerspin-border);
    border: 4px solid #f3691e;
  }
}
</style>
