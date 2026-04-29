<template>
  <div class="h-100">
    <div v-if="getHasCurrentDrawBoards" class="h-100">
      <div class="kino-live-draw__betslips-select-info col pt-2 font-weight-bold text-center">
        {{$t('selectBetToPreviewOnLive')}}
      </div>
      <div class="kino-live-draw__betslips-scroll-container">
        <vue-scroll :ops="scrollerOps">
          <div class="kino-live-draw__betslip-container">
            <transition-group name="kino-live-draw__flip-betslip-list" tag="div" class="col-12 pl-2 pr-2">
              <div v-for="(board, index) in getCurrentDrawBoards" :key="getKey(board)" class="kino-live-draw__flip-betslip-list-item row pt-1">
                <div class="col">
                  <component :board="board" :high-win="isHighWin(index, board)" :is="selectedBetslipRowComponent(board.betType)"></component>
                </div>
              </div>
            </transition-group>
          </div>
        </vue-scroll>
      </div>
    </div>
    <div v-else class="kino-live-draw__betslips-info col pt-4 font-weight-bold text-center">
      {{$t('noBetslipsCurrentOnLiveDraw')}}
    </div>
  </div>
</template>

<style scoped>
  .kino-live-draw__betslips-select-info {
    font-size: 0.8rem;
    height: 50px;
  }
  .kino-live-draw__betslips-select-info,
  .kino-live-draw__betslips-info {
    color: #F5BE20;
  }
  .kino-live-draw__betslips-scroll-container {
    height: 600px;
  }
  .kino-live-draw__flip-betslip-list-item {
    transition: all 0.7s;
  }
  .kino-live-draw__flip-betslip-list-enter, .kino-live-draw__flip-betslip-list-leave-to {
    opacity: 0;
    transform: translateX(-150px);
  }
  .kino-live-draw__flip-betslip-list-leave-active {
    position: absolute;
  }
</style>

<script>
import { liveDraw } from '../../../../../util/ScrollerConfig';
import BetslipRowBet from './BetslipRow/BetslipRowBet';
import BetslipRowOddEvenDraw from './BetslipRow/BetslipRowOddEvenDraw';
import BetslipRowColumn from './BetslipRow/BetslipRowColumn';
import { mapGetters } from 'vuex';
import moduleTypes from '../../../../../store/modules/types';
import playerSessionTypes from '../../../../../store/modules/PlayerBetslipsSessionModule/types';
import Utilities from '../../../../../util/Utilities';
import cond from 'ramda/es/cond';
import ifElse from 'ramda/es/ifElse';

export default {
  name: 'betslip-list',
  components: {
    BetslipRowBet,
    BetslipRowOddEvenDraw,
    BetslipRowColumn
  },
  data() {
    return {
      scrollerOps: liveDraw,
      highAmount: 0,
    };
  },
  computed: {
    ...mapGetters(moduleTypes.PLAYER_SESSION_MODULE, {
      getCurrentDrawBoards: playerSessionTypes.getters.GET_CURRENT_DRAW_BOARDS,
      getHasCurrentDrawBoards: playerSessionTypes.getters.GET_HAS_CURRENT_DRAW_BOARDS,
    }),
  },
  methods: {
    selectedBetslipRowComponent(betType) {
      return cond([
        [Utilities.isBet, this.getBetComponent],
        [Utilities.isOddEvenDraw, this.getOddEvenDrawComponent],
        [Utilities.isColumn, this.getColumnComponent],
      ])(betType);
    },
    getBetComponent() {
      return BetslipRowBet;
    },
    getOddEvenDrawComponent() {
      return BetslipRowOddEvenDraw;
    },
    getColumnComponent() {
      return BetslipRowColumn;
    },
    getKey({wagerId, boardId}) {
      return `${wagerId}-${boardId}`;
    },
    isFirstEntry({ index }) {
      return index === 0;
    },
    setHighAmount({ board }) {
      this.highAmount = board.winningAmount;
      return true;
    },
    checkBoardHighAmount({ board }) {
      return board.winningAmount >= this.highAmount;
    },
    isHighWin(index, board) {
      return ifElse(
        this.isFirstEntry,
        this.setHighAmount,
        this.checkBoardHighAmount
      )({ index, board });
    },
  }
}
</script>
