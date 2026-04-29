<template>
  <div id="ssbt_header_balance_box" :class="['ssbt_header_balance_box', `ssbt_header_balance_box--${textTheme}`]">
    <template v-if="digitalAssistantEnabled || isKinoRoute">
      <img
        id="ssbt_balance_eye_icon"
        :class="['ssbt_header_balance_box__eye-icon', iconColorClass]"
        width="30"
        alt="balance"
        :src="eyeIconBlack"
        @click="handleToggle"
      />
      <span
        v-if="balanceVisible"
        id="ssbt_balance_value"
        class="ssbt_header_balance_box__balance-value"
        :class="{ 'ssbt_header_balance_box__balance-value--white': shouldShowWhiteText }"
      >
        <img
          id="ssbt_balance_refresh"
          :class="['ssbt_header_balance_box__refresh-button', iconColorClass]"
          :src="syncIconBlack"
          @click="$emit('update-balance')"
          alt="refresh"
        />
        {{ balanceText }}&euro;
      </span>
      <span
        v-else
        id="ssbt_balance_txt"
        class="ssbt_header_balance_box__balance-text"
        :class="{ 'ssbt_header_balance_box__balance-text--white': shouldShowWhiteText }"
      >
        {{ $t('hiddenBalanceText') }}
      </span>
    </template>

    <template v-else>
      <font-awesome-icon
        class="ssbt_header_balance_box__eye-icon--old"
        id="ssbt_balance_eye_icon"
        width="50"
        alt="balance"
        :icon="['far', 'eye']"
        @click="$emit('toggle-balance')"
      />
      <span v-if="showBalance" id="ssbt_balance_value" class="ssbt_header_balance_box__balance-value--old">
        <font-awesome-icon
          class="ssbt_header_balance_box__refresh-button--old"
          id="ssbt_balance_refresh"
          :icon="['fa', 'sync']"
          @click="$emit('update-balance')"
          alt="refresh"
        />
        {{ balanceText }}&euro;
      </span>
      <span v-if="!showBalance" id="ssbt_balance_txt" class="ssbt_header_balance_box__balance-text--old">{{
        $t('hiddenBalanceText')
      }}</span>
    </template>
  </div>
</template>

<script>
import Utilities from '../../../util/Utilities';
import { mapGetters } from 'vuex';
import moduleTypes from '../../../store/modules/types';
import sessionStoreModuleTypes from '../../../store/modules/SessionStoreModule/types';
import ConfigurationStoreModule from '../../../store/modules/ConfigurationStoreModule/types';
import Constants from '../../../util/Constants';
import eyeIconBlack from '../../../assets/new-header/eyeIcon.svg';
import syncIconBlack from '../../../assets/new-header/syncIcon.svg';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye } from '@fortawesome/fontawesome-free-regular';
import { faSync } from '@fortawesome/fontawesome-free-solid';

library.add(faEye, faSync);

const TEXT_THEMES = {
  WHITE: 'white',
  BLACK: 'black',
  CLEAR_WHITE: 'clear-white',
};

export default {
  name: 'LobbyHeaderBalanceBox',
  props: {
    textTheme: {
      type: String,
      default: TEXT_THEMES.BLACK,
      validator: (value) => Object.values(TEXT_THEMES).includes(value),
    },
  },
  data() {
    return {
      eyeIconBlack,
      syncIconBlack,
      localVisibility: true,
    };
  },
  computed: {
    ...mapGetters(moduleTypes.SESSION_STORE_MODULE, {
      getBalance: sessionStoreModuleTypes.getters.GET_BALANCE,
      showBalance: sessionStoreModuleTypes.getters.GET_BALANCE_VISIBILITY,
    }),
    ...mapGetters(moduleTypes.CONFIGURATION_STORE_MODULE, {
      digitalAssistantEnabled: ConfigurationStoreModule.getters.IS_DIGITAL_ASSISTANT_ENABLED,
    }),
    isGameRoute() {
      const { KINO, KINO_QUICKPLAY, QUICKBETS, POWERSPIN, POWERSPIN_QUICKPLAY, POWERSPIN_QUICKBETS } =
        Constants.ROUTE_NAMES;
      return [KINO, KINO_QUICKPLAY, QUICKBETS, POWERSPIN, POWERSPIN_QUICKPLAY, POWERSPIN_QUICKBETS].includes(
        this.$route.name
      );
    },
    balanceVisible() {
      return this.isGameRoute ? this.showBalance : this.localVisibility;
    },
    balanceText() {
      return Utilities.formatNumber(this.getBalance);
    },
    iconColorClass() {
      const routeName = this.$route.name;
      const { KINO, POWERSPIN, FIREBLAZE, EUROJACKPOT } = Constants.ROUTE_NAMES;
      switch (routeName) {
        case KINO:
          return 'ssbt_header_balance_box__icon--kino';
        case POWERSPIN:
        case FIREBLAZE:
          return 'ssbt_header_balance_box__icon--powerspin-fireblaze';
        case EUROJACKPOT:
          return 'ssbt_header_balance_box__icon--default';
        default:
          return 'ssbt_header_balance_box__icon--non-play-area';
      }
    },
    shouldShowWhiteText() {
      const routeName = this.$route.name;
      const { KINO, POWERSPIN, FIREBLAZE } = Constants.ROUTE_NAMES;
      if (routeName === KINO) {
        return false;
      }
      return this.digitalAssistantEnabled || routeName === POWERSPIN || routeName === FIREBLAZE;
    },
    isKinoRoute() {
      return this.$route.name === Constants.ROUTE_NAMES.KINO;
    },
  },
  watch: {
    $route() {
      if (!this.isGameRoute) {
        this.localVisibility = true;
      }
    },
  },
  methods: {
    handleToggle() {
      if (this.isGameRoute) {
        this.$emit('toggle-balance');
      } else {
        this.localVisibility = !this.localVisibility;
        this.$emit('toggle-balance');
      }
    },
  },
  watch: {
    $route() {
      if (!this.isGameRoute) {
        this.localVisibility = true;
      }
    },
  },
  methods: {
    handleToggle() {
      if (this.isGameRoute) {
        this.$emit('toggle-balance');
      } else {
        this.localVisibility = !this.localVisibility;
        this.$emit('toggle-balance');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../scss-utils/powerspin/colors';

.ssbt_header_balance_box {
  font-size: 18.96px;
  width: 150px !important;
  font-weight: 900;
  display: flex;
  flex-direction: column;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  &--black {
    color: rgba(0, 0, 0, 0.6);
  }
  &--white {
    color: rgba(255, 255, 255, 0.7);
  }
  &--clear-white {
    color: $color-primary-white;
  }

  align-items: center;
  &__balance-value {
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    &--white {
      color: white;
    }
  }
  &__balance-text {
    font-weight: 900;
    font-size: 11.36px;
    text-align: center;
    line-height: 29px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    &--white {
      color: white;
    }
  }
  &__refresh-button {
    width: 15px;
    height: 15px;
    cursor: pointer;
    margin-right: 5px;
  }
  &__eye-icon {
    width: 30px;
    height: 30px;
    align-self: center;
    cursor: pointer;
  }
  &__icon {
    &--kino {
      filter: brightness(0);
    }
    &--powerspin-fireblaze {
      filter: brightness(0) invert(1);
    }
    &--non-play-area {
      filter: brightness(0) invert(1);
    }
    &--default {
      filter: brightness(0);
    }
  }

  &__balance-text--old {
    font-weight: 900;
    font-size: 11.36px;
    text-align: center;
    line-height: 29px;
  }
  &__refresh-button--old {
    font-size: 15px;
  }
  &__eye-icon--old {
    font-size: 30px;
    margin: 0 auto;
  }
}
</style>
