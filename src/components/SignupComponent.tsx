import LoginActions from 'actions/LoginActions';
import APIService from 'helpers/APIService';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

const REGISTER_PATH = 'users';

interface ISignupComponentProps {
  changeMessage: (message: string) => void;
  message: string;

  registered: any;
}

class SignupComponent extends React.Component<ISignupComponentProps, any> {
  public state = {
    confirm: '',
    passcode: '',
    username: ''
  };

  public render () {
    const { confirm, passcode, username } = this.state;

    return (<div>
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
        <input
          onChange={(e) => this.onChange('confirm', e)}
          placeholder='PIN'
          type='password'
          maxLength={4} pattern="\d*"
          value={confirm}
        />
        { this.props.message }
        <button>Enter</button>
      </form>
      <button><Link to="">Back</Link></button>
    </div>);
  };

  private onChange (key: string, e: React.FormEvent<HTMLInputElement>) {
    window.console.log(this.props.message);
    this.setState({ [key]: e.currentTarget.value });
  }

  private submitLogin = (e) => {
    e.preventDefault();

    const { confirm, username, passcode } = this.state;

    if (confirm !== passcode) {
      window.alert('Passcodes don\'t match');
    }

    const data = {
      passcode,
      username
    };

    this.props.changeMessage('Hello');

    APIService.post(REGISTER_PATH, data);
  }
};

const mapStateToProps = (state) => {
  return {
    message: state.message
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeMessage: (message) => dispatch(LoginActions.changeMessage(message))
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignupComponent as React.ComponentClass<any>));
