<template>
  <div class="banners">
    <LearnMoreBanner :game="game" />
    <hr class="banners__separator" />
    <LinkToPlayArea :game="game" />
  </div>
</template>

<script>
import Kino from '@/assets/lobby/kino.png';
import LearnMoreBanner from './LearnMoreBanner.vue';
import LinkToPlayArea from './LinkToPlayArea.vue';

export default {
  name: 'Banners',
  props: {
    game: {
      type: String,
      required: true,
    },
  },
  components: {
    LearnMoreBanner,
    LinkToPlayArea
  },
  computed: {
    logoSrc() {
      return Kino;
    },
    thumbSrc() {
      return ThumbsUpFilled;
    },
  },
};
</script>

<style scoped lang="scss">
$secondary-blue: var(--secondary-blue, #007bff);

.banners {
  color: white;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 2rem;
  width: 100%;
  gap: 1rem;

  &__separator {
    width: 100%;
    border-width: 1px;
    border-color: $secondary-blue;
    margin-top: -0.5rem;
  }
}
</style>
