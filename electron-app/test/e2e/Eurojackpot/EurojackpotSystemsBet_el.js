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
var elements = require('./../EurojackpotElements.js');
const { exec } = require('child_process');

////////////////////////////////////////// Check elements of Eurojackpot Bet Page /////////////////////////////////////////////

describe('TC EurojackpotStandardPageElements_en.js: Check elements of Eurojackpot Bet Page', function () {
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

  /////////////////////////////////////////// Select Eurojackpot game from Lobby ////////////////////////////////////////////////

  it('Select Eurojackpot game', function () {
    return this.app.client.click(elements.LobbyEurojackpot).should.eventually.be.fulfilled;
  });

  ///////////////////////////////////////////// Check elements of initial Eurojackpot Bet page //////////////////////////////////////

  it('Check Eurojackpot Header', function () {
    return this.app.client.isVisible(elements.LobbyHeader).should.eventually.be.true;
  });

  it('Check Eurojackpot Logo', function () {
    return this.app.client.isVisible(elements.EurojackpotLogo).should.eventually.be.true;
  });

  it('Check return to Main Menu element', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotMainMenuBtn).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotMainMenuBtn).should.eventually.be.equal('ΕΔΩ ΠΑΣ ΣΤΟ LOBBY'),
    ]);
  });

  it('Check Random Pick table', function () {
    return Promise.all([
      this.app.client
        .getText(elements.EurojackpotWinningsTableNumbers)
        .should.eventually.be.equal('Εδώ δημιουργείς μια απλή στήλη με τυχαίους αριθμούς'),
      this.app.client.getText(elements.EurojackpotRandomPickBtn).should.eventually.be.equal('ΤΥΧΑΙΑ ΕΠΙΛΟΓΗ'),
      this.app.client.isVisible(elements.EurojackpotRandomPickBtn).should.eventually.be.true,
    ]);
  });

  it('Check System field', function () {
    return Promise.all([
      this.app.client.getText(elements.EurojackpotSystemHeaderTitle).should.eventually.be.equal('ΣΥΣΤΗΜΑΤΑ'),
      this.app.client
        .getText(elements.EurojackpotSystemHeaderInfo)
        .should.eventually.be.equal(
          'Εδώ επιλέγεις να παίξεις με περισσότερους από 5 αριθμούς και με περισσότερες στήλες',
        ),
      this.app.client
        .getText(elements.EurojackpotSystemNumbers)
        .should.eventually.be.equal(
          '12\nΣΤΗΛΕΣ\n118\n13\nΣΤΗΛΕΣ\n54\n14\nΣΤΗΛΕΣ\n38\n15\nΣΤΗΛΕΣ\n22\n23\nΣΤΗΛΕΣ\n51\n24\nΣΤΗΛΕΣ\n14\n25\nΣΤΗΛΕΣ\n30\n34\nΣΤΗΛΕΣ\n9\n35\nΣΤΗΛΕΣ\n6\n45\nΣΤΗΛΕΣ\n5',
        ),
      this.app.client.isVisible(elements.EurojackpotSystemBtn12).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotSystemBtn12).should.eventually.be.equal('12'),
      this.app.client.getText(elements.EurojackpotSystemBtn13).should.eventually.be.equal('13'),
      this.app.client.getText(elements.EurojackpotSystemBtn14).should.eventually.be.equal('14'),
      this.app.client.getText(elements.EurojackpotSystemBtn15).should.eventually.be.equal('15'),
      this.app.client.getText(elements.EurojackpotSystemBtn23).should.eventually.be.equal('23'),
      this.app.client.getText(elements.EurojackpotSystemBtn24).should.eventually.be.equal('24'),
      this.app.client.getText(elements.EurojackpotSystemBtn25).should.eventually.be.equal('25'),
      this.app.client.getText(elements.EurojackpotSystemBtn34).should.eventually.be.equal('34'),
      this.app.client.getText(elements.EurojackpotSystemBtn35).should.eventually.be.equal('35'),
      this.app.client.getText(elements.EurojackpotSystemBtn45).should.eventually.be.equal('45'),
    ]);
  });

  it('Check select Eurojackpot main numbers field', function () {
    return Promise.all([
      this.app.client
        .getText(elements.EurojackpotChooseMainNumbersLbl)
        .should.eventually.be.equal('ΕΠΙΛΟΓΗ ΤΟΥΛΑΧΙΣΤΟΝ 5 ΑΡΙΘΜΩΝ'),
      this.app.client
        .getText(elements.EurojackpotChooseMainNumbers)
        .should.eventually.be.equal(
          '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n21\n22\n23\n24\n25\n26\n27\n28\n29\n30\n31\n32\n33\n34\n35\n36\n37\n38\n39\n40\n41\n42\n43\n44\n45\n46\n47\n48\n49\n50',
        ),
      this.app.client.getText(elements.EurojackpotChooseMainNumber1Btn).should.eventually.be.equal('1'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber2Btn).should.eventually.be.equal('2'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber3Btn).should.eventually.be.equal('3'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber4Btn).should.eventually.be.equal('4'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber5Btn).should.eventually.be.equal('5'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber6Btn).should.eventually.be.equal('6'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber7Btn).should.eventually.be.equal('7'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber8Btn).should.eventually.be.equal('8'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber9Btn).should.eventually.be.equal('9'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber10Btn).should.eventually.be.equal('10'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber11Btn).should.eventually.be.equal('11'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber12Btn).should.eventually.be.equal('12'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber13Btn).should.eventually.be.equal('13'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber14Btn).should.eventually.be.equal('14'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber15Btn).should.eventually.be.equal('15'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber16Btn).should.eventually.be.equal('16'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber17Btn).should.eventually.be.equal('17'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber18Btn).should.eventually.be.equal('18'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber19Btn).should.eventually.be.equal('19'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber20Btn).should.eventually.be.equal('20'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber21Btn).should.eventually.be.equal('21'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber22Btn).should.eventually.be.equal('22'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber23Btn).should.eventually.be.equal('23'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber24Btn).should.eventually.be.equal('24'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber25Btn).should.eventually.be.equal('25'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber26Btn).should.eventually.be.equal('26'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber27Btn).should.eventually.be.equal('27'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber28Btn).should.eventually.be.equal('28'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber29Btn).should.eventually.be.equal('29'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber30Btn).should.eventually.be.equal('30'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber31Btn).should.eventually.be.equal('31'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber32Btn).should.eventually.be.equal('32'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber33Btn).should.eventually.be.equal('33'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber34Btn).should.eventually.be.equal('34'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber35Btn).should.eventually.be.equal('35'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber36Btn).should.eventually.be.equal('36'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber37Btn).should.eventually.be.equal('37'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber38Btn).should.eventually.be.equal('38'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber39Btn).should.eventually.be.equal('39'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber40Btn).should.eventually.be.equal('40'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber41Btn).should.eventually.be.equal('41'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber42Btn).should.eventually.be.equal('42'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber43Btn).should.eventually.be.equal('43'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber44Btn).should.eventually.be.equal('44'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber45Btn).should.eventually.be.equal('45'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber46Btn).should.eventually.be.equal('46'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber47Btn).should.eventually.be.equal('47'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber48Btn).should.eventually.be.equal('48'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber49Btn).should.eventually.be.equal('49'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber50Btn).should.eventually.be.equal('50'),
    ]);
  });

  it('Check select Eurojackpot euro numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotChooseEuroNumbers).should.eventually.be.true,
      this.app.client
        .getText(elements.EurojackpotChooseEuroNumbersLbl)
        .should.eventually.be.equal('ΕΠΙΛΟΓΗ ΤΟΥΛΑΧΙΣΤΟΝ ☆ 2 ΑΡΙΘΜΩΝ'),
      this.app.client
        .getText(elements.EurojackpotChooseEuroNumbers)
        .should.eventually.be.equal('1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber1Btn).should.eventually.be.equal('1'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber2Btn).should.eventually.be.equal('2'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber3Btn).should.eventually.be.equal('3'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber4Btn).should.eventually.be.equal('4'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber5Btn).should.eventually.be.equal('5'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber6Btn).should.eventually.be.equal('6'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber7Btn).should.eventually.be.equal('7'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber8Btn).should.eventually.be.equal('8'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber9Btn).should.eventually.be.equal('9'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber10Btn).should.eventually.be.equal('10'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber11Btn).should.eventually.be.equal('11'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber12Btn).should.eventually.be.equal('12'),
    ]);
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('0€'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAddBet).should.eventually.be.equal('ΠΡΟΣΘΗΚΗ ΝΕΑΣ ΣΤΗΛΗΣ'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaB).should.eventually.be.false,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaC).should.eventually.be.false,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaD).should.eventually.be.false,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaE).should.eventually.be.false,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaF).should.eventually.be.false,
    ]);
  });

  it('Check consecutive draws fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetConsDrawsArea).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetConsDrawsLbl).should.eventually.be.equal('ΣΥΝΕΧΟΜΕΝΕΣ ΚΛΗΡΩΣΕΙΣ'),
      this.app.client.isVisible(elements.EurojackpotBetConsDrawsPlus).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetConsDrawsMinus).should.eventually.be.true,
      this.app.client.getValue(elements.EurojackpotBetConsDrawsInput).should.eventually.be.equal('1'),
    ]);
  });

  it('Check approve and print fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipSubmitBtn).should.eventually.be.true,
      // this.app.client.elements(elements.EurojackpotBetslipSubmitBtn).getAttribute('data-disabled').should.eventually.be.equal('placeBetInfoMsg2'), //true
      this.app.client.isVisible(elements.EurojackpotBetslipPlaceBetInfo).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipSubmitLbl).should.eventually.be.equal('ΑΠΟΔΟΧΗ'),
      this.app.client.getText(elements.EurojackpotBetslipCostLbl).should.eventually.be.equal('ΚΟΣΤΟΣ ΔΕΛΤΙΟΥ\n0€'),
      this.app.client.getText(elements.EurojackpotBetslipCost).should.eventually.be.equal('0€'),
    ]);
  });

  /////////////////////////////////////// Prepare a full system betslip to check all betslip fields /////////////////////////////////

  /////////////////////////////////////// System 12  /////////////////////////////////
  // select 15+2, 14+2, 16+2, 15+3, random
  it('Check empty betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('0€'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select System field 12', function () {
    return this.app.client.click(elements.EurojackpotSystemBtn12).should.eventually.be.fulfilled;
  });

  it('Check System field', function () {
    return Promise.all([
      this.app.client.getText(elements.EurojackpotSystemHeaderTitle).should.eventually.be.equal('ΣΥΣΤΗΜΑΤΑ'),
      this.app.client
        .getText(elements.EurojackpotSystemHeaderInfo)
        .should.eventually.be.equal(
          'Εδώ επιλέγεις να παίξεις με περισσότερους από 5 αριθμούς και με περισσότερες στήλες',
        ),
      this.app.client
        .getText(elements.EurojackpotSystemNumbers)
        .should.eventually.be.equal(
          '12\nΣΤΗΛΕΣ\n118\n13\nΣΤΗΛΕΣ\n54\n14\nΣΤΗΛΕΣ\n38\n15\nΣΤΗΛΕΣ\n22\n23\nΣΤΗΛΕΣ\n51\n24\nΣΤΗΛΕΣ\n14\n25\nΣΤΗΛΕΣ\n30\n34\nΣΤΗΛΕΣ\n9\n35\nΣΤΗΛΕΣ\n6\n45\nΣΤΗΛΕΣ\n5',
        ),
      this.app.client.isVisible(elements.EurojackpotSystemBtn12).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotSystemBtn12).should.eventually.be.equal('12'),
      this.app.client.getText(elements.EurojackpotSystemBtn13).should.eventually.be.equal('13'),
      this.app.client.getText(elements.EurojackpotSystemBtn14).should.eventually.be.equal('14'),
      this.app.client.getText(elements.EurojackpotSystemBtn15).should.eventually.be.equal('15'),
      this.app.client.getText(elements.EurojackpotSystemBtn23).should.eventually.be.equal('23'),
      this.app.client.getText(elements.EurojackpotSystemBtn24).should.eventually.be.equal('24'),
      this.app.client.getText(elements.EurojackpotSystemBtn25).should.eventually.be.equal('25'),
      this.app.client.getText(elements.EurojackpotSystemBtn34).should.eventually.be.equal('34'),
      this.app.client.getText(elements.EurojackpotSystemBtn35).should.eventually.be.equal('35'),
      this.app.client.getText(elements.EurojackpotSystemBtn45).should.eventually.be.equal('45'),
    ]);
  });

  it('Check select Eurojackpot main numbers field', function () {
    return Promise.all([
      this.app.client
        .getText(elements.EurojackpotChooseMainNumbersLbl)
        .should.eventually.be.equal('ΕΠΙΛΟΓΗ 15 ΑΡΙΘΜΩΝ'),
      this.app.client
        .getText(elements.EurojackpotChooseMainNumbers)
        .should.eventually.be.equal(
          '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n21\n22\n23\n24\n25\n26\n27\n28\n29\n30\n31\n32\n33\n34\n35\n36\n37\n38\n39\n40\n41\n42\n43\n44\n45\n46\n47\n48\n49\n50',
        ),
      this.app.client.getText(elements.EurojackpotChooseMainNumber1Btn).should.eventually.be.equal('1'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber2Btn).should.eventually.be.equal('2'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber3Btn).should.eventually.be.equal('3'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber4Btn).should.eventually.be.equal('4'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber5Btn).should.eventually.be.equal('5'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber6Btn).should.eventually.be.equal('6'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber7Btn).should.eventually.be.equal('7'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber8Btn).should.eventually.be.equal('8'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber9Btn).should.eventually.be.equal('9'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber10Btn).should.eventually.be.equal('10'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber11Btn).should.eventually.be.equal('11'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber12Btn).should.eventually.be.equal('12'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber13Btn).should.eventually.be.equal('13'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber14Btn).should.eventually.be.equal('14'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber15Btn).should.eventually.be.equal('15'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber16Btn).should.eventually.be.equal('16'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber17Btn).should.eventually.be.equal('17'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber18Btn).should.eventually.be.equal('18'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber19Btn).should.eventually.be.equal('19'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber20Btn).should.eventually.be.equal('20'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber21Btn).should.eventually.be.equal('21'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber22Btn).should.eventually.be.equal('22'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber23Btn).should.eventually.be.equal('23'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber24Btn).should.eventually.be.equal('24'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber25Btn).should.eventually.be.equal('25'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber26Btn).should.eventually.be.equal('26'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber27Btn).should.eventually.be.equal('27'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber28Btn).should.eventually.be.equal('28'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber29Btn).should.eventually.be.equal('29'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber30Btn).should.eventually.be.equal('30'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber31Btn).should.eventually.be.equal('31'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber32Btn).should.eventually.be.equal('32'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber33Btn).should.eventually.be.equal('33'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber34Btn).should.eventually.be.equal('34'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber35Btn).should.eventually.be.equal('35'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber36Btn).should.eventually.be.equal('36'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber37Btn).should.eventually.be.equal('37'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber38Btn).should.eventually.be.equal('38'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber39Btn).should.eventually.be.equal('39'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber40Btn).should.eventually.be.equal('40'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber41Btn).should.eventually.be.equal('41'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber42Btn).should.eventually.be.equal('42'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber43Btn).should.eventually.be.equal('43'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber44Btn).should.eventually.be.equal('44'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber45Btn).should.eventually.be.equal('45'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber46Btn).should.eventually.be.equal('46'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber47Btn).should.eventually.be.equal('47'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber48Btn).should.eventually.be.equal('48'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber49Btn).should.eventually.be.equal('49'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber50Btn).should.eventually.be.equal('50'),
    ]);
  });

  it('Check select Eurojackpot euro numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotChooseEuroNumbers).should.eventually.be.true,
      this.app.client
        .getText(elements.EurojackpotChooseEuroNumbersLbl)
        .should.eventually.be.equal('ΕΠΙΛΟΓΗ ΤΟΥΛΑΧΙΣΤΟΝ ☆ 2 ΑΡΙΘΜΩΝ'),
      this.app.client
        .getText(elements.EurojackpotChooseEuroNumbers)
        .should.eventually.be.equal('1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber1Btn).should.eventually.be.equal('1'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber2Btn).should.eventually.be.equal('2'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber3Btn).should.eventually.be.equal('3'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber4Btn).should.eventually.be.equal('4'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber5Btn).should.eventually.be.equal('5'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber6Btn).should.eventually.be.equal('6'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber7Btn).should.eventually.be.equal('7'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber8Btn).should.eventually.be.equal('8'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber9Btn).should.eventually.be.equal('9'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber10Btn).should.eventually.be.equal('10'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber11Btn).should.eventually.be.equal('11'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber12Btn).should.eventually.be.equal('12'),
    ]);
  });

  it('Select System 12 for Eurojackpot 15 main numbers and 2 euro numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotChooseEuroNumbers).should.eventually.be.true,
      this.app.client.click(elements.EurojackpotChooseMainNumber1Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber2Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber3Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber4Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber5Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber6Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber7Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber8Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber9Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber10Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber11Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber12Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber13Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber14Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber15Btn).should.eventually.be.fulfilled,

      this.app.client.click(elements.EurojackpotChooseEuroNumber1Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseEuroNumber2Btn).should.eventually.be.fulfilled,
    ]);
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('236€'),
      this.app.client.getText(elements.EurojackpotBetslipSystemA).should.eventually.be.equal('Σ12'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select System 12 for Eurojackpot 14 main numbers and 2 euro numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotChooseEuroNumbers).should.eventually.be.true,
      this.app.client.click(elements.EurojackpotChooseMainNumber15Btn).should.eventually.be.fulfilled,
    ]);
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('0€'),
      this.app.client.getText(elements.EurojackpotBetslipSystemA).should.eventually.be.equal('Σ12'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select System 12 for Eurojackpot 16 main numbers and 2 euro numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotChooseEuroNumbers).should.eventually.be.true,
      this.app.client.click(elements.EurojackpotChooseMainNumber15Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber16Btn).should.eventually.be.fulfilled,
    ]);
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('0€'),
      this.app.client.getText(elements.EurojackpotBetslipSystemA).should.eventually.be.equal('Σ12'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select System 12 for Eurojackpot 15 main numbers and 3 euro numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotChooseEuroNumbers).should.eventually.be.true,
      this.app.client.click(elements.EurojackpotChooseMainNumber16Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseEuroNumber3Btn).should.eventually.be.fulfilled,
    ]);
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('708€'),
      this.app.client.getText(elements.EurojackpotBetslipSystemA).should.eventually.be.equal('Σ12'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select Random Pick table', function () {
    return this.app.client.click(elements.EurojackpotRandomPickBtn).should.eventually.be.fulfilled;
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('708€'),
      this.app.client.getText(elements.EurojackpotBetslipSystemA).should.eventually.be.equal('Σ12'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select Clear All', function () {
    return this.app.client.click(elements.EurojackpotClearAllBtn).should.eventually.be.fulfilled;
  });

  it('Confirm Clear All', function () {
    let self = this;
    return Promise.all([
      this.app.client
        .elements(elements.EurojackpotModalAMsgLbl)
        .getAttribute('innerText')
        .should.eventually.be.equal('ΚΑΘΑΡΙΣΜΟΣ ΔΕΛΤΙΟΥ'),
      this.app.client
        .elements(elements.EurojackpotModalAMsg)
        .getAttribute('innerText')
        .should.eventually.be.equal(
          'Όλες οι επιλογές του δελτίου θα διαγραφούν. Είστε σίγουρος/η ότι θέλετε να συνεχίσετε;',
        ),
      this.app.client
        .elements(elements.EurojackpotModalAYesBtn)
        .getAttribute('innerText')
        .should.eventually.be.equal('Ναι'),
      this.app.client
        .elements(elements.EurojackpotModalANoBtn)
        .getAttribute('innerText')
        .should.eventually.be.equal('Όχι'),
    ]).then(function (values) {
      return (
        values[0] &&
        values[1] &&
        values[2] &&
        values[3] &&
        self.app.client.click(elements.EurojackpotModalAYesBtn).should.eventually.be.fulfilled
      );
    });
  });

  /////////////////////////////////////// System 13  /////////////////////////////////

  it('Check empty betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('0€'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select System 13', function () {
    return this.app.client.click(elements.EurojackpotSystemBtn13).should.eventually.be.fulfilled;
  });

  it('Check System field', function () {
    return Promise.all([
      this.app.client.getText(elements.EurojackpotSystemHeaderTitle).should.eventually.be.equal('ΣΥΣΤΗΜΑΤΑ'),
      this.app.client
        .getText(elements.EurojackpotSystemHeaderInfo)
        .should.eventually.be.equal(
          'Εδώ επιλέγεις να παίξεις με περισσότερους από 5 αριθμούς και με περισσότερες στήλες',
        ),
      this.app.client
        .getText(elements.EurojackpotSystemNumbers)
        .should.eventually.be.equal(
          '12\nΣΤΗΛΕΣ\n118\n13\nΣΤΗΛΕΣ\n54\n14\nΣΤΗΛΕΣ\n38\n15\nΣΤΗΛΕΣ\n22\n23\nΣΤΗΛΕΣ\n51\n24\nΣΤΗΛΕΣ\n14\n25\nΣΤΗΛΕΣ\n30\n34\nΣΤΗΛΕΣ\n9\n35\nΣΤΗΛΕΣ\n6\n45\nΣΤΗΛΕΣ\n5',
        ),
      this.app.client.isVisible(elements.EurojackpotSystemBtn12).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotSystemBtn12).should.eventually.be.equal('12'),
      this.app.client.getText(elements.EurojackpotSystemBtn13).should.eventually.be.equal('13'),
      this.app.client.getText(elements.EurojackpotSystemBtn14).should.eventually.be.equal('14'),
      this.app.client.getText(elements.EurojackpotSystemBtn15).should.eventually.be.equal('15'),
      this.app.client.getText(elements.EurojackpotSystemBtn23).should.eventually.be.equal('23'),
      this.app.client.getText(elements.EurojackpotSystemBtn24).should.eventually.be.equal('24'),
      this.app.client.getText(elements.EurojackpotSystemBtn25).should.eventually.be.equal('25'),
      this.app.client.getText(elements.EurojackpotSystemBtn34).should.eventually.be.equal('34'),
      this.app.client.getText(elements.EurojackpotSystemBtn35).should.eventually.be.equal('35'),
      this.app.client.getText(elements.EurojackpotSystemBtn45).should.eventually.be.equal('45'),
    ]);
  });

  it('Check select Eurojackpot main numbers field', function () {
    return Promise.all([
      this.app.client
        .getText(elements.EurojackpotChooseMainNumbersLbl)
        .should.eventually.be.equal('ΕΠΙΛΟΓΗ 13 ΑΡΙΘΜΩΝ'),
      this.app.client
        .getText(elements.EurojackpotChooseMainNumbers)
        .should.eventually.be.equal(
          '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n21\n22\n23\n24\n25\n26\n27\n28\n29\n30\n31\n32\n33\n34\n35\n36\n37\n38\n39\n40\n41\n42\n43\n44\n45\n46\n47\n48\n49\n50',
        ),
      this.app.client.getText(elements.EurojackpotChooseMainNumber1Btn).should.eventually.be.equal('1'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber2Btn).should.eventually.be.equal('2'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber3Btn).should.eventually.be.equal('3'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber4Btn).should.eventually.be.equal('4'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber5Btn).should.eventually.be.equal('5'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber6Btn).should.eventually.be.equal('6'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber7Btn).should.eventually.be.equal('7'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber8Btn).should.eventually.be.equal('8'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber9Btn).should.eventually.be.equal('9'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber10Btn).should.eventually.be.equal('10'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber11Btn).should.eventually.be.equal('11'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber12Btn).should.eventually.be.equal('12'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber13Btn).should.eventually.be.equal('13'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber14Btn).should.eventually.be.equal('14'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber15Btn).should.eventually.be.equal('15'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber16Btn).should.eventually.be.equal('16'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber17Btn).should.eventually.be.equal('17'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber18Btn).should.eventually.be.equal('18'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber19Btn).should.eventually.be.equal('19'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber20Btn).should.eventually.be.equal('20'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber21Btn).should.eventually.be.equal('21'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber22Btn).should.eventually.be.equal('22'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber23Btn).should.eventually.be.equal('23'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber24Btn).should.eventually.be.equal('24'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber25Btn).should.eventually.be.equal('25'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber26Btn).should.eventually.be.equal('26'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber27Btn).should.eventually.be.equal('27'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber28Btn).should.eventually.be.equal('28'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber29Btn).should.eventually.be.equal('29'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber30Btn).should.eventually.be.equal('30'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber31Btn).should.eventually.be.equal('31'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber32Btn).should.eventually.be.equal('32'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber33Btn).should.eventually.be.equal('33'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber34Btn).should.eventually.be.equal('34'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber35Btn).should.eventually.be.equal('35'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber36Btn).should.eventually.be.equal('36'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber37Btn).should.eventually.be.equal('37'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber38Btn).should.eventually.be.equal('38'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber39Btn).should.eventually.be.equal('39'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber40Btn).should.eventually.be.equal('40'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber41Btn).should.eventually.be.equal('41'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber42Btn).should.eventually.be.equal('42'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber43Btn).should.eventually.be.equal('43'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber44Btn).should.eventually.be.equal('44'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber45Btn).should.eventually.be.equal('45'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber46Btn).should.eventually.be.equal('46'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber47Btn).should.eventually.be.equal('47'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber48Btn).should.eventually.be.equal('48'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber49Btn).should.eventually.be.equal('49'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber50Btn).should.eventually.be.equal('50'),
    ]);
  });

  it('Check select Eurojackpot euro numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotChooseEuroNumbers).should.eventually.be.true,
      this.app.client
        .getText(elements.EurojackpotChooseEuroNumbersLbl)
        .should.eventually.be.equal('ΕΠΙΛΟΓΗ ΤΟΥΛΑΧΙΣΤΟΝ ☆ 2 ΑΡΙΘΜΩΝ'),
      this.app.client
        .getText(elements.EurojackpotChooseEuroNumbers)
        .should.eventually.be.equal('1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber1Btn).should.eventually.be.equal('1'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber2Btn).should.eventually.be.equal('2'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber3Btn).should.eventually.be.equal('3'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber4Btn).should.eventually.be.equal('4'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber5Btn).should.eventually.be.equal('5'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber6Btn).should.eventually.be.equal('6'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber7Btn).should.eventually.be.equal('7'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber8Btn).should.eventually.be.equal('8'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber9Btn).should.eventually.be.equal('9'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber10Btn).should.eventually.be.equal('10'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber11Btn).should.eventually.be.equal('11'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber12Btn).should.eventually.be.equal('12'),
    ]);
  });

  it('Select System 13 for Eurojackpot 13 main numbers and 2 euro numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotChooseEuroNumbers).should.eventually.be.true,
      this.app.client.click(elements.EurojackpotChooseMainNumber1Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber2Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber3Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber4Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber5Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber6Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber7Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber8Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber9Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber10Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber11Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber12Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber13Btn).should.eventually.be.fulfilled,

      this.app.client.click(elements.EurojackpotChooseEuroNumber1Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseEuroNumber2Btn).should.eventually.be.fulfilled,
    ]);
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('108€'),
      this.app.client.getText(elements.EurojackpotBetslipSystemA).should.eventually.be.equal('Σ13'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select System 13 for Eurojackpot 12 main numbers and 2 euro numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotChooseEuroNumbers).should.eventually.be.true,
      this.app.client.click(elements.EurojackpotChooseMainNumber13Btn).should.eventually.be.fulfilled,
    ]);
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('0€'),
      this.app.client.getText(elements.EurojackpotBetslipSystemA).should.eventually.be.equal('Σ13'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select System 13 for Eurojackpot 14 main numbers and 2 euro numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotChooseEuroNumbers).should.eventually.be.true,
      this.app.client.click(elements.EurojackpotChooseMainNumber13Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber14Btn).should.eventually.be.fulfilled,
    ]);
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('0€'),
      this.app.client.getText(elements.EurojackpotBetslipSystemA).should.eventually.be.equal('Σ13'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select System 13 for Eurojackpot 15 main numbers and 3 euro numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotChooseEuroNumbers).should.eventually.be.true,
      this.app.client.click(elements.EurojackpotChooseMainNumber14Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseEuroNumber3Btn).should.eventually.be.fulfilled,
    ]);
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('324€'),
      this.app.client.getText(elements.EurojackpotBetslipSystemA).should.eventually.be.equal('Σ13'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select Random Pick table', function () {
    return this.app.client.click(elements.EurojackpotRandomPickBtn).should.eventually.be.fulfilled;
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('324€'),
      this.app.client.getText(elements.EurojackpotBetslipSystemA).should.eventually.be.equal('Σ13'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select Clear All', function () {
    return this.app.client.click(elements.EurojackpotClearAllBtn).should.eventually.be.fulfilled;
  });

  it('Confirm Clear All', function () {
    let self = this;
    return Promise.all([
      this.app.client
        .elements(elements.EurojackpotModalAMsgLbl)
        .getAttribute('innerText')
        .should.eventually.be.equal('ΚΑΘΑΡΙΣΜΟΣ ΔΕΛΤΙΟΥ'),
      this.app.client
        .elements(elements.EurojackpotModalAMsg)
        .getAttribute('innerText')
        .should.eventually.be.equal(
          'Όλες οι επιλογές του δελτίου θα διαγραφούν. Είστε σίγουρος/η ότι θέλετε να συνεχίσετε;',
        ),
      this.app.client
        .elements(elements.EurojackpotModalAYesBtn)
        .getAttribute('innerText')
        .should.eventually.be.equal('Ναι'),
      this.app.client
        .elements(elements.EurojackpotModalANoBtn)
        .getAttribute('innerText')
        .should.eventually.be.equal('Όχι'),
    ]).then(function (values) {
      return (
        values[0] &&
        values[1] &&
        values[2] &&
        values[3] &&
        self.app.client.click(elements.EurojackpotModalAYesBtn).should.eventually.be.fulfilled
      );
    });
  });

  /////////////////////////////////////// System 14  /////////////////////////////////

  it('Check empty betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('0€'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select System 14', function () {
    return this.app.client.click(elements.EurojackpotSystemBtn14).should.eventually.be.fulfilled;
  });

  it('Check System field', function () {
    return Promise.all([
      this.app.client.getText(elements.EurojackpotSystemHeaderTitle).should.eventually.be.equal('ΣΥΣΤΗΜΑΤΑ'),
      this.app.client
        .getText(elements.EurojackpotSystemHeaderInfo)
        .should.eventually.be.equal(
          'Εδώ επιλέγεις να παίξεις με περισσότερους από 5 αριθμούς και με περισσότερες στήλες',
        ),
      this.app.client
        .getText(elements.EurojackpotSystemNumbers)
        .should.eventually.be.equal(
          '12\nΣΤΗΛΕΣ\n118\n13\nΣΤΗΛΕΣ\n54\n14\nΣΤΗΛΕΣ\n38\n15\nΣΤΗΛΕΣ\n22\n23\nΣΤΗΛΕΣ\n51\n24\nΣΤΗΛΕΣ\n14\n25\nΣΤΗΛΕΣ\n30\n34\nΣΤΗΛΕΣ\n9\n35\nΣΤΗΛΕΣ\n6\n45\nΣΤΗΛΕΣ\n5',
        ),
      this.app.client.isVisible(elements.EurojackpotSystemBtn12).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotSystemBtn12).should.eventually.be.equal('12'),
      this.app.client.getText(elements.EurojackpotSystemBtn13).should.eventually.be.equal('13'),
      this.app.client.getText(elements.EurojackpotSystemBtn14).should.eventually.be.equal('14'),
      this.app.client.getText(elements.EurojackpotSystemBtn15).should.eventually.be.equal('15'),
      this.app.client.getText(elements.EurojackpotSystemBtn23).should.eventually.be.equal('23'),
      this.app.client.getText(elements.EurojackpotSystemBtn24).should.eventually.be.equal('24'),
      this.app.client.getText(elements.EurojackpotSystemBtn25).should.eventually.be.equal('25'),
      this.app.client.getText(elements.EurojackpotSystemBtn34).should.eventually.be.equal('34'),
      this.app.client.getText(elements.EurojackpotSystemBtn35).should.eventually.be.equal('35'),
      this.app.client.getText(elements.EurojackpotSystemBtn45).should.eventually.be.equal('45'),
    ]);
  });

  it('Check select Eurojackpot main numbers field', function () {
    return Promise.all([
      this.app.client
        .getText(elements.EurojackpotChooseMainNumbersLbl)
        .should.eventually.be.equal('ΕΠΙΛΟΓΗ 12 ΑΡΙΘΜΩΝ'),
      this.app.client
        .getText(elements.EurojackpotChooseMainNumbers)
        .should.eventually.be.equal(
          '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n21\n22\n23\n24\n25\n26\n27\n28\n29\n30\n31\n32\n33\n34\n35\n36\n37\n38\n39\n40\n41\n42\n43\n44\n45\n46\n47\n48\n49\n50',
        ),
      this.app.client.getText(elements.EurojackpotChooseMainNumber1Btn).should.eventually.be.equal('1'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber2Btn).should.eventually.be.equal('2'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber3Btn).should.eventually.be.equal('3'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber4Btn).should.eventually.be.equal('4'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber5Btn).should.eventually.be.equal('5'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber6Btn).should.eventually.be.equal('6'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber7Btn).should.eventually.be.equal('7'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber8Btn).should.eventually.be.equal('8'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber9Btn).should.eventually.be.equal('9'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber10Btn).should.eventually.be.equal('10'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber11Btn).should.eventually.be.equal('11'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber12Btn).should.eventually.be.equal('12'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber13Btn).should.eventually.be.equal('13'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber14Btn).should.eventually.be.equal('14'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber15Btn).should.eventually.be.equal('15'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber16Btn).should.eventually.be.equal('16'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber17Btn).should.eventually.be.equal('17'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber18Btn).should.eventually.be.equal('18'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber19Btn).should.eventually.be.equal('19'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber20Btn).should.eventually.be.equal('20'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber21Btn).should.eventually.be.equal('21'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber22Btn).should.eventually.be.equal('22'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber23Btn).should.eventually.be.equal('23'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber24Btn).should.eventually.be.equal('24'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber25Btn).should.eventually.be.equal('25'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber26Btn).should.eventually.be.equal('26'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber27Btn).should.eventually.be.equal('27'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber28Btn).should.eventually.be.equal('28'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber29Btn).should.eventually.be.equal('29'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber30Btn).should.eventually.be.equal('30'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber31Btn).should.eventually.be.equal('31'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber32Btn).should.eventually.be.equal('32'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber33Btn).should.eventually.be.equal('33'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber34Btn).should.eventually.be.equal('34'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber35Btn).should.eventually.be.equal('35'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber36Btn).should.eventually.be.equal('36'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber37Btn).should.eventually.be.equal('37'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber38Btn).should.eventually.be.equal('38'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber39Btn).should.eventually.be.equal('39'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber40Btn).should.eventually.be.equal('40'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber41Btn).should.eventually.be.equal('41'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber42Btn).should.eventually.be.equal('42'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber43Btn).should.eventually.be.equal('43'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber44Btn).should.eventually.be.equal('44'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber45Btn).should.eventually.be.equal('45'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber46Btn).should.eventually.be.equal('46'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber47Btn).should.eventually.be.equal('47'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber48Btn).should.eventually.be.equal('48'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber49Btn).should.eventually.be.equal('49'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber50Btn).should.eventually.be.equal('50'),
    ]);
  });

  it('Check select Eurojackpot euro numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotChooseEuroNumbers).should.eventually.be.true,
      this.app.client
        .getText(elements.EurojackpotChooseEuroNumbersLbl)
        .should.eventually.be.equal('ΕΠΙΛΟΓΗ ΤΟΥΛΑΧΙΣΤΟΝ ☆ 2 ΑΡΙΘΜΩΝ'),
      this.app.client
        .getText(elements.EurojackpotChooseEuroNumbers)
        .should.eventually.be.equal('1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber1Btn).should.eventually.be.equal('1'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber2Btn).should.eventually.be.equal('2'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber3Btn).should.eventually.be.equal('3'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber4Btn).should.eventually.be.equal('4'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber5Btn).should.eventually.be.equal('5'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber6Btn).should.eventually.be.equal('6'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber7Btn).should.eventually.be.equal('7'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber8Btn).should.eventually.be.equal('8'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber9Btn).should.eventually.be.equal('9'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber10Btn).should.eventually.be.equal('10'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber11Btn).should.eventually.be.equal('11'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber12Btn).should.eventually.be.equal('12'),
    ]);
  });

  it('Select System 14 for Eurojackpot 12 main numbers and 2 euro numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotChooseEuroNumbers).should.eventually.be.true,
      this.app.client.click(elements.EurojackpotChooseMainNumber1Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber2Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber3Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber4Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber5Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber6Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber7Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber8Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber9Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber10Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber11Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber12Btn).should.eventually.be.fulfilled,

      this.app.client.click(elements.EurojackpotChooseEuroNumber1Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseEuroNumber2Btn).should.eventually.be.fulfilled,
    ]);
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('76€'),
      this.app.client.getText(elements.EurojackpotBetslipSystemA).should.eventually.be.equal('Σ14'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select System 14 for Eurojackpot 11 main numbers and 2 euro numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotChooseEuroNumbers).should.eventually.be.true,
      this.app.client.click(elements.EurojackpotChooseMainNumber12Btn).should.eventually.be.fulfilled,
    ]);
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('0€'),
      this.app.client.getText(elements.EurojackpotBetslipSystemA).should.eventually.be.equal('Σ14'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select System 14 for Eurojackpot 13 main numbers and 2 euro numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotChooseEuroNumbers).should.eventually.be.true,
      this.app.client.click(elements.EurojackpotChooseMainNumber12Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber13Btn).should.eventually.be.fulfilled,
    ]);
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('0€'),
      this.app.client.getText(elements.EurojackpotBetslipSystemA).should.eventually.be.equal('Σ14'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select System 14 for Eurojackpot 15 main numbers and 3 euro numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotChooseEuroNumbers).should.eventually.be.true,
      this.app.client.click(elements.EurojackpotChooseMainNumber13Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseEuroNumber3Btn).should.eventually.be.fulfilled,
    ]);
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('228€'),
      this.app.client.getText(elements.EurojackpotBetslipSystemA).should.eventually.be.equal('Σ14'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select Random Pick table', function () {
    return this.app.client.click(elements.EurojackpotRandomPickBtn).should.eventually.be.fulfilled;
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('228€'),
      this.app.client.getText(elements.EurojackpotBetslipSystemA).should.eventually.be.equal('Σ14'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select Clear All', function () {
    return this.app.client.click(elements.EurojackpotClearAllBtn).should.eventually.be.fulfilled;
  });

  it('Confirm Clear All', function () {
    let self = this;
    return Promise.all([
      this.app.client
        .elements(elements.EurojackpotModalAMsgLbl)
        .getAttribute('innerText')
        .should.eventually.be.equal('ΚΑΘΑΡΙΣΜΟΣ ΔΕΛΤΙΟΥ'),
      this.app.client
        .elements(elements.EurojackpotModalAMsg)
        .getAttribute('innerText')
        .should.eventually.be.equal(
          'Όλες οι επιλογές του δελτίου θα διαγραφούν. Είστε σίγουρος/η ότι θέλετε να συνεχίσετε;',
        ),
      this.app.client
        .elements(elements.EurojackpotModalAYesBtn)
        .getAttribute('innerText')
        .should.eventually.be.equal('Ναι'),
      this.app.client
        .elements(elements.EurojackpotModalANoBtn)
        .getAttribute('innerText')
        .should.eventually.be.equal('Όχι'),
    ]).then(function (values) {
      return (
        values[0] &&
        values[1] &&
        values[2] &&
        values[3] &&
        self.app.client.click(elements.EurojackpotModalAYesBtn).should.eventually.be.fulfilled
      );
    });
  });

  /////////////////////////////////////// System 15  /////////////////////////////////

  it('Check empty betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('0€'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select System 15', function () {
    return this.app.client.click(elements.EurojackpotSystemBtn15).should.eventually.be.fulfilled;
  });

  it('Check System field', function () {
    return Promise.all([
      this.app.client.getText(elements.EurojackpotSystemHeaderTitle).should.eventually.be.equal('ΣΥΣΤΗΜΑΤΑ'),
      this.app.client
        .getText(elements.EurojackpotSystemHeaderInfo)
        .should.eventually.be.equal(
          'Εδώ επιλέγεις να παίξεις με περισσότερους από 5 αριθμούς και με περισσότερες στήλες',
        ),
      this.app.client
        .getText(elements.EurojackpotSystemNumbers)
        .should.eventually.be.equal(
          '12\nΣΤΗΛΕΣ\n118\n13\nΣΤΗΛΕΣ\n54\n14\nΣΤΗΛΕΣ\n38\n15\nΣΤΗΛΕΣ\n22\n23\nΣΤΗΛΕΣ\n51\n24\nΣΤΗΛΕΣ\n14\n25\nΣΤΗΛΕΣ\n30\n34\nΣΤΗΛΕΣ\n9\n35\nΣΤΗΛΕΣ\n6\n45\nΣΤΗΛΕΣ\n5',
        ),
      this.app.client.isVisible(elements.EurojackpotSystemBtn12).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotSystemBtn12).should.eventually.be.equal('12'),
      this.app.client.getText(elements.EurojackpotSystemBtn13).should.eventually.be.equal('13'),
      this.app.client.getText(elements.EurojackpotSystemBtn14).should.eventually.be.equal('14'),
      this.app.client.getText(elements.EurojackpotSystemBtn15).should.eventually.be.equal('15'),
      this.app.client.getText(elements.EurojackpotSystemBtn23).should.eventually.be.equal('23'),
      this.app.client.getText(elements.EurojackpotSystemBtn24).should.eventually.be.equal('24'),
      this.app.client.getText(elements.EurojackpotSystemBtn25).should.eventually.be.equal('25'),
      this.app.client.getText(elements.EurojackpotSystemBtn34).should.eventually.be.equal('34'),
      this.app.client.getText(elements.EurojackpotSystemBtn35).should.eventually.be.equal('35'),
      this.app.client.getText(elements.EurojackpotSystemBtn45).should.eventually.be.equal('45'),
    ]);
  });

  it('Check select Eurojackpot main numbers field', function () {
    return Promise.all([
      this.app.client
        .getText(elements.EurojackpotChooseMainNumbersLbl)
        .should.eventually.be.equal('ΕΠΙΛΟΓΗ 11 ΑΡΙΘΜΩΝ'),
      this.app.client
        .getText(elements.EurojackpotChooseMainNumbers)
        .should.eventually.be.equal(
          '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n21\n22\n23\n24\n25\n26\n27\n28\n29\n30\n31\n32\n33\n34\n35\n36\n37\n38\n39\n40\n41\n42\n43\n44\n45\n46\n47\n48\n49\n50',
        ),
      this.app.client.getText(elements.EurojackpotChooseMainNumber1Btn).should.eventually.be.equal('1'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber2Btn).should.eventually.be.equal('2'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber3Btn).should.eventually.be.equal('3'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber4Btn).should.eventually.be.equal('4'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber5Btn).should.eventually.be.equal('5'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber6Btn).should.eventually.be.equal('6'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber7Btn).should.eventually.be.equal('7'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber8Btn).should.eventually.be.equal('8'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber9Btn).should.eventually.be.equal('9'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber10Btn).should.eventually.be.equal('10'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber11Btn).should.eventually.be.equal('11'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber12Btn).should.eventually.be.equal('12'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber13Btn).should.eventually.be.equal('13'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber14Btn).should.eventually.be.equal('14'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber15Btn).should.eventually.be.equal('15'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber16Btn).should.eventually.be.equal('16'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber17Btn).should.eventually.be.equal('17'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber18Btn).should.eventually.be.equal('18'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber19Btn).should.eventually.be.equal('19'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber20Btn).should.eventually.be.equal('20'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber21Btn).should.eventually.be.equal('21'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber22Btn).should.eventually.be.equal('22'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber23Btn).should.eventually.be.equal('23'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber24Btn).should.eventually.be.equal('24'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber25Btn).should.eventually.be.equal('25'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber26Btn).should.eventually.be.equal('26'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber27Btn).should.eventually.be.equal('27'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber28Btn).should.eventually.be.equal('28'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber29Btn).should.eventually.be.equal('29'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber30Btn).should.eventually.be.equal('30'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber31Btn).should.eventually.be.equal('31'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber32Btn).should.eventually.be.equal('32'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber33Btn).should.eventually.be.equal('33'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber34Btn).should.eventually.be.equal('34'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber35Btn).should.eventually.be.equal('35'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber36Btn).should.eventually.be.equal('36'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber37Btn).should.eventually.be.equal('37'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber38Btn).should.eventually.be.equal('38'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber39Btn).should.eventually.be.equal('39'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber40Btn).should.eventually.be.equal('40'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber41Btn).should.eventually.be.equal('41'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber42Btn).should.eventually.be.equal('42'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber43Btn).should.eventually.be.equal('43'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber44Btn).should.eventually.be.equal('44'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber45Btn).should.eventually.be.equal('45'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber46Btn).should.eventually.be.equal('46'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber47Btn).should.eventually.be.equal('47'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber48Btn).should.eventually.be.equal('48'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber49Btn).should.eventually.be.equal('49'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber50Btn).should.eventually.be.equal('50'),
    ]);
  });

  it('Check select Eurojackpot euro numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotChooseEuroNumbers).should.eventually.be.true,
      this.app.client
        .getText(elements.EurojackpotChooseEuroNumbersLbl)
        .should.eventually.be.equal('ΕΠΙΛΟΓΗ ΤΟΥΛΑΧΙΣΤΟΝ ☆ 2 ΑΡΙΘΜΩΝ'),
      this.app.client
        .getText(elements.EurojackpotChooseEuroNumbers)
        .should.eventually.be.equal('1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber1Btn).should.eventually.be.equal('1'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber2Btn).should.eventually.be.equal('2'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber3Btn).should.eventually.be.equal('3'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber4Btn).should.eventually.be.equal('4'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber5Btn).should.eventually.be.equal('5'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber6Btn).should.eventually.be.equal('6'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber7Btn).should.eventually.be.equal('7'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber8Btn).should.eventually.be.equal('8'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber9Btn).should.eventually.be.equal('9'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber10Btn).should.eventually.be.equal('10'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber11Btn).should.eventually.be.equal('11'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber12Btn).should.eventually.be.equal('12'),
    ]);
  });

  it('Select System 15 for Eurojackpot 11 main numbers and 2 euro numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotChooseEuroNumbers).should.eventually.be.true,
      this.app.client.click(elements.EurojackpotChooseMainNumber1Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber2Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber3Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber4Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber5Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber6Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber7Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber8Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber9Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber10Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber11Btn).should.eventually.be.fulfilled,

      this.app.client.click(elements.EurojackpotChooseEuroNumber1Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseEuroNumber2Btn).should.eventually.be.fulfilled,
    ]);
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('44€'),
      this.app.client.getText(elements.EurojackpotBetslipSystemA).should.eventually.be.equal('Σ15'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select System 15 for Eurojackpot 10 main numbers and 2 euro numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotChooseEuroNumbers).should.eventually.be.true,
      this.app.client.click(elements.EurojackpotChooseMainNumber11Btn).should.eventually.be.fulfilled,
    ]);
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('0€'),
      this.app.client.getText(elements.EurojackpotBetslipSystemA).should.eventually.be.equal('Σ15'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select System 15 for Eurojackpot 12 main numbers and 2 euro numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotChooseEuroNumbers).should.eventually.be.true,
      this.app.client.click(elements.EurojackpotChooseMainNumber11Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber12Btn).should.eventually.be.fulfilled,
    ]);
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('0€'),
      this.app.client.getText(elements.EurojackpotBetslipSystemA).should.eventually.be.equal('Σ15'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select System 15 for Eurojackpot 11 main numbers and 3 euro numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotChooseEuroNumbers).should.eventually.be.true,
      this.app.client.click(elements.EurojackpotChooseMainNumber12Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseEuroNumber3Btn).should.eventually.be.fulfilled,
    ]);
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('132€'),
      this.app.client.getText(elements.EurojackpotBetslipSystemA).should.eventually.be.equal('Σ15'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select Random Pick table', function () {
    return this.app.client.click(elements.EurojackpotRandomPickBtn).should.eventually.be.fulfilled;
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('132€'),
      this.app.client.getText(elements.EurojackpotBetslipSystemA).should.eventually.be.equal('Σ15'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select Clear All', function () {
    return this.app.client.click(elements.EurojackpotClearAllBtn).should.eventually.be.fulfilled;
  });

  it('Confirm Clear All', function () {
    let self = this;
    return Promise.all([
      this.app.client
        .elements(elements.EurojackpotModalAMsgLbl)
        .getAttribute('innerText')
        .should.eventually.be.equal('ΚΑΘΑΡΙΣΜΟΣ ΔΕΛΤΙΟΥ'),
      this.app.client
        .elements(elements.EurojackpotModalAMsg)
        .getAttribute('innerText')
        .should.eventually.be.equal(
          'Όλες οι επιλογές του δελτίου θα διαγραφούν. Είστε σίγουρος/η ότι θέλετε να συνεχίσετε;',
        ),
      this.app.client
        .elements(elements.EurojackpotModalAYesBtn)
        .getAttribute('innerText')
        .should.eventually.be.equal('Ναι'),
      this.app.client
        .elements(elements.EurojackpotModalANoBtn)
        .getAttribute('innerText')
        .should.eventually.be.equal('Όχι'),
    ]).then(function (values) {
      return (
        values[0] &&
        values[1] &&
        values[2] &&
        values[3] &&
        self.app.client.click(elements.EurojackpotModalAYesBtn).should.eventually.be.fulfilled
      );
    });
  });

  /////////////////////////////////////// System 23  /////////////////////////////////

  it('Check empty betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('0€'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select System 23', function () {
    return this.app.client.click(elements.EurojackpotSystemBtn23).should.eventually.be.fulfilled;
  });

  it('Check System field', function () {
    return Promise.all([
      this.app.client.getText(elements.EurojackpotSystemHeaderTitle).should.eventually.be.equal('ΣΥΣΤΗΜΑΤΑ'),
      this.app.client
        .getText(elements.EurojackpotSystemHeaderInfo)
        .should.eventually.be.equal(
          'Εδώ επιλέγεις να παίξεις με περισσότερους από 5 αριθμούς και με περισσότερες στήλες',
        ),
      this.app.client
        .getText(elements.EurojackpotSystemNumbers)
        .should.eventually.be.equal(
          '12\nΣΤΗΛΕΣ\n118\n13\nΣΤΗΛΕΣ\n54\n14\nΣΤΗΛΕΣ\n38\n15\nΣΤΗΛΕΣ\n22\n23\nΣΤΗΛΕΣ\n51\n24\nΣΤΗΛΕΣ\n14\n25\nΣΤΗΛΕΣ\n30\n34\nΣΤΗΛΕΣ\n9\n35\nΣΤΗΛΕΣ\n6\n45\nΣΤΗΛΕΣ\n5',
        ),
      this.app.client.isVisible(elements.EurojackpotSystemBtn12).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotSystemBtn12).should.eventually.be.equal('12'),
      this.app.client.getText(elements.EurojackpotSystemBtn13).should.eventually.be.equal('13'),
      this.app.client.getText(elements.EurojackpotSystemBtn14).should.eventually.be.equal('14'),
      this.app.client.getText(elements.EurojackpotSystemBtn15).should.eventually.be.equal('15'),
      this.app.client.getText(elements.EurojackpotSystemBtn23).should.eventually.be.equal('23'),
      this.app.client.getText(elements.EurojackpotSystemBtn24).should.eventually.be.equal('24'),
      this.app.client.getText(elements.EurojackpotSystemBtn25).should.eventually.be.equal('25'),
      this.app.client.getText(elements.EurojackpotSystemBtn34).should.eventually.be.equal('34'),
      this.app.client.getText(elements.EurojackpotSystemBtn35).should.eventually.be.equal('35'),
      this.app.client.getText(elements.EurojackpotSystemBtn45).should.eventually.be.equal('45'),
    ]);
  });

  it('Check select Eurojackpot main numbers field', function () {
    return Promise.all([
      this.app.client
        .getText(elements.EurojackpotChooseMainNumbersLbl)
        .should.eventually.be.equal('ΕΠΙΛΟΓΗ 10 ΑΡΙΘΜΩΝ'),
      this.app.client
        .getText(elements.EurojackpotChooseMainNumbers)
        .should.eventually.be.equal(
          '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n21\n22\n23\n24\n25\n26\n27\n28\n29\n30\n31\n32\n33\n34\n35\n36\n37\n38\n39\n40\n41\n42\n43\n44\n45\n46\n47\n48\n49\n50',
        ),
      this.app.client.getText(elements.EurojackpotChooseMainNumber1Btn).should.eventually.be.equal('1'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber2Btn).should.eventually.be.equal('2'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber3Btn).should.eventually.be.equal('3'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber4Btn).should.eventually.be.equal('4'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber5Btn).should.eventually.be.equal('5'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber6Btn).should.eventually.be.equal('6'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber7Btn).should.eventually.be.equal('7'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber8Btn).should.eventually.be.equal('8'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber9Btn).should.eventually.be.equal('9'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber10Btn).should.eventually.be.equal('10'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber11Btn).should.eventually.be.equal('11'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber12Btn).should.eventually.be.equal('12'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber13Btn).should.eventually.be.equal('13'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber14Btn).should.eventually.be.equal('14'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber15Btn).should.eventually.be.equal('15'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber16Btn).should.eventually.be.equal('16'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber17Btn).should.eventually.be.equal('17'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber18Btn).should.eventually.be.equal('18'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber19Btn).should.eventually.be.equal('19'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber20Btn).should.eventually.be.equal('20'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber21Btn).should.eventually.be.equal('21'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber22Btn).should.eventually.be.equal('22'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber23Btn).should.eventually.be.equal('23'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber24Btn).should.eventually.be.equal('24'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber25Btn).should.eventually.be.equal('25'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber26Btn).should.eventually.be.equal('26'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber27Btn).should.eventually.be.equal('27'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber28Btn).should.eventually.be.equal('28'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber29Btn).should.eventually.be.equal('29'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber30Btn).should.eventually.be.equal('30'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber31Btn).should.eventually.be.equal('31'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber32Btn).should.eventually.be.equal('32'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber33Btn).should.eventually.be.equal('33'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber34Btn).should.eventually.be.equal('34'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber35Btn).should.eventually.be.equal('35'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber36Btn).should.eventually.be.equal('36'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber37Btn).should.eventually.be.equal('37'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber38Btn).should.eventually.be.equal('38'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber39Btn).should.eventually.be.equal('39'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber40Btn).should.eventually.be.equal('40'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber41Btn).should.eventually.be.equal('41'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber42Btn).should.eventually.be.equal('42'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber43Btn).should.eventually.be.equal('43'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber44Btn).should.eventually.be.equal('44'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber45Btn).should.eventually.be.equal('45'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber46Btn).should.eventually.be.equal('46'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber47Btn).should.eventually.be.equal('47'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber48Btn).should.eventually.be.equal('48'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber49Btn).should.eventually.be.equal('49'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber50Btn).should.eventually.be.equal('50'),
    ]);
  });

  it('Check select Eurojackpot euro numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotChooseEuroNumbers).should.eventually.be.true,
      this.app.client
        .getText(elements.EurojackpotChooseEuroNumbersLbl)
        .should.eventually.be.equal('ΕΠΙΛΟΓΗ ΤΟΥΛΑΧΙΣΤΟΝ ☆ 2 ΑΡΙΘΜΩΝ'),
      this.app.client
        .getText(elements.EurojackpotChooseEuroNumbers)
        .should.eventually.be.equal('1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber1Btn).should.eventually.be.equal('1'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber2Btn).should.eventually.be.equal('2'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber3Btn).should.eventually.be.equal('3'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber4Btn).should.eventually.be.equal('4'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber5Btn).should.eventually.be.equal('5'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber6Btn).should.eventually.be.equal('6'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber7Btn).should.eventually.be.equal('7'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber8Btn).should.eventually.be.equal('8'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber9Btn).should.eventually.be.equal('9'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber10Btn).should.eventually.be.equal('10'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber11Btn).should.eventually.be.equal('11'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber12Btn).should.eventually.be.equal('12'),
    ]);
  });

  it('Select System 23 for Eurojackpot 10 main numbers and 2 euro numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotChooseEuroNumbers).should.eventually.be.true,
      this.app.client.click(elements.EurojackpotChooseMainNumber1Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber2Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber3Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber4Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber5Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber6Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber7Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber8Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber9Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber10Btn).should.eventually.be.fulfilled,

      this.app.client.click(elements.EurojackpotChooseEuroNumber1Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseEuroNumber2Btn).should.eventually.be.fulfilled,
    ]);
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('102€'),
      this.app.client.getText(elements.EurojackpotBetslipSystemA).should.eventually.be.equal('Σ23'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select System 23 for Eurojackpot 9 main numbers and 2 euro numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotChooseEuroNumbers).should.eventually.be.true,
      this.app.client.click(elements.EurojackpotChooseMainNumber10Btn).should.eventually.be.fulfilled,
    ]);
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('0€'),
      this.app.client.getText(elements.EurojackpotBetslipSystemA).should.eventually.be.equal('Σ23'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select System 23 for Eurojackpot 11 main numbers and 2 euro numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotChooseEuroNumbers).should.eventually.be.true,
      this.app.client.click(elements.EurojackpotChooseMainNumber10Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber11Btn).should.eventually.be.fulfilled,
    ]);
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('0€'),
      this.app.client.getText(elements.EurojackpotBetslipSystemA).should.eventually.be.equal('Σ23'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select System 23 for Eurojackpot 10 main numbers and 3 euro numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotChooseEuroNumbers).should.eventually.be.true,
      this.app.client.click(elements.EurojackpotChooseMainNumber11Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseEuroNumber3Btn).should.eventually.be.fulfilled,
    ]);
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('306€'),
      this.app.client.getText(elements.EurojackpotBetslipSystemA).should.eventually.be.equal('Σ23'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select Random Pick table', function () {
    return this.app.client.click(elements.EurojackpotRandomPickBtn).should.eventually.be.fulfilled;
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('306€'),
      this.app.client.getText(elements.EurojackpotBetslipSystemA).should.eventually.be.equal('Σ23'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select Clear All', function () {
    return this.app.client.click(elements.EurojackpotClearAllBtn).should.eventually.be.fulfilled;
  });

  it('Confirm Clear All', function () {
    let self = this;
    return Promise.all([
      this.app.client
        .elements(elements.EurojackpotModalAMsgLbl)
        .getAttribute('innerText')
        .should.eventually.be.equal('ΚΑΘΑΡΙΣΜΟΣ ΔΕΛΤΙΟΥ'),
      this.app.client
        .elements(elements.EurojackpotModalAMsg)
        .getAttribute('innerText')
        .should.eventually.be.equal(
          'Όλες οι επιλογές του δελτίου θα διαγραφούν. Είστε σίγουρος/η ότι θέλετε να συνεχίσετε;',
        ),
      this.app.client
        .elements(elements.EurojackpotModalAYesBtn)
        .getAttribute('innerText')
        .should.eventually.be.equal('Ναι'),
      this.app.client
        .elements(elements.EurojackpotModalANoBtn)
        .getAttribute('innerText')
        .should.eventually.be.equal('Όχι'),
    ]).then(function (values) {
      return (
        values[0] &&
        values[1] &&
        values[2] &&
        values[3] &&
        self.app.client.click(elements.EurojackpotModalAYesBtn).should.eventually.be.fulfilled
      );
    });
  });

  /////////////////////////////////////// System 24  /////////////////////////////////

  it('Check empty betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('0€'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select System 24', function () {
    return this.app.client.click(elements.EurojackpotSystemBtn24).should.eventually.be.fulfilled;
  });

  it('Check System field', function () {
    return Promise.all([
      this.app.client.getText(elements.EurojackpotSystemHeaderTitle).should.eventually.be.equal('ΣΥΣΤΗΜΑΤΑ'),
      this.app.client
        .getText(elements.EurojackpotSystemHeaderInfo)
        .should.eventually.be.equal(
          'Εδώ επιλέγεις να παίξεις με περισσότερους από 5 αριθμούς και με περισσότερες στήλες',
        ),
      this.app.client
        .getText(elements.EurojackpotSystemNumbers)
        .should.eventually.be.equal(
          '12\nΣΤΗΛΕΣ\n118\n13\nΣΤΗΛΕΣ\n54\n14\nΣΤΗΛΕΣ\n38\n15\nΣΤΗΛΕΣ\n22\n23\nΣΤΗΛΕΣ\n51\n24\nΣΤΗΛΕΣ\n14\n25\nΣΤΗΛΕΣ\n30\n34\nΣΤΗΛΕΣ\n9\n35\nΣΤΗΛΕΣ\n6\n45\nΣΤΗΛΕΣ\n5',
        ),
      this.app.client.isVisible(elements.EurojackpotSystemBtn12).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotSystemBtn12).should.eventually.be.equal('12'),
      this.app.client.getText(elements.EurojackpotSystemBtn13).should.eventually.be.equal('13'),
      this.app.client.getText(elements.EurojackpotSystemBtn14).should.eventually.be.equal('14'),
      this.app.client.getText(elements.EurojackpotSystemBtn15).should.eventually.be.equal('15'),
      this.app.client.getText(elements.EurojackpotSystemBtn23).should.eventually.be.equal('23'),
      this.app.client.getText(elements.EurojackpotSystemBtn24).should.eventually.be.equal('24'),
      this.app.client.getText(elements.EurojackpotSystemBtn25).should.eventually.be.equal('25'),
      this.app.client.getText(elements.EurojackpotSystemBtn34).should.eventually.be.equal('34'),
      this.app.client.getText(elements.EurojackpotSystemBtn35).should.eventually.be.equal('35'),
      this.app.client.getText(elements.EurojackpotSystemBtn45).should.eventually.be.equal('45'),
    ]);
  });

  it('Check select Eurojackpot main numbers field', function () {
    return Promise.all([
      this.app.client
        .getText(elements.EurojackpotChooseMainNumbersLbl)
        .should.eventually.be.equal('ΕΠΙΛΟΓΗ 10 ΑΡΙΘΜΩΝ'),
      this.app.client
        .getText(elements.EurojackpotChooseMainNumbers)
        .should.eventually.be.equal(
          '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n21\n22\n23\n24\n25\n26\n27\n28\n29\n30\n31\n32\n33\n34\n35\n36\n37\n38\n39\n40\n41\n42\n43\n44\n45\n46\n47\n48\n49\n50',
        ),
      this.app.client.getText(elements.EurojackpotChooseMainNumber1Btn).should.eventually.be.equal('1'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber2Btn).should.eventually.be.equal('2'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber3Btn).should.eventually.be.equal('3'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber4Btn).should.eventually.be.equal('4'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber5Btn).should.eventually.be.equal('5'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber6Btn).should.eventually.be.equal('6'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber7Btn).should.eventually.be.equal('7'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber8Btn).should.eventually.be.equal('8'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber9Btn).should.eventually.be.equal('9'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber10Btn).should.eventually.be.equal('10'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber11Btn).should.eventually.be.equal('11'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber12Btn).should.eventually.be.equal('12'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber13Btn).should.eventually.be.equal('13'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber14Btn).should.eventually.be.equal('14'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber15Btn).should.eventually.be.equal('15'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber16Btn).should.eventually.be.equal('16'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber17Btn).should.eventually.be.equal('17'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber18Btn).should.eventually.be.equal('18'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber19Btn).should.eventually.be.equal('19'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber20Btn).should.eventually.be.equal('20'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber21Btn).should.eventually.be.equal('21'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber22Btn).should.eventually.be.equal('22'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber23Btn).should.eventually.be.equal('23'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber24Btn).should.eventually.be.equal('24'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber25Btn).should.eventually.be.equal('25'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber26Btn).should.eventually.be.equal('26'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber27Btn).should.eventually.be.equal('27'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber28Btn).should.eventually.be.equal('28'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber29Btn).should.eventually.be.equal('29'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber30Btn).should.eventually.be.equal('30'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber31Btn).should.eventually.be.equal('31'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber32Btn).should.eventually.be.equal('32'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber33Btn).should.eventually.be.equal('33'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber34Btn).should.eventually.be.equal('34'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber35Btn).should.eventually.be.equal('35'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber36Btn).should.eventually.be.equal('36'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber37Btn).should.eventually.be.equal('37'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber38Btn).should.eventually.be.equal('38'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber39Btn).should.eventually.be.equal('39'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber40Btn).should.eventually.be.equal('40'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber41Btn).should.eventually.be.equal('41'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber42Btn).should.eventually.be.equal('42'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber43Btn).should.eventually.be.equal('43'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber44Btn).should.eventually.be.equal('44'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber45Btn).should.eventually.be.equal('45'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber46Btn).should.eventually.be.equal('46'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber47Btn).should.eventually.be.equal('47'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber48Btn).should.eventually.be.equal('48'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber49Btn).should.eventually.be.equal('49'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber50Btn).should.eventually.be.equal('50'),
    ]);
  });

  it('Check select Eurojackpot euro numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotChooseEuroNumbers).should.eventually.be.true,
      this.app.client
        .getText(elements.EurojackpotChooseEuroNumbersLbl)
        .should.eventually.be.equal('ΕΠΙΛΟΓΗ ΤΟΥΛΑΧΙΣΤΟΝ ☆ 2 ΑΡΙΘΜΩΝ'),
      this.app.client
        .getText(elements.EurojackpotChooseEuroNumbers)
        .should.eventually.be.equal('1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber1Btn).should.eventually.be.equal('1'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber2Btn).should.eventually.be.equal('2'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber3Btn).should.eventually.be.equal('3'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber4Btn).should.eventually.be.equal('4'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber5Btn).should.eventually.be.equal('5'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber6Btn).should.eventually.be.equal('6'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber7Btn).should.eventually.be.equal('7'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber8Btn).should.eventually.be.equal('8'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber9Btn).should.eventually.be.equal('9'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber10Btn).should.eventually.be.equal('10'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber11Btn).should.eventually.be.equal('11'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber12Btn).should.eventually.be.equal('12'),
    ]);
  });

  it('Select System 24 for Eurojackpot 10 main numbers and 2 euro numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotChooseEuroNumbers).should.eventually.be.true,
      this.app.client.click(elements.EurojackpotChooseMainNumber1Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber2Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber3Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber4Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber5Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber6Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber7Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber8Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber9Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber10Btn).should.eventually.be.fulfilled,

      this.app.client.click(elements.EurojackpotChooseEuroNumber1Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseEuroNumber2Btn).should.eventually.be.fulfilled,
    ]);
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('28€'),
      this.app.client.getText(elements.EurojackpotBetslipSystemA).should.eventually.be.equal('Σ24'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select System 24 for Eurojackpot 9 main numbers and 2 euro numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotChooseEuroNumbers).should.eventually.be.true,
      this.app.client.click(elements.EurojackpotChooseMainNumber10Btn).should.eventually.be.fulfilled,
    ]);
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('0€'),
      this.app.client.getText(elements.EurojackpotBetslipSystemA).should.eventually.be.equal('Σ24'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select System 24 for Eurojackpot 11 main numbers and 2 euro numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotChooseEuroNumbers).should.eventually.be.true,
      this.app.client.click(elements.EurojackpotChooseMainNumber10Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber11Btn).should.eventually.be.fulfilled,
    ]);
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('0€'),
      this.app.client.getText(elements.EurojackpotBetslipSystemA).should.eventually.be.equal('Σ24'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select System 24 for Eurojackpot 10 main numbers and 3 euro numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotChooseEuroNumbers).should.eventually.be.true,
      this.app.client.click(elements.EurojackpotChooseMainNumber11Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseEuroNumber3Btn).should.eventually.be.fulfilled,
    ]);
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('84€'),
      this.app.client.getText(elements.EurojackpotBetslipSystemA).should.eventually.be.equal('Σ24'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select Random Pick table', function () {
    return this.app.client.click(elements.EurojackpotRandomPickBtn).should.eventually.be.fulfilled;
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('84€'),
      this.app.client.getText(elements.EurojackpotBetslipSystemA).should.eventually.be.equal('Σ24'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select Clear All', function () {
    return this.app.client.click(elements.EurojackpotClearAllBtn).should.eventually.be.fulfilled;
  });

  it('Confirm Clear All', function () {
    let self = this;
    return Promise.all([
      this.app.client
        .elements(elements.EurojackpotModalAMsgLbl)
        .getAttribute('innerText')
        .should.eventually.be.equal('ΚΑΘΑΡΙΣΜΟΣ ΔΕΛΤΙΟΥ'),
      this.app.client
        .elements(elements.EurojackpotModalAMsg)
        .getAttribute('innerText')
        .should.eventually.be.equal(
          'Όλες οι επιλογές του δελτίου θα διαγραφούν. Είστε σίγουρος/η ότι θέλετε να συνεχίσετε;',
        ),
      this.app.client
        .elements(elements.EurojackpotModalAYesBtn)
        .getAttribute('innerText')
        .should.eventually.be.equal('Ναι'),
      this.app.client
        .elements(elements.EurojackpotModalANoBtn)
        .getAttribute('innerText')
        .should.eventually.be.equal('Όχι'),
    ]).then(function (values) {
      return (
        values[0] &&
        values[1] &&
        values[2] &&
        values[3] &&
        self.app.client.click(elements.EurojackpotModalAYesBtn).should.eventually.be.fulfilled
      );
    });
  });

  /////////////////////////////////////// System 25  /////////////////////////////////

  it('Check empty betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('0€'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select System 25', function () {
    return this.app.client.click(elements.EurojackpotSystemBtn25).should.eventually.be.fulfilled;
  });

  it('Check System field', function () {
    return Promise.all([
      this.app.client.getText(elements.EurojackpotSystemHeaderTitle).should.eventually.be.equal('ΣΥΣΤΗΜΑΤΑ'),
      this.app.client
        .getText(elements.EurojackpotSystemHeaderInfo)
        .should.eventually.be.equal(
          'Εδώ επιλέγεις να παίξεις με περισσότερους από 5 αριθμούς και με περισσότερες στήλες',
        ),
      this.app.client
        .getText(elements.EurojackpotSystemNumbers)
        .should.eventually.be.equal(
          '12\nΣΤΗΛΕΣ\n118\n13\nΣΤΗΛΕΣ\n54\n14\nΣΤΗΛΕΣ\n38\n15\nΣΤΗΛΕΣ\n22\n23\nΣΤΗΛΕΣ\n51\n24\nΣΤΗΛΕΣ\n14\n25\nΣΤΗΛΕΣ\n30\n34\nΣΤΗΛΕΣ\n9\n35\nΣΤΗΛΕΣ\n6\n45\nΣΤΗΛΕΣ\n5',
        ),
      this.app.client.isVisible(elements.EurojackpotSystemBtn12).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotSystemBtn12).should.eventually.be.equal('12'),
      this.app.client.getText(elements.EurojackpotSystemBtn13).should.eventually.be.equal('13'),
      this.app.client.getText(elements.EurojackpotSystemBtn14).should.eventually.be.equal('14'),
      this.app.client.getText(elements.EurojackpotSystemBtn15).should.eventually.be.equal('15'),
      this.app.client.getText(elements.EurojackpotSystemBtn23).should.eventually.be.equal('23'),
      this.app.client.getText(elements.EurojackpotSystemBtn24).should.eventually.be.equal('24'),
      this.app.client.getText(elements.EurojackpotSystemBtn25).should.eventually.be.equal('25'),
      this.app.client.getText(elements.EurojackpotSystemBtn34).should.eventually.be.equal('34'),
      this.app.client.getText(elements.EurojackpotSystemBtn35).should.eventually.be.equal('35'),
      this.app.client.getText(elements.EurojackpotSystemBtn45).should.eventually.be.equal('45'),
    ]);
  });

  it('Check select Eurojackpot main numbers field', function () {
    return Promise.all([
      this.app.client.getText(elements.EurojackpotChooseMainNumbersLbl).should.eventually.be.equal('ΕΠΙΛΟΓΗ 9 ΑΡΙΘΜΩΝ'),
      this.app.client
        .getText(elements.EurojackpotChooseMainNumbers)
        .should.eventually.be.equal(
          '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n21\n22\n23\n24\n25\n26\n27\n28\n29\n30\n31\n32\n33\n34\n35\n36\n37\n38\n39\n40\n41\n42\n43\n44\n45\n46\n47\n48\n49\n50',
        ),
      this.app.client.getText(elements.EurojackpotChooseMainNumber1Btn).should.eventually.be.equal('1'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber2Btn).should.eventually.be.equal('2'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber3Btn).should.eventually.be.equal('3'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber4Btn).should.eventually.be.equal('4'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber5Btn).should.eventually.be.equal('5'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber6Btn).should.eventually.be.equal('6'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber7Btn).should.eventually.be.equal('7'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber8Btn).should.eventually.be.equal('8'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber9Btn).should.eventually.be.equal('9'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber10Btn).should.eventually.be.equal('10'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber11Btn).should.eventually.be.equal('11'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber12Btn).should.eventually.be.equal('12'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber13Btn).should.eventually.be.equal('13'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber14Btn).should.eventually.be.equal('14'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber15Btn).should.eventually.be.equal('15'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber16Btn).should.eventually.be.equal('16'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber17Btn).should.eventually.be.equal('17'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber18Btn).should.eventually.be.equal('18'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber19Btn).should.eventually.be.equal('19'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber20Btn).should.eventually.be.equal('20'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber21Btn).should.eventually.be.equal('21'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber22Btn).should.eventually.be.equal('22'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber23Btn).should.eventually.be.equal('23'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber24Btn).should.eventually.be.equal('24'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber25Btn).should.eventually.be.equal('25'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber26Btn).should.eventually.be.equal('26'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber27Btn).should.eventually.be.equal('27'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber28Btn).should.eventually.be.equal('28'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber29Btn).should.eventually.be.equal('29'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber30Btn).should.eventually.be.equal('30'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber31Btn).should.eventually.be.equal('31'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber32Btn).should.eventually.be.equal('32'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber33Btn).should.eventually.be.equal('33'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber34Btn).should.eventually.be.equal('34'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber35Btn).should.eventually.be.equal('35'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber36Btn).should.eventually.be.equal('36'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber37Btn).should.eventually.be.equal('37'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber38Btn).should.eventually.be.equal('38'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber39Btn).should.eventually.be.equal('39'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber40Btn).should.eventually.be.equal('40'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber41Btn).should.eventually.be.equal('41'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber42Btn).should.eventually.be.equal('42'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber43Btn).should.eventually.be.equal('43'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber44Btn).should.eventually.be.equal('44'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber45Btn).should.eventually.be.equal('45'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber46Btn).should.eventually.be.equal('46'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber47Btn).should.eventually.be.equal('47'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber48Btn).should.eventually.be.equal('48'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber49Btn).should.eventually.be.equal('49'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber50Btn).should.eventually.be.equal('50'),
    ]);
  });

  it('Check select Eurojackpot euro numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotChooseEuroNumbers).should.eventually.be.true,
      this.app.client
        .getText(elements.EurojackpotChooseEuroNumbersLbl)
        .should.eventually.be.equal('ΕΠΙΛΟΓΗ ΤΟΥΛΑΧΙΣΤΟΝ ☆ 2 ΑΡΙΘΜΩΝ'),
      this.app.client
        .getText(elements.EurojackpotChooseEuroNumbers)
        .should.eventually.be.equal('1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber1Btn).should.eventually.be.equal('1'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber2Btn).should.eventually.be.equal('2'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber3Btn).should.eventually.be.equal('3'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber4Btn).should.eventually.be.equal('4'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber5Btn).should.eventually.be.equal('5'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber6Btn).should.eventually.be.equal('6'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber7Btn).should.eventually.be.equal('7'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber8Btn).should.eventually.be.equal('8'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber9Btn).should.eventually.be.equal('9'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber10Btn).should.eventually.be.equal('10'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber11Btn).should.eventually.be.equal('11'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber12Btn).should.eventually.be.equal('12'),
    ]);
  });

  it('Select System 25 for Eurojackpot 9 main numbers and 2 euro numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotChooseEuroNumbers).should.eventually.be.true,
      this.app.client.click(elements.EurojackpotChooseMainNumber1Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber2Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber3Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber4Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber5Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber6Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber7Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber8Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber9Btn).should.eventually.be.fulfilled,

      this.app.client.click(elements.EurojackpotChooseEuroNumber1Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseEuroNumber2Btn).should.eventually.be.fulfilled,
    ]);
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('60€'),
      this.app.client.getText(elements.EurojackpotBetslipSystemA).should.eventually.be.equal('Σ25'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select System 25 for Eurojackpot 8 main numbers and 2 euro numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotChooseEuroNumbers).should.eventually.be.true,
      this.app.client.click(elements.EurojackpotChooseMainNumber9Btn).should.eventually.be.fulfilled,
    ]);
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('0€'),
      this.app.client.getText(elements.EurojackpotBetslipSystemA).should.eventually.be.equal('Σ25'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select System 25 for Eurojackpot 10 main numbers and 2 euro numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotChooseEuroNumbers).should.eventually.be.true,
      this.app.client.click(elements.EurojackpotChooseMainNumber9Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber10Btn).should.eventually.be.fulfilled,
    ]);
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('0€'),
      this.app.client.getText(elements.EurojackpotBetslipSystemA).should.eventually.be.equal('Σ25'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select System 25 for Eurojackpot 9 main numbers and 3 euro numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotChooseEuroNumbers).should.eventually.be.true,
      this.app.client.click(elements.EurojackpotChooseMainNumber10Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseEuroNumber3Btn).should.eventually.be.fulfilled,
    ]);
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('180€'),
      this.app.client.getText(elements.EurojackpotBetslipSystemA).should.eventually.be.equal('Σ25'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select Random Pick table', function () {
    return this.app.client.click(elements.EurojackpotRandomPickBtn).should.eventually.be.fulfilled;
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('180€'),
      this.app.client.getText(elements.EurojackpotBetslipSystemA).should.eventually.be.equal('Σ25'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select Clear All', function () {
    return this.app.client.click(elements.EurojackpotClearAllBtn).should.eventually.be.fulfilled;
  });

  it('Confirm Clear All', function () {
    let self = this;
    return Promise.all([
      this.app.client
        .elements(elements.EurojackpotModalAMsgLbl)
        .getAttribute('innerText')
        .should.eventually.be.equal('ΚΑΘΑΡΙΣΜΟΣ ΔΕΛΤΙΟΥ'),
      this.app.client
        .elements(elements.EurojackpotModalAMsg)
        .getAttribute('innerText')
        .should.eventually.be.equal(
          'Όλες οι επιλογές του δελτίου θα διαγραφούν. Είστε σίγουρος/η ότι θέλετε να συνεχίσετε;',
        ),
      this.app.client
        .elements(elements.EurojackpotModalAYesBtn)
        .getAttribute('innerText')
        .should.eventually.be.equal('Ναι'),
      this.app.client
        .elements(elements.EurojackpotModalANoBtn)
        .getAttribute('innerText')
        .should.eventually.be.equal('Όχι'),
    ]).then(function (values) {
      return (
        values[0] &&
        values[1] &&
        values[2] &&
        values[3] &&
        self.app.client.click(elements.EurojackpotModalAYesBtn).should.eventually.be.fulfilled
      );
    });
  });

  /////////////////////////////////////// System 34  /////////////////////////////////

  it('Check empty betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('0€'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select System 34', function () {
    return this.app.client.click(elements.EurojackpotSystemBtn34).should.eventually.be.fulfilled;
  });

  it('Check System field', function () {
    return Promise.all([
      this.app.client.getText(elements.EurojackpotSystemHeaderTitle).should.eventually.be.equal('ΣΥΣΤΗΜΑΤΑ'),
      this.app.client
        .getText(elements.EurojackpotSystemHeaderInfo)
        .should.eventually.be.equal(
          'Εδώ επιλέγεις να παίξεις με περισσότερους από 5 αριθμούς και με περισσότερες στήλες',
        ),
      this.app.client
        .getText(elements.EurojackpotSystemNumbers)
        .should.eventually.be.equal(
          '12\nΣΤΗΛΕΣ\n118\n13\nΣΤΗΛΕΣ\n54\n14\nΣΤΗΛΕΣ\n38\n15\nΣΤΗΛΕΣ\n22\n23\nΣΤΗΛΕΣ\n51\n24\nΣΤΗΛΕΣ\n14\n25\nΣΤΗΛΕΣ\n30\n34\nΣΤΗΛΕΣ\n9\n35\nΣΤΗΛΕΣ\n6\n45\nΣΤΗΛΕΣ\n5',
        ),
      this.app.client.isVisible(elements.EurojackpotSystemBtn12).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotSystemBtn12).should.eventually.be.equal('12'),
      this.app.client.getText(elements.EurojackpotSystemBtn13).should.eventually.be.equal('13'),
      this.app.client.getText(elements.EurojackpotSystemBtn14).should.eventually.be.equal('14'),
      this.app.client.getText(elements.EurojackpotSystemBtn15).should.eventually.be.equal('15'),
      this.app.client.getText(elements.EurojackpotSystemBtn23).should.eventually.be.equal('23'),
      this.app.client.getText(elements.EurojackpotSystemBtn24).should.eventually.be.equal('24'),
      this.app.client.getText(elements.EurojackpotSystemBtn25).should.eventually.be.equal('25'),
      this.app.client.getText(elements.EurojackpotSystemBtn34).should.eventually.be.equal('34'),
      this.app.client.getText(elements.EurojackpotSystemBtn35).should.eventually.be.equal('35'),
      this.app.client.getText(elements.EurojackpotSystemBtn45).should.eventually.be.equal('45'),
    ]);
  });

  it('Check select Eurojackpot main numbers field', function () {
    return Promise.all([
      this.app.client.getText(elements.EurojackpotChooseMainNumbersLbl).should.eventually.be.equal('ΕΠΙΛΟΓΗ 9 ΑΡΙΘΜΩΝ'),
      this.app.client
        .getText(elements.EurojackpotChooseMainNumbers)
        .should.eventually.be.equal(
          '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n21\n22\n23\n24\n25\n26\n27\n28\n29\n30\n31\n32\n33\n34\n35\n36\n37\n38\n39\n40\n41\n42\n43\n44\n45\n46\n47\n48\n49\n50',
        ),
      this.app.client.getText(elements.EurojackpotChooseMainNumber1Btn).should.eventually.be.equal('1'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber2Btn).should.eventually.be.equal('2'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber3Btn).should.eventually.be.equal('3'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber4Btn).should.eventually.be.equal('4'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber5Btn).should.eventually.be.equal('5'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber6Btn).should.eventually.be.equal('6'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber7Btn).should.eventually.be.equal('7'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber8Btn).should.eventually.be.equal('8'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber9Btn).should.eventually.be.equal('9'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber10Btn).should.eventually.be.equal('10'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber11Btn).should.eventually.be.equal('11'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber12Btn).should.eventually.be.equal('12'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber13Btn).should.eventually.be.equal('13'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber14Btn).should.eventually.be.equal('14'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber15Btn).should.eventually.be.equal('15'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber16Btn).should.eventually.be.equal('16'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber17Btn).should.eventually.be.equal('17'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber18Btn).should.eventually.be.equal('18'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber19Btn).should.eventually.be.equal('19'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber20Btn).should.eventually.be.equal('20'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber21Btn).should.eventually.be.equal('21'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber22Btn).should.eventually.be.equal('22'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber23Btn).should.eventually.be.equal('23'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber24Btn).should.eventually.be.equal('24'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber25Btn).should.eventually.be.equal('25'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber26Btn).should.eventually.be.equal('26'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber27Btn).should.eventually.be.equal('27'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber28Btn).should.eventually.be.equal('28'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber29Btn).should.eventually.be.equal('29'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber30Btn).should.eventually.be.equal('30'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber31Btn).should.eventually.be.equal('31'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber32Btn).should.eventually.be.equal('32'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber33Btn).should.eventually.be.equal('33'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber34Btn).should.eventually.be.equal('34'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber35Btn).should.eventually.be.equal('35'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber36Btn).should.eventually.be.equal('36'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber37Btn).should.eventually.be.equal('37'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber38Btn).should.eventually.be.equal('38'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber39Btn).should.eventually.be.equal('39'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber40Btn).should.eventually.be.equal('40'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber41Btn).should.eventually.be.equal('41'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber42Btn).should.eventually.be.equal('42'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber43Btn).should.eventually.be.equal('43'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber44Btn).should.eventually.be.equal('44'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber45Btn).should.eventually.be.equal('45'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber46Btn).should.eventually.be.equal('46'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber47Btn).should.eventually.be.equal('47'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber48Btn).should.eventually.be.equal('48'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber49Btn).should.eventually.be.equal('49'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber50Btn).should.eventually.be.equal('50'),
    ]);
  });

  it('Check select Eurojackpot euro numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotChooseEuroNumbers).should.eventually.be.true,
      this.app.client
        .getText(elements.EurojackpotChooseEuroNumbersLbl)
        .should.eventually.be.equal('ΕΠΙΛΟΓΗ ΤΟΥΛΑΧΙΣΤΟΝ ☆ 2 ΑΡΙΘΜΩΝ'),
      this.app.client
        .getText(elements.EurojackpotChooseEuroNumbers)
        .should.eventually.be.equal('1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber1Btn).should.eventually.be.equal('1'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber2Btn).should.eventually.be.equal('2'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber3Btn).should.eventually.be.equal('3'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber4Btn).should.eventually.be.equal('4'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber5Btn).should.eventually.be.equal('5'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber6Btn).should.eventually.be.equal('6'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber7Btn).should.eventually.be.equal('7'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber8Btn).should.eventually.be.equal('8'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber9Btn).should.eventually.be.equal('9'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber10Btn).should.eventually.be.equal('10'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber11Btn).should.eventually.be.equal('11'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber12Btn).should.eventually.be.equal('12'),
    ]);
  });

  it('Select System 34 for Eurojackpot 9 main numbers and 2 euro numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotChooseEuroNumbers).should.eventually.be.true,
      this.app.client.click(elements.EurojackpotChooseMainNumber1Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber2Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber3Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber4Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber5Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber6Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber7Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber8Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber9Btn).should.eventually.be.fulfilled,

      this.app.client.click(elements.EurojackpotChooseEuroNumber1Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseEuroNumber2Btn).should.eventually.be.fulfilled,
    ]);
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('18€'),
      this.app.client.getText(elements.EurojackpotBetslipSystemA).should.eventually.be.equal('Σ34'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select System 34 for Eurojackpot 8 main numbers and 2 euro numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotChooseEuroNumbers).should.eventually.be.true,
      this.app.client.click(elements.EurojackpotChooseMainNumber9Btn).should.eventually.be.fulfilled,
    ]);
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('0€'),
      this.app.client.getText(elements.EurojackpotBetslipSystemA).should.eventually.be.equal('Σ34'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select System 34 for Eurojackpot 10 main numbers and 2 euro numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotChooseEuroNumbers).should.eventually.be.true,
      this.app.client.click(elements.EurojackpotChooseMainNumber9Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber10Btn).should.eventually.be.fulfilled,
    ]);
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('0€'),
      this.app.client.getText(elements.EurojackpotBetslipSystemA).should.eventually.be.equal('Σ34'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select System 34 for Eurojackpot 9 main numbers and 3 euro numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotChooseEuroNumbers).should.eventually.be.true,
      this.app.client.click(elements.EurojackpotChooseMainNumber10Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseEuroNumber3Btn).should.eventually.be.fulfilled,
    ]);
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('54€'),
      this.app.client.getText(elements.EurojackpotBetslipSystemA).should.eventually.be.equal('Σ34'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select Random Pick table', function () {
    return this.app.client.click(elements.EurojackpotRandomPickBtn).should.eventually.be.fulfilled;
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('54€'),
      this.app.client.getText(elements.EurojackpotBetslipSystemA).should.eventually.be.equal('Σ34'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select Clear All', function () {
    return this.app.client.click(elements.EurojackpotClearAllBtn).should.eventually.be.fulfilled;
  });

  it('Confirm Clear All', function () {
    let self = this;
    return Promise.all([
      this.app.client
        .elements(elements.EurojackpotModalAMsgLbl)
        .getAttribute('innerText')
        .should.eventually.be.equal('ΚΑΘΑΡΙΣΜΟΣ ΔΕΛΤΙΟΥ'),
      this.app.client
        .elements(elements.EurojackpotModalAMsg)
        .getAttribute('innerText')
        .should.eventually.be.equal(
          'Όλες οι επιλογές του δελτίου θα διαγραφούν. Είστε σίγουρος/η ότι θέλετε να συνεχίσετε;',
        ),
      this.app.client
        .elements(elements.EurojackpotModalAYesBtn)
        .getAttribute('innerText')
        .should.eventually.be.equal('Ναι'),
      this.app.client
        .elements(elements.EurojackpotModalANoBtn)
        .getAttribute('innerText')
        .should.eventually.be.equal('Όχι'),
    ]).then(function (values) {
      return (
        values[0] &&
        values[1] &&
        values[2] &&
        values[3] &&
        self.app.client.click(elements.EurojackpotModalAYesBtn).should.eventually.be.fulfilled
      );
    });
  });

  /////////////////////////////////////// System 35  /////////////////////////////////

  it('Check empty betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('0€'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select System 35', function () {
    return this.app.client.click(elements.EurojackpotSystemBtn35).should.eventually.be.fulfilled;
  });

  it('Check System field', function () {
    return Promise.all([
      this.app.client.getText(elements.EurojackpotSystemHeaderTitle).should.eventually.be.equal('ΣΥΣΤΗΜΑΤΑ'),
      this.app.client
        .getText(elements.EurojackpotSystemHeaderInfo)
        .should.eventually.be.equal(
          'Εδώ επιλέγεις να παίξεις με περισσότερους από 5 αριθμούς και με περισσότερες στήλες',
        ),
      this.app.client
        .getText(elements.EurojackpotSystemNumbers)
        .should.eventually.be.equal(
          '12\nΣΤΗΛΕΣ\n118\n13\nΣΤΗΛΕΣ\n54\n14\nΣΤΗΛΕΣ\n38\n15\nΣΤΗΛΕΣ\n22\n23\nΣΤΗΛΕΣ\n51\n24\nΣΤΗΛΕΣ\n14\n25\nΣΤΗΛΕΣ\n30\n34\nΣΤΗΛΕΣ\n9\n35\nΣΤΗΛΕΣ\n6\n45\nΣΤΗΛΕΣ\n5',
        ),
      this.app.client.isVisible(elements.EurojackpotSystemBtn12).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotSystemBtn12).should.eventually.be.equal('12'),
      this.app.client.getText(elements.EurojackpotSystemBtn13).should.eventually.be.equal('13'),
      this.app.client.getText(elements.EurojackpotSystemBtn14).should.eventually.be.equal('14'),
      this.app.client.getText(elements.EurojackpotSystemBtn15).should.eventually.be.equal('15'),
      this.app.client.getText(elements.EurojackpotSystemBtn23).should.eventually.be.equal('23'),
      this.app.client.getText(elements.EurojackpotSystemBtn24).should.eventually.be.equal('24'),
      this.app.client.getText(elements.EurojackpotSystemBtn25).should.eventually.be.equal('25'),
      this.app.client.getText(elements.EurojackpotSystemBtn34).should.eventually.be.equal('34'),
      this.app.client.getText(elements.EurojackpotSystemBtn35).should.eventually.be.equal('35'),
      this.app.client.getText(elements.EurojackpotSystemBtn45).should.eventually.be.equal('45'),
    ]);
  });

  it('Check select Eurojackpot main numbers field', function () {
    return Promise.all([
      this.app.client.getText(elements.EurojackpotChooseMainNumbersLbl).should.eventually.be.equal('ΕΠΙΛΟΓΗ 8 ΑΡΙΘΜΩΝ'),
      this.app.client
        .getText(elements.EurojackpotChooseMainNumbers)
        .should.eventually.be.equal(
          '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n21\n22\n23\n24\n25\n26\n27\n28\n29\n30\n31\n32\n33\n34\n35\n36\n37\n38\n39\n40\n41\n42\n43\n44\n45\n46\n47\n48\n49\n50',
        ),
      this.app.client.getText(elements.EurojackpotChooseMainNumber1Btn).should.eventually.be.equal('1'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber2Btn).should.eventually.be.equal('2'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber3Btn).should.eventually.be.equal('3'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber4Btn).should.eventually.be.equal('4'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber5Btn).should.eventually.be.equal('5'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber6Btn).should.eventually.be.equal('6'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber7Btn).should.eventually.be.equal('7'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber8Btn).should.eventually.be.equal('8'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber9Btn).should.eventually.be.equal('9'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber10Btn).should.eventually.be.equal('10'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber11Btn).should.eventually.be.equal('11'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber12Btn).should.eventually.be.equal('12'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber13Btn).should.eventually.be.equal('13'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber14Btn).should.eventually.be.equal('14'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber15Btn).should.eventually.be.equal('15'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber16Btn).should.eventually.be.equal('16'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber17Btn).should.eventually.be.equal('17'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber18Btn).should.eventually.be.equal('18'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber19Btn).should.eventually.be.equal('19'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber20Btn).should.eventually.be.equal('20'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber21Btn).should.eventually.be.equal('21'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber22Btn).should.eventually.be.equal('22'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber23Btn).should.eventually.be.equal('23'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber24Btn).should.eventually.be.equal('24'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber25Btn).should.eventually.be.equal('25'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber26Btn).should.eventually.be.equal('26'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber27Btn).should.eventually.be.equal('27'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber28Btn).should.eventually.be.equal('28'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber29Btn).should.eventually.be.equal('29'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber30Btn).should.eventually.be.equal('30'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber31Btn).should.eventually.be.equal('31'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber32Btn).should.eventually.be.equal('32'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber33Btn).should.eventually.be.equal('33'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber34Btn).should.eventually.be.equal('34'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber35Btn).should.eventually.be.equal('35'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber36Btn).should.eventually.be.equal('36'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber37Btn).should.eventually.be.equal('37'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber38Btn).should.eventually.be.equal('38'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber39Btn).should.eventually.be.equal('39'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber40Btn).should.eventually.be.equal('40'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber41Btn).should.eventually.be.equal('41'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber42Btn).should.eventually.be.equal('42'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber43Btn).should.eventually.be.equal('43'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber44Btn).should.eventually.be.equal('44'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber45Btn).should.eventually.be.equal('45'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber46Btn).should.eventually.be.equal('46'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber47Btn).should.eventually.be.equal('47'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber48Btn).should.eventually.be.equal('48'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber49Btn).should.eventually.be.equal('49'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber50Btn).should.eventually.be.equal('50'),
    ]);
  });

  it('Check select Eurojackpot euro numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotChooseEuroNumbers).should.eventually.be.true,
      this.app.client
        .getText(elements.EurojackpotChooseEuroNumbersLbl)
        .should.eventually.be.equal('ΕΠΙΛΟΓΗ ΤΟΥΛΑΧΙΣΤΟΝ ☆ 2 ΑΡΙΘΜΩΝ'),
      this.app.client
        .getText(elements.EurojackpotChooseEuroNumbers)
        .should.eventually.be.equal('1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber1Btn).should.eventually.be.equal('1'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber2Btn).should.eventually.be.equal('2'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber3Btn).should.eventually.be.equal('3'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber4Btn).should.eventually.be.equal('4'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber5Btn).should.eventually.be.equal('5'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber6Btn).should.eventually.be.equal('6'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber7Btn).should.eventually.be.equal('7'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber8Btn).should.eventually.be.equal('8'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber9Btn).should.eventually.be.equal('9'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber10Btn).should.eventually.be.equal('10'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber11Btn).should.eventually.be.equal('11'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber12Btn).should.eventually.be.equal('12'),
    ]);
  });

  it('Select System 35 for Eurojackpot 8 main numbers and 2 euro numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotChooseEuroNumbers).should.eventually.be.true,
      this.app.client.click(elements.EurojackpotChooseMainNumber1Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber2Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber3Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber4Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber5Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber6Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber7Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber8Btn).should.eventually.be.fulfilled,

      this.app.client.click(elements.EurojackpotChooseEuroNumber1Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseEuroNumber2Btn).should.eventually.be.fulfilled,
    ]);
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('12€'),
      this.app.client.getText(elements.EurojackpotBetslipSystemA).should.eventually.be.equal('Σ35'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select System 35 for Eurojackpot 7 main numbers and 2 euro numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotChooseEuroNumbers).should.eventually.be.true,
      this.app.client.click(elements.EurojackpotChooseMainNumber8Btn).should.eventually.be.fulfilled,
    ]);
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('0€'),
      this.app.client.getText(elements.EurojackpotBetslipSystemA).should.eventually.be.equal('Σ35'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select System 35 for Eurojackpot 9 main numbers and 2 euro numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotChooseEuroNumbers).should.eventually.be.true,
      this.app.client.click(elements.EurojackpotChooseMainNumber8Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber9Btn).should.eventually.be.fulfilled,
    ]);
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('0€'),
      this.app.client.getText(elements.EurojackpotBetslipSystemA).should.eventually.be.equal('Σ35'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select System 35 for Eurojackpot 15 main numbers and 3 euro numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotChooseEuroNumbers).should.eventually.be.true,
      this.app.client.click(elements.EurojackpotChooseMainNumber9Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseEuroNumber3Btn).should.eventually.be.fulfilled,
    ]);
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('36€'),
      this.app.client.getText(elements.EurojackpotBetslipSystemA).should.eventually.be.equal('Σ35'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select Random Pick table', function () {
    return this.app.client.click(elements.EurojackpotRandomPickBtn).should.eventually.be.fulfilled;
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('36€'),
      this.app.client.getText(elements.EurojackpotBetslipSystemA).should.eventually.be.equal('Σ35'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select Clear All', function () {
    return this.app.client.click(elements.EurojackpotClearAllBtn).should.eventually.be.fulfilled;
  });

  it('Confirm Clear All', function () {
    let self = this;
    return Promise.all([
      this.app.client
        .elements(elements.EurojackpotModalAMsgLbl)
        .getAttribute('innerText')
        .should.eventually.be.equal('ΚΑΘΑΡΙΣΜΟΣ ΔΕΛΤΙΟΥ'),
      this.app.client
        .elements(elements.EurojackpotModalAMsg)
        .getAttribute('innerText')
        .should.eventually.be.equal(
          'Όλες οι επιλογές του δελτίου θα διαγραφούν. Είστε σίγουρος/η ότι θέλετε να συνεχίσετε;',
        ),
      this.app.client
        .elements(elements.EurojackpotModalAYesBtn)
        .getAttribute('innerText')
        .should.eventually.be.equal('Ναι'),
      this.app.client
        .elements(elements.EurojackpotModalANoBtn)
        .getAttribute('innerText')
        .should.eventually.be.equal('Όχι'),
    ]).then(function (values) {
      return (
        values[0] &&
        values[1] &&
        values[2] &&
        values[3] &&
        self.app.client.click(elements.EurojackpotModalAYesBtn).should.eventually.be.fulfilled
      );
    });
  });

  /////////////////////////////////////// System 45  /////////////////////////////////

  it('Check empty betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('0€'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select System 45', function () {
    return this.app.client.click(elements.EurojackpotSystemBtn45).should.eventually.be.fulfilled;
  });

  it('Check System field', function () {
    return Promise.all([
      this.app.client.getText(elements.EurojackpotSystemHeaderTitle).should.eventually.be.equal('ΣΥΣΤΗΜΑΤΑ'),
      this.app.client
        .getText(elements.EurojackpotSystemHeaderInfo)
        .should.eventually.be.equal(
          'Εδώ επιλέγεις να παίξεις με περισσότερους από 5 αριθμούς και με περισσότερες στήλες',
        ),
      this.app.client
        .getText(elements.EurojackpotSystemNumbers)
        .should.eventually.be.equal(
          '12\nΣΤΗΛΕΣ\n118\n13\nΣΤΗΛΕΣ\n54\n14\nΣΤΗΛΕΣ\n38\n15\nΣΤΗΛΕΣ\n22\n23\nΣΤΗΛΕΣ\n51\n24\nΣΤΗΛΕΣ\n14\n25\nΣΤΗΛΕΣ\n30\n34\nΣΤΗΛΕΣ\n9\n35\nΣΤΗΛΕΣ\n6\n45\nΣΤΗΛΕΣ\n5',
        ),
      this.app.client.isVisible(elements.EurojackpotSystemBtn12).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotSystemBtn12).should.eventually.be.equal('12'),
      this.app.client.getText(elements.EurojackpotSystemBtn13).should.eventually.be.equal('13'),
      this.app.client.getText(elements.EurojackpotSystemBtn14).should.eventually.be.equal('14'),
      this.app.client.getText(elements.EurojackpotSystemBtn15).should.eventually.be.equal('15'),
      this.app.client.getText(elements.EurojackpotSystemBtn23).should.eventually.be.equal('23'),
      this.app.client.getText(elements.EurojackpotSystemBtn24).should.eventually.be.equal('24'),
      this.app.client.getText(elements.EurojackpotSystemBtn25).should.eventually.be.equal('25'),
      this.app.client.getText(elements.EurojackpotSystemBtn34).should.eventually.be.equal('34'),
      this.app.client.getText(elements.EurojackpotSystemBtn35).should.eventually.be.equal('35'),
      this.app.client.getText(elements.EurojackpotSystemBtn45).should.eventually.be.equal('45'),
    ]);
  });

  it('Check select Eurojackpot main numbers field', function () {
    return Promise.all([
      this.app.client.getText(elements.EurojackpotChooseMainNumbersLbl).should.eventually.be.equal('ΕΠΙΛΟΓΗ 7 ΑΡΙΘΜΩΝ'),
      this.app.client
        .getText(elements.EurojackpotChooseMainNumbers)
        .should.eventually.be.equal(
          '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n21\n22\n23\n24\n25\n26\n27\n28\n29\n30\n31\n32\n33\n34\n35\n36\n37\n38\n39\n40\n41\n42\n43\n44\n45\n46\n47\n48\n49\n50',
        ),
      this.app.client.getText(elements.EurojackpotChooseMainNumber1Btn).should.eventually.be.equal('1'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber2Btn).should.eventually.be.equal('2'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber3Btn).should.eventually.be.equal('3'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber4Btn).should.eventually.be.equal('4'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber5Btn).should.eventually.be.equal('5'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber6Btn).should.eventually.be.equal('6'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber7Btn).should.eventually.be.equal('7'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber8Btn).should.eventually.be.equal('8'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber9Btn).should.eventually.be.equal('9'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber10Btn).should.eventually.be.equal('10'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber11Btn).should.eventually.be.equal('11'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber12Btn).should.eventually.be.equal('12'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber13Btn).should.eventually.be.equal('13'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber14Btn).should.eventually.be.equal('14'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber15Btn).should.eventually.be.equal('15'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber16Btn).should.eventually.be.equal('16'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber17Btn).should.eventually.be.equal('17'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber18Btn).should.eventually.be.equal('18'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber19Btn).should.eventually.be.equal('19'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber20Btn).should.eventually.be.equal('20'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber21Btn).should.eventually.be.equal('21'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber22Btn).should.eventually.be.equal('22'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber23Btn).should.eventually.be.equal('23'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber24Btn).should.eventually.be.equal('24'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber25Btn).should.eventually.be.equal('25'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber26Btn).should.eventually.be.equal('26'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber27Btn).should.eventually.be.equal('27'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber28Btn).should.eventually.be.equal('28'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber29Btn).should.eventually.be.equal('29'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber30Btn).should.eventually.be.equal('30'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber31Btn).should.eventually.be.equal('31'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber32Btn).should.eventually.be.equal('32'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber33Btn).should.eventually.be.equal('33'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber34Btn).should.eventually.be.equal('34'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber35Btn).should.eventually.be.equal('35'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber36Btn).should.eventually.be.equal('36'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber37Btn).should.eventually.be.equal('37'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber38Btn).should.eventually.be.equal('38'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber39Btn).should.eventually.be.equal('39'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber40Btn).should.eventually.be.equal('40'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber41Btn).should.eventually.be.equal('41'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber42Btn).should.eventually.be.equal('42'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber43Btn).should.eventually.be.equal('43'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber44Btn).should.eventually.be.equal('44'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber45Btn).should.eventually.be.equal('45'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber46Btn).should.eventually.be.equal('46'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber47Btn).should.eventually.be.equal('47'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber48Btn).should.eventually.be.equal('48'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber49Btn).should.eventually.be.equal('49'),
      this.app.client.getText(elements.EurojackpotChooseMainNumber50Btn).should.eventually.be.equal('50'),
    ]);
  });

  it('Check select Eurojackpot euro numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotChooseEuroNumbers).should.eventually.be.true,
      this.app.client
        .getText(elements.EurojackpotChooseEuroNumbersLbl)
        .should.eventually.be.equal('ΕΠΙΛΟΓΗ ΤΟΥΛΑΧΙΣΤΟΝ ☆ 2 ΑΡΙΘΜΩΝ'),
      this.app.client
        .getText(elements.EurojackpotChooseEuroNumbers)
        .should.eventually.be.equal('1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber1Btn).should.eventually.be.equal('1'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber2Btn).should.eventually.be.equal('2'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber3Btn).should.eventually.be.equal('3'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber4Btn).should.eventually.be.equal('4'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber5Btn).should.eventually.be.equal('5'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber6Btn).should.eventually.be.equal('6'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber7Btn).should.eventually.be.equal('7'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber8Btn).should.eventually.be.equal('8'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber9Btn).should.eventually.be.equal('9'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber10Btn).should.eventually.be.equal('10'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber11Btn).should.eventually.be.equal('11'),
      this.app.client.getText(elements.EurojackpotChooseEuroNumber12Btn).should.eventually.be.equal('12'),
    ]);
  });

  it('Select System 45 for Eurojackpot 7 main numbers and 2 euro numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotChooseEuroNumbers).should.eventually.be.true,
      this.app.client.click(elements.EurojackpotChooseMainNumber1Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber2Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber3Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber4Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber5Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber6Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber7Btn).should.eventually.be.fulfilled,

      this.app.client.click(elements.EurojackpotChooseEuroNumber1Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseEuroNumber2Btn).should.eventually.be.fulfilled,
    ]);
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('10€'),
      this.app.client.getText(elements.EurojackpotBetslipSystemA).should.eventually.be.equal('Σ45'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select System 45 for Eurojackpot 6 main numbers and 2 euro numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotChooseEuroNumbers).should.eventually.be.true,
      this.app.client.click(elements.EurojackpotChooseMainNumber7Btn).should.eventually.be.fulfilled,
    ]);
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('0€'),
      this.app.client.getText(elements.EurojackpotBetslipSystemA).should.eventually.be.equal('Σ45'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select System 45 for Eurojackpot 8 main numbers and 2 euro numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotChooseEuroNumbers).should.eventually.be.true,
      this.app.client.click(elements.EurojackpotChooseMainNumber7Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseMainNumber8Btn).should.eventually.be.fulfilled,
    ]);
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('0€'),
      this.app.client.getText(elements.EurojackpotBetslipSystemA).should.eventually.be.equal('Σ45'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select System 45 for Eurojackpot 7 main numbers and 3 euro numbers field', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotChooseEuroNumbers).should.eventually.be.true,
      this.app.client.click(elements.EurojackpotChooseMainNumber8Btn).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotChooseEuroNumber3Btn).should.eventually.be.fulfilled,
    ]);
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.EurojackpotBetslipSystemA).should.eventually.be.equal('Σ45'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select Random Pick table', function () {
    return this.app.client.click(elements.EurojackpotRandomPickBtn).should.eventually.be.fulfilled;
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('30€'),
      this.app.client.getText(elements.EurojackpotBetslipSystemA).should.eventually.be.equal('Σ45'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select Clear All', function () {
    return this.app.client.click(elements.EurojackpotClearAllBtn).should.eventually.be.fulfilled;
  });

  it('Confirm Clear All', function () {
    let self = this;
    return Promise.all([
      this.app.client
        .elements(elements.EurojackpotModalAMsgLbl)
        .getAttribute('innerText')
        .should.eventually.be.equal('ΚΑΘΑΡΙΣΜΟΣ ΔΕΛΤΙΟΥ'),
      this.app.client
        .elements(elements.EurojackpotModalAMsg)
        .getAttribute('innerText')
        .should.eventually.be.equal(
          'Όλες οι επιλογές του δελτίου θα διαγραφούν. Είστε σίγουρος/η ότι θέλετε να συνεχίσετε;',
        ),
      this.app.client
        .elements(elements.EurojackpotModalAYesBtn)
        .getAttribute('innerText')
        .should.eventually.be.equal('Ναι'),
      this.app.client
        .elements(elements.EurojackpotModalANoBtn)
        .getAttribute('innerText')
        .should.eventually.be.equal('Όχι'),
    ]).then(function (values) {
      return (
        values[0] &&
        values[1] &&
        values[2] &&
        values[3] &&
        self.app.client.click(elements.EurojackpotModalAYesBtn).should.eventually.be.fulfilled
      );
    });
  });

  ///////////////////////////////////////////////////// Exit game - Return to Lobby ////////////////////////////////////////

  it('Exit KINO game', function () {
    return this.app.client.click(elements.EurojackpotMainMenuBtn).should.eventually.be.fulfilled;
  });

  it('Confirm exit KINO game', function () {
    return this.app.client.isVisible(elements.LobbyEurojackpot).should.eventually.be.true;
    // If nothing is selected, no confirmation is needed.
    // let self=this;
    // return Promise.all
    //     ([this.app.client.elements(elements.EurojackpotModalAMsgLbl).getAttribute('innerText').should.eventually.be.equal('ΕΠΙΣΤΡΟΦΗ ΣΤΟ ΜΕΝΟΥ ΠΑΙΧΝΙΔΙΩΝ'),
    //       this.app.client.elements(elements.EurojackpotModalAMsg).getAttribute('innerText').should.eventually.be.equal('Η επιστροφή στο Μενού Παιχνιδιών θα διαγράψει τις τρέχουσες επιλογές σας, θέλετε να συνεχίσετε;'),
    //       this.app.client.elements(elements.EurojackpotModalAYesBtn).getAttribute('innerText').should.eventually.be.equal('Ναι'),
    //       this.app.client.elements(elements.EurojackpotModalANoBtn).getAttribute('innerText').should.eventually.be.equal('Όχι')])
    //        .then(function(values){
    //        return values[0] && values[1] && values[2] && values[3] && self.app.client.click(elements.EurojackpotModalAYesBtn).should.eventually.be.fulfilled});
  });

  ///////////////////////////////////// Close Application ////////////////////////////////////////////////////////////////

  it('Close Application', function () {
    this.timeout(5000);
    if (this.app && this.app.isRunning()) {
      exec(`taskkill /IM opap-lottery-games.exe /F`);
    }
  });
});
