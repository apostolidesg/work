import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';

const popover = vi.hoisted(() => ({
  isOpen: null,
  floatingStyles: null,
  arrowStyles: null,
  isPositioned: null,
  triggerRef: null,
  popoverRef: null,
  arrowRef: null,
  open: vi.fn(),
  close: vi.fn(),
  toggle: vi.fn(),
}));

vi.mock('@/composables/usePopover', async () => {
  const { ref } = await import('vue');

  popover.isOpen ??= ref(false);
  popover.floatingStyles ??= ref({ position: 'absolute', left: '12px', top: '18px' });
  popover.arrowStyles ??= ref({ position: 'absolute', left: '6px', top: '-4px' });
  popover.isPositioned ??= ref(true);
  popover.triggerRef ??= ref(null);
  popover.popoverRef ??= ref(null);
  popover.arrowRef ??= ref(null);

  popover.open.mockImplementation(() => {
    popover.isOpen.value = true;
  });

  popover.close.mockImplementation(() => {
    popover.isOpen.value = false;
  });

  popover.toggle.mockImplementation(() => {
    popover.isOpen.value = !popover.isOpen.value;
  });

  return {
    usePopover: vi.fn(() => ({
      isOpen: popover.isOpen,
      floatingStyles: popover.floatingStyles,
      arrowStyles: popover.arrowStyles,
      isPositioned: popover.isPositioned,
      triggerRef: popover.triggerRef,
      popoverRef: popover.popoverRef,
      arrowRef: popover.arrowRef,
      open: popover.open,
      close: popover.close,
      toggle: popover.toggle,
    })),
  };
});

import BasePopover from '@/components/base/BasePopover.vue';
import { usePopover } from '@/composables/usePopover';

const mountComponent = (props = {}, slots = {}) =>
  mount(BasePopover, {
    props,
    slots: {
      default: '<button class="trigger-content">Trigger</button>',
      content: '<div class="popover-content">Popover content</div>',
      ...slots,
    },
    attachTo: document.body,
  });

describe('BasePopover', () => {
  let wrapper;

  beforeEach(() => {
    popover.isOpen.value = false;
    popover.floatingStyles.value = { position: 'absolute', left: '12px', top: '18px' };
    popover.arrowStyles.value = { position: 'absolute', left: '6px', top: '-4px' };
    popover.isPositioned.value = true;
    popover.triggerRef.value = null;
    popover.popoverRef.value = null;
    popover.arrowRef.value = null;

    vi.clearAllMocks();
    document.body.innerHTML = '';

    popover.open.mockImplementation(() => {
      popover.isOpen.value = true;
    });

    popover.close.mockImplementation(() => {
      popover.isOpen.value = false;
    });

    popover.toggle.mockImplementation(() => {
      popover.isOpen.value = !popover.isOpen.value;
    });
  });

  afterEach(() => {
    wrapper?.unmount();
    wrapper = null;
    document.body.innerHTML = '';
  });

  it('passes props to usePopover and renders the trigger slot', () => {
    wrapper = mountComponent({
      placement: 'top-start',
      arrow: false,
      theme: 'custom-theme',
      unstyled: true,
    });

    expect(usePopover).toHaveBeenCalledTimes(1);

    const props = usePopover.mock.calls[0][0];
    expect(props.placement).toBe('top-start');
    expect(props.arrow).toBe(false);
    expect(props.theme).toBe('custom-theme');
    expect(props.unstyled).toBe(true);

    expect(wrapper.find('.trigger-content').exists()).toBe(true);
    expect(wrapper.get('[aria-haspopup="dialog"]').attributes('aria-expanded')).toBe('false');
  });

  it('toggles the popover and emits show when the trigger is clicked', async () => {
    wrapper = mountComponent();

    await wrapper.get('[aria-haspopup="dialog"]').trigger('click');
    await nextTick();

    expect(popover.toggle).toHaveBeenCalledTimes(1);
    expect(wrapper.emitted('show')).toHaveLength(1);
    expect(wrapper.get('[aria-haspopup="dialog"]').attributes('aria-expanded')).toBe('true');
    expect(document.body.querySelector('[role="dialog"]')).toBeTruthy();
  });

  it('renders teleported content with default styling and arrow when open', async () => {
    wrapper = mountComponent({ theme: 'custom-theme' });

    popover.isOpen.value = true;
    await nextTick();

    const dialog = document.body.querySelector('[role="dialog"]');

    expect(dialog).toBeTruthy();
    expect(document.body.textContent).toContain('Popover content');
    expect(dialog.style.visibility).toBe('visible');
    expect(dialog.style.left).toBe('12px');
    expect(dialog.style.top).toBe('18px');
    expect(dialog.classList.contains('custom-theme')).toBe(true);
    expect(dialog.classList.contains('atw:px-4')).toBe(true);
    expect(document.body.querySelector('.atw\\:rotate-45')).toBeTruthy();
  });

  it('hides the arrow when arrow is false', async () => {
    wrapper = mountComponent({ arrow: false });

    popover.isOpen.value = true;
    await nextTick();

    expect(document.body.querySelector('.atw\\:rotate-45')).toBeNull();
  });

  it('removes default styling and arrow when unstyled is true', async () => {
    wrapper = mountComponent({ unstyled: true, theme: 'plain-theme' });

    popover.isOpen.value = true;
    await nextTick();

    const dialog = document.body.querySelector('[role="dialog"]');

    expect(dialog.classList.contains('plain-theme')).toBe(true);
    expect(dialog.classList.contains('atw:px-4')).toBe(false);
    expect(document.body.querySelector('.atw\\:rotate-45')).toBeNull();
  });

  it('uses hidden visibility until positioned and emits hidden when closed', async () => {
    wrapper = mountComponent();

    popover.isPositioned.value = false;
    popover.isOpen.value = true;
    await nextTick();

    expect(document.body.querySelector('[role="dialog"]').style.visibility).toBe('hidden');

    popover.isOpen.value = false;
    await nextTick();

    expect(wrapper.emitted('hidden')).toHaveLength(1);
    expect(document.body.querySelector('[role="dialog"]')).toBeNull();
  });

  it('exposes open, close, toggle and isOpen on the component instance', async () => {
    wrapper = mountComponent();

    expect(wrapper.vm.isOpen).toBe(false);

    wrapper.vm.open();
    await nextTick();
    expect(popover.open).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.isOpen).toBe(true);

    wrapper.vm.close();
    await nextTick();
    expect(popover.close).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.isOpen).toBe(false);

    wrapper.vm.toggle();
    await nextTick();
    expect(popover.toggle).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.isOpen).toBe(true);
  });
});
