import { useState } from "react";
import { createPortal } from "react-dom";
import Dropzone from "./Dropzone";
import CardDetails from "./CardDetails";
type Props = {
  card: {
    id?: number;
    title?: string;
  };
};
function Card({ card }: Props) {
  const [showDrawer, setShowDrawer] = useState(false);
  return (
    <>
      <div
        onDragStart={(e) => {
          e.dataTransfer.setData("text", `${card.id}`);
          e.dataTransfer.setData("card", `${card.id}`);
          e.stopPropagation();
        }}
        data-id={`card-${card.id}`}
        draggable="true"
        className="bg-white rounded-md w-full card__item"
      >
        <div className="p-2 cursor-pointer" onClick={() => setShowDrawer(true)}>
          <span>{card.title}</span>
        </div>
        <Dropzone dropzone="card" />
      </div>
      <CardDetails showDrawer={showDrawer} setShowDrawer={setShowDrawer} />
    </>
  );
}

export default Card;
