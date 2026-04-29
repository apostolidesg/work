<template>
  <div class="eurojackpot-quickpick">
    <div class="eurojackpot-quickpick__info" :class="{ 'eurojackpot-quickpick__info--extra': isActiveDrawExtra }">
      {{ $t('eurojackpot.quickPickInfo') }}
    </div>
    <button id="ejp-quickpick-btn" class="eurojackpot-quickpick__button" @click="$emit('quick-pick-click')">
      <div class="eurojackpot-quickpick__button-info">{{ $t('eurojackpot.quickPickInfoButtonInfo') }}</div>
      <EurojackpotQuickPickIcon />
    </button>
  </div>
</template>

<script>
import EurojackpotQuickPickIcon from '../../../../../assets/eurojackpot/quickpick.svg?inline';
import { mapState } from 'vuex';
import moduleTypes from '../../../../../store/modules/types';

export default {
  name: 'EurojackpotQuickPick',
  components: {
    EurojackpotQuickPickIcon,
  },
  computed: {
    ...mapState(moduleTypes.EUROJACKPOT_GAME_STORE_MODULE, ['isActiveDrawExtra']),
  },
};
</script>

<style lang="scss" scoped>
@import '../../../../../scss-utils/eurojackpot/colors';

.eurojackpot-quickpick {
  background: transparent;
  font-size: 13.5px;
  line-height: normal;
  color: $color-secondary-brown;
  font-weight: 500;
  &__info {
    margin-bottom: 8px;
    &--extra {
      color: white;
    }
  }
  &__button {
    width: 100%;
    height: 68px;
    border: 2px solid $color-secondary-brown;
    border-radius: 8px;
    cursor: pointer;
    background: linear-gradient(180deg, $color-secondary-gold 0%, $color-third-brown 130%);
    font-weight: 900;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    &-info {
      margin-right: 12px;
    }
  }
}
</style>
