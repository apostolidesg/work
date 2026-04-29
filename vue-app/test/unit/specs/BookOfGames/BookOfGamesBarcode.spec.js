import { shallowMount } from '@vue/test-utils';
import sinon from 'sinon';
import BookOfGamesBarcode from '../../../../src/components/lobby/bookOfGames/BookOfGamesBarcode.vue';
import QRCode from 'qrcode';

describe('In BookOfGamesBarcode component', () => {
  let mocks;
  let tStub;
  let generateQRStub;

  beforeEach(() => {
    tStub = sinon.stub();

    mocks = {
      $t: tStub,
    };

    generateQRStub = sinon.stub(QRCode, 'toDataURL');
  });

  afterEach(() => {
    tStub.resetHistory();
    generateQRStub.restore();
  });

  it('renders an image with QR code when URL is provided', async () => {
    generateQRStub.withArgs('https://example.com').resolves('qr-code-url');

    const wrapper = shallowMount(BookOfGamesBarcode, {
      mocks,
      propsData: {
        url: 'https://example.com',
        index: 0,
      },
    });

    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(generateQRStub.calledWith('https://example.com')).to.be.true;
    const imgElement = wrapper.find('#books-of-games-qrcode-0');
    const errorElement = wrapper.find('.book-of-games-qrcode__error');
    expect(imgElement.exists()).to.be.true;
    expect(errorElement.exists()).to.be.false;
    expect(imgElement.attributes('src')).to.eq('qr-code-url');
  });

  it('does not render an image when URL is not provided, instead error message appear', async () => {
    generateQRStub.withArgs('').rejects(new Error('Some error message'));

    const wrapper = shallowMount(BookOfGamesBarcode, {
      mocks,
      propsData: {
        url: '',
        index: 0,
      },
    });

    await wrapper.vm.$nextTick();

    expect(tStub.calledWith('bookOfGames.barcodeFail')).to.be.true;
    const imgElement = wrapper.find('#books-of-games-qrcode-0');
    expect(imgElement.exists()).to.be.false;
    const errorElement = wrapper.find('.book-of-games-qrcode__error');
    expect(errorElement.exists()).to.be.true;
  });
});
