import { createContext } from "react";
interface AuthContextType {
  user: object;
  onLogout: Function;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;
