"use strict";

(function () {
  const MAX_SHOWED_PINS = 5;

  const pinTemplate = document.querySelector(`#pin`)
  .content.querySelector(`.map__pin`);

  function renderPin(element) {
    const pinElement = pinTemplate.cloneNode(true);
    const pinWidth = 50;
    const pinHeight = 70;

    pinElement.setAttribute(`style`, `left: ${element.location.x - pinWidth / 2}px; top: ${element.location.y - pinHeight}px;`);
    pinElement.querySelector(`img`).setAttribute(`src`, element.author.avatar);
    pinElement.querySelector(`img`).setAttribute(`alt`, element.offer.title);

    return pinElement;
  }

  window.createPins = function (array) {
    const takeNumber = array.length > MAX_SHOWED_PINS
      ? MAX_SHOWED_PINS
      : array.length;

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < takeNumber; i++) {
      if (array[i].offer !== undefined) {
        let pin = renderPin(array[i]);
        pin.id = `pin-${i}`;
        fragment.appendChild(pin);
      }
    }

    return fragment;
  };

})();
