'use strict';

// Глобальные константы
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

// Простейшие функции
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

// Функции для генерации похожих объявлений
const pinTemplate = document.querySelector(`#pin`)
  .content.querySelector(`.map__pin`);
const cardTemplate = document.querySelector(`#card`)
    .content.querySelector(`.map__card`);
const map = document.querySelector(`.map`);
const mapPins = document.querySelector(`.map__pins`);

function createOfferMock(n) {
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
      price: getRandomNumber(0, 1000) * 1000,
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

// Функции для работы с режимами страницы
let isPageActive = false;
const mainPin = document.querySelector(`.map__pin--main`);
const adForm = document.querySelector(`.ad-form`);
const fieldsets = adForm.querySelectorAll(`fieldset`);
const addressInput = adForm.querySelector(`#address`);


function showMap() {
  map.classList.remove(`map--faded`);
}

function deactivateForm() {
  for (let i = 0; i < fieldsets.length; i++) {
    fieldsets[i].setAttribute(`disabled`, `disabled`);
  }
  adForm.classList.add(`ad-form--disabled`);
}

function activateForm() {
  for (let i = 0; i < fieldsets.length; i++) {
    fieldsets[i].removeAttribute(`disabled`);
  }
  adForm.classList.remove(`ad-form--disabled`);
}

function activatePage() {
  if (!isPageActive) {
    isPageActive = true;
    showMap();
    activateForm();
    mapPins.appendChild(createPinsList(offers));
  }
}

function onPinLeftClick(e) {
  if (typeof e === `object` && e.button === 0) {
    activatePage();
    adressAutoComplete();
  }
}

function adressAutoComplete() {
  let verticalOffset = 32;

  if (isPageActive) {
    verticalOffset = 65 + 22;
  }

  let mainAdress = `${parseInt(mainPin.style.left, 10) + 32}, ${parseInt(mainPin.style.top, 10) + verticalOffset}`;
  addressInput.value = mainAdress;
}

// Обработчики событий для смены режимов страницы
mainPin.addEventListener(`mousedown`, onPinLeftClick);

mainPin.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter` || evt.code === `Space`) {
    activatePage();
    adressAutoComplete();
  }
});

// Функции для валидации формы
const roomsInput = adForm.querySelector(`#room_number`);
const guestsInput = adForm.querySelector(`#capacity`);

function setGuestsValidity(input) {
  input.addEventListener(`blur`, function () {
    if (roomsInput.value === `100` && guestsInput.value !== `0`) {
      guestsInput.setCustomValidity(`Этот случай не для гостей`);
    } else if (guestsInput.value > roomsInput.value) {
      guestsInput.setCustomValidity(`Количество гостей не должно превышать количество комнат`);
    } else {
      guestsInput.setCustomValidity(``);
    }

    guestsInput.reportValidity();
  });
}

setGuestsValidity(roomsInput);
setGuestsValidity(guestsInput);

// Вызовы
adressAutoComplete();
const offers = createOffers(OFFERS_QUANTITY);
deactivateForm();
// map.insertBefore(
renderCard(offers[0]);
// , document.querySelector(`.map__filters-container`)
// );
