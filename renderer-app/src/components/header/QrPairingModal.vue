<template>
  <BaseModal :open="open" :width="600" :padding="48" aria-labelledby="qr-modal-title" @close="handleClose">
    <IconButton
      :icon="faGear"
      size="lg"
      variant="default"
      aria-label="Settings"
      :aria-expanded="showSettings"
      class="atw:absolute atw:left-6 atw:top-6"
      @click="toggleSettings" />
    <IconButton
      :icon="faXmark"
      size="lg"
      variant="default"
      aria-label="Close pairing modal"
      class="atw:absolute atw:right-6 atw:top-6"
      @click="handleIconClose" />
    <div v-if="showSettings" class="atw:text-center">
      <h2 id="qr-modal-title" class="atw:mb-6 atw:text-[32px] atw:font-bold atw:text-[#111111]">
        {{ $t('header.settings') }}
      </h2>
      <div class="atw:space-y-4">
        <button
          type="button"
          class="atw:w-full atw:rounded-xl atw:border-2 atw:border-[#27E2CC] atw:px-8 atw:py-6 atw:text-center atw:text-xl atw:font-semibold atw:text-[#1D4757] atw:transition-all atw:hover:bg-[#1FD4BE]"
          :style="demoButtonStyle"
          @click="handleDemoLogin">
          {{ $t('switchToLogged') }}
        </button>
        <p class="atw:mt-4 atw:text-sm atw:text-[#666666]">
          {{ $t('headerDemo') }}
        </p>
      </div>
    </div>
    <div v-else class="atw:text-center">
      <h2 id="qr-modal-title" class="atw:mb-4 atw:text-[32px] atw:font-bold atw:text-[#111111]">
        {{ $t('pairYourDevice') }}
      </h2>
      <p class="atw:mb-8 atw:text-lg atw:text-[#666666]">{{ $t('scanQRCode') }}</p>
      <div
        class="atw:mx-auto atw:mb-8 atw:flex atw:h-[320px] atw:w-[320px] atw:items-center atw:justify-center atw:rounded-2xl atw:border-4 atw:border-[#E0E0E0] atw:bg-white">
        <img
          v-if="!qrError"
          :src="qrSrc"
          alt="QR code for device pairing - scan with your mobile app"
          class="atw:h-[280px] atw:w-[280px] atw:object-contain"
          @error="handleImageError" />
        <div
          v-else
          class="atw:flex atw:flex-col atw:items-center atw:justify-center atw:text-[#666666]"
          role="alert"
          aria-live="polite">
          <p class="atw:text-base atw:font-medium">{{ $t('qrCodeNotAvailable') }}</p>
          <p class="atw:mt-2 atw:text-sm">{{ $t('pleaseTryAgainLater') }}</p>
        </div>
      </div>
      <div class="atw:rounded-xl atw:border atw:border-[#E0E0E0] atw:bg-[#F5F5F5] atw:px-6 atw:py-4">
        <p class="atw:text-sm atw:text-[#666666]">{{ $t('downloadApp') }}</p>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
import { ref, watch } from 'vue';
import { faGear, faXmark } from '@fortawesome/free-solid-svg-icons';
import BaseModal from '../base/BaseModal.vue';
import IconButton from '../base/IconButton.vue';
import { EXTERNAL_ASSETS } from '../../config/appConfig';
import gaService from '@/services/gaService';
import gtmEvents from '@/constants/gtmEvents';

const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['close', 'login']);

const showSettings = ref(false);
const qrError = ref(false);
const qrSrc = ref(EXTERNAL_ASSETS.qrCodePlaceholder);

const demoButtonStyle = {
  background: `
        linear-gradient(rgba(255, 255, 255, 0) 70.48%, rgb(38, 236, 217) 93.62%, rgba(255, 255, 255, 0) 100%),
        linear-gradient(rgba(0, 107, 255, 0) 0%, rgba(2, 83, 193, 0.01) 100%),
        rgb(39, 226, 204)
      `,
};

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      gaService.sendEvent(gtmEvents.SSBT_DGE_APPLICATION_GIFT_QR_CODE_MODAL_OPENED, {
        modal_type: 'qr_pairing',
        has_qr_error: qrError.value,
      });
    }
  }
);

const closeModal = (options = {}) => {
  const { sendGenericClose = true } = options;
  showSettings.value = false;
  qrError.value = false;
  emit('close', 'dismiss');
  if (sendGenericClose) {
    gaService.sendEvent(gtmEvents.SSBT_DGE_APPLICATION_QR_MODAL_CLOSED, {
      page_name: 'qr_pairing',
      step_name: 'closed',
    });
  }
};

const handleClose = () => {
  closeModal();
};

const handleIconClose = () => {
  if (showSettings.value) {
    gaService.sendEvent(gtmEvents.SSBT_DGE_APPLICATION_LOGGING_MODAL_CLOSED, {
      page_name: 'logging_modal',
      step_name: 'closed',
    });
    closeModal({ sendGenericClose: false });
    return;
  }
  closeModal();
};

const toggleSettings = () => {
  showSettings.value = !showSettings.value;
  qrError.value = false;
};

const handleDemoLogin = () => {
  showSettings.value = false;
  emit('close', 'login');
  emit('login');
  gaService.sendEvent(gtmEvents.SSBT_DGE_APPLICATION_HANDLE_DEMO_LOGIN, {
    modal_type: 'login',
  });
};

const handleImageError = () => {
  qrError.value = true;
};
</script>
