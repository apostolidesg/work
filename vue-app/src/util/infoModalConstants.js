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
};

export const modalTypesToIcons = {
  [modalTypes.INFO]: { icon: modalIcons.INFO},
  [modalTypes.CONFIRM]: { icon: modalIcons.CONFIRM},
  [modalTypes.ERROR]: { icon: modalIcons.ERROR},
  [modalTypes.DIALOG]: { icon: modalIcons.DIALOG},
  [modalTypes.SCAN_ERROR]: { image: 'barcode_gun_error_barcode-scan-white.png'},
};
