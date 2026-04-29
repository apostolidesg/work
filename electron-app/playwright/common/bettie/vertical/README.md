# Vertical Tests

- Resolution: **1080×1920**
- Window mode: **fullscreen: false**
- Launch helper: `launchElectronApp({ width: 1080, height: 1920, fullscreen: false })`

## Behavioral differences in vertical
- Check only one language (en or el). Do not check both for the notExists
- 
- `/play/playGame.quickPlay.button` -> **notExists**
- `/play/playGame.customContainer` -> **notExists**
- 
- `lobby.learnTheGame` -> `lobby.learnTheGameVertical`
- `/learn/FAQ/faq3Answers.answer.cta` -> **notExists**
- 
- `/learn/howTo/howToGame.tapHereToPlay` -> **notExists**
- `/learn/howTo/howToGame.banner` -> **shouldHavegif**
- `/learn/howTo/howToGame.bannerSeparator` -> **isVisible**
- `/learn/howTo/howToGame.linkToPlay.logo` -> **isVisible**
- `/learn/howTo/howToGame.linkToPlay.textGame` -> **shouldHaveText**
- `/learn/howTo/howToGame.linkToPlay` -> **click**
- 
- (add any others…)


## Run only vertical tests
```bash
npx playwright test playwright/e2e/bettie/vertical
