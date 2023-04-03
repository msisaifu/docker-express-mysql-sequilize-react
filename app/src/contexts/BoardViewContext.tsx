import { createContext } from "react";
interface BoardViewContextType {
  board?: object;
  setBoard?: Function;
}

const AuthContext = createContext<BoardViewContextType>(
  {} as BoardViewContextType
);

export default AuthContext;
