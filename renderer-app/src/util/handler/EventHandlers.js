import EventHandlerService from '@/util/handler/EventHandlerService';
import EventTypes from '@/util/handler/EventTypes';
import emitter from '@/util/eventBus';
import { useServiceCheck } from '@/composables/useServiceCheck';
import { useFindWinnings } from '@/composables/useFindWinnings';
import EventBusTypes from '@/constants/EventBusTypes';

export default function initializeElectronEventHandlers() {
  const { changeServiceAvailability } = useServiceCheck();
  const { doFindWinnings } = useFindWinnings();
  const eventHandlers = [];

  eventHandlers.push(
    EventTypes.prepareEventHandlerObject(EventTypes.SERVICE_STATUS_CHECK, (serviceStatus) => {
      changeServiceAvailability(serviceStatus);
    })
  );

  eventHandlers.push(
    EventTypes.prepareEventHandlerObject(EventTypes.FIND_WINNINGS_EVENT_TYPE, (data) => {
      doFindWinnings(data);
    })
  );

  eventHandlers.push(
    EventTypes.prepareEventHandlerObject(EventTypes.SCAN_VOUCHER_EVENT_TYPE, (data) => {
      console.log('Scan Voucher Event Data:', data);
    })
  );

  eventHandlers.push(
    EventTypes.prepareEventHandlerObject(EventTypes.SCAN_PROMOTION_VOUCHER_EVENT_TYPE, (data) => {
      console.log('Scan Promotion Voucher Event Data:', data);
    })
  );

  eventHandlers.push(
    EventTypes.prepareEventHandlerObject(EventTypes.SWITCH_APPLICATION, () => {
      console.log('Switch Application Event Received');
    })
  );

  eventHandlers.push(
    EventTypes.prepareEventHandlerObject(EventTypes.BARCODE_READER_STATUS_CHANGE, (data) => {
      emitter.emit(EventBusTypes.BARCODE_STATUS_CHANGE, data);
    })
  );

  eventHandlers.push(
    EventTypes.prepareEventHandlerObject(EventTypes.PRINTER_STATUS_EVENT_TYPE, (data) => {
      console.log('Printer Status Event Data:', data);
    })
  );

  const pushSportsScanHandler = (type) => {
    eventHandlers.push(
      EventTypes.prepareEventHandlerObject(type, () => {
        console.log(`${type} Event Received`);
      })
    );
  };

  pushSportsScanHandler(EventTypes.SCAN_SPORTS_VOUCHER_EVENT_TYPE);
  pushSportsScanHandler(EventTypes.SCAN_SPORTS_TICKET_EVENT_TYPE);

  eventHandlers.push(
    EventTypes.prepareEventHandlerObject(EventTypes.SCAN_INVALID_BARCODE_EVENT_TYPE, () => {
      console.log('Scan Invalid Barcode Event Received');
    })
  );

  eventHandlers.push(
    EventTypes.prepareEventHandlerObject(EventTypes.SCAN_OPAP_BET_CARD_EVENT_TYPE, () => {
      console.log('Scan OPAP Bet Card Event Received');
    })
  );

  eventHandlers.push(
    EventTypes.prepareEventHandlerObject(EventTypes.SEND_REQUEST, (requestType, response, ...additionalArgs) => {
      emitter.emit(requestType, { response, additionalArgs });
    })
  );

  eventHandlers.push(
    EventTypes.prepareEventHandlerObject(EventTypes.WINDOW_SHOWN, () => {
      console.log('Window Shown Event Received');
    })
  );

  const eventHandlerService = new EventHandlerService();
  eventHandlerService.initializeEventHandlers(eventHandlers);
}
