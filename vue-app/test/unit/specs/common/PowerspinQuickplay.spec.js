import { shallowMount } from '@vue/test-utils';
import KinoQuickPlay from '@/components/digitalAssistant/Powerspin/PowerspinQuickplay.vue';

describe('KinoQuickPlay.vue', () => {
  let wrapper;

  const factory = (config = {}) => {
    wrapper = shallowMount(KinoQuickPlay, {
      mocks: {
        $t: (key) => key,
      },
      computed: {
        getConfiguration: () => ({ POWERSPIN: { READY_BETSLIPS: config.betslips || [] } }),
      },
      stubs: {
        QuickPlay: { template: '<div data-testid="quickplay"><slot /></div>' },
        QuickPlayCard: { template: '<div data-testid="card" />' },
      },
    });
  };

  afterEach(() => {
    if (wrapper) wrapper.destroy();
  });

  it('renders QuickPlay with POWERSPIN theme', () => {
    factory();
    expect(wrapper.find('[data-testid="quickplay"]').exists()).to.be.true;
  });

  it('renders the correct number of QuickPlayCard components', () => {
    factory({ betslips: [{}, {}, {}] });
    expect(wrapper.findAll('[data-testid="card"]').length).to.equal(3);
  });
});
