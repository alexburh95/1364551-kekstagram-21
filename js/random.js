"use strict";
(function () {
  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getRandomValue = (array) => {
    const random = Math.floor(Math.random() * array.length);
    return array[random];
  };


  window.random = {
    getRandomIntInclusive,
    getRandomValue,

  };
})();
