/*
 * get.js gets data for expandUrl, shortenUrl and stats
 *
 */

// Dependencies
const chalk = require('chalk');
const Conf = require('conf');
const copy = require('clipboardy').writeSync;
const columnify = require('columnify');
const ui = require('cliui')();
const api = require('./api/api.js');


// Retrieve data from configurations for accessing the preferred API provider
const conf = new Conf();
const apiKey = conf.get('key');
const url = conf.get('providerUrl');


function expandUrl(input) {
    const urlToExpand = url + '?shortUrl=' + input + '&key=' + apiKey;

    api.get(urlToExpand)
        .then(response => {

            // Should an invalid url is sent
            if (response.error) {
                return console.log(chalk.redBright('ERROR:', response.error.message));
            }

            // Copy to clipboard
            copy(response.longUrl);
            console.log(`${chalk.green('success! expanded url copied to clipboard ')}`);

        })
        .catch(err => console.log(chalk.redBright(`ERROR: ${err.message}`)));

}

function shortenUrl(longUrl) {
    const urlWithKey = url + '?key=' + apiKey;

    api.post(urlWithKey, longUrl)
        .then(response => {

            // Copy to clipboard
            copy(response.id);
            console.log(`${chalk.green('success! ' + chalk.white.underline(response.id) + ' copied to clipboard')}`);

        })
        .catch(err => console.log(chalk.redBright(`ERROR: ${err.message}`)));

}

function stats(input) {
    input += '&projection=FULL'; // stats identifier
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

}


/* Helper methods */
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
    return chalk.grey('Countries Data NaN');
}


// Export module
export {
    expandUrl,
    shortenUrl,
    stats
};
