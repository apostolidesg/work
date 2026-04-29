import { mount } from '@vue/test-utils';
import UnderOverSelection from '../../../src/components/lobby/games/Powerspin/MainScreen/UnderOverSelection.vue';

describe('UnderOverSelection component', () => {
  const mountComponent = propsData => {
    const wrapper = mount(UnderOverSelection, { propsData });

    const btns = wrapper.findAllComponents({ name: 'RoundedBorderedButton' });

    return {
      wrapper,
      overBtn: btns.at(0),
      underBtn: btns.at(1),
    };
  };

  it('should render two buttons', () => {
    const { underBtn, overBtn } = mountComponent({ selectedValues: [] });

    expect(underBtn.exists()).to.eq(true);
    expect(overBtn.exists()).to.eq(true);
  });

  it('should render two labels with the correct text', () => {
    const { wrapper } = mountComponent({ selectedValues: [] });

    const labels = wrapper.findAll('span');

    expect(labels.length).to.eq(2);
    expect(labels.at(0).text()).to.eql('OVER 12.5');
    expect(labels.at(1).text()).to.eql('UNDER 12.5');
  });

  it('should render two options with black text by default', () => {
    const { wrapper } = mountComponent({ selectedValues: [] });

    const labels = wrapper.findAll('.under-over__item--text-black');

    expect(labels.length).to.eq(2);
  });

  it('should render two options with white text if the textTheme prop is set to "white"', () => {
    const { wrapper } = mountComponent({ selectedValues: [], textTheme: 'white' });

    const labels = wrapper.findAll('.under-over__item--text-white');

    expect(labels.length).to.eq(2);
  });

  it('should render the under btn as active of the selectedValue contains under', () => {
    const { underBtn, overBtn } = mountComponent({ selectedValues: ['u'] });

    expect(underBtn.vm.$props.active).to.be.true;
    expect(overBtn.vm.$props.active).to.be.false;
  });

  it('should render the over btn as active of the selectedValue contains over', () => {
    const { underBtn, overBtn } = mountComponent({ selectedValues: ['o'] });

    expect(overBtn.vm.$props.active).to.be.true;
    expect(underBtn.vm.$props.active).to.be.false;
  });

  it('should render the both btns as inactive of the selectedValue is empty array', () => {
    const { underBtn, overBtn } = mountComponent({ selectedValues: [] });

    expect(overBtn.vm.$props.active).to.be.false;
    expect(underBtn.vm.$props.active).to.be.false;
  });

  it('should render the both btns as active of the selectedValue contains both under and over', () => {
    const { underBtn, overBtn } = mountComponent({ selectedValues: ['o', 'u'] });

    expect(overBtn.vm.$props.active).to.be.true;
    expect(underBtn.vm.$props.active).to.be.true;
  });

  it('should emit a option-selected event with "o" as payload when the user clicks over', async () => {
    const { wrapper, overBtn } = mountComponent({ value: true });

    await overBtn.find('button').trigger('click');

    expect(wrapper.emitted()['option-selected'][0]).to.eql(['o']);
  });

  it('should emit a option-selected event with "u" as payload when the user clicks under', async () => {
    const { wrapper, underBtn } = mountComponent({ value: true });

    await underBtn.find('button').trigger('click');

    expect(wrapper.emitted()['option-selected'][0]).to.eql(['u']);
  });

});
