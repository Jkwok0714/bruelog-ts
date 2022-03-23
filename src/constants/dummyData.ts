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

export const ORGS = [
  { value: '24e31b38-9a4e-11ec-98eb-2358ee54c665', label: 'Selective Mutism' },
  {
    label: 'Lunchbox IO - A Bento Rival',
    value: 'ca46938a-8ad0-11ec-9abe-a790c864d627',
  },
  { value: '3cc2d90a-1a3d-11ec-88ae-3f7aae184c0f', label: 'Testinato' },
];

const DEFAULT_ACCOUNTS: IBentoAccountSeed[] = [
  {
    id: 'bentonians',
    name: 'Bentonian Vineyards',
    users: ['Ozzy Barros', 'Maya Gutierrez', 'Polly Gould', 'Bonnie Wang'],
  },
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
  {
    id: 'vlk',
    name: 'Cathedral V',
    users: [
      'Serenna Arsenath',
      'Varias Naverti',
      'Valin Scryber',
      'Ashera Relindi',
      'Armadus Broghton',
      'Linvi Askelore',
    ],
  },
  {
    id: 'insmn',
    name: 'Insomnium Music Group',
    users: [
      'Markus Vanhala',
      'Niilo Sevänen',
      'Markus Hirvonen',
      'Ville Friman',
      'Jani Liimatainen',
    ],
  },
  {
    id: 'bttbls',
    name: 'Combat Robotics Clan',
    users: ['Jake Ewert', 'Jonathon Schultz', 'Ray Billings'],
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
