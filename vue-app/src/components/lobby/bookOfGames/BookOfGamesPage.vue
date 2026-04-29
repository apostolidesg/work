<template>
  <div class="book-of-games">
    <div class="book-of-games__header">
      <span class="book-of-games__header--title">
        {{ $t('bookOfGames.title') }}
      </span>
      <div class="book-of-games__header--description">
        {{ $t('bookOfGames.description') }}
      </div>
    </div>
    <div class="book-of-games__items">
      <div v-for="(item, index) in bookOfGamesImages" :key="index">
        <BookOfGamesItem :url="item.url" :index="index">
          <img :src="item.image" alt="book-of-games-item" :id="`book-of-games-image-${index}`" />
        </BookOfGamesItem>
      </div>
    </div>
  </div>
</template>

<script>
import OpapGames from '../../../assets/book-of-game/opap-games.png';
import playOpapImg from '../../../assets/play-logo.png';
import playAllwynImg from '../../../assets/allwyn-play-logo.png';
import BookOfGamesItem from './BookOfGamesItem.vue';
import Constants from '../../../util/Constants';
import { mapGetters } from 'vuex';
import moduleTypes from '../../../store/modules/types';
import configurationModuleTypes from '../../../store/modules/ConfigurationStoreModule/types';

export default {
  name: 'BookOfGamesPage',
  components: {
    BookOfGamesItem,
  },
  created() {
    const playImg = this.getBrandName === Constants.BRAND_NAMES.ALLWYN ? playAllwynImg : playOpapImg;
    this.bookOfGamesImages = [
      { url: Constants.BOOK_OF_GAMES_URLS.GENERAL_GAMES, image: OpapGames },
      { url: Constants.BOOK_OF_GAMES_URLS.OPAP_PLAY, image: playImg },
    ];
  },
  computed: {
    ...mapGetters(moduleTypes.CONFIGURATION_STORE_MODULE, {
      getBrandName: configurationModuleTypes.getters.GET_BRAND_NAME,
    }),
  },
};
</script>

<style scoped lang="scss">
@import '@/scss-utils/lobby/mixins.scss';

.book-of-games {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: calc(100vh - 65px);
  background-color: lightgray;
  @include book-of-games-background;
  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;

    &--title {
      font-size: 28px;
      font-weight: 700;
    }

    &--description {
      font-size: 20px;
      font-weight: 200;
      margin-top: 0.5em;
      text-align: center;
      line-height: normal;
      width: 30%;
    }
  }
  &__items {
    display: flex;
    justify-content: space-around;
  }
}
</style>
