<script setup>
import RoundedBorderedButton from '@/components/Common/RoundedBorderedButton.vue';

const props = defineProps({
  selectedValues: {
    type: Array,
    default: () => [],
  },
  textTheme: {
    type: String,
    default: 'black',
    validator: (value) => ['black', 'white'].includes(value),
  },
});

const emit = defineEmits(['option-selected']);

const options = [
  { label: 'over', value: 'o' },
  { label: 'under', value: 'u' },
];

const threshold = 12.5;

function isOptionSelected(option) {
  return props.selectedValues.includes(option);
}

function handleClick(option) {
  emit('option-selected', option);
}
</script>

<template>
  <div class="under-over">
    <div
      v-for="option in options"
      :key="option.label"
      class="under-over__item"
      :class="`under-over__item--text-${textTheme}`">
      <RoundedBorderedButton
        theme="magenta"
        :active="isOptionSelected(option.value)"
        :class="`under-over__rounded-bordered-button--${option.value}`"
        class="mr-2"
        @click="handleClick(option.value)" />
      <span :class="`under-over__rounded-bordered-label--${option.label}`">{{
        `${option.label.toUpperCase()} ${threshold}`
      }}</span>
    </div>
  </div>
</template>

<style scoped>
.under-over {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  max-width: 400px;
  width: 100%;
}

.under-over__item {
  display: flex;
  align-items: center;
  font-weight: 900;
  font-size: 16px;
}

.under-over__item--text-black {
  color: var(--black);
}

.under-over__item--text-white {
  color: var(--white);
}

.mr-2 {
  margin-right: 8px;
}
</style>
