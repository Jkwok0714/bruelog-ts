import LoginActions from 'actions/LoginActions';
import { BASE_URL } from 'constants/';
import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Link, withRouter } from 'react-router-dom';

import './styles/home.css';

interface IHomeComponentProps {
  message: string;
  user: any;

  changeLoginState: (state) => void;
  changeUser: (user) => void;
}

class HomeComponent extends React.Component<IHomeComponentProps, {}> {
  public render () {
    const { message, user } = this.props;

    const username = user ? user.username : '';

    return (<div className='home-wrapper'>
      <h2>{ `Hello ${username}.` }</h2>
      {user.image && <img src={`${ BASE_URL }/uploads/${ user.id }/${ user.image }`} />}
      <button><Link to="settings">User Settings</Link></button>
      <button><Link to="dictionary">Ingredient Dictionary</Link></button>
      <button onClick={this.logout}>Logout</button>
    </div>);
  }

  private logout = () => {
    const { changeUser, changeLoginState } = this.props;
    sessionStorage.removeItem('userData');
    changeLoginState(false);
    changeUser({});
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.message,
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLoginState: (loginState) => dispatch(LoginActions.changeLoginState(loginState)),
    changeUser: (user) => dispatch(LoginActions.changeUser(user))
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeComponent as React.ComponentClass<any>));
