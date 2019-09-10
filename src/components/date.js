import {createElement} from "../utils";
import {formatDate} from "../data";

export default class Date {
  constructor(day) {
    this._day = day;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    return `<li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${formatDate(this._day, `DAY`)}</span>
      <time class="day__date" datetime="${formatDate(this._day, `YFULL-MONTH-DAY`)}">${formatDate(this._day, `NAME YEAR`)}</time>
    </div>
    <ul class="trip-events__list">
    </ul>
    </li>`;
  }
}
