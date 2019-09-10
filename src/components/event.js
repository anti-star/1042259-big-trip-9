import {formatDate, getDestinationTitle, getDuration} from "../data";
import {createElement} from "../utils";

export default class Event {
  constructor(event) {
    this._type = event.type;
    this._destination = event.destination;
    this._time = event.time;
    this._price = event.price;
    this._offer = event.offer;
    this._element = null;
    this._description = event.description;
    this._favorite = event.favorite;
    this._photo = event.photo;
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
    return `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="${this._type.icon}" alt="Event type icon">
      </div>
      <h3 class="event__title">${getDestinationTitle(this._type.title) + this._destination}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${formatDate(this._time.start, `YFULL\-\MONTH\-\DAY`)}">${formatDate(this._time.start, `HOUR:MINUTE`)}</time>
          &mdash;
          <time class="event__end-time" datetime="${formatDate(this._time.end, `YFULL\-\MONTH\-\DAY`)}">${formatDate(this._time.end, `HOUR:MINUTE`)}</time>
        </p>
        <p class="event__duration">${getDuration(this._time)}</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${this._price}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">

      ${Array.from(this._offer).map((offer) => `<li class="event__offer">
          <span class="event__offer-title">${offer.title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
        </li>`).join(``)}

        </ul>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>`;
  }
}
