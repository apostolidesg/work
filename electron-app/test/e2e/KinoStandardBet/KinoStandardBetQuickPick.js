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

////////////////////////////////////////// Check Quick Pick functionality ///////////////////////////////////////////////

describe('TC KinoStandardBetQuickPick.js: Check Quick Pick functionality', function () {
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

  /////////////////////////////////////////// Area A is default selected /////////////////////////////////////////////////

  it('Select game type 1 (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumber1Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaANumber2Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumber1Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaANumber2Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumber1Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaANumber2Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumber1Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaANumber2Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 2 (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber2Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaANumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber2Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaANumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber2Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaANumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber2Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaANumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 3 (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber3Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaANumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber12Value).should.eventually.be.false,
    ]);
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber3Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaANumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber3Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaANumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber3Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaANumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber3Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaANumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 4 (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber4Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaANumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber4Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaANumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber4Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaANumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber4Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaANumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 5 (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber5Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaANumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber5Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaANumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber5Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaANumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber5Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaANumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 6 (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber6Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaANumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber6Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaANumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber6Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaANumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber6Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaANumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 7 (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber7Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaANumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber7Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaANumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber7Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaANumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber7Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaANumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 8 (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber8Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaANumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber8Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaANumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber8Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaANumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber8Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaANumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 9 (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber9Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaANumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber9Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaANumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber9Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaANumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber9Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaANumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 10 (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber10Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaANumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber10Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaANumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber10Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaANumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber10Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaANumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 11 (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber10Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber11Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaANumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber10Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber11Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaANumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber10Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber11Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaANumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber10Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber11Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaANumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 12 (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber10Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber11Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber12Value).should.eventually.not.equal(''),
    ]);
  });

  it('Select again quick pick (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber10Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber11Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber12Value).should.eventually.not.equal(''),
    ]);
  });

  it('Select again quick pick (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber10Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber11Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber12Value).should.eventually.not.equal(''),
    ]);
  });

  it('Select again quick pick (A Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber10Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber11Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber12Value).should.eventually.not.equal(''),
    ]);
  });

  ///////////////////////////////////////////////////// Select Area B ////////////////////////////////////////////////////

  it('Add new bet', function () {
    return this.app.client.click(elements.KinoBetslipAddBet).should.eventually.be.fulfilled;
  });

  it('Select game type 1 (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumber1Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber2Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumber1Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber2Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumber1Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber2Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumber1Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber2Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 2 (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber2Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber2Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber2Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber2Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 3 (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber3Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select quick pick (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber3Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber3Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber3Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber3Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 4 (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber4Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber4Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber4Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber4Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 5 (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber5Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber5Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber5Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber5Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 6 (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber6Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber6Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber6Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber6Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 7 (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber7Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber7Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber7Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber7Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 8 (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber8Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber8Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber8Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber8Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 9 (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber9Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber9Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber9Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber9Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 10 (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber10Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber10Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber10Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber10Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 11 (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber10Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber11Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber10Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber11Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber10Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber11Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber10Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber11Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 12 (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber10Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber11Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber12Value).should.eventually.not.equal(''),
    ]);
  });

  it('Select again quick pick (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber10Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber11Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber12Value).should.eventually.not.equal(''),
    ]);
  });

  it('Select again quick pick (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber10Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber11Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber12Value).should.eventually.not.equal(''),
    ]);
  });

  it('Select again quick pick (B Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber10Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber11Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaBNumber12Value).should.eventually.not.equal(''),
    ]);
  });

  ///////////////////////////////////////////////////// Select Area C ////////////////////////////////////////////////////

  it('Add new bet', function () {
    return this.app.client.click(elements.KinoBetslipAddBet).should.eventually.be.fulfilled;
  });

  it('Select game type 1 (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumber1Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber2Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumber1Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber2Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumber1Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber2Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumber1Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber2Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 2 (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber2Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber2Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber2Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber2Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 3 (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber3Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select quick pick (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber3Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber3Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber3Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber3Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 4 (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber4Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber4Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber4Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber4Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 5 (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber5Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber5Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber5Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber5Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 6 (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber6Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber6Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber6Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber6Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 7 (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber7Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber7Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber7Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber7Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 8 (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber8Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber8Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber8Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber8Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 9 (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber9Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber9Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber9Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber9Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 10 (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber10Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber10Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber10Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber10Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 11 (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber10Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber11Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber10Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber11Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber10Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber11Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber10Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber11Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 12 (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber10Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber11Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber12Value).should.eventually.not.equal(''),
    ]);
  });

  it('Select again quick pick (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber10Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber11Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber12Value).should.eventually.not.equal(''),
    ]);
  });

  it('Select again quick pick (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber10Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber11Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber12Value).should.eventually.not.equal(''),
    ]);
  });

  it('Select again quick pick (C Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber10Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber11Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaCNumber12Value).should.eventually.not.equal(''),
    ]);
  });

  ///////////////////////////////////////////////////// Select Area D ////////////////////////////////////////////////////

  it('Add new bet', function () {
    return this.app.client.click(elements.KinoBetslipAddBet).should.eventually.be.fulfilled;
  });

  it('Select game type 1 (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumber1Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber2Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumber1Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber2Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumber1Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber2Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumber1Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber2Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 2 (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber2Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber2Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber2Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber2Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 3 (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber3Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select quick pick (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber3Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber3Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber3Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber3Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 4 (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber4Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber4Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber4Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber4Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 5 (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber5Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber5Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber5Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber5Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 6 (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber6Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber6Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber6Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber6Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 7 (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber7Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber7Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber7Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber7Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 8 (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber8Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber8Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber8Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber8Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 9 (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber9Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber9Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber9Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber9Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 10 (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber10Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber10Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber10Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber10Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 11 (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber10Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber11Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber10Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber11Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber10Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber11Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber10Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber11Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 12 (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber10Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber11Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber12Value).should.eventually.not.equal(''),
    ]);
  });

  it('Select again quick pick (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber10Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber11Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber12Value).should.eventually.not.equal(''),
    ]);
  });

  it('Select again quick pick (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber10Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber11Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber12Value).should.eventually.not.equal(''),
    ]);
  });

  it('Select again quick pick (D Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber10Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber11Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaDNumber12Value).should.eventually.not.equal(''),
    ]);
  });

  ///////////////////////////////////////////////////// Select Area E ////////////////////////////////////////////////////

  it('Add new bet', function () {
    return this.app.client.click(elements.KinoBetslipAddBet).should.eventually.be.fulfilled;
  });

  it('Select game type 1 (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumber1Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaENumber2Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumber1Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaENumber2Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumber1Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaENumber2Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumber1Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaENumber2Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 2 (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber2Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaENumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber2Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaENumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber2Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaENumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber2Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaENumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 3 (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber3Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaENumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select quick pick (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber3Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaENumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber3Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaENumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber3Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaENumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber3Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaENumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 4 (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber4Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaENumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber4Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaENumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber4Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaENumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber4Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaENumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 5 (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber5Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaENumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber5Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaENumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber5Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaENumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber5Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaENumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 6 (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber6Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaENumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber6Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaENumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber6Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaENumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber6Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaENumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 7 (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber7Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaENumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber7Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaENumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber7Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaENumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber7Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaENumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 8 (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber8Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaENumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber8Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaENumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber8Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaENumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber8Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaENumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 9 (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber9Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaENumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber9Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaENumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber9Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaENumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber9Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaENumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 10 (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber10Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaENumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber10Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaENumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber10Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaENumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber10Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaENumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 11 (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber10Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber11Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaENumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber10Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber11Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaENumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber10Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber11Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaENumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber10Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber11Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaENumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 12 (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber10Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber11Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber12Value).should.eventually.not.equal(''),
    ]);
  });

  it('Select again quick pick (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber10Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber11Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber12Value).should.eventually.not.equal(''),
    ]);
  });

  it('Select again quick pick (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber10Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber11Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber12Value).should.eventually.not.equal(''),
    ]);
  });

  it('Select again quick pick (E Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber10Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber11Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaENumber12Value).should.eventually.not.equal(''),
    ]);
  });

  ///////////////////////////////////////////////////// Select Area F ////////////////////////////////////////////////////

  it('Add new bet', function () {
    return this.app.client.click(elements.KinoBetslipAddBet).should.eventually.be.fulfilled;
  });

  it('Select game type 1 (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumber1Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber2Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumber1Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber2Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumber1Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber2Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumber1Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber2Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 2 (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber2Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber2Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber2Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber2Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 3 (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber3Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select quick pick (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber3Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber3Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber3Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber3Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 4 (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber4Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber4Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber4Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber4Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 5 (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber5Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber5Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber5Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber5Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 6 (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber6Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber6Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber6Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber6Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 7 (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber7Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber7Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber7Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber7Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 8 (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber8Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber8Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber8Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber8Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 9 (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber9Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber9Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber9Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber9Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 10 (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber10Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber10Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber10Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber10Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 11 (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber10Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber11Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber10Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber11Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber10Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber11Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select again quick pick (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber10Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber11Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select game type 12 (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickUp).should.eventually.be.fulfilled;
  });

  it('Select quick pick (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber10Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber11Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber12Value).should.eventually.not.equal(''),
    ]);
  });

  it('Select again quick pick (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber10Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber11Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber12Value).should.eventually.not.equal(''),
    ]);
  });

  it('Select again quick pick (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber10Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber11Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber12Value).should.eventually.not.equal(''),
    ]);
  });

  it('Select again quick pick (F Area)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber6Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber7Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber8Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber9Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber10Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber11Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaFNumber12Value).should.eventually.not.equal(''),
    ]);
  });

  ///////////////////////////////// Check quick pick field for all areas /////////////////////////////////////////////////

  it('Select Area A from Betslip', function () {
    return this.app.client.click(elements.KinoBetslipAreaA).should.eventually.be.fulfilled;
  });

  it('Check quick pick field', function () {
    return this.app.client.getValue(elements.KinoQuickPickInput).should.eventually.be.equal('12');
  });

  it('Select Area B from Betslip', function () {
    return this.app.client.click(elements.KinoBetslipAreaB).should.eventually.be.fulfilled;
  });

  it('Check quick pick field', function () {
    return this.app.client.getValue(elements.KinoQuickPickInput).should.eventually.be.equal('12');
  });

  it('Select Area C from Betslip', function () {
    return this.app.client.click(elements.KinoBetslipAreaC).should.eventually.be.fulfilled;
  });

  it('Check quick pick field', function () {
    return this.app.client.getValue(elements.KinoQuickPickInput).should.eventually.be.equal('12');
  });

  it('Select Area D from Betslip', function () {
    return this.app.client.click(elements.KinoBetslipAreaD).should.eventually.be.fulfilled;
  });

  it('Check quick pick field', function () {
    return this.app.client.getValue(elements.KinoQuickPickInput).should.eventually.be.equal('12');
  });

  it('Select Area E from Betslip', function () {
    return this.app.client.click(elements.KinoBetslipAreaE).should.eventually.be.fulfilled;
  });

  it('Check quick pick field', function () {
    return this.app.client.getValue(elements.KinoQuickPickInput).should.eventually.be.equal('12');
  });

  it('Select Area F from Betslip', function () {
    return this.app.client.click(elements.KinoBetslipAreaF).should.eventually.be.fulfilled;
  });

  it('Check quick pick field', function () {
    return this.app.client.getValue(elements.KinoQuickPickInput).should.eventually.be.equal('12');
  });

  /////////////////////////////////////////////// Check the quick pick tab ///////////////////////////////////////////////

  it('Select Area A from Betslip', function () {
    return this.app.client.click(elements.KinoBetslipAreaA).should.eventually.be.fulfilled;
  });

  it('Open Quick Pick tab', function () {
    return this.app.client.click(elements.KinoQuickPickInput).should.eventually.be.fulfilled;
  });

  it('Check Quick Pick tab fields', function () {
    return Promise.all([
      this.app.client.getValue(elements.KinoQuickPickInput).should.eventually.be.equal('12'),
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
      this.app.client.getValue(elements.KinoQuickPickTable12Inp).should.eventually.be.equal('true'),
    ]);
  });

  it('Select Quick Pick game type 6', function () {
    return this.app.client.click(elements.KinoQuickPickTable6).should.eventually.be.fulfilled;
  });

  it('Check that Quick Pick tab is closed', function () {
    return this.app.client.isVisible(elements.KinoQuickPickTable).should.eventually.be.false;
  });

  it('Select quick pick (game type 6)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaANumber1Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber2Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber3Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber4Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber5Value).should.eventually.not.equal(''),
      this.app.client.getText(elements.KinoBetslipAreaANumber6Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaANumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaANumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select Area B from Betslip', function () {
    return this.app.client.click(elements.KinoBetslipAreaB).should.eventually.be.fulfilled;
  });

  it('Open Quick Pick tab', function () {
    return this.app.client.click(elements.KinoQuickPickInput).should.eventually.be.fulfilled;
  });

  it('Check Quick Pick tab fields', function () {
    return Promise.all([
      this.app.client.getValue(elements.KinoQuickPickInput).should.eventually.be.equal('12'),
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
      this.app.client.getValue(elements.KinoQuickPickTable12Inp).should.eventually.be.equal('true'),
    ]);
  });

  it('Select Quick Pick game type 1', function () {
    return this.app.client.click(elements.KinoQuickPickTable1).should.eventually.be.fulfilled;
  });

  it('Check that Quick Pick tab is closed', function () {
    return this.app.client.isVisible(elements.KinoQuickPickTable).should.eventually.be.false;
  });

  it('Select quick pick (game type 1)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaBNumber1Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber2Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaBNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select Area C from Betslip', function () {
    return this.app.client.click(elements.KinoBetslipAreaC).should.eventually.be.fulfilled;
  });

  it('Open Quick Pick tab', function () {
    return this.app.client.click(elements.KinoQuickPickInput).should.eventually.be.fulfilled;
  });

  it('Check Quick Pick tab fields', function () {
    return Promise.all([
      this.app.client.getValue(elements.KinoQuickPickInput).should.eventually.be.equal('12'),
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
      this.app.client.getValue(elements.KinoQuickPickTable12Inp).should.eventually.be.equal('true'),
    ]);
  });

  it('Select Quick Pick game type 1', function () {
    return this.app.client.click(elements.KinoQuickPickTable1).should.eventually.be.fulfilled;
  });

  it('Check that Quick Pick tab is closed', function () {
    return this.app.client.isVisible(elements.KinoQuickPickTable).should.eventually.be.false;
  });

  it('Select quick pick (game type 1)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaCNumber1Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber2Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaCNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select Area D from Betslip', function () {
    return this.app.client.click(elements.KinoBetslipAreaD).should.eventually.be.fulfilled;
  });

  it('Open Quick Pick tab', function () {
    return this.app.client.click(elements.KinoQuickPickInput).should.eventually.be.fulfilled;
  });

  it('Check Quick Pick tab fields', function () {
    return Promise.all([
      this.app.client.getValue(elements.KinoQuickPickInput).should.eventually.be.equal('12'),
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
      this.app.client.getValue(elements.KinoQuickPickTable12Inp).should.eventually.be.equal('true'),
    ]);
  });

  it('Select Quick Pick game type 1', function () {
    return this.app.client.click(elements.KinoQuickPickTable1).should.eventually.be.fulfilled;
  });

  it('Check that Quick Pick tab is closed', function () {
    return this.app.client.isVisible(elements.KinoQuickPickTable).should.eventually.be.false;
  });

  it('Select quick pick (game type 1)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaDNumber1Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber2Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaDNumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select Area E from Betslip', function () {
    return this.app.client.click(elements.KinoBetslipAreaE).should.eventually.be.fulfilled;
  });

  it('Open Quick Pick tab', function () {
    return this.app.client.click(elements.KinoQuickPickInput).should.eventually.be.fulfilled;
  });

  it('Check Quick Pick tab fields', function () {
    return Promise.all([
      this.app.client.getValue(elements.KinoQuickPickInput).should.eventually.be.equal('12'),
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
      this.app.client.getValue(elements.KinoQuickPickTable12Inp).should.eventually.be.equal('true'),
    ]);
  });

  it('Select Quick Pick game type 1', function () {
    return this.app.client.click(elements.KinoQuickPickTable1).should.eventually.be.fulfilled;
  });

  it('Check that Quick Pick tab is closed', function () {
    return this.app.client.isVisible(elements.KinoQuickPickTable).should.eventually.be.false;
  });

  it('Select quick pick (game type 1)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaENumber1Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaENumber2Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaENumber12Value).should.eventually.be.false,
    ]);
  });

  it('Select Area F from Betslip', function () {
    return this.app.client.click(elements.KinoBetslipAreaF).should.eventually.be.fulfilled;
  });

  it('Open Quick Pick tab', function () {
    return this.app.client.click(elements.KinoQuickPickInput).should.eventually.be.fulfilled;
  });

  it('Check Quick Pick tab fields', function () {
    return Promise.all([
      this.app.client.getValue(elements.KinoQuickPickInput).should.eventually.be.equal('12'),
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
      this.app.client.getValue(elements.KinoQuickPickTable12Inp).should.eventually.be.equal('true'),
    ]);
  });

  it('Select Quick Pick game type 1', function () {
    return this.app.client.click(elements.KinoQuickPickTable1).should.eventually.be.fulfilled;
  });

  it('Check that Quick Pick tab is closed', function () {
    return this.app.client.isVisible(elements.KinoQuickPickTable).should.eventually.be.false;
  });

  it('Select quick pick (game type 1)', function () {
    return this.app.client.click(elements.KinoQuickPickBtn).should.eventually.be.fulfilled;
  });

  it('Check that the appropriate number of KINO numbers are randomly selected', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.KinoBetslipAreaFNumber1Value).should.eventually.not.equal(''),
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber2Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber3Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber4Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber5Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber6Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber7Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber8Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber9Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber10Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber11Value).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaFNumber12Value).should.eventually.be.false,
    ]);
  });

  ///////////////////////////////// Check quick pick field for all areas /////////////////////////////////////////////////

  it('Select Area A from Betslip', function () {
    return this.app.client.click(elements.KinoBetslipAreaA).should.eventually.be.fulfilled;
  });

  it('Check quick pick field', function () {
    return this.app.client.getValue(elements.KinoQuickPickInput).should.eventually.be.equal('6');
  });

  it('Select Area B from Betslip', function () {
    return this.app.client.click(elements.KinoBetslipAreaB).should.eventually.be.fulfilled;
  });

  it('Check quick pick field', function () {
    return this.app.client.getValue(elements.KinoQuickPickInput).should.eventually.be.equal('1');
  });

  it('Select Area C from Betslip', function () {
    return this.app.client.click(elements.KinoBetslipAreaC).should.eventually.be.fulfilled;
  });

  it('Check quick pick field', function () {
    return this.app.client.getValue(elements.KinoQuickPickInput).should.eventually.be.equal('1');
  });

  it('Select Area D from Betslip', function () {
    return this.app.client.click(elements.KinoBetslipAreaD).should.eventually.be.fulfilled;
  });

  it('Check quick pick field', function () {
    return this.app.client.getValue(elements.KinoQuickPickInput).should.eventually.be.equal('1');
  });

  it('Select Area E from Betslip', function () {
    return this.app.client.click(elements.KinoBetslipAreaE).should.eventually.be.fulfilled;
  });

  it('Check quick pick field', function () {
    return this.app.client.getValue(elements.KinoQuickPickInput).should.eventually.be.equal('1');
  });

  it('Select Area F from Betslip', function () {
    return this.app.client.click(elements.KinoBetslipAreaF).should.eventually.be.fulfilled;
  });

  it('Check quick pick field', function () {
    return this.app.client.getValue(elements.KinoQuickPickInput).should.eventually.be.equal('1');
  });

  ///////////////// Select Clear All and check that everything is cleared if player selects finally yes /////////////////////

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
      this.app.client.isVisible(elements.KinoBetslipAreaB).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaC).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaD).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaE).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAreaF).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBetslipAddBet).should.eventually.be.true,
      this.app.client.getText(elements.KinoOddEvenBtnAmount).should.eventually.be.equal(''),
      this.app.client.getValue(elements.KinoOddEven).should.eventually.be.equal(''),
      this.app.client.getText(elements.KinoColumnsBtnAmount).should.eventually.be.equal(''),
      this.app.client.getValue(elements.KinoColumns).should.eventually.be.equal(''),
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

  it('Check Kino Bonus field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.KinoBonusField).should.eventually.be.false,
      this.app.client.isVisible(elements.KinoBonusCheckBox).should.eventually.be.true,
      this.app.client.isVisible(elements.KinoBonusImg).should.eventually.be.true,
      this.app.client.getValue(elements.KinoBonusCheckBox).should.eventually.be.equal('on'),
    ]);
  });

  it('Check no game numbers are selected', function () {
    return Promise.all([
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

  it('Check value of consecutive draws fields calculator', function () {
    return this.app.client.getValue(elements.KinoBetConsDrawsInput).should.eventually.be.equal('1');
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

  ///////////////////////////////////////////////////// Exit game - Return to Lobby //////////////////////////////////////

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
