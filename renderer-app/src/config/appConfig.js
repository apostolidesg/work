import navHome from '../assets/icons/sidebarIcons/NavHome.svg?raw';
import navGames from '../assets/icons/sidebarIcons/NavGames.svg?raw';
// import navRewards from '../assets/icons/sidebarIcons/NavRewards.svg?raw';
import navHelp from '../assets/icons/sidebarIcons/NavHelp.svg?raw';
// import navPrivacy from '../assets/icons/sidebarIcons/NavPrivacy.svg?raw';

import RGAllFull from '../assets/icons/RG_badge-new.svg';
import RGAllsmall from '../assets/icons/RGAll-small.png';
import allwynLogoFull from '../assets/logos/allyWinlogo.svg';
import allwynLogoSmall from '../assets/logos/allyWinlogo.svg';

import mainBgPowerspin from '../assets/images/Horizontal-powerspin-BG.jpg';
import proBackground from '../assets/images/pro-background.jpg';
import easyHorizontalBackground from '../assets/images/easy-horizontal-background.jpg';
import easyVerticalBackground from '../assets/images/easy-vertical-background.png';

export const APP_CONFIG = {
  header: {
    height: '100px',
    defaultBg: '#ffffff',
    defaultBorder: '#e5e7eb',
  },
  sidebar: {
    expandedWidth: 'w-60',
    collapsedWidth: 'w-20',
    defaultTheme: 'default',
  },
};

export const EXTERNAL_ASSETS = {
  logo: '/assets/svg/opap-logo.svg',
  easyHorizontalBackground: easyHorizontalBackground,
  easyVerticalBackground: easyVerticalBackground,
  proBackground: proBackground,
  rgBadgeFull: RGAllFull,
  rgBadgeSmall: RGAllsmall,
  qrCodePlaceholder: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg',
  allwynLogoFull: allwynLogoFull,
  allwynLogoSmall: allwynLogoSmall,
  powerspinBackground: mainBgPowerspin,
};

export const NAV_ITEMS = [
  { svgIcon: navHome, label: 'nav.home', translationKey: 'nav.home', hasDivider: false },
  { svgIcon: navGames, label: 'nav.games', translationKey: 'nav.games', hasDivider: false },
  // { svgIcon: navRewards, label: 'nav.rewards', translationKey: 'nav.rewards', hasDivider: false },
  { svgIcon: navHelp, label: 'nav.help', translationKey: 'nav.help', hasDivider: false },
];

export const BOTTOM_NAV_ITEMS = [
  // { svgIcon: navPrivacy, label: 'nav.privacy', translationKey: 'nav.privacy', hasDivider: true },
];
