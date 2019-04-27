'use strict';

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');


app.get('/', function (req, res) {
  res.render('index', { title: 'Magic Mirror'});
});

var transit = require('./routes/transit');
app.use('/transit', transit);

var headlines = require('./routes/headlines');
app.use('/headlines', headlines);

var weather = require('./routes/weather');
app.use('/weather', weather);

app.listen(4000, function () {
  console.log('Magic Mirror Dashboard on Port 4000!');
});
