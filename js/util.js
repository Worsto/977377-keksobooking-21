"use strict";

window.util = {
  formatNumber(num) {
    return num > 9 ? num : `0${num}`;
  },

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  },

  getRandomFromArray(array) {
    return array[window.util.getRandomNumber(0, array.length - 1)];
  },

  getRandomsFromArray(array) {
    return array.filter(() => {
      return Math.random() > 0.5;
    });
  }
};
