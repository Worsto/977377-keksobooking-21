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

    const priceValuesMeaning = {
      low: {
        min: 0,
        max: 10000
      },
      middle: {
        min: 10000,
        max: 50000
      },
      high: {
        min: 50000,
        max: Infinity
      },
    };

    window.offersToUse = window.offers.filter(function (value) {
      const comparisonFeatures = function () {
        if (typeof values[`features`] !== `undefined`) {
          for (let key of values.features) {
            if (value.offer.features.indexOf(key) === -1) {
              return false;
            }
          }
          return true;
        }
        return true;
      };

      const isPriceActual = function () {
        const priceValue = value.offer.price;
        if (values.price !== `any`) {
          const priceMax = priceValuesMeaning[values.price].max;
          const priceMin = priceValuesMeaning[values.price].min;
          if (priceValue > priceMin && priceValue <= priceMax) {
            return true;
          } else {
            return false;
          }
        }
        return true;
      };


      let isTypeChange = (value.offer.type === values.type || values.type === `any`);
      let isPriceChange = isPriceActual();
      let isRoomsChange = (value.offer.rooms === parseInt(values.rooms, 10) || values.rooms === `any`);
      let isGuestsChange = (value.offer.guests === parseInt(values.guests, 10) || values.guests === `any`);
      let isFeaturesChange = comparisonFeatures();

      return (isTypeChange && isFeaturesChange && isRoomsChange && isGuestsChange && isPriceChange);
    });

    const updatePins = function () {
      window.removePins();
      window.map.mapPins.appendChild(window.createPins(window.offersToUse));
    };

    window.debounce(updatePins);
  };

  form.addEventListener(`change`, filterOffers);

})();
