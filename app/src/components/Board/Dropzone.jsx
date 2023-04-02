function Dropzone({ position, dropzone }) {
  return (
    <div
      className={`dropzone`}
      onDragOver={(e) => {
        if (e.dataTransfer.types.includes(dropzone)) {
          e.preventDefault();
          let elem = e.target;
          elem.classList.add(dropzone);
        }
      }}
      onDragLeave={(e) => {
        if (e.dataTransfer.types.includes(dropzone)) {
          let elem = e.target;
          elem.classList.remove(dropzone);
        }
      }}
      onDrop={(e) => {
        if (!e.dataTransfer.types.includes(dropzone)) {
          return;
        }
        e.preventDefault();
        let dropZone = e.target;
        dropZone.classList.remove(dropzone);

        const itemId = Number(e.dataTransfer.getData("text/plain"));
        const droppedItemElement = document.querySelector(
          `[data-id="card-${itemId}"]`
        );

        const insertAfter = dropZone.parentElement.classList.contains(
          "card__item"
        )
          ? dropZone.parentElement
          : dropZone;

        if (droppedItemElement.contains(dropZone)) {
          return;
        }

        insertAfter.after(droppedItemElement);
      }}
    ></div>
  );
}

export default Dropzone;
