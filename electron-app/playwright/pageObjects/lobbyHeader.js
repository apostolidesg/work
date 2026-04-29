// playwright/pageObject/lobbyHeader.js
const { expect } = require('@playwright/test');
const world = require('#/pageObjects/lib/world');

const page = {
  logo: {
    // game eurojackpot | kino | powerspin | fireblaze |  lobby | help(alias of lobby)
    get: function (page, game) {
      const aliases = { help: 'lobby' }; // on FAQ the option help displays lobby
      return page.locator(`#ssbt_lobby-header-img--${aliases[game] ?? game}`);
    },
    isVisible: async function (page, game) {
      await expect(this.get(page, game)).toBeVisible();
    },
  },
  OPAPLogo: {
    get: function (page) {
      return page.locator('.ssbt_lobby-header__logo--lobby');
    },
    isVisible: async function (page) {
      await expect(this.get(page)).toBeVisible();
    },
  },
  eurojackpotLogo: {
    get: function (page) {
      return page.locator('.ssbt_lobby-header__logo--eurojackpot');
    },
    isVisible: async function (page) {
      await expect(this.get(page)).toBeVisible();
    },
  },
  kinoLogo: {
    get: function (page) {
      return page.locator('.ssbt_lobby-header__logo--kino');
    },
    isVisible: async function (page) {
      await expect(this.get(page)).toBeVisible();
    },
  },
  powerspinLogo: {
    get: function (page) {
      return page.locator('.ssbt_lobby-header__logo--powerspin');
    },
    isVisible: async function (page) {
      await expect(this.get(page)).toBeVisible();
    },
  },
  powerspinOnFireLogo: {
    get: function (page) {
      return page.locator('.ssbt_lobby-header__logo--fireblaze');
    },
    isVisible: async function (page) {
      await expect(this.get(page)).toBeVisible();
    },
  },
  home: {
    get: function (page) {
      return page.locator('.ssbt_lobby-header__digital-assistant-home-icon');
    },
    text: {
      el: 'Αρχικη',
      en: 'Home',
    },
    shouldHaveText: async function (page) {
      await expect(this.get(page)).toHaveText(this.text[world.lang]);
    },
    img: {
      get: function (page) {
        return page.locator('.ssbt_lobby-header__digital-assistant-home-icon:has(.ssbt-header-option-item__img)');
      },
      isVisible: async function (page) {
        await expect(this.get(page)).toBeVisible();
      },
    },
  },
  gamesGuide: {
    get: function (page) {
      return page.locator('#lobby-games-book-of-games');
    },
    text: {
      el: 'ΟΔΗΓΟΙ ΠΑΙΓΝΙΩΝ ΠΕΡΙΣΣΟΤΕΡΑ',
      en: "GAMES' GUIDE MORE",
    },
    shouldHaveText: async function (page) {
      await expect(this.get(page)).toHaveText(this.text[world.lang]);
    },
  },
  termsAndConditions: {
    get: function (page) {
      return page.locator('#ssbt-header-game-info-terms');
    },
    text: {
      el: 'ΟΡΟΙ ΣΥΜΜΕΤΟΧΗΣ',
      en: 'TERMS & CONDITIONS',
    },
    shouldHaveText: async function (page) {
      await expect(this.get(page)).toHaveText(this.text[world.lang]);
    },
    txt: {
      get: function (page) {
        return page.locator('#info-modal-container');
      },
      text: {
        kino: {
          el: 'ΟΡΟΙ ΣΥΜΜΕΤΟΧΗΣ Το ανώτατο ποσό που ορίζεται ως κέρδος ανά κλήρωση σε κάθε μία από τις κατηγορίες 1 και 2 των παιχνιδιών 12, 11,10 και 9 ανέρχεται σε 1.000.000€, για δελτία που συμμετέχουν στα κέρδη KINO και 2.000.000€ για δελτία που συμμετέχουν στα κέρδη KINO BONUS.Στη κατηγορία κέρδους του παιχνιδιού 9 με ΚΙΝΟ ΠΑΡΑ 1, το ανώτατο ποσό ανέρχεται σε 1.000.000€, ενώ το αντίστοιχο ανώτατο ποσό για ΚΙΝΟ ΠΑΡΑ 1 με KINO BONUS ανέρχεται σε 2.000.000€. Σε περίπτωση που το αναλογούν ποσό υπερβαίνει τα προαναφερθέντα ανώτατα ποσά, τότε η διανομή του ανώτατου ποσού στις αντίστοιχες επιτυχίες, γίνεται σε μερίδια ανάλογα με την αξία συμμετοχής της κερδίζουσας περιοχής του κάθε δελτίου.ΓΕΝΙΚΟΙ ΟΡΟΙ ΣΥΜΜΕΤΟΧΗΣ ΜΕ ΔΕΛΤΙΟ Η συμμετοχή στις κληρώσεις/διαγωνισμούς γίνεται με αποκλειστική ευθύνη των συμμετεχόντων και συνεπάγεται την πλήρη, απόλυτη και ανεπιφύλακτη αποδοχή των διατάξεων της σχετικής νομοθεσίας και των όρων και προϋποθέσεων που θέτει κάθε φορά η ΟΠΑΠ Α.Ε. Το δελτίο χρησιμεύει μόνο για την καταχώρηση των προβλέψεων του συμμετέχοντα στο Κεντρικό Μηχανογραφικό Σύστημα και σε καμία περίπτωση δεν αποτελεί αποδεικτικό συμμετοχής. Το αποδεικτικό συμμετοχής εκτυπώνεται από τις ειδικές τερματικές μηχανές με την προϋπόθεση της καταβολής από τον συμμετέχοντα του καθορισμένου αντιτίμου. Ο συμμετέχων κατά την παραλαβή του αποδεικτικού συμμετοχής οφείλει να ελέγξει ότι αυτό είναι έγκυρο και περιέχονται σε αυτό όλα τα στοιχεία που αντιστοιχούν στη συγκεκριμένη συμμετοχή του. Η ΟΠΑΠ Α.Ε. δεν ευθύνεται αν, εξαιτίας οποιουδήποτε λόγου, στοιχεία αποδεικτικού συμμετοχής δεν βρεθούν καταχωρημένα στο Κεντρικό Μηχανογραφικό Σύστημα ή και δεν έχουν διασφαλιστεί σύμφωνα με τα προβλεπόμενα στην κείμενη νομοθεσία. Σε αυτές τις περιπτώσεις ο κάτοχος του αποδεικτικού συμμετοχής δεν δικαιούται καταβολής κέρδους ή αποζημίωσης. Ο συμμετέχων δικαιούται να ζητήσει την ακύρωση της συμμετοχής του και την επιστροφή του αντιτίμου της αξίας της, μόνο στις περιπτώσεις που επιτρέπεται βάσει των όρων και προϋποθέσεων που έχει θέσει η ΟΠΑΠ Α.Ε. Μέσα σε προθεσμία έξι (6) ημερών από την ημερομηνία ολοκλήρωσης της νικήτριας στήλης κάθε ενδιαφερόμενος δικαιούται να υποβάλει ένσταση στην ΟΠΑΠ Α.Ε. εάν από το Κεντρικό Μηχανογραφικό Σύστημα δεν αναγνωρίζεται το κέρδος που προκύπτει με βάση το αποδεικτικό συμμετοχής του. Ο κομιστής του δελτίου οφείλει να διαφυλάσσει τα στοιχεία του δελτίου και να μην τα αποκαλύπτει σε οποιονδήποτε τρίτο. Η ΟΠΑΠ Α.Ε. ουδεμία ευθύνη φέρει για ζημία που τυχόν προκλήθηκε από τη γνωστοποίηση των στοιχείων του δελτίου του παίκτη προς τρίτους. ΠΛΗΡΩΜΗ ΚΕΡΔΩΝΚατά την πληρωμή των κερδών παρακρατείται άμεσα από την ΟΠΑΠ Α.Ε. ο αναλογών φόρος, σύμφωνα με την εκάστοτε ισχύουσα νομοθεσία. Τα κέρδη καταβάλλονται στον κομιστή του αποδεικτικού συμμετοχής που κερδίζει. Σε περίπτωση απώλειας αποδεικτικού συμμετοχής αποκλείεται η αξίωση καταβολής κέρδους ή άλλης αποζημίωσης. Η πληρωμή των κερδών γίνεται από τα εξουσιοδοτημένα από την ΟΠΑΠ Α.Ε. σημεία πώλησης ή από τις συνεργαζόμενες Τράπεζες με διαδικασία που ορίζεται κάθε φορά από την ΟΠΑΠ Α.Ε. Μετά την πάροδο τριών (3) μηνών, από την ημερομηνία ολοκλήρωσης της νικήτριας στήλης παύει η αξίωση είσπραξης οποιουδήποτε κέρδους. Αποδεικτικό συμμετοχής που έχει καταστραφεί ή έχουν αλλοιωθεί τα στοιχεία του ή όταν σε οποιαδήποτε άλλη περίπτωση δεν είναι δυνατός ο εντοπισμός και η ανάκτησή τους από το Κ.Μ.Σ., ουδεμία ισχύ έχει και αποκλείεται η αξίωση καταβολής κέρδους και κάθε άλλη αξίωση για αποζημίωση από την ΟΠΑΠ Α.Ε. Σας ενημερώνουμε, ότι η ΟΠΑΠ Α.Ε. και η Ελληνικά Λαχεία Α.Ε. δέχονται προς επεξεργασία αιτήσεις βεβαιώσεων κέρδους για το έτος 2015. Η διαδικασία υποβολής της αίτησης για βεβαίωση κέρδους είναι πλέον ηλεκτρονική, μέσω του ιστότοπου winningscertificates.opap.gr Εντάξει',
          en: "TERMS & CONDITIONS Highest amount to be distributed as winning (per draw) for each one of the winning categories 1 and 2 of game types 12, 11, 10, and 9 is 1.000.000€ for all slips which participate in plain KINO and 2.000.000€ for all the slips which participate with KINO BONUS and KINO PARA 1 game types. Specifically, in the prize category of the game type “9 with KINO PARA 1,” the maximum payout is €1,000,000, while for “KINO PARA 1 with KINO BONUS,” the corresponding maximum payout reaches €2,000,000. In cases where the corresponding amount exceeds the highest amount limits for KINO, KINO BONUS and KINO PARA 1, then the highest amount limit is distributed in shares according to participation cost (number of columns) of the winning area of the slip. GENERAL TICKET PARTICIPATION TERMS Participation in draws/contests comes with exclusive responsibility of the participants and entails complete, absolute and implicit acceptance of the relevant legislation's provisions as well as the terms and conditions that each time are defined by OPAP S.A. Tickets can be used only for registering the participant's predictions in the Central Data Processing System and under no circumstances is a proof of participation. Proof of participation is printed by the special terminal hardware, provided the participant has paid the defined amount. Upon receiving proof of participation, the participant must check its validity and verify that it includes every detail which corresponds to his/her particular entry. OPAP S.A. is not responsible if, due to any reason, proof of participation is not found registered in the Central Data Processing System or if it's not ensured according to current legislation suggestions. In those cases, the player who possesses proof of participation is not eligible to any kind of winnings or compensation. Each participant is entitled to requesting his ticket's cancellation and refund of the amount he paid, only in situations where this is allowed based on the terms and conditions defined by OPAP S.A. Every player who wants to, has the right to submit an objection to OPAP S.A. within six (6) days from the date in which winning numbers were registered, in case Central Data Processing Centre does not recognize the winnings occurred based on proof of participation. The bearer of the ticket shall keep the details of the ticket confidential and not reveal them to any third party. OPAP S.A. bears no responsibility for any damage caused by the notification of the details of the player’s ticket to third parties. PAYMENT OF WINNINGS  Winnings are paid to the person who brings proof of participation of the winning ticket. In case this proof is lost the demand of payment or other type of compensation is excluded.  Winnings' payment is made by any of OPAP S.A.'s authorized sale spots or by corresponding Banks according to a procedure which is defined every time by OPAP S.A.  During winnings' payment OPAP S.A. instantly withholds the appropriate tax amount, according to currently effective legislation.   If more than three (3) months have followed after the date when the winning numbers were registered, demand of collecting any kind of winnings ceases to exist.  Any proof of participation that has been destroyed, has corrupted elements or any details which are impossible to spot or retrieve by the C.D.P.S. will not have any validity and no demand of payment or other type of compensation by OPAP S.A. will be possible.  OPAP S.A. will issue a winnings certificate if a player applies for one. OK",
        },
        opapKino: {
          el: 'ΟΡΟΙ ΣΥΜΜΕΤΟΧΗΣ Το ανώτατο ποσό που μοιράζεται ως κέρδος, ανά κλήρωση, σε κάθε μία από τις κατηγορίες 1 και 2 των παιχνιδιών 12, 11, 10 και 9 ανέρχεται σε 1.000.000€,  για δελτία που συμμετέχουν στα κέρδη ΚΙΝΟ και 2.000.000€ για δελτία που συμμετέχουν στα κέρδη KINO BONUS. Σε περίπτωση που το αναλογούν ποσό υπερβαίνει τα προαναφερθέντα ανώτατα ποσά, τότε η διανομή του ανώτατου ποσού στις αντίστοιχες επιτυχίες, γίνεται σε μερίδια ανάλογα με την αξία συμμετοχής της κερδίζουσας περιοχής του κάθε δελτίου.ΓΕΝΙΚΟΙ ΟΡΟΙ ΣΥΜΜΕΤΟΧΗΣ ΜΕ ΔΕΛΤΙΟ Η συμμετοχή στις κληρώσεις/διαγωνισμούς γίνεται με αποκλειστική ευθύνη των συμμετεχόντων και συνεπάγεται την πλήρη, απόλυτη και ανεπιφύλακτη αποδοχή των διατάξεων της σχετικής νομοθεσίας και των όρων και προϋποθέσεων που θέτει κάθε φορά η ΟΠΑΠ Α.Ε. Το δελτίο χρησιμεύει μόνο για την καταχώρηση των προβλέψεων του συμμετέχοντα στο Κεντρικό Μηχανογραφικό Σύστημα και σε καμία περίπτωση δεν αποτελεί αποδεικτικό συμμετοχής. Το αποδεικτικό συμμετοχής εκτυπώνεται από τις ειδικές τερματικές μηχανές με την προϋπόθεση της καταβολής από τον συμμετέχοντα του καθορισμένου αντιτίμου. Ο συμμετέχων κατά την παραλαβή του αποδεικτικού συμμετοχής οφείλει να ελέγξει ότι αυτό είναι έγκυρο και περιέχονται σε αυτό όλα τα στοιχεία που αντιστοιχούν στη συγκεκριμένη συμμετοχή του. Η ΟΠΑΠ Α.Ε. δεν ευθύνεται αν, εξαιτίας οποιουδήποτε λόγου, στοιχεία αποδεικτικού συμμετοχής δεν βρεθούν καταχωρημένα στο Κεντρικό Μηχανογραφικό Σύστημα ή και δεν έχουν διασφαλιστεί σύμφωνα με τα προβλεπόμενα στην κείμενη νομοθεσία. Σε αυτές τις περιπτώσεις ο κάτοχος του αποδεικτικού συμμετοχής δεν δικαιούται καταβολής κέρδους ή αποζημίωσης. Ο συμμετέχων δικαιούται να ζητήσει την ακύρωση της συμμετοχής του και την επιστροφή του αντιτίμου της αξίας της, μόνο στις περιπτώσεις που επιτρέπεται βάσει των όρων και προϋποθέσεων που έχει θέσει η ΟΠΑΠ Α.Ε. Μέσα σε προθεσμία έξι (6) ημερών από την ημερομηνία ολοκλήρωσης της νικήτριας στήλης κάθε ενδιαφερόμενος δικαιούται να υποβάλει ένσταση στην ΟΠΑΠ Α.Ε. εάν από το Κεντρικό Μηχανογραφικό Σύστημα δεν αναγνωρίζεται το κέρδος που προκύπτει με βάση το αποδεικτικό συμμετοχής του. Ο κομιστής του δελτίου οφείλει να διαφυλάσσει τα στοιχεία του δελτίου και να μην τα αποκαλύπτει σε οποιονδήποτε τρίτο. Η ΟΠΑΠ Α.Ε. ουδεμία ευθύνη φέρει για ζημία που τυχόν προκλήθηκε από τη γνωστοποίηση των στοιχείων του δελτίου του παίκτη προς τρίτους. ΠΛΗΡΩΜΗ ΚΕΡΔΩΝΚατά την πληρωμή των κερδών παρακρατείται άμεσα από την ΟΠΑΠ Α.Ε. ο αναλογών φόρος, σύμφωνα με την εκάστοτε ισχύουσα νομοθεσία. Τα κέρδη καταβάλλονται στον κομιστή του αποδεικτικού συμμετοχής που κερδίζει. Σε περίπτωση απώλειας αποδεικτικού συμμετοχής αποκλείεται η αξίωση καταβολής κέρδους ή άλλης αποζημίωσης. Η πληρωμή των κερδών γίνεται από τα εξουσιοδοτημένα από την ΟΠΑΠ Α.Ε. σημεία πώλησης ή από τις συνεργαζόμενες Τράπεζες με διαδικασία που ορίζεται κάθε φορά από την ΟΠΑΠ Α.Ε. Μετά την πάροδο τριών (3) μηνών, από την ημερομηνία ολοκλήρωσης της νικήτριας στήλης παύει η αξίωση είσπραξης οποιουδήποτε κέρδους. Αποδεικτικό συμμετοχής που έχει καταστραφεί ή έχουν αλλοιωθεί τα στοιχεία του ή όταν σε οποιαδήποτε άλλη περίπτωση δεν είναι δυνατός ο εντοπισμός και η ανάκτησή τους από το Κ.Μ.Σ., ουδεμία ισχύ έχει και αποκλείεται η αξίωση καταβολής κέρδους και κάθε άλλη αξίωση για αποζημίωση από την ΟΠΑΠ Α.Ε. Σας ενημερώνουμε, ότι η ΟΠΑΠ Α.Ε. και η Ελληνικά Λαχεία Α.Ε. δέχονται προς επεξεργασία αιτήσεις βεβαιώσεων κέρδους για το έτος 2015. Η διαδικασία υποβολής της αίτησης για βεβαίωση κέρδους είναι πλέον ηλεκτρονική, μέσω του ιστότοπου winningscertificates.opap.gr Εντάξει',
          en: "TERMS & CONDITIONS Highest amount to be distributed as winning (per draw) for each one of the winning categories 1 and 2 of game types 12, 11, 10, and 9 is 1.000.000€ for all slips which participate in plain KINO and 2.000.000€ for all the slips which participate with KINO BONUS. In cases where the corresponding amount exceeds the highest amount limits for KINO and KINO BONUS, then the highest amount limit is distributed in shares according to participation cost (number of columns) of the winning area of the slip.GENERAL TICKET PARTICIPATION TERMS Participation in draws/contests comes with exclusive responsibility of the participants and entails complete, absolute and implicit acceptance of the relevant legislation's provisions as well as the terms and conditions that each time are defined by OPAP S.A. Tickets can be used only for registering the participant's predictions in the Central Data Processing System and under no circumstances is a proof of participation. Proof of participation is printed by the special terminal hardware, provided the participant has paid the defined amount. Upon receiving proof of participation, the participant must check its validity and verify that it includes every detail which corresponds to his/her particular entry. OPAP S.A. is not responsible if, due to any reason, proof of participation is not found registered in the Central Data Processing System or if it's not ensured according to current legislation suggestions. In those cases, the player who possesses proof of participation is not eligible to any kind of winnings or compensation. Each participant is entitled to requesting his ticket's cancellation and refund of the amount he paid, only in situations where this is allowed based on the terms and conditions defined by OPAP S.A. Every player who wants to, has the right to submit an objection to OPAP S.A. within six (6) days from the date in which winning numbers were registered, in case Central Data Processing Centre does not recognize the winnings occurred based on proof of participation. The bearer of the ticket shall keep the details of the ticket confidential and not reveal them to any third party. OPAP S.A. bears no responsibility for any damage caused by the notification of the details of the player’s ticket to third parties. PAYMENT OF WINNINGS  Winnings are paid to the person who brings proof of participation of the winning ticket. In case this proof is lost the demand of payment or other type of compensation is excluded.  Winnings' payment is made by any of OPAP S.A.'s authorized sale spots or by corresponding Banks according to a procedure which is defined every time by OPAP S.A.  During winnings' payment OPAP S.A. instantly withholds the appropriate tax amount, according to currently effective legislation.   If more than three (3) months have followed after the date when the winning numbers were registered, demand of collecting any kind of winnings ceases to exist.  Any proof of participation that has been destroyed, has corrupted elements or any details which are impossible to spot or retrieve by the C.D.P.S. will not have any validity and no demand of payment or other type of compensation by OPAP S.A. will be possible. OPAP S.A. will issue a winnings certificate if a player applies for one. OK",
        },
        ejp: {
          el: 'ΟΡΟΙ ΣΥΜΜΕΤΟΧΗΣ ΓΕΝΙΚΟΙ ΟΡΟΙ ΣΥΜΜΕΤΟΧΗΣ Η συμμετοχή στο Εurojackpot γίνεται µε αποκλειστική ευθύνη των συμμετεχόντων και συνεπάγεται την πλήρη, απόλυτη και ανεπιφύλακτη αποδοχή των διατάξεων της σχετικής νομοθεσίας και των όρων και προϋποθέσεων που θέτει κάθε φορά η ΟΠΑΠ Α.Ε. Το παρόν δελτίο χρησιμεύει µόνο για την καταχώρηση των προβλέψεων του συμμετέχοντα στο Κεντρικό Πληροφορικό Σύστημα της ΟΠΑΠ Α.Ε. και σε καμία περίπτωση δεν αποτελεί αποδεικτικό συμμετοχής. Το αποδεικτικό συμμετοχής εκτυπώνεται από τις ειδικές τερματικές μηχανές µε την προϋπόθεση της καταβολής από τον συμμετέχοντα του καθορισμένου αντιτίμου. Ο συμμετέχων, κατά την παραλαβή του αποδεικτικού συμμετοχής, οφείλει να ελέγξει ότι αυτό είναι έγκυρο και περιέχονται σε αυτό όλα τα στοιχεία που αντιστοιχούν στη συγκεκριμένη συμμετοχή του Η ΟΠΑΠ Α.Ε. δεν ευθύνεται αν, εξαιτίας οποιουδήποτε λόγου, στοιχεία αποδεικτικού συμμετοχής δεν βρεθούν καταχωρημένα στο Κεντρικό Πληροφορικό Σύστημα ή/και δεν έχουν διασφαλιστεί σύμφωνα µε τα προβλεπόμενα στην κείμενη νομοθεσία. Σε αυτές τις περιπτώσεις ο κάτοχος του αποδεικτικού συμμετοχής δεν δικαιούται καταβολής κέρδους ή αποζημίωσης. Ο συμμετέχων δικαιούται να ζητήσει την ακύρωση της συμμετοχής του και την επιστροφή του αντιτίμου της αξίας της, µόνο στις περιπτώσεις που επιτρέπεται βάσει των όρων και προϋποθέσεων που έχει θέσει η ΟΠΑΠ Α.Ε. Κάθε ενδιαφερόμενος δικαιούται να υποβάλει ένσταση στην ΟΠΑΠ Α.Ε. εάν από το Κεντρικό Πληροφορικό Σύστημα (Κ.Π.Σ) δεν αναγνωρίζεται, το κέρδος που προκύπτει µε βάση το αποδεικτικό συμμετοχής του, μέσα σε προθεσμία έξι (6) ημερών από την ημερομηνία μη αναγνώρισης του κέρδους από το Κ.Π.Σ . Ο κομιστής του δελτίου οφείλει να διαφυλάσσει τα στοιχεία του δελτίου και να μην τα αποκαλύπτει σε οποιονδήποτε τρίτο. Η ΟΠΑΠ Α.Ε. ουδεμία ευθύνη φέρει για ζημιά που τυχόν προκλήθηκε από τη γνωστοποίηση των στοιχείων του δελτίου του παίκτη προς τρίτους. ΠΛΗΡΩΜΗ ΚΕΡΔΩΝ Κατά την πληρωμή των κερδών παρακρατείται άμεσα από την ΟΠΑΠ Α.Ε. ο αναλογών φόρος, σύμφωνα µε την εκάστοτε ισχύουσα νομοθεσία. Τα κέρδη καταβάλλονται στον κομιστή του αποδεικτικού συμμετοχής που κερδίζει. Σε περίπτωση απώλειας αποδεικτικού συμμετοχής αποκλείεται η αξίωση καταβολής κέρδους ή άλλης αποζημίωσης Η πληρωμή των κερδών γίνεται από τα εξουσιοδοτημένα από την ΟΠΑΠ Α.Ε. σημεία πώλησης ή από τις συνεργαζόμενες Τράπεζες µε διαδικασία που ορίζεται κάθε φορά από την ΟΠΑΠ Α.Ε.  Μετά την πάροδο τριών (3) μηνών, από την ημερομηνία καταχώρησης της νικήτριας στήλης στο Κ.Π.Σ. , παύει η αξίωση είσπραξης οποιουδήποτε κέρδους. Αποδεικτικό συμμετοχής που έχει καταστραφεί ή έχουν αλλοιωθεί τα στοιχεία του ή όταν σε οποιαδήποτε άλλη περίπτωση δεν είναι δυνατός ο εντοπισμός και η ανάκτησή τους από το Κ.Π.Σ., ουδεμία ισχύ έχει και αποκλείεται η αξίωση καταβολής κέρδους και κάθε άλλη αξίωση για αποζημίωση από την ΟΠΑΠ Α.Ε. Σας ενημερώνουμε ότι η ΟΠΑΠ Α.Ε. δέχεται προς επεξεργασία αιτήσεις βεβαιώσεων κέρδους. Η διαδικασία υποβολής της αίτησης για βεβαίωση είναι πλέον ηλεκτρονική, μέσω του ιστότοπου winningscertificates.opap.gr Αναλυτικές πληροφορίες για τη συμμετοχή στο παιχνίδι Eurojackpot μπορείτε να δείτε στον Οδηγό Παιγνίου που βρίσκεται αναρτημένος στην ιστοσελίδα www.allwyn.gr Εντάξει',
          en: 'TERMS & CONDITIONS GENERAL TERMS OF PARTICIPATION Participation in Eurojackpot is carried out with exclusive responsibility of the participants and entails the full, absolute, and unreserved acceptance of the provisions of the applicable legislation, as well as of the terms and conditions stipulated each time by OPAP S.A. The present slip is only used to enter the predictions of the participant into the Central Information System of OPAP S.A and in no case does it constitute proof of participation. The participation receipt (ticket) is printed by the special terminals, provided that the participant pays the determined price. Upon receiving the ticket, the participant has to check that it is valid and that it includes all details corresponding to their entry. OPAP S.A. shall bear no responsibility if, for any reason, any details of the ticket are not found entered in the Central Information System and/or have not been secured in accordance with the provisions of the applicable legislation. In these cases, the ticket holder is not entitled to the payment of winnings or to a compensation. The participant has the right to request the cancellation of their entry and the refund of the fee paid, only in the cases this is permitted by the terms and conditions laid down by OPAP S.A. Any interested person may file an objection to OPAP S.A., if the winnings based on their entry ticket are not identified by the Central Information System (CIS), within a deadline of six (6) days as of the date of non-identification of the winnings by the CIS. The ticket bearer shall keep its details and not disclose it to any third party. OPAP S.A. shall not be held liable for any damage that may be caused from the disclosure of the player’s ticket details to third parties. PAYMENT OF WINNINGS Upon the payment of winnings, the respective tax is deducted immediately by OPAP S.A. according to the eventually applicable legislation. The winnings are paid to the bearer of the winning ticket. In case of loss of the ticket, any claim for the payment of winnings or another type of compensation is excluded. The payment of winnings is carried out by the points of sale authorized by OPAP S.A., or by the cooperating banks, via the process set each time by OPAP S.A. Following the lapse of three (3) months since the date the column was registered as winning in the CIS, any claim of collection of any winnings ceases to exist. In case a ticket has been destroyed or in case its details have been altered, or in any other case that their identification or recovery by the CIS is not possible, it has no validity and any claim of winnings payment or other compensation by OPAP S.A. shall be excluded. We inform you that OPAP S.A. accepts winnings certificates requests for processing. The process of submitting a request for a certificate is now conducted online, through website winningscertificates.opap.gr. You may find detailed information for participation in Eurojackpot game in the Game Guide posted on website www.allwyn.gr. OK',
        },
        opapejp: {
          el: 'ΟΡΟΙ ΣΥΜΜΕΤΟΧΗΣ ΓΕΝΙΚΟΙ ΟΡΟΙ ΣΥΜΜΕΤΟΧΗΣ Η συμμετοχή στο Εurojackpot γίνεται µε αποκλειστική ευθύνη των συμμετεχόντων και συνεπάγεται την πλήρη, απόλυτη και ανεπιφύλακτη αποδοχή των διατάξεων της σχετικής νομοθεσίας και των όρων και προϋποθέσεων που θέτει κάθε φορά η ΟΠΑΠ Α.Ε. Το παρόν δελτίο χρησιμεύει µόνο για την καταχώρηση των προβλέψεων του συμμετέχοντα στο Κεντρικό Πληροφορικό Σύστημα της ΟΠΑΠ Α.Ε. και σε καμία περίπτωση δεν αποτελεί αποδεικτικό συμμετοχής. Το αποδεικτικό συμμετοχής εκτυπώνεται από τις ειδικές τερματικές μηχανές µε την προϋπόθεση της καταβολής από τον συμμετέχοντα του καθορισμένου αντιτίμου. Ο συμμετέχων, κατά την παραλαβή του αποδεικτικού συμμετοχής, οφείλει να ελέγξει ότι αυτό είναι έγκυρο και περιέχονται σε αυτό όλα τα στοιχεία που αντιστοιχούν στη συγκεκριμένη συμμετοχή του Η ΟΠΑΠ Α.Ε. δεν ευθύνεται αν, εξαιτίας οποιουδήποτε λόγου, στοιχεία αποδεικτικού συμμετοχής δεν βρεθούν καταχωρημένα στο Κεντρικό Πληροφορικό Σύστημα ή/και δεν έχουν διασφαλιστεί σύμφωνα µε τα προβλεπόμενα στην κείμενη νομοθεσία. Σε αυτές τις περιπτώσεις ο κάτοχος του αποδεικτικού συμμετοχής δεν δικαιούται καταβολής κέρδους ή αποζημίωσης. Ο συμμετέχων δικαιούται να ζητήσει την ακύρωση της συμμετοχής του και την επιστροφή του αντιτίμου της αξίας της, µόνο στις περιπτώσεις που επιτρέπεται βάσει των όρων και προϋποθέσεων που έχει θέσει η ΟΠΑΠ Α.Ε. Κάθε ενδιαφερόμενος δικαιούται να υποβάλει ένσταση στην ΟΠΑΠ Α.Ε. εάν από το Κεντρικό Πληροφορικό Σύστημα (Κ.Π.Σ) δεν αναγνωρίζεται, το κέρδος που προκύπτει µε βάση το αποδεικτικό συμμετοχής του, μέσα σε προθεσμία έξι (6) ημερών από την ημερομηνία μη αναγνώρισης του κέρδους από το Κ.Π.Σ . Ο κομιστής του δελτίου οφείλει να διαφυλάσσει τα στοιχεία του δελτίου και να μην τα αποκαλύπτει σε οποιονδήποτε τρίτο. Η ΟΠΑΠ Α.Ε. ουδεμία ευθύνη φέρει για ζημιά που τυχόν προκλήθηκε από τη γνωστοποίηση των στοιχείων του δελτίου του παίκτη προς τρίτους. ΠΛΗΡΩΜΗ ΚΕΡΔΩΝ Κατά την πληρωμή των κερδών παρακρατείται άμεσα από την ΟΠΑΠ Α.Ε. ο αναλογών φόρος, σύμφωνα µε την εκάστοτε ισχύουσα νομοθεσία. Τα κέρδη καταβάλλονται στον κομιστή του αποδεικτικού συμμετοχής που κερδίζει. Σε περίπτωση απώλειας αποδεικτικού συμμετοχής αποκλείεται η αξίωση καταβολής κέρδους ή άλλης αποζημίωσης Η πληρωμή των κερδών γίνεται από τα εξουσιοδοτημένα από την ΟΠΑΠ Α.Ε. σημεία πώλησης ή από τις συνεργαζόμενες Τράπεζες µε διαδικασία που ορίζεται κάθε φορά από την ΟΠΑΠ Α.Ε.  Μετά την πάροδο τριών (3) μηνών, από την ημερομηνία καταχώρησης της νικήτριας στήλης στο Κ.Π.Σ. , παύει η αξίωση είσπραξης οποιουδήποτε κέρδους. Αποδεικτικό συμμετοχής που έχει καταστραφεί ή έχουν αλλοιωθεί τα στοιχεία του ή όταν σε οποιαδήποτε άλλη περίπτωση δεν είναι δυνατός ο εντοπισμός και η ανάκτησή τους από το Κ.Π.Σ., ουδεμία ισχύ έχει και αποκλείεται η αξίωση καταβολής κέρδους και κάθε άλλη αξίωση για αποζημίωση από την ΟΠΑΠ Α.Ε. Σας ενημερώνουμε ότι η ΟΠΑΠ Α.Ε. δέχεται προς επεξεργασία αιτήσεις βεβαιώσεων κέρδους. Η διαδικασία υποβολής της αίτησης για βεβαίωση είναι πλέον ηλεκτρονική, μέσω του ιστότοπου winningscertificates.opap.gr Αναλυτικές πληροφορίες για τη συμμετοχή στο παιχνίδι Eurojackpot μπορείτε να δείτε στον Οδηγό Παιγνίου που βρίσκεται αναρτημένος στην ιστοσελίδα www.opap.gr Εντάξει',
          en: 'TERMS & CONDITIONS GENERAL TERMS OF PARTICIPATION Participation in Eurojackpot is carried out with exclusive responsibility of the participants and entails the full, absolute, and unreserved acceptance of the provisions of the applicable legislation, as well as of the terms and conditions stipulated each time by OPAP S.A. The present slip is only used to enter the predictions of the participant into the Central Information System of OPAP and in no case does it constitute proof of participation. The participation receipt (ticket) is printed by the special terminals, provided that the participant pays the determined price. Upon receiving the ticket, the participant has to check that it is valid and that it includes all details corresponding to their entry. OPAP S.A. shall bear no responsibility if, for any reason, any details of the ticket are not found entered in the Central Information System and/or have not been secured in accordance with the provisions of the applicable legislation. In these cases, the ticket holder is not entitled to the payment of winnings or to a compensation. The participant has the right to request the cancellation of their entry and the refund of the fee paid, only in the cases this is permitted by the terms and conditions laid down by OPAP S.A. Any interested person may file an objection to OPAP S.A., if the winnings based on their entry ticket are not identified by the Central Information System (CIS), within a deadline of six (6) days as of the date of non-identification of the winnings by the CIS. The ticket bearer shall keep its details and not disclose it to any third party. OPAP S.A. shall not be held liable for any damage that may be caused from the disclosure of the player’s ticket details to third parties. PAYMENT OF WINNINGS Upon the payment of winnings, the respective tax is deducted immediately by OPAP S.A. according to the eventually applicable legislation. The winnings are paid to the bearer of the winning ticket. In case of loss of the ticket, any claim for the payment of winnings or another type of compensation is excluded. The payment of winnings is carried out by the points of sale authorized by OPAP S.A., or by the cooperating banks, via the process set each time by OPAP S.A.  Following the lapse of three (3) months since the date the column was registered as winning in the CIS, any claim of collection of any winnings ceases to exist.  In case a ticket has been destroyed or in case its details have been altered, or in any other case that their identification or recovery by the CIS is not possible, it has no validity and any claim of winnings payment or other compensation by OPAP S.A. shall be excluded. We inform you that OPAP S.A. accepts winnings certificates requests for processing. The process of submitting a request for a certificate is now conducted online, through website winningscertificates.opap.gr. You may find detailed information for participation in Eurojackpot game in the Game Guide posted on website www.opap.gr. OK',
        },
        powerspin: {
          el: 'ΟΡΟΙ ΣΥΜΜΕΤΟΧΗΣ ΓΕΝΙΚΟΙ ΟΡΟΙ ΣΥΜΜΕΤΟΧΗΣ ΜΕ ΔΕΛΤΙΟ Η συμμετοχή στα Παιχνίδια Στοιχημάτων Προκαθορισμένης Απόδοσης επί πάσης φύσεως εικονικών αθλημάτων (συμπεριλαμβανομένων των Ιπποδρομιών και Κυνοδρομιών) και επί διάφορων άλλων εικονικών γεγονότων, η φύση των οποίων προσφέρεται για τη διεξαγωγή στοιχημάτων, γίνεται με αποκλειστική ευθύνη των συμμετεχόντων και συνεπάγεται την πλήρη, απόλυτη και ανεπιφύλακτη αποδοχή των διατάξεων της υφιστάμενης σχετικής νομοθεσίας, του Κανονισμού Οργάνωσης, Λειτουργίας και Διεξαγωγής των Παιχνιδιών Στοιχημάτων Προκαθορισμένης Απόδοσης, όπως ισχύει (εφεξής:Κανονισμός), καθώς και των όρων και προϋποθέσεων που θέτει κάθε φορά η ΟΠΑΠ Α.Ε. Η συμμετοχή επιτρέπεται σε όσους έχουν συμπληρώσει το δέκατο όγδοο (18ο) έτος της ηλικίας τους. Ο στοιχηματισμός επιτρέπεται μέχρι την έναρξη του πρώτου χρονικά διεξαγόμενου γεγονότος από τα γεγονότα επιλογής του παίκτη. Το μέγιστο ποσό στοιχηματισμού ανά συμμετοχή, είτε αυτή περιέχει έναν είτε πολλούς συνδυασμούς, ορίζεται κατ` ανώτατο όριο το ισόποσο της αξίας 10.000 στηλών και γνωστοποιείται στους παίκτες μέσω του Προγράμματος. Το αποδεικτικό συμμετοχής εκτυπώνεται από τις ειδικές τερματικές μηχανές με την προϋπόθεση της καταβολής από τον συμμετέχοντα του αναλογούντος αντιτίμου. Ο συμμετέχων κατά την παραλαβή του αποδεικτικού συμμετοχής οφείλει να ελέγξει ότι αυτό είναι έγκυρο και περιέχονται σε αυτό όλα τα στοιχεία που αντιστοιχούν στη συγκεκριμένη συμμετοχή του. Η ΟΠΑΠ Α.Ε. δεν ευθύνεται αν, εξαιτίας οποιουδήποτε λόγου, στοιχεία αποδεικτικού συμμετοχής δεν βρεθούν καταχωρημένα στο Κεντρικό Μηχανογραφικό Σύστημα ή και δεν έχουν διασφαλιστεί σύμφωνα με τα προβλεπόμενα στην κείμενη νομοθεσία. Σε αυτές τις περιπτώσεις ο κάτοχος του αποδεικτικού συμμετοχής δεν δικαιούται καταβολής κέρδους ή αποζημίωσης. Ο συμμετέχων δικαιούται να ζητήσει την ακύρωση της συμμετοχής του και την επιστροφή του αντιτίμου της αξίας της, εφόσον συντρέχουν οι προϋποθέσεις ακύρωσης και εντός των χρονικών ορίων που καθορίζονται από την ΟΠΑΠ Α.Ε. Η προθεσμία υποβολής ένστασης είναι έξι (6) ημέρες από την καταχώρηση των αποτελεσμάτων για όλα τα γεγονότα του Προγράμματος στο Κεντρικό Μηχανογραφικό Σύστημα της ΟΠΑΠ Α.Ε. Ο κομιστής του δελτίου οφείλει να διαφυλάσσει τα στοιχεία του δελτίου και να μην τα αποκαλύπτει σε οποιονδήποτε τρίτο. Η ΟΠΑΠ Α.Ε. ουδεμία ευθύνη φέρει για τη ζημία που τυχόν προκλήθηκε από τη γνωστοποίηση των στοιχείων του δελτίου του παίκτη προς τρίτους. Έγκυρο αποτέλεσμα θεωρείται αποκλειστικά και μόνο αυτό που έχει καταχωρηθεί στο κεντρικό μηχανογραφικό σύστημα της ΟΠΑΠ Α.Ε. Η ΟΠΑΠ Α.Ε. δεν φέρει ευθύνη για προβλήματα ή οποιαδήποτε ζημία ήθελε τυχόν υποστεί ο Παίκτης οφειλόμενη σε τεχνικά προβλήματα, όπως, ενδεικτικά, προβλήματα κατά τη μετάδοση μέσω δορυφόρου ή κάθε άλλη αδυναμία τεχνικής φύσεως λόγω της οποίας δυσλειτουργεί ή καθίσταται δυσχερής ή αδύνατη η απεικόνιση του εικονικού γεγονότος. Στην ως άνω περίπτωση όλα τα στοιχήματα παραμένουν σε ισχύ και έγκυρο αποτέλεσμα του εικονικού γεγονότος θεωρείται αποκλειστικά και μόνο αυτό που έχει καταχωρηθεί στο κεντρικό μηχανογραφικό σύστημα της ΟΠΑΠ Α.Ε. ΠΛΗΡΩΜΗ ΚΕΡΔΩΝ Τα κέρδη καταβάλλονται στον κομιστή του αποδεικτικού συμμετοχής που κερδίζει. Σε περίπτωση απώλειας αποδεικτικού συμμετοχής αποκλείεται η αξίωση καταβολής κέρδους ή άλλης αποζημίωσης.  Η πληρωμή των κερδών γίνεται από τα εξουσιοδοτημένα από την ΟΠΑΠ Α.Ε. σημεία πώλησης ή από τις συνεργαζόμενες Τράπεζες με διαδικασία που ορίζεται κάθε φορά από την ΟΠΑΠ Α.Ε.  Κατά την πληρωμή των κερδών παρακρατείται άμεσα από την ΟΠΑΠ Α.Ε. ο αναλογών φόρος, σύμφωνα με την εκάστοτε ισχύουσα νομοθεσία.  Το μέγιστο καταβαλλόμενο ποσό κέρδους ανά συμμετοχή, είτε αυτή περιέχει έναν είτε πολλούς συνδυασμούς, ορίζεται το ποσό του ενός εκατομμυρίου ευρώ (1.000.000 €) εκτός εάν άλλως ορίζεται και αναφέρεται στο Πρόγραμμα σχετικά με συγκεκριμένους τύπους στοιχημάτων ή ομάδες γεγονότων.  Κέρδη από στοιχήματα παραγράφονται μετά την παρέλευση τριών (3) μηνών από την ημερομηνία λήξης του αντίστοιχου Προγράμματος.  Αποδεικτικό συμμετοχής που έχει καταστραφεί ή έχουν αλλοιωθεί τα στοιχεία του ή όταν σε οποιαδήποτε άλλη περίπτωση δεν είναι δυνατός ο εντοπισμός και η ανάκτησή τους από το Κ.Μ.Σ., ουδεμία ισχύ έχει και αποκλείεται η αξίωση καταβολής κέρδους και κάθε άλλη αξίωση για αποζημίωση από την ΟΠΑΠ Α.Ε.  Η ΟΠΑΠ Α.Ε. χορηγεί βεβαίωση εισπραχθέντος κέρδους κατόπιν σχετικής αίτησης. Για περισσότερες πληροφορίες μπορείτε να απευθυνθείτε στον πράκτορα ή στο διαδικτυακό τόπο www.allwyn.gr. Εντάξει',
          en: 'TERMS & CONDITIONS GENERAL TICKET PARTICIPATION TERMS Participation in Fixed-Odds Betting Games regarding all kinds of virtual sports (including horse and greyhound racing) and other virtual events, the nature of which is suitable for betting, is performed under the participants’ sole responsibility. The said participation entails the full, absolute and unreserved acceptance of the provisions of the applicable legislation, of the Regulation on the Organization, Operation and Conduct of Fixed-Odds Betting Games as applicable (hereinafter the Regulation), as well as of the terms and conditions laid down each time by OPAP S.A. Participation is permitted to persons over eighteen (18) years of age. Wagering is allowed to occur before the start of the very first event out of those selected by each player. The maximum wager per participation, with one or more combinations in place, is set to a maximum value equal to 10,000 columns, and is notified to players via the Program. Participation tickets are printed by dedicated terminals, provided that each participant has paid the respective fee. Upon receiving their ticket, participants have to confirm its validity, and that all details corresponding to their entry are therein included. OPAP S.A. shall bear no responsibility if, for any reason whatsoever, ticket details are not entered in the Central Computer System (CCS) and/or are not confirmed pursuant to the provisions of the applicable legislation. In these cases, ticket holders are not entitled to the payment of winnings or to a compensation. Participants are entitled to request the cancellation of their entry and the refund of its value, provided that cancellation conditions and the respective time limits, as set out by OPAP S.A., are met. Objections filing deadline is six (6) days as of the entry of the results of all Program events to the OPAP S.A. CCS. Ticket bearers shall keep its details and not disclose it to any third party. OPAP S.A. shall not be held liable for any eventual damage incurred, as a result of the disclosure of the player’s ticket details to third parties. A valid result is considered exclusively what has been registered in the Central Information Systems of OPAP S.A. OPAP S.A. is not responsible for any problems or damages to the Player due to technical problems, such as, for example, satellite transmission problems or any other technical issues due to which the virtual event is difficult or impossible to visualize. In these cases, all bets remain valid and only the result that has been registered in the Central Information Systems of OPAP S.A. is considered as valid result. PAYMENT OF WINNINGS  Winnings are paid to the bearer of the winning ticket. In case of the ticket loss, any claim regarding the payment of winnings  or any other type of compensation will be excluded.  Payment of winnings is carried out by OPAP S.A. authorized points of sale, or by partnering banking institutions, via the process laid down each time by OPAP S.A. Upon payment of winnings, the corresponding tax is directly withheld by OPAP S.A., per the applicable legislation. The maximum winning amount per entry, with one or more combinations included, is set to one million (1,000,000) EUR, unless otherwise specified and mentioned in the Program regarding specific wager types or event groups. Betting winnings are written-off following the lapse of three (3) months from the expiration date of the respective Program. In case a ticket is destroyed or in case its details are altered, or in any other case that their identification or recovery by the CCS is not feasible, the said ticket will not be deemed valid and any claim regarding the payment of winnings or any other compensation by OPAP S.A. will be excluded. OPAP S.A. furnishes winnings’ certificates following a relevant request. For more information, please consult an agent or website www.allwyn.gr. OK',
        },
        opapPowerspin: {
          el: 'ΟΡΟΙ ΣΥΜΜΕΤΟΧΗΣ ΓΕΝΙΚΟΙ ΟΡΟΙ ΣΥΜΜΕΤΟΧΗΣ ΜΕ ΔΕΛΤΙΟ Η συμμετοχή στα Παιχνίδια Στοιχημάτων Προκαθορισμένης Απόδοσης επί πάσης φύσεως εικονικών αθλημάτων (συμπεριλαμβανομένων των Ιπποδρομιών και Κυνοδρομιών) και επί διάφορων άλλων εικονικών γεγονότων, η φύση των οποίων προσφέρεται για τη διεξαγωγή στοιχημάτων, γίνεται με αποκλειστική ευθύνη των συμμετεχόντων και συνεπάγεται την πλήρη, απόλυτη και ανεπιφύλακτη αποδοχή των διατάξεων της υφιστάμενης σχετικής νομοθεσίας, του Κανονισμού Οργάνωσης, Λειτουργίας και Διεξαγωγής των Παιχνιδιών Στοιχημάτων Προκαθορισμένης Απόδοσης, όπως ισχύει (εφεξής:Κανονισμός), καθώς και των όρων και προϋποθέσεων που θέτει κάθε φορά η ΟΠΑΠ Α.Ε. Η συμμετοχή επιτρέπεται σε όσους έχουν συμπληρώσει το δέκατο όγδοο (18ο) έτος της ηλικίας τους. Ο στοιχηματισμός επιτρέπεται μέχρι την έναρξη του πρώτου χρονικά διεξαγόμενου γεγονότος από τα γεγονότα επιλογής του παίκτη. Το μέγιστο ποσό στοιχηματισμού ανά συμμετοχή, είτε αυτή περιέχει έναν είτε πολλούς συνδυασμούς, ορίζεται κατ` ανώτατο όριο το ισόποσο της αξίας 10.000 στηλών και γνωστοποιείται στους παίκτες μέσω του Προγράμματος. Το αποδεικτικό συμμετοχής εκτυπώνεται από τις ειδικές τερματικές μηχανές με την προϋπόθεση της καταβολής από τον συμμετέχοντα του αναλογούντος αντιτίμου. Ο συμμετέχων κατά την παραλαβή του αποδεικτικού συμμετοχής οφείλει να ελέγξει ότι αυτό είναι έγκυρο και περιέχονται σε αυτό όλα τα στοιχεία που αντιστοιχούν στη συγκεκριμένη συμμετοχή του. Η ΟΠΑΠ Α.Ε. δεν ευθύνεται αν, εξαιτίας οποιουδήποτε λόγου, στοιχεία αποδεικτικού συμμετοχής δεν βρεθούν καταχωρημένα στο Κεντρικό Μηχανογραφικό Σύστημα ή και δεν έχουν διασφαλιστεί σύμφωνα με τα προβλεπόμενα στην κείμενη νομοθεσία. Σε αυτές τις περιπτώσεις ο κάτοχος του αποδεικτικού συμμετοχής δεν δικαιούται καταβολής κέρδους ή αποζημίωσης. Ο συμμετέχων δικαιούται να ζητήσει την ακύρωση της συμμετοχής του και την επιστροφή του αντιτίμου της αξίας της, εφόσον συντρέχουν οι προϋποθέσεις ακύρωσης και εντός των χρονικών ορίων που καθορίζονται από την ΟΠΑΠ Α.Ε. Η προθεσμία υποβολής ένστασης είναι έξι (6) ημέρες από την καταχώρηση των αποτελεσμάτων για όλα τα γεγονότα του Προγράμματος στο Κεντρικό Μηχανογραφικό Σύστημα της ΟΠΑΠ Α.Ε. Ο κομιστής του δελτίου οφείλει να διαφυλάσσει τα στοιχεία του δελτίου και να μην τα αποκαλύπτει σε οποιονδήποτε τρίτο. Η ΟΠΑΠ Α.Ε. ουδεμία ευθύνη φέρει για τη ζημία που τυχόν προκλήθηκε από τη γνωστοποίηση των στοιχείων του δελτίου του παίκτη προς τρίτους. Έγκυρο αποτέλεσμα θεωρείται αποκλειστικά και μόνο αυτό που έχει καταχωρηθεί στο κεντρικό μηχανογραφικό σύστημα της ΟΠΑΠ Α.Ε. Η ΟΠΑΠ Α.Ε. δεν φέρει ευθύνη για προβλήματα ή οποιαδήποτε ζημία ήθελε τυχόν υποστεί ο Παίκτης οφειλόμενη σε τεχνικά προβλήματα, όπως, ενδεικτικά, προβλήματα κατά τη μετάδοση μέσω δορυφόρου ή κάθε άλλη αδυναμία τεχνικής φύσεως λόγω της οποίας δυσλειτουργεί ή καθίσταται δυσχερής ή αδύνατη η απεικόνιση του εικονικού γεγονότος. Στην ως άνω περίπτωση όλα τα στοιχήματα παραμένουν σε ισχύ και έγκυρο αποτέλεσμα του εικονικού γεγονότος θεωρείται αποκλειστικά και μόνο αυτό που έχει καταχωρηθεί στο κεντρικό μηχανογραφικό σύστημα της ΟΠΑΠ Α.Ε. ΠΛΗΡΩΜΗ ΚΕΡΔΩΝ Τα κέρδη καταβάλλονται στον κομιστή του αποδεικτικού συμμετοχής που κερδίζει. Σε περίπτωση απώλειας αποδεικτικού συμμετοχής αποκλείεται η αξίωση καταβολής κέρδους ή άλλης αποζημίωσης.  Η πληρωμή των κερδών γίνεται από τα εξουσιοδοτημένα από την ΟΠΑΠ Α.Ε. σημεία πώλησης ή από τις συνεργαζόμενες Τράπεζες με διαδικασία που ορίζεται κάθε φορά από την ΟΠΑΠ Α.Ε.  Κατά την πληρωμή των κερδών παρακρατείται άμεσα από την ΟΠΑΠ Α.Ε. ο αναλογών φόρος, σύμφωνα με την εκάστοτε ισχύουσα νομοθεσία.  Το μέγιστο καταβαλλόμενο ποσό κέρδους ανά συμμετοχή, είτε αυτή περιέχει έναν είτε πολλούς συνδυασμούς, ορίζεται το ποσό του ενός εκατομμυρίου ευρώ (1.000.000 €) εκτός εάν άλλως ορίζεται και αναφέρεται στο Πρόγραμμα σχετικά με συγκεκριμένους τύπους στοιχημάτων ή ομάδες γεγονότων.  Κέρδη από στοιχήματα παραγράφονται μετά την παρέλευση τριών (3) μηνών από την ημερομηνία λήξης του αντίστοιχου Προγράμματος.  Αποδεικτικό συμμετοχής που έχει καταστραφεί ή έχουν αλλοιωθεί τα στοιχεία του ή όταν σε οποιαδήποτε άλλη περίπτωση δεν είναι δυνατός ο εντοπισμός και η ανάκτησή τους από το Κ.Μ.Σ., ουδεμία ισχύ έχει και αποκλείεται η αξίωση καταβολής κέρδους και κάθε άλλη αξίωση για αποζημίωση από την ΟΠΑΠ Α.Ε.  Η ΟΠΑΠ Α.Ε. χορηγεί βεβαίωση εισπραχθέντος κέρδους κατόπιν σχετικής αίτησης. Για περισσότερες πληροφορίες μπορείτε να απευθυνθείτε στον πράκτορα ή στο διαδικτυακό τόπο του ΟΠΑΠ. Εντάξει',
          en: 'TERMS & CONDITIONS GENERAL TICKET PARTICIPATION TERMS Participation in Fixed-Odds Betting Games regarding all kinds of virtual sports (including horse and greyhound racing) and other virtual events, the nature of which is suitable for betting, is performed under the participants’ sole responsibility. The said participation entails the full, absolute and unreserved acceptance of the provisions of the applicable legislation, of the Regulation on the Organization, Operation and Conduct of Fixed-Odds Betting Games as applicable (hereinafter the Regulation), as well as of the terms and conditions laid down each time by OPAP S.A. Participation is permitted to persons over eighteen (18) years of age. Wagering is allowed to occur before the start of the very first event out of those selected by each player. The maximum wager per participation, with one or more combinations in place, is set to a maximum value equal to 10,000 columns, and is notified to players via the Program. Participation tickets are printed by dedicated terminals, provided that each participant has paid the respective fee. Upon receiving their ticket, participants have to confirm its validity, and that all details corresponding to their entry are therein included. OPAP S.A. shall bear no responsibility if, for any reason whatsoever, ticket details are not entered in the Central Computer System (CCS) and/or are not confirmed pursuant to the provisions of the applicable legislation. In these cases, ticket holders are not entitled to the payment of winnings or to a compensation. Participants are entitled to request the cancellation of their entry and the refund of its value, provided that cancellation conditions and the respective time limits, as set out by OPAP S.A., are met. Objections filing deadline is six (6) days as of the entry of the results of all Program events to the OPAP S.A. CCS. Ticket bearers shall keep its details and not disclose it to any third party. OPAP S.A. shall not be held liable for any eventual damage incurred, as a result of the disclosure of the player’s ticket details to third parties. A valid result is considered exclusively what has been registered in the Central Information Systems of OPAP S.A. OPAP S.A. is not responsible for any problems or damages to the Player due to technical problems, such as, for example, satellite transmission problems or any other technical issues due to which the virtual event is difficult or impossible to visualize. In these cases, all bets remain valid and only the result that has been registered in the Central Information Systems of OPAP S.A. is considered as valid result. PAYMENT OF WINNINGS  Winnings are paid to the bearer of the winning ticket. In case of ticket loss, any claim regarding the payment of winnings or any other type of compensation will be excluded.  Payment of winnings is carried out by OPAP S.A. authorized points of sale, or by partnering banking institutions, via the process laid down each time by OPAP S.A. Upon payment of winnings, the corresponding tax is directly withheld by OPAP S.A., per the applicable legislation. The maximum winning amount per entry, with one or more combinations included, is set to one million (1,000,000) EUR, unless otherwise specified and mentioned in the Program regarding specific wager types or event groups. Betting winnings are written-off following the lapse of three (3) months from the expiration date of the respective Program. In case a ticket is destroyed or in case its details are altered, or in any other case that their identification or recovery by the CCS is not feasible, the said ticket will not be deemed valid and any claim regarding the payment of winnings or any other compensation by OPAP S.A. will be excluded. OPAP S.A. furnishes winnings’ certificates following a relevant request. For more information, please consult an agent or website OPAP. OK',
        },
        psOnFire: {
          el: 'ΟΡΟΙ ΣΥΜΜΕΤΟΧΗΣ ΓΕΝΙΚΟΙ ΟΡΟΙ ΣΥΜΜΕΤΟΧΗΣ ΜΕ ΔΕΛΤΙΟ Η συμμετοχή στα Παιχνίδια Στοιχημάτων Προκαθορισμένης Απόδοσης επί πάσης φύσεως εικονικών αθλημάτων (συμπεριλαμβανομένων των Ιπποδρομιών και Κυνοδρομιών) και επί διάφορων άλλων εικονικών γεγονότων, γίνεται με αποκλειστική ευθύνη των συμμετεχόντων και συνεπάγεται την πλήρη, απόλυτη και ανεπιφύλακτη αποδοχή των διατάξεων της σχετικής νομοθεσίας, του Κανονισμού Οργάνωσης, Λειτουργίας και Διεξαγωγής των Παιχνιδιών Στοιχημάτων Προκαθορισμένης Απόδοσης, όπως ισχύει (εφεξής: Κανονισμός), καθώς και των όρων και προϋποθέσεων που θέτει κάθε φορά η ΟΠΑΠ Α.Ε. Η συμμετοχή επιτρέπεται σε όσους έχουν συμπληρώσει το δέκατο όγδοο (18ο) έτος της ηλικίας τους. Ο στοιχηματισμός επιτρέπεται μέχρι την έναρξη του πρώτου χρονικά διεξαγόμενου γεγονότος από τα γεγονότα επιλογής του παίκτη. Το μέγιστο ποσό στοιχηματισμού ανά συμμετοχή, είτε αυτή περιέχει έναν είτε πολλούς συνδυασμούς, ορίζεται κατ` ανώτατο όριο το ισόποσο της αξίας 10.000 στηλών και γνωστοποιείται στους παίκτες μέσω του Προγράμματος. Το αποδεικτικό συμμετοχής εκτυπώνεται από τις ειδικές τερματικές μηχανές με την προϋπόθεση της καταβολής από τον συμμετέχοντα του αναλογούντος αντιτίμου. Ο συμμετέχων κατά την παραλαβή του αποδεικτικού συμμετοχής οφείλει να ελέγξει ότι αυτό είναι έγκυρο και περιέχονται σε αυτό όλα τα στοιχεία που αντιστοιχούν στη συγκεκριμένη συμμετοχή του. Η ΟΠΑΠ Α.Ε. δεν ευθύνεται αν, εξαιτίας οποιουδήποτε λόγου, στοιχεία αποδεικτικού συμμετοχής δεν βρεθούν καταχωρημένα στο Κεντρικό Μηχανογραφικό Σύστημα ή και δεν έχουν διασφαλιστεί σύμφωνα με τα προβλεπόμενα στην κείμενη νομοθεσία. Σε αυτές τις περιπτώσεις ο κάτοχος του αποδεικτικού συμμετοχής δεν δικαιούται καταβολής κέρδους ή αποζημίωσης. Ο συμμετέχων δικαιούται να ζητήσει την ακύρωση της συμμετοχής του και την επιστροφή του αντιτίμου της αξίας της, εφόσον συντρέχουν οι προϋποθέσεις ακύρωσης και εντός των χρονικών ορίων που καθορίζονται από την ΟΠΑΠ Α.Ε. Η προθεσμία υποβολής ένστασης είναι έξι (6) ημέρες από την καταχώρηση των αποτελεσμάτων για όλα τα γεγονότα του Προγράμματος στο Κεντρικό Μηχανογραφικό Σύστημα της ΟΠΑΠ Α.Ε. Ο κομιστής του δελτίου οφείλει να διαφυλάσσει τα στοιχεία του δελτίου και να μην τα αποκαλύπτει σε οποιονδήποτε τρίτο. Η ΟΠΑΠ Α.Ε. ουδεμία ευθύνη φέρει για τη ζημία που τυχόν προκλήθηκε από τη γνωστοποίηση των στοιχείων του δελτίου του παίκτη προς τρίτους. Έγκυρο αποτέλεσμα θεωρείται αποκλειστικά και μόνο αυτό που έχει καταχωρηθεί στο κεντρικό μηχανογραφικό σύστημα της ΟΠΑΠ Α.Ε. Η ΟΠΑΠ Α.Ε. δεν φέρει ευθύνη για προβλήματα ή οποιαδήποτε ζημία ήθελε τυχόν υποστεί ο Παίκτης οφειλόμενη σε τεχνικά προβλήματα, όπως, ενδεικτικά, προβλήματα κατά τη μετάδοση μέσω δορυφόρου ή κάθε άλλη αδυναμία τεχνικής φύσεως λόγω της οποίας δυσλειτουργεί ή καθίσταται δυσχερής ή αδύνατη η απεικόνιση του εικονικού γεγονότος. Στην ως άνω περίπτωση όλα τα στοιχήματα παραμένουν σε ισχύ και έγκυρο αποτέλεσμα του εικονικού γεγονότος θεωρείται αποκλειστικά και μόνο αυτό που έχει καταχωρηθεί στο κεντρικό μηχανογραφικό σύστημα της ΟΠΑΠ Α.Ε. ΠΛΗΡΩΜΗ ΚΕΡΔΩΝ Τα κέρδη καταβάλλονται στον κομιστή του αποδεικτικού συμμετοχής που κερδίζει. Σε περίπτωση απώλειας αποδεικτικού συμμετοχής αποκλείεται η αξίωση καταβολής κέρδους ή άλλης αποζημίωσης.  Η πληρωμή των κερδών γίνεται από τα εξουσιοδοτημένα από την ΟΠΑΠ Α.Ε. σημεία πώλησης ή από τις συνεργαζόμενες Τράπεζες με διαδικασία που ορίζεται κάθε φορά από την ΟΠΑΠ Α.Ε.  Κατά την πληρωμή των κερδών παρακρατείται άμεσα από την ΟΠΑΠ Α.Ε. ο αναλογών φόρος, σύμφωνα με την εκάστοτε ισχύουσα νομοθεσία.  Το μέγιστο καταβαλλόμενο ποσό κέρδους ανά συμμετοχή, είτε αυτή περιέχει έναν είτε πολλούς συνδυασμούς, ορίζεται το ποσό του ενός εκατομμυρίου ευρώ (1.000.000 €) εκτός εάν άλλως ορίζεται και αναφέρεται στο Πρόγραμμα σχετικά με συγκεκριμένους τύπους στοιχημάτων ή ομάδες γεγονότων.  Το ανώτατο ποσό που μοιράζεται ως κέρδος (ανά κλήρωση) σε καθεμιά από τις κατηγορίες παιχνιδιών Αριθμός, Δυάδα, Τετράδα, Οκτάδα ανέρχεται σε 500.000€. Σε περίπτωση που το αναλογούν συνολικό ποσό υπερβαίνει τα προαναφερθέντα ανώτατα ποσά, τότε η διανομή του ανώτατου ποσού στις αντίστοιχες επιτυχίες γίνεται σε μερίδια ανάλογα με την αξία συμμετοχής της κερδίζουσας περιοχής του κάθε δελτίου σε κάθε κλήρωση.   Κέρδη από στοιχήματα παραγράφονται μετά την παρέλευση τριών (3) μηνών από την ημερομηνία λήξης του αντίστοιχου Προγράμματος.  Αποδεικτικό συμμετοχής που έχει καταστραφεί ή έχουν αλλοιωθεί τα στοιχεία του ή όταν σε οποιαδήποτε άλλη περίπτωση δεν είναι δυνατός ο εντοπισμός και η ανάκτησή τους από το Κ.Μ.Σ., ουδεμία ισχύ έχει και αποκλείεται η αξίωση καταβολής κέρδους και κάθε άλλη αξίωση για αποζημίωση από την ΟΠΑΠ Α.Ε.  Η ΟΠΑΠ Α.Ε. χορηγεί βεβαίωση εισπραχθέντος κέρδους κατόπιν σχετικής αίτησης. Για περισσότερες πληροφορίες μπορείτε να απευθυνθείτε στον πράκτορα ή στο διαδικτυακό τόπο www.allwyn.gr. Εντάξει',
          en: 'TERMS & CONDITIONS GENERAL TICKET PARTICIPATION TERMS Participation in Fixed-Odds Betting Games regarding all kinds of virtual sports (including horse and greyhound racing) and other virtual events, the nature of which is suitable for betting, is performed under the participants’ sole responsibility. The said participation entails the full, absolute and unreserved acceptance of the provisions of the applicable legislation, of the Regulation on the Organization, Operation and Conduct of Fixed-Odds Betting Games as applicable (hereinafter the Regulation), as well as of the terms and conditions laid down each time by OPAP S.A. Participation is permitted to persons over eighteen (18) years of age. Wagering is allowed to occur before the start of the very first event out of those selected by each player. The maximum wager per participation, with one or more combinations in place, is set to a maximum value equal to 10,000 columns, and is notified to players via the Program. Participation tickets are printed by dedicated terminals, provided that each participant has paid the respective fee. Upon receiving their ticket, participants have to confirm its validity, and that all details corresponding to their entry are therein included. OPAP S.A. shall bear no responsibility if, for any reason whatsoever, ticket details are not entered in the Central Computer System (CCS) and/or are not confirmed pursuant to the provisions of the applicable legislation. In these cases, ticket holders are not entitled to the payment of winnings or to a compensation. Participants are entitled to request the cancellation of their entry and the refund of its value, provided that cancellation conditions and the respective time limits, as set out by OPAP S.A., are met. Objections filing deadline is six (6) days as of the entry of the results of all Program events to the OPAP S.A. CCS. Ticket bearers shall keep its details and not disclose it to any third party. OPAP S.A. shall not be held liable for any eventual damage incurred, as a result of the disclosure of the player’s ticket details to third parties. A valid result is considered exclusively what has been registered in the Central Information Systems of OPAP S.A. OPAP S.A. is not responsible for any problems or damages to the Player due to technical problems, such as, for example, satellite transmission problems or any other technical issues due to which the virtual event is difficult or impossible to visualize. In these cases, all bets remain valid and only the result that has been registered in the Central Information Systems of OPAP S.A. is considered as valid result. PAYMENT OF WINNINGS  Winnings are paid to the bearer of the winning ticket. In case of the ticket loss, any claim regarding the payment of winnings  or any other type of compensation will be excluded.  Payment of winnings is carried out by OPAP S.A. authorized points of sale, or by partnering banking institutions, via the process laid down each time by OPAP S.A. Upon payment of winnings, the corresponding tax is directly withheld by OPAP S.A., per the applicable legislation. The maximum winning amount per entry, with one or more combinations included, is set to one million (1,000,000) EUR, unless otherwise specified and mentioned in the Program regarding specific wager types or event groups.  The maximum amount distributed as profit (per draw) in each of the game categories Number, Double, Quadrable, Octuple amounts to €500,000. If the total amount exceeds the maximum amounts, then the distribution of the maximum amount to the corresponding successes is done in shares according to the participation value of the winning area of each slip in each draw.  Betting winnings are written-off following the lapse of three (3) months from the expiration date of the respective Program. In case a ticket is destroyed or in case its details are altered, or in any other case that their identification or recovery by the CCS is not feasible, the said ticket will not be deemed valid and any claim regarding the payment of winnings or any other compensation by OPAP S.A. will be excluded. OPAP S.A. furnishes winnings’ certificates following a relevant request. For more information, please consult an agent or website www.allwyn.gr. OK',
        },
        opappsOnFire: {
          el: 'ΟΡΟΙ ΣΥΜΜΕΤΟΧΗΣ ΓΕΝΙΚΟΙ ΟΡΟΙ ΣΥΜΜΕΤΟΧΗΣ ΜΕ ΔΕΛΤΙΟ Η συμμετοχή στα Παιχνίδια Στοιχημάτων Προκαθορισμένης Απόδοσης επί πάσης φύσεως εικονικών αθλημάτων (συμπεριλαμβανομένων των Ιπποδρομιών και Κυνοδρομιών) και επί διάφορων άλλων εικονικών γεγονότων, η φύση των οποίων προσφέρεται για τη διεξαγωγή στοιχημάτων, γίνεται με αποκλειστική ευθύνη των συμμετεχόντων και συνεπάγεται την πλήρη, απόλυτη και ανεπιφύλακτη αποδοχή των διατάξεων της υφιστάμενης σχετικής νομοθεσίας, του Κανονισμού Οργάνωσης, Λειτουργίας και Διεξαγωγής των Παιχνιδιών Στοιχημάτων Προκαθορισμένης Απόδοσης, όπως ισχύει (εφεξής:Κανονισμός), καθώς και των όρων και προϋποθέσεων που θέτει κάθε φορά η ΟΠΑΠ Α.Ε. Η συμμετοχή επιτρέπεται σε όσους έχουν συμπληρώσει το δέκατο όγδοο (18ο) έτος της ηλικίας τους. Ο στοιχηματισμός επιτρέπεται μέχρι την έναρξη του πρώτου χρονικά διεξαγόμενου γεγονότος από τα γεγονότα επιλογής του παίκτη. Το μέγιστο ποσό στοιχηματισμού ανά συμμετοχή, είτε αυτή περιέχει έναν είτε πολλούς συνδυασμούς, ορίζεται κατ` ανώτατο όριο το ισόποσο της αξίας 10.000 στηλών και γνωστοποιείται στους παίκτες μέσω του Προγράμματος. Το αποδεικτικό συμμετοχής εκτυπώνεται από τις ειδικές τερματικές μηχανές με την προϋπόθεση της καταβολής από τον συμμετέχοντα του αναλογούντος αντιτίμου. Ο συμμετέχων κατά την παραλαβή του αποδεικτικού συμμετοχής οφείλει να ελέγξει ότι αυτό είναι έγκυρο και περιέχονται σε αυτό όλα τα στοιχεία που αντιστοιχούν στη συγκεκριμένη συμμετοχή του. Η ΟΠΑΠ Α.Ε. δεν ευθύνεται αν, εξαιτίας οποιουδήποτε λόγου, στοιχεία αποδεικτικού συμμετοχής δεν βρεθούν καταχωρημένα στο Κεντρικό Μηχανογραφικό Σύστημα ή και δεν έχουν διασφαλιστεί σύμφωνα με τα προβλεπόμενα στην κείμενη νομοθεσία. Σε αυτές τις περιπτώσεις ο κάτοχος του αποδεικτικού συμμετοχής δεν δικαιούται καταβολής κέρδους ή αποζημίωσης. Ο συμμετέχων δικαιούται να ζητήσει την ακύρωση της συμμετοχής του και την επιστροφή του αντιτίμου της αξίας της, εφόσον συντρέχουν οι προϋποθέσεις ακύρωσης και εντός των χρονικών ορίων που καθορίζονται από την ΟΠΑΠ Α.Ε. Η προθεσμία υποβολής ένστασης είναι έξι (6) ημέρες από την καταχώρηση των αποτελεσμάτων για όλα τα γεγονότα του Προγράμματος στο Κεντρικό Μηχανογραφικό Σύστημα της ΟΠΑΠ Α.Ε. Ο κομιστής του δελτίου οφείλει να διαφυλάσσει τα στοιχεία του δελτίου και να μην τα αποκαλύπτει σε οποιονδήποτε τρίτο. Η ΟΠΑΠ Α.Ε. ουδεμία ευθύνη φέρει για τη ζημία που τυχόν προκλήθηκε από τη γνωστοποίηση των στοιχείων του δελτίου του παίκτη προς τρίτους. Έγκυρο αποτέλεσμα θεωρείται αποκλειστικά και μόνο αυτό που έχει καταχωρηθεί στο κεντρικό μηχανογραφικό σύστημα της ΟΠΑΠ Α.Ε. Η ΟΠΑΠ Α.Ε. δεν φέρει ευθύνη για προβλήματα ή οποιαδήποτε ζημία ήθελε τυχόν υποστεί ο Παίκτης οφειλόμενη σε τεχνικά προβλήματα, όπως, ενδεικτικά, προβλήματα κατά τη μετάδοση μέσω δορυφόρου ή κάθε άλλη αδυναμία τεχνικής φύσεως λόγω της οποίας δυσλειτουργεί ή καθίσταται δυσχερής ή αδύνατη η απεικόνιση του εικονικού γεγονότος. Στην ως άνω περίπτωση όλα τα στοιχήματα παραμένουν σε ισχύ και έγκυρο αποτέλεσμα του εικονικού γεγονότος θεωρείται αποκλειστικά και μόνο αυτό που έχει καταχωρηθεί στο κεντρικό μηχανογραφικό σύστημα της ΟΠΑΠ Α.Ε. ΠΛΗΡΩΜΗ ΚΕΡΔΩΝ Τα κέρδη καταβάλλονται στον κομιστή του αποδεικτικού συμμετοχής που κερδίζει. Σε περίπτωση απώλειας αποδεικτικού συμμετοχής αποκλείεται η αξίωση καταβολής κέρδους ή άλλης αποζημίωσης.  Η πληρωμή των κερδών γίνεται από τα εξουσιοδοτημένα από την ΟΠΑΠ Α.Ε. σημεία πώλησης ή από τις συνεργαζόμενες Τράπεζες με διαδικασία που ορίζεται κάθε φορά από την ΟΠΑΠ Α.Ε.  Κατά την πληρωμή των κερδών παρακρατείται άμεσα από την ΟΠΑΠ Α.Ε. ο αναλογών φόρος, σύμφωνα με την εκάστοτε ισχύουσα νομοθεσία.  Το μέγιστο καταβαλλόμενο ποσό κέρδους ανά συμμετοχή, είτε αυτή περιέχει έναν είτε πολλούς συνδυασμούς, ορίζεται το ποσό του ενός εκατομμυρίου ευρώ (1.000.000 €) εκτός εάν άλλως ορίζεται και αναφέρεται στο Πρόγραμμα σχετικά με συγκεκριμένους τύπους στοιχημάτων ή ομάδες γεγονότων.  Το ανώτατο ποσό που μοιράζεται ως κέρδος (ανά κλήρωση) σε καθεμιά από τις κατηγορίες παιχνιδιών Αριθμός, Δυάδα, Τετράδα, Οκτάδα ανέρχεται σε 500.000€. Σε περίπτωση που το αναλογούν συνολικό ποσό υπερβαίνει τα προαναφερθέντα ανώτατα ποσά, τότε η διανομή του ανώτατου ποσού στις αντίστοιχες επιτυχίες γίνεται σε μερίδια ανάλογα με την αξία συμμετοχής της κερδίζουσας περιοχής του κάθε δελτίου σε κάθε κλήρωση.   Κέρδη από στοιχήματα παραγράφονται μετά την παρέλευση τριών (3) μηνών από την ημερομηνία λήξης του αντίστοιχου Προγράμματος.  Αποδεικτικό συμμετοχής που έχει καταστραφεί ή έχουν αλλοιωθεί τα στοιχεία του ή όταν σε οποιαδήποτε άλλη περίπτωση δεν είναι δυνατός ο εντοπισμός και η ανάκτησή τους από το Κ.Μ.Σ., ουδεμία ισχύ έχει και αποκλείεται η αξίωση καταβολής κέρδους και κάθε άλλη αξίωση για αποζημίωση από την ΟΠΑΠ Α.Ε.  Η ΟΠΑΠ Α.Ε. χορηγεί βεβαίωση εισπραχθέντος κέρδους κατόπιν σχετικής αίτησης. Για περισσότερες πληροφορίες μπορείτε να απευθυνθείτε στον πράκτορα ή στο διαδικτυακό τόπο του ΟΠΑΠ. Εντάξει',
          en: 'TERMS & CONDITIONS GENERAL TICKET PARTICIPATION TERMS Participation in Fixed-Odds Betting Games regarding all kinds of virtual sports (including horse and greyhound racing) and other virtual events, the nature of which is suitable for betting, is performed under the participants’ sole responsibility. The said participation entails the full, absolute and unreserved acceptance of the provisions of the applicable legislation, of the Regulation on the Organization, Operation and Conduct of Fixed-Odds Betting Games as applicable (hereinafter the Regulation), as well as of the terms and conditions laid down each time by OPAP S.A. Participation is permitted to persons over eighteen (18) years of age. Wagering is allowed to occur before the start of the very first event out of those selected by each player. The maximum wager per participation, with one or more combinations in place, is set to a maximum value equal to 10,000 columns, and is notified to players via the Program. Participation tickets are printed by dedicated terminals, provided that each participant has paid the respective fee. Upon receiving their ticket, participants have to confirm its validity, and that all details corresponding to their entry are therein included. OPAP S.A. shall bear no responsibility if, for any reason whatsoever, ticket details are not entered in the Central Computer System (CCS) and/or are not confirmed pursuant to the provisions of the applicable legislation. In these cases, ticket holders are not entitled to the payment of winnings or to a compensation. Participants are entitled to request the cancellation of their entry and the refund of its value, provided that cancellation conditions and the respective time limits, as set out by OPAP S.A., are met. Objections filing deadline is six (6) days as of the entry of the results of all Program events to the OPAP S.A. CCS. Ticket bearers shall keep its details and not disclose it to any third party. OPAP S.A. shall not be held liable for any eventual damage incurred, as a result of the disclosure of the player’s ticket details to third parties. A valid result is considered exclusively what has been registered in the Central Information Systems of OPAP S.A. OPAP S.A. is not responsible for any problems or damages to the Player due to technical problems, such as, for example, satellite transmission problems or any other technical issues due to which the virtual event is difficult or impossible to visualize. In these cases, all bets remain valid and only the result that has been registered in the Central Information Systems of OPAP S.A. is considered as valid result. PAYMENT OF WINNINGS  Winnings are paid to the bearer of the winning ticket. In case of ticket loss, any claim regarding the payment of winnings or any other type of compensation will be excluded.  Payment of winnings is carried out by OPAP S.A. authorized points of sale, or by partnering banking institutions, via the process laid down each time by OPAP S.A. Upon payment of winnings, the corresponding tax is directly withheld by OPAP S.A., per the applicable legislation. The maximum winning amount per entry, with one or more combinations included, is set to one million (1,000,000) EUR, unless otherwise specified and mentioned in the Program regarding specific wager types or event groups.  The maximum amount distributed as profit (per draw) in each of the game categories Number, Double, Quadrable, Octuple amounts to €500,000. If the total amount exceeds the maximum amounts, then the distribution of the maximum amount to the corresponding successes is done in shares according to the participation value of the winning area of each slip in each draw.  Betting winnings are written-off following the lapse of three (3) months from the expiration date of the respective Program. In case a ticket is destroyed or in case its details are altered, or in any other case that their identification or recovery by the CCS is not feasible, the said ticket will not be deemed valid and any claim regarding the payment of winnings or any other compensation by OPAP S.A. will be excluded. OPAP S.A. furnishes winnings’ certificates following a relevant request. For more information, please consult an agent or website OPAP. OK',
        },
      },
      shouldHaveText: async function (page, game) {
        await expect(this.get(page)).toHaveText(this.text[game][world.lang]);
      },
    },
    close: {
      get: function (page) {
        return page.locator('#close-info-modal');
      },
    },
    OK: {
      get: function (page) {
        return page.locator('#info-modal-ok');
      },
      text: {
        el: 'Εντάξει',
        en: 'OK',
      },
      shouldHaveText: async function (page) {
        await expect(this.get(page)).toHaveText(this.text[world.lang]);
      },
    },
  },
  howToPlay: {
    get: function (page) {
      return page.locator('#ssbt-header-game-info-how-to-play');
    },
    text: {
      el: 'ΠΩΣ ΠΑΙΖΕΤΑΙ',
      en: 'HOW TO PLAY',
    },
    shouldHaveText: async function (page) {
      await expect(this.get(page)).toHaveText(this.text[world.lang]);
    },
    txt: {
      get: function (page) {
        return page.locator('#help_modal');
      },
      text: {
        true: {
          el: '1ος τρόπος κατάθεσης:Παίρνεις  το voucher από τον πράκτορα και το σκανάρεις στο μηχάνημα.​Το ποσό της αξίας του εμφανίζεται πάνω δεξιά στην οθόνη. 2ος τρόπος κατάθεσης:​Επιλέγεις το πράσινο πεδίο Ψηφιακή Κατάθεση, πληκτρολογείς το ποσό που θέλεις να καταθέσεις, σκανάρεις το QR με την κάμερα του κινητού σου και επιλέγεις μέθοδο ηλεκτρονικής πληρωμής με χρήση ΜΟΝΟ ΧΡΕΩΣΤΙΚΗΣ κάρτας, μέσω Apple/Google Pay ή καταχωρώντας τον αριθμό της κάρτας.Το ποσό της κατάθεσης εμφανίζεται πάνω δεξιά στην οθόνη. Παίζεις πατώντας στην οθόνη τις επιλογές σου και με το κουμπί ΑΠΟΔΟΧΗ τυπώνεις το αποδεικτικό συμμετοχής σου. Σκανάροντας ένα κερδισμένο δελτίο, φορτώνεις, αν θέλεις, το ποσό στο υπόλοιπό σου. Τυπώνεις voucher ίσης αξίας με το υπόλοιπό σου, πατώντας το κουμπί «εξαργύρωση».Το voucher εξαργυρώνεται στον πράκτορα ή μπορεί να χρησιμοποιηθεί για μελλοντικό παιχνίδι.',
          en: '1st deposit method:Get a voucher from the agent and scan it to the terminal.The amount of the voucher value appears on the right top of the screen. 2nd deposit method:Select the green field \"Digital Payment\", type the desired deposit amount, scan the QR code via the camera of your mobile phone and choose the digital payment method using ONLY DEBIT card, via  Apple/Google Pay or by entering the card number.The amount of the voucher value appears on the right top of the screen. Play by clicking your choices on the screen. Click PLACE BET button to print your participation ticket. By scanning a winning ticket, you can load the winning amount to your balance. Print voucher of equal value to the amount of your balance, by clicking “CASH-OUT” button. The cash-out voucher can be redeemed to the agent or can be used for future play.',
        },
        false: {
          el: 'Παίρνεις  το voucher από τον πράκτορα και το σκανάρεις στο μηχάνημα.​Το ποσό της αξίας του εμφανίζεται πάνω δεξιά στην οθόνη. Παίζεις πατώντας στην οθόνη τις επιλογές σου και με το κουμπί ΑΠΟΔΟΧΗ τυπώνεις το αποδεικτικό συμμετοχής σου. Σκανάροντας ένα κερδισμένο δελτίο, φορτώνεις, αν θέλεις, το ποσό στο υπόλοιπό σου. Τυπώνεις voucher ίσης αξίας με το υπόλοιπό σου, πατώντας το κουμπί «εξαργύρωση».Το voucher εξαργυρώνεται στον πράκτορα ή μπορεί να χρησιμοποιηθεί για μελλοντικό παιχνίδι.',
          en: 'Get a voucher from the agent and scan it to the terminal.The amount of the voucher value appears on the right top of the screen. Play by clicking your choices on the screen. Click PLACE BET button to print your participation ticket. By scanning a winning ticket, you can load the winning amount to your balance. Print voucher of equal value to the amount of your balance, by clicking “CASH-OUT” button. The cash-out voucher can be redeemed to the agent or can be used for future play.',
        },
      },
      shouldHaveText: async function (page, digitalPay) {
        await expect(this.get(page)).toHaveText(this.text[digitalPay][world.lang]);
      },
    },
    helpIcon: {
      get: function (page, index) {
        return page.locator('img[alt="help icon"]').nth(index);
      },
      isVisible: async function (page, index) {
        await expect(this.get(page)).toBeVisible();
      },
      img: {
        el: 'data:image/png;base64',
        en: 'data:image/png;base64',
      },
      shouldHaveImg: async function (page, index) {
        await expect(this.get(page, index)).toHaveAttribute('src', new RegExp(this.img[world.lang]));
      },
    },
    close: {
      get: function (page) {
        return page.locator('#help_close_btn');
      },
    },
  },
  backToLobby: {
    get: function (page) {
      return page.locator('#ssbt_return_to_lobby');
    },
    text: {
      el: 'ΠΙΣΩ',
      en: 'BACK',
    },
    shouldHaveText: async function (page) {
      await expect(this.get(page)).toHaveText(this.text[world.lang]);
    },
    txt: {
      get: function (page) {
        return page.locator('#info-modal-container');
      },
      text: {
        el: '111ΚΑΘΑΡΙΣΜΟΣ ΔΕΛΤΙΟΥ Όλες οι επιλογές του δελτίου θα διαγραφούν. Είστε σίγουρος/η ότι θέλετε να συνεχίσετε; Όχι Ναι',
        en: '1111CLEAR BETSLIP All selections of the betslip will be lost. Are you sure you want to proceed? No Yes',
      },
      shouldHaveText: async function (page) {
        await expect(this.get(page)).toHaveText(this.text[world.lang]);
      },
    },
    no: {
      get: function (page) {
        return page.locator('#no-option');
      },
      text: {
        el: 'Όχι',
        en: 'No',
      },
      shouldHaveText: async function (page) {
        await expect(this.get(page)).toHaveText(this.text[world.lang]);
      },
    },
    yes: {
      get: function (page) {
        return page.locator('#yes-option');
      },
      text: {
        el: 'Ναι',
        en: 'Yes',
      },
      shouldHaveText: async function (page) {
        await expect(this.get(page)).toHaveText(this.text[world.lang]);
      },
    },
  },
  clearAll: {
    get: function (page) {
      return page.locator('#ssbt_base_clear_button_header');
    },
    text: {
      el: 'ΚΑΘΑΡΙΣΜΟΣ ΟΛΩΝ',
      en: 'CLEAR ALL',
    },
    shouldHaveText: async function (page) {
      await expect(this.get(page)).toHaveText(this.text[world.lang]);
    },
    txt: {
      get: function (page) {
        return page.locator('#info-modal-container');
      },
      text: {
        el: 'ΚΑΘΑΡΙΣΜΟΣ ΔΕΛΤΙΟΥ Όλες οι επιλογές του δελτίου θα διαγραφούν. Είστε σίγουρος/η ότι θέλετε να συνεχίσετε; Όχι Ναι',
        en: 'CLEAR BETSLIP All selections of the betslip will be lost. Are you sure you want to proceed? No Yes',
      },
      shouldHaveText: async function (page) {
        await expect(this.get(page)).toHaveText(this.text[world.lang]);
      },
    },
    no: {
      get: function (page) {
        return page.locator('#no-option');
      },
      text: {
        el: 'Όχι',
        en: 'No',
      },
      shouldHaveText: async function (page) {
        await expect(this.get(page)).toHaveText(this.text[world.lang]);
      },
    },
    yes: {
      get: function (page) {
        return page.locator('#yes-option');
      },
      text: {
        el: 'Ναι',
        en: 'Yes',
      },
      shouldHaveText: async function (page) {
        await expect(this.get(page)).toHaveText(this.text[world.lang]);
      },
    },
  },
  draw: {
    get: function (page) {
      return page.locator('#ssbt_lobbyHeaderNextDrawTimer');
    },
    text: {
      el: /ΚΛΗΡΩΣΗ \d+ΑΡΧΙΖΕΙ ΣΕ/, // Matches any number e.g. "ΚΛΗΡΩΣΗ 507654ΑΡΧΙΖΕΙ ΣΕ"
      en: /DRAW \d+BEGINS IN/, // Matches any number e.g. "DRAW 507654BEGINS IN"
    },
    shouldHaveText: async function (page) {
      await expect(this.get(page)).toHaveText(this.text[world.lang]);
    },
  },
  drawTime: {
    get: function (page) {
      return page.locator('#ssbt_draw_information');
    },
    text: {
      el: /\d{2}:\d{2}/, // Matches any number e.g. "01:07"
      en: /\d{2}:\d{2}/, // Matches any number e.g. "01:07"
    },
    shouldHaveText: async function (page) {
      await expect(this.get(page)).toHaveText(this.text[world.lang]);
    },
  },
  drawLive: {
    get: function (page) {
      return page.locator('#ssbt_live_draw_button');
    },
    text: {
      el: 'ΔΕΣ LIVE ΤΗΝ ΚΛΗΡΩΣΗ',
      en: 'VIEW LIVE DRAW',
    },
    shouldHaveText: async function (page) {
      await expect(this.get(page)).toHaveText(this.text[world.lang]);
    },
    icon: {
      get: function (page) {
        return page.locator('#ssbt_live_draw_play_icon');
      },
      isVisible: async function (page) {
        await expect(this.get(page)).toBeVisible();
      },
    },
  },
  cashOut: {
    get: function (page) {
      return page.locator('#ssbt_cash_out');
    },
    isDisabled: async function (page, label) {
      await expect(this.get(page, label)).toHaveClass(/--disabled/);
    },
    isEnabled: async function (page, label) {
      await expect(this.get(page, label)).not.toHaveClass(/--disabled/);
    },
    text: {
      el: 'ΕΞΑΡΓΥΡΩΣΗ',
      en: 'CASH OUT',
    },
    shouldHaveText: async function (page) {
      await expect(this.get(page)).toHaveText(this.text[world.lang]);
    },
    txt: {
      get: function (page) {
        return page.locator('#info-modal-container');
      },
      text: {
        el: 'ΕΞΑΡΓΥΡΩΣΗ Θα εκδοθεί αποδεικτικό εξαργύρωσης για το υπόλοιπο ποσό. Θέλετε να συνεχίσετε; Όχι Ναι',
        en: 'CASH OUT A cash out voucher for your balance will be issued. Do you want to continue? No Yes',
      },
      shouldHaveText: async function (page) {
        await expect(this.get(page)).toHaveText(this.text[world.lang]);
      },
    },
    no: {
      get: function (page) {
        return page.locator('#no-option');
      },
      text: {
        el: 'Όχι',
        en: 'No',
      },
      shouldHaveText: async function (page) {
        await expect(this.get(page)).toHaveText(this.text[world.lang]);
      },
    },
    yes: {
      get: function (page) {
        return page.locator('#yes-option');
      },
      text: {
        el: 'Ναι',
        en: 'Yes',
      },
      shouldHaveText: async function (page) {
        await expect(this.get(page)).toHaveText(this.text[world.lang]);
      },
    },
  },
  digitalPay: {
    get: function (page) {
      return page.locator('.lobby-header-digital-pay');
    },
    text: {
      el: 'Ψηφιακή Κατάθεση',
      en: 'Digital Deposit',
    },
    shouldHaveText: async function (page) {
      await expect(this.get(page)).toHaveText(this.text[world.lang]);
    },
    notExists: async function (page) {
      await expect(this.get(page)).toHaveCount(0);
    },
  },
  balance: {
    get: function (page) {
      return page.locator('#ssbt_balance_box');
    },
    text: {
      hide: {
        el: 'Εμφάνιση Υπολοίπου',
        en: 'Display Balance',
      },
      unhide: {
        el: '€',
        en: '€',
      },
      zero: {
        el: '0,00€',
        en: '0,00€',
      },
    },
    shouldHaveText: async function (page) {
      await expect(this.get(page)).toHaveText(this.text.hide[world.lang]);
    },
    shouldContain: async function (page) {
      await expect(this.get(page)).toContainText(this.text.unhide[world.lang]);
    },
    shouldHaveZero: async function (page) {
      await expect(this.get(page)).toContainText(this.text.zero[world.lang]);
    },
    eyeIcon: {
      get: function (page) {
        return page.locator('#ssbt_balance_eye_icon');
      },
      isVisible: async function (page) {
        await expect(this.get(page)).toBeVisible();
      },
    },
    refresh: {
      get: function (page) {
        return page.locator('#ssbt_balance_refresh');
      },
      notExists: async function (page) {
        await expect(this.get(page)).toHaveCount(0);
      },
    },
  },
  languageSwitcher: {
    get: function (page) {
      return page.locator('#ssbt_language_selection');
    },
    greekBtn: {
      get: function (page) {
        return page.locator('#ssbt_lang_gr');
      },
    },
    englishBtn: {
      get: function (page) {
        return page.locator('#ssbt_lang_en');
      },
    },
    text: {
      el: 'ΕΛ',
      en: 'EN',
    },
    shouldHaveText: async function (page, _language) {
      await expect(this.greekBtn.get(page)).toHaveText(this.text.el);
      await expect(this.englishBtn.get(page)).toHaveText(this.text.en);
    },
    switchLanguage: async function (page, language) {
      if (language === 'el') {
        await this.greekBtn.get(page).click();
      } else if (language === 'en') {
        await this.englishBtn.get(page).click();
      } else {
        throw new Error('Invalid language specified. Use "el" or "en".');
      }
    },
  },
  responsibleGaming: {
    get: function (page) {
      return page.locator('#ssbt_rg_img');
    },
    isVisible: async function (page) {
      await expect(this.get(page)).toBeVisible();
    },
    txt: {
      get: function (page) {
        return page.locator('#info-modal-container');
      },
      text: {
        get ejp() {
          return this.kino;
        },
        get powerspin() {
          return this.kino;
        },
        get psOnFire() {
          return this.kino;
        },
        get help() {
          return this.kino;
        },
        kino: {
          el: 'ΥΠΕΥΘΥΝΟ ΠΑΙΧΝΙΔΙ Στην ΟΠΑΠ Α.Ε. ενθαρρύνουμε το «Υπεύθυνο Παιχνίδι». Λέγοντας «Υπεύθυνο Παιχνίδι» αναφερόμαστε σε μια σειρά δράσεων που στοχεύουν στην προστασία και αποτροπή του κοινού και ιδιαίτερα των ευαίσθητα κοινωνικών ομάδων (π.χ. ανήλικοι) από την συμμετοχή, την εξάρτηση και τον εθισμό στα Τυχερά Παίγνια με σκοπό να μην τίθενται σε κίνδυνο η δημόσια υγεία, η ασφάλεια, η νομιμότητα και διαφάνεια των συναλλαγών. Ειδικότερα στην ΟΠΑΠ Α.Ε. αναπτύσσουμε δράσεις για το «Υπεύθυνο Παιχνίδι» που σκοπό έχουν να ενημερώσουν τους Παίκτες:  Για το πώς να μεγιστοποιήσουν την ψυχαγωγία που τους προσφέρουν τα Τυχερά Παίγνια, καθώς και την ελαχιστοποίηση των αρνητικών επιπτώσεων από την συμμετοχή τους.  Για τους κανονισμούς διεξαγωγής των παιχνιδιών.  ΓΕΝΙΚΕΣ ΑΡΧΕΣ ΥΠΕΥΘΥΝΟΥ ΠΑΙΧΝΙΔΙΟΥ Γιατί το παιχνίδι το ελέγχεις εσύ. Μάθε πως: Στα Παιχνίδια της ΟΠΑΠ Α.Ε., δεν μπορείς να παίξεις αν είσαι κάτω των 18 ετών, ενώ στόχος μας είναι να δημιουργούμε ένα ασφαλές περιβάλλον για τους παίκτες μας. Στην allwyn θέλουμε το παιχνίδι να παραμένει διασκεδαστικό. ΥΠΕΥΘΥΝΟΣ ΠΑΙΚΤΗΣ Υπεύθυνος Παίκτης είναι αυτός που:  Παίζοντας Τυχερά Παίγνια ορίζει από την αρχή ένα χρηματικό ποσό και δεν το ξεπερνάει για κανένα λόγο. Δεν δανείζεται χρήματα για να παίξει. Δεν παίζει τα χρήματα που προορίζονται για άλλες καθημερινές του ανάγκες. Δεν προσπαθεί να «ρεφάρει» ρισκάροντας επιπλέον χρήματα. Είναι συνειδητοποιημένος και πιστεύει ότι δεν μπορεί να επηρεάσει το τυχερό παιχνίδι.  Τι κάνει ένας έξυπνος Παίκτης;  Αποφεύγει να ξοδεύει σε Τυχερά Παίγνια τα χρήματα που προορίζονται για άλλες ανάγκες. Σταματάει να παίζει ή παίζει λιγότερο, προκειμένου να διασφαλίσει τα χρήματα που προορίζονται για άλλες ανάγκες. Αποφεύγει να ξοδεύει πολύ συχνά μικρά ποσά ή ρέστα για να συμμετάσχει σε Τυχερά Παίγνια. Δεν παίζει για να κερδίσει πίσω τα χαμένα χρήματα. Αποφεύγει να θεωρεί τα Τυχερά Παίγνια ως λύση των προβλημάτων του και των ανησυχιών του. Δεν δανείζεται ποτέ χρήματα για να παίξει. Θεωρεί ότι τα χρήματα που δαπάνησε για να παίξει είναι το αντίτιμο που πληρώνει κανείς για να διασκεδάσει. Δεν ψεύδεται στα αγαπημένα του πρόσωπα για τα χρήματα που ξόδεψε ή το χρόνο που αφιέρωσε παίζοντας. Ζητάει βοήθεια από ειδικούς όταν αντιλαμβάνεται ότι τείνει να ξοδεύει παραπάνω ή να παίζει συχνότερα. Δεν παίζει όταν αισθάνεται λυπημένος, μόνος, βαριεστημένος, φορτισμένος ή αγχωμένος. Βάζει πάντα όρια στο παιχνίδι και δεν τα ξεπερνάει ΠΟΤΕ! Παίζει πάντα μόνο το χρηματικό ποσό που είχε καθορίσει εξαρχής. Σταματάει να παίζει όταν ξεπερνάει το προκαθορισμένο χρηματικό όριο. Έχει συναίσθηση του χρονικού διαστήματος που παίζει και των ποσών που ξοδεύει. Κάνει χρήση της δυνατότητας για αυτοπεριορισμό στις περιπτώσεις που είναι εφικτό. Ενημερώνεται σχετικά με τις πιθανότητες κέρδους.  ΠΡΟΣ ΤΟΥΣ ΣΥΓΓΕΝΕΙΣ Ή ΦΙΛΟΥΣ ΤΩΝ ΕΘΙΣΜΕΝΩΝ ΠΑΙΚΤΩΝ Για τον Παίκτη που έχει ξεπεράσει τα όρια με την ενασχόλησή του με τα Τυχερά Παίγνια, είναι σημαντικό να αντιληφθεί ότι:  Δεν είναι μόνος με το πρόβλημα του και μπορεί να βρει κατανόηση και στήριξη είτε σε οικεία του πρόσωπα είτε σε ειδικούς επιστήμονες. Είναι σημαντικό να είναι ειλικρινής με τον εαυτό του και με τους άλλους. Πρέπει να είναι προετοιμασμένος για την εμφάνιση στερητικού συνδρόμου. Θα βοηθήσει τον εαυτό του βρίσκοντας δραστηριότητες που θα τον αποσπούν από τα Τυχερά Παίγνια.  Η βοήθεια και συμπαράσταση συγγενών και φίλων των Παικτών, που αντιμετωπίζουν εθισμό από τα Τυχερά Παίγνια, μπορεί να είναι καθοριστικός παράγοντας σε ότι αφορά την απεξάρτησή τους από αυτά. Βοηθάμε τον εθισμένο συγγενή ή φίλο μας όταν:  Τον δεχόμαστε όπως είναι καθώς με το να τον καταδικάζουμε μπορεί να επιδεινώσουμε την κατάστασή του. Τον παρακινούμε να συνειδητοποιήσει την εξάρτησή του. Του εξηγούμε ότι είναι υπεύθυνος για τις πράξεις του. Του δίνουμε κίνητρο για να αλλάξει. Τον προτρέπουμε να δεχτεί βοήθεια από επαγγελματίες της ψυχικής υγείας ή από ομάδες αλληλοβοήθειας.  Σημαντικές συμβουλές Μπορεί ο παίκτης να βελτιώσει τις πιθανότητες να κερδίσει; ΟΧΙ.Οι ικανότητες, οι στρατηγικές ή οι προλήψεις, δεν μπορούν να επηρεάσουν το τελικό αποτέλεσμα του παιχνιδιού. Πολλοί άνθρωποι έχουν διάφορες θεωρίες για το πώς μπορούν να βελτιώσουν τις πιθανότητες κέρδους. ΠΡΟΓΡΑΜΜΑ ΥΠΟΣΤΗΡΙΞΗΣ ΓΙΑ ΕΘΙΣΜΕΝΟΥΣ ΠΑΙΚΤΕΣ ΣΤΑ ΤΥΧΕΡΑ ΠΑΙΧΝΙΔΙΑ Αν κάποιος πιστεύει ότι έχει πρόβλημα σχετικό με τα Τυχερά Παίγνια (ή πιστεύει ότι έχει πρόβλημα κάποιος συγγενής του ή φίλος του), μπορεί να απευθυνθεί στην τηλεφωνική γραμμή 1114, ψυχολογικής υποστήριξης και τηλεσυμβουλευτικής του ΚΕΘΕΑ-ΑΛΦΑ (http://www.kethea-alfa.gr) για τους εθισμένους Παίκτες, η οποία λειτουργεί με την οικονομική υποστήριξη της ΟΠΑΠ Α.Ε. Μέσα από αυτό το πρόγραμμα προσφέρεται βοήθεια και καθοδήγηση στον ίδιο, στους συγγενείς ή στους φίλους του.  Η Γραμμή Βοηθείας λειτουργεί Δευτέρα έως Παρασκευή από 09:00 έως τις 21:00 με πλήρως εξειδικευμένο προσωπικό, όπως κοινωνιολόγους, κοινωνικούς λειτουργούς, ψυχολόγους. Στόχος του προγράμματος είναι οι ενδιαφερόμενοι που αντιμετωπίζουν πρόβλημα εθισμού με τα Τυχερά Παίγνια, μέσω προσωπικών συναντήσεων, να απεξαρτηθούν και να επανενταχθούν στην κοινωνία.  ΕΡΩΤΗΜΑΤΟΛΟΓΙΟ ΑΥΤΟ-ΑΞΙΟΛΟΓΗΣΗΣ ΤΟΥ ΠΑΙΚΤΗ Η ΟΠΑΠ Α.Ε. διαθέτει στον Παίκτη και σε κάθε ενδιαφερόμενο, εργαλεία (τεστ) αυτο-αξιολόγησης, σχετικά με την στάση τους απέναντι στα Παίγνια. Μπορείς να ανακαλύψεις αν παίζεις για τη χαρά του παιχνιδιού ή αν η ενασχόλησή σου με τα τυχερά παιχνίδια έχει αρχίσει να σου δημιουργεί προβλήματα. Το τεστ αυτό-αξιολόγησης, είναι ανώνυμο, προσβάσιμο σε όλους και μπορεί να το κάνει οποιοσδήποτε εντός των των καταστημάτων μας ή μέσω του ηλεκτρονικού Ιστότοπου www.allwyn.gr χωρίς να απαιτείται εγγραφή (sign up) ή είσοδος (log in). Εντάξει',
          en: 'RESPONSIBLE GAMING Στην ΟΠΑΠ Α.Ε. ενθαρρύνουμε το «Υπεύθυνο Παιχνίδι». Λέγοντας «Υπεύθυνο Παιχνίδι» αναφερόμαστε σε μια σειρά δράσεων που στοχεύουν στην προστασία και αποτροπή του κοινού και ιδιαίτερα των ευαίσθητα κοινωνικών ομάδων (π.χ. ανήλικοι) από την συμμετοχή, την εξάρτηση και τον εθισμό στα Τυχερά Παίγνια με σκοπό να μην τίθενται σε κίνδυνο η δημόσια υγεία, η ασφάλεια, η νομιμότητα και διαφάνεια των συναλλαγών. Ειδικότερα στην ΟΠΑΠ Α.Ε. αναπτύσσουμε δράσεις για το «Υπεύθυνο Παιχνίδι» που σκοπό έχουν να ενημερώσουν τους Παίκτες:  Για το πώς να μεγιστοποιήσουν την ψυχαγωγία που τους προσφέρουν τα Τυχερά Παίγνια, καθώς και την ελαχιστοποίηση των αρνητικών επιπτώσεων από την συμμετοχή τους.  Για τους κανονισμούς διεξαγωγής των παιχνιδιών.  ΓΕΝΙΚΕΣ ΑΡΧΕΣ ΥΠΕΥΘΥΝΟΥ ΠΑΙΧΝΙΔΙΟΥ Γιατί το παιχνίδι το ελέγχεις εσύ. Μάθε πως: Στα Παιχνίδια της ΟΠΑΠ Α.Ε., δεν μπορείς να παίξεις αν είσαι κάτω των 18 ετών, ενώ στόχος μας είναι να δημιουργούμε ένα ασφαλές περιβάλλον για τους παίκτες μας. Στην allwyn θέλουμε το παιχνίδι να παραμένει διασκεδαστικό. ΥΠΕΥΘΥΝΟΣ ΠΑΙΚΤΗΣ Υπεύθυνος Παίκτης είναι αυτός που:  Παίζοντας Τυχερά Παίγνια ορίζει από την αρχή ένα χρηματικό ποσό και δεν το ξεπερνάει για κανένα λόγο. Δεν δανείζεται χρήματα για να παίξει. Δεν παίζει τα χρήματα που προορίζονται για άλλες καθημερινές του ανάγκες. Δεν προσπαθεί να «ρεφάρει» ρισκάροντας επιπλέον χρήματα. Είναι συνειδητοποιημένος και πιστεύει ότι δεν μπορεί να επηρεάσει το τυχερό παιχνίδι.  Τι κάνει ένας έξυπνος Παίκτης;  Αποφεύγει να ξοδεύει σε Τυχερά Παίγνια τα χρήματα που προορίζονται για άλλες ανάγκες. Σταματάει να παίζει ή παίζει λιγότερο, προκειμένου να διασφαλίσει τα χρήματα που προορίζονται για άλλες ανάγκες. Αποφεύγει να ξοδεύει πολύ συχνά μικρά ποσά ή ρέστα για να συμμετάσχει σε Τυχερά Παίγνια. Δεν παίζει για να κερδίσει πίσω τα χαμένα χρήματα. Αποφεύγει να θεωρεί τα Τυχερά Παίγνια ως λύση των προβλημάτων του και των ανησυχιών του. Δεν δανείζεται ποτέ χρήματα για να παίξει. Θεωρεί ότι τα χρήματα που δαπάνησε για να παίξει είναι το αντίτιμο που πληρώνει κανείς για να διασκεδάσει. Δεν ψεύδεται στα αγαπημένα του πρόσωπα για τα χρήματα που ξόδεψε ή το χρόνο που αφιέρωσε παίζοντας. Ζητάει βοήθεια από ειδικούς όταν αντιλαμβάνεται ότι τείνει να ξοδεύει παραπάνω ή να παίζει συχνότερα. Δεν παίζει όταν αισθάνεται λυπημένος, μόνος, βαριεστημένος, φορτισμένος ή αγχωμένος. Βάζει πάντα όρια στο παιχνίδι και δεν τα ξεπερνάει ΠΟΤΕ! Παίζει πάντα μόνο το χρηματικό ποσό που είχε καθορίσει εξαρχής. Σταματάει να παίζει όταν ξεπερνάει το προκαθορισμένο χρηματικό όριο. Έχει συναίσθηση του χρονικού διαστήματος που παίζει και των ποσών που ξοδεύει. Κάνει χρήση της δυνατότητας για αυτοπεριορισμό στις περιπτώσεις που είναι εφικτό. Ενημερώνεται σχετικά με τις πιθανότητες κέρδους.  ΠΡΟΣ ΤΟΥΣ ΣΥΓΓΕΝΕΙΣ Ή ΦΙΛΟΥΣ ΤΩΝ ΕΘΙΣΜΕΝΩΝ ΠΑΙΚΤΩΝ Για τον Παίκτη που έχει ξεπεράσει τα όρια με την ενασχόλησή του με τα Τυχερά Παίγνια, είναι σημαντικό να αντιληφθεί ότι:  Δεν είναι μόνος με το πρόβλημα του και μπορεί να βρει κατανόηση και στήριξη είτε σε οικεία του πρόσωπα είτε σε ειδικούς επιστήμονες. Είναι σημαντικό να είναι ειλικρινής με τον εαυτό του και με τους άλλους. Πρέπει να είναι προετοιμασμένος για την εμφάνιση στερητικού συνδρόμου. Θα βοηθήσει τον εαυτό του βρίσκοντας δραστηριότητες που θα τον αποσπούν από τα Τυχερά Παίγνια.  Η βοήθεια και συμπαράσταση συγγενών και φίλων των Παικτών, που αντιμετωπίζουν εθισμό από τα Τυχερά Παίγνια, μπορεί να είναι καθοριστικός παράγοντας σε ότι αφορά την απεξάρτησή τους από αυτά. Βοηθάμε τον εθισμένο συγγενή ή φίλο μας όταν:  Τον δεχόμαστε όπως είναι καθώς με το να τον καταδικάζουμε μπορεί να επιδεινώσουμε την κατάστασή του. Τον παρακινούμε να συνειδητοποιήσει την εξάρτησή του. Του εξηγούμε ότι είναι υπεύθυνος για τις πράξεις του. Του δίνουμε κίνητρο για να αλλάξει. Τον προτρέπουμε να δεχτεί βοήθεια από επαγγελματίες της ψυχικής υγείας ή από ομάδες αλληλοβοήθειας.  Σημαντικές συμβουλές Μπορεί ο παίκτης να βελτιώσει τις πιθανότητες να κερδίσει; ΟΧΙ.Οι ικανότητες, οι στρατηγικές ή οι προλήψεις, δεν μπορούν να επηρεάσουν το τελικό αποτέλεσμα του παιχνιδιού. Πολλοί άνθρωποι έχουν διάφορες θεωρίες για το πώς μπορούν να βελτιώσουν τις πιθανότητες κέρδους. ΠΡΟΓΡΑΜΜΑ ΥΠΟΣΤΗΡΙΞΗΣ ΓΙΑ ΕΘΙΣΜΕΝΟΥΣ ΠΑΙΚΤΕΣ ΣΤΑ ΤΥΧΕΡΑ ΠΑΙΧΝΙΔΙΑ Αν κάποιος πιστεύει ότι έχει πρόβλημα σχετικό με τα Τυχερά Παίγνια (ή πιστεύει ότι έχει πρόβλημα κάποιος συγγενής του ή φίλος του), μπορεί να απευθυνθεί στην τηλεφωνική γραμμή 1114, ψυχολογικής υποστήριξης και τηλεσυμβουλευτικής του ΚΕΘΕΑ-ΑΛΦΑ (http://www.kethea-alfa.gr) για τους εθισμένους Παίκτες, η οποία λειτουργεί με την οικονομική υποστήριξη της ΟΠΑΠ Α.Ε. Μέσα από αυτό το πρόγραμμα προσφέρεται βοήθεια και καθοδήγηση στον ίδιο, στους συγγενείς ή στους φίλους του.  Η Γραμμή Βοηθείας λειτουργεί Δευτέρα έως Παρασκευή από 09:00 έως τις 21:00 με πλήρως εξειδικευμένο προσωπικό, όπως κοινωνιολόγους, κοινωνικούς λειτουργούς, ψυχολόγους. Στόχος του προγράμματος είναι οι ενδιαφερόμενοι που αντιμετωπίζουν πρόβλημα εθισμού με τα Τυχερά Παίγνια, μέσω προσωπικών συναντήσεων, να απεξαρτηθούν και να επανενταχθούν στην κοινωνία.  ΕΡΩΤΗΜΑΤΟΛΟΓΙΟ ΑΥΤΟ-ΑΞΙΟΛΟΓΗΣΗΣ ΤΟΥ ΠΑΙΚΤΗ Η ΟΠΑΠ Α.Ε. διαθέτει στον Παίκτη και σε κάθε ενδιαφερόμενο, εργαλεία (τεστ) αυτο-αξιολόγησης, σχετικά με την στάση τους απέναντι στα Παίγνια. Μπορείς να ανακαλύψεις αν παίζεις για τη χαρά του παιχνιδιού ή αν η ενασχόλησή σου με τα τυχερά παιχνίδια έχει αρχίσει να σου δημιουργεί προβλήματα. Το τεστ αυτό-αξιολόγησης, είναι ανώνυμο, προσβάσιμο σε όλους και μπορεί να το κάνει οποιοσδήποτε εντός των των καταστημάτων μας ή μέσω του ηλεκτρονικού Ιστότοπου www.allwyn.gr χωρίς να απαιτείται εγγραφή (sign up) ή είσοδος (log in). OK',
        },
        get opapejp() {
          return this.opapKino;
        },
        get opapPowerspin() {
          return this.opapKino;
        },
        get opappsOnFire() {
          return this.opapKino;
        },
        get opappsOnFire() {
          return this.opapKino;
        },
        get opapHelp() {
          return this.opapKino;
        },
        opapKino: {
          el: 'ΥΠΕΥΘΥΝΟ ΠΑΙΧΝΙΔΙ Στην ΟΠΑΠ Α.Ε. ενθαρρύνουμε το «Υπεύθυνο Παιχνίδι». Λέγοντας «Υπεύθυνο Παιχνίδι» αναφερόμαστε σε μια σειρά δράσεων που στοχεύουν στην προστασία και αποτροπή του κοινού και ιδιαίτερα των ευαίσθητα κοινωνικών ομάδων (π.χ. ανήλικοι) από την συμμετοχή, την εξάρτηση και τον εθισμό στα Τυχερά Παίγνια με σκοπό να μην τίθενται σε κίνδυνο η δημόσια υγεία, η ασφάλεια, η νομιμότητα και διαφάνεια των συναλλαγών. Ειδικότερα στην ΟΠΑΠ Α.Ε. αναπτύσσουμε δράσεις για το «Υπεύθυνο Παιχνίδι» που σκοπό έχουν να ενημερώσουν τους Παίκτες:  Για το πώς να μεγιστοποιήσουν την ψυχαγωγία που τους προσφέρουν τα Τυχερά Παίγνια, καθώς και την ελαχιστοποίηση των αρνητικών επιπτώσεων από την συμμετοχή τους.  Για τους κανονισμούς διεξαγωγής των παιχνιδιών.  ΓΕΝΙΚΕΣ ΑΡΧΕΣ ΥΠΕΥΘΥΝΟΥ ΠΑΙΧΝΙΔΙΟΥ Γιατί το παιχνίδι το ελέγχεις εσύ. Μάθε πως: Στα Παιχνίδια της ΟΠΑΠ Α.Ε., δεν μπορείς να παίξεις αν είσαι κάτω των 18 ετών, ενώ στόχος μας είναι να δημιουργούμε ένα ασφαλές περιβάλλον για τους παίκτες μας. Στον ΟΠΑΠ θέλουμε το παιχνίδι να παραμένει διασκεδαστικό. ΥΠΕΥΘΥΝΟΣ ΠΑΙΚΤΗΣ Υπεύθυνος Παίκτης είναι αυτός που:  Παίζοντας Τυχερά Παίγνια ορίζει από την αρχή ένα χρηματικό ποσό και δεν το ξεπερνάει για κανένα λόγο. Δεν δανείζεται χρήματα για να παίξει. Δεν παίζει τα χρήματα που προορίζονται για άλλες καθημερινές του ανάγκες. Δεν προσπαθεί να «ρεφάρει» ρισκάροντας επιπλέον χρήματα. Είναι συνειδητοποιημένος και πιστεύει ότι δεν μπορεί να επηρεάσει το τυχερό παιχνίδι.  Τι κάνει ένας έξυπνος Παίκτης;  Αποφεύγει να ξοδεύει σε Τυχερά Παίγνια τα χρήματα που προορίζονται για άλλες ανάγκες. Σταματάει να παίζει ή παίζει λιγότερο, προκειμένου να διασφαλίσει τα χρήματα που προορίζονται για άλλες ανάγκες. Αποφεύγει να ξοδεύει πολύ συχνά μικρά ποσά ή ρέστα για να συμμετάσχει σε Τυχερά Παίγνια. Δεν παίζει για να κερδίσει πίσω τα χαμένα χρήματα. Αποφεύγει να θεωρεί τα Τυχερά Παίγνια ως λύση των προβλημάτων του και των ανησυχιών του. Δεν δανείζεται ποτέ χρήματα για να παίξει. Θεωρεί ότι τα χρήματα που δαπάνησε για να παίξει είναι το αντίτιμο που πληρώνει κανείς για να διασκεδάσει. Δεν ψεύδεται στα αγαπημένα του πρόσωπα για τα χρήματα που ξόδεψε ή το χρόνο που αφιέρωσε παίζοντας. Ζητάει βοήθεια από ειδικούς όταν αντιλαμβάνεται ότι τείνει να ξοδεύει παραπάνω ή να παίζει συχνότερα. Δεν παίζει όταν αισθάνεται λυπημένος, μόνος, βαριεστημένος, φορτισμένος ή αγχωμένος. Βάζει πάντα όρια στο παιχνίδι και δεν τα ξεπερνάει ΠΟΤΕ! Παίζει πάντα μόνο το χρηματικό ποσό που είχε καθορίσει εξαρχής. Σταματάει να παίζει όταν ξεπερνάει το προκαθορισμένο χρηματικό όριο. Έχει συναίσθηση του χρονικού διαστήματος που παίζει και των ποσών που ξοδεύει. Κάνει χρήση της δυνατότητας για αυτοπεριορισμό στις περιπτώσεις που είναι εφικτό. Ενημερώνεται σχετικά με τις πιθανότητες κέρδους.  ΠΡΟΣ ΤΟΥΣ ΣΥΓΓΕΝΕΙΣ Ή ΦΙΛΟΥΣ ΤΩΝ ΕΘΙΣΜΕΝΩΝ ΠΑΙΚΤΩΝ Για τον Παίκτη που έχει ξεπεράσει τα όρια με την ενασχόλησή του με τα Τυχερά Παίγνια, είναι σημαντικό να αντιληφθεί ότι:  Δεν είναι μόνος με το πρόβλημα του και μπορεί να βρει κατανόηση και στήριξη είτε σε οικεία του πρόσωπα είτε σε ειδικούς επιστήμονες. Είναι σημαντικό να είναι ειλικρινής με τον εαυτό του και με τους άλλους. Πρέπει να είναι προετοιμασμένος για την εμφάνιση στερητικού συνδρόμου. Θα βοηθήσει τον εαυτό του βρίσκοντας δραστηριότητες που θα τον αποσπούν από τα Τυχερά Παίγνια.  Η βοήθεια και συμπαράσταση συγγενών και φίλων των Παικτών, που αντιμετωπίζουν εθισμό από τα Τυχερά Παίγνια, μπορεί να είναι καθοριστικός παράγοντας σε ότι αφορά την απεξάρτησή τους από αυτά. Βοηθάμε τον εθισμένο συγγενή ή φίλο μας όταν:  Τον δεχόμαστε όπως είναι καθώς με το να τον καταδικάζουμε μπορεί να επιδεινώσουμε την κατάστασή του. Τον παρακινούμε να συνειδητοποιήσει την εξάρτησή του. Του εξηγούμε ότι είναι υπεύθυνος για τις πράξεις του. Του δίνουμε κίνητρο για να αλλάξει. Τον προτρέπουμε να δεχτεί βοήθεια από επαγγελματίες της ψυχικής υγείας ή από ομάδες αλληλοβοήθειας.  Σημαντικές συμβουλές Μπορεί ο παίκτης να βελτιώσει τις πιθανότητες να κερδίσει; ΟΧΙ.Οι ικανότητες, οι στρατηγικές ή οι προλήψεις, δεν μπορούν να επηρεάσουν το τελικό αποτέλεσμα του παιχνιδιού. Πολλοί άνθρωποι έχουν διάφορες θεωρίες για το πώς μπορούν να βελτιώσουν τις πιθανότητες κέρδους. ΠΡΟΓΡΑΜΜΑ ΥΠΟΣΤΗΡΙΞΗΣ ΓΙΑ ΕΘΙΣΜΕΝΟΥΣ ΠΑΙΚΤΕΣ ΣΤΑ ΤΥΧΕΡΑ ΠΑΙΧΝΙΔΙΑ Αν κάποιος πιστεύει ότι έχει πρόβλημα σχετικό με τα Τυχερά Παίγνια (ή πιστεύει ότι έχει πρόβλημα κάποιος συγγενής του ή φίλος του), μπορεί να απευθυνθεί στην τηλεφωνική γραμμή 1114, ψυχολογικής υποστήριξης και τηλεσυμβουλευτικής του ΚΕΘΕΑ-ΑΛΦΑ (http://www.kethea-alfa.gr) για τους εθισμένους Παίκτες, η οποία λειτουργεί με την οικονομική υποστήριξη της ΟΠΑΠ Α.Ε. Μέσα από αυτό το πρόγραμμα προσφέρεται βοήθεια και καθοδήγηση στον ίδιο, στους συγγενείς ή στους φίλους του.  Η Γραμμή Βοηθείας λειτουργεί Δευτέρα έως Παρασκευή από 09:00 έως τις 21:00 με πλήρως εξειδικευμένο προσωπικό, όπως κοινωνιολόγους, κοινωνικούς λειτουργούς, ψυχολόγους. Στόχος του προγράμματος είναι οι ενδιαφερόμενοι που αντιμετωπίζουν πρόβλημα εθισμού με τα Τυχερά Παίγνια, μέσω προσωπικών συναντήσεων, να απεξαρτηθούν και να επανενταχθούν στην κοινωνία.  ΕΡΩΤΗΜΑΤΟΛΟΓΙΟ ΑΥΤΟ-ΑΞΙΟΛΟΓΗΣΗΣ ΤΟΥ ΠΑΙΚΤΗ Η ΟΠΑΠ Α.Ε. διαθέτει στον Παίκτη και σε κάθε ενδιαφερόμενο, εργαλεία (τεστ) αυτο-αξιολόγησης, σχετικά με την στάση τους απέναντι στα Παίγνια. Μπορείς να ανακαλύψεις αν παίζεις για τη χαρά του παιχνιδιού ή αν η ενασχόλησή σου με τα τυχερά παιχνίδια έχει αρχίσει να σου δημιουργεί προβλήματα. Το τεστ αυτό-αξιολόγησης, είναι ανώνυμο, προσβάσιμο σε όλους και μπορεί να το κάνει οποιοσδήποτε εντός των πρακτορείων ΟΠΑΠ ή μέσω του ηλεκτρονικού Ιστότοπου www.opap.gr χωρίς να απαιτείται εγγραφή (sign up) ή είσοδος (log in). Εντάξει',
          en: 'RESPONSIBLE GAMING Στην ΟΠΑΠ Α.Ε. ενθαρρύνουμε το «Υπεύθυνο Παιχνίδι». Λέγοντας «Υπεύθυνο Παιχνίδι» αναφερόμαστε σε μια σειρά δράσεων που στοχεύουν στην προστασία και αποτροπή του κοινού και ιδιαίτερα των ευαίσθητα κοινωνικών ομάδων (π.χ. ανήλικοι) από την συμμετοχή, την εξάρτηση και τον εθισμό στα Τυχερά Παίγνια με σκοπό να μην τίθενται σε κίνδυνο η δημόσια υγεία, η ασφάλεια, η νομιμότητα και διαφάνεια των συναλλαγών. Ειδικότερα στην ΟΠΑΠ Α.Ε. αναπτύσσουμε δράσεις για το «Υπεύθυνο Παιχνίδι» που σκοπό έχουν να ενημερώσουν τους Παίκτες:  Για το πώς να μεγιστοποιήσουν την ψυχαγωγία που τους προσφέρουν τα Τυχερά Παίγνια, καθώς και την ελαχιστοποίηση των αρνητικών επιπτώσεων από την συμμετοχή τους  Για τους κανονισμούς διεξαγωγής των παιχνιδιών.  ΓΕΝΙΚΕΣ ΑΡΧΕΣ ΥΠΕΥΘΥΝΟΥ ΠΑΙΧΝΙΔΙΟΥ Γιατί το παιχνίδι το ελέγχεις εσύ. Μάθε πως: Στα Παιχνίδια της ΟΠΑΠ Α.Ε., δεν μπορείς να παίξεις αν είσαι κάτω των 18 ετών, ενώ στόχος μας είναι να δημιουργούμε ένα ασφαλές περιβάλλον για τους παίκτες μας. Στον ΟΠΑΠ θέλουμε το παιχνίδι να παραμένει διασκεδαστικό. ΥΠΕΥΘΥΝΟΣ ΠΑΙΚΤΗΣ Υπεύθυνος Παίκτης είναι αυτός που:  Παίζοντας Τυχερά Παίγνια ορίζει από την αρχή ένα χρηματικό ποσό και δεν το ξεπερνάει για κανένα λόγο. Δεν δανείζεται χρήματα για να παίξει. Δεν παίζει τα χρήματα που προορίζονται για άλλες καθημερινές του ανάγκες. Δεν προσπαθεί να «ρεφάρει» ρισκάροντας επιπλέον χρήματα. Είναι συνειδητοποιημένος και πιστεύει ότι δεν μπορεί να επηρεάσει το τυχερό παιχνίδι.  Τι κάνει ένας έξυπνος Παίκτης;  Αποφεύγει να ξοδεύει σε Τυχερά Παίγνια τα χρήματα που προορίζονται για άλλες ανάγκες. Σταματάει να παίζει ή παίζει λιγότερο, προκειμένου να διασφαλίσει τα χρήματα που προορίζονται για άλλες ανάγκες. Αποφεύγει να ξοδεύει πολύ συχνά μικρά ποσά ή ρέστα για να συμμετάσχει σε Τυχερά Παίγνια. Δεν παίζει για να κερδίσει πίσω τα χαμένα χρήματα. Αποφεύγει να θεωρεί τα Τυχερά Παίγνια ως λύση των προβλημάτων του και των ανησυχιών του. Δεν δανείζεται ποτέ χρήματα για να παίξει. Θεωρεί ότι τα χρήματα που δαπάνησε για να παίξει είναι το αντίτιμο που πληρώνει κανείς για να διασκεδάσει. Δεν ψεύδεται στα αγαπημένα του πρόσωπα για τα χρήματα που ξόδεψε ή το χρόνο που αφιέρωσε παίζοντας. Ζητάει βοήθεια από ειδικούς όταν αντιλαμβάνεται ότι τείνει να ξοδεύει παραπάνω ή να παίζει συχνότερα. Δεν παίζει όταν αισθάνεται λυπημένος, μόνος, βαριεστημένος, φορτισμένος ή αγχωμένος. Βάζει πάντα όρια στο παιχνίδι και δεν τα ξεπερνάει ΠΟΤΕ! Παίζει πάντα μόνο το χρηματικό ποσό που είχε καθορίσει εξαρχής. Σταματάει να παίζει όταν ξεπερνάει το προκαθορισμένο χρηματικό όριο. Έχει συναίσθηση του χρονικού διαστήματος που παίζει και των ποσών που ξοδεύει. Κάνει χρήση της δυνατότητας για αυτοπεριορισμό στις περιπτώσεις που είναι εφικτό. Ενημερώνεται σχετικά με τις πιθανότητες κέρδους.  ΠΡΟΣ ΤΟΥΣ ΣΥΓΓΕΝΕΙΣ Ή ΦΙΛΟΥΣ ΤΩΝ ΕΘΙΣΜΕΝΩΝ ΠΑΙΚΤΩΝ Για τον Παίκτη που έχει ξεπεράσει τα όρια με την ενασχόλησή του με τα Τυχερά Παίγνια, είναι σημαντικό να αντιληφθεί ότι:  Δεν είναι μόνος με το πρόβλημα του και μπορεί να βρει κατανόηση και στήριξη είτε σε οικεία του πρόσωπα είτε σε ειδικούς επιστήμονες. Είναι σημαντικό να είναι ειλικρινής με τον εαυτό του και με τους άλλους. Πρέπει να είναι προετοιμασμένος για την εμφάνιση στερητικού συνδρόμου. Θα βοηθήσει τον εαυτό του βρίσκοντας δραστηριότητες που θα τον αποσπούν από τα Τυχερά Παίγνια.  Η βοήθεια και συμπαράσταση συγγενών και φίλων των Παικτών, που αντιμετωπίζουν εθισμό από τα Τυχερά Παίγνια, μπορεί να είναι καθοριστικός παράγοντας σε ότι αφορά την απεξάρτησή τους από αυτά. Βοηθάμε τον εθισμένο συγγενή ή φίλο μας όταν:  Τον δεχόμαστε όπως είναι καθώς με το να τον καταδικάζουμε μπορεί να επιδεινώσουμε την κατάστασή του. Τον παρακινούμε να συνειδητοποιήσει την εξάρτησή του. Του εξηγούμε ότι είναι υπεύθυνος για τις πράξεις του. Του δίνουμε κίνητρο για να αλλάξει. Τον προτρέπουμε να δεχτεί βοήθεια από επαγγελματίες της ψυχικής υγείας ή από ομάδες αλληλοβοήθειας.  Σημαντικές συμβουλές Μπορεί ο παίκτης να βελτιώσει τις πιθανότητες να κερδίσει; ΟΧΙ.Οι ικανότητες, οι στρατηγικές ή οι προλήψεις, δεν μπορούν να επηρεάσουν το τελικό αποτέλεσμα του παιχνιδιού. Πολλοί άνθρωποι έχουν διάφορες θεωρίες για το πώς μπορούν να βελτιώσουν τις πιθανότητες κέρδους. ΠΡΟΓΡΑΜΜΑ ΥΠΟΣΤΗΡΙΞΗΣ ΓΙΑ ΕΘΙΣΜΕΝΟΥΣ ΠΑΙΚΤΕΣ ΣΤΑ ΤΥΧΕΡΑ ΠΑΙΧΝΙΔΙΑ Αν κάποιος πιστεύει ότι έχει πρόβλημα σχετικό με τα Τυχερά Παίγνια (ή πιστεύει ότι έχει πρόβλημα κάποιος συγγενής του ή φίλος του), μπορεί να απευθυνθεί στην τηλεφωνική γραμμή 1114, ψυχολογικής υποστήριξης και τηλεσυμβουλευτικής του ΚΕΘΕΑ-ΑΛΦΑ (http://www.kethea-alfa.gr) για τους εθισμένους Παίκτες, η οποία λειτουργεί με την οικονομική υποστήριξη της ΟΠΑΠ Α.Ε. Μέσα από αυτό το πρόγραμμα προσφέρεται βοήθεια και καθοδήγηση στον ίδιο, στους συγγενείς ή στους φίλους του.  Η Γραμμή Βοηθείας λειτουργεί Δευτέρα έως Παρασκευή από 09:00 έως τις 21:00 με πλήρως εξειδικευμένο προσωπικό, όπως κοινωνιολόγους, κοινωνικούς λειτουργούς, ψυχολόγους. Στόχος του προγράμματος είναι οι ενδιαφερόμενοι που αντιμετωπίζουν πρόβλημα εθισμού με τα Τυχερά Παίγνια, μέσω προσωπικών συναντήσεων, να απεξαρτηθούν και να επανενταχθούν στην κοινωνία.  ΕΡΩΤΗΜΑΤΟΛΟΓΙΟ ΑΥΤΟ-ΑΞΙΟΛΟΓΗΣΗΣ ΤΟΥ ΠΑΙΚΤΗ Η ΟΠΑΠ Α.Ε. διαθέτει στον Παίκτη και σε κάθε ενδιαφερόμενο, εργαλεία (τεστ) αυτο-αξιολόγησης, σχετικά με την στάση τους απέναντι στα Παίγνια. Μπορείς να ανακαλύψεις αν παίζεις για τη χαρά του παιχνιδιού ή αν η ενασχόλησή σου με τα τυχερά παιχνίδια έχει αρχίσει να σου δημιουργεί προβλήματα. Το τεστ αυτό-αξιολόγησης, είναι ανώνυμο, προσβάσιμο σε όλους και μπορεί να το κάνει οποιοσδήποτε εντός των πρακτορείων ΟΠΑΠ ή μέσω του ηλεκτρονικού Ιστότοπου www.opap.gr χωρίς να απαιτείται εγγραφή (sign up) ή είσοδος (log in). OK',
        },
      },
      shouldHaveText: async function (page, game = 'kino') {
        await expect(this.get(page)).toHaveText((this.text[game] ?? this.text.kino)[world.lang]);
      },
    },
    close: {
      get: function (page) {
        return page.locator('#close-info-modal');
      },
    },
    OK: {
      get: function (page) {
        return page.locator('#info-modal-ok');
      },
      text: {
        el: 'Εντάξει',
        en: 'OK',
      },
      shouldHaveText: async function (page) {
        await expect(this.get(page)).toHaveText(this.text[world.lang]);
      },
    },
  },
};

module.exports = page;
