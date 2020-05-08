import axios from 'axios';

const defaultTimeout = 10000;

const callApi = (method, url, data = {}) => {
  const customerData = JSON.parse(localStorage.getItem('customerData'));

  const config = {
    method,
    url,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${customerData?.token}`,
    },
    timeout: data.timeout || defaultTimeout,
    data,
  };

  axios.interceptors.response.use(
    response => response,
    error => {
      Promise.reject(error.response);
      if (error.response.status === 401) {
        localStorage.removeItem('customerData');
        window.location.href = '/login';
      }
    },
  );

  return axios(config).then((response, error) => {
    if (error) return error;

    return response.data;
  });
};

export default callApi;
