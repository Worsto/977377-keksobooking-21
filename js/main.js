'use strict';

const MAIN_PIN_DIAMETER = 65;
const MAIN_PIN_ARROW = 22;
const map = document.querySelector(`.map`);
const mapPins = document.querySelector(`.map__pins`);

// Функции для работы с режимами страницы
let isPageActive = false;
const mainPin = document.querySelector(`.map__pin--main`);
const addressInput = window.form.adForm.querySelector(`#address`);


function showMap() {
  map.classList.remove(`map--faded`);
}

function activatePage() {
  if (!isPageActive) {
    isPageActive = true;
    showMap();
    window.form.activateForm();
    mapPins.appendChild(window.data.createPinsList(window.data.offers));
  }
}

function onPinLeftClick(e) {
  if (typeof e === `object` && e.button === 0) {
    activatePage();
    completeAddressInput();
  }
}

function completeAddressInput() {
  let horizontalOffset = Math.round(MAIN_PIN_DIAMETER / 2);
  let verticalOffset = horizontalOffset;


  if (isPageActive) {
    verticalOffset = MAIN_PIN_DIAMETER + MAIN_PIN_ARROW;
  }

  let mainAdress = `${parseInt(mainPin.style.left, 10) + horizontalOffset}, ${parseInt(mainPin.style.top, 10) + verticalOffset}`;
  addressInput.value = mainAdress;
}

// Обработчики событий для смены режимов страницы
mainPin.addEventListener(`mousedown`, onPinLeftClick);

mainPin.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter` || evt.code === `Space`) {
    activatePage();
    completeAddressInput();
  }
});

// Вызовы
completeAddressInput();
window.form.deactivateForm();
