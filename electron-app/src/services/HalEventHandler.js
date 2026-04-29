import { EventTypes } from '@/constants/EventTypes';
import { HALToAppEventNames } from '@/constants/HALToAppEventNames';
import { PrinterStatusTypes } from '@/constants/PrinterStatusTypes';
import { processAndValidateBcrData } from '@/util/BarcodeParser';

/**
 * @class HalEventHandler
 * @description Handles HAL events
 */
export class HalEventHandler {
  /**
   * @constructor
   * @param {Object} mainWindow - The main window object.
   * @param {Object} eventSenderService - The event sender service.
   * @param {Object} [logger=console] - The logger object.
   * @param {boolean} [isAppFirstInitialized=false] - A flag indicating if the app is first initialized.
   */
  constructor(mainWindow, eventSenderService, logger = console, isAppFirstInitialized = false) {
    this.mainWindow = mainWindow;
    this.eventSenderService = eventSenderService;
    this.logger = logger;
    this.isAppFirstInitialized = isAppFirstInitialized;
  }

  /**
   * Handle HAL events
   * @param {string} eventName - The event name.
   * @param {Object} message - The event message.
   */
  handleEvent(eventName, message) {
    this.logger.info(`Received HAL Event: ${eventName}: ${JSON.stringify(message)}`);

    try {
      switch (eventName) {
        case HALToAppEventNames.ENTER_FOREGROUND_IF_POSSIBLE:
          this.handleEnterForegroundIfPossible();
          break;
        case HALToAppEventNames.ENTER_FOREGROUND:
          this.handleEnterForeground();
          break;
        case HALToAppEventNames.ENTER_BACKGROUND:
          this.handleEnterBackground();
          break;
        case HALToAppEventNames.PRINTER_STATUS:
          this.handlePrinterStatus(message);
          break;
        case HALToAppEventNames.BCR_STATUS:
          this.handleBarcodeReaderStatus(message);
          break;
        case HALToAppEventNames.BCR_DATA:
          this.handleBarcodeReaderData(message);
          break;
        default:
          this.logger.info(`Unhandled HAL event: ${eventName}`);
      }
    } catch (error) {
      this.logger.error(`Error handling HAL event ${eventName}:`, error);
    }
  }

  /**
   * Require a service to be initialized
   * @param {Object} service - The service to require.
   * @param {string} serviceName - The name of the service.
   * @param {Function} action - The action to perform if the service is initialized.
   * @throws If the service is not initialized.
   */
  async requireService(service, serviceName, action) {
    if (!service) {
      throw new Error(`${serviceName} is not initialized`);
    }
    return await action();
  }

  /**
   * Handle enter foreground if possible event
   */
  handleEnterForegroundIfPossible() {
    this.eventSenderService.sendAsyncRequest(this.mainWindow, EventTypes.SWITCH_APPLICATION);
  }

  /**
   * Handle enter foreground event
   */
  handleEnterForeground() {
    this.mainWindow.show();
  }

  /**
   * Handle enter background event
   */
  handleEnterBackground() {
    if (this.isAppFirstInitialized) {
      this.isAppFirstInitialized = false;
      return;
    }
    this.mainWindow.hide();
  }

  /**
   * Check if the printer status is valid
   * @param {number} status - The printer status
   * @returns {boolean} True if the printer status is valid, false otherwise
   */
  isPrinterStatusValid(status) {
    if (status === undefined || status === null) return false;
    return status === PrinterStatusTypes.ACTIVE || status === PrinterStatusTypes.PAPER_IS_NEAR_END;
  }

  /**
   * Handle printer status event
   * @param {Object} message - The printer status message
   * @param {number} message.status - The printer status
   */
  handlePrinterStatus(message) {
    const { status } = message;
    const isPrinterAvailable = this.isPrinterStatusValid(status);
    this.eventSenderService.sendAsyncRequest(this.mainWindow, EventTypes.PRINTER_STATUS_EVENT_TYPE, isPrinterAvailable);
  }

  /**
   * Handle barcode reader status event
   * @param {Object} message - The barcode reader status message
   * @param {number} message.status - The barcode reader status
   */
  handleBarcodeReaderStatus(message) {
    const { status } = message;
    this.eventSenderService.sendAsyncRequest(this.mainWindow, EventTypes.BARCODE_READER_STATUS_CHANGE, status);
  }

  /**
   * Handle barcode reader data event
   * @param {Object} message - The barcode reader data message
   * @param {Object} message.data - The barcode reader data
   */
  handleBarcodeReaderData(message) {
    const { data } = message;
    this.logger.info(`Received BCR Data: ${JSON.stringify(data)}`);
    const processedData = processAndValidateBcrData(data);
    this.logger.info(`Processed BCR Data: ${JSON.stringify(processedData)}`);
    this.eventSenderService.sendAsyncRequest(this.mainWindow, processedData, data);
  }
}
