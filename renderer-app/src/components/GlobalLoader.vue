<script setup>
defineProps({
  visible: { type: Boolean, default: false },
});
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="atw:transition-opacity atw:duration-200"
      leave-active-class="atw:transition-opacity atw:duration-200"
      enter-from-class="atw:opacity-0"
      leave-to-class="atw:opacity-0">
      <div v-if="visible" class="global-loader">
        <div class="global-loader__content">
          <div class="global-loader__spinner"></div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.global-loader {
  @apply atw:fixed atw:inset-0 atw:z-2000 atw:flex atw:items-center atw:justify-center atw:bg-black/10 atw:backdrop-blur-sm;
}

.global-loader__content {
  @apply atw:flex atw:flex-col atw:items-center atw:gap-3;
}

.global-loader__spinner {
  @apply atw:size-14 atw:animate-spin atw:rounded-full atw:border-4 atw:border-solid atw:border-[#00A1DD] atw:border-t-transparent;
}
</style>
