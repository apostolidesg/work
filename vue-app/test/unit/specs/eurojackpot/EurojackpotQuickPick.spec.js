import { shallowMount } from '@vue/test-utils';
import EurojackpotQuickPick from '../../../../src/components/lobby/games/eurojackpot/settings/EurojackpotQuickPick.vue';
import sinon from 'sinon';

describe('In EurojackpotQuickPick component', () => {
  let stubs;
  let propsData;
  let mocks;
  let tStub;

  beforeEach(() => {
    stubs = {
      EurojackpotQuickPickIcon: {
        name: 'EurojackpotQuickPickIcon',
        template: '<div class="eurojackpot-quickpick-icon-stub"></div>',
      },
    };

    tStub = sinon.stub();

    mocks = {
      $t: tStub,
    };
  });

  afterEach(() => {
    tStub.resetHistory();
  });

  it('renders the component with appropriate locales and icon', () => {
    const wrapper = shallowMount(EurojackpotQuickPick, { stubs, propsData, mocks });
    const quickPickIcon = wrapper.findComponent({ name: stubs.EurojackpotQuickPickIcon.name });

    expect(wrapper.exists()).to.be.true;
    expect(quickPickIcon.exists()).to.be.true;
    expect(tStub.calledWith('eurojackpot.quickPickInfo')).to.be.true;
    expect(tStub.calledWith('eurojackpot.quickPickInfoButtonInfo')).to.be.true;
  });

  it('should emit the "quickPickClick" event when a quickPick button is clicked', () => {
    const wrapper = shallowMount(EurojackpotQuickPick, { stubs, propsData, mocks });
    wrapper.find('.eurojackpot-quickpick__button').trigger('click');

    expect(wrapper.emitted()['quick-pick-click']).to.have.length(1);
  });
});
