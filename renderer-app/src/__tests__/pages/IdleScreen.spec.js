import { ref, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { beforeEach, describe, it, expect, vi } from 'vitest';
import IdleScreen from '@/pages/IdleScreen.vue';

const mockAppConfig = ref({
  IDLE_SCREEN: {
    portrait: { MEDIA_URL: { en: '' } },
    landscape: { MEDIA_URL: { en: '' } },
  },
});
const mockOrientation = ref('portrait');
const mockLocale = ref('en');

vi.mock('@/composables/useConfiguration', () => ({
  useConfiguration: () => ({ appConfig: mockAppConfig }),
}));
vi.mock('@/composables/useOrientation', () => ({
  useOrientation: () => ({ orientation: mockOrientation }),
}));
vi.mock('@unify/vuex-i18n', () => ({
  useI18nPlugin: () => ({
    locale: () => mockLocale.value,
  }),
}));

describe('IdleScreen.vue', () => {
  beforeEach(() => {
    mockAppConfig.value = {
      IDLE_SCREEN: {
        portrait: { MEDIA_URL: { en: '' } },
        landscape: { MEDIA_URL: { en: '' } },
      },
    };
    mockOrientation.value = 'portrait';
    mockLocale.value = 'en';
  });

  it('renders video when MEDIA_URL points to a video file', async () => {
    mockAppConfig.value.IDLE_SCREEN.portrait.MEDIA_URL.en = 'https://example.com/idle.mp4';
    mockOrientation.value = 'portrait';
    mockLocale.value = 'en';

    const wrapper = mount(IdleScreen);
    await nextTick();

    const video = wrapper.find('video');
    const img = wrapper.find('img');

    expect(video.exists()).toBe(true);
    expect(video.attributes('src')).toBe('https://example.com/idle.mp4');
    expect(img.exists()).toBe(false);
  });

  it('renders img when MEDIA_URL points to an image file', async () => {
    mockAppConfig.value.IDLE_SCREEN.landscape.MEDIA_URL.en = 'https://example.com/idle.jpg';
    mockOrientation.value = 'landscape';
    mockLocale.value = 'en';

    const wrapper = mount(IdleScreen);
    await nextTick();

    const video = wrapper.find('video');
    const img = wrapper.find('img');

    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe('https://example.com/idle.jpg');
    expect(video.exists()).toBe(false);
  });

  it('detects video even with query/hash in URL', async () => {
    mockAppConfig.value.IDLE_SCREEN.portrait.MEDIA_URL.en = 'https://example.com/idle.mp4?token=1#hash';
    mockOrientation.value = 'portrait';
    mockLocale.value = 'en';

    const wrapper = mount(IdleScreen);
    await nextTick();

    const video = wrapper.find('video');
    expect(video.exists()).toBe(true);
    expect(video.attributes('src')).toBe('https://example.com/idle.mp4?token=1#hash');
  });
});
