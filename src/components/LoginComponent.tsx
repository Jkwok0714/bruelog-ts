import LoginActions from 'actions/LoginActions';
import Messages from 'constants/messages';
import APIService from 'helpers/APIService';
import Helpers from 'helpers/Helpers';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import LoginPresetComponent from './LoginPresetComponent';
import './styles/login.css';

const LOGIN_COOKIE_NAME = 'bruelogin';
export const LOGIN_PATH = 'login';

interface ILoginComponentProps {
  message: string;
  changeLoginState: (loginState: boolean) => void;
  changeMessage: (message: string) => void;
  changeUser: (user: object) => void;
}

interface ILoginComponentState {
  classicView: boolean;
  passcode: string;
  username: string;
}

class LoginComponent extends React.Component<
  ILoginComponentProps,
  ILoginComponentState
> {
  public state = {
    classicView: false,
    passcode: '',
    username: '',
  };

  public componentDidMount() {
    const cookieName = Helpers.readCookie(LOGIN_COOKIE_NAME);
    if (cookieName) {
      this.setState({ username: cookieName });
    }

    const qParams = new URLSearchParams(window.location.search);
    const classicView = qParams.has('classic');

    this.setState({ classicView });
  }

  public render() {
    const { classicView, username, passcode } = this.state;
    const { changeLoginState, changeMessage, changeUser, message } = this.props;

    if (!classicView) {
      return (
        <LoginPresetComponent
          changeLoginState={changeLoginState}
          changeMessage={changeMessage}
          changeUser={changeUser}
        />
      );
    }

    return (
      <div className="login-wrapper">
        <div className="login-message">{message}</div>
        <form className="login-form" onSubmit={this.submitLogin}>
          <input
            onChange={(e) => this.onChange('username', e)}
            placeholder="Username"
            type="text"
            name="username"
            value={username}
          />
          <input
            onChange={(e) => this.onChange('passcode', e)}
            placeholder="PIN"
            type="password"
            name="password"
            maxLength={4}
            pattern="\d*"
            value={passcode}
          />
          <button>Enter</button>
        </form>

        <button>
          <Link to="signup">Create Account</Link>
        </button>
      </div>
    );
  }

  private onChange(key: string, e: React.FormEvent<HTMLInputElement>) {
    this.setState({ [key as any]: e.currentTarget.value } as any);
  }

  private submitLogin = (e) => {
    e.preventDefault();

    const { username, passcode } = this.state;
    const { changeLoginState, changeMessage, changeUser } = this.props;

    const data = {
      passcode,
      username,
    };

    APIService.post(LOGIN_PATH, data)
      .then((res: any) => {
        // Success
        window.console.log(res.data);
        changeLoginState(true);
        changeUser(res.data);
        Helpers.setUserData(res.data);
        Helpers.setCookie('LOGIN_COOKIE_NAME', username, 720);
      })
      .catch((err) => {
        // Fail
        changeMessage(`${Messages.loginFailed}: ${err.message}`);
      });
  };
}

const mapStateToProps = (state) => {
  return {
    message: state.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLoginState: (loginState) =>
      dispatch(LoginActions.changeLoginState(loginState)),
    changeMessage: (message) => dispatch(LoginActions.changeMessage(message)),
    changeUser: (user) => dispatch(LoginActions.changeUser(user)),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginComponent as React.ComponentClass<any>)
);
