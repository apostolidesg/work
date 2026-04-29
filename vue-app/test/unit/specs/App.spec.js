import {shallowMount, createLocalVue} from '@vue/test-utils';
import App from "../../../src/App.vue";
import appstore from "../../../src/store/store";
import Vue from 'vue';
import router from '../../../src/router/router';
import VueRouter from 'vue-router';
import sinon from 'sinon';
import EventSenderService from '../../../src/handler/EventSenderService';


describe('App', () => {

  const localVue = createLocalVue();
  localVue.use(VueRouter);
  let wrapper;
  Vue.prototype.$store = appstore;
  Vue.prototype.$eventHub = new Vue(); // Global event bus
  let storage;

  beforeEach(() => {

    storage = {
      accessToken: "",
      balance: 0,
      ssbtId: "",
      get(name)
      {
        if (name === "accessToken") return this.accessToken;
        if (name === "balance") return this.balance;
        if (name === "ssbtId") return this.ssbtId;
      },
      set(name, value)
      {
        if (name === "accessToken") this.accessToken = value;
        if (name === "balance") this.balance = value;
        if (name === "ssbtId") this.ssbtId = value;
      }
    };
    wrapper = shallowMount(App, {
      localVue,
      router,
      mocks: {
        $localStorage: storage
      }
    });
  });


  afterEach(() => {
    wrapper.vm.$destroy();
    storage = {};
  });

  // it("Should start a new game session", (done) => {
  //   //State
  //   wrapper.vm.startGameSession("kino");
  //   let previousStartedTime = wrapper.vm.gameSessions["kino"].started;
  //   setTimeout(function () {
  //     wrapper.vm.stopGameSession("kino");
  //     wrapper.vm.startGameSession("kino");
  //     expect(wrapper.vm.gameSessions["kino"].started).to.be.above(previousStartedTime);
  //     done();
  //   }, 1000);
  // });

});
