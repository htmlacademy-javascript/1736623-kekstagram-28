import {isEscapeKey} from './util.js';

const bigPicturePopup = document.querySelector('.big-picture');
const likesCount = bigPicturePopup.querySelector('.likes-count');
const bigPictureImg = bigPicturePopup.querySelector('.big-picture__img');
const socialComments = bigPicturePopup.querySelector('.social__comments');
const bigPicturePopupClose = bigPicturePopup.querySelector('.big-picture__cancel');
const commentsCount = bigPicturePopup.querySelector('.comments-count');
const socialCaption = bigPicturePopup.querySelector('.social__caption');


const createTemplate = (avatar, name, text) =>
  `<li class="social__comment">
    <img
      class="social__picture"
      src="${avatar}"
      alt="${name}"
      width="35" height="35">
      <p class="social__text">${text}</p>
  </li>`;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

function closeModal () {
  bigPicturePopup.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
}

const openModal = (data) => {
  document.querySelector('body').classList.add('modal-open');
  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
  bigPicturePopup.classList.remove('hidden');
  bigPictureImg.querySelector('img').src = data.url;
  commentsCount.textContent = data.comments.length;
  socialCaption.textContent = data.description;

  likesCount.textContent = data.likes;

  data.comments.map((item) => {
    const comment = createTemplate(item.avatar, item.name, item.message);
    socialComments.insertAdjacentHTML('beforeend', comment);
  });

  document.addEventListener('keydown', onDocumentKeydown);
};

bigPicturePopupClose.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    closeModal();
  }
});

bigPicturePopupClose.addEventListener('click', () => {
  closeModal();
});

export {openModal, onDocumentKeydown};
