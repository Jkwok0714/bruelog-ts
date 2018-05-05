import { BASE_URL } from 'constants/';
import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Link, withRouter } from 'react-router-dom';

import './styles/home.css';

interface IHomeProps {
  message: string;
  user: any;
}

class HomeComponent extends React.Component<IHomeProps, {}> {
  public render () {
    const { message, user } = this.props;

    const username = user ? user.username : '';

    return (<div className='home-wrapper'>
      <h2>{ `Hello ${username}.` }</h2>
      {user.image && <img src={`${ BASE_URL }/uploads/${ user.username }/${ user.image }`} />}
      <button><Link to="settings">User Settings</Link></button>
    </div>);
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.message,
    user: state.user
  };
};

export default withRouter(connect(mapStateToProps)(HomeComponent as React.ComponentClass<any>));
