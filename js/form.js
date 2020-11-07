"use strict";
(function () {
  const slider = document.querySelector(`.effect-level__pin`);
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
  const space = ` `;
  const MAX_COMMENT_LENGTH = 140;
  const MIN_HASHTAG_LENGTH = 2;
  const MAX_HASHTAG_LENGTH = 20;
  const MAX_ARRAY_LENGTH = 5;
  const hasDuplicates = (arr) =>
    arr.some((item) => arr.indexOf(item) !== arr.lastIndexOf(item));
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
    const inputArray = hastagInput.value.toLowerCase().split(space);
    checkInput(inputArray);
  };
  hastagInput.addEventListener(`input`, hastagInputHandler);

  hastagInput.addEventListener(`focus`, () => {
    document.removeEventListener(`keydown`, window.onWindowEscPress);
  });
  hastagInput.addEventListener(`blur`, () => {
    document.addEventListener(`keydown`, window.onWindowEscPress);
  });

  const comments = document.querySelector(`.text__description`);
  const checkInputComment = () =>{
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
    document.removeEventListener(`keydown`, window.onWindowEscPress);
  });
  comments.addEventListener(`blur`, () => {
    document.addEventListener(`keydown`, window.onWindowEscPress);
  });


})();
