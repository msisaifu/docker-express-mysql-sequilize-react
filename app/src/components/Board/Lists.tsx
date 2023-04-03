import ListItem from "./ListItem";
type Props = {
  board: any;
};
function List({ board }: Props) {
  // const board_lists = [
  //   {
  //     id: 1,
  //     title: "Todo",
  //     cards: [
  //       {
  //         id: 1,
  //         title: "Todo 1",
  //       },
  //       {
  //         id: 2,
  //         title: "Todo 2",
  //       },
  //       {
  //         id: 3,
  //         title: "Todo 3",
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     title: "In progress",
  //     cards: [
  //       {
  //         id: 4,
  //         title: "progress 1",
  //       },
  //       // {
  //       //   title: "progress 2",
  //       // },
  //     ],
  //   },
  //   {
  //     id: 3,

  //     title: "Done",
  //     cards: [
  //       // {
  //       //   title: "Done 1",
  //       // },
  //       // {
  //       //   title: "Done 2",
  //       // },
  //     ],
  //   },
  // ];

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
