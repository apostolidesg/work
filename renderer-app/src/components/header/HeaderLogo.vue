<script setup>
import giftIcon from '@/assets/icons/gift-icon.png';

defineProps({
  logoSrc: {
    type: String,
    required: true,
  },
});

defineEmits(['click']);
</script>

<template>
  <button type="button" class="header-logo" aria-label="Go to home" @click="$emit('click')">
    <div class="header-logo__inner">
      <span class="header-logo__label"> Σκάναρε<br />το δώρο σου </span>
      <img :src="giftIcon" alt="Gift icon" class="header-logo__img" loading="lazy" decoding="async" />
    </div>
  </button>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.header-logo {
  @apply atw:flex atw:items-center atw:border-white atw:bg-transparent atw:p-0 atw:transition-opacity atw:hover:opacity-80 atw:focus-visible:outline atw:focus-visible:outline-offset-2 atw:focus-visible:outline-white atw:portrait:hidden;
}

.header-logo__inner {
  @apply atw:flex atw:items-center atw:justify-end atw:gap-5 atw:px-6 atw:py-2.5 atw:rounded-r-[40px] atw:bg-white/20 atw:border atw:border-l-0 atw:border-white;
}

.header-logo__label {
  @apply atw:text-lg atw:font-normal atw:text-white atw:whitespace-nowrap atw:text-left atw:leading-tight;
}

.header-logo__img {
  @apply atw:h-[50px] atw:w-auto atw:transition atw:duration-150 atw:active:opacity-70;
}
</style>
