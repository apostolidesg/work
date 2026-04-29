import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { nextTick } from 'vue';
import GiftClaimModal from '@/components/GiftBanner/GiftClaimModal.vue';
import BaseModal from '@/components/base/BaseModal.vue';
import IconButton from '@/components/base/IconButton.vue';
import GiftClaimStepClaim from '@/components/GiftBanner/GiftClaimStepClaim.vue';

// Mock Google Analytics service
vi.mock('@/services/gaService', () => ({
  default: {
    sendEvent: vi.fn(),
  },
}));

// Mock Vuex store
vi.mock('@/store/store', () => ({
  default: {
    getters: {
      'CONFIGURATION_STORE_MODULE/GET_CONFIGURATION': {
        GTAG: {
          MEASUREMENT_ID: 'G-TEST123',
          API_SECRET: 'test-secret',
        },
      },
      'SESSION_STORE_MODULE/GET_SSBT_ID': '123456789012',
    },
  },
}));

describe('GiftClaimModal', () => {
  async function waitForTransition() {
    await nextTick();
    await flushPromises();
    await nextTick();
  }

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('renders and passes props to BaseModal', () => {
    const wrapper = mount(GiftClaimModal, {
      props: { open: true },
      global: {
        mocks: {
          $t: (key) => key,
        },
      },
    });

    const baseModal = wrapper.findComponent(BaseModal);
    expect(baseModal.exists()).toBe(true);
    expect(baseModal.props('open')).toBe(true);
    expect(baseModal.props('width')).toBe(640);
  });

  it('shows claim step by default', () => {
    const wrapper = mount(GiftClaimModal, {
      props: { open: true },
      global: {
        mocks: {
          $t: (key) => key,
        },
      },
    });

    expect(wrapper.findComponent(GiftClaimStepClaim).exists()).toBe(true);
  });

  it('uses default bet amount of 3', () => {
    const wrapper = mount(GiftClaimModal, {
      props: { open: true },
      global: {
        mocks: {
          $t: (key) => key,
        },
      },
    });

    expect(wrapper.vm.betAmount).toBe(3);
  });

  it('closes modal via close button', async () => {
    const wrapper = mount(GiftClaimModal, {
      props: { open: true },
      global: {
        mocks: {
          $t: (key) => key,
        },
      },
    });

    const iconButtons = wrapper.findAllComponents(IconButton);
    const closeButton = iconButtons.find((btn) => btn.props('ariaLabel') === 'Close gift claim');
    expect(closeButton).toBeTruthy();
    await closeButton.trigger('click');
    await nextTick();

    expect(wrapper.emitted('close')).toBeTruthy();
  });

  it('has correct accessibility attributes', () => {
    const wrapper = mount(GiftClaimModal, {
      props: { open: true },
      global: {
        mocks: {
          $t: (key) => key,
        },
      },
    });

    const baseModal = wrapper.findComponent(BaseModal);
    expect(baseModal.props('ariaLabelledby')).toBe('gift-claim-title');
    expect(baseModal.props('ariaDescribedby')).toBe('gift-claim-desc');
  });
});
