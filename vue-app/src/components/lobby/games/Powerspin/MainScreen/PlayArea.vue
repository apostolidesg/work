<template>
  <div class="play-area h-100">
    <PlayPowerspinHeader :mode="playMode" @mode-changed="handleModeChange" />
    <component :is="renderComponent"></component>
  </div>
</template>

<script>
import PlayPowerspinHeader from './PlayPowerspinHeader.vue';
import Constants from '../../../../../util/Constants';
import PlayWheels from './PlayWheels.vue';
import PlayMarkets from './PlayMarkets.vue';
import EventHubTypes from '../../../../../util/EventHubTypes';

export default {
  name: 'PlayArea',
  components: {
    PlayWheels,
    PlayMarkets,
    PlayPowerspinHeader,
  },
  data() {
    return {
      playMode: Constants.POWERSPIN_PLAY_MODE.WHEELS,
    };
  },
  created() {
    this.$eventHub.$on(EventHubTypes.SWITCH_POWERSPIN_PLAY_MODE, this.handleModeChange);
  },
  destroyed() {
    this.$eventHub.$off(EventHubTypes.SWITCH_POWERSPIN_PLAY_MODE);
  },
  computed: {
    renderComponent() {
      switch (this.playMode) {
        case Constants.POWERSPIN_PLAY_MODE.WHEELS:
          return PlayWheels;
        case Constants.POWERSPIN_PLAY_MODE.MARKETS:
          return PlayMarkets;
        default:
          return null;
      }
    },
  },
  methods: {
    handleModeChange(value) {
      this.playMode = value;
    },
  },
};
</script>
