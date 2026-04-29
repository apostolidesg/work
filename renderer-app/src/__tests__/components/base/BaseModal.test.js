import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseModal from '@/components/base/BaseModal.vue';
import { nextTick } from 'vue';

describe('BaseModal', () => {
  beforeEach(() => {
    document.body.style.overflow = '';
    document.body.innerHTML = '';
  });

  afterEach(() => {
    document.body.style.overflow = '';
    document.body.innerHTML = '';
  });

  it('does not render when closed', () => {
    const wrapper = mount(BaseModal, {
      props: {
        open: false,
      },
    });

    expect(wrapper.find('[role="dialog"]').exists()).toBe(false);
  });

  it('renders when open', async () => {
    const wrapper = mount(BaseModal, {
      props: {
        open: true,
      },
      attachTo: document.body,
    });

    await nextTick();

    const dialog = document.querySelector('[role="dialog"]');
    expect(dialog).toBeTruthy();

    wrapper.unmount();
  });

  it('renders slot content', async () => {
    const wrapper = mount(BaseModal, {
      props: {
        open: true,
      },
      slots: {
        default: '<div class="test-content">Modal Content</div>',
      },
      attachTo: document.body,
    });

    await nextTick();

    expect(document.body.textContent).toContain('Modal Content');

    wrapper.unmount();
  });

  describe('modal styling', () => {
    it('applies default width', async () => {
      const wrapper = mount(BaseModal, {
        props: {
          open: true,
        },
        attachTo: document.body,
      });

      await nextTick();

      const dialog = document.querySelector('[role="dialog"]');
      const style = dialog.getAttribute('style');
      expect(style).toContain('width: 600px');

      wrapper.unmount();
    });

    it('applies custom width as number', async () => {
      const wrapper = mount(BaseModal, {
        props: {
          open: true,
          width: 800,
        },
        attachTo: document.body,
      });

      await nextTick();

      const dialog = document.querySelector('[role="dialog"]');
      const style = dialog.getAttribute('style');
      expect(style).toContain('width: 800px');

      wrapper.unmount();
    });

    it('applies custom width as string', async () => {
      const wrapper = mount(BaseModal, {
        props: {
          open: true,
          width: '90%',
        },
        attachTo: document.body,
      });

      await nextTick();

      const dialog = document.querySelector('[role="dialog"]');
      const style = dialog.getAttribute('style');
      expect(style).toContain('width: 90%');

      wrapper.unmount();
    });

    it('applies default padding', async () => {
      const wrapper = mount(BaseModal, {
        props: {
          open: true,
        },
        attachTo: document.body,
      });

      await nextTick();

      const dialog = document.querySelector('[role="dialog"]');
      const style = dialog.getAttribute('style');
      expect(style).toContain('padding: 48px');

      wrapper.unmount();
    });

    it('applies custom padding', async () => {
      const wrapper = mount(BaseModal, {
        props: {
          open: true,
          padding: 24,
        },
        attachTo: document.body,
      });

      await nextTick();

      const dialog = document.querySelector('[role="dialog"]');
      const style = dialog.getAttribute('style');
      expect(style).toContain('padding: 24px');

      wrapper.unmount();
    });

    it('has rounded corners', async () => {
      const wrapper = mount(BaseModal, {
        props: {
          open: true,
        },
        attachTo: document.body,
      });

      await nextTick();

      const dialog = document.querySelector('[role="dialog"]');
      expect(dialog.classList.contains('atw:rounded-3xl')).toBe(true);

      wrapper.unmount();
    });

    it('has shadow', async () => {
      const wrapper = mount(BaseModal, {
        props: {
          open: true,
        },
        attachTo: document.body,
      });

      await nextTick();

      const dialog = document.querySelector('[role="dialog"]');
      expect(dialog.classList.contains('atw:shadow-[0_24px_48px_rgba(0,0,0,0.3)]')).toBe(true);

      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has role="dialog"', async () => {
      const wrapper = mount(BaseModal, {
        props: {
          open: true,
        },
        attachTo: document.body,
      });

      await nextTick();

      const dialog = document.querySelector('[role="dialog"]');
      expect(dialog).toBeTruthy();

      wrapper.unmount();
    });

    it('has aria-modal="true"', async () => {
      const wrapper = mount(BaseModal, {
        props: {
          open: true,
        },
        attachTo: document.body,
      });

      await nextTick();

      const dialog = document.querySelector('[role="dialog"]');
      expect(dialog.getAttribute('aria-modal')).toBe('true');

      wrapper.unmount();
    });

    it('sets aria-labelledby when provided', async () => {
      const wrapper = mount(BaseModal, {
        props: {
          open: true,
          ariaLabelledby: 'modal-title',
        },
        attachTo: document.body,
      });

      await nextTick();

      const dialog = document.querySelector('[role="dialog"]');
      expect(dialog.getAttribute('aria-labelledby')).toBe('modal-title');

      wrapper.unmount();
    });

    it('sets aria-describedby when provided', async () => {
      const wrapper = mount(BaseModal, {
        props: {
          open: true,
          ariaDescribedby: 'modal-description',
        },
        attachTo: document.body,
      });

      await nextTick();

      const dialog = document.querySelector('[role="dialog"]');
      expect(dialog.getAttribute('aria-describedby')).toBe('modal-description');

      wrapper.unmount();
    });

    it('sets aria-label when provided', async () => {
      const wrapper = mount(BaseModal, {
        props: {
          open: true,
          ariaLabel: 'Confirmation dialog',
        },
        attachTo: document.body,
      });

      await nextTick();

      const dialog = document.querySelector('[role="dialog"]');
      expect(dialog.getAttribute('aria-label')).toBe('Confirmation dialog');

      wrapper.unmount();
    });
  });

  describe('body scroll lock', () => {
    it('locks body scroll when opened', async () => {
      const wrapper = mount(BaseModal, {
        props: {
          open: false,
        },
      });

      expect(document.body.style.overflow).toBe('');

      await wrapper.setProps({ open: true });
      await nextTick();

      expect(document.body.style.overflow).toBe('hidden');

      wrapper.unmount();
    });
  });

  describe('transitions', () => {
    it('has backdrop transition classes', async () => {
      const wrapper = mount(BaseModal, {
        props: {
          open: true,
        },
        attachTo: document.body,
      });

      await nextTick();

      const html = document.body.innerHTML;
      expect(html).toContain('transition-opacity');

      wrapper.unmount();
    });
  });
});
