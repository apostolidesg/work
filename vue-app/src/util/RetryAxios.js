import axios from 'axios';

const retryAxiosInstance = axios.create();

retryAxiosInstance.interceptors.request.use(config => {
  config.requestLogger && config.requestLogger(config);
  return config;
});

retryAxiosInstance.interceptors.response.use(response => {
  const { config } = response;

  if (config.validationFn && !config.validationFn(response)) {
    return Promise.reject(response);
  }

  return response;
});

retryAxiosInstance.interceptors.response.use(null, error => {
  const { config } = error;

  if (!config || !config.retryCount || !config.retryCount > 1) return Promise.reject(error);

  config.retryCount -= 1;

  const backoff = new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, config.retryDelay || 1000);
  });

  return backoff.then(() => retryAxiosInstance(config));
});

retryAxiosInstance.interceptors.response.use(
  response => {
    response.config.responseLogger && response.config.responseLogger(response);

    return response;
  },
  error => {
    error.config.errorLogger && error.config.errorLogger(error);
    return Promise.reject(error);
  }
);

export default retryAxiosInstance;
