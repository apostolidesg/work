<script setup>
defineProps({
  theme: {
    type: String,
    default: 'blue',
    validator: (value) => ['blue'].includes(value),
  },
});

const emit = defineEmits(['random-button-clicked']);

function handleClick() {
  emit('random-button-clicked');
}
</script>

<template>
  <div class="random-button" :class="`random-button--${theme}`" @click="handleClick">
    <div class="random-button__text">ΤΥΧΑΙΑ ΕΠΙΛΟΓΗ</div>
  </div>
</template>

<style scoped>
.random-button {
  width: 169px;
  height: 39px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.random-button--blue {
  background: var(--gradient-blue);
  border: 1px solid var(--magenta);
}

.random-button__text {
  color: var(--white);
  font-size: 15.22px;
  font-weight: 400;
}
</style>
