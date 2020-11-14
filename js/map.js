'use strict';

(function () {

  const map = document.querySelector(`.map`);
  const mapPins = map.querySelector(`.map__pins`);

  mapPins.topBorder = 130;
  mapPins.bottomBorder = 630;

  function showMap() {
    map.classList.remove(`map--faded`);
  }

  window.map = {
    mapSection: map,
    mapPins,
    showMap
  };


})();
