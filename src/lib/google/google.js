/*
 * Goo.gl API related operations
 * 
 */

// Dependencies
const { summary, parseSummary } = require('./google-stats.js');

// Configurations Retrieval
const Conf = require('conf');
const conf = new Conf();
const apiKey = conf.get('google_key') || process.env.google_key;


// Global variables
const apiUrl = 'https://www.googleapis.com/urlshortener/v1/url';

// The holder object
const googl = {};


googl.shortenUrl = function shortenUrl() {
    return apiUrl + '?key=' + apiKey;
};


googl.expandUrl = function expandUrl(input) {
    return apiUrl + '?shortUrl=' + input + '&key=' + apiKey;
};


googl.statsUrl = function statsUrl(input) {
    input += '&projection=FULL'; // stats identifier
    return apiUrl + '?shortUrl=' + input + '&key=' + apiKey;
};


googl.summary = summary;


googl.parseSummary = parseSummary;


// Export
module.exports = googl;

