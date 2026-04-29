<script setup>
import { computed, ref } from 'vue';
import { FORTUNE_COOKIE_STYLES } from '../../../config/fortuneCookieConfig';
import gtmEvents from '@/constants/gtmEvents';
import gaService from '@/services/gaService';

const props = defineProps({
  actionText: {
    type: String,
    required: true,
  },
  ariaLabel: {
    type: String,
    default: 'Click to crack open your fortune cookie and reveal lucky numbers',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['crack']);

const crackCookie = () => {
  gaService.sendEvent(gtmEvents.SSBT_DGE_APPLICATION_COOKIE_CRACKED, {
    cookie_cracked: true,
  });
  emit('crack');
};

const buttonRef = ref(null);

const cookieStyle = computed(() => ({
  background: FORTUNE_COOKIE_STYLES.cookie.background,
  borderRadius: FORTUNE_COOKIE_STYLES.cookie.borderRadius,
  border: FORTUNE_COOKIE_STYLES.cookie.border,
  boxShadow: FORTUNE_COOKIE_STYLES.cookie.boxShadow,
  cursor: props.disabled ? 'not-allowed' : 'pointer',
}));

const focus = () => {
  buttonRef.value?.focus();
};

defineExpose({ focus });
</script>

<template>
  <button
    ref="buttonRef"
    type="button"
    class="atw:relative atw:transition-transform atw:duration-300 atw:hover:scale-110 atw:active:scale-95 atw:animate-cookie-hover atw:w-[var(--cookie-size)] atw:h-[var(--cookie-size)] atw:focus-visible:outline atw:focus-visible:outline-2 atw:focus-visible:outline-offset-4 atw:focus-visible:outline-[#FFD93D] atw:focus-visible:rounded-full"
    :style="cookieStyle"
    :disabled="disabled"
    :aria-label="ariaLabel"
    @click="crackCookie"
    @keydown.enter.prevent="$emit('crack')"
    @keydown.space.prevent="$emit('crack')">
    <div
      class="atw:absolute atw:top-[15%] atw:left-[25%] atw:w-[50%] atw:h-[30%] atw:rounded-full atw:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.4)_0%,transparent_70%)]"
      aria-hidden="true" />

    <div
      class="atw:absolute atw:top-[20%] atw:right-[20%] atw:w-[calc(var(--cookie-size)*0.05)] atw:h-[calc(var(--cookie-size)*0.05)] atw:rounded-full atw:bg-white atw:shadow-[0_0_8px_rgba(255,255,255,0.8)] atw:animate-cookie-sparkle"
      aria-hidden="true" />
    <div
      class="atw:absolute atw:bottom-[30%] atw:left-[15%] atw:w-[calc(var(--cookie-size)*0.0375)] atw:h-[calc(var(--cookie-size)*0.0375)] atw:rounded-full atw:bg-white atw:shadow-[0_0_6px_rgba(255,255,255,0.8)] atw:animate-cookie-sparkle-delay"
      aria-hidden="true" />

    <div
      class="atw:absolute atw:top-1/2 atw:left-1/2 atw:-translate-x-1/2 atw:-translate-y-1/2 atw:text-[calc(var(--cookie-size)*0.1625)] atw:font-bold atw:text-[#6B3E1A] atw:drop-shadow-[1px_1px_3px_rgba(255,255,255,0.7)] atw:font-[Roboto_Flex]"
      aria-hidden="true">
      {{ actionText }}
    </div>
  </button>
</template>

<style scoped>
@keyframes cookieHover {
  0%,
  100% {
    transform: rotate(-2deg);
  }
  50% {
    transform: rotate(2deg);
  }
}

@keyframes cookieSparkle {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

.atw\:animate-cookie-hover {
  animation: cookieHover 2s ease-in-out infinite;
}

.atw\:animate-cookie-sparkle {
  animation: cookieSparkle 1.5s ease-in-out infinite;
}

.atw\:animate-cookie-sparkle-delay {
  animation: cookieSparkle 2s ease-in-out infinite 0.5s;
}

@media (prefers-reduced-motion: reduce) {
  .atw\:animate-cookie-hover,
  .atw\:animate-cookie-sparkle,
  .atw\:animate-cookie-sparkle-delay {
    animation: none;
  }
}
</style>
