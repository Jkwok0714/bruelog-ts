import DataActions from 'actions/DataActions';
import LoginActions from 'actions/LoginActions';
import { BASE_URL } from 'constants/';
import APIService from 'helpers/APIService';
import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Link, withRouter } from 'react-router-dom';

import './styles/home.css';

interface IHomeComponentProps {
  applyDictionaryData: (data) => void;
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
      <h1>{ `Hello ${username}.` }</h1>
      {user.image && <img className='home-image' src={`${ BASE_URL }/uploads/${ user.id }/${ user.image }`} />}

      <div className='menu-bar'>
        <button><Link to="brews">Brews</Link></button>
        <button><Link to="recipes">Recipes</Link></button>
        <button><Link to="dictionary">Ingredient Dictionary</Link></button>
        <button><Link to="settings">User Settings</Link></button>
        <button onClick={this.logout}>Logout</button>
      </div>
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
    applyDictionaryData: (dictionary) => dispatch(DataActions.applyDictionaryData(dictionary)),
    changeLoginState: (loginState) => dispatch(LoginActions.changeLoginState(loginState)),
    changeUser: (user) => dispatch(LoginActions.changeUser(user))
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeComponent as React.ComponentClass<any>));
