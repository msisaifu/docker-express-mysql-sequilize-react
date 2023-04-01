import {
  dragEnd,
  dragEnter,
  dragItem,
  dragLeave,
  dragOver,
  dropItem,
} from "./../../utils/dnd";

function Card({ card, dndzone }) {
  return (
    <div
      onDragStart={(e) => {
        let id = `card-id${card.id}`;
        dragItem(e, id, dndzone);
        e.stopPropagation();
      }}
      onDragOver={(e) => {
        let id = `card-id${card.id}`;
        dragOver(e, id, dndzone);
        e.stopPropagation();
      }}
      onDragEnter={(e) => {
        let id = `card-id${card.id}`;
        dragEnter(e, id, dndzone);
        e.stopPropagation();
      }}
      onDragLeave={(e) => {
        let id = `card-id${card.id}`;
        dragLeave(e, id, dndzone);
        e.stopPropagation();
      }}
      onDragEnd={(e) => {
        let id = `card-id${card.id}`;
        dragEnd(e, id, dndzone);
        e.stopPropagation();
      }}
      onDrop={(e) => {
        let id = `card-id${card.id}`;
        console.log(id);
        dropItem(e, id, dndzone);
        e.stopPropagation();
      }}
      id={`card-id${card.id}`}
      type="card"
      draggable="true"
      className="bg-white rounded-md w-full card"
    >
      <div className="p-2 cursor-pointer">
        <span>{card.title}</span>
      </div>
    </div>
  );
}

export default Card;
