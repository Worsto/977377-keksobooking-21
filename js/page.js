'use strict';

(function () {

  function activatePage() {
    if (!window.page.isPageActive) {
      window.page.isPageActive = true;
      window.map.showMap();
      window.form.completeAddressInput();
      if (window.offers !== undefined) {
        window.enableFilterForm();
      }
      window.form.activateForm();
      window.map.mapPins.appendChild(window.createPins(window.offersToUse));
    }
  }

  function deactivatePage() {
    if (window.page.isPageActive) {
      window.page.isPageActive = false;
      window.closeCard();
      window.resetFilterForm();
      window.disableFilterForm();
      window.map.hideMap();
      window.mainPin.returnToCenter();
      window.removePins();
      window.form.deactivateForm();
      window.form.resetForm();
    }
  }

  let isPageActive = false;

  window.page = {
    isPageActive,
    activatePage,
    deactivatePage
  };

})();
