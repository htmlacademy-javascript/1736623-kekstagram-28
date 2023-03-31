import {photoPublication} from './data.js';

const templateFragment = document.querySelector('#picture').content;
const template = templateFragment.querySelector('a');

const fragment = document.createDocumentFragment();

const postRender = () => {
  const dataArray = photoPublication();

  for (let i = 1; i <= dataArray.length; i++) {
    const block = template.cloneNode(true);

    const picture = block.querySelector('.picture__img');
    const pictureInfo = block.querySelector('.picture__info');
    const pictureComments = pictureInfo.querySelector('.picture__comments');
    const pictureLikes = pictureInfo.querySelector('.picture__likes');

    picture.src = dataArray[i].url;
    pictureComments.append(dataArray[i].comments.length);
    pictureLikes.append(dataArray[i].likes);

    fragment.append(block);
  }

  return fragment;
};

export {postRender};
