<template>
  <div class="live-board-iframe">
    <iframe
      class="live-board-iframe__item"
      :class="`live-board-iframe__item--${iframeType}`"
      :src="iframeUrl"
      v-reloadIframe="false"
      scrolling="no"
      frameborder="0"
      @load="$emit('powerspin-iframe-load', iframeType)"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import reloadIframe from '../../lobby/games/kino/LiveDraw/Directives/ReloadIframe';
import moduleTypes from '../../../store/modules/types';
import configurationModuleTypes from '../../../store/modules/ConfigurationStoreModule/types';

const GAME_TYPES = ['powerspin', 'multispin', 'fireblaze'];
export default {
  name: 'LiveBoardIframe',
  directives: {
    reloadIframe,
  },
  props: {
    iframeType: {
      type: String,
      required: true,
      validator: value => GAME_TYPES.includes(value),
    },
  },
  computed: {
    ...mapGetters(moduleTypes.CONFIGURATION_STORE_MODULE, {
      drawUrls: configurationModuleTypes.getters.GET_LIVE_DRAW_URLS,
    }),
    iframeUrl() {
      return this.drawUrls[this.iframeType];
    },
  },
};
</script>

<style lang="scss" scoped>
.live-board-iframe {
  display: flex;
  align-items: center;
  &__item {
    width: 100%;
    height: 55%;
    border: none;
    &--fireblaze {
      width: 1920px;
      height: 1080px;
      border: none;
      transform: scale(0.84, 0.77);
      transform-origin: 0;
      @media screen and (min-width: 1700px) {
        transform: scale(1, 0.94);
      }
    }
  }
}
</style>
