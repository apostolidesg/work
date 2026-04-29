import { SsbtApi } from '@/apis/SsbtApi';
import { configEnv } from '@/config/env';
import { ElectronEvents, WebContentsEvents } from '@/constants/ElectronEvents';
import { EventTypes } from '@/constants/EventTypes';
import { HALApplicationTypes } from '@/constants/HALApplicationTypes';
import { HALToAppEventNames } from '@/constants/HALToAppEventNames';
import { RequestTypes } from '@/constants/RequestTypes';
import { WsConnectionEventNames } from '@/constants/WsConnectionEventNames';
import { MockWebSocketConnection } from '@/mocks/WebSocketConnection.mock';
import { BarcodeService } from '@/services/BarcodeService';
import { ElectronEventReporter } from '@/services/ElectronEventReporter';
import EventSenderService from '@/services/EventSenderService';
import { HalEventHandler } from '@/services/HalEventHandler';
import { HalService } from '@/services/HalService';
import { HttpService } from '@/services/HttpService';
import { ISecureGenerator } from '@/services/ISecureGenerator';
import { PrinterService } from '@/services/PrinterService';
import { ServiceStatusChecker } from '@/services/ServiceStatusChecker';
import { WebSocketConnection } from '@/services/WebSocketConnection';
import { WSRequestManager } from '@/services/WSRequestManager';
import loadEnv from '@/util/load-env.js';
import { logger as mainLogger } from '@/util/Logger';
import LoggerFoldersGenerator from '@/util/LoggerFoldersGenerator';
import { loggerFrontend } from '@/util/LoggerFrontend';
import { PropertiesLoader } from '@/util/PropertiesLoader';
import 'dotenv/config';
import { app, BrowserWindow, globalShortcut, ipcMain } from 'electron';
import started from 'electron-squirrel-startup';
import { join } from 'path';

const processEnv = loadEnv() || process.env;

const isDev = processEnv.FORGE_NODE_ENV === 'development';
const logger = isDev ? console : mainLogger;
const frontendLogger = isDev ? console : loggerFrontend;

class ElectronApp {
  constructor() {
    this.mainWindow = null;
    this.wsConnection = null;
    this.wsRequestManager = null;
    this.terminalIdRequestData = null;
    this.terminalId = null;
    this.retailerId = null;
    this.config = configEnv;
    this.properties = new PropertiesLoader();
    this.halService = null;
    this.printerService = null;
    this.barcodeService = null;
    this.serviceStatusChecker = null;
    this.serviceStatusCheckerTask = null;
    this.electronEventReporter = null;
    this.ssbtApi = null;
    this.eventHandlers = [];
    this.httpRequestQueues = {};
    this.seqId = 0;
    this.allowRequest = true;
    this.iSecureGenerator = null;
    this.httpService = new HttpService();
    this.eventSenderService = new EventSenderService();
    this.halEventHandler = null;
    this.errorWindow = null;

    this.setupConfig();
  }

  /**
   * Quit the Electron application
   * @param {Object} options - Options for quitting the app
   * @param {string} [options.message] - Quit message
   */
  quitApp({ message = 'SSBTs Electron app quit' } = {}) {
    logger.info(message);
    app.quit();
  }

  /**
   * Show error window
   * @param {Object} options - Options for showing the error window
   * @param {string} [options.message] - Error message
   * @param {number} [options.code] - Error code
   */
  showErrorWindow({ message = 'SSBTs Electron app error', code = 99999 } = {}) {
    if (!this.errorWindow) {
      this.errorWindow = new BrowserWindow({
        width: 400,
        height: 300,
        parent: this.mainWindow,
        modal: true,
        autoHideMenuBar: true,
        webPreferences: {
          preload: join(__dirname, 'preload.js'),
        },
      });

      this.errorWindow.webContents.on(ElectronEvents.LOADING_FINISHED.EVENT, () => {
        this.eventSenderService.sendAsyncRequest(this.errorWindow, WsConnectionEventNames.WS_ERROR, { message, code });
      });

      this.errorWindow.on(ElectronEvents.CLOSED.EVENT, () => {
        this.errorWindow = null;
      });

      logger.info(`Vite error page path: ${processEnv.VITE_ERROR_PAGE_DIR_NAME}`);
      this.errorWindow.loadFile(join(__dirname, `../renderer/${processEnv.VITE_ERROR_PAGE_DIR_NAME}/error.html`));
    }
  }

  /**
   * Set up configuration based on external properties files
   */
  setupConfig() {
    LoggerFoldersGenerator.triggerGenerator();

    this.properties.loadProperties();
    if (this.properties.hasElectronConfiguration()) {
      this.config = this.properties.mergeConfigurations(this.config, this.properties.electronConfiguration);
    }

    logger.info(`SSBTs Electron up starting with config: ${JSON.stringify(this.config)}`);
  }

  /**
   * Create the main application window
   * @param {Object} options - Options for creating the window
   * @param {boolean} [options.fromRecreate=false] - Whether the window is being recreated
   * @returns {Promise<void>}
   */
  createWindow({ fromRecreate = false } = {}) {
    this.mainWindow = new BrowserWindow({
      width: 3849,
      height: 1080,
      movable: !!isDev,
      resizable: !!isDev,
      frame: true,
      skipTaskbar: false,
      autoHideMenuBar: true,
      fullscreen: !isDev,
      alwaysOnTop: this.config.appAlwaysOnTop,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        webSecurity: false,
        allowRunningInsecureContent: false,
        backgroundThrottling: false,
        preload: join(__dirname, 'preload.js'),
      },
    });

    this.mainWindow.on(ElectronEvents.SHOW.EVENT, () => {
      logger.info('Window shown');
      this.eventSenderService.sendAsyncRequest(this.mainWindow, EventTypes.WINDOW_SHOWN);
    });

    if (!fromRecreate) {
      this.setupIpcHandlers();
      this.setupEventHandlers();
    }
  }

  /**
   * Load the renderer process
   */
  loadRenderer() {
    if (isDev) {
      logger.info(`Vite dev server URL: ${processEnv.VITE_DEV_SERVER_URL}`);
      this.mainWindow.loadURL(processEnv.VITE_DEV_SERVER_URL);

      this.mainWindow.webContents.openDevTools();
      this.mainWindow.webContents.on(WebContentsEvents.BEFORE_INPUT.EVENT, (event, input) => {
        if (input.key === 'F12') {
          this.mainWindow.webContents.toggleDevTools();
          event.preventDefault();
        }

        if (input.key === 'F11') {
          const isFullscreen = this.mainWindow.isFullScreen();
          this.mainWindow.setFullScreen(!isFullscreen);
          event.preventDefault();
        }
      });
    } else {
      logger.info(`Vite production build path: ${processEnv.VITE_BUILD_DIR_NAME}`);
      this.mainWindow.loadFile(join(__dirname, `../renderer/${processEnv.VITE_BUILD_DIR_NAME}/index.html`));
      globalShortcut.register('CommandOrControl+Q', () =>
        this.quitApp({ message: 'SSBTs Electron app quit by shortcut' }),
      );
      globalShortcut.register('CommandOrControl+Alt+Shift+K+I', () => this.mainWindow.webContents.openDevTools());
    }
  }

  /**
   * Initialize application services (WebSocket and other services)
   * @returns {Promise<void>}
   */
  async initializeAppServices() {
    await this.initWebSocket();
    await this.initServices();
  }

  /**
   * Initialize WebSocket connection and event handlers
   */
  async initWebSocket() {
    if (processEnv.MOCK_WS_CONNECTION === 'true') {
      this.wsConnection = new MockWebSocketConnection();
    } else {
      this.wsConnection = new WebSocketConnection();
    }

    this.wsConnection.on(WsConnectionEventNames.CONNECTED, () => {
      this.eventSenderService.sendAsyncRequest(
        this.mainWindow,
        WsConnectionEventNames.WS_STATUS,
        WsConnectionEventNames.CONNECTED,
      );
    });

    this.wsConnection.on(WsConnectionEventNames.DISCONNECTED, () => {
      this.eventSenderService.sendAsyncRequest(
        this.mainWindow,
        WsConnectionEventNames.WS_STATUS,
        WsConnectionEventNames.DISCONNECTED,
      );
    });

    this.wsConnection.on(WsConnectionEventNames.RECONNECTING, details => {
      this.eventSenderService.sendAsyncRequest(
        this.mainWindow,
        WsConnectionEventNames.WS_STATUS,
        WsConnectionEventNames.RECONNECTING,
        details,
      );
    });

    this.wsConnection.on(WsConnectionEventNames.RECONNECT_FAILED, details => {
      if (!this.errorWindow) {
        this.showErrorWindow({ message: details.message, code: details.code });
      }
    });

    this.wsConnection.on(WsConnectionEventNames.WS_CONNECTION_FAILED, details => {
      if (!this.errorWindow) {
        this.showErrorWindow({ message: details.message, code: details.code });
      }
    });

    this.wsConnection.on(WsConnectionEventNames.WS_ERROR, details => {
      if (!this.errorWindow) {
        this.showErrorWindow({ message: details.message, code: details.code });
      }
    });

    this.wsConnection.on(WsConnectionEventNames.HAL_RESPONSE, message => {
      this.eventSenderService.sendAsyncRequest(this.mainWindow, WsConnectionEventNames.WS_HAL_RESPONSE, message);
    });

    this.halEventHandler = new HalEventHandler(this.mainWindow, this.eventSenderService, logger);
    for (const halEvent of Object.values(HALToAppEventNames)) {
      this.wsConnection.on(halEvent, message => {
        this.halEventHandler.handleEvent(halEvent, message);
      });
    }

    this.wsConnection.reset();
    this.wsConnection.connect(processEnv.HAL_MIDDLEWARE_URL);
    await this.wsConnection.waitForConnection();
    this.wsRequestManager = new WSRequestManager(this.wsConnection);
  }

  /**
   * Find the event handler for a given event type
   * @param {string} eventType - The event type to find the handler for
   * @returns {Object} The event handler object
   */
  findHandler(eventType) {
    const handler = this.eventHandlers.find(h => h.eventType === eventType);
    if (!handler) {
      return;
    }
    return handler;
  }

  /**
   * Set up IPC event listeners for WebSocket interactions
   * @private
   */
  setupIpcEventListeners() {
    const events = [
      EventTypes.PRINT_EVENT_TYPE,
      EventTypes.SWITCH_APPLICATION,
      EventTypes.SWITCH_APPLICATION_ACK,
      EventTypes.SWITCH_APPLICATION_NACK,
      EventTypes.SEND_REQUEST,
      EventTypes.OLISOFT_IFRAME_EVENT,
      EventTypes.LOG_FROM_RENDERER,
      EventTypes.RENDERER_READY,
      EventTypes.DISMISS_ERROR,
      EventTypes.RESTART_ELECTRON_APP,
    ];

    events.forEach(eventType => {
      ipcMain.on(eventType, (event, ...args) => {
        logger.info(`IPC ${eventType} event received`);
        const handler = this.findHandler(eventType);
        if (handler) {
          handler.callBack(event, ...args);
        }
      });
    });
  }

  setupIpcResponseHandlers() {
    const events = [
      EventTypes.TERMINAL_NAME_EVENT_TYPE,
      EventTypes.PRINTER_STATUS_EVENT_TYPE,
      EventTypes.BCR_STATUS_EVENT_TYPE,
      EventTypes.HAL_INITIALIZED_EVENT_TYPE,
      EventTypes.APP_VERSION,
      EventTypes.LOAD_CONFIGURATION,
      EventTypes.REQUEST_ISECURE_HASH,
      EventTypes.REQUEST_CRC,
      EventTypes.GET_ENV_SYNC,
    ];

    events.forEach(eventType => {
      ipcMain.handle(eventType, async (event, ...args) => {
        logger.info(`IPC ${eventType} invoked`);
        const handler = this.findHandler(eventType);
        if (handler) {
          return await handler.callBack(event, ...args);
        }
      });
    });
  }

  /**
   * Set up event handlers for WebSocket interactions
   */
  setupEventHandlers() {
    const handlerSetups = {
      configuration: () => this.registerConfigurationHandler(),
      barcode: () => this.registerBarcodeHandlers(),
      printer: () => this.registerPrinterHandlers(),
      switchApplication: () => this.registerApplicationSwitchHandlers(),
      status: () => this.registerStatusHandlers(),
      version: () => this.registerVersionHandler(),
      security: () => this.registerSecurityHandlers(),
      http: () => this.registerHttpRequestHandler(),
      logger: () => this.registerLoggerHandler(),
      rendererReady: () => this.registerRendererReadyHandler(),
      getEnvSync: () => this.registerGetEnvSyncHandler(),
      systemErrors: () => this.registerSystemErrorHandlers(),
      restartElectronApp: () => this.registerRestartElectronAppHandler(),
    };

    Object.entries(handlerSetups).forEach(([name, setup]) => {
      try {
        setup();
      } catch (error) {
        logger.info(`Error setting up ${name} handlers: ${error?.message}`);
      }
    });
  }

  /**
   * Set up WebSocket handlers for WebSocket interactions
   */
  setupWebSocketHandlers() {
    const wsHandlers = {
      [WsConnectionEventNames.SEND_WS_MESSAGE]: (request, payload = {}) => {
        this.wsConnection.send(request, payload);
      },
      [WsConnectionEventNames.DISCONNECT_WS]: () => {
        this.wsConnection.disconnect();
      },
      [WsConnectionEventNames.WS_REQUEST]: async (request, payload = {}) => {
        return this.wsRequestManager.sendRequest(request, payload);
      },
    };

    Object.entries(wsHandlers).forEach(([event, handler]) => {
      if (event === WsConnectionEventNames.WS_REQUEST) {
        ipcMain.handle(event, (_event, ...args) => handler(...args));
      } else {
        ipcMain.on(event, (_event, ...args) => handler(...args));
      }
    });
  }

  /**
   * Set up IPC handlers for WebSocket interactions
   */
  setupIpcHandlers() {
    this.setupWebSocketHandlers();
    this.setupIpcEventListeners();
    this.setupIpcResponseHandlers();
  }

  /**
   * Add an event handler
   * @param {string} eventType - The event type
   * @param {function(any): void} callback - The callback to execute when the event occurs
   */
  addHandler(eventType, callback) {
    const handler = EventTypes.prepareEventHandlerObject(eventType, callback);
    this.eventHandlers.push(handler);
  }

  /**
   * Register the connect WS handler
   */
  registerRestartElectronAppHandler() {
    this.addHandler(EventTypes.RESTART_ELECTRON_APP, () => {
      app.relaunch();
      app.exit();
    });
  }

  /**
   * Register the system error handlers
   */
  registerSystemErrorHandlers() {
    this.addHandler(EventTypes.DISMISS_ERROR, () => {
      if (this.errorWindow) {
        this.errorWindow.close();
        this.errorWindow = null;
      }
    });
  }

  /**
   * Register the getEnvSync event handler
   */
  registerGetEnvSyncHandler() {
    this.addHandler(EventTypes.GET_ENV_SYNC, () => {
      return {
        IS_DEV: isDev,
        IPC_RENDERER_ENABLED: processEnv.IPC_RENDERER_ENABLED === 'true',
      };
    });
  }

  registerRendererReadyHandler() {
    this.addHandler(EventTypes.RENDERER_READY, () => {
      logger.info('Renderer ready - sending WINDOW_SHOWN');
      this.eventSenderService.sendAsyncRequest(this.mainWindow, EventTypes.WINDOW_SHOWN);
    });
  }

  registerLoggerHandler() {
    this.addHandler(EventTypes.LOG_FROM_RENDERER, (_event, { title, body }) => {
      frontendLogger.info(`${title}: ${body}`);
    });

    this.addHandler(EventTypes.OLISOFT_IFRAME_EVENT, (_event, { title, body }) => {
      frontendLogger.info(`${title}: ${body}`);
    });
  }

  /**
   * Register the configuration event handler
   */
  registerConfigurationHandler() {
    this.addHandler(EventTypes.LOAD_CONFIGURATION, () => {
      const vueProperties = {};
      if (this.properties.hasVueConfiguration()) {
        vueProperties.vue = this.properties.vueConfiguration;
      }
      if (this.config.env === 'test' && this.properties.hasTestConfiguration()) {
        vueProperties.test = this.properties.testConfiguration;
      }
      return vueProperties;
    });
  }

  /**
   * Register the barcode event handlers
   */
  registerBarcodeHandlers() {
    this.addHandler(EventTypes.BCR_STATUS_EVENT_TYPE, async () => {
      try {
        const bcrStatus = await this.barcodeService.getBarcodeStatus();
        return bcrStatus;
      } catch (error) {
        logger.error(`Error checking BCR status: ${error?.message}`);
        return null;
      }
    });
  }

  /**
   * Register the printer event handlers
   */
  registerPrinterHandlers() {
    this.addHandler(EventTypes.PRINT_EVENT_TYPE, async (_event, data) => {
      try {
        const printerStatus = await this.printerService.getPrinterStatus();
        const isPrinterReady = this.halEventHandler.isPrinterStatusValid(printerStatus);
        if (isPrinterReady) {
          await this.printerService.printBitmapFromBase64(data);
        } else {
          this.eventSenderService.sendAsyncRequest(this.mainWindow, EventTypes.PRINTER_STATUS_EVENT_TYPE, false);
        }
      } catch (error) {
        logger.error(`Error in print event handler: ${error?.message}`);
        this.eventSenderService.sendAsyncRequest(this.mainWindow, EventTypes.PRINTER_STATUS_EVENT_TYPE, false);
      }
    });

    this.addHandler(EventTypes.PRINTER_STATUS_EVENT_TYPE, async () => {
      try {
        const printerStatus = await this.printerService.getPrinterStatus();
        return this.halEventHandler.isPrinterStatusValid(printerStatus);
      } catch (error) {
        logger.error(`Error checking printer status: ${error?.message}`);
        return false;
      }
    });
  }

  /**
   * Register the terminal event handler
   * @param {string} terminalId - The terminal ID
   */
  registerTerminalHandler(terminalId) {
    this.addHandler(EventTypes.TERMINAL_NAME_EVENT_TYPE, () => {
      return terminalId;
    });
  }

  /**
   * Register the application switch event handlers
   */
  registerApplicationSwitchHandlers() {
    this.addHandler(EventTypes.SWITCH_APPLICATION, async () => {
      try {
        logger.info(`Electron app changing app to: ${HALApplicationTypes.SPORTS}`);
        await this.halService.switchApplication(HALApplicationTypes.SPORTS);
      } catch (error) {
        logger.error(`Error switching applications: ${error?.message}`);
      }
    });

    this.addHandler(EventTypes.SWITCH_APPLICATION_ACK, async (_event, type = HALApplicationTypes.SPORTS) => {
      try {
        logger.info(`Switching application: ${type}`);
        await this.halService.switchApplication(type);
      } catch (error) {
        logger.error(`Error acknowledging application switch: ${error?.message}`);
      }
    });

    this.addHandler(EventTypes.SWITCH_APPLICATION_NACK, async () => {
      try {
        await this.halService.switchApplication(HALApplicationTypes.SPORTS);
      } catch (error) {
        logger.error(`Error rejecting application switch : ${error?.message}`);
      }
    });
  }

  /**
   * Register the HAL status event handlers
   */
  registerStatusHandlers() {
    this.addHandler(EventTypes.HAL_INITIALIZED_EVENT_TYPE, async () => {
      try {
        const halStatus = await this.halService.isHALConnected();
        return halStatus;
      } catch (error) {
        logger.error(`Error checking HAL status: ${error?.message}`);
        return false;
      }
    });
  }

  /**
   * Register the version event handler
   */
  registerVersionHandler() {
    this.addHandler(EventTypes.APP_VERSION, () => {
      return this.config.electronAppVersion;
    });
  }

  /**
   * Register the security event handlers
   */
  registerSecurityHandlers() {
    this.addHandler(EventTypes.REQUEST_ISECURE_HASH, async (_event, data) => {
      return await this.iSecureGenerator.generateISecureData(data);
    });

    this.addHandler(EventTypes.REQUEST_CRC, async (_event, data) => {
      return await this.iSecureGenerator.calculateCRC(data);
    });
  }

  /**
   * Register the HTTP request event handler
   */
  registerHttpRequestHandler() {
    this.addHandler(EventTypes.SEND_REQUEST, (event, requestType, requestParams, ...additionalArgs) => {
      logger.info(
        `Sending HTTP request: ${requestType} ::: ${JSON.stringify(requestParams)} ::: ` +
          `${JSON.stringify(additionalArgs)}`,
      );
      this.allowRequest = true;
      if (!Object.hasOwn(this.httpRequestQueues, requestType)) {
        this.httpRequestQueues[requestType] = 0;
      }
      this.seqId = this.updateRequestQueue(requestType);
      if (this.allowRequest) {
        this.processHttpRequest(requestType, requestParams, this.seqId, ...additionalArgs);
      }
    });
  }

  /**
   * Update the request queue
   * @param {string} requestType - The request type
   * @returns {number} The updated request queue
   */
  updateRequestQueue(requestType) {
    let seqId;
    switch (requestType) {
      case RequestTypes.PLACE_BET:
      case RequestTypes.DEPOSIT_VOUCHER:
      case RequestTypes.CASH_OUT: {
        if (this.httpRequestQueues[requestType] > 0) {
          this.allowRequest = false;
        } else {
          seqId = this.httpRequestQueues[requestType] = 1;
        }
        break;
      }
      default:
        seqId = ++this.httpRequestQueues[requestType];
    }

    return seqId;
  }

  /**
   * Process the HTTP request
   * @param {string} requestType - The request type
   * @param {Object} requestParams - The request parameters
   * @param {number} seqId - The sequence ID
   * @param {any[]} additionalArgs - Additional arguments
   */
  async processHttpRequest(requestType, requestParams, seqId, ...additionalArgs) {
    try {
      const response = await this.httpService.sendRequest(requestParams);
      if (seqId < this.httpRequestQueues[requestType]) {
        return;
      }
      response.success = true;
      this.eventSenderService.sendAsyncRequest(
        this.mainWindow,
        EventTypes.SEND_REQUEST,
        requestType,
        response,
        ...additionalArgs,
      );
    } catch (error) {
      this.handleRequestError(error, seqId, requestType, ...additionalArgs);
    } finally {
      this.resetQueueIfNeeded(requestType);
    }
  }

  /**
   * Handle the HTTP request error
   * @param {Object} error - The error object
   * @param {number} seqId - The sequence ID
   * @param {string} requestType - The request type
   * @param {any[]} additionalArgs - Additional arguments
   */
  handleRequestError(error, seqId, requestType, ...additionalArgs) {
    logger.error(
      `Handling HTTP error: ${requestType} ::: ` +
        `${JSON.stringify(error?.message)} ::: ` +
        `${JSON.stringify(additionalArgs)}`,
    );
    if (seqId < this.httpRequestQueues[requestType]) {
      return;
    }

    let errorResponse = {
      ...(error.response || {}),
      success: false,
    };

    this.eventSenderService.sendAsyncRequest(
      this.mainWindow,
      EventTypes.SEND_REQUEST,
      requestType,
      errorResponse,
      ...additionalArgs,
    );
  }

  /**
   * Reset the request queue if needed
   * @param {string} requestType - The request type
   */
  resetQueueIfNeeded(requestType) {
    const resetTypes = [RequestTypes.PLACE_BET, RequestTypes.DEPOSIT_VOUCHER, RequestTypes.CASH_OUT];
    if (resetTypes.includes(requestType)) {
      this.httpRequestQueues[requestType] = 0;
    }
  }

  /**
   * Initialize services
   */
  async initServices() {
    this.halEventHandler.isAppFirstInitialized = true;
    this.halService = new HalService(this.wsRequestManager);
    await this.halService.initializeService();

    this.printerService = new PrinterService(this.wsRequestManager);
    await this.printerService.initializeService();

    this.barcodeService = new BarcodeService(this.wsRequestManager);
    await this.barcodeService.initializeService();

    this.iSecureGenerator = new ISecureGenerator(this.wsRequestManager);

    if (this.config.env !== 'prod') {
      this.terminalId = this.config.test.terminalId;
    } else {
      const { computerName } = await this.halService.getTerminalId();
      this.terminalId = computerName;
    }
    this.retailerId = this.terminalId.slice(0, 6);
    this.registerTerminalHandler(this.terminalId);

    this.serviceStatusChecker = new ServiceStatusChecker(this.config, this.terminalId);
    this.serviceStatusCheckerTask = setInterval(() => {
      this.serviceStatusChecker
        .getServiceStatus()
        .then(serviceStatus => {
          logger.info('Received service status from server.');
          this.eventSenderService.sendAsyncRequest(this.mainWindow, EventTypes.SERVICE_STATUS_CHECK, serviceStatus);
        })
        .catch(error => {
          logger.error(`Failed to receive status from server: ${error?.message}`);
          this.eventSenderService.sendAsyncRequest(this.mainWindow, EventTypes.SERVICE_STATUS_CHECK, null);
        });
    }, this.config.systemCheckInterval);

    this.electronEventReporter = new ElectronEventReporter(this.properties.vueConfiguration);
    this.electronEventReporter.initializeReporter(this.mainWindow, this.terminalId);

    this.ssbtApi = new SsbtApi(this.config);
    try {
      const token = await this.ssbtApi.getToken();
      const registerResponse = await this.ssbtApi.register(this.terminalId, token);
      if (!registerResponse) {
        this.quitApp({ message: 'Failed to register terminal' });
      }
    } catch (error) {
      logger.error(`Failed to register terminal: ${error?.message}`);
    }
  }

  /**
   * Initialize the Electron application
   */
  initApp() {
    // Handle creating/removing shortcuts on Windows when installing/uninstalling.
    if (started) {
      this.quitApp({ message: 'SSBTs Electron app already started' });
    }

    app.whenReady().then(() => {
      this.createWindow({ fromRecreate: false });
      this.initializeAppServices()
        .then(() => {
          this.loadRenderer();
        })
        .catch(error => {
          logger.error(`Failed to initialize app services: ${error?.message}`);
        });

      // On OS X it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      // `fromRecreate` flag is used in order to avoid setup IPC & Event handlers again.
      app.on(ElectronEvents.ACTIVATE.EVENT, () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          this.createWindow({ fromRecreate: true });
          this.loadRenderer();
        }
      });
    });

    app.commandLine.appendSwitch('touch-events', 'enabled');
    app.commandLine.appendSwitch('ignore-certificate-errors');

    app.on(ElectronEvents.GPU_CRASHED.EVENT, () => {
      logger.error(
        ElectronEvents.GPU_CRASHED.MSG +
          ' --Memory:' +
          JSON.stringify(process.getProcessMemoryInfo()) +
          '--CPUUsage:' +
          JSON.stringify(process.getCPUUsage()),
        this.terminalId,
      );
    });

    app.on(ElectronEvents.ALL_WINDOWS_CLOSED.EVENT, () => {
      if (process.platform !== 'darwin') {
        this.quitApp({ message: ElectronEvents.ALL_WINDOWS_CLOSED.MSG });
      }
    });

    app.once(ElectronEvents.BEFORE_QUIT.EVENT, async () => {
      if (this.halService) {
        await this.halService.switchApplication(HALApplicationTypes.SPORTS);
      }
      clearInterval(this.serviceStatusCheckerTask);
      this.wsConnection.disconnect({ manual: true });
      if (this.mainWindow) {
        this.mainWindow.removeAllListeners(ElectronEvents.CLOSED.EVENT);
        this.mainWindow.close();
      }
      if (this.errorWindow) {
        this.errorWindow.removeAllListeners(ElectronEvents.CLOSED.EVENT);
        this.errorWindow.close();
      }
    });
  }
}

// Initialize and start the Electron application
const electronApp = new ElectronApp();
electronApp.initApp();
