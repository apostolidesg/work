import KinoGame from '../../../src/components/lobby/games/kino/KinoGame.vue';
import Vue from 'vue';
import appstore from '../../../src/store/store';
import { shallowMount } from '@vue/test-utils';
import router from '../../../src/router/router';
import Betslip from '../../../src/model/Betslip';
import InfoModal from '../../../src/components/modals/InfoModal';
import OddEven from '../../../src/model/OddEven';
import Columns from '../../../src/model/Columns';

describe.skip('Kino', () => {
  let wrapper;
  let mockedBetslip;
  Vue.prototype.$store = appstore;
  Vue.prototype.$eventHub = new Vue(); // Global event bus
  const instance = new Vue();
  let storage;

  beforeEach(() => {
    storage = {
      accessToken: '',
      balance: 0,
      ssbtId: '',
      get(name) {
        if (name === 'accessToken') return this.accessToken;
        if (name === 'balance') return this.balance;
        if (name === 'ssbtId') return this.ssbtId;
      },
      set(name, value) {
        if (name === 'accessToken') this.accessToken = value;
        if (name === 'balance') this.balance = value;
        if (name === 'ssbtId') this.ssbtId = value;
      },
    };
    mockedBetslip = new Betslip();
    mockedBetslip.bet_areas[0].activeArea = true;
    wrapper = shallowMount(KinoGame, {
      router,
      mocks: {
        $localStorage: storage,
      },
    });
  });

  afterEach(() => {
    wrapper.vm.$destroy();
    mockedBetslip = {};
    storage = {};
  });

  it('Check if contains Kino window', () => {
    expect(wrapper.html()).to.contain('kino');
    wrapper.vm.$destroy();
  });

  it('Change active area from 1 to 2 when betAreaClicked event is caught', () => {
    wrapper.vm.betslip.addNewBet();
    wrapper.vm.betAreaClicked(2);
    expect(wrapper.vm.activeArea).to.eql(2);
    expect(wrapper.vm.betslip.bet_areas[1].activeArea).to.be.true;
  });

  it('should change game type from 0 to 2 when gameTypeClicked event is triggered and no numbers are selected', () => {
    wrapper.vm.gameTypeClicked(3);
    expect(wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].gameType).to.eql(3);
  });

  it('when changing game type from 2 to another and numbers are selected, should open InfoModal modal', () => {
    // State
    const infoModalWrapper = shallowMount(InfoModal, {});
    wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].filled = false;
    wrapper.vm.addNumberToArea(1);
    wrapper.vm.addNumberToArea(2);

    wrapper.vm.gameTypeClicked(3);

    expect(wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].gameType).to.eql(2);
    expect(wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].filled).to.be.true;
    expect(infoModalWrapper.vm.isVisible).to.be.true;
  });

  it('when first selecting numbers, game type should become equal to numbers selected', () => {
    wrapper.vm.addNumberToArea(48);
    wrapper.vm.addNumberToArea(54);

    expect(wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].gameType).to.eql(2);
    expect(wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].filled).to.be.true;
  });

  it('when selecting numbers and then unselecting, game type should become equal to numbers selected', () => {
    wrapper.vm.addNumberToArea(48);
    wrapper.vm.addNumberToArea(54);
    wrapper.vm.addNumberToArea(63);
    wrapper.vm.addNumberToArea(54);

    expect(wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].gameType).to.eql(2);
    expect(wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].filled).to.be.true;
  });

  it('when first selecting game type and then numbers fewer than gameType, game type should stay the same', () => {
    wrapper.vm.gameTypeClicked(4);

    wrapper.vm.addNumberToArea(48);
    wrapper.vm.addNumberToArea(20);
    wrapper.vm.addNumberToArea(54);

    expect(wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].gameType).to.eql(4);
    expect(wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].filled).to.be.false;
  });

  it('when first selecting game type and then numbers more than gameType, game type should become equal to numbers selected', () => {
    wrapper.vm.gameTypeClicked(3);

    wrapper.vm.addNumberToArea(48);
    wrapper.vm.addNumberToArea(20);
    wrapper.vm.addNumberToArea(22);
    wrapper.vm.addNumberToArea(54);

    expect(wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].gameType).to.eql(4);
    expect(wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].filled).to.be.true;
  });

  it('when first selecting game type, then some numbers more than gameType and then unselecting, game type should become equal to numbers selected', () => {
    wrapper.vm.gameTypeClicked(2);

    wrapper.vm.addNumberToArea(48);
    wrapper.vm.addNumberToArea(20);
    wrapper.vm.addNumberToArea(22);
    wrapper.vm.addNumberToArea(54);
    wrapper.vm.addNumberToArea(22);

    expect(wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].gameType).to.eql(3);
    expect(wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].filled).to.be.true;
  });

  it('when clicking an already clicked game type and no numbers are selected, game type should become 0 and filled attribute false', () => {
    // State
    wrapper.vm.gameTypeClicked(2);
    wrapper.vm.gameTypeClicked(2);
    expect(wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].gameType).to.eql(0);
    expect(wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].filled).to.be.false;
  });

  it('should add number clicked to betslip.bet_area[activeArea-1].picked numbers array', () => {
    wrapper.vm.addNumberToArea(1);
    expect(wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].pickedNumbers.length).to.eql(1);
    expect(wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].pickedNumbers[0]).to.eql(1);
  });

  it('should delete number clicked if already included in betslip.bet_area[activeArea-1].picked numbers array', () => {
    // State
    wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].pickedNumbers.push(1);
    expect(wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].pickedNumbers.length).to.eql(1);

    wrapper.vm.addNumberToArea(1);
    expect(wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].pickedNumbers.length).to.eql(0);
  });

  it('after clicking number should mark area ass filled when game type = pickedNumbers.length', () => {
    // State
    wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].gameType = 1;
    expect(wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].gameType).to.eql(1);

    wrapper.vm.addNumberToArea(1);
    expect(wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].filled).to.be.true;
  });

  it('should set kino bonus to true or false if kinoBonusClicked event is triggered', () => {
    wrapper.vm.kinoBonusClicked(true);
    expect(wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].kinoBonusActive).to.be.true;
  });

  it('should clear the active area if clearActiveArea event is triggered', () => {
    // State
    wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].gameType = 2;
    wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].filled = true;
    wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].pickedNumbers.push(1);
    wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].pickedNumbers.push(2);

    wrapper.vm.clearActiveArea();
    expect(wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].filled).to.be.false;
    expect(wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].gameType).to.eql(0);
    expect(wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].pickedNumbers.length).to.eql(0);
  });

  it('should clear the whole Betslip if clearBetslip event is triggered', () => {
    // State
    wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].gameType = 2;
    wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].pickedNumbers.push(1);
    wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].pickedNumbers.push(2);
    expect(wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].pickedNumbers.length).to.eql(2);
    wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].filled = true;

    wrapper.vm.betslip.addNewBet();
    wrapper.vm.betslip.bet_areas[1].gameType = 1;
    wrapper.vm.betslip.bet_areas[1].pickedNumbers.push(79);
    expect(wrapper.vm.betslip.bet_areas[1].pickedNumbers.length).to.eql(1);
    wrapper.vm.betslip.bet_areas[1].filled = true;

    wrapper.vm.betslip.addNewBet();
    wrapper.vm.betslip.bet_areas[2].gameType = 2;
    wrapper.vm.betslip.bet_areas[2].pickedNumbers.push(30);
    expect(wrapper.vm.betslip.bet_areas[2].pickedNumbers.length).to.eql(1);

    wrapper.vm.clearBetslip();
    expect(wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].filled).to.be.false;
    expect(wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].gameType).to.eql(0);
    expect(wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].pickedNumbers.length).to.eql(0);

    expect(wrapper.vm.betslip.bet_areas.length).to.eql(1);
  });

  it('should clear active areas numbers when clearNumbers event is triggered', () => {
    // State
    wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].gameType = 2;
    wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].pickedNumbers.push(1);
    wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].pickedNumbers.push(2);
    expect(wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].pickedNumbers.length).to.eql(2);

    wrapper.vm.clearNumbers();
    expect(wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].pickedNumbers.length).to.eql(0);
  });

  it('should update multiplier on active area when updateMultiplier event is triggered', () => {
    instance.$eventHub.$emit('updateMultiplier', [2]);
    expect(wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].multiplier).to.eql(2);
  });

  it('should update consecutive draws number in betslip when updateConsecutiveDraws event is triggered', () => {
    wrapper.vm.updateConsecutiveDraws(30);
    expect(wrapper.vm.betslip.consecutiveDraws).to.eql(30);
  });

  it('should update oddEven object in betslip when saveOddEvenPick event is triggered', () => {
    // State
    const oddEvenPicks = new OddEven();
    oddEvenPicks.oddEven = 'draw';
    oddEvenPicks.oddEvenAmount = [2, 10];

    wrapper.vm.saveOddEvenPick(oddEvenPicks);
    expect(wrapper.vm.betslip.oddEvenGame.oddEven).to.eql('draw');
    expect(wrapper.vm.betslip.oddEvenGame.calculateValue()).to.eql(12);
  });

  it('should update columns object in betslip when saveColumnsPick event is triggered', () => {
    // State
    const columnsPicks = new Columns();
    columnsPicks.columns = [1, 2];
    columnsPicks.columnsAmount = [30];

    wrapper.vm.saveColumnsPick(columnsPicks);
    expect(wrapper.vm.betslip.columnsGame.columns.length).to.eql(2);
    expect(wrapper.vm.betslip.columnsGame.calculateValue()).to.eql(60);
  });

  it('should set quickPick of active area to true when quickPickClicked event is caught', () => {
    wrapper.vm.quickPickClicked();
    expect(wrapper.vm.betslip.bet_areas[0].quickPick).to.be.true;
  });

  it('should set quickPick of active area to false if player clicks on game type', () => {
    wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].gameType = 2;
    wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].filled = true;
    wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].pickedNumbers.push(1);
    wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].pickedNumbers.push(2);
    wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].quickPick = true;

    wrapper.vm.gameTypeClicked(3);
    wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].quickPick = false;
  });

  it('should set quickPick of active area to false if player clicks on a number', () => {
    wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].gameType = 2;
    wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].filled = true;
    wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].pickedNumbers.push(1);
    wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].pickedNumbers.push(2);
    wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].quickPick = true;

    wrapper.vm.addNumberToArea(7);
    wrapper.vm.betslip.bet_areas[wrapper.vm.activeArea - 1].quickPick = false;
  });
});
