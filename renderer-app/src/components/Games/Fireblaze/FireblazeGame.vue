<script setup>
import { computed, onMounted, onBeforeUnmount } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import { useFireblaze } from '@/composables/useFireblaze';
import { useSession } from '@/composables/useSession';
import { useModalService } from '@/composables/useModalService';
import emitter from '@/util/eventBus';
import EventBusTypes from '@/constants/EventBusTypes';
import Constants from '@/util/Constants';

import PlayAreaLayout from '@/components/Common/PlayAreaLayout.vue';
import FireblazeSettings from './Settings/FireblazeSettings.vue';
import FireblazePlayArea from './PlayArea/FireblazePlayArea.vue';
import FireblazeSidescreen from './Sidescreen/FireblazeSidescreen.vue';

const { setGameType } = useSession();
const { confirm } = useModalService();
const { isBetslipEmpty, resetBetslip } = useFireblaze();

function handleClearBetslip() {
  resetBetslip();
}

async function handleReplayWager({ wagerId }) {
  if (!isBetslipEmpty.value) {
    const confirmed = await confirm({ message: 'replayWager' });
    if (confirmed) {
      emitter.emit(EventBusTypes.GET_WAGER, wagerId);
    }
  } else {
    emitter.emit(EventBusTypes.GET_WAGER, wagerId);
  }
}

onMounted(() => {
  setGameType(Constants.GENERAL_GAME_TYPES.FIREBLAZE);
  emitter.on(EventBusTypes.CLEAR_BETSLIP, handleClearBetslip);
  emitter.on(EventBusTypes.REPLAY_WAGER, handleReplayWager);
});

onBeforeUnmount(() => {
  emitter.off(EventBusTypes.CLEAR_BETSLIP, handleClearBetslip);
  emitter.off(EventBusTypes.REPLAY_WAGER, handleReplayWager);
});

onBeforeRouteLeave(async (to, from, next) => {
  const shouldConfirm = to.query?.shouldConfirm !== 'false';

  if (!isBetslipEmpty.value && shouldConfirm) {
    const confirmed = await confirm({ message: 'returnToLobby' });
    if (confirmed) {
      resetBetslip();
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
  <div id="fireblaze" class="fireblaze">
    <PlayAreaLayout>
      <template #settings>
        <div class="fireblaze__settings">
          <FireblazeSettings />
        </div>
      </template>

      <div class="fireblaze__play-area">
        <FireblazePlayArea />
      </div>

      <template #sidescreen>
        <div class="fireblaze__sidescreen">
          <FireblazeSidescreen />
        </div>
      </template>
    </PlayAreaLayout>
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";

#fireblaze {
  @apply atw:w-full atw:h-full;
}

.fireblaze__settings {
  @apply atw:h-full;
}

.fireblaze__play-area {
  @apply atw:h-full;
  background: var(--fireblaze-gradient-dark-red);
}

.fireblaze__sidescreen {
  @apply atw:h-full;
  background: var(--fireblaze-gradient-pink-purple);
}
</style>
