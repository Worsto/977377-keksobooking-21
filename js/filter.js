'use strict';

(function () {
  const form = document.querySelector(`.map__filters`);
  const filterOffers = function () {
    window.closeCard();
    const formData = new FormData(form);
    let values = {};
    for (let value of formData) {
      if (typeof values[`features`] !== `undefined`) {
        values[value[0]].push(value[1]);
      } else if (value[0] === `features`) {
        values.features = [value[1]];
      } else {
        values[value[0].slice(8)] = value[1];
      }
    }

    let newArray = window.offers.filter(function (value) {
      return (value.offer.type === values.type);
    });
    window.map.mapPins.appendChild(window.createPins(newArray));
  };

  form.addEventListener(`change`, filterOffers);

})();
