import {shallowMount} from '@vue/test-utils'
import Banner from '../../../src/components/lobby/banner/banner.vue'


describe('Banner.vue', () => {

  const wrapper = shallowMount(Banner);

  it('Should render Banner contents', () => {
    const img = wrapper.find('img');
    expect(img.name).to.be.a('function')
  })
});
