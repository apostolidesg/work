import FireblazeSystemButton from '../../../../src/components/lobby/games/fireblaze/settings/FireblazeOptionButton.vue';
import { shallowMount } from '@vue/test-utils';

describe('FireblazeSystemButton', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(FireblazeSystemButton);
  });

  it('should render correctly', () => {
    expect(wrapper.exists()).to.be.true;
  });

  it('should apply active class when active prop is true', async () => {
    await wrapper.setProps({ active: true });
    expect(wrapper.classes()).to.include('fireblaze-option-button--active');
  });

  it('should apply disabled class and attribute when disabled prop is true', async () => {
    await wrapper.setProps({ disabled: true });
    expect(wrapper.classes()).to.include('fireblaze-option-button--disabled');
    expect(wrapper.attributes('disabled')).to.equal('disabled');
  });

  it('should emit click event when clicked', async () => {
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).to.be.an('array').that.has.lengthOf(1);
  });

  it('should not emit click event when disabled', async () => {
    await wrapper.setProps({ disabled: true });
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).to.be.undefined;
  });
});
