import FireblazeNumbersSelections from '../../../../src/components/lobby/games/fireblaze/mainScreen/FireblazeNumbersSelections.vue';
import { shallowMount } from '@vue/test-utils';
import sinon from 'sinon';

describe('FireblazeNumbersSelections Component', () => {
  let stubs;
  let propsData;
  let mocks;
  let tStub;

  beforeEach(() => {
    stubs = {
      FireblazeNumberButton: {
        name: 'FireblazeNumberButton',
        template: '<div class="fireblaze-number-button-stub"><slot></slot></div>',
        props: ['active', 'showStatistics'],
        emits: ['click'],
      },
      NumbersSelectionLayout: {
        name: 'NumbersSelectionLayout',
        template:
          '<div class="numbers-selection-layout-stub">' +
          '<div class="numbers-selections-layout-stub__header">' +
          '<slot name="titlePrefix"></slot>' +
          '<slot name="titleNumbers"></slot>' +
          '</div>' +
          '<slot></slot>' +
          '</div>',
      },
      FireblazeWheelView: {
        name: 'FireblazeWheelView',
        template: '<div class="fireblaze-wheel-view-stub"></div>',
        props: ['numbers', 'selectedNumbers'],
        emits: ['number-selected'],
      },
      FireblazeAlternateViewGridIcon: {
        name: 'FireblazeAlternateViewGridIcon',
        template: '<div class="fireblaze-alternate-view-grid-icon-stub"></div>',
      },
      FireblazeAlternateViewWheelIcon: {
        name: 'FireblazeAlternateViewWheelIcon',
        template: '<div class="fireblaze-alternate-view-wheel-icon-stub"></div>',
      },
    };

    propsData = {
      numbers: Array.from({ length: 35 }, (_, i) => ({ number: i + 1, stat: i % 5 === 0 ? i + 1 : null })),
      selectedNumbers: [1, 2, 3, 4, 5],
      selectedSystemId: null,
    };

    tStub = sinon.stub();

    mocks = {
      $t: tStub,
    };
  });

  afterEach(() => {
    tStub.resetHistory();
  });

  it('should render the FireblazeNumberButton components equal to the length of the numbers', () => {
    const wrapper = shallowMount(FireblazeNumbersSelections, { stubs, propsData, mocks });
    expect(wrapper.findAllComponents({ name: stubs.FireblazeNumberButton.name }).length).to.eq(35);
  });

  it('should render the NumbersSelectionLayout component', () => {
    const wrapper = shallowMount(FireblazeNumbersSelections, { stubs, propsData, mocks });
    expect(wrapper.findComponent({ name: stubs.NumbersSelectionLayout.name }).exists()).to.be.true;
  });

  it('should set the active prop to true for the selected numbers', () => {
    const wrapper = shallowMount(FireblazeNumbersSelections, { stubs, propsData, mocks });
    const buttons = wrapper.findAllComponents({ name: stubs.FireblazeNumberButton.name });
    buttons.wrappers.forEach((button, index) => {
      if (propsData.selectedNumbers.includes(index + 1)) {
        expect(button.props().active).to.be.true;
      } else {
        expect(button.props().active).to.be.false;
      }
    });
  });

  it('should pass the correct number to the FireblazeNumberButton component default slot', () => {
    const wrapper = shallowMount(FireblazeNumbersSelections, { stubs, propsData, mocks });
    const buttons = wrapper.findAllComponents({ name: stubs.FireblazeNumberButton.name });
    buttons.wrappers.forEach((button, index) => {
      expect(button.text()).to.eq((index + 1).toString());
    });
  });

  it('should emit the toggle-number event when a number button is clicked with the button number as value', () => {
    const wrapper = shallowMount(FireblazeNumbersSelections, { stubs, propsData, mocks });
    const button = wrapper.findAllComponents({ name: stubs.FireblazeNumberButton.name }).at(0);

    button.vm.$emit('click');
    expect(wrapper.emitted('toggle-number')).to.deep.equal([[1]]);
  });

  it('should call the $t function with the correct key to find the title prefix', () => {
    shallowMount(FireblazeNumbersSelections, { stubs, propsData, mocks });
    expect(tStub.calledWith('fireblaze.selectAtLeast')).to.be.true;
  });

  it('should toggle to the wheel view when the alternate view is clicked', async () => {
    const wrapper = shallowMount(FireblazeNumbersSelections, { stubs, propsData, mocks });

    await wrapper.find('.fireblaze-numbers__alternate-view').trigger('click');
    expect(wrapper.vm.isWheelActive).to.be.true;
    expect(wrapper.find('.fireblaze-numbers__wheel').exists()).to.be.true;
    expect(wrapper.find('.fireblaze-numbers__grid').exists()).to.be.false;
  });

  it('should show statistics if the stat is valid', () => {
    const wrapper = shallowMount(FireblazeNumbersSelections, { stubs, propsData, mocks });
    const buttons = wrapper.findAllComponents({ name: stubs.FireblazeNumberButton.name });

    buttons.wrappers.forEach((button, index) => {
      const stat = propsData.numbers[index].stat;
      expect(button.props().showStatistics).to.eq(stat !== null && stat >= 0);
    });
  });
});
