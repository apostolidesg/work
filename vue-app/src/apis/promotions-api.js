import axios from 'axios';
import https from 'https';
import ApiUrls from '../util/api-urls';

export default class PromotionsApi {
  constructor(config) {
    this.config = config;
    this.apiUrls = new ApiUrls('', '', '', '', this.config.PROMOTIONS_API_HOST);
    this.instance = axios.create({
      baseURL: this.apiUrls.ILOT_HOST_URL,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });
  }

  getVoucherPromoInfo({ voucherCode, callback }) {
    this.instance
      .request({
        url: this.apiUrls.DRAW_API_PROMOTIONS.replace('{serialNumber}', voucherCode),
        method: 'GET',
      })
      .then(response => {
        response.success = true;
        callback(response, voucherCode);
      })
      .catch(error => {
        throw error.response;
      });
  }
}
