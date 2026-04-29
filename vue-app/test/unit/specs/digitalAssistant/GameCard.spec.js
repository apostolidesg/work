import { createLocalVue, shallowMount } from '@vue/test-utils';
import GameCard from '../../../../src/components/digitalAssistant/GameCard.vue';
import VueRouter from 'vue-router';
import sinon from 'sinon';
import gtag from '@/util/gtag';
import gtmEvents from '@/constants/gtmEvents';
import Constants from '@/util/Constants';

describe('GameCard.vue', () => {
  let wrapper;
  let localVue;
  let router;
  let sandbox;
  let propsData;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    localVue = createLocalVue();
    localVue.use(VueRouter);
    router = new VueRouter();

    sandbox.stub(gtag, 'sendEvent');

    propsData = {
      theme: 'kino',
      buttonText: 'Play Now',
      to: 'kino-quickplay',
    };
  });

  afterEach(() => {
    sandbox.restore();
    if (wrapper) {
      wrapper.destroy();
    }
  });

  it('renders with correct theme class', () => {
    wrapper = shallowMount(GameCard, {
      localVue,
      propsData,
      mocks: {
        $router: router,
      },
    });
    expect(wrapper.classes()).to.contain('game-card--kino');
  });

  it('applies theme-specific class to image container', () => {
    wrapper = shallowMount(GameCard, {
      localVue,
      propsData,
      mocks: {
        $router: router,
      },
    });
    const imageContainer = wrapper.find('.game-card__image-container');
    expect(imageContainer.classes()).to.contain('kino');
  });

  it('displays correct logo based on theme', () => {
    wrapper = shallowMount(GameCard, {
      localVue,
      propsData,
      mocks: {
        $router: router,
      },
    });
    const logo = wrapper.find('.game-card__logo');
    expect(logo.exists()).to.be.true;
    expect(logo.attributes('src')).to.not.be.empty;
    expect(logo.attributes('alt')).to.equal('logo');
  });

  it('renders powerspin logo when theme is powerspin', () => {
    propsData.theme = 'powerspin';
    wrapper = shallowMount(GameCard, {
      localVue,
      propsData,
      mocks: {
        $router: router,
      },
    });
    const logo = wrapper.find('.game-card__logo');
    expect(logo.exists()).to.be.true;
    expect(logo.attributes('src')).to.not.be.empty;
  });

  it('displays button with provided text', () => {
    wrapper = shallowMount(GameCard, {
      localVue,
      propsData,
      mocks: {
        $router: router,
      },
    });
    const buttonText = wrapper.find('.button__text');
    expect(buttonText.text()).to.equal('Play Now');
  });

  it('uses default button text when not provided', () => {
    const { buttonText, ...propsWithoutButton } = propsData;
    wrapper = shallowMount(GameCard, {
      localVue,
      propsData: propsWithoutButton,
      mocks: {
        $router: router,
      },
    });
    const buttonTextElement = wrapper.find('.button__text');
    expect(buttonTextElement.text()).to.equal('Play now');
  });

  it('applies theme-specific class to button', () => {
    wrapper = shallowMount(GameCard, {
      localVue,
      propsData,
      mocks: {
        $router: router,
      },
    });
    const button = wrapper.find('.button');
    expect(button.classes()).to.contain('button--kino');
  });

  it('renders with proper layout structure', () => {
    wrapper = shallowMount(GameCard, {
      localVue,
      propsData,
      mocks: {
        $router: router,
      },
    });
    expect(wrapper.find('.game-card__content').exists()).to.be.true;
    expect(wrapper.find('.game-card__image-container').exists()).to.be.true;
    expect(wrapper.find('.game-card__button-container').exists()).to.be.true;
  });

  it('sends tracking event for KINO when card is clicked', async () => {
    wrapper = shallowMount(GameCard, {
      localVue,
      propsData: {
        theme: Constants.THEMES.KINO,
      },
      router,
    });

    await wrapper.find('.game-card').trigger('click');
    expect(gtag.sendEvent.calledWith(gtmEvents.SSBT_LOTTERY_LOBBY_PLAY_KINO)).to.be.true;
  });

  it('sends tracking event for POWERSPIN when card is clicked', async () => {
    wrapper = shallowMount(GameCard, {
      localVue,
      propsData: {
        theme: Constants.THEMES.POWERSPIN,
      },
      router,
    });

    await wrapper.find('.game-card').trigger('click');
    expect(gtag.sendEvent.calledWith(gtmEvents.SSBT_LOTTERY_LOBBY_PLAY_POWERSPIN)).to.be.true;
  });
});
