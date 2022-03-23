import Chance from 'chance';

export const chance = new Chance();

import { IBentoAccount } from './bentoTypes';
import { BUILT_DEFAULT_ACCOUNTS, nameToUser } from './dummyData';

const SESSION_KEY = 'cachedUsers';

export const getRandomNames = (count) => {
  const list: string[] = [];
  for (let i = 0; i < count; i++) {
    list.push(`${chance.first()} ${chance.last()}`);
  }
  return list;
};

class DummyDataDict {
  private accounts: Record<string, IBentoAccount> = {};

  constructor() {
    const cached = sessionStorage.getItem(SESSION_KEY);

    if (cached) {
      this.accounts = JSON.parse(cached);
      return;
    }

    // don't have anything; generate
    const defaultAccounts = BUILT_DEFAULT_ACCOUNTS;
    const randomAccountName = chance.company() as string;
    const randomAccountId = randomAccountName.replace(/[aeiou\s]/gi, '');
    const randomAccount: IBentoAccount = {
      id: randomAccountId,
      name: randomAccountName,
      users: {},
    };

    getRandomNames(5)
      .map((n) =>
        nameToUser(n, { id: randomAccountId, name: randomAccountName })
      )
      .forEach((u) => {
        randomAccount.users![u.id] = u;
      });

    defaultAccounts[randomAccount.id] = randomAccount;

    sessionStorage.setItem(SESSION_KEY, JSON.stringify(defaultAccounts));
    this.accounts = defaultAccounts;
  }

  public getAccounts() {
    return this.accounts;
  }
}

export default new DummyDataDict();
