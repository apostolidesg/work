import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';
import { useModal, useModals } from '@/composables/useModal';

function withSetup(composable) {
  let result;
  const app = mount(
    defineComponent({
      setup() {
        result = composable();
        return () => h('div');
      },
    })
  );
  return [result, app];
}

describe('useModal', () => {
  beforeEach(() => {
    document.body.style.overflow = '';
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('initializes with closed state by default', () => {
    const [{ isOpen }, app] = withSetup(() => useModal());
    expect(isOpen.value).toBe(false);
    app.unmount();
  });

  it('initializes with custom state', () => {
    const [{ isOpen }, app] = withSetup(() => useModal(true));
    expect(isOpen.value).toBe(true);
    app.unmount();
  });

  describe('open', () => {
    it('opens the modal', () => {
      const [{ isOpen, open }, app] = withSetup(() => useModal());
      open();
      expect(isOpen.value).toBe(true);
      app.unmount();
    });
  });

  describe('close', () => {
    it('closes the modal', () => {
      const [{ isOpen, open, close }, app] = withSetup(() => useModal());
      open();
      close();
      expect(isOpen.value).toBe(false);
      app.unmount();
    });
  });

  describe('toggle', () => {
    it('toggles modal state', () => {
      const [{ isOpen, toggle }, app] = withSetup(() => useModal());
      expect(isOpen.value).toBe(false);
      toggle();
      expect(isOpen.value).toBe(true);
      toggle();
      expect(isOpen.value).toBe(false);
      app.unmount();
    });
  });
});

describe('useModals', () => {
  beforeEach(() => {
    document.body.style.overflow = '';
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('creates multiple modals', () => {
    const [{ modals }, app] = withSetup(() => useModals(['login', 'signup', 'profile']));
    expect(modals.login).toBeDefined();
    expect(modals.signup).toBeDefined();
    expect(modals.profile).toBeDefined();
    app.unmount();
  });

  it('each modal operates independently', () => {
    const [{ modals }, app] = withSetup(() => useModals(['modal1', 'modal2']));
    modals.modal1.open();
    expect(modals.modal1.isOpen.value).toBe(true);
    expect(modals.modal2.isOpen.value).toBe(false);
    app.unmount();
  });

  it('closeAll closes all modals', () => {
    const [{ modals, closeAll }, app] = withSetup(() => useModals(['modal1', 'modal2', 'modal3']));
    modals.modal1.open();
    modals.modal2.open();
    modals.modal3.open();
    expect(modals.modal1.isOpen.value).toBe(true);
    expect(modals.modal2.isOpen.value).toBe(true);
    expect(modals.modal3.isOpen.value).toBe(true);
    closeAll();
    expect(modals.modal1.isOpen.value).toBe(false);
    expect(modals.modal2.isOpen.value).toBe(false);
    expect(modals.modal3.isOpen.value).toBe(false);
    app.unmount();
  });
});
