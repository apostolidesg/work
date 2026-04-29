import { createLocalVue, shallowMount } from '@vue/test-utils';
import ConsDrawsCalcPad from '../../../src/components/lobby/games/kino/sidescreen/ConsDrawsCalcPad/ConsDrawsCalcPad';
import types from '../../../src/store/modules/SessionStoreModule/types';
import moduleTypes from '../../../src/store/modules/types';
import sinon from 'sinon';
import Vuex from 'vuex';
import Vue from 'vue';

describe('ConsDrawsCalcPad', () => {
  let state;
  let localVue;
  let store;

  beforeEach(() => {
    state = {
      [types.state.GAME_TYPE]: () => '',
    };

    localVue = createLocalVue();
    localVue.use(Vuex);

    store = new Vuex.Store({
      modules: {
        [moduleTypes.SESSION_STORE_MODULE]: {
          namespaced: true,
          state,
        },
      },
    });
  });
  describe('When a number keypad is clicked calcBtnClicked should be triggered', () => {
    describe('When the new consecutive draws value is valid in kino', () => {
      it('If the value is > 0 and < 800, ConsecutiveDraws should update with the new value and emit the update-consecutive-draws event', () => {
        state[types.state.GAME_TYPE] = 'KINO';
        const mocks = { $eventHub: new Vue(), $t: sinon.stub() };
        const propsData = { targetElement: 'element_id' };
        const wrapper = shallowMount(ConsDrawsCalcPad, { propsData, mocks, store });

        wrapper.vm.consecutiveDraws = 0;
        wrapper.vm.showToastr = true;

        wrapper.vm.calcBtnClicked(1);
        expect(wrapper.vm.showToastr).to.be.false;
        expect(wrapper.vm.consecutiveDraws).to.equal(1);
        expect(wrapper.emitted('update-consecutive-draws')[0][0]).to.equal(1);
      });
    });
    describe('When the new consecutive draws value is valid in Powerspin', () => {
      it('If the value is > 0 and < 400, ConsecutiveDraws should update with the new value and emit the update-consecutive-draws event', () => {
        state[types.state.GAME_TYPE] = 'POWERSPIN';
        const mocks = { $eventHub: new Vue(), $t: sinon.stub() };
        const propsData = { targetElement: 'element_id' };
        const wrapper = shallowMount(ConsDrawsCalcPad, { propsData, mocks, store });

        wrapper.vm.consecutiveDraws = 0;
        wrapper.vm.showToastr = true;

        wrapper.vm.calcBtnClicked(3);
        expect(wrapper.vm.showToastr).to.be.false;
        expect(wrapper.vm.consecutiveDraws).to.equal(3);
        expect(wrapper.emitted('update-consecutive-draws')[0][0]).to.equal(3);
      });
    });
    describe('When the new consecutive draws value is not valid', () => {
      it('If the fist value is 0, ConsecutiveDraws should not update and an error toast should be triggered', () => {
        const mocks = { $eventHub: new Vue(), $t: sinon.stub() };
        const propsData = { targetElement: 'element_id' };
        const wrapper = shallowMount(ConsDrawsCalcPad, { propsData, mocks, store });

        wrapper.vm.consecutiveDraws = 0;
        wrapper.vm.showToastr = false;

        wrapper.vm.calcBtnClicked(0);
        expect(wrapper.vm.consecutiveDraws).to.equal(0);
        expect(wrapper.vm.selectedConsecutiveDraws).to.equal(1);
        expect(wrapper.emitted('update-consecutive-draws')).to.be.undefined;
        expect(wrapper.vm.showToastr).to.be.true;
      });
      it('If the fist value is >= 400, ConsecutiveDraws should not update and an error toast should be triggered', () => {
        const mocks = { $eventHub: new Vue(), $t: sinon.stub() };
        const propsData = { targetElement: 'element_id' };
        const wrapper = shallowMount(ConsDrawsCalcPad, { propsData, mocks, store });

        wrapper.vm.consecutiveDraws = 99;
        wrapper.vm.showToastr = false;

        wrapper.vm.calcBtnClicked(9);
        expect(wrapper.vm.consecutiveDraws).to.equal(99);
        expect(wrapper.vm.selectedConsecutiveDraws).to.equal(99);
        expect(wrapper.emitted('update-consecutive-draws')).to.be.undefined;
        expect(wrapper.vm.showToastr).to.be.true;
      });
    });
  });
  describe('When cancel button is clicked onCancel should be triggered', () => {
    it('Should reset the consecutiveDraws value, emit the changed value and close the keypad', () => {
      const mocks = { $eventHub: new Vue(), $t: sinon.stub() };
      const propsData = { targetElement: 'element_id' };
      const wrapper = shallowMount(ConsDrawsCalcPad, { propsData, mocks, store });

      wrapper.vm.consecutiveDraws = 99;
      wrapper.vm.showCalcPad = true;

      wrapper.vm.onCancel();
      expect(wrapper.vm.consecutiveDraws).to.equal(0);
      expect(wrapper.vm.selectedConsecutiveDraws).to.equal(1);
      expect(wrapper.emitted('update-consecutive-draws')[0][0]).to.equal(1);
      expect(wrapper.vm.showCalcPad).to.be.false;
    });
  });
  describe('When submit button is clicked onSubmit should be triggered', () => {
    it('Should emit the value of consecutiveDraws, reset any error message, set isSubmitted to true and close the keypad', () => {
      const mocks = { $eventHub: new Vue(), $t: sinon.stub() };
      const propsData = { targetElement: 'element_id' };
      const wrapper = shallowMount(ConsDrawsCalcPad, { propsData, mocks, store });

      wrapper.vm.consecutiveDraws = 99;
      wrapper.vm.showCalcPad = true;
      wrapper.vm.isSubmitted = false;

      wrapper.vm.onSubmit();
      expect(wrapper.vm.consecutiveDraws).to.equal(99);
      expect(wrapper.vm.selectedConsecutiveDraws).to.equal(99);
      expect(wrapper.emitted('update-consecutive-draws')[0][0]).to.equal(99);
      expect(wrapper.vm.showCalcPad).to.be.false;
      expect(wrapper.vm.isSubmitted).to.be.true;
    });
  });
  describe('When popover is shown onCalcPadShown should be triggered', () => {
    it('Should reset consecutiveDraws value, isSubmitted, any error and emit event for the reseted consecutiveDraws value', () => {
      const mocks = { $eventHub: new Vue(), $t: sinon.stub() };
      const propsData = { targetElement: 'element_id' };
      const wrapper = shallowMount(ConsDrawsCalcPad, { propsData, mocks, store });

      wrapper.vm.consecutiveDraws = 99;
      wrapper.vm.showToastr = true;
      wrapper.vm.isSubmitted = true;

      wrapper.vm.onCalcPadShown();
      expect(wrapper.vm.consecutiveDraws).to.equal(0);
      expect(wrapper.vm.selectedConsecutiveDraws).to.equal(1);
      expect(wrapper.vm.isSubmitted).to.be.false;
      expect(wrapper.emitted('update-consecutive-draws')[0][0]).to.equal(1);
    });
  });
  describe('When popover is hidden onCalcPadHidden should be triggered', () => {
    it('If isSubmitted is enabled nothing should happen', () => {
      const mocks = { $eventHub: new Vue(), $t: sinon.stub() };
      const propsData = { targetElement: 'element_id' };
      const wrapper = shallowMount(ConsDrawsCalcPad, { propsData, mocks, store });

      wrapper.vm.consecutiveDraws = 99;
      wrapper.vm.isSubmitted = true;

      wrapper.vm.onCalcPadHidden();
      expect(wrapper.vm.consecutiveDraws).to.equal(99);
      expect(wrapper.vm.isSubmitted).to.be.true;
    });
    it('If isSubmitted is disabled nothing should happen, consecutive draws value should reset and an event with its value should be emitted', () => {
      const mocks = { $eventHub: new Vue(), $t: sinon.stub() };
      const propsData = { targetElement: 'element_id' };
      const wrapper = shallowMount(ConsDrawsCalcPad, { propsData, mocks, store });

      wrapper.vm.consecutiveDraws = 99;

      wrapper.vm.onCalcPadHidden();
      expect(wrapper.vm.consecutiveDraws).to.equal(0);
      expect(wrapper.vm.selectedConsecutiveDraws).to.equal(1);
      expect(wrapper.emitted('update-consecutive-draws')[0][0]).to.equal(1);
    });
  });
});
