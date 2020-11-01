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

  window.card = {
    renderCard(element) {
      const cardElement = cardTemplate.cloneNode(true);

      cardElement.querySelector(`.popup__title`).textContent = element.offer.title;
      cardElement.querySelector(`.popup__text--address`).textContent = element.offer.address;
      cardElement.querySelector(`.popup__text--price`).textContent = `${element.offer.price}₽/ночь`;
      cardElement.querySelector(`.popup__type`).textContent = VOCABULARY[element.offer.type];
      cardElement.querySelector(`.popup__text--capacity`).textContent = `${element.offer.rooms} комнаты для ${element.offer.guests} гостей`;
      cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}`;
      cardElement.querySelector(`.popup__features`).innerHTML = ``;
      cardElement.querySelector(`.popup__features`).appendChild(window.data.createList(window.data.createFeature, element.offer.features));
      cardElement.querySelector(`.popup__description`).textContent = element.offer.description;
      cardElement.querySelector(`.popup__photos`).innerHTML = ``;
      cardElement.querySelector(`.popup__photos`).appendChild(window.data.createList(createImgWithSource, element.offer.photos));
      cardElement.querySelector(`.popup__avatar`).setAttribute(`src`, element.author.avatar);

      return cardElement;
    }
  };

})();
