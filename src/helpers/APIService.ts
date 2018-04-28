import axios from 'axios';

import { BASE_URL } from 'constants/';

class APIService {
  public static post (path: string, data: object) {
    const composedURL = `${BASE_URL}/${path}`;
    window.console.log('POST to', composedURL);
    axios.post(composedURL, data).then(res => {
      window.console.log('Posted', res);
      // Do something
    }).catch(err => {
      window.console.log('Error posting', err.message);
      // Do something else
    });
  };

  public static get (path: string) {
    const composedURL = `${BASE_URL}/${path}`;
    axios.get(composedURL).then(res => {
      // Do something
    }).catch(err => {
      // Do something else
    });
  }
};

export default APIService;
