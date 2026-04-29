import { shallowMount } from '@vue/test-utils';
import StepperItem from '../../../src/components/lobby/games/Powerspin/MainScreen/StepperItem';

describe('Stepper Item Component', () => {
  const EMPTY_CLASS = '.powerspin-stepper-item';
  const ACTIVE_CLASS = '.powerspin-stepper-item--active';
  const FILLED_CLASS = '.powerspin-stepper-item--filled';

  let propsData;
  let stubs;

  beforeEach(() => {
    propsData = {
      hasWheel: false,
      showNext: false,
      isLast: false,
    };

    stubs = {
      FontAwesomeIcon: {
        name: 'FontAwesomeIcon',
        template: '<svg></svg>',
      },
    };
  });

  it('should render with no background if hasWheel prop is false', () => {
    const wrapper = shallowMount(StepperItem, { propsData, stubs });

    expect(wrapper.find(EMPTY_CLASS).exists()).to.be.true;
    expect(wrapper.find(ACTIVE_CLASS).exists()).to.be.false;
    expect(wrapper.find(FILLED_CLASS).exists()).to.be.false;
  });

  it('should render with dark background and rounded border if hasWheel and hasNext prop is true', () => {
    const wrapper = shallowMount(StepperItem, { propsData: { ...propsData, hasWheel: true, showNext: true }, stubs });

    expect(wrapper.find(EMPTY_CLASS).exists()).to.be.true;
    expect(wrapper.find(ACTIVE_CLASS).exists()).to.be.true;
    expect(wrapper.find(FILLED_CLASS).exists()).to.be.false;
  });

  it('should render with dark background and no border if hasWheel prop is true and showNext false', () => {
    const wrapper = shallowMount(StepperItem, { propsData: { ...propsData, hasWheel: true }, stubs });

    expect(wrapper.find(EMPTY_CLASS).exists()).to.be.true;
    expect(wrapper.find(ACTIVE_CLASS).exists()).to.be.false;
    expect(wrapper.find(FILLED_CLASS).exists()).to.be.true;
  });

  it('should not render the next arrow if both showNext and hasPrev props are false', () => {
    const wrapper = shallowMount(StepperItem, { propsData: { ...propsData, hasWheel: true }, stubs });

    const btn = wrapper.findComponent({ name: stubs.FontAwesomeIcon.name });
    expect(btn.exists()).to.be.false;
  });

  it('should render the next arrow if showNext prop is true', () => {
    const wrapper = shallowMount(StepperItem, { propsData: { ...propsData, hasWheel: true, showNext: true }, stubs });

    const btn = wrapper.findComponent({ name: stubs.FontAwesomeIcon.name });
    const prevClass = wrapper.find('.stepper-item__back-btn--last');
    expect(btn.exists()).to.be.true;
    expect(prevClass.exists()).to.be.false;
  });

  it('should render the prev arrow if the item is the last', () => {
    const wrapper = shallowMount(StepperItem, { propsData: { ...propsData, hasWheel: true, isLast: true }, stubs });

    const btn = wrapper.findComponent({ name: stubs.FontAwesomeIcon.name });
    const prevClass = wrapper.find('.powerspin-stepper-item__back-btn--last');
    expect(btn.exists()).to.be.true;
    expect(prevClass.exists()).to.be.true;
  });

  it('should emit next event when the next btn is pressed', async () => {
    const wrapper = shallowMount(StepperItem, { propsData: { ...propsData, hasWheel: true, showNext: true }, stubs });

    const btn = wrapper.findComponent({ name: stubs.FontAwesomeIcon.name });
    await btn.vm.$emit('click');

    expect(wrapper.emitted()).to.haveOwnProperty('arrow-click');
  });

  it('should emit arrow-click event when the prev btn is pressed', async () => {
    const wrapper = shallowMount(StepperItem, { propsData: { ...propsData, hasWheel: true, isLast: true }, stubs });

    const btn = wrapper.findComponent({ name: stubs.FontAwesomeIcon.name });
    await btn.vm.$emit('click');

    expect(wrapper.emitted()).to.haveOwnProperty('arrow-click');
  });
});
