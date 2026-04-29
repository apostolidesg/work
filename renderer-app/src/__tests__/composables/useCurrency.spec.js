import { describe, it, expect } from 'vitest';
import { useCurrency } from '@/composables/useCurrency';

describe('useCurrency', () => {
  describe('formatSimple', () => {
    it('formats with simple euro symbol', () => {
      const { formatSimple } = useCurrency();
      expect(formatSimple(100)).toBe('€100.00');
      expect(formatSimple(0)).toBe('€0.00');
      expect(formatSimple(1234.56)).toBe('€1234.56');
    });

    it('handles invalid inputs', () => {
      const { formatSimple } = useCurrency();
      expect(formatSimple(null)).toBe('€0.00');
      expect(formatSimple(NaN)).toBe('€0.00');
    });

    it('always shows 2 decimal places', () => {
      const { formatSimple } = useCurrency();
      expect(formatSimple(10)).toBe('€10.00');
      expect(formatSimple(10.5)).toBe('€10.50');
      expect(formatSimple(10.999)).toBe('€11.00');
    });
  });
});
