export const CURRENCY_SYMBOL = '€';

export const formatJackpotAmount = (amount) => {
  return (
    new Intl.NumberFormat('el-GR', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount) + CURRENCY_SYMBOL
  );
};

export const PROMO_CARDS_CONFIG = {
  games: {
    tzoker: {
      id: 'tzoker',
      jackpotAmount: formatJackpotAmount(1700000),
      disabled: false,
    },
    eurojackpot: {
      id: 'eurojackpot',
      jackpotAmount: formatJackpotAmount(120000000),
      disabled: false,
    },
  },

  assets: {
    tzokerLogo: '/assets/tzoker-logo.png',
    eurojackpotLogo: '/assets/eurojackpot-logo.png',
    animatedWheel: 'https://media.opap.gr/DGE/wheel-2.png',
  },

  styles: {
    card: {
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(10px)',
      maxWidth: '455px',
    },

    jackpot: {
      fontFamily: "'Roboto Flex', sans-serif",
      background: 'linear-gradient(to bottom, #070c14 0%, #5e94a7 48.558%, #054058 48.568%)',
      textGradient: true,
    },

    priceButton: {
      tzoker: {
        outer: 'linear-gradient(0deg, rgb(0, 111, 161) 0%, rgb(255, 255, 255) 50%, rgb(35, 162, 220) 100%)',
        border: '#23a2dc',
        textColor: '#000000',
        inner: null,
        background:
          'linear-gradient(45deg, rgb(244, 190, 62), rgb(245, 230, 129), rgb(244, 190, 62), rgb(255, 220, 100))',
      },
      eurojackpot: {
        outer: 'linear-gradient(0deg, rgb(143, 92, 6) 0%, rgb(255, 232, 152) 50%, rgb(245, 158, 11) 100%)',
        border: '#F59E0B',
        textColor: '#000000',
        inner: null,
        background:
          'linear-gradient(45deg, rgb(237, 193, 20), rgb(245, 230, 129), rgb(237, 193, 20), rgb(255, 215, 70))',
      },
      label: {
        background: 'linear-gradient(180deg, #B6E4F5 0%, #FFF 47.6%, #DDF6FF 47.61%)',
        fontFamily: "'Roboto Flex', sans-serif",
        filter: 'drop-shadow(0px 0px 5px rgba(96, 71, 0, 0.85))',
        fontSize: '65px',
        fontWeight: '700',
        lineHeight: '84px',
      },
    },

    selectNumbersButton: {
      tzoker: {
        outer: 'linear-gradient(0deg, rgb(0, 111, 161) 0%, rgb(255, 255, 255) 50%, rgb(35, 162, 220) 100%)',
        inner: 'linear-gradient(180deg, #B6E4F5 0%, #FFF 47.6%, #DDF6FF 47.61%)',
      },
      eurojackpot: {
        outer: 'linear-gradient(0deg, rgb(143, 92, 6) 0%, rgb(255, 232, 152) 50%, rgb(245, 158, 11) 100%)',
        inner: 'linear-gradient(180deg, #B6E4F5 0%, #FFF 47.6%, #DDF6FF 47.61%)',
      },
      text: {
        fontFamily: "'Roboto', sans-serif",
        color: '#124b63',
      },
      landscape: {
        background:
          'linear-gradient(rgba(255, 255, 255, 0) 70.48%, rgb(81, 202, 136) 93.62%, rgba(255, 255, 255, 0) 100%), linear-gradient(rgba(0, 107, 255, 0) 0%, rgba(2, 83, 193, 0.01) 100%), rgb(0, 171, 77)',
        border: '#00AB4D',
        textColor: '#FFFFFF',
      },
      main: {
        background:
          'linear-gradient(rgba(255, 255, 255, 0) 70.48%, rgb(81, 202, 136) 93.62%, rgba(255, 255, 255, 0) 100%), linear-gradient(rgba(0, 107, 255, 0) 0%, rgba(2, 83, 193, 0.01) 100%), rgb(0, 171, 77)',
        borderColor: '#00AB4D',
        textColor: '#FFFFFF',
      },
    },

    tabs: {
      active:
        'linear-gradient(rgba(255, 255, 255, 0) 70.48%, rgb(255, 255, 255) 93.62%, rgba(255, 255, 255, 0) 100%), linear-gradient(rgb(255, 255, 255) 0%, rgba(194, 205, 220, 0.5) 100%), rgba(251, 255, 253, 0.5)',
      inactive:
        'linear-gradient(rgba(255, 255, 255, 0) 70.48%, rgba(255, 255, 255, 0.4) 93.62%, rgba(255, 255, 255, 0) 100%), linear-gradient(rgba(0, 107, 255, 0) 0%, rgba(2, 83, 193, 0.01) 100%), rgba(251, 255, 253, 0.2)',
      border: 'rgba(7, 77, 104, 0.1)',
    },
  },

  layout: {
    portraitMaxWidth: '455px',
    landscapeMaxWidth: '900px',
    landscapeHeight: '700px',
    wheelSize: 200,
    wheelPosition: {
      portrait: { right: '-140px', top: '-150px' },
      landscape: { right: '-80px', top: '-50px' },
    },
  },
};

export const getPriceButtonStyles = (gameId) => {
  const config = PROMO_CARDS_CONFIG.styles.priceButton[gameId];
  if (!config) return null;

  return {
    descriptionColor: config.textColor,
    innerBackground: config.inner ?? 'transparent',
    outerBackground: config.background || config.outer,
    borderColor: config.border,
    textGradient: PROMO_CARDS_CONFIG.styles.priceButton.label.background,
    textShadow: PROMO_CARDS_CONFIG.styles.priceButton.label.filter,
    fontFamily: PROMO_CARDS_CONFIG.styles.priceButton.label.fontFamily,
  };
};

export const PRICE_BUTTON_STYLES = {
  tzoker: getPriceButtonStyles('tzoker'),
  eurojackpot: getPriceButtonStyles('eurojackpot'),
};

export const getSelectNumbersButtonStyles = (gameId, variant = 'landscape') => {
  const gameStyles = PROMO_CARDS_CONFIG.styles.selectNumbersButton[gameId];
  const variantStyles = PROMO_CARDS_CONFIG.styles.selectNumbersButton[variant];
  const textStyles = PROMO_CARDS_CONFIG.styles.selectNumbersButton.text;

  return {
    outer: gameStyles?.outer || variantStyles?.background,
    inner: gameStyles?.inner,
    background: variantStyles?.background,
    borderColor: variantStyles?.border || gameStyles?.border,
    ...textStyles,
  };
};

export const getGameConfig = (gameId) => {
  return PROMO_CARDS_CONFIG.games[gameId] || PROMO_CARDS_CONFIG.games.tzoker;
};

export const getAvailableGameIds = () => {
  return Object.keys(PROMO_CARDS_CONFIG.games);
};
