import { shallowMount } from '@vue/test-utils';
import PlayArea from '../../../src/components/lobby/games/Powerspin/MainScreen/PlayArea.vue';

describe('PlayArea component', () => {
  let stubs;
  let mocks;
  let propsData;

  beforeEach(() => {
    stubs = {
      PlayPowerspinHeader: {
        name: 'PlayPowerspinHeader',
        props: ['mode'],
        template: `<div class="play-powerspin-header-stub"></div>`,
      },
      PlayWheels: {
        name: 'PlayWheels',
        template: '<div class="play-wheels-stub"></div>',
      },
      PlayMarkets: {
        name: 'PlayMarkets',
        template: '<div class="play-markets-stub"></div>',
      },
    };

    propsData = {
      playMode: 'WHEELS',
    };
  });

  it('renders the correct component based on the playMode', async () => {
    const wrapper = shallowMount(PlayArea, { stubs, propsData, mocks });

    const PlayPowerspinHeaderComponent = wrapper.findComponent({ name: stubs.PlayPowerspinHeader.name });
    const PlayWheelsComponent = wrapper.findComponent({ name: stubs.PlayWheels.name });
    const PlayMarketsComponent = wrapper.findComponent({ name: stubs.PlayMarkets.name });

    expect(PlayPowerspinHeaderComponent.exists()).to.be.true;
    expect(PlayWheelsComponent.exists()).to.be.true;
    expect(PlayMarketsComponent.exists()).to.be.false;
  });

  it('renders the PlayPowerspinHeader component', () => {
    const wrapper = shallowMount(PlayArea, { stubs, propsData, mocks });
    const PlayPowerspinHeaderComponent = wrapper.findComponent({ name: stubs.PlayPowerspinHeader.name });
    expect(PlayPowerspinHeaderComponent.exists()).to.be.true;
    expect(PlayPowerspinHeaderComponent.props('mode')).to.equal('WHEELS');
  });

  it('renders the PlayMarkets component when playMode is MARKETS', async () => {
    const wrapper = shallowMount(PlayArea, { stubs, propsData, mocks });
    wrapper.setData({ playMode: 'MARKETS' });
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent({ name: stubs.PlayMarkets.name }).exists()).to.be.true;
  });

  it('should present the markets component when the mode is "MARKETS"', async () => {
    const wrapper = shallowMount(PlayArea, { stubs, propsData, mocks });
    const newValue = 'MARKETS';
    const header = wrapper.findComponent({ name: stubs.PlayPowerspinHeader.name });
    header.vm.$emit('mode-changed', newValue);
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent({ name: stubs.PlayMarkets.name }).exists()).to.be.true;
  });
});
