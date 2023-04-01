export function dragItem(event, element_id, dndzone) {
  let elem = document.getElementById(element_id);
  if (elem) {
    elem.style.opacity = "0.4";
  }
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", element_id);
}

export function dragOver(event, element_id, dndzone) {
  event.preventDefault();
  return false;
}

export function dragEnter(event, element_id, dndzone) {
  let elem = document.getElementById(element_id);
  if (elem) {
    elem.classList.add("dotted-border");
  }
}
export function dragLeave(event, element_id, dndzone) {
  let elem = document.getElementById(element_id);
  if (elem) {
    elem.classList.remove("dotted-border");
  }
}
export function dragEnd(event, element_id, dndzone) {
  let elem = document.getElementById(element_id);
  if (elem) {
    elem.style.opacity = "1";
  }
}
export function dropItem(event, drop_element_id, dndzone) {
  event.stopPropagation();
  let lists = dndzone.current.childNodes;
  let srcId = event.dataTransfer.getData("text/plain");
  if (srcId === drop_element_id) {
    return;
  }
  let srcElem = document.getElementById(srcId);
  let targetElem = document.getElementById(drop_element_id);
  let srcContent = srcElem.innerHTML;
  let targetContent = targetElem.innerHTML;
  // lists.forEach(function (item) {
  //   if (srcId == item.id) {
  //     srcElem = item;
  //     item.style.opacity = "1";
  //     srcContent = item.innerHTML;
  //   }
  //   if (drop_element_id == item.id) {
  //     targetElem = item;
  //     targetContent = item.innerHTML;
  //   }
  //   item.classList.remove("dotted-border");
  // });

  targetElem.innerHTML = srcContent;
  srcElem.innerHTML = targetContent;

  return false;
}
