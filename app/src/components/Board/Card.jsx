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
      }}
      onDragOver={(e) => {
        console.log("drag over");
        let id = `card-id${card.id}`;
        dragOver(e, id, dndzone);
      }}
      onDragEnter={(e) => {
        console.log("drag enter");
        let id = `card-id${card.id}`;
        dragEnter(e, id, dndzone);
      }}
      onDragLeave={(e) => {
        let id = `card-id${card.id}`;
        dragLeave(e, id, dndzone);
      }}
      onDragEnd={(e) => {
        let id = `card-id${card.id}`;
        dragEnd(e, id, dndzone);
      }}
      onDrop={(e) => {
        let id = `card-id${card.id}`;
        dropItem(e, id, dndzone);
      }}
      id={`card-id${card.id}`}
      draggable="true"
      className="bg-white rounded-md w-full"
    >
      <div className="p-2 cursor-pointer">
        <span>{card.title}</span>
      </div>
    </div>
  );
}

export default Card;
