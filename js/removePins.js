"use strict";

(function () {
  window.removePins = function () {
    const pins = document.querySelectorAll(`.map__pin`);
    for (let i = 0; i < pins.length; i++) {
      if (!pins[i].classList.contains(`map__pin--main`)) {
        pins[i].remove();
      }
    }
  };
})();
