<template>
  <div :id="`${preview_pnl_id}${id}`" @click="$emit('click')">
    <div class="kino-preview-info">
      <div class="kino-preview-info__details">
        <div>
          <div :id="`${preview_pnl_id}${id}_title`" class="kino-preview-info__amount-title">{{ $t('amount') }}:</div>
          <div :id="`${preview_pnl_id}${id}_amount`" class="kino-preview-info__amount-value">
            {{ `${amountFixed}` }}&euro;
          </div>
        </div>

        <img
          :id="`${preview_pnl_id}${id}_kinoBonus`"
          v-show="bet_area.kinoBonusActive"
          width="73"
          src="../../../../../assets/kino-bonus-logo-red@2x.png"
          alt="kino bonus logo"
        />
        <img
          :id="`${preview_pnl_id}${id}_kinoClose2Win`"
          v-show="bet_area.kinoClose2WinActive"
          width="81"
          src="../../../../../assets/kino_para1_logo@2x.png"
          alt="kino para1 logo"
        />
      </div>
      <div :id="`${preview_pnl_id}${id}_numbers_title`" class="kino-preview-info__numbers">
        <span>{{ $t('numbers') }}</span>
        <div :id="`${preview_pnl_id}${id}_nums`" class="kino-preview-info__numbers-number rounded-circle">
          <span>{{ bet_area.pickedNumbers.length }}</span>
        </div>
      </div>
    </div>
    <div class="kino-preview-numbers">
      <div>
        <div v-for="i in bet_area.pickedNumbers.length" :key="i" class="kino-preview-number rounded-circle">
          <span :id="`${preview_pnl_id}${id}_number_${i}_ball`">{{ bet_area.pickedNumbers[i - 1] }}</span>
        </div>
      </div>
      <div :id="`${preview_pnl_id}${id}_dlt`">
        <BaseClearButton
          :id="`${preview_pnl_id}${id}_dlt_btn`"
          theme="white"
          :disabled="noNumbersSelected"
          @click="deleteArea"
        />
      </div>
    </div>
  </div>
</template>

<script>
import dialogModalMessages from '../../../../../util/dialogModalMessages';
import Utilities from '../../../../../util/Utilities';
import modalEventConstants from '../../../../../util/modalEventConstants';
import BaseClearButton from '../../../../common/BaseClearButton';

export default {
  name: 'BetSelections',
  props: {
    bet_area: { type: Object, required: true },
    id: { type: Number, required: true },
    preview_pnl_id: { default: 'sidescreen_preview_bet_' },
  },
  components: {
    BaseClearButton,
  },
  methods: {
    deleteArea() {
      if (this.bet_area.isDirty()) {
        this.$eventHub.$emit(modalEventConstants.OPEN.DIALOG, dialogModalMessages.deleteArea, () => {
          this.$emit('delete-area');
        });
      }
    },
  },
  computed: {
    amountFixed() {
      return Utilities.formatNumber(this.bet_area.value);
    },
    noNumbersSelected() {
      return !this.bet_area.pickedNumbers.length;
    },
  },
};
</script>

<style scoped lang="scss">
.kino-preview {
  &-info {
    display: flex;
    flex-direction: row;

    &__details {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-start;

      img {
        margin-left: 10px;
      }
    }

    &__amount {
      &-title {
        display: inline-block;
        color: #ffdc00;
        font-size: 13px;
      }

      &-value {
        display: inline-block;
        color: white;
        font-weight: 900;
      }
    }

    &__numbers {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: rgba(255, 255, 255, 0.7);
      font-size: 12px;

      &-number {
        display: inline-block;
        background-color: white;
        text-align: center;
        color: #d02700;
        height: 20px;
        width: 20px;
        font-size: 12px;
        font-weight: 900;
        margin-left: 5px;
      }
    }
  }

  &-numbers {
    display: flex;
    margin-top: 10px;

    div:first-child {
      flex: 1;
    }
  }

  &-number {
    display: inline-block;
    padding: 0px 0px 0px 0px;
    color: #123d52;
    font-size: 15px;
    text-align: center;
    font-weight: 900;
    line-height: 26px;
    width: 25px;
    height: 25px;
    background-color: #f5be20;
    margin: 1px 2px 1px 2px;
  }
}
</style>
