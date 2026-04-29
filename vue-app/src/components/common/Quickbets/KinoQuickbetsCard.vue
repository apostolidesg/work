<template>
  <div class="kino-quickbets-cards">
    <div>
      <h2 class="kino-quickbets-cards__card-title">{{ $t('column') }} {{ index + 1 }}</h2>
    </div>
    <div class="kino-quickbets-cards__card-price">
      <div class="kino-quickbets-cards__card-price-number-container">
        <div
          class="kino-quickbets-cards__card-price-number"
          v-for="number in card.pickedNumbers"
          :class="{
            'kino-quickbets-cards__card-price-number--small': card.pickedNumbers.length > 9 && card.kinoBonusActive,
          }"
          :key="number"
        >
          <span>{{ number }}</span>
        </div>
      </div>
      <p v-if="card.kinoBonusActive" class="quickbets-cards__card-bonus">
        <img class="kino-quickbets-cards__card-bonus-image" src="@/assets/digital-assistant/bonus.png" alt="bonus" />
      </p>
    </div>
    <button class="kino-quickbets-cards-button">€{{ getCardValue(card.value) }}</button>
  </div>
</template>

<script>
export default {
  name: 'KinoQuickbetsCards',
  props: {
    index: {
      type: Number,
    },
    card: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getCardValue(value) {
      // Check if the value is a number and has a decimal part
      return Number(value) % 1 !== 0 && String(value).split('.')[1]?.length === 1 ? Number(value).toFixed(2) : value;
    },
  },
};
</script>

<style lang="scss" scoped>
.kino-quickbets-cards {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: normal;
  justify-content: space-between;
  flex: 1 1;

  @media (max-width: 1500px) {
    width: 100%;
    max-width: 1070px;
  }

  &__card-bonus {
    &-image {
      width: 170px;
      height: 50px;
      margin-top: 15px;
    }
  }

  &__card-price-number-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    gap: 0.5rem;
  }

  &__card-price {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;

    &-number {
      border-radius: 100%;
      text-align: center;
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--color-black);
      background: linear-gradient(0deg, var(--color-yellow-warm), var(--color-yellow-warm)),
        radial-gradient(180% 180% at 0% 100%, var(--color-orange-light) 0%, rgba(255, 123, 28, 0) 100%),
        radial-gradient(140% 140% at 100% 0%, var(--color-orange-bright) 0%, rgba(255, 230, 0, 0) 100%),
        radial-gradient(100% 100% at 0% 0%, var(--color-yellow-mid) 0%, rgba(255, 173, 27, 0) 100%);
      border: 1.11px solid;

      border-image-source: linear-gradient(
        180deg,
        var(--color-grey-border-start) 20.03%,
        var(--color-grey-border-end-alpha) 100%
      );

      width: 63px;
      height: 63px;
      display: flex;
      justify-content: center;
      align-items: center;

      &--small {
        width: 49px;
        height: 49px;
      }
    }
  }

  &-button {
    color: var(--color-white);
    font-weight: 600;
    font-size: 35px;
    border: none;
    border-radius: 9999px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    background: transparent;

    &:hover {
      background-color: var(--color-button-hover-yellow);
    }
  }
}
</style>
