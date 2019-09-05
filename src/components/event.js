import {formatDate} from "../data";
import {getDestinationTitle} from "../data";
import {getDuration} from "../data";

export const createEventTemplate = (event) => {
  return `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="${event.type.icon}" alt="Event type icon">
      </div>
      <h3 class="event__title">${getDestinationTitle(event) + event.destination}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${formatDate(event.time.start, `YEAR\-\MONTH\-\DAY`)}">${formatDate(event.time.start, `HOUR:MINUTE`)}</time>
          &mdash;
          <time class="event__end-time" datetime="${formatDate(event.time.end, `YEAR\-\MONTH\-\DAY`)}">${formatDate(event.time.end, `HOUR:MINUTE`)}</time>
        </p>
        <p class="event__duration">${getDuration(event.time)}</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${event.price}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">

      ${(event.offer).map((offer) => `<li class="event__offer">
          <span class="event__offer-title">${offer.title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
        </li>`).join(``)}

        </ul>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>`;
};
