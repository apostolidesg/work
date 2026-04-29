import curry from 'ramda/es/curry';

const RETRY_DEFAULTS = {
  FIRST_REQUEST_DELAY: 0,
  RETRY_DELAY: 2000,
  MAX_RETRIES: 0,
  INFINITE_MAX_RETRIES: 'infinite',
  RETRY_ATTEMPTS: 0,
};

const interceptorDefaults = {
  axiosInstance: null,
  importedRetryConfig: {
    firstRequestDelay: RETRY_DEFAULTS.FIRST_REQUEST_DELAY,
    retryDelay: RETRY_DEFAULTS.RETRY_DELAY,
    maxRetries: RETRY_DEFAULTS.MAX_RETRIES
  },
  responseRetryCondition: null,
  defaultResponse: {}
};

const triggerDelayCallback = timeout => new Promise(resolve => setTimeout(resolve, timeout));

const shouldRetry = ({ retryAttempts, maxRetries }) => (maxRetries === RETRY_DEFAULTS.INFINITE_MAX_RETRIES) || (retryAttempts < maxRetries);

const retryRequest = async ({ axiosInstance, config }) => {
  await triggerDelayCallback(config.retryConfig.retryDelay);
  config.retryConfig.retryAttempts += 1;
  return axiosInstance(config);
};

const shouldTriggerFirstRequestDelay = async ({ firstRequestDelay, retryAttempts } = {}) =>
  !retryAttempts && firstRequestDelay && await triggerDelayCallback(firstRequestDelay);

const handleRequest = async ({ firstRequestDelay, retryDelay, maxRetries }, config) => {
  const { retryConfig = {} } = config;
  config.retryConfig = { firstRequestDelay, retryDelay, maxRetries, retryAttempts: RETRY_DEFAULTS.RETRY_ATTEMPTS, ...retryConfig };
  await shouldTriggerFirstRequestDelay(config.retryConfig);
  return config;
};

const checkResponseData = ({ responseRetryCondition, response }) => responseRetryCondition ? responseRetryCondition(response) : response;

const handleResponse = async ({ axiosInstance, responseRetryCondition, defaultResponse }, response) => {
  const { retryConfig: { retryAttempts, maxRetries } } = response.config;
  const responseData = checkResponseData({ responseRetryCondition, response });
  return responseData || (shouldRetry({ retryAttempts, maxRetries }) && await retryRequest({ axiosInstance, config: response.config })) || defaultResponse;
};

const handleError = async ({ axiosInstance, defaultResponse }, { config }) => {
  const { retryConfig: { retryAttempts, maxRetries } } = config;
  return shouldRetry({ retryAttempts, maxRetries }) ? await retryRequest({ axiosInstance, config }) : defaultResponse;
};

const setRequestInterceptor = ({ axiosInstance, importedRetryConfig }) => {
  axiosInstance.interceptors.request.use(curry(handleRequest)(importedRetryConfig));
};

const setResponseInterceptor = ({ axiosInstance, responseRetryCondition, defaultResponse }) => {
  axiosInstance.interceptors.response.use(
    curry(handleResponse)({ axiosInstance, responseRetryCondition, defaultResponse }),
    curry(handleError)({ axiosInstance, defaultResponse })
  );
};

const setInterceptors = ({ axiosInstance, importedRetryConfig, responseRetryCondition, defaultResponse }) => {
  setRequestInterceptor({ axiosInstance, importedRetryConfig });
  setResponseInterceptor({ axiosInstance, responseRetryCondition, defaultResponse });
};

const addRetryInterceptor = ({
  axiosInstance = interceptorDefaults.axiosInstance,
  importedRetryConfig: {
    firstRequestDelay = interceptorDefaults.importedRetryConfig.firstRequestDelay,
    retryDelay = interceptorDefaults.importedRetryConfig.retryDelay,
    maxRetries = interceptorDefaults.importedRetryConfig.maxRetries
  } = {},
  responseRetryCondition = interceptorDefaults.responseRetryCondition,
  defaultResponse = interceptorDefaults.defaultResponse
}) => axiosInstance && setInterceptors({ axiosInstance, importedRetryConfig: { firstRequestDelay, retryDelay, maxRetries }, responseRetryCondition, defaultResponse });

export default {
  addRetryInterceptor,
  RETRY_DEFAULTS
};
