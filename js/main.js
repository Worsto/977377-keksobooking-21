'use strict';

const OFFERS_QUANTITY = 8;
const APARTMENT_TYPES = [`palace`, `flat`, `house`, `bungalow`];
const CHECK_TIMES = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PICTURES = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

const formatNumber = (num) => num > 9 ? num : `0${num}`;

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

function getRandomFromArray(array) {
  return array[getRandomNumber(0, array.length - 1)];
}

const getRandomsFromArray = (array) => array.filter(() => {
  return Math.random() > 0.5;
});

function createOfferMok(n) {
  const locX = getRandomNumber(31, 1169);
  const locY = getRandomNumber(130, 630);
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
      avatar: `img/avatars/user${formatNumber(n)}.png`
    },
    offer: {
      title: `Заголовок предложения`,
      address: `${locX}, ${locY}`,
      price: getRandomNumber(1, 120) * 1000,
      type: getRandomFromArray(APARTMENT_TYPES),
      rooms: getRandomNumber(roomsAmount.min, roomsAmount.max),
      guests: getRandomNumber(guestsAmount.min, guestsAmount.max),
      checkin: getRandomFromArray(CHECK_TIMES),
      checkout: getRandomFromArray(CHECK_TIMES),
      features: getRandomsFromArray(FEATURES),
      description: `строка с описанием`,
      photos: getRandomsFromArray(PICTURES)
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
    offers.push(createOfferMok(i + 1));
  }

  return offers;
}

function renderPin(offer) {
  const pinElement = pin.cloneNode(true);

  pinElement.querySelector(`.map__pin`).setAttribute(`style`, `left: ${offer.location.x - 25}px; top: ${offer.location.y - 35}px;`);
  pinElement.querySelector(`.map__pin`).querySelector(`img`).setAttribute(`src`, offer.author.avatar);
  pinElement.querySelector(`.map__pin`).querySelector(`img`).setAttribute(`alt`, offer.offer.title);


  return pinElement;
}

function createPinsList(array) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < array.length; i++) {
    fragment.appendChild(renderPin(array[i]));
  }

  return fragment;
}

const pin = document.querySelector(`#pin`)
  .content;
const map = document.querySelector(`.map`);

function showMap(element) {
  element.classList.remove(`map--faded`);
}
const offers = createOffers(OFFERS_QUANTITY);
showMap(map);
map.appendChild(createPinsList(offers));
