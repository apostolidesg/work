import { modalTypes, modalTypesToIcons } from '@/constants/modal';

export const infoModalMessages = {
  invalidBarcode: {
    title: 'warningModalTitle',
    type: modalTypes.ERROR,
    icon: modalTypesToIcons[modalTypes.ERROR],
    message: {
      translationLabel: 'invalidBarcodeWarningMessage',
    },
  },
  switchApplicationWarningLobby: {
    title: 'switchApplicationWarningTitle',
    type: modalTypes.INFO,
    icon: modalTypesToIcons[modalTypes.INFO],
    message: {
      translationLabel: 'switchApplicationWarningMessageLobby',
    },
  },
  switchApplicationWarningInGame: {
    title: 'switchApplicationWarningTitle',
    type: modalTypes.INFO,
    icon: modalTypesToIcons[modalTypes.INFO],
    message: {
      translationLabel: 'switchApplicationWarningMessageInGame',
    },
  },
  usedVoucher: {
    title: 'voucherUsedWarningTitle',
    type: modalTypes.INFO,
    icon: modalTypesToIcons[modalTypes.INFO],
    message: {
      translationLabel: 'voucherUsedWarningMessage',
    },
  },
  quickBetsKino: {
    title: 'readyTickets',
    type: modalTypes.INFO,
    icon: null,
    message: { translationLabel: 'quickBetsKinoText' },
  },
  quickBetsPowerspin: {
    title: 'readyTickets',
    type: modalTypes.INFO,
    icon: null,
    message: { translationLabel: 'quickBetsPowerspinText' },
  },
  paidVoucher: {
    title: 'informationModalTitle',
    type: modalTypes.INFO,
    icon: modalTypesToIcons[modalTypes.INFO],
    message: {
      translationLabel: 'voucherPaidWarningMessage',
    },
  },
  notAllowedVoucher: {
    title: 'voucherNotAllowedWarningTitle',
    type: modalTypes.INFO,
    icon: modalTypesToIcons[modalTypes.INFO],
    message: {
      translationLabel: 'voucherNotAllowedWarningMessage',
    },
  },
  insufficientBalance: {
    title: 'informationModalTitle',
    type: modalTypes.INFO,
    icon: modalTypesToIcons[modalTypes.INFO],
    message: {
      translationLabel: 'balanceWarningModalMessage',
    },
  },
  placeBetError: {
    title: 'placeBetErrorTitle',
    type: modalTypes.ERROR,
    icon: modalTypesToIcons[modalTypes.ERROR],
    message: {
      translationLabel: 'placeBetErrorMessage',
    },
  },
  placeBetUnavailable: {
    title: 'placeBetErrorTitle',
    type: modalTypes.ERROR,
    icon: modalTypesToIcons[modalTypes.ERROR],
    message: {
      translationLabel: 'placeBetUnavailableWarningMessage',
    },
  },
  maxConsecutiveDrawsError: {
    title: 'placeBetErrorTitle',
    type: modalTypes.ERROR,
    icon: modalTypesToIcons[modalTypes.ERROR],
    message: {
      translationLabel: 'maxConsecutiveDrawsErrorMessage',
    },
  },
  invalidPicks: {
    title: 'invalidPicksWarningModalTitle',
    type: modalTypes.INFO,
    icon: modalTypesToIcons[modalTypes.INFO],
    message: {
      translationLabel: 'invalidPicksWarningModalMessage',
    },
  },
  cashInLimitExceeded(walletLimit) {
    return {
      title: 'informationModalTitle',
      type: modalTypes.INFO,
      icon: modalTypesToIcons[modalTypes.INFO],
      message: {
        translationLabel: 'cashInLimitExceededErrorMessage',
        params: { walletLimit: `${walletLimit}€` },
      },
    };
  },
  operationFailed: {
    title: 'warningModalTitle',
    type: modalTypes.ERROR,
    icon: modalTypesToIcons[modalTypes.ERROR],
    message: {
      translationLabel: 'operationFailedWarningMessage',
    },
  },
  printerErrorWarning: {
    title: 'printerErrorTitle',
    type: modalTypes.ERROR,
    icon: modalTypesToIcons[modalTypes.ERROR],
    message: {
      translationLabel: 'printerErrorMessage',
    },
  },
  barcodeReaderWarning: {
    title: 'bcrErrorWarningTitle',
    type: modalTypes.SCAN_ERROR,
    icon: modalTypesToIcons[modalTypes.SCAN_ERROR],
    message: {
      translationLabel: 'bcrErrorWarningMessage',
    },
  },
  technicalProblemWarning: {
    title: 'technicalProblemTitle',
    type: modalTypes.ERROR,
    icon: modalTypesToIcons[modalTypes.ERROR],
    message: {
      translationLabel: 'technicalProblem',
    },
  },
  opapBetCardWarning: {
    title: 'opapBetCardWarningTitle',
    type: modalTypes.INFO,
    icon: modalTypesToIcons[modalTypes.INFO],
    message: {
      translationLabel: 'opapBetCardWarning',
    },
  },
  liveDrawSessionEnd: {
    title: 'nextSteps',
    type: modalTypes.INFO,
    icon: modalTypesToIcons[modalTypes.INFO],
    message: {
      translationLabel: 'liveDrawSessionEnd',
    },
  },
  liveDrawUnavailableWarning: {
    title: 'liveDrawUnavailableTitle',
    type: modalTypes.INFO,
    icon: modalTypesToIcons[modalTypes.INFO],
    message: {
      translationLabel: 'liveDrawUnavailable',
    },
  },
  autoRedirectToPlaceBetWarning: {
    title: 'autoRedirectFromLiveDrawTitle',
    type: modalTypes.INFO,
    icon: modalTypesToIcons[modalTypes.INFO],
    message: {
      translationLabel: 'autoRedirectFromLiveDraw',
    },
  },
  liveDrawWinning: {
    title: 'scanYourWinningTitle',
    type: modalTypes.WINNING,
    icon: null,
    message: {
      translationLabel: 'scanYourWinningTickets',
    },
  },
  kinoInformativeNextDrawBets: {
    title: 'kinoInformativeNextDrawBetsTitle',
    type: modalTypes.INFO,
    icon: modalTypesToIcons[modalTypes.INFO],
    message: {
      translationLabel: 'kinoInformativeNextDrawBetsMessage',
    },
  },
  powerspinInformativeNextDrawBets: {
    title: 'powerspinInformativeNextDrawBetsTitle',
    type: modalTypes.INFO,
    icon: modalTypesToIcons[modalTypes.INFO],
    message: {
      translationLabel: 'powerspinInformativeNextDrawBetsMessage',
    },
  },
  fireblazeInformativeNextDrawBets: {
    title: 'fireblazeInformativeNextDrawBetsTitle',
    type: modalTypes.INFO,
    icon: modalTypesToIcons[modalTypes.INFO],
    message: {
      translationLabel: 'fireblazeInformativeNextDrawBetsMessage',
    },
  },
  powerspinRequestedNumbersNotAllowedInCombo: {
    title: 'warningModalTitle',
    type: modalTypes.INFO,
    icon: modalTypesToIcons[modalTypes.INFO],
    message: {
      translationLabel: 'powerspinRequestedNumbersNotAllowedInComboMessage',
    },
  },
  eurojackpotInformativeNextDrawBets: {
    title: 'eurojackpotInformativeNextDrawBetsTitle',
    type: modalTypes.INFO,
    icon: modalTypesToIcons[modalTypes.INFO],
    message: {
      translationLabel: 'eurojackpotInformativeNextDrawBetsMessage',
    },
  },
  confirmReplayGroupPlay: {
    title: 'confirmReplayGroupPlay',
    type: modalTypes.DIALOG,
    icon: modalTypesToIcons[modalTypes.CONFIRM],
    message: {
      translationLabel: 'confirmReplayGroupPlayModalMessage',
    },
  },
  instantWinInformativeNextDrawBets: {
    type: modalTypes.INSTANT_WIN,
    icon: modalTypesToIcons[modalTypes.INFO],
    message: {
      translationLabel: 'instantWinInformativeNextDrawBetsMessage',
      description: 'instantWinDescriptionMessage',
      alert: 'instantWinAlertMessage',
    },
  },
  kinoTerms: {
    title: 'termsAndConditions',
    message: { translationLabel: 'allwynKinoTermsAndConditionsText' },
  },
  powerspinTerms: {
    title: 'termsAndConditions',
    message: { translationLabel: 'allwynPowerspinTermsAndConditionsText' },
  },
  eurojackpotTerms: {
    title: 'termsAndConditions',
    message: { translationLabel: 'allwynEurojackpotTermsAndConditionsText' },
  },
  responsibleGaming: {
    title: 'responsibleGaming',
    message: { translationLabel: 'allwynResponsibleGamingText' },
  },
  fireblazeTerms: {
    title: 'termsAndConditions',
    message: { translationLabel: 'allwynFireblazeTermsAndConditionsText' },
  },
};

export const dialogModalMessages = {
  switchApplication: {
    title: 'exitApplication',
    type: modalTypes.DIALOG,
    icon: modalTypesToIcons[modalTypes.DIALOG],
    message: {
      translationLabel: 'switchApplicationModalMessage',
    },
    closable: false,
  },
  clearBetslip: {
    title: 'clearBetslip',
    type: modalTypes.DIALOG,
    icon: modalTypesToIcons[modalTypes.DIALOG],
    message: {
      translationLabel: 'clearBetslipWarningModalMessage',
    },
    closable: false,
  },
  clearArea: {
    title: 'clearArea',
    type: modalTypes.DIALOG,
    icon: modalTypesToIcons[modalTypes.DIALOG],
    message: {
      translationLabel: 'clearBetAreaWarningModalMessage',
    },
    closable: false,
  },
  returnToLobby: {
    title: 'returnToLobby',
    type: modalTypes.DIALOG,
    icon: modalTypesToIcons[modalTypes.DIALOG],
    message: {
      translationLabel: 'returnToLobbyWarningModalMessage',
    },
    closable: false,
  },
  cashOut: {
    title: 'cashOut',
    type: modalTypes.DIALOG,
    icon: modalTypesToIcons[modalTypes.DIALOG],
    message: {
      translationLabel: 'cashOutModalMessage',
    },
    closable: false,
  },
  deleteArea: {
    title: 'clearArea',
    type: modalTypes.DIALOG,
    icon: modalTypesToIcons[modalTypes.DIALOG],
    message: {
      translationLabel: 'deleteBetAreaWarningModalMessage',
    },
    closable: false,
  },
  replayWager: {
    title: 'replayWager',
    type: modalTypes.DIALOG,
    icon: modalTypesToIcons[modalTypes.DIALOG],
    message: {
      translationLabel: 'replayWagerWarningModalMessage',
    },
    closable: false,
  },
};
