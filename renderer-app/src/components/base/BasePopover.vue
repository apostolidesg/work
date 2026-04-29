<script setup>
import { usePopover } from '@/composables/usePopover';
import { watch, computed } from 'vue';

const props = defineProps({
  placement: { type: String, default: 'bottom' },
  arrow: { type: Boolean, default: true },
  theme: { type: String, default: '' },
  unstyled: { type: Boolean, default: false },
});

const showArrow = computed(() => props.arrow && !props.unstyled);
const emit = defineEmits(['show', 'hidden']);

const { isOpen, floatingStyles, arrowStyles, isPositioned, triggerRef, popoverRef, arrowRef, open, close, toggle } =
  usePopover(props);

watch(isOpen, (newVal) => {
  if (newVal) emit('show');
  else emit('hidden');
});

defineExpose({ open, close, toggle, isOpen });
</script>
<template>
  <span
    ref="triggerRef"
    :aria-expanded="isOpen"
    aria-haspopup="dialog"
    class="atw:inline-block atw:cursor-pointer"
    @click="toggle">
    <slot :is-open="isOpen" :close="close" :open="open" :toggle="toggle" />
  </span>
  <Teleport to="body">
    <Transition
      enter-active-class="atw:transition atw:duration-150 atw:ease-out"
      enter-from-class="atw:scale-90 atw:opacity-0"
      enter-to-class="atw:scale-100 atw:opacity-100"
      leave-active-class="atw:transition atw:duration-120 atw:ease-in"
      leave-from-class="atw:scale-100 atw:opacity-100"
      leave-to-class="atw:scale-90 atw:opacity-0">
      <div
        v-if="isOpen"
        ref="popoverRef"
        role="dialog"
        :style="[floatingStyles, { visibility: isPositioned ? 'visible' : 'hidden' }]"
        :class="[
          'atw:absolute atw:z-9999',
          !unstyled &&
            'atw:px-4 atw:py-6 atw:text-[13px] atw:text-(--popover-color,#000) atw:bg-(--popover-bg,#fff) atw:rounded-2xl atw:shadow-[0_4px_10px_rgba(0,0,0,0.25)] atw:whitespace-nowrap',
          theme,
        ]">
        <slot name="content" :is-open="isOpen" :close="close" :open="open" :toggle="toggle" />
        <div
          v-if="showArrow"
          ref="arrowRef"
          class="atw:w-2 atw:h-2 atw:bg-(--popover-bg,#fff) atw:rotate-45 atw:rounded-[1px]"
          :style="arrowStyles" />
      </div>
    </Transition>
  </Teleport>
</template>
