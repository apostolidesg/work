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

////////////////////////////////////////// Play Kino Columns from Kino Page /////////////////////////////////////////////

describe('TC KinoColumnsKinoPage.js: Play Kino Columns from Kino Page', function () {
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

  it('Select Kino game from Lobby', function () {
    return this.app.client.click(elements.LobbyKino).should.eventually.be.fulfilled;
  });

  ///////////////////////////////////////// Check functionality of KINO Columns page /////////////////////////////////////

  it('Select Kino Columns game from KINO Standard game', function () {
    return this.app.client.click(elements.KinoColumnsImgEl).should.eventually.be.fulfilled;
  });

  it('Check Kino Columns elements', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoColumnsGameLblEl).should.eventually.be.true,
      this.app.client.getText(elements.KinoColumnsSelectionLbl).should.eventually.be.equal('ΕΠΙΛΟΓΗ ΣΤΗΛΗΣ'),
      this.app.client
        .getText(elements.KinoColumnsSelectionMsg)
        .should.eventually.be.equal('Μπορείτε να επιλέξετε περισσότερες από μία ΣΤΗΛΕΣ'),
      this.app.client.getText(elements.KinoColumns1Column).should.eventually.be.equal('1η'),
      this.app.client.getText(elements.KinoColumns2Column).should.eventually.be.equal('2η'),
      this.app.client.getText(elements.KinoColumns3Column).should.eventually.be.equal('3η'),
      this.app.client.getText(elements.KinoColumns4Column).should.eventually.be.equal('4η'),
      this.app.client.getText(elements.KinoColumns5Column).should.eventually.be.equal('5η'),
      this.app.client.getText(elements.KinoColumns6Column).should.eventually.be.equal('6η'),
      this.app.client.getText(elements.KinoColumns7Column).should.eventually.be.equal('7η'),
      this.app.client.getText(elements.KinoColumns8Column).should.eventually.be.equal('8η'),
      this.app.client.getText(elements.KinoColumns9Column).should.eventually.be.equal('9η'),
      this.app.client.getText(elements.KinoColumns10Column).should.eventually.be.equal('10η'),
      this.app.client.getText(elements.KinoColumnsBetAmountLbl).should.eventually.be.equal('ΠΟΝΤΑΡΙΣΜΑ ΑΝΑ ΣΤΗΛΗ'),
      this.app.client.getText(elements.KinoColumnsAmount1).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.KinoColumnsAmount2).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.KinoColumnsAmount3).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.KinoColumnsAmount5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.KinoColumnsAmount10).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.KinoColumnsAmount15).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.KinoColumnsAmount20).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.KinoColumnsAmount30).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.KinoColumnsAmount50).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.KinoColumnsAmount100).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.KinoColumnsClearBtnTxt).should.eventually.be.equal('ΚΑΘΑΡΙΣΜΟΣ'),
      this.app.client.getText(elements.KinoColumnsAddBtn).should.eventually.be.equal('ΠΡΟΣΘΗΚΗ'),
    ]);
  });

  it('Check that Kino Standard game is on background', function () {
    return this.app.client.isVisible(elements.KinoStandardPage).should.eventually.be.true;
  });

  /////////////////////////////////////////// Check clear and add buttons functionality ///////////////////////////////////////

  it('Click clear option', function () {
    return this.app.client.click(elements.KinoColumnsClearBtn).should.eventually.be.fulfilled;
  });

  it('Check that modal of Columns is opened', function () {
    return this.app.client.isVisible(elements.KinoColumnsModal).should.eventually.be.true;
  });

  it('Check that Kino Standard game is on background', function () {
    return this.app.client.isVisible(elements.KinoStandardPage).should.eventually.be.true;
  });

  it('Click add option', function () {
    return this.app.client.click(elements.KinoColumnsAddBtn).should.eventually.be.fulfilled;
  });

  it('Check that modal of Columns is opened', function () {
    return this.app.client.isVisible(elements.KinoColumnsModal).should.eventually.be.true;
  });

  it('Check that Kino Standard game is on background', function () {
    return this.app.client.isVisible(elements.KinoStandardPage).should.eventually.be.true;
  });

  it('Select Column 1 option', function () {
    return this.app.client.click(elements.KinoColumns1Column).should.eventually.be.fulfilled;
  });

  it('Unselect default betting amount 1 Euro', function () {
    return this.app.client.click(elements.KinoColumnsAmount1).should.eventually.be.fulfilled;
  });

  it('Click add option', function () {
    return this.app.client.click(elements.KinoColumnsAddBtn).should.eventually.be.fulfilled;
  });

  it('Check that modal of Columns is opened', function () {
    return this.app.client.isVisible(elements.KinoColumnsModal).should.eventually.be.true;
  });

  it('Check that Kino Standard game is on background', function () {
    return this.app.client.isVisible(elements.KinoStandardPage).should.eventually.be.true;
  });

  it('Select Betting amount 1 Euro', function () {
    return this.app.client.click(elements.KinoColumnsAmount1).should.eventually.be.fulfilled;
  });

  it('Click add option', function () {
    return this.app.client.click(elements.KinoColumnsAddBtn).should.eventually.be.fulfilled;
  });

  it('Check that modal of Columns is closed', function () {
    return this.app.client.isVisible(elements.KinoColumnsModal).should.eventually.be.false;
  });

  it('Check cost and selection on Columns tab', function () {
    return Promise.all([
      this.app.client.getText(elements.KinoColumnsBtnAmount).should.eventually.be.equal('1€'),
      this.app.client.getValue(elements.KinoColumns).should.eventually.be.equal('1'),
    ]);
  });

  it('Select Kino Columns game from KINO Standard game', function () {
    return this.app.client.click(elements.KinoColumnsImgEl).should.eventually.be.fulfilled;
  });

  it('Check that modal of Columns is opened', function () {
    return this.app.client.isVisible(elements.KinoColumnsModal).should.eventually.be.true;
  });

  it('Check Kino Columns elements', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoColumnsGameLblEl).should.eventually.be.true,
      this.app.client.getText(elements.KinoColumnsSelectionLbl).should.eventually.be.equal('ΕΠΙΛΟΓΗ ΣΤΗΛΗΣ'),
      this.app.client
        .getText(elements.KinoColumnsSelectionMsg)
        .should.eventually.be.equal('Μπορείτε να επιλέξετε περισσότερες από μία ΣΤΗΛΕΣ'),
      this.app.client.getText(elements.KinoColumns1Column).should.eventually.be.equal('1η'),
      this.app.client.getText(elements.KinoColumns2Column).should.eventually.be.equal('2η'),
      this.app.client.getText(elements.KinoColumns3Column).should.eventually.be.equal('3η'),
      this.app.client.getText(elements.KinoColumns4Column).should.eventually.be.equal('4η'),
      this.app.client.getText(elements.KinoColumns5Column).should.eventually.be.equal('5η'),
      this.app.client.getText(elements.KinoColumns6Column).should.eventually.be.equal('6η'),
      this.app.client.getText(elements.KinoColumns7Column).should.eventually.be.equal('7η'),
      this.app.client.getText(elements.KinoColumns8Column).should.eventually.be.equal('8η'),
      this.app.client.getText(elements.KinoColumns9Column).should.eventually.be.equal('9η'),
      this.app.client.getText(elements.KinoColumns10Column).should.eventually.be.equal('10η'),
      this.app.client.getText(elements.KinoColumnsBetAmountLbl).should.eventually.be.equal('ΠΟΝΤΑΡΙΣΜΑ ΑΝΑ ΣΤΗΛΗ'),
      this.app.client.getText(elements.KinoColumnsAmount1).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.KinoColumnsAmount2).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.KinoColumnsAmount3).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.KinoColumnsAmount5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.KinoColumnsAmount10).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.KinoColumnsAmount15).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.KinoColumnsAmount20).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.KinoColumnsAmount30).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.KinoColumnsAmount50).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.KinoColumnsAmount100).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.KinoColumnsClearBtnTxt).should.eventually.be.equal('ΚΑΘΑΡΙΣΜΟΣ'),
      this.app.client.getText(elements.KinoColumnsAddBtn).should.eventually.be.equal('ΠΡΟΣΘΗΚΗ'),
    ]);
  });

  it('Click add option', function () {
    return this.app.client.click(elements.KinoColumnsAddBtn).should.eventually.be.fulfilled;
  });

  it('Check that modal of Columns is closed', function () {
    return this.app.client.isVisible(elements.KinoColumnsModal).should.eventually.be.false;
  });

  it('Check cost and selection on Columns tab', function () {
    return Promise.all([
      this.app.client.getText(elements.KinoColumnsBtnAmount).should.eventually.be.equal('1€'),
      this.app.client.getValue(elements.KinoColumns).should.eventually.be.equal('1'),
    ]);
  });

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipSubmitBtn).should.eventually.be.true,
      // // this.app.client.elements(elements.KinoBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('true'),
      // this.app.client.isVisible(elements.KinoBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipSubmitLbl).should.eventually.be.equal('ΑΠΟΔΟΧΗ'),
      this.app.client.getText(elements.KinoBetslipCostLbl).should.eventually.be.equal('ΚΟΣΤΟΣ ΔΕΛΤΙΟΥ\n1€'),
      this.app.client.getText(elements.KinoBetslipCost).should.eventually.be.equal('1€'),
    ]);
  });

  it('Select Kino Columns game from KINO Standard game', function () {
    return this.app.client.click(elements.KinoColumnsImgEl).should.eventually.be.fulfilled;
  });

  it('Check that modal of Columns is opened', function () {
    return this.app.client.isVisible(elements.KinoColumnsModal).should.eventually.be.true;
  });

  it('Check Kino Columns elements', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoColumnsGameLblEl).should.eventually.be.true,
      this.app.client.getText(elements.KinoColumnsSelectionLbl).should.eventually.be.equal('ΕΠΙΛΟΓΗ ΣΤΗΛΗΣ'),
      this.app.client
        .getText(elements.KinoColumnsSelectionMsg)
        .should.eventually.be.equal('Μπορείτε να επιλέξετε περισσότερες από μία ΣΤΗΛΕΣ'),
      this.app.client.getText(elements.KinoColumns1Column).should.eventually.be.equal('1η'),
      this.app.client.getText(elements.KinoColumns2Column).should.eventually.be.equal('2η'),
      this.app.client.getText(elements.KinoColumns3Column).should.eventually.be.equal('3η'),
      this.app.client.getText(elements.KinoColumns4Column).should.eventually.be.equal('4η'),
      this.app.client.getText(elements.KinoColumns5Column).should.eventually.be.equal('5η'),
      this.app.client.getText(elements.KinoColumns6Column).should.eventually.be.equal('6η'),
      this.app.client.getText(elements.KinoColumns7Column).should.eventually.be.equal('7η'),
      this.app.client.getText(elements.KinoColumns8Column).should.eventually.be.equal('8η'),
      this.app.client.getText(elements.KinoColumns9Column).should.eventually.be.equal('9η'),
      this.app.client.getText(elements.KinoColumns10Column).should.eventually.be.equal('10η'),
      this.app.client.getText(elements.KinoColumnsBetAmountLbl).should.eventually.be.equal('ΠΟΝΤΑΡΙΣΜΑ ΑΝΑ ΣΤΗΛΗ'),
      this.app.client.getText(elements.KinoColumnsAmount1).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.KinoColumnsAmount2).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.KinoColumnsAmount3).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.KinoColumnsAmount5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.KinoColumnsAmount10).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.KinoColumnsAmount15).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.KinoColumnsAmount20).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.KinoColumnsAmount30).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.KinoColumnsAmount50).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.KinoColumnsAmount100).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.KinoColumnsClearBtnTxt).should.eventually.be.equal('ΚΑΘΑΡΙΣΜΟΣ'),
      this.app.client.getText(elements.KinoColumnsAddBtn).should.eventually.be.equal('ΠΡΟΣΘΗΚΗ'),
    ]);
  });

  it('Select close button', function () {
    return this.app.client.click(elements.KinoColumnsCloseBtn).should.eventually.be.fulfilled;
  });

  it('Select Kino Columns game from KINO Standard game', function () {
    return this.app.client.click(elements.KinoColumnsImgEl).should.eventually.be.fulfilled;
  });

  it('Check that modal of Columns is opened', function () {
    return this.app.client.isVisible(elements.KinoColumnsModal).should.eventually.be.true;
  });

  it('Check Kino Columns elements', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoColumnsGameLblEl).should.eventually.be.true,
      this.app.client.getText(elements.KinoColumnsSelectionLbl).should.eventually.be.equal('ΕΠΙΛΟΓΗ ΣΤΗΛΗΣ'),
      this.app.client
        .getText(elements.KinoColumnsSelectionMsg)
        .should.eventually.be.equal('Μπορείτε να επιλέξετε περισσότερες από μία ΣΤΗΛΕΣ'),
      this.app.client.getText(elements.KinoColumns1Column).should.eventually.be.equal('1η'),
      this.app.client.getText(elements.KinoColumns2Column).should.eventually.be.equal('2η'),
      this.app.client.getText(elements.KinoColumns3Column).should.eventually.be.equal('3η'),
      this.app.client.getText(elements.KinoColumns4Column).should.eventually.be.equal('4η'),
      this.app.client.getText(elements.KinoColumns5Column).should.eventually.be.equal('5η'),
      this.app.client.getText(elements.KinoColumns6Column).should.eventually.be.equal('6η'),
      this.app.client.getText(elements.KinoColumns7Column).should.eventually.be.equal('7η'),
      this.app.client.getText(elements.KinoColumns8Column).should.eventually.be.equal('8η'),
      this.app.client.getText(elements.KinoColumns9Column).should.eventually.be.equal('9η'),
      this.app.client.getText(elements.KinoColumns10Column).should.eventually.be.equal('10η'),
      this.app.client.getText(elements.KinoColumnsBetAmountLbl).should.eventually.be.equal('ΠΟΝΤΑΡΙΣΜΑ ΑΝΑ ΣΤΗΛΗ'),
      this.app.client.getText(elements.KinoColumnsAmount1).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.KinoColumnsAmount2).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.KinoColumnsAmount3).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.KinoColumnsAmount5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.KinoColumnsAmount10).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.KinoColumnsAmount15).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.KinoColumnsAmount20).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.KinoColumnsAmount30).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.KinoColumnsAmount50).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.KinoColumnsAmount100).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.KinoColumnsClearBtnTxt).should.eventually.be.equal('ΚΑΘΑΡΙΣΜΟΣ'),
      this.app.client.getText(elements.KinoColumnsAddBtn).should.eventually.be.equal('ΠΡΟΣΘΗΚΗ'),
    ]);
  });

  it('Select close button', function () {
    return this.app.client.click(elements.KinoColumnsCloseBtn).should.eventually.be.fulfilled;
  });

  it('Check cost and selection on Columns tab', function () {
    return Promise.all([
      this.app.client.getText(elements.KinoColumnsBtnAmount).should.eventually.be.equal('1€'),
      this.app.client.getValue(elements.KinoColumns).should.eventually.be.equal('1'),
    ]);
  });

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.KinoBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('true'),
      // this.app.client.isVisible(elements.KinoBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipSubmitLbl).should.eventually.be.equal('ΑΠΟΔΟΧΗ'),
      this.app.client.getText(elements.KinoBetslipCostLbl).should.eventually.be.equal('ΚΟΣΤΟΣ ΔΕΛΤΙΟΥ\n1€'),
      this.app.client.getText(elements.KinoBetslipCost).should.eventually.be.equal('1€'),
    ]);
  });

  it('Select Kino Columns game from KINO Standard game', function () {
    return this.app.client.click(elements.KinoColumnsImgEl).should.eventually.be.fulfilled;
  });

  it('Check that modal of Columns is opened', function () {
    return this.app.client.isVisible(elements.KinoColumnsModal).should.eventually.be.true;
  });

  it('Check Kino Columns elements', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoColumnsGameLblEl).should.eventually.be.true,
      this.app.client.getText(elements.KinoColumnsSelectionLbl).should.eventually.be.equal('ΕΠΙΛΟΓΗ ΣΤΗΛΗΣ'),
      this.app.client
        .getText(elements.KinoColumnsSelectionMsg)
        .should.eventually.be.equal('Μπορείτε να επιλέξετε περισσότερες από μία ΣΤΗΛΕΣ'),
      this.app.client.getText(elements.KinoColumns1Column).should.eventually.be.equal('1η'),
      this.app.client.getText(elements.KinoColumns2Column).should.eventually.be.equal('2η'),
      this.app.client.getText(elements.KinoColumns3Column).should.eventually.be.equal('3η'),
      this.app.client.getText(elements.KinoColumns4Column).should.eventually.be.equal('4η'),
      this.app.client.getText(elements.KinoColumns5Column).should.eventually.be.equal('5η'),
      this.app.client.getText(elements.KinoColumns6Column).should.eventually.be.equal('6η'),
      this.app.client.getText(elements.KinoColumns7Column).should.eventually.be.equal('7η'),
      this.app.client.getText(elements.KinoColumns8Column).should.eventually.be.equal('8η'),
      this.app.client.getText(elements.KinoColumns9Column).should.eventually.be.equal('9η'),
      this.app.client.getText(elements.KinoColumns10Column).should.eventually.be.equal('10η'),
      this.app.client.getText(elements.KinoColumnsBetAmountLbl).should.eventually.be.equal('ΠΟΝΤΑΡΙΣΜΑ ΑΝΑ ΣΤΗΛΗ'),
      this.app.client.getText(elements.KinoColumnsAmount1).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.KinoColumnsAmount2).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.KinoColumnsAmount3).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.KinoColumnsAmount5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.KinoColumnsAmount10).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.KinoColumnsAmount15).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.KinoColumnsAmount20).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.KinoColumnsAmount30).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.KinoColumnsAmount50).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.KinoColumnsAmount100).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.KinoColumnsClearBtnTxt).should.eventually.be.equal('ΚΑΘΑΡΙΣΜΟΣ'),
      this.app.client.getText(elements.KinoColumnsAddBtn).should.eventually.be.equal('ΠΡΟΣΘΗΚΗ'),
    ]);
  });

  it('Unselect Column 1 option', function () {
    return this.app.client.click(elements.KinoColumns1Column).should.eventually.be.fulfilled;
  });

  it('Select Column 2 option', function () {
    return this.app.client.click(elements.KinoColumns2Column).should.eventually.be.fulfilled;
  });

  it('Unselect Betting amount 1 Euro', function () {
    return this.app.client.click(elements.KinoColumnsAmount1).should.eventually.be.fulfilled;
  });

  it('Click add option', function () {
    return this.app.client.click(elements.KinoColumnsAddBtn).should.eventually.be.fulfilled;
  });

  it('Check that modal of Columns is opened', function () {
    return this.app.client.isVisible(elements.KinoColumnsModal).should.eventually.be.true;
  });

  it('Select Betting amount 2 Euro', function () {
    return this.app.client.click(elements.KinoColumnsAmount2).should.eventually.be.fulfilled;
  });

  it('Select Betting amount 3 Euro', function () {
    return this.app.client.click(elements.KinoColumnsAmount3).should.eventually.be.fulfilled;
  });

  it('Click add option', function () {
    return this.app.client.click(elements.KinoColumnsAddBtn).should.eventually.be.fulfilled;
  });

  it('Check that modal of Columns is closed', function () {
    return this.app.client.isVisible(elements.KinoColumnsModal).should.eventually.be.false;
  });

  it('Check cost and selection on Columns tab', function () {
    return Promise.all([
      this.app.client.getText(elements.KinoColumnsBtnAmount).should.eventually.be.equal('5€'),
      this.app.client.getValue(elements.KinoColumns).should.eventually.be.equal('2'),
    ]);
  });

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.KinoBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('true'),
      // this.app.client.isVisible(elements.KinoBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipSubmitLbl).should.eventually.be.equal('ΑΠΟΔΟΧΗ'),
      this.app.client.getText(elements.KinoBetslipCostLbl).should.eventually.be.equal('ΚΟΣΤΟΣ ΔΕΛΤΙΟΥ\n5€'),
      this.app.client.getText(elements.KinoBetslipCost).should.eventually.be.equal('5€'),
    ]);
  });

  it('Select Kino Columns game from KINO Standard game', function () {
    return this.app.client.click(elements.KinoColumnsImgEl).should.eventually.be.fulfilled;
  });

  it('Check that modal of Columns is opened', function () {
    return this.app.client.isVisible(elements.KinoColumnsModal).should.eventually.be.true;
  });

  it('Check Kino Columns elements', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoColumnsGameLblEl).should.eventually.be.true,
      this.app.client.getText(elements.KinoColumnsSelectionLbl).should.eventually.be.equal('ΕΠΙΛΟΓΗ ΣΤΗΛΗΣ'),
      this.app.client
        .getText(elements.KinoColumnsSelectionMsg)
        .should.eventually.be.equal('Μπορείτε να επιλέξετε περισσότερες από μία ΣΤΗΛΕΣ'),
      this.app.client.getText(elements.KinoColumns1Column).should.eventually.be.equal('1η'),
      this.app.client.getText(elements.KinoColumns2Column).should.eventually.be.equal('2η'),
      this.app.client.getText(elements.KinoColumns3Column).should.eventually.be.equal('3η'),
      this.app.client.getText(elements.KinoColumns4Column).should.eventually.be.equal('4η'),
      this.app.client.getText(elements.KinoColumns5Column).should.eventually.be.equal('5η'),
      this.app.client.getText(elements.KinoColumns6Column).should.eventually.be.equal('6η'),
      this.app.client.getText(elements.KinoColumns7Column).should.eventually.be.equal('7η'),
      this.app.client.getText(elements.KinoColumns8Column).should.eventually.be.equal('8η'),
      this.app.client.getText(elements.KinoColumns9Column).should.eventually.be.equal('9η'),
      this.app.client.getText(elements.KinoColumns10Column).should.eventually.be.equal('10η'),
      this.app.client.getText(elements.KinoColumnsBetAmountLbl).should.eventually.be.equal('ΠΟΝΤΑΡΙΣΜΑ ΑΝΑ ΣΤΗΛΗ'),
      this.app.client.getText(elements.KinoColumnsAmount1).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.KinoColumnsAmount2).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.KinoColumnsAmount3).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.KinoColumnsAmount5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.KinoColumnsAmount10).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.KinoColumnsAmount15).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.KinoColumnsAmount20).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.KinoColumnsAmount30).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.KinoColumnsAmount50).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.KinoColumnsAmount100).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.KinoColumnsClearBtnTxt).should.eventually.be.equal('ΚΑΘΑΡΙΣΜΟΣ'),
      this.app.client.getText(elements.KinoColumnsAddBtn).should.eventually.be.equal('ΠΡΟΣΘΗΚΗ'),
    ]);
  });

  it('Select Column 1 option', function () {
    return this.app.client.click(elements.KinoColumns1Column).should.eventually.be.fulfilled;
  });

  it('Select Column 3 option', function () {
    return this.app.client.click(elements.KinoColumns3Column).should.eventually.be.fulfilled;
  });

  it('Select Column 4 option', function () {
    return this.app.client.click(elements.KinoColumns4Column).should.eventually.be.fulfilled;
  });

  it('Select Column 5 option', function () {
    return this.app.client.click(elements.KinoColumns5Column).should.eventually.be.fulfilled;
  });

  it('Select Column 6 option', function () {
    return this.app.client.click(elements.KinoColumns6Column).should.eventually.be.fulfilled;
  });

  it('Select Column 7 option', function () {
    return this.app.client.click(elements.KinoColumns7Column).should.eventually.be.fulfilled;
  });

  it('Select Column 8 option', function () {
    return this.app.client.click(elements.KinoColumns8Column).should.eventually.be.fulfilled;
  });

  it('Select Column 9 option', function () {
    return this.app.client.click(elements.KinoColumns9Column).should.eventually.be.fulfilled;
  });

  it('Select Column 10 option', function () {
    return this.app.client.click(elements.KinoColumns10Column).should.eventually.be.fulfilled;
  });

  it('Select Betting amount 1 Euro', function () {
    return this.app.client.click(elements.KinoColumnsAmount1).should.eventually.be.fulfilled;
  });

  it('Select Betting amount 5 Euro', function () {
    return this.app.client.click(elements.KinoColumnsAmount5).should.eventually.be.fulfilled;
  });

  it('Unselect Betting amount 10 Euro', function () {
    return this.app.client.click(elements.KinoColumnsAmount10).should.eventually.be.fulfilled;
  });

  it('Select Betting amount 15 Euro', function () {
    return this.app.client.click(elements.KinoColumnsAmount15).should.eventually.be.fulfilled;
  });

  it('Select Betting amount 20 Euro', function () {
    return this.app.client.click(elements.KinoColumnsAmount20).should.eventually.be.fulfilled;
  });

  it('Unselect Betting amount 30 Euro', function () {
    return this.app.client.click(elements.KinoColumnsAmount30).should.eventually.be.fulfilled;
  });

  it('Select Betting amount 50 Euro', function () {
    return this.app.client.click(elements.KinoColumnsAmount50).should.eventually.be.fulfilled;
  });

  it('Select Betting amount 100 Euro', function () {
    return this.app.client.click(elements.KinoColumnsAmount100).should.eventually.be.fulfilled;
  });

  it('Click add option', function () {
    return this.app.client.click(elements.KinoColumnsAddBtn).should.eventually.be.fulfilled;
  });

  it('Check that modal of Columns is closed', function () {
    return this.app.client.isVisible(elements.KinoColumnsModal).should.eventually.be.false;
  });

  it('Check cost and selection on Columns tab', function () {
    return Promise.all([
      this.app.client.getText(elements.KinoColumnsBtnAmount).should.eventually.be.equal('2360€'),
      this.app.client.getValue(elements.KinoColumns).should.eventually.be.equal('1,2,3,4,5,6,7,8,9,10'),
    ]);
  });

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.KinoBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('true'),
      // this.app.client.isVisible(elements.KinoBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipSubmitLbl).should.eventually.be.equal('ΑΠΟΔΟΧΗ'),
      this.app.client.getText(elements.KinoBetslipCostLbl).should.eventually.be.equal('ΚΟΣΤΟΣ ΔΕΛΤΙΟΥ\n2360€'),
      this.app.client.getText(elements.KinoBetslipCost).should.eventually.be.equal('2360€'),
    ]);
  });

  it('Select Kino Columns game from KINO Standard game', function () {
    return this.app.client.click(elements.KinoColumnsImgEl).should.eventually.be.fulfilled;
  });

  it('Check that modal of Columns is opened', function () {
    return this.app.client.isVisible(elements.KinoColumnsModal).should.eventually.be.true;
  });

  it('Check Kino Columns elements', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoColumnsGameLblEl).should.eventually.be.true,
      this.app.client.getText(elements.KinoColumnsSelectionLbl).should.eventually.be.equal('ΕΠΙΛΟΓΗ ΣΤΗΛΗΣ'),
      this.app.client
        .getText(elements.KinoColumnsSelectionMsg)
        .should.eventually.be.equal('Μπορείτε να επιλέξετε περισσότερες από μία ΣΤΗΛΕΣ'),
      this.app.client.getText(elements.KinoColumns1Column).should.eventually.be.equal('1η'),
      this.app.client.getText(elements.KinoColumns2Column).should.eventually.be.equal('2η'),
      this.app.client.getText(elements.KinoColumns3Column).should.eventually.be.equal('3η'),
      this.app.client.getText(elements.KinoColumns4Column).should.eventually.be.equal('4η'),
      this.app.client.getText(elements.KinoColumns5Column).should.eventually.be.equal('5η'),
      this.app.client.getText(elements.KinoColumns6Column).should.eventually.be.equal('6η'),
      this.app.client.getText(elements.KinoColumns7Column).should.eventually.be.equal('7η'),
      this.app.client.getText(elements.KinoColumns8Column).should.eventually.be.equal('8η'),
      this.app.client.getText(elements.KinoColumns9Column).should.eventually.be.equal('9η'),
      this.app.client.getText(elements.KinoColumns10Column).should.eventually.be.equal('10η'),
      this.app.client.getText(elements.KinoColumnsBetAmountLbl).should.eventually.be.equal('ΠΟΝΤΑΡΙΣΜΑ ΑΝΑ ΣΤΗΛΗ'),
      this.app.client.getText(elements.KinoColumnsAmount1).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.KinoColumnsAmount2).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.KinoColumnsAmount3).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.KinoColumnsAmount5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.KinoColumnsAmount10).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.KinoColumnsAmount15).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.KinoColumnsAmount20).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.KinoColumnsAmount30).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.KinoColumnsAmount50).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.KinoColumnsAmount100).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.KinoColumnsClearBtnTxt).should.eventually.be.equal('ΚΑΘΑΡΙΣΜΟΣ'),
      this.app.client.getText(elements.KinoColumnsAddBtn).should.eventually.be.equal('ΠΡΟΣΘΗΚΗ'),
    ]);
  });

  it('Unselect Column 10 option', function () {
    return this.app.client.click(elements.KinoColumns10Column).should.eventually.be.fulfilled;
  });

  it('Click add option', function () {
    return this.app.client.click(elements.KinoColumnsAddBtn).should.eventually.be.fulfilled;
  });

  it('Check that modal of Columns is closed', function () {
    return this.app.client.isVisible(elements.KinoColumnsModal).should.eventually.be.false;
  });

  it('Check cost and selection on Columns tab', function () {
    return Promise.all([
      this.app.client.getText(elements.KinoColumnsBtnAmount).should.eventually.be.equal('2124€'),
      this.app.client.getValue(elements.KinoColumns).should.eventually.be.equal('1,2,3,4,5,6,7,8,9'),
    ]);
  });

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.KinoBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('true'),
      // this.app.client.isVisible(elements.KinoBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipSubmitLbl).should.eventually.be.equal('ΑΠΟΔΟΧΗ'),
      this.app.client.getText(elements.KinoBetslipCostLbl).should.eventually.be.equal('ΚΟΣΤΟΣ ΔΕΛΤΙΟΥ\n2124€'),
      this.app.client.getText(elements.KinoBetslipCost).should.eventually.be.equal('2124€'),
    ]);
  });

  it('Select Kino Columns game from KINO Standard game', function () {
    return this.app.client.click(elements.KinoColumnsImgEl).should.eventually.be.fulfilled;
  });

  it('Check that modal of Columns is opened', function () {
    return this.app.client.isVisible(elements.KinoColumnsModal).should.eventually.be.true;
  });

  it('Check Kino Columns elements', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoColumnsGameLblEl).should.eventually.be.true,
      this.app.client.getText(elements.KinoColumnsSelectionLbl).should.eventually.be.equal('ΕΠΙΛΟΓΗ ΣΤΗΛΗΣ'),
      this.app.client
        .getText(elements.KinoColumnsSelectionMsg)
        .should.eventually.be.equal('Μπορείτε να επιλέξετε περισσότερες από μία ΣΤΗΛΕΣ'),
      this.app.client.getText(elements.KinoColumns1Column).should.eventually.be.equal('1η'),
      this.app.client.getText(elements.KinoColumns2Column).should.eventually.be.equal('2η'),
      this.app.client.getText(elements.KinoColumns3Column).should.eventually.be.equal('3η'),
      this.app.client.getText(elements.KinoColumns4Column).should.eventually.be.equal('4η'),
      this.app.client.getText(elements.KinoColumns5Column).should.eventually.be.equal('5η'),
      this.app.client.getText(elements.KinoColumns6Column).should.eventually.be.equal('6η'),
      this.app.client.getText(elements.KinoColumns7Column).should.eventually.be.equal('7η'),
      this.app.client.getText(elements.KinoColumns8Column).should.eventually.be.equal('8η'),
      this.app.client.getText(elements.KinoColumns9Column).should.eventually.be.equal('9η'),
      this.app.client.getText(elements.KinoColumns10Column).should.eventually.be.equal('10η'),
      this.app.client.getText(elements.KinoColumnsBetAmountLbl).should.eventually.be.equal('ΠΟΝΤΑΡΙΣΜΑ ΑΝΑ ΣΤΗΛΗ'),
      this.app.client.getText(elements.KinoColumnsAmount1).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.KinoColumnsAmount2).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.KinoColumnsAmount3).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.KinoColumnsAmount5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.KinoColumnsAmount10).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.KinoColumnsAmount15).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.KinoColumnsAmount20).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.KinoColumnsAmount30).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.KinoColumnsAmount50).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.KinoColumnsAmount100).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.KinoColumnsClearBtnTxt).should.eventually.be.equal('ΚΑΘΑΡΙΣΜΟΣ'),
      this.app.client.getText(elements.KinoColumnsAddBtn).should.eventually.be.equal('ΠΡΟΣΘΗΚΗ'),
    ]);
  });

  it('Unselect Betting amount 1 Euro', function () {
    return this.app.client.click(elements.KinoColumnsAmount1).should.eventually.be.fulfilled;
  });

  it('Click add option', function () {
    return this.app.client.click(elements.KinoColumnsAddBtn).should.eventually.be.fulfilled;
  });

  it('Check that modal of Columns is closed', function () {
    return this.app.client.isVisible(elements.KinoColumnsModal).should.eventually.be.false;
  });

  it('Check cost and selection on Columns tab', function () {
    return Promise.all([
      this.app.client.getText(elements.KinoColumnsBtnAmount).should.eventually.be.equal('2115€'),
      this.app.client.getValue(elements.KinoColumns).should.eventually.be.equal('1,2,3,4,5,6,7,8,9'),
    ]);
  });

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.KinoBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('true'),
      // this.app.client.isVisible(elements.KinoBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipSubmitLbl).should.eventually.be.equal('ΑΠΟΔΟΧΗ'),
      this.app.client.getText(elements.KinoBetslipCostLbl).should.eventually.be.equal('ΚΟΣΤΟΣ ΔΕΛΤΙΟΥ\n2115€'),
      this.app.client.getText(elements.KinoBetslipCost).should.eventually.be.equal('2115€'),
    ]);
  });

  it('Select Kino Columns game from KINO Standard game', function () {
    return this.app.client.click(elements.KinoColumnsImgEl).should.eventually.be.fulfilled;
  });

  it('Check that modal of Columns is opened', function () {
    return this.app.client.isVisible(elements.KinoColumnsModal).should.eventually.be.true;
  });

  it('Check Kino Columns elements', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoColumnsGameLblEl).should.eventually.be.true,
      this.app.client.getText(elements.KinoColumnsSelectionLbl).should.eventually.be.equal('ΕΠΙΛΟΓΗ ΣΤΗΛΗΣ'),
      this.app.client
        .getText(elements.KinoColumnsSelectionMsg)
        .should.eventually.be.equal('Μπορείτε να επιλέξετε περισσότερες από μία ΣΤΗΛΕΣ'),
      this.app.client.getText(elements.KinoColumns1Column).should.eventually.be.equal('1η'),
      this.app.client.getText(elements.KinoColumns2Column).should.eventually.be.equal('2η'),
      this.app.client.getText(elements.KinoColumns3Column).should.eventually.be.equal('3η'),
      this.app.client.getText(elements.KinoColumns4Column).should.eventually.be.equal('4η'),
      this.app.client.getText(elements.KinoColumns5Column).should.eventually.be.equal('5η'),
      this.app.client.getText(elements.KinoColumns6Column).should.eventually.be.equal('6η'),
      this.app.client.getText(elements.KinoColumns7Column).should.eventually.be.equal('7η'),
      this.app.client.getText(elements.KinoColumns8Column).should.eventually.be.equal('8η'),
      this.app.client.getText(elements.KinoColumns9Column).should.eventually.be.equal('9η'),
      this.app.client.getText(elements.KinoColumns10Column).should.eventually.be.equal('10η'),
      this.app.client.getText(elements.KinoColumnsBetAmountLbl).should.eventually.be.equal('ΠΟΝΤΑΡΙΣΜΑ ΑΝΑ ΣΤΗΛΗ'),
      this.app.client.getText(elements.KinoColumnsAmount1).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.KinoColumnsAmount2).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.KinoColumnsAmount3).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.KinoColumnsAmount5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.KinoColumnsAmount10).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.KinoColumnsAmount15).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.KinoColumnsAmount20).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.KinoColumnsAmount30).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.KinoColumnsAmount50).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.KinoColumnsAmount100).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.KinoColumnsClearBtnTxt).should.eventually.be.equal('ΚΑΘΑΡΙΣΜΟΣ'),
      this.app.client.getText(elements.KinoColumnsAddBtn).should.eventually.be.equal('ΠΡΟΣΘΗΚΗ'),
    ]);
  });

  it('Select Column 10 option', function () {
    return this.app.client.click(elements.KinoColumns10Column).should.eventually.be.fulfilled;
  });

  it('Click add option', function () {
    return this.app.client.click(elements.KinoColumnsAddBtn).should.eventually.be.fulfilled;
  });

  it('Check that modal of Columns is closed', function () {
    return this.app.client.isVisible(elements.KinoColumnsModal).should.eventually.be.false;
  });

  it('Check cost and selection on Columns tab', function () {
    return Promise.all([
      this.app.client.getText(elements.KinoColumnsBtnAmount).should.eventually.be.equal('2350€'),
      this.app.client.getValue(elements.KinoColumns).should.eventually.be.equal('1,2,3,4,5,6,7,8,9,10'),
    ]);
  });

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.KinoBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('true'),
      // this.app.client.isVisible(elements.KinoBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipSubmitLbl).should.eventually.be.equal('ΑΠΟΔΟΧΗ'),
      this.app.client.getText(elements.KinoBetslipCostLbl).should.eventually.be.equal('ΚΟΣΤΟΣ ΔΕΛΤΙΟΥ\n2350€'),
      this.app.client.getText(elements.KinoBetslipCost).should.eventually.be.equal('2350€'),
    ]);
  });

  it('Select Kino Columns game from KINO Standard game', function () {
    return this.app.client.click(elements.KinoColumnsImgEl).should.eventually.be.fulfilled;
  });

  it('Check that modal of Columns is opened', function () {
    return this.app.client.isVisible(elements.KinoColumnsModal).should.eventually.be.true;
  });

  it('Select clear button', function () {
    return this.app.client.click(elements.KinoColumnsClearBtn).should.eventually.be.fulfilled;
  });

  it('Click add option', function () {
    return this.app.client.click(elements.KinoColumnsAddBtn).should.eventually.be.fulfilled;
  });

  it('Check that modal of Columns is opened', function () {
    return this.app.client.isVisible(elements.KinoColumnsModal).should.eventually.be.true;
  });

  it('Check Kino OColumns elements', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoColumnsGameLblEl).should.eventually.be.true,
      this.app.client.getText(elements.KinoColumnsSelectionLbl).should.eventually.be.equal('ΕΠΙΛΟΓΗ ΣΤΗΛΗΣ'),
      this.app.client
        .getText(elements.KinoColumnsSelectionMsg)
        .should.eventually.be.equal('Μπορείτε να επιλέξετε περισσότερες από μία ΣΤΗΛΕΣ'),
      this.app.client.getText(elements.KinoColumns1Column).should.eventually.be.equal('1η'),
      this.app.client.getText(elements.KinoColumns2Column).should.eventually.be.equal('2η'),
      this.app.client.getText(elements.KinoColumns3Column).should.eventually.be.equal('3η'),
      this.app.client.getText(elements.KinoColumns4Column).should.eventually.be.equal('4η'),
      this.app.client.getText(elements.KinoColumns5Column).should.eventually.be.equal('5η'),
      this.app.client.getText(elements.KinoColumns6Column).should.eventually.be.equal('6η'),
      this.app.client.getText(elements.KinoColumns7Column).should.eventually.be.equal('7η'),
      this.app.client.getText(elements.KinoColumns8Column).should.eventually.be.equal('8η'),
      this.app.client.getText(elements.KinoColumns9Column).should.eventually.be.equal('9η'),
      this.app.client.getText(elements.KinoColumns10Column).should.eventually.be.equal('10η'),
      this.app.client.getText(elements.KinoColumnsBetAmountLbl).should.eventually.be.equal('ΠΟΝΤΑΡΙΣΜΑ ΑΝΑ ΣΤΗΛΗ'),
      this.app.client.getText(elements.KinoColumnsAmount1).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.KinoColumnsAmount2).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.KinoColumnsAmount3).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.KinoColumnsAmount5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.KinoColumnsAmount10).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.KinoColumnsAmount15).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.KinoColumnsAmount20).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.KinoColumnsAmount30).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.KinoColumnsAmount50).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.KinoColumnsAmount100).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.KinoColumnsClearBtnTxt).should.eventually.be.equal('ΚΑΘΑΡΙΣΜΟΣ'),
      this.app.client.getText(elements.KinoColumnsAddBtn).should.eventually.be.equal('ΠΡΟΣΘΗΚΗ'),
    ]);
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

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipSubmitBtn).should.eventually.be.true,
      this.app.client
        .elements(elements.KinoBetslipSubmitBtn)
        .getAttribute('data-disabled')
        .should.eventually.be.equal('placeBetInfoMsg2'),
      this.app.client.isVisible(elements.KinoBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipSubmitLbl).should.eventually.be.equal('ΑΠΟΔΟΧΗ'),
      this.app.client.getText(elements.KinoBetslipCostLbl).should.eventually.be.equal('ΚΟΣΤΟΣ ΔΕΛΤΙΟΥ\n0€'),
      this.app.client.getText(elements.KinoBetslipCost).should.eventually.be.equal('0€'),
    ]);
  });

  ///////////////////////////////// Check that multiplier does not affect cost of Odd/Even ///////////////////////////////////

  it('Select Kino Columns game from KINO Standard game', function () {
    return this.app.client.click(elements.KinoColumnsImgEl).should.eventually.be.fulfilled;
  });

  it('Check that modal of Columns is opened', function () {
    return this.app.client.isVisible(elements.KinoColumnsModal).should.eventually.be.true;
  });

  it('Check Kino Columns elements', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoColumnsGameLblEl).should.eventually.be.true,
      this.app.client.getText(elements.KinoColumnsSelectionLbl).should.eventually.be.equal('ΕΠΙΛΟΓΗ ΣΤΗΛΗΣ'),
      this.app.client
        .getText(elements.KinoColumnsSelectionMsg)
        .should.eventually.be.equal('Μπορείτε να επιλέξετε περισσότερες από μία ΣΤΗΛΕΣ'),
      this.app.client.getText(elements.KinoColumns1Column).should.eventually.be.equal('1η'),
      this.app.client.getText(elements.KinoColumns2Column).should.eventually.be.equal('2η'),
      this.app.client.getText(elements.KinoColumns3Column).should.eventually.be.equal('3η'),
      this.app.client.getText(elements.KinoColumns4Column).should.eventually.be.equal('4η'),
      this.app.client.getText(elements.KinoColumns5Column).should.eventually.be.equal('5η'),
      this.app.client.getText(elements.KinoColumns6Column).should.eventually.be.equal('6η'),
      this.app.client.getText(elements.KinoColumns7Column).should.eventually.be.equal('7η'),
      this.app.client.getText(elements.KinoColumns8Column).should.eventually.be.equal('8η'),
      this.app.client.getText(elements.KinoColumns9Column).should.eventually.be.equal('9η'),
      this.app.client.getText(elements.KinoColumns10Column).should.eventually.be.equal('10η'),
      this.app.client.getText(elements.KinoColumnsBetAmountLbl).should.eventually.be.equal('ΠΟΝΤΑΡΙΣΜΑ ΑΝΑ ΣΤΗΛΗ'),
      this.app.client.getText(elements.KinoColumnsAmount1).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.KinoColumnsAmount2).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.KinoColumnsAmount3).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.KinoColumnsAmount5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.KinoColumnsAmount10).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.KinoColumnsAmount15).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.KinoColumnsAmount20).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.KinoColumnsAmount30).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.KinoColumnsAmount50).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.KinoColumnsAmount100).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.KinoColumnsClearBtnTxt).should.eventually.be.equal('ΚΑΘΑΡΙΣΜΟΣ'),
      this.app.client.getText(elements.KinoColumnsAddBtn).should.eventually.be.equal('ΠΡΟΣΘΗΚΗ'),
    ]);
  });

  it('Select Column 1 option', function () {
    return this.app.client.click(elements.KinoColumns1Column).should.eventually.be.fulfilled;
  });

  it('Select Betting amount 2 Euro', function () {
    return this.app.client.click(elements.KinoColumnsAmount2).should.eventually.be.fulfilled;
  });

  it('Select Betting amount 3 Euro', function () {
    return this.app.client.click(elements.KinoColumnsAmount3).should.eventually.be.fulfilled;
  });

  it('Click add option', function () {
    return this.app.client.click(elements.KinoColumnsAddBtn).should.eventually.be.fulfilled;
  });

  it('Check that modal of Columns is closed', function () {
    return this.app.client.isVisible(elements.KinoColumnsModal).should.eventually.be.false;
  });

  it('Check cost and selection on Columns tab', function () {
    return Promise.all([
      this.app.client.getText(elements.KinoColumnsBtnAmount).should.eventually.be.equal('6€'),
      this.app.client.getValue(elements.KinoColumns).should.eventually.be.equal('1'),
    ]);
  });

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.KinoBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('true'),
      // this.app.client.isVisible(elements.KinoBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipSubmitLbl).should.eventually.be.equal('ΑΠΟΔΟΧΗ'),
      this.app.client.getText(elements.KinoBetslipCostLbl).should.eventually.be.equal('ΚΟΣΤΟΣ ΔΕΛΤΙΟΥ\n6€'),
      this.app.client.getText(elements.KinoBetslipCost).should.eventually.be.equal('6€'),
    ]);
  });

  it('Select game type 1 (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
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
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn3Enabled),
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

  it('Check cost and selection on Columns tab', function () {
    return Promise.all([
      this.app.client.getText(elements.KinoColumnsBtnAmount).should.eventually.be.equal('6€'),
      this.app.client.getValue(elements.KinoColumns).should.eventually.be.equal('1'),
    ]);
  });

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.KinoBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('true'),
      // this.app.client.isVisible(elements.KinoBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipSubmitLbl).should.eventually.be.equal('ΑΠΟΔΟΧΗ'),
      this.app.client.getText(elements.KinoBetslipCostLbl).should.eventually.be.equal('ΚΟΣΤΟΣ ΔΕΛΤΙΟΥ\n6.5€'),
      this.app.client.getText(elements.KinoBetslipCost).should.eventually.be.equal('6.5€'),
    ]);
  });

  /////////////////////////////// Check that KINO Bonus does not affect cost of Columns ///////////////////////////////////

  it('Select Kino Columns game from KINO Standard game', function () {
    return this.app.client.click(elements.KinoColumnsImgEl).should.eventually.be.fulfilled;
  });

  it('Check that modal of Columns is opened', function () {
    return this.app.client.isVisible(elements.KinoColumnsModal).should.eventually.be.true;
  });

  it('Check Kino Columns elements', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoColumnsGameLblEl).should.eventually.be.true,
      this.app.client.getText(elements.KinoColumnsSelectionLbl).should.eventually.be.equal('ΕΠΙΛΟΓΗ ΣΤΗΛΗΣ'),
      this.app.client
        .getText(elements.KinoColumnsSelectionMsg)
        .should.eventually.be.equal('Μπορείτε να επιλέξετε περισσότερες από μία ΣΤΗΛΕΣ'),
      this.app.client.getText(elements.KinoColumns1Column).should.eventually.be.equal('1η'),
      this.app.client.getText(elements.KinoColumns2Column).should.eventually.be.equal('2η'),
      this.app.client.getText(elements.KinoColumns3Column).should.eventually.be.equal('3η'),
      this.app.client.getText(elements.KinoColumns4Column).should.eventually.be.equal('4η'),
      this.app.client.getText(elements.KinoColumns5Column).should.eventually.be.equal('5η'),
      this.app.client.getText(elements.KinoColumns6Column).should.eventually.be.equal('6η'),
      this.app.client.getText(elements.KinoColumns7Column).should.eventually.be.equal('7η'),
      this.app.client.getText(elements.KinoColumns8Column).should.eventually.be.equal('8η'),
      this.app.client.getText(elements.KinoColumns9Column).should.eventually.be.equal('9η'),
      this.app.client.getText(elements.KinoColumns10Column).should.eventually.be.equal('10η'),
      this.app.client.getText(elements.KinoColumnsBetAmountLbl).should.eventually.be.equal('ΠΟΝΤΑΡΙΣΜΑ ΑΝΑ ΣΤΗΛΗ'),
      this.app.client.getText(elements.KinoColumnsAmount1).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.KinoColumnsAmount2).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.KinoColumnsAmount3).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.KinoColumnsAmount5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.KinoColumnsAmount10).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.KinoColumnsAmount15).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.KinoColumnsAmount20).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.KinoColumnsAmount30).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.KinoColumnsAmount50).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.KinoColumnsAmount100).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.KinoColumnsClearBtnTxt).should.eventually.be.equal('ΚΑΘΑΡΙΣΜΟΣ'),
      this.app.client.getText(elements.KinoColumnsAddBtn).should.eventually.be.equal('ΠΡΟΣΘΗΚΗ'),
    ]);
  });

  it('Unselect Betting amount 1 Euro', function () {
    return this.app.client.click(elements.KinoColumnsAmount1).should.eventually.be.fulfilled;
  });

  it('Click add option', function () {
    return this.app.client.click(elements.KinoColumnsAddBtn).should.eventually.be.fulfilled;
  });

  it('Check that modal of Columns is closed', function () {
    return this.app.client.isVisible(elements.KinoColumnsModal).should.eventually.be.false;
  });

  it('Select KINO Bonus', function () {
    return this.app.client.click(elements.KinoBonusCheckBox).should.eventually.be.fulfilled;
  });

  it('Check cost and selection on Columns tab', function () {
    return Promise.all([
      this.app.client.getText(elements.KinoColumnsBtnAmount).should.eventually.be.equal('5€'),
      this.app.client.getValue(elements.KinoColumns).should.eventually.be.equal('1'),
    ]);
  });

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.KinoBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('true'),
      // this.app.client.isVisible(elements.KinoBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipSubmitLbl).should.eventually.be.equal('ΑΠΟΔΟΧΗ'),
      this.app.client.getText(elements.KinoBetslipCostLbl).should.eventually.be.equal('ΚΟΣΤΟΣ ΔΕΛΤΙΟΥ\n6€'),
      this.app.client.getText(elements.KinoBetslipCost).should.eventually.be.equal('6€'),
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
        .should.eventually.be.equal(elements.KinoBetMultiplierBtn3Enabled),
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

  ///////////////////////////// Check that consecutive draws works ok for Columns ///////////////////////////////////////

  it('Select Kino Columns game from KINO Standard game', function () {
    return this.app.client.click(elements.KinoColumnsImgEl).should.eventually.be.fulfilled;
  });

  it('Check that modal of Columns is opened', function () {
    return this.app.client.isVisible(elements.KinoColumnsModal).should.eventually.be.true;
  });

  it('Check Kino Columns elements', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoColumnsGameLblEl).should.eventually.be.true,
      this.app.client.getText(elements.KinoColumnsSelectionLbl).should.eventually.be.equal('ΕΠΙΛΟΓΗ ΣΤΗΛΗΣ'),
      this.app.client
        .getText(elements.KinoColumnsSelectionMsg)
        .should.eventually.be.equal('Μπορείτε να επιλέξετε περισσότερες από μία ΣΤΗΛΕΣ'),
      this.app.client.getText(elements.KinoColumns1Column).should.eventually.be.equal('1η'),
      this.app.client.getText(elements.KinoColumns2Column).should.eventually.be.equal('2η'),
      this.app.client.getText(elements.KinoColumns3Column).should.eventually.be.equal('3η'),
      this.app.client.getText(elements.KinoColumns4Column).should.eventually.be.equal('4η'),
      this.app.client.getText(elements.KinoColumns5Column).should.eventually.be.equal('5η'),
      this.app.client.getText(elements.KinoColumns6Column).should.eventually.be.equal('6η'),
      this.app.client.getText(elements.KinoColumns7Column).should.eventually.be.equal('7η'),
      this.app.client.getText(elements.KinoColumns8Column).should.eventually.be.equal('8η'),
      this.app.client.getText(elements.KinoColumns9Column).should.eventually.be.equal('9η'),
      this.app.client.getText(elements.KinoColumns10Column).should.eventually.be.equal('10η'),
      this.app.client.getText(elements.KinoColumnsBetAmountLbl).should.eventually.be.equal('ΠΟΝΤΑΡΙΣΜΑ ΑΝΑ ΣΤΗΛΗ'),
      this.app.client.getText(elements.KinoColumnsAmount1).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.KinoColumnsAmount2).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.KinoColumnsAmount3).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.KinoColumnsAmount5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.KinoColumnsAmount10).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.KinoColumnsAmount15).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.KinoColumnsAmount20).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.KinoColumnsAmount30).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.KinoColumnsAmount50).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.KinoColumnsAmount100).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.KinoColumnsClearBtnTxt).should.eventually.be.equal('ΚΑΘΑΡΙΣΜΟΣ'),
      this.app.client.getText(elements.KinoColumnsAddBtn).should.eventually.be.equal('ΠΡΟΣΘΗΚΗ'),
    ]);
  });

  it('Select Column 2 option', function () {
    return this.app.client.click(elements.KinoColumns2Column).should.eventually.be.fulfilled;
  });

  it('Unselect Betting amount 3 Euro', function () {
    return this.app.client.click(elements.KinoColumnsAmount3).should.eventually.be.fulfilled;
  });

  it('Click add option', function () {
    return this.app.client.click(elements.KinoColumnsAddBtn).should.eventually.be.fulfilled;
  });

  it('Check that modal of Columns is closed', function () {
    return this.app.client.isVisible(elements.KinoColumnsModal).should.eventually.be.false;
  });

  it('Check cost and selection on Columns tab', function () {
    return Promise.all([
      this.app.client.getText(elements.KinoColumnsBtnAmount).should.eventually.be.equal('4€'),
      this.app.client.getValue(elements.KinoColumns).should.eventually.be.equal('1,2'),
    ]);
  });

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.KinoBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('true'),
      // this.app.client.isVisible(elements.KinoBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipSubmitLbl).should.eventually.be.equal('ΑΠΟΔΟΧΗ'),
      this.app.client.getText(elements.KinoBetslipCostLbl).should.eventually.be.equal('ΚΟΣΤΟΣ ΔΕΛΤΙΟΥ\n5€'),
      this.app.client.getText(elements.KinoBetslipCost).should.eventually.be.equal('5€'),
    ]);
  });

  it('Open consecutive draws fields calculator', function () {
    return this.app.client.click(elements.KinoBetConsDrawsInput).should.eventually.be.fulfilled;
  });

  it('Select a value of consecutive draws fields calculator', function () {
    return this.app.client.click(elements.KinoBetConsDrawsCalc8).should.eventually.be.fulfilled;
  });

  it('Close consecutive draws fields calculator by clicking on value field', function () {
    return this.app.client.click(elements.KinoBetConsDrawsInput).should.eventually.be.fulfilled;
  });

  it('Check value of consecutive draws fields calculator', function () {
    return this.app.client.getValue(elements.KinoBetConsDrawsInput).should.eventually.be.equal('8');
  });

  it('Check cost and selection on Columns tab', function () {
    return Promise.all([
      this.app.client.getText(elements.KinoColumnsBtnAmount).should.eventually.be.equal('4€'),
      this.app.client.getValue(elements.KinoColumns).should.eventually.be.equal('1,2'),
    ]);
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

  it('Open consecutive draws fields calculator', function () {
    return this.app.client.click(elements.KinoBetConsDrawsInput).should.eventually.be.fulfilled;
  });

  it('Clear consecutive draws fields calculator by selecting CE', function () {
    return this.app.client.click(elements.KinoBetConsDrawsCalcCE).should.eventually.be.fulfilled;
  });

  it('Close consecutive draws fields calculator by clicking on value field', function () {
    return this.app.client.click(elements.KinoBetConsDrawsInput).should.eventually.be.fulfilled;
  });

  it('Check default value of consecutive draws fields calculator', function () {
    return this.app.client.getValue(elements.KinoBetConsDrawsInput).should.eventually.be.equal('1');
  });

  it('Check cost and selection on Columns tab', function () {
    return Promise.all([
      this.app.client.getText(elements.KinoColumnsBtnAmount).should.eventually.be.equal('4€'),
      this.app.client.getValue(elements.KinoColumns).should.eventually.be.equal('1,2'),
    ]);
  });

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.KinoBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('true'),
      // this.app.client.isVisible(elements.KinoBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipSubmitLbl).should.eventually.be.equal('ΑΠΟΔΟΧΗ'),
      this.app.client.getText(elements.KinoBetslipCostLbl).should.eventually.be.equal('ΚΟΣΤΟΣ ΔΕΛΤΙΟΥ\n5€'),
      this.app.client.getText(elements.KinoBetslipCost).should.eventually.be.equal('5€'),
    ]);
  });

  ////////////////////////////////////////// Clear all from betslip //////////////////////////////////////////////////////

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

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaACost).should.eventually.be.equal('0,00€'),
      this.app.client.isVisible(elements.KinoBetslipAreaAKinoBonus).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaAClear).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumbersLbl).should.eventually.be.equal('ΑΡΙΘΜΟΙ\n0'),
      this.app.client.getText(elements.KinoBetslipAreaANumbers).should.eventually.equal('0'),
      this.app.client.isVisible(elements.KinoBetslipAddBet).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAddBet).should.eventually.be.equal('ΠΡΟΣΘΗΚΗ ΕΠΙΠΛΕΟΝ ΣΤΗΛΗΣ ΚΙΝΟ'),
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.false,
    ]);
  });

  it('Check value of consecutive draws fields calculator', function () {
    return this.app.client.getValue(elements.KinoBetConsDrawsInput).should.eventually.be.equal('1');
  });

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipSubmitBtn).should.eventually.be.true,
      this.app.client
        .elements(elements.KinoBetslipSubmitBtn)
        .getAttribute('data-disabled')
        .should.eventually.be.equal('placeBetInfoMsg2'),
      this.app.client.isVisible(elements.KinoBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipSubmitLbl).should.eventually.be.equal('ΑΠΟΔΟΧΗ'),
      this.app.client.getText(elements.KinoBetslipCostLbl).should.eventually.be.equal('ΚΟΣΤΟΣ ΔΕΛΤΙΟΥ\n0€'),
      this.app.client.getText(elements.KinoBetslipCost).should.eventually.be.equal('0€'),
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
