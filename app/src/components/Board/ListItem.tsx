import Card from "./Card";
import AddNewList from "./AddNewList";
import Dropzone from "./Dropzone";
type Props = {
  list?: {
    id?: number;
    title?: string;
    cards?: [];
  };
};
function ListItem({ list }: Props) {
  const cards = list?.cards?.map((card, index) => (
    <Card key={index} card={card} />
  ));
  return (
    <div
      onDragStart={(e) => {
        e.dataTransfer.setData("text", `${list?.id}`);
        e.dataTransfer.setData("list", `${list?.id}`);
      }}
      data-id={`list-${list?.id}`}
      draggable="true"
      className="bg-slate-200 min-w-[280px] rounded-md mr-3 list__item"
    >
      <Dropzone dropzone="list" />
      <div className="p-2 cursor-pointer">
        <div className="flex justify-between">
          {list && list.id ? (
            <span>
              {list?.title} {list?.id}
            </span>
          ) : (
            <AddNewList />
          )}

          {list && list.id && (
            <div>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                Add
              </span>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                Edit
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 ">
          <Dropzone dropzone="card" />
          {cards?.length ? cards : null}
        </div>
      </div>
    </div>
  );
}

export default ListItem;
