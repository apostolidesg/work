<template>
  <div class="number-selection-layout">
    <div class="number-selection-layout__header">
      <span class="number-selection-layout__header-prefix">
        <slot name="titlePrefix" />
      </span>
      <span class="number-selection-layout__header-numbers">
        <slot name="titleNumbers" />
      </span>
    </div>
    <div class="number-selection-layout__number-wrapper">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.number-selection-layout__header {
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  font-weight: 900;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.number-selection-layout__header-prefix {
  color: white;
}

.number-selection-layout__header-numbers {
  color: var(--fireblaze-color-third-yellow);
}

.number-selection-layout__number-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 1em;
}
</style>
