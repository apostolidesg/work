<script setup>
const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['input']);

function handleClick() {
  emit('input', !props.value);
}
</script>

<template>
  <img
    src="@/assets/powerspin/symbol.svg"
    class="powerspin-symbol"
    :class="{ 'powerspin-symbol--active': value }"
    alt="powerspin symbol"
    @click="handleClick" />
</template>

<style scoped>
.powerspin-symbol {
  border: 4px solid transparent;
  border-radius: 100%;
  height: 71px;
  width: 71px;
  cursor: pointer;
}

.powerspin-symbol--active {
  border-color: var(--magenta);
}
</style>
