var $ = require('jquery');

var REFRESH_INTERVAL_HALF_SECOND_IN_MS = 500;

var $container = $('.Layout--Clock');
var $time = $container.find('.Clock--time')[0];
var $dayOfWeek = $container.find('.Clock--day-of-week')[0];
var $monthAndDay = $container.find('.Clock--month-and-day')[0];


var addZeros = function(i) {
  if (i < 10) {
    i = "0" + i
  };
  return i;
}

var getDayOfWeekFromDate = function(date) {
  var weekday = new Array(7);
  weekday[0]=  "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  var zeroIndexedDay = date.getDay();
  return weekday[zeroIndexedDay];
}

var getMonthNameFromDate = function(date) {
  var month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";

  var zeroIndexedMonth = date.getMonth();
  return month[zeroIndexedMonth];
}

var formatTime = function(hour, minute) {
  return hour + ":" + minute;
}

var nth = function(d) {
  if(d>3 && d<21) return 'th'; // thanks kennebec
  switch (d % 10) {
    case 1:  return "st";
    case 2:  return "nd";
    case 3:  return "rd";
    default: return "th";
  }
}

var formatDayAndMonth = function(day, month) {
  return month + " " + day + nth(day);
}

var startClockRenderInterval = function() {
  var renderClockWidget = function() {
    var now = new Date();
    var hour = now.getHours();
    var minute = addZeros(now.getMinutes());
    var dayOfWeek = getDayOfWeekFromDate(now);
    var month = getMonthNameFromDate(now);
    var dayOfMonth = now.getDate();

    $time.innerHTML = formatTime(hour, minute);
    $dayOfWeek.innerHTML = dayOfWeek;
    $monthAndDay.innerHTML = formatDayAndMonth(dayOfMonth, month);

    setTimeout(renderClockWidget, REFRESH_INTERVAL_HALF_SECOND_IN_MS);
  }

  renderClockWidget();
}

$(document).ready(function() {
  startClockRenderInterval();
});
