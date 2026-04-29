<script setup>
import GameCard from './GameCard.vue';
import AnimatedWheel from './AnimatedWheel.vue';
import { useConfigText } from '../../composables/useConfigText';

import tzokerLogo from '../../assets/logos/tzoker-logo.png';
import euroJackpotLogo from '../../assets/logos/eurojackpot-logo.png';

import Constants from '@/util/Constants';

defineProps({
  games: {
    type: Array,
    required: true,
  },
  wheelSrc: {
    type: String,
    default: '',
  },
  fallbackWheelSrc: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['select-slip', 'select-numbers']);

const { tConfig } = useConfigText();

const getLogoSrc = (gameId) => {
  return gameId === Constants.GAME_LOGOS.TZOKER ? tzokerLogo : euroJackpotLogo;
};

const handleSlipSelection = (amount, columns) => {
  emit('select-slip', amount, columns);
};

const handleNumberSelection = (amount) => {
  emit('select-numbers', amount);
};
</script>

<template>
  <div class="atw:flex atw:flex-col atw:items-center atw:justify-center atw:w-full">
    <div
      class="atw:relative atw:mb-8 atw:flex atw:items-center atw:justify-center atw:gap-12 atw:portrait:gap-6 atw:portrait:mt-[-12px] atw:portrait:mb-6">
      <h1
        class="atw:text-center atw:font-bold atw:text-[60px] atw:text-secondary atw:text-white"
        v-text="tConfig('LOBBY.EASY.VERTICAL.JACKPOT_GAMES_AREA.PROMOTIONAL_TEXT')" />

      <div
        class="atw:pointer-events-none atw:absolute atw:z-0 atw:h-[300px] atw:w-[300px] atw:shrink-0 atw:right-[-150px] atw:top-[-20px] atw:portrait:top-[40px]"
        aria-hidden="true">
        <AnimatedWheel :size="300" :src="wheelSrc" :fallback-src="fallbackWheelSrc" />
      </div>
    </div>

    <div
      class="atw:relative atw:flex atw:justify-center atw:gap-6 atw:flex-wrap atw:portrait:flex-row atw:portrait:justify-center atw:portrait:gap-4 atw:portrait:w-full atw:portrait:mx-auto atw:portrait:mt-[-8px]"
      role="list"
      :aria-label="tConfig('promo.a11y.availableGames')">
      <GameCard
        v-for="game in games"
        :key="game.id"
        role="listitem"
        class="atw:relative atw:z-10 atw:portrait:w-[calc(50%-8px)] atw:portrait:flex-[0_0_calc(50%-8px)] atw:portrait:max-w-none atw:portrait:min-w-0"
        :game-type="game.id"
        :jackpot-amount="game.jackpotAmount"
        :price-options="game.priceOptions"
        :background-image="game.backgroundImage"
        :orientation="'vertical'"
        :logo-src="getLogoSrc(game.id)"
        :fallback-logo-src="getLogoSrc(game.id)"
        :logo-alt="tConfig(`promo.${game.id}LogoAlt`)"
        :disabled="game.disabled"
        @select-slip="handleSlipSelection"
        @select-numbers="handleNumberSelection" />
    </div>
  </div>
</template>

<style scoped></style>
