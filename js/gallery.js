"use strict";
(function () {
  const RANDOM_NUMBER = 10;
  const galleryFilter = document.querySelector(`.img-filters`);
  const similarListElement = document.querySelector(`.pictures`);
  const similarPictureTemplate = document
    .querySelector(`#picture`)
    .content.querySelector(`.picture`);

  const renderComments = (object) => {
    const commentElement = similarPictureTemplate.cloneNode(true);
    commentElement.querySelector(`.picture__img`).src = object.url;

    commentElement.querySelector(`.picture__likes`).textContent = object.likes;
    commentElement.querySelector(`.picture__comments`).textContent =
      object.comments.length;

    return commentElement;
  };
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
    sortedArray = array;

    array.forEach((item) => {
      fragment.appendChild(renderComments(item));
    });

    similarListElement.appendChild(fragment);
  };
  const sameArrays = {
    all: [],
    randomm: [],
  };

  const slashImages = function () {
    getSetting(sortedArray);
  };

  const mostPopularHandler = window.debounce(() => {
    getCleanContent();
    sortedArray = sameArrays.all;
    let popular = [...sortedArray];
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
    sameArrays.randomm = [];
    getCleanContent();

    while (sameArrays.randomm.length < RANDOM_NUMBER) {
      let item = window.getRandomValue(sortedArray);
      if (!sameArrays.randomm.includes(item)) {
        sameArrays.randomm.push(item);
      }
    }

    sortedArray = sameArrays.randomm;

    slashImages();
  });

  random.addEventListener(`click`, randomHandler);

  const successHandler = function (data) {
    sortedArray = data;
    sameArrays.all = data;
    slashImages();
  };

  window.backend.load(successHandler, window.errorHandler);

  galleryFilter.classList.remove(`img-filters--inactive`);
})();
