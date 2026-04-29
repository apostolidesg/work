<template>
  <div class="how-to-lobby">
    <DigitalAssistantLayout
      :asset-key="videoNames.HOW_TO_LOBBY"
      class="how-to-lobby__layout"
      :show-go-back="true"
      :go-back-route="routeNames.HELP_SECTION"
    >
      <div class="how-to-lobby__section how-to-lobby__section--bottom">
        <div class="how-to-lobby__bottom-content">
          <div class="how-to-lobby__games">
            <div class="how-to-lobby__game-wrapper how-to-lobby__game-wrapper--kino">
              <GameCard :theme="'kino'" :buttonText="$t('learnAboutKino')" :to="routeNames.KINO_VIDEOS" />
            </div>
            <div class="how-to-lobby__game-wrapper how-to-lobby__game-wrapper--powerspin">
              <GameCard
                :theme="'powerspin'"
                :buttonText="$t('learnAboutPowerSpin')"
                :to="routeNames.POWERSPIN_VIDEOS"
              />
            </div>
          </div>
        </div>
      </div>
    </DigitalAssistantLayout>
  </div>
</template>

<script>
import DigitalAssistantLayout from '../DigitalAssistantLayout.vue';
import GameCard from '../GameCard.vue';
import fonts from '../fonts.css';
import Constants from '@/util/Constants';

export default {
  name: 'HowToLobby',
  components: {
    DigitalAssistantLayout,
    GameCard,
  },

  created() {
    this.videoNames = Constants.VIDEO_NAMES;
    this.routeNames = Constants.ROUTE_NAMES;
  },
};
</script>

<style lang="scss" scoped>
@import '@/scss-utils/digitalassistant/_mixins.scss';

.how-to-lobby {
  pointer-events: auto;

  * {
    font-family: 'Roboto Flex';
  }

  &__layout {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: relative;
    z-index: 10;
  }

  &__section {
    position: relative;

    &--bottom {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
    }

    @media (max-width: 1200px) {
      &--bottom {
        position: relative;
      }
    }
  }

  &__bottom-content {
    position: relative;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(12, 1fr);
    pointer-events: auto;
  }

  @media (max-width: 1200px) {
    &__bottom-content {
      display: flex;
      width: 100%;
      justify-content: center;
    }

    &__games {
      margin-top: 0 !important;
      padding: 20px;
      gap: 0;
      width: 100%;
    }
  }

  &__games {
    grid-column: 6 / 13;
    grid-row: 1 / 11;
    margin-top: 7.37rem;
    display: flex;
    justify-content: center;
    margin-top: 20%;
  }

  &__game-wrapper {
    height: var(--game-height);
    width: var(--game-width);
    border-radius: 40px;
    padding: 0.3125rem;
    display: flex;
    justify-content: center;
    position: relative;

    @media (max-width: 1200px) {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
