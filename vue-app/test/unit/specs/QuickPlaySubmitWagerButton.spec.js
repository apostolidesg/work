import { shallowMount, createLocalVue } from '@vue/test-utils';
import QuickPlaySubmitWagerButton from '@/components/common/Quickbets/QuickPlaySubmitWagerButton.vue';
import sinon from 'sinon';
import gtag from '@/util/gtag';
import gtmEvents from '@/constants/gtmEvents';
import Constants from '@/util/Constants';

const localVue = createLocalVue();

describe('QuickPlaySubmitWagerButton', () => {
  let sandbox;

  const createWrapper = (propsData = {}) => {
    return shallowMount(QuickPlaySubmitWagerButton, {
      localVue,
      stubs: {
        // Shallow render 3rd-party components safely
        'b-tooltip': {
          name: 'BTooltip',
          props: ['target', 'show', 'placement'],
          template: '<div class="b-tooltip-stub"><slot /></div>',
        },
        'font-awesome-icon': {
          name: 'FontAwesomeIcon',
          template: '<i class="fa-stub" />',
        },
        Loading: {
          name: 'Loading',
          props: ['active', 'canCancel', 'isFullPage', 'opacity', 'color'],
          template: `<div class="loading-stub" :data-active="active"></div>`,
        },
      },
      mocks: {
        $t: (k) => k,
      },
      propsData: {
        betSlipValue: 10,
        isSubmitting: false,
        submitWager: sinon.stub(),
        theme: Constants.THEMES.KINO,
        error: '',
        ...propsData,
      },
    });
  };

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    sandbox.stub(gtag, 'sendEvent').returns();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('renders the amount and payment text when not submitting', () => {
    const wrapper = createWrapper();
    const span = wrapper.find('span');
    expect(span.exists()).to.be.true;
    expect(span.text()).to.include('€10');
    expect(span.text()).to.include('payment');
  });

  it('does not render the amount span while submitting and shows loading stub active', () => {
    const wrapper = createWrapper({ isSubmitting: true });
    expect(wrapper.find('span').exists()).to.be.false;
    const loading = wrapper.find('.loading-stub');
    expect(loading.exists()).to.be.true;
    expect(loading.attributes('data-active')).to.equal('true');
  });

  it('sets spinnerColor on created', () => {
    const wrapper = createWrapper();
    expect(wrapper.vm.spinnerColor).to.equal('#FF9001');
  });

  it('computes disabled=true when isSubmitting', () => {
    const wrapper = createWrapper({ isSubmitting: true });
    expect(wrapper.vm.disabled).to.be.true;
    const button = wrapper.find('button');
    expect(button.attributes('disabled')).to.equal('disabled');
    expect(button.classes()).to.include('quick-play-submit-wager__button--disabled');
  });

  it('computes disabled=true when error exists', () => {
    const wrapper = createWrapper({ error: 'some.error.key' });
    expect(!!wrapper.vm.disabled).to.be.true;
    const button = wrapper.find('button');
    expect(button.attributes('disabled')).to.equal('disabled');
  });

  it('renders the info bubble only when there is an error and toggles tooltip visibility on click', async () => {
    const wrapper = createWrapper({ error: 'some.error.key' });
    const info = wrapper.find('.quick-play-submit-wager__info');
    expect(info.exists()).to.be.true;
    expect(wrapper.vm.showInfo).to.be.false;
    await info.trigger('click');
    expect(wrapper.vm.showInfo).to.be.true;
    await info.trigger('click');
    expect(wrapper.vm.showInfo).to.be.false;
  });

  it('does not render the info bubble when there is no error', () => {
    const wrapper = createWrapper({ error: '' });
    expect(wrapper.find('.quick-play-submit-wager__info').exists()).to.be.false;
  });

  it('calls submitWager and sends KINO tracking when enabled', async () => {
    const submitWager = sinon.stub();
    const wrapper = createWrapper({
      submitWager,
      theme: Constants.THEMES.KINO,
      betSlipValue: 15,
      isSubmitting: false,
      error: '',
    });

    await wrapper.find('button').trigger('click');

    expect(submitWager.calledOnce).to.be.true;
    expect(
      gtag.sendEvent.calledWith(gtmEvents.SSBT_LOTTERY_KINO_QUICKPLAY_SUBMIT, {
        betslip_value: 15,
      })
    ).to.be.true;
  });

  it('calls submitWager and sends POWERSPIN tracking when enabled', async () => {
    const submitWager = sinon.stub();
    const wrapper = createWrapper({
      submitWager,
      theme: Constants.THEMES.POWERSPIN,
      betSlipValue: 20,
      isSubmitting: false,
      error: '',
    });

    await wrapper.find('button').trigger('click');

    expect(submitWager.calledOnce).to.be.true;
    expect(
      gtag.sendEvent.calledWith(gtmEvents.SSBT_LOTTERY_POWERSPIN_QUICKPLAY_SUBMIT, {
        betslip_value: 20,
      })
    ).to.be.true;
  });

  it('does not call submitWager or send events when disabled due to submitting', async () => {
    const submitWager = sinon.stub();
    const wrapper = createWrapper({
      submitWager,
      isSubmitting: true,
      error: '',
      betSlipValue: 99,
      theme: Constants.THEMES.KINO,
    });

    await wrapper.find('button').trigger('click');

    expect(submitWager.called).to.be.false;
    expect(gtag.sendEvent.called).to.be.false;
  });

  it('does not call submitWager or send events when disabled due to error', async () => {
    const submitWager = sinon.stub();
    const wrapper = createWrapper({
      submitWager,
      error: 'validation.error',
      isSubmitting: false,
      betSlipValue: 33,
      theme: Constants.THEMES.POWERSPIN,
    });

    await wrapper.find('button').trigger('click');

    expect(submitWager.called).to.be.false;
    expect(gtag.sendEvent.called).to.be.false;
  });

  it('toggleInfo method flips showInfo state', () => {
    const wrapper = createWrapper({ error: 'has.error' });
    const initial = wrapper.vm.showInfo;
    wrapper.vm.toggleInfo();
    expect(wrapper.vm.showInfo).to.equal(!initial);
    wrapper.vm.toggleInfo();
    expect(wrapper.vm.showInfo).to.equal(initial);
  });
});
