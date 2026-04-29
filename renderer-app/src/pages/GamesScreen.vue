<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Constants from '@/util/Constants.js';

const route = useRoute();

const isGameRoute = computed(() => {
  return route.path.startsWith('/pro/games/');
});

const games = [
  {
    id: Constants.GAME_IDS.KINO,
    name: Constants.SSBT_GAME_NAMES.KINO,
    type: Constants.SSBT_GAME_TYPES.KINO,
    route: '/pro/games/kino',
  },
  {
    id: Constants.GAME_IDS.EUROJACKPOT,
    name: Constants.SSBT_GAME_NAMES.EUROJACKPOT,
    type: Constants.SSBT_GAME_TYPES.EUROJACKPOT,
    route: '/pro/games/eurojackpot',
  },
  {
    id: Constants.GAME_IDS.POWERSPIN,
    name: Constants.SSBT_GAME_NAMES.POWERSPIN,
    type: Constants.SSBT_GAME_TYPES.POWERSPIN,
    route: '/pro/games/powerspin',
  },
  {
    id: Constants.GAME_IDS.FIREBLAZE,
    name: Constants.SSBT_GAME_NAMES.FIREBLAZE,
    type: Constants.SSBT_GAME_TYPES.FIREBLAZE,
    route: '/pro/games/fireblaze',
  },
];
</script>

<template>
  <template v-if="isGameRoute">
    <router-view />
  </template>
  <template v-else>
    <div class="games-grid">
      <ul class="games-grid__list" role="list">
        <li v-for="game in games" :key="game.id">
          <router-link :to="game.route" class="games-grid__card">
            <span class="games-grid__card-name">{{ game.name }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </template>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.games-grid__list {
  @apply atw:grid atw:gap-4 atw:grid-cols-2;
}

@media (min-width: 1024px) {
  .games-grid__list {
    @apply atw:grid-cols-4;
  }
}

.games-grid__card {
  @apply atw:flex atw:flex-col atw:items-center atw:justify-center atw:gap-3 atw:rounded-xl atw:border-2 atw:border-transparent atw:p-6 atw:text-white atw:shadow-lg atw:transition-all atw:duration-200;
  background: linear-gradient(to bottom right, #1a1a2e, #16213e);
  min-height: 140px;
}

.games-grid__card:hover {
  @apply atw:shadow-xl;
  border-color: #f4c430;
}

.games-grid__card-name {
  @apply atw:text-xl atw:font-bold;
}
</style>
