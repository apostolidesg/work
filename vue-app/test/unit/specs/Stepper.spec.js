import { shallowMount } from '@vue/test-utils';
import Stepper from '../../../src/components/lobby/games/Powerspin/MainScreen/Stepper';

describe('Stepper Component', () => {
  let stubs;

  beforeEach(() => {
    stubs = {
      StepperItem: {
        name: 'StepperItem',
        props: ['hasWheel', 'showNext', 'isLast'],
        template: '<div><slot></slot></div>',
      },
      PowerSpinLogo: {
        name: 'PowerSpinLogo',
        props: ['isSelected'],
        template: '<span></span>',
      },
      Compo2Dark: {
        name: 'Compo2Dark',
        template: '<span></span>',
      },
      Compo2White: {
        name: 'Compo2White',
        template: '<span></span>',
      },
      Compo2WhiteSelected: {
        name: 'Compo2WhiteSelected',
        template: '<span></span>',
      },
      Compo3Dark: {
        name: 'Compo3Dark',
        template: '<span></span>',
      },
      Compo3White: {
        name: 'Compo3White',
        template: '<span></span>',
      },
      Compo3WhiteSelected: {
        name: 'Compo3WhiteSelected',
        template: '<span></span>',
      },
    };
  });

  afterEach(() => {});

  it('should render 3 Step Items', () => {
    const wrapper = shallowMount(Stepper, { stubs, propsData: { wheels: [] } });
    const items = wrapper.findAllComponents({ name: stubs.StepperItem.name });
    expect(items.length).to.eq(3);
  });

  it('should set the the hasWheel prop of each item to false if there is no wheel', () => {
    const wrapper = shallowMount(Stepper, { stubs, propsData: { wheels: [] } });
    const items = wrapper.findAllComponents({ name: stubs.StepperItem.name });

    expect(items.at(0).vm.$props.hasWheel).to.be.false;
    expect(items.at(1).vm.$props.hasWheel).to.be.false;
    expect(items.at(2).vm.$props.hasWheel).to.be.false;
  });

  it('should set the the hasWheel prop of each item to true if there is a wheel', () => {
    const wheels = [{ isEmpty: () => true }, { isEmpty: () => true }, { isEmpty: () => true }];
    const wrapper = shallowMount(Stepper, { stubs, propsData: { wheels } });
    const items = wrapper.findAllComponents({ name: stubs.StepperItem.name });

    expect(items.at(0).vm.$props.hasWheel).to.be.true;
    expect(items.at(1).vm.$props.hasWheel).to.be.true;
    expect(items.at(2).vm.$props.hasWheel).to.be.true;
  });

  it('should set the showNext prop to the first item if there is one wheel', () => {
    const wheels = [{ isEmpty: () => true }];
    const wrapper = shallowMount(Stepper, { stubs, propsData: { wheels } });
    const items = wrapper.findAllComponents({ name: stubs.StepperItem.name });

    expect(items.at(0).vm.$props.showNext).to.be.true;
    expect(items.at(1).vm.$props.showNext).to.be.false;
    expect(items.at(2).vm.$props.showNext).to.be.false;
  });

  it('should set the showNext prop to the second item if there are two wheels', () => {
    const wheels = [{ isEmpty: () => true }, { isEmpty: () => true }];
    const wrapper = shallowMount(Stepper, { stubs, propsData: { wheels } });
    const items = wrapper.findAllComponents({ name: stubs.StepperItem.name });

    expect(items.at(0).vm.$props.showNext).to.be.false;
    expect(items.at(1).vm.$props.showNext).to.be.true;
    expect(items.at(2).vm.$props.showNext).to.be.false;
  });

  it('should set the isLast prop to the third item', () => {
    const wrapper = shallowMount(Stepper, { stubs, propsData: { wheels: [] } });
    const items = wrapper.findAllComponents({ name: stubs.StepperItem.name });

    expect(items.at(2).vm.$props.isLast).to.be.true;
  });

  it('should emit an add-wheels event with payload 1 when the next btn is pressed', () => {
    const wrapper = shallowMount(Stepper, { stubs, propsData: { wheels: [{ isEmpty: () => false }] } });
    const firstItem = wrapper.findAllComponents({ name: stubs.StepperItem.name }).at(0);

    firstItem.vm.$emit('arrow-click');

    expect(wrapper.emitted('add-wheels')[0]).to.eql([1]);
  });

  it('should emit a remove-wheels-after-index event when the prev btn is pressed', () => {
    const wheels = [{ isEmpty: () => true }, { isEmpty: () => true }, { isEmpty: () => true }];
    const wrapper = shallowMount(Stepper, { stubs, propsData: { wheels } });
    const thirdItem = wrapper.findAllComponents({ name: stubs.StepperItem.name }).at(2);

    thirdItem.vm.$emit('arrow-click');
    expect(wrapper.emitted('remove-wheels-after-index')[0]).to.eql([1]);
  });

  it('should render the no wheel logo when the relevant wheel not present', () => {
    const wrapper = shallowMount(Stepper, { stubs, propsData: { wheels: [{ isEmpty: () => false }] } });

    const secondItem = wrapper.findAllComponents({ name: stubs.StepperItem.name }).at(1);
    const thirdItem = wrapper.findAllComponents({ name: stubs.StepperItem.name }).at(2);

    const compo2Black = secondItem.findComponent({ name: stubs.Compo2Dark.name });
    expect(compo2Black.exists()).to.be.true;
    const compo3Black = thirdItem.findComponent({ name: stubs.Compo3Dark.name });
    expect(compo3Black.exists()).to.be.true;
  });

  it('should render the empty wheel logo when the relevant wheel is empty', () => {
    const wheels = [{ isEmpty: () => true }, { isEmpty: () => true }, { isEmpty: () => true }];
    const wrapper = shallowMount(Stepper, { stubs, propsData: { wheels } });

    const firstItem = wrapper.findAllComponents({ name: stubs.StepperItem.name }).at(0);
    const secondItem = wrapper.findAllComponents({ name: stubs.StepperItem.name }).at(1);
    const thirdItem = wrapper.findAllComponents({ name: stubs.StepperItem.name }).at(2);

    const powerSpinEmpty = firstItem.findComponent({ name: stubs.PowerSpinLogo.name });
    expect(powerSpinEmpty.exists()).to.be.true;
    expect(powerSpinEmpty.vm.$props.isSelected).to.be.false;
    const compo2White = secondItem.findComponent({ name: stubs.Compo2White.name });
    expect(compo2White.exists()).to.be.true;
    const compo3White = thirdItem.findComponent({ name: stubs.Compo3White.name });
    expect(compo3White.exists()).to.be.true;
  });

  it('should render the full wheel logo when the relevant wheel is not empty', () => {
    const wheels = [{ isEmpty: () => false }, { isEmpty: () => false }, { isEmpty: () => false }];
    const wrapper = shallowMount(Stepper, { stubs, propsData: { wheels } });

    const firstItem = wrapper.findAllComponents({ name: stubs.StepperItem.name }).at(0);
    const secondItem = wrapper.findAllComponents({ name: stubs.StepperItem.name }).at(1);
    const thirdItem = wrapper.findAllComponents({ name: stubs.StepperItem.name }).at(2);

    const powerSpinOn = firstItem.findComponent({ name: stubs.PowerSpinLogo.name });
    expect(powerSpinOn.exists()).to.be.true;
    const compo2Selected = secondItem.findComponent({ name: stubs.Compo2WhiteSelected.name });
    expect(compo2Selected.exists()).to.be.true;
    const compo3Selected = thirdItem.findComponent({ name: stubs.Compo3WhiteSelected.name });
    expect(compo3Selected.exists()).to.be.true;
  });

  describe('when one wheel is present', () => {
    it('should emit the add-wheels event with payload 1 when the Compo2 logo is clicked', () => {
      const wrapper = shallowMount(Stepper, { stubs, propsData: { wheels: [{ isEmpty: () => false }] } });
      const Compo2Logo = wrapper.findComponent({ name: stubs.Compo2Dark.name });
      Compo2Logo.vm.$emit('click');
      expect(wrapper.emitted('add-wheels')[0]).to.eql([1]);
    });

    it('should emit the add-wheels event with payload 2 when the Compo3 logo is clicked', () => {
      const wrapper = shallowMount(Stepper, { stubs, propsData: { wheels: [{ isEmpty: () => false }] } });
      const Compo3Logo = wrapper.findComponent({ name: stubs.Compo3Dark.name });
      Compo3Logo.vm.$emit('click');
      expect(wrapper.emitted('add-wheels')[0]).to.eql([2]);
    });
  });

  describe('when two wheels are present', () => {
    const wheels = [{ isEmpty: () => true }, { isEmpty: () => true }];

    it('should emit remove-wheels-after-index with payload 0 when the Powerspin logo is clicked', () => {
      const wrapper = shallowMount(Stepper, { stubs, propsData: { wheels } });
      const PowerspinLogo = wrapper.findComponent({ name: stubs.PowerSpinLogo.name });
      PowerspinLogo.vm.$emit('click');
      expect(wrapper.emitted('remove-wheels-after-index')[0]).to.eql([0]);
    });

    it('should emit the add-wheels event with payload 1 when the Compo3 logo is clicked', () => {
      const wrapper = shallowMount(Stepper, { stubs, propsData: { wheels } });
      const Compo3Logo = wrapper.findComponent({ name: stubs.Compo3Dark.name });
      Compo3Logo.vm.$emit('click');
      expect(wrapper.emitted('add-wheels')[0]).to.eql([1]);
    });
  });

  describe('when three wheels are present', () => {
    const wheels = [{ isEmpty: () => true }, { isEmpty: () => true }, { isEmpty: () => true }];

    it('should emit remove-wheels-after-index with payload 0 when the Powerspin logo is clicked', () => {
      const wrapper = shallowMount(Stepper, { stubs, propsData: { wheels } });
      const PowerspinLogo = wrapper.findComponent({ name: stubs.PowerSpinLogo.name });
      PowerspinLogo.vm.$emit('click');
      expect(wrapper.emitted('remove-wheels-after-index')[0]).to.eql([0]);
    });

    it('should emit remove-wheels-after-index with payload 1 when the Compo2 logo is clicked', () => {
      const wrapper = shallowMount(Stepper, { stubs, propsData: { wheels } });
      const Compo2Logo = wrapper.findComponent({ name: stubs.Compo2White.name });
      Compo2Logo.vm.$emit('click');
      expect(wrapper.emitted('remove-wheels-after-index')[0]).to.eql([1]);
    });
  });
});
