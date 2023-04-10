import {isEscapeKey} from './util.js';
import {tagCheck} from './validate.js';

const onFileInput = document.querySelector('.img-upload__input');
const onCloseInput = document.querySelector('.img-upload__cancel');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

const form = document.querySelector('.img-upload__form');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const errorText = 'Ошибка валидации тегов!';

pristine.addValidator(
  textHashtags,
  tagCheck,
  errorText
);

const onSubmitUpload = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

const isInputInFocus = () => document.activeElement === textHashtags || document.activeElement === textDescription;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !isInputInFocus()) {
    evt.preventDefault();
    closeModalUpload();
  }
};

const openModalUpload = () => {
  document.querySelector('body').classList.add('modal-open');
  uploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
};

function closeModalUpload () {
  document.querySelector('body').classList.remove('modal-open');
  uploadOverlay.classList.add('hidden');
  document.querySelector('#upload-file').value = '';
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
