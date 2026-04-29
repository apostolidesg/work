<template>
  <div class="euro-jackpot-sales-stopped">
    {{ $t('eurojackpot.salesStopped') }}
  </div>
</template>

<script>
export default {
  name: 'EurojackpotSalesStop',
};
</script>

<style scoped lang="scss">
@import '../../../../../scss-utils/eurojackpot/colors';

.euro-jackpot-sales-stopped {
  color: #000;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  font-weight: 900;
  line-height: 14px;
  height: 50px;
  width: 300px;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  background: transparent;
  border: solid 3px #000;
  border-radius: 10px;
  box-shadow: -1px 2px 5px 0px #000;
}
</style>
