"use strict";

window.form = {
  adForm: document.querySelector(`.ad-form`),
  deactivateForm() {
    for (let i = 0; i < fieldsets.length; i++) {
      fieldsets[i].setAttribute(`disabled`, `disabled`);
    }
    window.form.adForm.classList.add(`ad-form--disabled`);
  },
  activateForm() {
    for (let i = 0; i < fieldsets.length; i++) {
      fieldsets[i].removeAttribute(`disabled`);
    }
    window.form.adForm.classList.remove(`ad-form--disabled`);
  }
};

const fieldsets = window.form.adForm.querySelectorAll(`fieldset`);
const roomsInput = window.form.adForm.querySelector(`#room_number`);
const guestsInput = window.form.adForm.querySelector(`#capacity`);

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
