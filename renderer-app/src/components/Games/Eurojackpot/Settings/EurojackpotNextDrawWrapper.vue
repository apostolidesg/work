<script setup>
import { computed } from 'vue';
import DrawCountDown from '@/components/Common/DrawCountDown.vue';
import eurojackpotIcon from '@/assets/eurojackpot/eurojackpot.png';
import eurojackpotIconExtra from '@/assets/eurojackpot/eurojackpot_extra.png';
import sprinklesIcon from '@/assets/eurojackpot/sprinkles.png';
import europeIcon from '@/assets/eurojackpot/europe_icon.png';
import { useEurojackpot } from '@/composables/useEurojackpot';

defineProps({
  salesCloseTime: {
    type: Date,
    required: true,
  },
});

const { isActiveDrawExtra } = useEurojackpot();

const europeIconSrc = europeIcon;
const sprinklesIconSrc = sprinklesIcon;

const eurojackpotLogo = computed(() => {
  return isActiveDrawExtra.value ? eurojackpotIconExtra : eurojackpotIcon;
});
</script>

<template>
  <div class="euro-jackpot-next-draw__wrapper">
    <div class="euro-jackpot-next-draw__europe">
      <img width="205" height="125" :src="europeIconSrc" alt="europe" />
    </div>
    <div class="euro-jackpot-next-draw__logo" :class="{ 'euro-jackpot-next-draw__logo--extra': isActiveDrawExtra }">
      <img width="180" height="80" :src="eurojackpotLogo" alt="eurojackpot" />
    </div>
    <div class="euro-jackpot-next-draw__countdown">
      <DrawCountDown :date="salesCloseTime" />
    </div>
    <div class="euro-jackpot-next-draw__sprinkles">
      <img width="270" height="80" :src="sprinklesIconSrc" alt="sprinkles" />
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.euro-jackpot-next-draw__wrapper {
  @apply atw:relative atw:flex;
  width: 275px;
  height: 195px;
  background: linear-gradient(223deg, #ffde7e 0%, #ffde7e 27.08%, #99762f 100%);
  border: 1px solid var(--ejp-color-primary-black);
}

.euro-jackpot-next-draw__europe {
  @apply atw:absolute;
  top: 33%;
  left: 39%;
  transform: translate(-50%, -50%);
}

.euro-jackpot-next-draw__logo {
  @apply atw:absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.euro-jackpot-next-draw__logo--extra {
  @apply atw:pb-1;
}

.euro-jackpot-next-draw__countdown {
  @apply atw:absolute atw:z-10;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.euro-jackpot-next-draw__sprinkles {
  @apply atw:flex atw:flex-row atw:absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.euro-jackpot-next-draw__sprinkles img {
  margin: 12px 0 0 15px;
}
</style>
