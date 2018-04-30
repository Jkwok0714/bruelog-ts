import axios from 'axios';

import { BASE_URL } from 'constants/';

class APIService {
  public static post (path: string, data: object) {
    return new Promise ((resolve, reject) => {
      const composedURL = `${BASE_URL}/${path}`;
      window.console.log('POST to', composedURL);
      axios.post(composedURL, data).then(res => {
        window.console.log('Posted', res);
        // Do something
        resolve(res);
      }).catch(err => {
        window.console.log('Error posting', err.message);
        // Do something else
        reject(err);
      });
    })
  };

  public static get (path: string) {
    return new Promise((resolve, reject) => {
      const composedURL = `${BASE_URL}/${path}`;
      axios.get(composedURL).then(res => {
        // Do something
        resolve(res);
      }).catch(err => {
        // Do something else
        reject(err);
      });
    });
  }
};

export default APIService;
