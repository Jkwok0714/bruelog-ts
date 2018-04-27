import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import './App.css';
// import { Router, Route } from 'react-router';
import AddNewEntryComponent from './components/AddNewEntryComponent';
// import { browserHistory } from 'react-router';
import HomeComponent from './components/HomeComponent';
import LoginComponent from './components/LoginComponent';
import ManagementComponent from './components/ManagementComponent';

// import logo from './logo.svg';

class App extends React.Component {
  public state = {
    loggedIn: false
  };


  public render() {
    const { loggedIn } = this.state;

    return (
      <div className="App">
        {loggedIn ? (
          <BrowserRouter>
            <Route exact={true} component={ HomeComponent }/>
            <Route path='management' component={ ManagementComponent }/>
            <Route path='add' component={ AddNewEntryComponent }/>
          </BrowserRouter>
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
