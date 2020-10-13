"use strict";
(function () {
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

  const getSetting = (array) => {
    const fragment = document.createDocumentFragment();

    array.forEach((item) => {
      fragment.appendChild(renderComments(item));
    });

    similarListElement.appendChild(fragment);
  };

  window.backend.load(getSetting, window.errorHandler);
})();
