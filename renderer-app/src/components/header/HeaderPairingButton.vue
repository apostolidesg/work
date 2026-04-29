<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faMobileScreenButton } from '@fortawesome/free-solid-svg-icons';

defineEmits(['click']);
</script>

<template>
  <button type="button" class="pair-button" aria-label="Pair device" @click="$emit('click')">
    <div class="pair-button__inner">
      <FontAwesomeIcon :icon="faMobileScreenButton" class="atw:h-5 atw:w-5 atw:text-white" aria-hidden="true" />
      <span class="atw:text-lg atw:font-normal atw:text-white atw:whitespace-nowrap">{{ t('pairDevice') }}</span>
    </div>
  </button>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.pair-button {
  @apply atw:flex atw:items-center atw:border-none atw:bg-transparent atw:p-0 atw:transition-opacity atw:hover:opacity-80 atw:focus-visible:outline atw:focus-visible:outline-offset-2 atw:focus-visible:outline-white atw:portrait:hidden;
}

.pair-button__inner {
  @apply atw:flex atw:items-center atw:justify-center atw:gap-3 atw:px-6 atw:py-2.5 atw:rounded-[40px] atw:bg-white/20 atw:border atw:border-[#27E2CC];
}
</style>
