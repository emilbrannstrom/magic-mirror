'use strict';

var express = require('express');
var app = express();

var _ = require('lodash');
var fetch = require('node-fetch');

var API_KEY = require('../../config/keys-forecast-io.json').forecast_io.secret;
var CONFIG = require('../../config/forecast-io.json');

var OFFLINE_DATA = require('../../test_data/forecast-io.json');

var BASE_URL = 'https://api.forecast.io/forecast';

var constructURL = function() {
  var url = BASE_URL + '/' + API_KEY + '/' + CONFIG.lat + ',' + CONFIG.lon;
  console.log(url);
  return url;
}

var GETFromEndpoint = function(url) {
  return fetch(url).then(function(response) {
    return response.json();
  })
}

var callForecastIO = function() {
  var url = constructURL();
  return GETFromEndpoint(url);
}

module.exports = {
  retrieve: function() {
    if (app.settings.env === 'offline') {
      return Promise.resolve(OFFLINE_DATA);
    }
    return callForecastIO();
  }
}
