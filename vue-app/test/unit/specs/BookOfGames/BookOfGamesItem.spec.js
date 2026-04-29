import { shallowMount } from '@vue/test-utils';
import BookOfGamesItem from '../../../../src/components/lobby/bookOfGames/BookOfGamesItem.vue';
import sinon from 'sinon';

describe('BookOfGamesItem Component', () => {
  let propsData;
  let stubs;

  const tStub = sinon.stub();

  beforeEach(() => {
    propsData = {
      url: 'https://example.com',
    };

    stubs = {
      BookOfGamesBarcode: {
        name: 'BookOfGamesBarcode',
        props: ['url'],
        template: '<div class="book-of-games-barcode"></div>',
      },
    };
  });

  afterEach(() => {
    tStub.resetBehavior();
  });

  it('renders the BookOfGamesBarcode component with the provided URL', () => {
    const wrapper = shallowMount(BookOfGamesItem, { propsData, stubs });

    const barcodeComponent = wrapper.findComponent({ name: 'BookOfGamesBarcode' });
    expect(barcodeComponent.exists()).to.be.true;
    expect(barcodeComponent.props('url')).to.eq('https://example.com');
  });

  it('Default slot of the component should be exists and contains a text', () => {
    const wrapper = shallowMount(BookOfGamesItem, { propsData, stubs, slots: { default: '<div>Content</div>' } });

    const contentWrapper = wrapper.find('.book-of-games-item');
    expect(contentWrapper.html()).to.contain('Content');
  });
});
