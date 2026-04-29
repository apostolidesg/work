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

////////////////////////////////////////// Check functionality of Winnings Table ////////////////////////////////

describe('TC KinoStandardBetWinningsTable.js: Check functionality of Winnings Table', function () {
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

  it('Check KINO Bonus is disabled', function () {
    return this.app.client
      .elements(elements.KinoBonusCheckBox)
      .getAttribute('disabled')
      .should.eventually.be.equal('true');
  });

  it('Check KINO Close2Win is disabled', function () {
    return this.app.client
      .elements(elements.KinoClose2WinCheckBox)
      .getAttribute('disabled')
      .should.eventually.be.equal('true');
  });

  /////////////////////////////////////////// Select a KINO numbers Area A ////////////////////////////////////////////////

  it('Select a KINO number', function () {
    return this.app.client.click(elements.KinoChooseNumber1Btn).should.eventually.be.fulfilled;
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
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('1,25€'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('26,25€'),
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

  it('Select KINO Bonus', function () {
    return this.app.client.click(elements.KinoBonusCheckBox).should.eventually.be.fulfilled;
  });

  it('Check KINO Close2Win is disabled', function () {
    return this.app.client
      .elements(elements.KinoClose2WinCheckBox)
      .getAttribute('disabled')
      .should.eventually.be.equal('true');
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
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('1,25€'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('26,25€'),
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

  it('Unselect KINO Bonus', function () {
    return this.app.client.click(elements.KinoBonusCheckBox).should.eventually.be.fulfilled;
  });

  it('Select a KINO number', function () {
    return this.app.client.click(elements.KinoChooseNumber2Btn).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow1)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-bottom'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRowc2w1)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-top'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow2)
        .getAttribute('class')
        .should.eventually.be.equal('selected'),
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
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('0,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('8,00€'),
      this.app.client.isVisible(elements.KinoWinningsTableKino1C2W).should.eventually.be.true,
      this.app.client.getText(elements.KinoWinningsTableKino1WinningC2W).should.eventually.be.equal('1,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonusC2W).should.eventually.be.equal('9,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('2,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('35,00€'),
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

  it('Select KINO Bonus', function () {
    return this.app.client.click(elements.KinoBonusCheckBox).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow1)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-bottom'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRowc2w1)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-top'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow2)
        .getAttribute('class')
        .should.eventually.be.equal('selected'),
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
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('0,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('8,00€'),
      this.app.client.isVisible(elements.KinoWinningsTableKino1C2W).should.eventually.be.true,
      this.app.client.getText(elements.KinoWinningsTableKino1WinningC2W).should.eventually.be.equal('1,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonusC2W).should.eventually.be.equal('9,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('2,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('35,00€'),
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

  it('Select KINO Close2Win', function () {
    return this.app.client.click(elements.KinoClose2WinCheckBox).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRowc2w1)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-bottom c2w-border-top'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow2)
        .getAttribute('class')
        .should.eventually.be.equal('selected'),
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
      this.app.client.isVisible(elements.KinoWinningsTableKino1).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoWinningsTableKino1C2W).should.eventually.be.true,
      this.app.client.getText(elements.KinoWinningsTableKino1WinningC2W).should.eventually.be.equal('1,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonusC2W).should.eventually.be.equal('9,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('2,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('35,00€'),
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

  it('Unselect KINO Bonus', function () {
    return this.app.client.click(elements.KinoBonusCheckBox).should.eventually.be.fulfilled;
  });

  it('Unselect KINO Close2Win', function () {
    return this.app.client.click(elements.KinoClose2WinCheckBox).should.eventually.be.fulfilled;
  });

  it('Select a KINO number', function () {
    return this.app.client.click(elements.KinoChooseNumber3Btn).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow1).getAttribute('class').should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow2)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-bottom'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRowc2w2)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-top'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow3)
        .getAttribute('class')
        .should.eventually.be.equal('selected'),
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
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('4,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('1,25€'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('9,00€'),
      this.app.client.isVisible(elements.KinoWinningsTableKino2C2W).should.eventually.be.true,
      this.app.client.getText(elements.KinoWinningsTableKino2WinningC2W).should.eventually.be.equal('3,75€'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonusC2W).should.eventually.be.equal('11,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('12,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('87,50€'),
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

  it('Select KINO Bonus', function () {
    return this.app.client.click(elements.KinoBonusCheckBox).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow1).getAttribute('class').should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow2)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-bottom'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRowc2w2)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-top'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow3)
        .getAttribute('class')
        .should.eventually.be.equal('selected'),
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
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('4,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('1,25€'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('9,00€'),
      this.app.client.isVisible(elements.KinoWinningsTableKino2C2W).should.eventually.be.true,
      this.app.client.getText(elements.KinoWinningsTableKino2WinningC2W).should.eventually.be.equal('3,75€'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonusC2W).should.eventually.be.equal('11,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('12,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('87,50€'),
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

  it('Select KINO Close2Win', function () {
    return this.app.client.click(elements.KinoClose2WinCheckBox).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow1).getAttribute('class').should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRowc2w2)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-bottom c2w-border-top'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow3)
        .getAttribute('class')
        .should.eventually.be.equal('selected'),
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
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoWinningsTableKino2).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoWinningsTableKino2C2W).should.eventually.be.true,
      this.app.client.getText(elements.KinoWinningsTableKino2WinningC2W).should.eventually.be.equal('3,75€'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonusC2W).should.eventually.be.equal('11,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('12,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('87,50€'),
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

  it('Unselect KINO Bonus', function () {
    return this.app.client.click(elements.KinoBonusCheckBox).should.eventually.be.fulfilled;
  });

  it('Unselect KINO Close2Win', function () {
    return this.app.client.click(elements.KinoClose2WinCheckBox).should.eventually.be.fulfilled;
  });

  it('Select a KINO number', function () {
    return this.app.client.click(elements.KinoChooseNumber4Btn).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow1).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow2).getAttribute('class').should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow3)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-bottom'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRowc2w3)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-top'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow4)
        .getAttribute('class')
        .should.eventually.be.equal('selected'),
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
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('2,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('0,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('4,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('2,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('12,00€'),
      this.app.client.isVisible(elements.KinoWinningsTableKino3C2W).should.eventually.be.true,
      this.app.client.getText(elements.KinoWinningsTableKino3WinningC2W).should.eventually.be.equal('10,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonusC2W).should.eventually.be.equal('20,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoWinningsTableKino4Winning).should.eventually.be.equal('50,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonus).should.eventually.be.equal('300,00€'),
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

  it('Select KINO Bonus', function () {
    return this.app.client.click(elements.KinoBonusCheckBox).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow1).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow2).getAttribute('class').should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow3)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-bottom'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRowc2w3)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-top'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow4)
        .getAttribute('class')
        .should.eventually.be.equal('selected'),
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
      this.app.client.getText(elements.KinoWinningsTableWinnings).should.eventually.be.equal('ΚΕΡΔΟΣ'),
      this.app.client.getText(elements.KinoWinningsTableKinoBonus).should.eventually.equal('KINO BONUS'),
      this.app.client.getText(elements.KinoWinningsTableKino0).should.eventually.be.equal('0'),
      this.app.client.getText(elements.KinoWinningsTableKino0Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino0KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1).should.eventually.be.equal('1'),
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('2,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('0,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('4,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('2,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('12,00€'),
      this.app.client.isVisible(elements.KinoWinningsTableKino3C2W).should.eventually.be.true,
      this.app.client.getText(elements.KinoWinningsTableKino3WinningC2W).should.eventually.be.equal('10,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonusC2W).should.eventually.be.equal('20,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoWinningsTableKino4Winning).should.eventually.be.equal('50,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonus).should.eventually.be.equal('300,00€'),
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

  it('Select KINO Close2Win', function () {
    return this.app.client.click(elements.KinoClose2WinCheckBox).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow1).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow2).getAttribute('class').should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRowc2w3)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-bottom c2w-border-top'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow4)
        .getAttribute('class')
        .should.eventually.be.equal('selected'),
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
      this.app.client.getText(elements.KinoWinningsTableWinnings).should.eventually.be.equal('ΚΕΡΔΟΣ'),
      this.app.client.getText(elements.KinoWinningsTableKinoBonus).should.eventually.equal('KINO BONUS'),
      this.app.client.getText(elements.KinoWinningsTableKino0).should.eventually.be.equal('0'),
      this.app.client.getText(elements.KinoWinningsTableKino0Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino0KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1).should.eventually.be.equal('1'),
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('2,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('0,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('4,00€'),
      this.app.client.isVisible(elements.KinoWinningsTableKino3).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoWinningsTableKino3C2W).should.eventually.be.true,
      this.app.client.getText(elements.KinoWinningsTableKino3WinningC2W).should.eventually.be.equal('10,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonusC2W).should.eventually.be.equal('20,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoWinningsTableKino4Winning).should.eventually.be.equal('50,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonus).should.eventually.be.equal('300,00€'),
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

  it('Unselect KINO Bonus', function () {
    return this.app.client.click(elements.KinoBonusCheckBox).should.eventually.be.fulfilled;
  });

  it('Unselect KINO Close2Win', function () {
    return this.app.client.click(elements.KinoClose2WinCheckBox).should.eventually.be.fulfilled;
  });

  it('Select a KINO number', function () {
    return this.app.client.click(elements.KinoChooseNumber5Btn).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow1).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow2).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow3).getAttribute('class').should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow4)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-bottom'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRowc2w4)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-top'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow5)
        .getAttribute('class')
        .should.eventually.be.equal('selected'),
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
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('1,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('2,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('1,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('8,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoWinningsTableKino4Winning).should.eventually.be.equal('10,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonus).should.eventually.be.equal('45,00€'),
      this.app.client.isVisible(elements.KinoWinningsTableKino4C2W).should.eventually.be.true,
      this.app.client.getText(elements.KinoWinningsTableKino4WinningC2W).should.eventually.be.equal('40,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonusC2W).should.eventually.be.equal('75,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino5).should.eventually.be.equal('5'),
      this.app.client.getText(elements.KinoWinningsTableKino5Winning).should.eventually.be.equal('225,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino5KinoBonus).should.eventually.be.equal('675,00€'),
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

  it('Select KINO Bonus', function () {
    return this.app.client.click(elements.KinoBonusCheckBox).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow1).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow2).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow3).getAttribute('class').should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow4)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-bottom'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRowc2w4)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-top'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow5)
        .getAttribute('class')
        .should.eventually.be.equal('selected'),
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
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('1,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('2,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('1,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('8,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoWinningsTableKino4Winning).should.eventually.be.equal('10,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonus).should.eventually.be.equal('45,00€'),
      this.app.client.isVisible(elements.KinoWinningsTableKino4C2W).should.eventually.be.true,
      this.app.client.getText(elements.KinoWinningsTableKino4WinningC2W).should.eventually.be.equal('40,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonusC2W).should.eventually.be.equal('75,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino5).should.eventually.be.equal('5'),
      this.app.client.getText(elements.KinoWinningsTableKino5Winning).should.eventually.be.equal('225,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino5KinoBonus).should.eventually.be.equal('675,00€'),
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

  it('Select KINO Close2Win', function () {
    return this.app.client.click(elements.KinoClose2WinCheckBox).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow1).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow2).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow3).getAttribute('class').should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRowc2w4)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-bottom c2w-border-top'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow5)
        .getAttribute('class')
        .should.eventually.be.equal('selected'),
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
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('1,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('2,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('1,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('8,50€'),
      this.app.client.isVisible(elements.KinoWinningsTableKino4).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoWinningsTableKino4C2W).should.eventually.be.true,
      this.app.client.getText(elements.KinoWinningsTableKino4WinningC2W).should.eventually.be.equal('40,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonusC2W).should.eventually.be.equal('75,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino5).should.eventually.be.equal('5'),
      this.app.client.getText(elements.KinoWinningsTableKino5Winning).should.eventually.be.equal('225,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino5KinoBonus).should.eventually.be.equal('675,00€'),
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

  it('Unselect KINO Bonus', function () {
    return this.app.client.click(elements.KinoBonusCheckBox).should.eventually.be.fulfilled;
  });

  it('Unselect KINO Close2Win', function () {
    return this.app.client.click(elements.KinoClose2WinCheckBox).should.eventually.be.fulfilled;
  });

  it('Select a KINO number', function () {
    return this.app.client.click(elements.KinoChooseNumber6Btn).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow1).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow2).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow3).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow4).getAttribute('class').should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow5)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-bottom'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRowc2w5)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-top'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow6)
        .getAttribute('class')
        .should.eventually.be.equal('selected'),
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
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('1,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('1,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('0,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('4,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoWinningsTableKino4Winning).should.eventually.be.equal('3,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonus).should.eventually.be.equal('13,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino5).should.eventually.be.equal('5'),
      this.app.client.getText(elements.KinoWinningsTableKino5Winning).should.eventually.be.equal('25,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino5KinoBonus).should.eventually.be.equal('150,00€'),
      this.app.client.isVisible(elements.KinoWinningsTableKino5C2W).should.eventually.be.true,
      this.app.client.getText(elements.KinoWinningsTableKino5WinningC2W).should.eventually.be.equal('140,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino5KinoBonusC2W).should.eventually.be.equal('265,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6).should.eventually.be.equal('6'),
      this.app.client.getText(elements.KinoWinningsTableKino6Winning).should.eventually.be.equal('800,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6KinoBonus).should.eventually.be.equal('2.050,00€'),
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

  it('Select KINO Bonus', function () {
    return this.app.client.click(elements.KinoBonusCheckBox).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow1).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow2).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow3).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow4).getAttribute('class').should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow5)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-bottom'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRowc2w5)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-top'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow6)
        .getAttribute('class')
        .should.eventually.be.equal('selected'),
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
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('1,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('1,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('0,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('4,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoWinningsTableKino4Winning).should.eventually.be.equal('3,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonus).should.eventually.be.equal('13,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino5).should.eventually.be.equal('5'),
      this.app.client.getText(elements.KinoWinningsTableKino5Winning).should.eventually.be.equal('25,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino5KinoBonus).should.eventually.be.equal('150,00€'),
      this.app.client.isVisible(elements.KinoWinningsTableKino5C2W).should.eventually.be.true,
      this.app.client.getText(elements.KinoWinningsTableKino5WinningC2W).should.eventually.be.equal('140,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino5KinoBonusC2W).should.eventually.be.equal('265,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6).should.eventually.be.equal('6'),
      this.app.client.getText(elements.KinoWinningsTableKino6Winning).should.eventually.be.equal('800,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6KinoBonus).should.eventually.be.equal('2.050,00€'),
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

  it('Select KINO Close2Win', function () {
    return this.app.client.click(elements.KinoClose2WinCheckBox).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow1).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow2).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow3).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow4).getAttribute('class').should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRowc2w5)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-bottom c2w-border-top'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow6)
        .getAttribute('class')
        .should.eventually.be.equal('selected'),
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
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('1,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('1,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('0,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('4,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoWinningsTableKino4Winning).should.eventually.be.equal('3,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonus).should.eventually.be.equal('13,50€'),
      this.app.client.isVisible(elements.KinoWinningsTableKino5).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoWinningsTableKino5C2W).should.eventually.be.true,
      this.app.client.getText(elements.KinoWinningsTableKino5WinningC2W).should.eventually.be.equal('140,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino5KinoBonusC2W).should.eventually.be.equal('265,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6).should.eventually.be.equal('6'),
      this.app.client.getText(elements.KinoWinningsTableKino6Winning).should.eventually.be.equal('800,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6KinoBonus).should.eventually.be.equal('2.050,00€'),
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

  it('Unselect KINO Bonus', function () {
    return this.app.client.click(elements.KinoBonusCheckBox).should.eventually.be.fulfilled;
  });

  it('Unselect KINO Close2Win', function () {
    return this.app.client.click(elements.KinoClose2WinCheckBox).should.eventually.be.fulfilled;
  });

  it('Select a KINO number', function () {
    return this.app.client.click(elements.KinoChooseNumber7Btn).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow1).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow2).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow3).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow4).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow5).getAttribute('class').should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow6)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-bottom'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRowc2w6)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-top'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow7)
        .getAttribute('class')
        .should.eventually.be.equal('selected'),
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
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('1,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('1,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('0,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('4,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoWinningsTableKino4Winning).should.eventually.be.equal('1,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonus).should.eventually.be.equal('6,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino5).should.eventually.be.equal('5'),
      this.app.client.getText(elements.KinoWinningsTableKino5Winning).should.eventually.be.equal('10,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino5KinoBonus).should.eventually.be.equal('40,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6).should.eventually.be.equal('6'),
      this.app.client.getText(elements.KinoWinningsTableKino6Winning).should.eventually.be.equal('50,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6KinoBonus).should.eventually.be.equal('200,00€'),
      this.app.client.isVisible(elements.KinoWinningsTableKino6C2W).should.eventually.be.true,
      this.app.client.getText(elements.KinoWinningsTableKino6WinningC2W).should.eventually.be.equal('500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6KinoBonusC2W).should.eventually.be.equal('650,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7).should.eventually.be.equal('7'),
      this.app.client.getText(elements.KinoWinningsTableKino7Winning).should.eventually.be.equal('2.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7KinoBonus).should.eventually.be.equal('7.500,00€'),
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

  it('Select KINO Bonus', function () {
    return this.app.client.click(elements.KinoBonusCheckBox).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow1).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow2).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow3).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow4).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow5).getAttribute('class').should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow6)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-bottom'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRowc2w6)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-top'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow7)
        .getAttribute('class')
        .should.eventually.be.equal('selected'),
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
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('1,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('1,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('0,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('4,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoWinningsTableKino4Winning).should.eventually.be.equal('1,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonus).should.eventually.be.equal('6,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino5).should.eventually.be.equal('5'),
      this.app.client.getText(elements.KinoWinningsTableKino5Winning).should.eventually.be.equal('10,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino5KinoBonus).should.eventually.be.equal('40,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6).should.eventually.be.equal('6'),
      this.app.client.getText(elements.KinoWinningsTableKino6Winning).should.eventually.be.equal('50,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6KinoBonus).should.eventually.be.equal('200,00€'),
      this.app.client.isVisible(elements.KinoWinningsTableKino6C2W).should.eventually.be.true,
      this.app.client.getText(elements.KinoWinningsTableKino6WinningC2W).should.eventually.be.equal('500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6KinoBonusC2W).should.eventually.be.equal('650,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7).should.eventually.be.equal('7'),
      this.app.client.getText(elements.KinoWinningsTableKino7Winning).should.eventually.be.equal('2.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7KinoBonus).should.eventually.be.equal('7.500,00€'),
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

  it('Select KINO Close2Win', function () {
    return this.app.client.click(elements.KinoClose2WinCheckBox).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow1).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow2).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow3).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow4).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow5).getAttribute('class').should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRowc2w6)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-bottom c2w-border-top'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow7)
        .getAttribute('class')
        .should.eventually.be.equal('selected'),
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
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('1,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('1,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('0,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('4,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoWinningsTableKino4Winning).should.eventually.be.equal('1,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonus).should.eventually.be.equal('6,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino5).should.eventually.be.equal('5'),
      this.app.client.getText(elements.KinoWinningsTableKino5Winning).should.eventually.be.equal('10,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino5KinoBonus).should.eventually.be.equal('40,00€'),
      this.app.client.isVisible(elements.KinoWinningsTableKino6).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoWinningsTableKino6C2W).should.eventually.be.true,
      this.app.client.getText(elements.KinoWinningsTableKino6WinningC2W).should.eventually.be.equal('500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6KinoBonusC2W).should.eventually.be.equal('650,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7).should.eventually.be.equal('7'),
      this.app.client.getText(elements.KinoWinningsTableKino7Winning).should.eventually.be.equal('2.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7KinoBonus).should.eventually.be.equal('7.500,00€'),
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

  it('Unselect KINO Bonus', function () {
    return this.app.client.click(elements.KinoBonusCheckBox).should.eventually.be.fulfilled;
  });

  it('Unselect KINO Close2Win', function () {
    return this.app.client.click(elements.KinoClose2WinCheckBox).should.eventually.be.fulfilled;
  });

  it('Select a KINO number', function () {
    return this.app.client.click(elements.KinoChooseNumber8Btn).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow1).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow2).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow3).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow4).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow5).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow6).getAttribute('class').should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow7)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-bottom'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRowc2w7)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-top'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow8)
        .getAttribute('class')
        .should.eventually.be.equal('selected'),
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
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('1,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('1,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('2,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoWinningsTableKino4Winning).should.eventually.be.equal('1,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonus).should.eventually.be.equal('3,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino5).should.eventually.be.equal('5'),
      this.app.client.getText(elements.KinoWinningsTableKino5Winning).should.eventually.be.equal('5,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino5KinoBonus).should.eventually.be.equal('15,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6).should.eventually.be.equal('6'),
      this.app.client.getText(elements.KinoWinningsTableKino6Winning).should.eventually.be.equal('25,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6KinoBonus).should.eventually.be.equal('100,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7).should.eventually.be.equal('7'),
      this.app.client.getText(elements.KinoWinningsTableKino7Winning).should.eventually.be.equal('500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7KinoBonus).should.eventually.be.equal('1.500,00€'),
      this.app.client.isVisible(elements.KinoWinningsTableKino7C2W).should.eventually.be.true,
      this.app.client.getText(elements.KinoWinningsTableKino7WinningC2W).should.eventually.be.equal('2.600,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7KinoBonusC2W).should.eventually.be.equal('3.600,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8).should.eventually.be.equal('8'),
      this.app.client.getText(elements.KinoWinningsTableKino8Winning).should.eventually.be.equal('7.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8KinoBonus).should.eventually.be.equal('20.000,00€'),
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

  it('Select KINO Bonus', function () {
    return this.app.client.click(elements.KinoBonusCheckBox).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow1).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow2).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow3).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow4).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow5).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow6).getAttribute('class').should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow7)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-bottom'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRowc2w7)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-top'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow8)
        .getAttribute('class')
        .should.eventually.be.equal('selected'),
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
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('1,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('1,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('2,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoWinningsTableKino4Winning).should.eventually.be.equal('1,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonus).should.eventually.be.equal('3,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino5).should.eventually.be.equal('5'),
      this.app.client.getText(elements.KinoWinningsTableKino5Winning).should.eventually.be.equal('5,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino5KinoBonus).should.eventually.be.equal('15,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6).should.eventually.be.equal('6'),
      this.app.client.getText(elements.KinoWinningsTableKino6Winning).should.eventually.be.equal('25,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6KinoBonus).should.eventually.be.equal('100,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7).should.eventually.be.equal('7'),
      this.app.client.getText(elements.KinoWinningsTableKino7Winning).should.eventually.be.equal('500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7KinoBonus).should.eventually.be.equal('1.500,00€'),
      this.app.client.isVisible(elements.KinoWinningsTableKino7C2W).should.eventually.be.true,
      this.app.client.getText(elements.KinoWinningsTableKino7WinningC2W).should.eventually.be.equal('2.600,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7KinoBonusC2W).should.eventually.be.equal('3.600,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8).should.eventually.be.equal('8'),
      this.app.client.getText(elements.KinoWinningsTableKino8Winning).should.eventually.be.equal('7.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8KinoBonus).should.eventually.be.equal('20.000,00€'),
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

  it('Select KINO Close2Win', function () {
    return this.app.client.click(elements.KinoClose2WinCheckBox).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow1).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow2).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow3).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow4).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow5).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow6).getAttribute('class').should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRowc2w7)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-bottom c2w-border-top'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow8)
        .getAttribute('class')
        .should.eventually.be.equal('selected'),
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
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('1,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('1,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('2,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoWinningsTableKino4Winning).should.eventually.be.equal('1,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonus).should.eventually.be.equal('3,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino5).should.eventually.be.equal('5'),
      this.app.client.getText(elements.KinoWinningsTableKino5Winning).should.eventually.be.equal('5,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino5KinoBonus).should.eventually.be.equal('15,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6).should.eventually.be.equal('6'),
      this.app.client.getText(elements.KinoWinningsTableKino6Winning).should.eventually.be.equal('25,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6KinoBonus).should.eventually.be.equal('100,00€'),
      this.app.client.isVisible(elements.KinoWinningsTableKino7).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoWinningsTableKino7C2W).should.eventually.be.true,
      this.app.client.getText(elements.KinoWinningsTableKino7WinningC2W).should.eventually.be.equal('2.600,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7KinoBonusC2W).should.eventually.be.equal('3.600,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8).should.eventually.be.equal('8'),
      this.app.client.getText(elements.KinoWinningsTableKino8Winning).should.eventually.be.equal('7.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8KinoBonus).should.eventually.be.equal('20.000,00€'),
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

  it('Unselect KINO Bonus', function () {
    return this.app.client.click(elements.KinoBonusCheckBox).should.eventually.be.fulfilled;
  });

  it('Unselect KINO Close2Win', function () {
    return this.app.client.click(elements.KinoClose2WinCheckBox).should.eventually.be.fulfilled;
  });

  it('Select a KINO number', function () {
    return this.app.client.click(elements.KinoChooseNumber9Btn).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow1).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow2).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow3).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow4).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow5).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow6).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow7).getAttribute('class').should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow8)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-bottom'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRowc2w8)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-top'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow9)
        .getAttribute('class')
        .should.eventually.be.equal('selected'),
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
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('1,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('1,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('2,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoWinningsTableKino4Winning).should.eventually.be.equal('0,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonus).should.eventually.be.equal('3,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino5).should.eventually.be.equal('5'),
      this.app.client.getText(elements.KinoWinningsTableKino5Winning).should.eventually.be.equal('2,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino5KinoBonus).should.eventually.be.equal('7,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino6).should.eventually.be.equal('6'),
      this.app.client.getText(elements.KinoWinningsTableKino6Winning).should.eventually.be.equal('12,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino6KinoBonus).should.eventually.be.equal('35,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7).should.eventually.be.equal('7'),
      this.app.client.getText(elements.KinoWinningsTableKino7Winning).should.eventually.be.equal('100,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7KinoBonus).should.eventually.be.equal('250,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8).should.eventually.be.equal('8'),
      this.app.client.getText(elements.KinoWinningsTableKino8Winning).should.eventually.be.equal('2.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8KinoBonus).should.eventually.be.equal('5.000,00€'),
      this.app.client.isVisible(elements.KinoWinningsTableKino8C2W).should.eventually.be.true,
      this.app.client.getText(elements.KinoWinningsTableKino8WinningC2W).should.eventually.be.equal('12.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8KinoBonusC2W).should.eventually.be.equal('15.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9).should.eventually.be.equal('9'),
      this.app.client.getText(elements.KinoWinningsTableKino9Winning).should.eventually.be.equal('20.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9KinoBonus).should.eventually.be.equal('50.000,00€'),
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

  it('Select KINO Bonus', function () {
    return this.app.client.click(elements.KinoBonusCheckBox).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow1).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow2).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow3).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow4).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow5).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow6).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow7).getAttribute('class').should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow8)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-bottom'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRowc2w8)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-top'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow9)
        .getAttribute('class')
        .should.eventually.be.equal('selected'),
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
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('1,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('1,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('2,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoWinningsTableKino4Winning).should.eventually.be.equal('0,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonus).should.eventually.be.equal('3,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino5).should.eventually.be.equal('5'),
      this.app.client.getText(elements.KinoWinningsTableKino5Winning).should.eventually.be.equal('2,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino5KinoBonus).should.eventually.be.equal('7,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino6).should.eventually.be.equal('6'),
      this.app.client.getText(elements.KinoWinningsTableKino6Winning).should.eventually.be.equal('12,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino6KinoBonus).should.eventually.be.equal('35,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7).should.eventually.be.equal('7'),
      this.app.client.getText(elements.KinoWinningsTableKino7Winning).should.eventually.be.equal('100,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7KinoBonus).should.eventually.be.equal('250,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8).should.eventually.be.equal('8'),
      this.app.client.getText(elements.KinoWinningsTableKino8Winning).should.eventually.be.equal('2.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8KinoBonus).should.eventually.be.equal('5.000,00€'),
      this.app.client.isVisible(elements.KinoWinningsTableKino8C2W).should.eventually.be.true,
      this.app.client.getText(elements.KinoWinningsTableKino8WinningC2W).should.eventually.be.equal('12.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8KinoBonusC2W).should.eventually.be.equal('15.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9).should.eventually.be.equal('9'),
      this.app.client.getText(elements.KinoWinningsTableKino9Winning).should.eventually.be.equal('20.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9KinoBonus).should.eventually.be.equal('50.000,00€'),
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

  it('Select KINO Close2Win', function () {
    return this.app.client.click(elements.KinoClose2WinCheckBox).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow1).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow2).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow3).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow4).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow5).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow6).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow7).getAttribute('class').should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRowc2w8)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-bottom c2w-border-top'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow9)
        .getAttribute('class')
        .should.eventually.be.equal('selected'),
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
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('1,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('1,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('2,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoWinningsTableKino4Winning).should.eventually.be.equal('0,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonus).should.eventually.be.equal('3,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino5).should.eventually.be.equal('5'),
      this.app.client.getText(elements.KinoWinningsTableKino5Winning).should.eventually.be.equal('2,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino5KinoBonus).should.eventually.be.equal('7,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino6).should.eventually.be.equal('6'),
      this.app.client.getText(elements.KinoWinningsTableKino6Winning).should.eventually.be.equal('12,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino6KinoBonus).should.eventually.be.equal('35,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7).should.eventually.be.equal('7'),
      this.app.client.getText(elements.KinoWinningsTableKino7Winning).should.eventually.be.equal('100,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7KinoBonus).should.eventually.be.equal('250,00€'),
      this.app.client.isVisible(elements.KinoWinningsTableKino8).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoWinningsTableKino8C2W).should.eventually.be.true,
      this.app.client.getText(elements.KinoWinningsTableKino8WinningC2W).should.eventually.be.equal('12.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8KinoBonusC2W).should.eventually.be.equal('15.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9).should.eventually.be.equal('9'),
      this.app.client.getText(elements.KinoWinningsTableKino9Winning).should.eventually.be.equal('20.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9KinoBonus).should.eventually.be.equal('50.000,00€'),
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

  it('Unselect KINO Bonus', function () {
    return this.app.client.click(elements.KinoBonusCheckBox).should.eventually.be.fulfilled;
  });

  it('Unselect KINO Close2Win', function () {
    return this.app.client.click(elements.KinoClose2WinCheckBox).should.eventually.be.fulfilled;
  });

  it('Select a KINO number', function () {
    return this.app.client.click(elements.KinoChooseNumber10Btn).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
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
        .should.eventually.be.equal('selected'),
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
      this.app.client.getText(elements.KinoWinningsTableKino0Winning).should.eventually.be.equal('1,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino0KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1).should.eventually.be.equal('1'),
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('1,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('1,25€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('1,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoWinningsTableKino4Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonus).should.eventually.be.equal('2,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino5).should.eventually.be.equal('5'),
      this.app.client.getText(elements.KinoWinningsTableKino5Winning).should.eventually.be.equal('1,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino5KinoBonus).should.eventually.be.equal('3,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino6).should.eventually.be.equal('6'),
      this.app.client.getText(elements.KinoWinningsTableKino6Winning).should.eventually.be.equal('10,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6KinoBonus).should.eventually.be.equal('30,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7).should.eventually.be.equal('7'),
      this.app.client.getText(elements.KinoWinningsTableKino7Winning).should.eventually.be.equal('40,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7KinoBonus).should.eventually.be.equal('90,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8).should.eventually.be.equal('8'),
      this.app.client.getText(elements.KinoWinningsTableKino8Winning).should.eventually.be.equal('250,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8KinoBonus).should.eventually.be.equal('750,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9).should.eventually.be.equal('9'),
      this.app.client.getText(elements.KinoWinningsTableKino9Winning).should.eventually.be.equal('5.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9KinoBonus).should.eventually.be.equal('12.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10).should.eventually.be.equal('10'),
      this.app.client.getText(elements.KinoWinningsTableKino10Winning).should.eventually.be.equal('50.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10KinoBonus).should.eventually.be.equal('125.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino11).should.eventually.be.equal('11'),
      this.app.client.getText(elements.KinoWinningsTableKino11Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino11KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino12).should.eventually.be.equal('12'),
      this.app.client.getText(elements.KinoWinningsTableKino12Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino12KinoBonus).should.eventually.be.equal('-'),
    ]);
  });

  it('Check KINO Close2Win is disabled', function () {
    return this.app.client
      .elements(elements.KinoClose2WinCheckBox)
      .getAttribute('disabled')
      .should.eventually.be.equal('true');
  });

  it('Select KINO Bonus', function () {
    return this.app.client.click(elements.KinoBonusCheckBox).should.eventually.be.fulfilled;
  });

  it('Check KINO Close2Win is disabled', function () {
    return this.app.client
      .elements(elements.KinoClose2WinCheckBox)
      .getAttribute('disabled')
      .should.eventually.be.equal('true');
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
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
        .should.eventually.be.equal('selected'),
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
      this.app.client.getText(elements.KinoWinningsTableKino0Winning).should.eventually.be.equal('1,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino0KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1).should.eventually.be.equal('1'),
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('1,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('1,25€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('1,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoWinningsTableKino4Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonus).should.eventually.be.equal('2,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino5).should.eventually.be.equal('5'),
      this.app.client.getText(elements.KinoWinningsTableKino5Winning).should.eventually.be.equal('1,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino5KinoBonus).should.eventually.be.equal('3,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino6).should.eventually.be.equal('6'),
      this.app.client.getText(elements.KinoWinningsTableKino6Winning).should.eventually.be.equal('10,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6KinoBonus).should.eventually.be.equal('30,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7).should.eventually.be.equal('7'),
      this.app.client.getText(elements.KinoWinningsTableKino7Winning).should.eventually.be.equal('40,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7KinoBonus).should.eventually.be.equal('90,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8).should.eventually.be.equal('8'),
      this.app.client.getText(elements.KinoWinningsTableKino8Winning).should.eventually.be.equal('250,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8KinoBonus).should.eventually.be.equal('750,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9).should.eventually.be.equal('9'),
      this.app.client.getText(elements.KinoWinningsTableKino9Winning).should.eventually.be.equal('5.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9KinoBonus).should.eventually.be.equal('12.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10).should.eventually.be.equal('10'),
      this.app.client.getText(elements.KinoWinningsTableKino10Winning).should.eventually.be.equal('50.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10KinoBonus).should.eventually.be.equal('125.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino11).should.eventually.be.equal('11'),
      this.app.client.getText(elements.KinoWinningsTableKino11Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino11KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino12).should.eventually.be.equal('12'),
      this.app.client.getText(elements.KinoWinningsTableKino12Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino12KinoBonus).should.eventually.be.equal('-'),
    ]);
  });

  it('Unselect KINO Bonus', function () {
    return this.app.client.click(elements.KinoBonusCheckBox).should.eventually.be.fulfilled;
  });

  it('Select a KINO number', function () {
    return this.app.client.click(elements.KinoChooseNumber11Btn).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
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
        .should.eventually.be.equal('selected'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow12)
        .getAttribute('class')
        .should.eventually.be.equal(''),
      this.app.client.getText(elements.KinoWinningsTableNumbers).should.eventually.be.equal('ΑΡΙΘΜΟΙ'),
      this.app.client.getText(elements.KinoWinningsTableWinnings).should.eventually.be.equal('ΚΕΡΔΟΣ'),
      this.app.client.getText(elements.KinoWinningsTableKinoBonus).should.eventually.equal('KINO BONUS'),
      this.app.client.getText(elements.KinoWinningsTableKino0).should.eventually.be.equal('0'),
      this.app.client.getText(elements.KinoWinningsTableKino0Winning).should.eventually.be.equal('1,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino0KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1).should.eventually.be.equal('1'),
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('1,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('1,25€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('1,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoWinningsTableKino4Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonus).should.eventually.be.equal('2,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino5).should.eventually.be.equal('5'),
      this.app.client.getText(elements.KinoWinningsTableKino5Winning).should.eventually.be.equal('0,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino5KinoBonus).should.eventually.be.equal('3,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6).should.eventually.be.equal('6'),
      this.app.client.getText(elements.KinoWinningsTableKino6Winning).should.eventually.be.equal('5,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6KinoBonus).should.eventually.be.equal('12,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino7).should.eventually.be.equal('7'),
      this.app.client.getText(elements.KinoWinningsTableKino7Winning).should.eventually.be.equal('25,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7KinoBonus).should.eventually.be.equal('52,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino8).should.eventually.be.equal('8'),
      this.app.client.getText(elements.KinoWinningsTableKino8Winning).should.eventually.be.equal('125,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8KinoBonus).should.eventually.be.equal('275,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9).should.eventually.be.equal('9'),
      this.app.client.getText(elements.KinoWinningsTableKino9Winning).should.eventually.be.equal('750,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9KinoBonus).should.eventually.be.equal('1.750,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10).should.eventually.be.equal('10'),
      this.app.client.getText(elements.KinoWinningsTableKino10Winning).should.eventually.be.equal('7.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10KinoBonus).should.eventually.be.equal('15.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino11).should.eventually.be.equal('11'),
      this.app.client.getText(elements.KinoWinningsTableKino11Winning).should.eventually.be.equal('250.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino11KinoBonus).should.eventually.be.equal('600.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino12).should.eventually.be.equal('12'),
      this.app.client.getText(elements.KinoWinningsTableKino12Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino12KinoBonus).should.eventually.be.equal('-'),
    ]);
  });

  it('Check KINO Close2Win is disabled', function () {
    return this.app.client
      .elements(elements.KinoClose2WinCheckBox)
      .getAttribute('disabled')
      .should.eventually.be.equal('true');
  });

  it('Select KINO Bonus', function () {
    return this.app.client.click(elements.KinoBonusCheckBox).should.eventually.be.fulfilled;
  });

  it('Check KINO Close2Win is disabled', function () {
    return this.app.client
      .elements(elements.KinoClose2WinCheckBox)
      .getAttribute('disabled')
      .should.eventually.be.equal('true');
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
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
        .should.eventually.be.equal('selected'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow12)
        .getAttribute('class')
        .should.eventually.be.equal(''),
      this.app.client.getText(elements.KinoWinningsTableNumbers).should.eventually.be.equal('ΑΡΙΘΜΟΙ'),
      this.app.client.getText(elements.KinoWinningsTableWinnings).should.eventually.be.equal('ΚΕΡΔΟΣ'),
      this.app.client.getText(elements.KinoWinningsTableKinoBonus).should.eventually.equal('KINO BONUS'),
      this.app.client.getText(elements.KinoWinningsTableKino0).should.eventually.be.equal('0'),
      this.app.client.getText(elements.KinoWinningsTableKino0Winning).should.eventually.be.equal('1,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino0KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1).should.eventually.be.equal('1'),
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('1,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('1,25€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('1,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoWinningsTableKino4Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonus).should.eventually.be.equal('2,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino5).should.eventually.be.equal('5'),
      this.app.client.getText(elements.KinoWinningsTableKino5Winning).should.eventually.be.equal('0,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino5KinoBonus).should.eventually.be.equal('3,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6).should.eventually.be.equal('6'),
      this.app.client.getText(elements.KinoWinningsTableKino6Winning).should.eventually.be.equal('5,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6KinoBonus).should.eventually.be.equal('12,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino7).should.eventually.be.equal('7'),
      this.app.client.getText(elements.KinoWinningsTableKino7Winning).should.eventually.be.equal('25,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7KinoBonus).should.eventually.be.equal('52,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino8).should.eventually.be.equal('8'),
      this.app.client.getText(elements.KinoWinningsTableKino8Winning).should.eventually.be.equal('125,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8KinoBonus).should.eventually.be.equal('275,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9).should.eventually.be.equal('9'),
      this.app.client.getText(elements.KinoWinningsTableKino9Winning).should.eventually.be.equal('750,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9KinoBonus).should.eventually.be.equal('1.750,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10).should.eventually.be.equal('10'),
      this.app.client.getText(elements.KinoWinningsTableKino10Winning).should.eventually.be.equal('7.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10KinoBonus).should.eventually.be.equal('15.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino11).should.eventually.be.equal('11'),
      this.app.client.getText(elements.KinoWinningsTableKino11Winning).should.eventually.be.equal('250.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino11KinoBonus).should.eventually.be.equal('600.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino12).should.eventually.be.equal('12'),
      this.app.client.getText(elements.KinoWinningsTableKino12Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino12KinoBonus).should.eventually.be.equal('-'),
    ]);
  });

  it('Unselect KINO Bonus', function () {
    return this.app.client.click(elements.KinoBonusCheckBox).should.eventually.be.fulfilled;
  });

  it('Select a KINO number', function () {
    return this.app.client.click(elements.KinoChooseNumber12Btn).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
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
        .should.eventually.be.equal('selected'),
      this.app.client.getText(elements.KinoWinningsTableNumbers).should.eventually.be.equal('ΑΡΙΘΜΟΙ'),
      this.app.client.getText(elements.KinoWinningsTableWinnings).should.eventually.be.equal('ΚΕΡΔΟΣ'),
      this.app.client.getText(elements.KinoWinningsTableKinoBonus).should.eventually.equal('KINO BONUS'),
      this.app.client.getText(elements.KinoWinningsTableKino0).should.eventually.be.equal('0'),
      this.app.client.getText(elements.KinoWinningsTableKino0Winning).should.eventually.be.equal('2,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino0KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1).should.eventually.be.equal('1'),
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('1,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('1,25€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('1,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoWinningsTableKino4Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonus).should.eventually.be.equal('1,75€'),
      this.app.client.getText(elements.KinoWinningsTableKino5).should.eventually.be.equal('5'),
      this.app.client.getText(elements.KinoWinningsTableKino5Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino5KinoBonus).should.eventually.be.equal('2,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6).should.eventually.be.equal('6'),
      this.app.client.getText(elements.KinoWinningsTableKino6Winning).should.eventually.be.equal('2,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino6KinoBonus).should.eventually.be.equal('5,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7).should.eventually.be.equal('7'),
      this.app.client.getText(elements.KinoWinningsTableKino7Winning).should.eventually.be.equal('12,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino7KinoBonus).should.eventually.be.equal('25,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8).should.eventually.be.equal('8'),
      this.app.client.getText(elements.KinoWinningsTableKino8Winning).should.eventually.be.equal('75,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8KinoBonus).should.eventually.be.equal('175,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9).should.eventually.be.equal('9'),
      this.app.client.getText(elements.KinoWinningsTableKino9Winning).should.eventually.be.equal('500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9KinoBonus).should.eventually.be.equal('1.100,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10).should.eventually.be.equal('10'),
      this.app.client.getText(elements.KinoWinningsTableKino10Winning).should.eventually.be.equal('1.250,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10KinoBonus).should.eventually.be.equal('2.750,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino11).should.eventually.be.equal('11'),
      this.app.client.getText(elements.KinoWinningsTableKino11Winning).should.eventually.be.equal('12.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino11KinoBonus).should.eventually.be.equal('37.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino12).should.eventually.be.equal('12'),
      this.app.client.getText(elements.KinoWinningsTableKino12Winning).should.eventually.be.equal('500.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino12KinoBonus).should.eventually.be.equal('1.000.000,00€'),
    ]);
  });

  it('Check KINO Close2Win is disabled', function () {
    return this.app.client
      .elements(elements.KinoClose2WinCheckBox)
      .getAttribute('disabled')
      .should.eventually.be.equal('true');
  });

  it('Select KINO Bonus', function () {
    return this.app.client.click(elements.KinoBonusCheckBox).should.eventually.be.fulfilled;
  });

  it('Check KINO Close2Win is disabled', function () {
    return this.app.client
      .elements(elements.KinoClose2WinCheckBox)
      .getAttribute('disabled')
      .should.eventually.be.equal('true');
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
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
        .should.eventually.be.equal('selected'),
      this.app.client.getText(elements.KinoWinningsTableNumbers).should.eventually.be.equal('ΑΡΙΘΜΟΙ'),
      this.app.client.getText(elements.KinoWinningsTableWinnings).should.eventually.be.equal('ΚΕΡΔΟΣ'),
      this.app.client.getText(elements.KinoWinningsTableKinoBonus).should.eventually.equal('KINO BONUS'),
      this.app.client.getText(elements.KinoWinningsTableKino0).should.eventually.be.equal('0'),
      this.app.client.getText(elements.KinoWinningsTableKino0Winning).should.eventually.be.equal('2,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino0KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1).should.eventually.be.equal('1'),
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('1,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('1,25€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('1,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoWinningsTableKino4Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonus).should.eventually.be.equal('1,75€'),
      this.app.client.getText(elements.KinoWinningsTableKino5).should.eventually.be.equal('5'),
      this.app.client.getText(elements.KinoWinningsTableKino5Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino5KinoBonus).should.eventually.be.equal('2,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6).should.eventually.be.equal('6'),
      this.app.client.getText(elements.KinoWinningsTableKino6Winning).should.eventually.be.equal('2,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino6KinoBonus).should.eventually.be.equal('5,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7).should.eventually.be.equal('7'),
      this.app.client.getText(elements.KinoWinningsTableKino7Winning).should.eventually.be.equal('12,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino7KinoBonus).should.eventually.be.equal('25,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8).should.eventually.be.equal('8'),
      this.app.client.getText(elements.KinoWinningsTableKino8Winning).should.eventually.be.equal('75,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8KinoBonus).should.eventually.be.equal('175,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9).should.eventually.be.equal('9'),
      this.app.client.getText(elements.KinoWinningsTableKino9Winning).should.eventually.be.equal('500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9KinoBonus).should.eventually.be.equal('1.100,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10).should.eventually.be.equal('10'),
      this.app.client.getText(elements.KinoWinningsTableKino10Winning).should.eventually.be.equal('1.250,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10KinoBonus).should.eventually.be.equal('2.750,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino11).should.eventually.be.equal('11'),
      this.app.client.getText(elements.KinoWinningsTableKino11Winning).should.eventually.be.equal('12.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino11KinoBonus).should.eventually.be.equal('37.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino12).should.eventually.be.equal('12'),
      this.app.client.getText(elements.KinoWinningsTableKino12Winning).should.eventually.be.equal('500.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino12KinoBonus).should.eventually.be.equal('1.000.000,00€'),
    ]);
  });

  it('Unselect KINO Bonus', function () {
    return this.app.client.click(elements.KinoBonusCheckBox).should.eventually.be.fulfilled;
  });

  it('Select betting amount 1 Euros', function () {
    return this.app.client.click(elements.KinoBetMultiplierBtnLbl2).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
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
        .should.eventually.be.equal('selected'),
      this.app.client.getText(elements.KinoWinningsTableNumbers).should.eventually.be.equal('ΑΡΙΘΜΟΙ'),
      this.app.client.getText(elements.KinoWinningsTableWinnings).should.eventually.be.equal('ΚΕΡΔΟΣ'),
      this.app.client.getText(elements.KinoWinningsTableKinoBonus).should.eventually.equal('KINO BONUS'),
      this.app.client.getText(elements.KinoWinningsTableKino0).should.eventually.be.equal('0'),
      this.app.client.getText(elements.KinoWinningsTableKino0Winning).should.eventually.be.equal('6,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino0KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1).should.eventually.be.equal('1'),
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('3,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('3,75€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('4,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoWinningsTableKino4Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonus).should.eventually.be.equal('5,25€'),
      this.app.client.getText(elements.KinoWinningsTableKino5).should.eventually.be.equal('5'),
      this.app.client.getText(elements.KinoWinningsTableKino5Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino5KinoBonus).should.eventually.be.equal('6,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6).should.eventually.be.equal('6'),
      this.app.client.getText(elements.KinoWinningsTableKino6Winning).should.eventually.be.equal('7,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino6KinoBonus).should.eventually.be.equal('15,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7).should.eventually.be.equal('7'),
      this.app.client.getText(elements.KinoWinningsTableKino7Winning).should.eventually.be.equal('37,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino7KinoBonus).should.eventually.be.equal('75,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8).should.eventually.be.equal('8'),
      this.app.client.getText(elements.KinoWinningsTableKino8Winning).should.eventually.be.equal('225,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8KinoBonus).should.eventually.be.equal('525,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9).should.eventually.be.equal('9'),
      this.app.client.getText(elements.KinoWinningsTableKino9Winning).should.eventually.be.equal('1.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9KinoBonus).should.eventually.be.equal('3.300,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10).should.eventually.be.equal('10'),
      this.app.client.getText(elements.KinoWinningsTableKino10Winning).should.eventually.be.equal('3.750,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10KinoBonus).should.eventually.be.equal('8.250,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino11).should.eventually.be.equal('11'),
      this.app.client.getText(elements.KinoWinningsTableKino11Winning).should.eventually.be.equal('37.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino11KinoBonus).should.eventually.be.equal('112.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino12).should.eventually.be.equal('12'),
      this.app.client.getText(elements.KinoWinningsTableKino12Winning).should.eventually.be.equal('1.000.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino12KinoBonus).should.eventually.be.equal('2.000.000,00€'),
    ]);
  });

  it('Select betting amount 1.5 Euros', function () {
    return this.app.client.click(elements.KinoBetMultiplierBtnLbl3).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
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
        .should.eventually.be.equal('selected'),
      this.app.client.getText(elements.KinoWinningsTableNumbers).should.eventually.be.equal('ΑΡΙΘΜΟΙ'),
      this.app.client.getText(elements.KinoWinningsTableWinnings).should.eventually.be.equal('ΚΕΡΔΟΣ'),
      this.app.client.getText(elements.KinoWinningsTableKinoBonus).should.eventually.equal('KINO BONUS'),
      this.app.client.getText(elements.KinoWinningsTableKino0).should.eventually.be.equal('0'),
      this.app.client.getText(elements.KinoWinningsTableKino0Winning).should.eventually.be.equal('12,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino0KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1).should.eventually.be.equal('1'),
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('6,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('7,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('9,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoWinningsTableKino4Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonus).should.eventually.be.equal('10,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino5).should.eventually.be.equal('5'),
      this.app.client.getText(elements.KinoWinningsTableKino5Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino5KinoBonus).should.eventually.be.equal('12,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6).should.eventually.be.equal('6'),
      this.app.client.getText(elements.KinoWinningsTableKino6Winning).should.eventually.be.equal('15,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6KinoBonus).should.eventually.be.equal('30,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7).should.eventually.be.equal('7'),
      this.app.client.getText(elements.KinoWinningsTableKino7Winning).should.eventually.be.equal('75,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7KinoBonus).should.eventually.be.equal('150,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8).should.eventually.be.equal('8'),
      this.app.client.getText(elements.KinoWinningsTableKino8Winning).should.eventually.be.equal('450,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8KinoBonus).should.eventually.be.equal('1.050,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9).should.eventually.be.equal('9'),
      this.app.client.getText(elements.KinoWinningsTableKino9Winning).should.eventually.be.equal('3.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9KinoBonus).should.eventually.be.equal('6.600,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10).should.eventually.be.equal('10'),
      this.app.client.getText(elements.KinoWinningsTableKino10Winning).should.eventually.be.equal('7.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10KinoBonus).should.eventually.be.equal('16.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino11).should.eventually.be.equal('11'),
      this.app.client.getText(elements.KinoWinningsTableKino11Winning).should.eventually.be.equal('75.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino11KinoBonus).should.eventually.be.equal('225.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino12).should.eventually.be.equal('12'),
      this.app.client.getText(elements.KinoWinningsTableKino12Winning).should.eventually.be.equal('1.000.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino12KinoBonus).should.eventually.be.equal('2.000.000,00€'),
    ]);
  });

  it('Select betting amount 2 Euros', function () {
    return this.app.client.click(elements.KinoBetMultiplierBtnLbl4).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
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
        .should.eventually.be.equal('selected'),
      this.app.client.getText(elements.KinoWinningsTableNumbers).should.eventually.be.equal('ΑΡΙΘΜΟΙ'),
      this.app.client.getText(elements.KinoWinningsTableWinnings).should.eventually.be.equal('ΚΕΡΔΟΣ'),
      this.app.client.getText(elements.KinoWinningsTableKinoBonus).should.eventually.equal('KINO BONUS'),
      this.app.client.getText(elements.KinoWinningsTableKino0).should.eventually.be.equal('0'),
      this.app.client.getText(elements.KinoWinningsTableKino0Winning).should.eventually.be.equal('20,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino0KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1).should.eventually.be.equal('1'),
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('10,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('12,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('15,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoWinningsTableKino4Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonus).should.eventually.be.equal('17,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino5).should.eventually.be.equal('5'),
      this.app.client.getText(elements.KinoWinningsTableKino5Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino5KinoBonus).should.eventually.be.equal('20,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6).should.eventually.be.equal('6'),
      this.app.client.getText(elements.KinoWinningsTableKino6Winning).should.eventually.be.equal('25,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6KinoBonus).should.eventually.be.equal('50,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7).should.eventually.be.equal('7'),
      this.app.client.getText(elements.KinoWinningsTableKino7Winning).should.eventually.be.equal('125,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7KinoBonus).should.eventually.be.equal('250,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8).should.eventually.be.equal('8'),
      this.app.client.getText(elements.KinoWinningsTableKino8Winning).should.eventually.be.equal('750,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8KinoBonus).should.eventually.be.equal('1.750,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9).should.eventually.be.equal('9'),
      this.app.client.getText(elements.KinoWinningsTableKino9Winning).should.eventually.be.equal('5.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9KinoBonus).should.eventually.be.equal('11.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10).should.eventually.be.equal('10'),
      this.app.client.getText(elements.KinoWinningsTableKino10Winning).should.eventually.be.equal('12.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10KinoBonus).should.eventually.be.equal('27.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino11).should.eventually.be.equal('11'),
      this.app.client.getText(elements.KinoWinningsTableKino11Winning).should.eventually.be.equal('125.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino11KinoBonus).should.eventually.be.equal('375.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino12).should.eventually.be.equal('12'),
      this.app.client.getText(elements.KinoWinningsTableKino12Winning).should.eventually.be.equal('1.000.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino12KinoBonus).should.eventually.be.equal('2.000.000,00€'),
    ]);
  });

  it('Select betting amount 2.5 Euros', function () {
    return this.app.client.click(elements.KinoBetMultiplierBtnLbl5).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
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
        .should.eventually.be.equal('selected'),
      this.app.client.getText(elements.KinoWinningsTableNumbers).should.eventually.be.equal('ΑΡΙΘΜΟΙ'),
      this.app.client.getText(elements.KinoWinningsTableWinnings).should.eventually.be.equal('ΚΕΡΔΟΣ'),
      this.app.client.getText(elements.KinoWinningsTableKinoBonus).should.eventually.equal('KINO BONUS'),
      this.app.client.getText(elements.KinoWinningsTableKino0).should.eventually.be.equal('0'),
      this.app.client.getText(elements.KinoWinningsTableKino0Winning).should.eventually.be.equal('30,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino0KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1).should.eventually.be.equal('1'),
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('15,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('18,75€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('22,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoWinningsTableKino4Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonus).should.eventually.be.equal('26,25€'),
      this.app.client.getText(elements.KinoWinningsTableKino5).should.eventually.be.equal('5'),
      this.app.client.getText(elements.KinoWinningsTableKino5Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino5KinoBonus).should.eventually.be.equal('30,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6).should.eventually.be.equal('6'),
      this.app.client.getText(elements.KinoWinningsTableKino6Winning).should.eventually.be.equal('37,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino6KinoBonus).should.eventually.be.equal('75,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7).should.eventually.be.equal('7'),
      this.app.client.getText(elements.KinoWinningsTableKino7Winning).should.eventually.be.equal('187,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino7KinoBonus).should.eventually.be.equal('375,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8).should.eventually.be.equal('8'),
      this.app.client.getText(elements.KinoWinningsTableKino8Winning).should.eventually.be.equal('1.125,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8KinoBonus).should.eventually.be.equal('2.625,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9).should.eventually.be.equal('9'),
      this.app.client.getText(elements.KinoWinningsTableKino9Winning).should.eventually.be.equal('7.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9KinoBonus).should.eventually.be.equal('16.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10).should.eventually.be.equal('10'),
      this.app.client.getText(elements.KinoWinningsTableKino10Winning).should.eventually.be.equal('18.750,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10KinoBonus).should.eventually.be.equal('41.250,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino11).should.eventually.be.equal('11'),
      this.app.client.getText(elements.KinoWinningsTableKino11Winning).should.eventually.be.equal('187.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino11KinoBonus).should.eventually.be.equal('562.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino12).should.eventually.be.equal('12'),
      this.app.client.getText(elements.KinoWinningsTableKino12Winning).should.eventually.be.equal('1.000.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino12KinoBonus).should.eventually.be.equal('2.000.000,00€'),
    ]);
  });

  it('Select betting amount 3 Euros', function () {
    return this.app.client.click(elements.KinoBetMultiplierBtnLbl6).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
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
        .should.eventually.be.equal('selected'),
      this.app.client.getText(elements.KinoWinningsTableNumbers).should.eventually.be.equal('ΑΡΙΘΜΟΙ'),
      this.app.client.getText(elements.KinoWinningsTableWinnings).should.eventually.be.equal('ΚΕΡΔΟΣ'),
      this.app.client.getText(elements.KinoWinningsTableKinoBonus).should.eventually.equal('KINO BONUS'),
      this.app.client.getText(elements.KinoWinningsTableKino0).should.eventually.be.equal('0'),
      this.app.client.getText(elements.KinoWinningsTableKino0Winning).should.eventually.be.equal('42,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino0KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1).should.eventually.be.equal('1'),
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('21,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('26,25€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('31,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoWinningsTableKino4Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonus).should.eventually.be.equal('36,75€'),
      this.app.client.getText(elements.KinoWinningsTableKino5).should.eventually.be.equal('5'),
      this.app.client.getText(elements.KinoWinningsTableKino5Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino5KinoBonus).should.eventually.be.equal('42,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6).should.eventually.be.equal('6'),
      this.app.client.getText(elements.KinoWinningsTableKino6Winning).should.eventually.be.equal('52,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino6KinoBonus).should.eventually.be.equal('105,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7).should.eventually.be.equal('7'),
      this.app.client.getText(elements.KinoWinningsTableKino7Winning).should.eventually.be.equal('262,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino7KinoBonus).should.eventually.be.equal('525,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8).should.eventually.be.equal('8'),
      this.app.client.getText(elements.KinoWinningsTableKino8Winning).should.eventually.be.equal('1.575,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8KinoBonus).should.eventually.be.equal('3.675,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9).should.eventually.be.equal('9'),
      this.app.client.getText(elements.KinoWinningsTableKino9Winning).should.eventually.be.equal('10.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9KinoBonus).should.eventually.be.equal('23.100,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10).should.eventually.be.equal('10'),
      this.app.client.getText(elements.KinoWinningsTableKino10Winning).should.eventually.be.equal('26.250,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10KinoBonus).should.eventually.be.equal('57.750,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino11).should.eventually.be.equal('11'),
      this.app.client.getText(elements.KinoWinningsTableKino11Winning).should.eventually.be.equal('262.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino11KinoBonus).should.eventually.be.equal('787.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino12).should.eventually.be.equal('12'),
      this.app.client.getText(elements.KinoWinningsTableKino12Winning).should.eventually.be.equal('1.000.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino12KinoBonus).should.eventually.be.equal('2.000.000,00€'),
    ]);
  });

  it('Select betting amount 4 Euros', function () {
    return this.app.client.click(elements.KinoBetMultiplierBtnLbl7).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
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
        .should.eventually.be.equal('selected'),
      this.app.client.getText(elements.KinoWinningsTableNumbers).should.eventually.be.equal('ΑΡΙΘΜΟΙ'),
      this.app.client.getText(elements.KinoWinningsTableWinnings).should.eventually.be.equal('ΚΕΡΔΟΣ'),
      this.app.client.getText(elements.KinoWinningsTableKinoBonus).should.eventually.equal('KINO BONUS'),
      this.app.client.getText(elements.KinoWinningsTableKino0).should.eventually.be.equal('0'),
      this.app.client.getText(elements.KinoWinningsTableKino0Winning).should.eventually.be.equal('58,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino0KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1).should.eventually.be.equal('1'),
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('29,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('36,25€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('43,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoWinningsTableKino4Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonus).should.eventually.be.equal('50,75€'),
      this.app.client.getText(elements.KinoWinningsTableKino5).should.eventually.be.equal('5'),
      this.app.client.getText(elements.KinoWinningsTableKino5Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino5KinoBonus).should.eventually.be.equal('58,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6).should.eventually.be.equal('6'),
      this.app.client.getText(elements.KinoWinningsTableKino6Winning).should.eventually.be.equal('72,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino6KinoBonus).should.eventually.be.equal('145,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7).should.eventually.be.equal('7'),
      this.app.client.getText(elements.KinoWinningsTableKino7Winning).should.eventually.be.equal('362,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino7KinoBonus).should.eventually.be.equal('725,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8).should.eventually.be.equal('8'),
      this.app.client.getText(elements.KinoWinningsTableKino8Winning).should.eventually.be.equal('2.175,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8KinoBonus).should.eventually.be.equal('5.075,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9).should.eventually.be.equal('9'),
      this.app.client.getText(elements.KinoWinningsTableKino9Winning).should.eventually.be.equal('14.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9KinoBonus).should.eventually.be.equal('31.900,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10).should.eventually.be.equal('10'),
      this.app.client.getText(elements.KinoWinningsTableKino10Winning).should.eventually.be.equal('36.250,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10KinoBonus).should.eventually.be.equal('79.750,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino11).should.eventually.be.equal('11'),
      this.app.client.getText(elements.KinoWinningsTableKino11Winning).should.eventually.be.equal('362.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino11KinoBonus).should.eventually.be.equal('1.087.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino12).should.eventually.be.equal('12'),
      this.app.client.getText(elements.KinoWinningsTableKino12Winning).should.eventually.be.equal('1.000.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino12KinoBonus).should.eventually.be.equal('2.000.000,00€'),
    ]);
  });

  it('Select betting amount 5 Euros', function () {
    return this.app.client.click(elements.KinoBetMultiplierBtnLbl8).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
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
        .should.eventually.be.equal('selected'),
      this.app.client.getText(elements.KinoWinningsTableNumbers).should.eventually.be.equal('ΑΡΙΘΜΟΙ'),
      this.app.client.getText(elements.KinoWinningsTableWinnings).should.eventually.be.equal('ΚΕΡΔΟΣ'),
      this.app.client.getText(elements.KinoWinningsTableKinoBonus).should.eventually.equal('KINO BONUS'),
      this.app.client.getText(elements.KinoWinningsTableKino0).should.eventually.be.equal('0'),
      this.app.client.getText(elements.KinoWinningsTableKino0Winning).should.eventually.be.equal('78,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino0KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1).should.eventually.be.equal('1'),
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('39,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('48,75€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('58,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoWinningsTableKino4Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonus).should.eventually.be.equal('68,25€'),
      this.app.client.getText(elements.KinoWinningsTableKino5).should.eventually.be.equal('5'),
      this.app.client.getText(elements.KinoWinningsTableKino5Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino5KinoBonus).should.eventually.be.equal('78,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6).should.eventually.be.equal('6'),
      this.app.client.getText(elements.KinoWinningsTableKino6Winning).should.eventually.be.equal('97,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino6KinoBonus).should.eventually.be.equal('195,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7).should.eventually.be.equal('7'),
      this.app.client.getText(elements.KinoWinningsTableKino7Winning).should.eventually.be.equal('487,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino7KinoBonus).should.eventually.be.equal('975,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8).should.eventually.be.equal('8'),
      this.app.client.getText(elements.KinoWinningsTableKino8Winning).should.eventually.be.equal('2.925,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8KinoBonus).should.eventually.be.equal('6.825,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9).should.eventually.be.equal('9'),
      this.app.client.getText(elements.KinoWinningsTableKino9Winning).should.eventually.be.equal('19.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9KinoBonus).should.eventually.be.equal('42.900,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10).should.eventually.be.equal('10'),
      this.app.client.getText(elements.KinoWinningsTableKino10Winning).should.eventually.be.equal('48.750,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10KinoBonus).should.eventually.be.equal('107.250,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino11).should.eventually.be.equal('11'),
      this.app.client.getText(elements.KinoWinningsTableKino11Winning).should.eventually.be.equal('487.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino11KinoBonus).should.eventually.be.equal('1.462.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino12).should.eventually.be.equal('12'),
      this.app.client.getText(elements.KinoWinningsTableKino12Winning).should.eventually.be.equal('1.000.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino12KinoBonus).should.eventually.be.equal('2.000.000,00€'),
    ]);
  });

  it('Select betting amount 10 Euros', function () {
    return this.app.client.click(elements.KinoBetMultiplierBtnLbl9).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
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
        .should.eventually.be.equal('selected'),
      this.app.client.getText(elements.KinoWinningsTableNumbers).should.eventually.be.equal('ΑΡΙΘΜΟΙ'),
      this.app.client.getText(elements.KinoWinningsTableWinnings).should.eventually.be.equal('ΚΕΡΔΟΣ'),
      this.app.client.getText(elements.KinoWinningsTableKinoBonus).should.eventually.equal('KINO BONUS'),
      this.app.client.getText(elements.KinoWinningsTableKino0).should.eventually.be.equal('0'),
      this.app.client.getText(elements.KinoWinningsTableKino0Winning).should.eventually.be.equal('118,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino0KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1).should.eventually.be.equal('1'),
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('59,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('73,75€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('88,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoWinningsTableKino4Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonus).should.eventually.be.equal('103,25€'),
      this.app.client.getText(elements.KinoWinningsTableKino5).should.eventually.be.equal('5'),
      this.app.client.getText(elements.KinoWinningsTableKino5Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino5KinoBonus).should.eventually.be.equal('118,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6).should.eventually.be.equal('6'),
      this.app.client.getText(elements.KinoWinningsTableKino6Winning).should.eventually.be.equal('147,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino6KinoBonus).should.eventually.be.equal('295,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7).should.eventually.be.equal('7'),
      this.app.client.getText(elements.KinoWinningsTableKino7Winning).should.eventually.be.equal('737,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino7KinoBonus).should.eventually.be.equal('1.475,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8).should.eventually.be.equal('8'),
      this.app.client.getText(elements.KinoWinningsTableKino8Winning).should.eventually.be.equal('4.425,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8KinoBonus).should.eventually.be.equal('10.325,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9).should.eventually.be.equal('9'),
      this.app.client.getText(elements.KinoWinningsTableKino9Winning).should.eventually.be.equal('29.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9KinoBonus).should.eventually.be.equal('64.900,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10).should.eventually.be.equal('10'),
      this.app.client.getText(elements.KinoWinningsTableKino10Winning).should.eventually.be.equal('73.750,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10KinoBonus).should.eventually.be.equal('162.250,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino11).should.eventually.be.equal('11'),
      this.app.client.getText(elements.KinoWinningsTableKino11Winning).should.eventually.be.equal('737.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino11KinoBonus).should.eventually.be.equal('2.000.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino12).should.eventually.be.equal('12'),
      this.app.client.getText(elements.KinoWinningsTableKino12Winning).should.eventually.be.equal('1.000.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino12KinoBonus).should.eventually.be.equal('2.000.000,00€'),
    ]);
  });

  it('Select betting amount 20 Euros', function () {
    return this.app.client.click(elements.KinoBetMultiplierBtnLbl10).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
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
        .should.eventually.be.equal('selected'),
      this.app.client.getText(elements.KinoWinningsTableNumbers).should.eventually.be.equal('ΑΡΙΘΜΟΙ'),
      this.app.client.getText(elements.KinoWinningsTableWinnings).should.eventually.be.equal('ΚΕΡΔΟΣ'),
      this.app.client.getText(elements.KinoWinningsTableKinoBonus).should.eventually.equal('KINO BONUS'),
      this.app.client.getText(elements.KinoWinningsTableKino0).should.eventually.be.equal('0'),
      this.app.client.getText(elements.KinoWinningsTableKino0Winning).should.eventually.be.equal('198,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino0KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1).should.eventually.be.equal('1'),
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('99,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('123,75€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('148,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoWinningsTableKino4Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonus).should.eventually.be.equal('173,25€'),
      this.app.client.getText(elements.KinoWinningsTableKino5).should.eventually.be.equal('5'),
      this.app.client.getText(elements.KinoWinningsTableKino5Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino5KinoBonus).should.eventually.be.equal('198,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6).should.eventually.be.equal('6'),
      this.app.client.getText(elements.KinoWinningsTableKino6Winning).should.eventually.be.equal('247,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino6KinoBonus).should.eventually.be.equal('495,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7).should.eventually.be.equal('7'),
      this.app.client.getText(elements.KinoWinningsTableKino7Winning).should.eventually.be.equal('1.237,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino7KinoBonus).should.eventually.be.equal('2.475,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8).should.eventually.be.equal('8'),
      this.app.client.getText(elements.KinoWinningsTableKino8Winning).should.eventually.be.equal('7.425,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8KinoBonus).should.eventually.be.equal('17.325,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9).should.eventually.be.equal('9'),
      this.app.client.getText(elements.KinoWinningsTableKino9Winning).should.eventually.be.equal('49.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9KinoBonus).should.eventually.be.equal('108.900,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10).should.eventually.be.equal('10'),
      this.app.client.getText(elements.KinoWinningsTableKino10Winning).should.eventually.be.equal('123.750,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10KinoBonus).should.eventually.be.equal('272.250,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino11).should.eventually.be.equal('11'),
      this.app.client.getText(elements.KinoWinningsTableKino11Winning).should.eventually.be.equal('1.000.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino11KinoBonus).should.eventually.be.equal('2.000.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino12).should.eventually.be.equal('12'),
      this.app.client.getText(elements.KinoWinningsTableKino12Winning).should.eventually.be.equal('1.000.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino12KinoBonus).should.eventually.be.equal('2.000.000,00€'),
    ]);
  });

  it('Unselect betting amount 20 Euros', function () {
    return this.app.client.click(elements.KinoBetMultiplierBtnLbl10).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
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
        .should.eventually.be.equal('selected'),
      this.app.client.getText(elements.KinoWinningsTableNumbers).should.eventually.be.equal('ΑΡΙΘΜΟΙ'),
      this.app.client.getText(elements.KinoWinningsTableWinnings).should.eventually.be.equal('ΚΕΡΔΟΣ'),
      this.app.client.getText(elements.KinoWinningsTableKinoBonus).should.eventually.equal('KINO BONUS'),
      this.app.client.getText(elements.KinoWinningsTableKino0).should.eventually.be.equal('0'),
      this.app.client.getText(elements.KinoWinningsTableKino0Winning).should.eventually.be.equal('118,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino0KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1).should.eventually.be.equal('1'),
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('59,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('73,75€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('88,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoWinningsTableKino4Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonus).should.eventually.be.equal('103,25€'),
      this.app.client.getText(elements.KinoWinningsTableKino5).should.eventually.be.equal('5'),
      this.app.client.getText(elements.KinoWinningsTableKino5Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino5KinoBonus).should.eventually.be.equal('118,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6).should.eventually.be.equal('6'),
      this.app.client.getText(elements.KinoWinningsTableKino6Winning).should.eventually.be.equal('147,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino6KinoBonus).should.eventually.be.equal('295,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7).should.eventually.be.equal('7'),
      this.app.client.getText(elements.KinoWinningsTableKino7Winning).should.eventually.be.equal('737,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino7KinoBonus).should.eventually.be.equal('1.475,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8).should.eventually.be.equal('8'),
      this.app.client.getText(elements.KinoWinningsTableKino8Winning).should.eventually.be.equal('4.425,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8KinoBonus).should.eventually.be.equal('10.325,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9).should.eventually.be.equal('9'),
      this.app.client.getText(elements.KinoWinningsTableKino9Winning).should.eventually.be.equal('29.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9KinoBonus).should.eventually.be.equal('64.900,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10).should.eventually.be.equal('10'),
      this.app.client.getText(elements.KinoWinningsTableKino10Winning).should.eventually.be.equal('73.750,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10KinoBonus).should.eventually.be.equal('162.250,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino11).should.eventually.be.equal('11'),
      this.app.client.getText(elements.KinoWinningsTableKino11Winning).should.eventually.be.equal('737.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino11KinoBonus).should.eventually.be.equal('2.000.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino12).should.eventually.be.equal('12'),
      this.app.client.getText(elements.KinoWinningsTableKino12Winning).should.eventually.be.equal('1.000.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino12KinoBonus).should.eventually.be.equal('2.000.000,00€'),
    ]);
  });

  it('Unselect betting amount 10 Euros', function () {
    return this.app.client.click(elements.KinoBetMultiplierBtnLbl9).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
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
        .should.eventually.be.equal('selected'),
      this.app.client.getText(elements.KinoWinningsTableNumbers).should.eventually.be.equal('ΑΡΙΘΜΟΙ'),
      this.app.client.getText(elements.KinoWinningsTableWinnings).should.eventually.be.equal('ΚΕΡΔΟΣ'),
      this.app.client.getText(elements.KinoWinningsTableKinoBonus).should.eventually.equal('KINO BONUS'),
      this.app.client.getText(elements.KinoWinningsTableKino0).should.eventually.be.equal('0'),
      this.app.client.getText(elements.KinoWinningsTableKino0Winning).should.eventually.be.equal('78,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino0KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1).should.eventually.be.equal('1'),
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('39,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('48,75€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('58,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoWinningsTableKino4Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonus).should.eventually.be.equal('68,25€'),
      this.app.client.getText(elements.KinoWinningsTableKino5).should.eventually.be.equal('5'),
      this.app.client.getText(elements.KinoWinningsTableKino5Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino5KinoBonus).should.eventually.be.equal('78,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6).should.eventually.be.equal('6'),
      this.app.client.getText(elements.KinoWinningsTableKino6Winning).should.eventually.be.equal('97,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino6KinoBonus).should.eventually.be.equal('195,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7).should.eventually.be.equal('7'),
      this.app.client.getText(elements.KinoWinningsTableKino7Winning).should.eventually.be.equal('487,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino7KinoBonus).should.eventually.be.equal('975,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8).should.eventually.be.equal('8'),
      this.app.client.getText(elements.KinoWinningsTableKino8Winning).should.eventually.be.equal('2.925,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8KinoBonus).should.eventually.be.equal('6.825,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9).should.eventually.be.equal('9'),
      this.app.client.getText(elements.KinoWinningsTableKino9Winning).should.eventually.be.equal('19.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9KinoBonus).should.eventually.be.equal('42.900,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10).should.eventually.be.equal('10'),
      this.app.client.getText(elements.KinoWinningsTableKino10Winning).should.eventually.be.equal('48.750,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10KinoBonus).should.eventually.be.equal('107.250,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino11).should.eventually.be.equal('11'),
      this.app.client.getText(elements.KinoWinningsTableKino11Winning).should.eventually.be.equal('487.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino11KinoBonus).should.eventually.be.equal('1.462.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino12).should.eventually.be.equal('12'),
      this.app.client.getText(elements.KinoWinningsTableKino12Winning).should.eventually.be.equal('1.000.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino12KinoBonus).should.eventually.be.equal('2.000.000,00€'),
    ]);
  });

  it('Unselect betting amount 5 Euros', function () {
    return this.app.client.click(elements.KinoBetMultiplierBtnLbl8).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
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
        .should.eventually.be.equal('selected'),
      this.app.client.getText(elements.KinoWinningsTableNumbers).should.eventually.be.equal('ΑΡΙΘΜΟΙ'),
      this.app.client.getText(elements.KinoWinningsTableWinnings).should.eventually.be.equal('ΚΕΡΔΟΣ'),
      this.app.client.getText(elements.KinoWinningsTableKinoBonus).should.eventually.equal('KINO BONUS'),
      this.app.client.getText(elements.KinoWinningsTableKino0).should.eventually.be.equal('0'),
      this.app.client.getText(elements.KinoWinningsTableKino0Winning).should.eventually.be.equal('58,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino0KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1).should.eventually.be.equal('1'),
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('29,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('36,25€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('43,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoWinningsTableKino4Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonus).should.eventually.be.equal('50,75€'),
      this.app.client.getText(elements.KinoWinningsTableKino5).should.eventually.be.equal('5'),
      this.app.client.getText(elements.KinoWinningsTableKino5Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino5KinoBonus).should.eventually.be.equal('58,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6).should.eventually.be.equal('6'),
      this.app.client.getText(elements.KinoWinningsTableKino6Winning).should.eventually.be.equal('72,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino6KinoBonus).should.eventually.be.equal('145,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7).should.eventually.be.equal('7'),
      this.app.client.getText(elements.KinoWinningsTableKino7Winning).should.eventually.be.equal('362,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino7KinoBonus).should.eventually.be.equal('725,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8).should.eventually.be.equal('8'),
      this.app.client.getText(elements.KinoWinningsTableKino8Winning).should.eventually.be.equal('2.175,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8KinoBonus).should.eventually.be.equal('5.075,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9).should.eventually.be.equal('9'),
      this.app.client.getText(elements.KinoWinningsTableKino9Winning).should.eventually.be.equal('14.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9KinoBonus).should.eventually.be.equal('31.900,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10).should.eventually.be.equal('10'),
      this.app.client.getText(elements.KinoWinningsTableKino10Winning).should.eventually.be.equal('36.250,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10KinoBonus).should.eventually.be.equal('79.750,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino11).should.eventually.be.equal('11'),
      this.app.client.getText(elements.KinoWinningsTableKino11Winning).should.eventually.be.equal('362.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino11KinoBonus).should.eventually.be.equal('1.087.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino12).should.eventually.be.equal('12'),
      this.app.client.getText(elements.KinoWinningsTableKino12Winning).should.eventually.be.equal('1.000.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino12KinoBonus).should.eventually.be.equal('2.000.000,00€'),
    ]);
  });

  it('Unselect betting amount 4 Euros', function () {
    return this.app.client.click(elements.KinoBetMultiplierBtnLbl7).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
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
        .should.eventually.be.equal('selected'),
      this.app.client.getText(elements.KinoWinningsTableNumbers).should.eventually.be.equal('ΑΡΙΘΜΟΙ'),
      this.app.client.getText(elements.KinoWinningsTableWinnings).should.eventually.be.equal('ΚΕΡΔΟΣ'),
      this.app.client.getText(elements.KinoWinningsTableKinoBonus).should.eventually.equal('KINO BONUS'),
      this.app.client.getText(elements.KinoWinningsTableKino0).should.eventually.be.equal('0'),
      this.app.client.getText(elements.KinoWinningsTableKino0Winning).should.eventually.be.equal('42,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino0KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1).should.eventually.be.equal('1'),
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('21,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('26,25€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('31,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoWinningsTableKino4Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonus).should.eventually.be.equal('36,75€'),
      this.app.client.getText(elements.KinoWinningsTableKino5).should.eventually.be.equal('5'),
      this.app.client.getText(elements.KinoWinningsTableKino5Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino5KinoBonus).should.eventually.be.equal('42,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6).should.eventually.be.equal('6'),
      this.app.client.getText(elements.KinoWinningsTableKino6Winning).should.eventually.be.equal('52,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino6KinoBonus).should.eventually.be.equal('105,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7).should.eventually.be.equal('7'),
      this.app.client.getText(elements.KinoWinningsTableKino7Winning).should.eventually.be.equal('262,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino7KinoBonus).should.eventually.be.equal('525,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8).should.eventually.be.equal('8'),
      this.app.client.getText(elements.KinoWinningsTableKino8Winning).should.eventually.be.equal('1.575,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8KinoBonus).should.eventually.be.equal('3.675,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9).should.eventually.be.equal('9'),
      this.app.client.getText(elements.KinoWinningsTableKino9Winning).should.eventually.be.equal('10.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9KinoBonus).should.eventually.be.equal('23.100,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10).should.eventually.be.equal('10'),
      this.app.client.getText(elements.KinoWinningsTableKino10Winning).should.eventually.be.equal('26.250,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10KinoBonus).should.eventually.be.equal('57.750,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino11).should.eventually.be.equal('11'),
      this.app.client.getText(elements.KinoWinningsTableKino11Winning).should.eventually.be.equal('262.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino11KinoBonus).should.eventually.be.equal('787.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino12).should.eventually.be.equal('12'),
      this.app.client.getText(elements.KinoWinningsTableKino12Winning).should.eventually.be.equal('1.000.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino12KinoBonus).should.eventually.be.equal('2.000.000,00€'),
    ]);
  });

  it('Unselect betting amount 3 Euros', function () {
    return this.app.client.click(elements.KinoBetMultiplierBtnLbl6).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
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
        .should.eventually.be.equal('selected'),
      this.app.client.getText(elements.KinoWinningsTableNumbers).should.eventually.be.equal('ΑΡΙΘΜΟΙ'),
      this.app.client.getText(elements.KinoWinningsTableWinnings).should.eventually.be.equal('ΚΕΡΔΟΣ'),
      this.app.client.getText(elements.KinoWinningsTableKinoBonus).should.eventually.equal('KINO BONUS'),
      this.app.client.getText(elements.KinoWinningsTableKino0).should.eventually.be.equal('0'),
      this.app.client.getText(elements.KinoWinningsTableKino0Winning).should.eventually.be.equal('30,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino0KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1).should.eventually.be.equal('1'),
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('15,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('18,75€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('22,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoWinningsTableKino4Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonus).should.eventually.be.equal('26,25€'),
      this.app.client.getText(elements.KinoWinningsTableKino5).should.eventually.be.equal('5'),
      this.app.client.getText(elements.KinoWinningsTableKino5Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino5KinoBonus).should.eventually.be.equal('30,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6).should.eventually.be.equal('6'),
      this.app.client.getText(elements.KinoWinningsTableKino6Winning).should.eventually.be.equal('37,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino6KinoBonus).should.eventually.be.equal('75,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7).should.eventually.be.equal('7'),
      this.app.client.getText(elements.KinoWinningsTableKino7Winning).should.eventually.be.equal('187,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino7KinoBonus).should.eventually.be.equal('375,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8).should.eventually.be.equal('8'),
      this.app.client.getText(elements.KinoWinningsTableKino8Winning).should.eventually.be.equal('1.125,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8KinoBonus).should.eventually.be.equal('2.625,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9).should.eventually.be.equal('9'),
      this.app.client.getText(elements.KinoWinningsTableKino9Winning).should.eventually.be.equal('7.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9KinoBonus).should.eventually.be.equal('16.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10).should.eventually.be.equal('10'),
      this.app.client.getText(elements.KinoWinningsTableKino10Winning).should.eventually.be.equal('18.750,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10KinoBonus).should.eventually.be.equal('41.250,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino11).should.eventually.be.equal('11'),
      this.app.client.getText(elements.KinoWinningsTableKino11Winning).should.eventually.be.equal('187.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino11KinoBonus).should.eventually.be.equal('562.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino12).should.eventually.be.equal('12'),
      this.app.client.getText(elements.KinoWinningsTableKino12Winning).should.eventually.be.equal('1.000.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino12KinoBonus).should.eventually.be.equal('2.000.000,00€'),
    ]);
  });

  it('Unselect betting amount 2.5 Euros', function () {
    return this.app.client.click(elements.KinoBetMultiplierBtnLbl5).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
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
        .should.eventually.be.equal('selected'),
      this.app.client.getText(elements.KinoWinningsTableNumbers).should.eventually.be.equal('ΑΡΙΘΜΟΙ'),
      this.app.client.getText(elements.KinoWinningsTableWinnings).should.eventually.be.equal('ΚΕΡΔΟΣ'),
      this.app.client.getText(elements.KinoWinningsTableKinoBonus).should.eventually.equal('KINO BONUS'),
      this.app.client.getText(elements.KinoWinningsTableKino0).should.eventually.be.equal('0'),
      this.app.client.getText(elements.KinoWinningsTableKino0Winning).should.eventually.be.equal('20,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino0KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1).should.eventually.be.equal('1'),
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('10,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('12,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('15,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoWinningsTableKino4Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonus).should.eventually.be.equal('17,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino5).should.eventually.be.equal('5'),
      this.app.client.getText(elements.KinoWinningsTableKino5Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino5KinoBonus).should.eventually.be.equal('20,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6).should.eventually.be.equal('6'),
      this.app.client.getText(elements.KinoWinningsTableKino6Winning).should.eventually.be.equal('25,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6KinoBonus).should.eventually.be.equal('50,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7).should.eventually.be.equal('7'),
      this.app.client.getText(elements.KinoWinningsTableKino7Winning).should.eventually.be.equal('125,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7KinoBonus).should.eventually.be.equal('250,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8).should.eventually.be.equal('8'),
      this.app.client.getText(elements.KinoWinningsTableKino8Winning).should.eventually.be.equal('750,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8KinoBonus).should.eventually.be.equal('1.750,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9).should.eventually.be.equal('9'),
      this.app.client.getText(elements.KinoWinningsTableKino9Winning).should.eventually.be.equal('5.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9KinoBonus).should.eventually.be.equal('11.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10).should.eventually.be.equal('10'),
      this.app.client.getText(elements.KinoWinningsTableKino10Winning).should.eventually.be.equal('12.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10KinoBonus).should.eventually.be.equal('27.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino11).should.eventually.be.equal('11'),
      this.app.client.getText(elements.KinoWinningsTableKino11Winning).should.eventually.be.equal('125.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino11KinoBonus).should.eventually.be.equal('375.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino12).should.eventually.be.equal('12'),
      this.app.client.getText(elements.KinoWinningsTableKino12Winning).should.eventually.be.equal('1.000.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino12KinoBonus).should.eventually.be.equal('2.000.000,00€'),
    ]);
  });

  it('Unselect betting amount 2 Euros', function () {
    return this.app.client.click(elements.KinoBetMultiplierBtnLbl4).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
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
        .should.eventually.be.equal('selected'),
      this.app.client.getText(elements.KinoWinningsTableNumbers).should.eventually.be.equal('ΑΡΙΘΜΟΙ'),
      this.app.client.getText(elements.KinoWinningsTableWinnings).should.eventually.be.equal('ΚΕΡΔΟΣ'),
      this.app.client.getText(elements.KinoWinningsTableKinoBonus).should.eventually.equal('KINO BONUS'),
      this.app.client.getText(elements.KinoWinningsTableKino0).should.eventually.be.equal('0'),
      this.app.client.getText(elements.KinoWinningsTableKino0Winning).should.eventually.be.equal('12,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino0KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1).should.eventually.be.equal('1'),
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('6,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('7,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('9,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoWinningsTableKino4Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonus).should.eventually.be.equal('10,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino5).should.eventually.be.equal('5'),
      this.app.client.getText(elements.KinoWinningsTableKino5Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino5KinoBonus).should.eventually.be.equal('12,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6).should.eventually.be.equal('6'),
      this.app.client.getText(elements.KinoWinningsTableKino6Winning).should.eventually.be.equal('15,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6KinoBonus).should.eventually.be.equal('30,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7).should.eventually.be.equal('7'),
      this.app.client.getText(elements.KinoWinningsTableKino7Winning).should.eventually.be.equal('75,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7KinoBonus).should.eventually.be.equal('150,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8).should.eventually.be.equal('8'),
      this.app.client.getText(elements.KinoWinningsTableKino8Winning).should.eventually.be.equal('450,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8KinoBonus).should.eventually.be.equal('1.050,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9).should.eventually.be.equal('9'),
      this.app.client.getText(elements.KinoWinningsTableKino9Winning).should.eventually.be.equal('3.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9KinoBonus).should.eventually.be.equal('6.600,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10).should.eventually.be.equal('10'),
      this.app.client.getText(elements.KinoWinningsTableKino10Winning).should.eventually.be.equal('7.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10KinoBonus).should.eventually.be.equal('16.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino11).should.eventually.be.equal('11'),
      this.app.client.getText(elements.KinoWinningsTableKino11Winning).should.eventually.be.equal('75.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino11KinoBonus).should.eventually.be.equal('225.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino12).should.eventually.be.equal('12'),
      this.app.client.getText(elements.KinoWinningsTableKino12Winning).should.eventually.be.equal('1.000.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino12KinoBonus).should.eventually.be.equal('2.000.000,00€'),
    ]);
  });

  it('Unselect betting amount 1.5 Euros', function () {
    return this.app.client.click(elements.KinoBetMultiplierBtnLbl3).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
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
        .should.eventually.be.equal('selected'),
      this.app.client.getText(elements.KinoWinningsTableNumbers).should.eventually.be.equal('ΑΡΙΘΜΟΙ'),
      this.app.client.getText(elements.KinoWinningsTableWinnings).should.eventually.be.equal('ΚΕΡΔΟΣ'),
      this.app.client.getText(elements.KinoWinningsTableKinoBonus).should.eventually.equal('KINO BONUS'),
      this.app.client.getText(elements.KinoWinningsTableKino0).should.eventually.be.equal('0'),
      this.app.client.getText(elements.KinoWinningsTableKino0Winning).should.eventually.be.equal('6,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino0KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1).should.eventually.be.equal('1'),
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('3,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('3,75€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('4,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoWinningsTableKino4Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonus).should.eventually.be.equal('5,25€'),
      this.app.client.getText(elements.KinoWinningsTableKino5).should.eventually.be.equal('5'),
      this.app.client.getText(elements.KinoWinningsTableKino5Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino5KinoBonus).should.eventually.be.equal('6,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6).should.eventually.be.equal('6'),
      this.app.client.getText(elements.KinoWinningsTableKino6Winning).should.eventually.be.equal('7,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino6KinoBonus).should.eventually.be.equal('15,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7).should.eventually.be.equal('7'),
      this.app.client.getText(elements.KinoWinningsTableKino7Winning).should.eventually.be.equal('37,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino7KinoBonus).should.eventually.be.equal('75,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8).should.eventually.be.equal('8'),
      this.app.client.getText(elements.KinoWinningsTableKino8Winning).should.eventually.be.equal('225,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8KinoBonus).should.eventually.be.equal('525,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9).should.eventually.be.equal('9'),
      this.app.client.getText(elements.KinoWinningsTableKino9Winning).should.eventually.be.equal('1.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9KinoBonus).should.eventually.be.equal('3.300,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10).should.eventually.be.equal('10'),
      this.app.client.getText(elements.KinoWinningsTableKino10Winning).should.eventually.be.equal('3.750,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10KinoBonus).should.eventually.be.equal('8.250,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino11).should.eventually.be.equal('11'),
      this.app.client.getText(elements.KinoWinningsTableKino11Winning).should.eventually.be.equal('37.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino11KinoBonus).should.eventually.be.equal('112.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino12).should.eventually.be.equal('12'),
      this.app.client.getText(elements.KinoWinningsTableKino12Winning).should.eventually.be.equal('1.000.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino12KinoBonus).should.eventually.be.equal('2.000.000,00€'),
    ]);
  });

  it('Unselect betting amount 1 Euros', function () {
    return this.app.client.click(elements.KinoBetMultiplierBtnLbl2).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
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
        .should.eventually.be.equal('selected'),
      this.app.client.getText(elements.KinoWinningsTableNumbers).should.eventually.be.equal('ΑΡΙΘΜΟΙ'),
      this.app.client.getText(elements.KinoWinningsTableWinnings).should.eventually.be.equal('ΚΕΡΔΟΣ'),
      this.app.client.getText(elements.KinoWinningsTableKinoBonus).should.eventually.equal('KINO BONUS'),
      this.app.client.getText(elements.KinoWinningsTableKino0).should.eventually.be.equal('0'),
      this.app.client.getText(elements.KinoWinningsTableKino0Winning).should.eventually.be.equal('2,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino0KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1).should.eventually.be.equal('1'),
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('1,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('1,25€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('1,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoWinningsTableKino4Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonus).should.eventually.be.equal('1,75€'),
      this.app.client.getText(elements.KinoWinningsTableKino5).should.eventually.be.equal('5'),
      this.app.client.getText(elements.KinoWinningsTableKino5Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino5KinoBonus).should.eventually.be.equal('2,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6).should.eventually.be.equal('6'),
      this.app.client.getText(elements.KinoWinningsTableKino6Winning).should.eventually.be.equal('2,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino6KinoBonus).should.eventually.be.equal('5,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7).should.eventually.be.equal('7'),
      this.app.client.getText(elements.KinoWinningsTableKino7Winning).should.eventually.be.equal('12,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino7KinoBonus).should.eventually.be.equal('25,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8).should.eventually.be.equal('8'),
      this.app.client.getText(elements.KinoWinningsTableKino8Winning).should.eventually.be.equal('75,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8KinoBonus).should.eventually.be.equal('175,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9).should.eventually.be.equal('9'),
      this.app.client.getText(elements.KinoWinningsTableKino9Winning).should.eventually.be.equal('500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9KinoBonus).should.eventually.be.equal('1.100,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10).should.eventually.be.equal('10'),
      this.app.client.getText(elements.KinoWinningsTableKino10Winning).should.eventually.be.equal('1.250,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10KinoBonus).should.eventually.be.equal('2.750,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino11).should.eventually.be.equal('11'),
      this.app.client.getText(elements.KinoWinningsTableKino11Winning).should.eventually.be.equal('12.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino11KinoBonus).should.eventually.be.equal('37.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino12).should.eventually.be.equal('12'),
      this.app.client.getText(elements.KinoWinningsTableKino12Winning).should.eventually.be.equal('500.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino12KinoBonus).should.eventually.be.equal('1.000.000,00€'),
    ]);
  });

  it('Unselect a KINO number', function () {
    return this.app.client.click(elements.KinoChooseNumber12Btn).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
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
        .should.eventually.be.equal('selected'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow12)
        .getAttribute('class')
        .should.eventually.be.equal(''),
      this.app.client.getText(elements.KinoWinningsTableNumbers).should.eventually.be.equal('ΑΡΙΘΜΟΙ'),
      this.app.client.getText(elements.KinoWinningsTableWinnings).should.eventually.be.equal('ΚΕΡΔΟΣ'),
      this.app.client.getText(elements.KinoWinningsTableKinoBonus).should.eventually.equal('KINO BONUS'),
      this.app.client.getText(elements.KinoWinningsTableKino0).should.eventually.be.equal('0'),
      this.app.client.getText(elements.KinoWinningsTableKino0Winning).should.eventually.be.equal('1,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino0KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1).should.eventually.be.equal('1'),
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('1,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('1,25€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('1,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoWinningsTableKino4Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonus).should.eventually.be.equal('2,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino5).should.eventually.be.equal('5'),
      this.app.client.getText(elements.KinoWinningsTableKino5Winning).should.eventually.be.equal('0,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino5KinoBonus).should.eventually.be.equal('3,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6).should.eventually.be.equal('6'),
      this.app.client.getText(elements.KinoWinningsTableKino6Winning).should.eventually.be.equal('5,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6KinoBonus).should.eventually.be.equal('12,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino7).should.eventually.be.equal('7'),
      this.app.client.getText(elements.KinoWinningsTableKino7Winning).should.eventually.be.equal('25,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7KinoBonus).should.eventually.be.equal('52,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino8).should.eventually.be.equal('8'),
      this.app.client.getText(elements.KinoWinningsTableKino8Winning).should.eventually.be.equal('125,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8KinoBonus).should.eventually.be.equal('275,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9).should.eventually.be.equal('9'),
      this.app.client.getText(elements.KinoWinningsTableKino9Winning).should.eventually.be.equal('750,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9KinoBonus).should.eventually.be.equal('1.750,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10).should.eventually.be.equal('10'),
      this.app.client.getText(elements.KinoWinningsTableKino10Winning).should.eventually.be.equal('7.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10KinoBonus).should.eventually.be.equal('15.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino11).should.eventually.be.equal('11'),
      this.app.client.getText(elements.KinoWinningsTableKino11Winning).should.eventually.be.equal('250.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino11KinoBonus).should.eventually.be.equal('600.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino12).should.eventually.be.equal('12'),
      this.app.client.getText(elements.KinoWinningsTableKino12Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino12KinoBonus).should.eventually.be.equal('-'),
    ]);
  });

  it('Unselect a KINO number', function () {
    return this.app.client.click(elements.KinoChooseNumber11Btn).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
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
        .should.eventually.be.equal('selected'),
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
      this.app.client.getText(elements.KinoWinningsTableKino0Winning).should.eventually.be.equal('1,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino0KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1).should.eventually.be.equal('1'),
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('1,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('1,25€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('1,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoWinningsTableKino4Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonus).should.eventually.be.equal('2,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino5).should.eventually.be.equal('5'),
      this.app.client.getText(elements.KinoWinningsTableKino5Winning).should.eventually.be.equal('1,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino5KinoBonus).should.eventually.be.equal('3,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino6).should.eventually.be.equal('6'),
      this.app.client.getText(elements.KinoWinningsTableKino6Winning).should.eventually.be.equal('10,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6KinoBonus).should.eventually.be.equal('30,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7).should.eventually.be.equal('7'),
      this.app.client.getText(elements.KinoWinningsTableKino7Winning).should.eventually.be.equal('40,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7KinoBonus).should.eventually.be.equal('90,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8).should.eventually.be.equal('8'),
      this.app.client.getText(elements.KinoWinningsTableKino8Winning).should.eventually.be.equal('250,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8KinoBonus).should.eventually.be.equal('750,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9).should.eventually.be.equal('9'),
      this.app.client.getText(elements.KinoWinningsTableKino9Winning).should.eventually.be.equal('5.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9KinoBonus).should.eventually.be.equal('12.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10).should.eventually.be.equal('10'),
      this.app.client.getText(elements.KinoWinningsTableKino10Winning).should.eventually.be.equal('50.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino10KinoBonus).should.eventually.be.equal('125.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino11).should.eventually.be.equal('11'),
      this.app.client.getText(elements.KinoWinningsTableKino11Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino11KinoBonus).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino12).should.eventually.be.equal('12'),
      this.app.client.getText(elements.KinoWinningsTableKino12Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino12KinoBonus).should.eventually.be.equal('-'),
    ]);
  });

  it('Unselect a KINO number', function () {
    return this.app.client.click(elements.KinoChooseNumber10Btn).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow1).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow2).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow3).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow4).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow5).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow6).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow7).getAttribute('class').should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow8)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-bottom'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRowc2w8)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-top'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow9)
        .getAttribute('class')
        .should.eventually.be.equal('selected'),
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
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('1,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('1,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('2,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoWinningsTableKino4Winning).should.eventually.be.equal('0,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonus).should.eventually.be.equal('3,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino5).should.eventually.be.equal('5'),
      this.app.client.getText(elements.KinoWinningsTableKino5Winning).should.eventually.be.equal('2,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino5KinoBonus).should.eventually.be.equal('7,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino6).should.eventually.be.equal('6'),
      this.app.client.getText(elements.KinoWinningsTableKino6Winning).should.eventually.be.equal('12,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino6KinoBonus).should.eventually.be.equal('35,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7).should.eventually.be.equal('7'),
      this.app.client.getText(elements.KinoWinningsTableKino7Winning).should.eventually.be.equal('100,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7KinoBonus).should.eventually.be.equal('250,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8).should.eventually.be.equal('8'),
      this.app.client.getText(elements.KinoWinningsTableKino8Winning).should.eventually.be.equal('2.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8KinoBonus).should.eventually.be.equal('5.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9).should.eventually.be.equal('9'),
      this.app.client.getText(elements.KinoWinningsTableKino9Winning).should.eventually.be.equal('20.000,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino9KinoBonus).should.eventually.be.equal('50.000,00€'),
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

  it('Unselect a KINO number', function () {
    return this.app.client.click(elements.KinoChooseNumber9Btn).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow1).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow2).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow3).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow4).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow5).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow6).getAttribute('class').should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow7)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-bottom'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRowc2w7)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-top'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow8)
        .getAttribute('class')
        .should.eventually.be.equal('selected'),
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
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('1,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('1,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('2,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoWinningsTableKino4Winning).should.eventually.be.equal('1,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonus).should.eventually.be.equal('3,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino5).should.eventually.be.equal('5'),
      this.app.client.getText(elements.KinoWinningsTableKino5Winning).should.eventually.be.equal('5,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino5KinoBonus).should.eventually.be.equal('15,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6).should.eventually.be.equal('6'),
      this.app.client.getText(elements.KinoWinningsTableKino6Winning).should.eventually.be.equal('25,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6KinoBonus).should.eventually.be.equal('100,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7).should.eventually.be.equal('7'),
      this.app.client.getText(elements.KinoWinningsTableKino7Winning).should.eventually.be.equal('500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7KinoBonus).should.eventually.be.equal('1.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8).should.eventually.be.equal('8'),
      this.app.client.getText(elements.KinoWinningsTableKino8Winning).should.eventually.be.equal('7.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino8KinoBonus).should.eventually.be.equal('20.000,00€'),
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

  it('Unselect a KINO number', function () {
    return this.app.client.click(elements.KinoChooseNumber8Btn).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow1).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow2).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow3).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow4).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow5).getAttribute('class').should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow6)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-bottom'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRowc2w6)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-top'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow7)
        .getAttribute('class')
        .should.eventually.be.equal('selected'),
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
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('1,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('1,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('0,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('4,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoWinningsTableKino4Winning).should.eventually.be.equal('1,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonus).should.eventually.be.equal('6,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino5).should.eventually.be.equal('5'),
      this.app.client.getText(elements.KinoWinningsTableKino5Winning).should.eventually.be.equal('10,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino5KinoBonus).should.eventually.be.equal('40,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6).should.eventually.be.equal('6'),
      this.app.client.getText(elements.KinoWinningsTableKino6Winning).should.eventually.be.equal('50,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6KinoBonus).should.eventually.be.equal('200,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7).should.eventually.be.equal('7'),
      this.app.client.getText(elements.KinoWinningsTableKino7Winning).should.eventually.be.equal('2.500,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino7KinoBonus).should.eventually.be.equal('7.500,00€'),
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

  it('Unselect a KINO number', function () {
    return this.app.client.click(elements.KinoChooseNumber7Btn).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow1).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow2).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow3).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow4).getAttribute('class').should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow5)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-bottom'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRowc2w5)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-top'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow6)
        .getAttribute('class')
        .should.eventually.be.equal('selected'),
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
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('1,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('1,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('0,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('4,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoWinningsTableKino4Winning).should.eventually.be.equal('3,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonus).should.eventually.be.equal('13,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino5).should.eventually.be.equal('5'),
      this.app.client.getText(elements.KinoWinningsTableKino5Winning).should.eventually.be.equal('25,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino5KinoBonus).should.eventually.be.equal('150,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6).should.eventually.be.equal('6'),
      this.app.client.getText(elements.KinoWinningsTableKino6Winning).should.eventually.be.equal('800,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino6KinoBonus).should.eventually.be.equal('2.050,00€'),
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

  it('Unselect a KINO number', function () {
    return this.app.client.click(elements.KinoChooseNumber6Btn).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow1).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow2).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow3).getAttribute('class').should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow4)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-bottom'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRowc2w4)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-top'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow5)
        .getAttribute('class')
        .should.eventually.be.equal('selected'),
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
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('1,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('-'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('2,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('1,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('8,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoWinningsTableKino4Winning).should.eventually.be.equal('10,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonus).should.eventually.be.equal('45,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino5).should.eventually.be.equal('5'),
      this.app.client.getText(elements.KinoWinningsTableKino5Winning).should.eventually.be.equal('225,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino5KinoBonus).should.eventually.be.equal('675,00€'),
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

  it('Unselect a KINO number', function () {
    return this.app.client.click(elements.KinoChooseNumber5Btn).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow1).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow2).getAttribute('class').should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow3)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-bottom'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRowc2w3)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-top'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow4)
        .getAttribute('class')
        .should.eventually.be.equal('selected'),
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
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('2,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('0,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('4,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('2,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('12,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.KinoWinningsTableKino4Winning).should.eventually.be.equal('50,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino4KinoBonus).should.eventually.be.equal('300,00€'),
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

  it('Unselect a KINO number', function () {
    return this.app.client.click(elements.KinoChooseNumber4Btn).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
      this.app.client.elements(elements.KinoWinningsTableKinoRow1).getAttribute('class').should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow2)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-bottom'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRowc2w2)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-top'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow3)
        .getAttribute('class')
        .should.eventually.be.equal('selected'),
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
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('4,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('1,25€'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('9,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.KinoWinningsTableKino3Winning).should.eventually.be.equal('12,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino3KinoBonus).should.eventually.be.equal('87,50€'),
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

  it('Unselect a KINO number', function () {
    return this.app.client.click(elements.KinoChooseNumber3Btn).should.eventually.be.fulfilled;
  });

  it('Check Winnings table', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoWinningsTable).should.eventually.be.true,
      this.app.client.elements(elements.KinoWinningsTableKinoRow0).getAttribute('class').should.eventually.be.equal(''),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow1)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-bottom'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRowc2w1)
        .getAttribute('class')
        .should.eventually.be.equal('c2w-border-top'),
      this.app.client
        .elements(elements.KinoWinningsTableKinoRow2)
        .getAttribute('class')
        .should.eventually.be.equal('selected'),
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
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('0,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('8,00€'),
      this.app.client.getText(elements.KinoWinningsTableKino2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.KinoWinningsTableKino2Winning).should.eventually.be.equal('2,50€'),
      this.app.client.getText(elements.KinoWinningsTableKino2KinoBonus).should.eventually.be.equal('35,00€'),
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

  it('Unselect a KINO number', function () {
    return this.app.client.click(elements.KinoChooseNumber2Btn).should.eventually.be.fulfilled;
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
      this.app.client.getText(elements.KinoWinningsTableKino1Winning).should.eventually.be.equal('1,25€'),
      this.app.client.getText(elements.KinoWinningsTableKino1KinoBonus).should.eventually.be.equal('26,25€'),
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
