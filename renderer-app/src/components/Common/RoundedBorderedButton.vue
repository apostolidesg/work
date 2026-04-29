<script setup>
import { computed } from 'vue';

const props = defineProps({
  view: {
    type: String,
    default: 'circle',
    validator: (value) => ['circle', 'pill'].includes(value),
  },
  theme: {
    type: String,
    required: true,
    validator: (value) => ['blue', 'red', 'green', 'magenta'].includes(value),
  },
  value: {
    type: [Number, String],
    default: '',
  },
  active: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  textTheme: {
    type: String,
    default: 'white',
    validator: (value) => ['white', 'black', 'magenta'].includes(value),
  },
});

const emit = defineEmits(['click']);

const activeThemeClass = computed(() => {
  return props.active ? `rounded-bordered-button--${props.theme}-active` : '';
});

function handleClick() {
  emit('click');
}
</script>

<template>
  <div class="rounded-bordered-button" :class="`rounded-bordered-button--text-${textTheme}`">
    <div v-if="title" class="rounded-bordered-button__title">
      {{ title }}
    </div>
    <button
      class="rounded-bordered-button__button"
      :class="[`rounded-bordered-button__button-${view}`, `rounded-bordered-button--${theme}`, activeThemeClass]"
      @click="handleClick">
      {{ value }}
    </button>
  </div>
</template>

<style scoped>
.rounded-bordered-button {
  font-weight: 900;
  font-size: 15.22px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.rounded-bordered-button__title {
  margin-bottom: 8px;
}

.rounded-bordered-button__button {
  font-weight: inherit;
  color: inherit;
  background: transparent;
  border: 2px solid;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rounded-bordered-button__button-circle {
  border-radius: 9999px;
  width: 39px;
  height: 39px;
}

.rounded-bordered-button__button-pill {
  padding: 22px 40px;
  text-align: center;
  display: inline-block;
  border-radius: 50px;
  align-self: stretch;
}

.rounded-bordered-button--text-white {
  color: var(--white);
}

.rounded-bordered-button--text-black {
  color: var(--black);
}

.rounded-bordered-button--text-magenta {
  color: var(--magenta);
}

.rounded-bordered-button--blue {
  border-color: var(--blue);
}

.rounded-bordered-button--blue-active {
  background: var(--blue);
  transition: 0.35s ease-in-out;
}

.rounded-bordered-button--red {
  border-color: var(--red);
}

.rounded-bordered-button--red-active {
  background: var(--red);
  transition: 0.35s ease-in-out;
}

.rounded-bordered-button--green {
  border-color: var(--green);
}

.rounded-bordered-button--green-active {
  background: var(--green);
  transition: 0.35s ease-in-out;
}

.rounded-bordered-button--magenta {
  border-color: var(--magenta);
}

.rounded-bordered-button--magenta-active {
  background: var(--magenta);
  color: var(--white);
  transition: 0.35s ease-in-out;
}
</style>
