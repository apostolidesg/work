<template>
  <div class="powerspin-play-wheels h-100">
    <SinglePlay
      v-for="(_, index) in getWheelsLength"
      :key="index"
      :wheel-index="index"
      :hasSeparator="hasSeparator(index)"
      :separatorColor="separatorColor(index)"
    />
  </div>
</template>

<script>
import SinglePlay from './SinglePlay.vue';
import { mapGetters } from 'vuex';
import moduleTypes from '../../../../../store/modules/types';
import powerspinModuleTypes from '../../../../../store/modules/PowerspinBetslipStoreModule/types';
import Constants from '../../../../../util/powerspinConstants';

export default {
  name: 'PlayWheels',
  components: { SinglePlay },
  computed: {
    ...mapGetters(moduleTypes.POWERSPIN_GAME_STORE_MODULE, {
      getWheelsLength: powerspinModuleTypes.getters.GET_WHEELS_LENGTH,
    }),
  },
  methods: {
    hasSeparator(index) {
      return this.getWheelsLength > 1 && index < this.getWheelsLength - 1;
    },
    separatorColor(index) {
      return index === 0 ? Constants.COLOR_SELECTION.GREEN : Constants.COLOR_SELECTION.RED;
    },
  },
};
</script>
<style lang="scss" scoped>
.powerspin-play-wheels {
  display: flex;
  flex-direction: row;
}
</style>
