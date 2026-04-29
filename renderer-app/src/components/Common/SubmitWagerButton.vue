<script setup>
import { ref, computed } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faInfoCircle);

const props = defineProps({
  cost: {
    type: Number,
    default: 0,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['click']);

const showInfo = ref(false);

const formattedCost = computed(() => {
  return `${props.cost.toFixed(2)}€`;
});

const toggleInfo = () => {
  showInfo.value = !showInfo.value;
};

const handleClick = () => {
  if (!props.disabled) {
    emit('click');
  }
};
</script>

<template>
  <div class="submit-button">
    <div ref="placeBetInfoRef" class="submit-button__info" @click="toggleInfo">
      <i><FontAwesomeIcon icon="info-circle" /></i>
    </div>

    <div class="submit-button__content" :class="{ 'submit-button__content--disabled': disabled }" @click="handleClick">
      <div class="submit-button__text">
        <span>ΑΠΟΔΟΧΗ</span>
      </div>
      <div class="submit-button__cost">
        <div class="submit-button__cost-title">ΚΟΣΤΟΣ ΔΕΛΤΙΟΥ</div>
        <div class="submit-button__cost-value">{{ formattedCost }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.submit-button {
  @apply atw:flex atw:flex-row atw:relative atw:w-full atw:cursor-pointer;
  border-radius: 7px;
  background-color: var(--color-submit-green);
  height: 70px;
}

.submit-button__info {
  @apply atw:flex atw:items-center atw:justify-center atw:cursor-pointer atw:shrink-0;
  background-color: var(--color-submit-green-light);
  width: 34px;
  min-width: 34px;
  border-top-left-radius: 7px;
  border-bottom-left-radius: 7px;
  color: var(--color-primary-white);
}

.submit-button__info i {
  font-size: 18px;
}

.submit-button__content {
  @apply atw:flex atw:flex-row atw:items-center atw:flex-1 atw:h-full atw:min-w-0;
  padding: 0 10px;
}

.submit-button__content--disabled {
  @apply atw:cursor-not-allowed;
  opacity: 0.5;
}

.submit-button__text {
  @apply atw:flex-1 atw:text-center atw:flex atw:items-center atw:justify-center atw:min-w-0;
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  font-weight: 900;
  color: var(--color-primary-white);
}

.submit-button__cost {
  @apply atw:flex-1 atw:text-center atw:min-w-0;
  font-family: 'Roboto', sans-serif;
  color: #20303f;
  font-weight: 900;
}

.submit-button__cost-title {
  font-size: 10px;
  line-height: 1.4;
}

.submit-button__cost-value {
  font-size: 18px;
  color: var(--color-primary-white);
  font-weight: 700;
}
</style>
