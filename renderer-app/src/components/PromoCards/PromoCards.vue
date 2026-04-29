<script setup>
import PromoCardsPortrait from './PromoCardsPortrait.vue';
import PromoCardsLandscape from './PromoCardsLandscape.vue';
import { useLobbyPromoConfig } from '../../composables/useLobbyPromoConfig';

import fallbackWheelImage from '../../assets/images/wheel-new.png';

const emit = defineEmits(['open-slip-modal']);

const { portraitGames, landscapeGames, portraitPromotionalImage, landscapePromotionalImage } = useLobbyPromoConfig();

const fallbackWheelSrc = fallbackWheelImage;

const handleSlipSelection = (amount, columns) => {
  emit('open-slip-modal', amount, columns);
};

const handleNumberSelection = (amount) => {
  emit('open-slip-modal', amount);
};
</script>

<template>
  <div class="promo-cards">
    <PromoCardsPortrait
      class="atw:landscape:hidden"
      :games="portraitGames"
      :wheel-src="portraitPromotionalImage"
      :fallback-wheel-src="fallbackWheelSrc"
      @select-slip="handleSlipSelection"
      @select-numbers="handleNumberSelection" />

    <PromoCardsLandscape
      class="atw:portrait:hidden"
      :games="landscapeGames"
      :wheel-src="landscapePromotionalImage"
      :fallback-wheel-src="fallbackWheelSrc"
      @select-slip="handleSlipSelection"
      @select-numbers="handleNumberSelection" />
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.promo-cards {
  @apply atw:w-full atw:relative atw:portrait:flex atw:portrait:items-center atw:portrait:justify-center atw:portrait:px-4 atw:landscape:flex atw:landscape:items-stretch atw:landscape:h-[calc(100vh-100px)];
}
</style>
