<template>
  <InfoModalWrapper :visible="isVisible" :withFooter="false" @close="closeModal(true)">
    <template #body>
      <div class="select-game-modal__body d-flex flex-column justify-content-center align-items-center">
        <h5 class="w-75 mb-4 text-center">{{ $t('selectGame', { voucherPrice: voucherPriceFormatted }) }}</h5>
        <img class="w-75 h-auto mb-4" src="../../assets/lobby/kino-button.png" @click="selectedGame('kino')" />
        <img class="w-75 h-auto mb-4" src="../../assets/lobby/ps-button.png" @click="selectedGamePs" />
        <img
          class="w-75 h-auto mb-4"
          src="../../assets/lobby/powerspin-button.png"
          @click="selectedGame('powerspin')"
        />
        <img
          class="w-75 h-auto mb-4"
          src="../../assets/lobby/eurojackpot-button.png"
          @click="selectedGame('eurojackpot')"
        />
        <img
          class="w-75 h-auto mb-4"
          src="../../assets/lobby/fireblaze-button.png"
          @click="selectedGame('fireblaze')"
        />
      </div>
    </template>
  </InfoModalWrapper>
</template>

<script>
import AutoCloseMixin from '../../mixins/AutoCloseMixin';
import modalEventConstants from '../../util/modalEventConstants';
import InfoModalWrapper from './InfoModalWrapper';
import Utilities from '../../util/Utilities';

const TIMER_TIMEOUT = 30000;

export default {
  name: 'SelectGameModal',
  mixins: [AutoCloseMixin],
  components: {
    InfoModalWrapper,
  },
  data() {
    return {
      isVisible: false,
      gamesCallback: null,
      psCallback: null,
      closeCallback: null,
      voucherPrice: 0,
    };
  },
  computed: {
    voucherPriceFormatted() {
      return Utilities.formatNumber(this.voucherPrice);
    },
  },
  created() {
    this.$eventHub.$on(modalEventConstants.OPEN.SELECT_GAME, this.openModal);
  },
  beforeDestroy() {
    this.$eventHub.$off(modalEventConstants.OPEN.SELECT_GAME);
  },
  methods: {
    closeModal(triggerCloseCallback = false) {
      this.isVisible = false;
      this.$eventHub.$emit(modalEventConstants.GENERIC.MODAL_ACTIVE, false);
      this.clearAutoCloseTimer();
      triggerCloseCallback && this.closeCallback && this.closeCallback();
    },
    openModal({
      gamesCallback = null,
      psCallback = null,
      voucherPrice = 0,
      closeCallback = null,
      useAutoCloseTimer = true,
    } = {}) {
      this.isVisible = true;
      this.$eventHub.$emit(modalEventConstants.GENERIC.MODAL_ACTIVE, true);
      this.gamesCallback = gamesCallback;
      this.psCallback = psCallback;
      this.voucherPrice = voucherPrice;
      this.closeCallback = closeCallback;
      useAutoCloseTimer && this.triggerAutoCloseTimer(this.closeModal, TIMER_TIMEOUT);
    },
    selectedGame(game) {
      this.closeModal();
      this.gamesCallback && this.gamesCallback(game);
    },
    selectedGamePs() {
      this.closeModal();
      this.psCallback && this.psCallback();
    },
  },
};
</script>
