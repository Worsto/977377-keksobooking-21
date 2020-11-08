'use strict';

(function () {

  const map = document.querySelector(`.map`);
  const mapPins = document.querySelector(`.map__pins`);

  function showMap() {
    map.classList.remove(`map--faded`);
  }

  window.map = {
    map,
    mapPins,
    showMap
  };

})();
