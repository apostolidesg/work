<script setup>
import { computed } from 'vue';
import { useConfiguration } from '@/composables/useConfiguration';
import { useOrientation } from '@/composables/useOrientation';
import { useI18nPlugin } from '@unify/vuex-i18n';

const { appConfig } = useConfiguration();
const { orientation } = useOrientation();
const i18n = useI18nPlugin();

const mediaUrl = computed(() => {
  return appConfig.value.IDLE_SCREEN[orientation.value].MEDIA_URL[i18n.locale()];
});

const isVideo = computed(() => {
  const url = mediaUrl.value || '';
  const path = url.split('?')[0].split('#')[0];
  const ext = path.includes('.') ? path.slice(path.lastIndexOf('.') + 1).toLowerCase() : '';
  return ['mp4', 'webm', 'ogg', 'mov', 'm4v'].includes(ext);
});
</script>
<template>
  <div class="atw:fixed atw:inset-0 atw:z-60 atw:pointer-events-none">
    <video
      v-if="mediaUrl && isVideo"
      :src="mediaUrl"
      autoplay
      muted
      loop
      playsinline
      class="atw:w-full atw:h-full atw:object-cover"></video>
    <img v-else-if="mediaUrl" :src="mediaUrl" class="atw:w-full atw:h-full atw:object-cover" />
  </div>
</template>
