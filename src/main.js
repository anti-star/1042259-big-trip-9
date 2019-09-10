import TripInfo from "./components/trip-info";
import Switch from "./components/switch-view";
import Filter from "./components/filter-events";
import SortTrip from "./components/trip-sorting";
import DateList from "./components/date-list";
import Date from "./components/date";
import Event from "./components/event";
import EventEdit from "./components/event-card";
import DateListEmpty from "./components/date-list-empty"
import {getEventArray, getFilters, getDaysTrip, formatDate} from "./data";
import {Position, render, unrender} from "./utils";

const infoContainer = document.querySelector(`.trip-info`);
const switchContainer = document.querySelector(`div.trip-main__trip-controls h2`);
const filterContainer = document.querySelector(`.trip-main__trip-controls`);
const tripContainer = document.querySelector(`.trip-events`);

const EVENT_COUNT = 4;

const eventMocks = getEventArray(EVENT_COUNT);

const filterMocks = getFilters(eventMocks);

const getTotalPrice = (events) => {
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
};

const filters = new Filter(filterMocks);
render(filterContainer, filters.getElement(), Position.BEFOREEND);

const switchView = new Switch;
render(switchContainer, switchView.getElement(), Position.AFTEREND);


if (EVENT_COUNT === 0) {
  const dateListEmpty = new DateListEmpty;
  render(tripContainer, dateListEmpty.getElement(), Position.BEFOREEND);
} else {
  const dateList = new DateList();
  render(tripContainer, dateList.getElement(), Position.BEFOREEND);

  const sortTrip = new SortTrip;
  render(tripContainer, sortTrip.getElement(), Position.AFTERBEGIN);

  const eventsDestination = eventMocks.map((event) => event.destination);
  const tripInfo = new TripInfo(eventMocks, eventsDestination);
  render(infoContainer, tripInfo.getElement(), Position.AFTERBEGIN);

  getTotalPrice(eventMocks);
};

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

