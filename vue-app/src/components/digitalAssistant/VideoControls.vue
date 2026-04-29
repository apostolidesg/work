<template>
  <div class="video-controls">
    <div v-if="!playing" class="video-controls__big-play-overlay" @click="togglePlay">
      <div class="video-controls__big-play-btn"><i class="material-icons"> play_arrow </i></div>
    </div>

    <div class="video-controls__top">
      <span class="video-controls__time">{{ fmt(current) }} / {{ fmt(duration) }}</span>
    </div>

    <div class="video-controls__bottom">
      <input
        type="range"
        class="video-controls__seek"
        min="0"
        max="100"
        step="0.1"
        :value="progress"
        @input="onSeek"
        @mousedown="seeking = true"
        @mouseup="seeking = false"
        @touchstart="seeking = true"
        @touchend="seeking = false"
      />
      <div class="video-controls__seek-preview" :style="{ width: `${progress}%` }"></div>
    </div>

    <div class="video-controls__actions">
      <button class="video-controls__action-btn" @click="seekBackward">
        <i class="material-icons">replay_10</i>
      </button>

      <button class="video-controls__btn video-controls__center-btn" @click="togglePlay">
        <i class="material-icons">
          {{ playing ? 'pause' : 'play_arrow' }}
        </i>
      </button>

      <button class="video-controls__action-btn" @click="seekForward">
        <span class="video-controls__icon"> <i class="material-icons">forward_10</i></span>
      </button>
    </div>
  </div>
</template>

<script>
import fonts from './fonts.css';
export default {
  name: 'VideoControls',
  props: {
    videoEl: {
      required: true,
    },
  },

  data() {
    return {
      playing: false,
      progress: 0,
      duration: 0,
      current: 0,
      muted: false,
      seeking: false,
    };
  },
  mounted() {
    this.attachListeners();
  },
  watch: {
    videoEl() {
      this.attachListeners();
    },
  },
  beforeUnmount() {
    this.removeListeners();
  },
  methods: {
    attachListeners() {
      if (!this.videoEl) return;

      this.removeListeners();
      this.videoEl.addEventListener('timeupdate', this.sync);
      this.videoEl.addEventListener('play', this.onPlay);
      this.videoEl.addEventListener('pause', this.onPause);
      this.videoEl.addEventListener('loadedmetadata', this.sync);
      this.sync();
    },
    removeListeners() {
      if (!this.videoEl) return;
      this.videoEl.removeEventListener('timeupdate', this.sync);
      this.videoEl.removeEventListener('play', this.onPlay);
      this.videoEl.removeEventListener('pause', this.onPause);
      this.videoEl.removeEventListener('loadedmetadata', this.sync);
    },
    onPlay() {
      this.playing = true;
    },
    onPause() {
      this.playing = false;
    },
    togglePlay() {
      this.playing ? this.videoEl.pause() : this.videoEl.play();
    },
    onSeek(e) {
      const pct = e.target.value / 100;
      this.videoEl.currentTime = pct * this.videoEl.duration;
    },
    seekForward() {
      if (!this.videoEl) return;
      this.videoEl.currentTime = Math.min(this.videoEl.duration, this.videoEl.currentTime + 10);
    },
    seekBackward() {
      if (!this.videoEl) return;
      this.videoEl.currentTime = Math.max(0, this.videoEl.currentTime - 10);
    },
    sync() {
      if (!this.videoEl || !isFinite(this.videoEl.duration)) return;
      this.playing = !this.videoEl.paused;
      this.current = this.videoEl.currentTime;
      this.duration = this.videoEl.duration;
      this.progress = (this.current / this.duration) * 100;
    },
    fmt(s) {
      if (!isFinite(s)) return '0:00';
      const m = Math.floor(s / 60);
      const ss = Math.floor(s % 60)
        .toString()
        .padStart(2, '0');
      return `${m}:${ss}`;
    },
  },
};
</script>

<style scoped lang="scss">
.video-controls {
  width: 100%;
  background: transparent;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.4rem 0.8rem 0.6rem;
  box-sizing: border-box;
  font-family: inherit;
  z-index: 10;
  position: relative;

  @media (max-width: 1200px) {
    position: absolute;
    top: 25px;
  }

  &__big-play-overlay {
    position: fixed;
    top: 65px;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background: rgba(0, 0, 0, 0.4);
    z-index: 0;

    &:hover .video-controls__big-play-btn {
      transform: scale(1.1);
      background: grey;
    }
  }

  &__big-play-btn {
    width: 120px;
    height: 120px;
    background: grey;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 4rem;
    color: white;
    border: 4px solid #fff;
    transition:
      transform 0.3s ease,
      background-color 0.3s ease;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);

    @media (max-width: 1200px) {
      position: absolute;
      top: 25%;
    }
  }

  &__top {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  &__time {
    font-size: 0.8rem;
    white-space: nowrap;
  }

  &__bottom {
    display: flex;
    align-items: center;
    position: relative;
    height: 15px;
    margin-bottom: 0.5rem;
  }

  &__seek {
    flex: 1;
    cursor: pointer;
    height: 5px;
    border-radius: 3px;
    transition: height 0.2s ease;
    position: relative;
    z-index: 2;
    background: transparent;
    -webkit-appearance: none;
    appearance: none;
    width: 100%;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background: grey;
      cursor: pointer;
      transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;
      transform-origin: center;
      border: 2px solid white;

      &:hover,
      &:active {
        transform: scale(1.2);
        box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
      }
    }
  }

  &__seek-preview {
    position: absolute;
    height: 5px;
    border-radius: 3px;
    background: grey;
    top: 5px;
    left: 0;
    pointer-events: none;
    transition: width 0.1s linear;
  }

  &__actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
  }

  &__center-btn {
    background: inherit;
    border: none;
    color: #fff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0;
    transition:
      transform 0.2s ease,
      background-color 0.2s ease;

    &:hover {
      transform: scale(1.1);
    }
  }

  &__action-btn {
    background: none;
    border: none;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    padding: 0;
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.1);
    }
  }

  &__icon {
    font-size: 1.2rem;
    margin-bottom: 0.2rem;
  }

  &__label {
    font-size: 0.7rem;
    opacity: 0.8;
  }
}

.material-icons {
  font-size: 3rem;
}
</style>
