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

////////////////////////////////////////// Check Clear Area functionality /////////////////////////////////////////////

describe('TC KinoStandardBetClearArea.js: Check Clear Area functionality', function () {
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

  /////////////////////////////////////////// Select KINO game from Lobby ////////////////////////////////////////////////

  it('Select Kino game', function () {
    return this.app.client.click(elements.LobbyKino).should.eventually.be.fulfilled;
  });

  ///////////////////////////////////// Prepare a full betslip with all 6 Areas filled in /////////////////////////////////

  it('Select game type 1 (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Select Kino Bonus checkbox', function () {
    return this.app.client.click(elements.KinoBonusCheckBox).should.eventually.be.fulfilled;
  });

  it('Select betting amount field', function () {
    return this.app.client.click(elements.KinoBetMultiplierBtnLbl3).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow1)
        .getAttribute('class')
        .should.eventually.be.equal('selected'),
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
      this.app.client.getText(elements.KinoWinningsTableNumbers).should.eventually.be.equal('ΑΡΙΘΜΟΙ'),
      this.app.client.getText(elements.KinoWinningsTableWinnings).should.eventually.be.equal('ΚΕΡΔΟΣ'),
      this.app.client.getText(elements.KinoWinningsTableKinoBonus).should.eventually.equal('KINO BONUS'),
      this.app.client.getText(elements.KinoWinningsTableKino0).should.eventually.be.equal('0'),
      this.app.client.getText(elements.KinoWinningsTableKino0Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino0KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1).should.eventually.be.equal('1'),
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('5,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('105,00€'),
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

  it('Check betting amount field', function () {
    return Promise.all([
      this.app.client.getText(elements.KinoBetMultiplierLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
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
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn1Checked),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl2)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn2Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl3)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn3Checked),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl4)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn4Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl5)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn5Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl6)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn6Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl7)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn7Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl8)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn8Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl9)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn9Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl10)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn10Enabled),
    ]);
  });

  it('Add new bet for Area B', function () {
    return this.app.client.click(elements.KinoBetslipAddBet).should.eventually.be.fulfilled;
  });

  it('Select game type 1 (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Select Kino Bonus checkbox', function () {
    return this.app.client.click(elements.KinoBonusCheckBox).should.eventually.be.fulfilled;
  });

  it('Select betting amount field', function () {
    return this.app.client.click(elements.KinoBetMultiplierBtnLbl3).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow1)
        .getAttribute('class')
        .should.eventually.be.equal('selected'),
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
      this.app.client.getText(elements.KinoWinningsTableNumbers).should.eventually.be.equal('ΑΡΙΘΜΟΙ'),
      this.app.client.getText(elements.KinoWinningsTableWinnings).should.eventually.be.equal('ΚΕΡΔΟΣ'),
      this.app.client.getText(elements.KinoWinningsTableKinoBonus).should.eventually.equal('KINO BONUS'),
      this.app.client.getText(elements.KinoWinningsTableKino0).should.eventually.be.equal('0'),
      this.app.client.getText(elements.KinoWinningsTableKino0Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino0KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1).should.eventually.be.equal('1'),
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('5,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('105,00€'),
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

  it('Check betting amount field', function () {
    return Promise.all([
      this.app.client.getText(elements.KinoBetMultiplierLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
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
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn1Checked),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl2)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn2Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl3)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn3Checked),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl4)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn4Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl5)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn5Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl6)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn6Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl7)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn7Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl8)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn8Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl9)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn9Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl10)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn10Enabled),
    ]);
  });

  it('Add new bet for Area C', function () {
    return this.app.client.click(elements.KinoBetslipAddBet).should.eventually.be.fulfilled;
  });

  it('Select game type 1 (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Select Kino Bonus checkbox', function () {
    return this.app.client.click(elements.KinoBonusCheckBox).should.eventually.be.fulfilled;
  });

  it('Select betting amount field', function () {
    return this.app.client.click(elements.KinoBetMultiplierBtnLbl3).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow1)
        .getAttribute('class')
        .should.eventually.be.equal('selected'),
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
      this.app.client.getText(elements.KinoWinningsTableNumbers).should.eventually.be.equal('ΑΡΙΘΜΟΙ'),
      this.app.client.getText(elements.KinoWinningsTableWinnings).should.eventually.be.equal('ΚΕΡΔΟΣ'),
      this.app.client.getText(elements.KinoWinningsTableKinoBonus).should.eventually.equal('KINO BONUS'),
      this.app.client.getText(elements.KinoWinningsTableKino0).should.eventually.be.equal('0'),
      this.app.client.getText(elements.KinoWinningsTableKino0Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino0KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1).should.eventually.be.equal('1'),
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('5,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('105,00€'),
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

  it('Check betting amount field', function () {
    return Promise.all([
      this.app.client.getText(elements.KinoBetMultiplierLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
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
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn1Checked),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl2)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn2Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl3)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn3Checked),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl4)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn4Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl5)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn5Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl6)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn6Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl7)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn7Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl8)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn8Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl9)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn9Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl10)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn10Enabled),
    ]);
  });

  it('Add new bet for Area D', function () {
    return this.app.client.click(elements.KinoBetslipAddBet).should.eventually.be.fulfilled;
  });

  it('Select game type 1 (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Select Kino Bonus checkbox', function () {
    return this.app.client.click(elements.KinoBonusCheckBox).should.eventually.be.fulfilled;
  });

  it('Select betting amount field', function () {
    return this.app.client.click(elements.KinoBetMultiplierBtnLbl3).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow1)
        .getAttribute('class')
        .should.eventually.be.equal('selected'),
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
      this.app.client.getText(elements.KinoWinningsTableNumbers).should.eventually.be.equal('ΑΡΙΘΜΟΙ'),
      this.app.client.getText(elements.KinoWinningsTableWinnings).should.eventually.be.equal('ΚΕΡΔΟΣ'),
      this.app.client.getText(elements.KinoWinningsTableKinoBonus).should.eventually.equal('KINO BONUS'),
      this.app.client.getText(elements.KinoWinningsTableKino0).should.eventually.be.equal('0'),
      this.app.client.getText(elements.KinoWinningsTableKino0Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino0KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1).should.eventually.be.equal('1'),
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('5,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('105,00€'),
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

  it('Check betting amount field', function () {
    return Promise.all([
      this.app.client.getText(elements.KinoBetMultiplierLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
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
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn1Checked),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl2)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn2Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl3)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn3Checked),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl4)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn4Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl5)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn5Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl6)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn6Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl7)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn7Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl8)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn8Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl9)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn9Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl10)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn10Enabled),
    ]);
  });

  it('Add new bet for Area E', function () {
    return this.app.client.click(elements.KinoBetslipAddBet).should.eventually.be.fulfilled;
  });

  it('Select game type 1 (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Select Kino Bonus checkbox', function () {
    return this.app.client.click(elements.KinoBonusCheckBox).should.eventually.be.fulfilled;
  });

  it('Select betting amount field', function () {
    return this.app.client.click(elements.KinoBetMultiplierBtnLbl3).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow1)
        .getAttribute('class')
        .should.eventually.be.equal('selected'),
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
      this.app.client.getText(elements.KinoWinningsTableNumbers).should.eventually.be.equal('ΑΡΙΘΜΟΙ'),
      this.app.client.getText(elements.KinoWinningsTableWinnings).should.eventually.be.equal('ΚΕΡΔΟΣ'),
      this.app.client.getText(elements.KinoWinningsTableKinoBonus).should.eventually.equal('KINO BONUS'),
      this.app.client.getText(elements.KinoWinningsTableKino0).should.eventually.be.equal('0'),
      this.app.client.getText(elements.KinoWinningsTableKino0Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino0KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1).should.eventually.be.equal('1'),
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('5,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('105,00€'),
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

  it('Check betting amount field', function () {
    return Promise.all([
      this.app.client.getText(elements.KinoBetMultiplierLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
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
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn1Checked),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl2)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn2Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl3)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn3Checked),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl4)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn4Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl5)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn5Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl6)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn6Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl7)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn7Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl8)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn8Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl9)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn9Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl10)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn10Enabled),
    ]);
  });

  it('Add new bet for Area F', function () {
    return this.app.client.click(elements.KinoBetslipAddBet).should.eventually.be.fulfilled;
  });

  it('Select game type 1 (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Select Kino Bonus checkbox', function () {
    return this.app.client.click(elements.KinoBonusCheckBox).should.eventually.be.fulfilled;
  });

  it('Select betting amount field', function () {
    return this.app.client.click(elements.KinoBetMultiplierBtnLbl3).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow1)
        .getAttribute('class')
        .should.eventually.be.equal('selected'),
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
      this.app.client.getText(elements.KinoWinningsTableNumbers).should.eventually.be.equal('ΑΡΙΘΜΟΙ'),
      this.app.client.getText(elements.KinoWinningsTableWinnings).should.eventually.be.equal('ΚΕΡΔΟΣ'),
      this.app.client.getText(elements.KinoWinningsTableKinoBonus).should.eventually.equal('KINO BONUS'),
      this.app.client.getText(elements.KinoWinningsTableKino0).should.eventually.be.equal('0'),
      this.app.client.getText(elements.KinoWinningsTableKino0Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino0KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1).should.eventually.be.equal('1'),
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('5,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('105,00€'),
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

  it('Check betting amount field', function () {
    return Promise.all([
      this.app.client.getText(elements.KinoBetMultiplierLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
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
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn1Checked),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl2)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn2Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl3)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn3Checked),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl4)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn4Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl5)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn5Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl6)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn6Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl7)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn7Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl8)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn8Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl9)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn9Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl10)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn10Enabled),
    ]);
  });

  it('Select Kino Odd/Even game from KINO Standard game', function () {
    return this.app.client.click(elements.KinoOddEvenImgEl).should.eventually.be.fulfilled;
  });

  it('Check that modal of Odd/Even is opened', function () {
    return this.app.client.isVisible(elements.KinoOddEvenModal).should.eventually.be.true;
  });

  it('Select Even option', function () {
    return this.app.client.click(elements.KinoOddEvenEven).should.eventually.be.fulfilled;
  });

  it('Unselect default betting amount 1 Euro', function () {
    return this.app.client.click(elements.KinoOddEvenAmount1).should.eventually.be.fulfilled;
  });

  it('Select Betting amount 2 Euro', function () {
    return this.app.client.click(elements.KinoOddEvenAmount2).should.eventually.be.fulfilled;
  });

  it('Click add option', function () {
    return this.app.client.click(elements.KinoOddEvenAddBtn).should.eventually.be.fulfilled;
  });

  it('Check that modal of Odd/Even is closed', function () {
    return this.app.client.isVisible(elements.KinoOddEvenModal).should.eventually.be.false;
  });

  it('Check cost and selection on Odd/Even tab', function () {
    return Promise.all([
      this.app.client.getText(elements.KinoOddEvenBtnAmount).should.eventually.be.equal('2€'),
      this.app.client.getValue(elements.KinoOddEven).should.eventually.be.equal('even'),
    ]);
  });

  it('Select Kino Columns game from KINO Standard game', function () {
    return this.app.client.click(elements.KinoColumnsImgEl).should.eventually.be.fulfilled;
  });

  it('Check that modal of Columns is opened', function () {
    return this.app.client.isVisible(elements.KinoColumnsModal).should.eventually.be.true;
  });

  it('Select Column 1 option', function () {
    return this.app.client.click(elements.KinoColumns1Column).should.eventually.be.fulfilled;
  });

  it('Unselect default betting amount 1 Euro', function () {
    return this.app.client.click(elements.KinoColumnsAmount1).should.eventually.be.fulfilled;
  });

  it('Select Betting amount 2 Euro', function () {
    return this.app.client.click(elements.KinoColumnsAmount2).should.eventually.be.fulfilled;
  });

  it('Click add option', function () {
    return this.app.client.click(elements.KinoColumnsAddBtn).should.eventually.be.fulfilled;
  });

  it('Check that modal of Columns is closed', function () {
    return this.app.client.isVisible(elements.KinoColumnsModal).should.eventually.be.false;
  });

  it('Check cost and selection on Columns tab', function () {
    return Promise.all([
      this.app.client.getText(elements.KinoColumnsBtnAmount).should.eventually.be.equal('2€'),
      this.app.client.getValue(elements.KinoColumns).should.eventually.be.equal('1'),
    ]);
  });

  ////////////////////////////////////////// Check 2 consecutive draws ///////////////////////////////////////////////////

  it('Select 2 consecutive draws ', function () {
    return this.app.client.click(elements.KinoBetConsDrawsPlus).should.eventually.be.fulfilled;
  });

  ////////////////////////////////////////// Check full betslip information //////////////////////////////////////////////

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaACost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaAKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaAClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaANumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBCost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaBKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaBClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaBNumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCCost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaCKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaCClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaCNumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDCost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaDKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaDClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaDNumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaECost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaEKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaEClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaENumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFCost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaFKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaFClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaFNumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAddBet).should.eventually.be.false,
      this.app.client.getText(elements.KinoOddEvenBtnAmount).should.eventually.be.equal('2€'),
      this.app.client.getValue(elements.KinoOddEven).should.eventually.be.equal('even'),
      this.app.client.getText(elements.KinoColumnsBtnAmount).should.eventually.be.equal('2€'),
      this.app.client.getValue(elements.KinoColumns).should.eventually.be.equal('1'),
    ]);
  });

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.KinoBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('true'),
      // this.app.client.isVisible(elements.KinoBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipSubmitLbl).should.eventually.be.equal('ΑΠΟΔΟΧΗ'),
      this.app.client.getText(elements.KinoBetslipCostLbl).should.eventually.be.equal('ΚΟΣΤΟΣ ΔΕΛΤΙΟΥ\n56€'),
      this.app.client.getText(elements.KinoBetslipCost).should.eventually.be.equal('56€'),
    ]);
  });

  /////////////////////////////////////////////// Delete Area A ////////////////////////////////////////////////////////////

  it('Select Area A from Betslip', function () {
    return this.app.client.click(elements.KinoBetslipAreaA).should.eventually.be.fulfilled;
  });

  it('Check quick pick field', function () {
    return this.app.client.getValue(elements.KinoQuickPickInput).should.eventually.be.equal('1');
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaACost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaAKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaAClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaANumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBCost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaBKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaBClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaBNumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCCost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaCKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaCClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaCNumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDCost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaDKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaDClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaDNumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaECost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaEKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaEClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaENumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFCost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaFKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaFClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaFNumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAddBet).should.eventually.be.false,
      this.app.client.getText(elements.KinoOddEvenBtnAmount).should.eventually.be.equal('2€'),
      this.app.client.getValue(elements.KinoOddEven).should.eventually.be.equal('even'),
      this.app.client.getText(elements.KinoColumnsBtnAmount).should.eventually.be.equal('2€'),
      this.app.client.getValue(elements.KinoColumns).should.eventually.be.equal('1'),
    ]);
  });

  it('Try to clear Area A from Areas', function () {
    return this.app.client.click(elements.KinoBetClearArea).should.eventually.be.fulfilled;
  });

  it('Check that modal is shown', function () {
    return this.app.client.isVisible(elements.KinoModalAPopup).should.eventually.be.true;
  });

  it('Discard Clear Area A from Areas', function () {
    let self = this;
    return Promise.all([
      this.app.client
        .elements(elements.KinoModalAMsgLbl)
        .getAttribute('innerText')
        .should.eventually.be.equal('ΚΑΘΑΡΙΣΜΟΣ ΠΕΡΙΟΧΗΣ'),
      this.app.client
        .elements(elements.KinoModalAMsg)
        .getAttribute('innerText')
        .should.eventually.be.equal(
          'Όλες οι επιλογές αυτής της περιοχής θα διαγραφούν. Είστε σίγουρος/η ότι θέλετε να συνεχίσετε;',
        ),
      this.app.client.elements(elements.KinoModalAYesBtn).getAttribute('innerText').should.eventually.be.equal('Ναι'),
      this.app.client.elements(elements.KinoModalANoBtn).getAttribute('innerText').should.eventually.be.equal('Όχι'),
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

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaACost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaAKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaAClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaANumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBCost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaBKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaBClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaBNumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCCost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaCKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaCClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaCNumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDCost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaDKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaDClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaDNumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaECost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaEKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaEClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaENumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFCost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaFKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaFClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaFNumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAddBet).should.eventually.be.false,
      this.app.client.getText(elements.KinoOddEvenBtnAmount).should.eventually.be.equal('2€'),
      this.app.client.getValue(elements.KinoOddEven).should.eventually.be.equal('even'),
      this.app.client.getText(elements.KinoColumnsBtnAmount).should.eventually.be.equal('2€'),
      this.app.client.getValue(elements.KinoColumns).should.eventually.be.equal('1'),
    ]);
  });

  it('Check Kino Bonus field', function () {
    return this.app.client.getValue(elements.KinoBonusCheckBox).should.eventually.be.equal('on');
  });

  it('Check betting amount field', function () {
    return Promise.all([
      this.app.client.getText(elements.KinoBetMultiplierLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
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
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn1Checked),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl2)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn2Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl3)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn3Checked),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl4)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn4Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl5)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn5Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl6)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn6Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl7)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn7Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl8)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn8Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl9)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn9Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl10)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn10Enabled),
    ]);
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow1)
        .getAttribute('class')
        .should.eventually.be.equal('selected'),
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
      this.app.client.getText(elements.KinoWinningsTableNumbers).should.eventually.be.equal('ΑΡΙΘΜΟΙ'),
      this.app.client.getText(elements.KinoWinningsTableWinnings).should.eventually.be.equal('ΚΕΡΔΟΣ'),
      this.app.client.getText(elements.KinoWinningsTableKinoBonus).should.eventually.equal('KINO BONUS'),
      this.app.client.getText(elements.KinoWinningsTableKino0).should.eventually.be.equal('0'),
      this.app.client.getText(elements.KinoWinningsTableKino0Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino0KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1).should.eventually.be.equal('1'),
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('5,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('105,00€'),
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

  it('Check consecutive draws field', function () {
    return this.app.client.getValue(elements.KinoBetConsDrawsInput).should.eventually.be.equal('2');
  });

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.KinoBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('true'),
      // this.app.client.isVisible(elements.KinoBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipSubmitLbl).should.eventually.be.equal('ΑΠΟΔΟΧΗ'),
      this.app.client.getText(elements.KinoBetslipCostLbl).should.eventually.be.equal('ΚΟΣΤΟΣ ΔΕΛΤΙΟΥ\n56€'),
      this.app.client.getText(elements.KinoBetslipCost).should.eventually.be.equal('56€'),
    ]);
  });

  it('Try to clear Area A from Areas', function () {
    return this.app.client.click(elements.KinoBetClearArea).should.eventually.be.fulfilled;
  });

  it('Check that modal is shown', function () {
    return this.app.client.isVisible(elements.KinoModalAPopup).should.eventually.be.true;
  });

  it('Confirm Clear Area A from Areas', function () {
    let self = this;
    return Promise.all([
      this.app.client
        .elements(elements.KinoModalAMsgLbl)
        .getAttribute('innerText')
        .should.eventually.be.equal('ΚΑΘΑΡΙΣΜΟΣ ΠΕΡΙΟΧΗΣ'),
      this.app.client
        .elements(elements.KinoModalAMsg)
        .getAttribute('innerText')
        .should.eventually.be.equal(
          'Όλες οι επιλογές αυτής της περιοχής θα διαγραφούν. Είστε σίγουρος/η ότι θέλετε να συνεχίσετε;',
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

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaACost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaAKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaAClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaANumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBCost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaBKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaBClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaBNumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCCost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaCKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaCClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaCNumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDCost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaDKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaDClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaDNumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaECost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaEKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaEClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaENumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAddBet).should.eventually.be.true,
      this.app.client.getText(elements.KinoOddEvenBtnAmount).should.eventually.be.equal('2€'),
      this.app.client.getValue(elements.KinoOddEven).should.eventually.be.equal('even'),
      this.app.client.getText(elements.KinoColumnsBtnAmount).should.eventually.be.equal('2€'),
      this.app.client.getValue(elements.KinoColumns).should.eventually.be.equal('1'),
    ]);
  });

  it('Check Kino Bonus field', function () {
    return this.app.client.getValue(elements.KinoBonusCheckBox).should.eventually.be.equal('on');
  });

  it('Check betting amount field', function () {
    return Promise.all([
      this.app.client.getText(elements.KinoBetMultiplierLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
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
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn1Checked),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl2)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn2Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl3)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn3Checked),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl4)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn4Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl5)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn5Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl6)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn6Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl7)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn7Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl8)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn8Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl9)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn9Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl10)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn10Enabled),
    ]);
  });

  it('Check consecutive draws field', function () {
    return this.app.client.getValue(elements.KinoBetConsDrawsInput).should.eventually.be.equal('2');
  });

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.KinoBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('true'),
      // this.app.client.isVisible(elements.KinoBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipSubmitLbl).should.eventually.be.equal('ΑΠΟΔΟΧΗ'),
      this.app.client.getText(elements.KinoBetslipCostLbl).should.eventually.be.equal('ΚΟΣΤΟΣ ΔΕΛΤΙΟΥ\n48€'),
      this.app.client.getText(elements.KinoBetslipCost).should.eventually.be.equal('48€'),
    ]);
  });

  it('Check that game type of Area A is set', function () {
    return this.app.client.getValue(elements.KinoQuickPickInput).should.eventually.be.equal('1');
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow1)
        .getAttribute('class')
        .should.eventually.be.equal('selected'),
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
      this.app.client.getText(elements.KinoWinningsTableNumbers).should.eventually.be.equal('ΑΡΙΘΜΟΙ'),
      this.app.client.getText(elements.KinoWinningsTableWinnings).should.eventually.be.equal('ΚΕΡΔΟΣ'),
      this.app.client.getText(elements.KinoWinningsTableKinoBonus).should.eventually.equal('KINO BONUS'),
      this.app.client.getText(elements.KinoWinningsTableKino0).should.eventually.be.equal('0'),
      this.app.client.getText(elements.KinoWinningsTableKino0Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino0KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1).should.eventually.be.equal('1'),
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('5,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('105,00€'),
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

  /////////////////////////////////////////////// Delete Area B ////////////////////////////////////////////////////////////

  it('Select Area B from Betslip', function () {
    return this.app.client.click(elements.KinoBetslipAreaB).should.eventually.be.fulfilled;
  });

  it('Check quick pick field', function () {
    return this.app.client.getValue(elements.KinoQuickPickInput).should.eventually.be.equal('1');
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaACost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaAKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaAClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaANumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBCost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaBKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaBClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaBNumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCCost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaCKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaCClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaCNumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDCost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaDKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaDClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaDNumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaECost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaEKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaEClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaENumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAddBet).should.eventually.be.true,
      this.app.client.getText(elements.KinoOddEvenBtnAmount).should.eventually.be.equal('2€'),
      this.app.client.getValue(elements.KinoOddEven).should.eventually.be.equal('even'),
      this.app.client.getText(elements.KinoColumnsBtnAmount).should.eventually.be.equal('2€'),
      this.app.client.getValue(elements.KinoColumns).should.eventually.be.equal('1'),
    ]);
  });

  it('Try to clear Area B from Areas', function () {
    return this.app.client.click(elements.KinoBetClearArea).should.eventually.be.fulfilled;
  });

  it('Check that modal is shown', function () {
    return this.app.client.isVisible(elements.KinoModalAPopup).should.eventually.be.true;
  });

  it('Discard Clear Area B from Areas', function () {
    let self = this;
    return Promise.all([
      this.app.client
        .elements(elements.KinoModalAMsgLbl)
        .getAttribute('innerText')
        .should.eventually.be.equal('ΚΑΘΑΡΙΣΜΟΣ ΠΕΡΙΟΧΗΣ'),
      this.app.client
        .elements(elements.KinoModalAMsg)
        .getAttribute('innerText')
        .should.eventually.be.equal(
          'Όλες οι επιλογές αυτής της περιοχής θα διαγραφούν. Είστε σίγουρος/η ότι θέλετε να συνεχίσετε;',
        ),
      this.app.client.elements(elements.KinoModalAYesBtn).getAttribute('innerText').should.eventually.be.equal('Ναι'),
      this.app.client.elements(elements.KinoModalANoBtn).getAttribute('innerText').should.eventually.be.equal('Όχι'),
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

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaACost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaAKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaAClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaANumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBCost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaBKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaBClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaBNumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCCost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaCKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaCClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaCNumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDCost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaDKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaDClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaDNumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaECost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaEKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaEClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaENumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAddBet).should.eventually.be.true,
      this.app.client.getText(elements.KinoOddEvenBtnAmount).should.eventually.be.equal('2€'),
      this.app.client.getValue(elements.KinoOddEven).should.eventually.be.equal('even'),
      this.app.client.getText(elements.KinoColumnsBtnAmount).should.eventually.be.equal('2€'),
      this.app.client.getValue(elements.KinoColumns).should.eventually.be.equal('1'),
    ]);
  });

  it('Check Kino Bonus field', function () {
    return this.app.client.getValue(elements.KinoBonusCheckBox).should.eventually.be.equal('on');
  });

  it('Check betting amount field', function () {
    return Promise.all([
      this.app.client.getText(elements.KinoBetMultiplierLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
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
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn1Checked),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl2)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn2Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl3)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn3Checked),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl4)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn4Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl5)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn5Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl6)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn6Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl7)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn7Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl8)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn8Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl9)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn9Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl10)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn10Enabled),
    ]);
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow1)
        .getAttribute('class')
        .should.eventually.be.equal('selected'),
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
      this.app.client.getText(elements.KinoWinningsTableNumbers).should.eventually.be.equal('ΑΡΙΘΜΟΙ'),
      this.app.client.getText(elements.KinoWinningsTableWinnings).should.eventually.be.equal('ΚΕΡΔΟΣ'),
      this.app.client.getText(elements.KinoWinningsTableKinoBonus).should.eventually.equal('KINO BONUS'),
      this.app.client.getText(elements.KinoWinningsTableKino0).should.eventually.be.equal('0'),
      this.app.client.getText(elements.KinoWinningsTableKino0Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino0KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1).should.eventually.be.equal('1'),
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('5,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('105,00€'),
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

  it('Check consecutive draws field', function () {
    return this.app.client.getValue(elements.KinoBetConsDrawsInput).should.eventually.be.equal('2');
  });

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.KinoBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('true'),
      // this.app.client.isVisible(elements.KinoBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipSubmitLbl).should.eventually.be.equal('ΑΠΟΔΟΧΗ'),
      this.app.client.getText(elements.KinoBetslipCostLbl).should.eventually.be.equal('ΚΟΣΤΟΣ ΔΕΛΤΙΟΥ\n48€'),
      this.app.client.getText(elements.KinoBetslipCost).should.eventually.be.equal('48€'),
    ]);
  });

  it('Try to clear Area B from Areas', function () {
    return this.app.client.click(elements.KinoBetClearArea).should.eventually.be.fulfilled;
  });

  it('Check that modal is shown', function () {
    return this.app.client.isVisible(elements.KinoModalAPopup).should.eventually.be.true;
  });

  it('Confirm Clear Area B from Areas', function () {
    let self = this;
    return Promise.all([
      this.app.client
        .elements(elements.KinoModalAMsgLbl)
        .getAttribute('innerText')
        .should.eventually.be.equal('ΚΑΘΑΡΙΣΜΟΣ ΠΕΡΙΟΧΗΣ'),
      this.app.client
        .elements(elements.KinoModalAMsg)
        .getAttribute('innerText')
        .should.eventually.be.equal(
          'Όλες οι επιλογές αυτής της περιοχής θα διαγραφούν. Είστε σίγουρος/η ότι θέλετε να συνεχίσετε;',
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

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaACost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaAKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaAClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaANumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBCost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaBKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaBClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaBNumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCCost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaCKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaCClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaCNumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDCost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaDKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaDClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaDNumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAddBet).should.eventually.be.true,
      this.app.client.getText(elements.KinoOddEvenBtnAmount).should.eventually.be.equal('2€'),
      this.app.client.getValue(elements.KinoOddEven).should.eventually.be.equal('even'),
      this.app.client.getText(elements.KinoColumnsBtnAmount).should.eventually.be.equal('2€'),
      this.app.client.getValue(elements.KinoColumns).should.eventually.be.equal('1'),
    ]);
  });

  it('Check Kino Bonus field', function () {
    return this.app.client.getValue(elements.KinoBonusCheckBox).should.eventually.be.equal('on');
  });

  it('Check betting amount field', function () {
    return Promise.all([
      this.app.client.getText(elements.KinoBetMultiplierLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
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
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn1Checked),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl2)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn2Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl3)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn3Checked),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl4)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn4Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl5)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn5Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl6)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn6Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl7)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn7Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl8)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn8Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl9)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn9Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl10)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn10Enabled),
    ]);
  });

  it('Check consecutive draws field', function () {
    return this.app.client.getValue(elements.KinoBetConsDrawsInput).should.eventually.be.equal('2');
  });

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.KinoBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('true'),
      // this.app.client.isVisible(elements.KinoBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipSubmitLbl).should.eventually.be.equal('ΑΠΟΔΟΧΗ'),
      this.app.client.getText(elements.KinoBetslipCostLbl).should.eventually.be.equal('ΚΟΣΤΟΣ ΔΕΛΤΙΟΥ\n40€'),
      this.app.client.getText(elements.KinoBetslipCost).should.eventually.be.equal('40€'),
    ]);
  });

  it('Check that game type of Area B is set', function () {
    return this.app.client.getValue(elements.KinoQuickPickInput).should.eventually.be.equal('1');
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow1)
        .getAttribute('class')
        .should.eventually.be.equal('selected'),
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
      this.app.client.getText(elements.KinoWinningsTableNumbers).should.eventually.be.equal('ΑΡΙΘΜΟΙ'),
      this.app.client.getText(elements.KinoWinningsTableWinnings).should.eventually.be.equal('ΚΕΡΔΟΣ'),
      this.app.client.getText(elements.KinoWinningsTableKinoBonus).should.eventually.equal('KINO BONUS'),
      this.app.client.getText(elements.KinoWinningsTableKino0).should.eventually.be.equal('0'),
      this.app.client.getText(elements.KinoWinningsTableKino0Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino0KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1).should.eventually.be.equal('1'),
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('5,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('105,00€'),
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
  /////////////////////////////////////////////// Delete Area C ////////////////////////////////////////////////////////////

  it('Select Area C from Betslip', function () {
    return this.app.client.click(elements.KinoBetslipAreaB).should.eventually.be.fulfilled;
  });

  it('Check quick pick field', function () {
    return this.app.client.getValue(elements.KinoQuickPickInput).should.eventually.be.equal('1');
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaACost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaAKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaAClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaANumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBCost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaBKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaBClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaBNumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCCost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaCKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaCClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaCNumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDCost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaDKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaDClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaDNumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAddBet).should.eventually.be.true,
      this.app.client.getText(elements.KinoOddEvenBtnAmount).should.eventually.be.equal('2€'),
      this.app.client.getValue(elements.KinoOddEven).should.eventually.be.equal('even'),
      this.app.client.getText(elements.KinoColumnsBtnAmount).should.eventually.be.equal('2€'),
      this.app.client.getValue(elements.KinoColumns).should.eventually.be.equal('1'),
    ]);
  });

  it('Try to clear Area C from Areas', function () {
    return this.app.client.click(elements.KinoBetClearArea).should.eventually.be.fulfilled;
  });

  it('Check that modal is shown', function () {
    return this.app.client.isVisible(elements.KinoModalAPopup).should.eventually.be.true;
  });

  it('Discard Clear Area C from Areas', function () {
    let self = this;
    return Promise.all([
      this.app.client
        .elements(elements.KinoModalAMsgLbl)
        .getAttribute('innerText')
        .should.eventually.be.equal('ΚΑΘΑΡΙΣΜΟΣ ΠΕΡΙΟΧΗΣ'),
      this.app.client
        .elements(elements.KinoModalAMsg)
        .getAttribute('innerText')
        .should.eventually.be.equal(
          'Όλες οι επιλογές αυτής της περιοχής θα διαγραφούν. Είστε σίγουρος/η ότι θέλετε να συνεχίσετε;',
        ),
      this.app.client.elements(elements.KinoModalAYesBtn).getAttribute('innerText').should.eventually.be.equal('Ναι'),
      this.app.client.elements(elements.KinoModalANoBtn).getAttribute('innerText').should.eventually.be.equal('Όχι'),
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

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaACost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaAKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaAClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaANumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBCost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaBKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaBClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaBNumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCCost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaCKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaCClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaCNumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDCost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaDKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaDClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaDNumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAddBet).should.eventually.be.true,
      this.app.client.getText(elements.KinoOddEvenBtnAmount).should.eventually.be.equal('2€'),
      this.app.client.getValue(elements.KinoOddEven).should.eventually.be.equal('even'),
      this.app.client.getText(elements.KinoColumnsBtnAmount).should.eventually.be.equal('2€'),
      this.app.client.getValue(elements.KinoColumns).should.eventually.be.equal('1'),
    ]);
  });

  it('Check Kino Bonus field', function () {
    return this.app.client.getValue(elements.KinoBonusCheckBox).should.eventually.be.equal('on');
  });

  it('Check betting amount field', function () {
    return Promise.all([
      this.app.client.getText(elements.KinoBetMultiplierLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
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
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn1Checked),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl2)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn2Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl3)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn3Checked),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl4)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn4Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl5)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn5Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl6)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn6Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl7)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn7Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl8)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn8Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl9)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn9Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl10)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn10Enabled),
    ]);
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow1)
        .getAttribute('class')
        .should.eventually.be.equal('selected'),
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
      this.app.client.getText(elements.KinoWinningsTableNumbers).should.eventually.be.equal('ΑΡΙΘΜΟΙ'),
      this.app.client.getText(elements.KinoWinningsTableWinnings).should.eventually.be.equal('ΚΕΡΔΟΣ'),
      this.app.client.getText(elements.KinoWinningsTableKinoBonus).should.eventually.equal('KINO BONUS'),
      this.app.client.getText(elements.KinoWinningsTableKino0).should.eventually.be.equal('0'),
      this.app.client.getText(elements.KinoWinningsTableKino0Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino0KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1).should.eventually.be.equal('1'),
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('5,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('105,00€'),
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

  it('Check consecutive draws field', function () {
    return this.app.client.getValue(elements.KinoBetConsDrawsInput).should.eventually.be.equal('2');
  });

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.KinoBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('true'),
      // this.app.client.isVisible(elements.KinoBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipSubmitLbl).should.eventually.be.equal('ΑΠΟΔΟΧΗ'),
      this.app.client.getText(elements.KinoBetslipCostLbl).should.eventually.be.equal('ΚΟΣΤΟΣ ΔΕΛΤΙΟΥ\n40€'),
      this.app.client.getText(elements.KinoBetslipCost).should.eventually.be.equal('40€'),
    ]);
  });

  it('Try to clear Area C from Areas', function () {
    return this.app.client.click(elements.KinoBetClearArea).should.eventually.be.fulfilled;
  });

  it('Check that modal is shown', function () {
    return this.app.client.isVisible(elements.KinoModalAPopup).should.eventually.be.true;
  });

  it('Confirm Clear Area C from Areas', function () {
    let self = this;
    return Promise.all([
      this.app.client
        .elements(elements.KinoModalAMsgLbl)
        .getAttribute('innerText')
        .should.eventually.be.equal('ΚΑΘΑΡΙΣΜΟΣ ΠΕΡΙΟΧΗΣ'),
      this.app.client
        .elements(elements.KinoModalAMsg)
        .getAttribute('innerText')
        .should.eventually.be.equal(
          'Όλες οι επιλογές αυτής της περιοχής θα διαγραφούν. Είστε σίγουρος/η ότι θέλετε να συνεχίσετε;',
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

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaACost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaAKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaAClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaANumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBCost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaBKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaBClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaBNumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCCost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaCKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaCClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaCNumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAddBet).should.eventually.be.true,
      this.app.client.getText(elements.KinoOddEvenBtnAmount).should.eventually.be.equal('2€'),
      this.app.client.getValue(elements.KinoOddEven).should.eventually.be.equal('even'),
      this.app.client.getText(elements.KinoColumnsBtnAmount).should.eventually.be.equal('2€'),
      this.app.client.getValue(elements.KinoColumns).should.eventually.be.equal('1'),
    ]);
  });

  it('Check Kino Bonus field', function () {
    return this.app.client.getValue(elements.KinoBonusCheckBox).should.eventually.be.equal('on');
  });

  it('Check betting amount field', function () {
    return Promise.all([
      this.app.client.getText(elements.KinoBetMultiplierLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
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
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn1Checked),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl2)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn2Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl3)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn3Checked),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl4)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn4Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl5)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn5Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl6)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn6Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl7)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn7Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl8)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn8Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl9)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn9Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl10)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn10Enabled),
    ]);
  });

  it('Check consecutive draws field', function () {
    return this.app.client.getValue(elements.KinoBetConsDrawsInput).should.eventually.be.equal('2');
  });

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.KinoBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('true'),
      // this.app.client.isVisible(elements.KinoBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipSubmitLbl).should.eventually.be.equal('ΑΠΟΔΟΧΗ'),
      this.app.client.getText(elements.KinoBetslipCostLbl).should.eventually.be.equal('ΚΟΣΤΟΣ ΔΕΛΤΙΟΥ\n32€'),
      this.app.client.getText(elements.KinoBetslipCost).should.eventually.be.equal('32€'),
    ]);
  });

  it('Check that game type of Area C is set', function () {
    return this.app.client.getValue(elements.KinoQuickPickInput).should.eventually.be.equal('1');
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow1)
        .getAttribute('class')
        .should.eventually.be.equal('selected'),
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
      this.app.client.getText(elements.KinoWinningsTableNumbers).should.eventually.be.equal('ΑΡΙΘΜΟΙ'),
      this.app.client.getText(elements.KinoWinningsTableWinnings).should.eventually.be.equal('ΚΕΡΔΟΣ'),
      this.app.client.getText(elements.KinoWinningsTableKinoBonus).should.eventually.equal('KINO BONUS'),
      this.app.client.getText(elements.KinoWinningsTableKino0).should.eventually.be.equal('0'),
      this.app.client.getText(elements.KinoWinningsTableKino0Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino0KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1).should.eventually.be.equal('1'),
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('5,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('105,00€'),
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
  /////////////////////////////////////////////// Delete Area D ////////////////////////////////////////////////////////////

  it('Select Area D from Betslip', function () {
    return this.app.client.click(elements.KinoBetslipAreaB).should.eventually.be.fulfilled;
  });

  it('Check quick pick field', function () {
    return this.app.client.getValue(elements.KinoQuickPickInput).should.eventually.be.equal('1');
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaACost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaAKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaAClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaANumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBCost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaBKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaBClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaBNumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCCost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaCKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaCClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaCNumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAddBet).should.eventually.be.true,
      this.app.client.getText(elements.KinoOddEvenBtnAmount).should.eventually.be.equal('2€'),
      this.app.client.getValue(elements.KinoOddEven).should.eventually.be.equal('even'),
      this.app.client.getText(elements.KinoColumnsBtnAmount).should.eventually.be.equal('2€'),
      this.app.client.getValue(elements.KinoColumns).should.eventually.be.equal('1'),
    ]);
  });

  it('Try to clear Area D from Areas', function () {
    return this.app.client.click(elements.KinoBetClearArea).should.eventually.be.fulfilled;
  });

  it('Check that modal is shown', function () {
    return this.app.client.isVisible(elements.KinoModalAPopup).should.eventually.be.true;
  });

  it('Discard Clear Area D from Areas', function () {
    let self = this;
    return Promise.all([
      this.app.client
        .elements(elements.KinoModalAMsgLbl)
        .getAttribute('innerText')
        .should.eventually.be.equal('ΚΑΘΑΡΙΣΜΟΣ ΠΕΡΙΟΧΗΣ'),
      this.app.client
        .elements(elements.KinoModalAMsg)
        .getAttribute('innerText')
        .should.eventually.be.equal(
          'Όλες οι επιλογές αυτής της περιοχής θα διαγραφούν. Είστε σίγουρος/η ότι θέλετε να συνεχίσετε;',
        ),
      this.app.client.elements(elements.KinoModalAYesBtn).getAttribute('innerText').should.eventually.be.equal('Ναι'),
      this.app.client.elements(elements.KinoModalANoBtn).getAttribute('innerText').should.eventually.be.equal('Όχι'),
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

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaACost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaAKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaAClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaANumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBCost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaBKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaBClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaBNumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCCost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaCKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaCClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaCNumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAddBet).should.eventually.be.true,
      this.app.client.getText(elements.KinoOddEvenBtnAmount).should.eventually.be.equal('2€'),
      this.app.client.getValue(elements.KinoOddEven).should.eventually.be.equal('even'),
      this.app.client.getText(elements.KinoColumnsBtnAmount).should.eventually.be.equal('2€'),
      this.app.client.getValue(elements.KinoColumns).should.eventually.be.equal('1'),
    ]);
  });

  it('Check Kino Bonus field', function () {
    return this.app.client.getValue(elements.KinoBonusCheckBox).should.eventually.be.equal('on');
  });

  it('Check betting amount field', function () {
    return Promise.all([
      this.app.client.getText(elements.KinoBetMultiplierLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
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
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn1Checked),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl2)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn2Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl3)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn3Checked),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl4)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn4Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl5)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn5Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl6)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn6Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl7)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn7Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl8)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn8Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl9)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn9Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl10)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn10Enabled),
    ]);
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow1)
        .getAttribute('class')
        .should.eventually.be.equal('selected'),
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
      this.app.client.getText(elements.KinoWinningsTableNumbers).should.eventually.be.equal('ΑΡΙΘΜΟΙ'),
      this.app.client.getText(elements.KinoWinningsTableWinnings).should.eventually.be.equal('ΚΕΡΔΟΣ'),
      this.app.client.getText(elements.KinoWinningsTableKinoBonus).should.eventually.equal('KINO BONUS'),
      this.app.client.getText(elements.KinoWinningsTableKino0).should.eventually.be.equal('0'),
      this.app.client.getText(elements.KinoWinningsTableKino0Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino0KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1).should.eventually.be.equal('1'),
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('5,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('105,00€'),
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

  it('Check consecutive draws field', function () {
    return this.app.client.getValue(elements.KinoBetConsDrawsInput).should.eventually.be.equal('2');
  });

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.KinoBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('true'),
      // this.app.client.isVisible(elements.KinoBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipSubmitLbl).should.eventually.be.equal('ΑΠΟΔΟΧΗ'),
      this.app.client.getText(elements.KinoBetslipCostLbl).should.eventually.be.equal('ΚΟΣΤΟΣ ΔΕΛΤΙΟΥ\n32€'),
      this.app.client.getText(elements.KinoBetslipCost).should.eventually.be.equal('32€'),
    ]);
  });

  it('Try to clear Area D from Areas', function () {
    return this.app.client.click(elements.KinoBetClearArea).should.eventually.be.fulfilled;
  });

  it('Check that modal is shown', function () {
    return this.app.client.isVisible(elements.KinoModalAPopup).should.eventually.be.true;
  });

  it('Confirm Clear Area D from Areas', function () {
    let self = this;
    return Promise.all([
      this.app.client
        .elements(elements.KinoModalAMsgLbl)
        .getAttribute('innerText')
        .should.eventually.be.equal('ΚΑΘΑΡΙΣΜΟΣ ΠΕΡΙΟΧΗΣ'),
      this.app.client
        .elements(elements.KinoModalAMsg)
        .getAttribute('innerText')
        .should.eventually.be.equal(
          'Όλες οι επιλογές αυτής της περιοχής θα διαγραφούν. Είστε σίγουρος/η ότι θέλετε να συνεχίσετε;',
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

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaACost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaAKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaAClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaANumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBCost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaBKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaBClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaBNumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAddBet).should.eventually.be.true,
      this.app.client.getText(elements.KinoOddEvenBtnAmount).should.eventually.be.equal('2€'),
      this.app.client.getValue(elements.KinoOddEven).should.eventually.be.equal('even'),
      this.app.client.getText(elements.KinoColumnsBtnAmount).should.eventually.be.equal('2€'),
      this.app.client.getValue(elements.KinoColumns).should.eventually.be.equal('1'),
    ]);
  });

  it('Check Kino Bonus field', function () {
    return this.app.client.getValue(elements.KinoBonusCheckBox).should.eventually.be.equal('on');
  });

  it('Check betting amount field', function () {
    return Promise.all([
      this.app.client.getText(elements.KinoBetMultiplierLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
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
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn1Checked),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl2)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn2Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl3)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn3Checked),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl4)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn4Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl5)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn5Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl6)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn6Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl7)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn7Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl8)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn8Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl9)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn9Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl10)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn10Enabled),
    ]);
  });

  it('Check consecutive draws field', function () {
    return this.app.client.getValue(elements.KinoBetConsDrawsInput).should.eventually.be.equal('2');
  });

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.KinoBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('true'),
      // this.app.client.isVisible(elements.KinoBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipSubmitLbl).should.eventually.be.equal('ΑΠΟΔΟΧΗ'),
      this.app.client.getText(elements.KinoBetslipCostLbl).should.eventually.be.equal('ΚΟΣΤΟΣ ΔΕΛΤΙΟΥ\n24€'),
      this.app.client.getText(elements.KinoBetslipCost).should.eventually.be.equal('24€'),
    ]);
  });

  it('Check that game type of Area D is set', function () {
    return this.app.client.getValue(elements.KinoQuickPickInput).should.eventually.be.equal('1');
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow1)
        .getAttribute('class')
        .should.eventually.be.equal('selected'),
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
      this.app.client.getText(elements.KinoWinningsTableNumbers).should.eventually.be.equal('ΑΡΙΘΜΟΙ'),
      this.app.client.getText(elements.KinoWinningsTableWinnings).should.eventually.be.equal('ΚΕΡΔΟΣ'),
      this.app.client.getText(elements.KinoWinningsTableKinoBonus).should.eventually.equal('KINO BONUS'),
      this.app.client.getText(elements.KinoWinningsTableKino0).should.eventually.be.equal('0'),
      this.app.client.getText(elements.KinoWinningsTableKino0Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino0KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1).should.eventually.be.equal('1'),
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('5,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('105,00€'),
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

  /////////////////////////////////////////////// Delete Area E ////////////////////////////////////////////////////////////

  it('Select Area E from Betslip', function () {
    return this.app.client.click(elements.KinoBetslipAreaB).should.eventually.be.fulfilled;
  });

  it('Check quick pick field', function () {
    return this.app.client.getValue(elements.KinoQuickPickInput).should.eventually.be.equal('1');
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaACost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaAKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaAClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaANumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBCost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaBKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaBClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaBNumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAddBet).should.eventually.be.true,
      this.app.client.getText(elements.KinoOddEvenBtnAmount).should.eventually.be.equal('2€'),
      this.app.client.getValue(elements.KinoOddEven).should.eventually.be.equal('even'),
      this.app.client.getText(elements.KinoColumnsBtnAmount).should.eventually.be.equal('2€'),
      this.app.client.getValue(elements.KinoColumns).should.eventually.be.equal('1'),
    ]);
  });

  it('Try to clear Area E from Areas', function () {
    return this.app.client.click(elements.KinoBetClearArea).should.eventually.be.fulfilled;
  });

  it('Check that modal is shown', function () {
    return this.app.client.isVisible(elements.KinoModalAPopup).should.eventually.be.true;
  });

  it('Discard Clear Area E from Areas', function () {
    let self = this;
    return Promise.all([
      this.app.client
        .elements(elements.KinoModalAMsgLbl)
        .getAttribute('innerText')
        .should.eventually.be.equal('ΚΑΘΑΡΙΣΜΟΣ ΠΕΡΙΟΧΗΣ'),
      this.app.client
        .elements(elements.KinoModalAMsg)
        .getAttribute('innerText')
        .should.eventually.be.equal(
          'Όλες οι επιλογές αυτής της περιοχής θα διαγραφούν. Είστε σίγουρος/η ότι θέλετε να συνεχίσετε;',
        ),
      this.app.client.elements(elements.KinoModalAYesBtn).getAttribute('innerText').should.eventually.be.equal('Ναι'),
      this.app.client.elements(elements.KinoModalANoBtn).getAttribute('innerText').should.eventually.be.equal('Όχι'),
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

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaACost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaAKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaAClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaANumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBCost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaBKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaBClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaBNumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAddBet).should.eventually.be.true,
      this.app.client.getText(elements.KinoOddEvenBtnAmount).should.eventually.be.equal('2€'),
      this.app.client.getValue(elements.KinoOddEven).should.eventually.be.equal('even'),
      this.app.client.getText(elements.KinoColumnsBtnAmount).should.eventually.be.equal('2€'),
      this.app.client.getValue(elements.KinoColumns).should.eventually.be.equal('1'),
    ]);
  });

  it('Check Kino Bonus field', function () {
    return this.app.client.getValue(elements.KinoBonusCheckBox).should.eventually.be.equal('on');
  });

  it('Check betting amount field', function () {
    return Promise.all([
      this.app.client.getText(elements.KinoBetMultiplierLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
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
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn1Checked),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl2)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn2Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl3)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn3Checked),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl4)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn4Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl5)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn5Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl6)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn6Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl7)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn7Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl8)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn8Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl9)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn9Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl10)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn10Enabled),
    ]);
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow1)
        .getAttribute('class')
        .should.eventually.be.equal('selected'),
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
      this.app.client.getText(elements.KinoWinningsTableNumbers).should.eventually.be.equal('ΑΡΙΘΜΟΙ'),
      this.app.client.getText(elements.KinoWinningsTableWinnings).should.eventually.be.equal('ΚΕΡΔΟΣ'),
      this.app.client.getText(elements.KinoWinningsTableKinoBonus).should.eventually.equal('KINO BONUS'),
      this.app.client.getText(elements.KinoWinningsTableKino0).should.eventually.be.equal('0'),
      this.app.client.getText(elements.KinoWinningsTableKino0Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino0KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1).should.eventually.be.equal('1'),
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('5,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('105,00€'),
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

  it('Check consecutive draws field', function () {
    return this.app.client.getValue(elements.KinoBetConsDrawsInput).should.eventually.be.equal('2');
  });

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.KinoBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('true'),
      // this.app.client.isVisible(elements.KinoBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipSubmitLbl).should.eventually.be.equal('ΑΠΟΔΟΧΗ'),
      this.app.client.getText(elements.KinoBetslipCostLbl).should.eventually.be.equal('ΚΟΣΤΟΣ ΔΕΛΤΙΟΥ\n24€'),
      this.app.client.getText(elements.KinoBetslipCost).should.eventually.be.equal('24€'),
    ]);
  });

  it('Try to clear Area E from Areas', function () {
    return this.app.client.click(elements.KinoBetClearArea).should.eventually.be.fulfilled;
  });

  it('Check that modal is shown', function () {
    return this.app.client.isVisible(elements.KinoModalAPopup).should.eventually.be.true;
  });

  it('Confirm Clear Area E from Areas', function () {
    let self = this;
    return Promise.all([
      this.app.client
        .elements(elements.KinoModalAMsgLbl)
        .getAttribute('innerText')
        .should.eventually.be.equal('ΚΑΘΑΡΙΣΜΟΣ ΠΕΡΙΟΧΗΣ'),
      this.app.client
        .elements(elements.KinoModalAMsg)
        .getAttribute('innerText')
        .should.eventually.be.equal(
          'Όλες οι επιλογές αυτής της περιοχής θα διαγραφούν. Είστε σίγουρος/η ότι θέλετε να συνεχίσετε;',
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

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaACost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaAKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaAClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaANumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAddBet).should.eventually.be.true,
      this.app.client.getText(elements.KinoOddEvenBtnAmount).should.eventually.be.equal('2€'),
      this.app.client.getValue(elements.KinoOddEven).should.eventually.be.equal('even'),
      this.app.client.getText(elements.KinoColumnsBtnAmount).should.eventually.be.equal('2€'),
      this.app.client.getValue(elements.KinoColumns).should.eventually.be.equal('1'),
    ]);
  });

  it('Check Kino Bonus field', function () {
    return this.app.client.getValue(elements.KinoBonusCheckBox).should.eventually.be.equal('on');
  });

  it('Check betting amount field', function () {
    return Promise.all([
      this.app.client.getText(elements.KinoBetMultiplierLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
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
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn1Checked),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl2)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn2Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl3)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn3Checked),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl4)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn4Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl5)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn5Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl6)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn6Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl7)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn7Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl8)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn8Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl9)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn9Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl10)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn10Enabled),
    ]);
  });

  it('Check consecutive draws field', function () {
    return this.app.client.getValue(elements.KinoBetConsDrawsInput).should.eventually.be.equal('2');
  });

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.KinoBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('true'),
      // this.app.client.isVisible(elements.KinoBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipSubmitLbl).should.eventually.be.equal('ΑΠΟΔΟΧΗ'),
      this.app.client.getText(elements.KinoBetslipCostLbl).should.eventually.be.equal('ΚΟΣΤΟΣ ΔΕΛΤΙΟΥ\n16€'),
      this.app.client.getText(elements.KinoBetslipCost).should.eventually.be.equal('16€'),
    ]);
  });

  it('Check that game type of Area E is set', function () {
    return this.app.client.getValue(elements.KinoQuickPickInput).should.eventually.be.equal('1');
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow1)
        .getAttribute('class')
        .should.eventually.be.equal('selected'),
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
      this.app.client.getText(elements.KinoWinningsTableNumbers).should.eventually.be.equal('ΑΡΙΘΜΟΙ'),
      this.app.client.getText(elements.KinoWinningsTableWinnings).should.eventually.be.equal('ΚΕΡΔΟΣ'),
      this.app.client.getText(elements.KinoWinningsTableKinoBonus).should.eventually.equal('KINO BONUS'),
      this.app.client.getText(elements.KinoWinningsTableKino0).should.eventually.be.equal('0'),
      this.app.client.getText(elements.KinoWinningsTableKino0Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino0KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1).should.eventually.be.equal('1'),
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('5,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('105,00€'),
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

  /////////////////////////////////////////////// Delete Area F ////////////////////////////////////////////////////////////

  it('Select Area F from Betslip', function () {
    return this.app.client.click(elements.KinoBetslipAreaA).should.eventually.be.fulfilled;
  });

  it('Check quick pick field', function () {
    return this.app.client.getValue(elements.KinoQuickPickInput).should.eventually.be.equal('1');
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaACost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaAKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaAClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaANumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAddBet).should.eventually.be.true,
      this.app.client.getText(elements.KinoOddEvenBtnAmount).should.eventually.be.equal('2€'),
      this.app.client.getValue(elements.KinoOddEven).should.eventually.be.equal('even'),
      this.app.client.getText(elements.KinoColumnsBtnAmount).should.eventually.be.equal('2€'),
      this.app.client.getValue(elements.KinoColumns).should.eventually.be.equal('1'),
    ]);
  });

  it('Try to clear Area F from Areas', function () {
    return this.app.client.click(elements.KinoBetClearArea).should.eventually.be.fulfilled;
  });

  it('Check that modal is shown', function () {
    return this.app.client.isVisible(elements.KinoModalAPopup).should.eventually.be.true;
  });

  it('Discard Clear Area E from Areas', function () {
    let self = this;
    return Promise.all([
      this.app.client
        .elements(elements.KinoModalAMsgLbl)
        .getAttribute('innerText')
        .should.eventually.be.equal('ΚΑΘΑΡΙΣΜΟΣ ΠΕΡΙΟΧΗΣ'),
      this.app.client
        .elements(elements.KinoModalAMsg)
        .getAttribute('innerText')
        .should.eventually.be.equal(
          'Όλες οι επιλογές αυτής της περιοχής θα διαγραφούν. Είστε σίγουρος/η ότι θέλετε να συνεχίσετε;',
        ),
      this.app.client.elements(elements.KinoModalAYesBtn).getAttribute('innerText').should.eventually.be.equal('Ναι'),
      this.app.client.elements(elements.KinoModalANoBtn).getAttribute('innerText').should.eventually.be.equal('Όχι'),
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

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaACost).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaAKinoBonus).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber1Value).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaAClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n1'),
      this.app.client.getText(elements.KinoBetslipAreaANumbers).should.eventually.equal('1'),
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAddBet).should.eventually.be.true,
      this.app.client.getText(elements.KinoOddEvenBtnAmount).should.eventually.be.equal('2€'),
      this.app.client.getValue(elements.KinoOddEven).should.eventually.be.equal('even'),
      this.app.client.getText(elements.KinoColumnsBtnAmount).should.eventually.be.equal('2€'),
      this.app.client.getValue(elements.KinoColumns).should.eventually.be.equal('1'),
    ]);
  });

  it('Check Kino Bonus field', function () {
    return this.app.client.getValue(elements.KinoBonusCheckBox).should.eventually.be.equal('on');
  });

  it('Check betting amount field', function () {
    return Promise.all([
      this.app.client.getText(elements.KinoBetMultiplierLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
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
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn1Checked),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl2)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn2Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl3)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn3Checked),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl4)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn4Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl5)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn5Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl6)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn6Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl7)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn7Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl8)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn8Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl9)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn9Enabled),
      this.app.client
        .elements(elements.KinoBetMultiplierBtnLbl10)
        .getAttribute('class')
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn10Enabled),
    ]);
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow1)
        .getAttribute('class')
        .should.eventually.be.equal('selected'),
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
      this.app.client.getText(elements.KinoWinningsTableNumbers).should.eventually.be.equal('ΑΡΙΘΜΟΙ'),
      this.app.client.getText(elements.KinoWinningsTableWinnings).should.eventually.be.equal('ΚΕΡΔΟΣ'),
      this.app.client.getText(elements.KinoWinningsTableKinoBonus).should.eventually.equal('KINO BONUS'),
      this.app.client.getText(elements.KinoWinningsTableKino0).should.eventually.be.equal('0'),
      this.app.client.getText(elements.KinoWinningsTableKino0Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino0KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1).should.eventually.be.equal('1'),
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('5,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('105,00€'),
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

  it('Check consecutive draws field', function () {
    return this.app.client.getValue(elements.KinoBetConsDrawsInput).should.eventually.be.equal('2');
  });

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.KinoBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('true'),
      // this.app.client.isVisible(elements.KinoBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipSubmitLbl).should.eventually.be.equal('ΑΠΟΔΟΧΗ'),
      this.app.client.getText(elements.KinoBetslipCostLbl).should.eventually.be.equal('ΚΟΣΤΟΣ ΔΕΛΤΙΟΥ\n16€'),
      this.app.client.getText(elements.KinoBetslipCost).should.eventually.be.equal('16€'),
    ]);
  });

  it('Try to clear Area F from Areas', function () {
    return this.app.client.click(elements.KinoBetClearArea).should.eventually.be.fulfilled;
  });

  it('Check that modal is shown', function () {
    return this.app.client.isVisible(elements.KinoModalAPopup).should.eventually.be.true;
  });

  it('Confirm Clear Area F from Areas', function () {
    let self = this;
    return Promise.all([
      this.app.client
        .elements(elements.KinoModalAMsgLbl)
        .getAttribute('innerText')
        .should.eventually.be.equal('ΚΑΘΑΡΙΣΜΟΣ ΠΕΡΙΟΧΗΣ'),
      this.app.client
        .elements(elements.KinoModalAMsg)
        .getAttribute('innerText')
        .should.eventually.be.equal(
          'Όλες οι επιλογές αυτής της περιοχής θα διαγραφούν. Είστε σίγουρος/η ότι θέλετε να συνεχίσετε;',
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

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaACost).should.eventually.be.equal('0,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaAKinoBonus).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber1Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaAClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n0'),
      this.app.client.getText(elements.KinoBetslipAreaANumbers).should.eventually.equal('0'),
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAddBet).should.eventually.be.true,
      this.app.client.getText(elements.KinoOddEvenBtnAmount).should.eventually.be.equal('2€'),
      this.app.client.getValue(elements.KinoOddEven).should.eventually.be.equal('even'),
      this.app.client.getText(elements.KinoColumnsBtnAmount).should.eventually.be.equal('2€'),
      this.app.client.getValue(elements.KinoColumns).should.eventually.be.equal('1'),
    ]);
  });

  it('Check Kino Bonus field', function () {
    return this.app.client.getValue(elements.KinoBonusCheckBox).should.eventually.be.equal('on');
  });

  it('Check betting amount field', function () {
    return Promise.all([
      this.app.client.getText(elements.KinoBetMultiplierLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
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

  it('Check consecutive draws field', function () {
    return this.app.client.getValue(elements.KinoBetConsDrawsInput).should.eventually.be.equal('2');
  });

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.KinoBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('true'),
      // this.app.client.isVisible(elements.KinoBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipSubmitLbl).should.eventually.be.equal('ΑΠΟΔΟΧΗ'),
      this.app.client.getText(elements.KinoBetslipCostLbl).should.eventually.be.equal('ΚΟΣΤΟΣ ΔΕΛΤΙΟΥ\n8€'),
      this.app.client.getText(elements.KinoBetslipCost).should.eventually.be.equal('8€'),
    ]);
  });

  it('Check that game type of Area F is cleared', function () {
    return this.app.client.getValue(elements.KinoQuickPickInput).should.eventually.be.equal('1');
  });

  it('Check that selected KINO numbers have been cleared', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoChooseNumbers).should.eventually.be.true,
      this.app.client.getText(elements.KinoChooseNumbersLbl).should.eventually.be.equal('ΕΠΙΛΟΓΗ ΑΡΙΘΜΩΝ'),
      this.app.client.getValue(elements.KinoChooseNumber1BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber2BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber3BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber4BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber5BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber6BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber7BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber8BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber9BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber10BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber11BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber12BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber13BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber14BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber15BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber16BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber17BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber18BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber19BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber20BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber21BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber22BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber23BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber24BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber25BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber26BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber27BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber28BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber29BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber30BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber31BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber32BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber33BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber34BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber35BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber36BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber37BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber38BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber39BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber40BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber41BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber42BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber43BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber44BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber45BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber46BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber47BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber48BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber49BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber50BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber51BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber52BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber53BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber54BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber55BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber56BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber57BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber58BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber59BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber60BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber61BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber62BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber63BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber64BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber65BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber66BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber67BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber68BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber69BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber70BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber71BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber72BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber73BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber74BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber75BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber76BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber77BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber78BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber79BtnInp).should.eventually.be.equal('false'),
      this.app.client.getValue(elements.KinoChooseNumber80BtnInp).should.eventually.be.equal('false'),
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
      this.app.client.getText(elements.KinoWinningsTableNumbers).should.eventually.be.equal('ΑΡΙΘΜΟΙ'),
      this.app.client.getText(elements.KinoWinningsTableWinnings).should.eventually.be.equal('ΚΕΡΔΟΣ'),
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

  /////////////////////////////////////////// Clear Odd/Even //////////////////////////////////////////////

  it('Select Kino Odd/Even game from KINO Standard game', function () {
    return this.app.client.click(elements.KinoOddEvenImgEl).should.eventually.be.fulfilled;
  });

  it('Check that modal of Odd/Even is opened', function () {
    return this.app.client.isVisible(elements.KinoOddEvenModal).should.eventually.be.true;
  });

  it('Select clear button', function () {
    return this.app.client.click(elements.KinoOddEvenClearBtn).should.eventually.be.fulfilled;
  });

  it('Select close button', function () {
    return this.app.client.click(elements.KinoOddEvenCloseBtn).should.eventually.be.fulfilled;
  });

  it('Check that modal of Odd/Even is closed', function () {
    return this.app.client.isVisible(elements.KinoOddEvenModal).should.eventually.be.false;
  });

  it('Check cost and selection on Odd/Even tab', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoOddEvenBtnAmount).should.eventually.be.false,
      this.app.client.getValue(elements.KinoOddEven).should.eventually.be.equal(''),
    ]);
  });

  it('Check consecutive draws field', function () {
    return this.app.client.getValue(elements.KinoBetConsDrawsInput).should.eventually.be.equal('2');
  });

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.KinoBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('true'),
      // this.app.client.isVisible(elements.KinoBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipSubmitLbl).should.eventually.be.equal('ΑΠΟΔΟΧΗ'),
      this.app.client.getText(elements.KinoBetslipCostLbl).should.eventually.be.equal('ΚΟΣΤΟΣ ΔΕΛΤΙΟΥ\n4€'),
      this.app.client.getText(elements.KinoBetslipCost).should.eventually.be.equal('4€'),
    ]);
  });

  /////////////////////////////////////////// Clear Columns //////////////////////////////////////////////

  it('Select Kino Columns game from KINO Standard game', function () {
    return this.app.client.click(elements.KinoColumnsImgEl).should.eventually.be.fulfilled;
  });

  it('Check that modal of Columns is opened', function () {
    return this.app.client.isVisible(elements.KinoColumnsModal).should.eventually.be.true;
  });

  it('Select clear button', function () {
    return this.app.client.click(elements.KinoColumnsClearBtn).should.eventually.be.fulfilled;
  });

  it('Select close button', function () {
    return this.app.client.click(elements.KinoColumnsCloseBtn).should.eventually.be.fulfilled;
  });

  it('Check that modal of Columns is closed', function () {
    return this.app.client.isVisible(elements.KinoColumnsModal).should.eventually.be.false;
  });

  it('Check cost and selection on Columns tab', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoColumnsBtnAmount).should.eventually.be.false,
      this.app.client.getValue(elements.KinoColumns).should.eventually.be.equal(''),
    ]);
  });

  it('Check consecutive draws field', function () {
    return this.app.client.getValue(elements.KinoBetConsDrawsInput).should.eventually.be.equal('2');
  });

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.KinoBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('placeBetInfoMsg2'),
      this.app.client.isVisible(elements.KinoBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipSubmitLbl).should.eventually.be.equal('ΑΠΟΔΟΧΗ'),
      this.app.client.getText(elements.KinoBetslipCostLbl).should.eventually.be.equal('ΚΟΣΤΟΣ ΔΕΛΤΙΟΥ\n0€'),
      this.app.client.getText(elements.KinoBetslipCost).should.eventually.be.equal('0€'),
    ]);
  });

  /////////////////////////////////////////////////////// Exit game - Return to Lobby ////////////////////////////////////////

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
