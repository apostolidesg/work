<template>
  <BaseModal
    :open="open"
    :width="modalWidth"
    :padding="32"
    :background-opacity="75"
    aria-labelledby="gift-claim-title"
    aria-describedby="gift-claim-desc"
    @close="handleClose">
    <div class="atw:relative atw:overflow-hidden">
      <div class="atw:pointer-events-none atw:absolute atw:inset-0 atw:opacity-60" aria-hidden="true">
        <div
          class="atw:absolute atw:inset-0 atw:bg-[radial-gradient(circle_at_20%_20%,rgba(0,85,255,0.05),transparent_45%)] atw:animate-pulse-slow" />
        <div
          class="atw:absolute atw:inset-0 atw:bg-[radial-gradient(circle_at_80%_80%,rgba(0,171,77,0.05),transparent_45%)] atw:animate-pulse-slower" />
      </div>
      <IconButton
        :icon="faXmark"
        size="lg"
        variant="ghost"
        aria-label="Close gift claim"
        class="atw:absolute atw:right-3 atw:top-3 atw:z-20 atw:border atw:border-gray-200 atw:bg-white/90 atw:shadow-sm atw:hover:bg-white md:atw:right-4 md:atw:top-4"
        @click="handleClose" />
      <div class="atw:relative atw:flex atw:flex-col atw:items-center atw:text-center">
        <Transition name="fade-slide" mode="out-in">
          <component
            :is="currentStepComponent"
            :key="currentStep"
            v-bind="stepProps"
            @next="goToStep(STEPS.FREEBET)"
            @select-market="selectMarket"
            @play="handlePlay"
            @select-payment="selectPayment"
            @submit="handleSubmitPayment"
            @back="goToStep(STEPS.FREEBET)"
            @close="handleClose" />
        </Transition>
      </div>
    </div>
  </BaseModal>
</template>
<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import BaseModal from '../base/BaseModal.vue';
import IconButton from '../base/IconButton.vue';
import GiftClaimStepClaim from './GiftClaimStepClaim.vue';
import GiftClaimStepMarket from './GiftClaimStepMarket.vue';
import GiftClaimStepSuccess from './GiftClaimStepSuccess.vue';
import {
  GIFT_ASSETS,
  GIFT_CLAIM_STEPS as STEPS,
  MARKET_OPTIONS,
  PAYMENT_METHODS,
  PROCESSING_DELAY_MS,
} from '../../config/giftClaimConfig';

import gaService from '@/services/gaService';
import gtmEvents from '@/constants/gtmEvents';

const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
  betAmount: {
    type: Number,
    default: 3,
  },
});
const emit = defineEmits(['close', 'play']);
const currentStep = ref(STEPS.CLAIM);
const selectedMarket = ref(null);
const selectedPayment = ref(null);
const processingTimer = ref(null);
const betAmount = computed(() => props.betAmount ?? 3);
const modalWidth = computed(() => (currentStep.value === STEPS.PAYMENT ? 820 : 640));
const stepComponents = {
  [STEPS.CLAIM]: GiftClaimStepClaim,
  [STEPS.FREEBET]: GiftClaimStepMarket,
};
const currentStepComponent = computed(() => stepComponents[currentStep.value] || GiftClaimStepSuccess);
const stepProps = computed(() => {
  const baseProps = { betAmount: betAmount.value };
  switch (currentStep.value) {
    case STEPS.FREEBET:
      return {
        ...baseProps,
        powerSpinSrc: GIFT_ASSETS.powerspinLogo,
        symbolSrc: GIFT_ASSETS.symbol,
        marketOptions: MARKET_OPTIONS,
        selectedMarket: selectedMarket.value,
      };
    case STEPS.PAYMENT:
      return {
        ...baseProps,
        paymentMethods: PAYMENT_METHODS,
        selectedPayment: selectedPayment.value,
      };
    case STEPS.PROCESSING:
      return baseProps;
    default:
      return {};
  }
});
const goToStep = (step) => {
  currentStep.value = step;
};
const clearProcessingTimer = () => {
  if (processingTimer.value) {
    clearTimeout(processingTimer.value);
    processingTimer.value = null;
  }
};
const resetState = () => {
  currentStep.value = STEPS.CLAIM;
  selectedMarket.value = null;
  selectedPayment.value = null;
  clearProcessingTimer();
};
const handleClose = () => {
  emit('close');
  resetState();
  gaService.sendEvent(gtmEvents.SSBT_DGE_APPLICATION_GIFT_CLAIM_MODAL_CLOSED, {
    page_name: 'gift_claim_modal',
    step_name: 'closed',
  });
};
const selectMarket = (market) => {
  selectedMarket.value = market;
};
const handlePlay = () => {
  if (!selectedMarket.value) return;
  emit('play', selectedMarket.value, betAmount.value);
  goToStep(STEPS.PAYMENT);
};
const selectPayment = (id, disabled) => {
  if (disabled) return;
  selectedPayment.value = id;
};
const handleSubmitPayment = () => {
  if (!selectedPayment.value) return;
  goToStep(STEPS.PROCESSING);
  clearProcessingTimer();
  processingTimer.value = setTimeout(() => {
    goToStep(STEPS.SUCCESS);
  }, PROCESSING_DELAY_MS);
};
watch(
  () => props.open,
  (isOpen) => {
    if (!isOpen) resetState();
  }
);
onBeforeUnmount(clearProcessingTimer);
</script>
<style scoped>
.atw\:animate-pulse-slow {
  animation: pulse 8s linear infinite;
}
.atw\:animate-pulse-slower {
  animation: pulse 10s linear infinite;
}
@keyframes pulse {
  0% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 0.4;
  }
}
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 200ms ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
