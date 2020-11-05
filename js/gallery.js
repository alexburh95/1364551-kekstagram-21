'use strict';
(function () {
  const bigPicture = document.querySelector(`.big-picture`);
  const RANDOM_NUMBER = 10;
  const galleryFilter = document.querySelector(`.img-filters`);
  const similarListElement = document.querySelector(`.pictures`);
  const similarPictureTemplate = document
        .querySelector(`#picture`)
        .content.querySelector(`.picture`);

  const renderComments = (object) => {
    const commentElement = similarPictureTemplate.cloneNode(true);
    commentElement.querySelector(`.picture__img`).src = object.url;

    commentElement.querySelector(`.picture__likes`).textContent =
            object.likes;
    commentElement.querySelector(`.picture__comments`).textContent =
            object.comments.length;

    return commentElement;
  };

  // 3.2

  const makeBigPicture = (object) => {
    bigPicture.querySelector(`.big-picture__img img`).src = object.url;
    bigPicture.querySelector(`.likes-count`).textContent = object.likes;
    bigPicture.querySelector(`.comments-count`).textContent =
            object.comments.length;
    bigPicture.querySelector(`.social__caption`).textContent =
            object.description;

    const comments = object.comments;

    const commentsContainer = bigPicture.getElementsByClassName(`social__comments`)[0];
    commentsContainer.innerHTML = ``;
    comments.forEach((comment) => {
      const li = document.createElement(`li`);
      li.classList.add(`social__comment`);
      const avatar = document.createElement(`img`);
      avatar.classList.add(`social__picture`);
      avatar.src = comment.avatar;
      avatar.alt = comment.name;
      avatar.width = 35;
      avatar.height = 35;
      const commentText = document.createElement(`p`);
      commentText.classList.add(`social__text`);
      commentText.textContent = comment.message;
      li.appendChild(avatar);
      li.appendChild(commentText);
      commentsContainer.appendChild(li);
    });

    bigPicture.querySelector(`.social__comment-count`).classList.add(`hidden`);
    bigPicture.querySelector(`.comments-loader`).classList.add(`hidden`);
    document.body.classList.add(`modal-open`);


  };
  bigPicture.classList.remove(`hidden`);

  let sortedArray = [];
  const random = document.querySelector(`#filter-random`);
  const defaults = document.querySelector(`#filter-default`);
  const mostPopular = document.querySelector(`#filter-discussed`);

  const fragment = document.createDocumentFragment();

  const getCleanContent = () => {
    const content = document.querySelectorAll(`.picture`);
    content.forEach((item) => {
      similarListElement.removeChild(item);
    });
  };
  const getSetting = (array) => {
    sortedArray = [...array];

    array.forEach((item) => {
      fragment.appendChild(renderComments(item));
    });

    similarListElement.appendChild(fragment);
  };
  const sameArrays = {
    all: [],
    random: [],
  };

  const slashImages = function () {
    getSetting(sortedArray);
  };

  const mostPopularHandler = window.debounce(() => {
    getCleanContent();
    const popular = [...sameArrays.all];
    popular.sort((a, b) => {
      return b.comments.length - a.comments.length;
    });
    sortedArray = popular;

    slashImages();
  });

  mostPopular.addEventListener(`click`, mostPopularHandler);

  const defaultHandler = window.debounce(() => {
    getCleanContent();

    sortedArray = sameArrays.all;
    slashImages();
  });

  defaults.addEventListener(`click`, defaultHandler);

  const randomHandler = window.debounce(() => {
    sortedArray = sameArrays.all;
    sameArrays.random = [];
    getCleanContent();

    while (sameArrays.random.length < RANDOM_NUMBER) {
      let item = window.getRandomValue(sortedArray);
      if (!sameArrays.random.includes(item)) {
        sameArrays.random.push(item);
      }
    }

    sortedArray = sameArrays.random;

    slashImages();
  });

  random.addEventListener(`click`, randomHandler);

  const successHandler = function (data) {
    sortedArray = data;
    sameArrays.all = data;
    slashImages();


    makeBigPicture(sameArrays.all[0]);
  };

  window.backend.load(successHandler, window.errorHandler);

  galleryFilter.classList.remove(`img-filters--inactive`);
})();
