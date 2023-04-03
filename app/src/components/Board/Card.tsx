import { useState } from "react";
import { createPortal } from "react-dom";
import { dateDiff } from "./../../utils/date_diff";
import Dropzone from "./Dropzone";
import CardDetails from "./CardDetails";
type Props = {
  card: {
    id?: number;
    title?: string;
    description?: string;
    expiray_date?: string;
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
        {card.expiray_date && dateDiff(card.expiray_date) <= 3 ? (
          <span className="mx-2 bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
            Expired in {dateDiff(card.expiray_date)} days
          </span>
        ) : null}
        <Dropzone dropzone="card" />
      </div>
      <CardDetails
        card={card}
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
      />
    </>
  );
}

export default Card;
