import { createContext } from "react";
interface BoardsContextType {
  boards?: object;
  setBoards?: Function;
}

const BoardsContext = createContext<BoardsContextType>({} as BoardsContextType);

export default BoardsContext;
