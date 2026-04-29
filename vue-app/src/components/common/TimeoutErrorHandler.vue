<script>
import moduleTypes from '../../store/modules/types';
import {mapActions} from 'vuex';
import infoModalMessages from '../../util/infoModalMessages';
import playerSessionTypes from '../../store/modules/PlayerBetslipsSessionModule/types';
import ModalUsageMixin from '../../mixins/ModalUsageMixin';
import TimeOutMixin from '../../mixins/TimeOutMixin';
import compose from 'ramda/es/compose';

const DEFAULT_DURATION = 20000;

export default {
  name: 'TimeoutErrorHandler',
  props: {
    isErrorState: {
      type: Boolean,
      default: false,
      required: true
    },
    priorityState: {
      default: false,
      type: Boolean,
    },
    duration: {
      default: DEFAULT_DURATION,
      type: Number,
      required: true
    },
    hideOnError: {
      default: true,
      type: Boolean,
    }
  },
  mixins: [ ModalUsageMixin, TimeOutMixin ],
  render() {
    return this.showScopedSlot ? this.$scopedSlots.default() : null;
  },
  computed: {
    calculateDuration() {
      return this.priorityState ? DEFAULT_DURATION : this.duration;
    },
    showScopedSlot() {
      return (!this.isErrorState || !this.hideOnError) && this.$scopedSlots.default;
    },
  },
  methods: {
    ...mapActions(moduleTypes.PLAYER_SESSION_MODULE, {
      disableLiveDrawScreen: playerSessionTypes.actions.DISABLE_LIVE_DRAW_SCREEN,
    }),
    shouldSetTimeout(newValue) {
      return this.priorityState || newValue && !this.priorityState;
    },
    timeoutComplete() {
      this.triggerInfoModal(infoModalMessages.liveDrawUnavailableWarning, this.disableLiveDrawScreen, true);
    },
  },
  watch: {
    isErrorState: {
      handler(newState) {
        compose(this.timerDependencyPropHandler, this.shouldSetTimeout)(newState);
      },
      immediate: true
    }
  }
}
</script>
