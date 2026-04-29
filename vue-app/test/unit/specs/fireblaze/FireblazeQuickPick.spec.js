import sinon from 'sinon';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import FireblazeQuickPick from '../../../../src/components/lobby/games/fireblaze/settings/FireblazeQuickPick.vue';

describe('FireblazeQuickPick', () => {
  Vue.prototype.$eventHub = new Vue();
  let localVue;
  let sandbox;
  let stubs;
  let mocks;
  let $tStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    localVue = createLocalVue();
    $tStub = sandbox.stub();

    stubs = {
      FireblazeQuickPickIcon: {
        name: 'FireblazeQuickPickIcon',
        template: '<svg></svg>',
      },
    };

    mocks = {
      $t: $tStub,
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should render the component', () => {
    const wrapper = shallowMount(FireblazeQuickPick, { localVue, stubs, mocks });
    expect(wrapper.exists()).to.be.true;
  });

  it('should emit quick-pick-click event when button is clicked', async () => {
    const wrapper = shallowMount(FireblazeQuickPick, { localVue, stubs, mocks });
    wrapper.find('button').trigger('click');
    expect(wrapper.emitted('quick-pick-click')).to.be.ok;
  });
});
