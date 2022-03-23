import DataActions from 'actions/DataActions';
import LoginActions from 'actions/LoginActions';
import { BASE_URL } from 'constants/';
import { IUser } from 'constants/datatypes';
import { clearBento } from 'helpers/Bento';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import './styles/home.css';

interface IHomeComponentProps {
  applyDictionaryData: (data) => void;
  message: string;
  user: IUser;

  changeLoginState: (state) => void;
  changeUser: (user) => void;
}

class HomeComponent extends React.Component<IHomeComponentProps, {}> {
  public render() {
    const { user } = this.props;

    return (
      <div className="home-wrapper">
        <header className="header">
          <h1>BLTS</h1>
          <span className="subtext">
            (But hijacked to be a Bento test thing)
          </span>

          {user.image && (
            <img
              className="home-image"
              src={`${BASE_URL}/uploads/${user.id}/${user.image}`}
            />
          )}

          <img src="back.png" className="header-background" />
        </header>

        <div className="embed-wrapper">
          <bento-embed />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.message,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    applyDictionaryData: (dictionary) =>
      dispatch(DataActions.applyDictionaryData(dictionary)),
    changeLoginState: (loginState) =>
      dispatch(LoginActions.changeLoginState(loginState)),
    changeUser: (user) => dispatch(LoginActions.changeUser(user)),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomeComponent as React.ComponentClass<any>)
);
