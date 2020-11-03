"use strict";

(function () {

  function formatNumber(num) {
    return num > 9 ? num : `0${num}`;
  }

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  }

  function getRandomFromArray(array) {
    return array[window.util.getRandomNumber(0, array.length - 1)];
  }

  function getRandomsFromArray(array) {
    return array.filter(() => {
      return Math.random() > 0.5;
    });
  }

  window.util = {
    formatNumber,
    getRandomNumber,
    getRandomFromArray,
    getRandomsFromArray
  };

})();
