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
  const pinElement = pinTemplate.cloneNode(true);

  pinElement.setAttribute(`style`, `left: ${offer.location.x - 25}px; top: ${offer.location.y - 35}px;`);
  pinElement.querySelector(`img`).setAttribute(`src`, offer.author.avatar);
  pinElement.querySelector(`img`).setAttribute(`alt`, offer.offer.title);

  return pinElement;
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
const map = document.querySelector(`.map`);
const mapPins = document.querySelector(`.map__pins`);

function showMap(element) {
  element.classList.remove(`map--faded`);
}
const offers = createOffers(OFFERS_QUANTITY);
showMap(map);
mapPins.appendChild(createPinsList(offers));

/*
На основе первого по порядку элемента из сгенерированного массива и шаблона #card создайте DOM-элемент объявления (карточка объявления), заполните его данными из объекта:

const cardTemplate = document.querySelector(`#card`)
  .content.querySelector(`.map__card`);

const vocabulary = {
   flat: "Квартира",
   bungalow: "Бунгало",
   house: "Дом",
   palace: "Дворец"
}

- Выведите заголовок объявления offer.title в заголовок .popup__title.
- Выведите адрес offer.address в блок .popup__text--address.
- Выведите цену offer.price в блок .popup__text--price строкой вида {{offer.price}}₽/ночь. Например, 5200₽/ночь.
- В блок .popup__type выведите тип жилья offer.type: Квартира для flat, Бунгало для bungalow, Дом для house, Дворец для palace.
- Выведите количество гостей и комнат offer.rooms и offer.guests в блок .popup__text--capacity строкой вида {{offer.rooms}} комнаты для {{offer.guests}} гостей. Например, 2 комнаты для 3 гостей.
- Время заезда и выезда offer.checkin и offer.checkout в блок .popup__text--time строкой вида Заезд после {{offer.checkin}}, выезд до {{offer.checkout}}. Например, заезд после 14:00, выезд до 12:00.
- В список .popup__features выведите все доступные удобства в объявлении.
- В блок .popup__description выведите описание объекта недвижимости offer.description.
- В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна записываться как src соответствующего изображения.
- Замените src у аватарки пользователя — изображения, которое записано в .popup__avatar — на значения поля author.avatar отрисовываемого объекта.

Если данных для заполнения не хватает, соответствующий блок в карточке скрывается.
*/
