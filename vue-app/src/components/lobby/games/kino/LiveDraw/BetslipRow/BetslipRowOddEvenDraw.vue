<template>
  <div class="kino-live-draw__odd-even-draw-container d-flex align-items-stretch justify-content-between mt-1"
       :class="betStateClass">
    <div class="kino-live-draw__odd-even-draw-graphics-block d-flex flex-column align-items-center justify-content-between">
      <div>
        <img class="kino-live-draw__odd-even-draw-logo" :src="betTypeLogoImg">
      </div>
      <div>
        <img class="kino-live-draw__odd-even-draw-graphic" :src="betTypeGraphicImg">
      </div>
    </div>
    <div class="align-self-start d-flex justify-content-start align-items-center font-weight-bold pl-1 pr-1">
      <template v-if="hasWinningAmount">
        <div class="pr-1">{{$t('kinoWinnings')}}</div>
        <div class="kino-live-draw__odd-even-draw-winnings ml-1">{{formattedWinningAmount}}</div>
      </template>
    </div>
  </div>
</template>

<style scoped>
  .kino-live-draw__odd-even-draw-container {
    background: rgb(71, 145, 0);
    background: linear-gradient(90deg, rgb(18, 78, 4) 0%, rgb(30, 154, 60) 45%);
    border-radius: 10px;
    font-size: 13.11px;
    padding: 0.25rem 1rem;
    height: 70px;
    color: #ffffff;
    transition: box-shadow 0.2s, opacity 0.2s, background 0.2s;
  }
  .kino-live-draw__odd-even-draw-container--disabled {
    opacity: 0.5;
  }
  .kino-live-draw__odd-even-draw-container--won {
    background: rgb(245,191,34);
    background: linear-gradient(90deg, rgba(245,191,34,1) 0%, rgba(245,224,83,1) 50%, rgba(245,191,34,1) 100%);
    color: #000000;
  }
  .kino-live-draw__odd-even-draw-container--high-win {
    box-shadow: 0px 0px 4px 3px rgba(209,184,0,0.80);
  }
  .kino-live-draw__odd-even-draw-graphics-block {
    width: 100px;
  }
  .kino-live-draw__odd-even-draw-winnings {
    background-color: #ffffff;
    border-radius: 5px;
    color: #d02700;
    padding: 0 5px;
  }
  .kino-live-draw__odd-even-draw-logo {
    max-height: 17px;
    max-width: 100%;
  }
  .kino-live-draw__odd-even-draw-graphic {
    max-height: 42px;
    max-width: 100%;
  }
</style>

<script>
import { mapGetters } from 'vuex';
import playerSessionTypes from '../../../../../../store/modules/PlayerBetslipsSessionModule/types';
import moduleTypes from '../../../../../../store/modules/types';
import Mappings from '../../../../../../util/Mappings';
import BetslipRowMixin from '../../../../../../mixins/BetslipRowMixin';

export default {
  name: 'betslip-row-odd-even-draw',
  mixins: [ BetslipRowMixin ],
  data() {
    return {
      stateClassName: 'odd-even-draw'
    };
  },
  computed: {
    ...mapGetters(moduleTypes.PLAYER_SESSION_MODULE, {
      getCurrentDrawWinningOddEvenDraw: playerSessionTypes.getters.GET_CURRENT_DRAW_WINNING_ODD_EVEN_DRAW,
    }),
    betTypeGraphicImg() {
      return require(`../../../../../../assets/${Mappings.ODD_EVEN_DRAW_TO_IMAGES[this.board.betType].GRAPHIC}`);
    },
    betTypeLogoImg() {
      return require(`../../../../../../assets/${Mappings.ODD_EVEN_DRAW_TO_IMAGES[this.board.betType].LOGO}`);
    },
  },
}
</script>
