<script setup>
import { computed } from 'vue';

const props = defineProps({
  hasWheel: {
    type: Boolean,
    required: true,
  },
  showNext: {
    type: Boolean,
    required: true,
  },
  isLast: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['arrow-click']);

const showArrow = computed(() => props.showNext || (props.isLast && props.hasWheel));

function handleArrowClick() {
  emit('arrow-click');
}
</script>

<template>
  <div
    class="powerspin-stepper-item"
    :class="[
      { 'powerspin-stepper-item--active': hasWheel && showNext },
      { 'powerspin-stepper-item--filled': hasWheel && !showNext },
    ]">
    <div class="powerspin-stepper-item__img">
      <slot></slot>
    </div>
    <div class="powerspin-stepper-item__back-btn" :class="[{ 'powerspin-stepper-item__back-btn--last': isLast }]">
      <svg v-if="showArrow" viewBox="0 0 320 512" class="powerspin-stepper-item__caret" @click="handleArrowClick">
        <path
          fill="currentColor"
          d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
          transform="rotate(-90 160 256)" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.powerspin-stepper-item {
  @apply atw:flex atw:flex-1 atw:items-center;
}

.powerspin-stepper-item--active,
.powerspin-stepper-item--filled {
  background: linear-gradient(180deg, #17277c 0%, #1b2f9e 15.1%, #1b2f9e 85.42%, #17277c 100%);
}

.powerspin-stepper-item--active {
  border-radius: 0 83px 83px 0;
}

.powerspin-stepper-item__img {
  @apply atw:flex atw:flex-1 atw:justify-center;
}

.powerspin-stepper-item__back-btn {
  margin: 10px;
  width: 12px;
  font-size: 30px;
  color: #bfd6e3;
}

.powerspin-stepper-item__back-btn--last {
  transform: rotate(180deg);
}

.powerspin-stepper-item__caret {
  @apply atw:w-3 atw:h-8 atw:cursor-pointer;
}
</style>
