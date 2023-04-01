import {
  dragEnd,
  dragEnter,
  dragItem,
  dragLeave,
  dragOver,
  dropItem,
} from "./../../utils/dnd";
import Card from "./Card";

function ListItem({ list, dndzone }) {
  const cards = list.cards.map((card, index) => (
    <Card key={index} card={card} dndzone={dndzone} />
  ));
  return (
    <div
      onDragStart={(e) => {
        let id = `list-${list.id}`;
        dragItem(e, id, dndzone);
      }}
      onDragOver={(e) => {
        console.log("drag over");
        let id = `list-${list.id}`;
        dragOver(e, id, dndzone);
      }}
      onDragEnter={(e) => {
        console.log("drag enter");
        let id = `list-${list.id}`;
        dragEnter(e, id, dndzone);
      }}
      onDragLeave={(e) => {
        let id = `list-${list.id}`;
        dragLeave(e, id, dndzone);
      }}
      onDragEnd={(e) => {
        let id = `list-${list.id}`;
        dragEnd(e, id, dndzone);
      }}
      onDrop={(e) => {
        let id = `list-${list.id}`;
        dropItem(e, id, dndzone);
      }}
      id={`list-${list.id}`}
      draggable="true"
      className="bg-slate-200 min-w-[280px] rounded-md mr-3"
    >
      <div className="p-2 cursor-pointer">
        <span>
          {list.title} {list.id}
        </span>
        {cards.length ? (
          <div className="mt-2 flex flex-col gap-2">{cards}</div>
        ) : null}
      </div>
    </div>
  );
}

export default ListItem;
