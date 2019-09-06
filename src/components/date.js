import {formatDate} from "../data";

export const createDateTemplate = (array) => {
  return array.map((dayItem) => `<li class="trip-days__item  day">
  <div class="day__info">
    <span class="day__counter">${formatDate(dayItem, `DAY`)}</span>
    <time class="day__date" datetime="${formatDate(dayItem, `YEAR\-\MONTH\-\DAY`)}">${formatDate(dayItem, `NAME YEAR`)}</time>
  </div>
  <ul class="trip-events__list"></ul>
  </li>`).join(``);
};
