<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import dayjs from 'dayjs';

const props = defineProps({
  date: {
    type: Date,
    required: true,
  },
});

const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);

let timeout = null;

const leadingZero = (value) => {
  return value < 10 ? `0${value}` : value;
};

const updateCountDown = () => {
  days.value = dayjs(props.date).diff(dayjs(), 'day');
  hours.value = dayjs(props.date).diff(dayjs(), 'hour') - days.value * 24;
  minutes.value = dayjs(props.date).diff(dayjs(), 'minute') - days.value * 24 * 60 - hours.value * 60;
  seconds.value =
    dayjs(props.date).diff(dayjs(), 'second') - days.value * 24 * 60 * 60 - hours.value * 60 * 60 - minutes.value * 60;
};

onMounted(() => {
  updateCountDown();
  timeout = setInterval(updateCountDown, 1000);
});

onBeforeUnmount(() => {
  if (timeout) {
    clearInterval(timeout);
  }
});
</script>

<template>
  <div class="draw-count-down">
    <div class="draw-count-down__title">Χρόνος που απομένει για την κατάθεση δελτίων</div>
    <div class="draw-count-down__wrapper">
      <div class="draw-count-down__item">
        <div class="draw-count-down__number">{{ leadingZero(days) }}</div>
        <div class="draw-count-down__text">{{ days === 1 ? 'ημέρα' : 'ημέρες' }}</div>
      </div>
      <div class="draw-count-down__item">
        <div class="draw-count-down__number">{{ leadingZero(hours) }}</div>
        <div class="draw-count-down__text">{{ hours === 1 ? 'ώρα' : 'ώρες' }}</div>
      </div>
      <div class="draw-count-down__item">
        <div class="draw-count-down__number">{{ leadingZero(minutes) }}</div>
        <div class="draw-count-down__text">{{ minutes === 1 ? 'λεπτό' : 'λεπτά' }}</div>
      </div>
      <div class="draw-count-down__item">
        <div class="draw-count-down__number">{{ leadingZero(seconds) }}</div>
        <div class="draw-count-down__text">{{ seconds === 1 ? 'δευτερ.' : 'δευτερ.' }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.draw-count-down__title {
  @apply atw:text-center atw:mb-2;
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: var(--ejp-color-primary-black);
  line-height: 1.3;
}

.draw-count-down__wrapper {
  @apply atw:flex atw:justify-between;
  gap: 8px;
}

.draw-count-down__item {
  @apply atw:flex atw:flex-col atw:items-center atw:bg-white;
  border-radius: 5px;
  padding: 8px 10px;
  min-width: 50px;
}

.draw-count-down__number {
  font-family: 'Roboto', sans-serif;
  font-size: 24px;
  font-weight: 900;
  line-height: 1;
  color: var(--ejp-color-primary-black);
}

.draw-count-down__text {
  @apply atw:mt-1;
  font-family: 'Roboto', sans-serif;
  font-size: 9px;
  font-weight: 700;
  line-height: 1;
  color: var(--ejp-color-primary-black);
}
</style>
