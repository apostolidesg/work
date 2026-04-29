<script setup>
import { computed } from 'vue';
import { getBallAnimationDelay, FORTUNE_COOKIE_STYLES, getBonusBallStyle } from '../../../config/fortuneCookieConfig';

const props = defineProps({
  number: {
    type: Number,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  variant: {
    type: String,
    default: 'main',
    validator: (v) => ['main', 'bonus'].includes(v),
  },
  gameType: {
    type: String,
    default: 'tzoker',
  },
  label: {
    type: String,
    default: 'Number',
  },
});

const sizeClasses = computed(() => {
  if (props.variant === 'bonus') {
    return [
      'atw:w-[32px] atw:h-[32px] atw:text-[14px]',
      'atw:max-[1600px]:w-[28px] atw:max-[1600px]:h-[28px] atw:max-[1600px]:text-[12px]',
      'atw:[@media(max-height:900px)]:w-[22px] atw:[@media(max-height:900px)]:h-[22px] atw:[@media(max-height:900px)]:text-[9px]',
    ];
  }
  return [
    'atw:w-[28px] atw:h-[28px] atw:text-[12px]',
    'atw:max-[1600px]:w-[24px] atw:max-[1600px]:h-[24px] atw:max-[1600px]:text-[11px]',
    'atw:[@media(max-height:900px)]:w-[20px] atw:[@media(max-height:900px)]:h-[20px] atw:[@media(max-height:900px)]:text-[9px]',
  ];
});

const ballStyle = computed(() => {
  const animationDelay = getBallAnimationDelay(props.variant, props.index);

  if (props.variant === 'bonus') {
    const style = getBonusBallStyle(props.gameType);
    return {
      background: style.background,
      borderColor: style.border,
      boxShadow: style.shadow,
      animationDelay,
    };
  }

  return {
    background: FORTUNE_COOKIE_STYLES.mainBall.background,
    borderColor: FORTUNE_COOKIE_STYLES.mainBall.border,
    boxShadow: FORTUNE_COOKIE_STYLES.mainBall.shadow,
    animationDelay,
  };
});
</script>

<template>
  <div
    role="listitem"
    :aria-label="`${label} ${number}`"
    class="atw:rounded-full atw:border-2 atw:flex atw:items-center atw:justify-center atw:font-bold atw:text-white atw:shrink-0 atw:animate-fortune-pop-in"
    :class="sizeClasses"
    :style="ballStyle">
    {{ number }}
  </div>
</template>

<style scoped>
@keyframes fortunePopIn {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.atw\:animate-fortune-pop-in {
  animation: fortunePopIn 0.4s ease-out both;
}

@media (prefers-reduced-motion: reduce) {
  .atw\:animate-fortune-pop-in {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
</style>
