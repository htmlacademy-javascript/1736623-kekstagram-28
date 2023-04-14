const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

let templateClone = null;

const createSuccess = () => {
  templateClone = successTemplate.cloneNode(true);
  document.body.append(templateClone);
  templateClone.addEventListener('click', closeModul);
};

const createError = () => {
  templateClone = errorTemplate.cloneNode(true);
  document.body.append(templateClone);
  templateClone.addEventListener('click', closeModul);
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape' && templateClone) {
    closeModul(evt);
  }
};

function closeModul(evt) {
  evt.preventDefault();
  document.removeEventListener('keydown', onDocumentKeydown);
  templateClone.remove();
  templateClone = null;
}

const renderSuccessMessage = () => {
  createSuccess();
  document.addEventListener('keydown', onDocumentKeydown);
};

const renderErrorMessage = (resetScale, resetFilters) => {
  createError();
  resetScale();
  resetFilters();
  document.addEventListener('keydown', onDocumentKeydown);
};

export { renderSuccessMessage, renderErrorMessage };
