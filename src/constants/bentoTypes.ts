export interface IBentoUser {
  avatarUrl: string;
  createdAt: string | Date;
  email: string;
  fullName: string;
  id: string;
  role: string;
}

export interface IBentoAccount {
  name: string;
  id: string;
  users?: Record<string, IBentoUser>;
}

export interface IBentoAccountSeed {
  name: string;
  id: string;
  users: string[];
}
