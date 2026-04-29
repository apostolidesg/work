<template>
  <div class="quickbets__footer">
    <span class="quickbets__footer-header">{{ $t('consecutiveDraws') }}</span>
    <div class="quickbets__footer-number-container">
      <span
        class="quickbets__footer-number"
        :class="{ 'quickbets__footer-number--active': consecutiveDraws === number }"
        @click="setConsecutiveDraws(number)"
        v-for="number in 5"
        :key="number"
        >{{ number }}</span
      >
      <QuickbetsDrawsSelector :consecutiveDraws="consecutiveDraws" @update:consecutiveDraws="setConsecutiveDraws" />
    </div>
    <SubmitWager
      :betslip="activeBetslip"
      #default="slots"
      @place-bet-success="redirectAfterSuccess"
      @place-bet-error="$emit('place-bet-error', $event)"
      :reset-betslip="false"
    >
      <QuickPlaySubmitWagerButton :betSlipValue="getActiveBetslipCost" :theme="theme" v-bind="slots" />
    </SubmitWager>
  </div>
</template>

<script>
import moduleTypes from '@/store/modules/types';
import { mapActions, mapState, mapGetters } from 'vuex';
import kinoGameModuleTypes from '@/store/modules/KinoStoreModule/types';
import QuickbetsDrawsSelector from './QuickbetsDrawsSelector.vue';
import powerspinModuleTypes from '@/store/modules/PowerspinBetslipStoreModule/types';
import Constants from '@/util/Constants';
import SubmitWager from '@/components/common/SubmitWager.vue';
import QuickPlaySubmitWagerButton from './QuickPlaySubmitWagerButton.vue';
import sessionStoreModuleTypes from '@/store/modules/SessionStoreModule/types';
import gtag from '@/util/gtag';
import gtmEvents from '@/constants/gtmEvents';

export default {
  name: 'QuickbetsFooter',
  components: {
    QuickbetsDrawsSelector,
    SubmitWager,
    QuickPlaySubmitWagerButton,
  },
  props: {
    theme: {
      type: String,
    },
  },
  data() {
    return {
      consecutiveDraws: 1,
    };
  },
  computed: {
    ...mapState(moduleTypes.KINO_GAME_STORE_MODULE, {
      kinoBetslip: kinoGameModuleTypes.state.BETSLIP,
    }),
    ...mapState(moduleTypes.POWERSPIN_GAME_STORE_MODULE, {
      powerspinBetslipArray: powerspinModuleTypes.state.BETSLIP_ARRAY,
    }),
    ...mapGetters(moduleTypes.SESSION_STORE_MODULE, {
      getActiveBetslipCost: sessionStoreModuleTypes.getters.GET_ACTIVE_BETSLIP_COST,
    }),
    activeBetslip() {
      if (this.theme === Constants.THEMES.KINO) {
        return this.kinoBetslip;
      } else if (this.theme === Constants.THEMES.POWERSPIN) {
        return this.powerspinBetslipArray;
      }
    },
  },
  methods: {
    ...mapActions(moduleTypes.KINO_GAME_STORE_MODULE, {
      setKinoConsecutiveDraws: kinoGameModuleTypes.actions.SET_CONSECUTIVE_DRAWS,
    }),
    ...mapActions(moduleTypes.POWERSPIN_GAME_STORE_MODULE, {
      setPowerspinBetslipConsecutiveDraws: powerspinModuleTypes.actions.SET_BETSLIP_CONSECUTIVE_DRAWS,
    }),
    setConsecutiveDraws(number, withoutGtm = false) {
      this.consecutiveDraws = number;
      if (this.theme === Constants.THEMES.KINO) {
        this.setKinoConsecutiveDraws({ multipleDraws: number });
      } else if (this.theme === Constants.THEMES.POWERSPIN) {
        this.setPowerspinBetslipConsecutiveDraws({ multipleDraws: number });
      }

      if (!withoutGtm) {
        gtag.sendEvent(gtmEvents.SSBT_CONSECUTIVE_DRAWS_CHANGED, {
          consecutiveDraws: number,
          game: this.theme,
        });
      }
    },
    redirectAfterSuccess() {
      if (this.theme === Constants.THEMES.KINO) {
        this.$router.push({ name: Constants.ROUTE_NAMES.KINO_QUICKPLAY });
      } else if (this.theme === Constants.THEMES.POWERSPIN) {
        this.$router.push({ name: Constants.ROUTE_NAMES.POWERSPIN_QUICKPLAY });
      }
      this.$emit('place-bet-success');
    },
  },
  mounted() {
    if (this.theme === Constants.THEMES.KINO) {
      this.setConsecutiveDraws(1, true);
    } else if (this.theme === Constants.THEMES.POWERSPIN) {
      this.setConsecutiveDraws(this.powerspinBetslipArray[0].wager.participatingDraws.multipleDraws, true);
    }
  },
};
</script>

<style lang="scss" scoped>
.quickbets__footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
  gap: 10px;

  &-header {
    font-weight: 600;
    font-size: 32px;
    color: var(--color-white);
  }

  &-number {
    position: relative;
    background: transparent;
    height: 85px;
    width: 85px;
    border-radius: var(--border-radius-md);
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--color-quickbets-draw-selector-bg);
    font-size: 32px;
    font-weight: 600;
    transition: all 0.3s ease;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: var(--border-radius-md);
      border: 3px solid transparent;
      background: var(--gradient-kino-border);
      mask: linear-gradient(var(--color-white) 0 0) content-box, linear-gradient(var(--color-white) 0 0);
      mask-composite: exclude;
      z-index: 2;
    }

    &--active {
      background: linear-gradient(0deg, var(--color-yellow-warm), var(--color-yellow-warm)),
        radial-gradient(180% 180% at 0% 100%, var(--color-orange-light) 0%, rgba(255, 123, 28, 0) 100%),
        radial-gradient(140% 140% at 100% 0%, var(--color-orange-bright) 0%, rgba(255, 230, 0, 0) 100%),
        radial-gradient(100% 100% at 0% 0%, var(--color-yellow-mid) 0%, rgba(255, 173, 27, 0) 100%);
      color: var(--color-black);

      &::after {
        background: none;
      }
    }
  }

  &-number-container {
    display: flex;
    gap: 15px;
  }
}
</style>
