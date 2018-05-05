// Actions
class LoginActions {
  public static changeLoginState = (login = '') => ({
    login,
    type: 'changeLogin'
  });

  public static changeMessage = (message = '') => {
    return {
      message,
      type: 'changeMessage'
    };
  }

  public static changeUser = (user = {}) => {
    return {
      type: 'changeUser',
      user
    }
  }

  public static changeUserProperty = (property = {}) => {
    return {
      property,
      type: 'changeUserProperty'
    }
  }
}

export default LoginActions;
