import { postRender } from './pictures-rendering.js';

const imgFilters = document.querySelector('.img-filters');

const Filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

let pictures = [];
let chosenFilter = Filters.DEFAULT;

const sortRandomly = () => Math.random() - 0.5;

const sortByComments = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

const appFilter = () => {
  switch (chosenFilter) {
    case Filters.RANDOM:
      return [...pictures].sort(sortRandomly).slice(0, 10);
    case Filters.DISCUSSED:
      return [...pictures].sort(sortByComments);
    default:
      return [...pictures];
  }
};

const setFilterClick = (evt) => {
  if (!evt.target.classList.contains('img-filters__button')) {
    return false;
  }
  const buttonClicked = evt.target;
  if (buttonClicked.id === chosenFilter) {
    return false;
  }

  document.querySelectorAll('.picture').forEach((item) => item.remove());

  imgFilters.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');

  chosenFilter = buttonClicked.id;
  postRender(appFilter());
};

const initialization = (data) => {
  imgFilters.classList.remove('img-filters--inactive');
  pictures = [...data];
  postRender(appFilter());
  imgFilters.addEventListener('click', (evt) => {
    debounce(setFilterClick, 500)(evt);
  });
};

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {initialization, appFilter};
