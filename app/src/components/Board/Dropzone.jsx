function Dropzone({ position }) {
  return (
    <div
      className="card__dropzone"
      onDragOver={(e) => {
        e.preventDefault();
        let elem = e.target;
        elem.classList.add("card__dropzone--active");
      }}
      onDragLeave={(e) => {
        let elem = e.target;
        elem.classList.remove("card__dropzone--active");
      }}
      onDrop={(e) => {
        e.preventDefault();
        let dropZone = e.target;
        dropZone.classList.remove("card__dropzone--active");

        // const columnElement = dropZone.closest(".kanban__column");
        // const columnId = Number(columnElement.dataset.id);
        // const dropZonesInColumn = Array.from(
        //   columnElement.querySelectorAll(".kanban__dropzone")
        // );
        // const droppedIndex = dropZonesInColumn.indexOf(dropZone);

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
