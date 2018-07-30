/*
 * Utility library for displaying statistics from google URL shortener API
 *
 */

// Dependencies
const util = require('../util.js');

// UI
const chalk = require('chalk');
const columnify = require('columnify');
const ui = require('cliui')();


// Clicks summary
function summary(response) {

    response = parseSummary(response);

    console.log(`${chalk.grey('shortUrl:')} ${response.shortUrl}`);
    console.log(`${chalk.grey('origin:')} ${response.longUrl}`);
    console.log(`${chalk.grey('created:')} ${response.date}`);
    console.log(`${chalk.grey('clicks:')}`);

    // Clicks details
    if (!response.analytics) {
        return chalk.grey('clicks data NaN');
    } else {
        ui.div({
            text: response.clicksPeriod,
            width: 35,
            padding: [0, 4, 0, 4]
        }, {
            text: response.clicksCountries,
            width: 25,
            padding: [0, 4, 0, 4]
        });

        console.log(ui.toString());
    }
}


function parseSummary(summary) {
    return {
        shortUrl: summary.id,
        longUrl: summary.longUrl,
        date: util.fullDate(summary.created),
        analytics: summary.analytics,
        clicksPeriod: clicksPeriod(summary.analytics),
        clicksCountries: clicksCountries(summary.analytics)
    }
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


// Export
export {
    summary,
    parseSummary
};
