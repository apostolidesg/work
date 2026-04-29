import eventHubConstants from '../constants/eventHub';
// Temporary abstructed findwinnings solution to prevent the user from using kino system tickets
export default {
  data() {
    return {
      kinoSystemTicketMixin_isSystem: false,
      kinoSystemTicketMixin_loading: false,
    };
  },
  created() {
    this.$eventHub.$on(eventHubConstants.FIND_WINNINGS_WAGER_DETAILS, this.$_kinoSystemTicketMixin_handler);
  },
  methods: {
    $_kinoSystemTicketMixin_getWager({ wagerId = '' } = {}) {
      this.kinoSystemTicketMixin_loading = true;
      this.$eventHub.$emit(eventHubConstants.GET_WAGER, wagerId, false, true);
    },
    $_kinoSystemTicketMixin_handler({ kinoSystemEnabled = false } = {}) {
      this.kinoSystemTicketMixin_loading = false;
      this.kinoSystemTicketMixin_isSystem = kinoSystemEnabled;
    },
    $_kinoSystemTicketMixin_reset() {
      this.kinoSystemTicketMixin_isSystem = false;
    },
  },
  beforeDestroy() {
    this.$eventHub.$off(eventHubConstants.FIND_WINNINGS_WAGER_DETAILS);
  },
};
