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
var elements = require('../PowerspinElements.js')
const {exec} = require("child_process")

////////////////////////////////////////// Play Powerspin Columns from Powerspin Page /////////////////////////////////////////////

describe('TC PowerspinAdditionalMarkets_en.js: Powerspin tests - Markets', function () {
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
  /////////////////////////////////////////// Change language to EN //////////////////////////////////////////////////////

  it('Select EN language from KINO standard game', function () {
    return this.app.client.click(elements.LobbyEnBtn).should.eventually.be.fulfilled
  })
  /////////////////////////////////////////// Select PowerSpin game from Lobby ////////////////////////////////////////////////

  it('Select PowerSpin game from Lobby', function () {
    return this.app.client.click(elements.LobbyPowerspin).should.eventually.be.fulfilled
  })

  it('Check Additional Markets game Inactive', async function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAdditionalMarketsTxt).should.eventually.be.equal('EXTRA MARKETS'),
      this.app.client.isVisible(elements.PowerspinAdditionalMarketsInactive).should.eventually.be.true, // inactive true
    ])
  })

  ///////////////////////////////////////// Select Additional Markets game /////////////////////////////////////

  it('Select Additional Markets game', async function () {
    return this.app.client.click(elements.PowerspinAdditionalMarketsTxt).should.eventually.be.fulfilled
  })

  it('Check Additional Markets game Active', async function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAdditionalMarketsTxt).should.eventually.be.equal('EXTRA MARKETS'),
      this.app.client.isVisible(elements.PowerspinAdditionalMarketsActive).should.eventually.be.true, // active true
    ])
  })

  ///////////////////////////////////////// Check functionality of Additional Markets page /////////////////////////////////////

  it('Check Powerspin Additional Markets Numbers area elements', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMNumberTitle).should.eventually.be.equal('NUMBER IN ANY WHEEL'),
      this.app.client.getText(elements.PowerspinAMNumber1).should.eventually.be.equal('1'),
      this.app.client.getText(elements.PowerspinAMNumber2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.PowerspinAMNumber3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.PowerspinAMNumber4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.PowerspinAMNumber5).should.eventually.be.equal('5'),
      this.app.client.getText(elements.PowerspinAMNumber6).should.eventually.be.equal('6'),
      this.app.client.getText(elements.PowerspinAMNumber7).should.eventually.be.equal('7'),
      this.app.client.getText(elements.PowerspinAMNumber8).should.eventually.be.equal('8'),
      this.app.client.getText(elements.PowerspinAMNumber9).should.eventually.be.equal('9'),
      this.app.client.getText(elements.PowerspinAMNumber10).should.eventually.be.equal('10'),
      this.app.client.getText(elements.PowerspinAMNumber11).should.eventually.be.equal('11'),
      this.app.client.getText(elements.PowerspinAMNumber12).should.eventually.be.equal('12'),
      this.app.client.getText(elements.PowerspinAMNumber13).should.eventually.be.equal('13'),
      this.app.client.getText(elements.PowerspinAMNumber14).should.eventually.be.equal('14'),
      this.app.client.getText(elements.PowerspinAMNumber15).should.eventually.be.equal('15'),
      this.app.client.getText(elements.PowerspinAMNumber16).should.eventually.be.equal('16'),
      this.app.client.getText(elements.PowerspinAMNumber17).should.eventually.be.equal('17'),
      this.app.client.getText(elements.PowerspinAMNumber18).should.eventually.be.equal('18'),
      this.app.client.getText(elements.PowerspinAMNumber19).should.eventually.be.equal('19'),
      this.app.client.getText(elements.PowerspinAMNumber20).should.eventually.be.equal('20'),
      this.app.client.getText(elements.PowerspinAMNumber21).should.eventually.be.equal('21'),
      this.app.client.getText(elements.PowerspinAMNumber22).should.eventually.be.equal('22'),
      this.app.client.getText(elements.PowerspinAMNumber23).should.eventually.be.equal('23'),
      this.app.client.getText(elements.PowerspinAMNumber24).should.eventually.be.equal('24'),
    ])
  })

  it('Check Powerspin Additional Markets Wheel Symbol area elements', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMWheelSymbolLbl).should.eventually.be.equal('SYMBOL IN HOW MANY WHEELS?'),
      this.app.client.getText(elements.PowerspinAMWheelSymbolNoneBtn).should.eventually.be.equal('NONE WHEEL'),
      this.app.client.getText(elements.PowerspinAMWheelSymbolAtleast1Btn).should.eventually.be.equal('AT LEAST ONE WHEEL'),
    ])
  })

  it('Check Powerspin Additional Markets Wheel Number area elements', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMWheelNumberLbl).should.eventually.be.equal('SAME NUMBER IN HOW MANY WHEELS?'),
      this.app.client.getText(elements.PowerspinAMWheelNumber2WheelsBtn).should.eventually.be.equal('2 WHEELS'),
      this.app.client.getText(elements.PowerspinAMWheelNumber3WheelsBtn).should.eventually.be.equal('3 WHEELS'),
    ])
  })

  it('Check betting amount field for Numbers', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersLbl).should.eventually.be.equal('BET AMOUNT (€)'),
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
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolLbl).should.eventually.be.equal('BET AMOUNT (€)'),
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
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberLbl).should.eventually.be.equal('BET AMOUNT (€)'),
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
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersWhiteLbl).should.eventually.be.equal('BET AMOUNT (€)'),
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
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolWhiteLbl).should.eventually.be.equal('BET AMOUNT (€)'),
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
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberWhiteLbl).should.eventually.be.equal('BET AMOUNT (€)'),
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

  it('Check cost and selection on sidescreen', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMSidescreenNumbers).should.eventually.be.equal('AMOUNT: 1.5€'),
      this.app.client.getText(elements.PowerspinAMSidescreenNumbersTxt).should.eventually.be.equal('NUMBER (AW) :'),
      this.app.client.getText(elements.PowerspinAMSidescreenNumbersContent).should.eventually.be.equal('1\n7\n18'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenNumbersClear).should.eventually.be.true,

      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbol).should.eventually.be.equal('AMOUNT: 0.5€'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbolTxt).should.eventually.be.equal('SYMBOL IN :'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbolContent).should.eventually.be.equal('NONE'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenWheelSymbolClear).should.eventually.be.true,

      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumber).should.eventually.be.equal('AMOUNT: 1€'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumberTxt).should.eventually.be.equal('SAME NUMBER IN :'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumberContent).should.eventually.be.equal('2 WHEELS\n3 WHEELS'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenWheelNumberClear).should.eventually.be.true,
    ])
  })

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.PowerspinBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.PowerspinBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('true'),
      // this.app.client.isVisible(elements.PowerspinBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.PowerspinBetslipSubmitLbl).should.eventually.be.equal('PLACE BET'),
      this.app.client.getText(elements.PowerspinBetslipCostLbl).should.eventually.be.equal('BETSLIP COST\n3€'),
      this.app.client.getText(elements.PowerspinBetslipCost).should.eventually.be.equal('3€'),
    ])
  })

  ////////////////////////////////////////// select Bet Multiplier 1€ //////////////////////////////////////////////////////

  it('Select Bet Multiplier Number 1€', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierNumbersBtnLbl2).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Numbers', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersWhiteLbl).should.eventually.be.equal('BET AMOUNT (€)'),
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
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolWhiteLbl).should.eventually.be.equal('BET AMOUNT (€)'),
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
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberWhiteLbl).should.eventually.be.equal('BET AMOUNT (€)'),
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
      this.app.client.getText(elements.PowerspinAMSidescreenNumbers).should.eventually.be.equal('AMOUNT: 4.5€'),
      this.app.client.getText(elements.PowerspinAMSidescreenNumbersTxt).should.eventually.be.equal('NUMBER (AW) :'),
      this.app.client.getText(elements.PowerspinAMSidescreenNumbersContent).should.eventually.be.equal('1\n7\n18'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenNumbersClear).should.eventually.be.true,

      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbol).should.eventually.be.equal('AMOUNT: 1.5€'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbolTxt).should.eventually.be.equal('SYMBOL IN :'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbolContent).should.eventually.be.equal('NONE'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenWheelSymbolClear).should.eventually.be.true,

      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumber).should.eventually.be.equal('AMOUNT: 3€'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumberTxt).should.eventually.be.equal('SAME NUMBER IN :'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumberContent).should.eventually.be.equal('2 WHEELS\n3 WHEELS'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenWheelNumberClear).should.eventually.be.true,
    ])
  })

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.PowerspinBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.PowerspinBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('true'),
      // this.app.client.isVisible(elements.PowerspinBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.PowerspinBetslipSubmitLbl).should.eventually.be.equal('PLACE BET'),
      this.app.client.getText(elements.PowerspinBetslipCostLbl).should.eventually.be.equal('BETSLIP COST\n9€'),
      this.app.client.getText(elements.PowerspinBetslipCost).should.eventually.be.equal('9€'),
    ])
  })

  ////////////////////////////////////////// unselect Bet Multiplier 0.5€ and 1€ //////////////////////////////////////////////////////

  it('Unselect Bet Multiplier Number 0.5€ and 1€', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierNumbersBtnLbl1).should.eventually.be.fulfilled
  })

  it('Check approve and print fields 7.5', function () {
    return Promise.all([
      this.app.client.isVisible(elements.PowerspinBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.PowerspinBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('true'),
      // this.app.client.isVisible(elements.PowerspinBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.PowerspinBetslipSubmitLbl).should.eventually.be.equal('PLACE BET'),
      this.app.client.getText(elements.PowerspinBetslipCostLbl).should.eventually.be.equal('BETSLIP COST\n7.5€'),
      this.app.client.getText(elements.PowerspinBetslipCost).should.eventually.be.equal('7.5€'),
    ])
  })

  it('Unselect Bet Multiplier Number 0.5€ and 1€', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierNumbersBtnLbl2).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Numbers', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersWhiteLbl).should.eventually.be.equal('BET AMOUNT (€)'),
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

  it('Select Bet Multiplier Wheel with Symbol 0.5€ and 1€', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl1).should.eventually.be.fulfilled
  })

  it('Check approve and print fields 5.5', function () {
    return Promise.all([
      this.app.client.isVisible(elements.PowerspinBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.PowerspinBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('true'),
      // this.app.client.isVisible(elements.PowerspinBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.PowerspinBetslipSubmitLbl).should.eventually.be.equal('PLACE BET'),
      this.app.client.getText(elements.PowerspinBetslipCostLbl).should.eventually.be.equal('BETSLIP COST\n5.5€'),
      this.app.client.getText(elements.PowerspinBetslipCost).should.eventually.be.equal('5.5€'),
    ])
  })

  it('Select Bet Multiplier Wheel with Symbol 0.5€ and 1€', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelSymbolBtnLbl2).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Wheel with Symbol', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolWhiteLbl).should.eventually.be.equal('BET AMOUNT (€)'),
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

  it('Select Bet Multiplier Wheel with Number 0.5€ and 1€', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl1).should.eventually.be.fulfilled
  })

  it('Check approve and print fields 4', function () {
    return Promise.all([
      this.app.client.isVisible(elements.PowerspinBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.PowerspinBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('true'),
      // this.app.client.isVisible(elements.PowerspinBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.PowerspinBetslipSubmitLbl).should.eventually.be.equal('PLACE BET'),
      this.app.client.getText(elements.PowerspinBetslipCostLbl).should.eventually.be.equal('BETSLIP COST\n4€'),
      this.app.client.getText(elements.PowerspinBetslipCost).should.eventually.be.equal('4€'),
    ])
  })

  it('Select Bet Multiplier Wheel with Number 0.5€ and 1€', function () {
    return this.app.client.click(elements.PowerspinAMBetMultiplierWheelNumberBtnLbl2).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Wheel with Number', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberWhiteLbl).should.eventually.be.equal('BET AMOUNT (€)'),
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

  it('Check cost and selection on sidescreen', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMSidescreenNumbers).should.eventually.be.equal('AMOUNT: 1.5€'),
      this.app.client.getText(elements.PowerspinAMSidescreenNumbersTxt).should.eventually.be.equal('NUMBER (AW) :'),
      this.app.client.getText(elements.PowerspinAMSidescreenNumbersContent).should.eventually.be.equal('1\n7\n18'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenNumbersClear).should.eventually.be.true,

      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbol).should.eventually.be.equal('AMOUNT: 0.5€'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbolTxt).should.eventually.be.equal('SYMBOL IN :'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbolContent).should.eventually.be.equal('NONE'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenWheelSymbolClear).should.eventually.be.true,

      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumber).should.eventually.be.equal('AMOUNT: 1€'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumberTxt).should.eventually.be.equal('SAME NUMBER IN :'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumberContent).should.eventually.be.equal('2 WHEELS\n3 WHEELS'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenWheelNumberClear).should.eventually.be.true,
    ])
  })

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.PowerspinBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.PowerspinBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('true'),
      // this.app.client.isVisible(elements.PowerspinBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.PowerspinBetslipSubmitLbl).should.eventually.be.equal('PLACE BET'),
      this.app.client.getText(elements.PowerspinBetslipCostLbl).should.eventually.be.equal('BETSLIP COST\n3€'),
      this.app.client.getText(elements.PowerspinBetslipCost).should.eventually.be.equal('3€'),
    ])
  })

  ////////////////////////////////////////// Clear all from betslip //////////////////////////////////////////////////////

  it('Select Clear All', function () {
    return this.app.client.click(elements.PowerspinClearAllBtn).should.eventually.be.fulfilled
  })

  it('Confirm Clear All', function () {
    let self = this
    return Promise.all([
      this.app.client.elements(elements.PowerspinModalAMsgLbl).getAttribute('innerText').should.eventually.be.equal('CLEAR BETSLIP'),
      this.app.client.elements(elements.PowerspinModalAMsg).getAttribute('innerText').should.eventually.be.equal('All selections of the betslip will be lost. Are you sure you want to proceed?'),
      this.app.client.elements(elements.PowerspinModalAYesBtn).getAttribute('innerText').should.eventually.be.equal('Yes'),
      this.app.client.elements(elements.PowerspinModalANoBtn).getAttribute('innerText').should.eventually.be.equal('No'),
    ]).then(function (values) {
      return values[0] && values[1] && values[2] && values[3] && self.app.client.click(elements.PowerspinModalAYesBtn).should.eventually.be.fulfilled
    })
  })

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.PowerspinAMSidescreenNumbersTxt).should.eventually.be.false,
      this.app.client.isVisible(elements.PowerspinAMSidescreenNumbersClear).should.eventually.be.false,
      this.app.client.isVisible(elements.PowerspinAMSidescreenWheelSymbolTxt).should.eventually.be.false,
      this.app.client.isVisible(elements.PowerspinAMSidescreenWheelSymbolClear).should.eventually.be.false,
      this.app.client.isVisible(elements.PowerspinAMSidescreenWheelNumberTxt).should.eventually.be.false,
      this.app.client.isVisible(elements.PowerspinAMSidescreenWheelNumberClear).should.eventually.be.false,
    ])
  })

  it('Check value of consecutive draws fields calculator', function () {
    return this.app.client.getValue(elements.PowerspinBetConsDrawsInput).should.eventually.be.equal('1')
  })

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.PowerspinBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.PowerspinBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('true'),
      this.app.client.isVisible(elements.PowerspinBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.PowerspinBetslipSubmitLbl).should.eventually.be.equal('PLACE BET'),
      this.app.client.getText(elements.PowerspinBetslipCostLbl).should.eventually.be.equal('BETSLIP COST\n0€'),
      this.app.client.getText(elements.PowerspinBetslipCost).should.eventually.be.equal('0€'),
    ])
  })

  ///////////////////////////////////////// Select Powerspin and then add Additional Markets game /////////////////////////////////////

  it('Select Additional Markets game', async function () {
    return this.app.client.click(elements.PowerspinAdditionalMarketsTxt).should.eventually.be.fulfilled
  })

  it('Check Additional Markets game Inactive', async function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAdditionalMarketsTxt).should.eventually.be.equal('EXTRA MARKETS'),
      this.app.client.isVisible(elements.PowerspinAdditionalMarketsInactive).should.eventually.be.true, // inactive true
    ])
  })

  /////////////////////////////////////////// Select PowerSpin game from Lobby and then Additional Markets ////////////////////////////////////////////////

  it('Select numbers', function () {
    return Promise.all([this.app.client.click(elements.PowerspinNumber1).should.eventually.be.fulfilled, this.app.client.click(elements.PowerspinNumber10).should.eventually.be.fulfilled])
  })

  it('Select Additional Markets game', async function () {
    return this.app.client.click(elements.PowerspinAdditionalMarketsTxt).should.eventually.be.fulfilled
  })

  it('Select numbers', function () {
    return Promise.all([this.app.client.click(elements.PowerspinAMNumber7).should.eventually.be.fulfilled, this.app.client.click(elements.PowerspinAMNumber18).should.eventually.be.fulfilled])
  })

  it('Select Wheel Symbol', function () {
    return this.app.client.click(elements.PowerspinAMWheelSymbolNoneBtn).should.eventually.be.fulfilled
  })

  it('Check betting amount field for Wheel with Number', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelNumberWhiteLbl).should.eventually.be.equal('BET AMOUNT (€)'),
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

  it('Check betting amount field for Numbers', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinAMBetMultiplierNumbersWhiteLbl).should.eventually.be.equal('BET AMOUNT (€)'),
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
      this.app.client.getText(elements.PowerspinAMBetMultiplierWheelSymbolWhiteLbl).should.eventually.be.equal('BET AMOUNT (€)'),
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

  it('Check cost and selection on sidescreen', function () {
    return Promise.all([
      //this.app.client.getText(elements.PowerspinAMSidescreenNumbers).should.eventually.be.equal('AMOUNT: 1€'),  // powerspin tests
      // this.app.client.getText(elements.PowerspinAMSidescreenNumbersTxt).should.eventually.be.equal('icon'),
      // this.app.client.getText(elements.PowerspinAMSidescreenNumbersContent).should.eventually.be.equal('1\n10'),
      // this.app.client.isVisible(elements.PowerspinAMSidescreenNumbersClear).should.eventually.be.true,

      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbol).should.eventually.be.equal('AMOUNT: 1€'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbolTxt).should.eventually.be.equal('NUMBER (AW) :'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelSymbolContent).should.eventually.be.equal('7\n18'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenWheelSymbolClear).should.eventually.be.true,

      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumber).should.eventually.be.equal('AMOUNT: 0.5€'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumberTxt).should.eventually.be.equal('SYMBOL IN :'),
      this.app.client.getText(elements.PowerspinAMSidescreenWheelNumberContent).should.eventually.be.equal('NONE'),
      this.app.client.isVisible(elements.PowerspinAMSidescreenWheelNumberClear).should.eventually.be.true,
    ])
  })

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.PowerspinBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.PowerspinBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('true'),
      // this.app.client.isVisible(elements.PowerspinBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.PowerspinBetslipSubmitLbl).should.eventually.be.equal('PLACE BET'),
      this.app.client.getText(elements.PowerspinBetslipCostLbl).should.eventually.be.equal('BETSLIP COST\n2.5€'),
      this.app.client.getText(elements.PowerspinBetslipCost).should.eventually.be.equal('2.5€'),
    ])
  })
  ///////////////////////////////////// Close Application ////////////////////////////////////////////////////////////////

  it('Close Application', function () {
    this.timeout(5000)
    if (this.app && this.app.isRunning()) {
      exec(`taskkill /IM opap-lottery-games.exe /F`)
    }
  })
})
