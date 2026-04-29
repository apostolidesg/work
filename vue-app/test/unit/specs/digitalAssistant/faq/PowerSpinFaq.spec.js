import { expect } from 'chai';
import { createLocalVue, mount } from '@vue/test-utils';

import PowerSpinFaq from '../../../../../src/components/digitalAssistant/faq/powerspin/PowerSpinFaq.vue';

const FaqPageStub = {
  name: 'FaqPage',
  props: ['pageType', 'theme'],
  template: '<div class="faq-page-stub"></div>',
};

describe('PowerSpinFaq wrapper component', () => {
  const localVue = createLocalVue();

  it('renders FaqPage with pageType="powerspinFaq" and theme="powerspin"', () => {
    const wrapper = mount(PowerSpinFaq, {
      localVue,
      stubs: { FaqPage: FaqPageStub },
    });

    const faqPage = wrapper.findComponent(FaqPageStub);
    expect(faqPage.exists()).to.be.true;

    expect(faqPage.props('pageType')).to.equal('powerspinFaq');
    expect(faqPage.props('theme')).to.equal('powerspin');
  });
});
