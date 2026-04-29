<template>
  <div id="lobby" class="lobby">
    <div class="lobby__games">
      <Games></Games>
    </div>
  </div>
</template>

<script>
import Banner from './banner/banner.vue';
import LobbyHeader from './lobbyHeader/LobbyHeader.vue';
import Games from './games/Games.vue';
import moduleTypes from '../../store/modules/types';
import sessionStoreModuleTypes from '../../store/modules/SessionStoreModule/types';
import { mapActions } from 'vuex';

export default {
  name: 'lobby',
  components: {
    Banner,
    LobbyHeader,
    Games,
  },
  mounted() {
    this.setGameType({ gameType: '' });
    this.setBalanceVisibility({ isVisible: true });
  },
  methods: {
    ...mapActions(moduleTypes.SESSION_STORE_MODULE, {
      setGameType: sessionStoreModuleTypes.actions.SET_GAME_TYPE,
      setBalanceVisibility: sessionStoreModuleTypes.actions.SET_BALANCE_VISIBILITY,
    }),
  },
};
</script>

<style scoped lang="scss">
.lobby {
  width: 100%;
  background-color: whitesmoke;
  &__games {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
