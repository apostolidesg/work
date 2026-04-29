import { shallowMount } from '@vue/test-utils'
import RoundedBorderedButton from '../../../src/components/common/RoundedBorderedButton.vue'
import sinon from 'sinon'

describe('RoundedBorderedButton', () => {
  let propsData
  let mocks

  beforeEach(() => {
    propsData = {
      view: 'circle',
      theme: 'blue',
      value: 12,
      active: false,
      title: 'Test',
      textTheme: 'white'
    }
    mocks = {
      $t: sinon.stub().callsFake(() => {
        return 'Test'
      })
    }
  })
  it('should render title', () => {
    const wrapper = shallowMount(RoundedBorderedButton, { mocks, propsData })
    expect(wrapper.find('.rounded-bordered-button__title').text()).to.be.equal('Test')
  })
  it('should render correct text theme', () => {
    const wrapper = shallowMount(RoundedBorderedButton, { mocks, propsData })
    expect(wrapper.find('.rounded-bordered-button--text-white').exists()).to.be.true
  })
  it('should render correct button theme', () => {
    const wrapper = shallowMount(RoundedBorderedButton, { mocks, propsData })
    expect(wrapper.find('.rounded-bordered-button--blue').exists()).to.be.true
  })
  it('should render correct button theme when active', () => {
    propsData.active = true
    const wrapper = shallowMount(RoundedBorderedButton, { mocks, propsData })
    expect(wrapper.find('.rounded-bordered-button--blue-active').exists()).to.be.true
  })
})
