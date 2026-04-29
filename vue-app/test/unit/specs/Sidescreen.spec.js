import { shallowMount } from '@vue/test-utils';
import Sidescreen from '../../../src/components/lobby/games/kino/sidescreen/Sidescreen.vue';
import Warning from '../../../src/components/modals/InfoModal.vue';
import Betslip from '../../../src/model/Betslip';
import Vue from 'vue';
import appstore from '../../../src/store/store';
import BootstrapVue from 'bootstrap-vue';

describe('Sidescreen', () => {
  Vue.prototype.$eventHub = new Vue(); // Global event bus
  Vue.prototype.$store = appstore;
  Vue.use(BootstrapVue);
  let wrapper;
  let mockedBetslip;
  let storage;
  let stubs;

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
    stubs = {
      BaseSidescreen: {
        template: '<div class="sidescreen-panel-stub"><slot name="header" /><slot/></div>',
      },
      AddBoardButton: {
        name: 'AddBoardButton',
        template: '<button class="add-board-button-stub" v-on="$listeners"><slot /></button>',
      },
    };
    mockedBetslip = new Betslip();
    mockedBetslip.bet_areas[0].activeArea = true;
    wrapper = shallowMount(Sidescreen, {
      stubs,
      propsData: {
        betslip: mockedBetslip,
        kino_preview_row: 'kino_preview_row',
        isOddEvenModalVisible: false,
        isColumnsModalVisible: false,
      },
    });
  });

  afterEach(() => {
    wrapper.vm.$destroy();
    mockedBetslip = {};
    storage = {};
  });

  it('Check that one bet is active upon creation ', () => {
    wrapper.find('#mona_ziga_button').trigger('click');
    expect(wrapper.vm.oddEvenModalVisible).to.be.true;
  });

  it('should open oddEven modal when showOddEvenModal is clicked ', () => {
    wrapper.find('#mona_ziga_button').trigger('click');
    expect(wrapper.vm.oddEvenModalVisible).to.be.true;
  });

  it('should close oddEven modal when closeOddEvenModal is called ', () => {
    wrapper.vm.closeOddEvenModal();
    expect(wrapper.vm.oddEvenModalVisible).to.be.false;
  });

  it('should open columns modal when showColumnsModal is clicked ', () => {
    wrapper.find('#stiles_button').trigger('click');
    expect(wrapper.vm.columnsModalVisible).to.be.true;
  });

  it('should close columns modal when closeColumnsModal is called ', () => {
    wrapper.vm.closeColumnsModal();
    expect(wrapper.vm.columnsModalVisible).to.be.false;
  });

  it('should create a new bet, when active area is filled and add new button is clicked', function() {
    wrapper.vm.betslip.bet_areas[0].pickedNumbers.push(1, 2);
    wrapper.vm.betslip.bet_areas[0].filled = true;
    wrapper.findComponent({ name: stubs.AddBoardButton.name }).trigger('click');

    expect(wrapper.vm.betslip.bet_areas.length).to.eql(2);
  });
});
