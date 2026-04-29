// playwright/pageObject/bettie/learn/FAQ/FAQ3AnswersGame.js
const { expect } = require('@playwright/test');
import faq2Questions from './FAQ2QuestionsGame';
const world = require('#/pageObjects/lib/world');

const pages = {
  goBack: {
    // can be found on /bettie/lobbyBettie.js
  },
  answer: {
    get: function (page) {
      return page.locator('.faq-text__content');
    },
    isVisible: async function (page) {
      await expect(this.get(page)).toBeVisible();
    },
    title: {
      get: function (page) {
        return page.locator('.faq-text__title');
      },
      // expect title toHaveText the same as i in question in FAQ2
      shouldMatchQuestionAt: async function (page, game, index) {
        await expect(this.get(page)).toHaveText(faq2Questions.question.text[game][world.lang][index]);
      },
    },
    close: {
      get: function (page) {
        return page.locator('.faq-text__close');
      },
      isVisible: async function (page) {
        await expect(this.get(page)).toBeVisible();
      },
    },
    description: {
      get: function (page) {
        return page.locator('.faq-text__description');
      },
      text: {
        kino: {
          el: [
            'Μπορείς να παίξεις από αυτήν εδώ την οθόνη απλά πηγαίνοντας στην αρχική σελίδα (πατάς πάνω αριστερά στην οθόνη), Τα βήματα είναι απλά. Βήμα 1 Επιλέγεις 1 έως 12 αριθμούς (κληρώνονται 20 από τους 80). Βήμα 2 Επιλέγεις με πόσα χρήματα θέλεις να παίξεις σε κάθε κλήρωση.Είτε επιλέξεις 1 είτε 12 αριθμούς, το κόστος παραμένει το ίδιο. Αυτό που αλλάζει είναι τα κέρδη που μπορείς να διεκδικήσεις (η απόδοση δηλαδή). Βήμα 3 Πατάς \"Αποδοχή\" και το αποδεικτικό συμμετοχής σου τυπώνεται.Μπορείς επίσης να συμπληρώνεις ένα φυσικό δελτίο, το καταθέτεις στον υπάλληλο του καταστήματος και παραλαμβάνεις το αποδεικτικό συμμετοχής.',
            'Δεν θα πω πολλά…Είναι εύκολο, γρήγορο (κληρώσεις κάθε 5 λεπτά) και με ένα μικρό ποσό (ελάχιστο 0,50€) μπορείς να διεκδικήσεις μεγάλα κέρδη (μέχρι και 500.000€ για τα 0,50€)',
            'Εξαρτάται από το πόσα θέλεις να κερδίσεις και πόσο τυχερός νιώθεις. Όσο περισσότερους αριθμούς επιλέξεις τόσο μεγαλύτερο είναι το ποσό που μπορείς να διεκδικήσεις εάν τους πετύχεις όλους.',
            'Το κόστος είναι το ίδιο στο ΚΙΝΟ είτε επιλέξεις 1 είτε 12 αριθμούς έχουν το ίδιο κόστος. Αυτό που αλλάζει είναι η απόδοση.Παραδείγματα:Εάν ποντάρεις 0,5€:1. Με επιλογή 3 αριθμών (παιχνίδι 3), κερδίζεις 12,5€ αν   προβλέψεις σωστά 3 στα 3 2. Με επιλογή 12 αριθμών (παιχνίδι 12),   κερδίζεις 500.000€, για 12 στα 12 αλλά αν προβλέψεις    σωστά 9 αριθμούς (παιχνίδι 9  στα 12),  κερδίζεις 500   ευρώ.',
            'Είναι πολύ εύκολο! Απλά ακολουθείς τα παρακάτω βήματα:1.  Ζητάς  την έκδοση κουπονιού/voucher από τον υπάλληλο   του καταστήματος/πράκτορα, δίνοντας το αντίστοιχο    2. Αφού το πάρεις, το σκανάρεις (Tο ποσό της αξίας του  φαίνεται πάνω δεξιά στην οθόνη)3. Παίζεις το παιχνίδι που επιθυμείς, πατώντας στην οθόνη  τους αριθμούς που επιθυμείς και με το κουμπί    «ΑΠΟΔΟΧΗ»   εκτυπώνεις το αποδεικτικό συμμετοχής.    Αυτό ήταν… καλή επιτυχία στην επόμενη κλήρωση! Τips:Πως προσθέτω τα κέρδη μου στην οθόνη  Σκανάροντας ένα κερδισμένο δελτίο, φορτώνεις αν θέλεις το ποσό στο υπόλοιπό σου (που φαίνεται πάνω δεξιά στην οθόνη). Πως παίρνω τα κέρδη μου  .1. Πατάς την επιλογή \"Εξαργύρωση\" (που βρίσκεται στο   πάνω μέρος στην οθόνη) και εκτυπώνεται voucher ίσης αξίας  με το υπόλοιπό σου2. Πηγαίνεις στον υπάλληλο καταστήματος για να το   εξαργυρώσεις ή μπορεί να χρησιμοποιηθεί για   μελλοντικό παιχνίδι.',
          ],
          en: [
            'You can play from this screen by simply going to the home page (tap on the top left of the screen).The steps are simple!Step 1Select between 1 and 12 numbers (20 out of 80 are drawn).Step 2 You decide how much money you want to play with in each draw.Whether you select 1 or 12 numbers, the participation cost remains the same. The only thing that changes is the winnings you can claim (i.e. the odds).Step 3 Press “Accept” and your entry ticket is printed.You can also fill out a physical slip, submit it to the store employee and receive your entry ticket',
            'I won’t say much…It’s quick, easy (draws are happening every 5 minutes) and with a small cost (€0.50 minimum) you can claim big winnings (up to €500,000 for €0.50).',
            'That depends on how much you want to win and how lucky you feel. The more numbers you select, the bigger the amount you can claim if you predict them all correctly.',
            'In KINO whether you select 1 or 12 numbers the cost is the same. What changes is the odd.Examples:If you bet €0.5:1. With a choice of 3 numbers (game 3), you win €12.5 if  correctly predict 3 out of 3 2. With a choice of 12 numbers (game 12), you win  €500,000, for 12 out of 12, but if you correctly predict 9   numbers (game 9 out of 12), you win €500.',
            "It's very simple! Just follow the steps below:1. You ask the store employee to issue a voucher for the   corresponding amount. 2. After receiving it, scan the voucher (the value will be  displayed at the top right of the screen) 3. To play, tap the numbers you wish to select on the screen   and press the “ACCEPT” button to print your voucher. That’s it… good luck in the next draw!Τips:How do I add my winnings to the screen?By scanning a winning slip, you can add, if you would like, the amount to your balance (shown at the top right of the screen).How do I get my winnings?1. Press the “Redemption“ option (located at the top of the   screen) and print a voucher equal to your balance.2. Go to the store employee to redeem your voucher or use   it in a future play.",
          ],
        },
        powerspin: {
          el: [
            'Μπορείς να παίξεις από αυτήν εδώ την οθόνη απλά πηγαίνοντας στην αρχική σελίδα (πατάς πάνω αριστερά στην οθόνη), Τα βήματα είναι απλά.Βήμα 1Επιλέγεις-    αριθμό ή αριθμούς-    ή και σύμβολο-    ή και το χρώμα/ζώνηΠου πιστεύεις πως θα σταματήσει ο τροχός.Βήμα 2Επιλέγεις με πόσα χρήματα θέλεις να παίξεις για κάθε επιλογή σου ξεχωριστά.Βήμα 3Πατάς \"Αποδοχή\" και το αποδεικτικό συμμετοχής σου τυπώνεται.Μπορείς επίσης να συμπληρώνεις ένα φυσικό δελτίο, το καταθέτεις στον υπάλληλο του καταστήματος και παραλαμβάνεις το αποδεικτικό συμμετοχής.',
            'Μα για να ζήσεις την εμπειρία του τυχερού τροχού, φυσικά! Με Κληρώσεις κάθε 4’ λεπτά και με ελάχιστο κόστος συμμετοχής 0,5€, η διασκέδαση απογειώνεται.Ο τροχός γυρίζει και ο τυχερός κερδίζει!',
            'Στο POWERSPIN, σου δίνονται οι επιλογές αριθμών που μπορείς να επιλέξεις.Για να διεκδικήσεις τη μεγαλύτερη απόδοση επιλέγεις 1 αριθμό.Για να αυξήσεις τις πιθανότητές σου να κερδίσεις μπορείς να επιλέξεις 2, 3, 4,6,8 ή και 12 αριθμούς με μικρότερη απόδοση.Η επιλογή σου εξαρτάται από τη στρατηγική και την τύχη που θέλεις να δοκιμάσεις!Να σου θυμίσω πως εκτός από αριθμό μπορείς να επιλέξεις και σύμβολο, ή και χρώμα ή και εαν ο τροχός θα φέρει αριθμό πάνω ή κάτω από 12,5',
            'Το κόστος συμμετοχής εξαρτάται από εσένα!Ξεκινάει στα 0,50€ για κάθε κατηγορία στην οποία στοιχηματίζεις (αριθμός, σύμβολο, χρώμα) και εσύ αποφασίζεις πόσα θα ήθελες να ποντάρεις.Στην κατηγορία των αριθμών έχεις τη δυνατότητα να επιλέξεις από 1 έως 12 αριθμούς.Το κόστος συμμετοχής δεν αλλάζει με τους αριθμούς που επιλέγεις.Αυτό που αλλάζει είναι πόσο μπορείς να διεκδικήσεις.Για παράδειγμα, εάν επιλέξεις 2 αριθμούς τότε το ποσό που διεκδικείς είναι το ποσό που ποντάρεις επί 12, ενώ αν επιλέξεις 1 αριθμό, το ποσό που διεκδικείς είναι το ποσό που ποντάρεις επί 24',
            'Είναι πολύ εύκολο! Απλά ακολουθείς τα παρακάτω βήματα:1. Ζητάς  την έκδοση κουπονιού/voucher από τον   υπάλληλο του καταστήματος, δίνοντας το αντίστοιχο    ποσό. 2. Αφού το πάρεις, το σκανάρεις (Το ποσό της αξίας του   φαίνεται  πάνω δεξιά στην οθόνη)3. Παίζεις το παιχνίδι που επιθυμείς, πατώντας στην   οθόνη  τους αριθμούς που επιθυμείς και με το κουμπί «ΑΠΟΔΟΧΗ»  εκτυπώνεις το αποδεικτικό συμμετοχής.Αυτό ήταν… καλή επιτυχία στην επόμενη κλήρωση!Τips: Πως προσθέτω τα κέρδη μου στην οθόνη Σκανάροντας ένα κερδισμένο δελτίο, φορτώνεις αν θέλεις το ποσό στο υπόλοιπό σου (που φαίνεται πάνω δεξιά στην οθόνη). Πως παίρνω τα κέρδη μου  .1. Πατάς την επιλογή \"Εξαργύρωση\" (που βρίσκεται στο   πάνω μέρος στην οθόνη ) και εκτυπώνεται voucher ίσης    αξίας με  το υπόλοιπό σου  2. Πηγαίνεις στον πράκτορα/υπάλληλο καταστήματος για   να  το εξαργυρώσεις ή μπορεί να χρησιμοποιηθεί για   μελλοντικό  παιχνίδι.',
          ],
          en: [
            'You can play from this screen by simply going to the home page (tap on the top left of the screen). The steps are simple!Step 1You select-    One or more numbers-    and / or a symbol -    and / or a color / zoneWhere you think the wheel will stop?Step 2Choose how much money you want to play with for each of your selections individually.Step 3Press “Accept\", and your entry ticket is printed.You can also fill out a physical slip, submit it to the store employee and receive your entry ticket.',
            'To experience the thrill of the lucky wheel, of course! With draws every 4 minutes and a minimum entry fee of €0.50, the excitement begins.The wheel spins, and the lucky player wins!',
            'In POWERSPIN, you are given the possible number options you can choose.To claim the highest payout, you choose 1 number.To increase your chances of winning you can choose 2, 3, 4, 6, 8 or even 12 numbers with lower odds.Your choice depends on your strategy and the extent of luck you wish to challenge!Let me remind you that in addition to a number, you can also choose a symbol, or a color, or whether the wheel will carry a number above or below 12.5',
            'The participation cost is up to you!It starts at €0.50 for each category you bet on (number, symbol, color) and you decide how much you want to bet. In the numbers category you can choose from 1 to 12 numbers. The participation cost does not change with the numbers you choose.What changes is how much you can claim.For example, if you choose 2 numbers then the amount you claim is the amount you bet multiplied by 12, whereas if you choose 1 number, the amount you claim is the amount you bet multiplied by 24',
            'It’s very simple! Just follow the steps below:1. You ask the store employee to issue a voucher for the   corresponding amount.2. After receiving it, scan the voucher (the value will be   displayed at the top right of the screen) 3. To play, tap the numbers you wish to select on the   screen and press the “ACCEPT” button to print your    voucher. That’s it… good luck in the next draw!Τips:How do I add my winnings to the screen?By scanning a winning slip, you can add, if you would like, the amount to your balance (shown at the top right of the screen). How do I get my winnings? 1. Press the “Redemption“ option (located at the top of  the screen) and print a voucher equal to your balance.2. Go to the store employee to redeem your voucher or  use it in a future play.',
          ],
        },
        help: {
          el: [
            'Για ένα φίλο ρωτάς ε; ναι ναι ξέρω… μπορείς να με βρεις όποτε επιθυμείς σε ένα κατάστημά μας!',
            'Εξαρτάται από πόσα θα ήθελες να διεκδικήσεις ή πόσο γρήγορα θες να μάθεις το αποτέλεσμα του παιχνιδιού!Αν θέλεις να δοκιμάζεις την τύχη σου κάθε 5 λεπτά και με ένα μικρό ποσό, όπως μισό ευρώ, να διεκδικείς μεγάλα κέρδη όπως 500.000€, θα σου πρότεινα το ΚΙΝΟ.Για ακόμα πιο γρήγορο παιχνίδι - σε μόλις 4 λεπτά- και απλά προβλέποντας που θα σταματήσει ο τροχός, τότε θα σου πρότεινα το Powerspin.Εσύ λοιπόν αποφασίζεις!',
          ],
          en: [
            'Are you asking for a friend? Yeah, yeah, right… you can find me whenever you want in one of our stores!',
            "It depends on how much you'd like to claim or how quickly you want to know the outcome of the game!If you want to try your luck every 5 minutes and with a small amount, like half a euro and claim big wins like €500,000, I would recommend KINO.For even faster play - just 4 minutes - and simply predicting where the wheel will stop, I'd recommend POWERSPIN.So it's up to you!",
          ],
        },
        opaphelp: {
          el: [
            'Για ένα φίλο ρωτάς ε; ναι ναι ξέρω… μπορείς να με βρεις όποτε επιθυμείς σε ένα κατάστημα ΟΠΑΠ!',
            'Εξαρτάται από πόσα θα ήθελες να διεκδικήσεις ή πόσο γρήγορα θες να μάθεις το αποτέλεσμα του παιχνιδιού!Αν θέλεις να δοκιμάζεις την τύχη σου κάθε 5 λεπτά και με ένα μικρό ποσό, όπως μισό ευρώ, να διεκδικείς μεγάλα κέρδη όπως 500.000€, θα σου πρότεινα το ΚΙΝΟ.Για ακόμα πιο γρήγορο παιχνίδι - σε μόλις 4 λεπτά- και απλά προβλέποντας που θα σταματήσει ο τροχός, τότε θα σου πρότεινα το Powerspin.Εσύ λοιπόν αποφασίζεις!',
          ],
          en: [
            'Are you asking for a friend? Yeah, yeah, right… you can find me whenever you want in an OPAP store!',
            "It depends on how much you'd like to claim or how quickly you want to know the outcome of the game!If you want to try your luck every 5 minutes and with a small amount, like half a euro and claim big wins like €500,000, I would recommend KINO.For even faster play - just 4 minutes - and simply predicting where the wheel will stop, I'd recommend POWERSPIN.So it's up to you!",
          ],
        },
      },
      shouldHaveTextAt: async function (page, game, index) {
        await expect(this.get(page)).toHaveText(this.text[game][world.lang][index]);
      },
    },
    cta: {
      get: function (page, game) {
        return page.locator(`.faq-cta-button--${game}`);
      },
      text: {
        el: 'Πατάς εδώ για να παίξεις',
        en: 'Tap here to Play',
      },
      shouldHaveText: async function (page, game) {
        await expect(this.get(page, game)).toHaveText(this.text[world.lang]);
      },
      notExists: async function (page) {
        await expect(this.get(page)).toHaveCount(0);
      },
    },
  },
  terminalInfo: {
    // can be found on /bettie/lobbyBettie.js
  },
  video: {
    get: function (page) {
      return page.locator('.video-container > video');
    },
    isVisible: async function (page) {
      await expect(this.get(page)).toBeVisible();
    },
    videoSrc: {
      kino: {
        el: '/assets/el/faq-kino-answers.mp4',
        en: '/assets/en/faq-kino-answers.mp4',
      },
      powerspin: {
        el: '/assets/el/faq-powerspin-answers.mp4',
        en: '/assets/en/faq-powerspin-answers.mp4',
      },
      help: {
        el: '/assets/el/faq-other-answers.mp4',
        en: '/assets/en/faq-other-answers.mp4',
      },
    },
    shouldHaveVideo: async function (page, game) {
      await expect(this.get(page, game)).toHaveAttribute('src', new RegExp(this.videoSrc[game][world.lang]));
    },
  },
};

module.exports = pages;
