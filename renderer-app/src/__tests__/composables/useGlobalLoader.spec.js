import { describe, it, expect, beforeEach } from 'vitest';
import { useGlobalLoader } from '@/composables/useGlobalLoader';

describe('useGlobalLoader', () => {
  const resetLoader = () => {
    const { isVisible, hide } = useGlobalLoader();
    while (isVisible.value) {
      hide();
    }
  };

  beforeEach(() => {
    resetLoader();
  });

  it('is hidden by default', () => {
    const { isVisible } = useGlobalLoader();
    expect(isVisible.value).toBe(false);
  });

  it('show makes loader visible', () => {
    const { isVisible, show } = useGlobalLoader();
    show();
    expect(isVisible.value).toBe(true);
  });

  it('hide decrements and never goes below zero', () => {
    const { isVisible, show, hide } = useGlobalLoader();

    show();
    show();
    expect(isVisible.value).toBe(true);

    hide();
    expect(isVisible.value).toBe(true);

    hide();
    expect(isVisible.value).toBe(false);

    hide();
    expect(isVisible.value).toBe(false);
  });

  it('withLoader shows during task and hides after success', async () => {
    const { isVisible, withLoader } = useGlobalLoader();

    const result = await withLoader(async () => {
      expect(isVisible.value).toBe(true);
      return 'ok';
    });

    expect(result).toBe('ok');
    expect(isVisible.value).toBe(false);
  });

  it('withLoader hides after failure and rethrows error', async () => {
    const { isVisible, withLoader } = useGlobalLoader();

    await expect(
      withLoader(async () => {
        expect(isVisible.value).toBe(true);
        throw new Error('error');
      })
    ).rejects.toThrow('error');

    expect(isVisible.value).toBe(false);
  });
});
