"use strict";
(function () {
  const uploadFile = document.querySelector(`#upload-file`);
  const uploadImg = document.querySelector(`.img-upload__overlay`);
  const body = document.querySelector(`body`);
  const cancelWindow = document.querySelector(`#upload-cancel`);

  const onWindowEscPress = (evt) => {
    if (evt.key === window.data.KEYS.ESCAPE) {
      closeWindow();
      window.gallery.closeBigPicture();
      window.form.hideSubmitMessage();
    }
  };

  const openWindow = () => {
    uploadImg.classList.remove(`hidden`);
    body.classList.add(`modal-open`);
    document.addEventListener(`keydown`, onWindowEscPress);
    window.form.resetTheFilters();
  };

  const closeWindow = () => {
    uploadImg.classList.add(`hidden`);
    uploadFile.value = ``;

    body.classList.remove(`modal-open`);
    document.removeEventListener(`keydown`, onWindowEscPress);
  };
  uploadFile.addEventListener(`change`, () => {
    openWindow();
  });
  cancelWindow.addEventListener(`click`, () => {
    closeWindow();

  });

  window.preview = {
    onWindowEscPress,
    closeWindow,

  };
})();
