import { shallowMount } from '@vue/test-utils';
import LiveDrawScreen from '../../../src/components/common/LiveDraw/LiveDrawScreen.vue';

describe('LiveDrawScreen.vue', () => {
  let propsData;
  beforeEach(() => {
    propsData = {
      iframeTypesToRender: ['powerspin', 'multispin'],
    };
  });
  it('should render the component', () => {
    const wrapper = shallowMount(LiveDrawScreen, { propsData });
    expect(wrapper.find('.live-draw-screen').exists()).to.be.true;
  });
  it('should render the iframe', () => {
    const wrapper = shallowMount(LiveDrawScreen, { propsData });
    expect(wrapper.findAll('.live-draw-screen__iframe').length).to.be.eq(2);
  });
});
