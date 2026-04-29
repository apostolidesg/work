const oneWheelWager = {
  boards: [
    {
      betType: 1,
      boardId: 1,
      multipliers: 3,
      panels: [
        {
          selection: [1, 2, 3],
          requested: 2,
          QPSelections: 3,
          quickPick: true,
        },
      ],
      extendedBetting: {
        additionalRequested: [1],
      },
    },
    {
      betType: 9,
      boardId: 2,
      multipliers: 1,
      panels: [
        {
          selection: [],
          requested: 0,
        },
      ],
    },
    {
      betType: 13,
      boardId: 3,
      multipliers: 1,
      panels: [
        {
          selection: [],
          requested: 0,
        },
      ],
      extendedBetting: {
        betTypes: [12, 14],
      },
    },
    {
      betType: 26,
      boardId: 4,
      multipliers: 1,
      panels: [
        {
          selection: [],
          requested: 0,
        },
      ],
      extendedBetting: {
        betTypes: [27],
      },
    },
  ],
  columns: 24,
  cost: 6,
  multipliers: 1,
  participatingDraws: {
    draws: [275548],
    firstDraw: 275548,
    firstDrawTime: '1667975100000',
    lastDraw: 275548,
    lastDrawTime: '1667975100000',
    multipleDraws: 1,
  },
  status: 'Played',
  blockStatus: 'Unblocked',
  discount: 0,
  maxWinnings: 37.25,
};

const threeWheelWager = {
  boards: [
    {
      betType: 1,
      boardId: 1,
      multipliers: 1,
      panels: [
        {
          selection: [3, 15],
          requested: 1,
          QPSelections: 2,
          quickPick: true,
        },
      ],
      extendedBetting: {
        systems: [
          {
            id: 1,
            index: [1, 2, 3],
          },
        ],
      },
    },
    {
      betType: 1,
      boardId: 2,
      multipliers: 1,
      panels: [
        {
          selection: [16],
          requested: 1,
        },
      ],
      extendedBetting: {
        systems: [
          {
            id: 2,
            index: [1, 2, 3],
          },
        ],
      },
    },
    {
      betType: 27,
      boardId: 3,
      multipliers: 1,
      panels: [
        {
          selection: [],
          requested: 0,
        },
      ],
      extendedBetting: {
        betTypes: [26],
        systems: [
          {
            id: 3,
            index: [1, 2, 3],
          },
        ],
      },
    },
    {
      betType: 1,
      boardId: 4,
      multipliers: 1,
      panels: [
        {
          selection: [3, 15],
          requested: 1,
          QPSelections: 2,
          quickPick: true,
        },
      ],
      extendedBetting: {
        systems: [
          {
            id: 1,
            index: [4, 5, 6],
          },
        ],
      },
    },
    {
      betType: 12,
      boardId: 5,
      multipliers: 1,
      panels: [
        {
          selection: [],
          requested: 0,
        },
      ],
      extendedBetting: {
        systems: [
          {
            id: 2,
            index: [4, 5, 6],
          },
        ],
      },
    },
    {
      betType: 27,
      boardId: 6,
      multipliers: 1,
      panels: [
        {
          selection: [],
          requested: 0,
        },
      ],
      extendedBetting: {
        betTypes: [26],
        systems: [
          {
            id: 3,
            index: [4, 5, 6],
          },
        ],
      },
    },
    {
      betType: 9,
      boardId: 7,
      multipliers: 1,
      panels: [
        {
          selection: [],
          requested: 0,
        },
      ],
      extendedBetting: {
        systems: [
          {
            id: 1,
            index: [7, 8, 9],
          },
        ],
      },
    },
    {
      betType: 1,
      boardId: 8,
      multipliers: 1,
      panels: [
        {
          selection: [16],
          requested: 1,
        },
      ],
      extendedBetting: {
        systems: [
          {
            id: 2,
            index: [7, 8, 9],
          },
        ],
      },
    },
    {
      betType: 27,
      boardId: 9,
      multipliers: 1,
      panels: [
        {
          selection: [],
          requested: 0,
        },
      ],
      extendedBetting: {
        betTypes: [26],
        systems: [
          {
            id: 3,
            index: [7, 8, 9],
          },
        ],
      },
    },
    {
      betType: 9,
      boardId: 10,
      multipliers: 1,
      panels: [
        {
          selection: [],
          requested: 0,
        },
      ],
      extendedBetting: {
        systems: [
          {
            id: 1,
            index: [10, 11, 12],
          },
        ],
      },
    },
    {
      betType: 12,
      boardId: 11,
      multipliers: 1,
      panels: [
        {
          selection: [],
          requested: 0,
        },
      ],
      extendedBetting: {
        systems: [
          {
            id: 2,
            index: [10, 11, 12],
          },
        ],
      },
    },
    {
      betType: 27,
      boardId: 12,
      multipliers: 1,
      panels: [
        {
          selection: [],
          requested: 0,
        },
      ],
      extendedBetting: {
        betTypes: [26],
        systems: [
          {
            id: 3,
            index: [10, 11, 12],
          },
        ],
      },
    },
  ],
  columns: 36,
  cost: 9,
  multipliers: 3,
  participatingDraws: {
    draws: [275592, 275593, 275594],
    firstDraw: 275592,
    firstDrawTime: '1667985660000',
    lastDraw: 275594,
    lastDrawTime: '1667985660000',
    multipleDraws: 3,
  },
  status: 'Played',
  blockStatus: 'Unblocked',
  discount: 0,
  maxWinnings: 1050,
};

export default { oneWheelWager, threeWheelWager };
