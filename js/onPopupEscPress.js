"use strict";

(function () {
  window.onPopupEscPress = function (evt, closeFunc) {
    if (evt.key === `Escape`) {
      closeFunc();
      document.removeEventListener(`keydown`, window.onPopupEscPress);
    }
  };
})();
