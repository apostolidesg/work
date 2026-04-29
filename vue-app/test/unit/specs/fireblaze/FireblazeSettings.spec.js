import { shallowMount } from '@vue/test-utils';
import FireblazeSettings from '../../../../src/components/lobby/games/fireblaze/settings/FireblazeSettings.vue';
import sinon from 'sinon';
import FireblazeAdvertisementBackground from "../../../../src/assets/fireblaze/advertisement-background.svg";
import FireblazeAdvertisementAmount from "../../../../src/assets/fireblaze/advertisement-amount.svg";

describe('In FireblazeSettings component', () => {
  let stubs;
  let propsData;
  let mocks;
  let tStub;

  beforeEach(() => {
    stubs = {
      FireblazeAdvertisementBackground: {
        name: 'FireblazeAdvertisementBackground',
        template: '<div class="fireblaze-settings-backround-icon-stub"></div>',
      },
      FireblazeAdvertisementLogo: {
        name: 'FireblazeAdvertisementLogo',
        template: '<div class="fireblaze-settings-logo-icon-stub"></div>',
      },
      FireblazeAdvertisementAmount: {
        name: 'FireblazeAdvertisementAmount',
        template: '<div class="fireblaze-settings-add-icon-stub"></div>',
      }
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
    const wrapper = shallowMount(FireblazeSettings, { stubs, propsData, mocks });
    const FireblazeAdvertisementBackgroundIcon = wrapper.findComponent({ name: stubs.FireblazeAdvertisementBackground.name });

    expect(wrapper.exists()).to.be.true;
    expect(FireblazeAdvertisementBackgroundIcon.exists()).to.be.true;
    expect(tStub.calledWith('fireblaze.advertisementText')).to.be.true;
  });

  it('should emit the "quickPickClick" event when a quickPick button is clicked', () => {
    const wrapper = shallowMount(FireblazeSettings, { stubs, propsData, mocks });
    const FireblazeAdvertisementLogoIcon = wrapper.findComponent({ name: stubs.FireblazeAdvertisementLogo.name });
  });

  it('should emit the "quickPickClick" event when a quickPick button is clicked', () => {
    const wrapper = shallowMount(FireblazeSettings, { stubs, propsData, mocks });
    const FireblazeAdvertisementAmountIcon = wrapper.findComponent({ name: stubs.FireblazeAdvertisementAmount.name });
  });
});
