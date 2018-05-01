import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Link, Route, withRouter } from 'react-router-dom';

import './App.css';
import AddNewEntryComponent from './components/AddNewEntryComponent';
import HomeComponent from './components/HomeComponent';
import LoginComponent from './components/LoginComponent';
import ManagementComponent from './components/ManagementComponent';
import SignupComponent from './components/SignupComponent';

interface IAppProps {
  loggedIn: boolean;
}

class App extends React.Component<IAppProps, {}> {
  public render() {
    const { loggedIn } = this.props;

    return (
      <div className="App">
        {loggedIn ? (
            <div>
              <Route path='/' component={ HomeComponent }/>
              <Route path='/management' component={ ManagementComponent }/>
              <Route path='/add' component={ AddNewEntryComponent }/>
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

export default withRouter(connect(mapStateToProps)(App as React.ComponentClass<any>));
