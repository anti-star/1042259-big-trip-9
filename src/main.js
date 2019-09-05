import {createInfoTemplate} from "./components/trip-info";
import {createSwitchTemplate} from "./components/switch-view";
import {createFilterTemplate} from "./components/filter-events";
import {createSortTripTemplate} from "./components/trip-sorting";
import {createDateListTemplate} from "./components/date-list";
import {createDateTemplate} from "./components/date";
import {createEventTemplate} from "./components/event";
import {createEventEditTemplate} from "./components/event-card";
import {getEventArray, getFilters, getDaysTrip, formatDate} from "./data";

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const infoContainer = document.querySelector(`.trip-info`);
const switchContainer = document.querySelector(`div.trip-main__trip-controls h2`);
const filterContainer = document.querySelector(`.trip-main__trip-controls`);
const tripContainer = document.querySelector(`.trip-events`);

const EVENT_COUNT = 4;
const events = getEventArray(EVENT_COUNT);
const eventsDestination = events.map((event) => event.destination);
const filters = getFilters(events);

const reducer = (accumulator, currentValue) => accumulator + currentValue;

const eventsPrice = events.map((event) => {
  const offerEvent = (event.offer).map((offer) => offer.price);
  if (offerEvent.length > 0) {
    const offerCost = offerEvent.reduce(reducer);
    return Math.round(event.price + offerCost);
  } else {
    return Math.round(event.price);
  }
});

const totalPrice = eventsPrice.reduce(reducer);

const priceTotalContainer = document.querySelector(`.trip-info__cost-value`);
priceTotalContainer.innerHTML = totalPrice;

render(infoContainer, createInfoTemplate(events, eventsDestination), 'afterbegin');

render(filterContainer, createFilterTemplate(filters),`beforeend`);
render(switchContainer, createSwitchTemplate(),`afterend`);
render(tripContainer, createSortTripTemplate(), `beforeend`);

render(tripContainer, createDateListTemplate(), `beforeend`);

const days = getDaysTrip(events);

const dateContainer = document.querySelector(`.trip-days`);
render(dateContainer, createDateTemplate(days), `beforeend`);


const daysContainer = document.querySelectorAll(`.trip-days__item.day`);

const renderEventsToDay = (allDaysTemplate) => {
  let dayCount = 0;
  Array.from(allDaysTemplate).map((dayTemplate) => {
    const dayContainer = dayTemplate.querySelector(`.trip-events__list`);
    const date = days[dayCount];
    dayCount++;
    const getEventsOfDay = events.slice(1, events.length).filter((event) => formatDate(date, `YEAR\-\MONTH\-\DAY`) === formatDate(event.time.start, `YEAR\-\MONTH\-\DAY`));
    render(dayContainer, getEventsOfDay.map(createEventTemplate).join(``), `beforeend`);
  });
};

renderEventsToDay(daysContainer);

const firstEventContainer = document.querySelector(`.trip-events__list`);
render(firstEventContainer, createEventEditTemplate(events[0]), `afterbegin`);
