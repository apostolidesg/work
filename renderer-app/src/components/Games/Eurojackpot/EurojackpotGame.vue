<script setup>
import { ref } from 'vue';
import PlayAreaLayout from '@/components/Common/PlayAreaLayout.vue';
import EurojackpotPlayArea from './PlayArea/EurojackpotPlayArea.vue';
import EurojackpotSettings from './Settings/EurojackpotSettings.vue';
import EurojackpotSidescreen from './Sidescreen/EurojackpotSidescreen.vue';

const playAreaRef = ref(null);
</script>

<template>
  <div id="eurojackpot">
    <PlayAreaLayout>
      <template #settings>
        <div class="eurojackpot__settings">
          <EurojackpotSettings />
        </div>
      </template>

      <div class="eurojackpot__play-area">
        <EurojackpotPlayArea ref="playAreaRef" />
      </div>

      <template #sidescreen>
        <div class="eurojackpot__sidescreen">
          <EurojackpotSidescreen />
        </div>
      </template>
    </PlayAreaLayout>
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";

#eurojackpot {
  @apply atw:w-full atw:h-full;
}

.eurojackpot__settings {
  @apply atw:h-full;
}

.eurojackpot__play-area {
  @apply atw:h-full atw:py-4 atw:px-5;
  background: var(--ejp-gradient-dark);
}

.eurojackpot__sidescreen {
  @apply atw:h-full;
}
</style>
