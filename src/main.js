import TripInfo from "./components/trip-info";
import Switch from "./components/switch-view";
import Filter from "./components/filter-events";
import SortTrip from "./components/trip-sorting";
import DateList from "./components/date-list";
import Date from "./components/date";
import Event from "./components/event";
import EventEdit from "./components/event-card";
import {getEventArray, getFilters, getDaysTrip, formatDate} from "./data";
import {Position, render, unrender} from "./utils";


const renderComp = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const infoContainer = document.querySelector(`.trip-info`);
const switchContainer = document.querySelector(`div.trip-main__trip-controls h2`);
const filterContainer = document.querySelector(`.trip-main__trip-controls`);
const tripContainer = document.querySelector(`.trip-events`);

const EVENT_COUNT = 4;

const eventMocks = getEventArray(EVENT_COUNT);

const eventsDestination = eventMocks.map((event) => event.destination);
const filterMocks = getFilters(eventMocks);

const reducer = (accumulator, currentValue) => accumulator + currentValue;
const eventsPrice = eventMocks.map((event) => {
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

const tripInfo = new TripInfo(eventMocks, eventsDestination);
render(infoContainer, tripInfo.getElement(), Position.AFTERBEGIN);

const sortTrip = new SortTrip;
render(tripContainer, sortTrip.getElement(), Position.BEFOREEND);

const filters = new Filter(filterMocks);
render(filterContainer, filters.getElement(), Position.BEFOREEND);

const switchView = new Switch;
render(switchContainer, switchView.getElement(), Position.AFTEREND);

const dateList = new DateList();
render(tripContainer, dateList.getElement(), Position.BEFOREEND);

const dateContainer = document.querySelector(`.trip-days`);

const days = getDaysTrip(eventMocks);

const renderDays = (dayItem) => {
  const day = new Date(dayItem);
  render(dateContainer, day.getElement(), Position.BEFOREEND);
};
days.forEach((day) => renderDays(day));

const daysContainer = document.querySelectorAll(`.trip-events__list`);

let dayCount = 0;

Array.from(daysContainer).map((dayItem) => {
  const date = days[dayCount];
  dayCount++;
  const getEventsOfDay = (event) => formatDate(date, `YEAR\-\MONTH\-\DAY`) === formatDate(event.time.start, `YEAR\-\MONTH\-\DAY`);

  const renderEvent = (events) => {
    const event = new Event(events);
    const eventCard = new EventEdit(events);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        dayItem.replaceChild(event.getElement(), eventCard.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    event.getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        dayItem.replaceChild(eventCard.getElement(), event.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    eventCard.getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        dayItem.replaceChild(event.getElement(), eventCard.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    eventCard.getElement()
      .querySelector(`.event__save-btn`)
      .addEventListener(`click`, () => {
        dayItem.replaceChild(event.getElement(), eventCard.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

      render(dayItem, event.getElement(), Position.BEFOREEND);
  };

  eventMocks.filter(getEventsOfDay).forEach(renderEvent);
  });
