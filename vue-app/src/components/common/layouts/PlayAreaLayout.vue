<template>
  <div class="play-area-layout" :style="{ 'background-image': `url(${getJackpotBackground})` }">
    <div class="play-area-layout__settings" v-if="showSettings">
      <slot name="settings"></slot>
    </div>
    <div class="play-area-layout__play-area">
      <slot></slot>
    </div>
    <div class="play-area-layout__side-screen">
      <slot name="sidescreen"></slot>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import moduleTypes from '../../../store/modules/types';
import Constants from '../../../util/Constants';
import EurojackpotExtraBackgroundImg from '../../../assets/eurojackpot/eurojackpot-extra-background.png';
import sessionStoreModuleTypes from '../../../store/modules/SessionStoreModule/types';

export default {
  name: 'PlayAreaLayout',
  computed: {
    ...mapState(moduleTypes.EUROJACKPOT_GAME_STORE_MODULE, ['isActiveDrawExtra']),
    ...mapState(moduleTypes.SESSION_STORE_MODULE, {
      gameType: sessionStoreModuleTypes.state.GAME_TYPE,
    }),
    showSettings() {
      return !!this.$slots.settings;
    },
    isThemeEurojackpot() {
      return this.gameType.toLowerCase() === Constants.ROUTE_NAMES.EUROJACKPOT && this.isActiveDrawExtra;
    },
    getJackpotBackground() {
      return this.isThemeEurojackpot && EurojackpotExtraBackgroundImg;
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../../scss-utils/common/variables';

.play-area-layout {
  width: 100vw;
  height: $play-area-height;
  display: flex;
  flex-direction: row;
  background-repeat: no-repeat;
  background-size: cover;

  &__settings {
    width: $settings-area-width;
  }

  &__play-area {
    flex: 1;
  }

  &__side-screen {
    width: $sidescreen-area-width;
  }
  &__extra-background {
    background: red;
  }
}
</style>
