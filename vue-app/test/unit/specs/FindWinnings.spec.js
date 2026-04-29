import {shallowMount, createLocalVue} from '@vue/test-utils'
import FindWinnings from '../../../src/components/findWinnings/FindWinnings'
import sinon from 'sinon'
import Vue from 'vue'
import router from "../../../src/router/router";
import store from "../../../src/store/store";

const localVue = createLocalVue();

describe('FindWinnings.vue', () => {

  // Vue.prototype.$eventHub = new Vue();
  // let wrapper;
  //
  // beforeEach(() => {
  //   wrapper = shallowMount(FindWinnings, {
  //     localVue,
  //     router,
  //     store
  //   });
  //
  //   wrapper.setData({
  //     isVisible: true,
  //     isRolloverBtnVisible: false
  //   });
  // });
  //
  // afterEach(() => {
  //   wrapper.vm.$destroy();
  // });
  //
  // it('should check And Return Value when prize tier is not special', function () {
  //   wrapper.setData({
  //     prizeCheck: {
  //       ticketStatus: {
  //         ticket: {
  //           "serialNumber": "32212255153489660940270977293157661",
  //           "playedInCyprus": false,
  //           "status": "WON",
  //           "firstDrawNumber": 350,
  //           "cost": 0.25,
  //           "gross": 29.3,
  //           "net": 29.3,
  //           "refund": 0,
  //           "endDrawNumber": 350,
  //           "remainingDraws": 0,
  //           "tax": 0
  //         },
  //         tier: "low"
  //       }
  //     }
  //   });
  //
  //   let value = wrapper.vm.checkAndReturnValue(wrapper.vm.prizeCheck.ticketStatus.ticket.net, wrapper.vm.prizeCheck.ticketStatus.tier);
  //   expect(value).to.be.eql('29.30');
  // });
  //
  // it('should check And Return asterisks when prize tier is special', function () {
  //   wrapper.setData({
  //     prizeCheck: {
  //       ticketStatus: {
  //         ticket: {
  //           "serialNumber": "32212255153489660940270977293157661",
  //           "playedInCyprus": false,
  //           "status": "WON",
  //           "firstDrawNumber": 350,
  //           "cost": 10,
  //           "gross": 250000,
  //           "net": 100000,
  //           "refund": 0,
  //           "endDrawNumber": 350,
  //           "remainingDraws": 0,
  //           "tax": 0
  //         },
  //         tier: "special"
  //       }
  //     }
  //   });
  //
  //   let value = wrapper.vm.checkAndReturnValue(wrapper.vm.prizeCheck.ticketStatus.ticket.net, wrapper.vm.prizeCheck.ticketStatus.tier);
  //   expect(value).to.be.eql('*****');
  // });
  //
  // it('should emit a \'closeFindWinningsModal\' event when close button is clicked', function () {
  //   let spy = sinon.spy(FindWinnings.methods, 'closeFindWinnings');
  //   wrapper.setData({
  //     prizeCheck: {
  //       ticketStatus: {
  //         ticket: {
  //           "serialNumber": "32212255153489660940270977293157661",
  //           "playedInCyprus": false,
  //           "status": "WON",
  //           "firstDrawNumber": 350,
  //           "cost": 0.25,
  //           "gross": 29.3,
  //           "net": 29.3,
  //           "refund": 0,
  //           "endDrawNumber": 350,
  //           "remainingDraws": 0,
  //           "tax": 0
  //         },
  //         tier: "low"
  //       },
  //       isValid: true
  //     },
  //     isVisible: true
  //   });
  //
  //   wrapper.find('#findWinningsCloseButton1').trigger('click');
  //   expect(spy.called).to.be.true;
  // });
  //
  // it('should return correct computed values', function () {
  //   wrapper.setData({
  //     prizeCheck: {
  //       ticketStatus: {
  //         ticket: {
  //           "serialNumber": "32212255153489660940270977293157661",
  //           "playedInCyprus": false,
  //           "status": "WON",
  //           "firstDrawNumber": 350,
  //           "cost": 10,
  //           "gross": 29.3,
  //           "net": 29.3,
  //           "refund": 0,
  //           "endDrawNumber": 350,
  //           "remainingDraws": 0,
  //           "tax": 0
  //         },
  //         tier: "low"
  //       },
  //       isValid: true
  //     },
  //   });
  //   expect(wrapper.vm.getNetAmount).to.be.equal('29.30');
  //   expect(wrapper.vm.getGrossAmount).to.be.equal('29.30');
  //   expect(wrapper.vm.getTaxAmount).to.be.equal('0.00');
  // });
});
