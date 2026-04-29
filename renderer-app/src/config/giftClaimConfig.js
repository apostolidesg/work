import powerpin from '@/assets/images/powerspin.png';
import powerspinSymbol from '@/assets/icons/powerspin-symbol.png';
import powerspinlogo from '@/assets/images/powerspin-logo.png';

export const GIFT_ASSETS = {
  symbol: powerspinSymbol,
  giftIcon: powerpin,
  powerspinLogo: powerspinlogo,
};

export const MARKET_OPTIONS = [
  {
    id: 'color',
    label: 'markets.color',
    payout: '€15',
    iconBg: 'bg-gradient-to-br from-green-500 to-green-600',
    textColor: 'text-green-600',
    activeClasses:
      'border-green-500 bg-gradient-to-br from-green-500 to-green-600 text-white shadow-[0_12px_30px_rgba(34,197,94,0.35)]',
  },
  {
    id: 'number',
    label: 'markets.number',
    payout: '€120',
    iconBg: 'bg-gradient-to-br from-red-500 to-red-600',
    textColor: 'text-red-600',
    activeClasses:
      'border-red-500 bg-gradient-to-br from-red-500 to-red-600 text-white shadow-[0_12px_30px_rgba(239,68,68,0.35)]',
  },
  {
    id: 'symbol',
    label: 'markets.symbol',
    payout: '€8',
    iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600',
    textColor: 'text-blue-600',
    activeClasses:
      'border-blue-500 bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-[0_12px_30px_rgba(59,130,246,0.35)]',
  },
];

export const PAYMENT_METHODS = [
  {
    id: 'allwyn',
    label: 'Allwyn Pay',
    disabled: true,
    icon: 'https://www.opapcsr.gr/wp-content/uploads/2025/11/allwyn-1.png',
  },
  {
    id: 'card',
    label: 'Visa / Apple Pay /\nGoogle Pay / Digital\nDebit Card',
    disabled: true,
    icon: 'https://www.opapcsr.gr/wp-content/uploads/2025/11/visa-1.png',
  },
  {
    id: 'pos',
    label: 'POS Terminal',
    disabled: false,
    icon: 'https://www.opapcsr.gr/wp-content/uploads/2025/11/pos.png',
  },
  {
    id: 'voucher',
    label: 'Voucher',
    disabled: true,
    icon: 'https://www.opapcsr.gr/wp-content/uploads/2025/11/voucher.png',
  },
];

export const GIFT_CLAIM_STEPS = {
  CLAIM: 'claim',
  FREEBET: 'freebet',
  PAYMENT: 'payment',
  PROCESSING: 'processing',
  SUCCESS: 'success',
};

export const PROCESSING_DELAY_MS = 2500;

export const powerSpinSrc = GIFT_ASSETS.powerspinLogo;
export const symbolSrc = GIFT_ASSETS.symbol;
export const marketOptions = MARKET_OPTIONS;
export const paymentMethods = PAYMENT_METHODS;
