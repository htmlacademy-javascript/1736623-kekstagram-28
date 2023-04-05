import {isEscapeKey} from './util.js';

const bigPicturePopup = document.querySelector('.big-picture');
const likesCount = bigPicturePopup.querySelector('.likes-count');
const bigPictureImg = bigPicturePopup.querySelector('.big-picture__img');
const socialComments = bigPicturePopup.querySelector('.social__comments');
const bigPicturePopupClose = bigPicturePopup.querySelector('.big-picture__cancel');
const commentsCount = bigPicturePopup.querySelector('.comments-count');
const socialCaption = bigPicturePopup.querySelector('.social__caption');
const commentsLoader = bigPicturePopup.querySelector('.comments-loader');
const socialCommentCount = bigPicturePopup.querySelector('.social__comment-count');

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

let currentCommentsCount = 5;

const moreComments = (data) => {
  if (currentCommentsCount < data.comments.length) {
    data.comments.map((item) => {
      const comment = createTemplate(item.avatar, item.name, item.message);
      if (item.id < currentCommentsCount) {
        socialComments.insertAdjacentHTML('beforeend', comment);
      }
    });
    socialCommentCount.innerHTML = `${currentCommentsCount} из <span class="comments-count">${data.comments.length}</span> комментариев`;
    currentCommentsCount += 5;
  } else {
    data.comments.map((item) => {
      const comment = createTemplate(item.avatar, item.name, item.message);
      if (item.id < data.comments.length + 1) {
        socialComments.insertAdjacentHTML('beforeend', comment);
      }
    });
    currentCommentsCount = data.comments.length;
    socialCommentCount.innerHTML = `${currentCommentsCount} из <span class="comments-count">${data.comments.length}</span> комментариев`;
  }
};

const openModal = (data) => {
  document.querySelector('body').classList.add('modal-open');
  bigPicturePopup.classList.remove('hidden');

  bigPictureImg.querySelector('img').src = data.url;
  commentsCount.textContent = data.comments.length;
  socialCaption.textContent = data.description;

  likesCount.textContent = data.likes;

  moreComments(data);

  commentsLoader.addEventListener('click', () => {
    socialComments.querySelectorAll('li').forEach((element) => element.remove());
    moreComments(data);
  });

  document.addEventListener('keydown', onDocumentKeydown);
};

function closeModal () {
  bigPicturePopup.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  socialComments.querySelectorAll('li').forEach((element) => element.remove());
  currentCommentsCount = 5;

  document.removeEventListener('keydown', onDocumentKeydown);
}


bigPicturePopupClose.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    closeModal();
  }
});

bigPicturePopupClose.addEventListener('click', () => {
  closeModal();
});

export {openModal, onDocumentKeydown};
