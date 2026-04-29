<template>
  <div class="kino-live-draw__bet-container d-flex flex-column justify-content-between mt-1 font-weight-bold"
       :class="betStateClass"
       @click="selectBet">
    <div class="kino-live-draw__bet-header d-flex align-items-center justify-content-between pl-2 pr-2 pt-1 pb-1">
      <div class="d-flex justify-content-start align-items-center pr-2">
        <div class="pr-1">{{$t('numbers')}}:</div>
        <div class="kino-live-draw__bet-numbers-length" :class="{'kino-live-draw__bet-numbers-length--won': isBetWon}">{{betPlayedNumbersLength}}</div>
      </div>
      <div class="w-50">
        <img v-show="isKinoBonusBet" width="65" src="../../../../../../assets/kino-bonus-logo-red@2x.png" />
        <img v-show="isClose2WinBet" width="70" src="../../../../../../assets/kino_para1_logo@2x.png" class="pt-1" />
      </div>
      <div class="d-flex justify-content-end align-items-center">
        <template v-if="hasWinningAmount">
          <div class="pr-1">{{$t('kinoWinnings')}}</div>
          <div class="kino-live-draw__bet-winnings ml-1">{{formattedWinningAmount}}</div>
        </template>
      </div>
    </div>
    <div class="d-flex justify-content-start align-items-center flex-wrap mt-2 pl-3 pr-2 pb-1">
      <ball-element
        v-for="(item, index) in board.selection"
        :key="index"
        :displayValue="item"
        :is-won="isBetWon"
        :is-active="isWinningBall(item)"
        :is-bonus="isBonusBall(item)">
      </ball-element>
    </div>
  </div>
</template>

<style scoped>
.kino-live-draw__bet-container {
  background-color: #004c6e;
  border-radius: 10px;
  font-size: 13.11px;
  height: 70px;
  color: #fff;
  overflow: hidden;
  transition: box-shadow 0.2s, opacity 0.2s, background 0.2s;
}
.kino-live-draw__bet-container--disabled {
  opacity: 0.4;
}
.kino-live-draw__bet-container--won {
  background-color: #145a79;
}
.kino-live-draw__bet-container--won .kino-live-draw__bet-header {
  background-color: #f5be20;
  color: #000;
}
.kino-live-draw__bet-container--high-win {
  box-shadow: 0px 0px 5px 1px rgba(245,190,32,0.8);
}
.kino-live-draw__bet-container--active {
  box-shadow: 0px 0px 2px 2px rgba(255,255,255,1);
}
.kino-live-draw__bet-numbers-length {
  color: #F5BE20;
}
.kino-live-draw__bet-numbers-length--won {
  color: #000;
}
.kino-live-draw__bet-winnings {
  background-color: #fff;
  border-radius: 5px;
  color: #d02700;
  padding: 0 5px;
}
</style>

<script>
import BallElement from './BallElement';
import { mapGetters, mapActions } from 'vuex';
import playerSessionTypes from '../../../../../../store/modules/PlayerBetslipsSessionModule/types';
import moduleTypes from '../../../../../../store/modules/types';
import Constants from '../../../../../../util/Constants';
import BetslipRowMixin from '../../../../../../mixins/BetslipRowMixin';
import Utilities from '../../../../../../util/Utilities';

export default {
  name: 'betslip-row-bet',
  components: {
    BallElement
  },
  mixins: [ BetslipRowMixin ],
  data() {
    return {
      stateClassName: 'bet'
    };
  },
  computed: {
    ...mapGetters(moduleTypes.PLAYER_SESSION_MODULE,{
      getCurrentDrawBonusNumber: playerSessionTypes.getters.GET_CURRENT_DRAW_BONUS_NUMBER,
    }),
    isKinoBonusBet() {
      return Utilities.isBetTypeKinoBonus(this.board.betType);
    },
    isClose2WinBet() {
      return Utilities.isBetTypeClose2Win(this.board.betType);
    },
    betCost() {
      const cost = this.board.multipliers * Constants.BASIC_BETTING_AMOUNT;
      return this.isKinoBonusBet ? cost * 2 : cost;
    },
    betPlayedNumbersLength() {
      return this.board.selection.length;
    },
  },
  methods: {
    ...mapActions(moduleTypes.PLAYER_SESSION_MODULE, {
      updateCurrentDrawPlayerSelectedBet: playerSessionTypes.actions.UPDATE_CURRENT_DRAW_PLAYER_SELECTED_BET,
      clearCurrentDrawPlayerSelectedBet: playerSessionTypes.actions.CLEAR_CURRENT_DRAW_PLAYER_SELECTED_BET,
    }),
    isWinningBall(currentNumber) {
      return this.board.winningSelection.includes(currentNumber);
    },
    isBonusBall(currentNumber) {
      return this.getCurrentDrawBonusNumber === currentNumber && this.isKinoBonusBet;
    },
    selectBet() {
      this.isBetActive
        ? this.clearCurrentDrawPlayerSelectedBet()
        : this.updateCurrentDrawPlayerSelectedBet({ wagerBoardId: this.wagerBoardId, boardSelection: this.board.selection });
    }
  }
}
</script>
