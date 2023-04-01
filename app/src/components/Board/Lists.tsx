import { useRef } from "react";
import ListItem from "./ListItem";
function List() {
  const listRef = useRef(null);
  const board_lists = [
    {
      id: 1,
      title: "Todo",
      cards: [
        {
          id: 1,
          title: "Todo 1",
        },
        {
          id: 2,
          title: "Todo 2",
        },
      ],
    },
    {
      id: 2,
      title: "In progress",
      cards: [
        {
          id: 3,
          title: "progress 1",
        },
        // {
        //   title: "progress 2",
        // },
      ],
    },
    {
      id: 3,

      title: "Done",
      cards: [
        // {
        //   title: "Done 1",
        // },
        // {
        //   title: "Done 2",
        // },
      ],
    },
  ];

  return (
    <div className="flex overflow-x-auto items-start" ref={listRef}>
      {board_lists.map((list, index) => (
        <ListItem key={index} list={list} dndzone={listRef} />
      ))}
    </div>
  );
}

export default List;
