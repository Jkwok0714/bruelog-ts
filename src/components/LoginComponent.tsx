import * as React from 'react';

class LoginComponent extends React.Component {
  public state = {
    answer: '',
    question: ''
  };

  public render () {
    return <div>Login Component</div>;
  }
}

export default LoginComponent as React.ComponentClass<any>;
