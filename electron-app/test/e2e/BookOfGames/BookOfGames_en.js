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
var elements = require('./../BookOfGamesElements.js');
const { exec } = require('child_process');

/////////////////////////////////////// Check elements of BookOfGames Bet Page /////////////////////////////////////////

describe('TC BookOfGames_en.js: Check elements of BookOfGames Bet Page', function () {
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

  /////////////////////////////////////////// Language is default set to GR ////////////////////////////////////////////

  /////////////////////////////////////////////// Change language to EN ////////////////////////////////////////////////

  it('Select EN language', function () {
    return this.app.client.click(elements.LobbyEnBtn).should.eventually.be.fulfilled;
  });

  //////////////////////////////////////////// Check BookOfGames from Lobby ////////////////////////////////////////////

  it('Check return to Main Menu element', function () {
    return this.app.client.getText(elements.LobbyBookOfGames).should.eventually.be.equal("GAMES' GUIDE\nMORE");
  });

  /////////////////////////////////////////// Select BookOfGames from Lobby ////////////////////////////////////////////

  it('Select BookOfGames', function () {
    return this.app.client.click(elements.LobbyBookOfGames).should.eventually.be.fulfilled;
  });

  ///////////////////////////////////////// Check elements of BookOfGames page /////////////////////////////////////////

  it('Check Navigation Bar', function () {
    return Promise.all([
      this.app.client.isVisible(elements.MainMenuBtn).should.eventually.be.true,
      this.app.client.isVisible(elements.LobbyElBtn).should.eventually.be.true,
      this.app.client.isVisible(elements.LobbyEnBtn).should.eventually.be.true,
    ]);
  });

  it('Check header text', function () {
    return this.app.client
      .getText(elements.BookOfGamesHeader)
      .should.eventually.be.equal("GAMES' GUIDE\nScan the following QR codes and read the corresponding game guides");
  });

  it('Check BookOfGames images and QR codes', function () {
    return Promise.all([
      this.app.client.isVisible(elements.BookOfGamesBackgroungImg).should.eventually.be.true,
      this.app.client.isVisible(elements.BookOfGamesImage0).should.eventually.be.true,
      this.app.client.isVisible(elements.BookOfGamesQRCode0).should.eventually.be.true,
      this.app.client.isVisible(elements.BookOfGamesImage1).should.eventually.be.true,
      this.app.client.isVisible(elements.BookOfGamesQRCode1).should.eventually.be.true,
    ]);
  });

  ///////////////////////////////////////// Exit BookOfGames - Return to Lobby /////////////////////////////////////////

  it('Exit BookOfGames menu', function () {
    return this.app.client.click(elements.MainMenuBtn).should.eventually.be.fulfilled;
  });

  ///////////////////////////////////////////////// Close Application //////////////////////////////////////////////////

  it('Close Application', function () {
    this.timeout(5000);
    if (this.app && this.app.isRunning()) {
      exec(`taskkill /IM opap-lottery-games.exe /F`);
    }
  });
});
