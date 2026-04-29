import { ref, computed, watch } from 'vue';

const KINO_PRICES = [0.5, 1.0, 2.0];

export function useJackpotSlip(gameConfig, columns, slipAmount, isLargeColumnMode) {
  const { cartBoards, betslipCost, clearAllBoards, shuffleBoard, getBoardCost, addRandomBoard, mapBoard } = gameConfig;

  const kinoEnabled = ref(false);
  const kinoPrice = ref(KINO_PRICES[0]);
  const kinoNumbers = ref([]);

  const boards = computed(() => (cartBoards.value ?? []).map((board, index) => mapBoard(board, index)));

  const initBoards = () => {
    clearAllBoards();
    const count = isLargeColumnMode?.value ? 1 : columns.value;

    for (let i = 0; i < count; i++) {
      addRandomBoard();
    }
  };

  initBoards();
  watch([columns, () => isLargeColumnMode?.value], initBoards);

  watch(
    () => boards.value[0],
    (first) => {
      if (first) kinoNumbers.value = [...first.mainNumbers, ...first.bonusNumbers];
    },
    { immediate: true }
  );

  const totalCost = computed(() => betslipCost.value + (kinoEnabled.value ? kinoPrice.value : 0));

  return {
    KINO_PRICES,
    boards,
    kinoEnabled,
    kinoPrice,
    kinoNumbers,
    totalCost,
    shuffleBoard,
  };
}
