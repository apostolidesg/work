import { shallowMount, createLocalVue } from '@vue/test-utils';
import Games from '../../../src/components/lobby/games/Games.vue';
import sinon from 'sinon';
import VueRouter from 'vue-router';
import Snotify, { SnotifyPosition } from 'vue-snotify';
import router from '../../../src/router/router';

describe('Games.vue', () => {
  let localVue;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(Snotify);
  });

  it('should render the correct markup', () => {
    const wrapper = shallowMount(Games, {
      localVue,
      router,
    });

    expect(wrapper.find('#lobby-games-pameStoixima-img').exists()).to.be.true;
    expect(wrapper.find('#lobby-games-kino-img').exists()).to.be.true;
    expect(wrapper.find('#lobby-games-fireblaze-img').exists()).to.be.true;

    wrapper.destroy();
  });

  it('should react when clicking on pame stoixima choice', () => {
    const spy = sinon.spy(Games.methods, 'switchApplication');

    const wrapper = shallowMount(Games, {
      localVue,
      router,
    });

    wrapper.find('#lobby-games-pameStoixima-img').trigger('click');
    expect(spy.called).to.be.true;

    wrapper.destroy();
  });
});
