'use strict';

(function () {

  const map = document.querySelector(`.map`);
  const mapPins = map.querySelector(`.map__pins`);

  function showMap() {
    map.classList.remove(`map--faded`);
  }

  window.map = {
    mapPins,
    showMap
  };

  // map.insertBefore(
  // window.card.renderCard(window.data.offers[0]);
  // , document.querySelector(`.map__filters-container`)
  // );

})();
