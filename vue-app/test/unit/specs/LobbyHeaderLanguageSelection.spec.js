import { shallowMount } from '@vue/test-utils';
import LobbyHeaderLanguageSelection from '../../../src/components/lobby/lobbyHeader/LobbyHeaderLanguageSelection';

describe('LobbyHeaderLanguageSelection Component', () => {
  let propsData;
  let mocks;

  beforeEach(() => {
    propsData = {
      language: 'el',
      textTheme: 'black',
    };
  });

  it('should render greek button toggle', () => {
    const wrapper = shallowMount(LobbyHeaderLanguageSelection, { propsData, mocks });
    wrapper.setData({ language: 'gr' });
    expect(wrapper.find('#ssbt_lang_gr').exists()).to.be.true;
    expect(wrapper.contains('.ssbt-header-language-selection__link')).to.be.true;
    wrapper.vm.$emit('change-language', { language: 'el' });
  });

  it('should render english button toggle', () => {
    const wrapper = shallowMount(LobbyHeaderLanguageSelection, { propsData, mocks });
    wrapper.setData({ language: 'en' });
    expect(wrapper.find('#ssbt_lang_en').exists()).to.be.true;
    expect(wrapper.contains('.ssbt-header-language-selection__link')).to.be.true;
    wrapper.vm.$emit('change-language', { language: 'en' });
  });
});
