export const modalTypes = {
  INFO: 'INFO',
  CONFIRM: 'CONFIRM',
  ERROR: 'ERROR',
  DIALOG: 'DIALOG',
  WINNING: 'WINNING',
  SCAN_ERROR: 'SCAN_ERROR',
  INSTANT_WIN: 'INSTANT_WIN',
};

export const modalIcons = {
  INFO: 'info',
  CONFIRM: 'check',
  ERROR: 'times',
  DIALOG: 'question',
  SCAN_ERROR: 'barcodeScan',
};

export const modalTypesToIcons = {
  [modalTypes.INFO]: modalIcons.INFO,
  [modalTypes.CONFIRM]: modalIcons.CONFIRM,
  [modalTypes.ERROR]: modalIcons.ERROR,
  [modalTypes.DIALOG]: modalIcons.DIALOG,
  [modalTypes.SCAN_ERROR]: modalIcons.SCAN_ERROR,
};
