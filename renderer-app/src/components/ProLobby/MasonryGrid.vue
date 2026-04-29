<script setup>
import { computed } from 'vue';
import MasonryCell from './MasonryCell.vue';

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  showOverlay: {
    type: Boolean,
    default: true,
  },
});

const isExpanded = computed(() => props.items.length > 8);

const rows = computed(() => {
  if (isExpanded.value) {
    return [
      { id: 'row-1', left: [0, 1], right: [2] },
      { id: 'row-2', left: [3, 4], right: [5] },
      { id: 'row-3', left: [6, 7], right: [8] },
    ];
  }
  return [
    { id: 'row-1', left: [0, 1], right: [2] },
    { id: 'row-2', left: [3], right: [4] },
    { id: 'row-3', left: [5, 6], right: [7] },
  ];
});
</script>

<template>
  <div class="masonry-container">
    <div class="masonry-grid">
      <div v-for="row in rows" :key="row.id" class="masonry-grid__row">
        <div class="masonry-grid__cell">
          <div v-if="row.left.length > 1" class="masonry-grid__sub-row">
            <MasonryCell
              v-for="index in row.left"
              :key="index"
              :item="items[index]"
              :center-button="isExpanded"
              :show-overlay="showOverlay" />
          </div>
          <div v-else class="masonry-grid__sub-row">
            <MasonryCell :item="items[row.left[0]]" :center-button="isExpanded" :show-overlay="showOverlay" />
          </div>
        </div>

        <div class="masonry-grid__cell">
          <MasonryCell :item="items[row.right[0]]" :center-button="isExpanded" :show-overlay="showOverlay" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/global.css";

.masonry-container {
  @apply atw:rounded-2xl atw:px-9 atw:pt-4 atw:mb-8;
  padding-top: 30px;
  padding-bottom: 30px;
  background-color: #66c2e7;
}

.masonry-grid {
  @apply atw:grid atw:gap-3 atw:w-full;
  grid-template-columns: 55fr 45fr;
  grid-template-rows: 290px 285px 190px;
}

.masonry-grid__row {
  @apply atw:contents;
}

.masonry-grid__cell {
  @apply atw:min-w-0 atw:min-h-0;
}

.masonry-grid__sub-row {
  @apply atw:grid atw:gap-3 atw:h-full atw:min-h-0;
  grid-template-columns: 1fr 1fr;
}

@media (max-height: 980px) {
  .masonry-container {
    @apply atw:mb-6;
  }

  .masonry-grid {
    grid-template-rows: 218px 218px 150px;
  }
}

@media (max-width: 900px) {
  .masonry-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 600px) {
  .masonry-grid {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, 120px);
  }
}
</style>
