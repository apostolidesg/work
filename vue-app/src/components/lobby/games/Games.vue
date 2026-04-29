<template>
  <div id="games" class="lobby-games">
    <router-link
      id="lobby-games-eurojackpot-img"
      to="/eurojackpot"
      class="lobby-games__eurojackpot"
      :style="{ 'background-image': `url(${getJackpotBackgroundImage})` }"
    >
      <div class="lobby-games__eurojackpot-details">
        <EurojackpotAmount v-if="jackpotAmount" :amount="jackpotAmount" size="large" />
        <EurojackpotDrawDays />
      </div>
    </router-link>
    <div
      class="lobby-games__pameStoixima"
      id="lobby-games-pameStoixima-img"
      @click="switchApplication"
      :style="{ 'background-image': `url(${pameStoixima[getCurrentLocale()]})` }"
    ></div>
    <router-link
      id="lobby-games-kino-img"
      to="/kino"
      class="lobby-games__kino"
      :style="{ 'background-image': `url(${kino[getCurrentLocale()]})` }"
    >
    </router-link>
    <div class="lobby-games__wheels">
      <router-link
        class="lobby-games__powerspin"
        id="lobby-games-powerspin-img"
        to="/powerspin"
        :style="{ 'background-image': `url(${powerSpin[getCurrentLocale()]})` }"
      >
      </router-link>
      <router-link
        class="lobby-games__fireblaze"
        id="lobby-games-fireblaze-img"
        to="/fireblaze"
        :style="{ 'background-image': `url(${fireblaze[getCurrentLocale()]})` }"
      >
      </router-link>
    </div>
    <div
      class="lobby-games__virtuals"
      id="lobby-games-virtuals-img"
      @click="switchApplication"
      :style="{ 'background-image': `url(${virtuals[getCurrentLocale()]})` }"
    ></div>
  </div>
</template>

<script>
import kinoEl from '../../../assets/lobby/el/KINO.png';
import kinoEn from '../../../assets/lobby/en/KINO.png';
import Eurojackpot from '../../../assets/lobby/Eurojackpot.png';
import EurojackpotExtra from '../../../assets/lobby/eurojackpot-extra.png';
import powerSpinEl from '../../../assets/lobby/el/Powerspin.jpg';
import powerSpinEn from '../../../assets/lobby/en/Powerspin.jpg';
import oddEvenEl from '../../../assets/lobby/el/Mona-Zyga.png';
import oddEvenEn from '../../../assets/lobby/en/Mona-Zyga.png';
import columnsEl from '../../../assets/lobby/el/Sthles.png';
import columnsEn from '../../../assets/lobby/en/Sthles.png';
import pameStoiximaEn from '../../../assets/lobby/en/PS-en.png';
import pameStoiximaEl from '../../../assets/lobby/el/PS-el.png';
import virtualsEn from '../../../assets/lobby/en/PS-Virtuals.png';
import virtualsEl from '../../../assets/lobby/el/PS-Virtuals.png';
import logo from '../../../assets/lobby/logo.png';
import EurojackpotAmount from './eurojackpot/mainscreen/EurojackpotAmount.vue';
import EurojackpotDrawDays from './eurojackpot/common/EurojackpotDrawDays.vue';
import moduleTypes from '../../../store/modules/types';
import { mapState } from 'vuex';
import fireblazeEl from '../../../assets/lobby/el/Fireblaze-new.png';
import fireblazeEn from '../../../assets/lobby/en/Fireblaze-new.png';

export default {
  name: 'games',
  components: { EurojackpotDrawDays, EurojackpotAmount },
  data() {
    return {
      kino: {
        en: kinoEn,
        el: kinoEl,
      },
      eurojackpot: Eurojackpot,
      powerSpin: {
        en: powerSpinEn,
        el: powerSpinEl,
      },
      oddEven: {
        en: oddEvenEn,
        el: oddEvenEl,
      },
      columns: {
        en: columnsEn,
        el: columnsEl,
      },
      pameStoixima: {
        en: pameStoiximaEn,
        el: pameStoiximaEl,
      },
      virtuals: {
        en: virtualsEn,
        el: virtualsEl,
      },
      fireblaze: {
        en: fireblazeEn,
        el: fireblazeEl,
      },
    };
  },
  mounted() {
    this.$snotify.clear();
  },
  computed: {
    ...mapState(moduleTypes.EUROJACKPOT_GAME_STORE_MODULE, {
      jackpotAmount: (state) => state.jackpotAmount,
      isActiveDrawExtra: (state) => state.isActiveDrawExtra,
    }),
    getJackpotBackgroundImage() {
      return this.isActiveDrawExtra ? EurojackpotExtra : Eurojackpot;
    },
    theme() {
      return '';
    },
    themeSettings() {
      return { logo };
    },
  },
  methods: {
    switchApplication() {
      this.$eventHub.$emit('switchToApplicationOk');
    },
    getCurrentLocale() {
      return this.$root.$i18n.locale();
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../../scss-utils/common/variables';

.lobby-games {
  height: $play-area-height;
  max-height: $play-area-height;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(4, 1fr);
  width: 100%;
  @media screen and (min-width: 1700px) {
    height: calc(100vh - 10px);
    max-height: calc(100vh - 10px);
    width: 100%;
  }

  &__eurojackpot {
    grid-area: 1 / 1 / 3 / 4;
    background-repeat: no-repeat;
    background-size: 120% 100%;
    background-position-x: 50%;
    border: 1.5px solid #ffffff;

    @media screen and (min-width: 1700px) {
      background-size: 100% 100%;
    }

    &-details {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;

      & > * {
        margin-bottom: 20px;
      }
    }
  }

  &__pameStoixima {
    grid-area: 1 / 4 / 3 / 7;
    background-repeat: no-repeat;
    background-size: 120% 100%;
    background-position-x: 50%;
    border: 1.5px solid #ffffff;
  }

  &__kino {
    grid-area: 3 / 1 / 5 / 4;
    background-repeat: no-repeat;
    background-size: 125% 100%;
    background-position-x: 50%;
    border: 1.5px solid #ffffff;

    @media screen and (min-width: 1700px) {
      background-size: 140% 89.5%;
    }
  }

  &__oddEven {
    grid-area: 3 / 3 / 4 / 4;
    background-repeat: no-repeat;
    background-size: 110% 100%;
    background-position-x: 50%;
    border: 1.5px solid #ffffff;
  }

  &__columns {
    grid-area: 4 / 3 / 4 / 4;
    background-repeat: no-repeat;
    background-size: 115% 100%;
    background-position-x: 50%;
    border: 1.5px solid #ffffff;

    @media screen and (min-width: 1700px) {
      background-size: 115% 80%;
    }
  }
  &__wheels {
    display: flex;
    grid-area: 3 / 4 / 4 / 7;
    border: 1.5px solid #ffffff;
  }
  &__powerspin,
  &__fireblaze {
    display: flex;
    flex: 1;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  &__fireblaze {
    border-left: 1.5px solid #ffffff;
    background-size: 100% 100%;
  }

  &__virtuals {
    grid-area: 4 / 4 / 5 / 7;
    border: 1.5px solid #ffffff;
    background-size: 100% 100%;
    background-position: 50% center;
    background-repeat: no-repeat;
    @media screen and (min-width: 1700px) {
      background-size: 100% 100%;
      background-position: center bottom;
      margin-bottom: 3.4rem;
    }
  }
}

.lobbyImage {
  width: 100%;
  cursor: pointer;

  @media screen and (min-width: 1700px) {
    height: 80%;
  }
}
</style>
