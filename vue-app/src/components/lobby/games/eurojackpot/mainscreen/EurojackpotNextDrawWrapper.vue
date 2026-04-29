<template>
  <div class="euro-jackpot-next-draw__wrapper">
    <div class="euro-jackpot-next-draw__wrapper--europe">
      <img class="europe" width="205" height="125" :src="europeIconSrc" alt="europe" />
    </div>
    <div class="euro-jackpot-next-draw__wrapper--eurojackpot" :class="{'euro-jackpot-next-draw__wrapper--eurojackpot-extra': isActiveDrawExtra }">
      <img class="eurojackpot" width="180" height="80" :src="getEuroJackpotLogo" alt="eurojackpot" />
    </div>
    <div class="euro-jackpot-next-draw__wrapper--eurojackpot-next-draw">
      <DrawCountDown :date="salesCloseTime" />
    </div>
    <div class="euro-jackpot-next-draw__wrapper--sprinkles">
      <img width="270" height="80" :src="sprinklesIconSrc" alt="sprinkles" />
    </div>
  </div>
</template>

<script>
import eurojackpotIcon from '../../../../../assets/eurojackpot/eurojackpot.png';
import eurojackpotIconExtra from '../../../../../assets/eurojackpot/eurojackpot_extra.png';
import sprinklesIcon from '../../../../../assets/eurojackpot/sprinkles.png';
import europeIcon from '../../../../../assets/eurojackpot/europe_icon.png';
import DrawCountDown from '../common/DrawCountDown.vue';
import { mapState } from 'vuex';
import moduleTypes from '../../../../../store/modules/types';

export default {
  name: 'EurojackpotNextDrawWrapper',
  props: {
    salesCloseTime: {
      type: Date,
      required: true,
    },
  },
  components: {
    DrawCountDown,
  },
  data() {
    return {
      europeIconSrc: europeIcon,
      sprinklesIconSrc: sprinklesIcon,
    };
  },
  computed: {   
    ...mapState(moduleTypes.EUROJACKPOT_GAME_STORE_MODULE, ['isActiveDrawExtra']),
    getEuroJackpotLogo() {
      return this.eurojackpotIconSrc = this.isActiveDrawExtra ? eurojackpotIconExtra : eurojackpotIcon;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../../../scss-utils/eurojackpot/colors';

.euro-jackpot-next-draw {
  &__wrapper {
    width: 275px;
    height: 195px;
    background: linear-gradient(223deg, #ffde7e 0%, #ffde7e 27.08%, #99762f 100%);
    border: 1px solid $color-primary-black;
    position: relative;
    display: flex;
    &--europe {
      position: absolute;
      top: 33%;
      left: 39%;
      transform: translate(-50%, -50%);
    }
    &--eurojackpot {
      position: absolute;
      top: 25%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    &--eurojackpot-extra {
      padding-bottom: 5px;
    }
    &--eurojackpot-next-draw {
      position: absolute;
      top: 70%;
      left: 50%;
      z-index: 1;
      transform: translate(-50%, -50%);
    }
    &--sprinkles {
      display: flex;
      flex-direction: row;
      position: absolute;
      top: 80%;
      left: 50%;
      transform: translate(-50%, -50%);
      img {
        margin: 12px 0 0 15px;
      }
    }
  }
}
</style>
