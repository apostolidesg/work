<template>
  <div class="draw-count-down">
    <div class="draw-count-down__title">{{ $t('eurojackpot.salesClose') }}</div>
    <div class="draw-count-down__wrapper">
      <div class="draw-count-down__days">
        <div class="draw-count-down__days-number">{{ days | leadingZero }}</div>
        <div class="draw-count-down__days-text">{{ $t(`eurojackpot.${days === 1 ? 'day' : 'days'}`) }}</div>
      </div>
      <div class="draw-count-down__hours">
        <div class="draw-count-down__hours-number">{{ hours | leadingZero }}</div>
        <div class="draw-count-down__hours-text">{{ $t(`eurojackpot.${hours === 1 ? 'hour' : 'hours'}`) }}</div>
      </div>
      <div class="draw-count-down__minutes">
        <div class="draw-count-down__minutes-number">{{ minutes | leadingZero }}</div>
        <div class="draw-count-down__minutes-text">{{ $t(`eurojackpot.${minutes === 1 ? 'minute' : 'minutes'}`) }}</div>
      </div>
      <div class="draw-count-down__seconds">
        <div class="draw-count-down__seconds-number">{{ seconds | leadingZero }}</div>
        <div class="draw-count-down__seconds-text">{{ $t(`eurojackpot.${seconds === 1 ? 'second' : 'seconds'}`) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  name: 'DrawCountDown',
  props: {
    date: {
      type: Date,
      required: true,
    },
  },
  data() {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  },
  created() {
    this.updateCountDown();
    this.timeout = setInterval(this.updateCountDown, 1000);
  },
  beforeDestroy() {
    this.timeout && clearInterval(this.timeout);
  },
  filters: {
    leadingZero(value) {
      return value < 10 ? `0${value}` : value;
    },
  },
  methods: {
    updateCountDown() {
      this.days = dayjs(this.date).diff(dayjs(), 'day');
      this.hours = dayjs(this.date).diff(dayjs(), 'hour') - this.days * 24;
      this.minutes = dayjs(this.date).diff(dayjs(), 'minute') - this.days * 24 * 60 - this.hours * 60;
      this.seconds =
        dayjs(this.date).diff(dayjs(), 'second') - this.days * 24 * 60 * 60 - this.hours * 60 * 60 - this.minutes * 60;
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../../../../scss-utils/eurojackpot/colors';

.draw-count-down {
  &__title {
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: 900;
    color: $color-primary-black;
    margin-bottom: 5px;
    text-align: center;
    line-height: 16px;
  }

  &__wrapper {
    display: flex;
    justify-content: space-between;

    & > *:not(:last-child) {
      margin-right: 10px;
    }
  }

  &__days,
  &__hours,
  &__minutes,
  &__seconds {
    background: white;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
  }

  &__days-number,
  &__hours-number,
  &__minutes-number,
  &__seconds-number {
    font-family: 'Roboto', sans-serif;
    font-size: 26px;
    font-weight: 900;
    line-height: 26px;
    color: $color-primary-black;
  }

  &__days-text,
  &__hours-text,
  &__minutes-text,
  &__seconds-text {
    margin-top: 3px;
    font-family: 'Roboto', sans-serif;
    font-size: 10px;
    font-weight: 900;
    line-height: 14px;
    color: $color-primary-black;
  }
}
</style>
