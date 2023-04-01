function Card({ key, card }) {
  return (
    <div draggable="true" className="bg-white rounded-md w-full">
      <div className="p-2 cursor-pointer">
        <span>{card.title}</span>
      </div>
    </div>
  );
}

export default Card;
