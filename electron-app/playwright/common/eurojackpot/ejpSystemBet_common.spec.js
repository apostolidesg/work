// playwright/common/eurojackpot/ejpSystemBet_common.spec.js
import { test } from '@playwright/test';
import { launchElectronApp, screenshotError } from '#/support/commands';
import lobbyHeader from '#/pageObjects/lobbyHeader';
import lobbyGames from '#/pageObjects/lobbyGames';
import settings from '#/pageObjects/eurojackpot/ejpSettings';
import playArea from '#/pageObjects/eurojackpot/ejpPlayArea';
import sideScreen from '#/pageObjects/eurojackpot/ejpSideScreen';

function runTests() {
  let electronApp, page;

  test.beforeAll(async () => {
    ({ electronApp, page } = await launchElectronApp({}, { DIGITAL_ASSISTANT_ENABLED: false }));
    await lobbyGames.eurojackpot.get(page).click();
  });

  test.afterAll(async () => {
    if (electronApp) await electronApp.close();
  });

  //Prepare a full system betslip to check all betslip fields
  test.describe('System 12 Betslip Scenarios (15 main + 2 euro numbers)', () => {
    test(`Select and Check System 12`, async ({}, testInfo) => {
      try {
        await settings.systemButtons.get(page, 12).click();
        await settings.systemButtons.shouldHaveText(page, 12);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Eurojackpot System 12 labels and values', async ({}, testInfo) => {
      try {
        await playArea.mainNumberSystemHeader.shouldHaveText(page, '15');
        await playArea.mainNumbersTxt.shouldHaveText(page);
        await playArea.euroNumberHeader.shouldHaveText(page);
        await playArea.euroNumbersTxt.shouldHaveText(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    const scenarios = [
      { main: 15, euro: 2, cost: '236€' },
      { main: 14, euro: 2, cost: '0€' },
      { main: 16, euro: 2, cost: '0€' },
      { main: 15, euro: 3, cost: '708€' },
    ];

    for (const { main, euro, cost } of scenarios) {
      test(`Clear All and select System 12 before (${main}+${euro}) numbers`, async ({}, testInfo) => {
        try {
          await lobbyHeader.clearAll.get(page).click();
          await lobbyHeader.clearAll.yes.get(page).click();

          await settings.systemButtons.get(page, 12).click();
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test(`Select numbers field for (${main}+${euro})`, async ({}, testInfo) => {
        try {
          for (let m = 1; m <= main; m++) {
            await playArea.mainNumberBtn.get(page, m).click();
          }
          for (let e = 1; e <= euro; e++) {
            await playArea.euroNumberBtn.get(page, e).click();
          }
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test(`Check betslip fields for (${main}+${euro})`, async ({}, testInfo) => {
        try {
          await sideScreen.sideScreenBet.betslipArea.isVisible(page, 0);
          await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 0, cost);
          await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, 0);
          await sideScreen.sideScreenBet.betslipArea.system.shouldHaveText(page, 0, '12');
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });
    }

    test('Select Random Pick table', async ({}, testInfo) => {
      try {
        await settings.quickPickBtn.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betslip fields (Random Pick)', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.isVisible(page, 0);
        await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 0, '708€');
        await sideScreen.sideScreenBet.betslipArea.system.shouldHaveText(page, 0, '12');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select and Confirm Clear All', async ({}, testInfo) => {
      try {
        await lobbyHeader.clearAll.get(page).click();
        await lobbyHeader.clearAll.yes.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });

  test.describe('System 13 Betslip Scenarios (13 main + 2 euro numbers)', () => {
    test(`Select and Check System 13`, async ({}, testInfo) => {
      try {
        await settings.systemButtons.get(page, 13).click();
        await settings.systemButtons.shouldHaveText(page, 13);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Eurojackpot System 13 labels and values', async ({}, testInfo) => {
      try {
        await playArea.mainNumberSystemHeader.shouldHaveText(page, '13');
        await playArea.mainNumbersTxt.shouldHaveText(page);
        await playArea.euroNumberHeader.shouldHaveText(page);
        await playArea.euroNumbersTxt.shouldHaveText(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    const scenarios = [
      { main: 13, euro: 2, cost: '108€' },
      { main: 12, euro: 2, cost: '0€' },
      { main: 14, euro: 2, cost: '0€' },
      { main: 13, euro: 3, cost: '324€' },
    ];

    for (const { main, euro, cost } of scenarios) {
      test(`Clear All and select System 13 before (${main}+${euro}) numbers`, async ({}, testInfo) => {
        try {
          await lobbyHeader.clearAll.get(page).click();
          await lobbyHeader.clearAll.yes.get(page).click();
          await settings.systemButtons.get(page, 13).click();
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test(`Select numbers field for (${main}+${euro})`, async ({}, testInfo) => {
        try {
          for (let m = 1; m <= main; m++) {
            await playArea.mainNumberBtn.get(page, m).click();
          }
          for (let e = 1; e <= euro; e++) {
            await playArea.euroNumberBtn.get(page, e).click();
          }
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test(`Check betslip fields for (${main}+${euro})`, async ({}, testInfo) => {
        try {
          await sideScreen.sideScreenBet.betslipArea.isVisible(page, 0);
          await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 0, cost);
          await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, 0);
          await sideScreen.sideScreenBet.betslipArea.system.shouldHaveText(page, 0, '13');
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });
    }

    test('Select Random Pick table', async ({}, testInfo) => {
      try {
        await settings.quickPickBtn.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betslip fields (Random Pick)', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.isVisible(page, 0);
        await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 0, '324€');
        await sideScreen.sideScreenBet.betslipArea.system.shouldHaveText(page, 0, '13');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select and Confirm Clear All', async ({}, testInfo) => {
      try {
        await lobbyHeader.clearAll.get(page).click();
        await lobbyHeader.clearAll.yes.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });

  test.describe('System 14 Betslip Scenarios (12 main + 2 euro numbers)', () => {
    test(`Select and Check System 14`, async ({}, testInfo) => {
      try {
        await settings.systemButtons.get(page, 14).click();
        await settings.systemButtons.shouldHaveText(page, 14);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Eurojackpot System 14 labels and values', async ({}, testInfo) => {
      try {
        await playArea.mainNumberSystemHeader.shouldHaveText(page, '12');
        await playArea.mainNumbersTxt.shouldHaveText(page);
        await playArea.euroNumberHeader.shouldHaveText(page);
        await playArea.euroNumbersTxt.shouldHaveText(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    const scenarios = [
      { main: 12, euro: 2, cost: '76€' },
      { main: 11, euro: 2, cost: '0€' },
      { main: 13, euro: 2, cost: '0€' },
      { main: 12, euro: 3, cost: '228€' },
    ];

    for (const { main, euro, cost } of scenarios) {
      test(`Clear All and select System 14 before (${main}+${euro}) numbers`, async ({}, testInfo) => {
        try {
          await lobbyHeader.clearAll.get(page).click();
          await lobbyHeader.clearAll.yes.get(page).click();
          await settings.systemButtons.get(page, 14).click();
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test(`Select numbers field for (${main}+${euro})`, async ({}, testInfo) => {
        try {
          for (let m = 1; m <= main; m++) {
            await playArea.mainNumberBtn.get(page, m).click();
          }
          for (let e = 1; e <= euro; e++) {
            await playArea.euroNumberBtn.get(page, e).click();
          }
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test(`Check betslip fields for (${main}+${euro})`, async ({}, testInfo) => {
        try {
          await sideScreen.sideScreenBet.betslipArea.isVisible(page, 0);
          await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 0, cost);
          await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, 0);
          await sideScreen.sideScreenBet.betslipArea.system.shouldHaveText(page, 0, '14');
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });
    }

    test('Select Random Pick table', async ({}, testInfo) => {
      try {
        await settings.quickPickBtn.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betslip fields (Random Pick)', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.isVisible(page, 0);
        await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 0, '228€');
        await sideScreen.sideScreenBet.betslipArea.system.shouldHaveText(page, 0, '14');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select and Confirm Clear All', async ({}, testInfo) => {
      try {
        await lobbyHeader.clearAll.get(page).click();
        await lobbyHeader.clearAll.yes.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });

  test.describe('System 15 Betslip Scenarios (11 main + 2 euro numbers)', () => {
    test(`Select and Check System 15`, async ({}, testInfo) => {
      try {
        await settings.systemButtons.get(page, 15).click();
        await settings.systemButtons.shouldHaveText(page, 15);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Eurojackpot System 15 labels and values', async ({}, testInfo) => {
      try {
        await playArea.mainNumberSystemHeader.shouldHaveText(page, '11');
        await playArea.mainNumbersTxt.shouldHaveText(page);
        await playArea.euroNumberHeader.shouldHaveText(page);
        await playArea.euroNumbersTxt.shouldHaveText(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    const scenarios = [
      { main: 11, euro: 2, cost: '44€' },
      { main: 10, euro: 2, cost: '0€' },
      { main: 12, euro: 2, cost: '0€' },
      { main: 11, euro: 3, cost: '132€' },
    ];

    for (const { main, euro, cost } of scenarios) {
      test(`Clear All and select System 15 before (${main}+${euro}) numbers`, async ({}, testInfo) => {
        try {
          await lobbyHeader.clearAll.get(page).click();
          await lobbyHeader.clearAll.yes.get(page).click();
          await settings.systemButtons.get(page, 15).click();
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test(`Select numbers field for (${main}+${euro})`, async ({}, testInfo) => {
        try {
          for (let m = 1; m <= main; m++) {
            await playArea.mainNumberBtn.get(page, m).click();
          }
          for (let e = 1; e <= euro; e++) {
            await playArea.euroNumberBtn.get(page, e).click();
          }
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test(`Check betslip fields for (${main}+${euro})`, async ({}, testInfo) => {
        try {
          await sideScreen.sideScreenBet.betslipArea.isVisible(page, 0);
          await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 0, cost);
          await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, 0);
          await sideScreen.sideScreenBet.betslipArea.system.shouldHaveText(page, 0, '15');
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });
    }

    test('Select Random Pick table', async ({}, testInfo) => {
      try {
        await settings.quickPickBtn.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betslip fields (Random Pick)', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.isVisible(page, 0);
        await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 0, '132€');
        await sideScreen.sideScreenBet.betslipArea.system.shouldHaveText(page, 0, '15');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select and Confirm Clear All', async ({}, testInfo) => {
      try {
        await lobbyHeader.clearAll.get(page).click();
        await lobbyHeader.clearAll.yes.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });

  test.describe('System 23 Betslip Scenarios (10 main + 2 euro numbers)', () => {
    test(`Select and Check System 23`, async ({}, testInfo) => {
      try {
        await settings.systemButtons.get(page, 23).click();
        await settings.systemButtons.shouldHaveText(page, 23);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Eurojackpot System 23 labels and values', async ({}, testInfo) => {
      try {
        await playArea.mainNumberSystemHeader.shouldHaveText(page, '10');
        await playArea.mainNumbersTxt.shouldHaveText(page);
        await playArea.euroNumberHeader.shouldHaveText(page);
        await playArea.euroNumbersTxt.shouldHaveText(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    const scenarios = [
      { main: 10, euro: 2, cost: '102€' },
      { main: 9, euro: 2, cost: '0€' },
      { main: 11, euro: 2, cost: '0€' },
      { main: 10, euro: 3, cost: '306€' },
    ];

    for (const { main, euro, cost } of scenarios) {
      test(`Clear All and select System 23 before (${main}+${euro}) numbers`, async ({}, testInfo) => {
        try {
          await lobbyHeader.clearAll.get(page).click();
          await lobbyHeader.clearAll.yes.get(page).click();
          await settings.systemButtons.get(page, 23).click();
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test(`Select numbers field for (${main}+${euro})`, async ({}, testInfo) => {
        try {
          for (let m = 1; m <= main; m++) {
            await playArea.mainNumberBtn.get(page, m).click();
          }
          for (let e = 1; e <= euro; e++) {
            await playArea.euroNumberBtn.get(page, e).click();
          }
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test(`Check betslip fields for (${main}+${euro})`, async ({}, testInfo) => {
        try {
          await sideScreen.sideScreenBet.betslipArea.isVisible(page, 0);
          await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 0, cost);
          await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, 0);
          await sideScreen.sideScreenBet.betslipArea.system.shouldHaveText(page, 0, '23');
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });
    }

    test('Select Random Pick table', async ({}, testInfo) => {
      try {
        await settings.quickPickBtn.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betslip fields (Random Pick)', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.isVisible(page, 0);
        await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 0, '306€');
        await sideScreen.sideScreenBet.betslipArea.system.shouldHaveText(page, 0, '23');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select and Confirm Clear All', async ({}, testInfo) => {
      try {
        await lobbyHeader.clearAll.get(page).click();
        await lobbyHeader.clearAll.yes.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });

  test.describe('System 24 Betslip Scenarios (10 main + 2 euro numbers)', () => {
    test(`Select and Check System 24`, async ({}, testInfo) => {
      try {
        await settings.systemButtons.get(page, 24).click();
        await settings.systemButtons.shouldHaveText(page, 24);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Eurojackpot System 24 labels and values', async ({}, testInfo) => {
      try {
        await playArea.mainNumberSystemHeader.shouldHaveText(page, '10');
        await playArea.mainNumbersTxt.shouldHaveText(page);
        await playArea.euroNumberHeader.shouldHaveText(page);
        await playArea.euroNumbersTxt.shouldHaveText(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    const scenarios = [
      { main: 10, euro: 2, cost: '28€' },
      { main: 9, euro: 2, cost: '0€' },
      { main: 11, euro: 2, cost: '0€' },
      { main: 10, euro: 3, cost: '84€' },
    ];

    for (const { main, euro, cost } of scenarios) {
      test(`Clear All and select System 24 before (${main}+${euro}) numbers`, async ({}, testInfo) => {
        try {
          await lobbyHeader.clearAll.get(page).click();
          await lobbyHeader.clearAll.yes.get(page).click();
          await settings.systemButtons.get(page, 24).click();
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test(`Select numbers field for (${main}+${euro})`, async ({}, testInfo) => {
        try {
          for (let m = 1; m <= main; m++) {
            await playArea.mainNumberBtn.get(page, m).click();
          }
          for (let e = 1; e <= euro; e++) {
            await playArea.euroNumberBtn.get(page, e).click();
          }
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test(`Check betslip fields for (${main}+${euro})`, async ({}, testInfo) => {
        try {
          await sideScreen.sideScreenBet.betslipArea.isVisible(page, 0);
          await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 0, cost);
          await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, 0);
          await sideScreen.sideScreenBet.betslipArea.system.shouldHaveText(page, 0, '24');
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });
    }

    test('Select Random Pick table', async ({}, testInfo) => {
      try {
        await settings.quickPickBtn.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betslip fields (Random Pick)', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.isVisible(page, 0);
        await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 0, '84€');
        await sideScreen.sideScreenBet.betslipArea.system.shouldHaveText(page, 0, '24');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select and Confirm Clear All', async ({}, testInfo) => {
      try {
        await lobbyHeader.clearAll.get(page).click();
        await lobbyHeader.clearAll.yes.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });

  test.describe('System 25 Betslip Scenarios (9 main + 2 euro numbers)', () => {
    test(`Select and Check System 25`, async ({}, testInfo) => {
      try {
        await settings.systemButtons.get(page, 25).click();
        await settings.systemButtons.shouldHaveText(page, 25);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Eurojackpot System 25 labels and values', async ({}, testInfo) => {
      try {
        await playArea.mainNumberSystemHeader.shouldHaveText(page, '9');
        await playArea.mainNumbersTxt.shouldHaveText(page);
        await playArea.euroNumberHeader.shouldHaveText(page);
        await playArea.euroNumbersTxt.shouldHaveText(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    const scenarios = [
      { main: 9, euro: 2, cost: '60€' },
      { main: 8, euro: 2, cost: '0€' },
      { main: 10, euro: 2, cost: '0€' },
      { main: 9, euro: 3, cost: '180€' },
    ];

    for (const { main, euro, cost } of scenarios) {
      test(`Clear All and select System 25 before (${main}+${euro}) numbers`, async ({}, testInfo) => {
        try {
          await lobbyHeader.clearAll.get(page).click();
          await lobbyHeader.clearAll.yes.get(page).click();
          await settings.systemButtons.get(page, 25).click();
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test(`Select numbers field for (${main}+${euro})`, async ({}, testInfo) => {
        try {
          for (let m = 1; m <= main; m++) {
            await playArea.mainNumberBtn.get(page, m).click();
          }
          for (let e = 1; e <= euro; e++) {
            await playArea.euroNumberBtn.get(page, e).click();
          }
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test(`Check betslip fields for (${main}+${euro})`, async ({}, testInfo) => {
        try {
          await sideScreen.sideScreenBet.betslipArea.isVisible(page, 0);
          await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 0, cost);
          await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, 0);
          await sideScreen.sideScreenBet.betslipArea.system.shouldHaveText(page, 0, '25');
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });
    }

    test('Select Random Pick table', async ({}, testInfo) => {
      try {
        await settings.quickPickBtn.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betslip fields (Random Pick)', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.isVisible(page, 0);
        await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 0, '180€');
        await sideScreen.sideScreenBet.betslipArea.system.shouldHaveText(page, 0, '25');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select and Confirm Clear All', async ({}, testInfo) => {
      try {
        await lobbyHeader.clearAll.get(page).click();
        await lobbyHeader.clearAll.yes.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });

  test.describe('System 34 Betslip Scenarios (9 main + 2 euro numbers)', () => {
    test(`Select and Check System 34`, async ({}, testInfo) => {
      try {
        await settings.systemButtons.get(page, 34).click();
        await settings.systemButtons.shouldHaveText(page, 34);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Eurojackpot System 34 labels and values', async ({}, testInfo) => {
      try {
        await playArea.mainNumberSystemHeader.shouldHaveText(page, '9');
        await playArea.mainNumbersTxt.shouldHaveText(page);
        await playArea.euroNumberHeader.shouldHaveText(page);
        await playArea.euroNumbersTxt.shouldHaveText(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    const scenarios = [
      { main: 9, euro: 2, cost: '18€' },
      { main: 8, euro: 2, cost: '0€' },
      { main: 10, euro: 2, cost: '0€' },
      { main: 9, euro: 3, cost: '54€' },
    ];

    for (const { main, euro, cost } of scenarios) {
      test(`Clear All and select System 34 before (${main}+${euro}) numbers`, async ({}, testInfo) => {
        try {
          await lobbyHeader.clearAll.get(page).click();
          await lobbyHeader.clearAll.yes.get(page).click();
          await settings.systemButtons.get(page, 34).click();
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test(`Select numbers field for (${main}+${euro})`, async ({}, testInfo) => {
        try {
          for (let m = 1; m <= main; m++) {
            await playArea.mainNumberBtn.get(page, m).click();
          }
          for (let e = 1; e <= euro; e++) {
            await playArea.euroNumberBtn.get(page, e).click();
          }
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test(`Check betslip fields for (${main}+${euro})`, async ({}, testInfo) => {
        try {
          await sideScreen.sideScreenBet.betslipArea.isVisible(page, 0);
          await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 0, cost);
          await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, 0);
          await sideScreen.sideScreenBet.betslipArea.system.shouldHaveText(page, 0, '34');
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });
    }

    test('Select Random Pick table', async ({}, testInfo) => {
      try {
        await settings.quickPickBtn.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betslip fields (Random Pick)', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.isVisible(page, 0);
        await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 0, '54€');
        await sideScreen.sideScreenBet.betslipArea.system.shouldHaveText(page, 0, '34');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select and Confirm Clear All', async ({}, testInfo) => {
      try {
        await lobbyHeader.clearAll.get(page).click();
        await lobbyHeader.clearAll.yes.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });

  test.describe('System 35 Betslip Scenarios (8 main + 2 euro numbers)', () => {
    test(`Select and Check System 35`, async ({}, testInfo) => {
      try {
        await settings.systemButtons.get(page, 35).click();
        await settings.systemButtons.shouldHaveText(page, 35);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Eurojackpot System 35 labels and values', async ({}, testInfo) => {
      try {
        await playArea.mainNumberSystemHeader.shouldHaveText(page, '8');
        await playArea.mainNumbersTxt.shouldHaveText(page);
        await playArea.euroNumberHeader.shouldHaveText(page);
        await playArea.euroNumbersTxt.shouldHaveText(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    const scenarios = [
      { main: 8, euro: 2, cost: '12€' },
      { main: 7, euro: 2, cost: '0€' },
      { main: 9, euro: 2, cost: '0€' },
      { main: 8, euro: 3, cost: '36€' },
    ];

    for (const { main, euro, cost } of scenarios) {
      test(`Clear All and select System 35 before (${main}+${euro}) numbers`, async ({}, testInfo) => {
        try {
          await lobbyHeader.clearAll.get(page).click();
          await lobbyHeader.clearAll.yes.get(page).click();
          await settings.systemButtons.get(page, 35).click();
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test(`Select numbers field for (${main}+${euro})`, async ({}, testInfo) => {
        try {
          for (let m = 1; m <= main; m++) {
            await playArea.mainNumberBtn.get(page, m).click();
          }
          for (let e = 1; e <= euro; e++) {
            await playArea.euroNumberBtn.get(page, e).click();
          }
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test(`Check betslip fields for (${main}+${euro})`, async ({}, testInfo) => {
        try {
          await sideScreen.sideScreenBet.betslipArea.isVisible(page, 0);
          await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 0, cost);
          await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, 0);
          await sideScreen.sideScreenBet.betslipArea.system.shouldHaveText(page, 0, '35');
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });
    }

    test('Select Random Pick table', async ({}, testInfo) => {
      try {
        await settings.quickPickBtn.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betslip fields (Random Pick)', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.isVisible(page, 0);
        await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 0, '36€');
        await sideScreen.sideScreenBet.betslipArea.system.shouldHaveText(page, 0, '35');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select and Confirm Clear All', async ({}, testInfo) => {
      try {
        await lobbyHeader.clearAll.get(page).click();
        await lobbyHeader.clearAll.yes.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });

  test.describe('System 45 Betslip Scenarios (7 main + 2 euro numbers)', () => {
    test(`Select and Check System 45`, async ({}, testInfo) => {
      try {
        await settings.systemButtons.get(page, 45).click();
        await settings.systemButtons.shouldHaveText(page, 45);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Eurojackpot System 45 labels and values', async ({}, testInfo) => {
      try {
        await playArea.mainNumberSystemHeader.shouldHaveText(page, '7');
        await playArea.mainNumbersTxt.shouldHaveText(page);
        await playArea.euroNumberHeader.shouldHaveText(page);
        await playArea.euroNumbersTxt.shouldHaveText(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    const scenarios = [
      { main: 7, euro: 2, cost: '10€' },
      { main: 6, euro: 2, cost: '0€' },
      { main: 8, euro: 2, cost: '0€' },
      { main: 7, euro: 3, cost: '30€' },
    ];

    for (const { main, euro, cost } of scenarios) {
      test(`Clear All and select System 45 before (${main}+${euro}) numbers`, async ({}, testInfo) => {
        try {
          await lobbyHeader.clearAll.get(page).click();
          await lobbyHeader.clearAll.yes.get(page).click();
          await settings.systemButtons.get(page, 45).click();
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test(`Select numbers field for (${main}+${euro})`, async ({}, testInfo) => {
        try {
          for (let m = 1; m <= main; m++) {
            await playArea.mainNumberBtn.get(page, m).click();
          }
          for (let e = 1; e <= euro; e++) {
            await playArea.euroNumberBtn.get(page, e).click();
          }
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test(`Check betslip fields for (${main}+${euro})`, async ({}, testInfo) => {
        try {
          await sideScreen.sideScreenBet.betslipArea.isVisible(page, 0);
          await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 0, cost);
          await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, 0);
          await sideScreen.sideScreenBet.betslipArea.system.shouldHaveText(page, 0, '45');
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });
    }

    test('Select Random Pick table', async ({}, testInfo) => {
      try {
        await settings.quickPickBtn.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betslip fields (Random Pick)', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.isVisible(page, 0);
        await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 0, '30€');
        await sideScreen.sideScreenBet.betslipArea.system.shouldHaveText(page, 0, '45');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select and Confirm Clear All', async ({}, testInfo) => {
      try {
        await lobbyHeader.clearAll.get(page).click();
        await lobbyHeader.clearAll.yes.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });
}

export { runTests };
