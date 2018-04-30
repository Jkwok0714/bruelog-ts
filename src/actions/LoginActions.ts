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
}

export default LoginActions;
