import { IBentoAccount, IBentoUser } from 'constants/bentoTypes';
import APIService from 'helpers/APIService';

const DICTIONARY_PATH = 'dictionary';

class Helpers {
  public static readCookie(cookieName: string) {
    const nameEq = cookieName + '=';
    const ca = document.cookie.split(';');
    for (const cVal of ca) {
      let c = cVal;
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEq) === 0) {
        return c.substring(nameEq.length, c.length);
      }
    }
    return null;
  }

  public static setCookie(cookieName: string, value: string, hours?: number) {
    let expires = '';
    if (hours) {
      const date = new Date();
      date.setTime(date.getTime() + hours * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  }

  public static eraseCookie(cookieName) {
    document.cookie = cookieName + '=; Max-Age=-99999999;';
  }

  public static setUserData(data) {
    if (data.passcode) {
      delete data.passcode;
    }
    window.sessionStorage.userData = JSON.stringify(data);
  }

  public static readUserData() {
    try {
      return JSON.parse(window.sessionStorage.userData);
    } catch (e) {
      return null;
    }
  }

  public static setBentoUserData(data: {
    user: IBentoUser;
    account: IBentoAccount;
    org: string;
    appId: string;
  }) {
    window.sessionStorage.bentoUserData = JSON.stringify(data);
  }

  public static readBentoUserData() {
    try {
      return JSON.parse(window.sessionStorage.bentoUserData) as {
        user: IBentoUser;
        account: IBentoAccount;
        org: string;
        appId: string;
      };
    } catch (e) {
      return null;
    }
  }

  public static objectValues(object) {
    return Object.keys(object).map((key) => object[key]);
  }

  public static getDictionaryData(userID?: number) {
    return new Promise((resolve, reject) => {
      APIService.get(DICTIONARY_PATH)
        .then((res: any) => {
          resolve(res.data);
        })
        .catch((err) => reject(err));
    });
  }

  public static cloneWithoutKeys(object: any, keysToRemove: string[]) {
    const omit = keysToRemove.reduce(
      (acc, ele) => Object.assign(acc, { [ele]: undefined }),
      {}
    );
    return Object.assign({}, object, omit);
  }

  public static getUnits(input: string) {
    return input.replace(/[^a-z]/gi, '');
  }

  public static getNumber(input: string) {
    const regMatch = input.match(/\d+\.?\d*/);
    return regMatch ? +regMatch[0] : 0;
  }

  public static getMin(key: string, arr: object[]) {
    return arr.reduce((prev, curr) => {
      return prev[key] < curr[key] ? prev : curr;
    });
  }

  public static getStorageString(type: string, id: number) {
    return `${type}_${id}`;
  }

  public static parseStorageString(ingredientKey: string, dictionary) {
    const split = ingredientKey.split('_');
    let ingredientName = '';
    try {
      ingredientName = dictionary[split[0]][split[1]].name;
    } catch (e) {
      window.console.error('Failed finding name', split, e);
    }
    return ingredientName;
  }
}

export default Helpers;
