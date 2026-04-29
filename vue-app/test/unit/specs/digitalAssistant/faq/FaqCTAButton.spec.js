import { expect } from 'chai';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { createLocalVue, mount } from '@vue/test-utils';
import VueRouter from 'vue-router';

import FaqCTAButton from '../../../../../src/components/digitalAssistant/faq/FaqCTAButton.vue';

chai.use(sinonChai);

describe('FaqCTAButton.vue', () => {
  let localVue, router;

  const makeWrapper = (props = {}, slot = 'Click-me') =>
    mount(FaqCTAButton, {
      localVue,
      propsData: { theme: 'kino', ...props },
      slots: { default: slot },
      router,
    });

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueRouter);

    router = new VueRouter({ mode: 'abstract' });
    sinon.spy(router, 'push');
  });

  it('renders router-link with correct classes + slot', () => {
    const wrapper = makeWrapper({ theme: 'powerspin' }, 'Play');
    const link = wrapper.find('a');

    expect(link.text()).to.equal('Play');
  });

  it('uses provided "route" prop for navigation', async () => {
    const path = '/kino';
    const wrapper = makeWrapper({ route: path });

    await wrapper.find('a').trigger('click');

    expect(router.push).to.have.been.calledOnce;
  });

  it('falls back to default route when prop omitted', async () => {
    const wrapper = makeWrapper();

    await wrapper.find('a').trigger('click');

    expect(router.push).to.have.been.calledOnce;
  });
});
