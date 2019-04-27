"use strict";

var nytimes = require('../providers/nytimes/provider')

var getHeadlinesFromNYTimes = function(callback)  {
  nytimes.retrieve(callback);
}

module.exports = {
  get: function(callback) {
    getHeadlinesFromNYTimes(callback);
  }
}
