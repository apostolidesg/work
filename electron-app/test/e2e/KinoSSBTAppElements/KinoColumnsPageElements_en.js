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

////////////////////////////////////////// Check elements of Kino Columns Page /////////////////////////////////////////////

describe('TC KinoColumnsPageElements_en.js: Check elements of Kino Columns Page', function () {
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
  /////////////////////////////////////////// Change language to EN //////////////////////////////////////////////////////

  it('Select EN language from KINO standard game', function () {
    return this.app.client.click(elements.LobbyEnBtn).should.eventually.be.fulfilled;
  });
  /////////////////////////////////////////// Select KINO Columns game from Lobby ////////////////////////////////////////

  it('Select Kino Columns game from Lobby', function () {
    return this.app.client.click(elements.LobbyColumns).should.eventually.be.fulfilled;
  });

  ///////////////////////////////////////// Check elements of KINO Columns page //////////////////////////////////////////

  it('Check Kino Columns Logo', function () {
    return this.app.client.isVisible(elements.KinoColumnsGameLblEl).should.eventually.be.true;
  });

  it('Check Kino Columns elements', function () {
    return Promise.all([
      this.app.client
        .elements(elements.KinoColumnsSelectionLbl)
        .getAttribute('innerText')
        .should.eventually.be.equal('COLUMN SELECTION'),
      this.app.client
        .elements(elements.KinoColumnsSelectionMsg)
        .getAttribute('innerText')
        .should.eventually.be.equal('You can select more than one COLUMNS'),
      this.app.client.elements(elements.KinoColumns1Column).getAttribute('innerText').should.eventually.be.equal('1st'),
      this.app.client.elements(elements.KinoColumns2Column).getAttribute('innerText').should.eventually.be.equal('2nd'),
      this.app.client.elements(elements.KinoColumns3Column).getAttribute('innerText').should.eventually.be.equal('3rd'),
      this.app.client.elements(elements.KinoColumns4Column).getAttribute('innerText').should.eventually.be.equal('4th'),
      this.app.client.elements(elements.KinoColumns5Column).getAttribute('innerText').should.eventually.be.equal('5th'),
      this.app.client.elements(elements.KinoColumns6Column).getAttribute('innerText').should.eventually.be.equal('6th'),
      this.app.client.elements(elements.KinoColumns7Column).getAttribute('innerText').should.eventually.be.equal('7th'),
      this.app.client.elements(elements.KinoColumns8Column).getAttribute('innerText').should.eventually.be.equal('8th'),
      this.app.client.elements(elements.KinoColumns9Column).getAttribute('innerText').should.eventually.be.equal('9th'),
      this.app.client
        .elements(elements.KinoColumns10Column)
        .getAttribute('innerText')
        .should.eventually.be.equal('10th'),
      this.app.client
        .elements(elements.KinoColumnsBetAmountLbl)
        .getAttribute('innerText')
        .should.eventually.be.equal('BET AMOUNT PER COLUMN'),
      this.app.client.elements(elements.KinoColumnsAmount1).getAttribute('innerText').should.eventually.be.equal('1€'),
      this.app.client.elements(elements.KinoColumnsAmount2).getAttribute('innerText').should.eventually.be.equal('2€'),
      this.app.client.elements(elements.KinoColumnsAmount3).getAttribute('innerText').should.eventually.be.equal('3€'),
      this.app.client.elements(elements.KinoColumnsAmount5).getAttribute('innerText').should.eventually.be.equal('5€'),
      this.app.client
        .elements(elements.KinoColumnsAmount10)
        .getAttribute('innerText')
        .should.eventually.be.equal('10€'),
      this.app.client
        .elements(elements.KinoColumnsAmount15)
        .getAttribute('innerText')
        .should.eventually.be.equal('15€'),
      this.app.client
        .elements(elements.KinoColumnsAmount20)
        .getAttribute('innerText')
        .should.eventually.be.equal('20€'),
      this.app.client
        .elements(elements.KinoColumnsAmount30)
        .getAttribute('innerText')
        .should.eventually.be.equal('30€'),
      this.app.client
        .elements(elements.KinoColumnsAmount50)
        .getAttribute('innerText')
        .should.eventually.be.equal('50€'),
      this.app.client
        .elements(elements.KinoColumnsAmount100)
        .getAttribute('innerText')
        .should.eventually.be.equal('100€'),
      this.app.client
        .elements(elements.KinoColumnsClearBtnTxt)
        .getAttribute('innerText')
        .should.eventually.be.contain('CLEAR'),
      this.app.client
        .elements(elements.KinoColumnsAddBtn)
        .getAttribute('innerText')
        .should.eventually.be.contain('ADD'),
      this.app.client.click(elements.KinoColumnsCloseBtn).should.eventually.be.fulfilled,
    ]);
  });

  it('Select Kino Columns game from KINO Standard game', function () {
    return this.app.client.click(elements.KinoColumnsImgEl).should.eventually.be.fulfilled;
  });

  it('Check Kino Columns Logo', function () {
    return this.app.client.isVisible(elements.KinoColumnsGameLblEl).should.eventually.be.true;
  });

  it('Check Kino Columns elements', function () {
    return Promise.all([
      this.app.client
        .elements(elements.KinoColumnsSelectionLbl)
        .getAttribute('innerText')
        .should.eventually.be.equal('COLUMN SELECTION'),
      this.app.client
        .elements(elements.KinoColumnsSelectionMsg)
        .getAttribute('innerText')
        .should.eventually.be.equal('You can select more than one COLUMNS'),
      this.app.client.elements(elements.KinoColumns1Column).getAttribute('innerText').should.eventually.be.equal('1st'),
      this.app.client.elements(elements.KinoColumns2Column).getAttribute('innerText').should.eventually.be.equal('2nd'),
      this.app.client.elements(elements.KinoColumns3Column).getAttribute('innerText').should.eventually.be.equal('3rd'),
      this.app.client.elements(elements.KinoColumns4Column).getAttribute('innerText').should.eventually.be.equal('4th'),
      this.app.client.elements(elements.KinoColumns5Column).getAttribute('innerText').should.eventually.be.equal('5th'),
      this.app.client.elements(elements.KinoColumns6Column).getAttribute('innerText').should.eventually.be.equal('6th'),
      this.app.client.elements(elements.KinoColumns7Column).getAttribute('innerText').should.eventually.be.equal('7th'),
      this.app.client.elements(elements.KinoColumns8Column).getAttribute('innerText').should.eventually.be.equal('8th'),
      this.app.client.elements(elements.KinoColumns9Column).getAttribute('innerText').should.eventually.be.equal('9th'),
      this.app.client
        .elements(elements.KinoColumns10Column)
        .getAttribute('innerText')
        .should.eventually.be.equal('10th'),
      this.app.client
        .elements(elements.KinoColumnsBetAmountLbl)
        .getAttribute('innerText')
        .should.eventually.be.equal('BET AMOUNT PER COLUMN'),
      this.app.client.elements(elements.KinoColumnsAmount1).getAttribute('innerText').should.eventually.be.equal('1€'),
      this.app.client.elements(elements.KinoColumnsAmount2).getAttribute('innerText').should.eventually.be.equal('2€'),
      this.app.client.elements(elements.KinoColumnsAmount3).getAttribute('innerText').should.eventually.be.equal('3€'),
      this.app.client.elements(elements.KinoColumnsAmount5).getAttribute('innerText').should.eventually.be.equal('5€'),
      this.app.client
        .elements(elements.KinoColumnsAmount10)
        .getAttribute('innerText')
        .should.eventually.be.equal('10€'),
      this.app.client
        .elements(elements.KinoColumnsAmount15)
        .getAttribute('innerText')
        .should.eventually.be.equal('15€'),
      this.app.client
        .elements(elements.KinoColumnsAmount20)
        .getAttribute('innerText')
        .should.eventually.be.equal('20€'),
      this.app.client
        .elements(elements.KinoColumnsAmount30)
        .getAttribute('innerText')
        .should.eventually.be.equal('30€'),
      this.app.client
        .elements(elements.KinoColumnsAmount50)
        .getAttribute('innerText')
        .should.eventually.be.equal('50€'),
      this.app.client
        .elements(elements.KinoColumnsAmount100)
        .getAttribute('innerText')
        .should.eventually.be.equal('100€'),
      this.app.client
        .elements(elements.KinoColumnsClearBtnTxt)
        .getAttribute('innerText')
        .should.eventually.be.contain('CLEAR'),
      this.app.client
        .elements(elements.KinoColumnsAddBtn)
        .getAttribute('innerText')
        .should.eventually.be.contain('ADD'),
      this.app.client.click(elements.KinoColumnsCloseBtn).should.eventually.be.fulfilled,
    ]);
  });

  /////////////////////////////////////////// Change language to GR //////////////////////////////////////////////////////

  it('Select GR language from KINO standard game', function () {
    return this.app.client.click(elements.LobbyElBtn).should.eventually.be.fulfilled;
  });

  it('Select Kino Columns game from KINO Standard game', function () {
    return this.app.client.click(elements.KinoColumnsImgEl).should.eventually.be.fulfilled;
  });

  it('Check Kino Columns Logo', function () {
    return this.app.client.isVisible(elements.KinoColumnsGameLblEl).should.eventually.be.true;
  });

  it('Check Kino Columns elements', function () {
    return Promise.all([
      this.app.client
        .elements(elements.KinoColumnsSelectionLbl)
        .getAttribute('innerText')
        .should.eventually.be.equal('ΕΠΙΛΟΓΗ ΣΤΗΛΗΣ'),
      this.app.client
        .elements(elements.KinoColumnsSelectionMsg)
        .getAttribute('innerText')
        .should.eventually.be.equal('Μπορείτε να επιλέξετε περισσότερες από μία ΣΤΗΛΕΣ'),
      this.app.client.elements(elements.KinoColumns1Column).getAttribute('innerText').should.eventually.be.equal('1η'),
      this.app.client.elements(elements.KinoColumns2Column).getAttribute('innerText').should.eventually.be.equal('2η'),
      this.app.client.elements(elements.KinoColumns3Column).getAttribute('innerText').should.eventually.be.equal('3η'),
      this.app.client.elements(elements.KinoColumns4Column).getAttribute('innerText').should.eventually.be.equal('4η'),
      this.app.client.elements(elements.KinoColumns5Column).getAttribute('innerText').should.eventually.be.equal('5η'),
      this.app.client.elements(elements.KinoColumns6Column).getAttribute('innerText').should.eventually.be.equal('6η'),
      this.app.client.elements(elements.KinoColumns7Column).getAttribute('innerText').should.eventually.be.equal('7η'),
      this.app.client.elements(elements.KinoColumns8Column).getAttribute('innerText').should.eventually.be.equal('8η'),
      this.app.client.elements(elements.KinoColumns9Column).getAttribute('innerText').should.eventually.be.equal('9η'),
      this.app.client
        .elements(elements.KinoColumns10Column)
        .getAttribute('innerText')
        .should.eventually.be.equal('10η'),
      this.app.client
        .elements(elements.KinoColumnsBetAmountLbl)
        .getAttribute('innerText')
        .should.eventually.be.equal('ΠΟΝΤΑΡΙΣΜΑ ΑΝΑ ΣΤΗΛΗ'),
      this.app.client.elements(elements.KinoColumnsAmount1).getAttribute('innerText').should.eventually.be.equal('1€'),
      this.app.client.elements(elements.KinoColumnsAmount2).getAttribute('innerText').should.eventually.be.equal('2€'),
      this.app.client.elements(elements.KinoColumnsAmount3).getAttribute('innerText').should.eventually.be.equal('3€'),
      this.app.client.elements(elements.KinoColumnsAmount5).getAttribute('innerText').should.eventually.be.equal('5€'),
      this.app.client
        .elements(elements.KinoColumnsAmount10)
        .getAttribute('innerText')
        .should.eventually.be.equal('10€'),
      this.app.client
        .elements(elements.KinoColumnsAmount15)
        .getAttribute('innerText')
        .should.eventually.be.equal('15€'),
      this.app.client
        .elements(elements.KinoColumnsAmount20)
        .getAttribute('innerText')
        .should.eventually.be.equal('20€'),
      this.app.client
        .elements(elements.KinoColumnsAmount30)
        .getAttribute('innerText')
        .should.eventually.be.equal('30€'),
      this.app.client
        .elements(elements.KinoColumnsAmount50)
        .getAttribute('innerText')
        .should.eventually.be.equal('50€'),
      this.app.client
        .elements(elements.KinoColumnsAmount100)
        .getAttribute('innerText')
        .should.eventually.be.equal('100€'),
      this.app.client
        .elements(elements.KinoColumnsClearBtnTxt)
        .getAttribute('innerText')
        .should.eventually.be.contain('ΚΑΘΑΡΙΣΜΟΣ'),
      this.app.client
        .elements(elements.KinoColumnsAddBtn)
        .getAttribute('innerText')
        .should.eventually.be.contain('ΠΡΟΣΘΗΚΗ'),
      this.app.client.click(elements.KinoColumnsCloseBtn).should.eventually.be.fulfilled,
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
    //       .then(function(values){
    //         return values[0] && values[1] && values[2] && values[3] && self.app.client.click(elements.KinoModalAYesBtn).should.eventually.be.fulfilled});
  });

  ///////////////////////////////////// Close Application ////////////////////////////////////////////////////////////////

  it('Close Application', function () {
    this.timeout(5000);
    if (this.app && this.app.isRunning()) {
      exec(`taskkill /IM opap-lottery-games.exe /F`);
    }
  });
});
