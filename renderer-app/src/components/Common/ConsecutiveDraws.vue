<script setup>
import { getCurrentInstance } from 'vue';
import MinusPlusButton from './MinusPlusButton.vue';

const props = defineProps({
  modelValue: {
    type: Number,
    default: 1,
  },
  theme: {
    type: String,
    default: 'light',
    validator: (value) => ['light', 'dark'].includes(value),
  },
  min: {
    type: Number,
    default: 1,
  },
  max: {
    type: Number,
    default: 52,
  },
});

const emit = defineEmits(['update:modelValue']);

const instance = getCurrentInstance();
const t = (key) => instance?.proxy?.$t(key) ?? key;

const increaseConsecutiveDraws = () => {
  if (props.modelValue < props.max) {
    emit('update:modelValue', props.modelValue + 1);
  }
};

const decreaseConsecutiveDraws = () => {
  if (props.modelValue > props.min) {
    emit('update:modelValue', props.modelValue - 1);
  }
};
</script>

<template>
  <div class="consecutive-draws">
    <div class="consecutive-draws__wrapper">
      <div class="consecutive-draws__multiplier">
        <div class="consecutive-draws__header" :class="`consecutive-draws__header--${theme}`">
          {{ t('consDraws') }}
        </div>
        <div class="consecutive-draws__controls">
          <input
            id="consecutive-draws-input"
            class="consecutive-draws__input"
            :class="`consecutive-draws__input--${theme}`"
            type="text"
            readonly
            :value="modelValue" />
          <MinusPlusButton type="minus" :theme="theme" @click="decreaseConsecutiveDraws" />
          <MinusPlusButton type="plus" :theme="theme" @click="increaseConsecutiveDraws" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.consecutive-draws {
  @apply atw:relative atw:flex atw:flex-wrap atw:mb-1;
}

.consecutive-draws__wrapper {
  @apply atw:w-full atw:max-w-full;
  flex: 0 0 100%;
}

.consecutive-draws__multiplier {
  @apply atw:flex atw:justify-center atw:items-center;
}

.consecutive-draws__header {
  width: 120px;
  font-size: 13.36px;
  font-weight: 900;
  font-family: 'Roboto', sans-serif;
  vertical-align: bottom;
}

.consecutive-draws__header--light {
  color: rgba(255, 255, 255, 0.7);
}

.consecutive-draws__header--dark {
  color: var(--ejp-color-secondary-brown);
}

.consecutive-draws__controls {
  @apply atw:inline-flex atw:items-center atw:text-center;
}

.consecutive-draws__input {
  @apply atw:m-0 atw:border-none atw:cursor-pointer atw:text-center;
  border-radius: 7px;
  width: 133px;
  height: 44px;
  font-weight: 900;
  font-size: 23px;
  font-family: 'Roboto', sans-serif;
}

.consecutive-draws__input--light {
  background-color: rgba(255, 255, 255, 0.7);
  color: var(--color-primary-black);
}

.consecutive-draws__input--dark {
  @apply atw:bg-white;
  color: var(--color-primary-black);
}
</style>
