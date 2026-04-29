import { describe, it, afterEach, expect } from 'vitest';
import { useOrientation } from '@/composables/useOrientation';
import Constants from '@/util/Constants';

const originalInnerWidth = window.innerWidth;

const setWindowWidth = (value) => {
  Object.defineProperty(window, 'innerWidth', {
    configurable: true,
    writable: true,
    value,
  });
};

describe('useOrientation', () => {
  afterEach(() => {
    setWindowWidth(originalInnerWidth);
  });

  it('returns vertical at BREAKPOINT_HORIZONTAL (1200)', () => {
    setWindowWidth(1200);

    const { isVertical, isSmallHorizontal, isHorizontal, orientation } = useOrientation();

    expect(isVertical.value).toBe(true);
    expect(isSmallHorizontal.value).toBe(false);
    expect(isHorizontal.value).toBe(false);
    expect(orientation.value).toBe(Constants.SSBT_ORIENTATION.VERTICAL);
  });

  it('returns small horizontal just above BREAKPOINT_HORIZONTAL (1201)', () => {
    setWindowWidth(1201);

    const { isVertical, isSmallHorizontal, isHorizontal, orientation } = useOrientation();

    expect(isVertical.value).toBe(false);
    expect(isSmallHorizontal.value).toBe(true);
    expect(isHorizontal.value).toBe(false);
    expect(orientation.value).toBe(Constants.SSBT_ORIENTATION.HORIZONTAL);
  });

  it('keeps 1600 in small horizontal', () => {
    setWindowWidth(1600);

    const { isVertical, isSmallHorizontal, isHorizontal, orientation } = useOrientation();

    expect(isVertical.value).toBe(false);
    expect(isSmallHorizontal.value).toBe(true);
    expect(isHorizontal.value).toBe(false);
    expect(orientation.value).toBe(Constants.SSBT_ORIENTATION.HORIZONTAL);
  });

  it('returns horizontal above BREAKPOINT_SMALL_HORIZONTAL (1601)', () => {
    setWindowWidth(1601);

    const { isVertical, isSmallHorizontal, isHorizontal, orientation } = useOrientation();

    expect(isVertical.value).toBe(false);
    expect(isSmallHorizontal.value).toBe(false);
    expect(isHorizontal.value).toBe(true);
    expect(orientation.value).toBe(Constants.SSBT_ORIENTATION.HORIZONTAL);
  });
});
