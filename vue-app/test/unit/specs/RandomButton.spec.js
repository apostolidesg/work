import { shallowMount } from '@vue/test-utils'
import RandomButton from '../../../src/components/common/RandomButton.vue'
import sinon from 'sinon'

describe('RandomButton', () => {
  let propsData
  let mocks

  beforeEach(() => {
    propsData = {
      theme: 'blue'
    }
    mocks = {
      $t: sinon.stub().callsFake(() => {
        return 'Test'
      })
    }
  })
  it('should render title', () => {
    const wrapper = shallowMount(RandomButton, { mocks, propsData })
    expect(wrapper.text()).to.be.equal('Test')
  })
  it('should render correct theme class', () => {
    propsData.showBettingAmount = false
    const wrapper = shallowMount(RandomButton, { mocks, propsData })
    expect(wrapper.find('.random-button--blue').exists()).to.be.true
  })
})
