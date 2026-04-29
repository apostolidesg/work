<script setup>
import { computed, onMounted, onBeforeUnmount } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import { usePowerspin } from '@/composables/usePowerspin';
import { useSession } from '@/composables/useSession';
import { useModalService } from '@/composables/useModalService';
import emitter from '@/util/eventBus';
import EventBusTypes from '@/constants/EventBusTypes';
import Constants from '@/util/Constants';

import PlayAreaLayout from '@/components/Common/PlayAreaLayout.vue';
import PowerspinPlayArea from './PlayArea/PowerspinPlayArea.vue';
import PowerspinSidescreen from './Sidescreen/PowerspinSidescreen.vue';

const { setGameType } = useSession();
const { confirm } = useModalService();

const { betslipArray, selectedBetslip, resetAllBetslips } = usePowerspin();

const existsValidBetslip = computed(() => {
  return betslipArray.value?.some((betslip) => !betslip.isEmpty()) || false;
});

function handleClearBetslip() {
  resetAllBetslips();
}

async function handleReplayWager({ wagerId }) {
  if (selectedBetslip.value && !selectedBetslip.value.isEmpty()) {
    const confirmed = await confirm({ message: 'replayWager' });
    if (confirmed) {
      emitter.emit(EventBusTypes.GET_WAGER, wagerId);
    }
  } else {
    emitter.emit(EventBusTypes.GET_WAGER, wagerId);
  }
}

onMounted(() => {
  setGameType(Constants.GENERAL_GAME_TYPES.POWERSPIN);
  emitter.on(EventBusTypes.CLEAR_BETSLIP, handleClearBetslip);
  emitter.on(EventBusTypes.REPLAY_WAGER, handleReplayWager);
});

onBeforeUnmount(() => {
  emitter.off(EventBusTypes.CLEAR_BETSLIP, handleClearBetslip);
  emitter.off(EventBusTypes.REPLAY_WAGER, handleReplayWager);
});

onBeforeRouteLeave(async (to, from, next) => {
  const shouldConfirm = to.query?.shouldConfirm !== 'false';

  if (existsValidBetslip.value && shouldConfirm) {
    const confirmed = await confirm({ message: 'returnToLobby' });
    if (confirmed) {
      resetAllBetslips();
      next();
    } else {
      next(false);
    }
  } else {
    next();
  }
});
</script>

<template>
  <div class="powerspin">
    <PlayAreaLayout>
      <div class="powerspin__play-area">
        <PowerspinPlayArea />
      </div>
      <template #sidescreen>
        <div class="powerspin__sidescreen">
          <PowerspinSidescreen />
        </div>
      </template>
    </PlayAreaLayout>
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.powerspin {
  @apply atw:h-full atw:w-full;
}

.powerspin__play-area {
  @apply atw:h-full;
}

.powerspin__sidescreen {
  @apply atw:h-full;
  background-color: var(--powerspin-color-primary);
}
</style>
