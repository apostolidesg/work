<script setup>
import { computed } from 'vue';
import AnimatedWheel from './AnimatedWheel.vue';
import FortuneCookieCard from './FortuneCookie/FortuneCookieCard.vue';
import PriceButton from './PriceButton.vue';
import { useConfigText } from '../../composables/useConfigText';
import resolveBackgroundImage from '../../util/resolveBackgroundImage';
import { PROMO_CARDS_CONFIG } from '../../config/promoCardsConfig';

import tzokerLogo from '../../assets/logos/tzoker-logo.png';
import euroJackpotLogo from '../../assets/logos/eurojackpot-logo.png';
import gaService from '@/services/gaService';
import gtmEvents from '@/constants/gtmEvents';

const props = defineProps({
  tabs: {
    type: Array,
    default: () => [],
  },
  activeTab: {
    type: String,
    default: '',
  },
  activeGame: {
    type: Object,
    default: null,
  },
  manualButtonText: {
    type: [String, Object],
    default: () => '',
  },
  title: {
    type: String,
    default: '',
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

const emit = defineEmits(['select-tab', 'select-slip', 'select-numbers', 'submit-fortune']);

const { tConfig } = useConfigText();

const gameType = computed(() => props.activeGame?.id || '');

const getTabClasses = (index) => {
  const isFirst = index === 0;
  const isLast = index === props.tabs.length - 1;
  return {
    'game-card__tab--first': isFirst,
    'game-card__tab--last': isLast,
  };
};

const getTabStyle = (gameId) => ({
  background:
    props.activeTab === gameId ? PROMO_CARDS_CONFIG.styles.tabs.active : PROMO_CARDS_CONFIG.styles.tabs.inactive,
  borderColor: PROMO_CARDS_CONFIG.styles.tabs.border,
});

const containerStyle = computed(() => {
  const backgroundImage = resolveBackgroundImage(props.activeGame?.backgroundImage);
  if (!backgroundImage) return undefined;
  return {
    backgroundImage,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };
});

const getLogoSrc = (gameId) => {
  const key = `${gameId}Logo`;
  return PROMO_CARDS_CONFIG.assets?.[key] || (gameId === 'tzoker' ? tzokerLogo : euroJackpotLogo);
};

const getCookieLogoSrc = (gameId) => {
  if (gameId === 'tzoker') return tzokerLogo;
  if (gameId === 'eurojackpot') return euroJackpotLogo;
  return getLogoSrc(gameId);
};

const handleTabLogoError = (event, gameId) => {
  const fallback = gameId === 'tzoker' ? tzokerLogo : euroJackpotLogo;
  if (event?.target && fallback) {
    event.target.src = fallback;
  }
};

const getPriceButtonBorder = (gameId) => {
  return PROMO_CARDS_CONFIG.styles.priceButton?.[gameId]?.border || '';
};

const selectNumbersButtonClasses = computed(() => ({
  'game-card__select-btn--enabled': !props.activeGame?.disabled,
  'game-card__select-btn--disabled': props.activeGame?.disabled,
}));

const selectNumbersButtonStyle = computed(() => ({
  background: PROMO_CARDS_CONFIG.styles.selectNumbersButton.landscape.background,
  borderColor: PROMO_CARDS_CONFIG.styles.selectNumbersButton.landscape.border,
  color: PROMO_CARDS_CONFIG.styles.selectNumbersButton.landscape.textColor || '#FFFFFF',
}));

const handleSelectNumbers = () => {
  if (!props.activeGame?.disabled) {
    emit('select-numbers', 1);
  }
  gaService.sendEvent(gtmEvents.SSBT_DGE_APPLICATION_OPEN_SLIP_MODAL, {
    method: 'opening_slip_modal_from_select_numbers_button',
  });
};

const handleFortuneSubmit = (payload) => {
  emit('submit-fortune', payload);
};

const selectTab = (gameId) => {
  emit('select-tab', gameId);
  gaService.sendEvent(gtmEvents.SSBT_DGE_APPLICATION_TAB_SELECTED, {
    game_type: gameId,
  });
};
</script>

<template>
  <div class="game-card" style="height: min(90%, calc(100vh - 120px))">
    <div class="game-card__container" :style="containerStyle">
      <div class="game-card__wheel" aria-hidden="true">
        <AnimatedWheel :size="200" :src="wheelSrc" :fallback-src="fallbackWheelSrc" />
      </div>

      <div class="game-card__header">
        <h2
          class="game-card__promo-text"
          v-text="tConfig('LOBBY.EASY.HORIZONTAL.JACKPOT_GAMES_AREA.PROMOTIONAL_TEXT')" />
      </div>

      <div class="game-card__tabs" role="tablist" :aria-label="tConfig('promo.a11y.selectGame')">
        <button
          v-for="(game, index) in tabs"
          :key="game.id"
          type="button"
          role="tab"
          class="game-card__tab"
          :class="getTabClasses(index)"
          :style="getTabStyle(game.id)"
          :aria-selected="activeTab === game.id"
          :aria-controls="`tabpanel-${game.id}`"
          :tabindex="activeTab === game.id ? 0 : -1"
          @click="selectTab(game.id)">
          <img
            :src="getLogoSrc(game.id)"
            :alt="tConfig(`promo.${game.id}Logo`)"
            class="game-card__tab-logo"
            loading="lazy"
            decoding="async"
            @error="handleTabLogoError($event, game.id)" />
        </button>
      </div>

      <template v-if="activeGame">
        <div
          :id="`tabpanel-${activeGame.id}`"
          role="tabpanel"
          :aria-labelledby="`tab-${activeGame.id}`"
          class="game-card__panel">
          <div class="game-card__label">
            {{ tConfig(`LOBBY.EASY.HORIZONTAL.JACKPOT_GAMES_AREA.${gameType.toUpperCase()}.JACKPOT_TEXT`) }}
          </div>

          <div class="game-card__jackpot-amount">
            <span>{{ activeGame.jackpotAmount }}</span>
          </div>

          <div class="game-card__label">
            {{ tConfig(`LOBBY.EASY.HORIZONTAL.JACKPOT_GAMES_AREA.${gameType.toUpperCase()}.READY_BETSLIPS_TEXT`) }}
          </div>

          <div class="game-card__price-buttons">
            <PriceButton
              v-for="(option, index) in activeGame.priceOptions"
              :key="`${gameType}-${option.amount}-${option.columns}-${index}`"
              :game-type="gameType"
              :index="index"
              :label="option.label != null ? tConfig(option.label) : ''"
              :description-label="option.descriptionLabel ? tConfig(option.descriptionLabel) : ''"
              :description="option.description ? tConfig(option.description) : ''"
              :hide-label-in-description="String(gameType || '').toLowerCase() === 'tzoker' && index === 2"
              :amount="option.amount"
              :columns="option.columns"
              :border-color="getPriceButtonBorder(gameType)"
              :compact="true"
              :fluid="true"
              variant="landscape"
              :disabled="activeGame.disabled"
              @select="emit('select-slip', option.amount, option.columns)" />
          </div>

          <div class="game-card__label">
            {{ tConfig('common.or') }}
          </div>

          <button
            type="button"
            class="game-card__select-btn"
            :class="selectNumbersButtonClasses"
            :style="selectNumbersButtonStyle"
            :aria-label="tConfig('promo.a11y.selectYourNumbers')"
            :disabled="activeGame.disabled"
            :aria-disabled="activeGame.disabled"
            @click="handleSelectNumbers">
            {{
              tConfig(`LOBBY.EASY.HORIZONTAL.JACKPOT_GAMES_AREA.${gameType.toUpperCase()}.MANUAL_BETSLIP_BUTTON_TEXT`)
            }}
          </button>

          <FortuneCookieCard
            :game-type="activeGame.id"
            :logo-src="getCookieLogoSrc(activeGame.id)"
            :disabled="activeGame.disabled"
            @submit-slip="handleFortuneSubmit" />
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.game-card {
  @apply atw:hidden atw:landscape:flex atw:flex-col atw:gap-0 atw:w-[35%] atw:landscape:ml-[40px] atw:py-2;
}

.game-card__container {
  @apply atw:rounded-xl atw:flex atw:flex-col atw:items-center atw:justify-between atw:w-full atw:h-full atw:bg-[rgba(255,255,255,0.6)] atw:backdrop-blur-[10px] atw:border atw:border-white atw:p-[48px] atw:[@media(max-height:900px)]:p-[20px] atw:text-center atw:shadow-[0px_4px_16px_rgba(0,0,0,0.1)] atw:overflow-hidden atw:relative;
}

.game-card__wheel {
  @apply atw:pointer-events-none atw:absolute atw:z-0 atw:h-[200px] atw:w-[200px] atw:shrink-0 atw:right-[-80px] atw:top-[-50px];
}

.game-card__header {
  @apply atw:flex atw:items-center atw:justify-start atw:gap-3 atw:shrink-0 atw:text-center atw:relative atw:z-[1] atw:w-full;
}

.game-card__promo-text {
  @apply atw:text-center atw:font-medium atw:block atw:text-[clamp(18px,2.5vh,32px)] atw:whitespace-pre-line atw:text-primary atw:w-full;
}

.game-card__tabs {
  @apply atw:flex atw:gap-0 atw:w-full atw:relative atw:z-[1];
}

.game-card__tab {
  @apply atw:flex-1 atw:transition-all atw:flex atw:items-center atw:justify-center atw:h-[clamp(52px,6vh,80px)] atw:border-t-2 atw:border-b-2 atw:cursor-pointer atw:p-0;
}

.game-card__tab--first {
  @apply atw:border-l-2 atw:border-r-0 atw:rounded-tl-[12px] atw:rounded-bl-[12px];
}

.game-card__tab--last {
  @apply atw:border-r-2 atw:border-l-0 atw:rounded-tr-[12px] atw:rounded-br-[12px];
}

.game-card__tab-logo {
  @apply atw:h-[clamp(28px,4vh,50px)] atw:w-auto;
}

.game-card__panel {
  @apply atw:w-full atw:flex atw:flex-col atw:items-center atw:justify-between atw:flex-1 atw:relative atw:z-[1];
}

.game-card__label {
  @apply atw:text-[clamp(11px,1.5vh,14px)] atw:font-medium atw:text-primary;
}
.game-card__jackpot-amount {
  @apply atw:text-[clamp(36px,5vh,62px)] atw:font-bold atw:text-jackpotAmountColor;
}

.game-card__price-buttons {
  @apply atw:flex atw:w-full atw:gap-4 atw:justify-between;
}

.game-card__select-btn {
  @apply atw:w-full atw:min-h-[44px] atw:h-[clamp(44px,5.5vh,70px)] atw:rounded-xl atw:border-2 atw:text-[clamp(14px,2vh,26px)] atw:font-semibold atw:text-center atw:text-white atw:transition-opacity;
}

.game-card__select-btn--enabled {
  @apply atw:hover:opacity-90;
}

.game-card__select-btn--disabled {
  @apply atw:cursor-not-allowed atw:pointer-events-none atw:opacity-60;
}
</style>
