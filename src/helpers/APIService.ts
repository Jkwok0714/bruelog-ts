import axios from 'axios';

import { BASE_URL } from 'constants/';
import { IAPIResponse, ILooseObject } from 'constants/datatypes'
import store from 'helpers/createStore';

class APIService {
  public static post (path: string, data: ILooseObject) {
    return new Promise ((resolve, reject) => {
      const composedURL = `${BASE_URL}/${path}`;
      // data.id = this.getUserData();
      const config = {
        headers: {
          userID: this.getUserData()
        }
      };
      window.console.log('POST to', composedURL, data);
      axios.post(composedURL, data, config).then(res => {
        window.console.log('Posted', res);
        // Do something
        resolve(res as IAPIResponse);
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
      const config = {
        headers: {
          userID: this.getUserData()
        }
      };
      axios.get(composedURL, config).then(res => {
        // Do something
        resolve(res as IAPIResponse);
      }).catch(err => {
        // Do something else
        reject(err);
      });
    });
  }

  public static put (path: string, data: ILooseObject) {
    return new Promise ((resolve, reject) => {
      const composedURL = `${BASE_URL}/${path}`;
      const config = {
        headers: {
          userID: this.getUserData()
        }
      };
      window.console.log('PUT to', composedURL, data);
      axios.put(composedURL, data, config).then(res => {
        window.console.log('PUT', res);
        // Do something
        resolve(res as IAPIResponse);
      }).catch(err => {
        window.console.log('Error putting', err.message);
        // Do something else
        reject(err);
      });
    })
  };

  public static delete (path: string, data: ILooseObject) {
    return new Promise ((resolve, reject) => {
      const composedURL = `${BASE_URL}/${path}`;
      const config = {
        data,
        headers: {
          userID: this.getUserData()
        }
      };
      window.console.log('DELETE to', composedURL, data);
      axios.delete(composedURL, config).then(res => {
        window.console.log('DELETE', res);
        // Do something
        resolve(res as IAPIResponse);
      }).catch(err => {
        window.console.log('Error deleting', err.message);
        // Do something else
        reject(err);
      });
    })
  };

  private static getUserData () {
    try {
      const storeState = (store as any).getState();
      // window.console.log(storeState);
      return storeState.user.id;
    } catch (e) {
      window.console.log(e);
      // error
      return null;
    }
  }
};

export default APIService;
