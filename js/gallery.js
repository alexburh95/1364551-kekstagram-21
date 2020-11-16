
"use strict";
(function () {
  const COMENT_IMG_SIZE = 35;
  const COMMENTS_PER_TIME = 5;
  const bigPicture = document.querySelector(`.big-picture`);
  const RANDOM_NUMBER = 10;
  const galleryFilter = document.querySelector(`.img-filters`);
  const similarListElement = document.querySelector(`.pictures`);
  const similarPictureTemplate = document
    .querySelector(`#picture`)
    .content.querySelector(`.picture`);

  const openFiltersSection = () => {
    galleryFilter.classList.remove(`img-filters--inactive`);
  };

  const renderComments = (object) => {
    const commentElement = similarPictureTemplate.cloneNode(true);
    commentElement.querySelector(`.picture__img`).src = object.url;

    commentElement.querySelector(`.picture__likes`).textContent = object.likes;
    commentElement.querySelector(`.picture__comments`).textContent = object.comments.length;

    return commentElement;
  };

  const makeBigPicture = (object) => {
    bigPicture.querySelector(`.big-picture__img img`).src = object.url;
    bigPicture.querySelector(`.likes-count`).textContent = object.likes;
    bigPicture.querySelector(`.comments-count`).textContent =
      object.comments.length;
    bigPicture.querySelector(`.social__caption`).textContent =
      object.description;

    commentsContainer.innerHTML = ``;

    bigPicture.querySelector(`.social__comment-count`).classList.add(`hidden`);

    document.body.classList.add(`modal-open`);
    bigPicture.classList.remove(`hidden`);
    document.addEventListener(`keydown`, window.preview.onWindowEscPress);
  };

  const closeBigPictureBtn = document.querySelector(`.big-picture__cancel`);
  let comments = [];

  const closeBigPicture = () => {
    bigPicture.classList.add(`hidden`);
    document.body.classList.remove(`modal-open`);
  };
  const openBigPicture = window.debounce((data) => {
    let minitures = document.querySelectorAll(`.picture`);
    minitures = Array.from(minitures);
    minitures.forEach((item, index) => {
      item.addEventListener(`click`, () => {
        makeBigPicture(data[index]);
        comments = data[index].comments;
        renderNewComments(comments);
      });
    });
  });
  closeBigPictureBtn.addEventListener(`click`, closeBigPicture);

  let sortedImages = [];
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
  const slashImages = window.debounce((array) => {
    sortedImages = [...array];

    array.forEach((item) => {
      fragment.appendChild(renderComments(item));
    });

    similarListElement.appendChild(fragment);
  });
  const filteredImages = {
    defaults: [],
    randoms: [],
  };

  const clearActive = () => {
    mostPopular.classList.remove(`img-filters__button--active`);
    defaults.classList.remove(`img-filters__button--active`);
    random.classList.remove(`img-filters__button--active`);
  };

  const mostPopularHandler = () => {
    getCleanContent();
    const popularImages = [...filteredImages.defaults];
    popularImages.sort((a, b) => {
      return b.comments.length - a.comments.length;
    });
    sortedImages = popularImages;

    slashImages(sortedImages);
    openBigPicture(sortedImages);

    clearActive();
    mostPopular.classList.add(`img-filters__button--active`);
  };

  mostPopular.addEventListener(`click`, mostPopularHandler);

  const defaultHandler = () => {
    getCleanContent();

    sortedImages = filteredImages.defaults;
    window.debounce(slashImages(sortedImages));
    openBigPicture(sortedImages);
    clearActive();
    defaults.classList.add(`img-filters__button--active`);
  };

  defaults.addEventListener(`click`, defaultHandler);

  const randomHandler = () => {
    sortedImages = filteredImages.defaults;
    filteredImages.randoms = [];
    getCleanContent();

    while (filteredImages.randoms.length < RANDOM_NUMBER) {
      let item = window.random.getRandomValue(sortedImages);
      if (!filteredImages.randoms.includes(item)) {
        filteredImages.randoms.push(item);
      }
    }

    sortedImages = filteredImages.randoms;

    slashImages(sortedImages);
    openBigPicture(sortedImages);

    clearActive();
    random.classList.add(`img-filters__button--active`);
  };

  random.addEventListener(`click`, randomHandler);

  const successHandler = (data) => {
    sortedImages = data;
    filteredImages.defaults = data;
    slashImages(sortedImages);
    openBigPicture(sortedImages);
    openFiltersSection();
  };

  window.backend.load(successHandler, window.backend.errorHandler);

  const commentsContainer = bigPicture.querySelector(`.social__comments`);
  const commentsLoadBtn = bigPicture.querySelector(`.comments-loader`);

  const renderComment = (comment) => {
    const liFragment = document.createDocumentFragment();
    const li = document.createElement(`li`);
    li.classList.add(`social__comment`);
    const avatar = document.createElement(`img`);
    avatar.classList.add(`social__picture`);
    avatar.src = comment.avatar;
    avatar.alt = comment.name;
    avatar.width = COMENT_IMG_SIZE;
    avatar.height = COMENT_IMG_SIZE;
    const commentText = document.createElement(`p`);
    commentText.classList.add(`social__text`);
    commentText.textContent = comment.message;
    li.appendChild(avatar);
    li.appendChild(commentText);
    liFragment.appendChild(li);
    return liFragment;
  };

  const renderNewComments = (commentsList) => {
    commentsLoadBtn.classList.remove(`hidden`);
    const rendered = commentsContainer.childNodes.length;
    const commentsCount = commentsList.length;

    let remainingComments = [];
    remainingComments = commentsList.slice(rendered, commentsCount);

    if (remainingComments.length <= COMMENTS_PER_TIME) {
      remainingComments.forEach((comment) => {
        commentsContainer.appendChild(renderComment(comment));
      });
      commentsLoadBtn.classList.add(`hidden`);
    }
    if (remainingComments.length > COMMENTS_PER_TIME) {
      remainingComments = remainingComments.slice(0, COMMENTS_PER_TIME);
      remainingComments.forEach((comment) => {
        commentsContainer.appendChild(renderComment(comment));
      });
    }
  };

  commentsLoadBtn.addEventListener(`click`, () => {
    renderNewComments(comments);
  });
  window.gallery = {
    closeBigPicture,
  };
})();
