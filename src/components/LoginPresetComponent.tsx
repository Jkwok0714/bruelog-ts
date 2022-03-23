import * as React from 'react';
import Select from 'react-select';

import { IBentoAccount, IBentoUser } from 'constants/bentoTypes';
import DummyDataDict from 'constants/DummyDataDict';
import APIService from 'helpers/APIService';
import { initializeBento } from 'helpers/Bento';
import Helpers from 'helpers/Helpers';
import { LOGIN_PATH } from './LoginComponent';
import { REGISTER_PATH } from './SignupComponent';

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

  React.useEffect(() => {
    setUserList(userMenuOpts(selectedAccount.users!));
  }, [selectedAccount]);

  const handleAccountSelect = React.useCallback((option: IMenuOption) => {
    const acc = accounts[option.value];
    setSelectedAccount(acc);
    const firstUId = Object.keys(acc.users!)[0];
    setSelectedUser(acc.users![firstUId]);
  }, []);

  const handleUserSelect = React.useCallback((option: IMenuOption) => {
    setSelectedUser(accounts![selectedAccount.id]!.users![option.value]);
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
        <h3>Account</h3>
        <Select
          options={accountMenuOpts}
          value={accountOption}
          onChange={handleAccountSelect}
        />
        <h3>User</h3>
        <Select
          options={userList}
          value={userOption}
          onChange={handleUserSelect}
        />
        <button onClick={submitLogin}>Enter</button>
      </div>
    </div>
  );
}
