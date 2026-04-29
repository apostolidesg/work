import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import DrawInformation from '../../../src/components/lobby/lobbyHeader/drawInformation/DrawInformation.vue';
import appstore from '../../../src/store/store';

describe('DrawInformation.vue', () => {
  Vue.prototype.$store = appstore;
  let wrapper;

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders the correct markup upon creation', done => {
    wrapper = shallowMount(DrawInformation);
    done();
    expect(wrapper.html()).to.contain('ΚΛΗΡΩΣΗ 0');
    expect(wrapper.html()).to.contain('ΑΡΧΙΖΕΙ ΣΕ');
  });

  it('Changes the polling interval if max retries are reached', () => {
    // const wrapper = shallowMount(DrawInformation);
    // wrapper.vm.pollingCounter = Constants.DRAW_INFORMATION.POLLING_MAX_RETRIES + 1;
    // wrapper.vm.newDrawReceived = false;
    // wrapper.vm.getNextDraw();
  });
});
