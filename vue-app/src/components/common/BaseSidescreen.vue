<template>
  <div class="h-100">
    <SidescreenLayout v-show="!printerError" :theme="theme">
      <template #header v-if="hasHeader">
        <slot name="header"></slot>
      </template>
      <template #default>
        <slot name="default"></slot>
      </template>
      <template #static v-if="hasStaticContent">
        <slot name="static"></slot>
      </template>
      <template #footer>
        <ConsecutiveDraws
          :multiple-draws="multipleDraws"
          :theme="theme"
          @update-consecutive-draws="handleUpdateMultipleDraws"
          class="mb-3"
        />
        <SubmitWager
          :betslip="betslip"
          #default="slots"
          @place-bet-error="handlePlaceBetErrorCode"
          @place-bet-success="$emit('place-bet-success')"
          @submit-clicked="handleSubmitClicked"
        >
          <SubmitWagerButton v-bind="slots"/>
        </SubmitWager>
      </template>
    </SidescreenLayout>
    <div v-show="printerError" class="sidescreen__printer-error">
      <img src="../../assets/printer-error-msg.png" class="sidescreen__printer-error-icon" alt="printer error"/>
      <strong class="sidescreen__printer-error-message">{{ $t('printerErrorMessage') }}</strong>
    </div>
  </div>
</template>

<script>
import to from 'await-to-js';
import {mapActions, mapGetters} from 'vuex';
import EventSenderService from '../../handler/EventSenderService';
import EventTypes from '../../handler/EventTypes';
import {PlaceBetErrorMessages} from '../../model/PlaceBetError';
import configurationStoreModuleTypes from '../../store/modules/ConfigurationStoreModule/types';
import sessionStoreModuleTypes from '../../store/modules/SessionStoreModule/types';
import moduleTypes from '../../store/modules/types';
import Constants from '../../util/Constants';
import {logToMainProcess} from '../../util/LoggerService';
import ConsecutiveDraws from './ConsecutiveDraws.vue';
import SidescreenLayout from './layouts/SidescreenLayout.vue';
import SubmitWager from './SubmitWager.vue';
import SubmitWagerButton from './SumbitWagerButton.vue';
import gtag from '@/util/gtag';
import gtmEvents from '@/constants/gtmEvents';

const GAME_TO_THEME_MAPPER = {
  [Constants.GENERAL_GAME_TYPES.KINO]: 'light',
  [Constants.GENERAL_GAME_TYPES.POWERSPIN]: 'light',
  [Constants.GENERAL_GAME_TYPES.EUROJACKPOT]: 'dark',
  [Constants.GENERAL_GAME_TYPES.FIREBLAZE]: 'light',
};

const GTAG_EVENTS_MAPPER = {
  [Constants.GENERAL_GAME_TYPES.KINO]: gtmEvents.SSBT_LOTTERY_KINO_MANUAL_SUBMIT,
  [Constants.GENERAL_GAME_TYPES.POWERSPIN]: gtmEvents.SSBT_LOTTERY_POWERSPIN_MANUAL_SUBMIT,
  [Constants.GENERAL_GAME_TYPES.EUROJACKPOT]: gtmEvents.SSBT_LOTTERY_EUROJACKPOT_MANUAL_SUBMIT,
  [Constants.GENERAL_GAME_TYPES.FIREBLAZE]: gtmEvents.SSBT_LOTTERY_FIREBLAZE_MANUAL_SUBMIT,
};

export default {
  name: 'BaseSidescreen',
  components: {ConsecutiveDraws, SubmitWagerButton, SubmitWager, SidescreenLayout},
  props: {
    betslip: {
      type: [Object, Array],
      required: true,
    },
  },
  data() {
    return {
      printerError: false,
    };
  },
  computed: {
    ...mapGetters(moduleTypes.CONFIGURATION_STORE_MODULE, {
      getConfiguration: configurationStoreModuleTypes.getters.GET_CONFIGURATION,
    }),
    ...mapGetters(moduleTypes.SESSION_STORE_MODULE, {
      consecutiveDraws: sessionStoreModuleTypes.getters.GET_ACTIVE_BETSLIP_CONSECUTIVE_DRAWS,
      gameType: sessionStoreModuleTypes.getters.GET_GAME_TYPE,
      activeBetslipCost: sessionStoreModuleTypes.getters.GET_ACTIVE_BETSLIP_COST,
    }),
    hasHeader() {
      return !!this.$slots.header;
    },
    theme() {
      return GAME_TO_THEME_MAPPER[this.gameType];
    },
    multipleDraws() {
      return this.consecutiveDraws || Constants.MIN_CONSECUTIVE_DRAWS_VALUE;
    },
  },
  async mounted() {
    if (this.getConfiguration.IPC_RENDERER_ENABLED) {
      this.$eventHub.$on('printerAvailable', this.isPrinterAvailable);
      const [err, isPrinterStatusValid] = await to(
        EventSenderService.sendSyncRequest(EventTypes.PRINTER_STATUS_EVENT_TYPE)
      );
      if (!err) {
        this.printerError = !isPrinterStatusValid;
      } else {
        logToMainProcess('PRINTER_STATUS_ERROR', err);
      }
    }
  },
  beforeDestroy() {
    if (this.getConfiguration.IPC_RENDERER_ENABLED) {
      this.$eventHub.$off('printerAvailable');
    }
  },
  methods: {
    ...mapActions(moduleTypes.SESSION_STORE_MODULE, {
      setConsecutiveDraws: sessionStoreModuleTypes.actions.SET_BETSLIP_CONSECUTIVE_DRAWS,
    }),
    handlePlaceBetErrorCode(errorCode) {
      switch (errorCode) {
        case PlaceBetErrorMessages.PRINTER_UNAVAILABLE:
          this.printerError = true;
          break;
        default:
          break;
      }
    },
    handleSubmitClicked() {
      const betslipData = {
        gameType: this.gameType,
        cost: this.activeBetslipCost,
      };
      gtag.sendEvent(GTAG_EVENTS_MAPPER[this.gameType], betslipData);
    },
    handleUpdateMultipleDraws(multipleDraws) {
      this.setConsecutiveDraws({multipleDraws});
    },
    isPrinterAvailable(state) {
      this.printerError = !state;
    },
    hasStaticContent() {
      return !!this.$slots.static;
    },
  },
};
</script>

<style scoped lang="scss">
.sidescreen__printer-error {
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: min-content;

  &-icon {
    width: 200px;
    height: 200px;
  }

  &-message {
    display: flex;
    flex-direction: column;
    color: white;
    font-size: 25px;
    text-align: center;
  }
}
</style>
