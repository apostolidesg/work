import apiUrls from '../../../../src/util/api-urls';
import moxios from 'moxios';
import PamApiElectron from '../../../../src/apis/pam-api-electron';

describe.skip('find-winnings-api.js', function () {
  beforeEach(function () {
    moxios.install();
  });

  afterEach(function () {
    moxios.uninstall();
  });

  it('should return a TicketStatus object when sending a request to find winnings API', function () {
    const data = {
      data: {
        status: {
          code: '101',
          description: 'Won',
          providerCode: '0',
          providerDescription: '0',
        },
        game: 'KINO',
        provider: 'ILOT_Numerics',
        amount: { gross: 22500, net: 20632, tax: 1868 },
        cost: 50,
      },
      status: 200,
      statusText: 'OK',
      headers: {
        pragma: 'no-cache',
        date: 'Fri, 14 Sep 2018 09:56:48 GMT',
        'x-content-type-options': 'nosniff',
        'x-frame-options': 'DENY',
        'content-type': 'application/json;charset=UTF-8',
        'cache-control': 'no-cache, no-store, max-age=0, must-revalidate',
        connection: 'keep-alive',
        'content-length': '189',
        'x-xss-protection': '1; mode=block',
        'x-application-context': 'application:bgt-staging,intralot-staging,staging:8080',
        expires: '0',
      },
      config: {
        transformRequest: {},
        transformResponse: {},
        timeout: 3000,
        xsrfCookieName: 'XSRF-TOKEN',
        xsrfHeaderName: 'X-XSRF-TOKEN',
        maxContentLength: -1,
        headers: {
          Accept: 'application/json, text/plain, */*',
          Authorization: 'Basic dXNlcjpmUHhVQ3BMOGtlV1B3YzM3',
        },
        method: 'get',
        baseURL: 'https://apiuat.opap.gr',
        httpsAgent: {},
        url: 'https://apiuat.opap.gr/winnings/tickets/027514650430083886080255067719116778',
        auth: { username: 'user', password: 'fPxUCpL8keWPwc37' },
      },
      request: {},
    };
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: data,
      });
    });

    PamApiElectron.findWinnings('111111111111111').then((ticketStatus) => {
      expect(ticketStatus.statusCode).to.equal('101');
      expect(ticketStatus.game).to.equal('KINO');
      expect(ticketStatus.cost).to.equal(50);
    });
  });
});
