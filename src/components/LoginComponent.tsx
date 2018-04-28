import APIService from 'helpers/APIService';
import * as React from 'react';
import { BrowserRouter, Link, withRouter } from 'react-router-dom';
import './styles/login.css';

const LOGIN_PATH = 'login';

class LoginComponent extends React.Component {
  public state = {
    passcode: '',
    username: ''
  };

  public render () {
    const { username, passcode } = this.state;

    return (
        <div className='login-wrapper'>
          <form className='login-form' onSubmit={this.submitLogin}>
            <input
              onChange={(e) => this.onChange('username', e)}
              placeholder='Username'
              type='text'
              value={username}
            />
            <input
              onChange={(e) => this.onChange('passcode', e)}
              placeholder='PIN'
              type='password'
              maxLength={4} pattern="\d*"
              value={passcode}
            />
            <button>Enter</button>
          </form>

          <button><Link to="signup">Create Account</Link></button>
        </div>);
  }

  private onChange (key: string, e: React.FormEvent<HTMLInputElement>) {
    this.setState({ [key]: e.currentTarget.value });
  }

  private submitLogin = (e) => {
    e.preventDefault();

    const { username, passcode } = this.state;

    const data = {
      passcode,
      username
    };

    APIService.post(LOGIN_PATH, data);
  }
}

export default withRouter(LoginComponent as React.ComponentClass<any>);
