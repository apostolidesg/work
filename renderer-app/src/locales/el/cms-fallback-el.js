export default {
  LOBBY: {
    EASY: {
      HORIZONTAL: {
        JACKPOT_GAMES_AREA: {
          PROMOTIONAL_TEXT: 'Παίξε εδώ για να λάβεις ένα άμεσο δώρο!',
          TZOKER: {
            MANUAL_BETSLIP_BUTTON_TEXT: 'Επίλεξε τους αριθμούς σου',
            READY_BETSLIPS_TEXT: 'Επίλεξε το δελτίο σου',
            JACKPOT_TEXT: 'Παίξε για',
            READY_BETSLIPS: {
              BETSLIP_1: {
                columns: 1,
                tzoker: 7,
                text: {
                  en: '1 στήλη',
                  el: '1 στήλη',
                },
              },
              BETSLIP_2: {
                columns: 6,
                tzoker: 8,
                text: {
                  en: '6 στήλες',
                  el: '6 στήλες',
                },
              },
              BETSLIP_3: {
                columns: 20,
                tzoker: 20,
                text: {
                  en: '10 στήλες',
                  el: '20 στήλες',
                },
              },
            },
            PROMOTION: {
              ACTION_BUTTON_TEXT: 'ΚΛΙΚ ΕΔΩ!',
              SUBMIT_BUTTON_TEXT: 'Πρόσθεσε στο δελτίο σου',
              RETRY_BUTTON_TEXT: 'Σπάσε άλλο μπισκότο',
              NUMBERS_TEXT: 'Οι τυχεροί σου αριθμοί',
              TITLE: 'Διασκεδαστικό Μέρος! Crack the cookie and reveal your numbers! (TYPE html) 2',
              FORTUNE_MESSAGE: 'Η τύχη ευνοεί τους τολμηρούς!',
            },
          },
          EUROJACKPOT: {
            MANUAL_BETSLIP_BUTTON_TEXT: 'Επίλεξε τους αριθμούς σου',
            READY_BETSLIPS_TEXT: 'Επίλεξε το δελτίο σου',
            JACKPOT_TEXT: 'Παίξε για',
            READY_BETSLIPS: {
              BETSLIP_1: {
                columns: 1,
                tzoker: 5,
                text: {
                  en: '1 στήλη',
                  el: '2 στήλη',
                },
              },
              BETSLIP_2: {
                columns: 6,
                tzoker: 10,
                text: {
                  en: '6 στήλες',
                  el: '4 στήλες',
                },
              },
              BETSLIP_3: {
                columns: 20,
                tzoker: 25,
                text: {
                  en: '10 στήλες',
                  el: '10 στήλες',
                },
              },
            },
            PROMOTION: {
              ACTION_BUTTON_TEXT: 'ΚΛΙΚ ΕΔΩ!',
              SUBMIT_BUTTON_TEXT: 'Πρόσθεσε στο δελτίο σου',
              RETRY_BUTTON_TEXT: 'Σπάσε άλλο μπισκότο',
              NUMBERS_TEXT: 'Οι τυχεροί σου αριθμοί',
              TITLE: 'Διασκεδαστικό Μέρος! Crack the cookie and reveal your numbers! (TYPE html) 2',
              FORTUNE_MESSAGE: 'Η τύχη ευνοεί τους τολμηρούς!',
            },
          },
        },
      },
      VERTICAL: {
        JACKPOT_GAMES_AREA: {
          PROMOTIONAL_TEXT: 'Παίξε εδώ για να λάβεις ένα άμεσο δώρο!',
          TZOKER: {
            MANUAL_BETSLIP_BUTTON_TEXT: 'Επίλεξε τους αριθμούς σου',
            READY_BETSLIPS_TEXT: 'Επίλεξε τα προσυμπληρωμένα δελτία σου',
            JACKPOT_TEXT: 'Παίξε για',
            READY_BETSLIPS: {
              BETSLIP_1: {
                columns: 1,
                tzoker: 7,
                text: {
                  en: '1 στήλη',
                  el: '1 στήλη',
                },
              },
              BETSLIP_2: {
                columns: 6,
                tzoker: 8,
                text: {
                  en: '6 στήλες',
                  el: '6 στήλες',
                },
              },
              BETSLIP_3: {
                columns: 20,
                tzoker: 9,
                text: {
                  en: '10 στήλες',
                  el: '15 στήλες',
                },
              },
            },
          },
          EUROJACKPOT: {
            MANUAL_BETSLIP_BUTTON_TEXT: 'Επίλεξε τους αριθμούς σου',
            READY_BETSLIPS_TEXT: 'Επίλεξε τα προσυμπληρωμένα δελτία σου',
            JACKPOT_TEXT: 'Παίξε για',
            READY_BETSLIPS: {
              BETSLIP_1: {
                columns: 1,
                tzoker: 7,
                text: {
                  en: '1 στήλη',
                  el: '1 στήλη',
                },
              },
              BETSLIP_2: {
                columns: 6,
                tzoker: 8,
                text: {
                  en: '6 στήλες',
                  el: '6 στήλες',
                },
              },
              BETSLIP_3: {
                columns: 20,
                tzoker: 9,
                text: {
                  en: '10 στήλες',
                  el: '15 στήλες',
                },
              },
            },
          },
        },
      },
    },
    PRO: {
      HORIZONTAL: {
        LOBBY_IMAGES: {
          EUROJACKPOT: {
            order: 500,
            hide: false,
            span: false,
            src: {
              en: '/src/assets/prolobby/EuroJackpot.jpg',
              el: '/src/assets/prolobby/Eurojackpot-el.jpg',
            },
            promoText: {
              en: 'Play EuroJackpot',
              el: 'Eurojackpot',
            },
          },
          TZOKER: {
            order: 2,
            hide: false,
            alignRight: true,
            span: false,
            src: {
              en: '/src/assets/prolobby/Tzoker.jpg',
              el: '/src/assets/prolobby/Tzoker-el.jpg',
            },
            promoText: {
              en: 'Play EuroJackpot',
              el: 'Eurojackpot',
            },
          },
          PAMESTOIXIMA: {
            order: 2,
            hide: false,
            span: false,
            src: {
              en: '/src/assets/prolobby/pamestoixima.jpg',
              el: '/src/assets/prolobby/pamestoixima-el.jpg',
            },
            promoText: {
              en: 'Play EuroJackpot',
              el: 'Eurojackpot',
            },
          },
          KINO: {
            order: 4,
            hide: false,
            span: false,
            src: {
              en: '/src/assets/prolobby/kino.jpg',
              el: '/src/assets/prolobby/kino-el.jpg',
            },
            promoText: {
              en: 'Play EuroJackpot',
              el: 'Eurojackpot',
            },
          },
          VIRTUALS: {
            order: 5,
            hide: false,
            span: false,
            src: {
              en: '/src/assets/prolobby/virtuals.jpg',
              el: '/src/assets/prolobby/virtuals-el.jpg',
            },
            promoText: {
              en: 'Play EuroJackpot',
              el: 'Eurojackpot',
            },
          },
          POWERSPIN: {
            order: 0,
            hide: false,
            span: false,
            src: {
              en: '/src/assets/prolobby/powerspin.jpg',
              el: '/src/assets/prolobby/powerspin-el.jpg',
            },
            promoText: {
              en: 'Play EuroJackpot',
              el: 'Eurojackpot',
            },
          },
          POWERSPIN_ON_FIRE: {
            order: 7,
            hide: false,
            span: false,
            src: {
              en: '/src/assets/prolobby/powerspinOnFire.jpg',
              el: '/src/assets/prolobby/powerspinOnFire-el.jpg',
            },
            promoText: {
              en: 'Play EuroJackpot',
              el: 'Eurojackpot',
            },
          },
          BANNER_ZONE: {
            order: 8,
            hide: false,
            span: false,
            src: {
              en: '/src/assets/prolobby/bannerzone.jpg',
              el: '/src/assets/prolobby/bannerzone-el.jpg',
            },
            promoText: {
              en: 'Play EuroJackpot',
              el: 'Eurojackpot',
            },
          },
        },
      },
    },
  },
};
