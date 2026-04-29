import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '../../testUtils';
import UserMenu from '@/components/header/UserMenu.vue';

describe('UserMenu', () => {
  const defaultProps = {
    initials: 'JD',
  };

  it('renders user initials in button', () => {
    const wrapper = mount(UserMenu, {
      props: defaultProps,
    });

    const button = wrapper.find('button');
    expect(button.text()).toBe('JD');
  });

  describe('dropdown menu', () => {
    it('menu is closed by default', () => {
      const wrapper = mount(UserMenu, {
        props: defaultProps,
      });

      const menu = wrapper.find('[role="menu"]');
      expect(menu.exists()).toBe(false);
    });

    it('opens menu when button is clicked', async () => {
      const wrapper = mount(UserMenu, {
        props: defaultProps,
      });

      const button = wrapper.find('button');
      await button.trigger('click');

      const menu = wrapper.find('[role="menu"]');
      expect(menu.exists()).toBe(true);
    });
  });

  describe('accessibility', () => {
    it('button has correct ARIA attributes when closed', () => {
      const wrapper = mount(UserMenu, {
        props: defaultProps,
      });

      const button = wrapper.find('button');
      expect(button.attributes('aria-label')).toBe('User menu');
      expect(button.attributes('aria-expanded')).toBe('false');
      expect(button.attributes('aria-haspopup')).toBe('true');
    });

    it('button has correct ARIA attributes when open', async () => {
      const wrapper = mount(UserMenu, {
        props: defaultProps,
      });

      const button = wrapper.find('button');
      await button.trigger('click');

      expect(button.attributes('aria-expanded')).toBe('true');
    });

    it('button controls menu via aria-controls', async () => {
      const wrapper = mount(UserMenu, {
        props: defaultProps,
      });

      const button = wrapper.find('button');
      const controlsId = button.attributes('aria-controls');
      await button.trigger('click');
      const menu = wrapper.find('[role="menu"]');
      expect(menu.attributes('id')).toBe(controlsId);
    });

    it('unpair button has correct role', async () => {
      const wrapper = mount(UserMenu, {
        props: defaultProps,
      });

      await wrapper.find('button').trigger('click');

      const unpairButton = wrapper.find('[role="menuitem"]');
      expect(unpairButton.exists()).toBe(true);
    });
  });

  describe('unpair action', () => {
    it('unpair button has red text', async () => {
      const wrapper = mount(UserMenu, {
        props: defaultProps,
      });

      await wrapper.find('button').trigger('click');

      const unpairButton = wrapper.find('[role="menuitem"]');
      expect(unpairButton.classes()).toContain('atw:text-[#E30613]');
    });
  });

  describe('styling', () => {
    it('user avatar has gradient background', () => {
      const wrapper = mount(UserMenu, {
        props: defaultProps,
      });

      const avatar = wrapper.find('button span');
      const avatarButton = avatar.element.closest('button');
      expect(avatarButton.classList.contains('atw:bg-gradient-to-br')).toBe(true);
    });

    it('membership badge has gold background', () => {
      const wrapper = mount(UserMenu, {
        props: defaultProps,
      });

      const badge = wrapper.find('[role="img"]');
      expect(badge.classes()).toContain('atw:bg-[#FFD700]');
    });

    it('menu has shadow and border', async () => {
      const wrapper = mount(UserMenu, {
        props: defaultProps,
      });

      await wrapper.find('button').trigger('click');

      const menu = wrapper.find('[role="menu"]');
      expect(menu.classes()).toContain('atw:shadow-[0_4px_16px_rgba(0,0,0,0.15)]');
      expect(menu.classes()).toContain('atw:border');
      expect(menu.classes()).toContain('atw:rounded-xl');
    });

    it('menu has higher z-index than backdrop', async () => {
      const wrapper = mount(UserMenu, {
        props: defaultProps,
      });

      await wrapper.find('button').trigger('click');

      const menu = wrapper.find('[role="menu"]');
      expect(menu.classes()).toContain('atw:z-50');
    });
  });

  it('menu is positioned absolutely', async () => {
    const wrapper = mount(UserMenu, {
      props: defaultProps,
    });

    await wrapper.find('button').trigger('click');

    const menu = wrapper.find('[role="menu"]');
    expect(menu.classes()).toContain('atw:absolute');
    expect(menu.classes()).toContain('atw:right-0');
    expect(menu.classes()).toContain('atw:top-14');
  });

  it('avatar button has hover effect', () => {
    const wrapper = mount(UserMenu, {
      props: defaultProps,
    });

    const button = wrapper.find('button');
    expect(button.classes()).toContain('atw:hover:opacity-80');
  });
});
