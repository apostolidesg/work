export default {
  BET_TYPES: {
    DEFAULT: 1,
    DOUBLE: 39,
    QUADRUPLE: 40,
    OCTUPLE: 41,
  },
  MAX_BOARDS: 4,
  BETTYPE_TO_NUMBERS_COUNT: {
    1: 1,
    39: 2,
    40: 4,
    41: 8,
  },
  DEFAULT_MULTIPLIERS: 1,
  BOARD_NUMBERS: {
    MIN: 1,
    MAX: 34,
  },
  STATISTICS_SELECTIONS: {
    OCCURRENCES: 'OCCURRENCES',
    NONE: 'NONE',
    DELAYS: 'DELAYS',
  },
  MULTIPLIERS_SET: {
    1: [1, 2, 3, 4, 6, 10, 14, 20, 40, 100],
    39: [1, 2, 3, 4, 6, 10, 14, 20, 40, 100, 200],
    40: [1, 2, 3, 4, 6, 10, 14, 20, 40, 100, 200, 400],
    41: [1, 2, 3, 4, 6, 10, 14, 20, 40, 100, 200, 400, 800],
  },
  MULTIPLIERS_SET_DEFAULT: [1, 2, 3, 4, 6, 10, 14, 20, 40, 100],
  CIRCLE_ANGLE: 360,
  MAX_NUMBERS_PER_ROW_ON_PRINT: 11,
  WHEEL_VIEW_NUMBERS: [
    9, 34, 22, 18, 29, 7, 28, 12, 3, 26, 30, 15, 19, 32, 4, 21, 2, 25, 17, 6, 27, 13, 11, 8, 23, 10, 5, 24, 16, 33, 1,
    20, 14, 31,
  ],
};
