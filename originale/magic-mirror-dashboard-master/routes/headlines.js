'use strict';

var express = require('express');
var router = express.Router();

var _ = require('lodash');

var headlines = require('../services/headlines')

router.get('/', function(req, res) {
  var callback = _.bind(function(data) {
    res.send(data);
  }, this, _);
  headlines.get(callback);
});

module.exports = router;
