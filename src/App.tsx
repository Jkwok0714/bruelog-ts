import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Link, Route, withRouter } from 'react-router-dom';

import './App.css';
import AddNewEntryComponent from './components/AddNewEntryComponent';
import HomeComponent from './components/HomeComponent';
import LoginComponent from './components/LoginComponent';
import ManagementComponent from './components/ManagementComponent';
import SignupComponent from './components/SignupComponent';

class App extends React.Component {
  public state = {
    loggedIn: false
  };

  public render() {
    const { loggedIn } = this.state;

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

  private setLogin = (loggedIn: boolean) => {
    this.setState({ loggedIn });
  }
}

export default withRouter(App as React.ComponentClass<any>);
