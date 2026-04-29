const { Application } = require('spectron')
const browserWindow = require('electron').remote
const path = require('path')
var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')
var mochaclean = require('mocha-clean')
chai.use(chaiAsPromised)
chai.should()
let baseDir = path.join(__dirname, './../main.js')
let electronBinary = path.join(baseDir, '../../../release/opap-lottery-games-win32-x64', 'opap-lottery-games')
var elements = require('./../PowerspinElements.js')
const {exec} = require("child_process")

////////////////////////////////////////// Check functionality of Betting Amount field ////////////////////////////////

describe('TC PowerspinAdditionalMarketBettingAmount.js: Check functionality of Betting Amount field', function () {
  beforeEach(function (done) {
    setTimeout(function () {
      done()
    }, 1200)
  })

  ////////////////////////////////////////// Launch Application (electron.exe) ///////////////////////////////////////////

  it('Launch Application', function () {
    this.timeout(30000)
    if (process.platform === 'win32') {
      electronBinary += '.exe'
    }

    this.app = new Application({
      path: electronBinary,
    })
    return this.app.start()
  })

  /////////////////////////////////////////// Language is default set to GR //////////////////////////////////////////////

  /////////////////////////////////////////// Select PowerSpin game from Lobby ////////////////////////////////////////////////

  it('Select PowerSpin game from Lobby', function () {
    return this.app.client.click(elements.LobbyPowerspin).should.eventually.be.fulfilled
  })

  it('Check Additional Markets game Inactive', async function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAdditionalMarketsTxt).should.eventually.be.equal('ΕΠΙΠΛΕΟΝ ΑΓΟΡΕΣ'),
      this.app.client.isVisible(elements.PowerspinAdditionalMarketsInactive).should.eventually.be.true, // inactive true
    ])
  })

  ///////////////////////////////////////// Select Additional Markets game /////////////////////////////////////

  it('Select Additional Markets game', async function () {
    return this.app.client.click(elements.PowerspinAdditionalMarketsTxt).should.eventually.be.fulfilled
  })

  it('Check Additional Markets game Active', async function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAdditionalMarketsTxt).should.eventually.be.equal('ΕΠΙΠΛΕΟΝ ΑΓΟΡΕΣ'),
      this.app.client.isVisible(elements.PowerspinAdditionalMarketsActive).should.eventually.be.true, // active true
    ])
  })

  /////////////////////////////////////////// Check Place bet functionality ///////////////////////////////////////

  it('Select numbers', function () {
    return Promise.all([
      this.app.client.click(elements.PowerspinAMNumber1).should.eventually.be.fulfilled,
      this.app.client.click(elements.PowerspinAMNumber7).should.eventually.be.fulfilled,
      this.app.client.click(elements.PowerspinAMNumber18).should.eventually.be.fulfilled,
    ])
  })

  it('Select Wheel Symbol', function () {
    return this.app.client.click(elements.PowerspinAMWheelSymbolNoneBtn).should.eventually.be.fulfilled
  })

  it('Select Wheel Number 2', function () {
    return this.app.client.click(elements.PowerspinAMWheelNumber2WheelsBtn).should.eventually.be.fulfilled
  })

  it('Select Wheel Number 3', function () {
    return this.app.client.click(elements.PowerspinAMWheelNumber3WheelsBtn).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Numbers', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersWhiteLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Enabled),
    ])
  })

  it('Check betting amount field for Wheel with Symbol', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolWhiteLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Enabled),
    ])
  })

  it('Check betting amount field for Wheel with Number', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberWhiteLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Enabled),
    ])
  })

  ////////////////////////////////////////// select Bet Multiplier 1€ //////////////////////////////////////////////////////

  it('Select Bet Multiplier Number 1€ ----------', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierNumbersBtnLbl2).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Numbers', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersWhiteLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Enabled),
    ])
  })

  it('Select Bet Multiplier Wheel with Symbol', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl2).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Wheel with Symbol', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolWhiteLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Enabled),
    ])
  })

  it('Select Bet Multiplier Wheel with Number', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl2).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Wheel with Number', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberWhiteLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Enabled),
    ])
  })

  it('Check cost and selection on sidescreen', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMSidescreenNumbers).should.eventually.be.equal('ΠΟΣΟ: 4.5€'),
      this.app.client.getText(elements.PowerspinAMSidescreenNumbersTxt).should.eventually.be.equal('ΑΡΙΘΜΟΣ (ΟΤ) :'),
      this.app.client.getText(elements.PowerspinAMSidescreenNumbersContent).should.eventually.be.equal('1\n7\n18'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenNumbersClear).should.eventually.be.true,

      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbol).should.eventually.be.equal('ΠΟΣΟ: 1.5€'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbolTxt).should.eventually.be.equal('ΣΥΜΒΟΛΟ ΣΕ :'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbolContent).should.eventually.be.equal('ΚΑΝΕΝΑΝ ΤΡΟΧΟ'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenWheelSymbolClear).should.eventually.be.true,

      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumber).should.eventually.be.equal('ΠΟΣΟ: 3€'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumberTxt).should.eventually.be.equal('ΙΔΙΟΣ ΑΡΙΘΜΟΣ ΣΕ :'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumberContent).should.eventually.be.equal('2 ΤΡΟΧΟΥΣ\n3 ΤΡΟΧΟΥΣ'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenWheelNumberClear).should.eventually.be.true,
    ])
  })

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.PowerspinBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.PowerspinBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('true'),
      // this.app.client.isVisible(elements.PowerspinBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.PowerspinBetslipSubmitLbl).should.eventually.be.equal('ΑΠΟΔΟΧΗ'),
      this.app.client.getText(elements.PowerspinBetslipCostLbl).should.eventually.be.equal('ΚΟΣΤΟΣ ΔΕΛΤΙΟΥ\n9€'),
      this.app.client.getText(elements.PowerspinBetslipCost).should.eventually.be.equal('9€'),
    ])
  })

  ////////////////////////////////////////// select Bet Multiplier 2€ //////////////////////////////////////////////////////

  it('Select Bet Multiplier Number 2€ ----------', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierNumbersBtnLbl3).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Numbers', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersWhiteLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Enabled),
    ])
  })

  it('Select Bet Multiplier Wheel with Symbol', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl3).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Wheel with Symbol', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolWhiteLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Enabled),
    ])
  })

  it('Select Bet Multiplier Wheel with Number', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl3).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Wheel with Number', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberWhiteLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Enabled),
    ])
  })

  it('Check cost and selection on sidescreen', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMSidescreenNumbers).should.eventually.be.equal('ΠΟΣΟ: 10.5€'),
      this.app.client.getText(elements.PowerspinAMSidescreenNumbersTxt).should.eventually.be.equal('ΑΡΙΘΜΟΣ (ΟΤ) :'),
      this.app.client.getText(elements.PowerspinAMSidescreenNumbersContent).should.eventually.be.equal('1\n7\n18'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenNumbersClear).should.eventually.be.true,

      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbol).should.eventually.be.equal('ΠΟΣΟ: 3.5€'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbolTxt).should.eventually.be.equal('ΣΥΜΒΟΛΟ ΣΕ :'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbolContent).should.eventually.be.equal('ΚΑΝΕΝΑΝ ΤΡΟΧΟ'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenWheelSymbolClear).should.eventually.be.true,

      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumber).should.eventually.be.equal('ΠΟΣΟ: 7€'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumberTxt).should.eventually.be.equal('ΙΔΙΟΣ ΑΡΙΘΜΟΣ ΣΕ :'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumberContent).should.eventually.be.equal('2 ΤΡΟΧΟΥΣ\n3 ΤΡΟΧΟΥΣ'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenWheelNumberClear).should.eventually.be.true,
    ])
  })

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.PowerspinBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.PowerspinBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('true'),
      // this.app.client.isVisible(elements.PowerspinBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.PowerspinBetslipSubmitLbl).should.eventually.be.equal('ΑΠΟΔΟΧΗ'),
      this.app.client.getText(elements.PowerspinBetslipCostLbl).should.eventually.be.equal('ΚΟΣΤΟΣ ΔΕΛΤΙΟΥ\n21€'),
      this.app.client.getText(elements.PowerspinBetslipCost).should.eventually.be.equal('21€'),
    ])
  })

  ////////////////////////////////////////// select Bet Multiplier 3€ //////////////////////////////////////////////////////

  it('Select Bet Multiplier Number 3€ ----------', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierNumbersBtnLbl4).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Numbers', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersWhiteLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Enabled),
    ])
  })

  it('Select Bet Multiplier Wheel with Symbol', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl4).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Wheel with Symbol', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolWhiteLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Enabled),
    ])
  })

  it('Select Bet Multiplier Wheel with Number', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl4).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Wheel with Number', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberWhiteLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Enabled),
    ])
  })

  it('Check cost and selection on sidescreen', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMSidescreenNumbers).should.eventually.be.equal('ΠΟΣΟ: 19.5€'),
      this.app.client.getText(elements.PowerspinAMSidescreenNumbersTxt).should.eventually.be.equal('ΑΡΙΘΜΟΣ (ΟΤ) :'),
      this.app.client.getText(elements.PowerspinAMSidescreenNumbersContent).should.eventually.be.equal('1\n7\n18'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenNumbersClear).should.eventually.be.true,

      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbol).should.eventually.be.equal('ΠΟΣΟ: 6.5€'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbolTxt).should.eventually.be.equal('ΣΥΜΒΟΛΟ ΣΕ :'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbolContent).should.eventually.be.equal('ΚΑΝΕΝΑΝ ΤΡΟΧΟ'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenWheelSymbolClear).should.eventually.be.true,

      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumber).should.eventually.be.equal('ΠΟΣΟ: 13€'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumberTxt).should.eventually.be.equal('ΙΔΙΟΣ ΑΡΙΘΜΟΣ ΣΕ :'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumberContent).should.eventually.be.equal('2 ΤΡΟΧΟΥΣ\n3 ΤΡΟΧΟΥΣ'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenWheelNumberClear).should.eventually.be.true,
    ])
  })

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.PowerspinBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.PowerspinBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('true'),
      // this.app.client.isVisible(elements.PowerspinBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.PowerspinBetslipSubmitLbl).should.eventually.be.equal('ΑΠΟΔΟΧΗ'),
      this.app.client.getText(elements.PowerspinBetslipCostLbl).should.eventually.be.equal('ΚΟΣΤΟΣ ΔΕΛΤΙΟΥ\n39€'),
      this.app.client.getText(elements.PowerspinBetslipCost).should.eventually.be.equal('39€'),
    ])
  })

  ////////////////////////////////////////// select Bet Multiplier 5€ //////////////////////////////////////////////////////

  it('Select Bet Multiplier Number 5€ ----------', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierNumbersBtnLbl5).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Numbers', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersWhiteLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Enabled),
    ])
  })

  it('Select Bet Multiplier Wheel with Symbol', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl5).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Wheel with Symbol', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolWhiteLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Enabled),
    ])
  })

  it('Select Bet Multiplier Wheel with Number', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl5).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Wheel with Number', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberWhiteLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Enabled),
    ])
  })

  it('Check cost and selection on sidescreen', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMSidescreenNumbers).should.eventually.be.equal('ΠΟΣΟ: 34.5€'),
      this.app.client.getText(elements.PowerspinAMSidescreenNumbersTxt).should.eventually.be.equal('ΑΡΙΘΜΟΣ (ΟΤ) :'),
      this.app.client.getText(elements.PowerspinAMSidescreenNumbersContent).should.eventually.be.equal('1\n7\n18'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenNumbersClear).should.eventually.be.true,

      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbol).should.eventually.be.equal('ΠΟΣΟ: 11.5€'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbolTxt).should.eventually.be.equal('ΣΥΜΒΟΛΟ ΣΕ :'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbolContent).should.eventually.be.equal('ΚΑΝΕΝΑΝ ΤΡΟΧΟ'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenWheelSymbolClear).should.eventually.be.true,

      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumber).should.eventually.be.equal('ΠΟΣΟ: 23€'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumberTxt).should.eventually.be.equal('ΙΔΙΟΣ ΑΡΙΘΜΟΣ ΣΕ :'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumberContent).should.eventually.be.equal('2 ΤΡΟΧΟΥΣ\n3 ΤΡΟΧΟΥΣ'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenWheelNumberClear).should.eventually.be.true,
    ])
  })

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.PowerspinBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.PowerspinBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('true'),
      // this.app.client.isVisible(elements.PowerspinBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.PowerspinBetslipSubmitLbl).should.eventually.be.equal('ΑΠΟΔΟΧΗ'),
      this.app.client.getText(elements.PowerspinBetslipCostLbl).should.eventually.be.equal('ΚΟΣΤΟΣ ΔΕΛΤΙΟΥ\n69€'),
      this.app.client.getText(elements.PowerspinBetslipCost).should.eventually.be.equal('69€'),
    ])
  })

  ////////////////////////////////////////// select Bet Multiplier 10€ //////////////////////////////////////////////////////

  it('Select Bet Multiplier Number 10€ ----------', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierNumbersBtnLbl6).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Numbers', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersWhiteLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Enabled),
    ])
  })

  it('Select Bet Multiplier Wheel with Symbol', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl6).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Wheel with Symbol', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolWhiteLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Enabled),
    ])
  })

  it('Select Bet Multiplier Wheel with Number', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl6).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Wheel with Number', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberWhiteLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Enabled),
    ])
  })

  it('Check cost and selection on sidescreen', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMSidescreenNumbers).should.eventually.be.equal('ΠΟΣΟ: 64.5€'),
      this.app.client.getText(elements.PowerspinAMSidescreenNumbersTxt).should.eventually.be.equal('ΑΡΙΘΜΟΣ (ΟΤ) :'),
      this.app.client.getText(elements.PowerspinAMSidescreenNumbersContent).should.eventually.be.equal('1\n7\n18'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenNumbersClear).should.eventually.be.true,

      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbol).should.eventually.be.equal('ΠΟΣΟ: 21.5€'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbolTxt).should.eventually.be.equal('ΣΥΜΒΟΛΟ ΣΕ :'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbolContent).should.eventually.be.equal('ΚΑΝΕΝΑΝ ΤΡΟΧΟ'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenWheelSymbolClear).should.eventually.be.true,

      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumber).should.eventually.be.equal('ΠΟΣΟ: 43€'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumberTxt).should.eventually.be.equal('ΙΔΙΟΣ ΑΡΙΘΜΟΣ ΣΕ :'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumberContent).should.eventually.be.equal('2 ΤΡΟΧΟΥΣ\n3 ΤΡΟΧΟΥΣ'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenWheelNumberClear).should.eventually.be.true,
    ])
  })

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.PowerspinBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.PowerspinBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('true'),
      // this.app.client.isVisible(elements.PowerspinBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.PowerspinBetslipSubmitLbl).should.eventually.be.equal('ΑΠΟΔΟΧΗ'),
      this.app.client.getText(elements.PowerspinBetslipCostLbl).should.eventually.be.equal('ΚΟΣΤΟΣ ΔΕΛΤΙΟΥ\n129€'),
      this.app.client.getText(elements.PowerspinBetslipCost).should.eventually.be.equal('129€'),
    ])
  })

  ////////////////////////////////////////// select Bet Multiplier 15€ //////////////////////////////////////////////////////

  it('Select Bet Multiplier Number 15€ ----------', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierNumbersBtnLbl7).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Numbers', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersWhiteLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Enabled),
    ])
  })

  it('Select Bet Multiplier Wheel with Symbol', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl7).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Wheel with Symbol', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolWhiteLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Enabled),
    ])
  })

  it('Select Bet Multiplier Wheel with Number', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl7).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Wheel with Number', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberWhiteLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Enabled),
    ])
  })

  it('Check cost and selection on sidescreen', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMSidescreenNumbers).should.eventually.be.equal('ΠΟΣΟ: 109.5€'),
      this.app.client.getText(elements.PowerspinAMSidescreenNumbersTxt).should.eventually.be.equal('ΑΡΙΘΜΟΣ (ΟΤ) :'),
      this.app.client.getText(elements.PowerspinAMSidescreenNumbersContent).should.eventually.be.equal('1\n7\n18'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenNumbersClear).should.eventually.be.true,

      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbol).should.eventually.be.equal('ΠΟΣΟ: 36.5€'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbolTxt).should.eventually.be.equal('ΣΥΜΒΟΛΟ ΣΕ :'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbolContent).should.eventually.be.equal('ΚΑΝΕΝΑΝ ΤΡΟΧΟ'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenWheelSymbolClear).should.eventually.be.true,

      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumber).should.eventually.be.equal('ΠΟΣΟ: 73€'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumberTxt).should.eventually.be.equal('ΙΔΙΟΣ ΑΡΙΘΜΟΣ ΣΕ :'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumberContent).should.eventually.be.equal('2 ΤΡΟΧΟΥΣ\n3 ΤΡΟΧΟΥΣ'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenWheelNumberClear).should.eventually.be.true,
    ])
  })

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.PowerspinBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.PowerspinBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('true'),
      // this.app.client.isVisible(elements.PowerspinBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.PowerspinBetslipSubmitLbl).should.eventually.be.equal('ΑΠΟΔΟΧΗ'),
      this.app.client.getText(elements.PowerspinBetslipCostLbl).should.eventually.be.equal('ΚΟΣΤΟΣ ΔΕΛΤΙΟΥ\n219€'),
      this.app.client.getText(elements.PowerspinBetslipCost).should.eventually.be.equal('219€'),
    ])
  })

  ////////////////////////////////////////// select Bet Multiplier 20€ //////////////////////////////////////////////////////

  it('Select Bet Multiplier Number 20€ ----------', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierNumbersBtnLbl8).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Numbers', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersWhiteLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Enabled),
    ])
  })

  it('Select Bet Multiplier Wheel with Symbol', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl8).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Wheel with Symbol', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolWhiteLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Enabled),
    ])
  })

  it('Select Bet Multiplier Wheel with Number', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl8).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Wheel with Number', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberWhiteLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Enabled),
    ])
  })

  it('Check cost and selection on sidescreen', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMSidescreenNumbers).should.eventually.be.equal('ΠΟΣΟ: 169.5€'),
      this.app.client.getText(elements.PowerspinAMSidescreenNumbersTxt).should.eventually.be.equal('ΑΡΙΘΜΟΣ (ΟΤ) :'),
      this.app.client.getText(elements.PowerspinAMSidescreenNumbersContent).should.eventually.be.equal('1\n7\n18'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenNumbersClear).should.eventually.be.true,

      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbol).should.eventually.be.equal('ΠΟΣΟ: 56.5€'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbolTxt).should.eventually.be.equal('ΣΥΜΒΟΛΟ ΣΕ :'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbolContent).should.eventually.be.equal('ΚΑΝΕΝΑΝ ΤΡΟΧΟ'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenWheelSymbolClear).should.eventually.be.true,

      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumber).should.eventually.be.equal('ΠΟΣΟ: 113€'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumberTxt).should.eventually.be.equal('ΙΔΙΟΣ ΑΡΙΘΜΟΣ ΣΕ :'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumberContent).should.eventually.be.equal('2 ΤΡΟΧΟΥΣ\n3 ΤΡΟΧΟΥΣ'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenWheelNumberClear).should.eventually.be.true,
    ])
  })

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.PowerspinBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.PowerspinBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('true'),
      // this.app.client.isVisible(elements.PowerspinBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.PowerspinBetslipSubmitLbl).should.eventually.be.equal('ΑΠΟΔΟΧΗ'),
      this.app.client.getText(elements.PowerspinBetslipCostLbl).should.eventually.be.equal('ΚΟΣΤΟΣ ΔΕΛΤΙΟΥ\n339€'),
      this.app.client.getText(elements.PowerspinBetslipCost).should.eventually.be.equal('339€'),
    ])
  })

  ////////////////////////////////////////// select Bet Multiplier 25€ //////////////////////////////////////////////////////

  it('Select Bet Multiplier Number 25€ ----------', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierNumbersBtnLbl9).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Numbers', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersWhiteLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Enabled),
    ])
  })

  it('Select Bet Multiplier Wheel with Symbol', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl9).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Wheel with Symbol', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolWhiteLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Enabled),
    ])
  })

  it('Select Bet Multiplier Wheel with Number', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl9).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Wheel with Number', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberWhiteLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Enabled),
    ])
  })

  it('Check cost and selection on sidescreen', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMSidescreenNumbers).should.eventually.be.equal('ΠΟΣΟ: 244.5€'),
      this.app.client.getText(elements.PowerspinAMSidescreenNumbersTxt).should.eventually.be.equal('ΑΡΙΘΜΟΣ (ΟΤ) :'),
      this.app.client.getText(elements.PowerspinAMSidescreenNumbersContent).should.eventually.be.equal('1\n7\n18'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenNumbersClear).should.eventually.be.true,

      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbol).should.eventually.be.equal('ΠΟΣΟ: 81.5€'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbolTxt).should.eventually.be.equal('ΣΥΜΒΟΛΟ ΣΕ :'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbolContent).should.eventually.be.equal('ΚΑΝΕΝΑΝ ΤΡΟΧΟ'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenWheelSymbolClear).should.eventually.be.true,

      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumber).should.eventually.be.equal('ΠΟΣΟ: 163€'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumberTxt).should.eventually.be.equal('ΙΔΙΟΣ ΑΡΙΘΜΟΣ ΣΕ :'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumberContent).should.eventually.be.equal('2 ΤΡΟΧΟΥΣ\n3 ΤΡΟΧΟΥΣ'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenWheelNumberClear).should.eventually.be.true,
    ])
  })

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.PowerspinBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.PowerspinBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('true'),
      // this.app.client.isVisible(elements.PowerspinBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.PowerspinBetslipSubmitLbl).should.eventually.be.equal('ΑΠΟΔΟΧΗ'),
      this.app.client.getText(elements.PowerspinBetslipCostLbl).should.eventually.be.equal('ΚΟΣΤΟΣ ΔΕΛΤΙΟΥ\n489€'),
      this.app.client.getText(elements.PowerspinBetslipCost).should.eventually.be.equal('489€'),
    ])
  })

  ////////////////////////////////////////// select Bet Multiplier 30€ //////////////////////////////////////////////////////

  it('Select Bet Multiplier Number 30€ ----------', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierNumbersBtnLbl10).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Numbers', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersWhiteLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Enabled),
    ])
  })

  it('Select Bet Multiplier Wheel with Symbol', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl10).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Wheel with Symbol', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolWhiteLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Enabled),
    ])
  })

  it('Select Bet Multiplier Wheel with Number', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl10).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Wheel with Number', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberWhiteLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Enabled),
    ])
  })

  it('Check cost and selection on sidescreen', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMSidescreenNumbers).should.eventually.be.equal('ΠΟΣΟ: 334.5€'),
      this.app.client.getText(elements.PowerspinAMSidescreenNumbersTxt).should.eventually.be.equal('ΑΡΙΘΜΟΣ (ΟΤ) :'),
      this.app.client.getText(elements.PowerspinAMSidescreenNumbersContent).should.eventually.be.equal('1\n7\n18'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenNumbersClear).should.eventually.be.true,

      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbol).should.eventually.be.equal('ΠΟΣΟ: 111.5€'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbolTxt).should.eventually.be.equal('ΣΥΜΒΟΛΟ ΣΕ :'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbolContent).should.eventually.be.equal('ΚΑΝΕΝΑΝ ΤΡΟΧΟ'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenWheelSymbolClear).should.eventually.be.true,

      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumber).should.eventually.be.equal('ΠΟΣΟ: 223€'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumberTxt).should.eventually.be.equal('ΙΔΙΟΣ ΑΡΙΘΜΟΣ ΣΕ :'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumberContent).should.eventually.be.equal('2 ΤΡΟΧΟΥΣ\n3 ΤΡΟΧΟΥΣ'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenWheelNumberClear).should.eventually.be.true,
    ])
  })

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.PowerspinBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.PowerspinBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('true'),
      // this.app.client.isVisible(elements.PowerspinBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.PowerspinBetslipSubmitLbl).should.eventually.be.equal('ΑΠΟΔΟΧΗ'),
      this.app.client.getText(elements.PowerspinBetslipCostLbl).should.eventually.be.equal('ΚΟΣΤΟΣ ΔΕΛΤΙΟΥ\n669€'),
      this.app.client.getText(elements.PowerspinBetslipCost).should.eventually.be.equal('669€'),
    ])
  })

  ////////////////////////////////////////// select Bet Multiplier 40€ //////////////////////////////////////////////////////

  it('Select Bet Multiplier Number 40€ ----------', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierNumbersBtnLbl11).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Numbers', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersWhiteLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Enabled),
    ])
  })

  it('Select Bet Multiplier Wheel with Symbol', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl11).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Wheel with Symbol', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolWhiteLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Enabled),
    ])
  })

  it('Select Bet Multiplier Wheel with Number', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl11).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Wheel with Number', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberWhiteLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Enabled),
    ])
  })

  it('Check cost and selection on sidescreen', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMSidescreenNumbers).should.eventually.be.equal('ΠΟΣΟ: 454.5€'),
      this.app.client.getText(elements.PowerspinAMSidescreenNumbersTxt).should.eventually.be.equal('ΑΡΙΘΜΟΣ (ΟΤ) :'),
      this.app.client.getText(elements.PowerspinAMSidescreenNumbersContent).should.eventually.be.equal('1\n7\n18'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenNumbersClear).should.eventually.be.true,

      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbol).should.eventually.be.equal('ΠΟΣΟ: 151.5€'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbolTxt).should.eventually.be.equal('ΣΥΜΒΟΛΟ ΣΕ :'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbolContent).should.eventually.be.equal('ΚΑΝΕΝΑΝ ΤΡΟΧΟ'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenWheelSymbolClear).should.eventually.be.true,

      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumber).should.eventually.be.equal('ΠΟΣΟ: 303€'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumberTxt).should.eventually.be.equal('ΙΔΙΟΣ ΑΡΙΘΜΟΣ ΣΕ :'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumberContent).should.eventually.be.equal('2 ΤΡΟΧΟΥΣ\n3 ΤΡΟΧΟΥΣ'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenWheelNumberClear).should.eventually.be.true,
    ])
  })

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.PowerspinBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.PowerspinBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('true'),
      // this.app.client.isVisible(elements.PowerspinBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.PowerspinBetslipSubmitLbl).should.eventually.be.equal('ΑΠΟΔΟΧΗ'),
      this.app.client.getText(elements.PowerspinBetslipCostLbl).should.eventually.be.equal('ΚΟΣΤΟΣ ΔΕΛΤΙΟΥ\n909€'),
      this.app.client.getText(elements.PowerspinBetslipCost).should.eventually.be.equal('909€'),
    ])
  })

  ////////////////////////////////////////// select Bet Multiplier 50€ //////////////////////////////////////////////////////

  it('Select Bet Multiplier Number 50€ ----------', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierNumbersBtnLbl12).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Numbers', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersWhiteLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Enabled),
    ])
  })

  it('Select Bet Multiplier Wheel with Symbol', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl12).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Wheel with Symbol', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolWhiteLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Enabled),
    ])
  })

  it('Select Bet Multiplier Wheel with Number', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl12).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Wheel with Number', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberWhiteLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Enabled),
    ])
  })

  it('Check cost and selection on sidescreen', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMSidescreenNumbers).should.eventually.be.equal('ΠΟΣΟ: 604.5€'),
      this.app.client.getText(elements.PowerspinAMSidescreenNumbersTxt).should.eventually.be.equal('ΑΡΙΘΜΟΣ (ΟΤ) :'),
      this.app.client.getText(elements.PowerspinAMSidescreenNumbersContent).should.eventually.be.equal('1\n7\n18'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenNumbersClear).should.eventually.be.true,

      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbol).should.eventually.be.equal('ΠΟΣΟ: 201.5€'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbolTxt).should.eventually.be.equal('ΣΥΜΒΟΛΟ ΣΕ :'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbolContent).should.eventually.be.equal('ΚΑΝΕΝΑΝ ΤΡΟΧΟ'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenWheelSymbolClear).should.eventually.be.true,

      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumber).should.eventually.be.equal('ΠΟΣΟ: 403€'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumberTxt).should.eventually.be.equal('ΙΔΙΟΣ ΑΡΙΘΜΟΣ ΣΕ :'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumberContent).should.eventually.be.equal('2 ΤΡΟΧΟΥΣ\n3 ΤΡΟΧΟΥΣ'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenWheelNumberClear).should.eventually.be.true,
    ])
  })

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.PowerspinBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.PowerspinBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('true'),
      // this.app.client.isVisible(elements.PowerspinBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.PowerspinBetslipSubmitLbl).should.eventually.be.equal('ΑΠΟΔΟΧΗ'),
      this.app.client.getText(elements.PowerspinBetslipCostLbl).should.eventually.be.equal('ΚΟΣΤΟΣ ΔΕΛΤΙΟΥ\n1209€'),
      this.app.client.getText(elements.PowerspinBetslipCost).should.eventually.be.equal('1209€'),
    ])
  })

  ////////////////////////////////////////// select Bet Multiplier 100€ //////////////////////////////////////////////////////

  it('Select Bet Multiplier Number 100€ ----------', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierNumbersBtnLbl13).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Numbers', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersWhiteLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Enabled),
    ])
  })

  it('Select Bet Multiplier Wheel with Symbol', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl13).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Wheel with Symbol', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolWhiteLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Enabled),
    ])
  })

  it('Select Bet Multiplier Wheel with Number', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl13).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Wheel with Number', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberWhiteLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Enabled),
    ])
  })

  it('Check cost and selection on sidescreen', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMSidescreenNumbers).should.eventually.be.equal('ΠΟΣΟ: 904.5€'),
      this.app.client.getText(elements.PowerspinAMSidescreenNumbersTxt).should.eventually.be.equal('ΑΡΙΘΜΟΣ (ΟΤ) :'),
      this.app.client.getText(elements.PowerspinAMSidescreenNumbersContent).should.eventually.be.equal('1\n7\n18'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenNumbersClear).should.eventually.be.true,

      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbol).should.eventually.be.equal('ΠΟΣΟ: 301.5€'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbolTxt).should.eventually.be.equal('ΣΥΜΒΟΛΟ ΣΕ :'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbolContent).should.eventually.be.equal('ΚΑΝΕΝΑΝ ΤΡΟΧΟ'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenWheelSymbolClear).should.eventually.be.true,

      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumber).should.eventually.be.equal('ΠΟΣΟ: 603€'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumberTxt).should.eventually.be.equal('ΙΔΙΟΣ ΑΡΙΘΜΟΣ ΣΕ :'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumberContent).should.eventually.be.equal('2 ΤΡΟΧΟΥΣ\n3 ΤΡΟΧΟΥΣ'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenWheelNumberClear).should.eventually.be.true,
    ])
  })

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.PowerspinBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.PowerspinBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('true'),
      // this.app.client.isVisible(elements.PowerspinBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.PowerspinBetslipSubmitLbl).should.eventually.be.equal('ΑΠΟΔΟΧΗ'),
      this.app.client.getText(elements.PowerspinBetslipCostLbl).should.eventually.be.equal('ΚΟΣΤΟΣ ΔΕΛΤΙΟΥ\n1809€'),
      this.app.client.getText(elements.PowerspinBetslipCost).should.eventually.be.equal('1809€'),
    ])
  })

  ////////////////////////////////////////// select Bet Multiplier 200€ //////////////////////////////////////////////////////

  it('Select Bet Multiplier Number 200€ ----------', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierNumbersBtnLbl14).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Numbers', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersWhiteLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Enabled),
    ])
  })

  it('Select Bet Multiplier Wheel with Symbol', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl14).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Wheel with Symbol', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolWhiteLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Enabled),
    ])
  })

  it('Select Bet Multiplier Wheel with Number', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl14).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Wheel with Number', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberWhiteLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Enabled),
    ])
  })

  it('Check cost and selection on sidescreen', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMSidescreenNumbers).should.eventually.be.equal('ΠΟΣΟ: 1504.5€'),
      this.app.client.getText(elements.PowerspinAMSidescreenNumbersTxt).should.eventually.be.equal('ΑΡΙΘΜΟΣ (ΟΤ) :'),
      this.app.client.getText(elements.PowerspinAMSidescreenNumbersContent).should.eventually.be.equal('1\n7\n18'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenNumbersClear).should.eventually.be.true,

      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbol).should.eventually.be.equal('ΠΟΣΟ: 501.5€'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbolTxt).should.eventually.be.equal('ΣΥΜΒΟΛΟ ΣΕ :'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbolContent).should.eventually.be.equal('ΚΑΝΕΝΑΝ ΤΡΟΧΟ'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenWheelSymbolClear).should.eventually.be.true,

      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumber).should.eventually.be.equal('ΠΟΣΟ: 1003€'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumberTxt).should.eventually.be.equal('ΙΔΙΟΣ ΑΡΙΘΜΟΣ ΣΕ :'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumberContent).should.eventually.be.equal('2 ΤΡΟΧΟΥΣ\n3 ΤΡΟΧΟΥΣ'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenWheelNumberClear).should.eventually.be.true,
    ])
  })

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.PowerspinBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.PowerspinBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('true'),
      // this.app.client.isVisible(elements.PowerspinBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.PowerspinBetslipSubmitLbl).should.eventually.be.equal('ΑΠΟΔΟΧΗ'),
      this.app.client.getText(elements.PowerspinBetslipCostLbl).should.eventually.be.equal('ΚΟΣΤΟΣ ΔΕΛΤΙΟΥ\n3009€'),
      this.app.client.getText(elements.PowerspinBetslipCost).should.eventually.be.equal('3009€'),
    ])
  })

  ////////////////////////////////////////// select Bet Multiplier 500€ //////////////////////////////////////////////////////

  it('Select Bet Multiplier Number 500€ ----------', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierNumbersBtnLbl15).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Numbers', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersWhiteLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Checked),
    ])
  })

  it('Select Bet Multiplier Wheel with Symbol', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl15).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Wheel with Symbol', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolWhiteLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Checked),
    ])
  })

  it('Select Bet Multiplier Wheel with Number', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl15).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Wheel with Number', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberWhiteLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Checked),
    ])
  })

  it('Check cost and selection on sidescreen', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMSidescreenNumbers).should.eventually.be.equal('ΠΟΣΟ: 3004.5€'),
      this.app.client.getText(elements.PowerspinAMSidescreenNumbersTxt).should.eventually.be.equal('ΑΡΙΘΜΟΣ (ΟΤ) :'),
      this.app.client.getText(elements.PowerspinAMSidescreenNumbersContent).should.eventually.be.equal('1\n7\n18'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenNumbersClear).should.eventually.be.true,

      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbol).should.eventually.be.equal('ΠΟΣΟ: 1001.5€'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbolTxt).should.eventually.be.equal('ΣΥΜΒΟΛΟ ΣΕ :'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbolContent).should.eventually.be.equal('ΚΑΝΕΝΑΝ ΤΡΟΧΟ'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenWheelSymbolClear).should.eventually.be.true,

      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumber).should.eventually.be.equal('ΠΟΣΟ: 2003€'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumberTxt).should.eventually.be.equal('ΙΔΙΟΣ ΑΡΙΘΜΟΣ ΣΕ :'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumberContent).should.eventually.be.equal('2 ΤΡΟΧΟΥΣ\n3 ΤΡΟΧΟΥΣ'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenWheelNumberClear).should.eventually.be.true,
    ])
  })

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.PowerspinBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.PowerspinBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('true'),
      // this.app.client.isVisible(elements.PowerspinBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.PowerspinBetslipSubmitLbl).should.eventually.be.equal('ΑΠΟΔΟΧΗ'),
      this.app.client.getText(elements.PowerspinBetslipCostLbl).should.eventually.be.equal('ΚΟΣΤΟΣ ΔΕΛΤΙΟΥ\n6009€'),
      this.app.client.getText(elements.PowerspinBetslipCost).should.eventually.be.equal('6009€'),
    ])
  })

  it('UnSelect numbers', function () {
    return Promise.all([
      this.app.client.click(elements.PowerspinAMNumber1).should.eventually.be.fulfilled,
      this.app.client.click(elements.PowerspinAMNumber7).should.eventually.be.fulfilled,
      this.app.client.click(elements.PowerspinAMNumber18).should.eventually.be.fulfilled,
    ])
  })

  it('UnSelect Wheel Symbol', function () {
    return this.app.client.click(elements.PowerspinAMWheelSymbolNoneBtn).should.eventually.be.fulfilled
  })

  it('UnSelect Wheel Number 2', function () {
    return this.app.client.click(elements.PowerspinAMWheelNumber2WheelsBtn).should.eventually.be.fulfilled
  })

  it('UnSelect Wheel Number 3', function () {
    return this.app.client.click(elements.PowerspinAMWheelNumber3WheelsBtn).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Numbers', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Disabled),
    ])
  })

  it('Check betting amount field for Wheel with Symbol', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Disabled),
    ])
  })

  it('Check betting amount field for Wheel with Number', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Disabled),
    ])
  })

  it('Check approve and print fields 0', function () {
    return Promise.all([
      this.app.client.isVisible(elements.PowerspinBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.PowerspinBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('true'),
      // this.app.client.isVisible(elements.PowerspinBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.PowerspinBetslipSubmitLbl).should.eventually.be.equal('ΑΠΟΔΟΧΗ'),
      this.app.client.getText(elements.PowerspinBetslipCostLbl).should.eventually.be.equal('ΚΟΣΤΟΣ ΔΕΛΤΙΟΥ\n0€'),
      this.app.client.getText(elements.PowerspinBetslipCost).should.eventually.be.equal('0€'),
    ])
  })

  it('Select numbers', function () {
    return Promise.all([
      this.app.client.click(elements.PowerspinAMNumber1).should.eventually.be.fulfilled,
      this.app.client.click(elements.PowerspinAMNumber7).should.eventually.be.fulfilled,
      this.app.client.click(elements.PowerspinAMNumber18).should.eventually.be.fulfilled,
    ])
  })

  it('Select Wheel Symbol', function () {
    return this.app.client.click(elements.PowerspinAMWheelSymbolNoneBtn).should.eventually.be.fulfilled
  })

  it('Select Wheel Number 2', function () {
    return this.app.client.click(elements.PowerspinAMWheelNumber2WheelsBtn).should.eventually.be.fulfilled
  })

  it('Select Wheel Number 3', function () {
    return this.app.client.click(elements.PowerspinAMWheelNumber3WheelsBtn).should.eventually.be.fulfilled
  })

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.PowerspinBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.PowerspinBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('true'),
      // this.app.client.isVisible(elements.PowerspinBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.PowerspinBetslipSubmitLbl).should.eventually.be.equal('ΑΠΟΔΟΧΗ'),
      this.app.client.getText(elements.PowerspinBetslipCostLbl).should.eventually.be.equal('ΚΟΣΤΟΣ ΔΕΛΤΙΟΥ\n6009€'),
      this.app.client.getText(elements.PowerspinBetslipCost).should.eventually.be.equal('6009€'),
    ])
  })

  it('Unselect for Numbers betting amount 0.5 Euros', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierNumbersBtnLbl1).should.eventually.be.fulfilled
  })

  it('Unselect for Numbers betting amount 1 Euros', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierNumbersBtnLbl2).should.eventually.be.fulfilled
  })

  it('Unselect for Numbers betting amount 2 Euros', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierNumbersBtnLbl3).should.eventually.be.fulfilled
  })

  it('Unselect for Numbers betting amount 3 Euros', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierNumbersBtnLbl4).should.eventually.be.fulfilled
  })

  it('Unselect for Numbers betting amount 5 Euros', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierNumbersBtnLbl5).should.eventually.be.fulfilled
  })

  it('Unselect for Numbers betting amount 10 Euros', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierNumbersBtnLbl6).should.eventually.be.fulfilled
  })

  it('Unselect for Numbers betting amount 15 Euros', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierNumbersBtnLbl7).should.eventually.be.fulfilled
  })

  it('Unselect for Numbers betting amount 20 Euros', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierNumbersBtnLbl8).should.eventually.be.fulfilled
  })

  it('Unselect for Numbers betting amount 25 Euros', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierNumbersBtnLbl9).should.eventually.be.fulfilled
  })

  it('Unselect for Numbers betting amount 30 Euros', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierNumbersBtnLbl10).should.eventually.be.fulfilled
  })

  it('Unselect for Numbers betting amount 40 Euros', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierNumbersBtnLbl11).should.eventually.be.fulfilled
  })

  it('Unselect for Numbers betting amount 50 Euros', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierNumbersBtnLbl12).should.eventually.be.fulfilled
  })

  it('Unselect for Numbers betting amount 100 Euros', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierNumbersBtnLbl13).should.eventually.be.fulfilled
  })

  it('Unselect for Numbers betting amount 200 Euros', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierNumbersBtnLbl14).should.eventually.be.fulfilled
  })

  it('Unselect for Numbers betting amount 500 Euros', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierNumbersBtnLbl15).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Numbers', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersWhiteLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Enabled),
    ])
  })

  it('Unselect for Wheel with Symbol betting amount 0.5 Euros', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl1).should.eventually.be.fulfilled
  })

  it('Unselect for Wheel with Symbol betting amount 1 Euros', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl2).should.eventually.be.fulfilled
  })

  it('Unselect for Wheel with Symbol betting amount 2 Euros', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl3).should.eventually.be.fulfilled
  })

  it('Unselect for Wheel with Symbol betting amount 3 Euros', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl4).should.eventually.be.fulfilled
  })

  it('Unselect for Wheel with Symbol betting amount 5 Euros', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl5).should.eventually.be.fulfilled
  })

  it('Unselect for Wheel with Symbol betting amount 10 Euros', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl6).should.eventually.be.fulfilled
  })

  it('Unselect for Wheel with Symbol betting amount 15 Euros', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl7).should.eventually.be.fulfilled
  })

  it('Unselect for Wheel with Symbol betting amount 20 Euros', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl8).should.eventually.be.fulfilled
  })

  it('Unselect for Wheel with Symbol betting amount 25 Euros', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl9).should.eventually.be.fulfilled
  })

  it('Unselect for Wheel with Symbol betting amount 30 Euros', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl10).should.eventually.be.fulfilled
  })

  it('Unselect for Wheel with Symbol betting amount 40 Euros', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl11).should.eventually.be.fulfilled
  })

  it('Unselect for Wheel with Symbol betting amount 50 Euros', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl12).should.eventually.be.fulfilled
  })

  it('Unselect for Wheel with Symbol betting amount 100 Euros', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl13).should.eventually.be.fulfilled
  })

  it('Unselect for Wheel with Symbol betting amount 200 Euros', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl14).should.eventually.be.fulfilled
  })

  it('Unselect for Wheel with Symbol betting amount 500 Euros', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl15).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Wheel with Symbol', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolWhiteLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Enabled),
    ])
  })

  it('Unselect for Wheel with Number betting amount 0.5 Euros', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl1).should.eventually.be.fulfilled
  })

  it('Unselect for Wheel with Number betting amount 1 Euros', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl2).should.eventually.be.fulfilled
  })

  it('Unselect for Wheel with Number betting amount 2 Euros', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl3).should.eventually.be.fulfilled
  })

  it('Unselect for Wheel with Number betting amount 3 Euros', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl4).should.eventually.be.fulfilled
  })

  it('Unselect for Wheel with Number betting amount 5 Euros', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl5).should.eventually.be.fulfilled
  })

  it('Unselect for Wheel with Number betting amount 10 Euros', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl6).should.eventually.be.fulfilled
  })

  it('Unselect for Wheel with Number betting amount 15 Euros', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl7).should.eventually.be.fulfilled
  })

  it('Unselect for Wheel with Number betting amount 20 Euros', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl8).should.eventually.be.fulfilled
  })

  it('Unselect for Wheel with Number betting amount 25 Euros', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl9).should.eventually.be.fulfilled
  })

  it('Unselect for Wheel with Number betting amount 30 Euros', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl10).should.eventually.be.fulfilled
  })

  it('Unselect for Wheel with Number betting amount 40 Euros', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl11).should.eventually.be.fulfilled
  })

  it('Unselect for Wheel with Number betting amount 50 Euros', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl12).should.eventually.be.fulfilled
  })

  it('Unselect for Wheel with Number betting amount 100 Euros', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl13).should.eventually.be.fulfilled
  })

  it('Unselect for Wheel with Number betting amount 200 Euros', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl14).should.eventually.be.fulfilled
  })

  it('Unselect for Wheel with Number betting amount 500 Euros', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl15).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Wheel with Number', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberWhiteLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Checked),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Enabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Enabled),
    ])
  })

  it('UnSelect numbers', function () {
    return Promise.all([
      this.app.client.click(elements.PowerspinAMNumber1).should.eventually.be.fulfilled,
      this.app.client.click(elements.PowerspinAMNumber7).should.eventually.be.fulfilled,
      this.app.client.click(elements.PowerspinAMNumber18).should.eventually.be.fulfilled,
    ])
  })

  it('UnSelect Wheel Symbol', function () {
    return this.app.client.click(elements.PowerspinAMWheelSymbolNoneBtn).should.eventually.be.fulfilled
  })

  it('UnSelect Wheel Number 2', function () {
    return this.app.client.click(elements.PowerspinAMWheelNumber2WheelsBtn).should.eventually.be.fulfilled
  })

  it('UnSelect Wheel Number 3', function () {
    return this.app.client.click(elements.PowerspinAMWheelNumber3WheelsBtn).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Numbers', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierNumbersBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Disabled),
    ])
  })

  it('Check betting amount field for Wheel with Symbol', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Disabled),
    ])
  })

  it('Check betting amount field for Wheel with Number', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberLbl).should.eventually.be.equal('ΠΟΣΟ (€)'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl1).should.eventually.be.equal('0.5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl2).should.eventually.be.equal('1€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl3).should.eventually.be.equal('2€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl4).should.eventually.be.equal('3€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl5).should.eventually.be.equal('5€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl6).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl7).should.eventually.be.equal('15€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl8).should.eventually.be.equal('20€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl9).should.eventually.be.equal('25€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl10).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl11).should.eventually.be.equal('40€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl12).should.eventually.be.equal('50€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl13).should.eventually.be.equal('100€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl14).should.eventually.be.equal('200€'),
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl15).should.eventually.be.equal('500€'),

      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl1).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn1Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl2).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn2Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl3).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn3Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl4).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn4Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl5).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn5Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl6).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn6Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl7).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn7Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl8).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn8Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl9).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn9Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl10).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn10Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl11).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn11Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl12).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn12Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl13).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn13Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl14).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn14Disabled),
      this.app.client.elements(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl15).getAttribute('class').should.eventually.be.equal(elements.PowerspinAMBetMultiplierBtn15Disabled),
    ])
  })

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.PowerspinBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.PowerspinBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('true'),
      // this.app.client.isVisible(elements.PowerspinBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.PowerspinBetslipSubmitLbl).should.eventually.be.equal('ΑΠΟΔΟΧΗ'),
      this.app.client.getText(elements.PowerspinBetslipCostLbl).should.eventually.be.equal('ΚΟΣΤΟΣ ΔΕΛΤΙΟΥ\n0€'),
      this.app.client.getText(elements.PowerspinBetslipCost).should.eventually.be.equal('0€'),
    ])
  })

  ///////////////////////////////////////////////////// Exit game - Return to Lobby ////////////////////////////////////////

  it('Exit KINO game', function () {
    return this.app.client.click(elements.PowerspinMainMenuBtn).should.eventually.be.fulfilled
  })

  it('Confirm exit KINO game', function () {
    return this.app.client.isVisible(elements.LobbyKino).should.eventually.be.true
    // If nothing is selected, no confirmation is needed.
    // let self=this;
    // return Promise.all
    //     ([this.app.client.elements(elements.KinoModalAMsgLbl).getAttribute('innerText').should.eventually.be.equal('ΕΠΙΣΤΡΟΦΗ ΣΤΟ ΜΕΝΟΥ ΠΑΙΧΝΙΔΙΩΝ'),
    //       this.app.client.elements(elements.KinoModalAMsg).getAttribute('innerText').should.eventually.be.equal('Η επιστροφή στο Μενού Παιχνιδιών θα διαγράψει τις τρέχουσες επιλογές σας, θέλετε να συνεχίσετε;'),
    //       this.app.client.elements(elements.KinoModalAYesBtn).getAttribute('innerText').should.eventually.be.equal('Ναι'),
    //       this.app.client.elements(elements.KinoModalANoBtn).getAttribute('innerText').should.eventually.be.equal('Όχι')])
    //        .then(function(values){
    //        return values[0] && values[1] && values[2] && values[3] && self.app.client.click(elements.KinoModalAYesBtn).should.eventually.be.fulfilled});
  })

  ///////////////////////////////////// Close Application ////////////////////////////////////////////////////////////////

  it('Close Application', function () {
    this.timeout(5000)
    if (this.app && this.app.isRunning()) {
      exec(`taskkill /IM opap-lottery-games.exe /F`)
    }
  })
})
