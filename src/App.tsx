import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';

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
          <Router>
            <Route exact={true} component={ HomeComponent }/>
            <Route path='management' component={ ManagementComponent }/>
            <Route path='add' component={ AddNewEntryComponent }/>
            <Route path='signup' component={ SignupComponent }/>
          </Router>
        ) : (
          <LoginComponent setLogin={this.setLogin} />
        )}

      </div>
    );
  }

  private setLogin = (loggedIn: boolean) => {
    this.setState({ loggedIn });
  }
}

export default App as React.ComponentClass;
