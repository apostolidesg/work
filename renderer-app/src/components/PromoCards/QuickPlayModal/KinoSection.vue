<script setup>
import { ref } from 'vue';
import kinoLogo from '../../../assets/logos/kino-logo.svg';

const panelOpen = ref(false);

const selectedKinoNumber = defineModel('selectedKinoNumber', {
  type: Number,
  required: true,
});

defineProps({
  kinoNumbers: {
    type: Array,
    required: true,
  },
  kinoNumberOptions: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div>
    <div class="kino-section">
      <img :src="kinoLogo" alt="KINO" class="kino-section__logo" />
      <div class="atw:flex atw:flex-col atw:flex-1">
        <span class="kino-section__label">{{ $t('slips.tzoker.addKinoSameNumber') }}</span>
        <span class="kino-section__sublabel">+€0,50 • ίδιοι 6 αριθμοί</span>
      </div>
      <button
        type="button"
        role="switch"
        :aria-checked="panelOpen"
        :aria-label="$t(panelOpen ? 'slips.tzoker.kinoDisable' : 'slips.tzoker.kinoEnable')"
        class="kino-section__toggle"
        :class="panelOpen ? 'kino-section__toggle--on' : 'kino-section__toggle--off'"
        @click="panelOpen = !panelOpen">
        <span
          aria-hidden="true"
          class="kino-section__toggle-thumb"
          :class="panelOpen ? 'atw:translate-x-5' : 'atw:translate-x-0'" />
      </button>
    </div>

    <Transition
      enter-active-class="atw:transition-all atw:duration-300 atw:ease-out"
      leave-active-class="atw:transition-all atw:duration-200 atw:ease-in"
      enter-from-class="atw:opacity-0 atw:-translate-y-2"
      leave-to-class="atw:opacity-0 atw:-translate-y-2">
      <div v-if="panelOpen" class="kino-section__panel">
        <div class="atw:mb-4">
          <div>
            <span class="kino-section__amount">{{ $t('slips.tzoker.kinoAmount') }} 800€</span>
            <span class="kino-section__draw"> • {{ $t('slips.tzoker.winUpTo') }} 05:00</span>
          </div>
          <p class="kino-section__numbers-title">{{ $t('slips.tzoker.numbers') }} (6)</p>
        </div>

        <div
          class="atw:flex atw:gap-3 atw:flex-wrap atw:mb-4"
          role="group"
          :aria-label="$t('slips.tzoker.kinoNumbersLabel')">
          <div
            v-for="num in kinoNumbers"
            :key="`kino-${num}`"
            role="img"
            :aria-label="`KINO number ${num}`"
            class="kino-section__number">
            {{ num }}
          </div>
        </div>

        <fieldset class="atw:border-0 atw:p-0 atw:m-0">
          <legend class="kino-section__price-legend">{{ $t('slips.tzoker.selectPrice') }}</legend>
          <div class="atw:flex atw:gap-3">
            <button
              v-for="option in kinoNumberOptions"
              :key="option"
              type="button"
              :aria-pressed="option === selectedKinoNumber"
              class="kino-section__price-btn"
              :class="
                option === selectedKinoNumber ? 'kino-section__price-btn--active' : 'kino-section__price-btn--inactive'
              "
              @click="selectedKinoNumber = option">
              €{{ option.toFixed(2) }}
            </button>
          </div>
        </fieldset>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.kino-section {
  @apply atw:flex atw:items-center atw:gap-4;
}

.kino-section__label {
  @apply atw:text-[20px] atw:font-medium atw:leading-[21px] atw:tracking-[-0.449px] atw:text-[#1E1F24];
}

.kino-section__logo {
  @apply atw:w-[89px] atw:h-[49.938px] atw:flex-shrink-0;
}

.kino-section__sublabel {
  @apply atw:text-[20px] atw:font-medium atw:leading-[21px] atw:tracking-[-0.449px] atw:mt-0.5 atw:text-[#666666];
}

.kino-section__toggle {
  @apply atw:relative atw:inline-flex atw:h-6 atw:w-11 atw:flex-shrink-0 atw:cursor-pointer atw:rounded-full atw:border-2 atw:border-transparent atw:transition-colors atw:duration-200;
}

.kino-section__toggle--on {
  @apply atw:bg-[#00AB4D];
}

.kino-section__toggle--off {
  @apply atw:bg-[#D0D0D0];
}

.kino-section__toggle-thumb {
  @apply atw:pointer-events-none atw:inline-block atw:h-5 atw:w-5 atw:rounded-full atw:bg-white atw:shadow atw:transition atw:duration-200;
}

.kino-section__panel {
  @apply atw:rounded-2xl atw:bg-[#fff8ec] atw:shadow-[0_4px_8px_rgba(0,0,0,0.06)];
}

.kino-section__amount {
  @apply atw:text-[24px] atw:font-bold atw:leading-[36px] atw:tracking-[0.07px] atw:text-[#FFA800];
}

.kino-section__draw {
  @apply atw:text-[24px] atw:font-normal atw:leading-[36px] atw:tracking-[0.07px] atw:text-[#1E1F24];
}

.kino-section__numbers-title {
  @apply atw:text-[22px] atw:font-bold atw:leading-[36px] atw:tracking-[0.07px] atw:m-0 atw:text-[#1E1F24];
}

.kino-section__number {
  @apply atw:w-12 atw:h-12 atw:rounded-full atw:flex atw:items-center atw:justify-center atw:text-xl atw:font-bold atw:flex-shrink-0 atw:select-none atw:bg-[#ffa800] atw:text-[#111111];
}

.kino-section__price-legend {
  @apply atw:text-[22px] atw:font-bold atw:leading-[36px] atw:tracking-[0.07px] atw:mb-2 atw:text-[#1E1F24];
}

.kino-section__price-btn {
  @apply atw:rounded-[16px] atw:px-4 atw:py-2 atw:transition-all atw:cursor-pointer atw:text-[24px] atw:font-bold atw:leading-[29.1px] atw:tracking-[0.057px] atw:border-[0.808px] atw:border-solid atw:border-[#B6BAC4];
}

.kino-section__price-btn--active {
  @apply atw:bg-[#FFA800] atw:border-[#FFA800] atw:text-[#111111];
}

.kino-section__price-btn--inactive {
  @apply atw:bg-[#F5F5F5] atw:text-[#111111];
}
</style>
