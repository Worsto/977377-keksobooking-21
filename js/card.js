'use strict';

(function () {

  const VOCABULARY = {
    flat: `Квартира`,
    bungalow: `Бунгало`,
    house: `Дом`,
    palace: `Дворец`
  };

  const cardTemplate = document.querySelector(`#card`)
    .content.querySelector(`.map__card`);

  function createImgWithSource(src) {
    const image = cardTemplate.querySelector(`.popup__photo`).cloneNode();
    image.setAttribute(`src`, src);

    return image;
  }

  function renderCard(element) {
    const cardElement = cardTemplate.cloneNode(true);

    let rooms = `комнаты`;
    let guests = `гостей`;

    if (element.offer.rooms === 1) {
      rooms = `комната`;
    }

    if (element.offer.guests === 1) {
      guests = `гостя`;
    }

    cardElement.querySelector(`.popup__title`).textContent = element.offer.title;
    cardElement.querySelector(`.popup__text--address`).textContent = element.offer.address;
    cardElement.querySelector(`.popup__text--price`).textContent = `${element.offer.price}₽/ночь`;
    cardElement.querySelector(`.popup__type`).textContent = VOCABULARY[element.offer.type];
    cardElement.querySelector(`.popup__text--capacity`).textContent = `${element.offer.rooms} ${rooms} для ${element.offer.guests} ${guests}`;
    cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}`;
    cardElement.querySelector(`.popup__features`).innerHTML = ``;
    cardElement.querySelector(`.popup__features`).appendChild(window.data.createList(window.data.createFeature, element.offer.features));
    cardElement.querySelector(`.popup__description`).textContent = element.offer.description;
    cardElement.querySelector(`.popup__photos`).innerHTML = ``;
    cardElement.querySelector(`.popup__photos`).appendChild(window.data.createList(createImgWithSource, element.offer.photos));
    cardElement.querySelector(`.popup__avatar`).setAttribute(`src`, element.author.avatar);

    return cardElement;
  }

  let offerPin;

  function closeCard() {
    if (document.querySelector(`.map__card`)) {
      document.querySelector(`.map__card`).remove();
      offerPin.classList.remove(`map__pin--active`);
      offerPin = ``;
    }
  }

  function createCloseButton() {
    if (document.querySelector(`.map__card`)) {
      const closeButton = document.querySelector(`.map__card .popup__close`);
      closeButton.addEventListener(`click`, closeCard);
    }
  }

  const onPopupEscPress = function (evt) {
    if (evt.key === `Escape`) {
      closeCard();
      document.removeEventListener(`keydown`, onPopupEscPress);
    }
  };

  function showCard(evt) {
    if (evt.target.closest(`.map__pin`) && !evt.target.closest(`.map__pin--main`)) {
      if (offerPin === evt.target.closest(`.map__pin`)) {
        closeCard();
        return;
      }
      closeCard();
      offerPin = evt.target.closest(`.map__pin`);
      offerPin.classList.add(`map__pin--active`);
      const card = renderCard(window.data.offers[parseInt(offerPin.id[4], 10)]);
      window.map.map.insertBefore(card, document.querySelector(`.map__filters-container`));
      createCloseButton();
      document.addEventListener(`keydown`, onPopupEscPress);
    }
  }

  const mapPins = document.querySelector(`.map__pins`);
  mapPins.addEventListener(`click`, showCard);

})();
