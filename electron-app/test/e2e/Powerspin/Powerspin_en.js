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

describe('TC Powerspin_en.js: Powerspin tests', function () {
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

  it('Check Powerspin Number area elements', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinNumberLbl).should.eventually.be.equal('NUMBER'),
      this.app.client.getText(elements.PowerspinNumberTitle).should.eventually.be.equal('Number'),
      this.app.client.getText(elements.Powerspin2daTitle).should.eventually.be.equal('Double'),
      this.app.client.getText(elements.Powerspin3daTitle).should.eventually.be.equal('Triple'),
      this.app.client.getText(elements.Powerspin4daTitle).should.eventually.be.equal('Quadruple'),
      this.app.client.getText(elements.Powerspin6daTitle).should.eventually.be.equal('Sextuple'),
      this.app.client.getText(elements.Powerspin8daTitle).should.eventually.be.equal('Octuple'),
      this.app.client.getText(elements.Powerspin12daTitle).should.eventually.be.equal('Dozen'),
      this.app.client.isVisible(elements.PowerspinNumberSelectionBtn).should.eventually.be.true,
      this.app.client.isVisible(elements.Powerspin2daSelectionBtn).should.eventually.be.true,
      this.app.client.isVisible(elements.Powerspin3daSelectionBtn).should.eventually.be.true,
      this.app.client.isVisible(elements.Powerspin4daSelectionBtn).should.eventually.be.true,
      this.app.client.isVisible(elements.Powerspin6daSelectionBtn).should.eventually.be.true,
      this.app.client.isVisible(elements.Powerspin8daSelectionBtn).should.eventually.be.true,
      this.app.client.isVisible(elements.Powerspin12daSelectionBtn).should.eventually.be.true,
      this.app.client.getText(elements.PowerspinNumber1).should.eventually.be.equal('1'),
      this.app.client.getText(elements.PowerspinNumber2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.PowerspinNumber3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.PowerspinNumber4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.PowerspinNumber5).should.eventually.be.equal('5'),
      this.app.client.getText(elements.PowerspinNumber6).should.eventually.be.equal('6'),
      this.app.client.getText(elements.PowerspinNumber7).should.eventually.be.equal('7'),
      this.app.client.getText(elements.PowerspinNumber8).should.eventually.be.equal('8'),
      this.app.client.getText(elements.PowerspinNumber9).should.eventually.be.equal('9'),
      this.app.client.getText(elements.PowerspinNumber10).should.eventually.be.equal('10'),
      this.app.client.getText(elements.PowerspinNumber11).should.eventually.be.equal('11'),
      this.app.client.getText(elements.PowerspinNumber12).should.eventually.be.equal('12'),
      this.app.client.getText(elements.PowerspinNumber13).should.eventually.be.equal('13'),
      this.app.client.getText(elements.PowerspinNumber14).should.eventually.be.equal('14'),
      this.app.client.getText(elements.PowerspinNumber15).should.eventually.be.equal('15'),
      this.app.client.getText(elements.PowerspinNumber16).should.eventually.be.equal('16'),
      this.app.client.getText(elements.PowerspinNumber17).should.eventually.be.equal('17'),
      this.app.client.getText(elements.PowerspinNumber18).should.eventually.be.equal('18'),
      this.app.client.getText(elements.PowerspinNumber19).should.eventually.be.equal('19'),
      this.app.client.getText(elements.PowerspinNumber20).should.eventually.be.equal('20'),
      this.app.client.getText(elements.PowerspinNumber21).should.eventually.be.equal('21'),
      this.app.client.getText(elements.PowerspinNumber22).should.eventually.be.equal('22'),
      this.app.client.getText(elements.PowerspinNumber23).should.eventually.be.equal('23'),
      this.app.client.getText(elements.PowerspinNumber24).should.eventually.be.equal('24'),
      this.app.client.getText(elements.PowerspinRandomSelectionBtn).should.eventually.be.equal('QUICK PICK'),
    ])
  })

  it('Check Powerspin Symbol area elements', function () {
    return Promise.all([this.app.client.getText(elements.PowerspinSymbolLbl).should.eventually.be.equal('SYMBOL'), this.app.client.isVisible(elements.PowerspinWheelImg).should.eventually.be.true])
  })

  it('Check Powerspin Zone area elements', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinZoneLbl).should.eventually.be.equal('ZONE'),
      this.app.client.getText(elements.PowerspinRedBtn).should.eventually.be.equal('RED'),
      this.app.client.getText(elements.PowerspinGreenBtn).should.eventually.be.equal('GREEN'),
      this.app.client.getText(elements.PowerspinBlueBtn).should.eventually.be.equal('BLUE'),
    ])
  })

  it('Check Powerspin Under/Over area elements', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinUnderOverLbl).should.eventually.be.equal('OVER/UNDER 12.5'),
      this.app.client.getText(elements.PowerspinUnderLbl).should.eventually.be.equal('UNDER 12.5'),
      this.app.client.getText(elements.PowerspinOverLbl).should.eventually.be.equal('OVER 12.5'),
    ])
  })

  it('Select numbers', function () {
    return Promise.all([this.app.client.click(elements.PowerspinNumber1).should.eventually.be.fulfilled, this.app.client.click(elements.PowerspinNumber10).should.eventually.be.fulfilled])
  })

  it('Select symbol', function () {
    return this.app.client.click(elements.PowerspinWheelImg).should.eventually.be.fulfilled
  })

  it('Select zone', function () {
    return this.app.client.click(elements.PowerspinGreenBtn).should.eventually.be.fulfilled
  })

  it('Select under/over', function () {
    return this.app.client.click(elements.PowerspinUnderBtn).should.eventually.be.fulfilled
  })

  it('Select Powerspin Combo 2 option', function () {
    return this.app.client.click(elements.PowerspinCombo2Btn).should.eventually.be.fulfilled
  })

  it('Check Powerspin Combo 2 Number area elements', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinCombo2NumberTitle).should.eventually.be.equal('NUMBER'),
      this.app.client.getText(elements.PowerspinCombo2Number1).should.eventually.be.equal('1'),
      this.app.client.getText(elements.PowerspinCombo2Number2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.PowerspinCombo2Number3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.PowerspinCombo2Number4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.PowerspinCombo2Number5).should.eventually.be.equal('5'),
      this.app.client.getText(elements.PowerspinCombo2Number6).should.eventually.be.equal('6'),
      this.app.client.getText(elements.PowerspinCombo2Number7).should.eventually.be.equal('7'),
      this.app.client.getText(elements.PowerspinCombo2Number8).should.eventually.be.equal('8'),
      this.app.client.getText(elements.PowerspinCombo2Number9).should.eventually.be.equal('9'),
      this.app.client.getText(elements.PowerspinCombo2Number10).should.eventually.be.equal('10'),
      this.app.client.getText(elements.PowerspinCombo2Number11).should.eventually.be.equal('11'),
      this.app.client.getText(elements.PowerspinCombo2Number12).should.eventually.be.equal('12'),
      this.app.client.getText(elements.PowerspinCombo2Number13).should.eventually.be.equal('13'),
      this.app.client.getText(elements.PowerspinCombo2Number14).should.eventually.be.equal('14'),
      this.app.client.getText(elements.PowerspinCombo2Number15).should.eventually.be.equal('15'),
      this.app.client.getText(elements.PowerspinCombo2Number16).should.eventually.be.equal('16'),
      this.app.client.getText(elements.PowerspinCombo2Number17).should.eventually.be.equal('17'),
      this.app.client.getText(elements.PowerspinCombo2Number18).should.eventually.be.equal('18'),
      this.app.client.getText(elements.PowerspinCombo2Number19).should.eventually.be.equal('19'),
      this.app.client.getText(elements.PowerspinCombo2Number20).should.eventually.be.equal('20'),
      this.app.client.getText(elements.PowerspinCombo2Number21).should.eventually.be.equal('21'),
      this.app.client.getText(elements.PowerspinCombo2Number22).should.eventually.be.equal('22'),
      this.app.client.getText(elements.PowerspinCombo2Number23).should.eventually.be.equal('23'),
      this.app.client.getText(elements.PowerspinCombo2Number24).should.eventually.be.equal('24'),
      this.app.client.getText(elements.PowerspinCombo2RandomSelectionBtn).should.eventually.be.equal('QUICK PICK'),
    ])
  })

  it('Check Powerspin Combo 2 Symbol area elements', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinCombo2SymbolLbl).should.eventually.be.equal('SYMBOL'),
      this.app.client.isVisible(elements.PowerspinCombo2WheelImg).should.eventually.be.true,
    ])
  })

  it('Check Powerspin Combo 2 Zone area elements', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinCombo2ZoneLbl).should.eventually.be.equal('ZONE'),
      this.app.client.getText(elements.PowerspinCombo2RedBtn).should.eventually.be.equal('RED'),
      this.app.client.getText(elements.PowerspinCombo2GreenBtn).should.eventually.be.equal('GREEN'),
      this.app.client.getText(elements.PowerspinCombo2BlueBtn).should.eventually.be.equal('BLUE'),
    ])
  })

  it('Check Powerspin Combo 2 Under/Over area elements', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinCombo2UnderOverLbl).should.eventually.be.equal('OVER/UNDER 12.5'),
      this.app.client.getText(elements.PowerspinCombo2UnderLbl).should.eventually.be.equal('UNDER 12.5'),
      this.app.client.getText(elements.PowerspinCombo2OverLbl).should.eventually.be.equal('OVER 12.5'),
    ])
  })

  it('Select number', function () {
    return Promise.all([this.app.client.click(elements.PowerspinCombo2Number2).should.eventually.be.fulfilled])
  })

  it('Select symbol', function () {
    return this.app.client.click(elements.PowerspinCombo2WheelImg).should.eventually.be.fulfilled
  })

  it('Select zone', function () {
    return this.app.client.click(elements.PowerspinCombo2RedBtn).should.eventually.be.fulfilled
  })

  it('Select under/over', function () {
    return this.app.client.click(elements.PowerspinCombo2OverBtn).should.eventually.be.fulfilled
  })

  it('Select Powerspin Combo 3 option', function () {
    return this.app.client.click(elements.PowerspinCombo3Btn).should.eventually.be.fulfilled
  })

  it('Check Powerspin Combo 3 Number area elements', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinCombo3NumberLbl).should.eventually.be.equal('NUMBER'),
      this.app.client.getText(elements.PowerspinCombo3Number1).should.eventually.be.equal('1'),
      this.app.client.getText(elements.PowerspinCombo3Number2).should.eventually.be.equal('2'),
      this.app.client.getText(elements.PowerspinCombo3Number3).should.eventually.be.equal('3'),
      this.app.client.getText(elements.PowerspinCombo3Number4).should.eventually.be.equal('4'),
      this.app.client.getText(elements.PowerspinCombo3Number5).should.eventually.be.equal('5'),
      this.app.client.getText(elements.PowerspinCombo3Number6).should.eventually.be.equal('6'),
      this.app.client.getText(elements.PowerspinCombo3Number7).should.eventually.be.equal('7'),
      this.app.client.getText(elements.PowerspinCombo3Number8).should.eventually.be.equal('8'),
      this.app.client.getText(elements.PowerspinCombo3Number9).should.eventually.be.equal('9'),
      this.app.client.getText(elements.PowerspinCombo3Number10).should.eventually.be.equal('10'),
      this.app.client.getText(elements.PowerspinCombo3Number11).should.eventually.be.equal('11'),
      this.app.client.getText(elements.PowerspinCombo3Number12).should.eventually.be.equal('12'),
      this.app.client.getText(elements.PowerspinCombo3Number13).should.eventually.be.equal('13'),
      this.app.client.getText(elements.PowerspinCombo3Number14).should.eventually.be.equal('14'),
      this.app.client.getText(elements.PowerspinCombo3Number15).should.eventually.be.equal('15'),
      this.app.client.getText(elements.PowerspinCombo3Number16).should.eventually.be.equal('16'),
      this.app.client.getText(elements.PowerspinCombo3Number17).should.eventually.be.equal('17'),
      this.app.client.getText(elements.PowerspinCombo3Number18).should.eventually.be.equal('18'),
      this.app.client.getText(elements.PowerspinCombo3Number19).should.eventually.be.equal('19'),
      this.app.client.getText(elements.PowerspinCombo3Number20).should.eventually.be.equal('20'),
      this.app.client.getText(elements.PowerspinCombo3Number21).should.eventually.be.equal('21'),
      this.app.client.getText(elements.PowerspinCombo3Number22).should.eventually.be.equal('22'),
      this.app.client.getText(elements.PowerspinCombo3Number23).should.eventually.be.equal('23'),
      this.app.client.getText(elements.PowerspinCombo3Number24).should.eventually.be.equal('24'),
      this.app.client.getText(elements.PowerspinCombo3RandomSelectionBtn).should.eventually.be.equal('QUICK PICK'),
    ])
  })

  it('Check Powerspin Combo 3 Symbol area elements', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinCombo3SymbolLbl).should.eventually.be.equal('SYMBOL'),
      this.app.client.isVisible(elements.PowerspinCombo3WheelImg).should.eventually.be.true,
    ])
  })

  it('Check Powerspin Combo 3 Zone area elements', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinCombo3ZoneLbl).should.eventually.be.equal('ZONE'),
      this.app.client.getText(elements.PowerspinCombo3RedBtn).should.eventually.be.equal('RED'),
      this.app.client.getText(elements.PowerspinCombo3GreenBtn).should.eventually.be.equal('GREEN'),
      this.app.client.getText(elements.PowerspinCombo3BlueBtn).should.eventually.be.equal('BLUE'),
    ])
  })

  it('Check Powerspin Combo 3 Under/Over area elements', function () {
    return Promise.all([
      this.app.client.getText(elements.PowerspinCombo3UnderOverLbl).should.eventually.be.equal('OVER/UNDER 12.5'),
      this.app.client.getText(elements.PowerspinCombo3UnderLbl).should.eventually.be.equal('UNDER 12.5'),
      this.app.client.getText(elements.PowerspinCombo3OverLbl).should.eventually.be.equal('OVER 12.5'),
    ])
  })

  it('Select number', function () {
    return Promise.all([this.app.client.click(elements.PowerspinCombo3Number20).should.eventually.be.fulfilled])
  })

  it('Select symbol', function () {
    return this.app.client.click(elements.PowerspinCombo3WheelImg).should.eventually.be.fulfilled
  })

  it('Select zone', function () {
    return this.app.client.click(elements.PowerspinCombo3BlueBtn).should.eventually.be.fulfilled
  })

  it('Select under/over', function () {
    return this.app.client.click(elements.PowerspinCombo3OverBtn).should.eventually.be.fulfilled
  })

  ///////////////////////////////////// Close Application ////////////////////////////////////////////////////////////////

  it('Close Application', function () {
    this.timeout(5000)
    if (this.app && this.app.isRunning()) {
      exec(`taskkill /IM opap-lottery-games.exe /F`)
    }
  })
})
