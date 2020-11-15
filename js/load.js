"use strict";


(function () {
<<<<<<< HEAD
  window.load = function (url, onSuccess, onError) {
=======
  const load = function (url, onSuccessFunc, onErrorFunc) {
>>>>>>> module6-task1
    let xhr = new XMLHttpRequest();

    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      let error;
      switch (xhr.status) {
        case 200:
<<<<<<< HEAD
          onSuccess(xhr.response);
=======
          onSuccessFunc(xhr.response);
>>>>>>> module6-task1
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
<<<<<<< HEAD
        onError(error);
=======
        onErrorFunc(error);
>>>>>>> module6-task1
      }
    });

    xhr.addEventListener(`error`, function () {
<<<<<<< HEAD
      onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
=======
      onErrorFunc(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, function () {
      onErrorFunc(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
>>>>>>> module6-task1
    });

    xhr.timeout = 10000; // 10s

    xhr.open(`GET`, url);
    xhr.send();
  };

<<<<<<< HEAD
  window.onError = function (errorMessage) {
=======
  function onError(errorMessage) {
>>>>>>> module6-task1
    let node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: tomato;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
<<<<<<< HEAD
  };

  window.onSuccess = function (data) {
    window.offers = data;
=======
  }

  function onSuccess(data) {
    window.offers = data;
  }

  window.loadOffers = function (url) {
    load(url, onSuccess, onError);
>>>>>>> module6-task1
  };

})();

