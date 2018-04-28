import * as React from 'react';
import { withRouter } from 'react-router-dom';

class SignupComponent extends React.Component {

  public render () {
    return <div>Sign-up</div>;
  }
};

export default withRouter(SignupComponent as React.ComponentClass<any>);
