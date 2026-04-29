<script setup>
import { computed } from 'vue';
import { useModalService } from '@/composables/useModalService';

const { stack, closeById } = useModalService();

const baseZ = 1000;
const backdropZ = computed(() => baseZ + (stack.value.length - 1) * 2);
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="atw:transition-opacity atw:duration-200 atw:ease-out"
      leave-active-class="atw:transition-opacity atw:duration-200 atw:ease-in"
      enter-from-class="atw:opacity-0"
      leave-to-class="atw:opacity-0">
      <div v-if="stack.length" class="modal-overlay" :style="{ zIndex: backdropZ }" />
    </Transition>

    <TransitionGroup
      tag="div"
      enter-active-class="atw:transition-all atw:duration-200 atw:ease-out"
      leave-active-class="atw:transition-all atw:duration-200 atw:ease-in"
      enter-from-class="atw:opacity-0 atw:scale-95"
      leave-to-class="atw:opacity-0 atw:scale-95">
      <div
        v-for="(modal, index) in stack"
        :key="modal.id"
        class="modal-container"
        :style="{ zIndex: baseZ + index * 2 + 1 }"
        @click.self="modal.closable && closeById(modal.id)">
        <component :is="modal.component" v-bind="modal.props" v-on="modal.listeners" @close="closeById(modal.id)" />
      </div>
    </TransitionGroup>
  </Teleport>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.modal-overlay {
  @apply atw:fixed atw:inset-0 atw:bg-black/50 atw:backdrop-blur-sm;
}
.modal-container {
  @apply atw:fixed atw:inset-0 atw:flex atw:items-center atw:justify-center;
}
</style>
