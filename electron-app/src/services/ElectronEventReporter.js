import { ElectronEvents } from '@/constants/ElectronEvents';
import { EventTypes } from '@/constants/EventTypes';
import { logger as mainLogger } from '@/util/Logger';
import { hasIn } from 'lodash';

const logger = process.env.FORGE_NODE_ENV === 'development' ? console : mainLogger;

let reloadHistory = {
  lastEvent: '',
  counter: 0,
  started: null,
};

/**
 * @class ElectronEventReporter
 * @description Electron event reporter
 */
export class ElectronEventReporter {
  /**
   * @constructor
   * @param {Object} [vueConfig={}] - The vue config object
   */
  constructor(vueConfig = {}) {
    this.liveDrawUrls = [];
    if (hasIn(vueConfig, 'POWERSPIN.LIVE_DRAW.API.powerspin')) {
      this.liveDrawUrls.push(vueConfig.POWERSPIN.LIVE_DRAW.API.powerspin);
    }
    if (hasIn(vueConfig, 'POWERSPIN.LIVE_DRAW.API.multispin')) {
      this.liveDrawUrls.push(vueConfig.POWERSPIN.LIVE_DRAW.API.multispin);
    }
    if (hasIn(vueConfig, 'KINO.LIVE_DRAW.OLISOFT_API')) {
      this.liveDrawUrls.push(vueConfig.KINO.LIVE_DRAW.OLISOFT_API);
    }
  }

  /**
   * Initializes the electron event reporter
   * @param {BrowserWindow} win
   * @param {string} terminalId
   */
  initializeReporter(win, terminalId) {
    win.webContents.on(ElectronEvents.LOADING_FINISHED.EVENT, async () => {
      this.logInfoEvent(ElectronEvents.LOADING_FINISHED.MSG, terminalId);
      win.webContents.setZoomFactor(1);
      try {
        await win.webContents.setVisualZoomLevelLimits(1, 1);
      } catch (error) {
        logger.error(error);
      }
    });

    win.on(ElectronEvents.UNRESPONSIVE.EVENT, () => {
      this.logErrorEvent(ElectronEvents.UNRESPONSIVE.MSG, terminalId);
      this.reload(win, ElectronEvents.UNRESPONSIVE.EVENT);
    });

    win.webContents.on(ElectronEvents.UNCAUGHT_EXCEPTION.EVENT, () => {
      this.logErrorEvent(ElectronEvents.UNCAUGHT_EXCEPTION.MSG, terminalId);
    });

    win.webContents.on(ElectronEvents.CRASHED.EVENT, () => {
      this.logErrorEvent(ElectronEvents.CRASHED.MSG, terminalId);
      this.reload(win, ElectronEvents.CRASHED.EVENT);
    });

    win.webContents.on(ElectronEvents.LOADING_FAILED.EVENT, (event, errorCode, errorDescription, validatedURL) => {
      this.logInfoEvent(
        `:::${ElectronEvents.LOADING_FAILED.EVENT}::: ERROR_CODE: ${errorCode} --ERROR_DESC: ${errorDescription} --validatedURL: ${validatedURL}`,
        terminalId,
      );
      this.logErrorEvent(ElectronEvents.LOADING_FAILED.MSG, terminalId);
      if (this._isUrlLiveDraw(validatedURL)) {
        win.webContents.send(EventTypes.LIVE_DRAW_IFRAME_FAILED, null);
      } else {
        this.reload(win, ElectronEvents.LOADING_FAILED.EVENT);
      }
    });

    win.webContents.on(ElectronEvents.PLUGIN_CRASHED.EVENT, () => {
      this.logErrorEvent(ElectronEvents.PLUGIN_CRASHED.MSG, terminalId);
    });

    win.webContents.on(ElectronEvents.DESTROYED.EVENT, () => {
      this.logErrorEvent(ElectronEvents.DESTROYED.MSG, terminalId);
    });
  }

  _isUrlLiveDraw(url) {
    return this.liveDrawUrls.includes(url);
  }

  logErrorEvent(msg, terminalId) {
    logger.error(
      msg +
        ' --Memory:' +
        JSON.stringify(process.getProcessMemoryInfo()) +
        '--CPUUsage:' +
        JSON.stringify(process.getCPUUsage()),
      terminalId,
    );
  }

  logInfoEvent(msg, terminalId) {
    logger.info(msg, terminalId);
  }

  reload(win, event) {
    if (reloadHistory.lastEvent !== event || new Date().getTime() - reloadHistory.started.getTime() > 86400000) {
      reloadHistory.lastEvent = event;
      reloadHistory.counter = 1;
      reloadHistory.started = new Date();
      return win.reload();
    } else if (reloadHistory.lastEvent === event && reloadHistory.counter === 3) {
      reloadHistory.lastEvent = '';
      reloadHistory.counter = 0;
      reloadHistory.started = null;
      return win.close();
    }
    reloadHistory.counter++;
    return win.reload();
  }
}
