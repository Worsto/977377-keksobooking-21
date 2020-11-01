"use strict";

(function () {

  const OFFERS_QUANTITY = 8;
  const APARTMENT_TYPES = [
    `palace`,
    `flat`,
    `house`,
    `bungalow`
  ];
  const CHECK_TIMES = [
    `12:00`,
    `13:00`,
    `14:00`
  ];
  const FEATURES = [
    `wifi`,
    `dishwasher`,
    `parking`,
    `washer`,
    `elevator`,
    `conditioner`
  ];
  const PICTURES = [
    `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
  ];

  const pinTemplate = document.querySelector(`#pin`)
  .content.querySelector(`.map__pin`);


  function createOfferMock(n) {
    const locX = window.util.getRandomNumber(31, 1169);
    const locY = window.util.getRandomNumber(130, 630);
    const roomsAmount = {
      min: 1,
      max: 4
    };
    const guestsAmount = {
      min: 1,
      max: 3
    };

    return {
      author: {
        avatar: `img/avatars/user${window.util.formatNumber(n)}.png`
      },
      offer: {
        title: `Заголовок предложения`,
        address: `${locX}, ${locY}`,
        price: window.util.getRandomNumber(0, 1000) * 1000,
        type: window.util.getRandomFromArray(APARTMENT_TYPES),
        rooms: window.util.getRandomNumber(roomsAmount.min, roomsAmount.max),
        guests: window.util.getRandomNumber(guestsAmount.min, guestsAmount.max),
        checkin: window.util.getRandomFromArray(CHECK_TIMES),
        checkout: window.util.getRandomFromArray(CHECK_TIMES),
        features: window.util.getRandomsFromArray(FEATURES),
        description: `строка с описанием`,
        photos: window.util.getRandomsFromArray(PICTURES)
      },
      location: {
        x: locX,
        y: locY
      }
    };
  }

  function createOffers(amount) {
    const offers = [];
    for (let i = 0; i < amount; i++) {
      offers.push(createOfferMock(i + 1));
    }

    return offers;
  }

  function renderPin(element) {
    const pinElement = pinTemplate.cloneNode(true);

    pinElement.setAttribute(`style`, `left: ${element.location.x - 25}px; top: ${element.location.y - 35}px;`);
    pinElement.querySelector(`img`).setAttribute(`src`, element.author.avatar);
    pinElement.querySelector(`img`).setAttribute(`alt`, element.offer.title);

    return pinElement;
  }

  window.data = {
    offers: createOffers(OFFERS_QUANTITY),
    createPinsList(array) {
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < array.length; i++) {
        fragment.appendChild(renderPin(array[i]));
      }

      return fragment;
    },
    createFeature(feature) {
      const listItem = document.createElement(`li`);
      listItem.classList.add(`popup__feature`);
      listItem.classList.add(`popup__feature--${feature}`);

      return listItem;
    },
    createList(func, array) {
      let list = document.createDocumentFragment();
      for (let i = 0; i < array.length; i++) {
        list.appendChild(func(array[i]));
      }

      return list;
    }
  };

})();
