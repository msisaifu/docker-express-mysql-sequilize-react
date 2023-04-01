export function dragItem(event, element_id, dndzone) {
  const element = event.target;
  element.style.opacity = "0.4";
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", element_id);
}

export function dragOver(event, element_id, dndzone) {
  event.preventDefault();
  return false;
}

export function dragEnter(event, element_id, dndzone) {
  const element = event.target;
  // element.classList.add("dotted-border");
}
export function dragLeave(event, element_id, dndzone) {
  const element = event.target;
}
export function dragEnd(event, element_id, dndzone) {
  const element = event.target;
  element.style.opacity = "1";
}
export function dropItem(event, drop_element_id, dndzone) {
  event.stopPropagation();
  let lists = dndzone.current.childNodes;
  let srcId = event.dataTransfer.getData("text/plain");
  let srcElem, targetElem, srcContent, targetContent;
  lists.forEach(function (item) {
    if (srcId == item.id) {
      srcElem = item;
      srcContent = item.innerHTML;
    }
    if (drop_element_id == item.id) {
      targetElem = item;
      targetContent = item.innerHTML;
    }
  });

  targetElem.innerHTML = srcContent;
  srcElem.innerHTML = targetContent;

  return false;
}
