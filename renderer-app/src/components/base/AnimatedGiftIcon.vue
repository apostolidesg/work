<template>
  <div class="atw:relative" :class="containerClasses" role="img" :aria-label="ariaLabel">
    <span
      v-if="showPing"
      class="atw:absolute atw:inset-0 atw:rounded-full atw:bg-gradient-to-br atw:from-[#63C3D1] atw:to-[#4A9FB0] atw:opacity-50"
      :class="pingClasses"
      aria-hidden="true" />
    <div
      class="atw:relative atw:flex atw:items-center atw:justify-center atw:rounded-full atw:bg-gradient-to-br atw:from-[#63C3D1] atw:to-[#4A9FB0]"
      :class="[iconContainerClasses, { 'atw:animate-gift-wobble': animated }]"
      :style="shadowStyle">
      <FontAwesomeIcon :icon="faGift" class="atw:text-white" :class="iconClasses" aria-hidden="true" />
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faGift } from '@fortawesome/free-solid-svg-icons';
const props = defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v),
  },
  animated: {
    type: Boolean,
    default: true,
  },
  showPing: {
    type: Boolean,
    default: true,
  },
  ariaLabel: {
    type: String,
    default: 'Gift reward',
  },
});
const sizeConfig = computed(() => {
  const configs = {
    sm: {
      container: 'atw:h-10 atw:w-10',
      iconContainer: 'atw:h-10 atw:w-10',
      icon: 'atw:text-xl',
      shadow: '0 4px 16px rgba(99, 195, 209, 0.4), 0 0 30px rgba(99, 195, 209, 0.2)',
    },
    md: {
      container: 'atw:h-12 atw:w-12',
      iconContainer: 'atw:h-12 atw:w-12',
      icon: 'atw:h-6 atw:w-6',
      shadow: '0 4px 16px rgba(99, 195, 209, 0.4), 0 0 30px rgba(99, 195, 209, 0.2)',
    },
    lg: {
      container: 'atw:h-[120px] atw:w-[120px]',
      iconContainer: 'atw:h-[120px] atw:w-[120px]',
      icon: 'atw:text-[64px]',
      shadow: '0 8px 32px rgba(99, 195, 209, 0.4), 0 0 60px rgba(99, 195, 209, 0.2)',
    },
  };
  return configs[props.size];
});
const containerClasses = computed(() => sizeConfig.value.container);
const iconContainerClasses = computed(() => sizeConfig.value.iconContainer);
const iconClasses = computed(() => sizeConfig.value.icon);
const shadowStyle = computed(() => ({ boxShadow: sizeConfig.value.shadow }));
const pingClasses = computed(() => (props.showPing ? 'atw:animate-[ping_2s_ease-out_infinite]' : ''));
</script>
<style scoped>
@keyframes gift-wobble {
  0%,
  100% {
    transform: scale(1) rotate(0deg);
  }
  25% {
    transform: scale(1.1) rotate(5deg);
  }
  50% {
    transform: scale(1.1) rotate(0deg);
  }
  75% {
    transform: scale(1.1) rotate(-5deg);
  }
}
.atw\:animate-gift-wobble {
  animation: gift-wobble 2s ease-in-out infinite;
}
</style>
