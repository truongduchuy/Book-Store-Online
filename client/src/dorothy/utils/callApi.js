import axios from 'axios';

const defaultTimeout = 10000;

const callApi = (method, url, data = {}) => {
  const config = {
    method,
    url,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${window.localStorage.getItem('JWT')}`,
    },
    timeout: data.timeout || defaultTimeout,
    data,
  };

  axios.interceptors.response.use(
    response => response,
    error => {
      Promise.reject(error);
      if (error.response.status === 401) window.location.href = '/login';
    },
  );

  return axios(config).then(response => {
    if (response == null) return null;

    return response.data;
  });
};

export default callApi;
