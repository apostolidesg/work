import PrintTemplate from '../../../../src/model/PrintTemplate';
import Constants from '../../../../src/util/Constants';

describe('PrintTemplate.js', () => {
  const data = {
    wagerId: 1,
    serialNumbers: ['04474142720201326592161288856519930'],
    crcCode: 2487113385,
    hexCrcCode: '943e56a9',
    transactionId: '01082',
    guid: 'eee809b0-db54-11e8-b460-024238089ea4',
    terminalId: 10102351,
    retailerId: 101023,
    operator: 1,
    channelId: 2,
    gameType: 'KINO',
    wager: {
      boards: [
        { betType: 1, multipliers: 1, panels: [{ selection: [38, 45] }], quickPick: true },
        { betType: 1, multipliers: 1, panels: [{ selection: [38, 45] }], quickPick: true },
        { betType: 1, multipliers: 1, panels: [{ selection: [38, 45] }], quickPick: true },
        { betType: 1, multipliers: 1, panels: [{ selection: [38, 45] }], quickPick: true },
        { betType: 1, multipliers: 1, panels: [{ selection: [38, 45] }], quickPick: true },
      ],
      columns: 1,
      cost: 0.5,
      participatingDraws: {
        firstDraw: 218464,
        firstDrawTime: '1540802100',
        lastDraw: 218464,
        lastDrawTime: '1540802100',
        multipleDraws: 1,
      },
    },
  };

  it('should process the input data', () => {
    const printTemplate = new PrintTemplate();

    const terminalId = '000001';
    printTemplate.processData(Constants.PRINT_TYPE.BETSLIP, data, terminalId, 'el').then(result => {
      expect(result.wager.boards[0].area).to.equal('Α');
    });

    printTemplate.processData(Constants.PRINT_TYPE.BETSLIP, data, terminalId, 'en').then(result => {
      expect(result.wager.boards[0].area).to.equal('Α');
    });
  });
  it('should calculate the height for all cases', () => {
    const printTemplate = new PrintTemplate();

    let templateHeight = printTemplate.calculateTemplateHeight(Constants.PRINT_TYPE.BETSLIP, data);
    expect(templateHeight).to.equal(1002);

    templateHeight = printTemplate.calculateTemplateHeight(Constants.PRINT_TYPE.VOUCHER);
    expect(templateHeight).to.equal(746);

    templateHeight = printTemplate.calculateTemplateHeight(8);
    expect(templateHeight).to.equal(800);
  });
});
