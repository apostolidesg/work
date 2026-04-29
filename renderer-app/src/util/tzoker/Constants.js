const TzokerConstants = {
  GAME_TYPE: 'TZOKER',
  SUBMISSION_GAME_TYPE: 'JOKER',

  BOARD_NUMBERS: {
    MAIN: {
      MIN: 1,
      MAX: 45,
      MIN_VALID_LENGTH: 5,
      MAX_VALID_LENGTH: 45,
    },
    TZOKER: {
      MIN: 1,
      MAX: 20,
      MIN_VALID_LENGTH: 1,
      MAX_VALID_LENGTH: 20,
    },
  },

  PANEL_TYPES: {
    MAIN: 'MAIN',
    TZOKER: 'TZOKER',
  },

  BASE_COST: 1,
  MAX_BOARDS: 12,

  BET_TYPES: {
    DEFAULT: 1,
    STANDARD: 1,
    SYSTEM: 1,
  },

  PARTICIPATING_DRAWS: {
    MIN: 1,
    MAX: 12,
    DEFAULT: 1,
  },

  SYSTEMS: {
    12: { numbers: 15, columns: 118 },
    13: { numbers: 13, columns: 54 },
    14: { numbers: 12, columns: 38 },
    15: { numbers: 11, columns: 22 },
    23: { numbers: 10, columns: 51 },
    24: { numbers: 10, columns: 14 },
    25: { numbers: 9, columns: 30 },
    34: { numbers: 9, columns: 9 },
    35: { numbers: 8, columns: 6 },
    45: { numbers: 7, columns: 5 },
  },

  STATISTICS_SELECTIONS: {
    OCCURRENCES: 'OCCURRENCES',
    NONE: 'NONE',
    DELAYS: 'DELAYS',
  },
};

export default TzokerConstants;
