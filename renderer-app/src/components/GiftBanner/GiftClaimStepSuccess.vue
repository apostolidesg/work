<template>
  <div class="atw:w-full atw:space-y-8 atw:text-center">
    <div class="atw:relative atw:mx-auto atw:h-32 atw:w-32">
      <div
        class="atw:absolute atw:inset-0 atw:rounded-full atw:bg-gradient-to-br atw:from-[#FFD700] atw:to-[#FFA500] atw:shadow-[0_14px_44px_rgba(255,215,0,0.5)]"
        aria-hidden="true" />
      <FontAwesomeIcon
        icon="wand-magic-sparkles"
        class="atw:absolute atw:left-1/2 atw:top-1/2 atw:h-14 atw:w-14 atw:-translate-x-1/2 atw:-translate-y-1/2 atw:text-white"
        aria-hidden="true" />
      <div
        class="atw:absolute atw:inset-0 atw:animate-[ping_2s_ease-out_infinite] atw:rounded-full atw:border-4 atw:border-[#FFD700]"
        aria-hidden="true" />
      <div
        class="atw:absolute atw:inset-[-10%] atw:animate-[ping_2.4s_ease-out_infinite] atw:rounded-full atw:border-4 atw:border-[#FFA500]/70"
        aria-hidden="true" />
    </div>
    <div class="atw:space-y-3">
      <h2 class="atw:text-3xl atw:font-bold atw:text-gray-900">That's great! Your bet has been placed.</h2>
      <p class="atw:text-lg atw:font-medium atw:text-gray-600">Please take your bet receipt.</p>
    </div>
    <div class="atw:grid atw:gap-4 atw:md:grid-cols-2">
      <ActionCard icon="print" label="Print Receipt" color="blue" />
      <ActionCard icon="qrcode" label="QR Code" color="green" />
    </div>
    <PrimaryButton variant="success" size="lg" class="atw:w-full" @click="$emit('close')">
      Continue to Lobby
    </PrimaryButton>
  </div>
</template>
<script setup>
import PrimaryButton from '../base/PrimaryButton.vue';
import ActionCard from './ActionCard.vue';
defineEmits(['close']);
</script>
