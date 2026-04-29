export default class PrizeCheck {
  constructor(ticketStatus, error) {
    this.ticketStatus = ticketStatus;
    this.error = error;
    this.isValid = !(this.error !== undefined);
  }
}
