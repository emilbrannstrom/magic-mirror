'use strict';

var _ = require('lodash');

var service = require('./service');
var translator = require('./translator');

var retrieveTransitData = function(callback) {
  service.retrieve()
    .then(translator.translate)
    .then(callback);
}

module.exports = {
  retrieveTransitData: function(callback) {
    retrieveTransitData(callback);
  }
}
