import VueRouter from 'vue-router';
import Vue from 'vue';
import Lobby from '../components/lobby/Lobby.vue';
import KinoGame from '../components/lobby/games/kino/KinoGame.vue';
import Powerspin from '../components/lobby/games/Powerspin/Powerspin.vue';
import Fireblaze from '../components/lobby/games/fireblaze/Fireblaze.vue';
import Eurojackpot from '../components/lobby/games/eurojackpot/Eurojackpot.vue';
import KinoQuickplay from '../components/digitalAssistant/Kino/KinoQuickplay.vue';
import PowerspinQuickplay from '../components/digitalAssistant/Powerspin/PowerspinQuickplay.vue';
import PowerspinQuickbets from '../components/digitalAssistant/Powerspin/PowerspinQuickbets.vue';
import KinoQuickbets from '../components/digitalAssistant/Kino/KinoQuickbets.vue';
import store from '../store/store';
import playerSessionTypes from '../store/modules/PlayerBetslipsSessionModule/types';
import Constants from '../util/Constants';
import BookOfGamesPage from '../components/lobby/bookOfGames/BookOfGamesPage.vue';
import MainFaq from '../components/digitalAssistant/faq/MainFaq.vue';
import KinoFaq from '../components/digitalAssistant/faq/kino/KinoFaq.vue';
import PowerSpinFaq from '../components/digitalAssistant/faq/Powerspin/PowerSpinFaq.vue';
import FaqText from '../components/digitalAssistant/faq/FaqText.vue';
import Help from '../components/digitalAssistant/faq/help/Help.vue';
import DigitalAssistant from '../components/digitalAssistant/DigitalAssistant.vue';
import Screensaver from '../components/Screensaver.vue';
import HelpSection from '../components/digitalAssistant/howTo/HelpSection.vue';
import HowToLobby from '../components/digitalAssistant/howTo/HowToLobby.vue';
import KinoVideos from '../components/digitalAssistant/howTo/KinoVideos.vue';
import PowerspinVideos from '../components/digitalAssistant/howTo/PowerspinVideos.vue';
import { loadConfiguration } from '../util/electronUtils';
Vue.use(VueRouter);

const cleanUpLiveDrawData = () => store.dispatch(playerSessionTypes.namespaceMapper.INIT_PLAYER_SESSION_STATE);
const fromGamesToLobby = (name) =>
  name === Constants.ROUTE_NAMES.KINO ||
  name === Constants.ROUTE_NAMES.POWERSPIN ||
  name === Constants.ROUTE_NAMES.EUROJACKPOT;
const fromLobbyToGames = (name) => !name || name === Constants.ROUTE_NAMES.LOBBY;

const resolveHomeComponent = async () => {
  try {
    const config = await loadConfiguration();
    if (config?.vue?.DIGITAL_ASSISTANT?.DIGITAL_ASSISTANT_ENABLED) {
      return DigitalAssistant;
    }
  } catch (error) {
    console.log(error);
  }
  return Lobby;
};

const beforeEnterLobby = async (to, from, next) => {
  fromGamesToLobby(from) && cleanUpLiveDrawData();
  next();
};
const beforeEnterGames = (to, { name }, next) => {
  fromLobbyToGames(name) && cleanUpLiveDrawData();
  next();
};

const routes = [
  {
    path: '/',
    name: Constants.ROUTE_NAMES.LOBBY,
    component: () => resolveHomeComponent(),
    beforeEnter: beforeEnterLobby,
  },
  {
    path: '/kino-quickplay',
    name: Constants.ROUTE_NAMES.KINO_QUICKPLAY,
    component: KinoQuickplay,
    beforeEnter: beforeEnterLobby,
  },
  {
    path: '/quickbets',
    name: Constants.ROUTE_NAMES.QUICKBETS,
    component: KinoQuickbets,
    beforeEnter: beforeEnterLobby,
  },
  {
    path: '/powerspin-quickplay',
    name: Constants.ROUTE_NAMES.POWERSPIN_QUICKPLAY,
    component: PowerspinQuickplay,
    beforeEnter: beforeEnterLobby,
  },
  {
    path: '/powerspin-quickbets',
    name: Constants.ROUTE_NAMES.POWERSPIN_QUICKBETS,
    component: PowerspinQuickbets,
    beforeEnter: beforeEnterLobby,
  },
  {
    path: '/kino',
    name: Constants.ROUTE_NAMES.KINO,
    component: KinoGame,
    beforeEnter: beforeEnterGames,
  },
  {
    path: '/powerspin',
    name: Constants.ROUTE_NAMES.POWERSPIN,
    component: Powerspin,
    beforeEnter: beforeEnterGames,
  },
  {
    path: '/fireblaze',
    name: Constants.ROUTE_NAMES.FIREBLAZE,
    component: Fireblaze,
    beforeEnter: beforeEnterGames,
  },
  {
    path: '/eurojackpot',
    name: Constants.ROUTE_NAMES.EUROJACKPOT,
    component: Eurojackpot,
    beforeEnter: beforeEnterGames,
  },
  {
    path: '/book-of-games',
    name: Constants.ROUTE_NAMES.BOOK_OF_GAMES,
    component: BookOfGamesPage,
  },
  {
    path: '/main-faq',
    name: 'mainfaq',
    component: MainFaq,
    props: true,
  },
  {
    path: '/kino-faq',
    name: Constants.ROUTE_NAMES.KINO_FAQ,
    component: KinoFaq,
    props: true,
  },
  {
    path: '/:type/kino/:id',
    name: Constants.ROUTE_NAMES.KINO_FAQ_DETAILS,
    component: FaqText,
    props: true,
  },
  {
    path: '/:type/powerspin/:id',
    name: Constants.ROUTE_NAMES.POWERSPIN_FAQ_DETAILS,
    component: FaqText,
    props: true,
  },
  {
    path: '/powerspin-faq',
    name: Constants.ROUTE_NAMES.POWERSPIN_FAQ,
    component: PowerSpinFaq,
    props: true,
  },
  {
    path: '/helpFaq',
    name: Constants.ROUTE_NAMES.HELP_FAQ,
    component: Help,
    props: true,
  },
  {
    path: '/:type/helpFaq/:id',
    name: Constants.ROUTE_NAMES.HELP_FAQ_DETAILS,
    component: FaqText,
    props: true,
  },
  {
    path: '/screensaver',
    name: Constants.ROUTE_NAMES.SCREENSAVER,
    component: Screensaver,
  },
  {
    path: '/help-section',
    name: Constants.ROUTE_NAMES.HELP_SECTION,
    component: HelpSection,
  },
  {
    path: '/howto-lobby',
    name: Constants.ROUTE_NAMES.HOWTO_LOBBY,
    component: HowToLobby,
  },
  {
    path: '/kino-videos',
    name: Constants.ROUTE_NAMES.KINO_VIDEOS,
    component: KinoVideos,
  },
  {
    path: '/powerspin-videos',
    name: Constants.ROUTE_NAMES.POWERSPIN_VIDEOS,
    component: PowerspinVideos,
  },
];

export default new VueRouter({
  routes,
});
