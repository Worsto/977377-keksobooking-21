'use strict';

(function () {

  const mainPin = document.querySelector(`.map__pin--main`);

  window.pin = {
    MAIN_PIN_DIAMETER: 65,
    MAIN_PIN_ARROW: 22,
    mainPin
  };

  function onPinLeftClick(e) {
    if (typeof e === `object` && e.button === 0) {
      window.page.activatePage();
      window.form.completeAddressInput();
    }
  }

  mainPin.addEventListener(`mousedown`, onPinLeftClick);

  mainPin.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter` || evt.code === `Space`) {
      window.page.activatePage();
      window.form.completeAddressInput();
    }
  });

})();
