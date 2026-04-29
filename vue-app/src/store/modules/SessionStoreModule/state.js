const state = {
  accessToken: localStorage.getItem('accessToken'),
  balance: parseFloat(localStorage.getItem('balance')) || 0,
  ssbtId: '',
  gameType: '',
  savedKinoBetslip: null,
  balanceVisibility: true,
};

export default state;
