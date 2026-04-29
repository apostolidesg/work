<script setup>
import { onMounted } from 'vue';
import { infoModalMessages } from '@/util/modalMessages';
import { faBarcodeScan } from '@fortawesome/pro-regular-svg-icons';
import { useModalService } from '@/composables/useModalService';
import EventSenderService from '@/util/handler/EventSenderService';
import EventTypes from '@/util/handler/EventTypes';
import { to } from '@/util/configLoader';
import { logToMainProcess } from '@/util/LoggerService';
import { useEventBusCallback } from '@/composables/useEventBusCallback';

const { barcodeReaderStatusOk, barcodeStatusChanged } = useEventBusCallback();
const { info } = useModalService();

onMounted(async () => {
  const [err, bcrStatus] = await to(EventSenderService.sendSyncRequest(EventTypes.BCR_STATUS_EVENT_TYPE));
  if (!err) {
    barcodeStatusChanged(bcrStatus);
    if (bcrStatus !== 0) openModal();
  } else {
    barcodeStatusChanged(null);
    logToMainProcess('BCR_STATUS_ERROR', err);
  }
});

const openModal = () => {
  info(infoModalMessages.barcodeReaderWarning);
};
</script>

<template>
  <div v-if="!barcodeReaderStatusOk" class="barcode-reader-error" @click="openModal">
    <FontAwesomeIcon :icon="faBarcodeScan" class="barcode-reader-error__icon" />
    <span class="barcode-reader-error__text">{{ $t('bcrError') }}</span>
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.barcode-reader-error {
  @apply atw:flex atw:flex-col atw:items-center atw:text-white;
}

.barcode-reader-error__icon {
  @apply atw:text-4xl;
}

.barcode-reader-error__text {
  @apply atw:max-w-36 atw:text-center;
}
</style>
