'use strict';

(function () {

  const map = window.map.mapSection;
  const mainPin = map.querySelector(`.map__pin--main`);
  const mapRectangle = window.map.mapPins;
  const mainPinDiameter = 65;
  const mainPinArrow = 22;
  const mainPinHeight = mainPinDiameter + mainPinArrow;

  // перетаскивание
  function dragMainPin(evt) {
    window.closeCard();

    let shift = {
      x: evt.clientX - mainPin.getBoundingClientRect().left,
      y: evt.clientY - mainPin.getBoundingClientRect().top
    };

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      window.form.completeAddressInput();

      let newLeft = moveEvt.clientX - shift.x - mapRectangle.getBoundingClientRect().left;
      let newTop = moveEvt.clientY - shift.y - mapRectangle.getBoundingClientRect().top;

      if (newLeft < 0) {
        newLeft = 0;
      }

      let rightEdge = mapRectangle.offsetWidth - mainPin.offsetWidth;

      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      if (newTop < window.mapBorders.top - mainPinHeight) {
        newTop = window.mapBorders.top - mainPinHeight;
      }
      if (newTop > window.mapBorders.bottom - mainPinHeight) {
        newTop = window.mapBorders.bottom - mainPinHeight;
      }

      mainPin.style.left = newLeft + `px`;
      mainPin.style.top = newTop + `px`;

    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };
    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  }
  // перетаскивание

  function onPinLeftClick(e) {
    if (typeof e === `object` && e.button === 0) {
      window.page.activatePage();
      dragMainPin(e);
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
