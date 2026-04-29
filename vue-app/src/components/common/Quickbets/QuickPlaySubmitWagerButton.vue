<template>
  <div class="quick-play-submit-wager">
    <div ref="placeBetInfoRef" v-if="error" @click="toggleInfo" class="quick-play-submit-wager__info">
      <font-awesome-icon class="quick-play-submit-wager__info-icon" icon="info-circle"></font-awesome-icon>
      <b-tooltip :target="() => $refs.placeBetInfoRef" :show.sync="showInfo" placement="top">
        <strong>{{ $t(error) }}</strong>
      </b-tooltip>
    </div>
    <button
      class="quick-play-submit-wager__button"
      @click="submitCurrentWager"
      :disabled="disabled"
      :class="{ 'quick-play-submit-wager__button--disabled': disabled }"
    >
      <span v-if="!isSubmitting"> €{{ betSlipValue }} {{ $t('payment') }}</span>
      <loading
        class="quick-play-submit-wager__button-loading"
        :active.sync="isSubmitting"
        :can-cancel="false"
        :is-full-page="false"
        :opacity="0.0"
        :color="spinnerColor"
      >
      </loading>
    </button>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faInfoCircle } from '@fortawesome/fontawesome-free-solid';
import gtag from '@/util/gtag';
import gtmEvents from '@/constants/gtmEvents';
import Constants from '@/util/Constants';

library.add(faInfoCircle);

export default {
  name: 'QuickPlaySubmitWagerButton',
  props: {
    betSlipValue: {
      type: Number,
    },
    submitWager: {
      type: Function,
      required: true,
    },
    error: {
      type: String,
    },
    isSubmitting: {
      type: Boolean,
      required: true,
    },
    theme: {
      type: String,
      required: true,
    },
  },
  components: {
    Loading,
    FontAwesomeIcon,
  },
  data() {
    return {
      showInfo: false,
    };
  },
  computed: {
    disabled() {
      return this.error || this.isSubmitting;
    },
  },
  methods: {
    submitCurrentWager() {
      if (this.disabled) {
        return;
      }
      gtag.sendEvent(
        this.theme === Constants.THEMES.KINO
          ? gtmEvents.SSBT_LOTTERY_KINO_QUICKPLAY_SUBMIT
          : gtmEvents.SSBT_LOTTERY_POWERSPIN_QUICKPLAY_SUBMIT,
        {
          betslip_value: this.betSlipValue,
        }
      );
      this.submitWager();
    },
    toggleInfo() {
      this.showInfo = !this.showInfo;
    },
  },
  created() {
    this.spinnerColor = '#FF9001';
  },
};
</script>

<style lang="scss" scoped>
.quick-play-submit-wager {
  position: relative;
  display: inline-block;

  &__info {
    background-color: #06dc1d;
    padding: 0;
    position: absolute;
    width: 38px;
    border-top-left-radius: 20px;
    height: 95px;
    border-bottom-left-radius: 20px;
    vertical-align: middle;
    color: white;
    z-index: 99;
    display: flex;
    align-items: center;
    cursor: pointer;
    top: 20px;

    &-icon {
      vertical-align: middle;
      margin: 35px 9px;
      font-size: 20px;
    }
  }

  &__button {
    width: 750px;
    height: 95px;
    background: radial-gradient(
      67.08% 465.51% at 52.27% 50%,
      var(--color-button-green-start) 15.79%,
      var(--color-button-green-end) 100%
    );
    border: 3px;
    border-radius: 20px;
    color: var(--color-white);
    font-weight: 700;
    font-size: 40px;
    cursor: pointer;
    margin-top: 20px;
    position: relative;

    &:disabled,
    &--disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    &-loading {
      padding: 8px;
    }
  }
}
</style>
