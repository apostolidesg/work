<template>
  <button @click="switchApplication" class="lobby-header-digital-pay">{{ $t('noVoucherDeposit') }}</button>
</template>

<script>
import { HALApplicationTypes } from '@/constants/HALApplicationTypes';

export default {
  name: 'LobbyHeaderDigitalPay',
  methods: {
    switchApplication() {
      this.$eventHub.$emit('switchToApplicationOk', HALApplicationTypes.DIGITAL_PAY);
    },
  },
};
</script>

<style lang="scss" scoped>
.lobby-header-digital-pay {
  padding: 0 10px;
  height: 50px;
  background: radial-gradient(67.08% 465.51% at 52.27% 50%, #1ab53c 15.79%, #067113 100%);
  border-radius: 24px;
  border: none;
  position: relative;
  margin-top: 3px;
  color: #fff;
  cursor: pointer;
  margin-bottom: 10px;

  font-size: 14px;
  font-weight: 500;
  line-height: 100%;
  width: 145px;
  text-wrap: wrap;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 24px;
    border: 3px solid transparent;
    background: conic-gradient(from 135deg, #47f041, #00764c, #67cd00, #fff500, #47f041) border-box;
    -webkit-mask-composite: exclude;
    mask-composite: exclude;
    -webkit-mask:
      -webkit-gradient(linear, left top, left bottom, color-stop(0, #fff)) content-box,
      -webkit-gradient(linear, left top, left bottom, color-stop(0, #fff));
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask:
      -webkit-gradient(linear, left top, left bottom, color-stop(0, #fff)) content-box,
      -webkit-gradient(linear, left top, left bottom, color-stop(0, #fff));
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask-composite: exclude;
    z-index: 2;
  }
}
</style>
