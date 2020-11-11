'use strict';

(function () {

  const VOCABULARY = {
    flat: `Квартира`,
    bungalow: `Бунгало`,
    house: `Дом`,
    palace: `Дворец`
  };

  const map = window.map.mapSection;
  const cardTemplate = document.querySelector(`#card`)
    .content.querySelector(`.map__card`);

  function createImgWithSource(src) {
    const image = cardTemplate.querySelector(`.popup__photo`).cloneNode();
    image.setAttribute(`src`, src);

    return image;
  }

  function createFeature(feature) {
    const listItem = document.createElement(`li`);
    listItem.classList.add(`popup__feature`);
    listItem.classList.add(`popup__feature--${feature}`);

    return listItem;
  }

  function renderCard(element) {
    const cardElement = cardTemplate.cloneNode(true);

    const rooms = element.offer.rooms === 1 ? `комната` : `комнаты`;
    const guests = element.offer.guests === 1 ? `гостя` : `гостей`;

    cardElement.querySelector(`.popup__title`).textContent = element.offer.title;
    cardElement.querySelector(`.popup__text--address`).textContent = element.offer.address;
    cardElement.querySelector(`.popup__text--price`).textContent = `${element.offer.price}₽/ночь`;
    cardElement.querySelector(`.popup__type`).textContent = VOCABULARY[element.offer.type];
    cardElement.querySelector(`.popup__text--capacity`).textContent = `${element.offer.rooms} ${rooms} для ${element.offer.guests} ${guests}`;
    cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}`;
    cardElement.querySelector(`.popup__features`).innerHTML = ``;
    cardElement.querySelector(`.popup__features`).appendChild(window.util.createList(createFeature, element.offer.features));
    cardElement.querySelector(`.popup__description`).textContent = element.offer.description;
    cardElement.querySelector(`.popup__photos`).innerHTML = ``;
    cardElement.querySelector(`.popup__photos`).appendChild(window.util.createList(createImgWithSource, element.offer.photos));
    cardElement.querySelector(`.popup__avatar`).setAttribute(`src`, element.author.avatar);

    return cardElement;
  }

  function getNumberOfId(element) {
    if (element === null) {
      return undefined;
    }
    return parseInt(element.id.replace(/\D+/g, ``), 10);
  }

  function closeCard() {
    if (map.querySelector(`.map__card`)) {
      map.querySelector(`#pin-${getNumberOfId(map.querySelector(`.map__card`))}`).classList.remove(`map__pin--active`);
      map.querySelector(`.map__card`).remove();
    }
  }

  function activateCloseButton() {
    if (map.querySelector(`.map__card`)) {
      const closeButton = map.querySelector(`.map__card .popup__close`);
      closeButton.addEventListener(`click`, closeCard);
    }
  }

  const onPopupEscPress = function (evt) {
    if (evt.key === `Escape`) {
      closeCard();
      document.removeEventListener(`keydown`, onPopupEscPress);
    }
  };

  function markActivePin(element) {
    element.classList.add(`map__pin--active`);
  }

  function createCard(number) {
    const card = renderCard(window.offers[number]);
    card.id = `card-${number}`;
    map.insertBefore(card, map.querySelector(`.map__filters-container`));
  }

  function interateWithPins(evt) {
    if (evt.target.closest(`.map__pin`) && !evt.target.closest(`.map__pin--main`)) {
      let activePin = evt.target.closest(`.map__pin`);
      if (getNumberOfId(activePin) === getNumberOfId(map.querySelector(`.map__card`))) {
        closeCard();
        return;
      }
      closeCard();
      markActivePin(activePin);
      createCard(getNumberOfId(activePin));
      activateCloseButton();
      document.addEventListener(`keydown`, onPopupEscPress);
    }
  }

  const mapPins = map.querySelector(`.map__pins`);
  mapPins.addEventListener(`click`, interateWithPins);

  window.closeCard = closeCard;

})();
