<script setup>
import BaseModal from '@/components/modals/BaseModal.vue';
import ModalBody from '@/components/modals/ModalBody.vue';
import PrimaryButton from '@/components/base/PrimaryButton.vue';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import IconButton from '@/components/base/IconButton.vue';

defineProps({
  title: {
    type: String,
    default: '',
  },
  message: {
    type: Object,
    default: () => ({}),
  },
  buttonText: {
    type: String,
    default: 'ok',
  },
  duration: {
    type: Number,
    default: null,
  },
  type: {
    type: String,
    default: 'info',
  },
  closable: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: '',
  },
});

defineEmits(['close']);
</script>

<template>
  <BaseModal>
    <template #header>
      <IconButton
        :icon="faXmark"
        size="lg"
        aria-label="Close info Modal"
        class="info-modal__close-button"
        @click="$emit('close')" />
      <h2 class="atw:text-lg">{{ $t(title) }}</h2>
    </template>

    <ModalBody :message :icon />

    <template v-if="buttonText" #footer>
      <PrimaryButton shape="pill" size="md" @click="$emit('close')">
        {{ $t(buttonText) }}
      </PrimaryButton>
    </template>
  </BaseModal>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.info-modal__close-button {
  @apply atw:absolute atw:right-3 atw:top-3 atw:border atw:border-gray-200 atw:bg-white/90 atw:shadow-sm;
}
</style>
