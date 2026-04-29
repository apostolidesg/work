import powerspinConstants from './powerspin/Constants.js';

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

export default {
  POWERSPIN_BET_TYPE_TO_GAME_CATEGORY,
};
