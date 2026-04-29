import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue';
import { useLobbyPromoConfig, getGameKey } from '@/composables/useLobbyPromoConfig';
import { useConfigText } from '@/composables/useConfigText';
import { PROMO_CARDS_CONFIG } from '@/config/promoCardsConfig';
import resolveBackgroundImage from '@/util/resolveBackgroundImage';
import cookieBG from '@/assets/images/cookieBG.jpg';
import {
  DEFAULT_GAME_TYPE,
  getGameRules,
  ANIMATION_TIMING,
  DEFAULT_FORTUNE_MESSAGES,
  FALLBACK_FORTUNE_MESSAGE,
  generateLotteryNumbers,
  formatNumbersForAnnouncement,
} from '@/config/fortuneCookieConfig';

export const useFortuneCookie = (props, emit, refs = {}) => {
  const { tConfig } = useConfigText();
  const { horizontalJackpot, resolveAsset } = useLobbyPromoConfig();

  const cookieButtonRef = refs.cookieButtonRef || ref(null);
  const numbersDisplayRef = refs.numbersDisplayRef || ref(null);
  const retryButtonRef = refs.retryButtonRef || ref(null);
  const liveRegionRef = refs.liveRegionRef || ref(null);

  const isCracked = ref(false);
  const fortuneMessage = ref('');
  const mainNumbers = ref([]);
  const bonusNumbers = ref([]);
  const isAnimating = ref(false);
  const announcement = ref('');
  const timeoutIds = ref([]);

  const normalizedGameType = computed(() => String(props.gameType || DEFAULT_GAME_TYPE).toLowerCase());
  const gameRules = computed(() => getGameRules(normalizedGameType.value));
  const isEurojackpot = computed(() => normalizedGameType.value === 'eurojackpot');

  const promoPath = computed(() => `HORIZONTAL.JACKPOT_GAMES_AREA.${String(props.gameType).toUpperCase()}.PROMOTION`);

  const bonusLabel = computed(() => tConfig(gameRules.value.bonusLabelKey));

  const displayTitle = computed(
    () =>
      tConfig(`${promoPath.value}.TITLE`) ||
      tConfig(normalizedGameType.value === 'tzoker' ? 'promo.fortuneCookieTzoker' : 'promo.fortuneCookie')
  );

  const fortuneDescription = computed(
    () =>
      tConfig(`${promoPath.value}.DESCRIPTION`) || tConfig(`${promoPath.value}.TITLE`) || tConfig('promo.fortuneText')
  );

  const findConfigKey = (config, gameId) => {
    if (!config || typeof config !== 'object') return null;
    const target = String(getGameKey(gameId)).toLowerCase();
    for (const key of Object.keys(config)) {
      if (['ORDER', 'PROMOTIONAL_TEXT', 'PROMOTIONAL_IMAGE'].includes(key)) continue;
      if (String(key).toLowerCase() === target) return key;
    }
    return null;
  };

  const configGame = computed(() => {
    const key = findConfigKey(horizontalJackpot.value, props.gameType);
    return key ? horizontalJackpot.value?.[key] || {} : {};
  });

  const promotion = computed(() => configGame.value?.PROMOTION || {});
  const fallbackPromotion = computed(() => PROMO_CARDS_CONFIG.games?.[normalizedGameType.value]?.promotion || {});

  const fortuneMessages = computed(() => {
    const cmsMessages = promotion.value?.MESSAGES || promotion.value?.FORTUNE_MESSAGES;
    if (Array.isArray(cmsMessages) && cmsMessages.length) {
      return cmsMessages.map((msg) => tConfig(msg));
    }
    const cmsText = promotion.value?.TEXT;
    if (cmsText) return [tConfig(cmsText)];

    const fbMessages = fallbackPromotion.value?.MESSAGES || fallbackPromotion.value?.FORTUNE_MESSAGES;
    if (Array.isArray(fbMessages) && fbMessages.length) {
      return fbMessages.map((msg) => tConfig(msg));
    }
    const fbText = fallbackPromotion.value?.TEXT;
    if (fbText) return [tConfig(fbText)];

    return DEFAULT_FORTUNE_MESSAGES.map((msg) => tConfig(msg));
  });

  const resolvedLogoSrc = computed(() => {
    if (props.logoSrc) return props.logoSrc;
    const key = `${normalizedGameType.value}Logo`;
    return PROMO_CARDS_CONFIG.assets?.[key] || '';
  });

  const logoAltText = computed(() => `${props.gameType} logo`.trim());

  const resolvedPromotionImage = computed(
    () => resolveAsset(promotion.value?.IMAGE) || resolveAsset(fallbackPromotion.value?.IMAGE) || cookieBG
  );

  const resolvedCookieImage = computed(
    () => resolveAsset(promotion.value?.IMAGE) || resolveAsset(fallbackPromotion.value?.IMAGE)
  );

  const containerStyle = computed(() => ({
    backgroundImage: resolveBackgroundImage(resolvedPromotionImage.value),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    fontFamily: "'Roboto Flex', sans-serif",
  }));

  const regionLabel = computed(() => tConfig('promo.a11y.fortuneCardRegion'));
  const cookieButtonLabel = computed(() =>
    isAnimating.value ? tConfig('promo.a11y.cookieCracking') : tConfig('promo.a11y.cookieIdle')
  );
  const submitButtonLabel = computed(() => tConfig('promo.a11y.submitNumbers'));
  const retryButtonLabel = computed(() => tConfig('promo.a11y.tryAgain'));

  const clearTimers = () => {
    timeoutIds.value.forEach((id) => clearTimeout(id));
    timeoutIds.value = [];
  };

  const scheduleTimeout = (callback, delay) => {
    const id = setTimeout(callback, delay);
    timeoutIds.value.push(id);
    return id;
  };

  const announce = (message) => {
    announcement.value = '';
    nextTick(() => {
      announcement.value = message;
    });
  };

  const announceNumbersRevealed = (main, bonus) => {
    const mainFormatted = formatNumbersForAnnouncement(main);
    const bonusFormatted = formatNumbersForAnnouncement(bonus);
    announce(`Lucky numbers: ${mainFormatted}. Bonus: ${bonusFormatted}`);
  };

  const announceFortuneRevealed = (fortune) => {
    announce(`Fortune cookie cracked! ${fortune}`);
  };

  const announceReset = () => {
    announce(tConfig('promo.a11y.numbersReset'));
  };

  const getRandomFortune = () => {
    const messages = fortuneMessages.value;
    if (!messages?.length) return FALLBACK_FORTUNE_MESSAGE;
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const handleCrackCookie = () => {
    if (isAnimating.value || props.disabled) return;

    clearTimers();
    isAnimating.value = true;
    isCracked.value = true;

    const { mainNumbers: newMain, bonusNumbers: newBonus } = generateLotteryNumbers(normalizedGameType.value);
    const fortune = getRandomFortune();

    scheduleTimeout(() => {
      fortuneMessage.value = fortune;
      announceFortuneRevealed(fortune);
    }, ANIMATION_TIMING.fortuneMessageDelay);

    scheduleTimeout(() => {
      mainNumbers.value = newMain;
      bonusNumbers.value = newBonus;
      isAnimating.value = false;

      announceNumbersRevealed(newMain, newBonus);

      nextTick(() => {
        numbersDisplayRef.value?.focus();
      });
    }, ANIMATION_TIMING.numbersRevealDelay);
  };

  const handleReset = () => {
    clearTimers();

    isCracked.value = false;
    fortuneMessage.value = '';
    mainNumbers.value = [];
    bonusNumbers.value = [];
    isAnimating.value = false;

    announceReset();

    nextTick(() => {
      cookieButtonRef.value?.focus();
    });
  };

  const handleSubmit = () => {
    if (!mainNumbers.value.length || props.disabled) return;

    emit?.('submit-slip', {
      gameType: props.gameType,
      mainNumbers: [...mainNumbers.value],
      bonusNumbers: [...bonusNumbers.value],
    });
  };

  watch(
    () => props.gameType,
    () => {
      handleReset();
    }
  );

  onBeforeUnmount(() => {
    clearTimers();
  });

  return {
    cookieButtonRef,
    numbersDisplayRef,
    retryButtonRef,
    liveRegionRef,
    isCracked,
    fortuneMessage,
    mainNumbers,
    bonusNumbers,
    isAnimating,
    announcement,
    normalizedGameType,
    isEurojackpot,
    bonusLabel,
    resolvedLogoSrc,
    logoAltText,
    displayTitle,
    fortuneDescription,
    resolvedCookieImage,
    resolvedPromotionImage,
    containerStyle,
    regionLabel,
    cookieButtonLabel,
    submitButtonLabel,
    retryButtonLabel,
    handleCrackCookie,
    handleReset,
    handleSubmit,
  };
};
