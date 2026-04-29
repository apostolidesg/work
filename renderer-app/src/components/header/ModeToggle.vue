<script setup>
import { computed } from 'vue';
import { useI18nPlugin } from '@unify/vuex-i18n';
const { translate: t } = useI18nPlugin();

defineProps({
  modelValue: {
    type: String,
    default: 'easy',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue', 'pro-mode-click']);

const modeOptions = computed(() => [
  { value: 'easy', label: t('mode.easy') },
  { value: 'pro', label: t('mode.pro') },
]);

const handleClick = (mode) => {
  if (mode === 'pro') {
    emit('pro-mode-click');
  } else {
    emit('update:modelValue', mode);
  }
};
</script>

<template>
  <div class="mode-toggle">
    <div class="mode-toggle__track" role="group" aria-label="Mode selection">
      <button
        v-for="option in modeOptions"
        :key="option.value"
        type="button"
        class="mode-toggle__option"
        :class="[
          modelValue === option.value ? 'mode-toggle__option--active' : 'mode-toggle__option--inactive',
          { 'mode-toggle__option--disabled': disabled },
        ]"
        :aria-pressed="modelValue === option.value"
        :aria-label="`Switch to ${option.label}`"
        @click="handleClick(option.value)">
        {{ option.label }}
      </button>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.mode-toggle {
  @apply atw:hidden atw:landscape:flex atw:items-center atw:justify-center atw:bg-white/20 atw:rounded-4xl atw:ml-8;
}

.mode-toggle__track {
  @apply atw:flex atw:items-center atw:gap-2 atw:rounded-[40px] atw:border atw:border-[#ECEDF0] atw:bg-transparent atw:py-1 atw:pl-1 atw:pr-4;
}

.mode-toggle__option {
  @apply atw:flex atw:items-center atw:justify-center atw:rounded-[40px] atw:border-none atw:px-4 atw:py-3 atw:text-[18px] atw:leading-[26.411px] atw:transition-all;
}

.mode-toggle__option--active {
  @apply atw:bg-[#ECEDF0] atw:text-[#1D4757];
}

.mode-toggle__option--inactive {
  @apply atw:bg-transparent atw:text-[#FDFDFD] atw:font-normal;
}

.mode-toggle__option--disabled {
  @apply atw:cursor-not-allowed;
}
</style>
