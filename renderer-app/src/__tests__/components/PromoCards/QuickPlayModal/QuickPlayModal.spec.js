import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import QuickPlayModal from '../../../../components/PromoCards/QuickPlayModal/QuickPlayModal.vue';
import BaseModal from '../../../../components/modals/BaseModal.vue';
import QuickPlayModalContent from '../../../../components/PromoCards/QuickPlayModal/QuickPlayModalContent.vue';

// Mutable ref so tests can control orientation
const mockIsVertical = ref(false);

vi.mock('@/composables/useOrientation', () => ({
  useOrientation: () => ({ isVertical: mockIsVertical }),
}));

vi.mock('../../../../components/modals/BaseModal.vue', () => ({
  default: {
    name: 'BaseModal',
    props: ['width', 'height', 'padding', 'backgroundOpacity'],
    template: '<div data-testid="base-modal"><slot /></div>',
  },
}));

vi.mock('../../../../components/PromoCards/QuickPlayModal/QuickPlayModalContent.vue', () => ({
  default: {
    name: 'QuickPlayModalContent',
    props: ['gameType', 'amount', 'columns', 'index', 'orientation', 'modalHeight', 'isPortrait'],
    emits: ['close', 'confirm'],
    template: '<div data-testid="modal-content">QuickPlayModalContent</div>',
  },
}));

describe('QuickPlayModal', () => {
  let wrapper;
  let originalInnerHeight;

  beforeEach(() => {
    originalInnerHeight = window.innerHeight;
    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 1080 });
    mockIsVertical.value = false;
  });

  afterEach(() => {
    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: originalInnerHeight });
    wrapper?.unmount();
  });

  describe('Basic rendering', () => {
    beforeEach(() => {
      wrapper = mount(QuickPlayModal, {
        props: { gameType: 'tzoker', amount: 0.5, columns: 1 },
      });
    });

    it('should render the component', () => {
      expect(wrapper.exists()).toBe(true);
    });

    it('should render BaseModal component', () => {
      expect(wrapper.findComponent(BaseModal).exists()).toBe(true);
    });

    it('should render QuickPlayModalContent component', () => {
      expect(wrapper.findComponent(QuickPlayModalContent).exists()).toBe(true);
    });
  });

  describe('BaseModal props', () => {
    beforeEach(() => {
      wrapper = mount(QuickPlayModal, {
        props: { gameType: 'tzoker', amount: 0.5, columns: 1 },
      });
    });

    it('should pass correct static props to BaseModal', () => {
      const baseModal = wrapper.findComponent(BaseModal);
      expect(baseModal.props()).toMatchObject({ padding: 0, backgroundOpacity: 100 });
    });

    it('should pass width prop to BaseModal', () => {
      expect(wrapper.findComponent(BaseModal).props('width')).toBe(550);
    });
  });

  describe('Modal dimensions - landscape mode', () => {
    beforeEach(() => {
      mockIsVertical.value = false;
      Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 1080 });
    });

    it('should calculate correct height for default (1 column)', () => {
      wrapper = mount(QuickPlayModal, {
        props: { gameType: 'tzoker', amount: 0.5, columns: 1 },
      });
      // landscape default = 450, maxH = 1080 - 60 = 1020
      expect(wrapper.findComponent(BaseModal).props('height')).toBe(450);
    });

    it('should calculate correct height for 3 columns', () => {
      wrapper = mount(QuickPlayModal, {
        props: { gameType: 'tzoker', amount: 0.5, columns: 3 },
      });
      // landscape columns3 = 780, maxH = 1020
      expect(wrapper.findComponent(BaseModal).props('height')).toBe(780);
    });

    it('should calculate correct height for 6+ columns (capped by viewport)', () => {
      wrapper = mount(QuickPlayModal, {
        props: { gameType: 'tzoker', amount: 0.5, columns: 6 },
      });
      // landscape columns6 = 1450, capped to 1020
      expect(wrapper.findComponent(BaseModal).props('height')).toBe(1020);
    });

    it('should calculate correct height for tzoker >= 20', () => {
      wrapper = mount(QuickPlayModal, {
        props: { gameType: 'tzoker', amount: 0.5, columns: 1, tzoker: 20 },
      });
      // landscape tzoker20 = 450, maxH = 1020
      expect(wrapper.findComponent(BaseModal).props('height')).toBe(450);
    });

    it('should prioritize tzoker >= 20 over columns', () => {
      wrapper = mount(QuickPlayModal, {
        props: { gameType: 'tzoker', amount: 0.5, columns: 6, tzoker: 20 },
      });
      // tzoker branch is checked first: landscape tzoker20 = 450
      expect(wrapper.findComponent(BaseModal).props('height')).toBe(450);
    });
  });

  describe('Modal dimensions - portrait mode', () => {
    beforeEach(() => {
      mockIsVertical.value = true;
      Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 1024 });
    });

    it('should calculate correct height for default (1 column)', () => {
      wrapper = mount(QuickPlayModal, {
        props: { gameType: 'tzoker', amount: 0.5, columns: 1 },
      });
      // portrait default = 450, maxH = 1024 - 60 = 964
      expect(wrapper.findComponent(BaseModal).props('height')).toBe(450);
    });

    it('should calculate correct height for 3 columns', () => {
      wrapper = mount(QuickPlayModal, {
        props: { gameType: 'tzoker', amount: 0.5, columns: 3 },
      });
      // portrait columns3 = 700, maxH = 964
      expect(wrapper.findComponent(BaseModal).props('height')).toBe(700);
    });

    it('should calculate correct height for 6+ columns (capped by viewport)', () => {
      wrapper = mount(QuickPlayModal, {
        props: { gameType: 'tzoker', amount: 0.5, columns: 6 },
      });
      // portrait columns6 = 1250, capped to 964
      expect(wrapper.findComponent(BaseModal).props('height')).toBe(964);
    });

    it('should calculate correct height for tzoker >= 20', () => {
      wrapper = mount(QuickPlayModal, {
        props: { gameType: 'tzoker', amount: 0.5, columns: 1, tzoker: 20 },
      });
      // portrait tzoker20 = 450, maxH = 964
      expect(wrapper.findComponent(BaseModal).props('height')).toBe(450);
    });

    it('should pass width 550 in portrait mode', () => {
      wrapper = mount(QuickPlayModal, {
        props: { gameType: 'tzoker', amount: 0.5, columns: 1 },
      });
      expect(wrapper.findComponent(BaseModal).props('width')).toBe(550);
    });
  });

  describe('QuickPlayModalContent props', () => {
    beforeEach(() => {
      mockIsVertical.value = false;
      wrapper = mount(QuickPlayModal, {
        props: { gameType: 'tzoker', amount: 0.5, columns: 1, index: 2, orientation: 'VERTICAL' },
      });
    });

    it('should pass gameType to QuickPlayModalContent', () => {
      expect(wrapper.findComponent(QuickPlayModalContent).props('gameType')).toBe('tzoker');
    });

    it('should pass amount to QuickPlayModalContent', () => {
      expect(wrapper.findComponent(QuickPlayModalContent).props('amount')).toBe(0.5);
    });

    it('should pass columns to QuickPlayModalContent', () => {
      expect(wrapper.findComponent(QuickPlayModalContent).props('columns')).toBe(1);
    });

    it('should pass index to QuickPlayModalContent', () => {
      expect(wrapper.findComponent(QuickPlayModalContent).props('index')).toBe(2);
    });

    it('should pass orientation to QuickPlayModalContent', () => {
      expect(wrapper.findComponent(QuickPlayModalContent).props('orientation')).toBe('VERTICAL');
    });

    it('should pass modalHeight to QuickPlayModalContent', () => {
      const baseModal = wrapper.findComponent(BaseModal);
      const modalContent = wrapper.findComponent(QuickPlayModalContent);
      expect(modalContent.props('modalHeight')).toBe(baseModal.props('height'));
    });

    it('should pass isPortrait false in landscape mode', () => {
      expect(wrapper.findComponent(QuickPlayModalContent).props('isPortrait')).toBe(false);
    });

    it('should pass isPortrait true in portrait mode', () => {
      mockIsVertical.value = true;
      wrapper = mount(QuickPlayModal, {
        props: { gameType: 'tzoker', amount: 0.5, columns: 1 },
      });
      expect(wrapper.findComponent(QuickPlayModalContent).props('isPortrait')).toBe(true);
    });
  });

  describe('Event handling', () => {
    beforeEach(() => {
      wrapper = mount(QuickPlayModal, {
        props: { gameType: 'tzoker', amount: 0.5, columns: 1 },
      });
    });

    it('should emit close event when QuickPlayModalContent emits close', async () => {
      await wrapper.findComponent(QuickPlayModalContent).vm.$emit('close');
      expect(wrapper.emitted('close')).toHaveLength(1);
    });

    it('should emit confirm event when QuickPlayModalContent emits confirm', async () => {
      const payload = {
        boards: [{ id: 1, mainNumbers: [1, 2, 3, 4, 5], tzokerNumber: 10 }],
        kinoEnabled: false,
        slipCost: 0.5,
        totalCost: 0.5,
      };
      await wrapper.findComponent(QuickPlayModalContent).vm.$emit('confirm', payload);
      expect(wrapper.emitted('confirm')[0][0]).toEqual(payload);
    });

    it('should handle multiple close events', async () => {
      const content = wrapper.findComponent(QuickPlayModalContent);
      await content.vm.$emit('close');
      await content.vm.$emit('close');
      expect(wrapper.emitted('close')).toHaveLength(2);
    });

    it('should handle multiple confirm events', async () => {
      const content = wrapper.findComponent(QuickPlayModalContent);
      const payload1 = { slipCost: 0.5 };
      const payload2 = { slipCost: 1.0 };
      await content.vm.$emit('confirm', payload1);
      await content.vm.$emit('confirm', payload2);
      expect(wrapper.emitted('confirm')).toHaveLength(2);
      expect(wrapper.emitted('confirm')[0][0]).toEqual(payload1);
      expect(wrapper.emitted('confirm')[1][0]).toEqual(payload2);
    });
  });

  describe('Props validation', () => {
    it('should require gameType prop', () => {
      const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      wrapper = mount(QuickPlayModal, { props: {} });
      expect(consoleWarn).toHaveBeenCalled();
      consoleWarn.mockRestore();
    });

    it('should accept valid gameType tzoker', () => {
      wrapper = mount(QuickPlayModal, { props: { gameType: 'tzoker' } });
      expect(wrapper.props('gameType')).toBe('tzoker');
    });

    it('should accept valid gameType eurojackpot', () => {
      wrapper = mount(QuickPlayModal, { props: { gameType: 'eurojackpot' } });
      expect(wrapper.props('gameType')).toBe('eurojackpot');
    });

    it('should use default values for optional props', () => {
      wrapper = mount(QuickPlayModal, { props: { gameType: 'tzoker' } });
      expect(wrapper.props()).toMatchObject({
        amount: null,
        columns: 1,
        index: 0,
        orientation: 'HORIZONTAL',
        tzoker: null,
      });
    });
  });
});
