'use strict';

var express = require('express');
var app = express();

var _ = require('lodash');
var fetch = require('node-fetch');

var API_KEY = require('../../config/keys-nytimes.json').nytimes.secret;
var TOP_STORIES_BASE_URL = 'https://api.nytimes.com/svc/topstories/v2/home.json';

var OFFLINE_DATA = require('../../test_data/nytimes.json');

var constructTopStoriesURL = function() {
  var url = TOP_STORIES_BASE_URL + '?api-key=' + API_KEY;
  console.log(url);
  return url;
}

var GETFromEndpoint = function(url) {
  return fetch(url).then(function(response) {
    if (app.settings.env === 'offline') {
      return TEST_NYTIMES_DATA;
    }
    return response.json();
  })
}

var callTopStoriesEndpoint = function() {
  var url = constructTopStoriesURL();
  return GETFromEndpoint(url);
}

module.exports = {
  retrieve: function() {
    if (app.settings.env === 'offline') {
        return Promise.resolve(OFFLINE_DATA);
    }
    return callTopStoriesEndpoint();
  }
}
