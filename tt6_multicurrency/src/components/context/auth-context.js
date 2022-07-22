import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  username: null,
  login: () => {},
  logout: () => {},
}); 