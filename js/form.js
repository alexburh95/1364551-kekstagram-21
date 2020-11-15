"use strict";
(function () {
  const MAX_SCALE = 100;
  const MIN_SCALE = 25;
  const STOCK_SCALE = 1;
  const REGULAR = /^#[a-zA-Z0-9А-ЯЁа-яё]*$/;
  const SPACE = ` `;
  const MAX_COMMENT_LENGTH = 140;
  const MIN_HASHTAG_LENGTH = 2;
  const MAX_HASHTAG_LENGTH = 20;
  const MAX_ARRAY_LENGTH = 5;
  const hastagInput = document.querySelector(`.text__hashtags`);
  const hasDuplicates = (array) =>
    array.some((item) => {
      return array.indexOf(item) !== array.lastIndexOf(item);
    });
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
      } else if (REGULAR.test(element) === false) {
        hastagInput.setCustomValidity(
            `Ошибка заполнения. Можно использовать только буквы и цифры`
        );
        break;
      } else if (array.length > 1) {
        if (hasDuplicates(array) === true) {
          hastagInput.setCustomValidity(
              `Нельзя использовать одинаковые хештеги`
          );
          break;
        }
      } else {
        hastagInput.setCustomValidity(``);
      }
    }
    hastagInput.reportValidity();
  };
  const hastagInputHandler = () => {
    const inputs = hastagInput.value.toLowerCase().split(SPACE);
    checkInput(inputs);
  };
  hastagInput.addEventListener(`input`, hastagInputHandler);

  hastagInput.addEventListener(`focus`, () => {
    document.removeEventListener(`keydown`, window.preview.onWindowEscPress);
  });
  hastagInput.addEventListener(`blur`, () => {
    document.addEventListener(`keydown`, window.preview.onWindowEscPress);
  });

  const comments = document.querySelector(`.text__description`);
  const checkInputComment = () => {
    if (comments.value.length > MAX_COMMENT_LENGTH) {
      comments.setCustomValidity(
          `Максимальная длина комментария - 140 символов`
      );
    } else {
      comments.setCustomValidity(``);
    }
  };
  comments.addEventListener(`input`, checkInputComment);
  comments.addEventListener(`focus`, () => {
    document.removeEventListener(`keydown`, window.preview.onWindowEscPress);
  });
  comments.addEventListener(`blur`, () => {
    document.addEventListener(`keydown`, window.preview.onWindowEscPress);
  });

  const smallerButton = document.querySelector(`.scale__control--smaller`);
  const biggerButton = document.querySelector(`.scale__control--bigger`);

  const imgValue = document.querySelector(`.scale__control--value`);

  imgValue.value = `${MAX_SCALE}%`;

  const filteredPicture = document.querySelector(`.img-upload__preview img`);
  const changeImg = (value) => {
    filteredPicture.style.transform = `scale( ${value / MAX_SCALE})`;
    imgValue.value = `${value}%`;
  };
  const toggleImgValue = () => {
    let element = imgValue.value.split(`%`)[0];
    smallerButton.addEventListener(`click`, () => {
      if (element > MIN_SCALE && element <= MAX_SCALE) {
        element -= MIN_SCALE;
        changeImg(element);
      }
    });
    biggerButton.addEventListener(`click`, () => {
      if (element >= MIN_SCALE && element < MAX_SCALE) {
        element += MIN_SCALE;
        changeImg(element);
      }
    });
  };
  toggleImgValue();

  const pin = document.querySelector(`.effect-level__pin`);
  const barContainer = document.querySelector(`.img-upload__effect-level`);
  const bar = document.querySelector(`.effect-level__line`);
  const depth = document.querySelector(`.effect-level__depth`);
  const filters = document.querySelectorAll(`.effects__radio`);
  const filterValue = document.querySelector(`.effect-level__value`);

  const setFilter = (style, value) => {
    filteredPicture.style.filter = `${style}(${value})`;
  };
  const arrayOfFilters = {
    none: () => {},
    chrome: (propeties) => {
      let value = Math.round(getPinPosition(propeties)) / 100;
      setFilter(`grayscale`, value);
    },
    sepia: (propeties) => {
      let value = Math.round(getPinPosition(propeties)) / 100;
      setFilter(`sepia`, value);
    },
    marvin: (propeties) => {
      setFilter(`invert`, `${getPinPosition(propeties)}%`);
    },
    phobos: (propeties) => {
      setFilter(`blur`, `${(getPinPosition(propeties) * 3) / 100}px`);
    },
    heat: (propeties) => {
      setFilter(`brightness`, `${(getPinPosition(propeties) * 2) / 100 + 1}`);
    },
  };

  const getPinPosition = (argument) => {
    const barLeft = bar.getBoundingClientRect()[`left`];
    const barWidth = bar.clientWidth;

    const pinLeft = argument.pageX - barLeft;

    let offset;

    if (pinLeft < 0) {
      offset = 0;
    }
    if (pinLeft > barWidth) {
      offset = 100;
    }
    if (pinLeft > 0 && pinLeft < barWidth) {
      offset = (pinLeft / barWidth) * 100;
    }
    return offset;
  };

  const clearFilters = () => {
    filteredPicture.style.filter = ``;
  };

  pin.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    const filter = filteredPicture.dataset.filter;

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      pin.style.left = `${getPinPosition(moveEvt)}%`;
      depth.style.width = `${getPinPosition(moveEvt)}%`;

      arrayOfFilters[`${filter}`](moveEvt);
    };
    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      filterValue.value = Math.floor(getPinPosition(upEvt));

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };
    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

  filters.forEach((item) => {
    item.addEventListener(`click`, () => {
      clearFilters();
      barContainer.classList.remove(`hidden`);
      filteredPicture.classList = ``;

      if (item.value === `none`) {
        barContainer.classList.add(`hidden`);
      }
      filteredPicture.classList.add(`effects__preview--${item.value}`);
      filteredPicture.dataset.filter = item.value;
      pin.style.left = `100%`;
      depth.style.width = `100%`;
    });
  });
  barContainer.classList.add(`hidden`);
  const resetTheFilters = () => {
    imgValue.value = `${MAX_SCALE}%`;
    filteredPicture.classList = ``;
    pin.style.left = `${MAX_SCALE}%`;
    depth.style.width = `${MAX_SCALE}%`;
    filteredPicture.style.transform = `scale( ${STOCK_SCALE})`;
    barContainer.classList.add(`hidden`);
    clearFilters();
  };

  const submit = document.querySelector(`.img-upload__form`);

  const resetinputValues = () => {
    const radioInputs = document.querySelectorAll(`input[type=radio]`);
    radioInputs.forEach((item) => {
      if (item.value === `none`) {
        item.checked = true;
      }
    });

    const input = textInputs.querySelector(`input`);
    const textarea = textInputs.querySelector(`textarea`);

    textarea.value = ``;

    input.value = ``;
  };
  const textInputs = document.querySelector(`.img-upload__text`);

  const hideMessage = (evt, message) => {
    const messageContainers = document.querySelectorAll(`.${message}`);

    const messages = document.querySelectorAll(`.${message}__inner`);

    messages.forEach((item, index) => {
      if (!item.isEqualNode(evt.target)) {
        messageContainers[index].remove();
      }
    });
  };

  const closeMessage = (message) => {
    const messageContainer = document.querySelectorAll(`.${message}`);

    messageContainer.forEach((item) => {
      item.remove();
    });
  };

  const hideSubmitMessage = () => {
    closeMessage(`error`);
    closeMessage(`success`);
  };

  const showMessage = (message) => {
    const main = document.querySelector(`main`);
    const template = document
      .querySelector(`#${message}`)
      .content.firstElementChild.cloneNode(true);

    main.appendChild(template);

    const hiding = (evt) => {
      hideMessage(evt, message);
    };

    document.addEventListener(`click`, hiding);
    document.addEventListener(`keydown`, window.preview.onWindowEscPress);
  };

  const sending = (message) => {
    window.preview.closeWindow();
    showMessage(message);
  };
  const succsessSubmitHandler = () => {
    sending(`success`);
    resetinputValues();
  };
  const errorSubmitHadler = () => {
    sending(`error`);
  };
  const submitHandler = (evt) => {
    evt.preventDefault();
    window.backend.save(
        new FormData(submit),
        succsessSubmitHandler,
        errorSubmitHadler
    );
  };

  submit.addEventListener(`submit`, submitHandler);

  window.form = {
    resetTheFilters,
    hideSubmitMessage,
  };
})();
