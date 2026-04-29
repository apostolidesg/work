import { shallowMount } from '@vue/test-utils';
import EurojackpotSystems from '../../../../src/components/lobby/games/eurojackpot/settings/EurojackpotSystems.vue';
import sinon from 'sinon';

describe('In EurojackpotSystems component', () => {
  let stubs;
  let propsData;
  let mocks;
  let tStub;

  beforeEach(() => {
    stubs = {
      EurojackpotSystemButton: {
        name: 'EurojackpotSystemButton',
        template: '<div class="eurojackpot-system-button-stub"><slot></slot></div>',
        props: ['active'],
        emits: ['click'],
      },
    };

    propsData = {
      activeSystemId: null,
    };

    tStub = sinon.stub();

    mocks = {
      $t: tStub,
    };
  });

  afterEach(() => {
    tStub.resetHistory();
  });

  it('renders the component with the default data', () => {
    const wrapper = shallowMount(EurojackpotSystems, { stubs, propsData, mocks });

    const buttons = wrapper.findAllComponents({ name: stubs.EurojackpotSystemButton.name });
    buttons.wrappers.forEach(button => {
      expect(button.props().active).to.be.false;
    });
    expect(buttons.length).to.equal(10);
    expect(wrapper.exists()).to.be.true;
    expect(tStub.calledWith('eurojackpot.systems')).to.be.true;
    expect(tStub.calledWith('eurojackpot.systemsInfo')).to.be.true;
  });

  it("should render the System Buttons in active state if the activeSystemId matches the button's systemId", () => {
    propsData.activeSystemId = '12';
    const wrapper = shallowMount(EurojackpotSystems, { stubs, propsData, mocks });
    const systemButtons = wrapper.findAllComponents({ name: stubs.EurojackpotSystemButton.name });

    systemButtons.wrappers.forEach((button, index) => {
      if (index === 0) {
        expect(button.props().active).to.be.true;
      } else {
        expect(button.props().active).to.be.false;
      }
    });
  });
  it('should render the System Buttons in deactivate state because the active prop is null', () => {
    const wrapper = shallowMount(EurojackpotSystems, { stubs, propsData, mocks });
    const systemButtons = wrapper.findAllComponents({ name: stubs.EurojackpotSystemButton.name });
    systemButtons.wrappers.forEach(button => {
      expect(button.props().active).to.be.false;
    });
  });
  it('should emit the "system-click" event when a system button is clicked', () => {
    const wrapper = shallowMount(EurojackpotSystems, { stubs, propsData, mocks });
    const systemButton = wrapper.findAllComponents({ name: stubs.EurojackpotSystemButton.name }).at(0);
    systemButton.vm.$emit('click');

    expect(wrapper.emitted()['system-click']).to.have.length(1);
    expect(wrapper.emitted()['system-click'][0]).to.eql(['12']);
  });
});
