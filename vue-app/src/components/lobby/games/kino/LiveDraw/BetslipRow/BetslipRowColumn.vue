<template>
  <div class="kino-live-draw__columns-container d-flex align-items-stretch justify-content-between mt-1"
       :class="betStateClass">
    <div class="kino-live-draw__columns-graphics-block d-flex flex-column align-items-center justify-content-between">
      <div>
        <img class="kino-live-draw__columns-logo" src="../../../../../../assets/stiles-logo@2x.png">
      </div>
      <div class="align-self-center text-right">
        <img v-for="item in 10" :key="item" class="kino-live-draw__columns-graphic" :src="betTypeGraphicImg(item)">
      </div>
    </div>
    <div class="d-flex flex-column flex-grow-1 justify-content-between">
      <div class="align-self-end d-flex justify-content-start align-items-center font-weight-bold pl-1 pr-1">
        <template v-if="hasWinningAmount">
          <div class="pr-1">{{$t('kinoWinnings')}}</div>
          <div class="kino-live-draw__columns-winnings ml-1">{{formattedWinningAmount}}</div>
        </template>
      </div>
      <div class="d-flex justify-content-start align-items-center">
        <div v-for="item in board.selection" :key="item" class="kino-live-draw__column-block"
             :class="{'kino-live-draw__column-block--active': isWinningColumn(item)}">
          {{item}}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .kino-live-draw__columns-container {
    background: rgb(94,184,232);
    background: linear-gradient(90deg, rgba(94,184,232,1) 0%, rgba(177,235,255,1) 50%, rgba(94,184,232,1) 100%);
    border-radius: 10px;
    font-size: 13.11px;
    padding: 0.25rem 1rem;
    height: 70px;
    color: #ffffff;
    transition: box-shadow 0.2s, opacity 0.2s, background 0.2s;
  }
  .kino-live-draw__columns-container--disabled {
    opacity: 0.5;
  }
  .kino-live-draw__columns-container--won {
    background: rgb(245,191,34);
    background: linear-gradient(90deg, rgba(245,191,34,1) 0%, rgba(245,224,83,1) 50%, rgba(245,191,34,1) 100%);
    color: #000000;
  }
  .kino-live-draw__columns-container--won .kino-live-draw__column-block--active {
    color: #f5be20;
    background: #123d52;
  }
  .kino-live-draw__columns-container--high-win {
    box-shadow: 0px 0px 4px 3px rgba(209,184,0,0.80);
  }
  .kino-live-draw__columns-graphics-block {
    width: 100px;
  }
  .kino-live-draw__columns-logo {
    max-height: 17px;
    max-width: 100%;
  }
  .kino-live-draw__columns-winnings {
    background-color: #ffffff;
    border-radius: 5px;
    color: #d02700;
    padding: 0 5px;
  }
  .kino-live-draw__column-block {
    background: rgb(244, 218, 19);
    background: linear-gradient(0deg, rgb(244, 218, 19) 0%, rgba(247,240,61,1) 100%);
    border: 1px solid rgb(250, 255, 137);
    color: #123d52;
    font-weight: 900;
    font-size: 15px;
    text-align: center;
    line-height: 25px;
    width: 22px;
    height: 25px;
    margin: 1px 1px;
  }
  .kino-live-draw__columns-graphic {
    max-height: 40px;
    width: auto;
    margin-left: 2px;
  }
</style>

<script>
import { mapGetters } from 'vuex';
import playerSessionTypes from '../../../../../../store/modules/PlayerBetslipsSessionModule/types';
import moduleTypes from '../../../../../../store/modules/types';
import Constants from '../../../../../../util/Constants'
import BetslipRowMixin from '../../../../../../mixins/BetslipRowMixin';

export default {
  name: 'betslip-row-column',
  mixins: [ BetslipRowMixin ],
  data() {
    return {
      stateClassName: 'columns'
    };
  },
  computed: {
    ...mapGetters(moduleTypes.PLAYER_SESSION_MODULE,{
      getCurrentDrawWinningColumn: playerSessionTypes.getters.GET_CURRENT_DRAW_WINNING_COLUMN,
    })
  },
  methods: {
    betTypeGraphicImg(column) {
      return this.board.selection.includes(column)
        ? require(`../../../../../../assets/${Constants.COLUMNS_IMAGES.FILLED}`)
        : require(`../../../../../../assets/${Constants.COLUMNS_IMAGES.EMPTY}`);
    },
    isWinningColumn(column) {
      return this.getCurrentDrawWinningColumn === column;
    }
  }
}
</script>
