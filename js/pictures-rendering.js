import {openModal} from './on-picture-render.js';

const templateFragment = document.querySelector('#picture').content;
const template = templateFragment.querySelector('a');

const fragment = document.createDocumentFragment();

const pictures = document.querySelector('.pictures');

const postRender = (dataArray) => {
  dataArray.forEach((element) => {
    const block = template.cloneNode(true);

    const picture = block.querySelector('.picture__img');
    const pictureInfo = block.querySelector('.picture__info');
    const pictureComments = pictureInfo.querySelector('.picture__comments');
    const pictureLikes = pictureInfo.querySelector('.picture__likes');

    picture.src = element.url;
    pictureComments.append(element.comments.length);
    pictureLikes.append(element.likes);

    block.addEventListener('click', () => {
      openModal(element);
    });

    fragment.append(block);
  });

  pictures.prepend(fragment);
  return dataArray;
};

export {postRender};
