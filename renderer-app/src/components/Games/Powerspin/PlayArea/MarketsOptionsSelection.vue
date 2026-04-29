<script setup>
import { computed } from 'vue';
import RoundedBorderedButton from '@/components/Common/RoundedBorderedButton.vue';

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  optionsSelected: {
    type: Array,
    default: () => [],
  },
  theme: {
    type: String,
    default: 'light',
    validator: (value) => ['light', 'dark'].includes(value),
  },
});

const emit = defineEmits(['option-clicked']);

const textTheme = computed(() => {
  return props.theme === 'light' ? 'magenta' : 'white';
});

function handleSelection(value) {
  emit('option-clicked', value);
}

function isOptionSelected(value) {
  return props.optionsSelected.includes(value);
}
</script>

<template>
  <div class="markets-options-selection">
    <RoundedBorderedButton
      v-for="{ value, title } in options"
      :key="value"
      :id="`option-markets-${value}`"
      theme="magenta"
      :text-theme="textTheme"
      :active="isOptionSelected(value)"
      :value="title"
      view="pill"
      class="markets-options-selection__btn"
      @click="handleSelection(value)" />
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.markets-options-selection {
  @apply atw:flex atw:flex-row atw:gap-4;
}

.markets-options-selection__btn {
  width: 280px;
  padding: 0 5px;
}
</style>
