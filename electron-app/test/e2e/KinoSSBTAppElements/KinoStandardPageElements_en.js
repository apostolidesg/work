const { Application } = require('spectron');
const browserWindow = require('electron').remote;
const path = require('path');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var mochaclean = require('mocha-clean');
chai.use(chaiAsPromised);
chai.should();
let baseDir = path.join(__dirname, './../main.js');
let electronBinary = path.join(baseDir, '../../../release/opap-lottery-games-win32-x64', 'opap-lottery-games');
var elements = require('./../Elements.js');
const { exec } = require('child_process');

////////////////////////////////////////// Check elements of Kino Bet Page /////////////////////////////////////////////

describe('TC KinoStandardPageElements_en.js: Check elements of Kino Bet Page', function () {
  beforeEach(function (done) {
    setTimeout(function () {
      done();
    }, 1200);
  });

  ////////////////////////////////////////// Launch Application (electron.exe) ///////////////////////////////////////////

  it('Launch Application', function () {
    this.timeout(30000);
    if (process.platform === 'win32') {
      electronBinary += '.exe';
    }

    this.app = new Application({
      path: electronBinary,
    });
    return this.app.start();
  });

  /////////////////////////////////////////// Language is default set to GR //////////////////////////////////////////////

  ////////////////////////////////////////////// Change language to EN ///////////////////////////////////////////////////

  it('Select EN language', function () {
    return this.app.client.click(elements.LobbyEnBtn).should.eventually.be.fulfilled;
  });

  /////////////////////////////////////////// Select KINO game from Lobby ////////////////////////////////////////////////

  it('Select Kino game', function () {
    return this.app.client.click(elements.LobbyKino).should.eventually.be.fulfilled;
  });

  ///////////////////////////////////////////// Check elements of initial Kino Bet page //////////////////////////////////////

  it('Check Kino Header', function () {
    return this.app.client.isVisible(elements.LobbyHeader).should.eventually.be.true;
  });

  it('Check Kino Logo', function () {
    return this.app.client.isVisible(elements.KinoLogo).should.eventually.be.true;
  });

  // it('Check scanner error', function () {
  //   return Promise.all([
  //     this.app.client.isVisible(elements.KinoScanError).should.eventually.be.true,
  //     this.app.client.getText(elements.KinoScanError).should.eventually.be.equal('BARCODE READER ERROR'),
  //   ])
  // })

  it('Check return to Main Menu element', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoMainMenuBtn).should.eventually.be.true,
      this.app.client.getText(elements.KinoMainMenuBtn).should.eventually.be.equal('BACK TO LOBBY'),
    ]);
  });

  it('Check T&C element button', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoTC).should.eventually.be.true,
      this.app.client.getText(elements.KinoTC).should.eventually.be.equal('TERMS & CONDITIONS'),
    ]);
  });

  it('Select T&C element button', function () {
    return this.app.client.click(elements.KinoTC).should.eventually.be.fulfilled;
  });

  it('Check T&C element and close with X', function () {
    let self = this;
    return Promise.all([
      this.app.client.getText(elements.KinoTCTitle).should.eventually.be.equal('TERMS & CONDITIONS'),
      this.app.client.isVisible(elements.KINOTCClose).should.eventually.be.true,
      this.app.client.isVisible(elements.KINOTCMessage).should.eventually.be.true,
      this.app.client.isVisible(elements.KINOTCClose).should.eventually.be.true,
      this.app.client.getText(elements.KINOTCOk).should.eventually.be.equal('OK'),
    ]).then(function (values) {
      return (
        values[0] &&
        values[1] &&
        values[2] &&
        values[3] &&
        values[4] &&
        self.app.client.click(elements.KINOTCClose).should.eventually.be.fulfilled
      );
    });
  });

  it('Select T&C element button', function () {
    return this.app.client.click(elements.KinoTC).should.eventually.be.fulfilled;
  });

  it('Check T&C element and close with OK', function () {
    let self = this;
    return Promise.all([
      this.app.client.getText(elements.KinoTCTitle).should.eventually.be.equal('TERMS & CONDITIONS'),
      this.app.client.isVisible(elements.KINOTCClose).should.eventually.be.true,
      this.app.client.isVisible(elements.KINOTCMessage).should.eventually.be.true,
      this.app.client.isVisible(elements.KINOTCClose).should.eventually.be.true,
      this.app.client.getText(elements.KINOTCOk).should.eventually.be.equal('OK'),
    ]).then(function (values) {
      return (
        values[0] &&
        values[1] &&
        values[2] &&
        values[3] &&
        values[4] &&
        self.app.client.click(elements.KINOTCOk).should.eventually.be.fulfilled
      );
    });
  });

  it('Check How To Play element button', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoHowToPlay).should.eventually.be.true,
      this.app.client.getText(elements.KinoHowToPlay).should.eventually.be.equal('HOW TO PLAY'),
    ]);
  });

  it('Select How To Play element button', function () {
    return this.app.client.click(elements.KinoHowToPlay).should.eventually.be.fulfilled;
  });

  it('Check How To Play modal and close with X', function () {
    let self = this;
    return Promise.all([
      this.app.client.isVisible(elements.KinoHowToPlayModal).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoHowToPlayClose).should.eventually.be.true,
    ]).then(function (values) {
      return (
        values[0] && values[1] && self.app.client.click(elements.KinoHowToPlayClose).should.eventually.be.fulfilled
      );
    });
  });

  it('Check Cashout element', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoCashoutField).should.eventually.be.true,
      // this.app.client.getValue(elements.KinoCashoutBtnEnabled).should.eventually.be.be.equal('false'),
      this.app.client.getText(elements.KinoCashoutLbl).should.eventually.be.equal('CASH OUT'),
    ]);
  });

  // it('Check SSBT balance element', function () { // balance is changing
  //   return Promise.all([this.app.client.isVisible(elements.KinoBalanceBtn).should.eventually.be.true, this.app.client.getText(elements.KinoBalanceShow).should.eventually.be.equal('550,00€')])
  // })

  it('Hide SSBT balance', function () {
    return this.app.client.click(elements.KinoBalanceBtn).should.eventually.be.fulfilled;
  });

  it('Check SSBT balance', function () {
    return this.app.client.getText(elements.KinoBalanceHide).should.eventually.be.equal('Display Balance');
  });

  it('Show SSBT balance', function () {
    return this.app.client.click(elements.KinoBalanceBtn).should.eventually.be.fulfilled;
  });

  // it('Check SSBT balance', function () { // balance is changing
  //   return this.app.client.getText(elements.KinoBalanceShow).should.eventually.be.equal('550,00€')
  // })

  it('Check SSBT balance refresh option', function () {
    return this.app.client.isVisible(elements.KinoRefresh).should.eventually.be.true;
  });

  it('Check Clear All element', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoClearAllBtn).should.eventually.be.true,
      this.app.client.getText(elements.KinoClearAllBtn).should.eventually.be.equal('CLEAR ALL'),
    ]);
  });

  it('Check element of next draw', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoCountdownField).should.eventually.be.true,
      this.app.client.getText(elements.KinoCountDownDraw).should.eventually.contain('DRAW'),
      this.app.client.getText(elements.KinoCountDownDraw).should.eventually.contain('BEGINS IN'),
    ]);
  });

  it('Check elements of language selection', function () {
    return Promise.all([
      this.app.client.isVisible(elements.LobbyHeaderLangSelection).should.eventually.be.true,
      this.app.client.getText(elements.LobbyElBtn).should.eventually.be.equal('ΕΛ'),
      this.app.client.getText(elements.LobbyEnBtn).should.eventually.be.equal('EN'),
    ]);
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow0)
        .getAttribute('class')
        .should.eventually.be.equal('selected'),
      this.app.client.elements(elements.KinoWinningsTableKinoRow1).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow2).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow3).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow4).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow5).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow6).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow7).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow8).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow9).getAttribute('class').should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow10)
        .getAttribute('class')
        .should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow11)
        .getAttribute('class')
        .should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow12)
        .getAttribute('class')
        .should.eventually.be.equal(''),
      this.app.client.getText(elements.KinoWinningsTableNumbers).should.eventually.be.equal('NUMBERS'),
      this.app.client.getText(elements.KinoWinningsTableWinnings).should.eventually.be.equal('WINNINGS'),
      this.app.client.getText(elements.KinoWinningsTableKinoBonus).should.eventually.equal('KINO BONUS'),
      this.app.client.getText(elements.KinoWinningsTableKino0).should.eventually.be.equal('0'),
      this.app.client.getText(elements.KinoWinningsTableKino0Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino0KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1).should.eventually.be.equal('1'),
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoWinningsTableKino4Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino5).should.eventually.be.equal('5'),
      this.app.client.getText(elements.KinoWinningsTableKino5Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino5KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino6).should.eventually.be.equal('6'),
      this.app.client.getText(elements.KinoWinningsTableKino6Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino6KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino7).should.eventually.be.equal('7'),
      this.app.client.getText(elements.KinoWinningsTableKino7Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino7KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino8).should.eventually.be.equal('8'),
      this.app.client.getText(elements.KinoWinningsTableKino8Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino8KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino9).should.eventually.be.equal('9'),
      this.app.client.getText(elements.KinoWinningsTableKino9Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino9KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino10).should.eventually.be.equal('10'),
      this.app.client.getText(elements.KinoWinningsTableKino10Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino10KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino11).should.eventually.be.equal('11'),
      this.app.client.getText(elements.KinoWinningsTableKino11Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino11KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino12).should.eventually.be.equal('12'),
      this.app.client.getText(elements.KinoWinningsTableKino12Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino12KinoBonus).should.eventually.be.equal('-'),
    ]);
  });

  it('Check Quick Pick field', function () {
    return Promise.all([
      this.app.client.getText(elements.KinoQuickPickLbl).should.eventually.be.equal('QUICK PICK'),
      this.app.client.isVisible(elements.KinoQuickPickBtn).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoQuickPickBtnImg).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoQuickPickDown).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoQuickPickUp).should.eventually.be.true,
      this.app.client.getText(elements.KinoQuickPickInput).should.eventually.be.equal(''),
      this.app.client.isVisible(elements.KinoQuickPickUp).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoQuickPickTable).should.eventually.be.false,
    ]);
  });

  it('Open Quick Pick tab', function () {
    return this.app.client.click(elements.KinoQuickPickInput).should.eventually.be.fulfilled;
  });

  it('Check Quick Pick tab fields', function () {
    return Promise.all([
      this.app.client.getValue(elements.KinoQuickPickInput).should.eventually.be.equal(''),
      this.app.client.getText(elements.KinoQuickPickTable1).should.eventually.be.equal('1'),
      this.app.client.getText(elements.KinoQuickPickTable2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoQuickPickTable3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoQuickPickTable4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoQuickPickTable5).should.eventually.be.equal('5'),
      this.app.client.getText(elements.KinoQuickPickTable6).should.eventually.be.equal('6'),
      this.app.client.getText(elements.KinoQuickPickTable7).should.eventually.be.equal('7'),
      this.app.client.getText(elements.KinoQuickPickTable8).should.eventually.be.equal('8'),
      this.app.client.getText(elements.KinoQuickPickTable9).should.eventually.be.equal('9'),
      this.app.client.getText(elements.KinoQuickPickTable10).should.eventually.be.equal('10'),
      this.app.client.getText(elements.KinoQuickPickTable11).should.eventually.be.equal('11'),
      this.app.client.getText(elements.KinoQuickPickTable12).should.eventually.be.equal('12'),
      this.app.client.getValue(elements.KinoQuickPickTable1Inp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoQuickPickTable2Inp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoQuickPickTable3Inp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoQuickPickTable4Inp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoQuickPickTable5Inp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoQuickPickTable6Inp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoQuickPickTable7Inp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoQuickPickTable8Inp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoQuickPickTable9Inp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoQuickPickTable10Inp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoQuickPickTable11Inp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoQuickPickTable12Inp).should.eventually.be.equal('false'),
    ]);
  });

  it('Close Quick Pick tab', function () {
    return this.app.client.click(elements.KinoQuickPickInput).should.eventually.be.fulfilled;
  });

  it('Check betting amount field', function () {
    return Promise.all([
      this.app.client.getText(elements.KinoBetMultiplierLbl).should.eventually.be.equal('BET AMOUNT (€)'),
      this.app.client.getText(elements.KinoBetMultiplierBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.KinoBetMultiplierBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.KinoBetMultiplierBtnLbl3).should.eventually.be.equal('1.5€'),
      this.app.client.getText(elements.KinoBetMultiplierBtnLbl4).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.KinoBetMultiplierBtnLbl5).should.eventually.be.equal('2.5€'),
      this.app.client.getText(elements.KinoBetMultiplierBtnLbl6).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.KinoBetMultiplierBtnLbl7).should.eventually.be.equal('4€'),
      this.app.client.getText(elements.KinoBetMultiplierBtnLbl8).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.KinoBetMultiplierBtnLbl9).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.KinoBetMultiplierBtnLbl10).should.eventually.be.equal('20€'),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl1)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn1Disabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl2)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn2Disabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl3)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn3Disabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl4)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn4Disabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl5)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn5Disabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl6)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn6Disabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl7)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn7Disabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl8)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn8Disabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl9)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn9Disabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl10)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn10Disabled),
    ]);
  });

  it('Check Clear button', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetClearArea).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetClearAreaLbl).should.eventually.be.equal('CLEAR'),
    ]);
  });

  it('Check Kino Bonus field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBonusField).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBonusCheckBox).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBonusImg).should.eventually.be.true,
      this.app.client.getValue(elements.KinoBonusCheckBox).should.eventually.be.equal('on'),
    ]);
  });

  it('Check select ΚΙΝΟ numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoChooseNumbers).should.eventually.be.true,
      this.app.client.getText(elements.KinoChooseNumbersLbl).should.eventually.be.equal('NUMBERS SELECTION'),
      this.app.client.getText(elements.KinoChooseNumber1Btn).should.eventually.be.equal('1'),
      this.app.client.getText(elements.KinoChooseNumber2Btn).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoChooseNumber3Btn).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoChooseNumber4Btn).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoChooseNumber5Btn).should.eventually.be.equal('5'),
      this.app.client.getText(elements.KinoChooseNumber6Btn).should.eventually.be.equal('6'),
      this.app.client.getText(elements.KinoChooseNumber7Btn).should.eventually.be.equal('7'),
      this.app.client.getText(elements.KinoChooseNumber8Btn).should.eventually.be.equal('8'),
      this.app.client.getText(elements.KinoChooseNumber9Btn).should.eventually.be.equal('9'),
      this.app.client.getText(elements.KinoChooseNumber10Btn).should.eventually.be.equal('10'),
      this.app.client.getText(elements.KinoChooseNumber11Btn).should.eventually.be.equal('11'),
      this.app.client.getText(elements.KinoChooseNumber12Btn).should.eventually.be.equal('12'),
      this.app.client.getText(elements.KinoChooseNumber13Btn).should.eventually.be.equal('13'),
      this.app.client.getText(elements.KinoChooseNumber14Btn).should.eventually.be.equal('14'),
      this.app.client.getText(elements.KinoChooseNumber15Btn).should.eventually.be.equal('15'),
      this.app.client.getText(elements.KinoChooseNumber16Btn).should.eventually.be.equal('16'),
      this.app.client.getText(elements.KinoChooseNumber17Btn).should.eventually.be.equal('17'),
      this.app.client.getText(elements.KinoChooseNumber18Btn).should.eventually.be.equal('18'),
      this.app.client.getText(elements.KinoChooseNumber19Btn).should.eventually.be.equal('19'),
      this.app.client.getText(elements.KinoChooseNumber20Btn).should.eventually.be.equal('20'),
      this.app.client.getText(elements.KinoChooseNumber21Btn).should.eventually.be.equal('21'),
      this.app.client.getText(elements.KinoChooseNumber22Btn).should.eventually.be.equal('22'),
      this.app.client.getText(elements.KinoChooseNumber23Btn).should.eventually.be.equal('23'),
      this.app.client.getText(elements.KinoChooseNumber24Btn).should.eventually.be.equal('24'),
      this.app.client.getText(elements.KinoChooseNumber25Btn).should.eventually.be.equal('25'),
      this.app.client.getText(elements.KinoChooseNumber26Btn).should.eventually.be.equal('26'),
      this.app.client.getText(elements.KinoChooseNumber27Btn).should.eventually.be.equal('27'),
      this.app.client.getText(elements.KinoChooseNumber28Btn).should.eventually.be.equal('28'),
      this.app.client.getText(elements.KinoChooseNumber29Btn).should.eventually.be.equal('29'),
      this.app.client.getText(elements.KinoChooseNumber30Btn).should.eventually.be.equal('30'),
      this.app.client.getText(elements.KinoChooseNumber31Btn).should.eventually.be.equal('31'),
      this.app.client.getText(elements.KinoChooseNumber32Btn).should.eventually.be.equal('32'),
      this.app.client.getText(elements.KinoChooseNumber33Btn).should.eventually.be.equal('33'),
      this.app.client.getText(elements.KinoChooseNumber34Btn).should.eventually.be.equal('34'),
      this.app.client.getText(elements.KinoChooseNumber35Btn).should.eventually.be.equal('35'),
      this.app.client.getText(elements.KinoChooseNumber36Btn).should.eventually.be.equal('36'),
      this.app.client.getText(elements.KinoChooseNumber37Btn).should.eventually.be.equal('37'),
      this.app.client.getText(elements.KinoChooseNumber38Btn).should.eventually.be.equal('38'),
      this.app.client.getText(elements.KinoChooseNumber39Btn).should.eventually.be.equal('39'),
      this.app.client.getText(elements.KinoChooseNumber40Btn).should.eventually.be.equal('40'),
      this.app.client.getText(elements.KinoChooseNumber41Btn).should.eventually.be.equal('41'),
      this.app.client.getText(elements.KinoChooseNumber42Btn).should.eventually.be.equal('42'),
      this.app.client.getText(elements.KinoChooseNumber43Btn).should.eventually.be.equal('43'),
      this.app.client.getText(elements.KinoChooseNumber44Btn).should.eventually.be.equal('44'),
      this.app.client.getText(elements.KinoChooseNumber45Btn).should.eventually.be.equal('45'),
      this.app.client.getText(elements.KinoChooseNumber46Btn).should.eventually.be.equal('46'),
      this.app.client.getText(elements.KinoChooseNumber47Btn).should.eventually.be.equal('47'),
      this.app.client.getText(elements.KinoChooseNumber48Btn).should.eventually.be.equal('48'),
      this.app.client.getText(elements.KinoChooseNumber49Btn).should.eventually.be.equal('49'),
      this.app.client.getText(elements.KinoChooseNumber50Btn).should.eventually.be.equal('50'),
      this.app.client.getText(elements.KinoChooseNumber51Btn).should.eventually.be.equal('51'),
      this.app.client.getText(elements.KinoChooseNumber52Btn).should.eventually.be.equal('52'),
      this.app.client.getText(elements.KinoChooseNumber53Btn).should.eventually.be.equal('53'),
      this.app.client.getText(elements.KinoChooseNumber54Btn).should.eventually.be.equal('54'),
      this.app.client.getText(elements.KinoChooseNumber55Btn).should.eventually.be.equal('55'),
      this.app.client.getText(elements.KinoChooseNumber56Btn).should.eventually.be.equal('56'),
      this.app.client.getText(elements.KinoChooseNumber57Btn).should.eventually.be.equal('57'),
      this.app.client.getText(elements.KinoChooseNumber58Btn).should.eventually.be.equal('58'),
      this.app.client.getText(elements.KinoChooseNumber59Btn).should.eventually.be.equal('59'),
      this.app.client.getText(elements.KinoChooseNumber60Btn).should.eventually.be.equal('60'),
      this.app.client.getText(elements.KinoChooseNumber61Btn).should.eventually.be.equal('61'),
      this.app.client.getText(elements.KinoChooseNumber62Btn).should.eventually.be.equal('62'),
      this.app.client.getText(elements.KinoChooseNumber63Btn).should.eventually.be.equal('63'),
      this.app.client.getText(elements.KinoChooseNumber64Btn).should.eventually.be.equal('64'),
      this.app.client.getText(elements.KinoChooseNumber65Btn).should.eventually.be.equal('65'),
      this.app.client.getText(elements.KinoChooseNumber66Btn).should.eventually.be.equal('66'),
      this.app.client.getText(elements.KinoChooseNumber67Btn).should.eventually.be.equal('67'),
      this.app.client.getText(elements.KinoChooseNumber68Btn).should.eventually.be.equal('68'),
      this.app.client.getText(elements.KinoChooseNumber69Btn).should.eventually.be.equal('69'),
      this.app.client.getText(elements.KinoChooseNumber70Btn).should.eventually.be.equal('70'),
      this.app.client.getText(elements.KinoChooseNumber71Btn).should.eventually.be.equal('71'),
      this.app.client.getText(elements.KinoChooseNumber72Btn).should.eventually.be.equal('72'),
      this.app.client.getText(elements.KinoChooseNumber73Btn).should.eventually.be.equal('73'),
      this.app.client.getText(elements.KinoChooseNumber74Btn).should.eventually.be.equal('74'),
      this.app.client.getText(elements.KinoChooseNumber75Btn).should.eventually.be.equal('75'),
      this.app.client.getText(elements.KinoChooseNumber76Btn).should.eventually.be.equal('76'),
      this.app.client.getText(elements.KinoChooseNumber77Btn).should.eventually.be.equal('77'),
      this.app.client.getText(elements.KinoChooseNumber78Btn).should.eventually.be.equal('78'),
      this.app.client.getText(elements.KinoChooseNumber79Btn).should.eventually.be.equal('79'),
      this.app.client.getText(elements.KinoChooseNumber80Btn).should.eventually.be.equal('80'),
    ]);
  });

  it('Check field of game Odd/Even', function () {
    return this.app.client.isVisible(elements.KinoOddEvenImgEl).should.eventually.be.true;
  });

  it('Check field of game Columns', function () {
    return this.app.client.isVisible(elements.KinoColumnsImgEl).should.eventually.be.true;
  });

  it('Check consecutive draws fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetConsDrawsArea).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetConsDrawsLbl).should.eventually.be.equal('CONSECUTIVE DRAWS'),
      this.app.client.isVisible(elements.KinoBetConsDrawsPlus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetConsDrawsMinus).should.eventually.be.true,
      this.app.client.getValue(elements.KinoBetConsDrawsInput).should.eventually.be.equal('1'),
    ]);
  });

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.KinoBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('placeBetInfoMsg2'),
      this.app.client.isVisible(elements.KinoBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipSubmitLbl).should.eventually.be.equal('PLACE BET'),
      this.app.client.getText(elements.KinoBetslipCostLbl).should.eventually.be.equal('BETSLIP COST\n0€'),
      this.app.client.getText(elements.KinoBetslipCost).should.eventually.be.equal('0€'),
    ]);
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaACost).should.eventually.be.equal('0,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaAKinoBonus).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaAClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumbersLbl).should.eventually.be.equal('NUMBERS\n0'),
      this.app.client.getText(elements.KinoBetslipAreaANumbers).should.eventually.equal('0'),
      this.app.client.isVisible(elements.KinoBetslipAddBet).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAddBet).should.eventually.be.equal('ADD EXTRA KINO GAME'),
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.false,
    ]);
  });

  /////////////////////////////////////// Prepare a full betslip to check all betslip fields /////////////////////////////////

  it('Select game type 1 (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Select KINO Bonus', function () {
    return this.app.client.click(elements.KinoBonusCheckBox).should.eventually.be.fulfilled;
  });

  it('Add new bet', function () {
    return this.app.client.click(elements.KinoBetslipAddBet).should.eventually.be.fulfilled;
  });

  it('Select game type 1 (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Select KINO Bonus', function () {
    return this.app.client.click(elements.KinoBonusCheckBox).should.eventually.be.fulfilled;
  });

  it('Add new bet', function () {
    return this.app.client.click(elements.KinoBetslipAddBet).should.eventually.be.fulfilled;
  });

  it('Select game type 1 (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Select KINO Bonus', function () {
    return this.app.client.click(elements.KinoBonusCheckBox).should.eventually.be.fulfilled;
  });

  it('Add new bet', function () {
    return this.app.client.click(elements.KinoBetslipAddBet).should.eventually.be.fulfilled;
  });

  it('Select game type 1 (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Select KINO Bonus', function () {
    return this.app.client.click(elements.KinoBonusCheckBox).should.eventually.be.fulfilled;
  });

  it('Add new bet', function () {
    return this.app.client.click(elements.KinoBetslipAddBet).should.eventually.be.fulfilled;
  });

  it('Select game type 1 (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Select KINO Bonus', function () {
    return this.app.client.click(elements.KinoBonusCheckBox).should.eventually.be.fulfilled;
  });

  it('Add new bet', function () {
    return this.app.client.click(elements.KinoBetslipAddBet).should.eventually.be.fulfilled;
  });

  it('Select game type 1 (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Select KINO Bonus', function () {
    return this.app.client.click(elements.KinoBonusCheckBox).should.eventually.be.fulfilled;
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaACost).should.eventually.be.equal('1,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaAKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaAClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumbersLbl).should.eventually.be.equal('NUMBERS\n1'),
      this.app.client.getText(elements.KinoBetslipAreaANumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBCost).should.eventually.be.equal('1,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaBKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaBClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumbersLbl).should.eventually.be.equal('NUMBERS\n1'),
      this.app.client.getText(elements.KinoBetslipAreaBNumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCCost).should.eventually.be.equal('1,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaCKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaCClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumbersLbl).should.eventually.be.equal('NUMBERS\n1'),
      this.app.client.getText(elements.KinoBetslipAreaCNumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDCost).should.eventually.be.equal('1,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaDKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaDClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumbersLbl).should.eventually.be.equal('NUMBERS\n1'),
      this.app.client.getText(elements.KinoBetslipAreaDNumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaECost).should.eventually.be.equal('1,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaEKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaEClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumbersLbl).should.eventually.be.equal('NUMBERS\n1'),
      this.app.client.getText(elements.KinoBetslipAreaENumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFCost).should.eventually.be.equal('1,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaFKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaFClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumbersLbl).should.eventually.be.equal('NUMBERS\n1'),
      this.app.client.getText(elements.KinoBetslipAreaFNumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAddBet).should.eventually.be.false,
    ]);
  });

  it('Open consecutive draws fields calculator', function () {
    return this.app.client.click(elements.KinoBetConsDrawsInput).should.eventually.be.fulfilled;
  });

  it('Check consecutive draws fields calculator', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetConsDrawsCalc0).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetConsDrawsCalc1).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetConsDrawsCalc2).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetConsDrawsCalc3).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetConsDrawsCalc4).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetConsDrawsCalc5).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetConsDrawsCalc6).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetConsDrawsCalc7).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetConsDrawsCalc8).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetConsDrawsCalc9).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetConsDrawsCalcCE).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetConsDrawsCalcOK).should.eventually.be.true,
    ]);
  });

  it('Select a value out of allowed range', function () {
    return Promise.all([
      this.app.client.click(elements.KinoBetConsDrawsCalc8).should.eventually.be.fulfilled,
      this.app.client.click(elements.KinoBetConsDrawsCalc8).should.eventually.be.fulfilled,
      this.app.client.click(elements.KinoBetConsDrawsCalc8).should.eventually.be.fulfilled,
    ]);
  });

  it('Check message of consecutive draws fields calculator', function () {
    return this.app.client
      .elements(elements.KinoBetConsDrawsCalcMsg)
      .getAttribute('innerText')
      .should.eventually.be.equal('Select from 1 to 800!');
  });

  it('Clear value of consecutive draws fields calculator', function () {
    return this.app.client.click(elements.KinoBetConsDrawsCalcCE).should.eventually.be.fulfilled;
  });

  it('Close consecutive draws fields calculator', function () {
    return this.app.client.click(elements.KinoBetConsDrawsInput).should.eventually.be.fulfilled;
  });

  it('Check default value of consecutive draws fields calculator', function () {
    return this.app.client.getValue(elements.KinoBetConsDrawsInput).should.eventually.be.equal('1');
  });

  ///////////////////////////////////////////// Check modal elements of KINO Standard Bet ///////////////////////////////////////

  it('Select Clear Area A from betslip', function () {
    return this.app.client.click(elements.KinoBetslipAreaAClear).should.eventually.be.fulfilled;
  });

  it('Discard Clear Area A from betslip', function () {
    let self = this;
    return Promise.all([
      this.app.client
        .elements(elements.KinoModalAMsgLbl)
        .getAttribute('innerText')
        .should.eventually.be.equal('CLEAR AREA'),
      this.app.client
        .elements(elements.KinoModalAMsg)
        .getAttribute('innerText')
        .should.eventually.be.equal('All selections of this area will be lost. Are you sure you want to proceed?'),
      this.app.client.elements(elements.KinoModalAYesBtn).getAttribute('innerText').should.eventually.be.equal('Yes'),
      this.app.client.elements(elements.KinoModalANoBtn).getAttribute('innerText').should.eventually.be.equal('No'),
    ]).then(function (values) {
      return (
        values[0] &&
        values[1] &&
        values[2] &&
        values[3] &&
        self.app.client.click(elements.KinoModalANoBtn).should.eventually.be.fulfilled
      );
    });
  });

  it('Select Clear Area B from betslip', function () {
    return this.app.client.click(elements.KinoBetslipAreaBClear).should.eventually.be.fulfilled;
  });

  it('Discard Clear Area B from betslip', function () {
    let self = this;
    return Promise.all([
      this.app.client
        .elements(elements.KinoModalAMsgLbl)
        .getAttribute('innerText')
        .should.eventually.be.equal('CLEAR AREA'),
      this.app.client
        .elements(elements.KinoModalAMsg)
        .getAttribute('innerText')
        .should.eventually.be.equal('All selections of this area will be lost. Are you sure you want to proceed?'),
      this.app.client.elements(elements.KinoModalAYesBtn).getAttribute('innerText').should.eventually.be.equal('Yes'),
      this.app.client.elements(elements.KinoModalANoBtn).getAttribute('innerText').should.eventually.be.equal('No'),
    ]).then(function (values) {
      return (
        values[0] &&
        values[1] &&
        values[2] &&
        values[3] &&
        self.app.client.click(elements.KinoModalANoBtn).should.eventually.be.fulfilled
      );
    });
  });

  it('Select Clear Area C from betslip', function () {
    return this.app.client.click(elements.KinoBetslipAreaCClear).should.eventually.be.fulfilled;
  });

  it('Discard Clear Area C from betslip', function () {
    let self = this;
    return Promise.all([
      this.app.client
        .elements(elements.KinoModalAMsgLbl)
        .getAttribute('innerText')
        .should.eventually.be.equal('CLEAR AREA'),
      this.app.client
        .elements(elements.KinoModalAMsg)
        .getAttribute('innerText')
        .should.eventually.be.equal('All selections of this area will be lost. Are you sure you want to proceed?'),
      this.app.client.elements(elements.KinoModalAYesBtn).getAttribute('innerText').should.eventually.be.equal('Yes'),
      this.app.client.elements(elements.KinoModalANoBtn).getAttribute('innerText').should.eventually.be.equal('No'),
    ]).then(function (values) {
      return (
        values[0] &&
        values[1] &&
        values[2] &&
        values[3] &&
        self.app.client.click(elements.KinoModalANoBtn).should.eventually.be.fulfilled
      );
    });
  });

  it('Select Clear Area D from betslip', function () {
    return this.app.client.click(elements.KinoBetslipAreaDClear).should.eventually.be.fulfilled;
  });

  it('Discard Clear Area D from betslip', function () {
    let self = this;
    return Promise.all([
      this.app.client
        .elements(elements.KinoModalAMsgLbl)
        .getAttribute('innerText')
        .should.eventually.be.equal('CLEAR AREA'),
      this.app.client
        .elements(elements.KinoModalAMsg)
        .getAttribute('innerText')
        .should.eventually.be.equal('All selections of this area will be lost. Are you sure you want to proceed?'),
      this.app.client.elements(elements.KinoModalAYesBtn).getAttribute('innerText').should.eventually.be.equal('Yes'),
      this.app.client.elements(elements.KinoModalANoBtn).getAttribute('innerText').should.eventually.be.equal('No'),
    ]).then(function (values) {
      return (
        values[0] &&
        values[1] &&
        values[2] &&
        values[3] &&
        self.app.client.click(elements.KinoModalANoBtn).should.eventually.be.fulfilled
      );
    });
  });

  it('Select Clear Area E from betslip', function () {
    return this.app.client.click(elements.KinoBetslipAreaEClear).should.eventually.be.fulfilled;
  });

  it('Discard Clear Area E from betslip', function () {
    let self = this;
    return Promise.all([
      this.app.client
        .elements(elements.KinoModalAMsgLbl)
        .getAttribute('innerText')
        .should.eventually.be.equal('CLEAR AREA'),
      this.app.client
        .elements(elements.KinoModalAMsg)
        .getAttribute('innerText')
        .should.eventually.be.equal('All selections of this area will be lost. Are you sure you want to proceed?'),
      this.app.client.elements(elements.KinoModalAYesBtn).getAttribute('innerText').should.eventually.be.equal('Yes'),
      this.app.client.elements(elements.KinoModalANoBtn).getAttribute('innerText').should.eventually.be.equal('No'),
    ]).then(function (values) {
      return (
        values[0] &&
        values[1] &&
        values[2] &&
        values[3] &&
        self.app.client.click(elements.KinoModalANoBtn).should.eventually.be.fulfilled
      );
    });
  });

  it('Select Clear Area F from betslip', function () {
    return this.app.client.click(elements.KinoBetslipAreaFClear).should.eventually.be.fulfilled;
  });

  it('Discard Clear Area F from betslip', function () {
    let self = this;
    return Promise.all([
      this.app.client
        .elements(elements.KinoModalAMsgLbl)
        .getAttribute('innerText')
        .should.eventually.be.equal('CLEAR AREA'),
      this.app.client
        .elements(elements.KinoModalAMsg)
        .getAttribute('innerText')
        .should.eventually.be.equal('All selections of this area will be lost. Are you sure you want to proceed?'),
      this.app.client.elements(elements.KinoModalAYesBtn).getAttribute('innerText').should.eventually.be.equal('Yes'),
      this.app.client.elements(elements.KinoModalANoBtn).getAttribute('innerText').should.eventually.be.equal('No'),
    ]).then(function (values) {
      return (
        values[0] &&
        values[1] &&
        values[2] &&
        values[3] &&
        self.app.client.click(elements.KinoModalANoBtn).should.eventually.be.fulfilled
      );
    });
  });

  it('Select Clear All', function () {
    return this.app.client.click(elements.KinoClearAllBtn).should.eventually.be.fulfilled;
  });

  it('Discard Clear All', function () {
    let self = this;
    return Promise.all([
      this.app.client
        .elements(elements.KinoModalAMsgLbl)
        .getAttribute('innerText')
        .should.eventually.be.equal('CLEAR BETSLIP'),
      this.app.client
        .elements(elements.KinoModalAMsg)
        .getAttribute('innerText')
        .should.eventually.be.equal('All selections of the betslip will be lost. Are you sure you want to proceed?'),
      this.app.client.elements(elements.KinoModalAYesBtn).getAttribute('innerText').should.eventually.be.equal('Yes'),
      this.app.client.elements(elements.KinoModalANoBtn).getAttribute('innerText').should.eventually.be.equal('No'),
    ]).then(function (values) {
      return (
        values[0] &&
        values[1] &&
        values[2] &&
        values[3] &&
        self.app.client.click(elements.KinoModalANoBtn).should.eventually.be.fulfilled
      );
    });
  });

  ////////////////////////////////////////////////////////// Change language to GR /////////////////////////////////////////////

  it('Select GR language', function () {
    return this.app.client.click(elements.LobbyElBtn).should.eventually.be.fulfilled;
  });

  it('Check Kino Header', function () {
    return this.app.client.isVisible(elements.LobbyHeader).should.eventually.be.true;
  });

  it('Check Kino Logo', function () {
    return this.app.client.isVisible(elements.KinoLogo).should.eventually.be.true;
  });

  it('Check return to Main Menu element', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoMainMenuBtn).should.eventually.be.true,
      this.app.client.getText(elements.KinoMainMenuBtn).should.eventually.be.equal('ΕΔΩ ΠΑΣ ΣΤΟ LOBBY'),
    ]);
  });

  it('Check T&C element button', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoTC).should.eventually.be.true,
      this.app.client.getText(elements.KinoTC).should.eventually.be.equal('ΟΡΟΙ ΣΥΜΜΕΤΟΧΗΣ'),
    ]);
  });

  it('Check How To Play element button', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoHowToPlay).should.eventually.be.true,
      this.app.client.getText(elements.KinoHowToPlay).should.eventually.be.equal('ΜΑΘΕ ΠΩΣ ΠΑΙΖΕΙΣ'),
    ]);
  });

  it('Check Cashout element', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoCashoutField).should.eventually.be.true,
      // this.app.client.getValue(elements.KinoCashoutBtnEnabled).should.eventually.be.be.equal('false'),
      this.app.client.getText(elements.KinoCashoutLbl).should.eventually.be.equal('ΕΞΑΡΓΥΡΩΣΗ'),
    ]);
  });

  it('Check Clear All element', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoClearAllBtn).should.eventually.be.true,
      this.app.client.getText(elements.KinoClearAllBtn).should.eventually.be.equal('ΚΑΘΑΡΙΣΜΟΣ ΟΛΩΝ'),
    ]);
  });

  it('Check element of next draw', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoCountdownField).should.eventually.be.true,
      this.app.client.getText(elements.KinoCountDownDraw).should.eventually.contain('ΚΛΗΡΩΣΗ'),
      this.app.client.getText(elements.KinoCountDownDraw).should.eventually.contain('ΑΡΧΙΖΕΙ ΣΕ'),
    ]);
  });

  it('Check elements of language selection', function () {
    return Promise.all([
      this.app.client.isVisible(elements.LobbyHeaderLangSelection).should.eventually.be.true,
      this.app.client.getText(elements.LobbyElBtn).should.eventually.be.equal('ΕΛ'),
      this.app.client.getText(elements.LobbyEnBtn).should.eventually.be.equal('EN'),
    ]);
  });

  it('Check select ΚΙΝΟ numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoChooseNumbers).should.eventually.be.true,
      this.app.client.getText(elements.KinoChooseNumbersLbl).should.eventually.be.equal('ΕΠΙΛΟΓΗ ΑΡΙΘΜΩΝ'),
      this.app.client.getText(elements.KinoChooseNumber1Btn).should.eventually.be.equal('1'),
      this.app.client.getText(elements.KinoChooseNumber2Btn).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoChooseNumber3Btn).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoChooseNumber4Btn).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoChooseNumber5Btn).should.eventually.be.equal('5'),
      this.app.client.getText(elements.KinoChooseNumber6Btn).should.eventually.be.equal('6'),
      this.app.client.getText(elements.KinoChooseNumber7Btn).should.eventually.be.equal('7'),

      this.app.client.getText(elements.KinoChooseNumber80Btn).should.eventually.be.equal('80'),
    ]);
  });

  /////////////////////////////////////////// Check modal elements of KINO Standard Bet ///////////////////////////////////////

  it('Select Clear All', function () {
    return this.app.client.click(elements.KinoClearAllBtn).should.eventually.be.fulfilled;
  });

  it('Confirm Clear All', function () {
    let self = this;
    return Promise.all([
      this.app.client
        .elements(elements.KinoModalAMsgLbl)
        .getAttribute('innerText')
        .should.eventually.be.equal('ΚΑΘΑΡΙΣΜΟΣ ΔΕΛΤΙΟΥ'),
      this.app.client
        .elements(elements.KinoModalAMsg)
        .getAttribute('innerText')
        .should.eventually.be.equal(
          'Όλες οι επιλογές του δελτίου θα διαγραφούν. Είστε σίγουρος/η ότι θέλετε να συνεχίσετε;',
        ),
      this.app.client.elements(elements.KinoModalAYesBtn).getAttribute('innerText').should.eventually.be.equal('Ναι'),
      this.app.client.elements(elements.KinoModalANoBtn).getAttribute('innerText').should.eventually.be.equal('Όχι'),
    ]).then(function (values) {
      return (
        values[0] &&
        values[1] &&
        values[2] &&
        values[3] &&
        self.app.client.click(elements.KinoModalAYesBtn).should.eventually.be.fulfilled
      );
    });
  });

  ///////////////////////////////////////////////////// Exit game - Return to Lobby ////////////////////////////////////////

  it('Exit KINO game', function () {
    return this.app.client.click(elements.KinoMainMenuBtn).should.eventually.be.fulfilled;
  });

  it('Confirm exit KINO game', function () {
    return this.app.client.isVisible(elements.LobbyKino).should.eventually.be.true;
    // If nothing is selected, no confirmation is needed.
    // let self=this;
    // return Promise.all
    //     ([this.app.client.elements(elements.KinoModalAMsgLbl).getAttribute('innerText').should.eventually.be.equal('ΕΠΙΣΤΡΟΦΗ ΣΤΟ ΜΕΝΟΥ ΠΑΙΧΝΙΔΙΩΝ'),
    //       this.app.client.elements(elements.KinoModalAMsg).getAttribute('innerText').should.eventually.be.equal('Η επιστροφή στο Μενού Παιχνιδιών θα διαγράψει τις τρέχουσες επιλογές σας, θέλετε να συνεχίσετε;'),
    //       this.app.client.elements(elements.KinoModalAYesBtn).getAttribute('innerText').should.eventually.be.equal('Ναι'),
    //       this.app.client.elements(elements.KinoModalANoBtn).getAttribute('innerText').should.eventually.be.equal('Όχι')])
    //        .then(function(values){
    //        return values[0] && values[1] && values[2] && values[3] && self.app.client.click(elements.KinoModalAYesBtn).should.eventually.be.fulfilled});
  });

  ///////////////////////////////////// Close Application ////////////////////////////////////////////////////////////////

  it('Close Application', function () {
    this.timeout(5000);
    if (this.app && this.app.isRunning()) {
      exec(`taskkill /IM opap-lottery-games.exe /F`);
    }
  });
});
