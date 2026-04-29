import { shallowMount } from '@vue/test-utils';
import PayTable from '../../../src/components/lobby/games/kino/settings/PayTable.vue';

describe('PayTable component', () => {
  describe('when close to win is not available', () => {
    let propsData;

    beforeEach(() => {
      propsData = {
        close2WinAvailable: false,
        gameType: 5,
      };
    });

    it('renders the component', () => {
      const wrapper = shallowMount(PayTable, { propsData });
      expect(wrapper.exists()).to.be.true;
    });

    it('should render 13 pay table rows', () => {
      const wrapper = shallowMount(PayTable, { propsData });
      expect(wrapper.find('tbody').findAll('tr')).to.have.lengthOf(13);
    });

    it('should render the selected game with the correct class', () => {
      const wrapper = shallowMount(PayTable, { propsData });
      const selectedRows = wrapper.findAll('.selected');

      expect(selectedRows).to.have.lengthOf(1);
      expect(selectedRows.at(0).attributes().id).to.equal('winnings_row_5');
    });

    it('should render the game rows in reverse order', () => {
      const wrapper = shallowMount(PayTable, { propsData });
      const rows = wrapper.find('tbody').findAll('tr');

      rows.wrappers.forEach((row, index) => {
        expect(row.find(`.row-id`).text()).to.equal(`${12 - index}`);
      });
    });

    it('should render the kino game expected winnings', () => {
      const wrapper = shallowMount(PayTable, { propsData });
      const kinoWinnings = wrapper.findAll('.row-kino');

      expect(kinoWinnings).to.have.lengthOf(13);
    });

    it('should render the kino bonus game expected winnings', () => {
      const wrapper = shallowMount(PayTable, { propsData });
      const kinoWinnings = wrapper.findAll('.row-kinobonus');

      expect(kinoWinnings).to.have.lengthOf(13);
    });

    it('should render an "-" for a row that has no winnings for the selected game', () => {
      const wrapper = shallowMount(PayTable, { propsData });
      const row = wrapper
        .find('tbody')
        .findAll('tr')
        .at(5);

      expect(row.find('.row-kino').text()).to.equal('-');
      expect(row.find('.row-kinobonus').text()).to.equal('-');
    });

    it('should render the kino game expected winnings for a game', () => {
      const wrapper = shallowMount(PayTable, { propsData });
      const row = wrapper
        .find('tbody')
        .findAll('tr')
        .at(7);

      expect(row.find('.row-kino').text()).to.equal('225,00€');
      expect(row.find('.row-kinobonus').text()).to.equal('675,00€');
    });

    it('should multiply the expected winnings with the multiplier', () => {
      propsData.multiplier = 2;
      const wrapper = shallowMount(PayTable, { propsData });
      const row = wrapper
        .find('tbody')
        .findAll('tr')
        .at(7);

      expect(row.find('.row-kino').text()).to.equal('450,00€');
      expect(row.find('.row-kinobonus').text()).to.equal('1.350,00€');
    });
  });

  describe('when close to win is available', () => {
    let propsData;

    beforeEach(() => {
      propsData = {
        close2WinAvailable: true,
        gameType: 5,
      };
    });

    it('should render 14 pay table rows if the selected game is in the c2w range', () => {
      const wrapper = shallowMount(PayTable, { propsData });
      expect(wrapper.find('tbody').findAll('tr')).to.have.lengthOf(14);
    });

    it('should render 13 pay table rows if the selected game is not in the c2w range', () => {
      propsData.gameType = 10;
      const wrapper = shallowMount(PayTable, { propsData });
      expect(wrapper.find('tbody').findAll('tr')).to.have.lengthOf(13);
    });

    it('should render the selected game with the correct class', () => {
      const wrapper = shallowMount(PayTable, { propsData });
      const selectedRows = wrapper.findAll('.selected');

      expect(selectedRows).to.have.lengthOf(1);
      expect(selectedRows.at(0).attributes().id).to.equal('winnings_row_5');
    });
  });
});
