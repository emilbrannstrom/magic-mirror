'use strict';

var _ = require('lodash');

var CONFIG = require('../../config/one-bus-away.json');

var StopData = require('../../models/stop-data');
var DepartureData = require('../../models/departure-data');

var filterDepartures = function(departures, routeIds) {
  //filter out route ids we don't care about
  departures = _.filter(departures, function(departure) {
    return _.includes(routeIds, departure.routeId);
  });
  //filter out non-predicted arrivals
  departures = _.filter(departures, function(departure) {
    return departure.predicted && departure.predictedArrivalTime;
  });

  return departures;
}

var translateDepartures = function(departures) {
  var arrivalsAndDepartures = [];

  _(departures).forEach(function(departure) {
    var departureDate = new Date(departure.predictedArrivalTime);
    var routeDisplayName = departure.routeShortName;
    arrivalsAndDepartures.push(new DepartureData(departureDate, routeDisplayName));
  });

  return arrivalsAndDepartures;
}

var routesIdsForStopFromConfig = function(stopId) {
  var routesToDisplayForStop = _(CONFIG.stopsToDisplay).find(function(stop) {
    return stop.stopId === stopId;
  }).routesToDisplay;

  return _.map(routesToDisplayForStop, function(route) {
    return route.routeId;
  })
}

var stopNameFromStopData = function(departuresAndArrivalsForStop, stopId) {
  var stops = departuresAndArrivalsForStop.data.references.stops;
  return _(stops).find(function(stop) {
    return stop.id === stopId;
  }).name;
}

var translateStopData = function(stopData) {
  var transitData = [];

  _(stopData).forEach(function(stopDataEntry) {
    var stopId = stopDataEntry.data.entry.stopId;
    var stopName = stopNameFromStopData(stopDataEntry, stopId);
    var relevantRouteIds = routesIdsForStopFromConfig(stopId);
    var relevantDepartures = filterDepartures(stopDataEntry.data.entry.arrivalsAndDepartures, relevantRouteIds);
    var translatedDepartures = translateDepartures(relevantDepartures);
    var stop = new StopData(translatedDepartures, stopName)
    transitData.push(stop);
  });

  return {
    "data": transitData
  };
}

module.exports = {
  translate : function(stopData) {
    return translateStopData(stopData);
  }
}
