import { shallowMount, createLocalVue } from '@vue/test-utils';
import sinon from 'sinon';
import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';

import VideoControls from '../../../../src/components/digitalAssistant/VideoControls.vue';

chai.use(sinonChai);
const localVue = createLocalVue();

function makeFakeVideo({ paused = true, current = 0, duration = 120 } = {}) {
  const listeners = {};

  const addSpy = sinon.spy((evt, fn) => {
    (listeners[evt] = listeners[evt] || []).push(fn);
  });

  const removeSpy = sinon.spy((evt, fn) => {
    listeners[evt] = (listeners[evt] || []).filter((f) => f !== fn);
  });

  return {
    duration,
    currentTime: current,
    paused,
    play: sinon.spy(function () {
      this.paused = false;
      (listeners.play || []).forEach((fn) => fn());
    }),
    pause: sinon.spy(function () {
      this.paused = true;
      (listeners.pause || []).forEach((fn) => fn());
    }),
    addEventListener: addSpy,
    removeEventListener: removeSpy,
    ___tick(seconds) {
      this.currentTime = seconds;
      (listeners.timeupdate || []).forEach((fn) => fn());
    },
  };
}

describe('VideoControls.vue', () => {
  let video;

  function factory(extra = {}) {
    video = makeFakeVideo();
    return shallowMount(VideoControls, {
      localVue,
      propsData: { videoEl: video },
      attachToDocument: true,
      ...extra,
    });
  }
  it('registers listeners on mount and cleans up on destroy', () => {
    const wrapper = factory();
    expect(video.addEventListener).to.have.been.calledWith('timeupdate');
    expect(video.addEventListener).to.have.been.calledWith('play');
    expect(video.addEventListener).to.have.been.calledWith('pause');
    expect(video.addEventListener).to.have.been.calledWith('loadedmetadata');
    wrapper.destroy();

    expect(video.removeEventListener).to.have.been.calledWith('timeupdate');
    expect(video.removeEventListener).to.have.been.calledWith('play');
    expect(video.removeEventListener).to.have.been.calledWith('pause');
    expect(video.removeEventListener).to.have.been.calledWith('loadedmetadata');
  });

  it('re-attaches listeners if the `videoEl` prop changes', async () => {
    const wrapper = factory();
    const firstVideo = video;
    expect(firstVideo.addEventListener.callCount).to.equal(4);
    const newVideo = makeFakeVideo();
    await wrapper.setProps({ videoEl: newVideo });
    await wrapper.vm.$nextTick();

    expect(newVideo.addEventListener.callCount).to.equal(4);

    newVideo.play();
    expect(wrapper.vm.playing).to.be.true;
  });

  it('`togglePlay` calls play() or pause() based on current state', async () => {
    const wrapper = factory();

    await wrapper.find('.video-controls__center-btn').trigger('click');
    expect(video.play).to.have.been.calledOnce;

    video.paused = false;
    video.___tick(1);
    await wrapper.vm.$nextTick();

    await wrapper.find('.video-controls__center-btn').trigger('click');
    expect(video.pause).to.have.been.calledOnce;
  });

  it('seekForward / seekBackward respect 10-second steps and boundaries', () => {
    const wrapper = factory({ propsData: { videoEl: makeFakeVideo({ current: 5 }) } });
    wrapper.findAll('.video-controls__action-btn').at(1).trigger('click');
    expect(wrapper.props().videoEl.currentTime).to.equal(15);

    wrapper.findAll('.video-controls__action-btn').at(0).trigger('click');
    expect(wrapper.props().videoEl.currentTime).to.equal(5);

    wrapper.findAll('.video-controls__action-btn').at(0).trigger('click');
    expect(wrapper.props().videoEl.currentTime).to.equal(0);
  });

  it('range slider emits `onSeek` that rewrites currentTime proportionally', async () => {
    const wrapper = factory();
    const range = wrapper.find('input[type="range"]');
    await range.setValue(50);
    expect(video.currentTime).to.equal(video.duration / 2);
  });

  it('sync() updates playing / current / duration / progress', async () => {
    const wrapper = factory();
    video.___tick(30);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.current).to.equal(30);
    expect(wrapper.vm.progress).to.equal((30 / 120) * 100);
  });

  it('fmt() pretty-prints seconds', () => {
    const wrapper = factory();
    expect(wrapper.vm.fmt(0)).to.equal('0:00');
    expect(wrapper.vm.fmt(65)).to.equal('1:05');
  });
});
