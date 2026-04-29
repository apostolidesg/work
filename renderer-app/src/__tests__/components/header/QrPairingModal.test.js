import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '../../testUtils';
import QrPairingModal from '@/components/header/QrPairingModal.vue';
import BaseModal from '@/components/base/BaseModal.vue';
import IconButton from '@/components/base/IconButton.vue';
import { EXTERNAL_ASSETS } from '@/config/appConfig';
import gaService from '@/services/gaService';
import gtmEvents from '@/constants/gtmEvents';

vi.mock('@/services/gaService', () => ({
  default: {
    sendEvent: vi.fn(),
  },
}));

describe('QrPairingModal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders BaseModal component', () => {
    const wrapper = mount(QrPairingModal, {
      props: {
        open: false,
      },
    });

    const baseModal = wrapper.findComponent(BaseModal);
    expect(baseModal.exists()).toBe(true);
  });

  it('passes open prop to BaseModal', () => {
    const wrapper = mount(QrPairingModal, {
      props: {
        open: true,
      },
    });

    const baseModal = wrapper.findComponent(BaseModal);
    expect(baseModal.props('open')).toBe(true);
  });

  describe('icon buttons', () => {
    it('renders settings icon button', () => {
      const wrapper = mount(QrPairingModal, {
        props: {
          open: true,
        },
      });

      const iconButtons = wrapper.findAllComponents(IconButton);
      const settingsButton = iconButtons.find((btn) => btn.props('ariaLabel') === 'Settings');

      expect(settingsButton.exists()).toBe(true);
    });

    it('renders close icon button', () => {
      const wrapper = mount(QrPairingModal, {
        props: {
          open: true,
        },
      });

      const iconButtons = wrapper.findAllComponents(IconButton);
      const closeButton = iconButtons.find((btn) => btn.props('ariaLabel') === 'Close pairing modal');

      expect(closeButton.exists()).toBe(true);
    });

    it('settings button is positioned on the left', () => {
      const wrapper = mount(QrPairingModal, {
        props: {
          open: true,
        },
      });

      const iconButtons = wrapper.findAllComponents(IconButton);
      const settingsButton = iconButtons.find((btn) => btn.props('ariaLabel') === 'Settings');

      expect(settingsButton.classes()).toContain('atw:absolute');
      expect(settingsButton.classes()).toContain('atw:left-6');
      expect(settingsButton.classes()).toContain('atw:top-6');
    });

    it('close button is positioned on the right', () => {
      const wrapper = mount(QrPairingModal, {
        props: {
          open: true,
        },
      });

      const iconButtons = wrapper.findAllComponents(IconButton);
      const closeButton = iconButtons.find((btn) => btn.props('ariaLabel') === 'Close pairing modal');

      expect(closeButton.classes()).toContain('atw:absolute');
      expect(closeButton.classes()).toContain('atw:right-6');
      expect(closeButton.classes()).toContain('atw:top-6');
    });

    it('settings button has aria-expanded attribute', () => {
      const wrapper = mount(QrPairingModal, {
        props: {
          open: true,
        },
      });

      const iconButtons = wrapper.findAllComponents(IconButton);
      const settingsButton = iconButtons.find((btn) => btn.props('ariaLabel') === 'Settings');

      expect(settingsButton.props('ariaExpanded')).toBeDefined();
    });

    it('both icon buttons have large size', () => {
      const wrapper = mount(QrPairingModal, {
        props: {
          open: true,
        },
      });

      const iconButtons = wrapper.findAllComponents(IconButton);
      iconButtons.forEach((btn) => {
        expect(btn.props('size')).toBe('lg');
      });
    });
  });

  describe('modal lifecycle', () => {
    it('emits close when close button is clicked', async () => {
      const wrapper = mount(QrPairingModal, {
        props: {
          open: true,
        },
      });

      const iconButtons = wrapper.findAllComponents(IconButton);
      const closeButton = iconButtons.find((btn) => btn.props('ariaLabel') === 'Close pairing modal');
      await closeButton.trigger('click');

      expect(wrapper.emitted('close')).toBeTruthy();
    });

    it('sends analytics event when modal is opened', async () => {
      const wrapper = mount(QrPairingModal, {
        props: {
          open: false,
        },
      });

      await wrapper.setProps({ open: true });

      expect(gaService.sendEvent).toHaveBeenCalledWith(
        gtmEvents.SSBT_DGE_APPLICATION_GIFT_QR_CODE_MODAL_OPENED,
        expect.objectContaining({
          modal_type: 'qr_pairing',
        })
      );
    });
  });

  it('has correct modal width', () => {
    const wrapper = mount(QrPairingModal, {
      props: {
        open: true,
      },
    });

    const baseModal = wrapper.findComponent(BaseModal);
    expect(baseModal.props('width')).toBe(600);
  });

  it('has correct modal padding', () => {
    const wrapper = mount(QrPairingModal, {
      props: {
        open: true,
      },
    });

    const baseModal = wrapper.findComponent(BaseModal);
    expect(baseModal.props('padding')).toBe(48);
  });
});
