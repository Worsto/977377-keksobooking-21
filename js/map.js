'use strict';

(function () {

  const map = document.querySelector(`.map`);

  window.map = {
    mapPins: map.querySelector(`.map__pins`),
    showMap() {
      map.classList.remove(`map--faded`);
    }
  };

  // map.insertBefore(
  // window.card.renderCard(window.data.offers[0]);
  // , document.querySelector(`.map__filters-container`)
  // );

})();
