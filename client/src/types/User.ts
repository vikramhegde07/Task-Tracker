export type User = {
  _id: string;
  username: string;
  email: string;
}

export type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (args: { newToken: string; userData: User }) => void;
  logout: () => void;
}