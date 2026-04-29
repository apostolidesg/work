<template>
  <div class="overlay-loader">
    <loading :active="showLoader" v-bind="config" />
  </div>
</template>
<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Mappings from '../../../../../util/Mappings';
import { mapState } from 'vuex';
import moduleTypes from '../../../../../store/modules/types';
import SessionStoreModuleTypes from '../../../../../store/modules/SessionStoreModule/types';

export default {
  name: 'loadingOverlay',
  props: {
    showLoader: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    ...mapState(moduleTypes.SESSION_STORE_MODULE, {
      gameType: SessionStoreModuleTypes.state.GAME_TYPE,
    }),
    config() {
      return Mappings.LOADER_CONFIG_GAME_TYPE_MAPPER[this.gameType];
    },
  },
  components: {
    Loading,
  },
};
</script>
