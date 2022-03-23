import * as React from 'react';
import Select from 'react-select';

import { IBentoAccount, IBentoUser } from 'constants/bentoTypes';
import { ORGS } from 'constants/dummyData';
import DummyDataDict from 'constants/DummyDataDict';
import APIService from 'helpers/APIService';
import { initializeBento } from 'helpers/Bento';
import Helpers from 'helpers/Helpers';
import { LOGIN_PATH } from './LoginComponent';
import { REGISTER_PATH } from './SignupComponent';
import './styles/login.css';

interface IMenuOption {
  value: string;
  label: string;
}

interface ILoginPresetComponentProps {
  changeLoginState: (loginState: boolean) => void;
  changeMessage: (message: string) => void;
  changeUser: (user: object) => void;
}

const accounts = DummyDataDict.getAccounts();

const accountMenuOpts = Object.keys(accounts).map((id) => ({
  label: accounts[id].name,
  value: id,
}));

const userMenuOpts = (users: Record<string, IBentoUser>) =>
  Object.keys(users).map((id) => ({
    label: users[id].fullName,
    value: id,
  }));

export default function LoginPresetComponent({
  changeLoginState,
  changeUser,
}: ILoginPresetComponentProps) {
  const [selectedAccount, setSelectedAccount] = React.useState<IBentoAccount>(
    accounts[accountMenuOpts[0].value]
  );
  const [userList, setUserList] = React.useState<IMenuOption[]>(
    userMenuOpts(selectedAccount.users!)
  );
  const [selectedUser, setSelectedUser] = React.useState<IBentoUser>(
    selectedAccount.users![0]
  );
  const [selectedOrg, setSelectedOrg] = React.useState<IMenuOption>(ORGS[0]);

  React.useEffect(() => {
    setUserList(userMenuOpts(selectedAccount.users!));
  }, [selectedAccount]);

  const handleAccountSelect = React.useCallback((option: IMenuOption) => {
    const acc = accounts[option.value];
    setSelectedAccount(acc);
    const firstUId = Object.keys(acc.users!)[0];
    setSelectedUser(acc.users![firstUId]);
  }, []);

  const handleUserSelect = React.useCallback(
    (option: IMenuOption) => {
      const user = accounts![selectedAccount.id]!.users![option.value];
      setSelectedUser(user);
    },
    [selectedAccount]
  );

  const handleOrgSelect = React.useCallback((option: IMenuOption) => {
    setSelectedOrg(option);
  }, []);

  const userOption = React.useMemo(
    () => userList.find((ul) => (ul || {}).value === (selectedUser || {}).id),
    [selectedUser, selectedAccount]
  );

  const accountOption = React.useMemo(
    () =>
      accountMenuOpts.find(
        (al) => (al || {}).value === (selectedAccount || {}).id
      ),
    [selectedAccount]
  );

  const submitLogin = React.useCallback(
    async (e) => {
      e.preventDefault();

      const data = {
        passcode: '0000',
        username: selectedUser.fullName,
      };

      const tryLogin = async () => {
        const res = (await APIService.post(LOGIN_PATH, data)) as any;
        changeLoginState(true);
        changeUser(res.data);
        Helpers.setUserData(res.data);
        Helpers.setBentoUserData({
          account: selectedAccount,
          org: selectedOrg.label,
          user: selectedUser,
        });
        Helpers.setCookie('LOGIN_COOKIE_NAME', selectedUser.fullName, 720);

        initializeBento(selectedAccount, selectedUser);
      };

      tryLogin().catch((err) => {
        // register first
        APIService.post(REGISTER_PATH, data).then(() => tryLogin());
      });
    },
    [selectedAccount, selectedUser]
  );

  return (
    <div className="login-wrapper">
      <div className="selection-box">
        <h1>🍻 Brüe Logs TS</h1>
        <h3>Organization</h3>
        <div className="dark-text">
          <Select
            options={ORGS}
            value={selectedOrg}
            onChange={handleOrgSelect}
            className="select"
          />
        </div>
        <h3>Account</h3>
        <div className="dark-text">
          <Select
            options={accountMenuOpts}
            value={accountOption}
            onChange={handleAccountSelect}
            className="select"
          />
        </div>
        <h3>User</h3>
        <div className="dark-text">
          <Select
            options={userList}
            value={userOption}
            onChange={handleUserSelect}
            className="select"
          />
        </div>
        <button
          className="main-button"
          onClick={submitLogin}
          disabled={!selectedOrg || !selectedUser || !selectedAccount}
        >
          Enter
        </button>
      </div>

      <div className="video-background">
        <video playsInline autoPlay muted loop>
          <source src="NewMod.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
