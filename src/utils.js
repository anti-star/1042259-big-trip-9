export const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`,
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const render = (container, element, place) => {
  switch (place) {
    case Position.AFTERBEGIN:
    container.insertAdjacentElement(place, element);
    break;
    case Position.BEFOREEND:
    container.insertAdjacentElement(place, element);
    break;
    case Position.AFTEREND:
    container.insertAdjacentElement(place, element);
    break;
  }
};

export const unrender = (element) => {
  if (element) {
    element.remove();
  }
};
