/*
 * get.js gets data for expandUrl(), shortenUrl() and stats() using bitly, firebase,
 * and goo.gl API
 *
 */

// Dependencies
const copyToClipBoard = require('clipboardy').writeSync;
const api = require('./lib/request.js');
const bitly = require('./lib/bitly/bitly.js')();
const googl = require('./lib/google/google.js');
const _util = require('./lib/util.js');
const util = require('util'); // Node's util library

// Configurations Retrieval
const Conf = require('conf');
const conf = new Conf();
const defaultProvider = conf.get('defaultProvider');

// UI
const chalk = require('chalk');


function expandUrl(input) {

    switch (_util.identifyAPIProvider(input)) {
        case 'bitly':
            {
                return bitly
                    .expand(input)
                    .then(function (result) {
                        result = result.expand[0].long_url;
                        copyToClipBoard(result);
                        console.log(`${chalk.green('success! expanded url copied to clipboard ')}`);
                        return;
                    })
                    .catch(err => console.log(chalk.redBright(`ERROR: ${err.message}`)));
            }

        case 'google':
            {
                let url = googl.expandUrl(input);
                return api.get(url)
                    .then(response => {
                        copyToClipBoard(response.longUrl);
                        console.log(`${chalk.green('success! expanded url copied to clipboard ')}`);
                        return;
                    })
                    .catch(err => console.log(chalk.redBright(`ERROR: ${err.message}`)));
            }

        default:
            {
                return console.log(' Unable to detect provider from the link.');
            }
    }

}

function shortenUrl(longUrl) {

    switch (defaultProvider) {
        case 'bitly':
            {
                return bitly
                    .shorten(longUrl)
                    .then(result => {
                        result = result.url;
                        copyToClipBoard(result);
                        console.log(`${chalk.green('success! ' + chalk.white.underline(result) + ' copied to clipboard')}`);
                        return;
                    })
                    .catch(err => console.log(chalk.redBright(`ERROR: ${err.message}`)));
            }

        case 'google':
            {
                let urlWithKey = googl.shortenUrl();
                return api.post(urlWithKey, longUrl)
                    .then(response => {
                        let shortUrl = response.id;
                        copyToClipBoard(shortUrl);
                        console.log(`${chalk.green('success! ' + chalk.white.underline(shortUrl) + ' copied to clipboard')}`);
                        return;
                    })
                    .catch(err => console.log(chalk.redBright(`ERROR: ${err.message}`)));
            }

        default:
            {
                return console.log(' No provider is selected.');
            }
    }

}

function stats(input) {

    switch (_util.identifyAPIProvider(input)) {
        case 'bitly':
            { // Use bitly API client
                return Promise.all([
                        bitly.info(input),
                        bitly.expand(input),
                        bitly.clicks(input),
                        bitly.clicksByDay(input),
                        bitly.countries(input)
                    ])
                    .then(result => {
                        // Display summary data
                        bitly.summary(result);
                        return;
                    })
                    .catch(err => console.log(chalk.redBright(`ERROR: ${err.message}`)));
            }

        case 'google':
            { // Use self-made goo.gl API client
                let url = googl.statsUrl(input);
                return api.get(url)
                    .then(response => {
                        // Display summary data
                        googl.summary(response);
                        return;
                    })
                    .catch(err => console.log(chalk.redBright(`ERROR: ${err.message}`)));
            }

        default:
            {
                return console.log(' Unable to detect provider from the link.');
            }
    }

}

function rawStats(input) {

    switch (_util.identifyAPIProvider(input)) {
        case 'bitly':
            { // Use bitly API client
                return Promise.all([
                        bitly.info(input),
                        bitly.expand(input),
                        bitly.clicks(input),
                        bitly.clicksByDay(input),
                        bitly.countries(input)
                    ])
                    .then(function (result) {
                        let rawDataObj = bitly.parseSummary(result);
                        // Display the full object using util's inspect
                        console.log(util.inspect(rawDataObj, true, null));
                        return;
                    })
                    .catch(err => console.log(chalk.redBright(`ERROR: ${err.message}`)));

            }

        case 'google':
            { // Use self-made goo.gl API client
                let url = googl.statsUrl(input);
                return api.get(url)
                    .then(response => {
                        let rawDataObj = googl.parseSummary(response);
                        // Display the full object using util's inspect
                        console.log(util.inspect(rawDataObj, true, null));
                        return;
                    })
                    .catch(err => console.log(chalk.redBright(`ERROR: ${err.message}`)));
            }

        default:
            {
                return console.log(' Unable to detect provider from the link.');
            }
    }

}



// Export module
export {
    expandUrl,
    shortenUrl,
    stats,
    rawStats
};
