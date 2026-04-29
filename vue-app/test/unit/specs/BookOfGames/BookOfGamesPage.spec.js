import { shallowMount } from '@vue/test-utils';
import BookOfGamesPage from '../../../../src/components/lobby/bookOfGames/BookOfGamesPage.vue';
import sinon from 'sinon';

describe('BookOfGamesPage Component', () => {
  let stubs;
  let mocks;

  const tStub = sinon.stub();

  beforeEach(() => {
    mocks = {
      $t: tStub,
    };
    stubs = {
      BookOfGamesItem: {
        name: 'BookOfGamesItem',
        props: ['url'],
        template: `
          <div class="book-of-games-items">
            <slot></slot>
          </div>
        `,
      },
    };
  });

  afterEach(() => {
    tStub.resetBehavior();
  });

  it('renders the BookOfGamesItem component with the correct title', () => {
    tStub.withArgs('bookOfGames.title').returns('Dummy Title');

    const wrapper = shallowMount(BookOfGamesPage, { mocks, stubs });
    expect(wrapper.exists()).to.be.true;
    expect(wrapper.text()).to.include('Dummy Title');
  });
  it("renders the BookOfGamesItem component with correct URL's ", () => {
    const dummyData = {
      bookOfGamesImages: [{ url: 'dummy-url-1' }, { url: 'dummy-url-2' }],
    };
    const wrapper = shallowMount(BookOfGamesPage, {
      mocks,
      stubs,
      created() {
        this.bookOfGamesImages = dummyData.bookOfGamesImages;
      },
    });
    const bookOfGamesItems = wrapper.findAllComponents({ name: 'BookOfGamesItem' });

    expect(bookOfGamesItems.at(0).props('url')).to.eq('dummy-url-1');
    expect(bookOfGamesItems.at(1).props('url')).to.eq('dummy-url-2');
  });

  it('renders the BookOfGamesItem component with the correct conditions', () => {
    const wrapper = shallowMount(BookOfGamesPage, { mocks, stubs });

    const bookOfGamesItems = wrapper.findAllComponents({ name: stubs.BookOfGamesItem.name });

    expect(bookOfGamesItems.length).to.eq(2);

    const firstItem = bookOfGamesItems.at(0);
    expect(firstItem.find('img').exists()).to.be.true;

    const secondItem = bookOfGamesItems.at(1);
    expect(secondItem.find('img').exists()).to.be.true;
  });
});
