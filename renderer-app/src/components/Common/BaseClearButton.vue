<script setup>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faTrashAlt);

defineProps({
  theme: {
    type: String,
    default: 'white',
    validator: (value) => ['black', 'white', 'yellow', 'clear-white'].includes(value),
  },
  topLabel: {
    type: String,
    default: null,
  },
  bottomLabel: {
    type: String,
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['click']);
</script>

<template>
  <div class="base-clear-button">
    <span v-if="topLabel" class="base-clear-button__top-label" :class="`base-clear-button__top-label--${theme}`">
      {{ topLabel }}
    </span>
    <button
      class="base-clear-button__btn"
      :class="[`base-clear-button__btn--${theme}`, { 'base-clear-button__btn--disabled': disabled }]"
      :disabled="disabled"
      @click.stop="$emit('click')">
      <span class="base-clear-button__trash" :class="`base-clear-button__trash--${theme}`">
        <FontAwesomeIcon :icon="['far', 'trash-alt']" />
      </span>
      <span
        v-if="bottomLabel"
        class="base-clear-button__bottom-label"
        :class="`base-clear-button__bottom-label--${theme}`">
        {{ bottomLabel }}
      </span>
    </button>
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.base-clear-button {
  @apply atw:flex atw:flex-col atw:items-center;
}

.base-clear-button__top-label {
  @apply atw:block atw:text-center atw:mb-1;
  font-size: 12px;
  font-weight: 900;
  font-family: 'Roboto', sans-serif;
}

.base-clear-button__top-label--white {
  color: rgba(255, 255, 255, 0.7);
}

.base-clear-button__top-label--clear-white {
  @apply atw:text-white;
}

.base-clear-button__top-label--yellow {
  color: #fae291;
}

.base-clear-button__top-label--black {
  color: rgba(0, 0, 0, 0.6);
}

.base-clear-button__btn {
  @apply atw:flex atw:flex-col atw:items-center atw:bg-transparent atw:border-none atw:cursor-pointer atw:text-center;
  gap: 4px;
  min-width: 50px;
}

.base-clear-button__btn--disabled {
  @apply atw:cursor-not-allowed;
  opacity: 0.4;
}

.base-clear-button__trash {
  font-size: 30px;
  line-height: 1;
}

.base-clear-button__trash--white {
  color: rgba(255, 255, 255, 0.7);
}

.base-clear-button__trash--clear-white {
  @apply atw:text-white;
}

.base-clear-button__trash--yellow {
  color: #fae291;
}

.base-clear-button__trash--black {
  color: rgba(0, 0, 0, 0.6);
}

.base-clear-button__bottom-label {
  font-weight: 900;
  line-height: 1.2;
  font-size: 11px;
  font-family: 'Roboto', sans-serif;
}

.base-clear-button__bottom-label--white {
  color: rgba(255, 255, 255, 0.7);
}

.base-clear-button__bottom-label--clear-white {
  @apply atw:text-white;
}

.base-clear-button__bottom-label--yellow {
  color: #fae291;
}

.base-clear-button__bottom-label--black {
  color: rgba(0, 0, 0, 0.6);
}
</style>
