"use strict";

var forecastIO = require('../providers/forecast_io/provider')

var getFromForecastIO = function(callback)  {
  forecastIO.retrieve(callback);
}

module.exports = {
  get: function(callback) {
    getFromForecastIO(callback);
  }
}
