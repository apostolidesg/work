import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { defineComponent, h, nextTick } from 'vue';
import { mount } from '@vue/test-utils';

const floating = vi.hoisted(() => ({
  x: null,
  y: null,
  placement: null,
  middlewareData: null,
  isPositioned: null,
}));

vi.mock('@floating-ui/vue', async () => {
  const { ref } = await import('vue');

  floating.x ??= ref(24);
  floating.y ??= ref(48);
  floating.placement ??= ref('bottom-start');
  floating.middlewareData ??= ref({ arrow: { x: 10, y: 6 } });
  floating.isPositioned ??= ref(true);

  return {
    useFloating: vi.fn(() => ({
      x: floating.x,
      y: floating.y,
      placement: floating.placement,
      middlewareData: floating.middlewareData,
      isPositioned: floating.isPositioned,
    })),
    offset: vi.fn((value) => ({ name: 'offset', options: value })),
    flip: vi.fn(() => ({ name: 'flip' })),
    shift: vi.fn((options) => ({ name: 'shift', options })),
    autoUpdate: vi.fn(),
    arrow: vi.fn((options) => ({ name: 'arrow', options })),
  };
});

import { usePopover } from '@/composables/usePopover';
import { useFloating, offset, flip, shift, autoUpdate, arrow as floatingArrow } from '@floating-ui/vue';

const mountedApps = [];

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

  mountedApps.push(app);
  return result;
}

function attachDom(popover) {
  const trigger = document.createElement('button');
  const panel = document.createElement('div');
  const panelContent = document.createElement('span');
  const outside = document.createElement('button');

  panel.appendChild(panelContent);
  document.body.append(trigger, panel, outside);

  popover.triggerRef.value = trigger;
  popover.popoverRef.value = panel;

  return { trigger, panelContent, outside };
}

describe('usePopover', () => {
  beforeEach(() => {
    floating.x.value = 24;
    floating.y.value = 48;
    floating.placement.value = 'bottom-start';
    floating.middlewareData.value = { arrow: { x: 10, y: 6 } };
    floating.isPositioned.value = true;

    document.body.innerHTML = '';
    vi.clearAllMocks();
  });

  afterEach(() => {
    while (mountedApps.length) {
      mountedApps.pop().unmount();
    }

    document.body.innerHTML = '';
  });

  it('configures floating-ui with arrow middleware by default', () => {
    const popover = withSetup(() => usePopover({ placement: 'top-end' }));

    const [, popoverRefArg, options] = useFloating.mock.calls[0];

    expect(popoverRefArg).toBe(popover.popoverRef);
    expect(options).toMatchObject({
      placement: 'top-end',
      whileElementsMounted: autoUpdate,
    });
    expect(offset).toHaveBeenCalledWith(12);
    expect(flip).toHaveBeenCalledTimes(1);
    expect(shift).toHaveBeenCalledWith({ padding: 5 });
    expect(floatingArrow).toHaveBeenCalledWith({ element: popover.arrowRef });
  });

  it('uses a smaller offset and skips arrow middleware when arrow is false', () => {
    withSetup(() => usePopover({ arrow: false }));

    expect(offset).toHaveBeenCalledWith(8);
    expect(floatingArrow).not.toHaveBeenCalled();
  });

  it('builds floating and arrow styles from floating-ui state', () => {
    const popover = withSetup(() => usePopover());

    expect(popover.floatingStyles.value).toEqual({
      position: 'absolute',
      left: '24px',
      top: '48px',
      transformOrigin: '14px top',
    });

    expect(popover.arrowStyles.value).toEqual({
      position: 'absolute',
      left: '10px',
      top: '-4px',
    });
  });

  it('returns hidden positioning styles until the popover is positioned', () => {
    floating.isPositioned.value = false;

    const popover = withSetup(() => usePopover());

    expect(popover.floatingStyles.value).toEqual({
      position: 'absolute',
      top: '',
      left: '',
    });
  });

  it('ignores pointerdown events inside the trigger or popover and closes on outside click', async () => {
    const popover = withSetup(() => usePopover());
    const { trigger, panelContent, outside } = attachDom(popover);

    popover.open({ currentTarget: trigger });
    expect(popover.isOpen.value).toBe(true);

    trigger.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    await nextTick();
    expect(popover.isOpen.value).toBe(true);

    panelContent.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    await nextTick();
    expect(popover.isOpen.value).toBe(true);

    outside.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    await nextTick();
    expect(popover.isOpen.value).toBe(false);
  });

  it('closes the previously active popover when a new one opens', () => {
    const first = withSetup(() => usePopover());
    const second = withSetup(() => usePopover());

    const firstTrigger = document.createElement('button');
    const secondTrigger = document.createElement('button');
    document.body.append(firstTrigger, secondTrigger);

    first.open({ currentTarget: firstTrigger });
    second.open({ currentTarget: secondTrigger });

    expect(first.isOpen.value).toBe(false);
    expect(second.isOpen.value).toBe(true);
  });
});
