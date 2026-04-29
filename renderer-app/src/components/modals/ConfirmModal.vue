<script setup>
import BaseModal from '@/components/modals/BaseModal.vue';
import ModalBody from '@/components/modals/ModalBody.vue';
import PrimaryButton from '@/components/base/PrimaryButton.vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Confirm',
  },
  message: {
    type: Object,
    default: () => ({}),
  },
  confirmText: {
    type: String,
    default: 'yes',
  },
  cancelText: {
    type: String,
    default: 'no',
  },
  onConfirm: {
    type: Function,
    default: null,
  },
  onCancel: {
    type: Function,
    default: null,
  },
  icon: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['close']);

const confirm = () => {
  props.onConfirm?.();
  emit('close');
};

const cancel = () => {
  props.onCancel?.();
  emit('close');
};
</script>

<template>
  <BaseModal>
    <template #header>
      <h2 class="atw:text-xl">{{ $t(title) }}</h2>
    </template>

    <ModalBody :message :icon />

    <template #footer>
      <PrimaryButton shape="pill" variant="secondary" size="md" @click="cancel">
        {{ $t(cancelText) }}
      </PrimaryButton>

      <PrimaryButton shape="pill" size="md" @click="confirm">
        {{ $t(confirmText) }}
      </PrimaryButton>
    </template>
  </BaseModal>
</template>
