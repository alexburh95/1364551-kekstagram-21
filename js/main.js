"use strict";
const NUMBER_OF_DESCRIPTIONS = 26;
const NAME = [
  `Иван`,
  `Хуан Себастьян`,
  `Мария`,
  `Кристоф`,
  `Виктор`,
  `Юлия`,
  `Люпита`,
  `Вашингтон`,
  `да Марья`,
  `Верон`,
  `Мирабелла`,
  `Вальц`,
  `Онопко`,
  `Топольницкая`,
  `Нионго`,
  `Ирвинг`,
  `Исаак`,
  `Роберт`,
  `Кама`,
  `Александр`,
  `Борис`,
  `Димон`,
  `Альберт`,
  `Никола`,
  `Гомер`,
];
const COMMENTS = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`,
];
const similarListElement = document.querySelector(`.pictures`);
const similarPictureTemplate = document
  .querySelector(`#picture`)
  .content.querySelector(`.picture`);
const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
};

const getRandomValue = (array) => {
  let random = Math.floor(Math.random() * array.length);
  return array[random];
};

const getRandomArray = (name, comment) => {
  const randomArray = [];
  for (let i = 1; i < NUMBER_OF_DESCRIPTIONS; i++) {
    randomArray.push({
      url: "photos/" + i + ".jpg",
      likes: getRandomIntInclusive(15, 200),
      description: "Лучшее фото на Земле",
      comments: [
        {
          avatar: `img/avatar-` + getRandomIntInclusive(1, 6) + `.svg`,
          message: getRandomValue(comment),
          name: getRandomValue(name),
        },
      ],
    });
  }

  return randomArray;
};

const renderComments = (array) => {
  const commentElement = similarPictureTemplate.cloneNode(true);

  commentElement.querySelector(`.picture__img`).src =
  array.url;

  commentElement.querySelector(`.picture__likes`).textContent =
  array.likes;
  commentElement.querySelector(`.picture__comments`).textContent =
  getRandomIntInclusive(0,COMMENTS.length);

  return commentElement;
};

const getSetting = () => {
  const fragment = document.createDocumentFragment();
  const array = getRandomArray(NAME, COMMENTS);

  array.forEach((item) => {
    fragment.appendChild(renderComments(item));

  });

  similarListElement.appendChild(fragment);
};
getSetting();

