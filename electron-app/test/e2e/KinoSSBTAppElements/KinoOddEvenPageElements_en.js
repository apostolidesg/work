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

////////////////////////////////////////// Check elements of Kino Odd/Even Page /////////////////////////////////////////////

describe('TC KinoOddEvenPageElements_en.js: Check elements of Kino Odd/Even Page', function () {
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
  /////////////////////////////////////////// Select KINO Odd/Even game from Lobby ////////////////////////////////////////////////

  it('Select Kino Odd/Even game from Lobby', function () {
    return this.app.client.click(elements.LobbyOddEven).should.eventually.be.fulfilled;
  });

  ///////////////////////////////////////// Check elements of KINO Odd/Even page //////////////////////////////////////

  it('Check Kino Odd/Even Logo', function () {
    return this.app.client.isVisible(elements.KinoOddEvenGameLblEl).should.eventually.be.true;
  });

  it('Check Kino Odd/Even elements', function () {
    return Promise.all([
      this.app.client
        .elements(elements.KinoOddEvenSelectionLbl)
        .getAttribute('innerText')
        .should.eventually.be.equal('SELECTION'),
      this.app.client.elements(elements.KinoOddEvenOdd).getAttribute('innerText').should.eventually.be.equal('ODD'),
      this.app.client.elements(elements.KinoOddEvenEven).getAttribute('innerText').should.eventually.be.equal('EVEN'),
      this.app.client.elements(elements.KinoOddEvenDraw).getAttribute('innerText').should.eventually.be.equal('DRAW'),
      this.app.client
        .elements(elements.KinoOddEvenBetAmountLbl)
        .getAttribute('innerText')
        .should.eventually.be.equal('BET AMOUNT'),
      this.app.client.elements(elements.KinoOddEvenAmount1).getAttribute('innerText').should.eventually.be.equal('1€'),
      this.app.client.elements(elements.KinoOddEvenAmount2).getAttribute('innerText').should.eventually.be.equal('2€'),
      this.app.client.elements(elements.KinoOddEvenAmount3).getAttribute('innerText').should.eventually.be.equal('3€'),
      this.app.client.elements(elements.KinoOddEvenAmount5).getAttribute('innerText').should.eventually.be.equal('5€'),
      this.app.client
        .elements(elements.KinoOddEvenAmount10)
        .getAttribute('innerText')
        .should.eventually.be.equal('10€'),
      this.app.client
        .elements(elements.KinoOddEvenAmount15)
        .getAttribute('innerText')
        .should.eventually.be.equal('15€'),
      this.app.client
        .elements(elements.KinoOddEvenAmount20)
        .getAttribute('innerText')
        .should.eventually.be.equal('20€'),
      this.app.client
        .elements(elements.KinoOddEvenAmount30)
        .getAttribute('innerText')
        .should.eventually.be.equal('30€'),
      this.app.client
        .elements(elements.KinoOddEvenAmount50)
        .getAttribute('innerText')
        .should.eventually.be.equal('50€'),
      this.app.client
        .elements(elements.KinoOddEvenAmount100)
        .getAttribute('innerText')
        .should.eventually.be.equal('100€'),
      this.app.client
        .elements(elements.KinoOddEvenClearBtn)
        .getAttribute('innerText')
        .should.eventually.be.contain('CLEAR'),
      this.app.client
        .elements(elements.KinoOddEvenAddBtn)
        .getAttribute('innerText')
        .should.eventually.be.contain('ADD'),
      this.app.client.click(elements.KinoOddEvenCloseBtn).should.eventually.be.fulfilled,
    ]);
  });

  it('Select Kino Odd/Even game from KINO Standard game', function () {
    return this.app.client.click(elements.KinoOddEvenImgEl).should.eventually.be.fulfilled;
  });

  it('Check Kino Odd/Even Logo', function () {
    return this.app.client.isVisible(elements.KinoOddEvenGameLblEl).should.eventually.be.true;
  });

  it('Check Kino Odd/Even elements', function () {
    return Promise.all([
      this.app.client
        .elements(elements.KinoOddEvenSelectionLbl)
        .getAttribute('innerText')
        .should.eventually.be.equal('SELECTION'),
      this.app.client.elements(elements.KinoOddEvenOdd).getAttribute('innerText').should.eventually.be.equal('ODD'),
      this.app.client.elements(elements.KinoOddEvenEven).getAttribute('innerText').should.eventually.be.equal('EVEN'),
      this.app.client.elements(elements.KinoOddEvenDraw).getAttribute('innerText').should.eventually.be.equal('DRAW'),
      this.app.client
        .elements(elements.KinoOddEvenBetAmountLbl)
        .getAttribute('innerText')
        .should.eventually.be.equal('BET AMOUNT'),
      this.app.client.elements(elements.KinoOddEvenAmount1).getAttribute('innerText').should.eventually.be.equal('1€'),
      this.app.client.elements(elements.KinoOddEvenAmount2).getAttribute('innerText').should.eventually.be.equal('2€'),
      this.app.client.elements(elements.KinoOddEvenAmount3).getAttribute('innerText').should.eventually.be.equal('3€'),
      this.app.client.elements(elements.KinoOddEvenAmount5).getAttribute('innerText').should.eventually.be.equal('5€'),
      this.app.client
        .elements(elements.KinoOddEvenAmount10)
        .getAttribute('innerText')
        .should.eventually.be.equal('10€'),
      this.app.client
        .elements(elements.KinoOddEvenAmount15)
        .getAttribute('innerText')
        .should.eventually.be.equal('15€'),
      this.app.client
        .elements(elements.KinoOddEvenAmount20)
        .getAttribute('innerText')
        .should.eventually.be.equal('20€'),
      this.app.client
        .elements(elements.KinoOddEvenAmount30)
        .getAttribute('innerText')
        .should.eventually.be.equal('30€'),
      this.app.client
        .elements(elements.KinoOddEvenAmount50)
        .getAttribute('innerText')
        .should.eventually.be.equal('50€'),
      this.app.client
        .elements(elements.KinoOddEvenAmount100)
        .getAttribute('innerText')
        .should.eventually.be.equal('100€'),
      this.app.client
        .elements(elements.KinoOddEvenClearBtn)
        .getAttribute('innerText')
        .should.eventually.be.contain('CLEAR'),
      this.app.client
        .elements(elements.KinoOddEvenAddBtn)
        .getAttribute('innerText')
        .should.eventually.be.contain('ADD'),
      this.app.client.click(elements.KinoOddEvenCloseBtn).should.eventually.be.fulfilled,
    ]);
  });

  /////////////////////////////////////////// Change language to GR //////////////////////////////////////////////

  it('Select GR language from KINO standard game', function () {
    return this.app.client.click(elements.LobbyElBtn).should.eventually.be.fulfilled;
  });

  it('Select Kino Odd/Even game from KINO Standard game', function () {
    return this.app.client.click(elements.KinoOddEvenImgEl).should.eventually.be.fulfilled;
  });

  it('Check Kino Odd/Even Logo', function () {
    return this.app.client.isVisible(elements.KinoOddEvenGameLblEl).should.eventually.be.true;
  });

  it('Check Kino Odd/Even elements', function () {
    return Promise.all([
      this.app.client
        .elements(elements.KinoOddEvenSelectionLbl)
        .getAttribute('innerText')
        .should.eventually.be.equal('ΕΠΙΛΟΓΗ'),
      this.app.client.elements(elements.KinoOddEvenOdd).getAttribute('innerText').should.eventually.be.equal('ΜΟΝΑ'),
      this.app.client.elements(elements.KinoOddEvenEven).getAttribute('innerText').should.eventually.be.equal('ΖΥΓΑ'),
      this.app.client
        .elements(elements.KinoOddEvenDraw)
        .getAttribute('innerText')
        .should.eventually.be.equal('ΙΣΟΠΑΛΙΑ'),
      this.app.client
        .elements(elements.KinoOddEvenBetAmountLbl)
        .getAttribute('innerText')
        .should.eventually.be.equal('ΠΟΝΤΑΡΙΣΜΑ'),
      this.app.client.elements(elements.KinoOddEvenAmount1).getAttribute('innerText').should.eventually.be.equal('1€'),
      this.app.client.elements(elements.KinoOddEvenAmount2).getAttribute('innerText').should.eventually.be.equal('2€'),
      this.app.client.elements(elements.KinoOddEvenAmount3).getAttribute('innerText').should.eventually.be.equal('3€'),
      this.app.client.elements(elements.KinoOddEvenAmount5).getAttribute('innerText').should.eventually.be.equal('5€'),
      this.app.client
        .elements(elements.KinoOddEvenAmount10)
        .getAttribute('innerText')
        .should.eventually.be.equal('10€'),
      this.app.client
        .elements(elements.KinoOddEvenAmount15)
        .getAttribute('innerText')
        .should.eventually.be.equal('15€'),
      this.app.client
        .elements(elements.KinoOddEvenAmount20)
        .getAttribute('innerText')
        .should.eventually.be.equal('20€'),
      this.app.client
        .elements(elements.KinoOddEvenAmount30)
        .getAttribute('innerText')
        .should.eventually.be.equal('30€'),
      this.app.client
        .elements(elements.KinoOddEvenAmount50)
        .getAttribute('innerText')
        .should.eventually.be.equal('50€'),
      this.app.client
        .elements(elements.KinoOddEvenAmount100)
        .getAttribute('innerText')
        .should.eventually.be.equal('100€'),
      this.app.client
        .elements(elements.KinoOddEvenClearBtn)
        .getAttribute('innerText')
        .should.eventually.be.contain('ΚΑΘΑΡΙΣΜΟΣ'),
      this.app.client
        .elements(elements.KinoOddEvenAddBtn)
        .getAttribute('innerText')
        .should.eventually.be.contain('ΠΡΟΣΘΗΚΗ'),
      this.app.client.click(elements.KinoOddEvenCloseBtn).should.eventually.be.fulfilled,
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
