import PlayerBestslipBoard from './PlayerBetslipBoard';

class PlayerBestslip {
  constructor({
    serialNumbers,
    wagerId,
    wager: {
      boards = [],
      columns,
      cost,
      participatingDraws: {
        draws = [],
        firstDraw,
        firstDrawTime,
        lastDraw,
        lastDrawTime,
        multipleDraws
      } = {},
      status,
      blockStatus,
      discount
    }
  } = {}) {
    [this.serialNumber] = serialNumbers;
    this.wagerId = wagerId;
    this.boards = this.getBoards(boards);
    this.columns = columns;
    this.cost = cost;
    this.draws = [...draws];
    this.firstDraw = firstDraw;
    this.firstDrawTime = firstDrawTime;
    this.lastDraw = lastDraw;
    this.lastDrawTime = lastDrawTime;
    this.multipleDraws = multipleDraws;
    this.status = status;
    this.blockStatus = blockStatus;
    this.discount = discount;
  }
  getBoards(boards) {
    return boards.map(board => new PlayerBestslipBoard(board));
  };
};

export default PlayerBestslip;
