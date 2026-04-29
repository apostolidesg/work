import { mount } from '@vue/test-utils';
import ColorSelection from '../../../src/components/lobby/games/Powerspin/MainScreen/ColorSelection.vue';
import sinon from 'sinon';

describe('ColorSelection component', () => {
  let spy = sinon.spy();

  afterEach(() => {
    spy = sinon.spy();
  });

  const mountComponent = (propsData) => {
    const wrapper = mount(ColorSelection, { mocks: { $t: spy }, propsData });

    const btns = wrapper.findAllComponents({ name: 'RoundedBorderedButton' });

    return {
      wrapper,
      redBtn: btns.at(0),
      greenBtn: btns.at(1),
      blueBtn: btns.at(2),
    };
  };

  it('should render three buttons', () => {
    const { redBtn, greenBtn, blueBtn } = mountComponent({ colorsSelected: [] });

    expect(redBtn.exists()).to.eq(true);
    expect(greenBtn.exists()).to.eq(true);
    expect(blueBtn.exists()).to.eq(true);
  });

  it('should render three buttons with r-g-b themes', () => {
    const { redBtn, greenBtn, blueBtn } = mountComponent({ colorsSelected: [] });

    expect(redBtn.vm.$props.theme).to.eq('red');
    expect(greenBtn.vm.$props.theme).to.eq('green');
    expect(blueBtn.vm.$props.theme).to.eq('blue');
  });

  it('should render a button in active state if exists in the value list', () => {
    const { redBtn, blueBtn, greenBtn } = mountComponent({ colorsSelected: ['red', 'blue'] });

    expect(redBtn.vm.$props.active).to.be.true;
    expect(blueBtn.vm.$props.active).to.be.true;
    expect(greenBtn.vm.$props.active).to.be.false;
  });

  it('should render the btns in white text theme by default', () => {
    const { redBtn, blueBtn, greenBtn } = mountComponent({ colorsSelected: ['red', 'blue'] });

    expect(redBtn.vm.$props.textTheme).to.be.eql('white');
    expect(blueBtn.vm.$props.textTheme).to.be.eql('white');
    expect(greenBtn.vm.$props.textTheme).to.be.eql('white');
  });

  it('should render the btns in dark text theme if the component is in dark text theme', () => {
    const { redBtn, blueBtn, greenBtn } = mountComponent({ colorsSelected: ['red', 'blue'], textTheme: 'black' });

    expect(redBtn.vm.$props.textTheme).to.be.eql('black');
    expect(blueBtn.vm.$props.textTheme).to.be.eql('black');
    expect(greenBtn.vm.$props.textTheme).to.be.eql('black');
  });

  it('should call the translation fn to get the button labels', () => {
    mountComponent({ colorsSelected: [] });

    expect(spy.callCount).to.eql(3);
    expect(spy.getCall(0).args[0]).to.eql('powerspinColorCategories.red');
    expect(spy.getCall(1).args[0]).to.eql('powerspinColorCategories.green');
    expect(spy.getCall(2).args[0]).to.eql('powerspinColorCategories.blue');
  });

  it('should emit a color-clicked event when the user clicks a color bnt', async () => {
    const { wrapper, redBtn } = mountComponent({ colorsSelected: [] });

    await redBtn.find('button').trigger('click');
    expect(wrapper.emitted()['color-clicked'][0]).to.eql(['red']);
  });
});
