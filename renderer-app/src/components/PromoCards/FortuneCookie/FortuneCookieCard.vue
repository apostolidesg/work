<script setup>
import { ref } from 'vue';
import FortuneCookieButton from './FortuneCookieButton.vue';
import FortuneCookieCracked from './FortuneCookieCracked.vue';
import FortuneNumbersDisplay from './FortuneNumbersDisplay.vue';
import FortuneRetryButton from './FortuneRetryButton.vue';
import { useConfigText } from '@/composables/useConfigText';
import { useFortuneCookie } from '@/composables/useFortuneCookie';
import { GAME_RULES } from '@/config/fortuneCookieConfig';

const props = defineProps({
  gameType: {
    type: String,
    required: true,
    validator: (value) => {
      const normalized = String(value).toLowerCase();
      return Object.keys(GAME_RULES).includes(normalized) || normalized === '';
    },
  },
  logoSrc: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['submit-slip']);

const { tConfig } = useConfigText();

const cookieButtonRef = ref(null);
const numbersDisplayRef = ref(null);
const retryButtonRef = ref(null);
const liveRegionRef = ref(null);

const {
  isCracked,
  mainNumbers,
  bonusNumbers,
  isAnimating,
  announcement,
  normalizedGameType,
  isEurojackpot,
  bonusLabel,
  resolvedLogoSrc,
  logoAltText,
  resolvedPromotionImage,
  containerStyle,
  handleCrackCookie,
  handleReset,
  handleSubmit,
} = useFortuneCookie(props, emit, {
  cookieButtonRef,
  numbersDisplayRef,
  retryButtonRef,
  liveRegionRef,
});
</script>

<template>
  <div
    class="atw:rounded-xl atw:mt-[10px] atw:h-[200px] atw:p-[20px_24px] atw:flex atw:flex-row atw:flex-nowrap atw:justify-between atw:gap-6 atw:items-center atw:border-2 atw:border-[#27E2CC] atw:shadow-[0_8px_24px_rgba(212,165,116,0.3)] atw:[--cookie-size:145px] atw:max-[1600px]:[--cookie-size:110px] atw:max-[1600px]:h-[165px] atw:max-[1600px]:p-[12px_14px] atw:max-[1600px]:gap-3 atw:[@media(max-height:900px)]:[--cookie-size:100px] atw:[@media(max-height:900px)]:h-[155px] atw:[@media(max-height:900px)]:p-[8px_10px] atw:[@media(max-height:900px)]:gap-2 atw:[@media(max-height:900px)]:mt-0 atw:max-[1500px]:flex-wrap atw:max-[1500px]:gap-4 atw:max-[1500px]:h-auto"
    :style="containerStyle"
    role="region"
    :aria-label="tConfig('promo.a11y.fortuneCardRegion')"
    :aria-busy="isAnimating">
    <div ref="liveRegionRef" class="atw:sr-only" aria-live="polite" aria-atomic="true">
      {{ announcement }}
    </div>

    <div
      class="atw:flex atw:flex-col atw:items-start atw:justify-center atw:gap-1 atw:flex-[1_1_50%] atw:min-w-[220px] atw:max-w-[50%] atw:max-[1500px]:flex-[1_1_100%] atw:max-[1500px]:max-w-full atw:[@media(max-height:900px)]:gap-0">
      <div class="atw:flex-[0_0_auto] atw:-mt-2">
        <img
          :src="resolvedLogoSrc"
          :alt="logoAltText"
          class="atw:h-[48px] atw:w-auto atw:drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)] atw:max-[1600px]:h-[44px] atw:[@media(max-height:900px)]:h-[40px]"
          loading="lazy"
          decoding="async" />
      </div>

      <div v-if="!isCracked" class="atw:text-left atw:-mt-1">
        <h2
          class="atw:w-full atw:text-[14px] atw:font-medium atw:text-white atw:leading-[1.3] atw:drop-shadow-[1px_1px_3px_rgba(0,0,0,0.5)] atw:whitespace-pre-line atw:font-[Roboto_Flex] atw:opacity-90 atw:max-[1600px]:text-[12px] atw:[@media(max-height:900px)]:text-[10px]">
          {{ tConfig(`LOBBY.EASY.HORIZONTAL.JACKPOT_GAMES_AREA.${gameType.toUpperCase()}.PROMOTION.TITLE`) }}
        </h2>
      </div>

      <FortuneNumbersDisplay
        v-else-if="mainNumbers.length > 0"
        ref="numbersDisplayRef"
        :main-numbers="mainNumbers"
        :bonus-numbers="bonusNumbers"
        :game-type="normalizedGameType"
        :bonus-label="bonusLabel"
        :title="tConfig(`LOBBY.EASY.HORIZONTAL.JACKPOT_GAMES_AREA.${gameType.toUpperCase()}.PROMOTION.NUMBERS_TEXT`)"
        :submit-text="
          tConfig(`LOBBY.EASY.HORIZONTAL.JACKPOT_GAMES_AREA.${gameType.toUpperCase()}.PROMOTION.SUBMIT_BUTTON_TEXT`)
        "
        :submit-aria-label="tConfig('promo.a11y.submitNumbers')"
        :disabled="disabled"
        @submit="handleSubmit" />
    </div>

    <div
      class="atw:flex atw:flex-col atw:items-center atw:justify-center atw:gap-[2px] atw:flex-[0_0_auto] atw:min-w-[180px] atw:max-[1600px]:min-w-[150px] atw:[@media(max-height:900px)]:min-w-[140px] atw:max-[1500px]:w-full atw:max-[1500px]:flex-[1_1_180px]"
      :class="{ 'atw:pl-4': isEurojackpot && isCracked }">
      <div class="atw:flex-1 atw:flex atw:items-center atw:justify-center">
        <FortuneCookieButton
          v-if="!isCracked"
          ref="cookieButtonRef"
          :action-text="
            tConfig(`LOBBY.EASY.HORIZONTAL.JACKPOT_GAMES_AREA.${gameType.toUpperCase()}.PROMOTION.ACTION_BUTTON_TEXT`)
          "
          :aria-label="isAnimating ? tConfig('promo.a11y.cookieCracking') : tConfig('promo.a11y.cookieIdle')"
          :background-image="resolvedPromotionImage"
          :disabled="disabled || isAnimating"
          @crack="handleCrackCookie" />

        <FortuneCookieCracked
          v-else
          :fortune-message="
            tConfig(`LOBBY.EASY.HORIZONTAL.JACKPOT_GAMES_AREA.${gameType.toUpperCase()}.PROMOTION.FORTUNE_MESSAGE`)
          " />
      </div>

      <FortuneRetryButton
        v-if="isCracked && mainNumbers.length > 0"
        ref="retryButtonRef"
        :text="
          tConfig(`LOBBY.EASY.HORIZONTAL.JACKPOT_GAMES_AREA.${gameType.toUpperCase()}.PROMOTION.RETRY_BUTTON_TEXT`)
        "
        :aria-label="tConfig('promo.a11y.tryAgain')"
        @retry="handleReset" />
    </div>
  </div>
</template>

<style scoped>
.atw\:sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
