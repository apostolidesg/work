import SidescreenLayout from '../../../src/components/common/layouts/SidescreenLayout';
import { shallowMount } from '@vue/test-utils';

describe('SidescreenLayout', () => {
  it('should render the correct contents on the header slot', () => {
    const wrapper = shallowMount(SidescreenLayout, {
      slots: {
        header: '<div class="test">Test</div>',
      },
    });

    const headerSlotWrapper = wrapper.find('.sidescreen-layout__header');

    expect(headerSlotWrapper.exists()).to.be.true;
    expect(headerSlotWrapper.text()).to.equal('Test');
  });

  it('should render a divider below the header if the header slot is present', () => {
    const wrapper = shallowMount(SidescreenLayout, {
      slots: {
        header: '<div class="test">Test</div>',
      },
    });

    const dividerWrapper = wrapper.findAll('.sidescreen-layout__divider');

    expect(dividerWrapper.length).to.be.equal(2);
  });

  it('should render only the footer divider if the header slot is not present', () => {
    const wrapper = shallowMount(SidescreenLayout);

    const dividerWrapper = wrapper.findAll('.sidescreen-layout__divider');

    expect(dividerWrapper.length).to.be.equal(1);
  });

  it('should not render the header slot wrapper if the header slot is not present', () => {
    const wrapper = shallowMount(SidescreenLayout);

    const headerSlotWrapper = wrapper.find('.sidescreen-layout__header');

    expect(headerSlotWrapper.exists()).to.be.false;
  });

  it('should render the correct contents on the default slot', () => {
    const wrapper = shallowMount(SidescreenLayout, {
      slots: {
        default: '<div class="test">Test</div>',
      },
    });

    const defaultSlotWrapper = wrapper.find('.sidescreen-layout__content');

    expect(defaultSlotWrapper.exists()).to.be.true;
    expect(defaultSlotWrapper.text()).to.equal('Test');
  });

  it('should render the correct contents on the static slot', () => {
    const wrapper = shallowMount(SidescreenLayout, {
      slots: {
        static: '<div class="test">Test</div>',
      },
    });

    const staticSlotWrapper = wrapper.find('.sidescreen-layout__static');

    expect(staticSlotWrapper.exists()).to.be.true;
    expect(staticSlotWrapper.text()).to.equal('Test');
  });

  it('should not render the static slot wrapper if the static slot is not present', () => {
    const wrapper = shallowMount(SidescreenLayout);

    const staticSlotWrapper = wrapper.find('.sidescreen-layout__static');

    expect(staticSlotWrapper.exists()).to.be.false;
  });

  it('should render the correct contents on the footer slot', () => {
    const wrapper = shallowMount(SidescreenLayout, {
      slots: {
        footer: '<div class="test">Test</div>',
      },
    });

    const footerSlotWrapper = wrapper.find('.sidescreen-layout__footer');

    expect(footerSlotWrapper.exists()).to.be.true;
    expect(footerSlotWrapper.text()).to.equal('Test');
  });
});
