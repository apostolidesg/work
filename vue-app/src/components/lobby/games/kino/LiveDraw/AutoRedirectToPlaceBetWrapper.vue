<script>
import moduleTypes from '../../../../../store/modules/types'
import playerSessionTypes from '../../../../../store/modules/PlayerBetslipsSessionModule/types'
import infoModalMessages from '../../../../../util/infoModalMessages'
import { mapGetters, mapActions } from 'vuex'
import ModalUsageMixin from '../../../../../mixins/ModalUsageMixin'
import TimeOutMixin from '../../../../../mixins/TimeOutMixin'
import configurationModuleTypes from '../../../../../store/modules/ConfigurationStoreModule/types'

export default {
  name: 'AutoRedirectToPlaceBetWrapper',
  mixins: [ ModalUsageMixin, TimeOutMixin ],
  computed: {
    ...mapGetters(moduleTypes.CONFIGURATION_STORE_MODULE, {
      getConfiguration: configurationModuleTypes.getters.GET_CONFIGURATION
    }),
    ...mapGetters(moduleTypes.PLAYER_SESSION_MODULE, {
      getAutoRedirectAfterDraw: playerSessionTypes.getters.GET_AUTO_REDIRECT_AFTER_DRAW
    }),
    calculateDuration () {
      return this.getConfiguration.KINO.LIVE_DRAW.AVAILABLE_TIME_FRAME_BEFORE_AUTO_REDIRECT_POPUP_TRIGGERS_MILLIS
    }
  },
  watch: {
    getAutoRedirectAfterDraw: {
      handler (newState) {
        this.timerDependencyPropHandler(newState)
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions(moduleTypes.PLAYER_SESSION_MODULE, {
      disableLiveDrawScreen: playerSessionTypes.actions.DISABLE_LIVE_DRAW_SCREEN
    }),
    disableAutoRedirectAndLiveDrawScreen () {
      this.disableLiveDrawScreen()
    },
    timeoutComplete () {
      this.triggerInfoModal(infoModalMessages.autoRedirectToPlaceBetWarning, this.disableAutoRedirectAndLiveDrawScreen, true)
    }
  },
  render () {
    return this.$scopedSlots.default && this.$scopedSlots.default()
  }
}
</script>
