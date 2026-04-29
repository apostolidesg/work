import { shallowMount } from '@vue/test-utils';
import BaseButton from '../../../src/components/common/BaseButton';
import sinon from 'sinon';

describe('In the BaseButton Component', () => {
  let propsData;
  beforeEach(() => {
    propsData = {
      theme: 'no-theme',
    };
  });
  describe('when component is mounted', () => {
    it(' should render a button element with dynamic class dependent on theme prop', () => {
      const wrapper = shallowMount(BaseButton, { propsData });
      expect(wrapper.find('.opap-base-button.opap-base-button--no-theme').exists()).to.be.true;
    });
    it('should display any provided slot content', () => {
      const slots = {
        default: { template: '<div>test_content</div>' },
      };
      const wrapper = shallowMount(BaseButton, { propsData, slots });
      expect(wrapper.text()).to.contain('test_content');
    });
  });
  describe('when BaseButton clicked', () => {
    it(' should call clicked listeners', async () => {
      const mockClickHandler = sinon.stub().callsFake();
      const listeners = {
        click: mockClickHandler,
      };
      const wrapper = shallowMount(BaseButton, { propsData, listeners });
      const elem = wrapper.find('button');
      await elem.trigger('click');
      expect(mockClickHandler.called).to.be.true;
    });
  });
});
