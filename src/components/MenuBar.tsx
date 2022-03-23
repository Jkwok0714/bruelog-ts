import * as React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import MaterialIcon from 'material-icons-react';

import LoginActions from 'actions/LoginActions';
import { IUser } from 'constants/datatypes';
import { clearBento } from 'helpers/Bento';
import Helpers from 'helpers/Helpers';

import './styles/menubar.css';

const linkNavBar = [
  { link: '', label: 'Home', icon: '' },
  { link: 'brews', label: 'Brews', icon: '' },
  { link: 'recipes', label: 'Recipes', icon: '' },
  { link: 'dictionary', label: 'Ingredient Dictionary', icon: '' },
  { link: 'settings', label: 'User Settings', icon: '' },
];

interface IMenuProps {
  user: IUser;

  changeLoginState: (state) => void;
  changeUser: (user) => void;
}

function MenuBar(props: IMenuProps) {
  const [accountName, setAccountName] = React.useState<string>('');
  const [orgName, setOrgName] = React.useState<string>('');

  React.useEffect(() => {
    const userData = Helpers.readBentoUserData();
    if (userData) {
      setAccountName(userData.account.name);
      setOrgName(userData.org);
    }
  }, []);

  const logout = React.useCallback(() => {
    const { changeUser, changeLoginState } = props;
    sessionStorage.removeItem('userData');
    changeLoginState(false);
    changeUser({});
    clearBento();
  }, []);

  return (
    <div className="menu-wrapper">
      <div className="menu-content">
        <h2>🍻</h2>
        <h4>{`Hello ${props.user.username}.`}</h4>
        <h5>{`${orgName} - ${accountName}`}</h5>
      </div>
      <nav className="menu-bar">
        {linkNavBar.map((btn) => (
          <button className="icon-and-text" key={btn.label}>
            <MaterialIcon icon={btn.icon} color="#a1a9b5" size={20} />
            <Link to={btn.link}>{btn.label}</Link>
          </button>
        ))}
      </nav>
      <button className="logout-button icon-and-text" onClick={logout}>
        <MaterialIcon icon="logout" color="#a1a9b5" size={20} />
        Logout
      </button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    message: state.message,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLoginState: (loginState) =>
      dispatch(LoginActions.changeLoginState(loginState)),
    changeUser: (user) => dispatch(LoginActions.changeUser(user)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MenuBar as React.FC)
);
