import * as React from 'react';
import APIService from '../helpers/APIService';

class LoginComponent extends React.Component {
  public state = {
    passcode: '',
    username: ''
  };

  public render () {
    const { username, passcode } = this.state;

    return (
      <div>
        Login Component
        <form onSubmit={this.submitLogin} />
      </div>);
  }

  private submitLogin () {
    APIService.post();
  }
}

export default LoginComponent as React.ComponentClass<any>;
