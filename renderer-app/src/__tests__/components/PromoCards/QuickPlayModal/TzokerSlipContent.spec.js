import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import TzokerSlipContent from '../../../../components/PromoCards/QuickPlayModal/TzokerSlipContent.vue';

vi.mock('../../../../composables/useConfigText', () => ({
  useConfigText: () => ({
    tConfig: (key) => key,
  }),
}));

const mockShuffleBoard = vi.fn();
const mockBoards = ref([
  {
    id: 1,
    mainNumbers: [5, 12, 23, 34, 45],
    bonusNumbers: [15],
    cost: 0.5,
  },
]);
const mockKinoEnabled = ref(false);
const mockKinoPrice = ref(0.5);
const mockKinoNumbers = ref([5, 12, 23, 34, 45, 15]);
const mockTotalCost = ref(0.5);

vi.mock('../../../../composables/useTzoker', () => ({
  useTzoker: () => ({
    cartBoards: ref([]),
    betslipCost: ref(0),
    clearAllBoards: vi.fn(),
    shuffleBoard: mockShuffleBoard,
    quickPick: vi.fn(),
    addBoardToCart: vi.fn(),
    getBoardCost: vi.fn(() => 0.5),
  }),
}));

vi.mock('../../../../composables/useJackpotSlip', () => ({
  useJackpotSlip: () => ({
    KINO_PRICES: [0.5, 1.0, 2.0],
    boards: mockBoards,
    kinoEnabled: mockKinoEnabled,
    kinoPrice: mockKinoPrice,
    kinoNumbers: mockKinoNumbers,
    totalCost: mockTotalCost,
  }),
}));

const mountComponent = (props = {}) =>
  mount(TzokerSlipContent, {
    props: {
      slipAmount: 0.5,
      columns: 1,
      index: 0,
      ...props,
    },
    global: {
      mocks: {
        $t: (key) => key,
      },
    },
  });

describe('TzokerSlipContent', () => {
  let wrapper;

  beforeEach(() => {
    mockShuffleBoard.mockClear();
    mockKinoEnabled.value = false;
    mockKinoPrice.value = 0.5;
    mockTotalCost.value = 0.5;
    mockBoards.value = [
      {
        id: 1,
        mainNumbers: [5, 12, 23, 34, 45],
        bonusNumbers: [15],
        cost: 0.5,
      },
    ];

    wrapper = mountComponent();
  });

  describe('Rendering', () => {
    it('should render the component', () => {
      expect(wrapper.exists()).toBe(true);
    });

    it('should display Tzoker logo', () => {
      const logo = wrapper.find('img[alt="Tzoker"]');
      expect(logo.exists()).toBe(true);
    });

    it('should display board with numbers', () => {
      const mainNumbers = wrapper.findAll('[aria-label^="Number"]');
      expect(mainNumbers.length).toBe(5);
    });

    it('should display tzoker number', () => {
      const tzokerNumber = wrapper.find('[aria-label^="Tzoker number"]');
      expect(tzokerNumber.exists()).toBe(true);
      expect(tzokerNumber.text()).toBe('15');
    });

    it('should display total cost', () => {
      const totalText = wrapper.text();
      expect(totalText).toContain('€0.50');
    });
  });

  describe('Shuffle functionality', () => {
    it('should render shuffle button for each board', () => {
      const shuffleButtons = wrapper.findAll('[aria-label^="Shuffle board"]');
      expect(shuffleButtons.length).toBe(1);
    });

    it('should call shuffleBoard when shuffle button is clicked', async () => {
      const shuffleButton = wrapper.find('[aria-label="Shuffle board 1"]');
      await shuffleButton.trigger('click');

      expect(mockShuffleBoard).toHaveBeenCalledWith(1);
    });
  });

  describe('Submit functionality', () => {
    it('should render submit button', () => {
      const submitButton = wrapper.find('.tzoker-slip__submit-btn');
      expect(submitButton.exists()).toBe(true);
      expect(submitButton.text()).toContain('slips.tzoker.submitSlipCost');
    });

    it('should emit submit event with correct data when KINO is disabled', async () => {
      const submitButton = wrapper.find('.tzoker-slip__submit-btn');
      await submitButton.trigger('click');

      expect(wrapper.emitted('submit')).toBeTruthy();
      expect(wrapper.emitted('submit')[0][0]).toMatchObject({
        boards: mockBoards.value,
        kinoEnabled: false,
        slipCost: 0.5,
        kinoCost: 0,
        totalCost: 0.5,
      });
    });

    it('should emit submit event with KINO data when enabled', async () => {
      mockKinoEnabled.value = true;
      mockKinoPrice.value = 1.0;
      mockTotalCost.value = 1.5;
      await wrapper.vm.$nextTick();

      const submitButton = wrapper.find('.tzoker-slip__submit-btn');
      await submitButton.trigger('click');

      const emitted = wrapper.emitted('submit');
      expect(emitted[0][0]).toMatchObject({
        kinoEnabled: true,
        kinoNumbers: mockKinoNumbers.value,
        kinoPrice: 1.0,
        kinoCost: 1.0,
      });
    });
  });

  describe('Props handling', () => {
    it('should apply modalHeight when provided', async () => {
      await wrapper.setProps({ modalHeight: 800 });
      expect(wrapper.props('modalHeight')).toBe(800);
    });

    it('should handle multiple columns prop', async () => {
      await wrapper.setProps({ columns: 2 });
      expect(wrapper.props('columns')).toBe(2);
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels for boards', () => {
      const boardsList = wrapper.find('[role="list"]');
      expect(boardsList.exists()).toBe(true);
      expect(boardsList.attributes('aria-label')).toBe('tzoker.boardsLabel');
    });

    it('should have proper ARIA labels for numbers', () => {
      const numberGroups = wrapper.findAll('[role="group"]');
      expect(numberGroups.length).toBeGreaterThan(0);
    });
  });

  describe('Close button', () => {
    it('should render close button', () => {
      const closeBtn = wrapper.find('.tzoker-slip__close-btn');
      expect(closeBtn.exists()).toBe(true);
    });

    it('should emit close event when close button is clicked', async () => {
      const closeBtn = wrapper.find('.tzoker-slip__close-btn');
      await closeBtn.trigger('click');

      expect(wrapper.emitted('close')).toBeTruthy();
    });
  });
});
