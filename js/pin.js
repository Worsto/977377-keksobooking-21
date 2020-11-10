'use strict';

(function () {

  const map = window.map.mapSection;
  const mainPin = map.querySelector(`.map__pin--main`);

  // перетаскивание
  mainPin.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();
    window.closeCard();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      window.form.completeAddressInput();

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.left = (mainPin.offsetLeft - shift.x) + `px`;
      mainPin.style.top = (mainPin.offsetTop - shift.y) + `px`;

    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };
    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });
  // перетаскивание

  function onPinLeftClick(e) {
    if (typeof e === `object` && e.button === 0) {
      window.page.activatePage();
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
    mainPinDiameter: 65,
    mainPinArrow: 22,
    mainPin
  };

})();
