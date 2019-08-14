import {getInfoMarkup} from "./components/trip-info.js";
import {getSwitchViewMarkup} from "./components/switch-view.js";
import {getFilterEventsMarkup} from "./components/filter-events.js";
import {getSortTripMarkup} from "./components/trip-sorting.js";
import {getDateListMarkup} from "./components/date-list.js";
import {getDateMarkup} from "./components/date.js";
import {getEventMarkup} from "./components/event.js";
import {getNewEventMarkup} from "./components/new-event.js";
import {getEventCardMarkup} from "./components/event-card.js";
import {getEmptyListMarkup} from "./components/empty-list.js";

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const infoContainer = document.querySelector(`.trip-info`);
const switchContainer = document.querySelector(`div.trip-main__trip-controls h2`);
const filterContainer = document.querySelector(`.trip-main__trip-controls`);
const tripContainer = document.querySelector(`.trip-events`);

render(infoContainer, getInfoMarkup(), 'afterbegin');
render(switchContainer, getSwitchViewMarkup(),`afterend`);
render(filterContainer, getFilterEventsMarkup(),`beforeend`);
render(tripContainer, getSortTripMarkup(), `beforeend`);
render(tripContainer, getNewEventMarkup(), `beforeend`);
render(tripContainer, getDateListMarkup(), `beforeend`);

const dateContainer = document.querySelector(`.trip-days`);
render(dateContainer, getDateMarkup(), `beforeend`);

const eventContainer = document.querySelector(`.trip-events__list`);
for (let i = 0; i < 3; i++) {
  render(eventContainer, getEventMarkup(),`beforeend`);
};

render(eventContainer, getEventCardMarkup(), `beforeend`);
render(tripContainer, getEmptyListMarkup(), `beforeend`);