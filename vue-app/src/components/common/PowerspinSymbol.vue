<template>
  <img
    src="../../assets/power-spin/symbol.svg"
    :class="['powerspin-symbol', { 'powerspin-symbol--active': value }]"
    @click="$emit('input', !value)"
    alt="powerspin symbol"
  />
</template>

<script>
export default {
  name: 'PowerspinSymbol',
  props: {
    value: { type: Boolean },
  },
};
</script>

<style scoped>
.powerspin-symbol {
  border: 4px solid transparent;
  border-radius: 100%;
  height: 71px;
  width: 71px;
}

.powerspin-symbol--active {
  border-color: var(--magenta);
}
</style>
