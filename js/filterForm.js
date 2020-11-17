'use strict';

(function () {
  const formChildren = document.querySelector(`.map__filters`).children;

  window.disableFilterForm = function () {
    for (let i = 0; i < formChildren.length; i++) {
      formChildren[i].disabled = true;
    }
  };
  window.enableFilterForm = function () {
    for (let i = 0; i < formChildren.length; i++) {
      formChildren[i].disabled = false;
    }
  };


})();
