"use strict";

(function () {
  const adForm = document.querySelector(`.ad-form`);
  const fieldsets = adForm.querySelectorAll(`fieldset`);
  const roomsInput = adForm.querySelector(`#room_number`);
  const guestsInput = adForm.querySelector(`#capacity`);
  const addressInput = adForm.querySelector(`#address`);

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

  function completeAddressInput() {
    let horizontalOffset = Math.round(window.pin.mainPinDiameter / 2);
    let verticalOffset = horizontalOffset;

    if (window.page.isPageActive) {
      verticalOffset = window.pin.mainPinDiameter + window.pin.mainPinArrow;
    }

    let mainAdress = `${parseInt(window.pin.mainPin.style.left, 10) + horizontalOffset}, ${parseInt(window.pin.mainPin.style.top, 10) + verticalOffset}`;
    addressInput.value = mainAdress;
  }

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

  roomsInput.addEventListener(`change`, validateGuests);
  guestsInput.addEventListener(`change`, validateGuests);

  window.form = {
    deactivateForm,
    activateForm,
    completeAddressInput
  };

})();
