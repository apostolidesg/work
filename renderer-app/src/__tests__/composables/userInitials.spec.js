import { describe, it, expect } from 'vitest';
import { ref } from 'vue';
import { useUserInitials } from '@/composables/useUserInitials';

describe('useUserInitials', () => {
  it('extracts initials from full name', () => {
    const { initials } = useUserInitials('John Doe');
    expect(initials.value).toBe('JD');
  });

  it('handles single name', () => {
    const { initials } = useUserInitials('John');
    expect(initials.value).toBe('J');
  });

  it('handles three or more names (takes first and last)', () => {
    const { initials } = useUserInitials('John Michael Doe');
    expect(initials.value).toBe('JD');
  });

  it('handles empty string', () => {
    const { initials } = useUserInitials('');
    expect(initials.value).toBe('U');
  });

  it('handles extra whitespace', () => {
    const { initials } = useUserInitials('  John   Doe  ');
    expect(initials.value).toBe('JD');
  });

  it('converts to uppercase', () => {
    const { initials } = useUserInitials('john doe');
    expect(initials.value).toBe('JD');
  });

  it('works with reactive refs', () => {
    const name = ref('John Doe');
    const { initials } = useUserInitials(name);
    expect(initials.value).toBe('JD');
    name.value = 'Jane Smith';
    expect(initials.value).toBe('JS');
  });

  it('handles non-string ref values', () => {
    const name = ref(123);
    const { initials } = useUserInitials(name);
    expect(initials.value).toBe('U');
  });
});
