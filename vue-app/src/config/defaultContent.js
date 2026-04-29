export const DEFAULT_FAQ_CONTENT = {
  kinoFaq: [
    {
      title: {
        en: 'baseBet',
        el: 'baseBet',
      },
      content: {
        en: 'baseContent',
        el: 'baseContentGreece',
      },
      theme: 'kino',
    },
  ],
};

export const DEFAULT_MAIN_FAQ = {
  MAIN_FAQ: {
    sections: [
      {
        id: 'kino',
        translations: {
          en: 'I want to ask about KINO',
          el: 'Θέλω να ρωτήσω για το KINO',
        },
        image: 'C:/KinoSSBT/Logos.png',
        route: 'kinofaq',
      },
      {
        id: 'powerspin',
        translations: {
          en: 'I want to ask about POWERSPIN',
          el: 'Θέλω να ρωτήσω για το POWERSPIN',
        },
        image: 'C:/KinoSSBT/powerspin-1.png',
        route: 'powerspinfaq',
      },
      {
        id: 'help',
        translations: {
          en: 'I want to ask something else',
          el: 'Θέλω να ρωτήσω κάτι άλλο',
        },
        route: 'helpfaq',
      },
    ],
  },
};

export const DEFAULT_FAQ_BOXES = {
  kinoFaq: [
    {
      title: {
        en: 'How do I play?',
        el: 'Πώς Παίζεται;',
      },
      description: {
        en: 'You can play from this screen by simply going to the home page (tap on the top left of the screen). <br> The steps are simple! <br> <br> <u>Step 1</u> <br> Select between 1 and 12 numbers (20 out of 80 are drawn). <br> <u>Step 2 </u> <br> You decide how much money you want to play with in each draw. <br> Whether you select 1 or 12 numbers, the participation cost remains the same. The only thing that changes is the winnings you can claim (i.e. the odds). <br> <u>Step 3 </u> <br> Press “Accept” and your entry ticket is printed. <br> <br> You can also fill out a physical slip, submit it to the store employee and receive your entry ticket',
        el: 'Μπορείς να παίξεις από αυτήν εδώ την οθόνη απλά πηγαίνοντας στην αρχική σελίδα (πατάς πάνω αριστερά στην οθόνη), Τα βήματα είναι απλά. <br> <br> <u> Βήμα 1 </u> <br> Επιλέγεις 1 έως 12 αριθμούς (κληρώνονται 20 από τους 80).  <br> <u> Βήμα 2 </u>  <br> Επιλέγεις με πόσα χρήματα θέλεις να παίξεις σε κάθε κλήρωση.  <br> Είτε επιλέξεις 1 είτε 12 αριθμούς, το κόστος παραμένει το ίδιο. Αυτό που αλλάζει είναι τα κέρδη που μπορείς να διεκδικήσεις (η απόδοση δηλαδή). <br> <u> Βήμα 3 </u> <br> Πατάς "Αποδοχή"  και το αποδεικτικό συμμετοχής σου τυπώνεται. <br> <br> Μπορείς επίσης να  συμπληρώνεις ένα φυσικό δελτίο, το καταθέτεις στον υπάλληλο του καταστήματος και παραλαμβάνεις το αποδεικτικό συμμετοχής.',
      },
      route: '/kino/default1',
    },
    {
      title: { en: 'Why should I play?', el: 'Γιατί να παίξω;' },
      description: {
        en: 'I won’t say much… <br>It’s quick, easy (draws are happening every 5 minutes) and with a small cost (€0.50 minimum) you can claim big winnings (up to €500,000 for €0.50).',
        el: 'Δεν θα πω πολλά…<br> Είναι εύκολο, γρήγορο (κληρώσεις κάθε 5 λεπτά) και με ένα μικρό ποσό (ελάχιστο 0,50€)  μπορείς να διεκδικήσεις μεγάλα κέρδη (μέχρι και 500.000€ για τα 0,50€)',
      },
      route: '/kino/default2',
    },
    {
      title: { en: 'How many numbers should I select?', el: 'Πόσους αριθμούς να διαλέξω;' },
      description: {
        en: 'That depends on how much you want to win and how lucky you feel. The more numbers you select, the bigger the amount you can claim if you predict them all correctly. ',
        el: 'Εξαρτάται από το πόσα θέλεις να κερδίσεις και πόσο τυχερός νιώθεις. Όσο περισσότερους αριθμούς επιλέξεις τόσο μεγαλύτερο είναι το ποσό που μπορείς να διεκδικήσεις εάν τους πετύχεις όλους. ',
      },
      route: '/kino/default3',
    },
    {
      title: {
        en: 'Participation cost depends on the numbers I select?',
        el: 'Το κόστος συμμετοχής εξαρτάται από τους αριθμούς που θα παίξω; ',
      },
      description: {
        en: '<style>@media (max-width: 1200px) { .hide-mobile { display: none !important; } .mobile-no-margin { margin-left: 0 !important; } } @media (min-width: 1600px) { .landscape-no-margin { margin-left: 0 !important; } .hide-landscape { display: none !important; } }</style>In KINO whether you select 1 or 12 numbers the cost is the same. What changes is the odd. <br> <br> Examples: <br> If you bet €0.5:<br> 1. With a choice of 3 numbers (game 3), you win €12.5 if <span style="margin-left: clamp(20px, 2.1vw, 34px);" class="mobile-no-margin"> correctly predict 3 out of 3 </span> <br>2.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; With a choice of 12 numbers (game 12), you win <span style="margin-left: clamp(20px, 2.1vw, 34px);" class="mobile-no-margin"> €500,000, for 12 out of 12, but if you correctly predict 9 </span> </span> <br>  <span style="margin-left: clamp(20px, 2.1vw, 34px);"> numbers (game 9 out of 12), you win €500.</span></span><br>',
        el: '<style>@media (max-width: 1200px) { .hide-mobile { display: none !important; } .mobile-no-margin { margin-left: 0 !important; } } @media (min-width: 1600px) { .landscape-no-margin { margin-left: 0 !important; } .hide-landscape { display: none !important; } }</style>Το κόστος είναι το ίδιο στο ΚΙΝΟ είτε επιλέξεις 1 είτε 12 αριθμούς έχουν το ίδιο κόστος. Αυτό που αλλάζει είναι  η απόδοση. <br> <br> Παραδείγματα: <br>Εάν ποντάρεις 0,5€: <br> 1. Με επιλογή 3 αριθμών (παιχνίδι 3), κερδίζεις 12,5€   αν <br class="hide-mobile"> <span style="margin-left: clamp(20px, 2.1vw, 34px);" class="mobile-no-margin"> προβλέψεις σωστά 3 στα 3 </span> <br> 2.  Με επιλογή 12 αριθμών (παιχνίδι 12), <br class="hide-mobile"> <span style="margin-left: clamp(20px, 2.1vw, 34px);" class="mobile-no-margin"> κερδίζεις 500.000€, για 12 στα 12  αλλά αν προβλέψεις </span> <br class="hide-mobile"> <span style="margin-left: clamp(20px, 2.1vw, 34px);" class="mobile-no-margin"> σωστά 9 αριθμούς (παιχνίδι 9 <span style="margin-left: clamp(20px, 2.1vw, 34px);" class="landscape-no-margin"> στα 12),</span> </span> κερδίζεις 500 <br class="hide-mobile"> <span style="margin-left: clamp(20px, 2.1vw, 34px);" class="mobile-no-margin"> ευρώ.<br/> </span>',
      },
      route: '/kino/default4',
    },
    {
      title: {
        en: 'How do I pay?',
        el: 'Πώς πληρώνω;',
      },
      description: {
        en: '<style>@media (max-width: 1200px) { .hide-mobile { display: none !important; } .mobile-no-margin { margin-left: 0 !important; } } @media (min-width: 1600px) { .landscape-no-margin { margin-left: 0 !important; } }</style>  It\'s very simple! Just follow the steps below: <br> <br> 1. You ask the store employee to issue a voucher for the <br class="hide-mobile"> <span style="margin-left: clamp(20px, 2.1vw, 34px);" class="mobile-no-margin"> corresponding amount. </span> <br> 2. After receiving it, scan the voucher (the value will be <span style="margin-left: clamp(20px, 2.1vw, 34px);" class="mobile-no-margin"> displayed at the top right of the screen) </span> <br> 3. <span style="margin-left: 0px;">To play, tap the numbers you wish to select on the screen </span> <span style="margin-left: clamp(20px, 2.1vw, 34px);" class="mobile-no-margin"> and press the “ACCEPT” button to print your voucher. </span> <br> <br> That’s it… good luck in the next draw! <br> <br> <strong><u>Τips:</strong></u> <br>  <br> <strong>How do I add my winnings to the screen?</strong> <br> By scanning a winning slip, you can add, if you would like, the amount to your balance (shown at the top right of the screen). <br> <br> <strong>How do I get my winnings?</strong>  <br> 1. Press the “Redemption“ option (located at the top of the <br class="hide-mobile"> <span style="margin-left: clamp(20px, 2.1vw, 34px);" class="mobile-no-margin"> screen)</span></span> and print a voucher equal to your balance. <br> 2.  Go to the store employee to redeem your voucher or use <br class="hide-mobile"> <span style="margin-left: clamp(20px, 2.1vw, 34px);" class="mobile-no-margin"> it in a future play.</span>',
        el: '<style>@media (max-width: 1200px) { .hide-mobile { display: none !important; } .mobile-no-margin { margin-left: 0 !important; } } @media (min-width: 1600px) { .landscape-no-margin { margin-left: 0 !important; } .hide-landscape { display: none !important; } }</style> Είναι πολύ εύκολο! Απλά ακολουθείς τα παρακάτω βήματα: <br> <br> 1. <span style="margin-left: clamp(1px, 0.1vw, 1px);"> Ζητάς </span> την έκδοση κουπονιού/voucher από τον υπάλληλο <br class="hide-mobile"> <span style="margin-left: clamp(20px, 2.1vw, 34px);" class="mobile-no-margin"> του  καταστήματος/πράκτορα, δίνοντας το αντίστοιχο</span> <br class="hide-mobile"> <span style="margin-left: clamp(20px, 2.1vw, 34px);" class="mobile-no-margin landscape-no-margin"> <br class="hide-landscape"> 2. Αφού το πάρεις, το σκανάρεις (Tο ποσό της αξίας του <br class="hide-mobile"> <span style="margin-left: clamp(20px, 2.1vw, 34px);" class="mobile-no-margin">φαίνεται πάνω δεξιά στην οθόνη)</span> <br> 3. Παίζεις το παιχνίδι που επιθυμείς, πατώντας στην οθόνη <br class="hide-mobile"> <span style="margin-left: clamp(20px, 2.1vw, 34px);" class="mobile-no-margin">τους αριθμούς που επιθυμείς και με το κουμπί </span> <br class="hide-mobile"> <span style="margin-left: clamp(20px, 2.1vw, 34px);" class="mobile-no-margin"> «ΑΠΟΔΟΧΗ» </span> <span style="margin-left: clamp(20px, 2.1vw, 34px);" class="landscape-no-margin"> εκτυπώνεις το αποδεικτικό συμμετοχής.</span> </span> <br class="hide-mobile"> <span style="margin-left: clamp(20px, 2.1vw, 34px);" class="mobile-no-margin"> Αυτό ήταν… καλή επιτυχία στην επόμενη κλήρωση! </span> <br> <br> <strong><u>Τips</u></strong>: <br>  <br> <strong>Πως προσθέτω τα κέρδη μου στην οθόνη</strong> <br class="no-margin">  Σκανάροντας ένα κερδισμένο δελτίο, φορτώνεις αν θέλεις το ποσό στο υπόλοιπό σου (που φαίνεται πάνω δεξιά στην οθόνη). <br> <br> <strong> Πως παίρνω τα κέρδη μου </strong> .  <br> 1. Πατάς την επιλογή "Εξαργύρωση" (που βρίσκεται στο <br class="hide-mobile"> <span style="margin-left: clamp(20px, 2.1vw, 34px);" class="mobile-no-margin"> πάνω μέρος στην οθόνη) και εκτυπώνεται voucher ίσης <br> <span style="margin-left: clamp(20px, 2.1vw, 34px);"> αξίας </span>  με το  υπόλοιπό σου <br> 2. Πηγαίνεις στον υπάλληλο καταστήματος για να το <br class="hide-mobile"> <span style="margin-left: clamp(20px, 2.1vw, 34px);" class="mobile-no-margin">  εξαργυρώσεις ή μπορεί να χρησιμοποιηθεί για <br class="hide-mobile">  <span style="margin-left: clamp(20px, 2.1vw, 34px);" class="mobile-no-margin"> μελλοντικό παιχνίδι.</span> </span> </span> </span>',
      },
      route: '/kino/default5',
    },
  ],
  powerspinFaq: [
    {
      title: {
        en: 'How do I play?',
        el: 'Πώς Παίζεται;',
      },
      description: {
        en: 'You can play from this screen by simply going to the home page (tap on the top left of the screen). The steps are simple! <br> <br> <u>Step</u> 1 <br> You select <br> - &nbsp;&nbsp;&nbsp&nbsp One or more numbers<br> - &nbsp;&nbsp;&nbsp&nbsp and / or a symbol <p style=`text-indent: -2.1em;` and / or a symbol <br> - &nbsp;&nbsp;&nbsp&nbsp and / or a color / zone <br> <br> Where you think the wheel will stop? <br> <u>Step 2</u>  <br> Choose how much money you want to play with for each of your selections individually. <br> <u>Step 3</u> <br> Press “Accept", and your entry ticket is printed. <br> <br> You can also fill out a physical slip, submit it to the store employee and receive your entry ticket.',
        el: 'Μπορείς να παίξεις από αυτήν εδώ την οθόνη απλά πηγαίνοντας στην αρχική σελίδα (πατάς πάνω αριστερά στην οθόνη), Τα βήματα είναι απλά. <br> <br> <u>Βήμα 1</u> <br> Επιλέγεις  <br> - &nbsp;&nbsp;&nbsp&nbsp αριθμό ή αριθμούς <br> - &nbsp;&nbsp;&nbsp&nbsp ή και σύμβολο  <br> - &nbsp;&nbsp;&nbsp&nbsp ή και το χρώμα/ζώνη  <br> Που πιστεύεις πως θα σταματήσει ο τροχός. <br> <u>Βήμα 2</u>  <br> Επιλέγεις με πόσα χρήματα θέλεις να παίξεις για κάθε επιλογή σου ξεχωριστά. <br> <u>Βήμα 3</u> <br> Πατάς "Αποδοχή" και το αποδεικτικό συμμετοχής σου τυπώνεται. <br> <br> Μπορείς επίσης να συμπληρώνεις ένα φυσικό δελτίο, το καταθέτεις στον υπάλληλο του καταστήματος και παραλαμβάνεις το αποδεικτικό συμμετοχής. <br>',
      },
      route: '/powerspin/default1',
    },
    {
      title: { en: 'Why should I play?', el: 'Γιατί να παίξω;' },
      description: {
        en: 'To experience the thrill of the lucky wheel, of course! With draws every 4 minutes and a minimum entry fee of €0.50, the excitement begins.<br> <br> The wheel spins, and the lucky player wins! ',
        el: 'Μα για να ζήσεις την εμπειρία του τυχερού τροχού, φυσικά! Με Κληρώσεις κάθε 4’ λεπτά και με ελάχιστο κόστος συμμετοχής 0,5€,  η διασκέδαση απογειώνεται. <br> <br> Ο τροχός γυρίζει και ο τυχερός κερδίζει!',
      },
      route: '/powerspin/default2',
    },
    {
      title: {
        en: 'How many numbers should I select?',
        el: 'Εαν επιλέξω να παίξω με αριθμούς, πόσους αριθμούς να διαλέξω;',
      },
      description: {
        en: 'In POWERSPIN, you are given the possible number options you can choose. <br> <br> To claim the highest payout, you choose 1 number. <br> <br> To increase your chances of winning you can choose 2, 3, 4, 6, 8 or even 12 numbers with lower odds. <br> <br> Your choice depends on your strategy and the extent of luck you wish to challenge! <br> <br> Let me remind you that in addition to a number, you can also choose a symbol, or a color, or whether the wheel will carry a number above or below 12.5  ',
        el: 'Στο POWERSPIN, σου δίνονται οι επιλογές αριθμών που μπορείς να επιλέξεις. <br> <br> Για να διεκδικήσεις τη μεγαλύτερη απόδοση επιλέγεις 1 αριθμό. <br> <br> Για να αυξήσεις τις πιθανότητές σου να κερδίσεις μπορείς να επιλέξεις 2, 3, 4,6,8 ή και 12 αριθμούς με μικρότερη απόδοση. <br> <br> Η επιλογή σου εξαρτάται από τη στρατηγική και την τύχη που θέλεις να δοκιμάσεις! <br> <br> Να σου θυμίσω πως εκτός από αριθμό μπορείς να επιλέξεις και σύμβολο, ή και χρώμα ή και εαν ο τροχός θα φέρει αριθμό πάνω ή κάτω από 12,5 ',
      },
      route: '/powerspin/default3',
    },
    {
      title: { en: 'What is the participation cost?', el: 'Ποιο είναι το κόστος συμμετοχής; ' },
      description: {
        en: 'The participation cost is up to you! <br> <br> It starts at €0.50 for each category you bet on (number, symbol, color) and you decide how much you want to bet. In the numbers category you can choose from 1 to 12 numbers. The participation cost does not change with the numbers you choose. <br> <br> What changes is how much you can claim. <br> <br> For example, if you choose 2 numbers then the amount you claim is the amount you bet multiplied by 12, whereas if you choose 1 number, the amount you claim is the amount you bet multiplied by 24',
        el: 'Το κόστος συμμετοχής εξαρτάται από εσένα! <br> <br> Ξεκινάει στα 0,50€ για κάθε κατηγορία στην οποία στοιχηματίζεις (αριθμός, σύμβολο, χρώμα) και εσύ αποφασίζεις πόσα θα ήθελες να ποντάρεις. <br> Στην κατηγορία των αριθμών έχεις τη δυνατότητα να επιλέξεις από 1 έως 12 αριθμούς.  <br> Το κόστος συμμετοχής δεν αλλάζει με τους αριθμούς που επιλέγεις. <br> <br> Αυτό που αλλάζει είναι πόσο μπορείς να διεκδικήσεις. <br> <br> Για παράδειγμα, εάν επιλέξεις 2 αριθμούς τότε το ποσό που διεκδικείς είναι το ποσό που ποντάρεις επί 12, ενώ αν επιλέξεις 1 αριθμό, το ποσό που διεκδικείς είναι το ποσό που ποντάρεις επί 24',
      },
      route: '/powerspin/default4',
    },
    {
      title: {
        en: 'How do I pay?',
        el: 'Πώς πληρώνω;',
      },
      description: {
        en: '<style>@media (max-width: 1200px) { .hide-mobile { display: none !important; } .mobile-no-margin { margin-left: 0 !important; } }</style> It’s very simple! Just follow the steps below: <br> <br> 1. You ask the store employee to issue a voucher for the <br class="hide-mobile"> <span style="margin-left: clamp(20px, 2.1vw, 34px);" class="mobile-no-margin"> corresponding amount.</span> <br>  2. After receiving it, scan the voucher (the value will be <br class="hide-mobile"> <span style="margin-left: clamp(20px, 2.1vw, 34px);" class="mobile-no-margin"> displayed at the top right of the screen) </span> <br> 3. To play</span>, tap the numbers you wish to select on the <br class="hide-mobile"> <span style="margin-left: clamp(20px, 2.1vw, 34px);" class="mobile-no-margin"> screen and press the “ACCEPT” button to print your </span> <br class="hide-mobile"> <span style="margin-left: clamp(20px, 2.1vw, 34px);" class="mobile-no-margin"> voucher. </span> <br> <br> That’s it… good luck in the next draw! <br><br> <strong><u>Τips</u></strong>:  <br><br> <strong>How do I add my winnings to the screen?</strong> <br> By scanning a winning slip, you can add, if you would like, the amount to your balance (shown at the top right of the screen). <br> <br> <strong> How do I get my winnings? </strong>  <br> 1. Press the “Redemption“ option (located at the top of <br class="hide-mobile"> <span style="margin-left: clamp(20px, 2.1vw, 34px);" class="mobile-no-margin">the screen)</span> and print a voucher equal to your balance. <br> 2. Go to the store employee to redeem your voucher or <br class="hide-mobile"> <span style="margin-left: clamp(20px, 2.1vw, 34px);" class="mobile-no-margin">use it in a future play.</span>',
        el: '<style>@media (max-width: 1200px) { .hide-mobile { display: none !important; } .mobile-no-margin { margin-left: 0 !important; } } @media (min-width: 1600px) { .landscape-no-margin { margin-left: 0 !important; } .hide-landscape { display: none !important; } }</style> Είναι πολύ εύκολο! Απλά ακολουθείς τα παρακάτω βήματα: <br> <br> 1. Ζητάς </span> την έκδοση κουπονιού/voucher από τον <br class="hide-mobile"> <span style="margin-left: clamp(20px, 2.1vw, 34px);" class="mobile-no-margin">  υπάλληλο του καταστήματος, δίνοντας το αντίστοιχο </span> <br class="hide-mobile"> <span style="margin-left: clamp(20px, 2.1vw, 34px);" class="mobile-no-margin">  ποσό. </span> <br> 2. Αφού το πάρεις, το σκανάρεις (Το ποσό της αξίας του <br class="hide-mobile"> <span style="margin-left: clamp(20px, 2.1vw, 34px);" class="mobile-no-margin">  φαίνεται </span> πάνω δεξιά στην οθόνη) <br> 3. Παίζεις το παιχνίδι που επιθυμείς, πατώντας στην <br class="hide-mobile"> <span style="margin-left: clamp(20px, 2.1vw, 34px);" class="mobile-no-margin"> οθόνη </span> τους αριθμούς που επιθυμείς και με το κουμπί <br> <span style="margin-left: clamp(20px, 2vw, 34px);"> «ΑΠΟΔΟΧΗ» </span> εκτυπώνεις το αποδεικτικό συμμετοχής. <br> <br> Αυτό ήταν… καλή επιτυχία στην επόμενη κλήρωση! <br> <br> <strong><u>Τips</u></strong>:  <br> <br> <strong> Πως προσθέτω τα κέρδη μου στην οθόνη </strong> <br> Σκανάροντας ένα κερδισμένο δελτίο, φορτώνεις αν θέλεις το ποσό στο υπόλοιπό σου (που φαίνεται πάνω δεξιά στην οθόνη).  <br> <br> <strong> Πως παίρνω τα κέρδη μου </strong> .  <br> 1. Πατάς την επιλογή "Εξαργύρωση" (που βρίσκεται  στο <br class="hide-mobile hide-landscape"> <span style="margin-left: clamp(20px, 2.1vw, 34px);" class="mobile-no-margin"> πάνω μέρος στην οθόνη ) και εκτυπώνεται voucher ίσης </span> <br class="hide-mobile"> <span style="margin-left: clamp(20px, 2.1vw, 34px);" class="mobile-no-margin">  αξίας με <span style="margin-left: clamp(20px, 2.1vw, 34px);" class="landscape-no-margin"> το υπόλοιπό σου </span> </span> <br> 2. Πηγαίνεις στον πράκτορα/υπάλληλο καταστήματος για <br class="hide-mobile"> <span style="margin-left: clamp(20px, 2.1vw, 34px);" class="mobile-no-margin"> να </span> το εξαργυρώσεις ή μπορεί να χρησιμοποιηθεί για <br class="hide-mobile"> <span style="margin-left: clamp(20px, 2.1vw, 34px);" class="mobile-no-margin"> μελλοντικό <span style="margin-left: clamp(20px, 2.1vw, 34px);" class="landscape-no-margin"> παιχνίδι. </span>',
      },
      route: '/powerspin/default5',
    },
  ],
  helpFaq: [
    {
      title: {
        en: 'Does Bettie have an Instagram/Facebook?  ',
        el: 'Έχει η Bettie Instagram/Facebook;   ',
      },
      description: {
        en: 'Are you asking for a friend? Yeah, yeah, right… you can find me whenever you want in an OPAP store!',
        el: 'Για ένα φίλο ρωτάς ε; ναι ναι ξέρω… μπορείς να με βρεις όποτε επιθυμείς σε ένα κατάστημα ΟΠΑΠ!',
      },
      allwynDescription: {
        en: 'Are you asking for a friend? Yeah, yeah, right… you can find me whenever you want in one of our stores!',
        el: 'Για ένα φίλο ρωτάς ε; ναι ναι ξέρω… μπορείς να με βρεις όποτε επιθυμείς σε ένα κατάστημά μας!',
      },
      route: '/helpFaq/default1',
    },
    {
      title: {
        en: 'I don’t know which game to play! Any recommendations?',
        el: 'Δεν ξέρω ποιο παιχνίδι να παίξω!  Ποιο προτείνεις;',
      },
      description: {
        en: "It depends on how much you'd like to claim or how quickly you want to know the outcome of the game! <br> <br>If you want to try your luck every 5 minutes and with a small amount, like half a euro and claim big wins like €500,000, I would recommend KINO.  <br> <br>For even faster play - just 4 minutes - and simply predicting where the wheel will stop, I'd recommend POWERSPIN. <br> <br> So it's up to you!",
        el: 'Εξαρτάται από πόσα θα ήθελες να διεκδικήσεις ή πόσο γρήγορα θες να μάθεις το αποτέλεσμα του παιχνιδιού!  <br> <br>Αν θέλεις να δοκιμάζεις την τύχη σου κάθε 5 λεπτά και με ένα μικρό ποσό, όπως μισό ευρώ, να διεκδικείς μεγάλα κέρδη όπως 500.000€, θα σου πρότεινα το ΚΙΝΟ. <br> <br>Για ακόμα πιο γρήγορο παιχνίδι - σε μόλις 4 λεπτά-  και απλά προβλέποντας που θα σταματήσει ο τροχός, τότε θα σου πρότεινα το Powerspin. <br> <br>Εσύ λοιπόν αποφασίζεις!',
      },
      route: '/helpFaq/default2',
    },
  ],
};
