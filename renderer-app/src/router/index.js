import { createRouter, createWebHistory } from 'vue-router';
import ROUTE_NAMES from '../constants/routeNames';
import gtmEvents from '@/constants/gtmEvents';
import gaService from '@/services/gaService';

const routes = [
  {
    path: '/easy',
    component: () => import('@/layouts/EasyLayout.vue'),
    children: [
      {
        path: '',
        redirect: { name: ROUTE_NAMES.EASY_HOME },
      },
      {
        path: 'home',
        name: ROUTE_NAMES.EASY_HOME,
        component: () => import('@/pages/Home.vue'),
      },
      {
        path: 'games',
        name: ROUTE_NAMES.EASY_GAMES,
        component: () => import('@/pages/GamesScreen.vue'),
      },
      {
        path: 'rewards',
        name: ROUTE_NAMES.EASY_REWARDS,
        component: () => import('@/pages/Rewards.vue'),
      },
      {
        path: 'help',
        name: ROUTE_NAMES.EASY_HELP,
        component: () => import('@/pages/Help.vue'),
      },
      {
        path: 'settings',
        name: ROUTE_NAMES.EASY_SETTINGS,
        component: () => import('@/pages/Settings.vue'),
      },
      {
        path: 'privacy',
        name: ROUTE_NAMES.EASY_PRIVACY,
        component: () => import('@/pages/Privacy.vue'),
      },
    ],
  },
  {
    path: '/pro',
    component: () => import('@/layouts/ProLayout.vue'),
    children: [
      {
        path: '',
        redirect: { name: ROUTE_NAMES.PRO_HOME },
      },
      {
        path: 'home',
        name: ROUTE_NAMES.PRO_HOME,
        component: () => import('@/pages/ProHome.vue'),
      },
      {
        path: 'games',
        name: ROUTE_NAMES.PRO_GAMES,
        component: () => import('@/pages/GamesScreen.vue'),
        children: [
          {
            path: 'kino',
            name: ROUTE_NAMES.PRO_GAME_KINO,
          },
          {
            path: 'tzoker',
            name: ROUTE_NAMES.PRO_GAME_TZOKER,
          },
          {
            path: 'eurojackpot',
            name: ROUTE_NAMES.PRO_GAME_EUROJACKPOT,
            component: () => import('@/components/Games/Eurojackpot/EurojackpotGame.vue'),
          },
          {
            path: 'powerspin',
            name: ROUTE_NAMES.PRO_GAME_POWERSPIN,
            component: () => import('@/components/Games/Powerspin/PowerspinGame.vue'),
          },
          {
            path: 'fireblaze',
            name: ROUTE_NAMES.PRO_GAME_FIREBLAZE,
            component: () => import('@/components/Games/Fireblaze/FireblazeGame.vue'),
          },
        ],
      },
      {
        path: 'rewards',
        name: ROUTE_NAMES.PRO_REWARDS,
        component: () => import('@/pages/Rewards.vue'),
      },
      {
        path: 'help',
        name: ROUTE_NAMES.PRO_HELP,
        component: () => import('@/pages/Help.vue'),
      },
      {
        path: 'settings',
        name: ROUTE_NAMES.PRO_SETTINGS,
        component: () => import('@/pages/Settings.vue'),
      },
      {
        path: 'privacy',
        name: ROUTE_NAMES.PRO_PRIVACY,
        component: () => import('@/pages/Privacy.vue'),
      },
    ],
  },
  {
    path: '/idle-screen',
    name: 'idle-screen',
    component: () => import('@/pages/IdleScreen.vue'),
  },
  {
    path: '/',
    redirect: '/easy',
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/easy',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((to, from) => {
  const routeName = to.name;
  if (!routeName) return;

  const parts = String(routeName).split('-');
  const mode = parts[0];
  const pageName = parts[1] || routeName;

  if (!from.name) return;

  gaService.sendEvent(gtmEvents.SSBT_DGE_APPLICATION_ROUTE_ENTERED, {
    route_name: routeName,
    page_name: pageName,
    layout_mode: mode,
    path: to.path,
    from_route: from?.name || null,
  });
});

export default router;
