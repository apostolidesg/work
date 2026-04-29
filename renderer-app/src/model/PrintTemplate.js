import generateOneDBarcode from 'jsbarcode';
import dayjs from 'dayjs';
import Mustache from 'mustache';
import generatePDF417Barcode from 'pdf417';
import QRCode from 'qrcode';
import rasterizeHTML from 'rasterizehtml';
import localeEl from '@/locales/el/locale-el';
import {
  eurojackpotBetslipTemplateEl,
  eurojackpotBetslipTemplateEn,
  fireblazeBetslipTemplateEl,
  fireblazeBetslipTemplateEn,
  kinoBetslipTemplateEl,
  kinoBetslipTemplateEn,
  kinoBetslipTemplateL10El,
  kinoBetslipTemplateL10En,
  powerspinBetslipTemplateEl,
  powerspinBetslipTemplateEn,
  voucherTemplateEl,
  voucherTemplateEn,
  instantWinVoucherTemplateEl,
  instantWinVoucherTemplateEn,
} from '@/templates';
import powerspinBetslipUtils from '@/util/powerspin/BetslipUtils';
import Constants from '@/util/Constants';
import eurojackpotConstants from '@/util/eurojackpot/Constants';
// import fireblazeConstants from '@/util/fireblaze/Constants';
import powerspinConstants from '@/util/powerspin/Constants';
import printingUtils from '@/util/printingUtils';
import Utilities from '@/util/Utilities';
import Betslip from '@/model/powerspin/Betslip';
// import FireblazeBetslipUtilities from '@/util/fireblaze/BetslipUtils';
import allwynVerticalLogo from '@/assets/allwyn-logo-vertical-bw.png';
import allwynHorizontalLogo from '@/assets/allwyn-logo-horizontal-bw.png';

//TODO add Fireblaze when store and utils are ready

export default class PrintTemplate {
  constructor() {
    this.isL10Version = false;
  }

  /**
   * Set class boolean indicating whether a L10 version is used or not
   * by checking the length of the provided serialNumber
   *
   * @param serialNumbers
   * @returns {Boolean}
   */
  setIsL10Version(serialNumbers) {
    this.isL10Version = serialNumbers && serialNumbers.length > 0 ? Utilities.isL10Version(serialNumbers[0], 0) : false;
  }

  /**
   * Preparation of the bestslip template
   *
   * @param printType
   * @param data
   * @param locale
   * @returns {*}
   */

  async prepareTemplate(printType, data, locale) {
    this.setIsL10Version(data?.serialNumbers);
    const renderedHTML = await this.renderHTML(printType, data, locale);
    const betSlipHeight = data.wager
      ? this.calculateTemplateHeight(printType, data)
      : this.calculateTemplateHeight(printType);
    const betSlipCanvas = document.createElement('canvas');

    // Should be set dynamic
    betSlipCanvas.setAttribute('width', Constants.RECEIPT_WIDTH.toString());
    betSlipCanvas.setAttribute('height', betSlipHeight.toString());

    const betSlipCanvasContext = betSlipCanvas.getContext('2d');
    betSlipCanvasContext.fillStyle = Constants.RECEIPT_FILL_COLOR;
    betSlipCanvasContext.fillRect(0, 0, Constants.RECEIPT_WIDTH, betSlipHeight);

    return rasterizeHTML.drawHTML(renderedHTML, betSlipCanvas).then(() => {
      return {
        canvas: betSlipCanvas,
      };
    });
  }

  async processData(printType, data) {
    if (data?.companyInfo) {
      data.companyInfo.address = localeEl.companyInfo.address;
    } else data.companyInfo = localeEl.companyInfo;

    if (printType === Constants.PRINT_TYPE.POWERSPIN_BETSLIP) {
      return this.processPowerpinBetslipData(data);
    }

    if (printType === Constants.PRINT_TYPE.EUROJACKPOT_BETSLIP) {
      return this.processEurojackpotBetslipData(data);
    }

    if (printType === Constants.PRINT_TYPE.FIREBLAZE_BETSLIP) {
      return this.processFireblazeBetslipData(data);
    }

    if (printType === Constants.PRINT_TYPE.INSTANT_WIN_VOUCHER) {
      return this.processInstantWinData(data);
    }

    switch (printType) {
      case Constants.PRINT_TYPE.BETSLIP: {
        data.wager.cost = Utilities.formatNumber(data.wager.cost);
        data.wager.participatingDraws.firstDrawTime = this.getDrawDateTime(
          parseInt(data.wager.participatingDraws.firstDrawTime)
        ).format('DD/MM/YYYY HH:mm:ss');
        data.wager.participatingDraws.lastDrawTime = this.getDrawDateTime(
          parseInt(data.wager.participatingDraws.lastDrawTime)
        ).format('DD/MM/YYYY HH:mm:ss');
        const dateTime = dayjs();
        data.currentDate = dateTime.format('DD/MM/YY');
        data.currentDateTime = dateTime.format('DD/MM/YY HH:mm:ss');
        // Set serialNumber
        const { serialNumbers, iSecure } = data;
        const serialNumber = this.getSerialNumber(serialNumbers[0], iSecure);
        const barcodePrefix = this.isL10Version ? '' : Constants.BARCODE_DATA.LOTTERY_SERIAL_NUMBER_PREFIX;
        const orientation = this.isL10Version
          ? Constants.PRINT_LOGO_ORIENTATION.VERTICAL
          : Constants.PRINT_LOGO_ORIENTATION.HORIZONTAL;
        data.logoUrl = this.getLogoUrl(orientation);
        data.imageURL = generatePDF417Barcode(barcodePrefix + serialNumber, 5, 1);
        // Create QrCode only for L10
        data.qrCodeURL = this.isL10Version ? await this.generateQRCode(serialNumber) : null;
        data.serialNumber = serialNumber.replace(/(\d{5})/g, '$1 ').replace(/(^\s+|\s+$)/, '');
        const areas = localeEl.area_labels;
        data.columns = this.isL10Version
          ? data.wager.columns
          : data.wager.columns * data.wager.participatingDraws.multipleDraws;
        data.wager.boards.forEach((board, index) => {
          if (
            board.betType === Constants.ILOT_GAMETYPES.BET_WITHOUT_KINO_BONUS ||
            board.betType === Constants.ILOT_GAMETYPES.BET_WITH_KINO_BONUS ||
            board.betType === Constants.ILOT_GAMETYPES.BET_WITH_CLOSE_2_WIN ||
            board.betType === Constants.ILOT_GAMETYPES.BET_WITH_CLOSE_2_WIN_AND_KINO_BONUS
          ) {
            board.kinoBonus = [
              Constants.ILOT_GAMETYPES.BET_WITH_KINO_BONUS,
              Constants.ILOT_GAMETYPES.BET_WITH_CLOSE_2_WIN_AND_KINO_BONUS,
            ].includes(board.betType);

            board.close2Win = [
              Constants.ILOT_GAMETYPES.BET_WITH_CLOSE_2_WIN,
              Constants.ILOT_GAMETYPES.BET_WITH_CLOSE_2_WIN_AND_KINO_BONUS,
            ].includes(board.betType);

            board.area = areas[index];
            board.panels[0].selection = board.panels[0].selection.map((e) => {
              return e.toString().padStart(2, '0');
            });
            board.panels[0].selectionCount = board.panels[0].selection.length.toString().padStart(2, '0');
            const numbersLeft = 12 - board.panels[0].selection.length;
            for (let i = 0; i < numbersLeft; i++) board.panels[0].selection.push('--');
          } else if (board.betType === Constants.ILOT_GAMETYPES.COLUMNS) {
            board.area = localeEl.columns;
            board.value = Utilities.formatNumber(board.multipliers * board.panels[0].selection.length * 0.5);
            board.panels[0].selection = board.panels[0].selection.map((e) => {
              return `${e.toString()}Η`;
            });
            const numbersLeft = 10 - board.panels[0].selection.length;
            for (let i = 0; i < numbersLeft; i++) board.panels[0].selection.push('--');
          } else {
            board.area = localeEl.oddEvenGameType;
            switch (board.betType) {
              case Constants.ILOT_GAMETYPES.ODD:
                board.panels[0].selection.push(localeEl.odd);
                break;
              case Constants.ILOT_GAMETYPES.EVEN:
                board.panels[0].selection.push(localeEl.even);
                break;
              case Constants.ILOT_GAMETYPES.DRAW:
                board.panels[0].selection.push(localeEl.draw);
                break;
            }
            board.value = Utilities.formatNumber(board.multipliers * 0.5);
          }
        });
        this.setInstantWinData(data, localeEl);
        const operator = data.operator.toString().padStart(6, '0');
        data.operator = this.isL10Version ? '0' : operator;

        data.wagerId = data.wagerId.toString().padStart(7, '0');
        data.hexCrcCode = data.hexCrcCode.toUpperCase();

        const terminalId = data.terminalId.toString();
        data.terminalId = this.isL10Version ? terminalId : terminalId.substring(terminalId.length - 3);
        data.terms = localeEl.printBetslipTerms;
        break;
      }
      case Constants.PRINT_TYPE.VOUCHER: {
        data.voucher.amount = Utilities.formatNumber(data.voucher.amount);
        data.logoUrl = this.getLogoUrl(Constants.PRINT_LOGO_ORIENTATION.HORIZONTAL);
        data.twoDBarcodeImage = generatePDF417Barcode(data.voucher.voucherId, 5, 1);
        const oneDCanvas = document.createElement('canvas');
        generateOneDBarcode(oneDCanvas, data.voucher.voucherId, {
          displayValue: false,
        });
        data.oneDBarcodeImage = oneDCanvas.toDataURL();
        data.voucher.operatorId = data.voucher.operatorId.toString().padStart(2, '0');
        data.voucher.voucherId = data.voucher.voucherId.match(/.{1,4}/g).join(' ');
        data.currentDate = dayjs().format('DD.MM.YYYY HH:mm:ss');
        break;
      }
    }

    return data;
  }

  async processPowerpinBetslipData(initialData) {
    const data = { ...initialData };

    const wheelNumMap = {
      '0_el': 'A',
      '0_en': 'A',
      '1_el': 'B',
      '1_en': 'B',
      '2_el': 'Γ',
      '2_en': 'C',
    };

    data.wager.cost = Utilities.formatNumber(data.wager.cost);
    data.wager.maxWinnings = Utilities.formatNumber(data.wager.maxWinnings);
    data.wager.participatingDraws.firstDrawTime = dayjs(parseInt(data.wager.participatingDraws.firstDrawTime)).format(
      'DD/MM/YYYY HH:mm:ss'
    );
    data.wager.participatingDraws.lastDrawTime = dayjs(parseInt(data.wager.participatingDraws.lastDrawTime)).format(
      'DD/MM/YYYY HH:mm:ss'
    );

    data.currentDate = dayjs().format('DD/MM/YY');
    data.currentDateTime = dayjs().format('DD/MM/YY HH:mm:ss');

    const { serialNumbers, iSecure } = data;
    const serialNumber = this.getSerialNumber(serialNumbers[0], iSecure);
    data.logoUrl = this.getLogoUrl(Constants.PRINT_LOGO_ORIENTATION.VERTICAL);
    data.imageURL = generatePDF417Barcode(serialNumber, 5, 1);
    data.qrCodeURL = await this.generateQRCode(serialNumber);
    data.serialNumber = serialNumber.replace(/(\d{5})/g, '$1 ').replace(/(^\s+|\s+$)/, '');
    data.columns = data.wager.columns;

    // Create a betslip model from the response in order to parse the data easily
    const betslip = new Betslip(data.wager);

    data.hasWheels = !betslip.isWheelsEmpty();
    data.wager.multipliers = betslip.getMultiplierNumber();
    data.isCompo = betslip.wager.wheels.length > 1;
    data.wheels = betslip.wager.wheels.map((wheel, wheelIndex) => ({
      categories: Object.values(wheel.categories)
        // Filter out the empty categories
        .filter((category) => !powerspinBetslipUtils.isWheelCategoryEmpty(category))
        .map((category) => {
          const isNumber = category.type === powerspinConstants.GAME_CATEGORY.NUMBER;
          const isSymbol = category.type === powerspinConstants.GAME_CATEGORY.SYMBOL;
          const isColor = category.type === powerspinConstants.GAME_CATEGORY.COLOR;
          const isUnderOver = category.type === powerspinConstants.GAME_CATEGORY.OVER_UNDER;

          const { numbers } = isNumber
            ? printingUtils.constructNumbersForPrint(
                category.boards[0].panels[0].selection,
                powerspinConstants.MAX_WHEEL_NUMBERS_PER_ROW_ON_PRINT
              )
            : { numbers: [] };

          const categoryCost =
            powerspinBetslipUtils.calculateCategoryColumnsNumber({ category }) *
            powerspinConstants.BASIC_BETTING_AMOUNT *
            (category.multipliers ? category.multipliers : category.boards[0].multipliers).reduce(
              (acc, val) => acc + val
            );

          const requested = isNumber && category.boards[0].panels[0].requested.sort((a, b) => b - a);

          return {
            wheelNum: wheelNumMap[`${wheelIndex}_el`],
            isCompo: data.isCompo,
            isNumber,
            isSymbol: isSymbol && category.boards[0].betType,
            isColor,
            isUnderOver,
            numbers,
            multipliers: category.boards[0].getMultiplierNumber(),
            categoryCost: Utilities.formatNumber(categoryCost),
            topRequested: isNumber && requested[0].toString().padStart(2, '0'),
            hasAdditionalSystems: isNumber && requested.length > 1,
            additionalSystems:
              isNumber && requested.length > 1
                ? [...requested.slice(1)].map((r) => r.toString().padStart(2, '0'))
                : null,
            quickPick: category.boards[0]?.quickPick,
            colors:
              isColor &&
              category.boards.map((b) => ({
                red: b.betType === powerspinConstants.ILOT_GAMETYPES.PLAY_COLOR_RED,
                green: b.betType === powerspinConstants.ILOT_GAMETYPES.PLAY_COLOR_GREEN,
                blue: b.betType === powerspinConstants.ILOT_GAMETYPES.PLAY_COLOR_BLUE,
              })),
            underOver:
              isUnderOver &&
              category.boards.map((b) => ({
                under: b.betType === powerspinConstants.ILOT_GAMETYPES.PLAY_UNDER,
                over: b.betType === powerspinConstants.ILOT_GAMETYPES.PLAY_OVER,
              })),
          };
        }),
    }));

    data.hasMarkets = !betslip.wager.markets.isEmpty();
    data.markets = Object.values(betslip.wager.markets.categories)
      .filter((category) => !powerspinBetslipUtils.isMarketsCategoryEmpty(category))
      .map((category) => {
        const isNumberOnAnyWheel = category.type === powerspinConstants.MARKETS_CATEGORY.NUMBER_ON_WHEEL;
        const isWheelsWithSymbol = category.type === powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL;
        const isWheelsWithNumber = category.type === powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_NUMBER;

        const { numbers } = isNumberOnAnyWheel
          ? printingUtils.constructNumbersForPrint(
              category.boards[0].panels[0].selection,
              powerspinConstants.MAX_MARKET_NUMBERS_PER_ROW_ON_PRINT
            )
          : { numbers: [] };

        const wheelsWithSymbol =
          isWheelsWithSymbol &&
          category.boards.map((b) => ({
            noWheel: b.betType === powerspinConstants.ILOT_GAMETYPES.PLAY_SYMBOL_ON_NONE_WHEEL,
            atLeastOne: b.betType === powerspinConstants.ILOT_GAMETYPES.PLAY_SYMBOL_ON_AT_LEAST_ONE_WHEEL,
          }));

        const wheelsWithNumber =
          isWheelsWithNumber &&
          category.boards.map((b) => ({
            twoWheels: b.betType === powerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER_ON_TWO_WHEELS,
            threeWheels: b.betType === powerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER_ON_THREE_WHEELS,
          }));

        const categoryCost =
          powerspinBetslipUtils.calculateCategoryColumnsNumber({ category }) *
          powerspinConstants.BASIC_BETTING_AMOUNT *
          (category.multipliers ? category.multipliers : category.boards[0].multipliers).reduce(
            (acc, val) => acc + val
          );

        return {
          isNumberOnAnyWheel,
          isWheelsWithSymbol,
          isWheelsWithNumber,
          numbers,
          wheelsWithSymbol,
          wheelsWithNumber,
          multipliers: category.boards[0].getMultiplierNumber(),
          categoryCost,
        };
      });

    this.setInstantWinData(data, localeEl);

    data.operator = '0';
    data.wagerId = data.wagerId.toString().padStart(7, '0');
    data.hexCrcCode = data.hexCrcCode.toUpperCase();

    data.terminalId = data.terminalId.toString();
    data.terms = localeEl.printBetslipTerms;

    return data;
  }

  async processEurojackpotBetslipData(initialData) {
    const data = { ...initialData };
    data.wager.cost = Utilities.formatNumber(data.wager.cost);

    data.wager.participatingDraws.firstDrawTime = dayjs(
      parseInt(data.wager.participatingDraws.firstDrawTime) * 1000
    ).format('DD/MM/YYYY HH:mm:ss');
    data.wager.participatingDraws.lastDrawTime = dayjs(
      parseInt(data.wager.participatingDraws.lastDrawTime) * 1000
    ).format('DD/MM/YYYY HH:mm:ss');

    data.currentDate = dayjs().format('DD/MM/YY');
    data.currentDateTime = dayjs().format('DD/MM/YY HH:mm:ss');

    const { serialNumbers, iSecure } = data;
    const serialNumber = this.getSerialNumber(serialNumbers[0], iSecure);
    data.logoUrl = this.getLogoUrl(Constants.PRINT_LOGO_ORIENTATION.VERTICAL);
    data.imageURL = generatePDF417Barcode(serialNumber, 5, 1);
    data.qrCodeURL = await this.generateQRCode(serialNumber);
    data.serialNumber = serialNumber.replace(/(\d{5})/g, '$1 ').replace(/(^\s+|\s+$)/, '');
    data.columns = data.wager.columns / 2;

    this.setInstantWinData(data, localeEl);

    data.operator = '0';
    data.wagerId = data.wagerId.toString().padStart(7, '0');
    data.hexCrcCode = data.hexCrcCode.toUpperCase();

    data.terminalId = data.terminalId.toString();
    data.terms = localeEl.printBetslipTerms;

    const INDEX_MAPPER = ['Α', 'Β', 'Γ', 'Δ', 'Ε', 'ΣΤ'];

    data.boards = data.wager.boards.map((board, boardIndex) => {
      const system = board.systemId;

      return {
        panels: board.panels.map((panel, panelIndex) => {
          return {
            leading:
              panelIndex === 0 ? `${INDEX_MAPPER[boardIndex]}${system || '05'}` : `${INDEX_MAPPER[boardIndex]}02`,
            selection: printingUtils.constructNumbersForPrint(
              panel.selection.sort((a, b) => a - b),
              eurojackpotConstants.MAX_NUMBERS_PER_ROW_ON_PRINT
            ).numbers,
            quickPick: panel.quickPick,
          };
        }),
      };
    });

    return data;
  }

  async processFireblazeBetslipData(initialData) {
    const data = { ...initialData };

    const { serialNumbers, iSecure } = data;
    const serialNumber = this.getSerialNumber(serialNumbers[0], iSecure);

    data.serialNumber = serialNumber.replace(/(\d{5})/g, '$1 ').replace(/(^\s+|\s+$)/, '');
    data.logoUrl = this.getLogoUrl(Constants.PRINT_LOGO_ORIENTATION.VERTICAL);
    data.qrCodeURL = await this.generateQRCode(serialNumber);

    data.wager.cost = Utilities.formatNumber(data.wager.cost);
    data.wager.maxWinnings = Utilities.formatNumber(data.wager.maxWinnings);
    data.columns = data.wager.columns;

    data.wager.participatingDraws.firstDrawTime = dayjs(parseInt(data.wager.participatingDraws.firstDrawTime)).format(
      'DD/MM/YYYY HH:mm:ss'
    );
    data.wager.participatingDraws.lastDrawTime = dayjs(parseInt(data.wager.participatingDraws.lastDrawTime)).format(
      'DD/MM/YYYY HH:mm:ss'
    );

    data.currentDate = dayjs().format('DD/MM/YY');
    data.currentDateTime = dayjs().format('DD/MM/YY HH:mm:ss');

    this.setInstantWinData(data, localeEl);

    data.operator = '0';

    data.wagerId = data.wagerId.toString().padStart(7, '0');
    data.hexCrcCode = data.hexCrcCode.toUpperCase();

    data.terminalId = data.terminalId.toString();
    data.terms = localeEl.printBetslipTerms;

    data.imageURL = generatePDF417Barcode(serialNumber, 5, 1);

    const betLabels = localeEl.betType_labels;

    data.wager.boards.forEach((board) => {
      board.betLabel = betLabels[board.betType];
      board.panels[0].selection = board.panels[0].selection.map((e) => {
        return e.toString().padStart(2, '0');
      });
      board.multipliers = [board.multipliers];
      board.value = Utilities.formatNumber(FireblazeBetslipUtilities.calculateBoardCost(board, 0.5));
    });

    return data;
  }

  async processInstantWinData(initialData) {
    const data = { ...initialData };
    data.instantWinInfo = localeEl.instantWinInfo;
    data.logoUrl = this.getLogoUrl(Constants.PRINT_LOGO_ORIENTATION.VERTICAL);

    const grossAmount = data?.promotionOutcomes?.[0]?.outcomeMetaData?.RealMoney?.winDetails?.grossAmount ?? 0;
    const netAmount = data?.promotionOutcomes?.[0]?.outcomeMetaData?.RealMoney?.winDetails?.netAmount ?? 0;
    const taxAmount = data?.promotionOutcomes?.[0]?.outcomeMetaData?.RealMoney?.winDetails?.taxAmount ?? 0;
    const IwParticipationsAttempts =
      data?.promotionOutcomes?.[0]?.outcomeMetaData?.RealMoney?.IwParticipations?.Attempts ?? 0;
    const promotionId = data?.promotionOutcomes?.[0]?.promotionId;
    const promotionSerialNumber = data?.promotionOutcomes?.[0]?.promotionSerialNumber;

    data.instantWin = {
      grossAmount: Utilities.formatNumber(grossAmount),
      netAmount: Utilities.formatNumber(netAmount),
      taxAmount: Utilities.formatNumber(taxAmount),
      IwParticipationsAttempts,
      promotionId,
      promotionSerialNumber,
    };

    data.hexCrcCode = data.hexCrcCode.toUpperCase();

    data.gameName = Constants.SSBT_GAME_NAMES[data.gameType];

    const dateTime = dayjs();
    data.currentDateTime = dateTime.format('DD/MM/YY HH:mm:ss');
    data.wagerId = data.wagerId.toString().padStart(7, '0');

    const { serialNumbers, iSecure } = data;
    const serialNumber = this.getSerialNumber(serialNumbers[0], iSecure);
    const barcodePrefix = this.isL10Version ? '' : Constants.BARCODE_DATA.LOTTERY_SERIAL_NUMBER_PREFIX;
    data.imageURL = generatePDF417Barcode(barcodePrefix + serialNumber, 5, 1);

    return data;
  }

  setInstantWinData(data, locale = localeEl) {
    const outcomeType = data?.promotionOutcomes?.[0]?.outcomeType;
    if (outcomeType === Constants.PROMOTIONS_INSTANT_WIN_OUTCOME) {
      data.isInstantWin = true;
      data.instantWinNotification = locale.promotions.instantWinNotification;
      data.instantWinTitle = locale.promotions.instantWinTitle;
      data.instantWinDescription = locale.promotions.instantWinDescription;
    } else {
      data.isInstantWin = false;
    }
  }

  async renderHTML(printType, data, locale) {
    switch (printType) {
      case Constants.PRINT_TYPE.BETSLIP: {
        const betslipTemplate = this.getBetslipTemplate(locale);
        return Mustache.render(betslipTemplate, await this.processData(printType, data));
      }
      case Constants.PRINT_TYPE.POWERSPIN_BETSLIP:
        return Mustache.render(
          locale === 'el' ? powerspinBetslipTemplateEl : powerspinBetslipTemplateEn,
          await this.processData(printType, data)
        );
      case Constants.PRINT_TYPE.FIREBLAZE_BETSLIP:
        return Mustache.render(
          locale === 'el' ? fireblazeBetslipTemplateEl : fireblazeBetslipTemplateEn,
          await this.processData(printType, data)
        );
      case Constants.PRINT_TYPE.EUROJACKPOT_BETSLIP:
        return Mustache.render(
          locale === 'el' ? eurojackpotBetslipTemplateEl : eurojackpotBetslipTemplateEn,
          await this.processData(printType, data)
        );
      case Constants.PRINT_TYPE.VOUCHER:
        return Mustache.render(
          locale === 'el' ? voucherTemplateEl : voucherTemplateEn,
          await this.processData(printType, data)
        );
      case Constants.PRINT_TYPE.INSTANT_WIN_VOUCHER:
        return Mustache.render(
          locale === 'el' ? instantWinVoucherTemplateEl : instantWinVoucherTemplateEn,
          await this.processData(printType, data)
        );
    }
  }

  /**
   * Get the correct template depenting on the provided locale and the isL10Version class property
   *
   * @param locale
   * @returns {*} Template reference
   */
  getBetslipTemplate(locale) {
    if (this.isL10Version) {
      return locale === 'el' ? kinoBetslipTemplateL10El : kinoBetslipTemplateL10En;
    }
    return locale === 'el' ? kinoBetslipTemplateEl : kinoBetslipTemplateEn;
  }

  /**
   * Get the final serialNumber used for display, barcode and qrcode
   *
   * @param serialNumber
   * @param iSecure object
   * @returns {String}
   */
  getSerialNumber(serialNumber, { randomNumbers = [], crcCode = '' } = {}) {
    return this.isL10Version ? `${serialNumber}${randomNumbers.join('')}${crcCode}` : serialNumber;
  }

  getLogoUrl(orientation) {
    const isVertical = orientation === Constants.PRINT_LOGO_ORIENTATION.VERTICAL;

    if (isVertical) return allwynVerticalLogo;
    return allwynHorizontalLogo;
  }

  calculateTemplateHeight(printType, data = {}) {
    const outcomeType = data?.promotionOutcomes?.[0]?.outcomeType;
    var instantWinExtraHeight = 0;
    if (outcomeType === Constants.PROMOTIONS_INSTANT_WIN_OUTCOME) {
      instantWinExtraHeight += Constants.RECEIPT_IW_HEIGHT;
    }
    switch (printType) {
      case Constants.PRINT_TYPE.POWERSPIN_BETSLIP:
        return this.calculatePowerspinTemplateHeight(data.wager) + instantWinExtraHeight;
      case Constants.PRINT_TYPE.EUROJACKPOT_BETSLIP:
        return this.calculateEurojackpotTemplateHeight(data.wager) + instantWinExtraHeight;
      case Constants.PRINT_TYPE.FIREBLAZE_BETSLIP:
        return this.calculateFireblazeTemplateHeight(data.wager) + instantWinExtraHeight;
      case Constants.PRINT_TYPE.BETSLIP: {
        const l10ExtraHeight = this.isL10Version ? Constants.RECEIPT_L10_EXTRA_HEIGHT : 0;
        return (
          Constants.RECEIPT_VERTICAL_SPACE +
          data.wager.boards.length * 2 * Constants.RECEIPT_ROW_HEIGHT +
          9 * Constants.RECEIPT_ROW_HEIGHT +
          Constants.BETSLIP_TOTAL_COST_ROW_HEIGHT +
          Constants.PDF417_BARCODE_HEIGHT +
          Constants.RECEIPT_LOGO_HEIGHT +
          Constants.COMPANY_INFO_HEIGHT +
          l10ExtraHeight +
          instantWinExtraHeight
        );
      }
      case Constants.PRINT_TYPE.VOUCHER:
        return (
          Constants.RECEIPT_VERTICAL_SPACE +
          7 * Constants.RECEIPT_ROW_HEIGHT +
          2 * Constants.BETSLIP_TOTAL_COST_ROW_HEIGHT +
          Constants.PDF417_BARCODE_HEIGHT +
          Constants.CODE_128_BARCODE_HEIGHT +
          Constants.COMPANY_INFO_HEIGHT +
          Constants.RECEIPT_LOGO_HEIGHT
        );
      default:
        return Constants.RECEIPT_DEFAULT_HEIGHT;
    }
  }

  calculatePowerspinTemplateHeight(wager) {
    let height =
      Constants.RECEIPT_VERTICAL_SPACE +
      Constants.BETSLIP_TOTAL_COST_ROW_HEIGHT +
      Constants.PDF417_BARCODE_HEIGHT +
      Constants.RECEIPT_LOGO_HEIGHT +
      Constants.RECEIPT_L10_EXTRA_HEIGHT +
      Constants.COMPANY_INFO_HEIGHT +
      10 * Constants.RECEIPT_ROW_HEIGHT;
    const betslip = new Betslip(wager);

    const isCompo = betslip.wager.wheels.length > 1;

    if (!isCompo) {
      const categories = Object.values(betslip.wager.wheels[0].categories).filter(
        (category) => !powerspinBetslipUtils.isWheelCategoryEmpty(category)
      );
      height += categories.length * Constants.RECEIPT_ROW_HEIGHT * 2;

      const containsNumberWithExtented = categories.find(
        (category) =>
          category.type === powerspinConstants.GAME_CATEGORY.NUMBER && category.boards[0].panels[0].requested.length > 1
      );
      if (containsNumberWithExtented) {
        height += Constants.RECEIPT_ROW_HEIGHT;
      }

      const hasMoreThan12Nums = categories.find(
        (category) =>
          category.type === powerspinConstants.GAME_CATEGORY.NUMBER &&
          category.boards[0].panels[0].selection.length > powerspinConstants.MAX_WHEEL_NUMBERS_PER_ROW_ON_PRINT
      );

      if (hasMoreThan12Nums) {
        height += Constants.RECEIPT_ROW_HEIGHT;
      }
    } else {
      const rows = betslip.wager.wheels.reduce((acc, wheel) => {
        return (
          acc +
          Object.values(wheel.categories)
            .filter((category) => !powerspinBetslipUtils.isWheelCategoryEmpty(category))
            .reduce((prev, category) => {
              if (
                category.type === powerspinConstants.GAME_CATEGORY.NUMBER &&
                category.boards[0].panels[0].selection.length > powerspinConstants.MAX_WHEEL_NUMBERS_PER_ROW_ON_PRINT
              ) {
                return prev + 2;
              }
              return prev + 1;
            }, 0)
        );
      }, 0);

      height = height + rows * Constants.RECEIPT_ROW_HEIGHT + Constants.RECEIPT_ROW_HEIGHT;
    }

    // Calculate the number of rows that the markets section needs. Each marker category needs two rows (one for the
    // selections and one for the multipliers) except the number category where we need to calculate the rows based on the
    // selections
    const markerRows = Object.values(betslip.wager.markets.categories)
      .filter((category) => !powerspinBetslipUtils.isMarketsCategoryEmpty(category))
      .reduce((acc, category) => {
        return (
          acc +
          (category.type === powerspinConstants.MARKETS_CATEGORY.NUMBER_ON_WHEEL
            ? Math.ceil(
                category.boards[0].panels[0].selection.length / powerspinConstants.MAX_MARKET_NUMBERS_PER_ROW_ON_PRINT
              ) + 1
            : 2)
        );
      }, 0);

    height += markerRows * Constants.RECEIPT_ROW_HEIGHT;

    return height;
  }

  calculateFireblazeTemplateHeight(wager) {
    let height =
      Constants.RECEIPT_VERTICAL_SPACE +
      Constants.BETSLIP_TOTAL_COST_ROW_HEIGHT +
      Constants.PDF417_BARCODE_HEIGHT +
      Constants.RECEIPT_LOGO_HEIGHT +
      Constants.RECEIPT_L10_EXTRA_HEIGHT +
      Constants.COMPANY_INFO_HEIGHT +
      11 * Constants.RECEIPT_ROW_HEIGHT;

    const rows = wager.boards.reduce(
      (acc, board) => {
        return (
          acc +
          board.panels.reduce((prev, panel) => {
            return prev + Math.ceil(panel.selection.length / fireblazeConstants.MAX_NUMBERS_PER_ROW_ON_PRINT) + 1;
          }, 0)
        );
      },

      0
    );

    height += rows * Constants.RECEIPT_ROW_HEIGHT;

    return height;
  }

  calculateEurojackpotTemplateHeight(wager) {
    let height =
      Constants.RECEIPT_VERTICAL_SPACE +
      Constants.BETSLIP_TOTAL_COST_ROW_HEIGHT +
      Constants.PDF417_BARCODE_HEIGHT +
      Constants.RECEIPT_LOGO_HEIGHT +
      Constants.RECEIPT_L10_EXTRA_HEIGHT +
      Constants.COMPANY_INFO_HEIGHT +
      9 * Constants.RECEIPT_ROW_HEIGHT;

    const rows = wager.boards.reduce(
      (acc, board) => {
        return (
          acc +
          board.panels.reduce((prev, panel) => {
            return prev + Math.ceil(panel.selection.length / eurojackpotConstants.MAX_NUMBERS_PER_ROW_ON_PRINT);
          }, 0)
        );
      },

      0
    );

    height += rows * Constants.RECEIPT_ROW_HEIGHT;

    return height;
  }

  /**
   * Generate qrcode from given serialNumber
   *
   * @param text
   * @returns {Promise} Base64 image
   */
  async generateQRCode(text) {
    try {
      return await QRCode.toDataURL(text, Constants.QRCODE_OPTIONS);
    } catch {
      return undefined;
    }
  }

  /**
   * Get the correct datetime value for L5 || L10
   * Seconds input for L5, Milliseconds input for L10
   *
   * @param timestamp
   * @returns {dayjs.Dayjs}
   */
  getDrawDateTime(timestamp) {
    return this.isL10Version ? dayjs(timestamp) : dayjs.unix(timestamp);
  }
}
