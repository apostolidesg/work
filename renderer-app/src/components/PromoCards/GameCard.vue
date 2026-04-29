<script setup>
import { computed, ref, watch } from 'vue';
import PriceButton from './PriceButton.vue';
import { useConfigText } from '../../composables/useConfigText';
import { PROMO_CARDS_CONFIG, getPriceButtonStyles } from '../../config/promoCardsConfig';
import resolveBackgroundImage from '@/util/resolveBackgroundImage';
import gaService from '@/services/gaService';
import gtmEvents from '@/constants/gtmEvents';

const props = defineProps({
  gameType: {
    type: String,
    required: true,
    validator: (v) => typeof v === 'string' && v.length > 0,
  },
  orientation: {
    type: String,
    default: '',
  },
  logoSrc: {
    type: String,
    required: true,
  },
  fallbackLogoSrc: {
    type: String,
    default: '',
  },
  logoAlt: {
    type: String,
    default: '',
  },
  jackpotAmount: {
    type: String,
    required: true,
  },
  priceOptions: {
    type: Array,
    required: true,
  },
  backgroundImage: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['select-slip', 'select-numbers']);
const { tConfig } = useConfigText();

const currentLogoSrc = ref(props.logoSrc);
watch(
  () => props.logoSrc,
  (value) => {
    currentLogoSrc.value = value;
  }
);
const handleLogoError = () => {
  if (!props.fallbackLogoSrc) return;
  if (currentLogoSrc.value === props.fallbackLogoSrc) return;
  currentLogoSrc.value = props.fallbackLogoSrc;
};
const cardStyle = computed(() => {
  const backgroundImage = resolveBackgroundImage(props.backgroundImage);
  return {
    maxWidth: PROMO_CARDS_CONFIG.layout.portraitMaxWidth,
    minWidth: '0',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    backgroundImage: backgroundImage || undefined,
    backgroundSize: backgroundImage ? 'cover' : undefined,
    backgroundPosition: backgroundImage ? 'center' : undefined,
    backgroundRepeat: backgroundImage ? 'no-repeat' : undefined,
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    opacity: props.disabled ? 0.6 : 1,
    pointerEvents: props.disabled ? 'none' : 'auto',
  };
});
const jackpotStyle = computed(() => ({
  fontFamily: PROMO_CARDS_CONFIG.styles.jackpot.fontFamily,
  color: '#000',
}));
const priceButtonBorderColor = computed(() => {
  const styles = getPriceButtonStyles(props.gameType);
  return styles?.borderColor || '';
});
const selectNumbersButtonOuterStyle = computed(() => ({
  background: PROMO_CARDS_CONFIG.styles.selectNumbersButton.landscape.background,
  borderColor: PROMO_CARDS_CONFIG.styles.selectNumbersButton.landscape.border,
}));
const selectNumbersButtonInnerStyle = computed(() => ({
  background: 'transparent',
  fontFamily: PROMO_CARDS_CONFIG.styles.selectNumbersButton.text.fontFamily,
  color: PROMO_CARDS_CONFIG.styles.selectNumbersButton.landscape.textColor || '#FFFFFF',
}));
const resolvedPriceOptions = computed(() => props.priceOptions);

const handleSlipSelect = (amount, columns) => {
  emit('select-slip', amount, columns);
};
const handleNumbersSelect = () => {
  if (!props.disabled) {
    emit('select-numbers', 1);
    gaService.sendEvent(gtmEvents.SSBT_DGE_APPLICATION_OPEN_SLIP_MODAL, {
      method: 'opening_slip_modal_from_select_numbers_button',
    });
  }
};
</script>
<template>
  <article
    class="promo-card atw:flex atw:w-full atw:max-w-[455px] atw:flex-1 atw:flex-col atw:items-center atw:rounded-xl atw:border atw:border-white/30 atw:p-[21px] atw:text-center atw:shadow-[0_4px_16px_rgba(0,0,0,0.1)]"
    :style="cardStyle"
    :aria-labelledby="`${gameType}-card-title`"
    :aria-disabled="disabled">
    <div class="atw:mb-6">
      <img
        :src="currentLogoSrc"
        :alt="logoAlt || gameType"
        class="atw:h-16 atw:w-auto"
        loading="lazy"
        decoding="async"
        @error="handleLogoError" />
    </div>
    <p
      :id="`${gameType}-card-title`"
      class="atw:mb-6 atw:text-[70px] atw:font-bold atw:leading-[84px] atw:portrait:text-[clamp(36px,6.8vw,64px)] atw:portrait:leading-[clamp(44px,8vw,72px)] atw:portrait:tracking-[-0.02em]"
      :style="jackpotStyle"
      :aria-label="tConfig('promo.a11y.jackpotAmount')">
      {{ jackpotAmount }}
    </p>

    <h2
      class="atw:mb-[22px] atw:text-2xl atw:font-bold atw:leading-[36px] atw:text-[#1d4757] atw:portrait:text-[clamp(18px,4.6vw,24px)] atw:portrait:leading-[clamp(24px,5.6vw,32px)]">
      {{ tConfig(`LOBBY.EASY.VERTICAL.JACKPOT_GAMES_AREA.${gameType.toUpperCase()}.READY_BETSLIPS_TEXT`) }}
    </h2>
    <div
      class="atw:mb-6 atw:flex atw:gap-2 atw:px-6 atw:portrait:flex-wrap atw:portrait:justify-center atw:portrait:gap-3 atw:portrait:px-2"
      role="group"
      :aria-label="tConfig('promo.a11y.slipOptions')">
      <PriceButton
        v-for="(option, index) in resolvedPriceOptions"
        :key="`${gameType}-${option.amount}-${option.columns}-${index}`"
        :game-type="gameType"
        :index="index"
        :orientation="orientation"
        :label="option.label ?? option.columns"
        :description="option.description || ''"
        :hide-label-in-description="String(gameType || '').toLowerCase() === 'tzoker' && index === 2"
        :amount="option.amount"
        :columns="option.columns"
        :border-color="priceButtonBorderColor"
        variant="landscape"
        :fluid="true"
        :disabled="disabled"
        @select="handleSlipSelect(option.amount, option.columns)" />
    </div>
    <p
      class="atw:mb-[22px] atw:text-2xl atw:font-bold atw:leading-[36px] atw:text-[#1d4757] atw:portrait:text-[clamp(18px,4.6vw,24px)] atw:portrait:leading-[clamp(24px,5.6vw,32px)]"
      aria-hidden="true">
      {{ tConfig('common.or') }}
    </p>
    <button
      type="button"
      class="atw:h-16 atw:w-full atw:max-w-[413px] atw:rounded-xl atw:border-2 atw:p-[2px] atw:transition-opacity"
      :class="{ 'atw:cursor-not-allowed atw:opacity-60': disabled, 'atw:hover:opacity-90': !disabled }"
      :style="selectNumbersButtonOuterStyle"
      :disabled="disabled"
      :aria-label="tConfig('promo.a11y.selectYourNumbers')"
      @click="handleNumbersSelect">
      <div
        class="promo-card__select-inner atw:flex atw:h-full atw:w-full atw:items-center atw:justify-center atw:rounded-[10px] atw:text-center atw:text-2xl atw:font-semibold atw:leading-[36px] atw:portrait:text-[clamp(18px,4.6vw,24px)] atw:portrait:leading-[1.2]"
        :style="selectNumbersButtonInnerStyle">
        {{ tConfig(`LOBBY.EASY.VERTICAL.JACKPOT_GAMES_AREA.${gameType.toUpperCase()}.MANUAL_BETSLIP_BUTTON_TEXT`) }}
      </div>
    </button>
  </article>
</template>

<style scoped></style>
