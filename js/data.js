import {getRandomInteger, getRandomArrayElement} from './util.js';

const names = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const commentsArray = () =>{
  const userComment = [];
  for (let i = 0; i < getRandomInteger(0, 100); i++) {
    userComment[i] = {
      id: i,
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: getRandomArrayElement(comments),
      name: getRandomArrayElement(names),
    };
  }
  return userComment;
};

const photoPublication = (numberOfPublications) => {
  const photoDescription = [];
  for (let i = 0; i <= numberOfPublications; i++) {
    photoDescription[i] = {
      id: i + 1,
      url: `photos/${i}.jpg`,
      description: 'фото реки и деревни у неё',
      likes: Math.floor(Math.random() * (200 - 15 + 1)) + 15,
      comments: commentsArray(),
    };
  }
  return photoDescription;
};

export {photoPublication};
