<template>
  <div class="quickbets_draw-selector" @click="toggleConsecutiveDrawsPanelActive">
    <span class="quickbets_draw-selector__selected-draws">{{ consecutiveDraws }}</span>
    <div>
      <font-awesome-icon :icon="chevronDown" />
    </div>
    <transition name="fade">
      <div class="quickbets_draw-selector__draws" v-if="consecutiveDrawsPanelActive">
        <span
          class="quickbets_draw-selector__draws-numbers"
          :class="{ 'quickbets_draw-selector--active': consecutiveDraws === draw }"
          @click="setConsecutiveDraws(draw)"
          v-for="draw in draws"
          :key="draw"
        >
          {{ draw }}
        </span>
      </div>
    </transition>
  </div>
</template>

<script>
import chevronDown from '@fortawesome/fontawesome-free-solid/faChevronDown';
import moduleTypes from '@/store/modules/types';
import { mapActions, mapState } from 'vuex';
import kinoGameModuleTypes from '@/store/modules/KinoStoreModule/types';

export default {
  name: 'QuickbetsDrawsSelector',
  data() {
    return {
      chevronDown,
      consecutiveDrawsPanelActive: false,
      draws: [1, 2, 3, 4, 5, 6, 7, 8, 10, 20, 50, 100, 200, 400],
    };
  },
  props: {
    consecutiveDraws: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapState(moduleTypes.KINO_GAME_STORE_MODULE, {
      betslip: kinoGameModuleTypes.state.BETSLIP,
    }),
  },
  methods: {
    ...mapActions(moduleTypes.KINO_GAME_STORE_MODULE, {
      setBetslip: kinoGameModuleTypes.actions.SET_BETSLIP,
    }),
    toggleConsecutiveDrawsPanelActive() {
      this.consecutiveDrawsPanelActive = !this.consecutiveDrawsPanelActive;
    },
    setConsecutiveDraws(number) {
      this.$emit('update:consecutiveDraws', number);
      this.betslip.setConsecutiveDraws(number);
      this.setBetslip({ betslip: this.betslip });
    },
  },
};
</script>

<style lang="scss">
.quickbets_draw-selector {
  position: relative;
  background: transparent;
  height: 85px;
  width: 85px;
  border-radius: var(--border-radius-md);
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-quickbets-draw-selector-bg);
  font-size: var(--font-size-lg);
  font-weight: 600;
  width: 245px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--border-radius-md);
    border: 3px solid transparent;
    background: var(--gradient-kino-border);
    mask: linear-gradient(var(--color-white) 0 0) content-box, linear-gradient(var(--color-white) 0 0);
    mask-composite: exclude;
    z-index: 2;
  }

  &--active {
    background: linear-gradient(0deg, var(--color-yellow-warm), var(--color-yellow-warm)),
      radial-gradient(180% 180% at 0% 100%, var(--color-orange-light) 0%, rgba(255, 123, 28, 0) 100%),
      radial-gradient(140% 140% at 100% 0%, var(--color-orange-bright) 0%, rgba(255, 230, 0, 0) 100%),
      radial-gradient(100% 100% at 0% 0%, var(--color-yellow-mid) 0%, rgba(255, 173, 27, 0) 100%);
    color: var(--color-black);
  }

  &__draws {
    position: absolute;
    right: 0;
    bottom: 100px;
    width: 730px;
    background: var(--quickplay-dark-blue);
    z-index: 9;
    border-radius: var(--border-radius-md);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-md) var(--spacing-md);

    &-numbers {
      width: 86px;
      height: 86px;
      border-radius: var(--border-radius-md);
      display: flex;
      justify-content: center;
      align-items: center;

      &--active {
        background: var(--gradient-kino-border);
        color: var(--color-black);
        position: relative;

        &::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: var(--border-radius-md);
          border: 3px solid transparent;
          background: var(--gradient-kino-border);
          mask-composite: exclude;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          z-index: 2;
        }
      }
    }
  }

  svg {
    position: absolute;
    right: var(--spacing-md);
    bottom: var(--spacing-md);
  }
}
</style>
