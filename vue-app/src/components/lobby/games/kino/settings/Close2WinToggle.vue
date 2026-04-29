<template>
  <BaseGameOptionToggle
    input-id="kino_c2w_check"
    color="#A758AD"
    :value="value"
    @input="$emit('input', $event)"
    :disabled="disabled"
  >
    <template #icon>
      <img id="settings-close-2-win-img" src="../../../../../assets/kino_para1_logo@2x.png" alt="close2win logo" />
    </template>
    <template #hint>
      <span>{{ $t('close2WinAllowedGames') }}</span>
    </template>
    <template #tag>
      <span>{{ $t('new') }}</span>
    </template>
  </BaseGameOptionToggle>
</template>

<script>
import BaseGameOptionToggle from '../../../../common/BaseGameOptionToggle.vue';

export default {
  name: 'Close2WinToggle',
  components: {
    BaseGameOptionToggle,
  },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    disabled: {
      type: Boolean,
    },
  },
};
</script>
