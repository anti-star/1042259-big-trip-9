import {CITIES, OFFERS, formatDate, getDestinationTitle, TypeTitle, formatTitle, isFavorite} from "../data";
import {createElement} from "../utils";

export default class EventEdit {
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
    return `<form class="event  event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="${this._type.icon}" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Transfer</legend>
            ${(TypeTitle.MOVINGS).map((name) => `<div class="event__type-item">
            <input id="event-type-${name}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${name}">
            <label class="event__type-label  event__type-label--${name}" for="event-type-${name}-1">${formatTitle(name)}</label>
          </div>`).join(``)}

          </fieldset>
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Activity</legend>
            ${(TypeTitle.ARRIVALS).map((name) => `<div class="event__type-item">
            <input id="event-type-${name}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${name}">
            <label class="event__type-label  event__type-label--${name}" for="event-type-${name}-1">${formatTitle(name)}</label>
          </div>`).join(``)}

          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${getDestinationTitle(this._type.title)}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${this._destination}" list="destination-list-1">
        <datalist id="destination-list-1">
        ${CITIES.map((item) => `<option value="${item}"></option>)`).join(``)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">
          From
        </label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDate(this._time.start, `DAY\/\MONTH\/\YEAR HOUR:MINUTE`)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">
          To
        </label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDate(this._time.end, `DAY\/\MONTH\/\YEAR HOUR:MINUTE`)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${this._price}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>

      <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite(this._favorite) ? `checked` : ``}>
      <label class="event__favorite-btn" for="event-favorite-1">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </label>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>

    <section class="event__details">

      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
        ${OFFERS.map((item) => `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-${item.name}" ${(this._offer).some((offer) => offer.name === item.name) ? `checked` : ``}>
          <label class="event__offer-label" for="event-offer-${item.name}"-1">
          <span class="event__offer-title">${item.title}"</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${item.price}</span>
          </label>
          </div>`).join(``)}
        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${this._description.join(``)}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
          ${this._photo.map((photo) => `<img class="event__photo" src="${photo}" alt="Event photo"></img>`).join(``)}
          </div>
        </div>
      </section>
    </section>
  </form>`;
  }
}
