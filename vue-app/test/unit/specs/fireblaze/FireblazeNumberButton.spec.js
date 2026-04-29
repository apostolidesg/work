import { shallowMount } from '@vue/test-utils';
import { expect } from 'chai';
import FireblazeNumberButton from '../../../../src/components/lobby/games/fireblaze/mainScreen/FireblazeNumberButton.vue';

describe('FireblazeNumberButton Component', () => {
  let wrapper;

  const createComponent = (propsData) => {
    wrapper = shallowMount(FireblazeNumberButton, {
      propsData,
    });
  };

  afterEach(() => {
    if (wrapper) {
      wrapper.destroy();
    }
  });

  it('renders the number slot correctly', () => {
    createComponent({ active: false, showStatistics: false });
    expect(wrapper.find('.fireblaze-number-button__number').exists()).to.be.true;
  });

  it('applies active class when active prop is true', () => {
    createComponent({ active: true, showStatistics: false });
    expect(wrapper.find('button').classes()).to.include('fireblaze-number-button--active');
  });

  it('does not apply active class when active prop is false', () => {
    createComponent({ active: false, showStatistics: false });
    expect(wrapper.find('button').classes()).to.not.include('fireblaze-number-button--active');
  });

  it('renders statistics slot when showStatistics prop is true', () => {
    createComponent({ active: false, showStatistics: true });
    expect(wrapper.find('.fireblaze-number-button__stat').exists()).to.be.true;
  });

  it('does not render statistics slot when showStatistics prop is false', () => {
    createComponent({ active: false, showStatistics: false });
    expect(wrapper.find('.fireblaze-number-button__stat').exists()).to.be.false;
  });
});
