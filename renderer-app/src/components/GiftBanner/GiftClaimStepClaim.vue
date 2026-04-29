<template>
  <div class="atw:w-full atw:space-y-6 atw:pt-4 atw:text-center">
    <div class="atw:mb-8 atw:flex atw:justify-center">
      <AnimatedGiftIcon size="lg" />
    </div>
    <div class="atw:space-y-4">
      <h2 id="gift-claim-title" class="atw:mb-0 atw:text-[40px] atw:font-bold" :style="gradientTextStyle">
        {{ $t('freeBet') }}
      </h2>
      <p
        id="gift-claim-desc"
        class="atw:mx-auto atw:mb-8 atw:max-w-[500px] atw:text-xl atw:font-normal atw:leading-[1.8] atw:text-gray-700">
        {{ $t('scanYourTicket') }}
      </p>
      <h2 class="atw:mb-0 atw:text-[40px] atw:font-bold" :style="gradientTextStyle">{{ $t('dontHaveOneYet') }}</h2>
      <p class="atw:mx-auto atw:mb-8 atw:max-w-[500px] atw:text-xl atw:font-normal atw:leading-[1.8] atw:text-gray-700">
        {{ $t('justPlayTzoker') }}
      </p>
    </div>
    <button
      type="button"
      class="atw:mx-auto atw:flex atw:w-full atw:max-w-[500px] atw:items-center atw:justify-center atw:rounded-xl atw:border-2 atw:border-[#00AB4D] atw:px-6 atw:py-5 atw:text-[22px] atw:font-bold atw:text-white atw:transition-transform atw:hover:scale-[1.02] atw:active:scale-[0.98] atw:focus-visible:outline atw:focus-visible:outline-offset-2 atw:focus-visible:outline-[#00AB4D]"
      :style="ctaButtonStyle"
      @click="$emit('next')">
      {{ $t('claimGift') }}
    </button>
  </div>
</template>
<script setup>
import { onMounted } from 'vue';
import AnimatedGiftIcon from '../base/AnimatedGiftIcon.vue';
import gaService from '@/services/gaService';
import gtmEvents from '@/constants/gtmEvents';

onMounted(() => {
  gaService.sendEvent(gtmEvents.SSBT_DGE_APPLICATION_GIFT_CLAIM_STEP_CLAIM_OPENED, {
    page_name: 'gift_claim_modal',
    step_name: 'claim',
  });
});

defineEmits(['next']);
const gradientTextStyle = {
  background: 'linear-gradient(135deg, #0055FF 0%, #00AB4D 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};
const ctaButtonStyle = {
  background: `
      linear-gradient(rgba(255, 255, 255, 0) 70.48%, rgb(81, 202, 136) 93.62%, rgba(255, 255, 255, 0) 100%),
      linear-gradient(rgba(0, 107, 255, 0) 0%, rgba(2, 83, 193, 0.01) 100%),
      rgb(0, 171, 77)
    `,
  boxShadow: '0 8px 24px rgba(0, 171, 77, 0.4), 0 0 40px rgba(0, 171, 77, 0.2)',
};
</script>
