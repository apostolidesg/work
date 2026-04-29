<template>
  <div class="fireblaze-settings">
    <div class="fireblaze-settings__wrapper">
      <div class="fireblaze-settings__quickpick">
        <FireblazeQuickPick @quick-pick-click="quickPick" />
      </div>
      <div class="fireblaze-settings__line"></div>
      <div class="fireblaze-settings__options">
        <FireblazeOptions :active-bet-type="selectedBoardBetType" @bet-type-click="selectBetType" />
      </div>
    </div>
    <div v-if="!isAdvertisementIconHidden" class="fireblaze-settings__advertisement-wrapper">
      <div class="fireblaze-settings__advertisement">
        <FireblazeAdvertisementBackground class="fireblaze-settings__advertisement-background" />
        <FireblazeAdvertisementLogo class="fireblaze-settings__advertisement-logo" />
        <div class="fireblaze-settings__advertisement-text">{{ $t('fireblaze.advertisementText') }}</div>
        <FireblazeAdvertisementAmount class="fireblaze-settings__advertisement-amount" />
      </div>
    </div>
  </div>
</template>

<script>
import FireblazeQuickPick from './FireblazeQuickPick.vue';
import FireblazeOptions from './FireblazeOptions.vue';
import FireblazeAdvertisementBackground from '../../../../../assets/fireblaze/advertisement-background.svg?inline';
import FireblazeAdvertisementLogo from '../../../../../assets/fireblaze/advertisement-logo.svg?inline';
import FireblazeAdvertisementAmount from '../../../../../assets/fireblaze/advertisement-amount.svg?inline';
import { mapGetters, mapActions } from 'vuex';
import moduleTypes from '../../../../../store/modules/types';
import fireblazeModuleTypes from '../../../../../store/modules/FireblazeStoreModule/types';
import configurationStoreModule from '../../../../../store/modules/ConfigurationStoreModule/types';
import FireblazeConstants from '../../../../../util/fireblazeConstants';

export default {
  name: 'FireblazeSettings',
  components: {
    FireblazeAdvertisementBackground,
    FireblazeAdvertisementLogo,
    FireblazeAdvertisementAmount,
    FireblazeQuickPick,
    FireblazeOptions,
  },
  computed: {
    ...mapGetters(moduleTypes.FIREBLAZE_GAME_STORE_MODULE, {
      getSelectedBoard: fireblazeModuleTypes.getters.GET_SELECTED_BOARD,
    }),
    ...mapGetters(moduleTypes.CONFIGURATION_STORE_MODULE, {
      isAdvertisementIconHidden: configurationStoreModule.getters.IS_ADVERTISEMENT_ICON_HIDDEN,
    }),
    selectedBoardBetType() {
      return this.getSelectedBoard?.betType || FireblazeConstants.BET_TYPES.DEFAULT;
    },
  },
  methods: {
    ...mapActions(moduleTypes.FIREBLAZE_GAME_STORE_MODULE, {
      quickPick: fireblazeModuleTypes.actions.QUICK_PICK,
      selectBetType: fireblazeModuleTypes.actions.SET_BOARD_BETTYPE,
    }),
  },
};
</script>

<style lang="scss" scoped>
@import '../../../../../scss-utils/fireblaze/colors';

.fireblaze-settings {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: $gradient-pink-purple;
  height: 100%;
  color: $color-primary-white;
  font-size: 1em;
  padding: 1em 0.5em;

  &__wrapper {
    display: flex;
    flex-direction: column;
  }

  &__line {
    border: solid 1px $color-third-brown-opacity;
    margin: 1em 0;
  }

  &__advertisement {
    position: relative;

    &-background {
      position: relative;
    }
    &-logo {
      position: absolute;
      top: 10%;
      left: 50%;
      transform: translate(-50%, -10%);
    }
    &-text {
      position: absolute;
      top: 55%;
      left: 50%;
      transform: translate(-50%, -55%);
      color: $color-third-yellow;
      font-weight: bold;
    }
    &-amount {
      position: absolute;
      top: 85%;
      left: 50%;
      transform: translate(-50%, -85%);
    }
  }
}
</style>
