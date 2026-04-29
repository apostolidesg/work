import EurojackpotBetslipUtils from '../../../../src/util/eurojackpotBetslipUtilities';
import sinon from 'sinon';

describe('EurojackpotBetslipUtils', () => {
  describe('isBoardValid()', () => {
    describe('when board has no system', () => {
      it('should return true if board has the minimum valid selections', () => {
        const board = {
          panels: [
            {
              selection: [1, 2, 3, 4, 5],
            },
            {
              selection: [1, 2],
            },
          ],
        };
        expect(EurojackpotBetslipUtils.isBoardValid(board)).to.equal(true);
      });

      it('should return true if board has more than the minimum valid selections', () => {
        const board = {
          panels: [
            {
              selection: [1, 2, 3, 4, 5, 6],
            },
            {
              selection: [1, 2, 3],
            },
          ],
        };
        expect(EurojackpotBetslipUtils.isBoardValid(board)).to.equal(true);
      });

      it('should return false if the board has less than the minimum valid selections in main numbers', () => {
        const board = {
          panels: [
            {
              selection: [1, 2, 3, 4],
            },
            {
              selection: [1, 2],
            },
          ],
        };
        expect(EurojackpotBetslipUtils.isBoardValid(board)).to.equal(false);
      });

      it('should return false if the board has less than the minimum valid selections in euro numbers', () => {
        const board = {
          panels: [
            {
              selection: [1, 2, 3, 4, 5],
            },
            {
              selection: [1],
            },
          ],
        };
        expect(EurojackpotBetslipUtils.isBoardValid(board)).to.equal(false);
      });
    });

    describe('when board has system', () => {
      it('should return true if boards has the systems required selections and two euro numbers', () => {
        const board = {
          systemId: 45,
          panels: [
            {
              selection: [1, 2, 3, 4, 5, 6, 7],
            },
            {
              selection: [1, 2],
            },
          ],
        };
        expect(EurojackpotBetslipUtils.isBoardValid(board)).to.equal(true);
      });

      it('should return true if boards has the systems required selections and more than two euro numbers', () => {
        const board = {
          systemId: 45,
          panels: [
            {
              selection: [1, 2, 3, 4, 5, 6, 7],
            },
            {
              selection: [1, 2, 3],
            },
          ],
        };
        expect(EurojackpotBetslipUtils.isBoardValid(board)).to.equal(true);
      });

      it('should return false if boards has the systems required selections and less than two euro numbers', () => {
        const board = {
          systemId: 45,
          panels: [
            {
              selection: [1, 2, 3, 4, 5, 6, 7],
            },
            {
              selection: [1],
            },
          ],
        };
        expect(EurojackpotBetslipUtils.isBoardValid(board)).to.equal(false);
      });

      it('should return false if boards has less than the systems required selections and two euro numbers', () => {
        const board = {
          systemId: 45,
          panels: [
            {
              selection: [1, 2, 3, 4, 5, 6],
            },
            {
              selection: [1, 2],
            },
          ],
        };
        expect(EurojackpotBetslipUtils.isBoardValid(board)).to.equal(false);
      });
    });
  });

  describe('isSystemIdValid()', () => {
    it('should return true if the systemId is valid', () => {
      expect(EurojackpotBetslipUtils.isSystemIdValid(45)).to.equal(true);
    });

    it('should return false if the systemId is not valid', () => {
      expect(EurojackpotBetslipUtils.isSystemIdValid(46)).to.equal(false);
    });
  });

  describe('calculateBoardCost()', () => {
    it('should return the correct cost for a minimum board with no system', () => {
      const board = {
        panels: [
          {
            selection: [1, 2, 3, 4, 5],
          },
          {
            selection: [1, 2],
          },
        ],
      };
      expect(EurojackpotBetslipUtils.calculateBoardCost(board, 2)).to.equal(2);
    });

    it('should return the correct cost for a board with no system', () => {
      const board = {
        panels: [
          {
            selection: [1, 2, 3, 4, 5, 6],
          },
          {
            selection: [1, 2, 3],
          },
        ],
      };
      expect(EurojackpotBetslipUtils.calculateBoardCost(board, 2)).to.equal(36);
    });

    it('should return the correct cost for a board with system', () => {
      const board = {
        systemId: 45,
        panels: [
          {
            selection: [1, 2, 3, 4, 5, 6, 7],
          },
          {
            selection: [1, 2],
          },
        ],
      };
      expect(EurojackpotBetslipUtils.calculateBoardCost(board, 2)).to.equal(10);
    });
  });

  describe('getDrawDaysTitle()', () => {
    const translateStub = key => {
      const translations = {
        'days.0': 'Sunday',
        'days.1': 'Monday',
        'days.2': 'Tuesday',
        'days.3': 'Wednesday',
        'days.4': 'Thursday',
        'days.5': 'Friday',
        'days.6': 'Saturday',
      };

      return translations[key];
    };

    it('should return the correct title for one draw day', () => {
      const drawDays = [0];
      expect(EurojackpotBetslipUtils.getDrawDaysTitle(drawDays, translateStub)).to.equal('Sunday');
    });

    it('should return the correct title for two draw days', () => {
      const drawDays = [0, 1];
      expect(EurojackpotBetslipUtils.getDrawDaysTitle(drawDays, translateStub)).to.equal('Sunday & Monday');
    });

    it('should return the correct title for two unsorted draw days', () => {
      const drawDays = [1, 0];
      expect(EurojackpotBetslipUtils.getDrawDaysTitle(drawDays, translateStub)).to.equal('Sunday & Monday');
    });

    it('should return the correct title for more than two draw days', () => {
      const drawDays = [0, 1, 2];
      expect(EurojackpotBetslipUtils.getDrawDaysTitle(drawDays, translateStub)).to.equal('Sunday, Monday & Tuesday');
    });

    it('should return the correct title for more than two unsorted draw days', () => {
      const drawDays = [2, 0, 1];
      expect(EurojackpotBetslipUtils.getDrawDaysTitle(drawDays, translateStub)).to.equal('Sunday, Monday & Tuesday');
    });
  });

  describe('daysUntilNextDraw()', () => {
    it('should return -1 if the current time is after the next draw time', () => {
      const nextDrawTime = new Date();
      nextDrawTime.setHours(nextDrawTime.getHours() - 1);
      expect(EurojackpotBetslipUtils.daysUntilNextDraw(nextDrawTime.getTime())).to.equal(-1);
    });

    it('should return 0 if the current time and the next draw day are on the same date', () => {
      const now = 1697459277471; // Mon Oct 16 2023 15:27:57 GMT+0300
      const nextDrawTime = 1697470309673; // Mon Oct 16 2023 18:31:49 GMT+0300

      expect(EurojackpotBetslipUtils.daysUntilNextDraw(nextDrawTime, now)).to.equal(0);
    });

    it('should return 1 if the current time is before the next draw time', () => {
      const now = 1697459277471; // Mon Oct 16 2023 15:27:57 GMT+0300
      const nextDrawTime = 1697544000000; // Tue Oct 17 2023 15:00:00 GMT+0300

      expect(EurojackpotBetslipUtils.daysUntilNextDraw(nextDrawTime, now)).to.equal(1);
    });
  });

  describe('getDrawStatusFromResponse()', () => {
    let clock;
    const salesStart = {
      hours: 23,
      minutes: 0,
    };

    afterEach(() => {
      clock && clock.restore();
    });

    it('should return SALES_OPEN if the draw diff is 1 and both active and last draws are not today', () => {
      const activeDrawTime = new Date(2024, 0, 3, 21, 0, 0);
      const lastDrawTime = new Date(2024, 0, 1, 21, 0, 0);
      clock = sinon.useFakeTimers(new Date(2024, 0, 2, 6, 0, 0));

      const response = {
        last: {
          drawId: 1,
          drawTime: lastDrawTime.getTime(),
        },
        active: {
          drawId: 2,
          drawTime: activeDrawTime.getTime(),
        },
      };

      expect(EurojackpotBetslipUtils.getDrawStatusFromResponse(response, salesStart)).to.equal('SALES_OPEN');
    });

    it('should return SALES_OPEN if the draw diff is 1 and the draw date is today but now is before sales stop', () => {
      const activeDrawTime = new Date(2024, 0, 2, 21, 0, 0);
      const lastDrawTime = new Date(2024, 0, 1, 21, 0, 0);
      clock = sinon.useFakeTimers(new Date(2024, 0, 2, 20, 29, 0));

      const response = {
        last: {
          drawId: 1,
          lastDrawTime: lastDrawTime.getTime(),
        },
        active: {
          drawId: 2,
          drawTime: activeDrawTime.getTime(),
          drawBreak: 1800000, // 30 minutes
        },
      };

      expect(EurojackpotBetslipUtils.getDrawStatusFromResponse(response, salesStart)).to.equal('SALES_OPEN');
    });

    it('should return SALES_CLOSED if the draw diff is 1 and the draw date is today but now is after sales stop', () => {
      const activeDrawTime = new Date(2024, 0, 2, 21, 0, 0);
      const lastDrawTime = new Date(2024, 0, 1, 21, 0, 0);
      clock = sinon.useFakeTimers(new Date(2024, 0, 2, 20, 31, 0));

      const response = {
        last: {
          drawId: 1,
          lastDrawTime: lastDrawTime.getTime(),
        },
        active: {
          drawId: 2,
          drawTime: activeDrawTime.getTime(),
          drawBreak: 1800000, // 30 minutes
        },
      };

      expect(EurojackpotBetslipUtils.getDrawStatusFromResponse(response, salesStart)).to.equal('SALES_CLOSED');
    });

    it('should return SALES_CLOSED if the draw diff is 1 and the last draw date is today and before sales start', () => {
      const activeDrawTime = new Date(2024, 0, 3, 21, 0, 0);
      const lastDrawTime = new Date(2024, 0, 2, 21, 0, 0);
      clock = sinon.useFakeTimers(new Date(2024, 0, 2, 22, 59, 0));

      const response = {
        last: {
          drawId: 1,
          lastDrawTime: lastDrawTime.getTime(),
        },
        active: {
          drawId: 2,
          drawTime: activeDrawTime.getTime(),
          drawBreak: 1800000, // 30 minutes
        },
      };

      expect(EurojackpotBetslipUtils.getDrawStatusFromResponse(response, salesStart)).to.equal('SALES_CLOSED');
    });

    it('should return SALES_OPEN if the draw diff is 1 and the last draw date is today but after sales start', () => {
      const activeDrawTime = new Date(2024, 0, 3, 21, 0, 0);
      const lastDrawTime = new Date(2024, 0, 2, 21, 0, 0);
      clock = sinon.useFakeTimers(new Date(2024, 0, 2, 23, 0, 1));

      const response = {
        last: {
          drawId: 1,
          lastDrawTime: lastDrawTime.getTime(),
        },
        active: {
          drawId: 2,
          drawTime: activeDrawTime.getTime(),
          drawBreak: 1800000, // 30 minutes
        },
      };

      expect(EurojackpotBetslipUtils.getDrawStatusFromResponse(response, salesStart)).to.equal('SALES_OPEN');
    });

    it('should return SALES_CLOSED if the draw diff is 2', () => {
      const drawTime = new Date(2024, 0, 1, 21, 0, 0);

      const response = {
        last: {
          drawId: 1,
        },
        active: {
          drawId: 3,
          drawTime: drawTime.getTime(),
        },
      };

      expect(EurojackpotBetslipUtils.getDrawStatusFromResponse(response, salesStart)).to.equal('SALES_CLOSED');
    });
  });

  describe('getStatusForFirstDraw()', () => {
    let clock;

    afterEach(() => {
      clock && clock.restore();
    });

    it('should return SALES_OPEN if the draw date is today but now is before sales stop', () => {
      const activeDrawTime = new Date(2024, 0, 2, 21, 0, 0);
      clock = sinon.useFakeTimers(new Date(2024, 0, 2, 20, 29, 0));

      const response = {
        drawId: 1,
        drawTime: activeDrawTime.getTime(),
        drawBreak: 1800000, // 30 minutes
      };

      expect(EurojackpotBetslipUtils.getStatusForFirstDraw(response)).to.equal('SALES_OPEN');
    });

    it('should return SALES_CLOSED if the draw date is today but now is after sales stop', () => {
      const activeDrawTime = new Date(2024, 0, 2, 21, 0, 0);
      clock = sinon.useFakeTimers(new Date(2024, 0, 2, 20, 31, 0));

      const response = {
        drawId: 1,
        drawTime: activeDrawTime.getTime(),
        drawBreak: 1800000, // 30 minutes
      };

      expect(EurojackpotBetslipUtils.getStatusForFirstDraw(response)).to.equal('SALES_CLOSED');
    });
  });
});
