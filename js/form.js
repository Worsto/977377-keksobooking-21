"use strict";

(function () {
  // функции
  const adForm = document.querySelector(`.ad-form`);
  const fieldsets = adForm.querySelectorAll(`fieldset`);
  const resetButton = adForm.querySelector(`.ad-form__reset`);

  function deactivateForm() {
    for (let i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = true;
    }
    resetForm();
    adForm.classList.add(`ad-form--disabled`);
  }

  function resetForm() {
    adForm.reset();
    completeAddressInput();
  }

  function activateForm() {
    for (let i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = false;
    }
    adForm.classList.remove(`ad-form--disabled`);
  }

  const addressInput = adForm.querySelector(`#address`);

  function disableAdressInput() {
    addressInput.setAttribute(`readonly`, `readonly`);
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
  const offerTitle = adForm.querySelector(`#title`);
  const minTitleLength = 30;
  const maxTitleLength = 100;

  function validateFiles() {
    adForm.querySelector(`#avatar`).setAttribute(`accept`, `image/png, image/jpeg`);
    adForm.querySelector(`#images`).setAttribute(`accept`, `image/png, image/jpeg`);
  }

  function validateTitle() {
    const valueLength = offerTitle.value.length;
    let isTitleValid = false;

    if (valueLength === 0) {
      offerTitle.setCustomValidity(`Обязательное поле`);
    } else if (valueLength < minTitleLength) {
      offerTitle.setCustomValidity(`Ещё ` + (minTitleLength - valueLength) + ` симв.`);
    } else if (valueLength > maxTitleLength) {
      offerTitle.setCustomValidity(`Удалите лишние ` + (valueLength - maxTitleLength) + ` симв.`);
    } else {
      offerTitle.setCustomValidity(``);
      isTitleValid = true;
    }

    offerTitle.addEventListener(`input`, clearTitleValidity);

    return isTitleValid;
  }

  function clearTitleValidity() {
    offerTitle.setCustomValidity(``);
    offerTitle.removeEventListener(`input`, clearTitleValidity);
  }

  const roomsInput = adForm.querySelector(`#room_number`);
  const guestsInput = adForm.querySelector(`#capacity`);

  function validateGuests() {
    let isGuestsValid = false;

    if (roomsInput.value === `100` && guestsInput.value !== `0`) {
      guestsInput.setCustomValidity(`Этот случай не для гостей`);
    } else if (roomsInput.value !== `100` && guestsInput.value === `0`) {
      guestsInput.setCustomValidity(`Добавьте гостей`);
    } else if (guestsInput.value > roomsInput.value) {
      guestsInput.setCustomValidity(`Количество гостей не должно превышать количество комнат`);
    } else {
      guestsInput.setCustomValidity(``);
      isGuestsValid = true;
    }

    guestsInput.reportValidity();
    return isGuestsValid;
  }

  const typeField = adForm.querySelector(`#type`);
  const priceField = adForm.querySelector(`#price`);


  function validateApartmentType() {
    const apartmentTypeData = {
      bungalow: {
        caseName: `Бунгало`,
        minPrice: 0
      },
      flat: {
        caseName: `Квартиры`,
        minPrice: 1000
      },
      house: {
        caseName: `Дома`,
        minPrice: 5000
      },
      palace: {
        caseName: `Дворца`,
        minPrice: 10000
      }
    };
    let isPriceValid = false;
    if (validateTitle()) {
      if (priceField.value === ``) {
        priceField.setCustomValidity(`Укажите цену`);
      } else if (parseInt(priceField.value, 10) > 1000000) {
        priceField.setCustomValidity(`Цена слишком высока`);
      } else if (priceField.value < apartmentTypeData[typeField.value].minPrice) {
        priceField.setCustomValidity(`Минимальная цена за аренду ${apartmentTypeData[typeField.value].caseName} ${apartmentTypeData[typeField.value].minPrice}`);
      } else {
        clearPriceValidity();
        isPriceValid = true;
      }
    }

    priceField.placeholder = apartmentTypeData[typeField.value].minPrice;
    return isPriceValid;
  }

  function clearPriceValidity() {
    priceField.setCustomValidity(``);
  }

  const timeinField = adForm.querySelector(`#timein`);
  const timeoutField = adForm.querySelector(`#timeout`);

  function completeTimeInput(userChange, autoChange) {
    autoChange.value = userChange.value;
  }

  // обработчики
  priceField.addEventListener(`input`, clearPriceValidity);

  typeField.addEventListener(`change`, validateApartmentType);

  timeinField.addEventListener(`change`, () => {
    completeTimeInput(timeinField, timeoutField);
  });

  timeoutField.addEventListener(`change`, () => {
    completeTimeInput(timeoutField, timeinField);
  });


  roomsInput.addEventListener(`change`, validateGuests);
  guestsInput.addEventListener(`change`, validateGuests);

  adForm.addEventListener(`submit`, function (evt) {
    evt.preventDefault();
    const isTitleValid = validateTitle();
    const isPriceValid = validateApartmentType();
    const isGuestsValid = validateGuests();
    if (isTitleValid && isGuestsValid && isPriceValid) {
      const formData = new FormData(adForm);
      window.upload(`https://21.javascript.pages.academy/keksobooking`, formData);
      window.page.deactivatePage();
    } else {
      adForm.reportValidity();
    }
  });

  resetButton.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    window.page.deactivatePage();
  });
  // вывод вовне
  window.form = {
    adForm,
    resetForm,
    deactivateForm,
    activateForm,
    completeAddressInput,
    disableAdressInput,
    validateFiles
  };

})();
