import {photoPublication} from './data.js';
import {openModal} from './on-picture-render.js';

const templateFragment = document.querySelector('#picture').content;
const template = templateFragment.querySelector('a');

const fragment = document.createDocumentFragment();

const pictures = document.querySelector('.pictures');

const postRender = () => {
  const dataArray = photoPublication();

  dataArray.forEach((element) => {
    const block = template.cloneNode(true);

    const picture = block.querySelector('.picture__img');
    const pictureInfo = block.querySelector('.picture__info');
    const pictureComments = pictureInfo.querySelector('.picture__comments');
    const pictureLikes = pictureInfo.querySelector('.picture__likes');

    picture.src = element.url;
    pictureComments.append(element.comments.length);
    pictureLikes.append(element.likes);

    const pictureId = element.id - 1;

    block.addEventListener('click', () => {
      openModal(element, pictureId);
    });

    fragment.append(block);
  });

  pictures.prepend(fragment);
  return pictures;
};

export {postRender};
