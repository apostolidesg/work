<script setup>
import { computed } from 'vue';
import { useConfigText } from '@/composables/useConfigText';
import { faInfo, faCheck, faTimes, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { faBarcodeScan } from '@fortawesome/pro-regular-svg-icons';

const { tConfig } = useConfigText();

const props = defineProps({
  message: {
    type: Object,
    default: () => ({ translationLabel: '', params: null }),
  },
  icon: {
    type: String,
    default: '',
  },
});

const icons = { info: faInfo, check: faCheck, times: faTimes, question: faQuestion, barcodeScan: faBarcodeScan };
const getIcon = computed(() => icons[props.icon]);

const getMessage = computed(() => {
  const { translationLabel = '', params = null } = props.message || {};
  return tConfig(translationLabel, params);
});
</script>

<template>
  <div class="modal-body">
    <div v-if="icon" class="modal-body__icon">
      <FontAwesomeIcon :icon="getIcon" class="atw:text-4xl" />
    </div>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <p :class="icon ? 'atw:w-3/4' : 'atw:w-full'" v-html="getMessage"></p>
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.modal-body {
  @apply atw:p-4 atw:flex atw:gap-5 atw:justify-center atw:items-center;
}

.modal-body__icon {
  @apply atw:flex atw:justify-center atw:items-center atw:size-16 atw:border-2 atw:rounded-full;
}
</style>
