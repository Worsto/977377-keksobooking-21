'use strict';

(function () {

  const map = window.map.mapSection;
  const mainPin = map.querySelector(`.map__pin--main`);
  const mapRectangle = window.map.mapPins;
  const mainPinDiameter = 65;
  const mainPinArrow = 22;
  const mainPinHeight = mainPinDiameter + mainPinArrow;

  function onPinLeftClick(e) {
    if (typeof e === `object` && e.button === 0) {
      window.page.activatePage();
      window.init2DSlider(e, mainPin, mapRectangle, mainPinHeight, window.mapBorders.top, window.mapBorders.bottom, window.closeCard, window.form.completeAddressInput);
    }
  }

  mainPin.addEventListener(`mousedown`, onPinLeftClick);

  mainPin.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter` || evt.code === `Space`) {
      window.page.activatePage();
      window.form.completeAddressInput();
    }
  });

  window.pin = {
    mainPinDiameter,
    mainPinArrow,
    mainPin
  };

})();
