<script setup>
defineProps({
  active: {
    type: Boolean,
    required: true,
  },
  showStatistics: {
    type: Boolean,
    required: true,
  },
});

defineEmits(['click']);
</script>

<template>
  <div class="fireblaze-numbers-wrapper">
    <button
      class="fireblaze-number-button"
      :class="{ 'fireblaze-number-button--active': active }"
      @click="$emit('click')">
      <span class="fireblaze-number-button__number"><slot></slot></span>
      <span v-if="showStatistics" class="fireblaze-number-button__stat"><slot name="stats"></slot></span>
    </button>
  </div>
</template>

<style scoped>
.fireblaze-number-button {
  width: 74px;
  height: 74px;
  border: none;
  border-radius: 50%;
  position: relative;
  z-index: 1;
  background: var(--fireblaze-gradient-dark-pink);
  color: var(--fireblaze-color-third-pink);
  cursor: pointer;
}

.fireblaze-number-button::before {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  right: 3px;
  bottom: 3px;
  border-radius: 50%;
  background: var(--fireblaze-color-primary-white);
  z-index: -1;
}

.fireblaze-number-button--active {
  color: var(--fireblaze-color-primary-white);
  background: var(--fireblaze-gradient-light-gold);
}

.fireblaze-number-button--active::before {
  background: var(--fireblaze-gradient-dark-pink);
}

.fireblaze-number-button__number {
  font-family: 'Roboto', sans-serif;
  font-size: 30px;
  font-weight: 900;
  line-height: 35px;
  letter-spacing: 0;
  text-align: center;
}

.fireblaze-number-button__stat {
  border: solid 1px var(--fireblaze-color-third-dark-red);
  border-radius: 50%;
  position: absolute;
  top: 0;
  right: 0;
  color: var(--fireblaze-color-third-dark-red);
  background-color: white;
  width: 27px;
  height: 27px;
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
