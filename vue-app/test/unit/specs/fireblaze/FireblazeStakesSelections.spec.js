import FireblazeStakesSelections from '../../../../src/components/lobby/games/fireblaze/mainScreen/FireblazeStakesSelections.vue';
import { shallowMount } from '@vue/test-utils';
import sinon from 'sinon';
import Constants from '../../../../src/util/Constants';

describe('FireblazeStakesSelections', () => {
  let wrapper;
  let sandbox;
  let emitSpy;

  const selectedStakes = [2, 5];
  const stakes = [
    { multiplier: 2, stat: 10 },
    { multiplier: 5, stat: 15 },
    { multiplier: 10, stat: 20 },
  ];

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    emitSpy = sandbox.spy();
    wrapper = shallowMount(FireblazeStakesSelections, {
      propsData: { selectedStakes, stakes },
      listeners: { 'select-stake': emitSpy },
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should render correctly', () => {
    expect(wrapper.exists()).to.be.true;
  });

  it('should render the correct number of stakes buttons', () => {
    expect(wrapper.findAll('button').length).to.equal(stakes.length);
  });

  it('should correctly apply active class to selected stakes', () => {
    const buttons = wrapper.findAll('button');
    expect(buttons.at(0).classes()).to.include('fireblaze-stakes-selection__stakes-button--active');
    expect(buttons.at(1).classes()).to.include('fireblaze-stakes-selection__stakes-button--active');
    expect(buttons.at(2).classes()).to.not.include('fireblaze-stakes-selection__stakes-button--active');
  });

  it('should emit select-stake event when a stake button is clicked', async () => {
    const buttons = wrapper.findAll('button');
    await buttons.at(2).trigger('click');
    expect(emitSpy.calledOnceWith(10)).to.be.true;
  });

  it('should correctly compute stake values', () => {
    expect(wrapper.vm.getStake(2)).to.equal(2 * Constants.BASIC_BETTING_AMOUNT);
    expect(wrapper.vm.getStake(5)).to.equal(5 * Constants.BASIC_BETTING_AMOUNT);
  });
});
