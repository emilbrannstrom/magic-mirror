'use strict';

var _ = require('lodash');

var NYTIMES_NOW_SECTION_NAME = 'NYT Now';

var HeadlineData = require('../../models/headline-data');

var filterOutNYTimesNowArticles = function(headlineList) {
  return _.filter(headlineList, function(headline) {
    return NYTIMES_NOW_SECTION_NAME !== headline.section;
  });
}

var translateHeadlineData = function(headlineData) {
  var headlines = [];
  var headlineResults = headlineData.results;
  headlineResults = filterOutNYTimesNowArticles(headlineResults);

   _(headlineResults).forEach(function(headline) {
     var title = headline.title;
     var section = headline.section;
     var subsection = headline.subsection;
     var translatedHeadline = new HeadlineData(title, section, subsection);
     headlines.push(translatedHeadline);
   });

  return {
    "data": headlines
  };
}

module.exports = {
  translate : function(headlineData) {
    return translateHeadlineData(headlineData);
  }
}
