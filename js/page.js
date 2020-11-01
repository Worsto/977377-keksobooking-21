'use strict';

window.page = {
  isPageActive: false,

  activatePage() {
    if (!window.page.isPageActive) {
      window.page.isPageActive = true;
      window.map.showMap();
      window.form.activateForm();
      window.map.mapPins.appendChild(window.data.createPinsList(window.data.offers));
    }
  }
};

