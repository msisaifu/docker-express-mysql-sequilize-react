import { createContext } from "react";
interface BoardViewContextType {
  board?: object;
  setBoard?: Function;
}

const BoardViewContext = createContext<BoardViewContextType>(
  {} as BoardViewContextType
);

export default BoardViewContext;
