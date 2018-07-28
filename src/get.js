/*
 * get.js gets data for expandUrl, shortenUrl and stats
 *
 */

// Dependencies
const { BitlyClient } = require('bitly');
const copy = require('clipboardy').writeSync;
const api = require('./lib/api.js');

// UI
const chalk = require('chalk');
const columnify = require('columnify');
const ui = require('cliui')();

// Configurations Retrieval
const Conf = require('conf');
const conf = new Conf();
const defaultProvider = conf.get('defaultProvider');


function expandUrl(input) {

    switch (defaultProvider) {
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
            return console.log(' No provider is selected.');
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

    switch (defaultProvider) {
        case 'bitly':
            return;

        case 'google':
            let url = conf.get('providerUrl');
            input += '&projection=FULL'; // stats identifier
            let apiKey = conf.get('google_key');
            const urlToExpand = url + '?shortUrl=' + input + '&key=' + apiKey;

            api.get(urlToExpand)
                .then(response => {

                    // Display analytics
                    console.log(`${chalk.grey('shortUrl:')} ${response.id}`);
                    console.log(`${chalk.grey('origin:')} ${response.longUrl}`);
                    console.log(`${chalk.grey('created:')} ${fullDate(response.created)}`);
                    console.log(`${chalk.grey('clicks:')}`);
                    console.log(summary(response.analytics));

                })
                .catch(err => console.log(chalk.redBright(`ERROR: ${err.message}`)));
            return;

        default:
            return console.log(' No provider is selected.');

    }

}


/**** Helper methods ****/
// Get full date
function fullDate(date) {
    let d = new Date(date);
    return d.getFullYear() + ' ' + (d.getMonth() + 1) + ' ' + d.getDate();
}

// Clicks summary
function summary(analytics) {

    if (!analytics) {
        return chalk.grey('clicks data NaN');
    }

    ui.div({
        text: clicksPeriod(analytics),
        width: 35,
        padding: [0, 4, 0, 4]
    }, {
        text: clicksCountries(analytics),
        width: 25,
        padding: [0, 4, 0, 4]
    });
    return ui.toString();
}

function clicksPeriod(analytics) {

    let period = [{
        period: 'allTime',
        shortUrl: analytics.allTime.shortUrlClicks || chalk.grey('NaN'),
        longUrl: analytics.allTime.longUrlClicks || chalk.grey('NaN')
    }, {
        period: 'month',
        shortUrl: analytics.month.shortUrlClicks || chalk.grey('NaN'),
        longUrl: analytics.month.longUrlClicks || chalk.grey('NaN')
    }, {
        period: 'week',
        shortUrl: analytics.week.shortUrlClicks || chalk.grey('NaN'),
        longUrl: analytics.week.longUrlClicks || chalk.grey('NaN')
    }, {
        period: 'day',
        shortUrl: analytics.day.shortUrlClicks || chalk.grey('NaN'),
        longUrl: analytics.day.longUrlClicks || chalk.grey('NaN')
    }, {
        period: 'twoHours',
        shortUrl: analytics.twoHours.shortUrlClicks || chalk.grey('NaN'),
        longUrl: analytics.twoHours.longUrlClicks || chalk.grey('NaN')
    }];

    return columnify(period);
}

function clicksCountries(analytics) {

    if (analytics.allTime.countries) {
        let countries = analytics.allTime.countries;
        countries = countries.map((obj) => {
            return {
                countries: obj.id,
                count: obj.count
            };
        });
        return columnify(countries);
    }
    return chalk.grey('COUNTRIES DATA NaN');
}


// Export module
export {
    expandUrl,
    shortenUrl,
    stats
};
