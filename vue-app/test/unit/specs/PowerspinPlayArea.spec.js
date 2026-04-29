import { shallowMount } from '@vue/test-utils';
import PlayArea from '../../../src/components/lobby/games/Powerspin/MainScreen/PlayArea.vue';

describe('PowerSpin Play Area', () => {
  let stubs;

  beforeEach(() => {
    stubs = {
      PlayPowerspinHeader: {
        name: 'PlayPowerspinHeader',
        template: '<div class="header-stub"></div>',
      },
      PlayWheels: {
        name: 'PlayWheels',
        template: '<div class="playwheels-stub"></div>',
      },
    };
  });
  it('should render the PlayPowerspinHeader component', () => {
    const wrapper = shallowMount(PlayArea, { stubs });
    expect(wrapper.findComponent({ name: stubs.PlayPowerspinHeader.name }).exists()).to.be.true;
  });
  it('should render the PlayWheels component', () => {
    const wrapper = shallowMount(PlayArea, { stubs });
    expect(wrapper.findComponent({ name: stubs.PlayWheels.name }).exists()).to.be.true;
  });
});
