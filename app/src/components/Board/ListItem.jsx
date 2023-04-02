import Card from "./Card";
import Dropzone from "./Dropzone";
// import ColumnDropZone from "./ColumnDropZone";

function ListItem({ list, dndzone }) {
  const cards = list.cards.map((card, index) => (
    <Card key={index} card={card} dndzone={dndzone} />
  ));
  return (
    <div
      onDragStart={(e) => {
        e.dataTransfer.setData("text", list.id);
        e.dataTransfer.setData("list", list.id);
      }}
      data-id={`list-${list.id}`}
      draggable="true"
      className="bg-slate-200 min-w-[280px] rounded-md mr-3 list__item"
    >
      <Dropzone dropzone="list" />
      <div className="p-2 cursor-pointer">
        <span>
          {list.title} {list.id}
        </span>
        <div className="flex flex-col gap-2 ">
          <Dropzone dropzone="card" />
          {cards.length ? cards : null}
        </div>
      </div>
    </div>
  );
}

export default ListItem;
