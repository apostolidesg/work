<script setup>
import { computed } from 'vue';
import TzokerSlipContent from './TzokerSlipContent.vue';

const GAME_COMPONENTS = {
  tzoker: TzokerSlipContent,
  eurojackpot: null,
};

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
  modalHeight: {
    type: Number,
    default: null,
  },
  isPortrait: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['close', 'confirm']);

const activeComponent = computed(() => GAME_COMPONENTS[props.gameType] ?? null);

const handleSubmit = (payload) => emit('confirm', payload);
</script>

<template>
  <div class="quickplay-modal-content" :style="modalHeight ? { height: `${modalHeight}px` } : {}">
    <component
      :is="activeComponent"
      v-if="activeComponent && amount != null"
      :slip-amount="amount"
      :columns="columns"
      :index="index"
      :orientation="orientation"
      :modal-height="modalHeight"
      :is-portrait="isPortrait"
      @submit="handleSubmit"
      @close="emit('close')" />
  </div>
</template>

<style>
@reference "@/assets/css/global.css";

.quickplay-modal-content {
  @apply atw:flex atw:flex-col atw:w-full atw:overflow-hidden atw:rounded-3xl atw:relative;
}
</style>
