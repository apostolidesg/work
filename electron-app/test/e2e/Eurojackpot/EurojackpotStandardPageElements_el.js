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

  // it('Check scanner error', function () {
  //   return Promise.all([
  //     this.app.client.isVisible(elements.EurojackpotScanError).should.eventually.be.true,
  //     this.app.client.getText(elements.EurojackpotScanError).should.eventually.be.equal('ΣΦΑΛΜΑ ΣΥΣΚΕΥΗΣ ΣΑΡΩΣΗΣ'),
  //   ])
  // })

  it('Check return to Main Menu element', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotMainMenuBtn).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotMainMenuBtn).should.eventually.be.equal('ΕΔΩ ΠΑΣ ΣΤΟ LOBBY'),
    ]);
  });

  it('Check T&C element button', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotTC).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotTC).should.eventually.be.equal('ΟΡΟΙ ΣΥΜΜΕΤΟΧΗΣ'),
    ]);
  });
  /*  not ready yet 3 / 10/ 2023
    it('Select T&C element button', function() {
    return this.app.client.click(elements.EurojackpotTC).should.eventually.be.fulfilled;
              });

  it('Check T&C element and close with X', function() {
    let self=this;
    return Promise.all
              ([this.app.client.getText(elements.EurojackpotTCTitle).should.eventually.be.equal('ΟΡΟΙ ΣΥΜΜΕΤΟΧΗΣ'),
                this.app.client.isVisible(elements.EurojackpotTCClose).should.eventually.be.true,
                this.app.client.isVisible(elements.EurojackpotTCMessage).should.eventually.be.true,
                this.app.client.isVisible(elements.EurojackpotTCClose).should.eventually.be.true,
                // this.app.client.getText(elements.EurojackpotTCOk).should.eventually.be.equal('OK')
                ]).then(function(values){
                return values[0]
                && values[1]
                && values[2]
                && values[3]
                && values[4]
                && self.app.client.click(elements.EurojackpotTCClose).should.eventually.be.fulfilled});
              });

    it('Select T&C element button', function() {
    return this.app.client.click(elements.EurojackpotTC).should.eventually.be.fulfilled;
              });

    it('Check T&C element and close with OK', function() {
    let self=this;
    return Promise.all
              ([this.app.client.getText(elements.EurojackpotTCTitle).should.eventually.be.equal('ΟΡΟΙ ΣΥΜΜΕΤΟΧΗΣ'),
                this.app.client.isVisible(elements.EurojackpotTCClose).should.eventually.be.true,
                this.app.client.isVisible(elements.EurojackpotTCMessage).should.eventually.be.true,
                this.app.client.isVisible(elements.EurojackpotTCClose).should.eventually.be.true,
                this.app.client.getText(elements.EurojackpotTCOk).should.eventually.be.equal('OK')
                ]).then(function(values){
                return values[0]
                && values[1]
                && values[2]
                && values[3]
                && values[4]
                && self.app.client.click(elements.EurojackpotTCOk).should.eventually.be.fulfilled});
              });
*/
  it('Check How To Play element button', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotHowToPlay).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotHowToPlay).should.eventually.be.equal('ΜΑΘΕ ΠΩΣ ΠΑΙΖΕΙΣ'),
    ]);
  });

  it('Select How To Play element button', function () {
    return this.app.client.click(elements.EurojackpotHowToPlay).should.eventually.be.fulfilled;
  });

  it('Check How To Play modal and close with X', function () {
    let self = this;
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotHowToPlayModal).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotHowToPlayClose).should.eventually.be.true,
    ]).then(function (values) {
      return (
        values[0] &&
        values[1] &&
        self.app.client.click(elements.EurojackpotHowToPlayClose).should.eventually.be.fulfilled
      );
    });
  });

  it('Check Cashout element', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotCashoutField).should.eventually.be.true,
      // this.app.client.getValue(elements.EurojackpotCashoutBtnEnabled).should.eventually.be.be.equal('false'),
      this.app.client.getText(elements.EurojackpotCashoutLbl).should.eventually.be.equal('ΕΞΑΡΓΥΡΩΣΗ'),
    ]);
  });

  it('Check SSBT balance element', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBalanceBtn).should.eventually.be.true,
      // this.app.client.getText(elements.EurojackpotBalanceShow).should.eventually.be.equal('706,55€'),  // change due to dev tests
      this.app.client
        .elements(elements.EurojackpotBalanceShow)
        .getAttribute('innerText')
        .should.eventually.be.contain('€'),
    ]);
  });

  it('Hide SSBT balance', function () {
    return this.app.client.click(elements.EurojackpotBalanceBtn).should.eventually.be.fulfilled;
  });

  it('Check SSBT balance', function () {
    return this.app.client.getText(elements.EurojackpotBalanceHide).should.eventually.be.equal('Εμφάνιση Υπολοίπου');
  });

  it('Show SSBT balance', function () {
    return this.app.client.click(elements.EurojackpotBalanceBtn).should.eventually.be.fulfilled;
  });

  it('Check SSBT balance', function () {
    // this.app.client.getText(elements.EurojackpotBalanceShow).should.eventually.be.equal('706,55€'),  // change due to dev tests
    this.app.client
      .elements(elements.EurojackpotBalanceShow)
      .getAttribute('innerText')
      .should.eventually.be.contain('€');
  });

  it('Check SSBT balance refresh option', function () {
    return this.app.client.isVisible(elements.EurojackpotRefresh).should.eventually.be.true;
  });

  it('Check Clear All element', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotClearAllBtn).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotClearAllBtn).should.eventually.be.equal('ΚΑΘΑΡΙΣΜΟΣ ΟΛΩΝ'),
    ]);
  });

  it('Check elements of language selection', function () {
    return Promise.all([
      this.app.client.isVisible(elements.LobbyHeaderLangSelection).should.eventually.be.true,
      this.app.client.getText(elements.LobbyElBtn).should.eventually.be.equal('ΕΛ'),
      this.app.client.getText(elements.LobbyEnBtn).should.eventually.be.equal('EN'),
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

  /////////////////////////////////////// Prepare a full betslip to check all betslip fields /////////////////////////////////

  it('Check empty betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('0€'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.true,
    ]);
  });

  it('Select random pick (A Area)', function () {
    return this.app.client.click(elements.EurojackpotRandomPickBtn).should.eventually.be.fulfilled;
  });

  it('Add new bet', function () {
    return this.app.client.click(elements.EurojackpotBetslipAddBet).should.eventually.be.fulfilled;
  });

  it('Select quick pick (B Area)', function () {
    return this.app.client.click(elements.EurojackpotRandomPickBtn).should.eventually.be.fulfilled;
  });

  it('Add new bet', function () {
    return this.app.client.click(elements.EurojackpotBetslipAddBet).should.eventually.be.fulfilled;
  });

  it('Select quick pick (C Area)', function () {
    return this.app.client.click(elements.EurojackpotRandomPickBtn).should.eventually.be.fulfilled;
  });

  it('Add new bet', function () {
    return this.app.client.click(elements.EurojackpotBetslipAddBet).should.eventually.be.fulfilled;
  });

  it('Select quick pick (D Area)', function () {
    return this.app.client.click(elements.EurojackpotRandomPickBtn).should.eventually.be.fulfilled;
  });

  it('Add new bet', function () {
    return this.app.client.click(elements.EurojackpotBetslipAddBet).should.eventually.be.fulfilled;
  });

  it('Select quick pick (E Area)', function () {
    return this.app.client.click(elements.EurojackpotRandomPickBtn).should.eventually.be.fulfilled;
  });

  it('Add new bet', function () {
    return this.app.client.click(elements.EurojackpotBetslipAddBet).should.eventually.be.fulfilled;
  });

  it('Select quick pick (F Area)', function () {
    return this.app.client.click(elements.EurojackpotRandomPickBtn).should.eventually.be.fulfilled;
  });

  it('Add new bet not allowed after 6 bets', function () {
    return this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.false;
  });

  it('Check betslip fields', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetslipPreview).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaA).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaACost).should.eventually.be.equal('2€'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaAClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaB).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaBCost).should.eventually.be.equal('2€'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaBClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaC).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaCCost).should.eventually.be.equal('2€'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaCClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaD).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaDCost).should.eventually.be.equal('2€'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaDClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaE).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaECost).should.eventually.be.equal('2€'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaEClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAreaF).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotBetslipAreaFCost).should.eventually.be.equal('2€'),
      this.app.client.isVisible(elements.EurojackpotBetslipAreaFClear).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetslipAddBet).should.eventually.be.false,
    ]);
  });

  it('Open consecutive draws fields calculator', function () {
    return this.app.client.click(elements.EurojackpotBetConsDrawsInput).should.eventually.be.fulfilled;
  });

  it('Check consecutive draws fields calculator', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotBetConsDrawsCalc0).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetConsDrawsCalc1).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetConsDrawsCalc2).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetConsDrawsCalc3).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetConsDrawsCalc4).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetConsDrawsCalc5).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetConsDrawsCalc6).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetConsDrawsCalc7).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetConsDrawsCalc8).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetConsDrawsCalc9).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetConsDrawsCalcCE).should.eventually.be.true,
      this.app.client.isVisible(elements.EurojackpotBetConsDrawsCalcOK).should.eventually.be.true,
    ]);
  });

  it('Select a value out of allowed range', function () {
    return Promise.all([
      this.app.client.click(elements.EurojackpotBetConsDrawsCalc8).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotBetConsDrawsCalc8).should.eventually.be.fulfilled,
      this.app.client.click(elements.EurojackpotBetConsDrawsCalc8).should.eventually.be.fulfilled,
    ]);
  });

  it('Check message of consecutive draws fields calculator', function () {
    return this.app.client
      .elements(elements.EurojackpotBetConsDrawsCalcMsg)
      .getAttribute('innerText')
      .should.eventually.be.equal('Δυνατές επιλογές: 1-52');
  });

  it('Clear value of consecutive draws fields calculator', function () {
    return this.app.client.click(elements.EurojackpotBetConsDrawsCalcCE).should.eventually.be.fulfilled;
  });

  it('Close consecutive draws fields calculator', function () {
    return this.app.client.click(elements.EurojackpotBetConsDrawsInput).should.eventually.be.fulfilled;
  });

  it('Check default value of consecutive draws fields calculator', function () {
    return this.app.client.getValue(elements.EurojackpotBetConsDrawsInput).should.eventually.be.equal('1');
  });

  ///////////////////////////////////////////// Check modal elements of Eurojackpot Standard Bet ///////////////////////////////////////

  it('Select Clear Area F from betslip', function () {
    return this.app.client.click(elements.EurojackpotBetslipAreaFClear).should.eventually.be.fulfilled;
  });

  it('Discard Clear Area F from betslip', function () {
    let self = this;
    return Promise.all([
      this.app.client
        .elements(elements.EurojackpotModalAMsgLbl)
        .getAttribute('innerText')
        .should.eventually.be.equal('ΚΑΘΑΡΙΣΜΟΣ ΠΕΡΙΟΧΗΣ'),
      this.app.client
        .elements(elements.EurojackpotModalAMsg)
        .getAttribute('innerText')
        .should.eventually.be.equal(
          'Όλες οι επιλογές αυτής της περιοχής θα διαγραφούν. Είστε σίγουρος/η ότι θέλετε να συνεχίσετε;',
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
        self.app.client.click(elements.EurojackpotModalANoBtn).should.eventually.be.fulfilled
      );
    });
  });

  it('Select Clear Area E from betslip', function () {
    return this.app.client.click(elements.EurojackpotBetslipAreaEClear).should.eventually.be.fulfilled;
  });

  it('Discard Clear Area E from betslip', function () {
    let self = this;
    return Promise.all([
      this.app.client
        .elements(elements.EurojackpotModalAMsgLbl)
        .getAttribute('innerText')
        .should.eventually.be.equal('ΚΑΘΑΡΙΣΜΟΣ ΠΕΡΙΟΧΗΣ'),
      this.app.client
        .elements(elements.EurojackpotModalAMsg)
        .getAttribute('innerText')
        .should.eventually.be.equal(
          'Όλες οι επιλογές αυτής της περιοχής θα διαγραφούν. Είστε σίγουρος/η ότι θέλετε να συνεχίσετε;',
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
        self.app.client.click(elements.EurojackpotModalANoBtn).should.eventually.be.fulfilled
      );
    });
  });

  it('Select Clear Area D from betslip', function () {
    return this.app.client.click(elements.EurojackpotBetslipAreaDClear).should.eventually.be.fulfilled;
  });

  it('Discard Clear Area D from betslip', function () {
    let self = this;
    return Promise.all([
      this.app.client
        .elements(elements.EurojackpotModalAMsgLbl)
        .getAttribute('innerText')
        .should.eventually.be.equal('ΚΑΘΑΡΙΣΜΟΣ ΠΕΡΙΟΧΗΣ'),
      this.app.client
        .elements(elements.EurojackpotModalAMsg)
        .getAttribute('innerText')
        .should.eventually.be.equal(
          'Όλες οι επιλογές αυτής της περιοχής θα διαγραφούν. Είστε σίγουρος/η ότι θέλετε να συνεχίσετε;',
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
        self.app.client.click(elements.EurojackpotModalANoBtn).should.eventually.be.fulfilled
      );
    });
  });

  it('Select Clear Area C from betslip', function () {
    return this.app.client.click(elements.EurojackpotBetslipAreaCClear).should.eventually.be.fulfilled;
  });

  it('Discard Clear Area C from betslip', function () {
    let self = this;
    return Promise.all([
      this.app.client
        .elements(elements.EurojackpotModalAMsgLbl)
        .getAttribute('innerText')
        .should.eventually.be.equal('ΚΑΘΑΡΙΣΜΟΣ ΠΕΡΙΟΧΗΣ'),
      this.app.client
        .elements(elements.EurojackpotModalAMsg)
        .getAttribute('innerText')
        .should.eventually.be.equal(
          'Όλες οι επιλογές αυτής της περιοχής θα διαγραφούν. Είστε σίγουρος/η ότι θέλετε να συνεχίσετε;',
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
        self.app.client.click(elements.EurojackpotModalANoBtn).should.eventually.be.fulfilled
      );
    });
  });

  it('Select Clear Area B from betslip', function () {
    return this.app.client.click(elements.EurojackpotBetslipAreaBClear).should.eventually.be.fulfilled;
  });

  it('Discard Clear Area B from betslip', function () {
    let self = this;
    return Promise.all([
      this.app.client
        .elements(elements.EurojackpotModalAMsgLbl)
        .getAttribute('innerText')
        .should.eventually.be.equal('ΚΑΘΑΡΙΣΜΟΣ ΠΕΡΙΟΧΗΣ'),
      this.app.client
        .elements(elements.EurojackpotModalAMsg)
        .getAttribute('innerText')
        .should.eventually.be.equal(
          'Όλες οι επιλογές αυτής της περιοχής θα διαγραφούν. Είστε σίγουρος/η ότι θέλετε να συνεχίσετε;',
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
        self.app.client.click(elements.EurojackpotModalANoBtn).should.eventually.be.fulfilled
      );
    });
  });

  it('Select Clear Area A from betslip', function () {
    return this.app.client.click(elements.EurojackpotBetslipAreaAClear).should.eventually.be.fulfilled;
  });

  it('Discard Clear Area A from betslip', function () {
    let self = this;
    return Promise.all([
      this.app.client
        .elements(elements.EurojackpotModalAMsgLbl)
        .getAttribute('innerText')
        .should.eventually.be.equal('ΚΑΘΑΡΙΣΜΟΣ ΠΕΡΙΟΧΗΣ'),
      this.app.client
        .elements(elements.EurojackpotModalAMsg)
        .getAttribute('innerText')
        .should.eventually.be.equal(
          'Όλες οι επιλογές αυτής της περιοχής θα διαγραφούν. Είστε σίγουρος/η ότι θέλετε να συνεχίσετε;',
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
        self.app.client.click(elements.EurojackpotModalANoBtn).should.eventually.be.fulfilled
      );
    });
  });

  it('Select Clear All', function () {
    return this.app.client.click(elements.EurojackpotClearAllBtn).should.eventually.be.fulfilled;
  });

  it('Discard Clear All', function () {
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
        self.app.client.click(elements.EurojackpotModalANoBtn).should.eventually.be.fulfilled
      );
    });
  });

  ////////////////////////////////////////////////////////// Change language to EN /////////////////////////////////////////////

  it('Select EN language', function () {
    return this.app.client.click(elements.LobbyEnBtn).should.eventually.be.fulfilled;
  });

  it('Check Eurojackpot Header', function () {
    return this.app.client.isVisible(elements.LobbyHeader).should.eventually.be.true;
  });

  it('Check Eurojackpot Logo', function () {
    return this.app.client.isVisible(elements.EurojackpotLogo).should.eventually.be.true;
  });

  it('Check return to Main Menu element', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotMainMenuBtn).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotMainMenuBtn).should.eventually.be.equal('BACK TO LOBBY'),
    ]);
  });

  it('Check T&C element button', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotTC).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotTC).should.eventually.be.equal('TERMS & CONDITIONS'),
    ]);
  });

  it('Check How To Play element button', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotHowToPlay).should.eventually.be.true,
      this.app.client.getText(elements.EurojackpotHowToPlay).should.eventually.be.equal('HOW TO PLAY'),
    ]);
  });

  it('Check Cashout element', function () {
    return Promise.all([
      this.app.client.isVisible(elements.EurojackpotCashoutField).should.eventually.be.true,
      // this.app.client.getValue(elements.EurojackpotCashoutBtnEnabled).should.eventually.be.be.equal('false'),
      this.app.client.getText(elements.EurojackpotCashoutLbl).should.eventually.be.equal('CASH OUT'),
    ]);
  });

  it('Check elements of language selection', function () {
    return Promise.all([
      this.app.client.isVisible(elements.LobbyHeaderLangSelection).should.eventually.be.true,
      this.app.client.getText(elements.LobbyElBtn).should.eventually.be.equal('ΕΛ'),
      this.app.client.getText(elements.LobbyEnBtn).should.eventually.be.equal('EN'),
    ]);
  });
  it('Check select Eurojackpot main numbers field', function () {
    return Promise.all([
      this.app.client
        .getText(elements.EurojackpotChooseMainNumbersLbl)
        .should.eventually.be.equal('SELECT AT LEAST 5 NUMBERS'),
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

  /////////////////////////////////////////// Check modal elements of Eurojackpot Standard Bet ///////////////////////////////////////

  it('Select Clear All', function () {
    return this.app.client.click(elements.EurojackpotClearAllBtn).should.eventually.be.fulfilled;
  });

  it('Confirm Clear All', function () {
    let self = this;
    return Promise.all([
      this.app.client
        .elements(elements.EurojackpotModalAMsgLbl)
        .getAttribute('innerText')
        .should.eventually.be.equal('CLEAR BETSLIP'),
      this.app.client
        .elements(elements.EurojackpotModalAMsg)
        .getAttribute('innerText')
        .should.eventually.be.equal('All selections of the betslip will be lost. Are you sure you want to proceed?'),
      this.app.client
        .elements(elements.EurojackpotModalAYesBtn)
        .getAttribute('innerText')
        .should.eventually.be.equal('Yes'),
      this.app.client
        .elements(elements.EurojackpotModalANoBtn)
        .getAttribute('innerText')
        .should.eventually.be.equal('No'),
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

  it('Exit Eurojackpot game', function () {
    return this.app.client.click(elements.EurojackpotMainMenuBtn).should.eventually.be.fulfilled;
  });

  it('Confirm exit Eurojackpot game', function () {
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
