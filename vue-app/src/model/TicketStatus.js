import Constants from '../util/Constants';

export default class TicketStatus {
  constructor(ticket) {
    this.ticket = ticket;
    this.normalizeStatus();
    this.tier = this.calculateTier(ticket.gross);
  }

  normalizeStatus() {
    if (this.ticket.status === Constants.FIND_WINNINGS.TICKET_STATUS.WON && this.ticket?.barcode && this.ticket?.barcode[31] === '2') {
      this.ticket.gross === 0 &&
      this.ticket.net === 0 ?  this.ticket.status = Constants.FIND_WINNINGS.TICKET_STATUS.COPY_CLAIMED: this.ticket.status = Constants.FIND_WINNINGS.TICKET_STATUS.COPY;
    } else if (
      this.ticket.status === Constants.FIND_WINNINGS.TICKET_STATUS.WON &&
      this.ticket.gross === 0 &&
      this.ticket.net === 0
    ) {
      this.ticket.status = Constants.FIND_WINNINGS.TICKET_STATUS.CLAIMED;
    }
  }

  calculateTier(gross) {
    const { type = '' } = Constants.findWinnings.tiers.find(({ lowLimitInclusive, highLimitExlusive }) =>
      this.isBetween(gross, lowLimitInclusive, highLimitExlusive)
    ) || {};
    return type;
  }

  isBetween(amount, from, to) {
    if (from === undefined && amount < to)
      return true;
    else if (from <= amount && amount < to)
      return true;
    else if (from <= amount && to === undefined)
      return true;
    return false;
  }
}
