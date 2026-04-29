<template>
  <div class="draw-winnings__container d-flex flex-column flex-grow-1 m-2 p-4">
    <transition name="fade-total-winnings">
      <div v-if="showTotalWinnings" class="d-flex flex-column">
        <div class="text-center">{{displayHeader}}</div>
        <div class="draw-winnings__amount d-flex justify-content-center mt-3">
          <div class="mr-3">
            <font-awesome-icon class="fwCoinsIconImg" icon="coins"/>
          </div>
          <div>{{formattedWinningAmount}}</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
  .draw-winnings__container {
    background-color: #004c6e;
    color: #f5be20;
    font-weight: bold;
    border-radius: 10px;
  }
  .draw-winnings__amount {
    font-size: 2.8rem;
  }
  .fade-total-winnings-enter-active, .fade-total-winnings-leave-active {
    transition: opacity .5s;
  }
  .fade-total-winnings-enter, .fade-total-winnings-leave-to {
    opacity: 0;
  }
</style>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import faCoins from '@fortawesome/fontawesome-free-solid/faCoins';
import { mapGetters } from 'vuex';
import moduleTypes from '../../../../../store/modules/types';
import playerSessionTypes from '../../../../../store/modules/PlayerBetslipsSessionModule/types';
import Utilities from '../../../../../util/Utilities';
import ModalUsageMixin from '../../../../../mixins/ModalUsageMixin';
import infoModalMessages from '../../../../../util/infoModalMessages';

library.add(faCoins);

export default {
  name: 'draw-winnings',
  mixins: [ ModalUsageMixin ],
  computed: {
    ...mapGetters(moduleTypes.PLAYER_SESSION_MODULE, {
      getCurrentDrawTotalWinningAmount: playerSessionTypes.getters.GET_CURRENT_DRAW_TOTAL_WINNING_AMOUNT,
      getIsCurrentDrawCompleted: playerSessionTypes.getters.GET_IS_CURRENT_DRAW_COMPLETED,
      getShowNextDrawAvailableBets: playerSessionTypes.getters.GET_SHOW_NEXT_DRAW_AVAILABLE_BETS,
      getHasCurrentDrawBoards: playerSessionTypes.getters.GET_HAS_CURRENT_DRAW_BOARDS,
    }),
    showTotalWinnings() {
      return !this.getShowNextDrawAvailableBets && this.getHasCurrentDrawBoards && (this.getCurrentDrawTotalWinningAmount || this.getIsCurrentDrawCompleted);
    },
    formattedWinningAmount() {
      return `${Utilities.formatNumber(this.getCurrentDrawTotalWinningAmount)}€`;
    },
    displayHeader() {
      return this.getIsCurrentDrawCompleted ? this.$t('finalTotalWinnings') : this.$t('totalWinnings');
    },
    drawCompletedWithWinnings() {
      return this.getIsCurrentDrawCompleted && !!this.getCurrentDrawTotalWinningAmount;
    },
  },
  watch: {
    drawCompletedWithWinnings(newValue) {
      newValue && this.scanYourWinningTickets();
    },
  },
  methods: {
    scanYourWinningTickets() {
      this.triggerInfoModal(infoModalMessages.liveDrawWinning, null, true);
    },
  }
};
</script>
