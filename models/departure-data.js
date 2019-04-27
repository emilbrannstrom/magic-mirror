"use strict";

var departureDate;
var routeDisplayName;

function DepartureData(departureDate, routeDisplayName) {
  this.departureDate = departureDate;
  this.routeDisplayName = routeDisplayName;
}

module.exports = DepartureData;
