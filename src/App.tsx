import DataActions from 'actions/DataActions';
import LoginActions from 'actions/LoginActions';
import Helpers from 'helpers/Helpers';

import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Link, Route, withRouter } from 'react-router-dom';

import './App.css';
import DictionaryComponent from './components/DictionaryComponent';
import HomeComponent from './components/HomeComponent';
import LogEntryComponent from './components/LogEntryComponent';
import LoginComponent from './components/LoginComponent';
import ManagementComponent from './components/ManagementComponent';
import SignupComponent from './components/SignupComponent';

interface IAppProps {
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
    changeDictionaryData: (data) => dispatch(DataActions.changeDictionaryData(data)),
    changeLoginState: (loginState) => dispatch(LoginActions.changeLoginState(loginState)),
    changeMessage: (message) => dispatch(LoginActions.changeMessage(message)),
    changeUser: (user) => dispatch(LoginActions.changeUser(user))
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App as React.ComponentClass<any>));
