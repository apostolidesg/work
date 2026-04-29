<script setup>
import { computed } from 'vue';

const props = defineProps({
  active: {
    required: true,
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['click']);

const buttonActiveClass = computed(() => {
  return props.active ? 'button_active' : 'button_inactive';
});

function handleClick() {
  emit('click');
}
</script>

<template>
  <button class="markets-button" :class="buttonActiveClass" @click="handleClick">
    <span class="markets-button__text"> ΕΠΙΠΛΕΟΝ ΑΓΟΡΕΣ </span>
  </button>
</template>

<style scoped>
.markets-button {
  border: 2px solid rgba(204, 185, 116, 1);
  width: 200px;
  border-radius: 20px;
  font-weight: 900;
  font-size: 27px;
  padding: 10px;
  line-height: 32px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  cursor: pointer;
}

.button_active {
  background: linear-gradient(102.71deg, #ccb974 -0.1%, #ccb974 21.26%, #ecdeb4 42.09%, #bfa33f 66.05%, #bfa33f 99.9%);
}

.button_inactive {
  background: #ffffff;
}

.markets-button__text {
  color: #000000;
  text-shadow:
    1px 1px 0 rgba(204, 185, 116, 0.8),
    -1px 1px 0 rgba(204, 185, 116, 0.8),
    1px -1px 0 rgba(204, 185, 116, 0.8),
    -1px -1px 0 rgba(204, 185, 116, 0.8),
    -1px 0 0 rgba(236, 222, 180, 0.8),
    1px 0 0 rgba(236, 222, 180, 0.8),
    0 1px 0 rgba(191, 163, 63, 0.8),
    0 -1px 0 rgba(191, 163, 63, 0.8);
}
</style>
