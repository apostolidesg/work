import { expect } from 'chai';
import sinon from 'sinon';
import types from '@/store/modules/ConfigurationStoreModule/types';
import actionsRaw from '@/store/modules/ConfigurationStoreModule/actions';
const actions = { ...actionsRaw };
describe('ConfigurationStoreModule actions', () => {
  let s;
  beforeEach(() => {
    s = sinon.createSandbox();
  });
  afterEach(() => {
    s.restore();
  });
  describe('SET_CONFIGURATION', () => {
    it('commits configuration', () => {
      const commit = s.spy();
      const mockConfig = { some: 'config' };
      actions[types.actions.SET_CONFIGURATION]({ commit }, { configuration: mockConfig });
      expect(commit.calledOnce).to.be.true;
      expect(commit.calledWith(types.mutations.SET_CONFIGURATION, { configuration: mockConfig })).to.be.true;
    });
  });
  describe('SET_VOUCHER', () => {
    it('commits voucher', () => {
      const commit = s.spy();
      const mockVoucher = { code: 'ABC123' };
      actions[types.actions.SET_VOUCHER]({ commit }, { voucher: mockVoucher });
      expect(commit.calledOnce).to.be.true;
      expect(commit.calledWith(types.mutations.SET_VOUCHER, { voucher: mockVoucher })).to.be.true;
    });
  });
  describe('INITIALIZE_ASSETS', () => {
    it('loads all assets and sets config loaded to true', async () => {
      const commit = s.spy();
      const dispatch = s.stub().resolves();
      const mockConfig = {
        DIGITAL_ASSISTANT: {
          ASSETS: {
            VIDEO_LOBBY: 'lobby.mp4',
            VIDEO_KINO: 'kino.webm',
            IMAGE_BACKGROUND: 'background.png',
          },
        },
      };
      const getters = {
        [types.getters.GET_CONFIGURATION]: mockConfig,
      };
      await actions[types.actions.INITIALIZE_ASSETS]({ commit, dispatch, getters });
      expect(dispatch.callCount).to.equal(3);
      expect(commit.calledWith(types.mutations.SET_CONFIG_LOADED, true)).to.be.true;
    });
    it('handles missing assets config', async () => {
      const commit = s.spy();
      const dispatch = s.stub().resolves();
      const getters = {
        [types.getters.GET_CONFIGURATION]: {},
      };
      await actions[types.actions.INITIALIZE_ASSETS]({ commit, dispatch, getters });
      expect(dispatch.callCount).to.equal(0);
      expect(commit.calledWith(types.mutations.SET_CONFIG_LOADED, true)).to.be.true;
    });
    it('sets config loaded to false on error', async () => {
      const commit = s.spy();
      const dispatch = s.stub().rejects(new Error('Load failed'));
      const consoleStub = s.stub(console, 'error');
      const getters = {
        [types.getters.GET_CONFIGURATION]: {
          DIGITAL_ASSISTANT: {
            ASSETS: {
              VIDEO_LOBBY: 'lobby.mp4',
            },
          },
        },
      };
      await actions[types.actions.INITIALIZE_ASSETS]({ commit, dispatch, getters });
      expect(commit.calledWith(types.mutations.SET_CONFIG_LOADED, false)).to.be.true;
      expect(consoleStub.called).to.be.true;
    });
  });
  describe('LOAD_ASSET', () => {
    it('LOAD_ASSET loads asset successfully', async () => {
      const commit = s.spy();
      const getters = {
        [types.getters.GET_CONFIGURATION]: {
          vue: {
            DIGITAL_ASSISTANT: {
              VIDEO_LOBBY: '/videos/lobby.mp4',
              ASSET_URL: '/base/',
            },
          },
        },
      };
      await actions[types.actions.LOAD_ASSET](
        { commit, getters },
        {
          assetKey: 'VIDEO_LOBBY',
          assetPath: '/videos/lobby.mp4',
          type: 'videos',
        }
      );
      expect(
        commit.calledWith(types.mutations.SET_ASSET_URL, {
          type: 'videos',
          key: 'VIDEO_LOBBY',
          url: '/videos/lobby.mp4',
        })
      ).to.be.true;
      expect(commit.calledWith(types.mutations.SET_BASE_URL, '/base/')).to.be.true;
    });
  });
  describe('LOAD_SCREENSAVER_ENABLED', () => {
    it('loads and commits screensaver enabled state', async () => {
      const commit = s.spy();
      const getters = {
        [types.getters.GET_CONFIGURATION]: {
          DIGITAL_ASSISTANT: {
            IS_SCREENSAVER_ENABLED: true,
          },
        },
      };
      const result = await actions[types.actions.LOAD_SCREENSAVER_ENABLED]({ commit, getters });
      expect(commit.calledWith(types.mutations.SET_SCREENSAVER_ENABLED, true)).to.be.true;
      expect(result).to.be.true;
    });
    it('handles screensaver disabled', async () => {
      const commit = s.spy();
      const getters = {
        [types.getters.GET_CONFIGURATION]: {
          DIGITAL_ASSISTANT: {
            IS_SCREENSAVER_ENABLED: false,
          },
        },
      };
      const result = await actions[types.actions.LOAD_SCREENSAVER_ENABLED]({ commit, getters });
      expect(commit.calledWith(types.mutations.SET_SCREENSAVER_ENABLED, false)).to.be.true;
      expect(result).to.be.false;
    });
  });
  describe('INITIALIZE_FAQ_DATA', () => {
    it('INITIALIZE_FAQ_DATA processes FAQ sections', async () => {
      const commit = s.spy();
      const dispatch = s.stub().resolves();
      const getters = {
        [types.getters.GET_CONFIGURATION]: {
          DIGITAL_ASSISTANT: {
            FAQ_SECTIONS: {
              mainPage: {
                boxes: [
                  { id: 'box1', route: '/help/box1', title: 'Box 1', content: 'Content 1' },
                  { id: 'box2', route: '/help/box2', title: 'Box 2', content: 'Content 2' },
                ],
              },
            },
          },
        },
      };
      await actions[types.actions.INITIALIZE_FAQ_DATA]({ commit, dispatch, getters });
      expect(dispatch.calledWith(types.actions.LOAD_MAIN_FAQ_SECTIONS)).to.be.true;
      expect(
        commit.calledWith(types.mutations.SET_FAQ_BOXES, {
          pageType: 'mainPage',
          boxes: getters[types.getters.GET_CONFIGURATION].DIGITAL_ASSISTANT.FAQ_SECTIONS.mainPage.boxes,
        })
      ).to.be.true;
    });
  });
});
