'use strict';

(function () {
  window.disableFilterForm();
  window.loadOffers(`https://21.javascript.pages.academy/keksobooking/data`);
  window.form.disableAdressInput();
  window.form.deactivateForm();
  window.form.completeAddressInput();
  window.form.validateFiles();
})();
