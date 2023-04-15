import {getRandomInteger, getRandomArrayElement} from './util.js';

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const commentsArray = () =>{
  const userComments = [];
  for (let i = 0; i < getRandomInteger(0, 100); i++) {
    userComments[i] = {
      id: i,
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: getRandomArrayElement(COMMENTS),
      name: getRandomArrayElement(NAMES),
    };
  }
  return userComments;
};

const fillingPublicationsArray = () => {
  const photoDescriptions = [];
  for (let i = 0; i < 25; i++) {
    photoDescriptions.push({
      id: i + 1,
      url: `photos/${i + 1}.jpg`,
      description: 'фото реки и деревни у неё',
      likes: Math.floor(Math.random() * (200 - 15 + 1)) + 15,
      comments: commentsArray(),
    });
  }
  return photoDescriptions;
};

export {fillingPublicationsArray, commentsArray};
