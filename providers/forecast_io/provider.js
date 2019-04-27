'use strict';

var _ = require('lodash');

var service = require('./service');

var retrieve = function(callback) {
  service.retrieve()
    .then(callback);
}

module.exports = {
  retrieve: function(callback) {
    retrieve(callback);
  }
}
