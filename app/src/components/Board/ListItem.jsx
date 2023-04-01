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
    <Card key={index} card={card} />
  ));
  return (
    <div
      onDragStart={(e) => {
        let id = `list-${list.id}`;
        dragItem(e, id);
      }}
      onDragOver={(e) => dragOver(e)}
      onDragEnter={(e) => dragEnter(e)}
      onDragLeave={(e) => dragLeave(e)}
      onDragEnd={(e) => dragEnd(e)}
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
