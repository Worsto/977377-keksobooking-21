"use strict";


(function () {
  window.upload = function (url, data) {
    let xhr = new XMLHttpRequest();

    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      let error;
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;

        case 400:
          error = `Неверный запрос`;
          break;
        case 401:
          error = `Пользователь не авторизован`;
          break;

        default:
          error = `Cтатус ответа: : ` + xhr.status + ` ` + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });

    xhr.open(`POST`, url);
    xhr.send(data);
  };

  function onError(errorMessage) {
    let errorPopup = document.querySelector(`#error`).content.cloneNode(true);
    let massage = errorPopup.querySelector(`.error__message`);
    massage.textContent = errorMessage;
    document.querySelector(`main`).append(errorPopup);
    errorPopup = document.querySelector(`.error`);
    function removePopup() {
      errorPopup.remove();
      errorPopup.removeEventListener(`click`, removePopup);
    }
    errorPopup.addEventListener(`click`, removePopup);
    const buttonToTryAgain = errorPopup.querySelector(`.error__button`);
    function tryAgain() {
      removePopup();
      window.page.activatePage();
      buttonToTryAgain.removeEventListener(`click`, tryAgain);
    }
    buttonToTryAgain.addEventListener(`click`, tryAgain);
    window.onPopupEscPress(removePopup);
  }

  function onSuccess() {
    let successPopup = document.querySelector(`#success`).content.cloneNode(true);
    document.querySelector(`main`).append(successPopup);
    successPopup = document.querySelector(`.success`);
    function removePopup() {
      successPopup.remove();
      successPopup.removeEventListener(`click`, removePopup);
    }
    successPopup.addEventListener(`click`, removePopup);
    window.onPopupEscPress(removePopup);
  }
})();

