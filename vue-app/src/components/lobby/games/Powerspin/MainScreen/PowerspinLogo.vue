<template>
  <img :src="activeImg" v-on="$listeners" alt="powerspin logo" />
</template>

<script>
import powerSpinOn from '../../../../../assets/power-spin/powerspin-logo-ON.png';
import powerSpinOff from '../../../../../assets/power-spin/powerspin-logo-OFF.png';

export default {
  name: 'PowerspinLogo',
  props: {
    isSelected: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    activeImg() {
      return this.isSelected ? powerSpinOn : powerSpinOff;
    },
  },
};
</script>
