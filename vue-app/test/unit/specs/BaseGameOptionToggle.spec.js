import { shallowMount } from '@vue/test-utils';
import BaseGameOptionToggle from '../../../src/components/common/BaseGameOptionToggle.vue';

describe('BaseGameOptionToggle.vue', () => {
  let wrapper;
  let propsData;

  beforeEach(() => {
    propsData = {
      inputId: 'test',
      disabled: false,
      color: '#fff',
      value: true,
    };
  });

  it('should render a checkbox', () => {
    wrapper = shallowMount(BaseGameOptionToggle, { propsData });
    expect(wrapper.find('input[type="checkbox"]').exists()).to.be.true;
  });

  it('should emit an input event when the checkbox is clicked', async () => {
    wrapper = shallowMount(BaseGameOptionToggle, { propsData });
    const input = wrapper.find('input[type="checkbox"]');
    input.element.checked = false;
    await input.trigger('change');
    expect(wrapper.emitted().input).to.deep.equal([[false]]);
  });

  it('should set the input to disabled', () => {
    propsData.disabled = true;
    wrapper = shallowMount(BaseGameOptionToggle, { propsData });
    expect(wrapper.find('input[type="checkbox"]').attributes().disabled).to.equal('disabled');
  });

  it('should set the background color', () => {
    wrapper = shallowMount(BaseGameOptionToggle, { propsData });
    expect(wrapper.find('.game-option-toggle').element.style.backgroundColor).to.equal('rgb(255, 255, 255)');
  });

  it('should change the opacity when is disabled', () => {
    propsData.disabled = true;
    wrapper = shallowMount(BaseGameOptionToggle, { propsData });
    expect(wrapper.find('.game-option-toggle').element.style.opacity).to.equal('0.7');
  });

  it('should render the icon slot', () => {
    wrapper = shallowMount(BaseGameOptionToggle, { propsData, slots: { icon: '<div class="icon"></div>' } });
    expect(wrapper.find('.icon').exists()).to.be.true;
  });

  it('should render the hint slot', () => {
    wrapper = shallowMount(BaseGameOptionToggle, { propsData, slots: { hint: '<div class="hint"></div>' } });
    expect(wrapper.find('.hint').exists()).to.be.true;
  });
});
