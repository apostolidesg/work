import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createStore } from 'vuex';
import { useSession } from '@/composables/useSession';
import SessionStoreModule from '@/store/modules/SessionStoreModule';
import moduleTypes from '@/store/modules/types/types';

vi.mock('vuex', async () => {
  const actual = await vi.importActual('vuex');
  return {
    ...actual,
    useStore: vi.fn(),
  };
});

import { useStore } from 'vuex';

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
vi.stubGlobal('localStorage', localStorageMock);

describe('useSession', () => {
  let store;

  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);

    store = createStore({
      modules: {
        [moduleTypes.SESSION_STORE_MODULE]: {
          ...SessionStoreModule,
          state: () => ({
            accessToken: '',
            balance: 0,
            ssbtId: '',
            gameType: '',
            savedKinoBetslip: null,
            balanceVisibility: true,
          }),
        },
      },
    });

    useStore.mockReturnValue(store);
  });

  it('returns initial balance as zero', () => {
    const { balance, isZeroBalance } = useSession();

    expect(balance.value).toBe(0);
    expect(isZeroBalance.value).toBe(true);
  });

  it('updates balance when setBalance is called', async () => {
    const { balance, isZeroBalance, setBalance } = useSession();

    await setBalance(100);

    expect(balance.value).toBe(100);
    expect(isZeroBalance.value).toBe(false);
  });

  it('resets balance to zero', async () => {
    const { balance, setBalance, resetBalance } = useSession();

    await setBalance(50);
    expect(balance.value).toBe(50);

    await resetBalance();
    expect(balance.value).toBe(0);
  });

  it('manages access token', async () => {
    const { accessToken, setAccessToken, resetAccessToken } = useSession();

    expect(accessToken.value).toBe('');

    await setAccessToken('test-token-123');
    expect(accessToken.value).toBe('test-token-123');

    await resetAccessToken();
    expect(accessToken.value).toBe('');
  });

  it('tracks active session correctly', async () => {
    const { hasActiveSession, setBalance, setAccessToken } = useSession();

    expect(hasActiveSession.value).toBe(false);

    await setBalance(100);
    expect(hasActiveSession.value).toBe(false);

    await setAccessToken('token');
    expect(hasActiveSession.value).toBe(true);
  });

  it('manages game type', async () => {
    const { gameType, isKinoGame, setGameType } = useSession();

    expect(gameType.value).toBe('');
    expect(isKinoGame.value).toBe(false);

    await setGameType('KINO');
    expect(gameType.value).toBe('KINO');
    expect(isKinoGame.value).toBe(true);

    await setGameType('POWERSPIN');
    expect(gameType.value).toBe('POWERSPIN');
    expect(isKinoGame.value).toBe(false);
  });

  it('toggles balance visibility', async () => {
    const { isBalanceVisible, toggleBalanceVisibility } = useSession();

    expect(isBalanceVisible.value).toBe(true);

    await toggleBalanceVisibility();
    expect(isBalanceVisible.value).toBe(false);

    await toggleBalanceVisibility();
    expect(isBalanceVisible.value).toBe(true);
  });
});
