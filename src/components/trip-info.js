import {formatDate} from "../data";

export const createInfoTemplate = (events, eventsDestination) => {
  return `<div class="trip-info__main">
    <h1 class="trip-info__title">${eventsDestination.length > 3 ? (eventsDestination[0] + `&nbsp;&mdash; ... &mdash;&nbsp;` + eventsDestination[events.length - 1]) : eventsDestination.join(`&nbsp;&mdash;&nbsp;`)}</h1>

    <p class="trip-info__dates">${formatDate((events[0].time.start), `DAY NAME`)}&nbsp;&mdash;&nbsp;${formatDate((events[events.length - 1].time.end), `DAY NAME`)}</p>
  </div>`;
};
