import TicketStatus from '../../../../src/model/TicketStatus';

describe('TicketStatus.js', () => {
  it('should decide that a ticket belongs to low tier', () => {
    const ticket = {
      serialNumber: '32212255153489660940270977293157661',
      playedInCyprus: false,
      status: 'WON',
      firstDrawNumber: 350,
      cost: 0.25,
      gross: 29.3,
      net: 29.3,
      refund: 0,
      endDrawNumber: 350,
      remainingDraws: 0,
      tax: 0,
    };
    const ticketStatus = new TicketStatus(ticket);
    expect(ticketStatus.tier).to.equal('low');
  });

  it('should decide that a ticket belongs to mid tier', () => {
    const ticket = {
      serialNumber: '32212255153489660940270977293157661',
      playedInCyprus: false,
      status: 'WON',
      firstDrawNumber: 350,
      cost: 0.25,
      gross: 1700,
      net: 700,
      refund: 0,
      endDrawNumber: 350,
      remainingDraws: 0,
      tax: 0,
    };
    const ticketStatus = new TicketStatus(ticket);
    expect(ticketStatus.tier).to.equal('mid');
  });

  it('should decide that a ticket belongs to high tier', () => {
    const ticket = {
      serialNumber: '32212255153489660940270977293157661',
      playedInCyprus: false,
      status: 'WON',
      firstDrawNumber: 350,
      cost: 0.25,
      gross: 2000,
      net: 2000,
      refund: 0,
      endDrawNumber: 350,
      remainingDraws: 0,
      tax: 0,
    };
    const ticketStatus = new TicketStatus(ticket);
    expect(ticketStatus.tier).to.equal('high');
  });

  it('should decide that a ticket belongs to special tier', () => {
    const ticket = {
      serialNumber: '32212255153489660940270977293157661',
      playedInCyprus: false,
      status: 'WON',
      firstDrawNumber: 350,
      cost: 0.25,
      gross: 200000,
      net: 200000,
      refund: 0,
      endDrawNumber: 350,
      remainingDraws: 0,
      tax: 0,
    };
    const ticketStatus = new TicketStatus(ticket);
    expect(ticketStatus.tier).to.equal('special');
  });
});
