import { shallowMount, mount } from '@vue/test-utils';
import PowerspinSymbol from '../../../src/components/common/PowerspinSymbol.vue';

describe('Powerspin symbol', () => {
  const BORDER_CLASS = 'powerspin-symbol--active';
  const BTN_CLASS = '.powerspin-symbol';

  it('should render without border when value is false', () => {
    const wrapper = shallowMount(PowerspinSymbol, { propsData: { value: false } });

    expect(wrapper.classes()).not.to.contain(BORDER_CLASS);
  });

  it('should render with border when value is true', () => {
    const wrapper = shallowMount(PowerspinSymbol, { propsData: { value: true } });

    expect(wrapper.classes()).to.contain(BORDER_CLASS);
  });

  it("should emit an 'input' event when clicked", async () => {
    const wrapper = shallowMount(PowerspinSymbol, { propsData: { value: false } });

    await wrapper.find(BTN_CLASS).trigger('click');

    expect(wrapper.emitted().input.length).to.eql(1);
    expect(wrapper.emitted().input[0]).to.eql([true]);
  });

  it('should toggle the value of the parent when used with v-model syntax', () => {
    const component = {
      template: `<PowerspinSymbol v-model="selected"/>`,
      components: { PowerspinSymbol },
      data() {
        return { selected: false };
      },
    };

    const wrapper = mount(component);

    expect(wrapper.vm.$data.selected).to.eq(false);

    wrapper.find(BTN_CLASS).trigger('click');

    expect(wrapper.vm.$data.selected).to.eq(true);
  });
});
