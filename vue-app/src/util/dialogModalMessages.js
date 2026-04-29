import {modalTypes, modalTypesToIcons} from './infoModalConstants';

export default {
  switchApplication: {
    title: 'exitApplication',
    type: modalTypes.DIALOG,
    icon: modalTypesToIcons[modalTypes.DIALOG],
    message: {
      translationLabel: 'switchApplicationModalMessage'
    },
  },
  clearBetslip: {
    title: 'clearBetslip',
    type: modalTypes.DIALOG,
    icon: modalTypesToIcons[modalTypes.DIALOG],
    message: {
      translationLabel: 'clearBetslipWarningModalMessage'
    },
  },
  clearArea: {
    title: 'clearArea',
    type: modalTypes.DIALOG,
    icon: modalTypesToIcons[modalTypes.DIALOG],
    message: {
      translationLabel: 'clearBetAreaWarningModalMessage'
    },
  },
  returnToLobby: {
    title: 'returnToLobby',
    type: modalTypes.DIALOG,
    icon: modalTypesToIcons[modalTypes.DIALOG],
    message: {
      translationLabel: 'returnToLobbyWarningModalMessage'
    },
  },
  cashOut: {
    title: 'cashOut',
    type: modalTypes.DIALOG,
    icon: modalTypesToIcons[modalTypes.DIALOG],
    message: {
      translationLabel: 'cashOutModalMessage'
    },
  },
  deleteArea: {
    title: 'clearArea',
    type: modalTypes.DIALOG,
    icon: modalTypesToIcons[modalTypes.DIALOG],
    message: {
      translationLabel: 'deleteBetAreaWarningModalMessage'
    },
  },
  replayWager: {
    title: 'replayWager',
    type: modalTypes.DIALOG,
    icon: modalTypesToIcons[modalTypes.DIALOG],
    message: {
      translationLabel: 'replayWagerWarningModalMessage'
    },
  },
};
