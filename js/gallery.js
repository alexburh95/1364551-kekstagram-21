"use strict";
(function () {
  const NUMBER_OF_DESCRIPTIONS = 26;
  const MIN_LIKES = 15;
  const MAX_LIKES = 200;
  const FIRST_AVATAR = 1;
  const LAST_AVATAR = 6;
  const similarListElement = document.querySelector(`.pictures`);
  const similarPictureTemplate = document
    .querySelector(`#picture`)
    .content.querySelector(`.picture`);
  const getRandomArray = (name, comment) => {
    const randomArray = [];
    for (let i = 1; i < NUMBER_OF_DESCRIPTIONS; i++) {
      randomArray.push({
        url: `photos/${i}.jpg`,
        likes: window.getRandomIntInclusive(MIN_LIKES, MAX_LIKES),
        description: `Лучшее фото на Земле`,
        comments: [
          {
            avatar: `img/avatar-${window.getRandomIntInclusive(
              FIRST_AVATAR,
              LAST_AVATAR
            )}.svg`,
            message: window.getRandomValue(comment),
            name: window.getRandomValue(name),
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
    ).textContent = window.getRandomIntInclusive(0, window.COMMENTS.length);

    return commentElement;
  };

  const getSetting = () => {
    const fragment = document.createDocumentFragment();
    const arrayOfObjects = getRandomArray(window.NAME, window.COMMENTS);

    arrayOfObjects.forEach((item) => {
      fragment.appendChild(renderComments(item));
    });

    similarListElement.appendChild(fragment);
  };
  getSetting();
})();
