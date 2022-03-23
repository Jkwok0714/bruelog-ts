import { IBentoAccount, IBentoAccountSeed, IBentoUser } from './bentoTypes';

const dynamicDate = (() => {
  const d = new Date();
  const round3 = (x) => Math.floor(x / 3) * 3;

  round3(11);

  d.setMonth(round3(d.getMonth()));
  d.setDate(d.getDate() - 5);
  return d;
})();

export const nameToUser = (
  fullName: string,
  accountFixture: IBentoAccount
): IBentoUser => {
  const name = fullName.split(' ');
  const fnameLower = name[0].toLowerCase();

  const defaults = {
    avatarUrl: '',
    createdAt: dynamicDate,
    email: `${fnameLower}@${accountFixture.id}.fake`,
    fullName,
    id: `${fnameLower}-${accountFixture.id}`,
    role: 'user',
  };

  return defaults;
};

const DEFAULT_ACCOUNTS: IBentoAccountSeed[] = [
  {
    id: 'chds',
    name: 'Chaldea Security',
    users: [
      'Romani Archiman',
      'Mash Kyrielight',
      'Gudao Fujimaru',
      'Gudako Fujimaru',
    ],
  },
];

const buildDefaultAccounts = (): Record<string, IBentoAccount> => {
  const result: Record<string, IBentoAccount> = {};

  DEFAULT_ACCOUNTS.forEach((seed) => {
    const { id, name, users: userSeeds } = seed;

    const users = {};

    userSeeds.forEach((userSeed) => {
      const built = nameToUser(userSeed, { id, name });
      users[built.id] = built;
    });

    result[id] = {
      id,
      name,
      users,
    };
  });

  return result;
};

export const BUILT_DEFAULT_ACCOUNTS = buildDefaultAccounts();
