'use strict';

var Mustache = require('mustache');
var $ = require('jquery');
var _ = require('lodash');

var REFRESH_INTERVAL_10_MINUTES_IN_MS = 600000;
var MAX_HEADLINE_TITLE_LENGTH = 65;
var MAX_HEADLINES_TO_DISPLAY = 10;

var $container = $('.Layout--Headlines')[0];

var template =    '<div class="Headlines--list">' +
                    '{{#headlines}}' +
                    '<div class="Headlines--headline">' +
                      '<span class="Headlines--headline-section"><span>{{section}}</span></span>' +
                      '<span class="Headlines--headline-title"><span>{{title}}</span></span>' +
                    '</div>' +
                    '{{/headlines}}' +
                  '</div>';

var truncateTitle = function(title) {
  var append = "";
  if (title.length >= MAX_HEADLINE_TITLE_LENGTH) {
    append = "...";
  }
  return title.slice(0, MAX_HEADLINE_TITLE_LENGTH) + append;
}

var formatSection = function(section, longestSectionLength) {
  while (longestSectionLength > section.length) {
    section = " " + section;
  }
  return "| " + section;
}

var translateData = function(data) {
  var translatedHeadlines = [];

  data = data.slice(0, MAX_HEADLINES_TO_DISPLAY);

  var longestSectionLength = _.maxBy(data, function(headline) { return headline.section.length; }).section.length;

  _(data).forEach(function(headline) {
    var translatedHeadline = {
      title: truncateTitle(headline.title),
      section: headline.section,
      subsection: headline.subsection
    }
    translatedHeadlines.push(translatedHeadline);
  });
  return translatedHeadlines;
}

var startHeadlineRenderRefresh = function() {
  var handleGetHeadlinesSuccess = function(data) {
    var view = {
      headlines: (translateData(data.data))
    };
    var output = Mustache.render(template, view);
    $container.innerHTML = output;
  }

  var renderHeadlines = function() {
    var url = '/headlines';

    $.ajax({
      url: url,
      success: handleGetHeadlinesSuccess,
      dataType: 'json'
    });

    setTimeout(renderHeadlines, REFRESH_INTERVAL_10_MINUTES_IN_MS);
  }

  renderHeadlines();
}

$(document).ready(function() {
  startHeadlineRenderRefresh();
});
