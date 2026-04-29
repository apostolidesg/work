import Constants from './Constants';
import powerspinConstants from './powerspinConstants';

const ODD_EVEN_DRAW_TEXT_MAPPER = {
  [Constants.ILOT_GAMETYPES.ODD]: 'odd',
  [Constants.ILOT_GAMETYPES.EVEN]: 'even',
  [Constants.ILOT_GAMETYPES.DRAW]: 'draw',
};

const ODD_EVEN_DRAW_TO_YIELD = {
  [Constants.ILOT_GAMETYPES.ODD]: Constants.ODD_EVEN_PAY,
  [Constants.ILOT_GAMETYPES.EVEN]: Constants.ODD_EVEN_PAY,
  [Constants.ILOT_GAMETYPES.DRAW]: Constants.ODD_EVEN_PAY_DRAW,
};

const ODD_EVEN_DRAW_TO_IMAGES = {
  [Constants.ILOT_GAMETYPES.ODD]: { ...Constants.ODD_EVEN_DRAW_IMAGES.ODD },
  [Constants.ILOT_GAMETYPES.EVEN]: { ...Constants.ODD_EVEN_DRAW_IMAGES.EVEN },
  [Constants.ILOT_GAMETYPES.DRAW]: { ...Constants.ODD_EVEN_DRAW_IMAGES.DRAW },
};

const POWERSPIN_BET_TYPE_TO_GAME_CATEGORY = {
  [powerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER]: powerspinConstants.GAME_CATEGORY.NUMBER,
  [powerspinConstants.ILOT_GAMETYPES.PLAY_SYMBOL]: powerspinConstants.GAME_CATEGORY.SYMBOL,
  [powerspinConstants.ILOT_GAMETYPES.PLAY_COLOR_RED]: powerspinConstants.GAME_CATEGORY.COLOR,
  [powerspinConstants.ILOT_GAMETYPES.PLAY_COLOR_BLUE]: powerspinConstants.GAME_CATEGORY.COLOR,
  [powerspinConstants.ILOT_GAMETYPES.PLAY_COLOR_GREEN]: powerspinConstants.GAME_CATEGORY.COLOR,
  [powerspinConstants.ILOT_GAMETYPES.PLAY_OVER]: powerspinConstants.GAME_CATEGORY.OVER_UNDER,
  [powerspinConstants.ILOT_GAMETYPES.PLAY_UNDER]: powerspinConstants.GAME_CATEGORY.OVER_UNDER,
  [powerspinConstants.ILOT_GAMETYPES.PLAY_A_NUMBER_ON_ANY_WHEEL]: powerspinConstants.MARKETS_CATEGORY.NUMBER_ON_WHEEL,
  [powerspinConstants.ILOT_GAMETYPES.PLAY_SYMBOL_ON_NONE_WHEEL]: powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL,
  [powerspinConstants.ILOT_GAMETYPES.PLAY_SYMBOL_ON_AT_LEAST_ONE_WHEEL]:
    powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL,
  [powerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER_ON_TWO_WHEELS]: powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_NUMBER,
  [powerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER_ON_THREE_WHEELS]:
    powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_NUMBER,
};

const SIDESCREEN_SELECTION_SYMBOL_COLOR_MAPPER = {
  [powerspinConstants.ILOT_GAMETYPES.PLAY_COLOR_RED]: 'red',
  [powerspinConstants.ILOT_GAMETYPES.PLAY_COLOR_GREEN]: 'green',
  [powerspinConstants.ILOT_GAMETYPES.PLAY_COLOR_BLUE]: 'blue',
};

const SIDESCREEN_SELECTION_UNDER_OVER_MAPPER = {
  [powerspinConstants.ILOT_GAMETYPES.PLAY_UNDER]: { value: 'u', classname: 'under-board' },
  [powerspinConstants.ILOT_GAMETYPES.PLAY_OVER]: { value: 'o', classname: 'over-board' },
};

const SIDESCREEN_MARKET_TO_CATEGORY_MAPPER = {
  [powerspinConstants.ILOT_GAMETYPES.PLAY_SYMBOL_ON_NONE_WHEEL]:
    'markets.categories.WHEELS_WITH_SYMBOL.options.noWheel.sideScreen',
  [powerspinConstants.ILOT_GAMETYPES.PLAY_SYMBOL_ON_AT_LEAST_ONE_WHEEL]:
    'markets.categories.WHEELS_WITH_SYMBOL.options.atLeastOnWheel.sideScreen',
  [powerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER_ON_TWO_WHEELS]:
    'markets.categories.WHEELS_WITH_NUMBER.options.twoWheels.sideScreen',
  [powerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER_ON_THREE_WHEELS]:
    'markets.categories.WHEELS_WITH_NUMBER.options.threeWheels.sideScreen',
};

const LOADER_CONFIG_GAME_TYPE_MAPPER = {
  [Constants.GENERAL_GAME_TYPES.KINO]: {
    opacity: 0.6,
    isFullPage: false,
    color: '#F5BE20',
    backgroundColor: '#0a394e',
  },
  [Constants.GENERAL_GAME_TYPES.POWERSPIN]: {
    opacity: 0.6,
    isFullPage: false,
    color: '#D70C7F',
    backgroundColor: '#01042D',
  },
  [Constants.GENERAL_GAME_TYPES.FIREBLAZE]: {
    opacity: 0.6,
    isFullPage: false,
    color: '#D70C7F',
    backgroundColor: '#01042D',
  },
};

export default {
  ODD_EVEN_DRAW_TEXT_MAPPER,
  ODD_EVEN_DRAW_TO_YIELD,
  ODD_EVEN_DRAW_TO_IMAGES,
  POWERSPIN_BET_TYPE_TO_GAME_CATEGORY,
  SIDESCREEN_SELECTION_SYMBOL_COLOR_MAPPER,
  SIDESCREEN_SELECTION_UNDER_OVER_MAPPER,
  SIDESCREEN_MARKET_TO_CATEGORY_MAPPER,
  LOADER_CONFIG_GAME_TYPE_MAPPER,
};
