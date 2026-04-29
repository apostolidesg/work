import types from './types';

export default {
  [types.actions.PLAY_VIDEO]({}, assetKey) {
    const videoElements = document.querySelectorAll('video');
    videoElements.forEach((video) => {
      const videoSrc = video.getAttribute('src');
      if (videoSrc) {
        video.play();
      }
    });
  },
};
