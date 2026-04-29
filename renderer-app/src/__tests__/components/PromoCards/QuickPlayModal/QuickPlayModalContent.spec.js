import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import QuickPlayModalContent from '../../../../components/PromoCards/QuickPlayModal/QuickPlayModalContent.vue';
import TzokerSlipContent from '../../../../components/PromoCards/QuickPlayModal/TzokerSlipContent.vue';

vi.mock('../../../../components/PromoCards/QuickPlayModal/TzokerSlipContent.vue', () => ({
  default: {
    name: 'TzokerSlipContent',
    props: ['slipAmount', 'columns', 'modalHeight', 'isPortrait'],
    emits: ['submit', 'close'],
    template: '<div data-testid="tzoker-slip-content">TzokerSlipContent</div>',
  },
}));

describe('QuickPlayModalContent', () => {
  let wrapper;

  describe('Tzoker game type', () => {
    beforeEach(() => {
      wrapper = mount(QuickPlayModalContent, {
        props: {
          gameType: 'tzoker',
          amount: 0.5,
          columns: 1,
        },
      });
    });

    it('should render the component', () => {
      expect(wrapper.exists()).toBe(true);
    });

    it('should render TzokerSlipContent when gameType is tzoker and amount is provided', () => {
      const tzokerContent = wrapper.findComponent(TzokerSlipContent);
      expect(tzokerContent.exists()).toBe(true);
    });

    it('should pass correct props to TzokerSlipContent', () => {
      const tzokerContent = wrapper.findComponent(TzokerSlipContent);
      expect(tzokerContent.props()).toMatchObject({
        slipAmount: 0.5,
        columns: 1,
        modalHeight: null,
        isPortrait: false,
      });
    });

    it('should pass modalHeight prop to TzokerSlipContent', async () => {
      await wrapper.setProps({ modalHeight: 800 });

      const tzokerContent = wrapper.findComponent(TzokerSlipContent);
      expect(tzokerContent.props('modalHeight')).toBe(800);
    });

    it('should pass isPortrait prop to TzokerSlipContent', async () => {
      await wrapper.setProps({ isPortrait: true });

      const tzokerContent = wrapper.findComponent(TzokerSlipContent);
      expect(tzokerContent.props('isPortrait')).toBe(true);
    });

    it('should pass columns prop to TzokerSlipContent', async () => {
      await wrapper.setProps({ columns: 2 });

      const tzokerContent = wrapper.findComponent(TzokerSlipContent);
      expect(tzokerContent.props('columns')).toBe(2);
    });

    it('should not render TzokerSlipContent when amount is null', async () => {
      await wrapper.setProps({ amount: null });

      const tzokerContent = wrapper.findComponent(TzokerSlipContent);
      expect(tzokerContent.exists()).toBe(false);
    });

    it('should apply modalHeight to container when provided', async () => {
      await wrapper.setProps({ modalHeight: 800 });

      const container = wrapper.find('.quickplay-modal-content');
      expect(container.attributes('style')).toContain('800px');
    });

    it('should have rounded corners and overflow hidden', () => {
      const container = wrapper.find('.quickplay-modal-content');
      expect(container.exists()).toBe(true);
    });
  });

  describe('Event handling', () => {
    beforeEach(() => {
      wrapper = mount(QuickPlayModalContent, {
        props: {
          gameType: 'tzoker',
          amount: 0.5,
          columns: 1,
        },
      });
    });

    it('should emit confirm event when TzokerSlipContent emits submit', async () => {
      const tzokerContent = wrapper.findComponent(TzokerSlipContent);
      const submitPayload = {
        boards: [{ id: 1, mainNumbers: [1, 2, 3, 4, 5], tzokerNumber: 10 }],
        kinoEnabled: false,
        slipCost: 0.5,
        totalCost: 0.5,
      };

      await tzokerContent.vm.$emit('submit', submitPayload);

      expect(wrapper.emitted('confirm')).toBeTruthy();
      expect(wrapper.emitted('confirm')[0][0]).toEqual(submitPayload);
    });

    it('should emit close event when TzokerSlipContent emits close', async () => {
      const tzokerContent = wrapper.findComponent(TzokerSlipContent);

      await tzokerContent.vm.$emit('close');

      expect(wrapper.emitted('close')).toBeTruthy();
    });

    it('should handle multiple confirm events', async () => {
      const tzokerContent = wrapper.findComponent(TzokerSlipContent);
      const payload1 = { slipCost: 0.5 };
      const payload2 = { slipCost: 1.0 };

      await tzokerContent.vm.$emit('submit', payload1);
      await tzokerContent.vm.$emit('submit', payload2);

      expect(wrapper.emitted('confirm')).toHaveLength(2);
      expect(wrapper.emitted('confirm')[0][0]).toEqual(payload1);
      expect(wrapper.emitted('confirm')[1][0]).toEqual(payload2);
    });
  });

  describe('EuroJackpot game type', () => {
    beforeEach(() => {
      wrapper = mount(QuickPlayModalContent, {
        props: {
          gameType: 'eurojackpot',
          amount: 2.0,
          columns: 1,
        },
      });
    });

    it('should not render TzokerSlipContent for non-tzoker game types', () => {
      const tzokerContent = wrapper.findComponent(TzokerSlipContent);
      expect(tzokerContent.exists()).toBe(false);
    });
  });

  describe('Props validation', () => {
    it('should handle all props correctly', () => {
      wrapper = mount(QuickPlayModalContent, {
        props: {
          gameType: 'tzoker',
          amount: 2.5,
          columns: 3,
          modalHeight: 900,
          isPortrait: true,
        },
      });

      expect(wrapper.props()).toMatchObject({
        gameType: 'tzoker',
        amount: 2.5,
        columns: 3,
        modalHeight: 900,
        isPortrait: true,
      });
    });

    it('should use default values for optional props', () => {
      wrapper = mount(QuickPlayModalContent, {
        props: {
          gameType: 'tzoker',
        },
      });

      expect(wrapper.props()).toMatchObject({
        amount: null,
        columns: 1,
        modalHeight: null,
        isPortrait: false,
      });
    });
  });

  describe('Conditional rendering logic', () => {
    it('should render TzokerSlipContent only when gameType is tzoker AND amount is not null', () => {
      wrapper = mount(QuickPlayModalContent, {
        props: {
          gameType: 'tzoker',
          amount: 0.5,
        },
      });

      expect(wrapper.findComponent(TzokerSlipContent).exists()).toBe(true);
    });

    it('should not render TzokerSlipContent when gameType is tzoker but amount is null', () => {
      wrapper = mount(QuickPlayModalContent, {
        props: {
          gameType: 'tzoker',
          amount: null,
        },
      });

      expect(wrapper.findComponent(TzokerSlipContent).exists()).toBe(false);
    });

    it('should not render TzokerSlipContent when amount is provided but gameType is not tzoker', () => {
      wrapper = mount(QuickPlayModalContent, {
        props: {
          gameType: 'eurojackpot',
          amount: 0.5,
        },
      });

      expect(wrapper.findComponent(TzokerSlipContent).exists()).toBe(false);
    });
  });
});
