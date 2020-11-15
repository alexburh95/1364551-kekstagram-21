"use strict";
(function () {
  const STATUS_CODE = {
    OK: 200,
  };
  const TIMEOUT_IN_MS = 10000;
  const getFindings = (element, sucsess, lost) => {
    element.responseType = `json`;

    element.addEventListener(`load`, () => {
      if (element.status === STATUS_CODE.OK) {
        sucsess(element.response);
      } else {
        lost(`Статус ответа: ${element.status} ${element.statusText}`);
      }
    });
    element.addEventListener(`error`, () => {
      lost(`${window.data.SORRY} Произошла ошибка соединения`);
    });
    element.addEventListener(`timeout`, () => {
      lost(
          `${window.data.SORRY} Запрос не успел выполниться за ${element.timeout} мс`
      );
    });

    element.timeout = TIMEOUT_IN_MS;
  };
  const backendLoad = (onLoad, onError) => {
    const URL = ` https://21.javascript.pages.academy/kekstagram/data`;

    const xhr = new XMLHttpRequest();
    getFindings(xhr, onLoad, onError);

    xhr.open(`GET`, URL);
    xhr.send();
  };

  const errorHandler = (errorMessage) => {
    const node = document.createElement(`div`);
    node.style = `z-index: 100;
  margin: 0px auto;
  text-align: center;
  background: linear-gradient(to right, rgb(220, 36, 36), rgb(74, 86, 157));
  color: rgb(255, 255, 255);
  position: absolute;
  left: 0px;
  right: 0px;
  font-size: 30px;
  top: 50%;
  width: 50%;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  const backendSave = (data, onLoad, onError) => {
    const URL = `https://21.javascript.pages.academy/kekstagram`;

    const xhr = new XMLHttpRequest();
    getFindings(xhr, onLoad, onError);

    xhr.open(`POST`, URL);
    xhr.send(data);
  };

  window.backend = {
    errorHandler,
    load: backendLoad,
    save: backendSave
  };
})();
