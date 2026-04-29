<script setup>
import { computed } from 'vue';
import Constants from '@/util/Constants';
import { useSession } from '@/composables/useSession';
import { useServiceCheck } from '@/composables/useServiceCheck';
import { faWrench } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import EuroIconDark from '@/assets/euro-icon-dark.png';
import EuroIconWhite from '@/assets/euro-icon-white.png';
import emitter from '@/util/eventBus';
import EventBusTypes from '@/constants/EventBusTypes';

const { gameType, hasActiveSession } = useSession();
const { isMaintenance, isCashoutAvailable } = useServiceCheck();

const getEuroImage = computed(() => {
  switch (gameType.value) {
    case Constants.GENERAL_GAME_TYPES.KINO:
    case Constants.GENERAL_GAME_TYPES.EUROJACKPOT:
      return EuroIconDark;
    case Constants.GENERAL_GAME_TYPES.POWERSPIN:
    case Constants.GENERAL_GAME_TYPES.FIREBLAZE:
      return EuroIconWhite;
    default:
      return EuroIconWhite;
  }
});

const themeClasses = computed(() => {
  switch (gameType.value) {
    case Constants.GENERAL_GAME_TYPES.KINO:
      return 'atw:bg-kino';
    case Constants.GENERAL_GAME_TYPES.POWERSPIN:
      return 'atw:bg-powerspin atw:text-white';
    case Constants.GENERAL_GAME_TYPES.EUROJACKPOT:
      return 'atw:bg-eurojackpot';
    case Constants.GENERAL_GAME_TYPES.FIREBLAZE:
      return 'atw:bg-fireblaze atw:text-white';
    default:
      return 'atw:bg-main-background atw:text-white';
  }
});

const cashout = () => {
  emitter.emit(EventBusTypes.DO_CASHOUT);
};

const switchApp = () => {
  emitter.emit(EventBusTypes.SWITCH_TO_APPLICATION_OK);
};
</script>

<template>
  <div v-if="isMaintenance" class="maintenance" :class="themeClasses">
    <div class="maintenance__container">
      <div class="maintenance__icon">
        <FontAwesomeIcon class="maintenance__wrench" :icon="faWrench" />
      </div>

      <div class="maintenance__message">
        <h1 class="maintenance__title">{{ $t('maintenanceMessage') }}</h1>
      </div>

      <div class="maintenance__options">
        <div v-if="isCashoutAvailable && hasActiveSession" class="maintenance__option" @click="cashout">
          <img class="maintenance__cash-out-img" :src="getEuroImage" />
          <h2 class="maintenance__option-title">{{ $t('cashOut') }}</h2>
        </div>

        <div v-if="!hasActiveSession" class="maintenance__option" @click="switchApp">
          <FontAwesomeIcon class="maintenance__switch-icon" :icon="faSignOutAlt" />
          <h2 class="maintenance__option-title">{{ $t('maintenanceSwitchAppMessage') }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";
.maintenance {
  @apply atw:fixed atw:inset-0 atw:z-70 atw:flex atw:items-center atw:justify-center;
}

.maintenance__container {
  @apply atw:w-full atw:mx-auto atw:px-4 atw:container;
}

.maintenance__icon {
  @apply atw:flex atw:justify-center atw:mb-8;
}

.maintenance__wrench {
  @apply atw:mx-auto atw:h-48 atw:w-48;
}

.maintenance__message {
  @apply atw:mb-8 atw:text-center;
}

.maintenance__title {
  @apply atw:text-3xl atw:font-medium;
}

.maintenance__options {
  @apply atw:flex atw:justify-center atw:gap-12 atw:mt-12;
}

.maintenance__option {
  @apply atw:flex atw:flex-col atw:items-center;
}

.maintenance__cash-out-img {
  @apply atw:mb-1 atw:w-32 atw:mx-auto;
}

.maintenance__option-title {
  @apply atw:text-3xl atw:font-medium atw:mt-2;
}

.maintenance__switch-icon {
  @apply atw:w-14 atw:h-14;
}
</style>
