import { describe, expect, it, vi, beforeEach } from 'vitest';
import { useGoogleAnalytics } from '@/composables/useGoogleAnalytics';
import gaService from '@/services/gaService';
import gtmEvents from '@/constants/gtmEvents';

vi.mock('@/services/gaService', () => ({
  default: {
    sendEvent: vi.fn(),
  },
}));

describe('useGoogleAnalytics composable', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('trackEvent', () => {
    it('should call sendEvent with correct parameters', () => {
      const { trackEvent } = useGoogleAnalytics();

      trackEvent('test_event', { param1: 'value1' });

      expect(gaService.sendEvent).toHaveBeenCalledWith('test_event', { param1: 'value1' });
    });

    it('should call sendEvent with empty params when not provided', () => {
      const { trackEvent } = useGoogleAnalytics();

      trackEvent('test_event');

      expect(gaService.sendEvent).toHaveBeenCalledWith('test_event', {});
    });
  });

  describe('Game Submissions', () => {
    it('should track Kino submit with bet data', () => {
      const { trackKinoSubmit } = useGoogleAnalytics();

      const betData = {
        amount: 5.0,
        numbers: [1, 5, 12, 23, 34, 45],
        consecutiveDraws: 3,
        multiplier: 2,
        hasKinoBonus: true,
      };

      trackKinoSubmit(betData);

      expect(gaService.sendEvent).toHaveBeenCalledWith(
        gtmEvents.SSBT_LOTTERY_KINO_MANUAL_SUBMIT,
        expect.objectContaining({
          bet_amount: 5.0,
          selected_numbers: 6,
          consecutive_draws: 3,
          multiplier: 2,
          has_kino_bonus: true,
        })
      );
    });

    it('should track Kino submit with empty bet data', () => {
      const { trackKinoSubmit } = useGoogleAnalytics();

      trackKinoSubmit();

      expect(gaService.sendEvent).toHaveBeenCalledWith(
        gtmEvents.SSBT_LOTTERY_KINO_MANUAL_SUBMIT,
        expect.objectContaining({
          bet_amount: undefined,
          selected_numbers: undefined,
        })
      );
    });

    it('should track Powerspin submit with bet data', () => {
      const { trackPowerspinSubmit } = useGoogleAnalytics();

      const betData = {
        amount: 10.0,
        consecutiveDraws: 5,
        playMode: 'WHEELS',
      };

      trackPowerspinSubmit(betData);

      expect(gaService.sendEvent).toHaveBeenCalledWith(
        gtmEvents.SSBT_LOTTERY_POWERSPIN_MANUAL_SUBMIT,
        expect.objectContaining({
          bet_amount: 10.0,
          consecutive_draws: 5,
          play_mode: 'WHEELS',
        })
      );
    });

    it('should track Fireblaze submit with bet data', () => {
      const { trackFireblazeSubmit } = useGoogleAnalytics();

      const betData = {
        amount: 3.0,
        consecutiveDraws: 2,
      };

      trackFireblazeSubmit(betData);

      expect(gaService.sendEvent).toHaveBeenCalledWith(
        gtmEvents.SSBT_LOTTERY_FIREBLAZE_MANUAL_SUBMIT,
        expect.objectContaining({
          bet_amount: 3.0,
          consecutive_draws: 2,
        })
      );
    });

    it('should track Eurojackpot submit with bet data', () => {
      const { trackEurojackpotSubmit } = useGoogleAnalytics();

      const betData = {
        amount: 2.0,
        mainNumbers: [5, 12, 23, 34, 45],
        euroNumbers: [3, 7],
        consecutiveDraws: 1,
      };

      trackEurojackpotSubmit(betData);

      expect(gaService.sendEvent).toHaveBeenCalledWith(
        gtmEvents.SSBT_LOTTERY_EUROJACKPOT_MANUAL_SUBMIT,
        expect.objectContaining({
          bet_amount: 2.0,
          main_numbers: 5,
          euro_numbers: 2,
          consecutive_draws: 1,
        })
      );
    });

    it('should include all betData properties in Kino submit', () => {
      const { trackKinoSubmit } = useGoogleAnalytics();

      const betData = {
        amount: 5.0,
        numbers: [1, 5, 12],
        consecutiveDraws: 3,
        multiplier: 2,
        hasKinoBonus: true,
        customProp: 'custom_value',
      };

      trackKinoSubmit(betData);

      expect(gaService.sendEvent).toHaveBeenCalledWith(
        gtmEvents.SSBT_LOTTERY_KINO_MANUAL_SUBMIT,
        expect.objectContaining({
          bet_amount: 5.0,
          selected_numbers: 3,
          consecutive_draws: 3,
          multiplier: 2,
          has_kino_bonus: true,
          customProp: 'custom_value',
        })
      );
    });
  });

  describe('Idle Tracking', () => {
    it('should track idle start with time in seconds', () => {
      const { trackIdleStart } = useGoogleAnalytics();

      trackIdleStart(300);

      expect(gaService.sendEvent).toHaveBeenCalledWith(gtmEvents.SSBT_LOTTERY_IDLE_START, {
        idle_time_seconds: 300,
      });
    });

    it('should track idle end with duration in seconds', () => {
      const { trackIdleEnd } = useGoogleAnalytics();

      trackIdleEnd(450);

      expect(gaService.sendEvent).toHaveBeenCalledWith(gtmEvents.SSBT_LOTTERY_IDLE_END, {
        idle_duration_seconds: 450,
      });
    });
  });

  describe('Exports', () => {
    it('should export gtmEvents as events', () => {
      const { events } = useGoogleAnalytics();

      expect(events).toBe(gtmEvents);
    });
  });
});
