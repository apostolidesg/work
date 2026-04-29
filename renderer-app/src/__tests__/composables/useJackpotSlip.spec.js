import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref, nextTick } from 'vue';
import { useJackpotSlip } from '../../composables/useJackpotSlip';

function makeBoard(mainNumbers, bonusNumbers = []) {
  return { mainNumbers, bonusNumbers };
}

function makeGameConfig(overrides = {}) {
  const cartBoards = ref([]);
  const betslipCost = ref(1.0);

  const clearAllBoards = vi.fn(() => {
    cartBoards.value = [];
  });
  const shuffleBoard = vi.fn();
  const getBoardCost = vi.fn((i) => i * 0.5);
  const addRandomBoard = vi.fn(() => {
    cartBoards.value = [...cartBoards.value, makeBoard([1, 2, 3, 4, 5], [6])];
  });
  const mapBoard = vi.fn((board, index) => ({
    id: index,
    mainNumbers: board.mainNumbers,
    bonusNumbers: board.bonusNumbers,
    cost: getBoardCost(index + 1),
  }));

  return {
    cartBoards,
    betslipCost,
    clearAllBoards,
    shuffleBoard,
    getBoardCost,
    addRandomBoard,
    mapBoard,
    ...overrides,
  };
}

describe('useJackpotSlip', () => {
  let config;
  let columns;
  let slipAmount;
  let isLargeColumnMode;

  beforeEach(() => {
    config = makeGameConfig();
    columns = ref(3);
    slipAmount = ref(5);
    isLargeColumnMode = ref(false);
  });

  describe('initialization', () => {
    it('clears boards and adds one board per column on init', () => {
      columns.value = 3;
      useJackpotSlip(config, columns, slipAmount, isLargeColumnMode);

      expect(config.clearAllBoards).toHaveBeenCalledTimes(1);
      expect(config.addRandomBoard).toHaveBeenCalledTimes(3);
    });

    it('adds only 1 board when isLargeColumnMode is true', () => {
      isLargeColumnMode.value = true;
      useJackpotSlip(config, columns, slipAmount, isLargeColumnMode);

      expect(config.addRandomBoard).toHaveBeenCalledTimes(1);
    });

    it('works when isLargeColumnMode is undefined', () => {
      columns.value = 2;
      useJackpotSlip(config, columns, slipAmount, undefined);

      expect(config.addRandomBoard).toHaveBeenCalledTimes(2);
    });
  });

  describe('boards computed', () => {
    it('maps cartBoards using mapBoard', () => {
      columns.value = 1;
      const { boards } = useJackpotSlip(config, columns, slipAmount, isLargeColumnMode);

      expect(boards.value).toHaveLength(1);
      expect(boards.value[0]).toMatchObject({
        id: 0,
        mainNumbers: [1, 2, 3, 4, 5],
        bonusNumbers: [6],
        cost: 0.5,
      });
    });

    it('returns empty array when cartBoards is null', () => {
      config.cartBoards.value = null;
      columns.value = 1;
      const localConfig = { ...config, cartBoards: ref(null) };
      const { boards } = useJackpotSlip(localConfig, columns, slipAmount, isLargeColumnMode);

      expect(boards.value).toEqual([]);
    });

    it('calls mapBoard with correct arguments for each board', () => {
      columns.value = 2;
      const { boards } = useJackpotSlip(config, columns, slipAmount, isLargeColumnMode);

      expect(boards.value).toHaveLength(2);
      expect(config.mapBoard).toHaveBeenCalledWith(expect.any(Object), 0);
      expect(config.mapBoard).toHaveBeenCalledWith(expect.any(Object), 1);
    });
  });

  describe('kinoNumbers', () => {
    it('is initialized from the first board mainNumbers and bonusNumbers', () => {
      columns.value = 1;
      const { kinoNumbers } = useJackpotSlip(config, columns, slipAmount, isLargeColumnMode);

      expect(kinoNumbers.value).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it('updates when the first board changes', async () => {
      columns.value = 1;
      const { kinoNumbers } = useJackpotSlip(config, columns, slipAmount, isLargeColumnMode);

      config.cartBoards.value = [makeBoard([10, 20, 30, 40, 50], [7])];
      await nextTick();

      expect(kinoNumbers.value).toEqual([10, 20, 30, 40, 50, 7]);
    });

    it('is empty array when no boards exist', () => {
      const localConfig = makeGameConfig({
        addRandomBoard: vi.fn(),
      });
      localConfig.cartBoards.value = [];
      columns.value = 0;

      const { kinoNumbers } = useJackpotSlip(localConfig, columns, slipAmount, isLargeColumnMode);

      expect(kinoNumbers.value).toEqual([]);
    });
  });

  describe('totalCost', () => {
    it('equals betslipCost when kinoEnabled is false', () => {
      config.betslipCost.value = 2.5;
      columns.value = 1;
      const { totalCost, kinoEnabled } = useJackpotSlip(config, columns, slipAmount, isLargeColumnMode);

      kinoEnabled.value = false;
      expect(totalCost.value).toBe(2.5);
    });

    it('adds kinoPrice to betslipCost when kinoEnabled is true', () => {
      config.betslipCost.value = 2.0;
      columns.value = 1;
      const { totalCost, kinoEnabled, kinoPrice } = useJackpotSlip(config, columns, slipAmount, isLargeColumnMode);

      kinoEnabled.value = true;
      kinoPrice.value = 1.0;
      expect(totalCost.value).toBe(3.0);
    });

    it('reacts to betslipCost changes', async () => {
      config.betslipCost.value = 1.0;
      columns.value = 1;
      const { totalCost } = useJackpotSlip(config, columns, slipAmount, isLargeColumnMode);

      config.betslipCost.value = 4.0;
      await nextTick();

      expect(totalCost.value).toBe(4.0);
    });

    it('uses the default kinoPrice (KINO_PRICES[0] = 0.5) when kinoEnabled', () => {
      config.betslipCost.value = 1.0;
      columns.value = 1;
      const { totalCost, kinoEnabled } = useJackpotSlip(config, columns, slipAmount, isLargeColumnMode);

      kinoEnabled.value = true;
      expect(totalCost.value).toBe(1.5);
    });
  });

  describe('reactive re-initialization', () => {
    it('re-initializes boards when columns changes', async () => {
      columns.value = 1;
      useJackpotSlip(config, columns, slipAmount, isLargeColumnMode);

      vi.clearAllMocks();
      config.cartBoards.value = [];

      columns.value = 2;
      await nextTick();

      expect(config.clearAllBoards).toHaveBeenCalledTimes(1);
      expect(config.addRandomBoard).toHaveBeenCalledTimes(2);
    });

    it('re-initializes with 1 board when isLargeColumnMode switches to true', async () => {
      columns.value = 3;
      useJackpotSlip(config, columns, slipAmount, isLargeColumnMode);

      vi.clearAllMocks();
      config.cartBoards.value = [];

      isLargeColumnMode.value = true;
      await nextTick();

      expect(config.clearAllBoards).toHaveBeenCalledTimes(1);
      expect(config.addRandomBoard).toHaveBeenCalledTimes(1);
    });
  });

  describe('returned interface', () => {
    it('exposes the expected properties', () => {
      const result = useJackpotSlip(config, columns, slipAmount, isLargeColumnMode);

      expect(result).toHaveProperty('KINO_PRICES');
      expect(result).toHaveProperty('boards');
      expect(result).toHaveProperty('kinoEnabled');
      expect(result).toHaveProperty('kinoPrice');
      expect(result).toHaveProperty('kinoNumbers');
      expect(result).toHaveProperty('totalCost');
      expect(result).toHaveProperty('shuffleBoard');
    });

    it('KINO_PRICES contains the expected values', () => {
      const { KINO_PRICES } = useJackpotSlip(config, columns, slipAmount, isLargeColumnMode);
      expect(KINO_PRICES).toEqual([0.5, 1.0, 2.0]);
    });

    it('kinoEnabled defaults to false', () => {
      const { kinoEnabled } = useJackpotSlip(config, columns, slipAmount, isLargeColumnMode);
      expect(kinoEnabled.value).toBe(false);
    });

    it('kinoPrice defaults to KINO_PRICES[0]', () => {
      const { kinoPrice, KINO_PRICES } = useJackpotSlip(config, columns, slipAmount, isLargeColumnMode);
      expect(kinoPrice.value).toBe(KINO_PRICES[0]);
    });
  });
});
