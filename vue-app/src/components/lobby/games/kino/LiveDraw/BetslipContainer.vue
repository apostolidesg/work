<template>
  <div class="kino-live-draw__right-side-container">
    <betslip-list v-if="!getShowNextDrawAvailableBets"/>
    <div v-else class="kino-live-draw__betslips-info col pt-4 font-weight-bold text-center">
      {{getNextDrawAvailableBetslipsMsg}}
    </div>
  </div>
</template>

<style scoped>
  .kino-live-draw__right-side-container{
    height: 655px;
  }
  .kino-live-draw__betslips-info {
    color: #F5BE20;
  }
</style>

<script>
/* eslint-disable */
import { mapGetters } from 'vuex';
import moduleTypes from '../../../../../store/modules/types';
import playerSessionTypes from '../../../../../store/modules/PlayerBetslipsSessionModule/types';
import BetslipList from './BetslipList';

export default {
  name: 'betslip-container',
  components: {
    BetslipList,
  },
  computed: {
    ...mapGetters(moduleTypes.PLAYER_SESSION_MODULE, {
      getNextDrawAvailableBetsCount: playerSessionTypes.getters.GET_NEXT_DRAW_AVAILABLE_BETS_COUNT,
      getShowNextDrawAvailableBets: playerSessionTypes.getters.GET_SHOW_NEXT_DRAW_AVAILABLE_BETS,
    }),
    getNextDrawAvailableBetslipsMsg() {
      return this.getNextDrawAvailableBetsCount > 0
        ? `${this.$t('nextDrawParticipatingBets')} ${this.getNextDrawAvailableBetsCount}`
        : this.$t('noBetslipsNextOnLiveDraw');
    }
  },
}
</script>
