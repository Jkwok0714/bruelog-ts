class Helpers {
  public static readCookie (cookieName: string) {
    const nameEq = cookieName + "=";
    const ca = document.cookie.split(';');
    for(const cVal of ca) {
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

  public static setCookie (cookieName: string, value: string, hours?: number) {
    let expires = "";
    if (hours) {
        const date = new Date();
        date.setTime(date.getTime() + (hours*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  }

  public static eraseCookie (cookieName) {
    document.cookie = cookieName+'=; Max-Age=-99999999;';
  }

  public static setUserData (data) {
    window.sessionStorage.userData = JSON.stringify(data);
  }

  public static readUserData () {
    try {
      return JSON.parse(window.sessionStorage.userData);
    } catch (e) {
      return null;
    }
  }
}

export default Helpers;
