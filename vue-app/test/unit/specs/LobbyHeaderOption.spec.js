import { shallowMount } from '@vue/test-utils';
import sinon from 'sinon';
import LobbyHeaderOption from '../../../src/components/lobby/lobbyHeader/LobbyHeaderOption';

describe('LobbyHeaderOption Component', () => {
  let propsData;
  let mocks;
  let stubs;

  beforeEach(() => {
    propsData = {
      text: 'text',
      icon: 'icon',
      textTheme: 'black',
      faIcon: [],
    };

    stubs = {
      FontAwesomeIcon: {
        name: 'FontAwesomeIcon',
        props: ['far', 'eye'],
        template: '<svg class="font-awesome-icon"></svg>',
      },
    };

    mocks = {
      $t: sinon.stub().callsFake(() => {
        return 'ΕΛ EN';
      }),
    };
  });

  it('should render header option', () => {
    const wrapper = shallowMount(LobbyHeaderOption, { stubs, propsData, mocks });
    expect(wrapper.text()).to.be.equal('ΕΛ EN');
    expect(wrapper.find('.ssbt-header-option-item__img').exists()).to.be.true;
    wrapper.vm.$emit('click');
  });
});
