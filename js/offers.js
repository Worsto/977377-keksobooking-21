"use strict";

(function () {
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

  const createOffers = function (amount = 8) {
    const offers = [];
    for (let i = 0; i < amount; i++) {
      offers.push(createOfferMock(i + 1));
    }

    return offers;
  };

  window.offers = createOffers();

})();

