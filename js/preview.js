"use strict";
(function () {
  const uploadFile = document.querySelector(`#upload-file`);
  const uploadImg = document.querySelector(`.img-upload__overlay`);
  const body = document.querySelector(`body`);
  const cancelWindow = document.querySelector(`#upload-cancel`);

  window.onWindowEscPress = (evt) => {
    if (evt.key === window.KEYS.ESCAPE) {
      closeWindow();
    }
  };

  const openWindow = () => {
    uploadImg.classList.remove(`hidden`);
    body.classList.add(`modal-open`);
    document.addEventListener(`keydown`, window.onWindowEscPress);
  };

  const closeWindow = () => {
    uploadImg.classList.add(`hidden`);
    uploadFile.value = ``;

    body.classList.remove(`modal-open`);
    document.removeEventListener(`keydown`, window.onWindowEscPress);
  };
  uploadFile.addEventListener(`change`, () => {
    openWindow();
  });
  cancelWindow.addEventListener(`click`, () => {
    closeWindow();
  });
})();
