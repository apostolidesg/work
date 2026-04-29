import { mount as vtuMount, shallowMount as vtuShallowMount } from '@vue/test-utils';

export function mount(component, options = {}) {
  const defaultOptions = {
    global: {
      mocks: {
        $t: (key) => key,
        $tc: (key, count) => `${key}_${count}`,
        $te: () => true,
        $d: (date) => date?.toString() || '',
        $n: (number) => number?.toString() || '',
        ...(options.global?.mocks || {}),
      },
      stubs: {
        FontAwesomeIcon: {
          template: '<i data-testid="fa-icon" />',
          props: ['icon'],
        },
        Transition: false,
        TransitionGroup: false,
        Teleport: false,
        ...(options.global?.stubs || {}),
      },
      ...(options.global || {}),
    },
    ...options,
  };

  return vtuMount(component, defaultOptions);
}

export function shallowMount(component, options = {}) {
  const defaultOptions = {
    global: {
      mocks: {
        $t: (key) => key,
        $tc: (key, count) => `${key}_${count}`,
        $te: () => true,
        $d: (date) => date?.toString() || '',
        $n: (number) => number?.toString() || '',
        ...(options.global?.mocks || {}),
      },
      stubs: {
        FontAwesomeIcon: {
          template: '<i data-testid="fa-icon" />',
          props: ['icon'],
        },
        ...(options.global?.stubs || {}),
      },
      ...(options.global || {}),
    },
    ...options,
  };

  return vtuShallowMount(component, defaultOptions);
}
