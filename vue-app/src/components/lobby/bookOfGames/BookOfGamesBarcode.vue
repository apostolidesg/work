<template>
  <div class="book-of-games-qrcode">
    <img v-if="QRCodeData" :id="`books-of-games-qrcode-${index}`" :src="QRCodeData" alt="QR code" />
    <div v-else class="book-of-games-qrcode__error">{{ $t('bookOfGames.barcodeFail') }}</div>
  </div>
</template>

<script>
import QRCode from 'qrcode';
import Constants from '../../../util/Constants';

export default {
  name: 'BookOfGamesBarcode',
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
  data() {
    return {
      QRCodeData: '',
    };
  },
  mounted() {
    this.generateQRCode();
  },
  methods: {
    async generateQRCode() {
      if (this.url) this.QRCodeData = await QRCode.toDataURL(this.url, Constants.BOOK_OF_GAMES_QRCODE_OPTIONS);
    },
  },
};
</script>

<style scoped lang="scss">
.book-of-games-qrcode {
  &__error {
    background-color: #d9d9d9;
    width: 188px;
    height: 188px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
}
</style>
