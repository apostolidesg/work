class PlayerBestslipBoard {
  constructor({ betType, boardId, multipliers, panels = [{ selection: [] }], quickPick } = {}) {
    this.betType = betType;
    this.boardId = boardId;
    this.multipliers = multipliers;
    this.selection = this.getSelection(panels);
    this.quickPick = quickPick;
  }
  getSelection([panel]){
    return [...panel.selection];
  };
};

export default PlayerBestslipBoard;
