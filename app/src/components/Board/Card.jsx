import Dropzone from "./Dropzone";

function Card({ card, dndzone }) {
  return (
    <>
      <div
        onDragStart={(e) => {
          e.dataTransfer.setData("text", card.id);
          e.dataTransfer.setData("card", card.id);
          e.stopPropagation();
        }}
        data-id={`card-${card.id}`}
        draggable="true"
        className="bg-white rounded-md w-full card__item"
      >
        <div className="p-2 cursor-pointer">
          <span>{card.title}</span>
        </div>
        <Dropzone position={card.id} dropzone="card" />
      </div>
    </>
  );
}

export default Card;
