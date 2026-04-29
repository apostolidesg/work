import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
vi.mock('@/components/modals/InfoModal.vue', () => ({ default: { name: 'InfoModal' } }));
vi.mock('@/components/modals/ConfirmModal.vue', () => ({ default: { name: 'ConfirmModal' } }));

import { useModalService } from '@/composables/useModalService';

describe('useModalService', () => {
  let svc;

  beforeEach(() => {
    vi.useFakeTimers();
    svc = useModalService();
    svc.closeAll();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('open pushes modal and returns id', () => {
    const id = svc.open({ name: 'Comp' }, { foo: 'bar' });
    expect(svc.stack.value.length).toBe(1);
    const modal = svc.stack.value[0];
    expect(modal.id).toBe(id);
    expect(modal.props.foo).toBe('bar');
    expect(modal.closable).toBe(true);
  });

  it('duration auto-closes modal', () => {
    svc.open({ name: 'Comp' }, { duration: 1000 });
    expect(svc.stack.value.length).toBe(1);
    vi.advanceTimersByTime(1000);
    expect(svc.stack.value.length).toBe(0);
  });

  it('close removes the last modal and preserves others', () => {
    const a = svc.open({ name: 'a' }, { duration: 5000 });
    const b = svc.open({ name: 'b' }, { duration: 5000 });
    svc.close();
    expect(svc.stack.value.find((m) => m.id === b)).toBeUndefined();
    expect(svc.stack.value.find((m) => m.id === a)).toBeTruthy();
  });

  it('closeById removes the correct modal', () => {
    const a = svc.open({ name: 'a' });
    const b = svc.open({ name: 'b' });
    svc.closeById(a);
    expect(svc.stack.value.find((m) => m.id === a)).toBeUndefined();
    expect(svc.stack.value.find((m) => m.id === b)).toBeTruthy();
  });

  it('closeAll clears all modals', () => {
    svc.open({ name: 'a' }, { duration: 1000 });
    svc.open({ name: 'b' }, { duration: 1000 });
    svc.closeAll();
    expect(svc.stack.value.length).toBe(0);
  });

  it('info helper opens an InfoModal', () => {
    svc.info({ title: 'hello' });
    const m = svc.stack.value.find((m) => m.component && m.component.name === 'InfoModal');
    expect(m).toBeTruthy();
  });
});
