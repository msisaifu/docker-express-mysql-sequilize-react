import { createContext } from "react";
interface AuthContextType {
  user: object;
  setUser: Function;
  onLogout: Function;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export default AuthContext;
