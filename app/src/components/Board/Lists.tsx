import { useContext } from "react";
import ListItem from "./ListItem";
import BoardContext from "./../../contexts/BoardViewContext";

type Board = {
  [key: string]: any;
};
function List() {
  const { board }: Board = useContext(BoardContext);
  return (
    <div className="flex overflow-x-auto items-start">
      {board?.board_lists?.map((list: any, index: number) => (
        <ListItem key={index} list={list} />
      ))}
      <ListItem />
    </div>
  );
}

export default List;
