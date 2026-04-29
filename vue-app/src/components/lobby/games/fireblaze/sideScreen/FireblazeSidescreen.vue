<template>
  <div class="fireblaze-side-screen">
    <BaseSidescreen :betslip="betslip">
      <template>
        <FireblazeSelectionsList />
      </template>
    </BaseSidescreen>
  </div>
</template>

<script>
import BaseSidescreen from '../../../../common/BaseSidescreen.vue';
import FireblazeSelectionsList from './FireblazeSelectionsList.vue';
import { mapGetters } from 'vuex';
import moduleTypes from '../../../../../store/modules/types';
import FireblazeStoreModuleTypes from '../../../../../store/modules/FireblazeStoreModule/types';

export default {
  name: 'FireblazeSidescreen',
  components: { BaseSidescreen, FireblazeSelectionsList },
  computed: {
    ...mapGetters(moduleTypes.FIREBLAZE_GAME_STORE_MODULE, {
      betslip: FireblazeStoreModuleTypes.getters.GET_BETSLIP,
    }),
  },
};
</script>
<style lang="scss" scoped>
@import '../../../../../scss-utils/fireblaze/colors';

.fireblaze-side-screen {
  background: $gradient-pink-purple;
  height: 100%;
  color: $color-primary-white;
  font-size: 1em;
}
</style>
