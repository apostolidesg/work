<template>
  <div id="winnings_table" class="m-2">
    <div class="winnings-table">
      <table>
        <thead>
          <tr>
            <th id="winnings_header_numbers" class="header-id">{{ $t('numbers') }}</th>
            <th id="winnings_header_kino" class="header-kino">{{ $t('kinoWinnings') }}</th>
            <th id="winnings_header_kino_bonus" class="header-kinobonus">{{ $t('kinoBonusWinnings') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            :id="`winnings_row_${winnings.id}`"
            v-for="(winnings, index) in currentWinningsTableReversed"
            :key="index"
            :class="{
              selected: winnings.selected,
              'c2w-border-bottom': winnings.isC2WNumber || (winnings.isC2WOption && close2WinActive),
              'c2w-border-top': winnings.isC2WOption,
            }"
          >
            <td :id="`winnings_number_${winnings.id}`" class="row-id" v-if="!winnings.isC2WOption">
              {{ winnings.id }}
            </td>
            <td :id="`winnings_number_${winnings.id}`" class="row-id" v-if="winnings.isC2WOption">
              <img :src="c2wIdImage" alt="C2W" />
            </td>
            <td
              :id="`winnings_kino_${winnings.id}`"
              :class="[
                'row-kino',
                {
                  black:
                    (kinoBonusActive && !winnings.isC2WOption) ||
                    (kinoBonusActive && close2WinActive && winnings.isC2WOption),
                  'black--light': kinoBonusActive && !close2WinActive && winnings.isC2WOption,
                  'white--light': !kinoBonusActive && !close2WinActive && winnings.isC2WOption,
                },
              ]"
            >
              {{ winnings.kino | currency }}
            </td>
            <td
              :id="`winnings_kino_bonus_${winnings.id}`"
              :class="[
                'row-kinobonus',
                {
                  'black--light': !kinoBonusActive,
                  'white--light': kinoBonusActive && !close2WinActive && winnings.isC2WOption,
                },
              ]"
            >
              {{ winnings.kinoBonus | currency }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Util from '../../../../../util/Utilities';
import Constants from '../../../../../util/Constants';
import C2WPayTableUnselected from '../../../../../assets/C2W_paytable_unselected.svg';
import C2WPayTableSelected from '../../../../../assets/C2W_paytable_selected.svg';

export default {
  name: 'PayTable',
  props: {
    gameType: {
      type: Number,
      default: 0,
    },
    kinoBonusActive: {
      type: Boolean,
      default: false,
    },
    multiplier: {
      type: Number,
      default: 1,
    },
    close2WinActive: {
      type: Boolean,
      default: false,
    },
    close2WinAvailable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    winningsTable() {
      return Array.from(Array(13), (x, i) =>
        Array.from(Array(13), (y, j) => {
          const isC2WNumber =
            j === this.gameType - 1 && Constants.PAY_TABLES.C2W[this.gameType] && this.close2WinAvailable;

          return [
            ...(isC2WNumber && this.close2WinActive
              ? []
              : [
                  {
                    id: j,
                    kino: Math.min(
                      (Constants.PAY_TABLES.KINO[i][j] || 0) * this.multiplier * Constants.BASIC_BETTING_AMOUNT,
                      Constants.MAX_KINO_WINNING_AMOUNT
                    ),
                    kinoBonus: Math.min(
                      (Constants.PAY_TABLES.KINOBONUS[i][j] || 0) * this.multiplier * Constants.BASIC_BETTING_AMOUNT,
                      Constants.MAX_KINO_BONUS_WINNING_AMOUNT
                    ),
                    selected: j === this.gameType,
                    isC2WNumber,
                  },
                ]),
            ...(isC2WNumber
              ? [
                  {
                    id: `${j}_c2w`,
                    kino: Math.min(
                      ((Constants.PAY_TABLES.KINO[i][j] || 0) + Constants.PAY_TABLES.C2W[this.gameType]) *
                        this.multiplier *
                        Constants.BASIC_BETTING_AMOUNT,
                      Constants.MAX_KINO_WINNING_AMOUNT
                    ),
                    kinoBonus: Math.min(
                      ((Constants.PAY_TABLES.KINOBONUS[i][j] || 0) + Constants.PAY_TABLES.C2W[this.gameType]) *
                        this.multiplier *
                        Constants.BASIC_BETTING_AMOUNT,
                      Constants.MAX_KINO_BONUS_WINNING_AMOUNT
                    ),
                    isC2WOption: true,
                  },
                ]
              : []),
          ];
        }).flat()
      );
    },
    currentWinningsTableReversed() {
      return this.winningsTable[this.gameType].slice().reverse();
    },
    c2wIdImage() {
      return this.close2WinActive ? C2WPayTableSelected : C2WPayTableUnselected;
    },
  },
  filters: {
    currency: val => {
      return val ? `${Util.formatNumber(val)}€` : '-';
    },
  },
};
</script>

<style scoped>
.winnings-table {
  height: 100%;
  font-size: 0.75rem;
  font-weight: 900;
  color: white;
  border-radius: 10px;
  background-color: #2484b7;
}

.winnings-table table {
  width: 100%;
  max-width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.winnings-table td,
.winnings-table th {
  padding: 0.4rem;
}

.winnings-table .c2w-border-top {
  border-top: 1px solid #000000;
}

.winnings-table .c2w-border-bottom {
  border-bottom: 1px solid #000000;
}

.winnings-table .selected {
  background-color: #f5be20;
}

.winnings-table .black--light {
  color: #19435b;
  opacity: 0.6;
}

.winnings-table .black {
  color: #19435b;
}

.winnings-table .white--light {
  color: white;
  opacity: 0.6;
}

.winnings-table .selected:last-child td:first-child {
  border-radius: 0 0 0 10px;
}
.winnings-table .selected:last-child td:last-child {
  border-radius: 0 0 10px 0;
}

.winnings-table .info {
  position: absolute;
  left: 5px;
  width: 15px;
}

.winnings-table .info svg {
  width: 100%;
  height: 100%;
  vertical-align: text-bottom;
}

.header-id {
  text-align: center;
  width: 25%;
}

.header-kino,
.header-kinobonus {
  text-align: right;
  width: 37.5%;
}

.row-id {
  text-align: center;
  position: relative;
}

.row-kino,
.row-kinobonus {
  text-align: right;
}
</style>
