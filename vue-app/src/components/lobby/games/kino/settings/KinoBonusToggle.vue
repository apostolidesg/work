<template>
  <BaseGameOptionToggle
    input-id="kino_bonus_check"
    color="#E1001A"
    :value="value"
    @input="$emit('input', $event)"
    :disabled="disabled"
  >
    <template #icon>
      <img id="settings-kino-bonus-img" src="../../../../../assets/kino-bonus-logo@2x.png" alt="kino bonus logo" />
    </template>
  </BaseGameOptionToggle>
</template>

<script>
import BaseGameOptionToggle from '../../../../common/BaseGameOptionToggle.vue';

export default {
  name: 'KinoBonusToggle',
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
