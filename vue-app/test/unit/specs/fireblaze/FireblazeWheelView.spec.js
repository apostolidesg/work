import FireblazeWheelView from '../../../../src/components/lobby/games/fireblaze/mainScreen/FireblazeWheelView.vue';
import FireblazeNumberButton from '../../../../src/components/lobby/games/fireblaze/mainScreen/FireblazeNumberButton.vue';
import { shallowMount } from '@vue/test-utils';
import sinon from 'sinon';
import FireblazeConstants from '../../../../src/util/fireblazeConstants';

describe('FireblazeWheelView', () => {
  let wrapper;
  let sandbox;
  let emitSpy;

  const numbers = [
    { number: 1, stat: 10 },
    { number: 2, stat: 15 },
    { number: 3, stat: 20 },
  ];
  const selectedNumbers = [1, 3];

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    emitSpy = sandbox.spy();
    wrapper = shallowMount(FireblazeWheelView, {
      propsData: { numbers, selectedNumbers },
      listeners: { 'number-selected': emitSpy },
      stubs: { FireblazeNumberButton },
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should render correctly', () => {
    expect(wrapper.exists()).to.be.true;
  });

  it('should render the correct number of wheel items', () => {
    expect(wrapper.findAll('.fireblaze-wheel__item').length).to.equal(numbers.length);
  });

  it('should apply active class to selected numbers', () => {
    const items = wrapper.findAll('.fireblaze-wheel__item');
    expect(items.at(0).classes()).to.include('fireblaze-wheel__item--active');
    expect(items.at(1).classes()).to.not.include('fireblaze-wheel__item--active');
    expect(items.at(2).classes()).to.include('fireblaze-wheel__item--active');
  });

  it('should emit number-selected event when a number is clicked', async () => {
    const items = wrapper.findAll('.fireblaze-wheel__item');
    await items.at(1).trigger('click');
    expect(emitSpy.calledOnceWith(2)).to.be.true;
  });

  it('should calculate correct styles for wheel slices', () => {
    const style = wrapper.vm.getWheelSliceStyle(1, numbers.length);
    expect(style.transform).to.equal(`rotate(${(360 / numbers.length) * 1}deg)`);
  });

  it('should calculate correct styles for wheel items', () => {
    const style = wrapper.vm.getWheelItemStyle(1, numbers.length);
    expect(style.transform).to.equal(`rotate(-${(FireblazeConstants.CIRCLE_ANGLE / numbers.length) * 1}deg)`);
  });
  it('should render numbers in the same order as the numbers prop', () => {
    const renderedNumbers = wrapper.findAllComponents(FireblazeNumberButton).wrappers.map((button) => {
      const text = button.text().trim();
      return parseInt(text, 10);
    });
    expect(renderedNumbers).to.deep.equal([3, 2, 1]);
  });
});
