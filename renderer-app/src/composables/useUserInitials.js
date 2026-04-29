import { computed } from 'vue';
export function useUserInitials(name) {
  const initials = computed(() => {
    const nameValue = typeof name === 'string' ? name : name.value;

    if (!nameValue || typeof nameValue !== 'string') {
      return 'U';
    }

    const parts = nameValue.trim().split(/\s+/);
    const first = parts[0]?.[0] || '';
    const last = parts.length > 1 ? parts[parts.length - 1][0] : '';

    return (first + last).toUpperCase() || 'U';
  });

  return { initials };
}
