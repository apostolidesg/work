<template>
  <div ref="numberSelectionRef" class="kino-quickbets-number-selection" @click="toggleNumbersPanelActive">
    <div class="kino-quickbets-number-selection__icon">
      <img id="shuffle_button_img" width="40" :src="shuffle" class="ml-2" alt="Quick Pick" />
    </div>
    <span class="kino-quickbets-number-selection__selected-numbers">{{ readyBetslipsNumbers }}</span>
    <font-awesome-icon :icon="chevronDown" />
    <transition name="fade">
      <div class="kino-quickbets-number-selection__draws" v-if="numbersPanel">
        <span
          class="kino-quickbets-number-selection__draws-numbers"
          :class="{ 'kino-quickbets-number-selection--active': readyBetslipsNumbers === number }"
          @click="setNumbers(number)"
          v-for="number in numbers"
          :key="number"
        >
          {{ number }}
        </span>
      </div>
    </transition>
  </div>
</template>

<script>
import chevronDown from '@fortawesome/fontawesome-free-solid/faChevronDown';
import shuffle from '@/assets/shuffle@2x.png';
import moduleTypes from '@/store/modules/types';
import { mapActions, mapState, mapGetters } from 'vuex';
import kinoGameModuleTypes from '@/store/modules/KinoStoreModule/types';

export default {
  name: 'KinoQuickbetsNumberSelection',
  data() {
    return {
      chevronDown,
      shuffle,
      numbersPanel: false,
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    };
  },
  computed: {
    ...mapState(moduleTypes.KINO_GAME_STORE_MODULE, {
      betslip: kinoGameModuleTypes.state.BETSLIP,
    }),
    ...mapGetters(moduleTypes.KINO_GAME_STORE_MODULE, {
      readyBetslipsNumbers: kinoGameModuleTypes.getters.GET_READY_BETSLIPS_NUMBERS,
    }),
  },
  methods: {
    ...mapActions(moduleTypes.KINO_GAME_STORE_MODULE, {
      setBetslip: kinoGameModuleTypes.actions.SET_BETSLIP,
      setReadyBetslipsNumbers: kinoGameModuleTypes.actions.SET_READY_BETSLIPS_NUMBERS,
    }),
    toggleNumbersPanelActive(event) {
      // Prevent the click event from propagating to the document click handler
      event.stopPropagation();
      this.numbersPanel = !this.numbersPanel;
    },
    setNumbers(number) {
      // Update the state in the store
      this.setReadyBetslipsNumbers({ numbers: number });
    },
    handleOutsideClick(event) {
      // Check if click is outside the component
      const numberSelectionRef = this.$refs.numberSelectionRef;
      if (this.numbersPanel && numberSelectionRef && !numberSelectionRef.contains(event.target)) {
        this.numbersPanel = false;
      }
    },
  },
  mounted() {
    // Add click event listener to the document to detect clicks outside
    document.addEventListener('click', this.handleOutsideClick);
  },
  beforeDestroy() {
    // Remove the event listener when the component is destroyed
    document.removeEventListener('click', this.handleOutsideClick);
  },
};
</script>

<style lang="scss">
.kino-quickbets-number-selection {
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  height: 85px;
  width: 85px;
  border-radius: var(--border-radius-md);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--color-quickbets-draw-selector-bg);
  font-size: var(--font-size-lg);
  font-weight: 600;
  width: 245px;
  padding: 0 25px 0 0;

  &__icon {
    background: radial-gradient(
        95.47% 946.48% at 4.53% 50.77%,
        rgba(255, 255, 255, 0.41) 0%,
        rgba(22, 51, 122, 0.369) 100%
      ),
      #003a78;
    backdrop-filter: blur(3.52438px);
    height: 100%;
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top-left-radius: var(--border-radius-md);
    border-bottom-left-radius: var(--border-radius-md);
    position: relative;
    z-index: 1;
  }

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
    top: 100px;
    width: 400px;
    height: 320px;
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
}
</style>
