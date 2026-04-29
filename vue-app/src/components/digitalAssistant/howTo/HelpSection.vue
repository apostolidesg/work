<template>
  <DigitalAssistantLayout
    :asset-key="videoNames.DIGITAL_ASSISTANT"
    @video-click="navigateToHelpSection"
    class="how-to-page"
  >
    <div class="how-to-page__position">
      <div class="how-to-page-faqs">
        <div class="how-to-page-faqs__item how-to-page-faqs__item--first" data-testid="faq-item">
          <div class="how-to-page-faqs__content how-to-page-faqs__content--first" @click="navigateToFaq">
            <p class="how-to-page-faqs__text">{{ $t('youAsk') }}</p>
            <img :src="faqFirst" alt="faq" class="how-to-page-faqs__image" data-testid="faq-image" />
          </div>
        </div>
        <div class="how-to-page-faqs__item how-to-page-faqs__item--second" data-testid="howto-item">
          <div class="how-to-page-faqs__content how-to-page-faqs__content--second" @click="navigateToHowToVideos">
            <p class="how-to-page-faqs__text">{{ $t('shortVideos') }}</p>
            <img :src="group" alt="group" class="how-to-page-faqs__image" data-testid="howto-image" />
          </div>
        </div>
      </div>
    </div>
  </DigitalAssistantLayout>
</template>

<script>
import faqFirst from '@/assets/faq/faq-first.png';
import group from '@/assets/faq/group.png';
import DigitalAssistantLayout from '../DigitalAssistantLayout.vue';
import Constants from '@/util/Constants';

export default {
  name: 'HelpSection',
  components: { DigitalAssistantLayout },
  data() {
    return {
      faqFirst,
      group,
      videoNames: {},
    };
  },
  created() {
    this.videoNames = Constants.VIDEO_NAMES;
  },
  methods: {
    navigateToHelpSection() {},
    navigateToHowToVideos() {
      this.$router.push({ name: Constants.ROUTE_NAMES.HOWTO_LOBBY });
    },
    navigateToFaq() {
      this.$router.push({ name: Constants.ROUTE_NAMES.MAIN_FAQ });
    },
  },
};
</script>

<style scoped lang="scss">
/* Default */
.how-to-page {
  &__position {
    display: flex;
    flex-direction: column;
    margin-top: 0;
    padding: 20px;
  }

  &-faqs {
    display: flex;
    justify-content: space-between;
    gap: 25px;
    
    @media (max-width: 1200px) {
      justify-content: center;
      gap: 25px;
    }

    &__item {
      position: relative;
      width: 50%;
      height: 530px;
      background: var(--faq-background);
      backdrop-filter: blur(7px);
      z-index: 2;
      margin-bottom: 25px;
      border-radius: 30px;

      @media (max-width: 1200px) {
        width: 100%;
        height: var(--game-height-incr-2);
        max-width: 490px;
      }

      &--first {
        .how-to-page-faqs {
          &__image {
            position: relative;
            top: 0;
            left: 0;
            max-width: 100%;
            height: auto;
          }
        }
      }

      &--second {
        .how-to-page-faqs {
          &__image {
            position: relative;
            right: 0;
            top: -20px;
            max-width: 100%;
            height: auto;
          }
          &__text {
            position: relative;
            width: auto;
            left: 0;
            top: 30px;
          }
        }
      }
    }

    &__content {
      position: relative;
      border-radius: 32px;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
      justify-content: center;

      &--first {
        &::before {
          content: '';
          position: absolute;
          inset: -0.25rem;
          padding: 0.3125rem;
          border-radius: inherit;
          z-index: -1;
          height: 530px;
          width: 100%;
          background: var(--faq-first);
          mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          mask-composite: exclude;

          @media (max-width: 1200px) {
            height: var(--game-height-incr-2);
          }
        }
      }

      &--second {
        &::before {
          content: '';
          position: absolute;
          inset: -0.25rem;
          padding: 0.3125rem;
          border-radius: inherit;
          z-index: -1;
          height: 530px;
          width: 100%;
          background: var(--gradient-primary);
          mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          mask-composite: exclude;

          @media (max-width: 1200px) {
            height: var(--game-height-incr-2);
          }
        }
      }
    }

    &__text {
      color: #fff;
      font-weight: 700;
      font-size: 32px;
      position: relative;
      width: auto;
      top: 0;
      left: 0;
      text-align: center;
      letter-spacing: 5%;
      word-wrap: break-word;
      overflow-wrap: break-word;
      margin-top: 30px;
    }

    &__image {
      position: relative;
      max-width: 100%;
      height: auto;
    }
  }
}

/* Desktop (>=1200) */
@media (min-width: 1200px) {
  .how-to-page {
    &__position {
      display: grid;
      grid-column: 11 / 12;
      margin-top: 124px;
    }

    &-faqs {
      display: grid;
      grid-column: 11 / 12;

      &__item {
        height: 236px;
        width: 750px;
        margin-bottom: 59px;
        margin-top: 20px;
        &--first {
          .how-to-page-faqs {
            &__image {
              position: absolute;
              top: -60px;
              left: -70px;
            }
          }
        }

        &--second {
          .how-to-page-faqs {
            &__image {
              position: absolute;
              right: -60px;
              top: -40px;
            }
            &__text {
              position: absolute;
              width: 481px;
              left: 0;
              top: 90px;
            }
          }
        }
      }

      &__content {
        width: 750px;

        &--first,
        &--second {
          &::before {
            height: 240px;
            width: 760px;
          }
        }
      }

      &__text {
        position: absolute;
        width: 280px;
        left: 372px;
        top: 20%;
        margin-top: 0;
      }
    }
  }
}

/* Desktop adjustments */
@media (min-width: 1200px) and (max-width: 1920px) {
  .how-to-page {
    &-faqs {
      &__item {
        &--second {
          .how-to-page-faqs {
            &__image {
              position: absolute;
              right: -70px;
              height: auto;
            }
          }
        }
      }
    }
  }
}

@media (min-width: 1200px) and (max-width: 1600px) {
  .how-to-page {
    &__position {
      margin-top: 175px;
    }
  }
}
</style>
