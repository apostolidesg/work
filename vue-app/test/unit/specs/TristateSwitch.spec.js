import TristateSwitch from '../../../src/components/common/TristateSwitch.vue';
import { shallowMount } from '@vue/test-utils';

describe('TristateSwitch', () => {
  let propsData;

  beforeEach(() => {
    propsData = {
      value: false,
      options: [false, null, true],
    };
  });

  it('should render the component', () => {
    const wrapper = shallowMount(TristateSwitch, { propsData });
    expect(wrapper.exists()).to.true;
  });

  it('should render the rail with the correct class', () => {
    const wrapper = shallowMount(TristateSwitch, { propsData });
    expect(wrapper.find('.tristate-switch__rail').exists()).to.true;
  });

  it('should add the left class to the rail when the value is the first option', () => {
    const wrapper = shallowMount(TristateSwitch, { propsData });
    expect(wrapper.find('.tristate-switch__rail').classes()).to.include('tristate-switch__rail--left');
  });

  it('should add the middle class to the rail when the value is the second option', () => {
    propsData.value = null;
    const wrapper = shallowMount(TristateSwitch, { propsData });
    expect(wrapper.find('.tristate-switch__rail').classes()).to.include('tristate-switch__rail--middle');
  });

  it('should add the right class to the rail when the value is the third option', () => {
    propsData.value = true;
    const wrapper = shallowMount(TristateSwitch, { propsData });
    expect(wrapper.find('.tristate-switch__rail').classes()).to.include('tristate-switch__rail--right');
  });

  describe('when the component has labels', () => {
    beforeEach(() => {
      propsData = { ...propsData, leftLabel: 'left', rightLabel: 'right' };
    });

    it('should render the two labels if an option exists', () => {
      const wrapper = shallowMount(TristateSwitch, { propsData });
      expect(wrapper.findAll('.tristate-switch__label').length).to.equal(2);
    });

    it('should render the left label with the correct text', () => {
      const wrapper = shallowMount(TristateSwitch, { propsData });
      expect(
        wrapper
          .findAll('.tristate-switch__label')
          .at(0)
          .text()
      ).to.equal('left');
    });

    it('should render the right label with the correct text', () => {
      const wrapper = shallowMount(TristateSwitch, { propsData });
      expect(
        wrapper
          .findAll('.tristate-switch__label')
          .at(1)
          .text()
      ).to.equal('right');
    });

    it('should render the left label with the active class when first value is selected', () => {
      const wrapper = shallowMount(TristateSwitch, { propsData });
      expect(
        wrapper
          .findAll('.tristate-switch__label')
          .at(0)
          .classes()
      ).to.include('tristate-switch__label--active');
      expect(wrapper.findAll('.tristate-switch__label--active').length).to.equal(1);
    });

    it('should render the right label with the active class when third value is selected', () => {
      propsData.value = true;
      const wrapper = shallowMount(TristateSwitch, { propsData });
      expect(
        wrapper
          .findAll('.tristate-switch__label')
          .at(1)
          .classes()
      ).to.include('tristate-switch__label--active');
      expect(wrapper.findAll('.tristate-switch__label--active').length).to.equal(1);
    });

    it('should emit an input event with the first option when the left label is clicked', () => {
      const wrapper = shallowMount(TristateSwitch, { propsData });
      wrapper
        .findAll('.tristate-switch__label')
        .at(0)
        .trigger('click');
      expect(wrapper.emitted().input[0]).to.eql([false]);
    });

    it('should emit an input event with the third option when the right label is clicked', () => {
      const wrapper = shallowMount(TristateSwitch, { propsData });
      wrapper
        .findAll('.tristate-switch__label')
        .at(1)
        .trigger('click');
      expect(wrapper.emitted().input[0]).to.eql([true]);
    });
  });
});
