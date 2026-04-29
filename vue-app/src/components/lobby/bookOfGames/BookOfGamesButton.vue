<template>
  <button class="book-of-game-button" @click="$emit('click')">
    <div class="book-of-game-button__content">
      <div class="book-of-game-button__content_title">{{ $t('bookOfGames.title') }}</div>
      <div class="book-of-game-button__content_more">{{ $t('bookOfGames.more') }}</div>
    </div>
  </button>
</template>

<script>
import { mapGetters } from 'vuex';
import moduleTypes from '../../../store/modules/types';
import ConfigurationStoreModuleTypes from '../../../store/modules/ConfigurationStoreModule/types';
export default {
  name: 'BookOfGamesButton',
  computed: {
    ...mapGetters(moduleTypes.CONFIGURATION_STORE_MODULE, {
      digitalAssistantEnabled: ConfigurationStoreModuleTypes.getters.IS_DIGITAL_ASSISTANT_ENABLED,
    }),
  },
};
</script>

<style lang="scss" scoped>
.book-of-game-button {
  width: 400px;
  height: 55px;
  border: none;
  cursor: pointer;
  background-image: url('../../../assets/book-of-game/book-of-game-logo.png');
  background-size: 100%;
  background-repeat: no-repeat;
  background-position-y: 35%;
  border-radius: 40px;
  &__content {
    display: flex;
    flex-direction: row;
    align-items: center;
    text-overflow: clip;

    & > * {
      flex: 1;
    }

    &_title {
      color: #fff;
      font-size: 22px;
      font-weight: 700;
      padding-left: 20px;
      padding-right: 20px;
      line-height: normal;
    }

    &_more {
      background-color: #fff;
      color: #000;
      font-size: 18px;
      font-weight: 700;
      border-radius: 20px;
      border-width: 3px;
      border-style: none none solid none;
      padding: 5px 20px;
    }
  }
}
</style>
