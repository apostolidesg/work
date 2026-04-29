<script>
import moduleTypes from '../../../../../store/modules/types';
import playerSessionTypes from '../../../../../store/modules/PlayerBetslipsSessionModule/types';
import { mapGetters } from 'vuex';

export default {
  name: 'NextDrawBetsTotalNumber',
  computed: {
    ...mapGetters(moduleTypes.PLAYER_SESSION_MODULE, {
      getNextDrawAvailableBetsCount: playerSessionTypes.getters.GET_NEXT_DRAW_AVAILABLE_BETS_COUNT,
    }),
  },
  render(createElement) {
    return this.getNextDrawAvailableBetsCount ? createElement('i', this.getNextDrawAvailableBetsCount) : null
  }
}
</script>
