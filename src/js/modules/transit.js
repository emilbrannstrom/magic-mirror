'use strict';

var Mustache = require('mustache');
var $ = require('jquery');
var _ = require('lodash');

var NOW = 'Now';

//30 Seconds
var REFRESH_INTERVAL_30_SECONDS_IN_MS = 30 * 1000;

var $container = $('.Layout--Transit')[0];

var template =  '{{#stops}}' +
                '<div class="Transit--stop">' +
                  '<div class="Transit--stop-name">{{stopName}}</div>' +
                  '<div class="Transit--departure-list">' +
                  '{{#hasDepartures}}' +
                    '{{#departures}}' +
                    '<div class="Transit--departure">' +
                        '<div class="Transit--departure-line-name">{{lineName}}</div>' +
                        '<div class="Transit--departure-time-to-depart">{{timeUntilDeparture}}</div>' +
                        '<div class="Transit--departure-time">{{departureTime}}</div>' +
                    '</div>' +
                    '{{/departures}}' +
                  '{{/hasDepartures}}' +
                  '{{^hasDepartures}}' +
                  '<div class="Transit--no-departures-message">No Upcoming Departures</div>' +
                  '{{/hasDepartures}}' +
                  '</div>' +
                '<div>' +
                '{{/stops}}';

var addZeros = function(i) {
  if (i < 10) {
    i = "0" + i
  };
  return i;
}

var formatDateAsTime = function(departureDate) {
  var hour = departureDate.getHours();
  var minute = addZeros(departureDate.getMinutes());
  return hour + ':' + minute;
}

var calculateTimeToDepart = function(departureDate) {
  var now = new Date();
  var diff = Math.abs(now - departureDate);
  var minutesToDeparture = Math.floor((diff/1000)/60);
  if (minutesToDeparture === 0) {
    return NOW;
  }
  return minutesToDeparture + " Min.";
}

var translateRoutes = function(routeList) {
  var translatedRouteList = [];
  _(routeList).forEach(function(route) {
    var departureDate = new Date(route.departureDate);
    var translatedRoute = {
      lineName: route.routeDisplayName,
      timeUntilDeparture: calculateTimeToDepart(departureDate),
      departureTime: formatDateAsTime(departureDate)
    };
    translatedRouteList.push(translatedRoute);
  });
  return translatedRouteList;
}

var translateStops = function(stopList) {
  var translatedStopList = [];
  _(stopList).forEach(function(stop) {
    var translatedStop = {
      stopName: stop.displayName,
      departures: translateRoutes(stop.departures),
      hasDepartures: stop.departures.length > 0
    };
    translatedStopList.push(translatedStop);
  });
  return translatedStopList;
}

var startTransitRenderRefresh = function() {
  var handleGetTransitSuccess = function(data) {
    var view = {
      stops: translateStops(data.data)
    };
    var output = Mustache.render(template, view);
    $container.innerHTML = output;
  }

  var renderTransitData = function() {
    var url = '/transit';

    $.ajax({
      url: url,
      success: handleGetTransitSuccess,
      dataType: 'json'
    });

    setTimeout(renderTransitData, REFRESH_INTERVAL_30_SECONDS_IN_MS);
  }

  renderTransitData();
}

$(document).ready(function() {
  startTransitRenderRefresh();
});
