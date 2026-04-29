<script setup>
import { computed } from 'vue';
import { APP_CONFIG } from '@/config/appConfig';
import hgcLogo from '@/assets/logos/logo-hgc.svg';

const footerStyle = computed(() => ({
  height: APP_CONFIG.header.height,
  borderTop: '2px solid white',
}));
</script>

<template>
  <footer class="regulatory-footer" :style="footerStyle">
    <div class="regulatory-footer__inner">
      <img
        :src="hgcLogo"
        alt="HGC Logo - 21+"
        class="regulatory-footer__logo"
        style="aspect-ratio: 65/31"
        loading="lazy" />

      <div class="regulatory-footer__disclaimer">
        <div class="regulatory-footer__text regulatory-footer__text--portrait">
          <span class="atw:block atw:break-words atw:max-w-full"
            >21+ | ΑΡΜΟΔΙΟΣ ΡΥΘΜΙΣΤΗΣ ΕΕΕΠ | ΚΙΝΔΥΝΟΣ ΕΘΙΣΜΟΥ &</span
          >
          <span class="regulatory-footer__line">ΑΠΩΛΕΙΑΣ ΠΕΡΙΟΥΣΙΑΣ | ΓΡΑΜΜΗ ΒΟΗΘΕΙΑΣ ΚΕΘΕΑ: 1114 | ΠΑΙΞΕ</span>
          <span class="regulatory-footer__line">ΥΠΕΥΘΥΝΑ</span>
        </div>

        <div class="regulatory-footer__text atw:portrait:hidden atw:w-auto;">
          <span class="atw:block atw:break-words atw:max-w-full atw:whitespace-nowrap"
            >21+ | ΑΡΜΟΔΙΟΣ ΡΥΘΜΙΣΤΗΣ ΕΕΕΠ | ΚΙΝΔΥΝΟΣ ΕΘΙΣΜΟΥ & ΑΠΩΛΕΙΑΣ ΠΕΡΙΟΥΣΙΑΣ |</span
          >
          <span class="atw:block atw:break-words atw:max-w-full atw:whitespace-nowrap"
            >ΓΡΑΜΜΗ ΒΟΗΘΕΙΑΣ ΚΕΘΕΑ: 1114 | ΠΑΙΞΕ ΥΠΕΥΘΥΝΑ</span
          >
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.regulatory-footer {
  @apply atw:fixed atw:bottom-0 atw:left-0 atw:right-0 atw:z-40 atw:flex atw:items-center atw:justify-center atw:bg-[#00A1DD] atw:mt-10;
}

.regulatory-footer__inner {
  @apply atw:flex atw:items-center atw:portrait:ml-0;
}

.regulatory-footer__logo {
  @apply atw:h-[62px] atw:w-[130px] atw:shrink-0 atw:object-contain atw:mr-[60px];
}

.regulatory-footer__disclaimer {
  @apply atw:flex atw:flex-col atw:items-center atw:justify-center;
}

.regulatory-footer__text {
  @apply atw:text-center atw:text-[19px] atw:font-extralight atw:leading-[28px] atw:tracking-[0.95px] atw:text-white;
  font-family: Verdana, sans-serif;
}

.regulatory-footer__text--portrait {
  @apply atw:landscape:hidden atw:w-[780px] atw:max-w-[780px] atw:break-words;
}
</style>
