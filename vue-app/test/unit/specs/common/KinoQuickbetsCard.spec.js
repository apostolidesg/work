import { shallowMount } from '@vue/test-utils';
import KinoQuickbetsCards from '@/components/common/Quickbets/KinoQuickbetsCard.vue';
import sinon from 'sinon';

describe('KinoQuickbetsCards.vue', () => {
  let mocks;
  let card;

  beforeEach(() => {
    mocks = {
      $t: sinon.stub().callsFake((key) => key),
    };

    card = {
      pickedNumbers: [3, 7, 12],
      kinoBonusActive: true,
      value: 2.5,
    };
  });

  it('renders the correct column title with index', () => {
    const wrapper = shallowMount(KinoQuickbetsCards, {
      propsData: { index: 0, card },
      mocks,
    });
    expect(wrapper.find('.kino-quickbets-cards__card-title').text()).to.include('column 1');
  });

  it('renders the picked numbers', () => {
    const wrapper = shallowMount(KinoQuickbetsCards, {
      propsData: { index: 0, card },
      mocks,
    });
    const numbers = wrapper.findAll('.kino-quickbets-cards__card-price-number');
    expect(numbers.length).to.equal(3);
    expect(numbers.at(0).text()).to.equal('3');
    expect(numbers.at(1).text()).to.equal('7');
    expect(numbers.at(2).text()).to.equal('12');
  });

  it('shows bonus image when kinoBonusActive is true', () => {
    const wrapper = shallowMount(KinoQuickbetsCards, {
      propsData: { index: 0, card },
      mocks,
    });
    const bonus = wrapper.find('.quickbets-cards__card-bonus');
    expect(bonus.exists()).to.be.true;
    expect(bonus.find('img').exists()).to.be.true;
  });

  it('does not show bonus image when kinoBonusActive is false', () => {
    card.kinoBonusActive = false;
    const wrapper = shallowMount(KinoQuickbetsCards, {
      propsData: { index: 0, card },
      mocks,
    });
    const bonus = wrapper.find('.quickbets-cards__card-bonus');
    expect(bonus.exists()).to.be.false;
  });

  it('formats card value to 2 decimal places if needed', () => {
    card.value = 3.5;
    const wrapper = shallowMount(KinoQuickbetsCards, {
      propsData: { index: 0, card },
      mocks,
    });
    const btn = wrapper.find('.kino-quickbets-cards-button');
    expect(btn.text()).to.include('€3.50');
  });

  it('shows value without formatting if not needed', () => {
    card.value = 4;
    const wrapper = shallowMount(KinoQuickbetsCards, {
      propsData: { index: 0, card },
      mocks,
    });
    const btn = wrapper.find('.kino-quickbets-cards-button');
    expect(btn.text()).to.include('€4');
  });

  it('applies the small class when more than 9 numbers and bonus is active', () => {
    card.pickedNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    card.kinoBonusActive = true;

    const wrapper = shallowMount(KinoQuickbetsCards, {
      propsData: { index: 0, card },
      mocks,
    });

    const numberEls = wrapper.findAll('.kino-quickbets-cards__card-price-number');
    numberEls.wrappers.forEach((el) => {
      expect(el.classes()).to.include('kino-quickbets-cards__card-price-number--small');
    });
  });

  it('does not apply the small class when less than or equal to 9 numbers or bonus is not active', () => {
    card.pickedNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    card.kinoBonusActive = true;

    let wrapper = shallowMount(KinoQuickbetsCards, {
      propsData: { index: 0, card },
      mocks,
    });

    let numberEls = wrapper.findAll('.kino-quickbets-cards__card-price-number');
    numberEls.wrappers.forEach((el) => {
      expect(el.classes()).to.not.include('kino-quickbets-cards__card-price-number--small');
    });

    card.pickedNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    card.kinoBonusActive = false;

    wrapper = shallowMount(KinoQuickbetsCards, {
      propsData: { index: 0, card },
      mocks,
    });

    numberEls = wrapper.findAll('.kino-quickbets-cards__card-price-number');
    numberEls.wrappers.forEach((el) => {
      expect(el.classes()).to.not.include('kino-quickbets-cards__card-price-number--small');
    });
  });
});
