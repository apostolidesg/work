<script setup>
import { computed } from 'vue';
import BaseModal from '../../modals/BaseModal.vue';
import QuickPlayModalContent from './QuickPlayModalContent.vue';
import { useOrientation } from '@/composables/useOrientation';

const props = defineProps({
  gameType: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    default: null,
  },
  columns: {
    type: Number,
    default: 1,
  },
  index: {
    type: Number,
    default: 0,
  },
  orientation: {
    type: String,
    default: 'HORIZONTAL',
  },
  tzoker: {
    type: Number,
    default: null,
  },
});

const emit = defineEmits(['close', 'confirm']);

const { isVertical } = useOrientation();

const LANDSCAPE_MARGIN = 60;
const MODAL_WIDTH_QUICKPLAY_TZOKER = 550;
const BACKGROUND_OPACITY = 100;

const MODAL_HEIGHTS = {
  portrait: {
    tzoker20: 450,
    columns6: 1250,
    columns3: 700,
    default: 450,
  },
  landscape: {
    tzoker20: 450,
    columns6: 1450,
    columns3: 780,
    default: 450,
  },
};

const modalHeight = computed(() => {
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
  const maxH = vh - LANDSCAPE_MARGIN;
  const heights = isVertical.value ? MODAL_HEIGHTS.portrait : MODAL_HEIGHTS.landscape;

  if (props.tzoker >= 20) return Math.min(heights.tzoker20, maxH);
  if (props.columns >= 6) return Math.min(heights.columns6, maxH);
  if (props.columns >= 3) return Math.min(heights.columns3, maxH);
  return Math.min(heights.default, maxH);
});
</script>

<template>
  <BaseModal
    :width="MODAL_WIDTH_QUICKPLAY_TZOKER"
    :height="modalHeight"
    :padding="0"
    :background-opacity="BACKGROUND_OPACITY">
    <QuickPlayModalContent
      :game-type="gameType"
      :amount="amount"
      :columns="columns"
      :index="index"
      :orientation="orientation"
      :modal-height="modalHeight"
      :is-portrait="isVertical"
      @close="emit('close')"
      @confirm="emit('confirm', $event)" />
  </BaseModal>
</template>
