import { shallowMount } from '@vue/test-utils';
import Lobby from '../../../src/components/lobby/Lobby.vue';
import Games from '../../../src/components/lobby/games/Games.vue';

describe('Lobby.vue', () => {
  it('should render the correct markup upon creation', () => {
    const wrapper = shallowMount(Lobby);
    // eslint-disable-next-line no-unused-expressions
    expect(wrapper.findComponent(Games).is(Games)).to.be.true;
  });
});
