'use strict';

var express = require('express');
var router = express.Router();

var _ = require('lodash');

var transit = require('../services/weather')

router.get('/', function(req, res) {
  var callback = _.bind(function(data) {
    res.send(data);
  }, this, _);
  transit.get(callback);
});

module.exports = router;
