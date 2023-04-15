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

let commentCounter = 5;

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

const onMoreComments = (data) => {

  socialComments.querySelectorAll('li').forEach((element) => element.remove());
  if (commentCounter < data.comments.length) {
    data.comments.map((item, index) => {
      const comment = createTemplate(item.avatar, item.name, item.message);
      if (index < commentCounter) {
        socialComments.insertAdjacentHTML('beforeend', comment);
      }
    });
    socialCommentCount.innerHTML = `<span class="comments-count-current">${commentCounter}</span> из <span class="comments-count">${data.comments.length}</span> комментариев`;
    commentCounter += 5;
  }else {
    data.comments.map((item) => {
      const comment = createTemplate(item.avatar, item.name, item.message);
      socialComments.insertAdjacentHTML('beforeend', comment);
    });
    socialCommentCount.innerHTML = `${data.comments.length} из <span class="comments-count">${data.comments.length}</span> комментариев`;
    commentsLoader.classList.add('hidden');
  }
};

let dataElement;

const commentLoader = () => {
  onMoreComments(dataElement);
};

const openModal = (data) => {
  dataElement = data;
  commentCounter = 5;
  document.querySelector('body').classList.add('modal-open');
  bigPicturePopup.classList.remove('hidden');

  bigPictureImg.querySelector('img').src = data.url;
  commentsCount.textContent = data.comments.length;
  socialCaption.textContent = data.description;

  likesCount.textContent = data.likes;

  onMoreComments(data);
  commentsLoader.addEventListener('click', commentLoader);

  document.addEventListener('keydown', onDocumentKeydown);
};

function closeModal () {
  commentsLoader.classList.remove('hidden');
  bigPicturePopup.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  socialComments.querySelectorAll('li').forEach((element) => element.remove());

  commentCounter = 5;

  commentsLoader.removeEventListener('click', commentLoader);

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
