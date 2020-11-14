'use strict';

(function () {
  function init2DSlider(evt, element, field, functions = undefined) {
    if (functions.onDown) {
      functions.onDown();
    }

    let shift = {
      x: evt.clientX - element.getBoundingClientRect().left,
      y: evt.clientY - element.getBoundingClientRect().top
    };

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      if (functions.onMove) {
        functions.onMove();
      }

      let newLeft = moveEvt.clientX - shift.x - field.getBoundingClientRect().left;
      let newTop = moveEvt.clientY - shift.y - field.getBoundingClientRect().top;

      if (newLeft < 0) {
        newLeft = 0;
      }

      let rightEdge = field.offsetWidth - element.offsetWidth;

      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      if (newTop < field.topBorder - element.height) {
        newTop = field.topBorder - element.height;
      }
      if (newTop > field.bottomBorder - element.height) {
        newTop = field.bottomBorder - element.height;
      }

      element.style.left = newLeft + `px`;
      element.style.top = newTop + `px`;

    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };
    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  }

  window.init2DSlider = init2DSlider;
})();
