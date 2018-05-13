import DataActions from 'actions/DataActions';
import LoginActions from 'actions/LoginActions';
import { BASE_URL } from 'constants/';
import APIService from 'helpers/APIService';
import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Link, withRouter } from 'react-router-dom';

import './styles/home.css';

const DICTIONARY_PATH = 'dictionary';

interface IHomeComponentProps {
  applyDictionaryData: (data) => void;
  message: string;
  user: any;

  changeLoginState: (state) => void;
  changeUser: (user) => void;
}

class HomeComponent extends React.Component<IHomeComponentProps, {}> {
  public componentWillMount () {
    // Get needed info for user that will be used across areas
    APIService.get(DICTIONARY_PATH).then((data: any) => {
      this.props.applyDictionaryData(data.data);
    }).catch(err => {
      // handle error
    });
  }

  public render () {
    const { message, user } = this.props;
    const username = user ? user.username : '';

    return (<div className='home-wrapper'>
      <h1>{ `Hello ${username}.` }</h1>
      {user.image && <img src={`${ BASE_URL }/uploads/${ user.id }/${ user.image }`} />}

      <button><Link to="settings">User Settings</Link></button>
      <button><Link to="dictionary">Ingredient Dictionary</Link></button>
      <button><Link to="recipes">Recipes</Link></button>
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
    applyDictionaryData: (dictionary) => dispatch(DataActions.applyDictionaryData(dictionary)),
    changeLoginState: (loginState) => dispatch(LoginActions.changeLoginState(loginState)),
    changeUser: (user) => dispatch(LoginActions.changeUser(user))
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeComponent as React.ComponentClass<any>));
