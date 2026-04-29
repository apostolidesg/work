<script setup>
import { computed, ref } from 'vue';
import { FORTUNE_COOKIE_STYLES } from '../../../config/fortuneCookieConfig';
import gtmEvents from '@/constants/gtmEvents';
import gaService from '@/services/gaService';

defineProps({
  text: {
    type: String,
    required: true,
  },
  ariaLabel: {
    type: String,
    default: 'Generate new lucky numbers',
  },
});

const emit = defineEmits(['retry']);

const buttonRef = ref(null);

const buttonStyle = computed(() => FORTUNE_COOKIE_STYLES.retryButton);

const focus = () => {
  buttonRef.value?.focus();
};

const retry = () => {
  emit('retry');
  gaService.sendEvent(gtmEvents.SSBT_DGE_APPLICATION_RETRY_COOKIE_CRACKED, {
    retry_cookie_clicked: true,
  });
};

defineExpose({ focus });
</script>

<template>
  <button
    ref="buttonRef"
    type="button"
    class="atw:px-4 atw:py-2 atw:rounded-xl atw:transition-transform atw:duration-200 atw:hover:scale-105 atw:active:scale-95 atw:text-[11px] atw:font-bold atw:text-[#8B5A2B] atw:shadow-[0_3px_8px_rgba(212,165,116,0.3)] atw:whitespace-nowrap atw:animate-fortune-fade-in atw:max-[1600px]:px-3 atw:max-[1600px]:py-1.5 atw:max-[1600px]:text-[10px] atw:[@media(max-height:900px)]:px-2.5 atw:[@media(max-height:900px)]:py-1 atw:[@media(max-height:900px)]:text-[9px] atw:focus-visible:outline atw:focus-visible:outline-2 atw:focus-visible:outline-offset-2 atw:focus-visible:outline-[#D4A574]"
    :style="buttonStyle"
    :aria-label="ariaLabel"
    @click="retry">
    {{ text }}
  </button>
</template>

<style scoped>
@keyframes fortuneFadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.atw\:animate-fortune-fade-in {
  animation: fortuneFadeIn 0.5s ease-out 1s both;
}

@media (prefers-reduced-motion: reduce) {
  .atw\:animate-fortune-fade-in {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
</style>
