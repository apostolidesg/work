import { shallowMount } from '@vue/test-utils';
import BookOfGamesButton from '../../../../src/components/lobby/bookOfGames/BookOfGamesButton.vue';
import sinon from 'sinon';

describe('In BookOfGamesButton component', () => {
  let mocks;
  let tStub;

  beforeEach(() => {
    tStub = sinon.stub();

    mocks = {
      $t: tStub,
    };
  });

  afterEach(() => {
    tStub.resetHistory();
  });

  it('renders the component with appropriate locale', () => {
    const wrapper = shallowMount(BookOfGamesButton, { mocks });

    expect(wrapper.exists()).to.be.true;
    expect(tStub.calledWith('bookOfGames.title')).to.be.true;
  });

  it('should emit the "click" event when button is clicked', () => {
    const wrapper = shallowMount(BookOfGamesButton, { mocks });

    wrapper.find('.book-of-game-button').trigger('click');

    expect(wrapper.emitted().click).to.have.length(1);
  });
});
