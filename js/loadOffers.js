"use strict";


(function () {
  const load = function (url, onSuccessFunc, onErrorFunc) {
    let xhr = new XMLHttpRequest();

    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      let error;
      switch (xhr.status) {
        case 200:
          onSuccessFunc(xhr.response);
          break;

        case 400:
          error = `Неверный запрос`;
          break;
        case 401:
          error = `Пользователь не авторизован`;
          break;
        case 404:
          error = `Ничего не найдено`;
          break;

        default:
          error = `Cтатус ответа: : ` + xhr.status + ` ` + xhr.statusText;
      }

      if (error) {
        onErrorFunc(error);
      }
    });

    xhr.addEventListener(`error`, function () {
      onErrorFunc(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, function () {
      onErrorFunc(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = 10000;

    xhr.open(`GET`, url);
    xhr.send();
  };

  function onError(errorMessage) {
    let node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: tomato;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  }

  function onSuccess(data) {
    window.offers = data;
    window.offersToUse = Array.from(window.offers);
  }

  window.loadOffers = function (url) {
    load(url, onSuccess, onError);
  };

})();

