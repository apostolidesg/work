import { expect } from 'chai';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { createLocalVue, mount } from '@vue/test-utils';
import VueRouter from 'vue-router';

import ContentBox from '../../../../../src/components/digitalAssistant/faq/ContentBox.vue';

chai.use(sinonChai);

describe('ContentBox.vue', () => {
  let localVue, router;

  const baseProps = {
    title: 'Short title',
    boxType: 'kinoFaq',
    theme: 'kino',
    route: '/1',
  };

  const makeWrapper = (extra = {}) =>
    mount(ContentBox, {
      localVue,
      propsData: { ...baseProps, ...extra },
      router,
    });

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueRouter);

    router = new VueRouter({ mode: 'abstract' });
    sinon.spy(router, 'push');
  });

  it('navigateToRoute() pushes /<boxType><route> when clicked', async () => {
    const wrapper = makeWrapper();

    await wrapper.trigger('click');

    expect(router.push).to.have.been.calledOnce;
  });

  it('does nothing when "route" prop is empty', async () => {
    const wrapper = makeWrapper({ route: '' });

    await wrapper.trigger('click');

    expect(router.push).to.not.have.been.called;
  });
});
