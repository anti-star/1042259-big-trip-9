import {formatDate} from "../data";
import {createElement} from "../utils";

export default class TripInfo {
  constructor(events, eventsDestination) {
    this._events = events;
    this._eventsDestination = eventsDestination;
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
    return `<div class="trip-info__main">
    <h1 class="trip-info__title">${this._eventsDestination.length > 3 ? (this._eventsDestination[0] + `&nbsp;&mdash; ... &mdash;&nbsp;` + this._eventsDestination[this._events.length - 1]) : this._eventsDestination.join(`&nbsp;&mdash;&nbsp;`)}</h1>

    <p class="trip-info__dates">${formatDate((this._events[0].time.start), `DAY NAME`)}&nbsp;&mdash;&nbsp;${formatDate((this._events[this._events.length - 1].time.end), `DAY NAME`)}</p>
  </div>`;
  }
}

