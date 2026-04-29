<script setup>
import { ref, watch } from 'vue';
import { PROMO_CARDS_CONFIG } from '../../config/promoCardsConfig';

import defaultWheelImage from '../../assets/images/wheel-new.png';

const props = defineProps({
  size: {
    type: Number,
    default: 300,
  },
  src: {
    type: String,
    default: '',
  },
  fallbackSrc: {
    type: String,
    default: '',
  },
});

const resolveSource = (value) => {
  if (!value) return '';
  if (typeof value !== 'string') return '';
  const trimmed = value.trim();
  if (!trimmed) return '';
  if (/^(https?:)?\/\//i.test(trimmed)) return trimmed;
  if (trimmed.startsWith('data:') || trimmed.startsWith('blob:') || trimmed.startsWith('/')) {
    return trimmed;
  }
  return trimmed;
};

const getFallbackSrc = () => {
  if (props.fallbackSrc) {
    const resolved = resolveSource(props.fallbackSrc);
    if (resolved) return resolved;
  }
  if (defaultWheelImage) {
    return defaultWheelImage;
  }
  const configWheel = PROMO_CARDS_CONFIG.assets?.animatedWheel;
  if (configWheel) {
    return resolveSource(configWheel);
  }
  return '';
};

const getPrimarySrc = () => {
  const resolved = resolveSource(props.src);
  return resolved || getFallbackSrc();
};

const wheelSrc = ref(getPrimarySrc());

const hasTriedFallback = ref(false);

watch(
  () => [props.src, props.fallbackSrc],
  () => {
    hasTriedFallback.value = false;
    wheelSrc.value = getPrimarySrc();
  }
);

const handleError = () => {
  if (hasTriedFallback.value) return;
  const fallback = getFallbackSrc();
  if (fallback && wheelSrc.value !== fallback) {
    hasTriedFallback.value = true;
    wheelSrc.value = fallback;
  }
};
</script>

<template>
  <img
    :src="wheelSrc"
    :width="size"
    :height="size"
    :style="{ width: `${size}px`, height: `${size}px` }"
    class="atw:h-full atw:w-full atw:select-none animated-wheel"
    alt=""
    role="presentation"
    aria-hidden="true"
    draggable="false"
    loading="lazy"
    decoding="async"
    @error="handleError" />
</template>

<style scoped>
.animated-wheel {
  animation: spin 20s linear infinite;
  user-select: none;
  -webkit-user-drag: none;
  pointer-events: none;
  will-change: transform;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .animated-wheel {
    animation: none;
  }
}
</style>
