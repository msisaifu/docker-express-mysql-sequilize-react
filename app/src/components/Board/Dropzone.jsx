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
        if (dropzone == "card") {
          e.preventDefault();
          let dropZone = e.target;
          dropZone.classList.remove(dropzone);

          const cardId = Number(e.dataTransfer.getData("text/plain"));
          const cardElement = document.querySelector(
            `[data-id="card-${cardId}"]`
          );

          const insertAfter = dropZone.parentElement.classList.contains(
            "card__item"
          )
            ? dropZone.parentElement
            : dropZone;

          if (cardElement.contains(dropZone)) {
            return;
          }

          insertAfter.after(cardElement);
        }

        if (dropzone == "list") {
          e.preventDefault();
          let dropZone = e.target;
          dropZone.classList.remove(dropzone);

          const listId = Number(e.dataTransfer.getData("text/plain"));
          const listElement = document.querySelector(
            `[data-id="list-${listId}"]`
          );

          const allLists = [...document.querySelectorAll(".list__item")];
          const targetElement = dropZone.closest(".list__item");

          if (targetElement == listElement) {
            return;
          }

          let dropIndex = allLists.indexOf(listElement);
          let targetIndex = allLists.indexOf(targetElement);

          let elem_position = "afterend";
          if (dropIndex > targetIndex) {
            elem_position = "beforebegin";
          }

          targetElement.insertAdjacentElement(elem_position, listElement);
        }
      }}
    ></div>
  );
}

export default Dropzone;
