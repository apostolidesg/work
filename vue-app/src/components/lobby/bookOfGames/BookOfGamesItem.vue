<template>
  <div class="book-of-games-item">
    <slot></slot>
    <BookOfGamesBarcode class="book-of-games-item__barcode" v-bind="$props" />
  </div>
</template>

<script>
import BookOfGamesBarcode from './BookOfGamesBarcode.vue';

export default {
  name: 'BookOfGamesItem',
  components: {
    BookOfGamesBarcode,
  },
  props: {
    url: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.book-of-games-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  height: 100%;
  &__barcode {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
  }
}
</style>
