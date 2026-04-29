import { mapGetters } from 'vuex';
import playerSessionTypes from '../store/modules/PlayerBetslipsSessionModule/types';
import moduleTypes from '../store/modules/types';
import Utilities from '../util/Utilities';

export default {
  props: {
    board: {
      type: Object,
      required: true
    },
    highWin: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      stateClassName: ''
    };
  },
  computed: {
    ...mapGetters(moduleTypes.PLAYER_SESSION_MODULE,{
      getIsCurrentDrawCompleted: playerSessionTypes.getters.GET_IS_CURRENT_DRAW_COMPLETED,
      getCurrentDrawPlayerSelectedBetId: playerSessionTypes.getters.GET_CURRENT_DRAW_PLAYER_SELECTED_BET_ID,
    }),
    formattedWinningAmount() {
      return `${Utilities.formatNumber(this.board.winningAmount)}€`;
    },
    wagerBoardId() {
      return `${this.board.wagerId}-${this.board.boardId}`;
    },
    hasWinningAmount() {
      return this.board.winningAmount > 0
    },
    isBetWon() {
      return this.getIsCurrentDrawCompleted && this.hasWinningAmount;
    },
    isBetDisabled() {
      return this.getIsCurrentDrawCompleted && !this.hasWinningAmount;
    },
    isBetActive() {
      return this.getCurrentDrawPlayerSelectedBetId === this.wagerBoardId;
    },
    isHighWinning() {
      return this.isBetWon && this.highWin;
    },
    betStateClass() {
      return {
        [`kino-live-draw__${this.stateClassName}-container--won`]: this.isBetWon,
        [`kino-live-draw__${this.stateClassName}-container--disabled`]: this.isBetDisabled,
        [`kino-live-draw__${this.stateClassName}-container--active`]: this.isBetActive,
        [`kino-live-draw__${this.stateClassName}-container--high-win`]: this.isHighWinning,
      }
    }
  },
};
