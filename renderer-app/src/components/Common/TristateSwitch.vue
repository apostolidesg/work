<script setup>
import { computed } from 'vue';

const DEFAULT_CONFIG = {
  rail_width: 90,
  rail_height: 30,
  handle_width: 40,
  rail_color: '#241f1a',
  handle_color: '#eadcc0',
  label_color: '#eadcc0',
};

const props = defineProps({
  config: {
    type: Object,
    default: () => ({}),
  },
  options: {
    type: Array,
    required: true,
  },
  leftLabel: {
    type: String,
    default: null,
  },
  rightLabel: {
    type: String,
    default: null,
  },
  modelValue: {
    type: [Boolean, String, Number],
    default: null,
  },
});

const emit = defineEmits(['update:modelValue']);

const mergedConfig = computed(() => ({ ...DEFAULT_CONFIG, ...props.config }));

const cssVars = computed(() => ({
  '--rail-width': `${mergedConfig.value.rail_width}px`,
  '--rail-height': `${mergedConfig.value.rail_height}px`,
  '--handle-width': `${mergedConfig.value.handle_width}px`,
  '--rail-color': mergedConfig.value.rail_color,
  '--handle-color': mergedConfig.value.handle_color,
  '--label-color': mergedConfig.value.label_color,
}));

const railClass = computed(() => ({
  'tristate-switch__rail': true,
  'tristate-switch__rail--left': props.modelValue === props.options[0],
  'tristate-switch__rail--middle': props.modelValue === props.options[1],
  'tristate-switch__rail--right': props.modelValue === props.options[2],
}));

const leftRightOptionWidth = computed(() => (mergedConfig.value.rail_width - mergedConfig.value.handle_width) / 2);

const isLeftSelected = computed(() => props.modelValue === props.options[0]);
const isRightSelected = computed(() => props.modelValue === props.options[2]);

function handleClick(event) {
  const { offsetX } = event;
  if (offsetX < leftRightOptionWidth.value) {
    emit('update:modelValue', props.options[0]);
  } else if (offsetX <= leftRightOptionWidth.value + mergedConfig.value.handle_width) {
    emit('update:modelValue', props.options[1]);
  } else {
    emit('update:modelValue', props.options[2]);
  }
}

function handleLabelClick(index) {
  emit('update:modelValue', props.options[index]);
}
</script>

<template>
  <div class="tristate-switch" :style="cssVars">
    <div
      v-if="leftLabel"
      class="tristate-switch__label"
      :class="{ 'tristate-switch__label--active': isLeftSelected }"
      @click="handleLabelClick(0)">
      {{ leftLabel }}
    </div>
    <div :class="railClass" @click="handleClick($event)"></div>
    <div
      v-if="rightLabel"
      class="tristate-switch__label"
      :class="{ 'tristate-switch__label--active': isRightSelected }"
      @click="handleLabelClick(2)">
      {{ rightLabel }}
    </div>
  </div>
</template>

<style scoped>
.tristate-switch {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: min-content;
}

.tristate-switch__rail {
  width: var(--rail-width);
  height: var(--rail-height);
  border-radius: 100px;
  background-color: var(--rail-color);
  position: relative;
  cursor: pointer;
}

.tristate-switch__rail::after {
  content: '';
  position: absolute;
  top: calc((var(--rail-height) - var(--handle-width)) / 2);
  left: 0;
  width: var(--handle-width);
  height: var(--handle-width);
  border-radius: 100px;
  background-color: var(--handle-color);
  transition: left 0.2s ease-in-out;
}

.tristate-switch__rail--left::after {
  left: 0;
}

.tristate-switch__rail--middle::after {
  left: calc((var(--rail-width) - var(--handle-width)) / 2);
}

.tristate-switch__rail--right::after {
  left: calc(var(--rail-width) - var(--handle-width));
}

.tristate-switch__label {
  font-size: 13.5px;
  font-weight: 900;
  font-family: 'Roboto', sans-serif;
  color: var(--label-color);
  opacity: 50%;
  margin: 0 10px;
  transition: opacity 0.2s ease-in-out;
  cursor: pointer;
  user-select: none;
}

.tristate-switch__label--active {
  opacity: 100%;
}

.tristate-switch__label:first-child {
  margin-left: 0;
}

.tristate-switch__label:last-child {
  margin-right: 0;
}
</style>
