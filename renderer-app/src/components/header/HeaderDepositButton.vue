<script setup>
defineEmits(['click']);
</script>

<template>
  <button
    type="button"
    class="atw:flex atw:items-center atw:gap-3 atw:rounded-[40px] atw:border-none atw:bg-[#1D4757] atw:px-6 atw:py-3 atw:transition-all atw:hover:opacity-90"
    aria-label="Deposit"
    @click="$emit('click')">
    <svg class="atw:shrink-0" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 0C15.5016 0 19.9998 4.49824 20 10C20 15.5019 15.5017 20.001 10 20.001C4.49838 20.0009 0 15.5018 0 10C0.000199276 4.49832 4.49851 0.000120657 10 0ZM10 1.39551C5.26915 1.39563 1.39571 5.26899 1.39551 10C1.39551 14.7312 5.26903 18.6053 10 18.6055C14.7311 18.6055 18.6055 14.7312 18.6055 10C18.6053 5.26892 14.7309 1.39551 10 1.39551ZM10 5.58203C10.3852 5.58203 10.6981 5.89406 10.6982 6.2793V9.30273H13.7217C14.1069 9.30273 14.4188 9.61476 14.4189 10C14.4189 10.3853 14.107 10.6982 13.7217 10.6982H10.6982V13.7217C10.6982 14.107 10.3853 14.4199 10 14.4199C9.61485 14.4197 9.30273 14.1069 9.30273 13.7217V10.6982H6.2793C5.89415 10.698 5.58203 10.3852 5.58203 10C5.58215 9.61489 5.89422 9.30294 6.2793 9.30273H9.30273V6.2793C9.30286 5.89419 9.61493 5.58224 10 5.58203Z"
        fill="white" />
    </svg>
    <span class="atw:text-lg atw:font-normal atw:text-white;">{{ $t('header.deposit') }}</span>
  </button>
</template>
