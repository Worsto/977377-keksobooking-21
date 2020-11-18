"use strict";

(function () {

  window.createList = function (func, array) {
    let list = document.createDocumentFragment();
    for (let i = 0; i < array.length; i++) {
      list.appendChild(func(array[i]));
    }

    return list;
  };

})();
