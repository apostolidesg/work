import { describe, it, expect } from 'vitest';
import PrintTemplate from '@/model/PrintTemplate';
import Constants from '@/util/Constants';

describe('PrintTemplate.js', () => {
  const kinoData = {
    wagerId: 100042657688,
    serialNumbers: ['32288210100000001472031886931801'],
    crcCode: 21408399,
    hexCrcCode: '146aa8f',
    transactionId: '31801',
    guid: '0f31d0e3-0d9f-11f1-8361-6ab85eca55af',
    terminalId: 10102351,
    retailerId: 101023,
    operator: 1,
    channelId: 22,
    gameType: 'KINO',
    wager: {
      boards: [
        {
          betType: 1,
          boardId: 1,
          multipliers: 1,
          panels: [{ selection: [41, 80] }],
          quickPick: true,
        },
      ],
      columns: 1,
      cost: 0.5,
      participatingDraws: {
        draws: [596946],
        firstDraw: 596946,
        firstDrawTime: '1771511400000',
        lastDraw: 596946,
        lastDrawTime: '1771511400000',
        multipleDraws: 1,
      },
      status: 'Played',
      blockStatus: 'Unblocked',
      discount: 0,
    },
    promotionOutcomes: [],
    kinoSystemEnabled: false,
    iSecure: {
      randomNumbers: ['3193935151', '2521666667'],
      hashes: [4253103642, 374791833, 495044991, 2258102757, 3150558906, 3963564761, 1881678275, 1725441960],
      crcCode: '53091',
    },
  };

  const powerspinData = {
    wagerId: 100042668236,
    serialNumbers: ['32294960820000001472036081283801'],
    crcCode: 21437700,
    hexCrcCode: '1471d04',
    transactionId: '83801',
    guid: '21fbc0ad-13d3-11f1-8361-6ab85eca55af',
    terminalId: 10102351,
    retailerId: 101023,
    operator: 1,
    channelId: 22,
    gameType: 'POWERSPIN',
    wager: {
      boards: [
        {
          betType: 1,
          boardId: 1,
          multipliers: 1,
          panels: [
            {
              selection: [18],
              requested: 1,
              QPSelections: 1,
              quickPick: true,
            },
          ],
        },
        {
          betType: 9,
          boardId: 2,
          multipliers: 1,
          panels: [{ selection: [], requested: 0 }],
        },
        {
          betType: 12,
          boardId: 3,
          multipliers: 1,
          panels: [{ selection: [], requested: 0 }],
        },
        {
          betType: 27,
          boardId: 4,
          multipliers: 1,
          panels: [{ selection: [], requested: 0 }],
        },
      ],
      columns: 4,
      cost: 2,
      multipliers: 1,
      participatingDraws: {
        draws: [583161],
        firstDraw: 583161,
        firstDrawTime: '1772193420000',
        lastDraw: 583161,
        lastDrawTime: '1772193420000',
        multipleDraws: 1,
      },
      status: 'Played',
      blockStatus: 'Unblocked',
      discount: 0,
      maxWinnings: 13,
    },
    promotionOutcomes: [],
    iSecure: {
      randomNumbers: ['1002258252', '2777929436'],
      hashes: [4253103642, 374791833, 495044991, 2258102757, 3150558906, 3963564761, 1881678275, 1725441960],
      crcCode: '53091',
    },
  };

  const ejpData = {
    wagerId: 100042668236,
    serialNumbers: ['32294960820000001472036081283801'],
    crcCode: 21437700,
    hexCrcCode: '1471d04',
    transactionId: '83801',
    guid: '21fbc0ad-13d3-11f1-8361-6ab85eca55af',
    terminalId: 10102351,
    retailerId: 101023,
    operator: 1,
    channelId: 22,
    gameType: 'POWERSPIN',
    wager: {
      boards: [
        {
          betType: 1,
          boardId: 1,
          multipliers: 1,
          panels: [
            {
              selection: [18],
              requested: 1,
              QPSelections: 1,
              quickPick: true,
            },
          ],
        },
        {
          betType: 9,
          boardId: 2,
          multipliers: 1,
          panels: [{ selection: [], requested: 0 }],
        },
        {
          betType: 12,
          boardId: 3,
          multipliers: 1,
          panels: [{ selection: [], requested: 0 }],
        },
        {
          betType: 27,
          boardId: 4,
          multipliers: 1,
          panels: [{ selection: [], requested: 0 }],
        },
      ],
      columns: 4,
      cost: 2,
      multipliers: 1,
      participatingDraws: {
        draws: [583161],
        firstDraw: 583161,
        firstDrawTime: '1772193420000',
        lastDraw: 583161,
        lastDrawTime: '1772193420000',
        multipleDraws: 1,
      },
      status: 'Played',
      blockStatus: 'Unblocked',
      discount: 0,
      maxWinnings: 13,
    },
    promotionOutcomes: [],
    iSecure: {
      randomNumbers: ['1002258252', '2777929436'],
      hashes: [4253103642, 374791833, 495044991, 2258102757, 3150558906, 3963564761, 1881678275, 1725441960],
      crcCode: '53091',
    },
  };

  const instantWinData = {
    wagerId: 100042657688,
    serialNumbers: ['32288210100000001472031886931801'],
    crcCode: 21408399,
    hexCrcCode: '146aa8f',
    transactionId: '31801',
    guid: '0f31d0e3-0d9f-11f1-8361-6ab85eca55af',
    terminalId: 10102351,
    retailerId: 101023,
    operator: 1,
    channelId: 22,
    gameType: 'KINO',
    wager: {
      boards: [
        {
          betType: 1,
          boardId: 1,
          multipliers: 1,
          panels: [{ selection: [41, 80] }],
          quickPick: true,
        },
      ],
      columns: 1,
      cost: 0.5,
      participatingDraws: {
        draws: [596946],
        firstDraw: 596946,
        firstDrawTime: '1771511400000',
        lastDraw: 596946,
        lastDrawTime: '1771511400000',
        multipleDraws: 1,
      },
      status: 'Played',
      blockStatus: 'Unblocked',
      discount: 0,
    },
    promotionOutcomes: [
      {
        promotionId: 128375,
        outcomeId: 27127698,
        promotionSerialNumber: '18087060419171100000000000401',
        outcomeType: 'RealMoney',
        outcomeMetaData: {
          RealMoney: {
            Type: 'Amount',
            Value: 5.0,
            winDetails: {
              grossAmount: 5.0,
              netAmount: 5.0,
              taxAmount: 0.0,
            },
            IwParticipations: {
              Attempts: 1,
            },
          },
        },
        maxRedemptionDate: 1761948000,
        promotionType: 'IW',
      },
    ],
    kinoSystemEnabled: false,
    iSecure: {
      randomNumbers: ['3193935151', '2521666667'],
      hashes: [4253103642, 374791833, 495044991, 2258102757, 3150558906, 3963564761, 1881678275, 1725441960],
      crcCode: '53091',
    },
  };

  it('should calculate the height for all cases', () => {
    const printTemplate = new PrintTemplate();
    printTemplate.isL10Version = true;

    let templateHeight = printTemplate.calculateTemplateHeight(Constants.PRINT_TYPE.BETSLIP, kinoData);
    expect(templateHeight).toBe(910);

    templateHeight = printTemplate.calculateTemplateHeight(Constants.PRINT_TYPE.VOUCHER);
    expect(templateHeight).toBe(746);

    templateHeight = printTemplate.calculateTemplateHeight(Constants.PRINT_TYPE.EUROJACKPOT_BETSLIP, ejpData);
    expect(templateHeight).toBe(876);

    templateHeight = printTemplate.calculateTemplateHeight(Constants.PRINT_TYPE.INSTANT_WIN_VOUCHER, instantWinData);
    expect(templateHeight).toBe(800);

    templateHeight = printTemplate.calculateTemplateHeight(Constants.PRINT_TYPE.POWERSPIN_BETSLIP, powerspinData);
    expect(templateHeight).toBe(1148);
  });
});
