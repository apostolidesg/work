import types from './types';
import { FALLBACK_VIDEO } from '../../../constants/stringConstants';
import { DEFAULT_MAIN_FAQ } from '../../../config/defaultContent';
import Constants from '../../../util/Constants';
// import { loadConfiguration } from '../../../util/electronUtils';

const actions = {
  [types.actions.SET_CONFIGURATION]({ commit }, { configuration }) {
    commit(types.mutations.SET_CONFIGURATION, { configuration });
  },
  [types.actions.SET_VOUCHER]({ commit }, { voucher }) {
    commit(types.mutations.SET_VOUCHER, { voucher });
  },
  [types.actions.INITIALIZE_ASSETS]: async ({ commit, getters, dispatch }) => {
    try {
      const cfg = getters[types.getters.GET_CONFIGURATION];
      const digitalAssistantAssets = cfg?.DIGITAL_ASSISTANT?.ASSETS || {};
      const entries = Object.entries(digitalAssistantAssets);
      await Promise.all(
        entries.map(([key, filename]) => {
          const isVideo = /\.(mp4|webm|avi|mov|mkv)$/i.test(filename);
          const type = isVideo ? 'video' : 'image';
          return dispatch(types.actions.LOAD_ASSET, {
            assetKey: key,
            assetPath: filename,
            type,
          });
        })
      );
      commit(types.mutations.SET_CONFIG_LOADED, true);
    } catch (e) {
      console.error('Failed to initialize assets:', e);
      commit(types.mutations.SET_CONFIG_LOADED, false);
    }
  },
  [types.actions.LOAD_DIGITAL_ASSISTANT_CONFIG]: async ({ commit, getters }) => {
    try {
      const cfg = getters[types.getters.GET_CONFIGURATION];
      const enabled = cfg?.DIGITAL_ASSISTANT?.DIGITAL_ASSISTANT_ENABLED;
      commit(types.mutations.SET_DIGITAL_ASSISTANT_ENABLED, enabled);
      return enabled;
    } catch (e) {
      commit(types.mutations.SET_DIGITAL_ASSISTANT_ENABLED, false);
      throw e;
    }
  },
  [types.actions.LOAD_ASSET]: async ({ commit, getters }, { assetKey, assetPath, type }) => {
    try {
      const cfg = getters[types.getters.GET_CONFIGURATION];
      const vueCfg = cfg?.vue?.DIGITAL_ASSISTANT || {};
      commit(types.mutations.SET_ASSET_URL, {
        type,
        key: assetKey,
        url: vueCfg[assetKey],
      });
      commit(types.mutations.SET_BASE_URL, vueCfg.ASSET_URL);
    } catch (e) {
      console.error('Failed to load asset:', e);
      if (type === 'video') {
        commit(types.mutations.SET_ASSET_URL, {
          type: 'videos',
          key: assetKey,
          url: FALLBACK_VIDEO,
        });
      }
    }
  },
  [types.actions.INITIALIZE_FAQ_DATA]: async ({ commit, dispatch, getters }) => {
    try {
      await dispatch(types.actions.LOAD_MAIN_FAQ_SECTIONS);
      const cfg = getters[types.getters.GET_CONFIGURATION];
      const faqSections = cfg?.DIGITAL_ASSISTANT?.FAQ_SECTIONS || {};
      for (const [pageType, pageConfig] of Object.entries(faqSections)) {
        if (pageConfig?.boxes) {
          commit(types.mutations.SET_FAQ_BOXES, { pageType, boxes: pageConfig.boxes });
          for (const box of pageConfig.boxes) {
            if (box.route && box.id) {
              commit(types.mutations.SET_FAQ_BOX, {
                pageType,
                boxId: box.id,
                data: { title: box.title, content: box.content },
              });
            }
          }
        }
      }
    } catch (e) {
      console.error('Failed to initialize FAQ data:', e);
    }
  },
  [types.actions.LOAD_FAQ_BOXES]: async ({ getters, commit }, { pageType, defaultBoxes = {} }) => {
    const cached = getters[types.getters.GET_FAQ_BOXES]?.[pageType];
    if (cached?.length) return cached;
    const cfg = getters[types.getters.GET_CONFIGURATION];
    const pageCfg = cfg?.DIGITAL_ASSISTANT?.FAQ_SECTIONS?.[pageType];
    const boxes = pageCfg?.boxes?.length ? pageCfg.boxes : (defaultBoxes[pageType] || []).map((b) => ({ ...b }));
    commit(types.mutations.SET_FAQ_BOXES, { pageType, boxes });
    return boxes;
  },
  [types.actions.LOAD_FAQ_BOX]: async ({ getters, commit }, { pageType, boxId, defaultContent = {} }) => {
    const cached = getters[types.getters.GET_FAQ_BOX]?.[pageType]?.[boxId];
    if (cached?.title || cached?.content) return cached;
    const cfg = getters[types.getters.GET_CONFIGURATION];
    const boxes = cfg?.DIGITAL_ASSISTANT?.FAQ_SECTIONS?.[pageType] || [];
    const hit = boxes.find((b) => b.route?.includes(boxId));
    let result;
    const isAllwyn = getters[types.getters.GET_BRAND_NAME] === Constants.BRAND_NAMES.ALLWYN;
    const descriptionKey = isAllwyn ? 'allwynDescription' : 'description';
    if (hit) {
      result = { title: hit.title, content: hit?.[descriptionKey] || hit.description };
    } else {
      const fb = (defaultContent[pageType] || []).find((b) => b.route?.includes(boxId));
      result = fb ? { title: fb.title, content: fb?.[descriptionKey] || fb.description } : { title: '', content: '' };
    }
    commit(types.mutations.SET_FAQ_BOXES, { pageType, boxId, data: result });
    return result;
  },
  [types.actions.LOAD_MAIN_FAQ_SECTIONS]: async ({ commit, getters }) => {
    const cached = getters[types.getters.GET_MAIN_FAQ_SECTIONS];
    if (cached?.length) return cached;
    try {
      const cfg = getters[types.getters.GET_CONFIGURATION];
      let sections = (cfg?.DIGITAL_ASSISTANT?.MAIN_FAQ?.sections || []).filter((s) => s?.id && s?.route);
      if (!sections.length) {
        sections = (DEFAULT_MAIN_FAQ.MAIN_FAQ?.sections || []).filter((s) => s?.id && s?.route);
      }
      commit(types.mutations.SET_MAIN_FAQ_SECTIONS, sections);
      return sections;
    } catch (e) {
      const fallback = (DEFAULT_MAIN_FAQ.sections || []).filter((s) => s?.id && s?.route);
      commit(types.mutations.SET_MAIN_FAQ_SECTIONS, fallback);
      return fallback;
    }
  },
  [types.actions.LOAD_SCREENSAVER_IDLE_TIME]: async ({ commit, getters }) => {
    try {
      const cfg = getters[types.getters.GET_CONFIGURATION];
      const idleTime = cfg?.DIGITAL_ASSISTANT?.IDLE_TIME;
      commit(types.mutations.SET_SCREENSAVER_IDLE_TIME, idleTime);
      return cfg;
    } catch (e) {
      return e;
    }
  },
  [types.actions.LOAD_SCREENSAVER_ENABLED]: async ({ commit, getters }) => {
    try {
      const cfg = getters[types.getters.GET_CONFIGURATION];
      const screenSaverEnabled = cfg?.DIGITAL_ASSISTANT?.IS_SCREENSAVER_ENABLED;
      commit(types.mutations.SET_SCREENSAVER_ENABLED, screenSaverEnabled);
      return screenSaverEnabled;
    } catch (e) {
      return e;
    }
  },
};

export default actions;
