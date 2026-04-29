
import { shallowMount, mount } from '@vue/test-utils';
import PowerspinQuickbets from '@/components/digitalAssistant/Powerspin/PowerspinQuickbets.vue';
import QuickBets from '@/components/digitalAssistant/Quickbets.vue';

describe('PowerspinQuickbets.vue', () => {
  it('renders QuickBets with POWERSPIN theme', () => {
    const wrapper = shallowMount(PowerspinQuickbets);
    const quickBets = wrapper.findComponent(QuickBets);
    expect(quickBets.exists()).to.be.true;
    expect(quickBets.props('theme')).to.equal('powerspin');
  });
});

describe('QuickBets.vue', () => {
  let wrapper;

  const factory = (propsData = {}) => {
    wrapper = mount(QuickBets, {
      propsData,
      stubs: {
        QuickbetsHeader: { template: '<div data-testid="header" />' },
        QuickbetsCards: {
          template: `
            <div>
              <div data-testid="cards" />
              <span class="powerspin-quickbets-cards-button" v-if="getActiveReturnValue">Return: {{ getActiveReturnValue }}</span>
            </div>
          `,
          computed: {
            getActiveReturnValue() {
              return propsData.returnValue ?? 3.5; // mocked value for test
            },
          },
        },
        QuickbetsFooter: { template: '<div data-testid="footer" />' },
      },
    });
  };

  afterEach(() => {
    if (wrapper) wrapper.destroy();
  });

  it('renders with default theme (powerspin)', () => {
    factory({ theme: 'powerspin' });
    expect(wrapper.classes()).to.include('quickbets--powerspin');
  });

  it('renders with kino theme if specified', async () => {
    factory();
    wrapper.setProps({ theme: 'kino' });
    await wrapper.vm.$nextTick();
    expect(wrapper.classes()).to.include('quickbets--kino');
  });

  it('renders QuickbetsHeader, QuickbetsCards, and QuickbetsFooter components', () => {
    factory();
    expect(wrapper.find('[data-testid="header"]').exists()).to.be.true;
    expect(wrapper.find('[data-testid="cards"]').exists()).to.be.true;
    expect(wrapper.find('[data-testid="footer"]').exists()).to.be.true;
  });

  it('displays active return value if present', () => {
    factory();
    const returnText = wrapper.find('.powerspin-quickbets-cards-button');
    expect(returnText.exists()).to.be.true;
    expect(returnText.text()).contain('Return: 3.5');
  });

  it('does not display active return value if not present', () => {
    factory({ returnValue: 0 });
    const returnText = wrapper.find('.powerspin-quickbets-cards-button');
    expect(returnText.exists()).to.be.false;
  });
});
