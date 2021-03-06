import DataActions from 'actions/DataActions';
import LoginActions from 'actions/LoginActions';
import APIService from 'helpers/APIService';
import Helpers from 'helpers/Helpers';

import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Link, Route, withRouter } from 'react-router-dom';

import BrewsComponent from './components/BrewsComponent';
import DictionaryComponent from './components/DictionaryComponent';
import HomeComponent from './components/HomeComponent';
import LogEntryComponent from './components/LogEntryComponent';
import LoginComponent from './components/LoginComponent';
import ManagementComponent from './components/ManagementComponent';
import RecipesComponent from './components/RecipesComponent';
import SignupComponent from './components/SignupComponent';
import './components/styles/global.css';

const DICTIONARY_PATH = 'dictionary';

interface IAppProps {
  applyDictionaryData: (data) => void;
  loggedIn: boolean;
  changeLoginState: (loginState: boolean) => void;
  changeMessage: (message: string) => void;
  changeUser: (user: object) => void;
}

class App extends React.Component<IAppProps, {}> {
  public componentDidMount () {
      const { changeLoginState, changeUser } = this.props;

      const loginCache = Helpers.readUserData();
      if (loginCache) {
        changeLoginState(true);
        changeUser(loginCache);
        // Logged in, get the dictionary and other required data
        APIService.get(DICTIONARY_PATH).then((data: any) => {
          this.props.applyDictionaryData(data.data);
        }).catch(err => {
          // handle error
        });
      }
  }

  public render() {
    const { loggedIn } = this.props;

    return (
      <div className="App">
        {loggedIn ? (
            <div>
              <Route exact={true} path='/' component={ HomeComponent }/>
              <Route exact={true} path='/settings' component={ ManagementComponent }/>
              <Route exact={true} path='/entry' component={ LogEntryComponent }/>
              <Route exact={true} path='/dictionary' component={ DictionaryComponent }/>
              <Route exact={true} path='/recipes' component={ RecipesComponent }/>
              <Route exact={true} path='/brews' component={ BrewsComponent }/>
              <Route exact={true} path='/brews/:token' component={ BrewsComponent }/>
            </div>
        ) : (
            <div>
              <Route exact={true} path='/' component={ LoginComponent }/>
              <Route exact={true} path='/signup' component={ SignupComponent }/>
            </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    applyDictionaryData: (data) => dispatch(DataActions.applyDictionaryData(data)),
    changeLoginState: (loginState) => dispatch(LoginActions.changeLoginState(loginState)),
    changeMessage: (message) => dispatch(LoginActions.changeMessage(message)),
    changeUser: (user) => dispatch(LoginActions.changeUser(user))
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App as React.ComponentClass<any>));
