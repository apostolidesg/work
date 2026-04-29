import types from './types';

const mutations = {
  [types.mutations.SET_CONFIGURATION](state, { configuration }) {
    state.config = configuration;
  },
  [types.mutations.SET_VOUCHER](state, { voucher }) {
    state.voucher = voucher;
  },
  [types.mutations.SET_CONFIG_LOADED](state, value) {
    state.properties = { ...state.properties, isConfigLoaded: value };
  },
  [types.mutations.SET_ASSET_URL](state, { type, key, url }) {
    if (!state.properties.vue) state.properties.vue = {};
    if (!state.properties.vue.assetsUrls) state.properties.vue.assetsUrls = {};
    state.properties.vue[key] = url;
    if (type) {
      if (!state.properties.vue.assetsUrls[type]) {
        state.properties.vue.assetsUrls[type] = {};
      }
      state.properties.vue.assetsUrls[type][key] = url;
    }
  },
  [types.mutations.SET_BASE_URL](state, url) {
    state.properties = { ...state.properties, ASSET_URL: url };
  },
  [types.mutations.SET_FAQ_BOXES](state, boxes) {
    state.faqBoxes = boxes;
  },
  [types.mutations.SET_CURRENT_FAQ_BOX](state, boxData) {
    state.currentFaqBox = boxData;
  },
  [types.mutations.SET_MAIN_FAQ_SECTIONS](state, sections) {
    state.mainFaqSections = sections;
  },
};

export default mutations;
