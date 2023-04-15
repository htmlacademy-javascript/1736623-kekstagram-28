import {isEscapeKey} from './util.js';
import {tagCheck} from './validate.js';
import {resetFilters} from './photo-effect-sliders.js';
import {setDefaulValue} from './scale.js';
import {sendData} from './api.js';
import {renderSuccessMessage, renderErrorMessage} from './message.js';
import { getUserPicture } from './show-user-picture.js';

const onFileInput = document.querySelector('.img-upload__input');
const onCloseInput = document.querySelector('.img-upload__cancel');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const imgUploadSubmit = document.querySelector('.img-upload__submit');

const form = document.querySelector('.img-upload__form');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const TEXT_ERROR = 'Ошибка валидации тегов!';

pristine.addValidator(
  textHashtags,
  tagCheck,
  TEXT_ERROR
);

const blockSubmitButton = () => {
  imgUploadSubmit.disabled = true;
  imgUploadSubmit.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  imgUploadSubmit.disabled = false;
  imgUploadSubmit.textContent = 'Опубликовать';
};

const onSubmitUpload = (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    blockSubmitButton();
    sendData(() => {
      renderSuccessMessage(resetFilters(), setDefaulValue());
      unblockSubmitButton();
    }, () => {
      renderErrorMessage();
      unblockSubmitButton();
    }, new FormData(evt.target));
  }
};

const isInputInFocus = () => document.activeElement === textHashtags || document.activeElement === textDescription;
const isMassageShow = () => document.querySelector('.success') || document.querySelector('.error');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !isInputInFocus() && !isMassageShow()) {
    evt.preventDefault();
    closeModalUpload();
  }
};

const openModalUpload = () => {
  document.querySelector('body').classList.add('modal-open');
  uploadOverlay.classList.remove('hidden');
  getUserPicture();
  document.addEventListener('keydown', onDocumentKeydown);
};

function closeModalUpload () {
  document.querySelector('body').classList.remove('modal-open');
  uploadOverlay.classList.add('hidden');
  document.querySelector('#upload-file').value = '';
  setDefaulValue();
  resetFilters();
  document.removeEventListener('keydown', onDocumentKeydown);
}

onCloseInput.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    closeModalUpload();
  }
});

onCloseInput.addEventListener('click', () => {
  closeModalUpload();
});

form.addEventListener('submit', onSubmitUpload);

onFileInput.addEventListener('change', openModalUpload);
