'use strict';

(function () {
  function init2DSlider(evt, element, field, elementHeight = element.offsetHeight, fieldTop = 0, FieldBottom = field.offsetHeight, mouseDownFunction = undefined, mouseMoveFunction = undefined) {
    if (mouseDownFunction) {
      mouseDownFunction();
    }

    let shift = {
      x: evt.clientX - element.getBoundingClientRect().left,
      y: evt.clientY - element.getBoundingClientRect().top
    };

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      if (mouseMoveFunction) {
        mouseMoveFunction();
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

      if (newTop < fieldTop - elementHeight) {
        newTop = fieldTop - elementHeight;
      }
      if (newTop > FieldBottom - elementHeight) {
        newTop = FieldBottom - elementHeight;
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
