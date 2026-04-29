<script setup>
import { computed } from 'vue';

const props = defineProps({
  fortuneMessage: {
    type: String,
    required: true,
  },
});

const crackedLabel = computed(() => `Cracked fortune cookie with message: ${props.fortuneMessage}`);

const fortuneLabel = computed(() => `Your fortune: ${props.fortuneMessage}`);
</script>

<template>
  <div
    class="atw:relative atw:w-[var(--cookie-size)] atw:h-[var(--cookie-size)] atw:flex atw:items-center atw:justify-center"
    role="img"
    :aria-label="crackedLabel">
    <div
      class="atw:absolute atw:left-0 atw:rounded-[45%_20%_20%_45%] atw:border-[3px] atw:border-[#C89D68] atw:bg-[linear-gradient(135deg,#FFE87C_0%,#F4D03F_20%,#E8B84D_60%,#D4A574_100%)] atw:shadow-[6px_8px_20px_rgba(212,165,116,0.5)] atw:animate-cookie-crack-left atw:w-[calc(var(--cookie-size)*0.3)] atw:h-[calc(var(--cookie-size)*0.6)]"
      aria-hidden="true">
      <div
        class="atw:absolute atw:top-[20%] atw:left-[15%] atw:w-[40%] atw:h-[30%] atw:rounded-full atw:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.3)_0%,transparent_70%)]" />
    </div>

    <div
      class="atw:absolute atw:right-0 atw:rounded-[20%_45%_45%_20%] atw:border-[3px] atw:border-[#C89D68] atw:bg-[linear-gradient(135deg,#FFE87C_0%,#F4D03F_20%,#E8B84D_60%,#D4A574_100%)] atw:shadow-[-6px_8px_20px_rgba(212,165,116,0.5)] atw:animate-cookie-crack-right atw:w-[calc(var(--cookie-size)*0.3)] atw:h-[calc(var(--cookie-size)*0.6)]"
      aria-hidden="true">
      <div
        class="atw:absolute atw:top-[20%] atw:right-[15%] atw:w-[40%] atw:h-[30%] atw:rounded-full atw:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.3)_0%,transparent_70%)]" />
    </div>

    <div
      class="atw:absolute atw:w-[calc(var(--cookie-size)*0.5625)] atw:p-[calc(var(--cookie-size)*0.0375)] atw:rounded-[6px] atw:border-2 atw:border-[#D4A574] atw:bg-[linear-gradient(135deg,#FFFEF7_0%,#FFF9E6_100%)] atw:shadow-[0_6px_18px_rgba(0,0,0,0.25)] atw:animate-cookie-slide-out atw:z-10"
      role="status"
      :aria-label="fortuneLabel">
      <p
        class="atw:text-[calc(var(--cookie-size)*0.05)] atw:font-semibold atw:text-[#8B5A2B] atw:text-center atw:italic">
        {{ fortuneMessage }}
      </p>
    </div>
  </div>
</template>

<style scoped>
@keyframes cookieCrackLeft {
  from {
    transform: translateX(0) rotate(0deg);
    opacity: 1;
  }
  to {
    transform: translateX(-20px) rotate(-15deg);
    opacity: 0.9;
  }
}

@keyframes cookieCrackRight {
  from {
    transform: translateX(0) rotate(0deg);
    opacity: 1;
  }
  to {
    transform: translateX(20px) rotate(15deg);
    opacity: 0.9;
  }
}

@keyframes cookieSlideOut {
  from {
    transform: translateY(40px) scale(0.8);
    opacity: 0;
  }
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

.atw\:animate-cookie-crack-left {
  animation: cookieCrackLeft 0.5s ease-out forwards;
}

.atw\:animate-cookie-crack-right {
  animation: cookieCrackRight 0.5s ease-out forwards;
}

.atw\:animate-cookie-slide-out {
  animation: cookieSlideOut 0.6s ease-out 0.3s both;
}

@media (prefers-reduced-motion: reduce) {
  .atw\:animate-cookie-crack-left,
  .atw\:animate-cookie-crack-right,
  .atw\:animate-cookie-slide-out {
    animation: none;
  }

  .atw\:animate-cookie-slide-out {
    opacity: 1;
    transform: none;
  }

  .atw\:animate-cookie-crack-left {
    transform: translateX(-20px) rotate(-15deg);
  }

  .atw\:animate-cookie-crack-right {
    transform: translateX(20px) rotate(15deg);
  }
}
</style>
