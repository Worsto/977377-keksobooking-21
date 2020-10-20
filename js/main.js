'use strict';

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
const VOCABULARY = {
  flat: `Квартира`,
  bungalow: `Бунгало`,
  house: `Дом`,
  palace: `Дворец`
};

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
      price: getRandomNumber(10, 120) * 1000,
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

function renderPin(element) {
  const pinElement = pinTemplate.cloneNode(true);

  pinElement.setAttribute(`style`, `left: ${element.location.x - 25}px; top: ${element.location.y - 35}px;`);
  pinElement.querySelector(`img`).setAttribute(`src`, element.author.avatar);
  pinElement.querySelector(`img`).setAttribute(`alt`, element.offer.title);

  return pinElement;
}

function createFeature(feature) {
  const listItem = document.createElement(`li`);
  listItem.classList.add(`popup__feature`);
  listItem.classList.add(`popup__feature--${feature}`);

  return listItem;
}

function createImgWithSource(src) {
  const image = cardTemplate.querySelector(`.popup__photo`).cloneNode();
  image.setAttribute(`src`, src);

  return image;
}

function createList(func, array) {
  let list = document.createDocumentFragment();
  for (let i = 0; i < array.length; i++) {
    list.appendChild(func(array[i]));
  }

  return list;
}

function renderCard(element) {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector(`.popup__title`).textContent = element.offer.title;
  cardElement.querySelector(`.popup__text--address`).textContent = element.offer.address;
  cardElement.querySelector(`.popup__text--price`).textContent = `${element.offer.price}₽/ночь`;
  cardElement.querySelector(`.popup__type`).textContent = VOCABULARY[element.offer.type];
  cardElement.querySelector(`.popup__text--capacity`).textContent = `${element.offer.rooms} комнаты для ${element.offer.guests} гостей`;
  cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}`;
  cardElement.querySelector(`.popup__features`).innerHTML = ``;
  cardElement.querySelector(`.popup__features`).appendChild(createList(createFeature, element.offer.features));
  cardElement.querySelector(`.popup__description`).textContent = element.offer.description;
  cardElement.querySelector(`.popup__photos`).innerHTML = ``;
  cardElement.querySelector(`.popup__photos`).appendChild(createList(createImgWithSource, element.offer.photos));
  cardElement.querySelector(`.popup__avatar`).setAttribute(`src`, element.author.avatar);

  return cardElement;
}

function createPinsList(array) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < array.length; i++) {
    fragment.appendChild(renderPin(array[i]));
  }

  return fragment;
}

const pinTemplate = document.querySelector(`#pin`)
  .content.querySelector(`.map__pin`);
const cardTemplate = document.querySelector(`#card`)
  .content.querySelector(`.map__card`);
const map = document.querySelector(`.map`);
const mapPins = document.querySelector(`.map__pins`);

function showMap() {
  map.classList.remove(`map--faded`);
}
const offers = createOffers(OFFERS_QUANTITY);
showMap();
mapPins.appendChild(createPinsList(offers));

map.insertBefore(renderCard(offers[0]), document.querySelector(`.map__filters-container`));
