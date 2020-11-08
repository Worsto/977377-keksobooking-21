"use strict";

(function () {

  const pinTemplate = document.querySelector(`#pin`)
  .content.querySelector(`.map__pin`);

  function renderPin(element) {
    const pinElement = pinTemplate.cloneNode(true);

    pinElement.setAttribute(`style`, `left: ${element.location.x - 25}px; top: ${element.location.y - 35}px;`);
    pinElement.querySelector(`img`).setAttribute(`src`, element.author.avatar);
    pinElement.querySelector(`img`).setAttribute(`alt`, element.offer.title);

    return pinElement;
  }

  const OFFERS_QUANTITY = 8;
  const offers = window.createOffers(OFFERS_QUANTITY);

  function createPinsList(array) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < array.length; i++) {
      let pin = renderPin(array[i]);
      pin.id = `pin-${i}`;
      fragment.appendChild(pin);
    }

    return fragment;
  }

  function createFeature(feature) {
    const listItem = document.createElement(`li`);
    listItem.classList.add(`popup__feature`);
    listItem.classList.add(`popup__feature--${feature}`);

    return listItem;
  }

  function createList(func, array) {
    let list = document.createDocumentFragment();
    for (let i = 0; i < array.length; i++) {
      list.appendChild(func(array[i]));
    }

    return list;
  }

  window.data = {
    offers,
    createPinsList,
    createFeature,
    createList
  };

})();
