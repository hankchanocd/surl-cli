/*
 * get.js gets data for expandUrl, shortenUrl and stats
 *
 */

// Dependencies
const { BitlyClient } = require('bitly');
const copy = require('clipboardy').writeSync;
const api = require('./lib/api.js');
const util = require('./lib/util.js');

// UI
const chalk = require('chalk');

// Configurations Retrieval
const Conf = require('conf');
const conf = new Conf();
const defaultProvider = conf.get('defaultProvider');

// Stats summary utility methods
const googleSummary = require('./lib/stats/google-stats.js').summary;


function expandUrl(input) {

    switch (util.identifyAPIProvider(input)) {
        case 'bitly': // Use bitly API client
            let token = conf.get('bitly_key');
            const bitly = new BitlyClient(token);

            bitly
                .expand(input)
                .then(function(result) {
                    result = result.expand[0].long_url;
                    // Copy to clipboard
                    copy(result);
                    console.log(`${chalk.green('success! ' + chalk.white.underline(result) + ' copied to clipboard')}`);
                })
                .catch(err => console.log(chalk.redBright(`ERROR: ${err.message}`)));
            return;

        case 'google': // Use self-made goo.gl API client
            let url = conf.get('providerUrl');
            let apiKey = conf.get('google_key');
            let urlToExpand = url + '?shortUrl=' + input + '&key=' + apiKey;

            api.get(urlToExpand)
                .then(response => {
                    // Copy to clipboard
                    copy(response.longUrl);
                    console.log(`${chalk.green('success! expanded url copied to clipboard ')}`);
                })
                .catch(err => console.log(chalk.redBright(`ERROR: ${err.message}`)));
            return;

        default:
            return console.log(' Unable to detect provider from the link.');
    }

}

function shortenUrl(longUrl) {

    switch (defaultProvider) {
        case 'bitly': // Use bitly API client
            let token = conf.get('bitly_key');
            const bitly = new BitlyClient(token);

            bitly
                .shorten(longUrl)
                .then(function(result) {
                    result = result.url;
                    // Copy to clipboard
                    copy(result);
                    console.log(`${chalk.green('success! ' + chalk.white.underline(result) + ' copied to clipboard')}`);
                })
                .catch(err => console.log(chalk.redBright(`ERROR: ${err.message}`)));
            return;

        case 'google': // Use self-made goo.gl API client
            let url = conf.get('providerUrl');
            let apiKey = conf.get('google_key');
            let urlWithKey = url + '?key=' + apiKey;
            api.post(urlWithKey, longUrl)
                .then(response => {
                    // Copy to clipboard
                    copy(response.id);
                    console.log(`${chalk.green('success! ' + chalk.white.underline(response.id) + ' copied to clipboard')}`);
                })
                .catch(err => console.log(chalk.redBright(`ERROR: ${err.message}`)));
            return;

        default:
            return console.log(' No provider is selected.');
    }

}

function stats(input) {

    switch (util.identifyAPIProvider(input)) {
        case 'bitly': // Use bitly API client
            let token = conf.get('bitly_key');
            const bitly = new BitlyClient(token);

            bitly
                .countries(input)
                .then(function(result) {
                    console.log(result);
                })
                .catch(err => console.log(chalk.redBright(`ERROR: ${err.message}`)));
            return;

        case 'google': // Use self-made goo.gl API client
            let url = conf.get('providerUrl');
            input += '&projection=FULL'; // stats identifier
            let apiKey = conf.get('google_key');
            const urlToAnalyze = url + '?shortUrl=' + input + '&key=' + apiKey;

            api.get(urlToAnalyze)
                .then(response => {
                    // Display analytics
                    googleSummary(response);
                })
                .catch(err => console.log(chalk.redBright(`ERROR: ${err.message}`)));
            return;

        default:
            return console.log(' Unable to detect provider from the link.');

    }

}



// Export module
export {
    expandUrl,
    shortenUrl,
    stats
};
