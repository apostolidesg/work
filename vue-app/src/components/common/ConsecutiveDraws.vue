<template>
  <div class="consecutive-draws">
    <div class="consecutive-draws__wrapper">
      <div class="consecutive-draws__multiplier d-flex justify-content-center">
        <div
          class="consecutive-draws__header"
          :class="`consecutive-draws__header--${theme}`"
          id="ssbt_consecutive_draws_header_text"
        >
          {{ $t('consDraws') }}
        </div>
        <form v-on:submit.prevent>
          <div class="consecutive-draws__minusPlusArea">
            <input
              id="consecutive-draws-input"
              readonly
              class="consecutive-draws__input"
              :class="`consecutive-draws__input--${theme}`"
              type="text"
              v-model="consecutiveDraws"
            />
            <MinusPlusButton
              @click="decreaseConsecutiveDraws"
              id="ssbt_decrease_consecutive_draws_button"
              type="minus"
              :theme="theme"
            />
            <MinusPlusButton
              @click="increaseConsecutiveDraws"
              id="ssbt_increase_consecutive_draws_button"
              type="plus"
              :theme="theme"
            />
            <ConsDrawsCalcPad
              id="ssbt_consecutive_draws_calc_pad"
              targetElement="consecutive-draws-input"
              @update-consecutive-draws="updateConsecutiveDrawsFromCalcPad"
            >
            </ConsDrawsCalcPad>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import ConsDrawsCalcPad from '../lobby/games/kino/sidescreen/ConsDrawsCalcPad/ConsDrawsCalcPad';
import MinusPlusButton from './MinusPlusButton';
import Constants from '../../util/Constants';
import { mapState } from 'vuex';
import moduleTypes from '../../store/modules/types';
import SessionStoreModuleTypes from '../../store/modules/SessionStoreModule/types';

const MAX_CONSECUTIVE_DRAWS_MAPPER = {
  [Constants.GENERAL_GAME_TYPES.KINO]: Constants.KINO_MAX_CONSECUTIVE_DRAWS_VALUE,
  [Constants.GENERAL_GAME_TYPES.POWERSPIN]: Constants.POWERSPIN_MAX_CONSECUTIVE_DRAWS_VALUE,
  [Constants.GENERAL_GAME_TYPES.EUROJACKPOT]: Constants.EUROJACKPOT_MAX_CONSECUTIVE_DRAWS_VALUE,
  [Constants.GENERAL_GAME_TYPES.FIREBLAZE]: Constants.FIREBLAZE_MAX_CONSECUTIVE_DRAWS_VALUE,
};

const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
};

export default {
  name: 'ConsecutiveDraws',
  props: {
    multipleDraws: { type: Number, required: true },
    theme: {
      type: String,
      required: false,
      default: THEMES.LIGHT,
      validator: value => Object.values(THEMES).includes(value),
    },
  },
  components: {
    MinusPlusButton,
    ConsDrawsCalcPad,
  },
  methods: {
    updateConsecutiveDrawsFromCalcPad(value) {
      this.consecutiveDraws = value;
    },
    increaseConsecutiveDraws() {
      if (parseInt(this.consecutiveDraws) === MAX_CONSECUTIVE_DRAWS_MAPPER[this.gameType]) return;
      if (this.consecutiveDraws === '') {
        this.consecutiveDraws = 1;
      } else {
        this.consecutiveDraws++;
      }
    },
    decreaseConsecutiveDraws() {
      if (parseInt(this.consecutiveDraws) === Constants.MIN_CONSECUTIVE_DRAWS_VALUE) return;

      if (this.consecutiveDraws === '') {
        this.consecutiveDraws = 1;
      } else {
        this.consecutiveDraws--;
      }
    },
  },
  computed: {
    consecutiveDraws: {
      get() {
        return this.multipleDraws;
      },
      set(newValue) {
        this.$emit('update-consecutive-draws', newValue);
      },
    },
    ...mapState(moduleTypes.SESSION_STORE_MODULE, {
      gameType: SessionStoreModuleTypes.state.GAME_TYPE,
    }),
  },
};
</script>

<style lang="scss" scoped>
.consecutive-draws {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 3px;
  &__wrapper {
    flex: 0 0 100%;
    max-width: 100%;
    padding-top: 0 !important;
  }
  &__multiplier > div,
  &__multiplier > form {
    display: inline-block;
  }
  &__header {
    vertical-align: bottom;
    width: 120px;
    font-size: 13.36px;
    font-weight: 900;

    &--light {
      color: rgba(255, 255, 255, 0.7);
    }

    &--dark {
      color: #2d210b;
    }
  }
  &__minusPlusArea {
    text-align: center;
  }
  &__input {
    margin: 0;
    border-radius: 7.3px;
    width: 133px;
    height: 44px;
    font-weight: 900;
    text-align: center;
    border: none;
    position: relative;
    cursor: pointer;
    font-size: 23px;
    &:disabled {
      color: #123d52 !important;
    }

    &--light {
      background-color: rgba(255, 255, 255, 0.7);
    }

    &--dark {
      background-color: white;
    }
  }
}
</style>
