import {createElement} from "../utils";

export default class Filter {
  constructor(filters) {
    this._filters = filters;
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

  _getTemplateItem(item) {
    return `<div class="trip-filters__filter">
    <input id="filter-${item.title}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${item.title}" ${item.title === `everything` ? `checked ` : ``}>
    <label class="trip-filters__filter-label" for="filter-${item.title}">${item.title}</label>
    </div>`;
  }

  getTemplate() {
    return `<form class="trip-filters" action="#" method="get">
    ${this._filters.map((item) => this._getTemplateItem(item)).join(``)}
    <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
  }
}
