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
}

export default LoginActions;
