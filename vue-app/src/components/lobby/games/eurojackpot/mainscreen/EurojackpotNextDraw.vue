<template>
  <div class="euro-jackpot-next-draw">
    <div class="euro-jackpot-next-draw--content">
      <div
        v-if="daysUntilNextDraw > 0"
        v-html="formattedMessage"
        class="euro-jackpot-next-draw--content__title-days"
      ></div>
      <div v-else class="euro-jackpot-next-draw--content__title-today">
        {{ this.$t('eurojackpot.todayDraw') }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EurojackpotNextDraw',
  props: {
    daysUntilNextDraw: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    formattedMessage() {
      const localizedMessage = this.$t('eurojackpot.nextDrawInDays');
      const dynamicValue = this.daysUntilNextDraw;

      const styledDynamicValue = `<span style="font-size: 23px; font-weight: 900;">${dynamicValue}</span>`;
      return localizedMessage.replace('{days}', styledDynamicValue);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../../../scss-utils/eurojackpot/colors';

.euro-jackpot-next-draw {
  width: 235px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 5px solid $color-primary-gold;
  border-radius: 20px;
  background: radial-gradient(870% 142% at 0% 0%, #fcd918 0%, #fccb17 100%);
  &--content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    &__title-days {
      color: $color-secondary-black;
      font-size: 14px;
      font-weight: 400;
    }
    &__title-today {
      color: $color-secondary-black;
      font-size: 20px;
      font-weight: 900;
    }
  }
}
</style>
