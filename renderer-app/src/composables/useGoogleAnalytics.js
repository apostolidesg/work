import gaService from '@/services/gaService';
import gtmEvents from '@/constants/gtmEvents';

export function useGoogleAnalytics() {
  const trackEvent = (eventName, params = {}) => {
    gaService.sendEvent(eventName, params);
  };

  const trackApplicationStarted = () => {
    trackEvent(gtmEvents.SSBT_LOTTERY_APPLICATION_STARTED);
  };

  const trackLobby = () => {
    trackEvent(gtmEvents.SSBT_LOTTERY_LOBBY);
  };

  const trackLobbyPlayKino = () => {
    trackEvent(gtmEvents.SSBT_LOTTERY_LOBBY_PLAY_KINO);
  };

  const trackHeaderHelpClick = () => {
    trackEvent(gtmEvents.SSBT_LOTTERY_HEADER_HELP_CLICK);
  };

  const trackHomeButtonClick = () => {
    trackEvent(gtmEvents.SSBT_LOTTERY_HOME_BUTTON_CLICK);
  };

  const trackLanguageToggle = (fromLanguage, toLanguage) => {
    trackEvent(gtmEvents.SSBT_LOTTERY_LANGUAGE_TOGGLE, {
      from_language: fromLanguage,
      to_language: toLanguage,
    });
  };

  const trackPlayAreaKino = () => {
    trackEvent(gtmEvents.SSBT_LOTTERY_PLAY_AREA_KINO);
  };

  const trackPlayAreaPowerspin = () => {
    trackEvent(gtmEvents.SSBT_LOTTERY_PLAY_AREA_POWERSPIN);
  };

  const trackKinoSubmit = (betData = {}) => {
    trackEvent(gtmEvents.SSBT_LOTTERY_KINO_MANUAL_SUBMIT, {
      bet_amount: betData.amount,
      selected_numbers: betData.numbers?.length,
      consecutive_draws: betData.consecutiveDraws,
      multiplier: betData.multiplier,
      has_kino_bonus: betData.hasKinoBonus,
      ...betData,
    });
  };

  const trackPowerspinSubmit = (betData = {}) => {
    trackEvent(gtmEvents.SSBT_LOTTERY_POWERSPIN_MANUAL_SUBMIT, {
      bet_amount: betData.amount,
      consecutive_draws: betData.consecutiveDraws,
      play_mode: betData.playMode,
      ...betData,
    });
  };

  const trackFireblazeSubmit = (betData = {}) => {
    trackEvent(gtmEvents.SSBT_LOTTERY_FIREBLAZE_MANUAL_SUBMIT, {
      bet_amount: betData.amount,
      consecutive_draws: betData.consecutiveDraws,
      ...betData,
    });
  };

  const trackEurojackpotSubmit = (betData = {}) => {
    trackEvent(gtmEvents.SSBT_LOTTERY_EUROJACKPOT_MANUAL_SUBMIT, {
      bet_amount: betData.amount,
      main_numbers: betData.mainNumbers?.length,
      euro_numbers: betData.euroNumbers?.length,
      consecutive_draws: betData.consecutiveDraws,
      ...betData,
    });
  };

  const trackScreensaver = () => {
    trackEvent(gtmEvents.SSBT_LOTTERY_SCREENSAVER);
  };

  const trackIdleStart = (idleTimeSeconds) => {
    trackEvent(gtmEvents.SSBT_LOTTERY_IDLE_START, {
      idle_time_seconds: idleTimeSeconds,
    });
  };

  const trackIdleEnd = (idleDurationSeconds) => {
    trackEvent(gtmEvents.SSBT_LOTTERY_IDLE_END, {
      idle_duration_seconds: idleDurationSeconds,
    });
  };

  return {
    trackEvent,
    trackApplicationStarted,
    trackLobby,
    trackLobbyPlayKino,
    trackHeaderHelpClick,
    trackHomeButtonClick,
    trackLanguageToggle,
    trackPlayAreaKino,
    trackPlayAreaPowerspin,
    trackKinoSubmit,
    trackPowerspinSubmit,
    trackFireblazeSubmit,
    trackEurojackpotSubmit,
    trackScreensaver,
    trackIdleStart,
    trackIdleEnd,
    events: gtmEvents,
  };
}
