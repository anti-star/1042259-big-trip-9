export const createFilterTemplate = (array) => {
  return `<form class="trip-filters" action="#" method="get">
  ${array.map((item) => `<div class="trip-filters__filter">
  <input id="filter-${item.title}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${item.title}" ${item.title === `everything` ? `checked ` : ``}>
  <label class="trip-filters__filter-label" for="filter-${item.title}">${item.title}</label>
  </div>`).join(``)}

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
};
