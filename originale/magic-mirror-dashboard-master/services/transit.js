"use strict";

var oneBusAway = require('../providers/one_bus_away/provider')

var getFromOneBusAway = function(callback)  {
  oneBusAway.retrieveTransitData(callback);
}

module.exports = {
  get: function(callback) {
    getFromOneBusAway(callback);
  }
}
