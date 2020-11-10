'use strict';

(function () {

  function activatePage() {
    if (!window.page.isPageActive) {
      window.page.isPageActive = true;
      window.map.showMap();
      window.form.activateForm();
      window.map.mapPins.appendChild(window.createPins(window.offers));
    }
  }

  let isPageActive = false;

  window.page = {
    isPageActive,
    activatePage
  };

})();
