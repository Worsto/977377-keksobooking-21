'use strict';

(function () {

  const map = document.querySelector(`.map`);
  const mapPins = map.querySelector(`.map__pins`);

  function showMap() {
    map.classList.remove(`map--faded`);
  }

  window.map = {
    mapSection: map,
    mapPins,
    showMap
  };

})();
