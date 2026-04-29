<template>
  <div class="link-to-play-area" :class="`link-to-play-area--${currentItem.cssClass}`" @click="likeGame">
    <div class="link-to-play-area__content">
      <div class="link-to-play-area__logo">
        <img class="link-to-play-area__logo-image" :src="currentItem.logo" :alt="currentItem.alt" />
      </div>
      <div class="link-to-play-area__text" :class="`link-to-play-area__text--${currentItem.cssClass}`">
        <span v-html="$t('learn-more.likeText', { game: game.toUpperCase() })"></span>
      </div>
    </div>
  </div>
</template>

<script>
import Kino from '@/assets/lobby/kino.png';
import Powerspin from '@/assets/lobby/powerspin.png';
import gtag from '@/util/gtag';
import gtmEvents from '@/constants/gtmEvents';
import Constants from '../../../util/Constants';

export default {
  name: 'LinkToPlayArea',
  props: {
    game: {
      type: String,
      required: true,
    },
  },
  computed: {
    items() {
      return {
        kino: {
          logo: Kino,
          alt: 'kino-learn-more',
          event: gtmEvents.SSBT_LOTTERY_PLAY_AREA_KINO,
          cssClass: 'kino',
        },
        powerspin: {
          logo: Powerspin,
          alt: 'powerspin-learn-more',
          event: gtmEvents.SSBT_LOTTERY_PLAY_AREA_POWERSPIN,
          cssClass: 'powerspin',
        },
      };
    },
    currentItem() {
      return this.items[this.game.toLowerCase()];
    },
    logoSrc() {
      return this.currentItem.logo;
    },
  },
  methods: {
    likeGame() {
      gtag.sendEvent(this.currentItem.event);

      this.$router.push({
        name:
          this.game === Constants.THEMES.KINO
            ? Constants.ROUTE_NAMES.KINO_QUICKPLAY
            : Constants.ROUTE_NAMES.POWERSPIN_QUICKPLAY,
      });
    },
  },
};
</script>

<style scoped lang="scss">
$primary-yellow: var(--primary-yellow, #ffd700);

.link-to-play-area {
  color: white;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 2rem;
  gap: 1rem;
  border-radius: 40px;
  cursor: pointer;
  overflow: hidden;
  min-height: 12rem;
  position: relative;
  width: 100%;

  &--kino {
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 40px;
      border: 6px solid transparent;
      background:
        linear-gradient(0deg, rgba(255, 201, 0, 0.22), rgba(255, 201, 0, 0.22)),
        radial-gradient(180% 180% at 0% 100%, rgba(255, 123, 28, 0.43) 0%, rgba(255, 123, 28, 0) 100%),
        radial-gradient(140% 140% at 100% 0%, rgba(255, 230, 0, 0.41) 0%, rgba(255, 230, 0, 0) 100%),
        radial-gradient(100% 100% at 0% 0%, rgba(255, 173, 27, 0.53) 0%, rgba(255, 173, 27, 0) 100%);
      mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      mask-composite: exclude;
      z-index: 2;
    }
  }

  &--powerspin {
    position: relative;

    &::after {
      content: '';
      content: '';
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      border-radius: 40px;
      border: 6px solid transparent;
      background: conic-gradient(from 135deg, #d50176, #003a78, #e601e9, #0b56c3, #d50176) border-box;
      mask:
        linear-gradient(#fff 0 0) padding-box,
        linear-gradient(#fff 0 0);
      mask-composite: exclude;
      z-index: 2;
    }
  }

  &__content {
    padding-left: 1rem;
    padding-right: 1rem;
    text-align: center;
    display: flex;
    flex: 1;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 40px;
    justify-content: center;
    align-items: center;
    width: 100%;
    z-index: 10;
    gap: 2rem;
  }

  &__logo {
    display: flex;

    &-image {
      width: 12rem;
    }
  }

  &__text {
    font-weight: bold;
    font-size: 2rem;
    text-align: start;

    &--kino {
      color: $primary-yellow;
    }
  }

  &__button {
    background: none;
    border: none;
    cursor: pointer;

    &-icon {
      width: 7rem;
      height: 7rem;
    }
  }
}
</style>
