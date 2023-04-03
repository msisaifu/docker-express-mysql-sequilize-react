import History from "../../models/history";
import Cards from "../../models/cards";

function Dropzone({ dropzone }) {
  function save(payload) {
    Promise.all([
      History.create(payload),
      Cards.update(payload.card_id, { list_id: payload.move_to }),
    ])
      .then((values) => {
        console.log(values);
      })
      .catch((err) => {
        console.log("err", err);
      });
    History.create(payload)
      .then((res) => {
        console.log(res);
      })
      .catch();
  }
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
          const listElement = dropZone.closest(".list__item");
          const toColumnId = listElement.dataset.id?.split("-")[1];
          const fromColumnId = e.dataTransfer.getData("source_list");

          // onsole.log("columnId", toColumnId);
          // console.log("fromColumnId", fromColumnId);c

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

          save({
            move_to: toColumnId,
            move_from: fromColumnId,
            card_id: cardId,
          });
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
