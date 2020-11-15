'use strict';

(function () {

  const map = window.map.mapSection;
  const mainPin = map.querySelector(`.map__pin--main`);
  mainPin.arrow = 22;
  mainPin.height = mainPin.offsetWidth + mainPin.arrow;
  const mapRectangle = window.map.mapPins;

  const pinFunctions = {
    onDown: window.closeCard,
    onMove: window.form.completeAddressInput
  };


  function onPinLeftClick(e) {
    if (typeof e === `object` && e.button === 0) {
      window.page.activatePage();
      window.init2DSlider(e, mainPin, mapRectangle, pinFunctions);
    }
  }

  mainPin.addEventListener(`mousedown`, onPinLeftClick);

  mainPin.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter` || evt.code === `Space`) {
      window.page.activatePage();
      window.form.completeAddressInput();
    }
  });

  window.mainPin = mainPin;

})();
