<template>
  <div class="eurojackpot-systems" :class="{ 'eurojackpot-systems--extra-background': isActiveDrawExtra }">
    <div class="eurojackpot-systems__header">
      <div class="eurojackpot-systems__header-title">{{ $t('eurojackpot.systems') }}</div>
      <div class="eurojackpot-systems__header-info">{{ $t('eurojackpot.systemsInfo') }}</div>
    </div>
    <div class="eurojackpot-systems__numbers">
      <div v-for="(system, systemId) in systems" :key="systemId">
        <div class="eurojackpot-systems__numbers--system-button">
          <EurojackpotSystemButton
            :id="`ejp-system-btn-${systemId}`"
            @click="handleSystemClick(systemId)"
            :active="systemId === activeSystemId"
            >{{ systemId }}</EurojackpotSystemButton
          >
          <div class="eurojackpot-systems__numbers--system-button-column">
            <div class="eurojackpot-systems__numbers--system-button-column-title">{{ $t('eurojackpot.columns') }}</div>
            <div class="eurojackpot-systems__numbers--system-button-column-info">{{ system.columns }}</div>
          </div>
        </div>
        <div class="eurojackpot-systems__line"></div>
      </div>
    </div>
  </div>
</template>

<script>
import EurojackpotConstants from '../../../../../util/eurojackpotConstants';
import EurojackpotSystemButton from './EurojackpotSystemButton.vue';
import { mapState } from 'vuex';
import moduleTypes from '../../../../../store/modules/types';

export default {
  name: 'EurojackpotSystems',
  props: {
    activeSystemId: {
      type: String,
      default: null,
    },
  },
  components: {
    EurojackpotSystemButton,
  },
  data() {
    return {
      systems: EurojackpotConstants.SYSTEMS,
    };
  },
  computed: {
    ...mapState(moduleTypes.EUROJACKPOT_GAME_STORE_MODULE, ['isActiveDrawExtra']),
  },
  methods: {
    handleSystemClick(systemId) {
      this.$emit('system-click', systemId);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../../../scss-utils/eurojackpot/colors';

.eurojackpot-systems {
  background: transparent;
  display: flex;
  flex-direction: column;
  &--extra-background {
    background: linear-gradient(180deg, #ebc17d 0%, #bc7c33 100%);
    background-blend-mode: multiply;
    padding: 0.5rem 0.7rem;
    border-radius: 5px;
  }
  &__header {
    font-size: 13.5px;
    line-height: normal;
    margin-bottom: 20px;
    font-weight: 500;
    color: $color-secondary-brown;
    &-title {
      font-weight: 900;
      text-transform: uppercase;
      margin-bottom: 2px;
    }
  }
  &__numbers {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-flow: column;
    gap: 10px;
    grid-template-rows: repeat(5, auto);

    &--system-button {
      display: flex;
      flex-direction: row;
      &-column {
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin-left: 5px;
        color: $color-secondary-brown;
        font-size: 11px;
        font-weight: 500;
        &-info {
          font-weight: 900;
          font-size: 12px;
        }
      }
    }
  }
  &__line {
    background-color: $color-third-gold;
    opacity: 0.3;
    width: 100%;
    height: 2px;
    margin: 10px 0px 5px 2px;
  }
}
</style>
