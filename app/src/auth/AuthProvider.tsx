import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import LocalStorage from "../services/LocalStorage";
type Props = {
  children: any;
};
const AuthProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(LocalStorage.get("user"));

  const handleLogout = () => {
    LocalStorage.clear();
    setUser(null);
    navigate("/");
  };

  const value = {
    user,
    setUser,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
