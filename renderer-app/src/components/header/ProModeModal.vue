<template>
  <BaseModal :open="open" :width="600" :padding="48" aria-labelledby="pro-mode-title" @close="$emit('close')">
    <IconButton
      :icon="faXmark"
      size="md"
      variant="ghost"
      aria-label="Close dialog"
      class="atw:absolute atw:right-6 atw:top-6 atw:bg-gray-100 atw:hover:bg-gray-200"
      @click="$emit('close')" />
    <p
      id="pro-mode-title"
      class="atw:mb-8 atw:text-center atw:text-[28px] atw:font-semibold atw:leading-[1.5] atw:text-[#111111]">
      To experience the Pro Mode of our Digital Ecosystem, please use the horizontal SSBTs inside the store.<br />
      Thank you.
    </p>
    <div class="atw:flex atw:justify-center">
      <button
        type="button"
        class="atw:rounded-xl atw:border-2 atw:border-[#27E2CC] atw:px-12 atw:py-4 atw:text-2xl atw:font-semibold atw:text-[#1D4757] atw:transition-colors"
        :style="ctaButtonStyle"
        @click="$emit('close')">
        Got It
      </button>
    </div>
  </BaseModal>
</template>
<script setup>
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import BaseModal from '../base/BaseModal.vue';
import IconButton from '../base/IconButton.vue';
defineProps({
  open: {
    type: Boolean,
    required: true,
  },
});
defineEmits(['close']);
const ctaButtonStyle = {
  background: `
      linear-gradient(rgba(255, 255, 255, 0) 70.48%, rgb(38, 236, 217) 93.62%, rgba(255, 255, 255, 0) 100%),
      linear-gradient(rgba(0, 107, 255, 0) 0%, rgba(2, 83, 193, 0.01) 100%),
      rgb(39, 226, 204)
    `,
};
</script>
