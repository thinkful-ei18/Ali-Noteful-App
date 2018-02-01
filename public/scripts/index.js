/* global $ noteful api store */
'use strict';

$(document).ready(function () {
  noteful.bindEventListeners();

  noteful.updateResponse(false)
    .then(noteful.updateStore);
});