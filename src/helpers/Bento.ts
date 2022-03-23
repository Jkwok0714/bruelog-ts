import { IBentoAccount, IBentoUser } from 'constants/bentoTypes';

const BENTO_EMBEDDABLE_URL = 'http://localhost:8082/index.js';
const DEFAULT_APP_ID = 'bec15fa4-6803-11eb-b454-d756c991927e';

const DEFAULT_START_DATE = new Date('2021-10-21 12:00:00Z');

export const installBento = () => {
  const script = document.createElement('script');
  script.setAttribute('src', BENTO_EMBEDDABLE_URL);
  script.setAttribute('async', '');
  script.setAttribute('type', 'module');

  document.head.appendChild(script);
};

export const initializeBento = (
  account: IBentoAccount,
  user: IBentoUser,
  appId = DEFAULT_APP_ID
) => {
  const globalScope = window as any;
  globalScope.bentoSettings = {
    account: {
      createdAt: DEFAULT_START_DATE,
      id: account.id,
      name: account.name,
    },
    accountUser: {
      createdAt: user.createdAt,
      email: user.email,
      fullName: user.fullName,
      id: user.id,
    },
    appId,
  };

  if (globalScope.Bento) {
    globalScope.Bento.reset();
  }
};

export const clearBento = () => {
  const globalScope = window as any;
  globalScope.bentoSettings = undefined;
};
