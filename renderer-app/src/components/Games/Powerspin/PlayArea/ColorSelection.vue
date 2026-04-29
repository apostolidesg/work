<script setup>
import RoundedBorderedButton from '@/components/Common/RoundedBorderedButton.vue';

const props = defineProps({
  colorsSelected: {
    type: Array,
    required: true,
  },
  textTheme: {
    type: String,
    default: 'white',
    validator: (value) => ['black', 'white'].includes(value),
  },
  shrink: {
    type: Boolean,
    default: false,
  },
  wheelIndex: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(['color-clicked']);

const selections = ['red', 'green', 'blue'];

const colorLabels = {
  red: 'ΚΟΚΚΙΝΗ',
  green: 'ΠΡΑΣΙΝΗ',
  blue: 'ΜΠΛΕ',
};

function isColorSelected(color) {
  return props.colorsSelected.includes(color);
}

function handleClick(color) {
  emit('color-clicked', color);
}
</script>

<template>
  <div class="color-selection" :class="{ 'color-selection--shrinked': shrink }">
    <RoundedBorderedButton
      v-for="selection in selections"
      :id="`option-${selection}-${wheelIndex}`"
      :key="selection"
      :value="colorLabels[selection]"
      :theme="selection"
      :active="isColorSelected(selection)"
      :text-theme="textTheme"
      view="pill"
      class="color-selection__btn"
      :shrink="shrink"
      @click="handleClick(selection)" />
  </div>
</template>

<style scoped>
.color-selection {
  display: flex;
  max-width: calc(3 * 170px + 10px);
  width: 100%;
}

.color-selection__btn {
  flex: 1;
  margin: 0 4px;
}

.color-selection--shrinked {
  width: 90%;
}

.color-selection--shrinked :deep(.rounded-bordered-button__button-pill) {
  padding: 22px 0;
}
</style>
