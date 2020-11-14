"use strict";

(function () {
  // функции
  const adForm = document.querySelector(`.ad-form`);
  const fieldsets = adForm.querySelectorAll(`fieldset`);

  function deactivateForm() {
    for (let i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = true;
    }
    adForm.classList.add(`ad-form--disabled`);
  }

  function activateForm() {
    for (let i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = false;
    }
    adForm.classList.remove(`ad-form--disabled`);
  }

  const addressInput = adForm.querySelector(`#address`);

  function disableAdressInput() {
    addressInput.disabled = true;
  }

  function completeAddressInput() {
    let horizontalOffset = Math.round(window.mainPin.offsetWidth / 2);
    let verticalOffset = horizontalOffset;

    if (window.page.isPageActive) {
      verticalOffset = window.mainPin.offsetWidth + window.mainPin.arrow;
    }

    let mainPinX = parseInt(window.mainPin.style.left, 10) + horizontalOffset;
    let mainPinY = parseInt(window.mainPin.style.top, 10) + verticalOffset;

    let mainAdress = `${mainPinX}, ${mainPinY}`;
    addressInput.value = mainAdress;
  }

  // валидация
  const OfferTitle = adForm.querySelector(`#title`);
  const minTitleLength = 30;
  const maxTitleLength = 100;

  function validateFiles() {
    adForm.querySelector(`#avatar`).setAttribute(`accept`, `image/png, image/jpeg`);
    adForm.querySelector(`#images`).setAttribute(`accept`, `image/png, image/jpeg`);
  }

  function validateTitle() {
    const valueLength = OfferTitle.value.length;

    if (valueLength === 0) {
      OfferTitle.setCustomValidity(`Обязательное поле`);
    } else if (valueLength < minTitleLength) {
      OfferTitle.setCustomValidity(`Ещё ` + (minTitleLength - valueLength) + ` симв.`);
    } else if (valueLength > maxTitleLength) {
      OfferTitle.setCustomValidity(`Удалите лишние ` + (valueLength - maxTitleLength) + ` симв.`);
    } else {
      OfferTitle.setCustomValidity(``);
    }

    OfferTitle.reportValidity();

    OfferTitle.addEventListener(`input`, clearTitleValidity);
  }

  function clearTitleValidity() {
    OfferTitle.setCustomValidity(``);
    OfferTitle.removeEventListener(`input`, clearTitleValidity);
  }

  const submitButton = adForm.querySelector(`.ad-form__submit`);

  const roomsInput = adForm.querySelector(`#room_number`);
  const guestsInput = adForm.querySelector(`#capacity`);

  function validateGuests() {
    if (roomsInput.value === `100` && guestsInput.value !== `0`) {
      guestsInput.setCustomValidity(`Этот случай не для гостей`);
    } else if (roomsInput.value !== `100` && guestsInput.value === `0`) {
      guestsInput.setCustomValidity(`Добавьте гостей`);
    } else if (guestsInput.value > roomsInput.value) {
      guestsInput.setCustomValidity(`Количество гостей не должно превышать количество комнат`);
    } else {
      guestsInput.setCustomValidity(``);
    }

    guestsInput.reportValidity();
  }

  const typeField = adForm.querySelector(`#type`);
  const priceField = adForm.querySelector(`#price`);
  const minPrice = 1000;

  function validateApartmentType() {
    if (typeField.value === `bungalow`) {
      priceField.placeholder = `0`;
      minPrice = 0;
    } else if (typeField.value === `flat`) {
      priceField.placeholder = `1000`;
      priceField.setCustomValidity(`Цена за квартиру должна начинаться от 1 000`);
      minPrice = 1000;
    } else if (typeField.value === `house`) {
      priceField.placeholder = `5000`;
      priceField.setCustomValidity(`Цена за дом должна начинаться от 5 000`);
      minPrice = 5000;
    } else if (typeField.value === `palace`) {
      priceField.placeholder = `10000`;
      priceField.setCustomValidity(`Цена за дворец должна начинаться от 10 000`);
      minPrice = 10000;
    }
  }

  function validatePrice() {
    if (parseInt(priceField.value, 10) >= minPrice) {
      priceField.setCustomValidity(``);
    }
    if (parseInt(priceField.value, 10) > 1000000) {
      priceField.setCustomValidity(`Цена слишком высока`);
    }
  }

  function clearPriceField() {
    priceField.setCustomValidity(``);
  }

  const timeinField = adForm.querySelector(`#timein`);
  const timeoutField = adForm.querySelector(`#timeout`);

  function completeTimeInput(userChange, autoChange) {
    autoChange.value = userChange.value;
  }

  // обработчики
  priceField.addEventListener(`input`, clearPriceField);

  typeField.addEventListener(`change`, validateApartmentType);

  timeinField.addEventListener(`change`, () => {
    completeTimeInput(timeinField, timeoutField);
  });

  timeoutField.addEventListener(`change`, () => {
    completeTimeInput(timeoutField, timeinField);
  });


  roomsInput.addEventListener(`change`, validateGuests);
  guestsInput.addEventListener(`change`, validateGuests);

  submitButton.addEventListener(`click`, function () {
    validateTitle();
    validateApartmentType();
    validatePrice();
  });

  // вывод вовне
  window.form = {
    adForm,
    deactivateForm,
    activateForm,
    completeAddressInput,
    disableAdressInput,
    validateFiles
  };

})();
