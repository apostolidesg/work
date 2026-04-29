<template>
  <section>
    <div class="fwCloseButtonRow">
      <button
        type="button"
        class="fwCloseButton"
        :class="`fwCloseButton--${validSSBTGameType}`"
        @click="close"
        id="findWinningsCloseButton1"
      ></button>
    </div>
    <h3 :class="`find-winnings-header--${validSSBTGameType}`">{{ $t('findWinnings.header.WON') }}</h3>
    <template v-if="!isSpecialWinnings">
      <h2 :class="`winnings-amount__title--${validSSBTGameType}`">{{ $t('findWinnings.totalWon') }}</h2>
      <div id="winning_amount" class="winnings-amount" :class="`winnings-amount--${validSSBTGameType}`">
        {{ getNetAmount }} &euro;
      </div>
      <div class="outer">
        <div class="winnings-amounts" :class="`winnings-amounts__${validSSBTGameType}`">
          <div :class="`winnings-amounts__${validSSBTGameType}--gross`">
            <span> {{ $t('findWinnings.gross') }}</span>
            <div id="gross_amount">{{ getGrossAmount }} &euro;</div>
          </div>
          <div :class="`winnings-amounts__${validSSBTGameType}--tax`">
            <span> {{ $t('findWinnings.tax') }}</span>
            <div id="tax">{{ getTaxAmount }} &euro;</div>
          </div>
        </div>
      </div>
    </template>
    <div v-if="hasFutureDraws" id="future_draws" class="winnings-amount__future-draws">
      {{ $t('findWinnings.futureDraws') }}
    </div>
    <div v-if="isHighOrSpecialWinnings" id="highWinningsContactAgent" class="winnings-amount__special-winnings">
      {{ $t(highOrSpecialWinningsText) }}
    </div>
    <div v-if="!isPrinterAvailable && canRollover" id="rolloverPrinterError">
      {{ $t('findWinnings.rolloverPrinterError') }}
    </div>
    <div v-if="isSystem">{{ $t('kinoSystemMessage') }}</div>
    <loading :active="loading" v-bind="loadingConfig" class="position-relative" />
    <div v-if="showButtons" class="ctas">
      <div class="ctas__secondary">
        <button
          v-if="isRolloverAvailable"
          id="rolloverYes"
          type="button"
          class="winnings-amount__button"
          :class="`winnings-amount__button--${validSSBTGameType}`"
          @click="rollover"
          :disabled="!isPrinterAvailable"
        >
          {{ $t('rollover') }}
        </button>
        <button
          v-if="isRolloverAndReplayAvailable"
          id="rolloverAndReplay"
          type="button"
          class="winnings-amount__button"
          :class="`winnings-amount__button--${validSSBTGameType}`"
          @click="rolloverAndReplay"
          :disabled="!isPrinterAvailable"
        >
          {{ $t('rolloverAndReplay') }}
        </button>
        <button
          v-if="!isRolloverAvailable && !isRolloverAndReplayAvailable && canReplay && !$_windowWidthMixin_isPortrait"
          id="replay"
          type="button"
          class="winnings-amount__button"
          :class="`winnings-amount__button--${validSSBTGameType}`"
          @click="replay"
          :disabled="!isPrinterAvailable"
        >
          {{ $t('replayWager') }}
        </button>
      </div>
      <div v-if="isRolloverAndInsertBetslipToSessionAvailable" class="ctas__primary">
        <countdown
          v-if="shouldEnableCountdownComponent"
          ref="countdown"
          :end-time="timeToNextDraw"
          @process="handleCountdownProgress"
          @finish="onCountDownEnd"
        />
        <div v-if="showAddTobucketToast" class="add-to-bucket__toast">
          <template v-if="loadingDrawInfo">{{ $t('searchingCurrentDrawInfo') }}</template>
          <template v-if="showTimeLeftToEnterTimeFrame">
            <div class="add-to-bucket__toast-time-message">
              <div class="add-to-bucket__toast-time-message--left">{{ $t('addBetslipToSessionAvailableIn') }}</div>
              <div class="add-to-bucket__toast-time-message--right">{{ timeLeftToEnterTimeFrame }}</div>
            </div>
          </template>
          <font-awesome-icon class="add-to-bucket__toast-arrow" :icon="sortDownIcon" />
        </div>
        <button
          id="rolloverAndAddToSession"
          type="button"
          class="winnings-amount__button winnings-amount__button--primary"
          @click="rolloverAddTicketToBucket"
          :disabled="isInsertBetslipToSessionButtonDisabled"
        >
          <loading class="p-2" :active.sync="loadingDrawInfo" v-bind="spinnerConfig"></loading>
          {{ $t('addWagerToSession') }}
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import faSortDown from '@fortawesome/fontawesome-free-solid/faSortDown';
import Constants from '../../util/Constants';
import { FW_SPINNER_CONFIG, FW_LOADING_CONFIG } from '../../config/loaderConfigs';
import { mapGetters } from 'vuex';
import moduleTypes from '../../store/modules/types';
import configurationModuleTypes from '../../store/modules/ConfigurationStoreModule/types';

const GAME_TYPES = ['POWERSPIN', 'KINO', 'EUROJACKPOT', 'FIREBLAZE'];

const MY_SSBT_GAME_TYPES = ['POWERSPIN', 'KINO'];

export default {
  name: 'WinningScreen',
  components: {
    Loading,
  },
  props: {
    getNetAmount: String,
    getGrossAmount: String,
    getTaxAmount: String,
    hasFutureDraws: Boolean,
    isSpecialWinnings: Boolean,
    isHighWinnings: Boolean,
    isPrinterAvailable: Boolean,
    canRollover: Boolean,
    isRolloverAvailable: Boolean,
    isRolloverAndReplayAvailable: Boolean,
    canReplay: Boolean,
    loadingDrawInfo: Boolean,
    showTimeLeftToEnterTimeFrame: Boolean,
    timeLeftToEnterTimeFrame: String,
    shouldEnableCountdownComponent: Boolean,
    timeToNextDraw: Number,
    isRolloverAndInsertBetslipToSessionAvailable: Boolean,
    isInsertBetslipToSessionButtonDisabled: Boolean,
    shouldDisplayButtons: Boolean,
    loading: Boolean,
    isSystem: Boolean,
    gameType: {
      type: String,
      default: 'DEFAULT',
    },
  },
  data() {
    return {
      sortDownIcon: faSortDown,
      spinnerConfig: FW_SPINNER_CONFIG,
      loadingConfig: FW_LOADING_CONFIG,
    };
  },
  computed: {
    ...mapGetters(moduleTypes.CONFIGURATION_STORE_MODULE, {
      getConfiguration: configurationModuleTypes.getters.GET_CONFIGURATION,
    }),
    showButtons() {
      return this.shouldDisplayButtons && !this.loading;
    },
    showAddTobucketToast() {
      return this.isPrinterAvailable && (this.loadingDrawInfo || this.showTimeLeftToEnterTimeFrame);
    },
    isHighOrSpecialWinnings() {
      return this.isHighWinnings || this.isSpecialWinnings;
    },
    highOrSpecialWinningsText() {
      const message = Constants.FIND_WINNINGS.MESSAGES.HIGH_WIN;
      return this.isSpecialWinnings ? Constants.FIND_WINNINGS.MESSAGES.SPECIAL_WIN : message;
    },
    validSSBTGameType() {
      const validGameTypes = this.getConfiguration.DIGITAL_ASSISTANT.DIGITAL_ASSISTANT_ENABLED
        ? MY_SSBT_GAME_TYPES
        : GAME_TYPES;
      return validGameTypes.includes(this.gameType) ? this.gameType : 'DEFAULT';
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
    rollover() {
      this.$emit('rollover');
    },
    rolloverAndReplay() {
      this.$emit('rollover-and-replay');
    },
    replay() {
      this.$emit('replay');
    },
    rolloverAddTicketToBucket() {
      this.$emit('rollover-add-ticket-to-bucket');
    },
    handleCountdownProgress(timeData) {
      this.$emit('countdown-progress', timeData);
    },
    onCountDownEnd() {
      this.$emit('count-down-end');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../scss-utils/eurojackpot/mixins';

.fwCloseButtonRow {
  position: relative;
  padding: 15px;
  height: 33px !important;
  width: 100% !important;
}

.fwCloseButton {
  position: absolute;
  width: 40px;
  height: 43px;
  border: 0;
  cursor: pointer;
  z-index: 99;
  margin: -10px 0 0 0;
  padding: 1px;
  right: 0.3em;
  vertical-align: top;

  &--POWERSPIN {
    background: url('../../assets/close-white.png') transparent no-repeat center;
    background-size: 27px;
  }

  &--KINO {
    background: url('../../assets/close-black.png') center transparent no-repeat;
    background-size: 27px;
  }

  &--EUROJACKPOT {
    background: url('../../assets/close-yellow.png') transparent no-repeat center;
    background-size: 27px;
  }

  &--FIREBLAZE {
    background: url('../../assets/close-white.png') transparent no-repeat center;
    background-size: 27px;
  }

  &--DEFAULT {
    background: url('../../assets/close-white.png') transparent no-repeat center;
    background-size: 27px;
  }
}

h3.find-winnings-header {
  &--KINO {
    text-decoration: solid;
    font-size: 2.6rem;
    font-weight: bold;
    -webkit-text-stroke: 1.3px white;
    text-shadow: 0px 0px 6px #000;
  }

  &--DEFAULT {
    font-size: 2.6rem;
    font-weight: bold;
    line-height: 2.3rem;
  }

  &--POWERSPIN {
    font-size: 2.6rem;
    font-weight: bold;
    line-height: 2.3rem;
  }

  &--FIREBLAZE {
    font-size: 2.6rem;
    font-weight: bold;
    line-height: 2.3rem;
  }

  &--EUROJACKPOT {
    font-size: 1.9rem;
    font-weight: 700;
    line-height: 2.2rem;
  }
}

.winnings-amount {
  padding-bottom: 20px;
  font-weight: 900;

  &--DEFAULT {
    line-height: 3.7rem;
    font-size: 3.3rem;
  }

  &--KINO {
    line-height: 5rem;
    font-size: 4.5rem;
    letter-spacing: -5px;
    -webkit-text-stroke: 1.5px white;
    text-shadow: 0px 0px 7px #000;
  }

  &--POWERSPIN {
    line-height: 3.7rem;
    font-size: 3.3rem;
  }

  &--FIREBLAZE {
    line-height: 3.7rem;
    font-size: 3.3rem;
  }

  &--EUROJACKPOT {
    line-height: 3.7rem;
    font-weight: 700;
    font-size: 3.1rem;
  }
}

.outer {
  display: flex;
  justify-content: center;
  align-items: center;
}

.winnings-amounts {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 7px 0;
  font-weight: bold;
  border-radius: 5px;

  &__KINO {
    background: #ffffff30;

    &--gross,
    &--tax {
      padding: 0 30px;
    }

    &--gross {
      border-right: 2px solid #af9544;
    }

    &--gross > div,
    &--tax > div {
      padding-top: 10px;
      font-size: 2rem;
      line-height: 2rem;
    }
  }

  &__DEFAULT,
  &__POWERSPIN,
  &__FIREBLAZE {
    width: 100%;
    justify-content: center;

    &--gross,
    &--tax {
      border-radius: inherit;
      background: #2e1e93;
      border: white 1px solid;
      padding: 10px 30px;
      margin-right: 10px;
      width: 230px;

      span {
        font-weight: normal;
        letter-spacing: 2px;
      }

      div {
        padding-top: 10px;
        font-size: 2rem;
        line-height: 2rem;
      }
    }
  }

  &__EUROJACKPOT {
    width: 100%;
    justify-content: center;

    &--gross,
    &--tax {
      border-radius: 10px;
      background: transparent;
      border: white 1px solid;
      margin-right: 10px;
      padding: 5px;
      width: 180px;

      span {
        font-weight: 400;
        line-height: 14px;
        font-size: 1rem;
      }

      div {
        font-size: 1.5rem;
        font-weight: 800;
      }
    }
  }
}

.winnings-amount__title {
  &--KINO {
    font-size: 1.5rem;
    padding: 15px 0;
    font-weight: bold;
  }

  &--DEFAULT,
  &--POWERSPIN,
  &--FIREBLAZE {
    padding: 15px 0;
    font-size: 1.5rem;
    font-weight: normal;
    line-height: 18px;
    letter-spacing: 1px;
  }

  &--EUROJACKPOT {
    font-size: 1rem;
    padding: 15px 0;
    font-weight: 400;
  }
}

.winnings-amount__future-draws,
.winnings-amount__special-winnings {
  background: #ffffff30;
  margin: 15px -1rem;
  padding: 10px;
  font-size: 1.2rem;
  font-weight: bold;
}

.winnings-amount__button {
  background: transparent;
  border: 2px solid;
  border-radius: 5px;
  padding: 15px 10px;
  font-weight: bold;
  margin: 2px;
  position: relative;

  &--DEFAULT,
  &--POWERSPIN,
  &--FIREBLAZE {
    border-color: white;
    color: white;
    font-weight: normal;
  }

  &--EUROJACKPOT {
    @include eurojackpot-modal-button;
  }
}

.ctas {
  padding: 45px 15px 10px 15px;
  display: flex;
  justify-content: space-between;
}

.ctas__secondary {
}

.ctas__secondary button:disabled {
  opacity: 0.7;
}

.ctas__primary {
  text-align: right;
  position: relative;
}

.add-to-bucket__toast {
  position: absolute;
  right: 0;
  bottom: 65px;
  width: 260px;
  background-color: #08658e;
  border-radius: 5px;
  padding: 5px;
  text-align: center;
  color: #fff;
  font-size: 0.8rem;
  z-index: 1;
}

.add-to-bucket__toast-arrow {
  position: absolute;
  right: 3px;
  bottom: -10px;
  color: #08658e;
  font-size: 2rem;
}

.add-to-bucket__toast-time-message {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
}

.add-to-bucket__toast-time-message--left {
  text-align: left;
  flex: 2;
  line-height: 1rem;
}

.add-to-bucket__toast-time-message--right {
  flex: 1;
  font-size: 1.4rem;
}

.winnings-amount__button--primary {
  background: black;
  color: white;
  width: 65%;
  padding: 3px 10px;
}

.winnings-amount__button--primary:disabled {
  background: #ccc;
}
</style>
