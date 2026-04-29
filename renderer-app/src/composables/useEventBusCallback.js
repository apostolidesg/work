import { computed, ref } from 'vue';
import HALApplicationTypes from '@/constants/HALApplicationTypes';
import EventTypes from '@/util/handler/EventTypes';
import EventSenderService from '@/util/handler/EventSenderService';
import { useSession } from '@/composables/useSession';
import { useAuth } from './useAuth';
import EventBusTypes from '@/constants/EventBusTypes';
import emitter from '@/util/eventBus';
import { useRequestCallback } from '@/composables/useRequestCallback';
import { useBalance } from '@/composables/useBalance';
import { to } from '@/util/configLoader';
import Constants from '@/util/Constants';
import PrintTemplate from '@/model/PrintTemplate';
import { useConfiguration } from '@/composables/useConfiguration';
import { useI18nPlugin } from '@unify/vuex-i18n';
import { useModalService } from '@/composables/useModalService';
import { infoModalMessages } from '@/util/modalMessages';

const printTemplate = ref(new PrintTemplate());
const barcodeReaderStatusOk = ref(true);

export function useEventBusCallback() {
  const { handleLogoutResponse } = useRequestCallback();
  const { isZeroBalance, accessToken } = useSession();
  const { logOut } = useAuth();
  const { cashOut } = useBalance();
  const { appConfig } = useConfiguration();
  const { locale } = useI18nPlugin();
  const { info } = useModalService();

  const canTriggerLogOut = computed(() => {
    return !isZeroBalance.value || !!accessToken.value;
  });

  const triggerLogOut = ({ switchApp = false, applicationType = HALApplicationTypes.SPORTS } = {}) => {
    accessToken.value
      ? logOut(accessToken.value, switchApp, applicationType)
      : handleLogoutResponse({
          response: null,
          additionalArgs: [switchApp, applicationType],
        });
  };

  const switchApplication = (data) => {
    // this.clearEurojackpotTimer();
    canTriggerLogOut.value
      ? emitter.emit(EventBusTypes.TRIGGER_LOGOUT, { switchApp: true, applicationType: data })
      : EventSenderService.sendAsyncRequest(EventTypes.SWITCH_APPLICATION_ACK, data);
  };

  const doCashout = async (switchApp) => {
    try {
      const [err, isHalConnected] = await to(EventSenderService.sendSyncRequest(EventTypes.HAL_INITIALIZED_EVENT_TYPE));
      if (!err && !isHalConnected) {
        info(infoModalMessages.technicalProblemWarning);
        const [, bcrStatus] = await to(EventSenderService.sendSyncRequest(EventTypes.BCR_STATUS_EVENT_TYPE));
        emitter.emit(EventBusTypes.BARCODE_STATUS_CHANGE, bcrStatus);
      }

      const [err2, isPrinterStatusValid] = await to(
        EventSenderService.sendSyncRequest(EventTypes.PRINTER_STATUS_EVENT_TYPE)
      );
      if (!err2 && !isPrinterStatusValid) {
        info(infoModalMessages.printerErrorWarning);
      }
      cashOut(switchApp);
    } catch (error) {
      console.error('CASH_OUT_ERROR', error);
    }
  };

  const sendToPrinter = ({ printType, data }) => {
    data.companyInfo = appConfig.value?.COMPANY_INFO;
    printTemplate.value.prepareTemplate(printType, data, locale()).then((result) => {
      const base64 = result.canvas.toDataURL();
      EventSenderService.sendAsyncRequest(EventTypes.PRINT_EVENT_TYPE, base64);
      const outcomeType = data?.promotionOutcomes?.[0]?.outcomeType;
      if (outcomeType === Constants.PROMOTIONS_INSTANT_WIN_OUTCOME) {
        printTemplate.value
          .prepareTemplate(Constants.PRINT_TYPE.INSTANT_WIN_VOUCHER, data, locale())
          .then((secondReceipt) => {
            const base64 = secondReceipt.canvas.toDataURL();
            EventSenderService.sendAsyncRequest(EventTypes.PRINT_EVENT_TYPE, base64);
          });
      }
    });
  };

  const barcodeStatusChanged = (status) => {
    barcodeReaderStatusOk.value = status === 0;
  };

  return { triggerLogOut, switchApplication, doCashout, sendToPrinter, barcodeReaderStatusOk, barcodeStatusChanged };
}
