"use strict";
const NUMBER_OF_DESCRIPTIONS = 26;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const FIRST_AVATAR = 1;
const LAST_AVATAR = 6;
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
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomValue = (array) => {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
};

const getRandomArray = (name, comment) => {
  const randomArray = [];
  for (let i = 1; i < NUMBER_OF_DESCRIPTIONS; i++) {
    randomArray.push({
      url: `photos/${i}.jpg`,
      likes: getRandomIntInclusive(MIN_LIKES, MAX_LIKES),
      description: `Лучшее фото на Земле`,
      comments: [
        {
          avatar: `img/avatar-${getRandomIntInclusive(
            FIRST_AVATAR,
            LAST_AVATAR
          )}.svg`,
          message: getRandomValue(comment),
          name: getRandomValue(name),
        },
      ],
    });
  }

  return randomArray;
};

const renderComments = (object) => {
  const commentElement = similarPictureTemplate.cloneNode(true);

  commentElement.querySelector(`.picture__img`).src = object.url;

  commentElement.querySelector(`.picture__likes`).textContent = object.likes;
  commentElement.querySelector(
    `.picture__comments`
  ).textContent = getRandomIntInclusive(0, COMMENTS.length);

  return commentElement;
};

const getSetting = () => {
  const fragment = document.createDocumentFragment();
  const arrayOfObjects = getRandomArray(NAME, COMMENTS);

  arrayOfObjects.forEach((item) => {
    fragment.appendChild(renderComments(item));
  });

  similarListElement.appendChild(fragment);
};
getSetting();

//4 модуль
const KEYS = {
  ENTER: `Enter`,
  ESCAPE: `Escape`,
};
const uploadFile = document.querySelector(`#upload-file`);
const uploadImg = document.querySelector(`.img-upload__overlay`);
const body = document.querySelector(`body`);
const cancelWindow = document.querySelector(`#upload-cancel`);

const onWindowEscPress = (evt) => {
  if (evt.key === KEYS.ESCAPE) {
    evt.preventDefault();
    closeWindow();
  }
};

const openWindow = () => {
  uploadImg.classList.remove(`hidden`);
  body.classList.add(`modal-open`);
  document.addEventListener(`keydown`, onWindowEscPress);
};

const closeWindow = () => {
  uploadImg.classList.add(`hidden`);
  uploadFile.value = "";

  body.classList.remove(`modal-open`);
  document.removeEventListener(`keydown`, onWindowEscPress);
};
uploadFile.addEventListener(`change`, function () {
  openWindow();
});
cancelWindow.addEventListener(`click`, function () {
  closeWindow();
});

const slider = document.querySelector(`.effect-level__pin`);
const img = document.querySelector(`.img-upload__preview`);
const barWidth = document.querySelector(`.effect-level__line`);

const getSaturation = (elementLeft, elementWidth) => {
  const left = elementLeft.offsetLeft;
  const width = elementWidth.clientWidth;
  const saturation = Math.round((left * 100) / width);

  return saturation;
};

const sliderHandler = () => {
  getSaturation(slider, barWidth);
};

slider.addEventListener(`mouseup`, sliderHandler);

const hastagInput = document.querySelector(`.text__hashtags`);
const regular = /^#[a-zA-Z0-9А-ЯЁа-яё]*$/;
const space = " ";
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const MAX_ARRAY_LENGTH = 5;

const inputValue = hastagInput.value;

const checkInput = (array) => {
  if (array.length > MAX_ARRAY_LENGTH) {
    hastagInput.setCustomValidity(`Максимальное количество хештегов: 5`);
    return;
  }

  for (let i = 0; i < array.length; i++) {
    let element = array[i];
    const valueLength = element.length;
    hastagInput.setCustomValidity(``);
    if (valueLength < MIN_HASHTAG_LENGTH) {
      hastagInput.setCustomValidity(
        `Ещё  ${MIN_HASHTAG_LENGTH - valueLength} симв.`
      );
      break;
    } else if (valueLength > MAX_HASHTAG_LENGTH) {
      hastagInput.setCustomValidity(
        `Удалите лишние ${valueLength - MAX_HASHTAG_LENGTH} симв.`
      );
      break;
    } else if (regular.test(element) === false) {
      hastagInput.setCustomValidity(
        `Ошибка заполнения. Можно использовать только буквы и цифры`
      );
      break;
    } else if (array.length > 1) {
      const hasDuplicates = (arr) =>
        arr.some((item) => arr.indexOf(item) !== arr.lastIndexOf(item));
      if (hasDuplicates(array) === true) {
        hastagInput.setCustomValidity(`Нельзя использовать одинаковые хештеги`);
        break;
      }
    } else {
      hastagInput.setCustomValidity(``);
    }
  }
  hastagInput.reportValidity();
};
const hastagInputHandler = () => {
  const inputArray = hastagInput.value.split(space);
  checkInput(inputArray);
};
hastagInput.addEventListener(`input`, hastagInputHandler);

hastagInput.addEventListener(`focus`, () => {
  document.removeEventListener(`keydown`, onWindowEscPress);
});
hastagInput.addEventListener(`blur`, () => {
  document.addEventListener(`keydown`, onWindowEscPress);
});
