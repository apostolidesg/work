export const GAME_RULES = {
  tzoker: {
    mainCount: 5,
    mainMax: 45,
    bonusCount: 1,
    bonusMax: 20,
    bonusLabelKey: 'promo.tzokerLabel',
    bonusLabelFallback: 'Tzoker',
  },
  eurojackpot: {
    mainCount: 5,
    mainMax: 50,
    bonusCount: 2,
    bonusMax: 12,
    bonusLabelKey: 'promo.euroLabel',
    bonusLabelFallback: 'Euro',
  },
};

export const DEFAULT_GAME_TYPE = 'tzoker';

export const getGameRules = (gameType) => {
  const normalizedType = String(gameType || '').toLowerCase();
  return GAME_RULES[normalizedType] || GAME_RULES[DEFAULT_GAME_TYPE];
};

export const ANIMATION_TIMING = {
  fortuneMessageDelay: 400,
  numbersRevealDelay: 800,
  mainBallBaseDelay: 1.2,
  mainBallStagger: 0.1,
  bonusBallBaseDelay: 1.7,
  bonusBallStagger: 0.1,
  fadeInDuration: 0.5,
  popInDuration: 0.4,
};

export const FORTUNE_COOKIE_STYLES = {
  containerBorder: '#27E2CC',
  containerShadow: '0 8px 24px rgba(212, 165, 116, 0.3)',

  cookie: {
    background: 'linear-gradient(145deg, #FFE87C 0%, #F4D03F 25%, #E8B84D 60%, #D4A574 100%)',
    borderRadius: '50% 50% 45% 45%',
    border: '4px solid #C89D68',
    boxShadow: [
      '0 8px 25px rgba(212, 165, 116, 0.6)',
      '0 15px 40px rgba(139, 90, 43, 0.3)',
      'inset 0 -8px 15px rgba(139, 90, 43, 0.25)',
      'inset 0 4px 8px rgba(255, 232, 124, 0.5)',
    ].join(', '),
  },

  submitButton: {
    background: [
      'linear-gradient(rgba(255, 255, 255, 0) 70.48%, rgb(81, 202, 136) 93.62%, rgba(255, 255, 255, 0) 100%)',
      'linear-gradient(rgba(0, 107, 255, 0) 0%, rgba(2, 83, 193, 0.01) 100%)',
      'rgb(0, 171, 77)',
    ].join(', '),
    border: '2px solid #00AB4D',
  },

  retryButton: {
    background: 'linear-gradient(135deg, #F4D03F 0%, #E8B84D 100%)',
    border: '2px solid #D4A574',
  },

  mainBall: {
    background: 'linear-gradient(135deg, #FFD93D 0%, #FFA502 100%)',
    border: '#D4A574',
    shadow: '0 3px 8px rgba(255, 165, 2, 0.4)',
  },

  bonusBall: {
    tzoker: {
      background: 'linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)',
      border: '#2C5F8D',
      shadow: '0 4px 12px rgba(74, 144, 226, 0.5)',
    },
    eurojackpot: {
      background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
      border: '#CC8400',
      shadow: '0 3px 10px rgba(255, 215, 0, 0.5)',
    },
  },

  fortunePaper: {
    background: 'linear-gradient(135deg, #FFFEF7 0%, #FFF9E6 100%)',
    border: '#D4A574',
    textColor: '#8B5A2B',
  },

  numbersCard: {
    background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,249,230,0.95) 100%)',
    border: '#D4A574',
    shadow: '0 4px 16px rgba(212, 165, 116, 0.3)',
    textColor: '#8B5A2B',
  },
};

export const RESPONSIVE_CONFIG = {
  cookieSize: {
    default: 145,
    maxWidth1600: 110,
    maxHeight900: 100,
  },
  containerHeight: {
    default: 200,
    maxWidth1600: 165,
    maxHeight900: 155,
  },
  breakpoints: {
    width1600: 1600,
    width1500: 1500,
    height900: 900,
  },
};

export const TEXT_KEYS = {
  numbersText: 'promo.fortune.numbersText',
  actionText: 'promo.fortune.actionText',
  submitText: 'promo.fortune.submitText',
  retryText: 'promo.fortune.retryText',
};

export const DEFAULT_FORTUNE_MESSAGES = [
  'promo.fortune.luckOnYourSide',
  'promo.fortune.surpriseAwaits',
  'promo.fortune.numbersAligned',
  'promo.fortune.favorsBold',
  'promo.fortune.luckyDay',
  'promo.fortune.greatThingsComing',
  'promo.fortune.starsHaveSpoken',
  'promo.fortune.destinyCalls',
];

export const FALLBACK_FORTUNE_MESSAGE = 'Good luck today!';

export const A11Y_LABELS = {
  cookieButton: {
    idle: 'promo.a11y.cookieIdle',
    idleFallback: 'Click to crack open your fortune cookie and reveal lucky numbers',
    cracking: 'promo.a11y.cookieCracking',
    crackingFallback: 'Cracking fortune cookie...',
  },
  announcements: {
    cookieCracked: 'promo.a11y.cookieCracked',
    cookieCrackedFallback: 'Fortune cookie cracked!',
    fortuneRevealed: 'promo.a11y.fortuneRevealed',
    fortuneRevealedFallback: 'Your fortune: {message}',
    numbersRevealed: 'promo.a11y.numbersRevealed',
    numbersRevealedFallback: 'Your lucky numbers are: {numbers}. Bonus: {bonus}',
    numbersReset: 'promo.a11y.numbersReset',
    numbersResetFallback: 'Numbers cleared. Click the cookie to try again.',
  },
  regions: {
    fortuneCard: 'promo.a11y.fortuneCardRegion',
    fortuneCardFallback: 'Fortune cookie lottery number generator',
    numbersDisplay: 'promo.a11y.numbersDisplayRegion',
    numbersDisplayFallback: 'Generated lottery numbers',
  },
  buttons: {
    submit: 'promo.a11y.submitNumbers',
    submitFallback: 'Submit these numbers to play',
    retry: 'promo.a11y.tryAgain',
    retryFallback: 'Generate new lucky numbers',
  },
};

export const getBonusBallStyle = (gameType) => {
  const normalizedType = String(gameType || '').toLowerCase();
  return FORTUNE_COOKIE_STYLES.bonusBall[normalizedType] || FORTUNE_COOKIE_STYLES.bonusBall[DEFAULT_GAME_TYPE];
};

export const getBallAnimationDelay = (ballType, index) => {
  const baseDelay = ballType === 'main' ? ANIMATION_TIMING.mainBallBaseDelay : ANIMATION_TIMING.bonusBallBaseDelay;
  const stagger = ballType === 'main' ? ANIMATION_TIMING.mainBallStagger : ANIMATION_TIMING.bonusBallStagger;

  return `${baseDelay + index * stagger}s`;
};

export const generateUniqueNumbers = (count, max) => {
  const numbers = new Set();
  while (numbers.size < count) {
    numbers.add(Math.floor(Math.random() * max) + 1);
  }
  return Array.from(numbers).sort((a, b) => a - b);
};

export const generateLotteryNumbers = (gameType) => {
  const rules = getGameRules(gameType);
  return {
    mainNumbers: generateUniqueNumbers(rules.mainCount, rules.mainMax),
    bonusNumbers: generateUniqueNumbers(rules.bonusCount, rules.bonusMax),
  };
};

export const formatNumbersForAnnouncement = (numbers) => {
  if (!numbers?.length) return '';
  if (numbers.length === 1) return String(numbers[0]);
  const last = numbers[numbers.length - 1];
  const rest = numbers.slice(0, -1);
  return `${rest.join(', ')} and ${last}`;
};
