import LoginActions from 'actions/LoginActions';
import Messages from 'constants/messages';
import APIService from 'helpers/APIService';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

const REGISTER_PATH = 'users';

interface ISignupComponentProps {
  changeMessage: (message: string) => void;
  message: string;

  registered: any;
  history: any;
}

interface ISignupComponentState {
  confirm: string;
  error: string;
  passcode: string;
  username: string;
}

class SignupComponent extends React.Component<ISignupComponentProps, ISignupComponentState> {
  public state = {
    confirm: '',
    error: '',
    passcode: '',
    username: ''
  };

  public render () {
    const { confirm, passcode, username, error } = this.state;

    return (<div>
      <div className='login-message'>{ error }</div>
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
    this.setState({ [key as any]: e.currentTarget.value });
    // this.props.history.push('/fap');
  }

  private submitLogin = (e) => {
    e.preventDefault();

    const { confirm, username, passcode } = this.state;
    const { changeMessage } = this.props;

    if (confirm !== passcode) {
      this.setState({ error: Messages.passwordValidateError });
    }

    const data = {
      passcode,
      username
    };

    // this.props.changeMessage('Hello');

    APIService.post(REGISTER_PATH, data).then((res: any) => {
      if (res.status === 200) {
        // Success
        changeMessage(Messages.userCreated);
        this.props.history.push('/');
      }
    }).catch(err => {
      this.setState({ error: Messages.submitError });
    });
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
