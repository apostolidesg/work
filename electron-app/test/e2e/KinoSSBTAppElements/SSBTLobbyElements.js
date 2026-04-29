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

/////////////////////////////////////////// Check elements of Lobby page in SSBT ///////////////////////////////////////

describe('TC SSBTLobbyElements.js: Check elements of Lobby page in SSBT', function () {
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

  /////////////////////////////////////////// Default language is GR /////////////////////////////////////////////////////

  it('Check elements of Lobby page in SSBT GR language', function () {
    return Promise.all([
      this.app.client.isVisible(elements.LobbyHeader).should.eventually.be.true,
      this.app.client.isVisible(elements.LobbyHeaderOpapImgEl).should.eventually.be.true,
      this.app.client.isVisible(elements.LobbyHeaderLangSelection).should.eventually.be.true,
      this.app.client.getText(elements.LobbyElBtn).should.eventually.be.equal('ΕΛ'),
      this.app.client.getText(elements.LobbyEnBtn).should.eventually.be.equal('EN'),
      this.app.client.isVisible(elements.LobbyKinoImg).should.eventually.be.true,
      this.app.client.isVisible(elements.LobbyOddEvenImgEl).should.eventually.be.true,
      this.app.client.isVisible(elements.LobbyColumnsImgEl).should.eventually.be.true,
      this.app.client.isVisible(elements.LobbyPameStoiximaImgEl).should.eventually.be.true,
      this.app.client.isVisible(elements.LobbyKinoImg).should.eventually.be.true,
    ]);
    // this.app.client.isVisible(elements.LobbyPameStoiximaImgEn).should.eventually.be.false]);       // Will be added when english logos will be provided
  });

  /////////////////////////////////////////// Select EN language /////////////////////////////////////////////////////////

  it('Select language EN from Lobby', function () {
    return this.app.client.click(elements.LobbyEnBtn);
  });

  ///////////////////////////////////////// Language selected is EN //////////////////////////////////////////////////////

  it('Check elements of Lobby page in SSBT EN language', function () {
    return Promise.all([
      this.app.client.isVisible(elements.LobbyHeader).should.eventually.be.true,
      this.app.client.isVisible(elements.LobbyHeaderOpapImgEl).should.eventually.be.true,
      this.app.client.isVisible(elements.LobbyHeaderLangSelection).should.eventually.be.true,
      this.app.client.getText(elements.LobbyElBtn).should.eventually.be.equal('ΕΛ'),
      this.app.client.getText(elements.LobbyEnBtn).should.eventually.be.equal('EN'),
      this.app.client.isVisible(elements.LobbyKinoImg).should.eventually.be.true,
      this.app.client.isVisible(elements.LobbyOddEvenImgEl).should.eventually.be.true,
      this.app.client.isVisible(elements.LobbyColumnsImgEl).should.eventually.be.true,
      // this.app.client.isVisible(elements.LobbyPameStoiximaImgEn).should.eventually.be.true,     // Will be changed to false as soon as English logos are added (JAN-228)
      this.app.client.isVisible(elements.LobbyKinoImg).should.eventually.be.true,
    ]);
    // this.app.client.isVisible(elements.LobbyPameStoiximaImgEl).should.eventually.be.false]);       // Will be added when english logos will be provided
  });

  //////////////////////////////////////////// Close Application /////////////////////////////////////////////////////////

  it('Close Application', function () {
    this.timeout(5000);
    if (this.app && this.app.isRunning()) {
      exec(`taskkill /IM opap-lottery-games.exe /F`);
    }
  });
});
