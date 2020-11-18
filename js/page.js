'use strict';

(function () {

  function activatePage() {
    if (!window.page.isPageActive) {
      window.page.isPageActive = true;
      window.map.showMap();
      window.form.completeAddressInput();
      window.form.activateForm();
      window.map.mapPins.appendChild(window.createPins(window.offersToUse));
    }
  }

  function deactivatePage() {
    if (window.page.isPageActive) {
      window.page.isPageActive = false;
      window.map.hideMap();
      window.mainPin.returnToCenter();
      window.removePins();
      window.form.deactivateForm();
    }
  }

  let isPageActive = false;

  window.page = {
    isPageActive,
    activatePage,
    deactivatePage
  };

})();
