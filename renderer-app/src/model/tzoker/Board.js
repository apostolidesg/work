import TzokerConstants from '@/util/tzoker/Constants';
import TzokerBetslipUtils from '@/util/tzoker/BetslipUtils';
import { generateUUID } from '@/util/UuidUtils';

export default class Board {
  constructor({
    id = null,
    panels = [
      { selection: [], quickPick: false },
      { selection: [], quickPick: false },
    ],
    betType = TzokerConstants.BET_TYPES.DEFAULT,
    quickPick = false,
    systemId = null,
  } = {}) {
    this.id = id || generateUUID();
    this.panels = panels.map((panel) => ({
      selection: [...panel.selection],
      quickPick: panel.quickPick || false,
    }));
    this.betType = betType;
    this.quickPick = quickPick;
    this.systemId = systemId;
  }

  getId() {
    return this.id;
  }

  get mainNumbers() {
    return [...this.panels[0].selection].sort((a, b) => a - b);
  }

  get tzokerNumbers() {
    return [...this.panels[1].selection].sort((a, b) => a - b);
  }

  get mainNumbersCount() {
    return this.panels[0].selection.length;
  }

  get tzokerNumbersCount() {
    return this.panels[1].selection.length;
  }

  toggleNumber(number, panelType) {
    const panelIndex = panelType === TzokerConstants.PANEL_TYPES.MAIN ? 0 : 1;
    const selection = this.panels[panelIndex].selection;
    const index = selection.indexOf(number);

    if (index > -1) {
      selection.splice(index, 1);
    } else {
      const config = TzokerConstants.BOARD_NUMBERS[panelType];
      let maxAllowed = config.MAX_VALID_LENGTH;

      if (panelType === TzokerConstants.PANEL_TYPES.MAIN && this.systemId) {
        const systemConfig = TzokerConstants.SYSTEMS[this.systemId];
        if (systemConfig) {
          maxAllowed = systemConfig.numbers;
        }
      }

      if (selection.length < maxAllowed && number >= config.MIN && number <= config.MAX) {
        selection.push(number);
        selection.sort((a, b) => a - b);
      }
    }

    this.panels[panelIndex].quickPick = false;
  }

  selectNumber(number, panelType) {
    const panelIndex = panelType === TzokerConstants.PANEL_TYPES.MAIN ? 0 : 1;
    const selection = this.panels[panelIndex].selection;
    const config = TzokerConstants.BOARD_NUMBERS[panelType];

    if (selection.includes(number)) return;

    let maxAllowed = config.MAX_VALID_LENGTH;
    if (panelType === TzokerConstants.PANEL_TYPES.MAIN && this.systemId) {
      const systemConfig = TzokerConstants.SYSTEMS[this.systemId];
      if (systemConfig) {
        maxAllowed = systemConfig.numbers;
      }
    }

    if (selection.length < maxAllowed && number >= config.MIN && number <= config.MAX) {
      selection.push(number);
      selection.sort((a, b) => a - b);
      this.panels[panelIndex].quickPick = false;
    }
  }

  deselectNumber(number, panelType) {
    const panelIndex = panelType === TzokerConstants.PANEL_TYPES.MAIN ? 0 : 1;
    const selection = this.panels[panelIndex].selection;
    const index = selection.indexOf(number);

    if (index > -1) {
      selection.splice(index, 1);
      this.panels[panelIndex].quickPick = false;
    }
  }

  selectNumbers(numbers, panelType, replaceExisting = false) {
    const panelIndex = panelType === TzokerConstants.PANEL_TYPES.MAIN ? 0 : 1;

    if (replaceExisting) {
      this.panels[panelIndex].selection = [];
    }

    numbers.forEach((number) => this.selectNumber(number, panelType));
  }

  clearPanel(panelType) {
    const panelIndex = panelType === TzokerConstants.PANEL_TYPES.MAIN ? 0 : 1;
    this.panels[panelIndex].selection = [];
    this.panels[panelIndex].quickPick = false;
  }

  setQuickPick(panelType, count = null) {
    const panelIndex = panelType === TzokerConstants.PANEL_TYPES.MAIN ? 0 : 1;
    const config = TzokerConstants.BOARD_NUMBERS[panelType];

    let numbersToGenerate = count;
    if (!numbersToGenerate) {
      const currentCount = this.panels[panelIndex].selection.length;
      if (panelType === TzokerConstants.PANEL_TYPES.MAIN && this.systemId) {
        const systemConfig = TzokerConstants.SYSTEMS[this.systemId];
        numbersToGenerate = systemConfig ? systemConfig.numbers : config.MIN_VALID_LENGTH;
      } else {
        numbersToGenerate = Math.max(currentCount, config.MIN_VALID_LENGTH);
      }
    }

    const quickPickNumbers =
      panelType === TzokerConstants.PANEL_TYPES.MAIN
        ? TzokerBetslipUtils.generateMainQuickPick(numbersToGenerate)
        : TzokerBetslipUtils.generateTzokerQuickPick(numbersToGenerate);

    this.panels[panelIndex].selection = quickPickNumbers;
    this.panels[panelIndex].quickPick = true;
  }

  setFullQuickPick({ mainCount = null, tzokerCount = null } = {}) {
    let finalMainCount = mainCount;
    if (!finalMainCount) {
      const currentMainCount = this.panels[0].selection.length;
      if (this.systemId) {
        const systemConfig = TzokerConstants.SYSTEMS[this.systemId];
        finalMainCount = systemConfig ? systemConfig.numbers : TzokerConstants.BOARD_NUMBERS.MAIN.MIN_VALID_LENGTH;
      } else {
        finalMainCount = Math.max(currentMainCount, TzokerConstants.BOARD_NUMBERS.MAIN.MIN_VALID_LENGTH);
      }
    }

    let finalTzokerCount = tzokerCount;
    if (!finalTzokerCount) {
      const currentTzokerCount = this.panels[1].selection.length;
      finalTzokerCount = Math.max(currentTzokerCount, TzokerConstants.BOARD_NUMBERS.TZOKER.MIN_VALID_LENGTH);
    }

    const quickPick = TzokerBetslipUtils.generateFullQuickPick({
      mainCount: finalMainCount,
      tzokerCount: finalTzokerCount,
    });

    this.panels[0].selection = quickPick.mainNumbers;
    this.panels[0].quickPick = true;
    this.panels[1].selection = quickPick.tzokerNumbers;
    this.panels[1].quickPick = true;
    this.quickPick = true;
  }

  setSystem(systemId) {
    if (!TzokerBetslipUtils.isSystemValid(systemId)) return;

    if (this.systemId === systemId) {
      this.systemId = null;
    } else {
      this.systemId = systemId;
    }
  }

  removeSystem() {
    this.systemId = null;
  }

  hasSystem() {
    return this.systemId !== null;
  }

  getSystemInfo() {
    if (!this.hasSystem()) return null;
    return TzokerConstants.SYSTEMS[this.systemId] || null;
  }

  addAll20TzokerNumbers() {
    const all20 = Array.from({ length: 20 }, (_, i) => i + 1);
    this.panels[1].selection = all20;
    this.panels[1].quickPick = false;
  }

  reset() {
    this.panels = [
      { selection: [], quickPick: false },
      { selection: [], quickPick: false },
    ];
    this.betType = TzokerConstants.BET_TYPES.DEFAULT;
    this.quickPick = false;
    this.systemId = null;
  }

  isEmpty() {
    return TzokerBetslipUtils.isBoardEmpty(this);
  }

  isValid() {
    return TzokerBetslipUtils.isBoardValid(this);
  }

  calculateCost() {
    return TzokerBetslipUtils.calculateBoardCost(this);
  }

  clone() {
    return new Board({
      panels: this.panels.map((panel) => ({
        selection: [...panel.selection],
        quickPick: panel.quickPick,
      })),
      betType: this.betType,
      quickPick: this.quickPick,
      systemId: this.systemId,
    });
  }
}
