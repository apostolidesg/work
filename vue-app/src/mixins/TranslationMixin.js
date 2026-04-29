export default {
  computed: {
    currentLocale() {
      return this.$root.$i18n.locale;
    },
  },
  methods: {
    getTranslation(translations) {
      const returnTranslation = translations[this.currentLocale()] || translations['en'];
  
      /* 
      * The translation may contain HTML entities and multiple spaces,
      * so we clean it up before returning.
      * This was causing layout issues in some cases.
      * So we need to normalize html on return.
      */
      return returnTranslation
        ?.replace(/&nbsp;/gi, ' ')
        .replace(/\u00A0/g, ' ')
        .replace(/[ \t]{2,}/g, ' ')
        .replace(/ *<br\s*\/?> */gi, '<br>')
        .trim();
    },
  },
};
