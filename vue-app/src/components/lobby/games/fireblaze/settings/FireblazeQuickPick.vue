<template>
  <div class="fireblaze-quickpick">
    <div class="fireblaze-quickpick__info">
      {{ $t('fireblaze.quickPickInfo') }}
    </div>
    <button id="fireblaze-quickpick-btn" class="fireblaze-quickpick__button" @click="$emit('quick-pick-click')">
      <div class="fireblaze-quickpick__button-info">{{ $t('fireblaze.quickPickInfoButtonInfo') }}</div>
      <FireblazeQuickPickIcon />
    </button>
  </div>
</template>

<script>
import FireblazeQuickPickIcon from '../../../../../assets/fireblaze/quickPick.svg?inline';

export default {
  name: 'FireblazeQuickPick',
  components: {
    FireblazeQuickPickIcon,
  },
};
</script>

<style lang="scss" scoped>
@import '../../../../../scss-utils/fireblaze/colors';

.fireblaze-quickpick {
  display: flex;
  flex-direction: column;

  &__info {
    margin-bottom: 0.5em;
  }
  &__button {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: $gradient-dark-pink-purple;
    border: solid 2px $color-primary-white;
    border-radius: 8px;
    padding: 1em;
    color: $color-primary-white;
    cursor: pointer;

    &-info {
      margin: 0 1em;
    }
  }
}
</style>
