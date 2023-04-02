import {photoPublication} from './data.js';

const templateFragment = document.querySelector('#picture').content;
const template = templateFragment.querySelector('a');


const fragment = document.createDocumentFragment();

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

    fragment.append(block);
  });

  const pictures = document.querySelector('.pictures').prepend(fragment);
  return pictures;
};

export {postRender};
