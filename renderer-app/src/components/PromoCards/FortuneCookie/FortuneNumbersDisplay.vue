<script setup>
import { computed, ref } from 'vue';
import FortuneNumberBall from './FortuneNumberBall.vue';
import { FORTUNE_COOKIE_STYLES, formatNumbersForAnnouncement } from '../../../config/fortuneCookieConfig';
import gtmEvents from '@/constants/gtmEvents';
import gaService from '@/services/gaService';
import { useConfigText } from '@/composables/useConfigText';

const props = defineProps({
  mainNumbers: {
    type: Array,
    required: true,
  },
  bonusNumbers: {
    type: Array,
    default: () => [],
  },
  gameType: {
    type: String,
    required: true,
  },
  bonusLabel: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  submitText: {
    type: String,
    required: true,
  },
  submitAriaLabel: {
    type: String,
    default: 'Submit these numbers to play',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['submit']);
const { tConfig } = useConfigText();

const submitButtonRef = ref(null);

const submitButtonStyle = computed(() => FORTUNE_COOKIE_STYLES.submitButton);

const groupLabel = computed(() => tConfig('promo.a11y.generatedLotteryNumbers', 'Generated lottery numbers'));

const statusLabel = computed(() => {
  const main = formatNumbersForAnnouncement(props.mainNumbers);
  const bonus = formatNumbersForAnnouncement(props.bonusNumbers);
  return tConfig('promo.a11y.luckyNumbersWithBonus', `Lucky numbers: ${main}. ${props.bonusLabel}: ${bonus}`);
});

const mainNumbersAriaLabel = computed(() =>
  tConfig('promo.a11y.mainNumbers', `Main numbers: ${formatNumbersForAnnouncement(props.mainNumbers)}`)
);

const bonusNumbersAriaLabel = computed(() =>
  tConfig('promo.a11y.bonusNumbers', `${props.bonusLabel} numbers: ${formatNumbersForAnnouncement(props.bonusNumbers)}`)
);

const focus = () => {
  submitButtonRef.value?.focus();
};

const submitSlip = () => {
  emit('submit');
  gaService.sendEvent(gtmEvents.SSBT_DGE_APPLICATION_SUBMIT_YOUR_SLIP_COOKIE_CRACKED, {
    submit_fortune_numbers_clicked: true,
  });
};

defineExpose({ focus });
</script>

<template>
  <div class="atw:flex atw:flex-col atw:gap-2 atw:max-[1600px]:gap-1.5" role="group" :aria-label="groupLabel">
    <div
      class="atw:rounded-xl atw:border-2 atw:border-[#D4A574] atw:bg-[linear-gradient(135deg,rgba(255,255,255,0.95)_0%,rgba(255,249,230,0.95)_100%)] atw:shadow-[0_4px_16px_rgba(212,165,116,0.3)] atw:flex atw:flex-col atw:gap-[4px] atw:p-[6px_10px] atw:max-w-[420px] atw:animate-fortune-fade-in atw:max-[1600px]:gap-[4px] atw:max-[1600px]:p-[6px_8px] atw:[@media(max-height:900px)]:gap-[2px] atw:[@media(max-height:900px)]:p-[4px_6px]"
      role="status"
      :aria-label="statusLabel">
      <h3
        class="atw:text-center atw:text-[10px] atw:font-bold atw:text-[#8B5A2B] atw:m-0 atw:max-[1600px]:text-[9px] atw:[@media(max-height:900px)]:text-[8px]">
        {{ title }}
      </h3>

      <div
        class="atw:flex atw:items-center atw:justify-center atw:gap-2 atw:max-[1600px]:gap-1.5 atw:[@media(max-height:900px)]:gap-1"
        role="list"
        :aria-label="mainNumbersAriaLabel">
        <FortuneNumberBall
          v-for="(num, index) in mainNumbers"
          :key="`main-${num}`"
          :number="num"
          :index="index"
          variant="main"
          :game-type="gameType" />

        <div
          v-if="bonusNumbers.length"
          class="atw:w-[2px] atw:h-[28px] atw:bg-[#D4A574] atw:mx-1 atw:shrink-0 atw:max-[1600px]:h-[24px] atw:max-[1600px]:mx-0.5 atw:[@media(max-height:900px)]:h-[20px]"
          role="separator"
          aria-hidden="true" />

        <div
          v-if="bonusNumbers.length"
          class="atw:flex atw:flex-col atw:items-center atw:gap-[2px] atw:shrink-0"
          role="list"
          :aria-label="bonusNumbersAriaLabel">
          <p
            class="atw:text-[8px] atw:font-semibold atw:text-[#8B5A2B] atw:m-0 atw:whitespace-nowrap atw:max-[1600px]:text-[7px] atw:[@media(max-height:900px)]:text-[6px]"
            aria-hidden="true">
            {{ bonusLabel }}
          </p>
          <div
            class="atw:flex atw:items-center atw:gap-2 atw:max-[1600px]:gap-1.5 atw:[@media(max-height:900px)]:gap-1">
            <FortuneNumberBall
              v-for="(num, index) in bonusNumbers"
              :key="`bonus-${num}`"
              :number="num"
              :index="index"
              variant="bonus"
              :game-type="gameType"
              :label="bonusLabel" />
          </div>
        </div>
      </div>
    </div>

    <button
      ref="submitButtonRef"
      type="button"
      class="atw:px-5 atw:py-2 atw:rounded-xl atw:transition-transform atw:duration-200 atw:hover:scale-105 atw:active:scale-95 atw:text-[12px] atw:font-bold atw:text-white atw:shadow-[0_4px_12px_rgba(0,171,77,0.4)] atw:h-[38px] atw:w-full atw:max-w-[283px] atw:animate-fortune-fade-in atw:max-[1600px]:h-[34px] atw:max-[1600px]:text-[11px] atw:max-[1600px]:px-4 atw:[@media(max-height:900px)]:h-[28px] atw:[@media(max-height:900px)]:text-[9px] atw:focus-visible:outline atw:focus-visible:outline-2 atw:focus-visible:outline-offset-2 atw:focus-visible:outline-[#00AB4D]"
      :style="submitButtonStyle"
      :disabled="disabled"
      :aria-label="submitAriaLabel"
      @click="submitSlip">
      {{ submitText }}
    </button>
  </div>
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
