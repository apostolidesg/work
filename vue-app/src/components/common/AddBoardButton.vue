<template>
  <button
    v-on="$listeners"
    class="add-board-button"
    :class="`add-board-button__${theme}`"
    :id="`${theme}_preview_add_new_game`"
  >
    <div class="add-board-button__icon">
      <img width="60" :src="addGameIcon" alt="add board" />
    </div>
    <div class="add-board-button__content">
      <slot></slot>
    </div>
  </button>
</template>

<script>
import eurojackpotAddGameIcon from '../../assets/add-game-icon__eurojackpot.png';
import kinoAddGameIcon from '../../assets/add-game-icon__kino.png';
import fireblazeAddGameIcon from '../../assets/add-game-icon__fireblaze.png';

const THEMES = {
  KINO: 'kino',
  EUROJACKPOT: 'eurojackpot',
  FIREBLAZE: 'fireblaze',
};

const THEME_ICONS = {
  [THEMES.KINO]: kinoAddGameIcon,
  [THEMES.EUROJACKPOT]: eurojackpotAddGameIcon,
  [THEMES.FIREBLAZE]: fireblazeAddGameIcon,
};

export default {
  name: 'AddBoardButton',
  props: {
    theme: {
      type: String,
      required: false,
      default: THEMES.KINO,
      validator: value => Object.values(THEMES).includes(value),
    },
  },
  computed: {
    addGameIcon() {
      return THEME_ICONS[this.theme];
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../scss-utils/eurojackpot/colors';
@import '../../scss-utils/kino/colors';
@import '../../scss-utils/fireblaze/colors';

.add-board-button {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 80px;
  padding: 10px;
  border-radius: 10px;
  border: none;

  font-family: 'Roboto', sans-serif;
  font-size: 15px;
  font-weight: 900;
  cursor: pointer;

  &__kino {
    background-color: $kino-color-button-add-board-background;
    color: $kino-color-button-add-board-text;
  }

  &__eurojackpot {
    background: $ejp-color-button-add-board-background;
    color: $ejp-color-button-add-board-text;
  }

  &__fireblaze {
    background: $gradient-pink-purple;
    color: $color-primary-white;
  }

  &__content {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
}
</style>
