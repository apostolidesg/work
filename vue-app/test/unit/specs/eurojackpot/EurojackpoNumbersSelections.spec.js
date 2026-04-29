import EurojackpotNumbersSelections from '../../../../src/components/lobby/games/eurojackpot/mainscreen/EurojackpotNumbersSelections.vue';
import { shallowMount } from '@vue/test-utils';
import sinon from 'sinon';

describe('EurojackpotNumbersSelections Component', () => {
  let stubs;
  let propsData;
  let mocks;
  let tStub;

  beforeEach(() => {
    stubs = {
      EurojackpotNumberButton: {
        name: 'EurojackpotNumberButton',
        template: '<div class="eurojackpot-number-button-stub"><slot></slot></div>',
        props: ['active', 'theme'],
        emits: ['click'],
      },
      NumbersSelectionLayout: {
        name: 'NumbersSelectionLayout',
        template:
          '<div class="numbers-selection-layout-stub">' +
          '<div class="numbers-selecions-layout-stub__header">' +
          '<slot name="titlePrefix"></slot>' +
          '<slot name="titleNumbers"></slot>' +
          '</div>' +
          '<slot></slot>' +
          '</div>',
      },
    };

    propsData = {
      numbers: Array.from({ length: 50 }, (_, i) => ({ number: i + 1 })),
      selectedNumbers: [1, 2, 3, 4, 5],
      selectedSystemId: null,
      type: 'main',
    };

    tStub = sinon.stub();

    mocks = {
      $t: tStub,
    };
  });

  afterEach(() => {
    tStub.resetHistory();
  });

  it('should render the EurojackpotNumberButton components equal to the length of the numbers', () => {
    const wrapper = shallowMount(EurojackpotNumbersSelections, { stubs, propsData, mocks });
    expect(wrapper.findAllComponents({ name: stubs.EurojackpotNumberButton.name }).length).to.eq(50);
  });

  describe('when the type prop is "main"', () => {
    it('should set the active prop to true for the selected numbers', () => {
      const wrapper = shallowMount(EurojackpotNumbersSelections, { stubs, propsData, mocks });
      const buttons = wrapper.findAllComponents({ name: stubs.EurojackpotNumberButton.name });
      buttons.wrappers.forEach((button, index) => {
        if (propsData.selectedNumbers.includes(index + 1)) {
          expect(button.props().active).to.be.true;
        } else {
          expect(button.props().active).to.be.false;
        }
      });
    });

    it('should set the theme prop to "main" to all numbers', () => {
      const wrapper = shallowMount(EurojackpotNumbersSelections, { stubs, propsData, mocks });
      const buttons = wrapper.findAllComponents({ name: stubs.EurojackpotNumberButton.name });
      buttons.wrappers.forEach(button => {
        expect(button.props().theme).to.eq('main');
      });
    });

    it('should pass the correct number to the EurojackpotNumberButton component default slot', () => {
      const wrapper = shallowMount(EurojackpotNumbersSelections, { stubs, propsData, mocks });
      const buttons = wrapper.findAllComponents({ name: stubs.EurojackpotNumberButton.name });
      buttons.wrappers.forEach((button, index) => {
        expect(button.text()).to.eq((index + 1).toString());
      });
    });

    it('should emit the toggle-number event when a number button is clicked with the button number as value', () => {
      const wrapper = shallowMount(EurojackpotNumbersSelections, { stubs, propsData, mocks });
      const button = wrapper.findAllComponents({ name: stubs.EurojackpotNumberButton.name }).at(0);

      button.vm.$emit('click');
      expect(wrapper.emitted('toggle-number')).to.deep.equal([[1]]);
    });

    it('should call the $t function with the correct key to find the title prefix when there is no system', () => {
      shallowMount(EurojackpotNumbersSelections, { stubs, propsData, mocks });
      expect(tStub.calledWith('eurojackpot.selectAtLeast')).to.be.true;
    });

    it('should call the $t function with the correct key to find the title prefix when there is a system', () => {
      propsData.selectedSystemId = '12';
      shallowMount(EurojackpotNumbersSelections, { stubs, propsData, mocks });
      expect(tStub.calledWith('eurojackpot.select')).to.be.true;
    });

    it('should call the $t function with the correct key to find the title numbers when there is no system', () => {
      shallowMount(EurojackpotNumbersSelections, { stubs, propsData, mocks });

      expect(tStub.getCall(1).args[0]).to.be.eq('eurojackpot.numberSelection');
      expect(tStub.getCall(1).args[1]).to.be.eql({ number: 5 });
    });

    it('should call the $t function with the correct key to find the title numbers when there is a system', () => {
      propsData.selectedSystemId = '12';
      shallowMount(EurojackpotNumbersSelections, { stubs, propsData, mocks });

      expect(tStub.getCall(1).args[0]).to.be.eq('eurojackpot.numberSelection');
      expect(tStub.getCall(1).args[1]).to.be.eql({ number: 15 });
    });

    it('should render the header with the correct title', () => {
      tStub.onCall(0).returns('Select at least');
      tStub.onCall(1).returns('5 numbers');
      const wrapper = shallowMount(EurojackpotNumbersSelections, { stubs, propsData, mocks });
      const layout = wrapper.findComponent({ name: stubs.NumbersSelectionLayout.name });
      const header = layout.find('.numbers-selecions-layout-stub__header');

      expect(header.text()).to.eq('Select at least 5 numbers');
    });
  });

  describe('when the type prop is "euro"', () => {
    beforeEach(() => {
      propsData.type = 'euro';
    });

    it('should set the theme prop to "euro" to all numbers', () => {
      const wrapper = shallowMount(EurojackpotNumbersSelections, { stubs, propsData, mocks });
      const buttons = wrapper.findAllComponents({ name: stubs.EurojackpotNumberButton.name });
      buttons.wrappers.forEach(button => {
        expect(button.props().theme).to.eq('euro');
      });
    });

    it('should emit the toggleNumber event when a number is clicked', () => {
      const wrapper = shallowMount(EurojackpotNumbersSelections, { stubs, propsData, mocks });
      const button = wrapper.findAllComponents({ name: stubs.EurojackpotNumberButton.name }).at(0);
      button.vm.$emit('click');

      expect(wrapper.emitted('toggle-number')).to.deep.equal([[1]]);
    });

    it('should call the $t function with the correct key to find the title prefix when there is no system', () => {
      shallowMount(EurojackpotNumbersSelections, { stubs, propsData, mocks });
      expect(tStub.calledWith('eurojackpot.selectAtLeast')).to.be.true;
    });

    it('should call the $t function with the correct key to find the title prefix when there is a system', () => {
      propsData.selectedSystemId = '12';
      shallowMount(EurojackpotNumbersSelections, { stubs, propsData, mocks });
      expect(tStub.calledWith('eurojackpot.select')).to.be.true;
    });

    it('should call the $t function with the correct key to find the title numbers', () => {
      shallowMount(EurojackpotNumbersSelections, { stubs, propsData, mocks });

      expect(tStub.getCall(1).args[0]).to.be.eq('eurojackpot.numberSelection');
      expect(tStub.getCall(1).args[1]).to.be.eql({ number: 2 });
    });

    it('should render the correct title to the header', () => {
      tStub.onCall(0).returns('Select at least');
      tStub.onCall(1).returns('2 numbers');
      const wrapper = shallowMount(EurojackpotNumbersSelections, { stubs, propsData, mocks });
      const layout = wrapper.findComponent({ name: stubs.NumbersSelectionLayout.name });
      const header = layout.find('.numbers-selecions-layout-stub__header');

      expect(header.text()).to.eq('Select at least☆ 2 numbers');
    });
  });
});
